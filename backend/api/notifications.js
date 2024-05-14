import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();


export const fetchNotifications = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM notifications WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        const [orgrows] = await connection.execute(`SELECT * FROM organizations WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);

        return {
            notifications: rows,
            organizations: orgrows
        };
    } catch (error) {
        console.log(error);
    }
}






export const updatethereadingrowwithtimeandvalue = async (orgname, orgcode, address, clientname, country, state, city, postalcode, alias, pan, gst, iec, branchname, creditdays, username, id, currentDate, reading, timeofreading, employeename) => {
    try {
        const [row] = await connection.execute(`SELECT reading FROM notifications WHERE orgname = ? AND orgcode = ? AND id = ?`, [orgname, orgcode, id]);
        const { reading } = row[0]
        const updatedReading = reading.map(item => {
            if (item.employeename === employeename) {
                return { ...item, read: 1 }; // Update read attribute to 1 where employeename matches
            }
            return item;
        });

        // Update the row in the database with the modified reading data
        await connection.execute(`UPDATE notifications SET reading = ? WHERE orgname = ? AND orgcode = ? AND id = ?`, [JSON.stringify(updatedReading), orgname, orgcode, id]);

        const [timeofreadingrow] = await connection.execute(`SELECT timeofreading FROM notifications WHERE orgname = ? AND orgcode = ? AND id = ?`, [orgname, orgcode, id]);
        const { timeofreading } = timeofreadingrow[0]
        const updatedTimeOfReading = timeofreading.map(item => {
            if (item.employeename === employeename) {
                return { ...item, time: currentDate }; // Update time attribute to currentDate where employeename matches
            }
            return item;
        });

        await connection.execute(`UPDATE notifications SET timeofreading = ? WHERE orgname = ? AND orgcode = ? AND id = ?`, [JSON.stringify(updatedTimeOfReading), orgname, orgcode, id]);

    } catch (error) {
        throw error; // Throw the error to be caught and handled by the caller
    }
}










// export const updatethereadingrowwithtimeandvalue = async (orgname, orgcode, address, clientname, country, state, city, postalcode, alias, pan, gst, iec, branchname, creditdays, username, id, currentDate, reading, timeofreading, employeename) => {
//     try {
//         // Update the 'read' column
//         const [row] = await connection.execute(`
//             UPDATE notifications 
//             SET reading = ? 
//             WHERE orgname = ? AND orgcode = ? AND clientname = ? AND id = ?
//         `, [1, orgname, orgcode, clientname, id]);

//         // Update the 'timeofreading' column
//         const [rows] = await connection.execute(`
//             UPDATE notifications 
//             SET timeofreading = ? 
//             WHERE orgname = ? AND orgcode = ? AND clientname = ? AND id = ?
//         `, [currentDate, orgname, orgcode, clientname, id]);

//         // Optionally, you can return some indication of success
//         return { success: true };
//     } catch (error) {
//         throw error; // Throw the error to be caught and handled by the caller
//     }
// }



export const readallnotifications = async (currentDate, notifications) => {
    try {

        // const allreaddone = notifications.map(async (item) => {
        //     const [row] = await connection.execute(`UPDATE notifications SET reading = ?, timeofreading = ? 
        // WHERE orgname = ? AND orgcode = ? AND id = ?`, [1, currentDate, item.orgname, item.orgcode, item.orgcode, item.id]);
        // })

        const allReadDone = notifications.map(async (item) => {
            const [row] = await connection.execute(
                `UPDATE notifications SET reading = ?, timeofreading = ? 
                WHERE orgname = ? AND orgcode = ? AND id = ?`,
                [1, currentDate, item.orgname, item.orgcode, item.id]
            );
        });
        return allReadDone;

    } catch (error) {
        console.log(error);
    }
}