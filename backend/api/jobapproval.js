import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const getapproverofJobs = async (orgname, orgcode, uniquevalue) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        const matchingRows = rows.filter(row => row.uniquevalue.includes(uniquevalue));
        return matchingRows;
    } catch (error) {
        console.log(error);
    }
}


export const getJob = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvalimpjob WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}