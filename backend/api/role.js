import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const storingRole = async (orgname, orgcode, userrole) => {
    try {
        const [row] = await connection.execute(`INSERT INTO userroles (orgname, orgcode, rolename) VALUES (?,?,?)`, [orgname, orgcode, userrole]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const getUserRoles = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM userroles WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const DeleteUserRole = async (orgname, orgcode, userrole) => {
    try {
        const [row] = await connection.execute(`DELETE FROM userroles WHERE orgname = ? AND orgcode = ? AND rolename = ?`, [orgname, orgcode, userrole]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updateRoleofuser = async (orgname, orgcode, userrole, id) => {
    try {
        const [row] = await connection.execute('UPDATE userroles SET rolename = ? WHERE orgname = ? AND orgcode = ? AND id = ?', [userrole, orgname, orgcode, id]);
        // Optionally, you can return the affected rows or any other useful information here
        return row;
    } catch (error) {
        console.log(error);
        throw error; // You might want to handle or propagate the error further depending on your application logic
    }
}
