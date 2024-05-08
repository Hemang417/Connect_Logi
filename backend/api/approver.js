import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

export const storeApproverName = async (orgname, orgcode, approverName, branchname, branchcode, uniquevalue) => {
    try {
        const [row] = await connection.execute('INSERT INTO approverlist (orgname, orgcode, approverlistname, branchname, branchcode, uniquevalue) VALUES(?,?,?,?,?,?)', [orgname, orgcode, approverName, branchname, branchcode, uniquevalue]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const getApproverlist = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const deletedApproverlist = async (orgname, orgcode, approverlistname, branchname, branchcode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM approverlist WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchname = ? AND branchcode = ?`, [orgname, orgcode, approverlistname, branchname, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

export const UpdatedApproverList = async (orgname, orgcode, approverName, branchname, branchcode, uniquevalue) => {
    try {

        const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`, [orgname, orgcode, branchname, branchcode, approverName]);

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                await connection.execute(`UPDATE approvername SET uniquevalue = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`, [uniquevalue, orgname, orgcode, branchname, branchcode, approverName]);
            }
        }

        await connection.execute(
            'UPDATE approverlist SET approverlistname = ?, uniquevalue = ? WHERE orgname = ? AND orgcode = ? AND branchcode = ?',
            [approverName, uniquevalue, orgname, orgcode, branchcode]
        );
    } catch (error) {
        console.error('Error updating approver list:', error);
        throw error; // Rethrow the error for proper error handling in the Express route
    }
};


export const Addnametoapproverlist = async (orgname, orgcode, branchname, approverlistname, branchcode, employeeName, uniquevalue) => {
    try {
        const [row] = await connection.execute(`INSERT INTO approvername (orgname, orgcode, branchname, approverlistname, branchcode, employeename, uniquevalue) VALUES(?,?,?,?,?,?, ?)`, [orgname, orgcode, branchname, approverlistname, branchcode, employeeName, [uniquevalue]]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const getnamesoftheapproverlist = async (orgname, orgcode, branchname, branchcode, approverlistname) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`, [orgname, orgcode, branchname, branchcode, approverlistname]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const deletenamefromapproverlist = async (orgname, orgcode, branchname, branchcode, approverlistname, employeename) => {
    try {
        const [row] = await connection.execute(`DELETE FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND employeename = ?`, [orgname, orgcode, branchname, branchcode, approverlistname, employeename]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updateApproverName = async (orgname, orgcode, branchname, branchcode, approverlistname, employeename) => {
    try {
        const [row] = await connection.execute(
            `UPDATE approvername SET employeename = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
            [employeename, orgname, orgcode, branchname, branchcode, approverlistname]
        );
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const getApproverName = async (orgname, orgcode, unique) => {
    try {
        // Construct the SQL query to fetch rows based on orgname and orgcode
        const query = `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`;

        // Add the organization name and organization code to the parameter array
        const params = [orgname, orgcode];

        // Execute the query with the parameters
        const [rows] = await connection.execute(query, params);

        // Check if any row's uniquevalue matches the provided unique value
        const matchingRows = rows.filter(row => row.uniquevalue.includes(unique));
        console.log(matchingRows);
        // Return the filtered rows
        return matchingRows;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it at a higher level
    }
};



export const fetchLatestOrganizationfromtable = async (orgname, orgcode) => {
    try {
        const query = `SELECT * FROM approvalorg WHERE orgname = ? AND orgcode = ?`;
        const [row] = await connection.execute(query, [orgname, orgcode]);
        return row;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const fetchApprovernameunique = async (orgname, orgcode, uniquevalue) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        const matchingRows = rows.filter(row => row.uniquevalue.includes(uniquevalue));
        return matchingRows;
    } catch (error) {
        console.log(error);
    }
}


export const updatedData = async (orgId, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, address, orgname, orgcode, clientname, branchname, username, status) => {
    try {
        const [row] = await connection.execute(`
            UPDATE approvalorg 
            SET country = ?,
                state = ?,
                city = ?,
                postalcode = ?,
                phone = ?,
                email = ?,
                PAN = ?,
                GST = ?,
                IEC = ?,
                creditdays = ?,
                address = ?,
                approval = JSON_ARRAY_APPEND(
                    COALESCE(approval, JSON_ARRAY()),
                    '$',
                    JSON_OBJECT('username', ?, 'status', ?)
                )
            WHERE orgname = ? AND orgcode = ? AND id = ? AND clientname = ?`,
            [country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, address, username, status, orgname, orgcode, orgId, clientname]
        );
    } catch (error) {
        console.log(error);
    }
}



export const getApprovedRows = async (orgname, orgcode, length) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvalorg WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);

        const approvedRows = rows.filter((row) => {
            if (row.approval !== null && row.approval.length === length) {
                const approvals = JSON.stringify(row.approval) // Assuming 'approval' column stores JSON string
                const approvalrow = JSON.parse(approvals)
                return approvalrow.map((item) => item.status === 'Approve');
            }
        });
        
        
        for (const row of approvedRows) {
            const [existingRow] = await connection.execute(`SELECT * FROM organizations WHERE orgname = ? AND orgcode = ? AND clientname = ?`, [orgname, orgcode, row.clientname]);
            if (existingRow.length === 0) {
                // Insert the row into the organizations table
                await connection.execute(`INSERT INTO organizations (alias, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, address, orgcode, orgname, clientname, branchname, username, uniquevalue) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`, [row.alias, row.country, row.state, row.city, row.postalcode, row.phone, row.email, row.PAN, row.GST, row.IEC, row.creditdays, row.address, row.orgcode, row.orgname, row.clientname, row.branchname, row.username, row.uniquevalue]);
                console.log('Inserted row:', row);
            }
        }

        return approvedRows;

    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}




