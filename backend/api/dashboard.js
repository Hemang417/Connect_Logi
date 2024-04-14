import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const switchBranchsogetBranch = async (orgname, orgcode, username) => {
    try {
        let rows;
        if(username === "admin"){
            [rows] = await connection.execute('SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        }else {
            [rows] = await connection.execute('SELECT ownbranchname, branchcode FROM branchaccess WHERE orgname = ? AND orgcode = ? AND username = ?', [orgname, orgcode, username]);
        }
        return rows;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}
