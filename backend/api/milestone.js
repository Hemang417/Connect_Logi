import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();


export const storeMilestone = async (orgname, orgcode, milestonename, lob, ownbranchname , currentDate ,username) => {
    try {  
        // Perform the database query to insert the milestone data
        const [row] = await connection.execute(
            'INSERT INTO milestone (orgname, orgcode, milestonename, lobname, ownbranchname , Date ,createdby) VALUES (?, ?, ?, ?, ? ,? ,?)',
            [orgname, orgcode, milestonename, lob, ownbranchname , currentDate ,username]
        );
        return row;
    } catch (error) {
        console.log('Error storing milestone:', error);
        throw error;
    }
}


export const getAllMilestones = async (orgname, orgcode) => {
    try {
        const isdeleted = 0;
        const [rows] = await connection.execute(`SELECT * FROM milestone WHERE orgname = ? AND orgcode = ? And Isdeleted = ?`, [orgname, orgcode , isdeleted]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deleteMilestone = async (id , deletedby , deletedat , DeleteRemark ) => {
    try {
        const isdelete = 1;
        const [row] = await connection.execute('UPDATE milestone SET IsDeleted = ?,deletedby = ? , deletedAt = ? , DeleteRemark = ?  WHERE id = ?', [ isdelete , deletedby , deletedat , DeleteRemark , id]);
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
