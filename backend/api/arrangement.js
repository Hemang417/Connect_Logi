import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();


export const storeArrangement = async (orgname, orgcode, data, branchname, branchcode) => {
    try {
        const [row] = await connection.execute(`INSERT INTO customjobnumber (orgname, orgcode, columnname, branchname, branchcode) VALUES(?,?,?,?,?)`, [orgname, orgcode, data, branchname, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const getBranchcodeandname = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deleteArrangement = async (orgname, orgcode, data, branchname, branchcode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM customjobnumber 
        WHERE orgname = ? AND orgcode = ? AND columnname = ? AND branchname = ? AND branchcode = ?`, [orgname, orgcode, data, branchname, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const getArrangementofthatbranch = async (orgname, orgcode, branchname, branchcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ?
        AND branchcode = ?`, [orgname, orgcode, branchname, branchcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const updateColumn = async (orgname, orgcode, branchname, branchcode, custominput) => {
    try {
        const [row] = await connection.execute(
            `UPDATE customjobnumber 
            SET inputofcustom = ? 
            WHERE orgname = ? 
            AND orgcode = ? 
            AND branchname = ? 
            AND branchcode = ? 
            AND columnname = 'Custom'`,
            [custominput, orgname, orgcode, branchname, branchcode]
        );
        return row;
    } catch (error) {
        console.log(error);
    }
}   