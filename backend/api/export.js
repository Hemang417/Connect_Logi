import { connectMySQL } from "../config/sqlconfig.js";
const uniquevalue = "ExpJobButton";

const connection = await connectMySQL();

// export const storeExportJob = async (jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, lastIc, freedays, blstatus, benumber, shippinglinebond, branchname, branchcode, currentdate) => {
//     try {
//         const firstletter = transportMode.charAt(0).toUpperCase();

//         let currentDate = new Date();
//         let currentMonth = currentDate.getMonth();
//         let currentYear = currentDate.getFullYear();

//         let startYearPart, endYearPart;
//         let count;

//         if (currentMonth >= 3) {
//             startYearPart = currentYear.toString().slice(-2);
//             endYearPart = (currentYear + 1).toString().slice(-2);
//         }
//         let yearPart = `${startYearPart}-${endYearPart}`;
//         const [lastYearRow] = await connection.execute('SELECT jobnumber FROM approvalexpjob WHERE branchcode = ? ORDER BY id DESC LIMIT 1', [branchcode]);

//         if (!lastYearRow || lastYearRow.length === 0) {
//             count = 1;
//         } else {
//             if (currentMonth === 3) {
//                 if (lastYearRow[0].jobnumber.slice(-5) !== yearPart) {
//                     count = 1;
//                 } else {
//                     const [lastCountRow] = await connection.execute('SELECT MAX(count) AS maxCount FROM approvalexpjob WHERE branchcode = ?', [branchcode]);
//                     const maxCount = lastCountRow[0].maxCount || 0;

//                     // Increment the count for the new job
//                     count = parseInt(maxCount) + 1;
//                 }
//             } else {
//                 const [lastCountRow] = await connection.execute('SELECT MAX(count) AS maxCount FROM approvalexpjob WHERE branchcode = ?', [branchcode]);
//                 const maxCount = lastCountRow[0].maxCount || 0;

//                 // Increment the count for the new job
//                 count = parseInt(maxCount) + 1;
//             }
//         }

//         let jobNumber = `${firstletter}/E/${yearPart}`;

//         const [result] = await connection.execute(`INSERT INTO approvalexpjob
//         (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, bltype, bltypenum, jobowner, orgcode, orgname, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode, uniquevalue, createdat)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [jobNumber, jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType || null, bltypenumber || null, jobOwner, orgname, orgcode, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode, uniquevalue, currentdate]);

//         const insertedId = result.insertId;

//         const [row] = await connection.execute('SELECT * FROM approvalexpjob WHERE id = ?', [insertedId]);

//         return row;

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const storeExportJob = async (jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, lastIc, freedays, blstatus, benumber, shippinglinebond, branchname, branchcode, currentdate) => {
//     try {
//         const firstletter = transportMode.charAt(0).toUpperCase();
//         let currentDate = new Date();
//         let currentMonth = currentDate.getMonth();
//         let currentYear = currentDate.getFullYear();

//         let startYearPart, endYearPart;

//         if (currentMonth >= 3) {
//             startYearPart = currentYear.toString().slice(-2);
//             endYearPart = (currentYear + 1).toString().slice(-2);
//         } else {
//             startYearPart = (currentYear - 1).toString().slice(-2);
//             endYearPart = currentYear.toString().slice(-2);
//         }

//         let yearPart = `${startYearPart}-${endYearPart}`;

//         // Fetch the last job number for the current branch and year part
//         const [lastJobRow] = await connection.execute(
//             'SELECT jobnumber FROM approvalexpjob WHERE branchcode = ? AND jobnumber LIKE ? ORDER BY id DESC LIMIT 1',
//             [branchcode, `%/${yearPart}%`]
//         );

//         let count;
//         if (!lastJobRow || lastJobRow.length === 0) {
//             count = 1; // Start fresh if no previous job number exists for the current year
//         } else {
//             const lastJobNumber = lastJobRow[0].jobnumber;
//             const lastCount = parseInt(lastJobNumber.split('/').pop()); // Extract the last count
//             count = isNaN(lastCount) ? 1 : lastCount + 1; // Increment the count for the new job
//         }

//         let jobNumber = `${firstletter}/I/${yearPart}/${count}`;

//         const [result] = await connection.execute(`INSERT INTO approvalexpjob
//         (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, bltype, bltypenum, jobowner, orgcode, orgname, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode, uniquevalue, createdat)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [jobNumber, jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode, uniquevalue, currentdate]);

//         const insertedId = result.insertId;
//         const [row] = await connection.execute('SELECT * FROM approvalexpjob WHERE id = ?', [insertedId]);

//         return row;

//     } catch (error) {
//         console.log(error);
//     }
// };

export const storeExportJob = async (
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
  benumber,
  branchname,
  branchcode,
  currentdate,
  typesofContainer,
  dockExecutive,
  OwnTransportFrom,
  OwnTransportTo,
  OwnTransportPickupDate,
  OwnTransportCurrentDate,
  containerNoAndWeight,
  exporterName
  // username,  // Ensure username is passed
) => {
  console.log(
    "data in backend function ",
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
    benumber,
    branchname,
    branchcode,
    currentdate,
    typesofContainer,
    dockExecutive,
    OwnTransportFrom,
    OwnTransportTo,
    OwnTransportPickupDate,
    OwnTransportCurrentDate,
    containerNoAndWeight,
    exporterName
  );
  try {
    // Fetch the job format from the customjobnumber table
    // const [rows] = await connection.execute(
    //   `SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
    //   [orgname, orgcode, branchname, branchcode]
    // );

    const [rows] = await connection.execute(
      `SELECT * FROM customjobnumber 
       WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?
       ORDER BY id ASC`,
      [orgname, orgcode, branchname, branchcode]
    );

    const firstletter = transportMode.charAt(0).toUpperCase();
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
      "SELECT count FROM approvalexpjob WHERE branchcode = ? AND jobnumber LIKE ? ORDER BY jobdate DESC LIMIT 1",
      [branchcode, `%/${yearPart}%`]
    );

    let count = parseInt(lastJobCountRow?.[0]?.count || 0, 10) + 1;

    let jobNumberParts = {
      "Fiscal Year": yearPart,
      "Air/Sea": firstletter,
      BranchName: branchname,
      "Import/Export": "E",
      Custom: "",
      "Job No.": "", // <-- updated key
    };

    let countAppended = false;
    console.log("Rows from customjobnumber:", rows);
    
  rows.forEach((item) => {
  console.log("Column:", item.columnname, "| Length:", item.columnname.length);
  console.log("Char codes:", [...item.columnname].map(c => c.charCodeAt(0)).join(","));

  if (item.columnname === "Custom") {
    jobNumberParts["Custom"] = item.inputofcustom || "";
  }

  if (item.columnname === "Job No.") {
    console.log("job no part executed");
    jobNumberParts["Job No."] = `${count}`;
    countAppended = true;
  }
});

    
    let jobNumberlatest = rows
    .map((item) => jobNumberParts[item.columnname]?.trim() || "")
    .filter((part) => part.length > 0)
    .join("/");
    
    if (!countAppended) {
      console.log("unwanted job no part executed")
      jobNumberlatest += `/${count}`;
    }

    const [result] = await connection.execute(
      `INSERT INTO approvalexpjob 
            (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, typesofContainer, dockExecutive, OwnTransportFrom, OwnTransportTo, OwnTransportPickupDate, OwnTransportCurrentDate, containerNoAndWeight, bltype, bltypenum, jobowner, orgcode, orgname, benumber, count, branchname, branchcode, uniquevalue, createdat , exportername)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ? , NOW() , ?)`,
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
        OwnTransportFrom,
        OwnTransportTo,
        OwnTransportPickupDate || null,
        OwnTransportCurrentDate || null,
        containerNoAndWeight,
        blType,
        bltypenumber,
        jobOwner,
        orgname,
        orgcode,
        benumber,
        count,
        branchname,
        branchcode,
        uniquevalue,
        exporterName,
      ]
    );

    const insertedId = result.insertId;
    const [row] = await connection.execute(
      "SELECT * FROM approvalexpjob WHERE id = ?",
      [insertedId]
    );

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const storeGeneralExportData = async (
  exporterName,
  address,
  gst,
  iec,
  portShipment,
  finalDestination,
  selectedBranch,
  orgname,
  orgcode,
  jobowner,
  jobnumber,
  branchname,
  branchcode,
  createdat
) => {
  try {
    // const [usernames] = await connection.execute(
    //     `SELECT * employeename FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
    //     [orgname, orgcode, branchname, branchcode]
    // );

    // // Ensure no duplicates
    // const readingarray = usernames.map(user => ({
    //     employeename: user.employeename,
    //     read: 0,
    //     approved: 0
    // }));

    // const timeofreadingarray = usernames.map(user => ({
    //     employeename: user.employeename,
    //     time: null
    // }));

    // const approvername = usernames.map(user => ({
    //     employeename: user.employeename
    // }));

    // const uniquevalue = 'JobsButton'; // Define how to generate a unique value

    // const [impnotification] = await connection.execute(
    //     `INSERT INTO impnotifications (orgname, orgcode, jobnumber, exportername, importerbranchname, uniquevalue, createdat, reading, timeofreading, approvername, branchname, branchcode, username)
    //      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //         orgname, orgcode, jobnumber, exportername, selectedBranch, uniquevalue, createdat,
    //         JSON.stringify(readingarray), JSON.stringify(timeofreadingarray), JSON.stringify(approvername),
    //         branchname, branchcode, jobowner
    //     ]
    // );

    // const [row] = await connection.execute(
    //     `INSERT INTO expgeneral (orgname, orgcode, jobowner, jobnumber, exportername, address, gst, iec, portofshipment, finaldestination, branchname, branchnameofjob, branchcodeofjob)
    //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [orgname, orgcode, jobowner, jobnumber, exporterName, address, gst, iec, portShipment, finalDestination, selectedBranch, branchname, branchcode]
    // );
    const [usernames] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND JSON_CONTAINS(uniquevalue, '\"ExpJobButton\"')`,
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

    const [expnotification] = await connection.execute(
      `INSERT INTO expnotifications 
        (orgname, orgcode, jobnumber, exportername, importerbranchname, uniquevalue, createdat, reading, timeofreading, approvername,branchname,branchcode,username)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        orgname,
        orgcode,
        jobnumber,
        exporterName,
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
      `UPDATE approvalexpjob SET exportername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, approval = ?, importerbranchname = ? WHERE jobnumber = ? AND branchname = ? AND branchcode = ?`,
      [
        exporterName,
        address,
        gst,
        iec,
        portShipment,
        finalDestination,
        getusernames,
        selectedBranch,
        jobnumber,
        branchname,
        branchcode,
      ]
    );

    // const getusernames = usernames
    //     .filter(item => item.uniquevalue === uniquevalue)
    //     .map(item => ({
    //         employeename: item.employeename,  // Assuming 'employeename' is the column name
    //         status: null
    //     }));
    //     console.log(getusernames);
    // const [row] = await connection.execute(
    //     `UPDATE approvalimpjob SET exportername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, approval = ?, importerbranchname = ? WHERE jobnumber = ? AND branchname = ? AND branchcode = ?`,
    //     [
    //         exportername, address, gst, iec, portShipment, finalDestination, JSON.stringify(getusernames),
    //         selectedBranch, jobnumber, branchname, branchcode
    //     ]
    // );

    // const [emailofbranch] = await connection.execute(`SELECT email FROM organizations WHERE orgname = ? AND orgcode = ? AND branchname = ? AND id = ?`, [orgname, orgcode, selectedBranch, id]);
    // const [emailofcontacts] = await connection.execute(`SELECT email from contacts WHERE orgname = ? AND orgcode = ? AND branchname = ? AND clientname = ? AND bid = ?`, [orgname, orgcode, selectedBranch, exportername, id])

    // const allEmails = [...emailofbranch.map(item => item.email), ...emailofcontacts.map(item => item.email)];

    // Loop through the combined email addresses and send emails
    // allEmails.forEach(email => {
    //     const mailOptions = {
    //         from: 'shreyashpingle752@gmail.com',
    //         to: email,
    //         subject: 'Connect Logi',
    //         html: `Hello your mail is here` // Add your HTML content here
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log('Error sending email:', error);
    //         } else {
    //             console.log('Email sent successfully:', info.response);
    //         }
    //     });
    // });

    // const [contactofbranch] = await connection.execute(`SELECT phone FROM organizations WHERE orgname = ? AND orgcode = ? AND branchname = ? AND id = ?`, [orgname, orgcode, selectedBranch, id]);
    // const [mobileofcontacts] = await connection.execute(`SELECT mobile from contacts WHERE orgname = ? AND orgcode = ? AND branchname = ? AND clientname = ? AND bid = ?`, [orgname, orgcode, selectedBranch, exportername, id]);
    // const allPhoneNumbers = [...contactofbranch.map(item => item.phone), ...mobileofcontacts.map(item => item.mobile)];
    // async function sendWhatsAppMessages(numbers) {
    //     try {
    //         for (const number of numbers) {
    //             const message = await client.messages.create({
    //                 from: 'whatsapp:+14155238886',
    //                 to: `whatsapp:+91${number}`,
    //                 body: 'Hello from Twilio! This is a sandbox environment and we found your contact number',
    //             });
    //             console.log(`Message sent to ${number}:`, message.sid);
    //         }
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // }

    //   // Call the function to send the WhatsApp message
    //   sendWhatsAppMessages(allPhoneNumbers)

    return rows;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error or handle it appropriately
  }
};

export const updateJobNumberExp = async (
  id,
  transportMode,
  count,
  branchname,
  branchcode,
  orgname,
  orgcode,
  jobOwner,
  exporterName,
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

    console.log("Rows from customjobnumber:", rows);
    console.log("Count:", count);

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
    jobNumberParts["BranchName"] = branchname;
    jobNumberParts["Import/Export"] = "E"; // Default value
    jobNumberParts["Custom"] = "";

    let countAppended = false;
    // Default to empty string

    rows.forEach((item) => {
      // console.log("Column:", item.columnname);
      switch (item.columnname) {
        case "Fiscal Year":
          jobNumberParts["Fiscal Year"] = yearPart;
          break;
        case "Air/Sea":
          jobNumberParts["Air/Sea"] = firstletter;
          break;
        case "Import/Export":
          jobNumberParts["Import/Export"] = "E"; // or 'E' based on your logic
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

    //         console.log('Job Number Parts:', jobNumberParts);
    // console.log('Count Appended:', countAppended);

    // Construct job number dynamically based on the order of columns in `rows`
    // let jobNumberlatest = rows.map(item => jobNumberParts[item.columnname]).join('/');
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
    //   console.log('Job Number Latest:', jobNumberlatest);

    // let currentYear = new Date().getFullYear();
    // let currentMonth = new Date().getMonth() - 1; // April (zero-based index)

    // // Determine the year range based on the current month
    // let startYear = currentMonth >= 3 ? currentYear : currentYear - 1;
    // let endYear = startYear + 1;

    // // Extract the last two digits of the years
    // let startYearPart = startYear.toString().slice(-2);
    // let endYearPart = endYear.toString().slice(-2);

    // // Construct the year range
    // let yearPart = `${startYearPart}-${endYearPart}`;

    // let jobNumberlatest = `${firstletter}/I/${count}/${yearPart}`

    const [row] = await connection.execute(
      `UPDATE approvalexpjob SET jobnumber = ? WHERE id = ?`,
      [jobNumberlatest, id]
    );
    const [jobDaterow] = await connection.execute(
      `SELECT jobdate FROM approvalexpjob WHERE jobnumber = ?`,
      [jobNumberlatest]
    );

    await storeGeneralExportData(
      exporterName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
      orgname,
      orgcode,
      jobOwner,
      jobNumberlatest,
      branchname,
      branchcode,
      createdat
    );
    return { jobNumberlatest, jobDaterow };
  } catch (error) {
    console.log(error);
  }
};

export const fetchallexpjobs = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?",
      [orgname, orgcode, branchname, branchcode]
    );
    // const [genrows] = await connection.execute(`SELECT * FROM expgeneral WHERE orgname = ? AND orgcode = ? AND branchnameofjob = ? AND branchcodeofjob = ?`, [orgname, orgcode, branchname, branchcode]);
    return {
      rows,
      // genrows
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchingGeneralofJobExp = async (jobnumber, orgcode, orgname) => {
  try {
    const [row] = await connection.execute(
      `SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    return row[0];
  } catch (error) {
    console.log(error);
  }
};

export const saveexe = async (formattedData) => {
  try {
    const [row] = await connection.query(
      `INSERT INTO importquotation (json_data) VALUES ?`,
      [formattedData] // formattedData = [ [jsonStr1], [jsonStr2], ... ]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBranchesforExpGen = async (
  exporterName,
  orgcode,
  orgname
) => {
  try {
    console.log(exporterName, orgcode, orgname);
    if (exporterName) {
      const [rows] = await connection.execute(
        `SELECT branchname, id FROM organizations WHERE clientname = ? AND orgcode = ? AND orgname = ?`,
        [exporterName, orgcode, orgname]
      );
      return rows;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteJobExp = async (
  orgname,
  orgcode,
  jobnumber,
  employeename
) => {
  try {
    const timestamp = new Date();

    const [row] = await connection.execute(
      `UPDATE expjobcreation SET IsDeleted = 1 , deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );

    const [softdeleted] = await connection.execute(
      `UPDATE approvalexpjob SET IsDeleted = 1 , deletedby = ? , deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [employeename, timestamp, orgname, orgcode, jobnumber]
    );

    const [trackingexport] = await connection.execute(
      `UPDATE trackingexport SET IsDeleted = 1, deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );
    const [collection] = await connection.execute(
      `UPDATE collection SET IsDeleted = 1 ,deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );
    const [transactionhistory] = await connection.execute(
      `UPDATE transactionhistory SET IsDeleted = 1, deletedAt = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [timestamp, orgname, orgcode, jobnumber]
    );
  } catch (error) {
    console.log(error);
  }
};
export const StoreRemarkOfJobExp = async (
  orgname,
  orgcode,
  jobnumber,
  remark
) => {
  const [row] = await connection.execute(
    `UPDATE approvalexpjob SET remark = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
    [remark, orgname, orgcode, jobnumber]
  );
};

export const getAliasAndId = async (exporterName, branch) => {
  try {
    // Ensure both values are not undefined before executing query
    if (!exporterName || !branch) {
      throw new Error("Missing required parameters");
    }

    const [rows] = await connection.execute(
      `SELECT alias, id FROM organizations WHERE clientname = ? AND branchname = ?`,
      [exporterName, branch]
    );

    return rows[0] || null; // Return first row or null if not found
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
};

export const updateGeneralExp = async (
  exporterName,
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
  benumber,
  typesofContainer
) => {
  try {
    await updateCurrentJobExp(
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
      jobnumber,
      benumber,
      typesofContainer
    );
    const [row] = await connection.execute(
      `
            UPDATE expjobcreation
            SET exportername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, exporterbranchname = ?
            WHERE jobnumber = ? AND orgname = ? AND orgcode = ? AND jobowner = ?
        `,
      [
        exporterName,
        address,
        gst,
        iec,
        portShipment,
        finalDestination,
        selectedBranch,
        jobnumber,
        orgname,
        orgcode,
        jobowner,
      ]
    );
    await connection.execute(
      `
            UPDATE approvalexpjob
            SET exportername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, importerbranchname = ?
            WHERE jobnumber = ? AND orgname = ? AND orgcode = ? AND jobowner = ?
        `,
      [
        exporterName,
        address,
        gst,
        iec,
        portShipment,
        finalDestination,
        selectedBranch,
        jobnumber,
        orgname,
        orgcode,
        jobowner,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentJobExp = async (
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
  jobnumber,
  benumber,
  typesofContainer
) => {
  console.log(
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
    jobnumber,
    benumber,
    typesofContainer
  );
  try {
    const [row] = await connection.execute(
      `
        UPDATE expjobcreation
        SET docreceivedon = ?, transportmode = ?, customhouse = ?, ownbooking = ?, deliverymode = ?, noofcontainer = ?, 
            owntransportation = ?, betype = ?, consignmenttype = ?, cfsname = ?, shippinglinename = ?, bltype = ?,
            bltypenum = ?,  benumber = ? , typesofcontainer = ?
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
        benumber,
        typesofContainer,
        jobnumber,
      ]
    );

    await connection.execute(
      `
            UPDATE approvalexpjob
            SET docreceivedon = ?, transportmode = ?, customhouse = ?, ownbooking = ?, deliverymode = ?, noofcontainer = ?, 
                owntransportation = ?, betype = ?, consignmenttype = ?, cfsname = ?, shippinglinename = ?, bltype = ?,
                bltypenum = ?,  benumber = ? , typesofcontainer = ?
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
        benumber,
        typesofContainer,
        jobnumber,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobDataOfExp = async (jobnumber) => {
  try {
    const [row] = await connection.execute(
      `SELECT * FROM expjobcreation WHERE jobnumber = ?`,
      [jobnumber]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const createdatemanuallyForExport = async (
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
      `SELECT plandate, tatexpcolumn, plandate FROM trackingexport WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatexpcolumn = ?`,
      [orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]
    );

    if (rows.length > 0) {
      // If a row exists, update the plandate
      const [row] = await connection.execute(
        `UPDATE trackingexport SET plandate = ? , actualdate =NULL, timedelay = NULL, status = 'Pending' WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatexpcolumn = ? AND clientname = ?`,
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
    } else {
      // If no row exists, insert a new row with the provided data
      const [row] = await connection.execute(
        `INSERT INTO trackingexport (orgname, orgcode, ownbranchname, lobname, tatexpcolumn, plandate, jobnumber, jobdoneby, tat, ownbranchcode , clientname) 
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
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedRowsofthetrackingExp = async (
  orgname,
  orgcode,
  jobnumber
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM trackingexport WHERE orgname = ? AND orgcode = ?  AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

// export const insertedCompletedTrackingRowsExp = async (
//     lobname, ownbranchname, exportername,
//     orgname, orgcode, workflowname, status, planDate,
//     timedelay, days, hours, minutes, actualDate, jobnumber, jobdoneby, ownbranchcode
// ) => {
//     try {

//         const [row] = await connection.execute(
//             `INSERT INTO trackingexport (orgname, orgcode, tatexpcolumn, plandate, actualdate,
//                 timedelay, status, jobnumber, jobdoneby, tat, lobname, ownbranchname, ownbranchcode, clientname)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 orgname,
//                 orgcode,
//                 workflowname,
//                 planDate,
//                 actualDate,
//                 timedelay,
//                 status,
//                 jobnumber,
//                 jobdoneby,
//                 `${days}d ${hours}hr ${minutes}min`,
//                 lobname,
//                 ownbranchname,
//                 ownbranchcode,
//                 exportername
//             ]
//         );

//         const [rowdeleted] = await connection.execute(`DELETE FROM reminders
//             WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND workflowname = ?`,
//             [orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]);

//     } catch (error) {
//         console.log(error);
//     }
// };

export const getCompletedtrackingplandateExp = async (
  orgname,
  orgcode,
  jobnumber
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM trackingexport WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const insertedCompletedTrackingRowsExp = async (
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
      `SELECT * FROM trackingexport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatexpcolumn = ?`,
      [orgname, orgcode, jobnumber, workflowname]
    );

    if (existingRow.length > 0) {
      // Update the existing record if found
      await connection.execute(
        `UPDATE trackingexport SET plandate = ?, actualdate = ?, timing = ?, timedelay = ?, status = ?, jobdoneby = ?, 
                    tat = ?, lobname = ?, ownbranchname = ?, ownbranchcode = ?, clientname = ? 
                WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatexpcolumn = ?`,
        [
          planDate,
          actualDate,
          timing,
          timedelay,
          status,
          jobdoneby,
          `${days}d ${hours}hr ${minutes}min`,
          lobname,
          ownbranchname,
          ownbranchcode,
          importername,
          orgname,
          orgcode,
          jobnumber,
          workflowname,
        ]
      );
    } else {
      // Insert a new row if no existing record is found
      await connection.execute(
        `INSERT INTO trackingexport (orgname, orgcode, tatexpcolumn, plandate, actualdate, 
                    timing, timedelay, status, jobnumber, jobdoneby, tat, lobname, ownbranchname, ownbranchcode, clientname)
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
       FROM trackingexport 
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
          `UPDATE expjobcreation 
           SET isComplete = 1, isActive = 1 
           WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
          [orgname, orgcode, jobnumber]
        );
        if (updateResult.affectedRows > 0) {
          console.log(
            `Updated expjobcreation: jobnumber ${jobnumber} marked as complete.`
          );
        } else {
          console.log(
            `No rows updated in expjobcreation for jobnumber ${jobnumber}.`
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
    console.log(error);
  }
};

export const deleteCompletedRowofImportExp = async (
  lobname,
  ownbranchname,
  exportername,
  orgname,
  orgcode,
  workflowname,
  jobnumber,
  ownbranchcode
) => {
  try {
    const [row] = await connection.execute(
      "UPDATE trackingexport SET status = 'Pending' , actualdate = NULL , timedelay = NULL , remarks = NULL WHERE lobname = ? AND ownbranchname = ? AND clientname = ? AND orgname = ? AND orgcode = ? AND tatexpcolumn = ? AND jobnumber = ? AND ownbranchcode = ?",
      [
        lobname,
        ownbranchname,
        exportername,
        orgname,
        orgcode,
        workflowname,
        jobnumber,
        ownbranchcode,
      ]
    );
    if (row.affectedRows > 0) {
      await connection.execute(
        `UPDATE expjobcreation SET isComplete = 0 WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
        [orgname, orgcode, jobnumber]
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateRemarksExp = async (
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
      `UPDATE trackingexport SET remarks = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatexpcolumn = ?`,
      [remarks, orgname, orgcode, jobnumber, workflowname]
    );

    console.log("Update Result:", row);
  } catch (error) {
    console.error("Database Update Error:", error);
  }
};

export const toggleJobActiveStatusExp = async (
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
      `UPDATE expjobcreation SET IsActive = ? WHERE orgname = ? AND orgcode = ? AND branchcode = ? AND branchname = ? AND jobnumber = ?`,
      [IsActive, orgname, orgcode, branchcode, branchname, jobnumber]
    );

    // console.log(`Job status updated to ${IsActive}`);
  } catch (error) {
    console.log(error);
  }
};

export const getJobStatusExp = async (
  orgname,
  orgcode,
  branchcode,
  branchname,
  jobnumber
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchcode = ? AND branchname = ? AND jobnumber = ?`,
      [orgname, orgcode, branchcode, branchname, jobnumber]
    );

    // console.log(rows);
    if (rows.length === 0) {
      return { IsActive: null }; // Return null if no job found
    }
    //   console.log(rows);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateContainerDetails = async (
  jobnumber,
  orgname,
  orgcode,
  containerDetails,
  OwnTransportFrom,
  OwnTransportTo,
  OwnTransportPickupDate,
  OwnTransportCurrentDate
) => {
  try {
    if (!jobnumber || !orgname || !orgcode) {
      throw new Error("Invalid input parameters");
    }

    // Helper function for updating tables
    const updateTable = async (tableName) => {
      if (!containerDetails || containerDetails.length === 0) {
        return await connection.execute(
          `UPDATE ${tableName} SET OwnTransportFrom = ?, OwnTransportTo = ?, OwnTransportPickupDate = ?, OwnTransportCurrentDate = ? 
             WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
          [
            OwnTransportFrom,
            OwnTransportTo,
            OwnTransportPickupDate,
            OwnTransportCurrentDate,
            orgname,
            orgcode,
            jobnumber,
          ]
        );
      }

      const containerDetailsString = JSON.stringify(containerDetails);
      return await connection.execute(
        `UPDATE ${tableName} SET containerNoAndWeight = ? 
           WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
        [containerDetailsString, orgname, orgcode, jobnumber]
      );
    };

    // Attempt to update expjobcreation table
    const [expResult] = await updateTable("expjobcreation");

    // If no rows affected, try updating impjobcreation
    if (expResult.affectedRows === 0) {
      const [impResult] = await updateTable("impjobcreation");
      return impResult;
    }

    return expResult;
  } catch (error) {
    console.error("Error updating container details:", error);
    throw error; // Propagate error for further handling
  }
};

export const getExpCompletedJobs = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [completedjobs] = await connection.execute(
      `SELECT 
        max_te.actualdate AS Date, 
        max_te.jobnumber AS Jobnumber, 
        ejc.exportername AS ExporterName, 
        max_te.timing AS Timing
      FROM expjobcreation ejc
      JOIN trackingexport te ON ejc.jobnumber = te.jobnumber
      JOIN (
        SELECT t.jobnumber, t.actualdate, t.timing
        FROM trackingexport t
        INNER JOIN (
          SELECT jobnumber, MAX(plandate) as max_plan
          FROM trackingexport
          WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
          GROUP BY jobnumber
        ) mp ON t.jobnumber = mp.jobnumber AND t.plandate = mp.max_plan
        WHERE t.timing = "Before"
      ) max_te ON ejc.jobnumber = max_te.jobnumber
      WHERE ejc.isComplete = 1 AND ejc.isActive = 1
        AND te.orgname = ? AND te.orgcode = ? 
        AND te.ownbranchname = ? AND te.ownbranchcode = ?
      GROUP BY max_te.actualdate, max_te.jobnumber, ejc.exportername, max_te.timing
      ORDER BY max_te.actualdate DESC, max_te.jobnumber ASC`,
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
    console.log("Completed", completedjobs);
    return completedjobs;
  } catch (error) {
    console.error("Error fetching delayed import jobs:", error);
    throw new Error("Database query failed");
  }
};

export const getExpDelayedJobs = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [delayedjobs] = await connection.execute(
      `SELECT 
        max_te.actualdate AS Date, 
        max_te.jobnumber AS Jobnumber, 
        ejc.exportername AS ExporterName, 
        SUM(CASE WHEN te.timing = "After" THEN 1 ELSE 0 END) AS NoOfDelayedMilestones
      FROM expjobcreation ejc
      JOIN trackingexport te ON ejc.jobnumber = te.jobnumber
      JOIN (
        SELECT t.jobnumber, t.actualdate, t.timing
            FROM trackingexport t
        INNER JOIN (
          SELECT jobnumber, MAX(plandate) as max_plan
          FROM trackingexport
          WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND ownbranchcode = ?
          GROUP BY jobnumber
        ) mp ON t.jobnumber = mp.jobnumber AND t.plandate = mp.max_plan
        WHERE t.timing = "After"
      ) max_te ON ejc.jobnumber = max_te.jobnumber
      WHERE ejc.isComplete = 1 AND ejc.isActive = 1
        AND te.orgname = ? AND te.orgcode = ? 
        AND te.ownbranchname = ? AND te.ownbranchcode = ?
      GROUP BY max_te.actualdate, max_te.jobnumber, ejc.exportername
      ORDER BY max_te.actualdate DESC, max_te.jobnumber ASC`,
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

export const getExpDelayedJobDetails = async (
  jobnumber,
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [milestoneDetails] = await connection.execute(
      `SELECT
        te.tatexpcolumn AS MilestoneName,
        te.plandate AS PlanDate,
        te.actualdate AS ActualDate,
        te.timedelay AS TimeDelay,
        te.remarks AS Remarks
      FROM trackingexport te
      WHERE te.jobnumber = ?
        AND te.timedelay > 0
        AND te.orgname = ?
        AND te.orgcode = ?
        AND te.ownbranchname = ?
        AND te.ownbranchcode = ?
      ORDER BY te.plandate ASC`,
      [jobnumber, orgname, orgcode, branchname, branchcode]
    );
    console.log("Delayed Job Milestone Details: ", milestoneDetails);
    return milestoneDetails;
  } catch (error) {
    console.error("Error fetching delayed job milestone details:", error);
    throw new Error("Database query failed");
  }
};

export const getExpDelayedMilestones = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [delayedMilestones] = await connection.execute(
      `SELECT 
        te.actualdate AS Date,
        te.jobnumber AS JobNumber,
        ejc.exportername AS exporterName,
        te.tatexpcolumn AS MilestoneName,
        te.timedelay AS TimeDelay,
        te.remarks AS Remarks
       FROM trackingexport te
       JOIN expjobcreation ejc ON te.jobnumber = ejc.jobnumber
       WHERE te.timedelay > 0 
       AND te.status = 'completed'
       AND ejc.isComplete = 0 
       AND ejc.isActive = 0
       AND te.orgname = ?
       AND te.orgcode = ?
       AND te.ownbranchname = ?
       AND te.ownbranchcode = ?
       ORDER BY te.actualdate DESC, te.jobnumber ASC`,
      [orgname, orgcode, branchname, branchcode]
    );
    // console.log("Delayed Milestones: ", delayedMilestones);
    return delayedMilestones;
  } catch (error) {
    console.error("Error fetching delayed import milestones:", error);
    throw new Error("Database query failed");
  }
};
