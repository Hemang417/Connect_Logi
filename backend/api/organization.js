import { connectMySQL } from "../config/sqlconfig.js";


// STORING 
export const OrgDataStorage = async (clientname, orgname, orgcode, address, country, state, city, postalCode, phoneNumber, emailAddress, PAN, GST, IEC, creditdays) => {
    try {
        const connection = await connectMySQL();
        // Check if data exists in the users table for the provided orgname and orgcode
        const [row] = await connection.execute(`
            SELECT * FROM users WHERE orgname = ? AND orgcode = ?
        `, [orgname, orgcode]);
       
        // Extract alias from orgname
        const firstEmptyIndex = clientname.indexOf(' ');
        const aliasisthis = clientname.slice(0, firstEmptyIndex !== -1 ? firstEmptyIndex : orgname.length).toLowerCase();

        // Insert data into the organizations table
        const [rows] = await connection.execute(`
            INSERT INTO crm_db.organizations (clientname, alias, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [clientname, aliasisthis, address, country, state, city, postalCode, phoneNumber, emailAddress, PAN, GST, IEC, creditdays, orgname, orgcode]);
        
        return rows;
    } catch (error) {
        console.error('Error inserting organization data:', error.message);
        throw error;
    }
}


// RENDER ON ORGANIZATION PAGE
export const OrgRender = async (orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
       
        const [row] = await connection.execute(`
            SELECT clientname, alias FROM organizations WHERE orgname = ? AND orgcode = ?
        `, [orgname, orgcode]);
        return row;
    } catch (error) {
        console.error('Error fetching organization data:', error.message);
        throw error;
    }
}
