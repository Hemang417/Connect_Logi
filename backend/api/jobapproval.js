import { connectMySQL } from "../config/sqlconfig.js";
import { broadcast } from "../websocketServer.js";
const connection = await connectMySQL();
import moment from "moment";
export const getapproverofJobs = async (
  orgname,
  orgcode,
  uniquevalue,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchcode = ?`,
      [orgname, orgcode, branchcode]
    );
    const matchingRows = rows.filter((row) =>
      row.uniquevalue.includes(uniquevalue)
    );
    return matchingRows;
  } catch (error) {
    console.log(error);
  }
};

export const getJob = async (orgname, orgcode, branchname, branchcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvalimpjob WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const approveImpJob = async (
  jobId,
  GST,
  IEC,
  address,
  benumber,
  betype,
  blstatus,
  bltype,
  bltypenum,
  branchcode,
  branchname,
  cfsname,
  consignmenttype,
  customhouse,
  deliverymode,
  finaldestination,
  freedays,
  importername,
  jobdate,
  jobnumber,
  jobowner,
  noofcontainer,
  orgname,
  orgcode,
  ownbooking,
  owntransportation,
  portofshipment,
  shippinglinebond,
  shippinglinename,
  transportmode,
  username,
  status
) => {
  try {
    console.log(status);
    const [row] = await connection.execute(
      `
            UPDATE approvalimpjob 
            SET address = ?, benumber = ?, betype = ?, blstatus = ?, bltype = ?, bltypenum = ?, 
            cfsname = ?, consignmenttype = ?, customhouse = ?, deliverymode = ?, finaldestination = ?, 
            freedays = ?, noofcontainer = ?, 
            ownbooking = ?, owntransportation = ?, portofshipment = ?, 
            shippinglinebond = ?, shippinglinename = ?, transportmode = ?
            WHERE orgname = ? AND orgcode = ? AND id = ? AND branchname = ? AND branchcode = ? AND jobnumber = ?
        `,
      [
        address,
        benumber,
        betype,
        blstatus,
        bltype,
        bltypenum,
        cfsname,
        consignmenttype,
        customhouse,
        deliverymode,
        finaldestination,
        freedays,
        noofcontainer,
        ownbooking,
        owntransportation,
        portofshipment,
        shippinglinebond,
        shippinglinename,
        transportmode,
        orgname,
        orgcode,
        jobId,
        branchname,
        branchcode,
        jobnumber,
      ]
    );

    const [approvalrow] = await connection.execute(
      `SELECT approval FROM approvalimpjob WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );

    const approval = approvalrow[0].approval;
    const updatedApproval = approval.map((item) => {
      if (item.employeename === username) {
        item.status = status;
      }
      return item; // Return the modified item
    });

    const [updateRow] = await connection.execute(
      `UPDATE approvalimpjob SET approval = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [JSON.stringify(updatedApproval), orgname, orgcode, jobnumber]
    );

    const [approvalrownotification] = await connection.execute(
      `SELECT * FROM impnotifications WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, jobnumber, branchname, branchcode]
    );

    if (approvalrownotification.length === 0) {
      throw new Error("No matching record found.");
    }
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const tobeupdated = approvalrownotification[0];

    const updatingarray = await tobeupdated.reading.map((row) => {
      if (row.employeename === username) {
        if (status === "Approve") {
          return { ...row, approved: 1, read: 1 };
        } else if (status === "Reject") {
          return { ...row, approved: -1, read: 1 };
        }
      }
      return row;
    });

    const updatedTime = await tobeupdated.timeofreading.map((row) => {
      if (row.employeename === username) {
        return { ...row, time: currentTime };
      }
      return row; // Return the original object if the condition is not met
    });

    await connection.execute(
      `UPDATE impnotifications SET reading = ?, timeofreading = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND jobnumber = ? AND branchcode = ?`,
      [
        updatingarray,
        updatedTime,
        orgname,
        orgcode,
        branchname,
        jobnumber,
        branchcode,
      ]
    );

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const ApprovalJobMainLogic = async (orgname, orgcode, uniquevalue) => {
  // let connection;
  try {
    // Start a transaction to ensure database consistency
    // connection = await getConnection();
    // await connection.beginTransaction();

    const [rows] = await connection.execute(
      `SELECT * FROM approvalimpjob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 0`,
      [orgname, orgcode]
    );
    
    const [lengthrows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    
    const [mattrows] = await connection.execute(
      `SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );

    // Filter rows based on uniquevalue
    const matchingRows = lengthrows.filter((row) =>
      row.uniquevalue?.includes(uniquevalue)
    );
    
    const matchingRows2 = mattrows.filter(
      (row) => row.uniquevalue?.[0] === uniquevalue
    );

    const approvedJobs = rows.filter((row) => {
      // If no approval required, job is automatically approved
      if (!row.approval || row.approval.length === 0) {
        return true;
      }

      if (row.approval !== null) {
        // Parse approval data safely
        const approvalArray = typeof row.approval === 'string' 
          ? JSON.parse(row.approval) 
          : row.approval;
          
        // Check if matching row exists and has selectedcount
        const selectedCount = matchingRows2[0]?.selectedcount || 0;
        
        if (selectedCount > 0) {
          // Count approved items
          const approvedCount = approvalArray.filter(
            (item) => item.status === "Approve"
          ).length;
          
          // Job is approved if it meets or exceeds required approvals
          return approvedCount >= selectedCount;
        } else if (matchingRows.length > 0) {
          // If no selectedCount but we have matchingRows, check if all approvers approved
          return approvalArray.length === matchingRows.length && 
                 approvalArray.every((item) => item.status === "Approve");
        }
      }
      
      // Default to not approved if conditions aren't met
      return false;
    });

    // Process approved jobs
    const processedJobs = [];
    for (const job of approvedJobs) {
      // Check if job already exists
      const [existingJob] = await connection.execute(
        `SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
        [orgname, orgcode, job.jobnumber]
      );
      
      if (existingJob.length === 0) {
        // Insert the job into impjobcreation
        const [insertResult] = await connection.execute(
          `INSERT INTO impjobcreation (
            jobnumber, jobdate, docreceivedon, transportmode, customhouse, 
            ownbooking, deliverymode, noofcontainer, owntransportation, 
            betype, consignmenttype, cfsname, shippinglinename, bltype, 
            bltypenum, typesofContainer, dockExecutive, OwnTransportFrom, 
            OwnTransportTo, OwnTransportPickupDate, OwnTransportCurrentDate, 
            containerNoAndWeight, orgname, orgcode, jobowner, freedays, 
            blstatus, benumber, shippinglinebond, count, importername, 
            importerbranchname, address, GST, IEC, finaldestination, 
            portofshipment, branchname, branchcode
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            job.jobnumber, job.jobdate, job.docreceivedon, job.transportmode, job.customhouse,
            job.ownbooking, job.deliverymode, job.noofcontainer, job.owntransportation,
            job.betype, job.consignmenttype, job.cfsname, job.shippinglinename, job.bltype,
            job.bltypenum, job.typesofContainer, job.dockExecutive, job.OwnTransportFrom,
            job.OwnTransportTo, job.OwnTransportPickupDate, job.OwnTransportCurrentDate,
            job.containerNoAndWeight, orgname, orgcode, job.jobowner, job.freedays,
            job.blstatus, job.benumber, job.shippinglinebond, job.count, job.importername,
            job.importerbranchname, job.address, job.GST, job.IEC, job.finaldestination,
            job.portofshipment, job.branchname, job.branchcode
          ]
        );

        if (insertResult.affectedRows > 0) {
          processedJobs.push(job);
          
          // Add entry to edit logs
          await connection.execute(
            `INSERT INTO editlogs (
              orgname, orgcode, branchname, branchcode, editedon, 
              editin, clientname, editedby, changesDetails
            ) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)`,
            [
              orgname, orgcode, job.branchname, job.branchcode,
              "Import", job.importername, job.jobowner,
              "New Import Job " + job.jobnumber + " created"
            ]
          );

          // Process workflow with different fallback scenarios
          await processWorkflow(
            connection, 
            orgname, 
            orgcode, 
            job,
            [
              { branch: job.branchname, importer: job.importername, label: "1st stage" }, // Try exact match first
              { branch: "ALL", importer: job.importername, label: "2nd stage" },
              { branch: job.branchname, importer: "ALL", label: "3rd stage" },
              { branch: "ALL", importer: "ALL", label: "4th stage" }
            ]
          );

          // Notify userkyctable about the new job
          const [employees] = await connection.execute(
            `SELECT * FROM userkyctable WHERE orgname = ? AND orgcode = ? And IsDeleted = 0`,
            [orgname, orgcode]
          );

          employees.forEach((employee) => {
            broadcast({
              username: employee.username,
              type: "new_job",
              message: `A new job ${job.jobnumber} has been added.`,
            });
          });
        }
      }
    }
    return processedJobs;
  } catch (error) {
    console.error("Error in ApprovalJobMainLogic:", error);
    throw error;
  }
};

// Helper function to process workflow
async function processWorkflow(connection, orgname, orgcode, job, fallbackParams) {
  // Try each fallback scenario in order
  for (const { branch, importer, label } of fallbackParams) {
    const [workflowRows] = await connection.execute(
      `SELECT * FROM setworkflow WHERE 
        orgname = ? AND 
        orgcode = ? AND 
        lobname = ? AND
        ownbranchname = ? AND 
        importername = ? AND
        (ownbooking = ? OR owntransport = ? OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?)) AND
        created_at < ? AND 
        workflowmilestone = "Job Creation Date"`,
      [
        orgname,
        orgcode,
        `${job.transportmode} IMPORT`,
        branch,
        importer,
        job.ownbooking,
        job.owntransportation,
        JSON.stringify(job.betype),
        JSON.stringify(job.consignmenttype),
        job.jobdate
      ]
    );
    console.log("data: " + workflowRows);
    // If we found matching workflows, process them and stop looking
    if (workflowRows.length > 0) {
      for (const workflow of workflowRows) {
        const plannedDate = new Date(job.jobdate);
        plannedDate.setDate(plannedDate.getDate() + parseInt(workflow.days || 0));
        plannedDate.setHours(plannedDate.getHours() + parseInt(workflow.hours || 0));
        plannedDate.setMinutes(plannedDate.getMinutes() + parseInt(workflow.minutes || 0));

        await connection.execute(
          `INSERT INTO trackingimport (
            tatimpcolumn, plandate, orgname, orgcode, status, jobnumber, 
            jobdoneby, tat, lobname, ownbranchname, ownbranchcode, clientname
          ) VALUES (?, ?, ?, ?, "Pending", ?, ?, ?, ?, ?, ?, ?)`,
          [
            workflow.workflowname,
            plannedDate,
            orgname,
            orgcode,
            job.jobnumber,
            job.jobowner,
            `${workflow.days || 0}d ${workflow.hours || 0}hr ${workflow.minutes || 0}min`,
            `${job.transportmode} IMPORT`,
            job.branchname,
            job.branchcode,
            job.importername
          ]
        );
      }
      break; // Exit the loop since we've found and processed matching workflows
    }
  }
}

export const getAllJobsofImp = async (orgname, orgcode, branchname) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ?`,
      [orgname, orgcode, branchname]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
