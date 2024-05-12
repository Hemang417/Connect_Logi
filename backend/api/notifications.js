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


export const updatethereadingrowwithtimeandvalue = async (orgname, orgcode, address, clientname, country, state, city, postalcode, alias, pan, gst, iec, branchname, creditdays, username, id, currentDate, reading, timeofreading) => {
    try {
        // Update the 'read' column
        const [row] = await connection.execute(`
            UPDATE notifications 
            SET reading = ? 
            WHERE orgname = ? AND orgcode = ? AND clientname = ? AND id = ?
        `, [1, orgname, orgcode, clientname, id]);

        // Update the 'timeofreading' column
        const [rows] = await connection.execute(`
            UPDATE notifications 
            SET timeofreading = ? 
            WHERE orgname = ? AND orgcode = ? AND clientname = ? AND id = ?
        `, [currentDate, orgname, orgcode, clientname, id]);

        // Optionally, you can return some indication of success
        return { success: true };
    } catch (error) {
        throw error; // Throw the error to be caught and handled by the caller
    }
}
