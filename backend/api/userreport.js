import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
const orgname = 'Seawave Forwarding Logistics';
const orgcode = 'seawave@2323';

const getAllEmployees = async () => {
    try {
        const [rows] = await connection.execute(`SELECT username FROM employees WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


// const accessRowsforEmployees = async () => {
//     try {
//         const empdata = await getAllEmployees();
//         const accessofEmployees = [];
//         for (const { username } of empdata) {
//             const [rows] = await connection.execute(`SELECT value FROM importaccess WHERE username = ?`, [username]);
//             const structuredData = {
//                 username: username,
//                 access: rows.map(row => row.value)
//             }
//             accessofEmployees.push(structuredData);
//         }
//         return accessofEmployees;
//     } catch (error) {
//         console.log(error);
//     }
// }




const getAllJobs = async () => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


// const accessRowsforEmployees = async () => {
//     try {
//         // Step 1: Fetch all employees and their access rows
//         const empdata = await getAllEmployees();
//         const accessRows = [];
//         for (const emp of empdata) {
//             const [rows] = await connection.execute(`SELECT value FROM importaccess WHERE username = ?`, [emp.username]);
//             const structuredData = {
//                 username:emp.username,
//                 access: rows.map(row => row.value) 
//             }
//             accessRows.push( structuredData );
//         }

//         // Step 2: Fetch all jobs
//         const allJobs = await getAllJobs();
//       console.log(allJobs);
//         const combinedData = accessRows.map(accessRow => {
//             return {
//                 username: accessRow.username,
//                 access: accessRow.access,
//                 jobnumber: allJobs.map(job => job.jobnumber)
//             };
//         });


//         // for (const job of allJobs) {
//         //     console.log(job);
//         //     const matchedAccessRows = accessRows.filter(accessRow => accessRow.username === job.jobdoneby);
//         //     for (const accessRow of matchedAccessRows) {
//         //         const [completedRows] = await connection.execute(`SELECT * FROM completedRows WHERE jobnumber = ?`, [job.jobnumber]);
//         //         const jobData = {
//         //             job: job,
//         //             accessRow: accessRow,
//         //             completedRows: completedRows
//         //         };
//         //         combinedData.push(jobData);
//         //     }
//         // }

//         // Now you have all the combined data in the 'combinedData' array
//         // console.log(combinedData);
//     } catch (error) {
//         console.log(error);
//     }
// }


// const getCompletedRowsofThatUserintheJobs = async () => {
//     try {
//         const formattedData = {};
//         const allJobs = await getAllJobs();
//         for()
//     } catch (error) {
//         console.log(error);
//     }
// }



// const accessRowsforEmployees = async () => {
//     try {
//         // Step 1: Fetch all employees and their access rows
//         const empdata = await getAllEmployees();
//         const accessRows = [];
//         for (const emp of empdata) {
//             const [accessRowsResult] = await connection.execute(`SELECT value FROM importaccess WHERE username = ?`, [emp.username]);
//             const access = accessRowsResult.map(row => row.value);

//             // Step 2: Fetch completed rows for each job done by the user
//             const jobsData = await getAllJobs();
//             const jobs = [];
//             for (const job of jobsData) {
//                 const [completedRowsResult] = await connection.execute(`SELECT tatimpcolumn FROM o2dimport WHERE status = ? AND jobnumber = ? AND jobdoneby = ?`, ['Completed', job.jobnumber, emp.username]);
//                 const completedRows = completedRowsResult.map(row => row.tatimpcolumn);
//                 const structure = {
//                     jobnumber: job.jobnumber, completedRows: completedRows
//                 }
//                 jobs.push(JSON.stringify(structure));
//             }

//             // Construct structured data for the user
//             const userData = {
//                 username: emp.username,
//                 access,
//                 jobs
//             };
//             accessRows.push(userData);
//         }

//         // console.log(accessRows);
//     } catch (error) {
//         console.log(error);
//     }
// };

// accessRowsforEmployees();

// let currentDate = new Date();
// // Get the current month (zero-based index)
// let currentMonth = currentDate.getMonth();
// // Get the current year
// let currentYear = currentDate.getFullYear();

// let startYearPart, endYearPart;

// // Check if the current month is April or later
// if (currentMonth >= 3) {
//     // April or later, use the current year as the start year
//     startYearPart = currentYear.toString().slice(-2);
//     endYearPart = (currentYear + 1).toString().slice(-2);
// }

// // Construct the year range
// let yearPart = `${startYearPart}-${endYearPart}`;
// const [lastYearRow] = await connection.execute('SELECT jobnumber FROM impjobcreation ORDER BY id DESC LIMIT 1');
// console.log(lastYearRow[0].jobnumber.slice(-5));
// // && item.name !== 'User List' && item.name !== 'TAT' && item.name!== 'Mailing'



































export const getCompletedRows = async (username, fullname, branchnames) => {
    try {

        //branchnames and LOB

        // total jobs in the organization
        const jobdata = await getAllJobs();
        // const allemployees = await getAllEmployees();

        const [getrowaccessofimportforthatuser] = await connection.execute(`SELECT assignedperson, workflowname, ownbranchname FROM setworkflow WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        const accesshaiye = JSON.stringify(getrowaccessofimportforthatuser);
        const data = JSON.parse(accesshaiye);

        // Initialize an array to store matching workflow names
        const matchingWorkflowNames = [];

        // Iterate over the data to find matching usernames
        data.forEach(item => {
            const assignedPersons = item.assignedperson;
            const workflowName = item.workflowname;
            const branchname = item.ownbranchname
            // Check if the username is in the assignedPersons array
            const isUsernamePresent = assignedPersons.some(person => person.username === username);

            // If the username matches, add the workflow name to the result array
            if (isUsernamePresent) {
                matchingWorkflowNames.push({workflowName: workflowName, branchname: branchname});
            }
        });


        // this is to get all the jobs created by that user
        // access is number of jobs created by that user in the organization
        const [accessRowsResult] = await connection.execute(`SELECT * FROM impjobcreation WHERE 
            jobowner = ? AND orgname = ? AND orgcode = ?`,
            [username, orgname, orgcode]);

        // this is to get all the completed rows by that user
        const [rows] = await connection.execute(`SELECT * FROM trackingimport WHERE jobdoneby = ? AND orgname = ? AND orgcode = ?`, [username, orgname, orgcode]);

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
            rowshaiye: matchingWorkflowNames
        }
     
        return structuredData;

    } catch (error) {
        console.log(error);
    }
}