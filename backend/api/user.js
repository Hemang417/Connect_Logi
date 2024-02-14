import { connectMySQL } from "../config/sqlconfig.js";

// LOGIN API
export const getTheUser = async (username, password, orgcode) => {
    try {
        const connection = await connectMySQL();
        const [rows] = await connection.execute(`SELECT * FROM users WHERE username = ? AND password = ? AND orgcode = ?`, 
        [username, password, orgcode]);
        return rows;
    } catch (error) {
        console.error('Error inserting user:', error.message);
        throw error;
    }
}