import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storethelob = async (lobname, transportmode, orgname, orgcode) => {
    try {
        const fulllobname =  transportmode + " " + lobname;
        // Execute the INSERT query to insert the new LOB into the database
        const [row] = await connection.execute(`INSERT INTO lob (lobname, orgname, orgcode, transportmode) VALUES (?,?,?, ?)`, [fulllobname, orgname, orgcode, transportmode]);
        
        // Return the inserted row
        return row;
    } catch (error) {
        // Log any errors that occur during the database operation
        console.log(error);
    }
}


export const getAlltheLOB = async (orgcode, orgname) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM lob WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const deleteLOB = async (id) => {
    try {
        const [row] = await connection.execute('DELETE FROM lob WHERE id = ?', [id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updateLOB = async (id, lobname) => {
    try {
        const [row] = await connection.execute('UPDATE lob SET lobname = ? WHERE id = ?', [lobname, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const fetchorgTAT = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT clientname, id FROM organizations WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}