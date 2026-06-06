import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const getallthelobdataofbranchandlob = async (
  orgname,
  orgcode,
  lobname,
  ownbranchname
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ?",
      [orgname, orgcode, lobname, ownbranchname]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
export const getallthelobdataofbranchandlobValid = async (
  orgname,
  orgcode,
  lobname,
  ownbranchname,
  jobnumber,
  importername,
  ownbooking,
  owntransportation,
  betype,
  consignmenttype
) => {
  try {
    // First, fetch the job creation date based on jobnumber
    const [jobRows] = await connection.execute(
      "SELECT jobdate FROM impjobcreation WHERE jobnumber = ?",
      [jobnumber]
    );

    if (jobRows.length === 0) {
      throw new Error("Job not found.");
    }

    const jobCreationDate = jobRows[0].jobdate;
    // const currentDate = new Date().toISOString().slice(0, 10);

    // Initial workflow check with all parameters
    const [workflowcheck] = await connection.execute(
      `SELECT importername 
             FROM setworkflow 
             WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? 
             AND importername = ? AND (ownbooking = ? OR owntransport = ? 
             OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?) )
             AND created_at < ? `,
      [
        orgname,
        orgcode,
        lobname,
        ownbranchname,
        importername,
        ownbooking,
        owntransportation,
        JSON.stringify(betype),
        JSON.stringify(consignmenttype),
        jobCreationDate,
      ]
    );
    console.log("1st stage", workflowcheck);

    if (workflowcheck.length === 0) {
      // Fallback checks
      const [workflowRows] = await connection.execute(
        `SELECT * FROM setworkflow 
                WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? 
                AND importername = ? AND (ownbooking = ? OR owntransport = ? 
                OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?)) 
                AND created_at < ?`,
        [
          orgname,
          orgcode,
          lobname,
          "ALL",
          importername,
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );
      console.log("2nd stage", workflowRows);

      if (workflowRows.length > 0) {
        return workflowRows;
      }

      const [workflowRows2] = await connection.execute(
        `SELECT * FROM setworkflow 
                 WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? 
                 AND importername = ? AND (ownbooking = ? OR owntransport = ? 
                 OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?)) 
                 AND created_at < ?`,
        [
          orgname,
          orgcode,
          lobname,
          ownbranchname,
          "ALL",
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );
      console.log("3rd stage", workflowRows2);

      if (workflowRows2.length > 0) {
        return workflowRows2;
      }

      const [workflowRows3] = await connection.execute(
        `SELECT * FROM setworkflow 
                WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? 
                AND importername = ? AND(ownbooking = ? OR owntransport = ? 
                OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?) )
                AND created_at < ?`,
        [
          orgname,
          orgcode,
          lobname,
          "ALL",
          "ALL",
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );

      console.log("4th stage", workflowRows3);
      // if (workflowRows3.length > 0) {
      return workflowRows3;
      // }

      // const [workflowRows4] = await connection.execute(
      //     'SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND importername = ? AND created_at < ?',
      //     [orgname, orgcode, lobname, "ALL", "ALL", jobCreationDate]
      // );
      // console.log("5th stage", workflowRows4);
      // return workflowRows4;
    } else {
      // Return the initial workflow check if found
      const [workflowRows] = await connection.execute(
        `SELECT * FROM setworkflow 
                 WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? 
                 AND importername = ? AND (ownbooking = ? OR owntransport = ? 
                 OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?) )
                 AND created_at < ?`,
        [
          orgname,
          orgcode,
          lobname,
          ownbranchname,
          importername,
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );
      console.log("6th stage", workflowRows);
      return workflowRows;
    }
  } catch (error) {
    console.error("Error in getallthelobdataofbranchandlobValid:", error);
    throw new Error("Failed to retrieve valid workflows.");
  }
};

export const getallthelobdataofbranchandlobValidForExport = async (
  orgname,
  orgcode,
  lobname,
  ownbranchname,
  jobnumber,
  importername,
  ownbooking,
  owntransportation,
  betype,
  consignmenttype
) => {
  try {
    console.log("Exp valid Workflow API called");
    // First, fetch the job creation date based on jobnumber
    const [jobRows] = await connection.execute(
      "SELECT jobdate FROM expjobcreation WHERE jobnumber = ?",
      [jobnumber]
    );
    console.log("jobRows", jobRows);

    if (jobRows.length === 0) {
      throw new Error("Job not found.");
    }

    const jobCreationDate = jobRows[0].jobdate;

    const [workflowcheck] = await connection.execute(
      `SELECT importername FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND importername = ? AND (ownbooking = ? OR owntransport = ? OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?) ) AND created_at < ?`,
      [
        orgname,
        orgcode,
        lobname,
        ownbranchname,
        importername,
        ownbooking,
        owntransportation,
        JSON.stringify(betype),
        JSON.stringify(consignmenttype),
        jobCreationDate,
      ]
    );

    if (workflowcheck.length === 0) {
      const [workflowRows] = await connection.execute(
        "SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND importername = ? AND (ownbooking = ? OR owntransport = ? OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?))  AND created_at < ?",
        [
          orgname,
          orgcode,
          lobname,
          "ALL",
          importername,
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );

      if (workflowRows.length > 0) {
        return workflowRows;
      }

      const [workflowRows2] = await connection.execute(
        "SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND importername = ? AND (ownbooking = ? OR owntransport = ? OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?))  AND created_at < ?",
        [
          orgname,
          orgcode,
          lobname,
          ownbranchname,
          "ALL",
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );

      console.log("2th stage", workflowRows2);

      if (workflowRows2.length > 0) {
        return workflowRows2;
      }

      const [workflowRows3] = await connection.execute(
        "SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND importername = ? AND (ownbooking = ? OR owntransport = ? OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?))  AND created_at < ?",
        [
          orgname,
          orgcode,
          lobname,
          "ALL",
          "ALL",
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );
      console.log("5th stage", workflowRows3);

      return workflowRows3;
    } else {
      const [workflowRows] = await connection.execute(
        "SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND importername = ? AND  (ownbooking = ? OR owntransport = ? OR JSON_CONTAINS(betype, ?) OR JSON_CONTAINS(consignmenttype, ?)) AND created_at < ?",
        [
          orgname,
          orgcode,
          lobname,
          ownbranchname,
          importername,
          ownbooking,
          owntransportation,
          JSON.stringify(betype),
          JSON.stringify(consignmenttype),
          jobCreationDate,
        ]
      );
      console.log("6th stage", workflowRows);
      // console.log(workflowRows);
      console.log(workflowRows);

      return workflowRows;
    }
  } catch (error) {
    console.error("Error in getallthelobdataofbranchandlobValid:", error);
    throw new Error("Failed to retrieve valid workflows.");
  }
};
