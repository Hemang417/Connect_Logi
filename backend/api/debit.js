import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const GetClientNamesofTheOrg = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT clientname FROM organizations WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const StoreDebit = async (orgname, orgcode, branchname, branchcode, date, bankname, typeofExpense, taxableAmount, gstAmount, totalInvoiceAmount, tdsAmount, netPaymentAmount, utrDetails, jobNo, customerName, remarks, userInput) => {
    try {
        const [row] = await connection.execute(`INSERT INTO debit 
            (orgname, orgcode, branchname, branchcode, date, bankname, typeofexpense, paymentdetail, 
            taxamount, totalinvoiceamount, gstamount, tdsamount, netpaymentamount, utrnumber, jobnumber, customername, remarks)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [orgname, orgcode, branchname, branchcode, date, bankname, typeofExpense, taxableAmount, totalInvoiceAmount, gstAmount, tdsAmount, netPaymentAmount, utrDetails, jobNo, customerName, remarks]);
    } catch (error) {
        console.log(error);
    }
}