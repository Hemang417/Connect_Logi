import { connectMySQL } from "../config/sqlconfig.js";
import nodemailer from 'nodemailer'
import cron from 'node-cron';
// import { getJobsCompletedRow } from './mail.js';

// let globalTime = null;
// const client = twilio(accountSid, authToken);
const connection = await connectMySQL();
// let organame = '';
// let orgacode = '';
// const [row] = await connection.execute(`SELECT email, passcode, hours, minutes FROM maildata WHERE orgname = ? AND orgcode = ?`, [organame, orgacode]);
// console.log(row);
// export const fetchedMail = async (orgname, orgcode) => {
//     organame = orgname;
//     orgacode = orgcode;
// }







// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     type: "SMTP",
//     secure: true,
//     auth: {
//         user: 'shreyashpingle752@gmail.com',
//         pass: 'vircbhwmcnqfinrb'
//     }
// });







export const storeJob = async (jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, lastIc, freedays, blstatus, benumber, shippinglinebond, branchname, branchcode) => {
    try {
  
       
        const firstletter = transportMode.charAt(0).toUpperCase();

        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        let startYearPart, endYearPart;
        let count;

        if (currentMonth >= 3) {
            startYearPart = currentYear.toString().slice(-2);
            endYearPart = (currentYear + 1).toString().slice(-2);
        }
        let yearPart = `${startYearPart}-${endYearPart}`;
        const [lastYearRow] = await connection.execute('SELECT jobnumber FROM impjobcreation WHERE branchcode = ? ORDER BY id DESC LIMIT 1', [branchcode]);

        if (!lastYearRow || lastYearRow.length === 0) {
            count = 1;
        } else {
            if (currentMonth === 3) {
                if (lastYearRow[0].jobnumber.slice(-5) !== yearPart) {
                    count = 1;
                } else {
                    const [lastCountRow] = await connection.execute('SELECT MAX(count) AS maxCount FROM impjobcreation WHERE branchcode = ?', [branchcode]);
                    const maxCount = lastCountRow[0].maxCount || 0;

                    // Increment the count for the new job
                    count = maxCount + 1;
                }
            } else {
                const [lastCountRow] = await connection.execute('SELECT MAX(count) AS maxCount FROM impjobcreation WHERE branchcode = ?', [branchcode]);
                const maxCount = lastCountRow[0].maxCount || 0;

                // Increment the count for the new job
                count = maxCount + 1;
            }
        }

        let jobNumber = `${firstletter}/I/${yearPart}`

        const [result] = await connection.execute(`INSERT INTO impjobcreation 
        (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, bltype, bltypenum, jobowner, orgcode, orgname, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [jobNumber, jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode]);

        const insertedId = result.insertId;
        const [row] = await connection.execute('SELECT * FROM impjobcreation WHERE id = ?', [insertedId]);

        return row;

    } catch (error) {
        console.log(error);
    }
}























// export const storeJob = async (jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, lastIc, freedays, blstatus, benumber, shippinglinebond, branchname, branchcode) => {
//     try {

//         const firstletter = transportMode.charAt(0).toUpperCase();

//         let currentDate = new Date();
//         // Get the current month (zero-based index)
//         let currentMonth = currentDate.getMonth();
//         // Get the current year
//         let currentYear = currentDate.getFullYear();

//         let startYearPart, endYearPart;
//         let count;

//         if (currentMonth >= 3) {
//             // April or later, use the current year as the start year
//             startYearPart = currentYear.toString().slice(-2);
//             endYearPart = (currentYear + 1).toString().slice(-2);
//             // if(currentMonth === 3){
//             //     count = 1;
//             // }
//         }
//         // else {
//         //     // Construct the year range for the previous financial year
//         //     startYearPart = (currentYear - 1).toString().slice(-2);
//         //     endYearPart = currentYear.toString().slice(-2);
//         // }
//         let yearPart = `${startYearPart}-${endYearPart}`;
//         const [lastYearRow] = await connection.execute('SELECT jobnumber FROM impjobcreation ORDER BY id DESC LIMIT 1');


//         if (!lastYearRow || lastYearRow.length === 0) {
//             count = 1; // Initialize count to 1 if table is empty
//         } else {
//             if (currentMonth === 3) {
//                 if (lastYearRow[0].jobnumber.slice(-5) !== yearPart) {
//                     count = 1; // Reset count to 1 for new financial year
//                 } else {
//                     const [lastCountRow] = await connection.execute('SELECT count FROM impjobcreation ORDER BY id DESC LIMIT 1');
//                     count = lastCountRow.length > 0 ? lastCountRow[0].count + 1 : 1;
//                 }
//             } else {
//                 const [lastCountRow] = await connection.execute('SELECT count FROM impjobcreation ORDER BY id DESC LIMIT 1');
//                 count = lastCountRow.length > 0 ? lastCountRow[0].count + 1 : 1;
//             }
//         }


//         let jobNumber = `${firstletter}/I/${yearPart}`

//         const [result] = await connection.execute(`INSERT INTO impjobcreation 
//         (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, bltype, bltypenum, jobowner, orgcode, orgname, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [jobNumber, jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, freedays, blstatus, benumber, shippinglinebond, count, branchname, branchcode]);

//         // const insertedId = result.insertId;
//         const insertedId = result.insertId;
//         const [row] = await connection.execute('SELECT * FROM impjobcreation WHERE id = ?', [insertedId]);

//         return row;

//     } catch (error) {
//         console.log(error);
//     }
// }



export const updateJobNumber = async (id, transportMode, count, branchname, branchcode, orgname, orgcode) => {
    try {


        const [rows] = await connection.execute(`SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ?
        AND branchcode = ?`, [orgname, orgcode, branchname, branchcode]);


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
        }

        // Construct the year range
        let yearPart = `${startYearPart}-${endYearPart}`;


        let jobNumberParts = {};

        // Default values
        jobNumberParts['Fiscal Year'] = yearPart;
        jobNumberParts['Air/Sea'] = firstletter;
        jobNumberParts['BranchName'] = branchname;
        jobNumberParts['Import/Export'] = 'I'; // Default value
        jobNumberParts['Custom'] = ''; // Default to empty string

        rows.forEach(item => {
            switch (item.columnname) {
                case 'Fiscal Year':
                    jobNumberParts['Fiscal Year'] = yearPart;
                    break;
                case 'Air/Sea':
                    jobNumberParts['Air/Sea'] = firstletter;
                    break;
                case 'Import/Export':
                    jobNumberParts['Import/Export'] = 'I'; // or 'E' based on your logic
                    break;
                case 'BranchName':
                    jobNumberParts['BranchName'] = branchname;
                    break;
                case 'Custom':
                    jobNumberParts['Custom'] = item.inputofcustom;
                    break;
                default:
                    break;
            }
        });

        // Construct job number dynamically based on the order of columns in `rows`
        let jobNumberlatest = rows.map(item => jobNumberParts[item.columnname]).join('/');

        // Append the count to the job number
        jobNumberlatest += `/${count}`;



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
            `UPDATE impjobcreation SET jobnumber = ? WHERE id = ?`,
            [jobNumberlatest, id]
        );
        const [jobDaterow] = await connection.execute(
            `SELECT jobdate FROM impjobcreation WHERE jobnumber = ?`,
            [jobNumberlatest]
        );

        return { jobNumberlatest, jobDaterow };

    } catch (error) {
        console.log(error);
    }
}



export const fetchBranches = async (importerName, orgcode, orgname) => {
    try {

        const [rows] = await connection.execute(`SELECT branchname, id FROM organizations WHERE clientname = ? AND orgcode = ? AND orgname = ?`, [importerName, orgcode, orgname]);

        return rows;
    } catch (error) {
        console.log(error);
    }
}



export const fetchAllorgdata = async (clientName, branchName, orgcode, orgname, id) => {
    try {

        const [rows] = await connection.execute(`SELECT GST, IEC, address FROM organizations WHERE clientname = ? AND orgcode = ? AND branchname = ? AND orgname = ? AND id = ?`, [clientName, orgcode, branchName, orgname, id]);

        return rows;

    } catch (error) {
        console.error('Error fetching organization data:', error);
        throw error; // Rethrow the error or handle it appropriately
    }
}



export const storeGeneralImportData = async (orgname, orgcode, jobowner, jobnumber, importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, id, branchname, branchcode) => {
    try {

        const [row] = await connection.execute(
            `INSERT INTO impgeneral (orgname, orgcode, jobowner, jobnumber, importername, address, gst, iec, portofshipment, finaldestination, branchname, branchnameofjob, branchcodeofjob) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [orgname, orgcode, jobowner, jobnumber, importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, branchname, branchcode]
        );


        // const [emailofbranch] = await connection.execute(`SELECT email FROM organizations WHERE orgname = ? AND orgcode = ? AND branchname = ? AND id = ?`, [orgname, orgcode, selectedBranch, id]);
        // const [emailofcontacts] = await connection.execute(`SELECT email from contacts WHERE orgname = ? AND orgcode = ? AND branchname = ? AND clientname = ? AND bid = ?`, [orgname, orgcode, selectedBranch, importerName, id])


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
        // const [mobileofcontacts] = await connection.execute(`SELECT mobile from contacts WHERE orgname = ? AND orgcode = ? AND branchname = ? AND clientname = ? AND bid = ?`, [orgname, orgcode, selectedBranch, importerName, id]);
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

        return row;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error or handle it appropriately
    }
};



// const data = await getJobsCompletedRow();

// let emailContent = '';
// for (const item of data) {
//     emailContent += `<h2>Client: ${item.clientname}</h2>`;
//     emailContent += `<p>Branch: ${item.branchname}</p>`;
//     emailContent += '<table border="1">';
//     emailContent += '<tr><th>Job Number</th><th>Completed Rows</th><th>Actual Time</th></tr>';
//     for (const job of item.jobs) {
//         const allJobdata = JSON.parse(job);
//         const {completedRows, jobnumber} = allJobdata;
//         let completedRowsHtml = '';

//         for (const row of completedRows) {
//             completedRowsHtml += `<p>${row.tatimpcolumn}: ${row.actualdate}</p>`;
//         }

//         emailContent += `<tr><td>${jobnumber}</td><td>${completedRowsHtml}</td><td>${completedRows[0].actualdate}</td></tr>`;
//     }

//     emailContent += '</table><br>';
// }



// cron.schedule('02 21 * * *', async () => {
//     try {
//         for (const item of data) {
//             let emailContent = '';
//             emailContent += `<h2>Client: ${item.clientname}</h2>`;
//             emailContent += `<p>Branch: ${item.branchname}</p>`;
//             emailContent += '<table border="1">';
//             emailContent += '<tr><th>Job Number</th><th>Completed Rows</th><th>Actual Time</th></tr>';

//             for (const job of item.jobs) {
//                 const allJobdata = JSON.parse(job);
//                 const { completedRows, jobnumber } = allJobdata;
//                 let completedRowsHtml = '';
//                 let actualDatesHtml = '';
//                 for (const row of completedRows) {
//                     completedRowsHtml += `<p>${row.tatimpcolumn}</p>`;
//                     const actualDate = row.actualdate.includes('T') ? row.actualdate.replace('T', ' ') : row.actualdate;
//                     actualDatesHtml += `<p>${actualDate}</p>`;

//                 }

//                 emailContent += `<tr><td>${jobnumber}</td><td>${completedRowsHtml}</td><td>${actualDatesHtml}</td></tr>`;
//             }

//             emailContent += '</table><br>';

//             // Loop through the contacts of the current item
//             for (const contact of item.contacts) {
//                 try {
//                     const mailOptions = {
//                         from: 'shreyashpingle752@gmail.com',
//                         to: contact,
//                         subject: 'Daily Report',
//                         html: emailContent
//                     };
//                     await transporter.sendMail(mailOptions);
//                     console.log(`Email sent successfully to ${contact}`);
//                 } catch (error) {
//                     console.error(`Error sending email to ${contact}:`, error);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// });










// export const getClient = async (orgcode) => {
//     try {
//         const connection = await connectMySQL();
//         const [rows] = await connection.execute(`SELECT clientname, GROUP_CONCAT(CONCAT_WS(':', id, branchname, address, GST, IEC) SEPARATOR ',') AS branches FROM organizations WHERE orgcode = ? GROUP BY clientname`, [orgcode]);
//         // const allclients = [];

//         // Transform the rows into an array of objects with separate properties for client name and branches
//         const clients = rows.map(row => {
//             var client = {
//                 clientname: row.clientname,
//                 branches: []
//             };

//             // Split the concatenated string of branches and parse each branch into an object
//             const branchDetails = row.branches.split(',');
//             branchDetails.forEach(branch => {
//                 var [id, branchname, address, GST, IEC] = branch.split(':');
//                 var branchdata = {
//                     id: id,
//                     branchname: branchname,
//                     address: address,
//                     GST: GST,
//                     IEC: IEC
//                 };
//                 // Push the branch data into the branches array of the client
//                 client.branches.push(branchdata);
//             });

//             // Push the client object into the allclients array
//             // sendClient(client);
//             return client;
//         });


//     } catch (error) {
//         console.log(error);
//     }
// }










// export const getClient = async (orgcode) => {
//     try {
//         const connection = await connectMySQL();
//         const [rows] = await connection.execute(`SELECT clientname, GROUP_CONCAT(CONCAT_WS(':', id, branchname, address, GST, IEC) SEPARATOR ',') AS branches FROM organizations WHERE orgcode = ? GROUP BY clientname`, [orgcode]);
//         const allclients = [];
//         // Transform the rows into an array of objects with separate properties for client name and branches
//         const clients = rows.map(row => {
//             const client = {
//                 clientname: row.clientname,
//                 branches: []
//             };

//             // Split the concatenated string of branches and parse each branch into an object
//             const branchDetails = row.branches.split(',');
//             branchDetails.forEach(branch => {
//                 const [id, branchname, address, GST, IEC] = branch.split(':');
//                 const branchdata = {
//                     id: id,
//                     branchname: branchname,
//                     address: address,
//                     GST: GST,
//                     IEC: IEC
//                 };
//                 // Push the branch data into the branches array of the client
//                 client.branches.push(branchdata);
//             });

//             // Print out the client object and its branches separately
//             // console.log('Client:', client);

//             return client;
//         });

//         return allclients;
//     } catch (error) {
//         console.log(error);
//     }
// }












// export const getClient = async (orgcode) => {
//     try {
//         const connection = await connectMySQL();
//         const [rows] = await connection.execute(`SELECT clientname, GROUP_CONCAT(CONCAT_WS(':', id, branchname, address, GST, IEC) SEPARATOR ',') AS branches FROM organizations WHERE orgcode = ? GROUP BY clientname`, [orgcode]);

//         // Transform the rows into an array of objects with separate properties for client name and branches
//         const clients = rows.map(row => {

//             // Split the concatenated string of branches and parse each branch into an object
//             const branchDetails = row.branches.split(',');

//             branchDetails.forEach(branch => {
//                 const [id, branchname, address, GST, IEC] = branch.split(':');

//                 const branchdata = {
//                     id: id,
//                     branchname: branchname,
//                     address: address,
//                     GST: GST,
//                     IEC: IEC
//                 }

//                 const client = {
//                     clientname: row.clientname,
//                     branches: []
//                 };

//                 client.branches.push(branchdata);
//                 console.log(client);
//             });

//         });

//         // console.log(clients);
//         return clients;
//     } catch (error) {
//         console.log(error);
//     }
// }




// export const getClient = async (orgcode) => {
//     try {
//         const connection = await connectMySQL();
//         const [rows] = await connection.execute(`SELECT clientname, address, GST, IEC, branchname, id
//         FROM organizations
//         WHERE orgcode = ?
//         GROUP BY clientname, address, GST, IEC, branchname, id;
//         `, [orgcode]);

//         // Initialize an empty array to store the clients
//         const clients = [];

//         // Iterate over each row from the database
//         rows.forEach(row => {
//             // Check if the client already exists in the clients array
//             const existingClientIndex = clients.findIndex(client => client.clientname === row.clientname);

//             // If the client exists, add the branch to its branches array
//             if (existingClientIndex !== -1) {
//                 clients[existingClientIndex].branches.push({
//                     branchname: row.branchname,
//                     id: row.id,
//                     address: row.address,
//                     GST: row.GST,
//                     IEC: row.IEC
//                 });
//             } else {
//                 // If the client does not exist, create a new client object and push it to the clients array
//                 clients.push({
//                     clientname: row.clientname,
//                     branches: [{
//                         branchname: row.branchname,
//                         id: row.id,
//                         address: row.address,
//                         GST: row.GST,
//                         IEC: row.IEC
//                     }]
//                 });
//             }
//         });

//         console.log(clients);
//         return clients;
//     } catch (error) {
//         console.log(error);
//     }
// }









export const getClient = async (orgcode) => {
    try {

        const [rows] = await connection.execute(`SELECT clientname, id, branchname, address, GST, IEC FROM organizations WHERE orgcode = ?`, [orgcode]);

        return rows;
    } catch (error) {
        console.log(error);
    }
}


// TAT O2D

export const storeO2D = async (tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`INSERT INTO o2dtat 
        (tatimpcolumn, days, hours, minutes, orgname, orgcode, dstatus) VALUES (?, ?, ?, ?, ?, ?, ?)`, [tatimpcolumn, days, hours, minutes, orgname, orgcode, dstatus]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const get02ddata = async (orgname, orgcode) => {
    try {

        const [rows] = await connection.execute(`SELECT tatimpcolumn, id, days, hours, minutes, dstatus FROM o2dtat WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deleteO2D = async (orgname, orgcode, deletionrowid) => {
    try {

        const [row] = await connection.execute(`DELETE FROM o2dtat WHERE orgname = ? AND orgcode = ? AND id = ?`, [orgname, orgcode, deletionrowid]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const updateO2D = async (tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode, id) => {
    try {

        const [row] = await connection.execute(`UPDATE o2dtat SET tatimpcolumn = ?, days = ?, hours = ?, minutes = ?, dstatus = ? WHERE orgname = ? AND orgcode = ? AND id = ?`, [tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}



// export const storeimpTAT = async (impTATData, orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();
//         for (const item of impTATData) {
//             const { document, tat } = item;
//             const { days, hours, minutes } = tat;

//             // Assuming there is a table named 'impTATTable' with columns tatimpcolumn, days, hours, minutes
//             const [rows] = await connection.execute(`INSERT INTO tatimport 
//             (orgname, orgcode, tatimpcolumn, days, hours, minutes) VALUES (?, ?, ?, ?, ?, ?)`,
//                 [orgname, orgcode, document, days, hours, minutes]);
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }



// export const fetchImpTATData = async (orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();
//         const [rows] = await connection.execute(`SELECT tatimpcolumn, days, hours, minutes FROM tatimport WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
//         return rows;
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const updateImpTATData = async (impTATData, orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();

//         for (const item of impTATData) {
//             const { document, tat } = item;
//             const { days, hours, minutes } = tat;

//             await connection.execute(`UPDATE tatimport SET days = ?, hours = ?, minutes = ? WHERE orgname = ? AND orgcode = ? AND tatimpcolumn = ?`, [days, hours, minutes, orgname, orgcode, document]);
//         }
//         return 'Update successful'; // Return statement moved outside of the loop
//     } catch (error) {
//         console.log(error);
//     }
// }




// export const TATget = async (orgname, orgcode, ScrutinyDocument, PortCFSNomination, ChecklistApproval, ESanchit, FilingBOE, Assesment, DutyCall, ExaminationOOC) => {
//     try {
//         const connection = await connectMySQL();
//         const columnNames = [ScrutinyDocument, PortCFSNomination, ChecklistApproval, ESanchit, FilingBOE, Assesment, DutyCall, ExaminationOOC];
//         const [rows] = await connection.execute(`SELECT tatimpcolumn, days, hours, minutes FROM tatimport WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);

//         const result = [];

//         // Loop through each row
//         for (const row of rows) {
//             // Check if the tatimpcolumn value matches any of the specified column names
//             if (columnNames.includes(row.tatimpcolumn)) {
//                 // Extract days, hours, and minutes from the row
//                 const { days, hours, minutes } = row;

//                 // Store the extracted values in the result array
//                 result.push({ [row.tatimpcolumn]: { days, hours, minutes } });
//             }
//         }

//         return result;
//     } catch (error) {
//         console.log(error);
//     }
// };



export const fetchAlluseraccess = async (username) => {

    try {

        const [rows] = await connection.execute(
            `SELECT value, id FROM importaccess WHERE username = ?`,
            [username]
        );

        return rows;
    } catch (error) {
        console.log('Error in storeimpaccess:', error);
        throw error;
    }
}



export const fetchJobData = async (jobnumber) => {
    try {

        const [row] = await connection.execute(`SELECT * FROM impjobcreation WHERE jobnumber = ?`, [jobnumber]);
        return row;
    } catch (error) {
        console.log(error);
    }
}



export const storeinO2Dtable = async (planDate, actualDate, timedelay, status, orgname, orgcode, jobnumber, jobdoneby, tatimpcolumn, tat) => {
    try {
        const [existingRow] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ? AND jobdoneby = ?`, [orgname, orgcode, jobnumber, tatimpcolumn, jobdoneby]);

        if (existingRow.length > 0) {
            const [row] = await connection.execute(`UPDATE o2dimport SET actualdate = ?, timedelay = ?, status = ? WHERE tatimpcolumn = ? AND orgname = ? AND orgcode = ? AND jobnumber = ?`,
                [actualDate, timedelay, status, tatimpcolumn, orgname, orgcode, jobnumber]);
            return row;
        } else {
            const [row] = await connection.execute(`INSERT INTO o2dimport (tatimpcolumn, plandate, actualdate, timedelay, orgname, orgcode, status, jobnumber, jobdoneby, tat) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [tatimpcolumn, planDate, actualDate, timedelay, orgname, orgcode, status, jobnumber, jobdoneby, tat]);
            return row;
        }

    } catch (error) {
        console.log(error);
    }
}

// export const storeNextRow = async (planDate, tatimpcolumn, orgname, orgcode, jobnumber, jobdoneby, tat, status, actualDate, timedelay) => {
//     try {
//         const [nextRow] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ? AND jobdoneby = ?`, [orgname, orgcode, jobnumber, tatimpcolumn, jobdoneby]);

//         if (nextRow.length > 0) {
//             const [row] = await connection.execute(`UPDATE o2dimport SET actualdate = ?, timedelay = ?, status = ? WHERE tatimpcolumn = ? AND orgname = ? AND orgcode = ? AND jobnumber = ?`,
//                 [actualDate, timedelay, status, tatimpcolumn, orgname, orgcode, jobnumber]);
//             return row;
//         } else {
//             const [row] = await connection.execute(`INSERT INTO o2dimport (tatimpcolumn, plandate, orgname, orgcode, jobnumber, jobdoneby, tat) 
//             VALUES (?, ?, ?, ?, ?, ?, ?)`, [tatimpcolumn, planDate, orgname, orgcode, jobnumber, jobdoneby, tat]);
//             return row;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }






// export const storeinO2Dtable = async (planDate, actualDate, timedelay, status, orgname, orgcode, jobnumber, jobdoneby, tatimpcolumn, tat) => {
//     try {

//         const [underrow] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ? AND jobdoneby = ?`, [orgname, orgcode, jobnumber, tatimpcolumn, jobdoneby]);
//         if (underrow.length > 0) {
//             const [row] = await connection.execute(`UPDATE o2dimport SET actualdate = ?, timedelay = ?, status = ? WHERE tatimpcolumn = ? AND orgname = ? AND orgcode = ? AND jobnumber = ?`,
//                 [actualDate, timedelay, status, tatimpcolumn, orgname, orgcode, jobnumber]);
//             return row;
//         } else {
//             const [row] = await connection.execute(`INSERT INTO o2dimport (tatimpcolumn, plandate, actualdate, timedelay, orgname, orgcode, status, jobnumber, jobdoneby, tat) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [tatimpcolumn, planDate, actualDate, timedelay, orgname, orgcode, status, jobnumber, jobdoneby, tat]);
//             return row;
//         }

//     } catch (error) {
//         console.log(error);
//     }
// }



// export const storeNextRow = async (planDate, tatimpcolumn, orgname, orgcode, jobnumber, jobdoneby, tat, status, actualDate, timedelay) => {
//     try {
//         const [nextRow] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ? AND jobdoneby = ?`, [orgname, orgcode, jobnumber, tatimpcolumn, jobdoneby]);

//         if (nextRow.length > 0) {
//             const [row] = await connection.execute(`UPDATE o2dimport SET actualdate = ?, timedelay = ?, status = ? WHERE tatimpcolumn = ? AND orgname = ? AND orgcode = ? AND jobnumber = ?`,
//                 [actualDate, timedelay, status, tatimpcolumn, orgname, orgcode, jobnumber]);
//             return row;
//         } else {
//             const [row] = await connection.execute(`INSERT INTO o2dimport (tatimpcolumn, plandate, orgname, orgcode, jobnumber, jobdoneby, tat) 
//             VALUES (?, ?, ?, ?, ?, ?, ?)`, [tatimpcolumn, planDate, orgname, orgcode, jobnumber, jobdoneby, tat]);
//             return row;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }



export const deletetheO2DtoNull = async (tatimpcolumn, jobNumber, orgname, orgcode) => {
    try {

        const [updatedRow] = await connection.execute(`DELETE FROM o2dimport WHERE tatimpcolumn = ? AND jobnumber = ? AND orgname = ? AND orgcode = ?`, [tatimpcolumn, jobNumber, orgname, orgcode]);
        // const [row] = await connection.execute(`SELECT id, planDate, actualDate, timedelay, status FROM o2dimport WHERE id = ? AND orgname = ? AND orgcode = ?`, [id, orgname, orgcode]);
        // return row;
    } catch (error) {
        console.log(error);
    }
}


export const fetchallimpjobs = async (orgname, orgcode, branchname, branchcode) => {
    try {

        const [rows] = await connection.execute('SELECT * FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?', [orgname, orgcode, branchname, branchcode]);
        const [genrows] = await connection.execute(`SELECT * FROM impgeneral WHERE orgname = ? AND orgcode = ? AND branchnameofjob = ? AND branchcodeofjob = ?`, [orgname, orgcode, branchname, branchcode]);
        return {
            rows,
            genrows
        };
    } catch (error) {
        console.log(error);
    }
}



export const storeRemark = async (remarkskaData, orgname, orgcode, jobnumber) => {
    try {

        const rowsToUpdate = [];

        remarkskaData.forEach(item => {
            if (item.remarks !== '') {
                rowsToUpdate.push(item);
            }
        });

        for (const item of rowsToUpdate) {
            const { tatimpcolumn, remarks } = item;
            const [rows] = await connection.execute(`UPDATE o2dimport SET remarks = ? WHERE tatimpcolumn = ? AND orgname = ? AND orgcode = ? AND jobnumber = ?`, [remarks, tatimpcolumn, orgname, orgcode, jobnumber]);
        }


    } catch (error) {
        console.log(error);
    }
};



export const deleteJob = async (orgname, orgcode, jobnumber) => {
    try {

        const [row] = await connection.execute(`DELETE FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`, [orgname, orgcode, jobnumber]);
        const [deletedgenrow] = await connection.execute(`DELETE FROM impgeneral WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`, [orgname, orgcode, jobnumber]);
        const [deletedo2drows] = await connection.execute(`DELETE FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`, [orgname, orgcode, jobnumber]);

    } catch (error) {
        console.log(error);
    }
}


export const fetchingGeneralofJob = async (jobnumber, orgcode, orgname) => {
    try {

        const [row] = await connection.execute(`SELECT * FROM impgeneral WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`, [orgname, orgcode, jobnumber]);
        return row[0];
    } catch (error) {
        console.log(error);
    }
}



export const updateGeneral = async (importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, orgname, orgcode, jobnumber, jobowner) => {
    try {

        const [row] = await connection.execute(`
            UPDATE impgeneral
            SET importername = ?, address = ?, GST = ?, IEC = ?, portofshipment = ?, finaldestination = ?, branchname = ?
            WHERE jobnumber = ? AND orgname = ? AND orgcode = ? AND jobowner = ?
        `, [importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, jobnumber, orgname, orgcode, jobowner]);

    } catch (error) {
        console.log(error);
    }
}



export const updateCurrentJob = async (docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, blstatus, freedays, jobnumber, benumber, shippinglinebond) => {
    try {

        const [row] = await connection.execute(`
        UPDATE impjobcreation
        SET docreceivedon = ?, transportmode = ?, customhouse = ?, ownbooking = ?, deliverymode = ?, noofcontainer = ?, 
            owntransportation = ?, betype = ?, consignmenttype = ?, cfsname = ?, shippinglinename = ?, bltype = ?,
            bltypenum = ?, freedays = ?, blstatus = ?, benumber = ?, shippinglinebond = ?
        WHERE jobnumber = ?
        `, [docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, freedays, blstatus, benumber, shippinglinebond, jobnumber])
    } catch (error) {
        console.log(error);
    }
}


export const getO2Ddatafromo2dimport = async (orgname, orgcode, jobNumber) => {
    try {

        const [rows] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`, [orgname, orgcode, jobNumber]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}








export const getDND = async (orgname, orgcode) => {
    try {

        const [rows] = await connection.execute(`SELECT * FROM dondelivery WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const storeDNDintable = async (tatimpcolumn, days, hours, minutes, orgname, orgcode) => {
    try {

        const [row] = await connection.execute('INSERT INTO dondelivery (tatimpcolumn, days, hours, minutes, orgname, orgcode) VALUES (?, ?, ?, ?, ?, ?)', [tatimpcolumn, days, hours, minutes, orgname, orgcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const updateDND = async (tatimpcolumn, days, hours, minutes, orgname, orgcode, id) => {
    try {

        const [row] = await connection.execute(`UPDATE dondelivery SET tatimpcolumn = ?, days = ?, hours = ?, minutes = ? WHERE orgname = ? AND orgcode = ? AND id = ?`, [tatimpcolumn, days, hours, minutes, orgname, orgcode, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const deleteDND = async (orgname, orgcode, deletionrowid) => {
    try {

        const [row] = await connection.execute(`DELETE FROM dondelivery WHERE orgname = ? AND orgcode = ? AND id = ?`, [orgname, orgcode, deletionrowid]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const getDispatch = async (orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
        const [rows] = await connection.execute(`SELECT * FROM dispatch WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const storeDispatchintable = async (tatimpcolumn, days, hours, minutes, orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
        const [row] = await connection.execute('INSERT INTO dispatch (tatimpcolumn, days, hours, minutes, orgname, orgcode) VALUES (?, ?, ?, ?, ?, ?)', [tatimpcolumn, days, hours, minutes, orgname, orgcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updateDispatch = async (tatimpcolumn, days, hours, minutes, orgname, orgcode, id) => {
    try {
        const connection = await connectMySQL();
        const [row] = await connection.execute(`UPDATE dispatch SET tatimpcolumn = ?, days = ?, hours = ?, minutes = ? WHERE orgname = ? AND orgcode = ? AND id = ?`, [tatimpcolumn, days, hours, minutes, orgname, orgcode, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const deleteDispatch = async (orgname, orgcode, deletionrowid) => {
    try {
        const connection = await connectMySQL();
        const [row] = await connection.execute(`DELETE FROM dispatch WHERE orgname = ? AND orgcode = ? AND id = ?`, [orgname, orgcode, deletionrowid]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const O2DinsertUnderprocess = async (username, orgname, orgcode, jobNumber, rowname, status, tat, planDate) => {
    try {
        const connection = await connectMySQL();
        const [insertedRow] = await connection.execute(`INSERT INTO o2dimport 
        (jobdoneby, jobnumber, status, orgname, orgcode, tatimpcolumn, tat, plandate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [username, jobNumber, status, orgname, orgcode, rowname, tat, planDate]);
    } catch (error) {
        console.log(error);
    }
}


export const GetUnderprocess = async (orgname, orgcode, status, jobNumber) => {
    try {

        const [row] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND status = ? AND jobnumber = ?`, [orgname, orgcode, status, jobNumber]);
        return row;
    } catch (error) {
        console.log(error);
    }
}



export const putETA = async (orgname, orgcode, jobNumber, jobdoneby, tatdayhrmin, planDate, tatimpcolumn) => {
    try {
        // Execute the SELECT query and await the result
        const [row] = await connection.execute(`SELECT * FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND jobdoneby = ? AND tatimpcolumn = ?`,
            [orgname, orgcode, jobNumber, jobdoneby, tatimpcolumn]);

        // Check if the row exists
        if (row && row.length > 0) {
            // If the row exists, execute the UPDATE query
            const [updatedRow] = await connection.execute(`UPDATE o2dimport SET plandate = ? WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND jobdoneby = ? AND tatimpcolumn = ?`,
                [planDate, orgname, orgcode, jobNumber, jobdoneby, tatimpcolumn]);
        } else {
            // If the row does not exist, execute the INSERT query
            const [insertedRow] = await connection.execute(`INSERT INTO o2dimport (jobdoneby, jobnumber, plandate, tat, tatimpcolumn, orgname, orgcode) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [jobdoneby, jobNumber, planDate, tatdayhrmin, tatimpcolumn, orgname, orgcode]);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export const fetchPlanDateETA = async (orgname, orgcode, jobNumber, tatimpcolumn) => {
    try {
        const [row] = await connection.execute(`SELECT plandate FROM o2dimport WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND tatimpcolumn = ?`, [orgname, orgcode, jobNumber, tatimpcolumn]);
        console.log(row);
        return row;
    } catch (error) {
        console.log(error);
    }
}



export const createdatemanually = async (orgname, orgcode, ownbranchname, lobname, workflowname, plandate, days, hours, minutes, username, jobnumber, ownbranchcode) => {
    try {
        // Calculate TAT (turnaround time) based on days, hours, and minutes
        const tat = `${days} d ${hours} hr ${minutes} min`;

        // Check if there is already a row with the same criteria in the database
        const [rows] = await connection.execute(
            `SELECT plandate, tatimpcolumn, plandate FROM trackingimport WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatimpcolumn = ?`,
            [orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]
        );

        if (rows.length > 0) {
            // If a row exists, update the plandate
            const [row] = await connection.execute(
                `UPDATE trackingimport SET plandate = ? WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ? AND tatimpcolumn = ?`,
                [plandate, orgname, orgcode, lobname, ownbranchname, jobnumber, workflowname]
            );
        } else {
            // If no row exists, insert a new row with the provided data
            const [row] = await connection.execute(
                `INSERT INTO trackingimport (orgname, orgcode, ownbranchname, lobname, tatimpcolumn, plandate, jobnumber, jobdoneby, tat, ownbranchcode) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [orgname, orgcode, ownbranchname, lobname, workflowname, plandate, jobnumber, username, tat, ownbranchcode]
            );
        }

    } catch (error) {
        console.log(error);
    }
}



export const getCompletedRowsofthetracking = async (orgname, orgcode, lobname, ownbranchname, jobnumber) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM trackingimport WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ? AND jobnumber = ?`, [orgname, orgcode, lobname, ownbranchname, jobnumber]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const insertedCompletedTrackingRows = async (
    lobname, ownbranchname, importername,
    orgname, orgcode, workflowname, status, planDate,
    timedelay, days, hours, minutes, actualDate, jobnumber, jobdoneby, ownbranchcode
) => {
    try {

        const [row] = await connection.execute(
            `INSERT INTO trackingimport (orgname, orgcode, tatimpcolumn, plandate, actualdate, 
                timedelay, status, jobnumber, jobdoneby, tat, lobname, ownbranchname, ownbranchcode, clientname)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                orgname,
                orgcode,
                workflowname,
                planDate,
                actualDate,
                timedelay,
                status,
                jobnumber,
                jobdoneby,
                `${days}d ${hours}hr ${minutes}min`,
                lobname,
                ownbranchname,
                ownbranchcode,
                importername
            ]
        );

    } catch (error) {
        console.log(error);
    }
};



export const deleteCompletedRowofImport = async (lobname, ownbranchname, importername,
    orgname, orgcode, workflowname, jobnumber, ownbranchcode) => {
    try {
        const [row] = await connection.execute('DELETE FROM trackingimport WHERE lobname = ? AND ownbranchname = ? AND clientname = ? AND orgname = ? AND orgcode = ? AND tatimpcolumn = ? AND jobnumber = ? AND ownbranchcode = ?', [lobname, ownbranchname, importername, orgname, orgcode, workflowname, jobnumber, ownbranchcode]);
    } catch (error) {
        console.log(error);
    }
}


export const updateRemarks = async (id, lobname, importername, orgname, orgcode, remarks, workflowname) => {
    try {
        const [row] = await connection.execute(`UPDATE trackingimport SET remarks = ? WHERE lobname = ? AND orgname = ? AND orgcode = ? AND clientname = ? AND tatimpcolumn = ?`, [remarks, lobname, orgname, orgcode, importername, workflowname]);
    } catch (error) {
        console.log(error);
    }
}