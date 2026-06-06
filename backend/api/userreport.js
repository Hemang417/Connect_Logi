import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
const orgname = "Seawave Forwarding Logistics";
const orgcode = "seawave@2323";

const getAllEmployees = async () => {
  try {
    const [rows] = await connection.execute(
      `SELECT username FROM userkyctable WHERE orgname = ? AND orgcode = ? And IsDeleted = 0`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

// const getAllJobs = async (startDate = null, endDate = null) => {
//   try {
//     let query = `SELECT * FROM trackingimport WHERE orgname = ? AND orgcode = ? Group by jobnumber`;
//     const params = [orgname, orgcode];

//     if (startDate && endDate) {
//       query += ` AND DATE(actualdate) BETWEEN ? AND ?`;
//       params.push(startDate, endDate);
//     }

//     const [rows] = await connection.execute(query, params);
//     return rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllJobsExport = async (username) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedRows = async (
  username,
  fullname,
  branchnames,
  startDate,
  endDate
) => {
  try {
    // console.log(username, fullname, branchnames, startDate, endDate);
    //branchnames and LOB

    // total jobs in the organization
    // const jobdata = await getAllJobs(startDate, endDate);
    // const allemployees = await getAllEmployees();

    const [getrowaccessofimportforthatuser] = await connection.execute(
      `SELECT assignedperson, workflowname, ownbranchname FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname like ?`,
      [orgname, orgcode, "%Import%"]
    );
    const accesshaiye = JSON.stringify(getrowaccessofimportforthatuser);
    const data = JSON.parse(accesshaiye);

    // Initialize an array to store matching workflow names
    const matchingWorkflowNames = [];

    // Iterate over the data to find matching usernames
    data.forEach((item) => {
      const assignedPersons = item.assignedperson;
      const workflowName = item.workflowname;
      const branchname = item.ownbranchname;
      // Check if the username is in the assignedPersons array
      const isUsernamePresent = assignedPersons.some(
        (person) => person.username === username
      );

      // If the username matches, add the workflow name to the result array
      if (isUsernamePresent) {
        matchingWorkflowNames.push({
          workflowName: workflowName,
          branchname: branchname,
        });
      }
    });

    //total number of jobs those milestone are handle by the user
    const [jobdata] = await connection.execute(
      `SELECT COUNT(*) as totaljobs FROM trackingimport WHERE jobdoneby = ? AND orgname = ? AND orgcode = ? GROUP BY jobnumber`,
      [username, orgname, orgcode]
    );

    // this is to get all the jobs created by that user
    // access is number of jobs created by that user in the organization
    const [accessRowsResult] = await connection.execute(
      `SELECT * FROM impjobcreation WHERE 
            jobowner = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    // this is to get all the completed rows by that user
    const [rows] = await connection.execute(
      `SELECT * FROM trackingimport WHERE jobdoneby = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    // we send totaljobs in org, total jobs created by that user in org, name of user, completedrows of the job by the user
    // access is individual job creations of that user
    const structuredData = {
      // all org jobs
      totalJobs: jobdata,
      // all org jobs created by that user
      access: accessRowsResult,
      // completed rows by that user
      completedRows: rows,
      // name of user
      name: username,
      // Workflownames access to that user
      rowshaiye: matchingWorkflowNames,
    };

    return structuredData;
  } catch (error) {
    console.log(error);
  }
};

export const getCompletedRowsExport = async (
  username,
  fullname,
  branchnames,
  startDate,
  endDate
) => {
  try {
    console.log(username, fullname, branchnames);
    //branchnames and LOB

    // total jobs in the organization
    //const jobdata = await getAllJobsExport(username);
    // const allemployees = await getAllEmployees();

    const [getrowaccessofexportforthatuser] = await connection.execute(
      `SELECT assignedperson, workflowname, ownbranchname FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname like ?`,
      [orgname, orgcode, "%EXPORT%"]
    );
    const accesshaiye = JSON.stringify(getrowaccessofexportforthatuser);
    const data = JSON.parse(accesshaiye);

    // Initialize an array to store matching workflow names
    const matchingWorkflowNames = [];

    // Iterate over the data to find matching usernames
    data.forEach((item) => {
      const assignedPersons = item.assignedperson;
      const workflowName = item.workflowname;
      const branchname = item.ownbranchname;
      // Check if the username is in the assignedPersons array
      const isUsernamePresent = assignedPersons.some(
        (person) => person.username === username
      );

      // If the username matches, add the workflow name to the result array
      if (isUsernamePresent) {
        matchingWorkflowNames.push({
          workflowName: workflowName,
          branchname: branchname,
        });
      }
    });

    //total number of jobs those milestone are handle by the user
    const [jobdata] = await connection.execute(
      `SELECT COUNT(*) as totaljobs FROM trackingexport WHERE jobdoneby = ? AND orgname = ? AND orgcode = ? GROUP BY jobnumber`,
      [username, orgname, orgcode]
    );

    // this is to get all the jobs created by that user
    // access is number of jobs created by that user in the organization
    const [accessRowsResult] = await connection.execute(
      `SELECT * FROM expjobcreation WHERE 
            jobowner = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    // this is to get all the completed rows by that user
    const [rows] = await connection.execute(
      `SELECT * FROM trackingexport WHERE jobdoneby = ? AND orgname = ? AND orgcode = ?`,
      [username, orgname, orgcode]
    );

    // we send totaljobs in org, total jobs created by that user in org, name of user, completedrows of the job by the user
    // access is individual job creations of that user
    const structuredData = {
      // all org jobs
      totalJobs: jobdata,
      // all org jobs created by that user
      access: accessRowsResult,
      // completed rows by that user
      completedRows: rows,
      // name of user
      name: username,
      // Workflownames access to that user
      rowshaiye: matchingWorkflowNames,
    };

    return structuredData;
  } catch (error) {
    console.log(error);
  }
};
