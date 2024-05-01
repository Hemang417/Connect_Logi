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


export const Addnametoapproverlist = async (orgname, orgcode, branchname, approverlistname, branchcode, employeeName) => {
    try {
        const [row] = await connection.execute(`INSERT INTO approvername (orgname, orgcode, branchname, approverlistname, branchcode, employeename) VALUES(?,?,?,?,?,?)`, [orgname, orgcode, branchname, approverlistname, branchcode, employeeName]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const getnamesoftheapproverlist = async (orgname, orgcode, branchname, branchcode, approverlistname) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`, [orgname, orgcode, branchname, branchcode, approverlistname]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const deletenamefromapproverlist = async (orgname, orgcode, branchname, branchcode, approverlistname, employeename) => {
    try {
        const [row] = await connection.execute(`DELETE FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND employeename = ?`, [orgname, orgcode, branchname, branchcode, approverlistname, employeename]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updateApproverName = async (orgname, orgcode, branchname, branchcode, approverlistname, employeename) => {
    try {
        const [row] = await connection.execute(
            `UPDATE approvername SET employeename = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
            [employeename, orgname, orgcode, branchname, branchcode, approverlistname]
        );
        return row;
    } catch (error) {
        console.log(error);
    }
}
