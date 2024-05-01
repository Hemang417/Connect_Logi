import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const storeApproverName = async (orgname, orgcode, approverName, branchname, branchcode) => {
    try {
        const [row] = await connection.execute('INSERT INTO approverlist (orgname, orgcode, approverlistname, branchname, branchcode) VALUES(?,?,?,?,?)', [orgname, orgcode, approverName, branchname, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const getApproverlist = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const deletedApproverlist = async (orgname, orgcode, approverlistname, branchname, branchcode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM approverlist WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchname = ? AND branchcode = ?`, [orgname, orgcode, approverlistname, branchname, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

export const UpdatedApproverList = async (orgname, orgcode, approverName, branchname, branchcode) => {
    try {
        await connection.execute(
            'UPDATE approverlist SET approverlistname = ? WHERE orgname = ? AND orgcode = ? AND branchcode = ?',
            [approverName, orgname, orgcode, branchcode]
        );
    } catch (error) {
        console.error('Error updating approver list:', error);
        throw error; // Rethrow the error for proper error handling in the Express route
    }
};
