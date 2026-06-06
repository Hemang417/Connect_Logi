import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const StorePayEDetails = async (payename, bankname, accounttype, bankaccountno, ifsc, orgname, orgcode) => {
    try {
        const [row] = await connection.execute(`INSERT INTO payeaccount (payename, bankname, accounttype, accountnum, ifscCode, orgname, orgcode) VALUES (?, ?, ?, ?, ?, ?, ?)`, [payename, bankname, accounttype, bankaccountno, ifsc, orgname, orgcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const GetPayEDetails = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM payeaccount WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deletePayEDetails = async (orgname, orgcode, accountnum, ifscCode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM payeaccount WHERE 
            orgname = ? AND orgcode = ? AND ifscCode = ? AND accountnum = ?`,
            [orgname, orgcode, ifscCode, accountnum]);
            return row;
    } catch (error) {
        console.log(error);
    }
}