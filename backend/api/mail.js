import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
const orgname = 'Seawave Forwarding Logistics';
const orgcode = 'seawave@2323';

// Initialize global variable to store fetched data

const getClientsofthatOrg = async () => {
    try {
        const [rows] = await connection.execute('SELECT branchname, clientname FROM organizations WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const fetchContactsByEmail = async (branchName, clientName) => {
    try {
        const [rows] = await connection.execute('SELECT email FROM contacts WHERE branchname = ? AND clientname = ? AND orgname = ? AND orgcode = ?', [branchName, clientName, orgname, orgcode]);
        return rows.map(row => row.email); // Extract email addresses from the result
    } catch (error) {
        console.log(error);
        return [];
    }
}

const fetchContactsofBranches = async () => {
    try {
        const globalData = [];
        const branchesAndClients = await getClientsofthatOrg();
        for (const { branchname, clientname } of branchesAndClients) {
            const contacts = await fetchContactsByEmail(branchname, clientname);

            const structuredData = {
                clientname: clientname,
                branchname: branchname,
                contacts: contacts
            };

            globalData.push(structuredData); // Add data to global array
        }
        return globalData;
    } catch (error) {
        console.log(error);
    }
}


const fetchJobsByClientAndBranch = async () => {
    try {
        const allJobsofClientandBranches = [];
        const allData = await fetchContactsofBranches();
        for (const { clientname, branchname, contacts } of allData) {
            const [rows] = await connection.execute('SELECT jobnumber FROM impgeneral WHERE orgname = ? AND orgcode = ? AND importername = ? AND branchname = ?', [orgname, orgcode, clientname, branchname]);
            const jobs = rows.map(row => row.jobnumber); // Extract job numbers
            const structuredJobs = {
                clientname: clientname,
                branchname: branchname,
                jobs: jobs,
                contacts: contacts
            };
            allJobsofClientandBranches.push(structuredJobs); // Add client, branch, and jobs to the array
        }

        return allJobsofClientandBranches; // Return the array of job data
    } catch (error) {
        console.log(error);
        return [];
    }
}


// export const getJobsCompletedRow = async () => {
//     try {
//         const completedRowsandAll = [];
//         const allJobs = await fetchJobsByClientAndBranch();
//         for (const { clientname, branchname, jobs, contacts } of allJobs) {
//             for (const job of jobs) {
//                 const [rows] = await connection.execute('SELECT tatimpcolumn, actualdate, jobnumber FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND status = ?', [orgname, orgcode, job, 'Completed']);
                
//                 if (rows.length > 0) {
//                     const formattedRows = rows.map(row => ({
//                         tatimpcolumn: row.tatimpcolumn,
//                         actualdate: row.actualdate,
//                         jobnumber: row.jobnumber
//                     }));
//                     const structuredData = {
//                         clientname: clientname,
//                         branchname: branchname,
//                         jobs: jobs,
//                         contacts: contacts,
//                         completedRows: JSON.stringify(formattedRows) // use formattedRows instead of rows
//                     }
//                     completedRowsandAll.push(structuredData); // Push JSON string representation of structuredData
//                 }
//             }
//         }
//        console.log(completedRowsandAll);
//         return completedRowsandAll;
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }




export const getJobsCompletedRow = async () => {
    try {
        const completedRowsandAll = [];
        const allJobs = await fetchJobsByClientAndBranch();
        for (const { clientname, branchname, jobs, contacts } of allJobs) {
            const branchData = {
                clientname: clientname,
                branchname: branchname,
                contacts: contacts,
                jobs: []
            };
            for (const job of jobs) {
                const [rows] = await connection.execute('SELECT tatimpcolumn, actualdate FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND status = ?', [orgname, orgcode, job, 'Completed']);
                if (rows.length > 0) {
                    const formattedRows = rows.map(row => ({
                        tatimpcolumn: row.tatimpcolumn,
                        actualdate: row.actualdate
                    }));
                    const jobsstructure = {
                        jobnumber: job,
                        completedRows: formattedRows
                    }
                    branchData.jobs.push(JSON.stringify(jobsstructure))
                }
            }
            
            completedRowsandAll.push(branchData);
        }
       
        return completedRowsandAll;
    } catch (error) {
        console.log(error);
        return [];
    }
}
