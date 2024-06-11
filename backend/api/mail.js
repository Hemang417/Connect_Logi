import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
const orgname = 'Seawave Forwarding Logistics';
const orgcode = 'seawave@2323';
// import cron from 'cron'
import cron from 'node-cron';
import nodemailer from 'nodemailer'

// let recipients;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shreyashpingle752@gmail.com',
        pass: 'vircbhwmcnqfinrb'
    }
});


export const setMail = async (email, passcode, hours, minutes, orgname, orgcode) => {
    try {
        const [row] = await connection.execute(`SELECT * FROM maildata WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);

        if (row.length > 0) {
            const [updatedRow] = await connection.execute(`UPDATE maildata SET email = ?, passcode = ?, hours = ?, minutes = ? WHERE orgname = ? AND orgcode = ?`, [email, passcode, hours, minutes, orgname, orgcode]);
        } else {
            const [insertedRow] = await connection.execute(`INSERT INTO maildata (email, passcode, hours, minutes, orgname, orgcode) VALUES (?, ?, ?, ?, ?, ?)`, [email, passcode, hours, minutes, orgname, orgcode]);
        }
        // await fetchDataFromTable();
        // if (data.length > 0) {
        //     for (const item of data) {
        //         sendMailorg(item);
        //     }
        // } else {
        //     console.log('No data fetched from the table.');
        // }
    } catch (error) {
        console.log(error);
    }
}


// correct function
export const fetchMail = async (orgname, orgcode) => {
    try {
        const [row] = await connection.execute(`SELECT email, passcode, hours, minutes FROM maildata WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

// correct function
const getClientsofthatOrg = async () => {
    try {
        const [rows] = await connection.execute('SELECT * FROM organizations WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// correct function
const fetchContactsByEmail = async (branchName, clientName) => {
    try {
        const [rows] = await connection.execute('SELECT email FROM contacts WHERE branchname = ? AND clientname = ? AND orgname = ? AND orgcode = ?', [branchName, clientName, orgname, orgcode]);
        return rows.map(row => row.email); // Extract email addresses from the result
    } catch (error) {
        console.log(error);
        return [];
    }
}

// correct function
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
                const [rows] = await connection.execute('SELECT * FROM trackingimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND status = ?', [orgname, orgcode, job, 'Completed']);

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

const data = await getJobsCompletedRow();

cron.schedule('30 18 * * *', async () => {
    try {

        // for (const item of data) {
        //     let emailContent = '';
        //     emailContent += `<h2>Client: ${item.clientname}</h2>`;
        //     emailContent += `<p>Branch: ${item.branchname}</p>`;
        //     emailContent += '<table border="1">';
        //     emailContent += '<tr><th>Job Number</th><th>Completed Rows</th><th>Actual Time</th></tr>';

        //     for (const job of item.jobs) {
        //         const allJobdata = JSON.parse(job);
        //         const { completedRows, jobnumber } = allJobdata;
        //         let completedRowsHtml = '';
        //         let actualDatesHtml = '';
        //         for (const row of completedRows) {
        //             completedRowsHtml += `<p>${row.tatimpcolumn}</p>`;
        //             const actualDate = row.actualdate.includes('T') ? row.actualdate.replace('T', ' ') : row.actualdate;
        //             actualDatesHtml += `<p>${actualDate}</p>`;
        //         }

        //         emailContent += `<tr><td>${jobnumber}</td><td>${completedRowsHtml}</td><td>${actualDatesHtml}</td></tr>`;
        //     }

        //     emailContent += '</table><br>';

        //     // Loop through the contacts of the current item
        //     for (const contact of item.contacts) {
        //         try {
        //             const mailOptions = {
        //                 from: 'shreyashpingle752@gmail.com',
        //                 to: contact,
        //                 subject: 'Daily Report',
        //                 html: emailContent
        //             };
        //             await transporter.sendMail(mailOptions);
        //             console.log(`Email sent successfully to ${contact}`);
        //         } catch (error) {
        //             console.error(`Error sending email to ${contact}:`, error);
        //         }
        //     }
        // }






        for (const item of data) {
            // Skip items with no jobs
            if (!item.jobs || item.jobs.length === 0) {
                continue;
            }

            let emailContent = '';
            emailContent += `<h2>Client: ${item.clientname}</h2>`;
            emailContent += `<p>Branch: ${item.branchname}</p>`;
            emailContent += '<table border="1">';
            emailContent += '<tr><th>Job Number</th><th>Completed Rows</th><th>Actual Time</th></tr>';

            let hasCompletedTasks = false;

            for (const job of item.jobs) {
                const allJobdata = JSON.parse(job);
                const { completedRows, jobnumber } = allJobdata;

                // Skip jobs with no completed rows
                if (!completedRows || completedRows.length === 0) {
                    continue;
                }

                let completedRowsHtml = '';
                let actualDatesHtml = '';
                for (const row of completedRows) {
                    hasCompletedTasks = true; // Mark that there is at least one completed task
                    completedRowsHtml += `<p>${row.tatimpcolumn}</p>`;
                    const actualDate = row.actualdate.includes('T') ? row.actualdate.replace('T', ' ') : row.actualdate;
                    actualDatesHtml += `<p>${actualDate}</p>`;
                }

                emailContent += `<tr><td>${jobnumber}</td><td>${completedRowsHtml}</td><td>${actualDatesHtml}</td></tr>`;
            }

            emailContent += '</table><br>';

            // Send emails only if there are completed tasks
            if (hasCompletedTasks) {
                for (const contact of item.contacts) {
                    try {
                        const mailOptions = {
                            from: 'shreyashpingle752@gmail.com',
                            to: contact,
                            subject: 'Daily Report',
                            html: emailContent
                        };
                        await transporter.sendMail(mailOptions);
                        console.log(`Email sent successfully to ${contact}`);
                    } catch (error) {
                        console.error(`Error sending email to ${contact}:`, error);
                    }
                }
            }
        }








    } catch (error) {
        console.error('Error sending email:', error);
    }
});













// const mailarr = [{mail: 'yungcode2003@gmail.com'}, { mail: 'shreypingle23@gmail.com'}]

// let globalDataa = []; // Initialize globalDataa

// // Function to create and return a nodemailer transporter
// let transporter = (email, passcode) => {
//     return nodemailer.createTransport({
//         service: 'gmail',
//         type: "SMTP",
//         secure: true,
//         auth: {
//             user: email,
//             pass: passcode
//         }
//     });
// };

// const fetchDataFromTable = async () => {
//     try {
//         const currentHour = new Date().getHours();
//         // Execute your SQL query to fetch data from the table
//         const [rows] = await connection.query('SELECT * FROM maildata WHERE hours = ?', [currentHour]);

//         sendMailorg(rows);
//         return rows;
//     } catch (error) {
//         console.error('Error fetching data from table:', error);
//         throw error;
//     }
// };

// // Function to fetch data from the table every hour
// const fetchEveryHour = async () => {
//     try {
//         // await fetchDataFromTable(); Fetch data initially
//         setTimeout(async () => {
//             await fetchDataFromTable();
//         }, 30000);
//        // setTimeout(fetchEveryHour, 30000); // 3600000 milliseconds = 1 hour
//     } catch (error) {
//         console.error('Error in fetchEveryHour:', error);
//     }
// };



// setTimeout(() => {
//     fetchDataFromTable();
// }, 30000);


// const scheduleFetchEveryHour = () => {
//     setTimeout(async () => {
//         await fetchDataFromTable();

//         // Send mails for each organization if data is available
//         if (globalDataa.length > 0) {
//             for (const data of globalDataa) {
//                 sendMailorg(data);
//             }
//         } else {
//             console.log('No data fetched from the table.');
//         }
//     }, 30000); // 1 hour
// };

// setTimeout(() => {
//     scheduleFetchEveryHour();
// }, 30000); // 1 hour

// const sendMailorg = async (data) => {

//     // Create nodemailer transporter using email and passcode
//     const transporterInstance = transporter(data.email, data.passcode);
//     const dataj = await getJobsCompletedRow();
//     // Calculate cron schedule based on hours and minutes of each object
//     const cronSchedule = `${data.minutes} ${data.hours} * * *`;

//     // Schedule the email sending task using cron
//     cron.schedule(cronSchedule, async () => {
//         try {
//             for (const item of dataj) {
//                 let emailContent = '';
//                 emailContent += `<h2>Client: ${item.clientname}</h2>`;
//                 emailContent += `<p>Branch: ${item.branchname}</p>`;
//                 emailContent += '<table border="1">';
//                 emailContent += '<tr><th>Job Number</th><th>Completed Rows</th><th>Actual Time</th></tr>';

//                 for (const job of item.jobs) {
//                     const allJobdata = JSON.parse(job);
//                     const { completedRows, jobnumber } = allJobdata;
//                     let completedRowsHtml = '';
//                     let actualDatesHtml = '';
//                     for (const row of completedRows) {
//                         completedRowsHtml += `<p>${row.tatimpcolumn}</p>`;
//                         const actualDate = row.actualdate.includes('T') ? row.actualdate.replace('T', ' ') : row.actualdate;
//                         actualDatesHtml += `<p>${actualDate}</p>`;
//                     }

//                     emailContent += `<tr><td>${jobnumber}</td><td>${completedRowsHtml}</td><td>${actualDatesHtml}</td></tr>`;
//                 }

//                 emailContent += '</table><br>';

//                 // Loop through the contacts of the current item
//                 for (const contact of item.contacts) {
//                     try {
//                         let mailOptions = {
//                             from: data.email,
//                             to: contact,
//                             subject: 'Daily Report',
//                             html: emailContent
//                         };
//                         await transporterInstance.sendMail(mailOptions);
//                         console.log(`Email sent successfully to ${contact}`);
//                     } catch (error) {
//                         console.error(`Error sending email to ${contact}:`, error);
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error('Error sending email:', error);
//         }
//     });
// };










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


// const fetchDataFromTable = async () => {
//     const currentHour = new Date().getHours();
//     const [rows] = await connection.execute(`SELECT * FROM maildata WHERE hours = ?`, [currentHour]);
//     return rows;
// };

// // Function to send email
// const sendEmail = async () => { // Pass email as an argument
//     try {
//         const mailOptions = {
//             from: 'shreyashpingle752@gmail.com',
//             to: 'yungcode2003@gmail.com', // Use the passed email
//             subject: 'Scheduled Email',
//             text: 'This is a scheduled email sent using cron.'
//         };
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent successfully`);
//     } catch (error) {
//         console.error(`Error sending email `, error);
//     }
// };

// // setInterval(async () => {
// //     recipients = await fetchDataFromTable();
// //     scheduleEmails(recipients);
// // }, 30000)


// // Fetch data and schedule emails
// const scheduleEmails = async () => {
//     try {
//         recipients = await fetchDataFromTable();
//         recipients.forEach(({ hours, minutes }) => {
//             // Check if current minute matches the scheduled minute
//             const currentMinute = new Date().getMinutes();
//             if (currentMinute === minutes) {
//                 sendEmail();
//                 console.log(`Scheduled email to be sent at ${hours}:${minutes}`);
//             }
//         });
//     } catch (error) {
//         console.error('Error scheduling emails:', error);
//     }
// };

// setInterval(() => {
//     scheduleEmails();
// }, 60000)