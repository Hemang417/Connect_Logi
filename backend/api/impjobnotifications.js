import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();


export const fetchImpJobs = async (orgname, orgcode, branchcode) => {
    try {
        const [row] = await connection.execute(`SELECT * FROM impnotifications WHERE orgname = ? AND orgcode = ? AND branchcode = ?`, [orgname, orgcode, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}   