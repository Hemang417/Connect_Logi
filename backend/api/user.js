import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectMySQL } from "../config/sqlconfig.js";
import { fileURLToPath } from 'url';
const connection = await connectMySQL();
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTheUser = async (username, password, orgcode) => {
  try {
    const tableName = username === "admin" ? "users" : "userkyctable";

    const [existingUsers] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE username = ? AND orgcode = ?`,
      [username, orgcode]
    );

    if (existingUsers.length === 0) {
      return { error: "Invalid username or org code." };
    }

    const user = existingUsers[0];

    // Atomic single-session enforcement — only set loggedin=1 if currently 0
    const [loginResult] = await connection.execute(
      `UPDATE ${tableName} SET loggedin = 1, tokenIssuedAt = NOW() WHERE username = ? AND orgcode = ? AND loggedin = 0`,
      [username, orgcode]
    );

    if (loginResult.affectedRows === 0) {
      // Either already logged in or record doesn't exist
      // Re-fetch to distinguish the two cases
      const [check] = await connection.execute(
        `SELECT loggedin FROM ${tableName} WHERE username = ? AND orgcode = ?`,
        [username, orgcode]
      );
      if (check.length > 0 && check[0].loggedin === 1) {
        return { error: "You are already logged in from another device. Please log out first." };
      }
    }

    // Password check — support bcrypt hashes and legacy plain-text (transitional)
    let passwordMatch = false;
    if (user.password && user.password.startsWith("$2")) {
      passwordMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordMatch = user.password === password;
      // Silently upgrade to bcrypt on next successful login
      if (passwordMatch) {
        const hashed = await bcrypt.hash(password, 10);
        await connection.execute(
          `UPDATE ${tableName} SET password = ? WHERE username = ? AND orgcode = ?`,
          [hashed, username, orgcode]
        );
      }
    }

    if (!passwordMatch) {
      // Roll back loggedin flag since password was wrong
      await connection.execute(
        `UPDATE ${tableName} SET loggedin = 0 WHERE username = ? AND orgcode = ?`,
        [username, orgcode]
      );
      return { error: "Incorrect password." };
    }

    // Token expiration logic: 10 hours or until midnight (whichever is sooner)
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const now = new Date();
    const tenHoursLater = new Date(now.getTime() + 10 * 60 * 60 * 1000);
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    midnight.setDate(midnight.getDate() + 1); // tomorrow at 00:00
    const expiresAt = Math.min(tenHoursLater.getTime(), midnight.getTime());
    const expInSeconds = Math.ceil(expiresAt / 1000);

    const token = jwt.sign(
      {
        username: user.username,
        orgcode: user.orgcode,
        exp: expInSeconds,
      },
      SECRET_KEY
    );

    user.token = token;
    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};

export const logoutUser = async (username, orgname, orgcode) => {
  try {
    // Determine table name based on username
    let tableName = username === "admin" ? "users" : "userkyctable";

    // Update the loggedin status to 0
    await connection.execute(
      `UPDATE ${tableName} SET loggedin = 0, tokenIssuedAt = NULL WHERE username = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    return {
      success: true,
      message: "User logged out successfully",
      username: username,
    };
  } catch (error) {
    console.error("Error during logout:", error.message);
    throw error;
  }
};

export const getAllUsers = async (orgname, orgcode) => {
  try {
    const [employees] = await connection.execute(
      `SELECT * FROM userkyctable WHERE orgname = ? AND orgcode = ? And IsDeleted = 0`,
      [orgname, orgcode]
    );
    const [branchaccess] = await connection.execute(
      `SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return { employees, branchaccess }; // Return both datasets as an object
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

// Get next organization ID
export const getNextRegistrationId = async (req, res) => {
  try {
    // First, try to find the smallest missing ID
    const [gapRows] = await connection.query(`
            SELECT t1.id + 1 AS nextId
            FROM ctclients t1
            LEFT JOIN ctclients t2 ON t1.id + 1 = t2.id
            WHERE t2.id IS NULL
            ORDER BY t1.id
            LIMIT 1
        `);

    if (gapRows.length > 0 && gapRows[0].nextId !== null) {
      return res.status(200).json({ nextId: gapRows[0].nextId });
    }

    // If no gaps found, fallback to MAX(id) + 1
    const [maxRows] = await connection.query(`
            SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM ctclients
        `);

    return res.status(200).json({ nextId: maxRows[0].nextId });

  } catch (error) {
    console.error("Error fetching next registration ID:", error);
    res.status(500).json({ error: "Failed to fetch next registration ID" });
  }
};

// REGISTER API
export const registerClient = async (req, res) => {
  try {
    // Extract basic fields
    const {
      organizationName,
      organizationCode,
      username,
      password,
      repeatPassword,
      branchName,
      branchHeadName,
      branchHeadMobile,
      branchHeadEmail,
      gstNumber,
      legalName,
      address,
      establishedDate,
      country,
      companyType,
      panNumber,
      cinNumber,
      aeoNumber,
      chaLicense,
      chaBranchLicence,
    } = req.body;

    console.log("Received fields:", Object.keys(req.files));
    console.log("est date:", establishedDate);

    let directors = JSON.parse(req.body.directors || "[]");
    const sanitizedLegalName = legalName
      ?.replace(/[<>:"\/\\|?*]/g, "") // Remove illegal chars
      .replace(/\s+/g, "_")
      .substring(0, 100); // Limit length

    const directorPhotos = Array(directors.length).fill(null);
    const directorDocs = Array(directors.length).fill(null);

    Object.entries(req.files).forEach(([fieldName, filesArray]) => {
      if (!filesArray?.[0]) return;

      const match = fieldName.match(/^director-(\d+)-(photo|doc)$/);
      // This is already correct, no change needed
      if (match) {
        const index = parseInt(match[1], 10);
        const type = match[2];
        if (index < directors.length) {
          const filePath = `/uploads/ctclients/${sanitizedLegalName}/${filesArray[0].filename}`;

          if (type === "photo") {
            directorPhotos[index] = filePath;
          } else if (type === "doc") {
            directorDocs[index] = filePath;
          }
        }
      }
    });

    // Trim director info
    directors = directors.map((d) => ({
      name: d.name,
      email: d.email,
      mobile: d.mobile,
    }));

    const services = req.body.services ? req.body.services.split(",") : [];

    console.log("BODY:", req.body);
    console.log("FILES:", Object.keys(req.files));

    // STEP 1: Validate credentials
    if (!username || !password || !organizationName || !organizationCode) {
      return res.status(400).json({ message: "Missing login credentials" });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // STEP 2: Insert into users table
    const { user } = await insertUser(
      username,
      password,
      organizationName,
      organizationCode,
      req.files?.logo?.[0]
        ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.logo[0].filename}`
        : null
    );

    // STEP 3: Insert into ownbranches table
    const { branchcode: branchcode } = await storeOwnBranch(
      organizationCode,
      branchName,
      address,
      gstNumber,
      branchHeadName,
      branchHeadMobile,
      branchHeadEmail,
      organizationName,
      chaBranchLicence,
      username,
      req.files?.branchHeadPhoto?.[0]
        ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.branchHeadPhoto[0].filename}`
        : null,
      req.files?.branchHeadID?.[0]
        ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.branchHeadID[0].filename}`
        : null
    );

    // Format established date
    let formattedEstablishedDate = null;
    try {
      let dateValue = establishedDate;

      // Handle different date formats
      if (Array.isArray(establishedDate)) {
        dateValue = establishedDate[0];
      } else if (
        typeof establishedDate === "object" &&
        establishedDate !== null
      ) {
        // Handle date objects - check for common date object properties
        if (establishedDate.value) {
          dateValue = establishedDate.value;
        } else if (establishedDate.date) {
          dateValue = establishedDate.date;
        } else if (establishedDate.toString() !== "[object Object]") {
          dateValue = establishedDate.toString();
        }
      }

      const tempDate = new Date(dateValue);
      if (!isNaN(tempDate)) {
        formattedEstablishedDate =
          tempDate.getFullYear() +
          "-" +
          String(tempDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(tempDate.getDate()).padStart(2, "0");
      }

    } catch (err) {
      console.warn("Invalid establishedDate:", establishedDate);
    }

    // STEP 4: Insert into ctclients table
    await connection.execute(
      `INSERT INTO ctclients (
        legalName, address, establishedDate, country, companytype,
        panNumber, gstNumber, cinNumber, aeoNumber, chaLicense,
        panCopy, gstCopy, cinCopy, aeoCertificate, chaDoc, logo,
        moa, mou, nda, directors, directorPhoto, directorDoc, services, orgname, orgcode, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        legalName,
        address,
        formattedEstablishedDate,
        country,
        companyType,
        panNumber,
        gstNumber,
        cinNumber,
        aeoNumber,
        chaLicense,
        req.files?.panCopy?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.panCopy[0].filename}`
          : null,
        req.files?.gstCopy?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.gstCopy[0].filename}`
          : null,
        req.files?.cinCopy?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.cinCopy[0].filename}`
          : null,
        req.files?.aeoCertificate?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.aeoCertificate[0].filename}`
          : null,
        req.files?.chaDoc?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.chaDoc[0].filename}`
          : null,
        req.files?.logo?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.logo[0].filename}`
          : null,
        req.files?.moa?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.moa[0].filename}`
          : null,
        req.files?.mou?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.mou[0].filename}`
          : null,
        req.files?.nda?.[0]
          ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.nda[0].filename}`
          : null,
        JSON.stringify(directors), // Only name/email/mobile
        JSON.stringify(directorPhotos), // Photo paths array
        JSON.stringify(directorDocs), // Document paths array
        services.join(","),
        organizationName,
        organizationCode,
      ]
    );

    const { adminKYC } = await storeOwnAdminKYC(
      username,
      panNumber,
      formattedEstablishedDate,
      organizationName,
      organizationCode,
      branchName,
      branchcode,
      req.files?.logo?.[0]
        ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.logo[0].filename}`
        : null
    );

    // ✅ Final response
    res.status(200).json({
      message: "Registration successful",
      user,
      branchcode: branchcode,
      adminKYC,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const insertUser = async (
  username,
  password,
  orgname,
  organizationCode,
  logoFilename
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await connection.execute(
      `INSERT INTO users (username, password, orgcode, orgname, userphoto) VALUES (?, ?, ?, ?, ?)`,
      [username, hashedPassword, organizationCode, orgname, logoFilename]
    );
    return { rows, orgcode: organizationCode };
  } catch (error) {
    console.error("Error inserting user:", error.message);
    throw error;
  }
};

export const updateUserPassword = async (
  username,
  role,
  newpassword,
  remark,
  orgcode
) => {
  try {
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    const [result] = await connection.execute(
      `INSERT INTO adminchangeapproval (username, role, newpassword,remark, orgcode)
             VALUES (?, ?, ?, ?, ?)`,
      [username, role, hashedPassword, remark, orgcode]
    );

    return {
      success: true,
      message: "Password change request submitted for approval.",
    };
  } catch (error) {
    console.error("Error during password reset:", error.message);
    throw error;
  }
};

// get user Name and role
export const getApprover = async () => {
  try {
    const [rows] = await connection.execute(
      "SELECT id, username, role, newpassword, remark, status, created_at,orgcode FROM adminchangeapproval"
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No password change requests found" });
    }

    return rows;
  } catch (error) {
    console.error("Error fetching orgcode:", error.message);
    throw error;
  }
};

export const approvePasswordChange = async (username) => {
  try {
    // Fetch the request data from adminchangeapproval
    // console.log(`Fetching request for username: ${username}`);
    const [request] = await connection.execute(
      "SELECT newpassword FROM adminchangeapproval WHERE username = ?",
      [username]
    );

    if (request.length === 0) {
      throw new Error("Request not found");
    }

    const { newpassword } = request[0];
    if (!newpassword || !newpassword.trim()) {
      throw new Error("Invalid password change request: password is empty");
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await connection.execute(
      "UPDATE userkyctable SET password = ? WHERE username = ?",
      [hashedPassword, username]
    );
    // console.log('Deleting request from adminchangeapproval');
    let date = new Date();
    // Remove the request from the adminchangeapproval table
    await connection.execute(
      "UPDATE adminchangeapproval SET status = ?, created_at = ? WHERE username = ?",
      ["Approved", date, username]
    );

    return { success: true, message: "Password updated and request approved" };
  } catch (error) {
    console.error("Error approving request:", error);
    throw new Error("Internal Server Error");
  }
};

// Reject Password Change
export const rejectPasswordChange = async (username) => {
  try {
    let date = new Date();
    // Remove the request from the adminchangeapproval table
    await connection.execute(
      "UPDATE adminchangeapproval SET status = ?, created_at = ? WHERE username = ?",
      ["Rejected", date, username]
    );

    return { success: true, message: "Request rejected and removed" };
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw new Error("Internal Server Error");
  }
};

function extractNumbersAfterAt(orgcode) {
  const numbersAfterAt = orgcode.match(/@(\d+)/);
  if (numbersAfterAt && numbersAfterAt.length > 1) {
    return numbersAfterAt[1];
  } else {
    return orgcode;
  }
}

const storeOwnBranch = async (
  organizationCode,
  branchName,
  branchAddress,
  gstNumber,
  branchHeadName,
  branchHeadMobile,
  branchHeadEmail,
  organizationName,
  chaBranchLicence,
  username,
  headphoto,
  headdocument
) => {
  try {
    const codecode = extractNumbersAfterAt(organizationCode);
    // const firstEmptyIndex = organizationName.indexOf(" ");
    const newbranchcode = branchName + "-" + codecode;
    // const orgNamehaiye = organizationName
    //   .slice(0, firstEmptyIndex !== -1 ? firstEmptyIndex : organizationName.length)
    //   .toLowerCase();
    // const Orgcode = orgNamehaiye + "@" + codecode;
    const [row] = await connection.execute(
      `INSERT INTO ownbranches (
        orgcode, orgname, ownbranchname, gstnum,
        headname, headnum, heademail, headphoto, headdocument,
        address, chabranchlicence, branchcode, createdby, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        organizationCode || null,
        organizationName || null,
        branchName || null,
        gstNumber || null,
        // iec || null,
        branchHeadName || null,
        branchHeadMobile || null,
        branchHeadEmail || null,
        headphoto || null,
        headdocument || null,
        branchAddress || null,
        chaBranchLicence || null,
        newbranchcode || null,
        username || null,
      ]
    );

    return { row, branchcode: newbranchcode };
  } catch (error) {
    console.log(error);
  }
};

const storeOwnAdminKYC = async (
  username,
  panNumber,
  establishedDate,
  organizationName,
  orgcode,
  branchName,
  branchcode,
  logoPath
) => {
  try {
    // Prepare sanitized date of birth
    let dateOfBirth = null;
    if (establishedDate) {
      try {
        const tempDate = new Date(establishedDate);
        if (!isNaN(tempDate)) {
          dateOfBirth = tempDate.toISOString().split("T")[0];
        }
      } catch (err) {
        console.warn("Invalid establishedDate for DOB:", establishedDate);
      }
    }

    // Construct branch access JSON
    const branchAccess = JSON.stringify([
      {
        branchName,
        branchcode,
      },
    ]);

    await connection.execute(
      `INSERT INTO userkyctable (
        fullname, username, phone, officephone, personalemail, officeemail,
        aadharcard, pancard, dateofjoining, dateofbirth,
        orgname, orgcode, branchaccess, profilephoto, idproof
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "admin", // fullname
        username, // username
        "", // phone
        "", // officephone
        "", // personalemail
        "", // officeemail
        "", // aadharcard
        panNumber, // pancard
        dateOfBirth, // date of joining
        dateOfBirth, // date of birth
        organizationName, // orgname
        orgcode, // orgcode
        branchAccess, // branchaccess JSON
        logoPath, // profilephoto
        "", // idproof
      ]
    );

    return { adminKYC: true };
  } catch (error) {
    console.error("Error inserting Admin KYC:", error.message);
    throw error;
  }
};

export const getLegalName = async (req, res) => {
  try {
    const { orgcode } = req.query;

    if (!orgcode) {
      return res.status(400).json({ message: "orgcode is required" });
    }

    const [rows] = await connection.execute(
      "SELECT legalName FROM ctclients WHERE orgcode = ?",
      [orgcode]
    );

    if (rows.length > 0) {
      return res.status(200).json({ legalName: rows[0].legalName });
    } else {
      return res.status(404).json({ message: "Client not found" });
    }
  } catch (error) {
    console.error("Error fetching legal name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const storeBranch = async (req, res) => {
  try {
    const {
      orgcode,
      ownbranchname,
      address,
      gstnum,
      chabranchlicence,
      headname,
      headnum,
      heademail,
      orgname,
      username,
      legalName
    } = req.body;

    const codecode = orgcode.split("@")[1]; // Extract 123 from seatech@123
    const branchcode = `${ownbranchname}-${codecode}`;

    const sanitize = (str) => (str || "").trim().replace(/[<>:"|?*]/g, "").replace(/\s+/g, "_");
    const sanitizedLegalName = sanitize(legalName);

    // Get file paths safely
    const headphoto = req.files?.branchHeadPhoto?.[0]
      ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.branchHeadPhoto[0].filename}`
      : null;
    const headdocument = req.files?.branchHeadID?.[0]
      ? `/uploads/ctclients/${sanitizedLegalName}/${req.files.branchHeadID[0].filename}`
      : null;

    const [row] = await connection.execute(
      `INSERT INTO ownbranches (
        orgcode, orgname, ownbranchname, gstnum,
        headname, headnum, heademail, headphoto, headdocument, 
        address, chabranchlicence, branchcode, createdby, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        orgcode,
        orgname,
        ownbranchname,
        gstnum,
        headname,
        headnum,
        heademail,
        headphoto,
        headdocument,
        address,
        chabranchlicence,
        branchcode,
        username
      ]
    );

    res.status(200).json({
      message: "Branch created successfully",
      branchcode: branchcode,
      id: row.insertId
    });
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOwnBranches = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ownbranches WHERE orgname = ? AND orgcode = ? And  IsDeleted = 0`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBranchskhudka = async (orgname, orgcode, username) => {
  try {
    let query;
    let params;
    if (username === "admin") {
      query = `SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ? And  IsDeleted = 0`;
      params = [orgname, orgcode];
    } else {
      query = `SELECT ownbranchname, branchcode FROM branchaccess WHERE orgname = ? AND orgcode = ? AND username = ? And  IsDeleted = 0`;
      params = [orgname, orgcode, username];
    }
    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const deletekhudkaBranch = async (
  id,
  orgname,
  orgcode,
  deletedat,
  deletedby,
  DeleteRemark
) => {
  try {
    console.log(
      "backend2",
      deletedat,
      deletedby,
      DeleteRemark,
      id,
      orgname,
      orgcode
    );

    const [row] = await connection.execute(
      `UPDATE ownbranches
       SET IsDeleted = 1,
           deletedAt = ?,
           deletedby = ?,
           DeleteRemark = ?
       WHERE id = ? AND orgname = ? AND orgcode = ?`,
      [deletedat, deletedby, DeleteRemark.remark, id, orgname, orgcode]
    );

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const updatedOwnBranch = async (req, res) => {
  try {
    const {
      id,
      orgcode,
      orgname,
      ownbranchname,
      gstnum,
      chabranchlicence,
      headname,
      headnum,
      heademail,
      address,
      legalName
    } = req.body;

    // Get file paths safely - only update if new files are uploaded
    let headphoto = null;
    let headdocument = null;

    const sanitize = (str) => (str || "").trim().replace(/[<>:"|?*]/g, "").replace(/\s+/g, "_");
    const sanitizedLegalName = sanitize(legalName);

    // Fetch current file paths for the branch
    const [existingDataRows] = await connection.execute(
      `SELECT headphoto, headdocument FROM ownbranches WHERE id = ? AND orgcode = ? AND orgname = ?`,
      [id, orgcode, orgname]
    );
    const existingData = existingDataRows?.[0] || {};

    // Handle branchHeadPhoto
    if (req.files?.branchHeadPhoto?.[0]) {
      // Delete old photo if exists
      if (existingData.headphoto) {
        const oldPhotoPath = path.join(__dirname, "..", existingData.headphoto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      headphoto = `/uploads/ctclients/${sanitizedLegalName}/${req.files.branchHeadPhoto[0].filename}`;
    }

    // Handle branchHeadID
    if (req.files?.branchHeadID?.[0]) {
      // Delete old doc if exists
      if (existingData.headdocument) {
        const oldDocPath = path.join(__dirname, "..", existingData.headdocument);
        if (fs.existsSync(oldDocPath)) {
          fs.unlinkSync(oldDocPath);
        }
      }

      headdocument = `/uploads/ctclients/${sanitizedLegalName}/${req.files.branchHeadID[0].filename}`;
    }

    // Build dynamic query based on whether files are being updated
    let query = `UPDATE ownbranches SET 
      ownbranchname = ?, 
      gstnum = ?, 
      chabranchlicence = ?,
      headname = ?, 
      headnum = ?, 
      heademail = ?,
      address = ?`;

    let params = [ownbranchname, gstnum, chabranchlicence, headname, headnum, heademail, address];

    if (headphoto) {
      query += `, headphoto = ?`;
      params.push(headphoto);
    }

    if (headdocument) {
      query += `, headdocument = ?`;
      params.push(headdocument);
    }

    query += ` WHERE id = ? AND orgcode = ? AND orgname = ?`;
    params.push(id, orgcode, orgname);

    const [row] = await connection.execute(query, params);

    res.status(200).json({
      message: "Branch updated successfully",
      affectedRows: row.affectedRows
    });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApproverNameinOrg = async (orgcode) => {
  try {
    const [approverdata] = await connection.execute(
      `SELECT * FROM approvername WHERE orgcode = ?`,
      [orgcode]
    );
    const data = approverdata.filter((item) => {
      return item.uniquevalue[0] === "OrgButton";
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getUserDetails = async (orgname, orgcode, employeename) => {
//   try {
//     const [userData] = await connection.execute(
//       `SELECT
//          sw.workflowname,
//          sw.lobname,
//          ti.*,
//          te.*
//        FROM setworkflow sw
//        LEFT JOIN trackingimport ti
//          ON ti.tatimpcolumn = sw.workflowname
//          AND ti.lobname = sw.lobname
//          AND ti.IsDeleted = 0
//        LEFT JOIN trackingexport te
//          ON te.tatexpcolumn = sw.workflowname
//          AND te.lobname = sw.lobname
//          AND te.IsDeleted = 0
//        WHERE
//          sw.orgname = ?
//          AND sw.orgcode = ?
//          AND JSON_CONTAINS(sw.assignedperson, JSON_OBJECT('username', ?))
//          AND sw.IsDeleted = 0`,
//       [orgname, orgcode, employeename]
//     );
//     console.log(userData);
//     return userData;
//   } catch (err) {
//     console.error("Error in getUserDetails:", err);
//     throw err;
//   }
// };

export const getUserDetails = async (orgname, orgcode, employeename) => {
  const [rows] = await connection.execute(
    `SELECT 
       COALESCE(ti.jobnumber, te.jobnumber) AS jobnumber,
       COALESCE(ti.ownbranchname, te.ownbranchname) AS ownbranchname,
       COALESCE(ti.clientname, te.clientname) AS clientname,
       sw.workflowname AS milestone,
       COALESCE(ti.plandate, te.plandate) AS deadline,
       COALESCE(ti.actualdate, te.actualdate) AS completiondate,
       COALESCE(ti.timedelay, te.timedelay) AS timedelay,
       COALESCE(ti.status, te.status) AS status
     FROM setworkflow sw
     LEFT JOIN trackingimport ti
       ON ti.tatimpcolumn = sw.workflowname 
       AND ti.lobname = sw.lobname
       AND ti.IsDeleted = 0
     LEFT JOIN trackingexport te
       ON te.tatexpcolumn = sw.workflowname 
       AND te.lobname = sw.lobname
       AND te.IsDeleted = 0
     WHERE 
       sw.orgname = ? 
       AND sw.orgcode = ? 
       AND JSON_CONTAINS(sw.assignedperson, JSON_OBJECT('username', ?))
       AND sw.IsDeleted = 0
       AND (ti.jobdoneby = ? OR te.jobdoneby = ?)`,
    [orgname, orgcode, employeename, employeename, employeename]
  );

  return rows;
};
