import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();


export const storeMilestone = async (orgname, orgcode, milestonename, lob, ownbranchname) => {
    try {
        // Perform the database query to insert the milestone data
        const [row] = await connection.execute(
            'INSERT INTO milestone (orgname, orgcode, milestonename, lobname, ownbranchname) VALUES (?, ?, ?, ?, ?)',
            [orgname, orgcode, milestonename, lob, ownbranchname]
        );
        return row;
    } catch (error) {
        console.log('Error storing milestone:', error);
        throw error;
    }
}


export const getAllMilestones = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM milestone WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deleteMilestone = async (id) => {
    try {
        const [row] = await connection.execute('DELETE FROM milestone WHERE id = ?', [id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const updateMilestone = async (orgname, orgcode, milestonename, lob, ownbranchname, id) => {
    try {
        const [row] = await connection.execute(`UPDATE milestone SET lobname = ?, milestonename = ?, ownbranchname = ? WHERE id = ?`, [lob, milestonename, ownbranchname, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}
