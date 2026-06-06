import { connectMySQL } from "../config/sqlconfig.js";
import nodemailer from "nodemailer";
import cron from "node-cron";
const uniquevalue = "ImpJobButton";
import path from "path";
import fs from "fs";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { console } from "inspector";
const UPLOADS_DIR = path.resolve("uploads");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const connection = await connectMySQL();

export const storeJob = async (
  jobDate,
  docReceivedOn,
  transportMode,
  customHouse,
  ownBooking,
  deliveryMode,
  numberOfContainer,
  ownTransportation,
  beType,
  consignmentType,
  cfsName,
  shippingLineName,
  blType,
  bltypenumber,
  jobOwner,
  orgname,
  orgcode,
  // lastIc,
  freedays,
  blstatus,
  benumber,
  shippinglinebond,
  branchname,
  branchcode,
  currentdate,
  typesofContainer,
  dockExecutive,
  OwnTransportFrom,
  OwnTransportTo,
  OwnTransportPickupDate,
  OwnTransportCurrentDate,
  containerNoAndWeight
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    console.log("transport mode API", transportMode);
    const firstletter = transportMode.charAt(0).toUpperCase();
    console.log("Transport mode first letter:", firstletter);
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    let startYearPart, endYearPart;
    if (currentMonth >= 3) {
      startYearPart = currentYear.toString().slice(-2);
      endYearPart = (currentYear + 1).toString().slice(-2);
    } else {
      startYearPart = (currentYear - 1).toString().slice(-2);
      endYearPart = currentYear.toString().slice(-2);
    }
    let yearPart = `${startYearPart}-${endYearPart}`;

    const [lastJobCountRow] = await connection.execute(
      "SELECT COUNT(*) as count FROM approvalimpjob WHERE branchcode = ? AND jobnumber LIKE ? ORDER BY jobdate DESC LIMIT 1",
      [branchcode, `%${yearPart}%`]
    );

    console.log("Last job count:", lastJobCountRow);

    let count;
    if (!lastJobCountRow || lastJobCountRow.length === 0) {
      count = 1; // Start fresh if no previous job count exists for the current year
    } else {
      const lastCount = parseInt(lastJobCountRow[0].count, 10);
      // console.log('Last count found:', lastCount);
      count = isNaN(lastCount) ? 1 : lastCount + 1;
    }

    let jobNumberParts = {};
    let countAppended = false;
    // Default parts if not overridden by admin's configuration
    jobNumberParts["Fiscal Year"] = yearPart;
    jobNumberParts["Air/Sea"] = firstletter;
    console.log["Air/Sea", jobNumberParts["Air/Sea"]];
    jobNumberParts["BranchName"] = branchname;
    console.log("Job number parts:", jobNumberParts["BranchName"]);
    jobNumberParts["Import/Export"] = "I"; // Default value for export
    jobNumberParts["Custom"] = ""; // Default to empty string

    // Loop through the admin-defined format and build the job number dynamically
    rows.forEach((item) => {
      switch (item.columnname) {
        case "Fiscal Year":
          jobNumberParts["Fiscal Year"] = yearPart;
          break;
        case "Air/Sea":
          jobNumberParts["Air/Sea"] = firstletter;
          break;
        case "Import/Export":
          jobNumberParts["Import/Export"] = "I"; // Changed to 'I' for import
          break;
        case "BranchName":
          jobNumberParts["BranchName"] = branchname; // Key matches database
          break;
        case "Custom":
          jobNumberParts["Custom"] = item.inputofcustom || "";
          break;
        case "Job No.": // Changed from 'jobnumber'
          jobNumberParts["Job No."] = `${count}`;
          countAppended = true;
          break;
      }
    });

    // Construct job number dynamically based on the order of columns in `rows`
    let n = 0;
    let jobNumberlatest = rows
      .map((item) => {
        const part = jobNumberParts[item.columnname];
        console.log(`Part ${n + 1}`, part);
        return part ? part.trim() : ""; // Trim whitespace if part is not empty
      })
      .filter((part) => part.length > 0)
      .join("/");

    // If count was not appended as "JobNumber", append it manually at the end
    if (!countAppended) {
      jobNumberlatest += `/${count}`;
    }
    const [result] = await connection.execute(
      `INSERT INTO approvalimpjob 
    (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename,typesofContainer, dockExecutive, bltype, bltypenum,OwnTransportFrom,OwnTransportTo , OwnTransportPickupDate , OwnTransportCurrentDate , containerNoAndWeight,  jobowner, orgcode, orgname, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode, uniquevalue, createdat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ? , ? , ? , ? )`,
      [
        jobNumberlatest,
        jobDate,
        docReceivedOn,
        transportMode,
        customHouse,
        ownBooking,
        deliveryMode,
        numberOfContainer,
        ownTransportation,
        beType,
        consignmentType,
        cfsName,
        shippingLineName,
        typesofContainer,
        dockExecutive,
        blType,
        bltypenumber,
        OwnTransportFrom,
        OwnTransportTo,
        OwnTransportPickupDate || null,
        OwnTransportCurrentDate || null,
        containerNoAndWeight,
        jobOwner,
        orgname,
        orgcode,
        freedays,
        blstatus,
        benumber,
        shippinglinebond,
        count,
        branchname,
        branchcode,
        uniquevalue,
        currentdate,
      ]
    );

    const insertedId = result.insertId;
    const [row] = await connection.execute(
      "SELECT * FROM approvalimpjob WHERE id = ?",
      [insertedId]
    );

    return row;
  } catch (error) {
    console.error("Error while executing SQL query:", error);
  }
};

export const updateJobNumber = async (
  id,
  transportMode,
  count,
  branchname,
  branchcode,
  orgname,
  orgcode,
  jobOwner,
  importerName,
  address,
  gst,
  iec,
  portShipment,
  finalDestination,
  selectedBranch,
  createdat
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ?
    AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );

    // console.log('Rows from customjobnumber:', rows);
    // console.log('Count:', count);

    const firstletter = transportMode.charAt(0).toUpperCase();

    let currentDate = new Date();
    // Get the current month (zero-based index)
    let currentMonth = currentDate.getMonth();
    // Get the current year
    let currentYear = currentDate.getFullYear();

    let startYearPart, endYearPart;

    // Check if the current month is April or later
    if (currentMonth >= 3) {
      // April or later, use the current year as the start year
      startYearPart = currentYear.toString().slice(-2);
      endYearPart = (currentYear + 1).toString().slice(-2);
    } else {
      // Before April, use the previous year as the start year
      startYearPart = (currentYear - 1).toString().slice(-2);
      endYearPart = currentYear.toString().slice(-2);
    }

    // Construct the year range
    let yearPart = `${startYearPart}-${endYearPart}`;

    let jobNumberParts = {};

    // Default values
    jobNumberParts["Fiscal Year"] = yearPart;
    jobNumberParts["Air/Sea"] = firstletter;
    console.log["Air/Sea", jobNumberParts["Air/Sea"]];
    jobNumberParts["BranchName"] = branchname;
    console.log("Job number parts:", jobNumberParts["BranchName"]);
    jobNumberParts["Import/Export"] = "I"; // Default value for export
    jobNumberParts["Custom"] = ""; // Default to empty string

    let countAppended = false;
    // Default to empty string

    rows.forEach((item) => {
      console.log("Column:", item.columnname);
      switch (item.columnname) {
        case "Fiscal Year":
          jobNumberParts["Fiscal Year"] = yearPart;
          break;
        case "Air/Sea":
          jobNumberParts["Air/Sea"] = firstletter;
          break;
        case "Import/Export":
          jobNumberParts["Import/Export"] = "I"; // or 'E' based on your logic
          break;
        case "BranchName":
          jobNumberParts["BranchName"] = branchname;
          break;
        case "Custom":
          jobNumberParts["Custom"] = item.inputofcustom;
          break;
        case "Job No.":
          jobNumberParts["Job No."] = `${count}`;
          countAppended = true;
          break;
        default:
          break;
      }
    });
    let jobNumberlatest = rows
      .map((item) => {
        const part = jobNumberParts[item.columnname];
        // Check if the column is 'Custom' and if its value is not empty
        if (item.columnname === "Custom" && part) {
          return part;
        }
        // For other columns or if 'Custom' is empty, trim whitespace if part is not empty
        return part ? part.trim() : "";
      })
      .filter((part) => part.length > 0)
      .join("/");

    // If count was not appended as "JobNumber", append it manually at the end
    if (!countAppended) {
      jobNumberlatest += `/${count}`;
    }
    // console.log("Job Number Latest:", jobNumberlatest);

    const [row] = await connection.execute(
      `UPDATE approvalimpjob SET jobnumber = ? WHERE id = ?`,
      [jobNumberlatest, id]
    );
    const [jobDaterow] = await connection.execute(
      `SELECT jobdate FROM approvalimpjob WHERE jobnumber = ?`,
      [jobNumberlatest]
    );

    await storeGeneralImportData(
      orgname,
      orgcode,
      jobOwner,
      jobNumberlatest,
      importerName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
      branchname,
      branchcode,
      createdat
    );

    return { jobNumberlatest, jobDaterow };
  } catch (error) {
    console.log(error);
  }
};

export const fetchBranches = async (importerName, orgcode, orgname) => {
  console.log(
    "importerName:",
    importerName,
    "orgcode:",
    orgcode,
    "orgname:",
    orgname
  );

  if (!importerName || !orgcode || !orgname) {
    throw new Error("Missing required parameters");
  }

  try {
    const [rows] = await connection.execute(
      `SELECT branchname, id FROM organizations WHERE clientname = ? AND orgcode = ? AND orgname = ?`,
      [importerName, orgcode, orgname]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrgdata = async (
  clientName,
  branchName,
  orgcode,
  orgname
) => {
  // console.log(clientName, branchName, orgcode, orgname);
  try {
    const [rows] = await connection.execute(
      `SELECT GST, IEC, address FROM organizations WHERE clientname = ? AND orgcode = ? AND branchname = ? AND orgname = ?`,
      [clientName, orgcode, branchName, orgname]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching organization data:", error);
    throw error;
  }
};

export const fetchAllorgdata = async (orgcode, orgname) => {
  try {
    const [rows] = await connection.execute(
      `SELECT clientname FROM organizations WHERE orgcode = ? AND orgname = ?`,
      [orgcode, orgname]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching organization data:", error);
    throw error;
  }
};

export const storeGeneralImportData = async (
  orgname,
  orgcode,
  jobowner,
  jobnumberr,
  importerName,
  address,
  gst,
  iec,
  portShipment,
  finalDestination,
  selectedBranch,
  branchname,
  branchcode,
  createdat
) => {
  console.log(
    orgname,
    orgcode,
    jobowner,
    jobnumberr,
    importerName,
    address,
    gst,
    iec,
    portShipment,
    finalDestination,
    selectedBranch,
    branchname,
    branchcode,
    createdat
  );
  try {
    const [usernames] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND JSON_CONTAINS(uniquevalue, '\"ImpJobButton\"')`,
      [orgname, orgcode, branchname, branchcode]
    );

    const readingarray = [];
    const timeofreadingarray = [];
    const approvername = [];
    for (const user of usernames) {
      readingarray.push({
        employeename: user.employeename,
        read: 0,
        approved: 0,
      });

      timeofreadingarray.push({
        employeename: user.employeename,
        time: null,
      });

      approvername.push({
        employeename: user.employeename,
      });
    }

    const [impnotification] = await connection.execute(
      `INSERT INTO impnotifications 
        (orgname, orgcode, jobnumber, importername, importerbranchname, uniquevalue, createdat, reading, timeofreading, approvername,branchname,branchcode,username)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        orgname,
        orgcode,
        jobnumberr,
        importerName,
        selectedBranch,
        uniquevalue,
        createdat,
        JSON.stringify(readingarray),
        JSON.stringify(timeofreadingarray),
        JSON.stringify(approvername),
        branchname,
        branchcode,
        jobowner,
      ]
    );

    const getusernames = usernames
      .filter((item) => item.uniquevalue[0] === uniquevalue)
      .map((item) => ({
        employeename: item.employeename, // Assuming 'employeename' is the column name
        status: null,
      }));

    const [rows] = await connection.execute(
      `UPDATE approvalimpjob SET importername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, approval = ?, importerbranchname = ? WHERE jobnumber = ? AND branchname = ? AND branchcode = ?`,
      [
        importerName,
        address,
        gst,
        iec,
        portShipment,
        finalDestination,
        getusernames,
        selectedBranch,
        jobnumberr,
        branchname,
        branchcode,
      ]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

export const getClient = async (orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT clientname, id, branchname, address, GST, IEC FROM organizations WHERE orgcode = ? AND IsDeleted = 0`,
      [orgcode]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobData = async (jobnumber) => {
  try {
    const [row] = await connection.execute(
      `SELECT * FROM impjobcreation WHERE jobnumber = ?`,
      [jobnumber]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchallimpjobs = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?",
      [orgname, orgcode, branchname, branchcode]
    );
    return {
      rows,
      // genrows,
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (orgname, orgcode, jobnumber, employeename) => {
  try {
    const timestamp = new Date();

    const [row] = await connection.execute(
      `UPDATE impjobcreation SET IsDeleted = 1 , deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?
`,
      [timestamp, orgname, orgcode, jobnumber]
    );

    const [softdeleted] = await connection.execute(
      `UPDATE approvalimpjob SET IsDeleted = 1 , deletedby = ? , deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [employeename, timestamp, orgname, orgcode, jobnumber]
    );
    const [trackingimport] = await connection.execute(
      `UPDATE trackingimport SET IsDeleted = 1, deletedAt = ?  WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );
    const [collection] = await connection.execute(
      `UPDATE collection SET IsDeleted = 1 ,deletedAt = ?  WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );
    const [transactionhistory] = await connection.execute(
      `UPDATE transactionhistory SET IsDeleted = 1 ,deletedAt = ?  WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );
  } catch (error) {
    console.log(error);
  }
};

export const StoreRemarkOfJobImp = async (
  orgname,
  orgcode,
  jobnumber,
  remark
) => {
  const [row] = await connection.execute(
    `UPDATE approvalimpjob SET remark = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
    [remark, orgname, orgcode, jobnumber]
  );
};

export const fetchingGeneralofJob = async (jobnumber, orgcode, orgname) => {
  try {
    const [row] = await connection.execute(
      `SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    return row[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAliasAndId = async (importerName, branch) => {
  try {
    // Ensure both values are not undefined before executing query
    if (!importerName || !branch) {
      throw new Error("Missing required parameters");
    }

    const [rows] = await connection.execute(
      `SELECT alias, id FROM organizations WHERE clientname = ? AND branchname = ?`,
      [importerName, branch]
    );

    return rows[0] || null; // Return first row or null if not found
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
};

export const saveexe = async (
  formattedData,
  section,
  jobnumber,
  orgcode,
  orgname,
  username,
  branchcodeofemp,
  clientname,
  branchnameofemp
) => {
  try {
    // Step 1: Delete existing records with the same jobnumber
    await connection.query("DELETE FROM importquotation WHERE jobnumber = ?", [
      jobnumber,
    ]);

    await connection.execute(
      "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails, sectionedit) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?,?)",
      [
        orgname,
        orgcode,
        branchnameofemp,
        branchcodeofemp,
        jobnumber,
        clientname,
        username,
        "New Quotation Added",
        section,
      ]
    );

    // Step 2: Check for empty data before inserting
    if (!formattedData || formattedData.length === 0) {
      console.warn("No data to insert.");
      return { message: "No data to insert." };
    }

    const values = formattedData.map((jsonStr) => [
      jsonStr,
      jobnumber,
      orgcode,
      orgname,
    ]);

    const [result] = await connection.query(
      "INSERT INTO importquotation (json_data, jobnumber ,orgcode,orgname) VALUES ?",
      [values]
    );

    return result;
  } catch (error) {
    console.error("Error in saveexe:", error);
    throw error;
  }
};

export const saveexechanges = async (
  formattedData,
  section,
  jobnumber,
  orgcode,
  orgname,
  username,
  branchcodeofemp,
  clientname,
  branchnameofemp
) => {
  try {
    // Step 1: Delete existing records with the same jobnumber
    await connection.query("DELETE FROM importquotation WHERE jobnumber = ?", [
      jobnumber,
    ]);
    // console.log("data in backend", formattedData);
    // Step 2: Insert new data
    const values = formattedData.map((jsonStr) => [
      jsonStr,
      jobnumber,
      orgcode,
      orgname,
    ]);

    await connection.execute(
      "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails, sectionedit) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?,?)",
      [
        orgname,
        orgcode,
        branchnameofemp,
        branchcodeofemp,
        jobnumber,
        clientname,
        username,
        "Quotation Edited",
        section,
      ]
    );
    const [result] = await connection.query(
      "INSERT INTO importquotation (json_data, jobnumber ,orgcode,orgname) VALUES ?",
      [values]
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getexe = async (jobnumber, orgcode, orgname) => {
  try {
    const [result] = await connection.query(
      "SELECT * FROM importquotation WHERE jobnumber = ? AND orgcode = ? AND orgname = ?",
      [jobnumber, orgcode, orgname]
    );

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateGeneral = async (
  importerName,
  address,
  gst,
  iec,
  portShipment,
  finalDestination,
  selectedBranch,
  orgname,
  orgcode,
  jobnumber,
  jobowner,
  branchnameofemp,
  branchcodeofemp,
  section,
  docReceivedOn,
  transportMode,
  customHouse,
  ownBooking,
  deliveryMode,
  numberOfContainer,
  ownTransportation,
  beType,
  consignmentType,
  cfsName,
  shippingLineName,
  blType,
  bltypenumber,
  freedays,
  benumber,
  blstatus,
  shippinglinebond,
  dockExecutive,
  typesofContainer
) => {
  try {
    const [oldRows] = await connection.execute(
      `SELECT * FROM impjobcreation 
       WHERE orgcode = ? AND orgname = ? AND jobnumber = ?`,
      [orgcode, orgname, jobnumber]
    );
    if (oldRows.length === 0) {
      throw new Error("Record not found for update.");
    }
    const oldRecord = oldRows[0];
    console.log(oldRecord);

    const [row] = await connection.execute(
      `
        UPDATE impjobcreation
        SET 
            importername = ?, 
            address = ?, 
            GST = ?, 
            IEC = ?, 
            portofshipment = ?, 
            finaldestination = ?, 
            importerbranchname = ? , 
            docreceivedon = ? , 
            transportmode = ? , 
            customhouse = ? , 
            ownbooking = ? , 
            deliverymode = ? , 
            noofcontainer = ? , 
            owntransportation = ? , 
            betype = ? , 
            consignmenttype = ? , 
            cfsname = ? , 
            shippinglinename = ? , 
            bltype = ? , 
            bltypenum = ?, 
            freedays = ? , 
            benumber = ? ,
            blstatus = ?, 
            shippinglinebond = ? , 
            dockexecutive = ? , 
            typesofcontainer = ?
        WHERE 
            jobnumber = ? AND 
            orgname = ? AND 
            orgcode = ? AND 
            jobowner = ?
      `,
      [
        importerName,
        address,
        gst,
        iec,
        portShipment,
        finalDestination,
        selectedBranch,
        docReceivedOn,
        transportMode,
        customHouse,
        ownBooking,
        deliveryMode,
        numberOfContainer,
        ownTransportation,
        beType,
        consignmentType,
        cfsName,
        shippingLineName,
        blType,
        bltypenumber,
        freedays,
        benumber,
        blstatus,
        shippinglinebond,
        dockExecutive,
        typesofContainer,
        jobnumber,
        orgname,
        orgcode,
        jobowner,
      ]
    );

    const [rowapp] = await connection.execute(
      `
              UPDATE approvalimpjob
              SET importername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, importerbranchname = ? , docreceivedon = ? , transportmode = ? , customhouse = ? , ownbooking = ? , deliverymode = ? , noofcontainer = ? , owntransportation = ? , betype = ? , consignmenttype = ? , cfsname = ? , shippinglinename = ? , bltype = ? , bltypenum = ? , freedays = ? , benumber = ? , shippinglinebond = ? , dockexecutive = ? , typesofcontainer = ?
              WHERE jobnumber = ? AND orgname = ? AND orgcode = ? AND jobowner = ?
          `,
      [
        importerName,
        address,
        gst,
        iec,
        portShipment,
        finalDestination,
        selectedBranch,
        docReceivedOn,
        transportMode,
        customHouse,
        ownBooking,
        deliveryMode,
        numberOfContainer,
        ownTransportation,
        beType,
        consignmentType,
        cfsName,
        shippingLineName,
        blType,
        bltypenumber,
        freedays,
        benumber,
        shippinglinebond,
        dockExecutive,
        typesofContainer,
        jobnumber,
        orgname,
        orgcode,
        jobowner,
      ]
    );

    const fieldsToCheck = [
      { key: "importername", label: "Importer Name", newValue: importerName },
      {
        key: "importerbranchname",
        label: "Branch Name",
        newValue: selectedBranch,
      },
      { key: "address", label: "Address", newValue: address },
      { key: "GST", label: "GST", newValue: gst },
      { key: "IEC", label: "IEC", newValue: iec },
      {
        key: "portofshipment",
        label: "Port of Shipment",
        newValue: portShipment,
      },
      {
        key: "finaldestination",
        label: "Final Destination",
        newValue: finalDestination,
      },
    ];

    // Iterate over each field; if the value has changed, log an individual entry
    for (const field of fieldsToCheck) {
      const oldValue = oldRecord[field.key];
      const newValue = field.newValue;
      const stringifyValue = (val) =>
        val && typeof val === "object" ? JSON.stringify(val) : val;

      const oldValStr = stringifyValue(oldValue);
      const newValStr = stringifyValue(newValue);

      // Only log if the stringified values are different
      if (oldValStr !== newValStr) {
        await connection.execute(
          "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, sectionedit, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)",
          [
            orgname,
            orgcode,
            branchnameofemp,
            branchcodeofemp,
            jobnumber,
            section,
            importerName,
            jobowner,
            `${field.label} changed from ${oldValStr} to ${newValStr}`,
          ]
        );
      }
    }

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentJob = async (
  docReceivedOn,
  transportMode,
  customHouse,
  ownBooking,
  deliveryMode,
  numberOfContainer,
  ownTransportation,
  beType,
  consignmentType,
  cfsName,
  shippingLineName,
  blType,
  bltypenumber,
  blstatus,
  freedays,
  jobnumber,
  benumber,
  shippinglinebond
) => {
  try {
    const [row] = await connection.execute(
      `
        UPDATE impjobcreation
        SET docreceivedon = ?, transportmode = ?, customhouse = ?, ownbooking = ?, deliverymode = ?, noofcontainer = ?, 
            owntransportation = ?, betype = ?, consignmenttype = ?, cfsname = ?, shippinglinename = ?, bltype = ?,
            bltypenum = ?, freedays = ?, blstatus = ?, benumber = ?, shippinglinebond = ?
        WHERE jobnumber = ?
        `,
      [
        docReceivedOn,
        transportMode,
        customHouse,
        ownBooking,
        deliveryMode,
        numberOfContainer,
        ownTransportation,
        beType,
        consignmentType,
        cfsName,
        shippingLineName,
        blType,
        bltypenumber,
        freedays,
        blstatus,
        benumber,
        shippinglinebond,
        jobnumber,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

export const createdatemanually = async (
  orgname,
  orgcode,
  ownbranchname,
  lobname,
  workflowname,
  plandate,
  days,
  hours,
  minutes,
  username,
  jobnumber,
  ownbranchcode,
  clientName
) => {
  try {
    // Calculate TAT (turnaround time) based on days, hours, and minutes
    const tat = `${days} d ${hours} hr ${minutes} min`;

    // Check if there is already a row with the same criteria in the database
    const [rows] = await connection.execute(
      `SELECT plandate, tatimpcolumn FROM trackingimport WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatimpcolumn = ?`,
      [orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]
    );

    // console.log(`Rows found: ${rows.length}`);
    if (rows.length > 0) {
      // If a row exists, update the plandate
      const [row] = await connection.execute(
        `UPDATE trackingimport SET plandate = ? , actualdate = NULL, timedelay = NULL , status = 'Pending' WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatimpcolumn = ? AND clientName = ?`,
        [
          plandate,
          orgname,
          orgcode,
          lobname,
          ownbranchname,
          jobnumber,
          workflowname,
          clientName,
        ]
      );
      // console.log(`Updated plandate for jobnumber: ${jobnumber}`);
    } else {
      // If no row exists, insert a new row with the provided data
      const [row] = await connection.execute(
        `INSERT INTO trackingimport (orgname, orgcode, ownbranchname, lobname, tatimpcolumn, plandate, jobnumber, jobdoneby, tat, ownbranchcode , clientName) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`,
        [
          orgname,
          orgcode,
          ownbranchname,
          lobname,
          workflowname,
          plandate,
          jobnumber,
          username,
          tat,
          ownbranchcode,
          clientName,
        ]
      );
      // console.log(`Inserted new row for jobnumber: ${jobnumber}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const updateDependencyPlanDate = async (orgname, orgcode, ownbranchname, lobname, workflowname, plandate, days, hours, minutes, username, jobnumber, ownbranchcode) => {
//     try {
//         const [row] = await connection.execute(
//             `UPDATE trackingimport SET plandate = ? WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatimpcolumn = ?`,
//             [plandate, orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]
//         );
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getCompletedRowsofthetracking = async (
  orgname,
  orgcode,
  jobnumber
) => {
  try {
    console.log(orgname, orgcode, jobnumber);
    const [rows] = await connection.execute(
      `SELECT * FROM trackingimport WHERE orgname = ? AND orgcode = ? AND  jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedtrackingplandate = async (
  orgname,
  orgcode,
  jobnumber
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM trackingimport WHERE orgname = ? AND orgcode = ?  AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const insertedCompletedTrackingRows = async (
  lobname,
  ownbranchname,
  importername,
  orgname,
  orgcode,
  workflowname,
  status,
  planDate,
  timing,
  timedelay,
  days,
  hours,
  minutes,
  actualDate,
  jobnumber,
  jobdoneby,
  ownbranchcode
) => {
  try {
    // Check if a row already exists with the same jobnumber and workflowname
    const [existingRow] = await connection.execute(
      `SELECT * FROM trackingimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ?`,
      [orgname, orgcode, jobnumber, workflowname]
    );

    if (existingRow.length > 0) {
      // Update the existing record if found
      await connection.execute(
        `UPDATE trackingimport SET plandate = ?, actualdate = ?, timing = ?, timedelay = ?, status = ?, jobdoneby = ?, 
                    tat = ?, lobname = ? 
                WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ?`,
        [
          planDate,
          actualDate,
          timing,
          timedelay,
          status,
          jobdoneby,
          `${days}d ${hours}hr ${minutes}min`,
          lobname,
          orgname,
          orgcode,
          jobnumber,
          workflowname,
        ]
      );
    } else {
      // Insert a new row if no existing record is found
      await connection.execute(
        `INSERT INTO trackingimport (orgname, orgcode, tatimpcolumn, plandate, actualdate, timing,
                    timedelay, status, jobnumber, jobdoneby, tat, lobname, ownbranchname, ownbranchcode, clientname)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orgname,
          orgcode,
          workflowname,
          planDate,
          actualDate,
          timing,
          timedelay,
          status,
          jobnumber,
          jobdoneby,
          `${days}d ${hours}hr ${minutes}min`,
          lobname,
          ownbranchname,
          ownbranchcode,
          importername,
        ]
      );
    }

    // Check if all records for this jobnumber are 'Completed'
    const [statusCheckRows] = await connection.execute(
      `SELECT COUNT(*) AS total, 
              SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed 
       FROM trackingimport 
       WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );

    if (statusCheckRows.length > 0) {
      // Convert total and completed to numbers to ensure strict equality
      const total = Number(statusCheckRows[0].total);
      const completed = Number(statusCheckRows[0].completed);
      console.log(`Total: ${total}, Completed: ${completed}`);

      if (total > 0 && total === completed) {
        const [updateResult] = await connection.execute(
          `UPDATE impjobcreation 
           SET isComplete = 1, isActive = 1 
           WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
          [orgname, orgcode, jobnumber]
        );
        if (updateResult.affectedRows > 0) {
          console.log(
            `Updated impjobcreation: jobnumber ${jobnumber} marked as complete.`
          );
        } else {
          console.log(
            `No rows updated in impjobcreation for jobnumber ${jobnumber}.`
          );
        }
      } else {
        console.log(
          `Not all records are completed for jobnumber ${jobnumber}.`
        );
      }
    }

    // Delete any reminders related to the same jobnumber and workflowname after the update/insert
    await connection.execute(
      `DELETE FROM reminders WHERE orgname = ? AND orgcode = ? AND lobname = ? 
            AND ownbranchname = ? AND jobnumber = ? AND workflowname = ?`,
      [orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]
    );
  } catch (error) {
    console.error("Error in insertedCompletedTrackingRows:", error);
  }
};

export const deleteCompletedRowofImport = async (
  lobname,
  ownbranchname,
  importername,
  orgname,
  orgcode,
  workflowname,
  jobnumber,
  ownbranchcode
) => {
  try {
    const [row] = await connection.execute(
      "UPDATE trackingimport SET status = 'Pending' , actualdate = NULL , timedelay = NULL, remarks = NULL WHERE lobname = ? AND ownbranchname = ? AND clientname = ? AND orgname = ? AND orgcode = ? AND tatimpcolumn = ? AND jobnumber = ? AND ownbranchcode = ?",
      [
        lobname,
        ownbranchname,
        importername,
        orgname,
        orgcode,
        workflowname,
        jobnumber,
        ownbranchcode,
      ]
    );
    if (row.affectedRows > 0) {
      await connection.execute(
        `UPDATE impjobcreation SET isComplete = 0 WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
        [orgname, orgcode, jobnumber]
      );
    }
    // console.log(`Deleted row for jobnumber: ${jobnumber}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateRemarks = async (
  jobnumber,
  orgname,
  orgcode,
  remarks,
  workflowname
) => {
  try {
    console.log("Updating Remarks with Values:", {
      jobnumber,
      orgname,
      orgcode,
      remarks,
      workflowname,
    });

    const [row] = await connection.execute(
      `UPDATE trackingimport SET remarks = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ?`,
      [remarks, orgname, orgcode, jobnumber, workflowname]
    );

    console.log("Update Result:", row);
  } catch (error) {
    console.error("Database Update Error:", error);
  }
};

export const toggleJobActiveStatus = async (
  orgname,
  orgcode,
  branchcode,
  branchname,
  jobnumber,
  IsActive // Use this directly
) => {
  try {
    // Update the IsActive status directly based on the passed value
    await connection.execute(
      `UPDATE impjobcreation SET IsActive = ? WHERE orgname = ? AND orgcode = ? AND branchcode = ? AND branchname = ? AND jobnumber = ?`,
      [IsActive, orgname, orgcode, branchcode, branchname, jobnumber]
    );

    // console.log(`Job status updated to ${IsActive}`);
  } catch (error) {
    console.log(error);
  }
};

export const getJobStatus = async (
  orgname,
  orgcode,
  branchcode,
  branchname,
  jobnumber
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchcode = ? AND branchname = ? AND jobnumber = ?`,
      [orgname, orgcode, branchcode, branchname, jobnumber]
    );

    // console.log(rows);
    if (rows.length === 0) {
      return { IsActive: null }; // Return null if no job found
    }
    // console.log(rows);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchcontainerdetails = async (jobnumber, orgname, orgcode) => {
  // console.log(orgname, orgcode, jobnumber);
  try {
    const [rows] = await connection.execute(
      `SELECT containerNoAndWeight , noofcontainer , typesofContainer , OwnTransportFrom , OwnTransportTo , OwnTransportPickupDate , OwnTransportCurrentDate FROM impjobcreation 
       WHERE jobnumber = ? AND orgname = ? AND orgcode = ?`,
      [jobnumber, orgname, orgcode]
    );
    if (rows.length === 0) {
      const [rows] = await connection.execute(
        `SELECT containerNoAndWeight , noofcontainer , typesofContainer , OwnTransportFrom , OwnTransportTo , OwnTransportPickupDate , OwnTransportCurrentDate FROM expjobcreation 
         WHERE jobnumber = ? AND orgname = ? AND orgcode = ?`,
        [jobnumber, orgname, orgcode]
      );
      return rows[0];
    }

    // console.log(rows); // Log the fetched rows
    return rows[0]; // Return all rows instead of just the first one
  } catch (error) {
    console.error("Error fetching container details:", error);
    throw error;
  }
};

export const documentUpload = async (req) => {
  const {
    type,
    jobnumber,
    orgname,
    orgcode,
    branchname,
    branchcode,
    clientname,
    username,
  } = req.query;

  // Validate required query parameters
  if (
    !type ||
    !jobnumber ||
    !orgname ||
    !orgcode ||
    !branchname ||
    !branchcode ||
    !username
  ) {
    throw new Error("Missing required query parameters.");
  }

  // Validate uploaded files
  if (!req.files || req.files.length === 0) {
    throw new Error("No files uploaded.");
  }

  // Ensure the target directory exists
  const folderPath = path.join(UPLOADS_DIR, type, jobnumber);
  await fs.promises.mkdir(folderPath, { recursive: true });

  // Rename and save files
  const renamedFiles = await Promise.all(
    req.files.map(async (file) => {
      const fileExtension = path.extname(file.originalname);
      const newName =
        req.body.newNames?.[file.fieldname] || file.originalname.split(".")[0];
      const finalName = `${newName}_${jobnumber}${fileExtension}`;
      const fileDestination = path.join(folderPath, finalName); // Full absolute path

      // Move file to correct directory
      await fs.promises.rename(file.path, fileDestination);

      return {
        filename: finalName,
        filelocation: path.relative(UPLOADS_DIR, fileDestination), // Store relative path in DB
      };
    })
  );
  try {
    // Construct values for batch insert
    const values = renamedFiles.map((file) => [
      jobnumber,
      orgname,
      orgcode,
      branchname,
      branchcode,
      clientname,
      file.filename,
      file.filelocation, // Store relative path
      username,
      new Date().toISOString().replace("T", " ").slice(0, 19),
      type,
      "0",
    ]);

    // Log the generated `values`
    console.log("Generated values for SQL insert:", values);

    // Batch insert all rows into the database
    const [result] = await connection.query(
      `INSERT INTO docsupload 
          (jobnumber, orgname, orgcode, branchname, branchcode, clientname, filename, filelocation, uploadedby, uploadedon, type, IsDeleted) 
          VALUES ?`,
      [values]
    );

    let formattedJobNumber = jobnumber.replace(
      /^([^-\n]+)-([^-\n]+)-([^-\n]+)-([^-\n]+-[^-\n]+)-([^-\n]+)$/,
      "$1/$2/$3/$4/$5"
    );
    if (result.affectedRows > 0) {
      for (const row of values) {
        await connection.execute(
          "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
          [
            orgname,
            orgcode,
            branchname,
            branchcode,
            formattedJobNumber,
            clientname,
            username,
            `New Document ${row[6]} uploaded`,
          ]
        );
      }
    }

    // Log the result of the query execution
    console.log("SQL insert result:", result);

    return renamedFiles; // Return the renamed files after successful upload
  } catch (error) {
    console.error("Error inserting files into database:", error.message);
    // throw new Error("Error inserting files into database: " + error.message);
    throw new Error("Error inserting files into database: " + error.message); // ✅ GOOD
  }
};

//fetch all uploaded files for job number
export const fetchUploadedFiles = async (
  jobnumber,
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  console.log("Fetching files with:", {
    jobnumber,
    orgname,
    orgcode,
    branchname,
    branchcode,
  });

  try {
    const [rows] = await connection.execute(
      `SELECT * FROM docsupload WHERE jobnumber = ? AND orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND IsDeleted = 0`,
      [jobnumber, orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

//Renaming uploaded files
export const renameFile = async (
  type,
  jobnumber,
  originalFileName,
  updatedFileName,
  id
) => {
  try {
    // Validate input parameters
    if (!type || !jobnumber || !originalFileName || !updatedFileName || !id) {
      throw new Error("Missing required parameters.");
    }

    // Sanitize inputs
    const sanitizedJobNumber = String(jobnumber).trim();
    const sanitizedOriginalFileName = String(originalFileName).trim();
    const sanitizedUpdatedFileName = `${String(
      updatedFileName
    ).trim()}_${sanitizedJobNumber}.pdf`;

    // Get parent directory
    const parentDir = path.resolve(__dirname, "..");
    const baseUploadDir = path.join(
      parentDir,
      "uploads",
      type,
      sanitizedJobNumber
    );

    // Define original and updated file paths
    const originalFilePath = path.join(
      baseUploadDir,
      sanitizedOriginalFileName
    );
    const updatedFilePath = path.join(baseUploadDir, sanitizedUpdatedFileName);

    // Ensure the original file exists
    if (!fs.existsSync(originalFilePath)) {
      throw new Error(`Original file not found: ${sanitizedOriginalFileName}`);
    }

    // Ensure the new file name doesn't already exist
    if (fs.existsSync(updatedFilePath)) {
      throw new Error(
        `A file with the name ${sanitizedUpdatedFileName} already exists.`
      );
    }

    // Rename the file
    fs.renameSync(originalFilePath, updatedFilePath);

    // Store relative path in the database
    const relativeFilePath = path.join(
      type,
      sanitizedJobNumber,
      sanitizedUpdatedFileName
    );

    // Update database
    const query = `
      UPDATE docsupload 
      SET filename = ?, filelocation = ?
      WHERE filename = ? AND jobnumber = ? AND id = ?`;

    const values = [
      sanitizedUpdatedFileName,
      relativeFilePath,
      sanitizedOriginalFileName,
      sanitizedJobNumber,
      id,
    ];

    // Execute database update
    const result = await connection.execute(query, values);
    console.log("Database update result:", result);

    // If no rows were affected, revert the file rename
    if (result.affectedRows === 0) {
      fs.renameSync(updatedFilePath, originalFilePath);
      throw new Error("Database update failed. File rename reverted.");
    }

    return { message: "File renamed successfully." };
  } catch (error) {
    console.error("Error renaming file:", error.message);
    throw new Error(error.message);
  }
};

export const deleteFile = async (id, remark, username) => {
  try {
    const [result] = await connection.execute(
      ` UPDATE docsupload SET deleteRemark = ?, IsDeleted = 1, deletedby = ?, deletedAt = NOW() WHERE id = ?`,
      [remark, username, id]
    );
    return result;
  } catch (error) {
    console.error("Error deleting file from database:", error);
    throw error; // Throw the error to be caught in the route handler
  }
};

export const getJobEdits = async (jobnumber) => {
  try {
    const [editdata] = await connection.execute(
      `SELECT * FROM editlogs WHERE changesDetails LIKE CONCAT('%', ?, '%') OR editin = ? ORDER BY editedon DESC`,
      [jobnumber, jobnumber]
    );
    console.log(editdata);
    return editdata;
  } catch (error) {
    console.log(error);
  }
};

export const getImpCompletedJobs = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [completedjobs] = await connection.execute(
      `SELECT 
        max_ti.actualdate AS Date, 
        max_ti.jobnumber AS Jobnumber, 
        ijc.importername AS ImporterName,  
        max_ti.timedelay AS TimeDelay
      FROM impjobcreation ijc
      JOIN trackingimport ti ON ijc.jobnumber = ti.jobnumber
      JOIN (
        SELECT t.jobnumber, t.actualdate, t.timedelay
        FROM trackingimport t
        INNER JOIN (
          SELECT jobnumber, MAX(plandate) as max_plan
          FROM trackingimport
          WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
          GROUP BY jobnumber
        ) mp ON t.jobnumber = mp.jobnumber AND t.plandate = mp.max_plan
        WHERE t.timing = "Before"
      ) max_ti ON ijc.jobnumber = max_ti.jobnumber
      WHERE ijc.isComplete = 1 AND ijc.isActive = 1
        AND ti.orgname = ? AND ti.orgcode = ? 
        AND ti.ownbranchname = ? AND ti.ownbranchcode = ?
      GROUP BY max_ti.actualdate, max_ti.jobnumber, ijc.importername, max_ti.timedelay
      ORDER BY max_ti.actualdate DESC, max_ti.jobnumber ASC`,
      [
        orgname,
        orgcode,
        branchname,
        branchcode,
        orgname,
        orgcode,
        branchname,
        branchcode,
      ]
    );

    // console.log("Completed",completedjobs);
    return completedjobs;
  } catch (error) {
    console.error("Error fetching delayed import jobs:", error);
    throw new Error("Database query failed");
  }
};

export const getImpDelayedJobs = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [delayedjobs] = await connection.execute(
      `SELECT 
        max_ti.actualdate AS Date, 
        max_ti.jobnumber AS Jobnumber, 
        ijc.importername AS ImporterName, 
        SUM(CASE WHEN ti.timing = "After" THEN 1 ELSE 0 END) AS NoOfDelayedMilestones
      FROM impjobcreation ijc
      JOIN trackingimport ti ON ijc.jobnumber = ti.jobnumber
      JOIN (
        SELECT t.jobnumber, t.actualdate, t.timedelay
        FROM trackingimport t
        INNER JOIN (
          SELECT jobnumber, MAX(plandate) as max_plan
          FROM trackingimport
          WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
          GROUP BY jobnumber
        ) mp ON t.jobnumber = mp.jobnumber AND t.plandate = mp.max_plan
        WHERE t.timing = "After"
      ) max_ti ON ijc.jobnumber = max_ti.jobnumber
      WHERE ijc.isComplete = 1 AND ijc.isActive = 1
        AND ti.orgname = ? AND ti.orgcode = ? 
        AND ti.ownbranchname = ? AND ti.ownbranchcode = ?
      GROUP BY max_ti.actualdate, max_ti.jobnumber, ijc.importername
      ORDER BY max_ti.actualdate DESC, max_ti.jobnumber ASC`,
      [
        orgname,
        orgcode,
        branchname,
        branchcode,
        orgname,
        orgcode,
        branchname,
        branchcode,
      ]
    );
    console.log("Delayed", delayedjobs);
    return delayedjobs;
  } catch (error) {
    console.error("Error fetching delayed import jobs:", error);
    throw new Error("Database query failed");
  }
};

export const getImpDelayedJobDetails = async (
  jobnumber,
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [milestoneDetails] = await connection.execute(
      `SELECT
        ti.tatimpcolumn AS MilestoneName,
        ti.plandate AS PlanDate,
        ti.actualdate AS ActualDate,
        ti.timedelay AS TimeDelay,
        ti.remarks AS Remarks
      FROM trackingimport ti
      WHERE ti.jobnumber = ?

        AND ti.timing = "After"
        AND ti.orgname = ?
        AND ti.orgcode = ?
        AND ti.ownbranchname = ?
        AND ti.ownbranchcode = ?
      ORDER BY ti.plandate ASC`,
      [jobnumber, orgname, orgcode, branchname, branchcode]
    );
    console.log("Delayed Job Milestone Details: ", milestoneDetails);
    return milestoneDetails;
  } catch (error) {
    console.error("Error fetching delayed job milestone details:", error);
    throw new Error("Database query failed");
  }
};

export const getImpDelayedMilestones = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [delayedMilestones] = await connection.execute(
      `SELECT 
        ti.actualdate AS Date,
        ti.jobnumber AS JobNumber,
        ijc.importername AS ImporterName,
        ti.tatimpcolumn AS MilestoneName,
        ti.timing AS Timing,
        ti.remarks AS Remarks
       FROM trackingimport ti
       JOIN impjobcreation ijc ON ti.jobnumber = ijc.jobnumber
       WHERE ti.timing = "After" 
       AND ti.status = 'completed'
       AND ijc.isComplete = 0 
       AND ijc.isActive = 0
       AND ti.orgname = ?
       AND ti.orgcode = ?
       AND ti.ownbranchname = ?
       AND ti.ownbranchcode = ?
       ORDER BY ti.actualdate DESC, ti.jobnumber ASC`,
      [orgname, orgcode, branchname, branchcode]
    );
    console.log("Delayed Milestones: ", delayedMilestones);
    return delayedMilestones;
  } catch (error) {
    console.error("Error fetching delayed import milestones:", error);
    throw new Error("Database query failed");
  }
};
