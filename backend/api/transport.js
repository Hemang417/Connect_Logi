import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const transportPlanning = async (orgname , orgcode  , branchname , branchcode) =>{
    try {
        const[row] = await connection.execute(`SELECT * FROM expjobcreation WHERE orgname = ? AND orgcode = ? branchname = ? branchcode = ? owntransportation = ?` , [orgname , orgcode  , branchname , branchcode , 'Yes'])

        return row;
    } catch (error) {
        console.error("Error transport Planning:", error);
         throw error;
    }
}