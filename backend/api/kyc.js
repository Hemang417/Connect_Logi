import { connectMySQL } from "../config/sqlconfig.js";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const connection = await connectMySQL();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getBranches = async (username, orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT ownbranchname, branchcode 
           FROM branchaccess 
          WHERE orgname = ? 
            AND orgcode = ? 
            AND username = ?`,
      [orgname, orgcode, username]
    );
    return rows;
  } catch (error) {
    console.error("Database error in getBranches:", error);
    throw error; // let the caller handle the HTTP response
  }
};

export const uploadKYCData = async (req, res) => {
  try {
    const {
      fullname,
      username,
      phone,
      officephone,
      personalemail,
      officeemail,
      aadharcard,
      pancard,
      dateofjoining,
      dateofbirth,
      orgname,
      role,
      department,
      orgcode,
      branchaccess = "[]",
      password,
      createdby,
    } = req.body;

    if (!fullname || !username || !orgname || !orgcode) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const usernameofuser = username;

    const toWebPath = (filePath) => {
      const normalized = path.normalize(filePath);
      const uploadsIndex = normalized.lastIndexOf("uploads");
      return uploadsIndex !== -1
        ? "/" + normalized.slice(uploadsIndex).replace(/\\/g, "/")
        : null;
    };

    const profilephoto = req.files?.profilephoto?.[0]?.path
      ? toWebPath(req.files.profilephoto[0].path)
      : null;
    const idproof = req.files?.idproof?.[0]?.path
      ? toWebPath(req.files.idproof[0].path)
      : null;

    console.log("usernameofuser", usernameofuser);

    // Check if user exists
    const [existing] = await connection.execute(
      `SELECT id FROM userkyctable WHERE username = ?`,
      [usernameofuser]
    );

    if (existing.length > 0) {
      // User exists — update
      await connection.execute(
        `UPDATE userkyctable SET 
      fullname=?, phone=?, officephone=?, personalemail=?, officeemail=?, 
      aadharcard=?, pancard=?, dateofjoining=?, dateofbirth=?, orgname=?, 
      orgcode=?, branchaccess=?, profilephoto=COALESCE(?, profilephoto), 
      idproof=COALESCE(?, idproof), password=?, role=?, department=?, createdby=?
     WHERE username=?`,
        [
          fullname,
          phone,
          officephone,
          personalemail,
          officeemail,
          aadharcard,
          pancard,
          dateofjoining,
          dateofbirth,
          orgname,
          orgcode,
          branchaccess,
          profilephoto,
          idproof,
          password,
          role,
          department,
          createdby,
          usernameofuser,
        ]
      );
      res.status(200).json({ message: "Updated existing KYC data." });
    } else {
      // Insert new
      await connection.execute(
        `INSERT INTO userkyctable (
      fullname, username, phone, officephone, personalemail, officeemail, 
      aadharcard, pancard, dateofjoining, dateofbirth, orgname, orgcode, 
      branchaccess, profilephoto, idproof, password, role, department, createdby, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          fullname,
          usernameofuser,
          phone,
          officephone,
          personalemail,
          officeemail,
          aadharcard,
          pancard,
          dateofjoining,
          dateofbirth,
          orgname,
          orgcode,
          branchaccess,
          profilephoto,
          idproof,
          password,
          role,
          department,
          createdby,
        ]
      );
      res.status(201).json({ message: "Inserted new KYC data." });
    }
  } catch (err) {
    console.error("KYC Upload Error:", err);
    res.status(500).json({
      error: "Failed to upload KYC data.",
      details: err.message,
    });
  }
};

export const updateKYCData = async (req, res) => {
  try {
    const {
      fullname,
      username,
      phone,
      officephone,
      personalemail,
      officeemail,
      aadharcard,
      pancard,
      dateofjoining,
      dateofbirth,
      orgname,
      role,
      department,
      orgcode,
      branchaccess = "[]",
      password,
      createdby,
    } = req.body;

    const [existing] = await connection.execute(
      `SELECT id, department, branchaccess, role, profilephoto, idproof FROM userkyctable WHERE username = ?`,
      [username]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingUser = existing[0];

    let profilephoto = null;
    let idproof = null;

    if (!fullname || !username || !orgname || !orgcode) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const usernameofuser = username;

    const toWebPath = (filePath) => {
      const normalized = path.normalize(filePath);
      const uploadsIndex = normalized.lastIndexOf("uploads");
      return uploadsIndex !== -1
        ? "/" + normalized.slice(uploadsIndex).replace(/\\/g, "/")
        : null;
    };

    if (req.files?.profilephoto?.[0]) {
      if (existingUser.profilephoto) {
        const oldProfilePath = path.join(__dirname, "..", existingUser.profilephoto);
        if (fs.existsSync(oldProfilePath)) {
          fs.unlinkSync(oldProfilePath);
        }
      }
      profilephoto = toWebPath(req.files.profilephoto[0].path);
    }

    if (req.files?.idproof?.[0]) {
      if (existingUser.idproof) {
        const oldIdProofPath = path.join(__dirname, "..", existingUser.idproof);
        if (fs.existsSync(oldIdProofPath)) {
          fs.unlinkSync(oldIdProofPath);
        }
      }
      idproof = toWebPath(req.files.idproof[0].path);
    }

    console.log("usernameofuser", usernameofuser);

    // Check if user exists - NOW GETTING DEPARTMENT TOO
    const [existingCheck] = await connection.execute(
      `SELECT id, department, branchaccess, role FROM userkyctable WHERE username = ?`,
      [usernameofuser]
    );

    if (existingCheck.length > 0) {
      const currentDepartment = existingCheck[0].department;
      let newUsername = usernameofuser; // Default to current username
      console.log("existing", existingCheck);

      let parsedBranch = {};
      try {
        parsedBranch = JSON.parse(existingUser.branchaccess || "{}");
      } catch (e) {
        parsedBranch = {};
      }
      let branchname = parsedBranch.branchName || "None";
      let branchcode = parsedBranch.branchcode || "None";
      let currentRole = existingCheck[0].role;

      if (currentRole !== role) {
        const firstName = username.split("@")[0];
        newUsername = `${firstName}@${role}`;
      }

      // Regenerate username ONLY if department changed
      if (currentDepartment !== department) {
        const firstName = fullname.split(" ")[0].toLowerCase();

        /* remove isdeleted = 0 from this query to generate unique number 
           by consider the user in the shallow delete
        */
        const query = `
         WITH numbers AS (
            SELECT DISTINCT 
              CAST(REGEXP_SUBSTR(SUBSTRING_INDEX(username, '@', 1), '[0-9]+$') AS UNSIGNED) AS num
            FROM userkyctable
            WHERE department = ? 
              AND orgname = ? 
              AND orgcode = ?
              AND IsDeleted = 0
              AND REGEXP_SUBSTR(SUBSTRING_INDEX(username, '@', 1), '[0-9]+$') IS NOT NULL
          ),
          gaps AS (
            SELECT 1 AS candidate
            WHERE NOT EXISTS (SELECT 1 FROM numbers WHERE num = 1)
            UNION ALL
            SELECT num + 1
            FROM numbers
            WHERE NOT EXISTS (SELECT 1 FROM numbers n2 WHERE n2.num = numbers.num + 1)
          )
          SELECT MIN(candidate) AS missing_number
          FROM gaps;
        `;

        const [rows] = await connection.execute(query, [
          department,
          orgname,
          orgcode,
        ]);
        let uniqueNumber = rows[0].missing_number;

        // Fallback if no gaps found (use max+1)
        if (uniqueNumber === null) {
          const [maxRows] = await connection.execute(
            `SELECT MAX(CAST(REGEXP_SUBSTR(SUBSTRING_INDEX(username, '@', 1), '[0-9]+$') AS UNSIGNED)) AS max_num
             FROM userkyctable
             WHERE department = ? AND orgname = ? AND orgcode = ? AND IsDeleted = 0`,
            [department, orgname, orgcode]
          );
          uniqueNumber = maxRows[0].max_num ? maxRows[0].max_num + 1 : 1;
        }

        newUsername = `${firstName}.${department}${uniqueNumber}@${role}`;

        await connection.execute(
          "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
          [
            orgname,
            orgcode,
            branchname || "None",
            branchcode || "None",
            "User Report",
            "None",
            "None",
            "Depratment changed of " +
            usernameofuser +
            " From " +
            currentDepartment +
            " to " +
            department,
          ]
        );
      }

      if (newUsername !== usernameofuser) {
        // Update accesscontrol table
        const query2 = `UPDATE accesscontrol SET username = ? WHERE username = ? AND orgname = ? AND orgcode = ?`;
        const params2 = [newUsername, usernameofuser, orgname, orgcode];
        await connection.execute(query2, params2);


      }

      // User exists — update
      await connection.execute(
        `UPDATE userkyctable SET 
      username=?,
      fullname=?, phone=?, officephone=?, personalemail=?, officeemail=?, 
      aadharcard=?, pancard=?, dateofjoining=?, dateofbirth=?, orgname=?, 
      orgcode=?, branchaccess=?, profilephoto=COALESCE(?, profilephoto), 
      idproof=COALESCE(?, idproof), password=?, role=?, department=?, createdby=?
     WHERE username=?`,
        [
          newUsername,
          fullname,
          phone,
          officephone,
          personalemail,
          officeemail,
          aadharcard,
          pancard,
          dateofjoining,
          dateofbirth,
          orgname,
          orgcode,
          branchaccess,
          profilephoto,
          idproof,
          password,
          role,
          department,
          createdby,
          usernameofuser,
        ]
      );
      res
        .status(200)
        .json({ message: "Updated existing KYC data.", data: newUsername });
    } else {
      // Insert new
      await connection.execute(
        `INSERT INTO userkyctable (
      fullname, username, phone, officephone, personalemail, officeemail, 
      aadharcard, pancard, dateofjoining, dateofbirth, orgname, orgcode, 
      branchaccess, profilephoto, idproof, password, role, department, createdby, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          fullname,
          usernameofuser,
          phone,
          officephone,
          personalemail,
          officeemail,
          aadharcard,
          pancard,
          dateofjoining,
          dateofbirth,
          orgname,
          orgcode,
          branchaccess,
          profilephoto,
          idproof,
          password,
          role,
          department,
          createdby,
        ]
      );
      res.status(201).json({ message: "Inserted new KYC data." });
    }
  } catch (err) {
    console.error("KYC Upload Error:", err);
    res.status(500).json({
      error: "Failed to upload KYC data.",
      details: err.message,
    });
  }
};

export const getKYCData = async (req, res) => {
  const { username, orgname, orgcode } = req.query;

  if (!username || !orgname || !orgcode) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters" });
  }

  try {
    const [rows] = await connection.query(
      `SELECT fullname, phone, officephone, personalemail, officeemail, dateofbirth,
              dateofjoining, aadharcard, pancard, profilephoto, idproof, department,
              role, createdby, password
       FROM userkyctable
       WHERE username = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No KYC data found for this user" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching KYC data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getKYCImage = async (req, res) => {
  const { username, orgname, orgcode, type } = req.query;

  try {
    // Determine which column to query based on type parameter
    const column = type === "idproof" ? "idproof" : "profilephoto";

    const [rows] = await connection.query(
      `SELECT ${column} FROM userkyctable WHERE username = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    if (rows.length === 0 || !rows[0][column]) {
      return res.status(404).json({
        message: `${type === "idproof" ? "ID proof" : "Profile image"} not found`,
      });
    }

    const imagePath = path.join(__dirname, "..", rows[0][column]);
    return res.sendFile(imagePath);
  } catch (err) {
    console.error(
      `Error fetching ${type === "idproof" ? "ID proof" : "profile image"}:`,
      err
    );
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUniqueID = async (orgcode, orgname, department) => {
  try {
    const query = `
         WITH numbers AS (
            SELECT DISTINCT 
              CAST(REGEXP_SUBSTR(SUBSTRING_INDEX(username, '@', 1), '[0-9]+$') AS UNSIGNED) AS num
            FROM userkyctable
            WHERE department = ? 
              AND orgname = ? 
              AND orgcode = ?
              AND IsDeleted = 0
              AND REGEXP_SUBSTR(SUBSTRING_INDEX(username, '@', 1), '[0-9]+$') IS NOT NULL
          ),
          gaps AS (
            SELECT 1 AS candidate
            WHERE NOT EXISTS (SELECT 1 FROM numbers WHERE num = 1)
            UNION ALL
            SELECT num + 1
            FROM numbers
            WHERE NOT EXISTS (SELECT 1 FROM numbers n2 WHERE n2.num = numbers.num + 1)
          )
          SELECT MIN(candidate) AS missing_number
          FROM gaps;
    `;

    const [rows] = await connection.execute(query, [
      department,
      orgname,
      orgcode,
    ]);
    return rows[0]?.missing_number || 1;
  } catch (error) {
    console.error("error in getUniqueID:", error);
    throw error;
  }
};
