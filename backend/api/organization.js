import { connectMySQL } from "../config/sqlconfig.js";


// STORING 
export const OrgDataStorage = async (clientname, orgname, orgcode, address, country, state, city, postalCode, phoneNumber, emailAddress, PAN, GST, IEC, creditdays, branchName, username) => {
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
            INSERT INTO crm_db.organizations (clientname, alias, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode, branchname, username)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [clientname, aliasisthis, address, country, state, city, postalCode, phoneNumber, emailAddress, PAN, GST, IEC, creditdays, orgname, orgcode, branchName, username]);


        const [allrows] = await connection.execute(`INSERT INTO branches (branchname, clientname, orgcode) VALUES(?, ?, ?)`,
            [branchName, clientname, orgcode])

        return rows;
    } catch (error) {
        console.error('Error inserting organization data:', error.message);
        throw error;
    }
}


// RENDER ON ORGANIZATION PAGE
// export const OrgRender = async (orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();

//         const [row] = await connection.execute(`
//             SELECT clientname, alias, branchname FROM organizations WHERE orgname = ? AND orgcode = ?
//         `, [orgname, orgcode]);

//         return row;
//     } catch (error) {
//         console.error('Error fetching organization data:', error.message);
//         throw error;
//     }
// }






// export const OrgRender = async (orgname, orgcode) => {
//     try {
//         const connection = await connectMySQL();

//         const [rows] = await connection.execute(`
//             SELECT clientname, alias, branchname
//             FROM organizations
//             WHERE orgname = ? AND orgcode = ?
//         `, [orgname, orgcode]);
//         console.log(rows);
//         if (rows.length > 0) {
//             const branchNames = rows.map(row => row.branchname); // Use map instead of forEach
//             const organizationData = {
//                 clientname: rows[0].clientname,
//                 alias: rows[0].alias,
//                 allbranchesofclient: branchNames
//             };

//             return organizationData;
//         } else {
//             return null; // Handle case where organization not found
//         }
//     } catch (error) {
//         console.error('Error fetching organization data:', error.message);
//         throw error;
//     }
// }





export const OrgRender = async (orgname, orgcode) => {
    try {
        const connection = await connectMySQL();

        const [rows] = await connection.execute(`
            SELECT clientname, alias, branchname
            FROM organizations
            WHERE orgname = ? AND orgcode = ?
        `, [orgname, orgcode]);



        if (rows.length > 0) {
            const clientsMap = new Map(); // Map to store clients and their branches
            rows.forEach(row => {
                const { clientname, alias, branchname } = row;
                if (clientsMap.has(alias)) {
                    clientsMap.get(alias).branchname.push(branchname);
                } else {
                    clientsMap.set(alias, { clientname, alias, branchname: [branchname] });
                }
            });

            const organizationData = Array.from(clientsMap.values());
            return organizationData.flat(); // Flatten the array
        } else {
            return null; // Handle case where organization not found
        }
    } catch (error) {
        console.error('Error fetching organization data:', error.message);
        throw error;
    }
}





















// ADD USER VIA ADMIN API
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



export const fetchBranchData = async (clientname, alias, branchname) => {
    try {
        const connection = await connectMySQL();
        const [row] = await connection.execute(`SELECT * FROM organizations WHERE clientname = ? AND alias = ? AND branchname = ?`, [clientname, alias, branchname]);

        return row[0];
    } catch (error) {
        console.error('Error inserting employee data:', error.message);
        throw error;
    }
}






export const updateRow = async (orgcode, orgname, clientname, alias, branchname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays) => {
    try {
        const connection = await connectMySQL();

        const [row] = await connection.execute(`
            UPDATE organizations
            SET 
                address = ?,
                country = ?,
                state = ?,
                city = ?,
                postalcode = ?,
                phone = ?,
                email = ?,
                PAN = ?,
                GST = ?,
                IEC = ?,
                creditdays = ?
            WHERE 
                orgcode = ? AND
                orgname = ? AND
                branchname = ? AND
                clientname = ? AND
                alias = ?
        `, [
            address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays,
            orgcode,
            orgname,
            branchname,
            clientname,
            alias,
        ]);


        return row;
    } catch (error) {
        console.error('Error updating row:', error.message);
        throw error;
    }
}




// STORE CONTACTS
export const insertContact = async (contactName, designation, department, mobile, email, branchname, orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
        const row = await connection.execute(`INSERT INTO contacts 
        (contactName, designation, department, mobile, email, branchname, orgname, orgcode) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `, [contactName, designation, department, mobile, email, branchname, orgname, orgcode]);
        return row;
    } catch (error) {
        console.error('Error updating row:', error.message);
        throw error;
    }
}



export const fetchAllContacts = async (branchname, orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
        const [rows] = await connection.execute(`SELECT * FROM contacts WHERE branchname = ? AND orgname = ? AND orgcode = ?`, [branchname, orgname, orgcode]);
        return rows;
    } catch (error) {
        console.error('Error updating row:', error.message);
        throw error;
    }
}



export const deleteContact = async (email, mobile, contactName, designation, department) => {
    try {
        const connection = await connectMySQL();
        const row = await connection.execute(`DELETE FROM contacts WHERE email = ? AND mobile = ? AND contactName = ? AND designation = ? AND department = ?`, [email, mobile, contactName, designation, department]);
        return row;
    } catch (error) {
        console.error('Error updating row:', error.message);
        throw error;
    }
}


export const updateContact = async (contactName, designation, department, mobile, email, branchname, orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
        const row = await connection.execute(`UPDATE contacts SET contactName = ?, designation = ?, department = ?, mobile = ?, email = ? WHERE branchname = ? AND orgname = ? AND orgcode = ?`,
            [contactName, designation, department, mobile, email, branchname, orgname, orgcode]);
        return row;
    } catch (error) {
        console.error('Error updating row:', error.message);
        throw error;
    }
}