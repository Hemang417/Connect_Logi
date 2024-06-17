import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const GetbranchesforAccounts = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const StoreBankDetails = async (bankname, accounttype, bankaccountno, ifsc, branchname, orgname, orgcode, branchcode, closingBalance) => {
    try {
        const [row] = await connection.execute(`INSERT INTO bankaccount (bankname, accountype, accountnum, ifscCode, ownbranchname, orgname, orgcode, ownbranchcode, closingBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [bankname, accounttype, bankaccountno, ifsc, branchname, orgname, orgcode, branchcode, closingBalance]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const GetBankDetails = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM bankaccount WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deleteBankDetails = async (orgname, orgcode, ownbranchcode, accountnum, ifscCode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM bankaccount WHERE 
            orgname = ? AND orgcode = ? AND ifscCode = ? AND accountnum = ? AND ownbranchcode = ?`,
            [orgname, orgcode, ifscCode, accountnum, ownbranchcode]);
            return row;
    } catch (error) {
        console.log(error);
    }
}