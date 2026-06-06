import e from "express";
import { connectMySQL } from "../config/sqlconfig.js";
import { broadcast } from "../websocketServer.js";
const connection = await connectMySQL();
import moment from "moment";

export const getApproverOfExportJobs = async (
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
    return rows.filter((row) => row.uniquevalue.includes(uniquevalue));
  } catch (error) {
    console.error("Error fetching approvers:", error);
    throw error;
  }
};

export const getExportJob = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvalexpjob WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching export jobs:", error);
    throw error;
  }
};

export const approveExpJob = async (
  jobId,
  GST,
  IEC,
  address,
  benumber,
  betype,
  bltype,
  bltypenum,
  branchcode,
  branchname,
  cfsname,
  consignmenttype,
  customhouse,
  deliverymode,
  finaldestination,
  exportername,
  jobdate,
  jobnumber,
  jobowner,
  noofcontainer,
  orgname,
  orgcode,
  ownbooking,
  owntransportation,
  portofshipment,
  shippinglinename,
  transportmode,
  username,
  status
) => {
  try {
    const [row] = await connection.execute(
      `
            UPDATE approvalexpjob SET address = ?, benumber = ?, betype = ?, bltype = ?, bltypenum = ?, cfsname = ?, consignmenttype = ?, customhouse = ?, deliverymode = ?, finaldestination = ?, noofcontainer = ?, ownbooking = ?, owntransportation = ?, portofshipment = ?, shippinglinename = ?, transportmode = ? WHERE orgname = ? AND orgcode = ? AND id = ? AND branchname = ? AND branchcode = ? AND jobnumber = ?
        `,
      [
        address,
        benumber,
        betype,
        bltype,
        bltypenum,
        cfsname,
        consignmenttype,
        customhouse,
        deliverymode,
        finaldestination,
        noofcontainer,
        ownbooking,
        owntransportation,
        portofshipment,
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
      `SELECT approval FROM approvalexpjob WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );

    const approval = approvalrow[0].approval;
    const updatedApproval = approval.map((item) => {
      if (item.employeename === username) {
        item.status = status;
      }
      return item;
    });

    const [updateRow] = await connection.execute(
      `UPDATE approvalexpjob SET approval = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [JSON.stringify(updatedApproval), orgname, orgcode, jobnumber]
    );

    const [approvalrownotification] = await connection.execute(
      `SELECT * FROM expnotifications WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, jobnumber, branchname, branchcode]
    );

    if (approvalrownotification.length === 0) {
      throw new Error("No matching record found.");
    }
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const tobeupdated = approvalrownotification[0];

    const updatingarray = tobeupdated.reading.map((row) => {
      if (row.employeename === username) {
        return { ...row, approved: status === "Approve" ? 1 : -1, read: 1 };
      }
      return row;
    });

    const updatedTime = tobeupdated.timeofreading.map((row) => {
      if (row.employeename === username) {
        return { ...row, time: currentTime };
      }
      return row;
    });

    await connection.execute(
      `UPDATE expnotifications SET reading = ?, timeofreading = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND jobnumber = ? AND branchcode = ?`,
      [
        JSON.stringify(updatingarray),
        JSON.stringify(updatedTime),
        orgname,
        orgcode,
        branchname,
        jobnumber,
        branchcode,
      ]
    );

    return row;
  } catch (error) {
    console.error("Error approving export job:", error);
    throw error;
  }
};

export const ApprovalExportJobMainLogic = async (
  orgname,
  orgcode,
  uniquevalue
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvalexpjob WHERE orgname = ? AND orgcode = ? AND Isdeleted = 0`,
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

    const matchingRows = lengthrows.filter((row) =>
      row.uniquevalue.includes(uniquevalue)
    );
    const matchingRows2 = mattrows.filter(
      (row) => row.uniquevalue[0] === uniquevalue
    );

    const approvedJobs = rows.filter((row) => {
      if (!row.approval || row.approval.length === 0) {
        return true; // Return true to insert the job without approval
      }

      if (row.approval !== null) {
        //     if (matchingRows2[0].selectedcount > 0) {
        //         const approvals = JSON.stringify(row.approval);
        //         const approvalrow = JSON.parse(approvals);
        //         const approvedCount = approvalrow.filter(item => item.status === 'Approve').length;
        //         return approvedCount === matchingRows2[0].selectedcount;
        //     } else if (row.approval.length === matchingRows.length) {
        //         const approvals = JSON.stringify(row.approval);
        //         const approvalrow = JSON.parse(approvals);
        //         return approvalrow.every((item) => item.status === 'Approve');
        //     }
        // }
        const approvalArray = Array.isArray(row.approval)
          ? row.approval
          : JSON.parse(row.approval); // Parse only if it's a JSON string
        const selectedCount = matchingRows2[0]?.selectedcount || 0;
        if (selectedCount > 0) {
          const approvedCount = approvalArray.filter(
            (item) => item.status === "Approve"
          ).length;
          const isAllApproved = approvedCount >= selectedCount;
          return isAllApproved;
        }
      }
      return false;
    });

    for (const job of approvedJobs) {
      const [existingJob] = await connection.execute(
        `SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND jobnumber = ? `,
        [orgname, orgcode, job.jobnumber]
      );
      if (existingJob.length === 0) {
        const [insertresult] = await connection.execute(
          `INSERT INTO expjobcreation 
                        (jobnumber, jobdate, docreceivedon, transportmode, customhouse,
                        ownbooking, deliverymode, noofcontainer, owntransportation, betype, 
                        consignmenttype, cfsname, shippinglinename, bltype, bltypenum, 
                        typesofContainer, dockExecutive, OwnTransportFrom, OwnTransportTo, 
                        OwnTransportPickupDate, OwnTransportCurrentDate, containerNoAndWeight, 
                        orgname, orgcode, jobowner, benumber, count, exportername,exporterbranchname, address, 
                        GST, IEC, finaldestination, portofshipment, branchname, branchcode)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? ,? ,?)`,
          [
            job.jobnumber,
            job.jobdate,
            job.docreceivedon,
            job.transportmode,
            job.customhouse,
            job.ownbooking,
            job.deliverymode,
            job.noofcontainer,
            job.owntransportation,
            job.betype,
            job.consignmenttype,
            job.cfsname,
            job.shippinglinename,
            job.bltype,
            job.bltypenum,
            job.typesofContainer,
            job.dockExecutive,
            job.OwnTransportFrom,
            job.OwnTransportTo,
            job.OwnTransportPickupDate,
            job.OwnTransportCurrentDate,
            job.containerNoAndWeight,
            orgname,
            orgcode,
            job.jobowner,
            job.benumber,
            job.count,
            job.exportername,
            job.importerbranchname,
            job.address,
            job.GST,
            job.IEC,
            job.finaldestination,
            job.portofshipment,
            job.branchname,
            job.branchcode,
          ]
        );

        if (insertresult.affectedRows > 0) {
          console.log("Job created successfully.");
          // Only insert into editlog if the job was successfully created
          await connection.execute(
            "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
            [
              orgname,
              orgcode,
              job.branchname,
              job.branchcode,
              "Export",
              job.exportername,
              job.jobowner,
              "New Export Job " + job.jobnumber + " created",
            ]
          );
        }

        const [employees] = await connection.execute(
          `SELECT * FROM userkyctable WHERE orgname = ? AND orgcode = ? And IsDeleted = 0`,
          [orgname, orgcode]
        );

        employees.forEach((employee) => {
          broadcast({
            username: employee.username,
            type: "new_job",
            message: `A new export job ${job.jobnumber} has been added.`,
          });
        });
      }
    }

    return approvedJobs;
  } catch (error) {
    console.error("Error in approval export job logic:", error);
    throw error;
  }
};

export const getAllJobsOfExp = async (orgname, orgcode, branchname) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ?`,
      [orgname, orgcode, branchname]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching all export jobs:", error);
    throw error;
  }
};
