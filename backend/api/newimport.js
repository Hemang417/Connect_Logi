import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const getallthelobdataofbranchandlob = async (orgname, orgcode, lobname, ownbranchname) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND lobname = ? AND ownbranchname = ?', [orgname, orgcode, lobname, ownbranchname]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}