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





export const insertEmployees = async (username, password, orgcode, branchname, orgname) => {
    try {
        const connection = await connectMySQL();
        console.log(username, password, orgcode, branchname, orgname);
        // Check if the organization exists in the users table
        const [rows] = await connection.execute(`
            SELECT * FROM users WHERE orgcode = ? AND orgname = ?
        `, [orgcode, orgname]);

        // If the organization doesn't exist, throw an error
        if (rows.length === 0) {
            throw new Error('Organization does not exist');
        }

        // Insert employee data into the employees table
        await connection.execute(`
            INSERT INTO employees (username, password, branchname, orgcode, orgname) 
            VALUES (?, ?, ?, ?, ?)
        `, [username, password, branchname, orgcode, orgname]);

        return { success: true, message: 'Employee inserted successfully' };
    } catch (error) {
        console.error('Error inserting employee data:', error.message);
        throw error;
    }
}