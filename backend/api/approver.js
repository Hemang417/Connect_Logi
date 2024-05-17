import { connectMySQL } from "../config/sqlconfig.js";
import { broadcast } from '../websocketServer.js'
const connection = await connectMySQL();

export const storeApproverName = async (orgname, orgcode, approverName, branchname, branchcode, uniquevalue) => {
    try {
        const [row] = await connection.execute('INSERT INTO approverlist (orgname, orgcode, approverlistname, branchname, branchcode, uniquevalue) VALUES(?,?,?,?,?,?)', [orgname, orgcode, approverName, branchname, branchcode, uniquevalue]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const getApproverlist = async (orgname, orgcode, branchname, branchcode) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?', [orgname, orgcode, branchname, branchcode]);
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

export const UpdatedApproverList = async (orgname, orgcode, approverName, branchname, branchcode, uniquevalue, id) => {
    try {

        const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND aid = ?`, [orgname, orgcode, branchname, branchcode, id]);

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                await connection.execute(`UPDATE approvername SET uniquevalue = ?, approverlistname = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND aid = ?`, [uniquevalue, approverName, orgname, orgcode, branchname, branchcode, id]);
            }
        }


        const [row] = await connection.execute(`
    UPDATE approverlist 
    SET approverlistname = ?, uniquevalue = ?
    WHERE orgname = ? 
    AND orgcode = ? 
    AND branchname = ? 
    AND branchcode = ? 
    AND id = ?`,
            [approverName, uniquevalue, orgname, orgcode, branchname, branchcode, id]);

    } catch (error) {
        console.error('Error updating approver list:', error);
        throw error; // Rethrow the error for proper error handling in the Express route
    }
};


export const Addnametoapproverlist = async (orgname, orgcode, branchname, approverlistname, branchcode, employeeName, uniquevalue, id) => {
    try {
        const [row] = await connection.execute(`INSERT INTO approvername (orgname, orgcode, branchname, approverlistname, branchcode, employeename, uniquevalue, aid) VALUES(?,?,?,?,?,?, ?, ?)`, [orgname, orgcode, branchname, approverlistname, branchcode, employeeName, [uniquevalue], id]);
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

export const deletenamefromapproverlist = async (orgname, orgcode, branchname, branchcode, approverlistname, employeename, id) => {
    try {
        const [row] = await connection.execute(`DELETE FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND employeename = ? AND aid = ?`, [orgname, orgcode, branchname, branchcode, approverlistname, employeename, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updateApproverName = async (orgname, orgcode, branchname, branchcode, approverlistname, employeename, id) => {
    try {
        const [row] = await connection.execute(
            `UPDATE approvername SET employeename = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND aid = ?`,
            [employeename, orgname, orgcode, branchname, branchcode, approverlistname, id]
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

        const [tobeupdatedRow] = await connection.execute(`
    SELECT * FROM notifications 
    WHERE orgname = ? AND orgcode = ? AND clientname = ?`,
            [orgname, orgcode, clientname]
        );

        const { reading } = tobeupdatedRow[0];
    
        const updatedApproval = reading.map(item => {
            if (item.employeename === username) {
                if (status === 'Approve') {
                    // Update read and approved attributes
                    return { ...item, read: 1, approved: 1 };
                }else if(status === 'Reject'){
                    return { ...item, read: 1, approved: -1 };
                }

            } else {
                // Return unchanged item
                return item;
            }
        });
        await connection.execute(`UPDATE notifications SET reading = ? WHERE orgname = ? AND orgcode = ? AND clientname = ?`, [JSON.stringify(updatedApproval), orgname, orgcode, clientname]);
        return row;
    } catch (error) {
        console.log(error);
    }
}



export const getApprovedRows = async (orgname, orgcode, uniquevalue) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM approvalorg WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        const [lengthrows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        const [mattrows] = await connection.execute(`SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode])

        const matchingRows = lengthrows.filter(row => row.uniquevalue.includes(uniquevalue));
        const matchingRows2 = mattrows.filter(row => row.uniquevalue[0] === uniquevalue);

        // const approvedRows = rows.filter((row) => {
        //     if (row.approval !== null && row.approval.length == matchingRows.length) {
        //         const approvals = JSON.stringify(row.approval) // Assuming 'approval' column stores JSON string
        //         const approvalrow = JSON.parse(approvals)
        //         const isAllApproved = approvalrow.every((item) => item.status === 'Approve');
        //         return isAllApproved;
        //     }
        // });


        const approvedRows = rows.filter((row) => {
            if (row.approval !== null) {
                if (matchingRows2[0].selectedcount > 0 && row.approval.length == matchingRows2[0].selectedcount) {
                    const approvals = JSON.stringify(row.approval) // Assuming 'approval' column stores JSON string
                    const approvalrow = JSON.parse(approvals)
                    const isAllApproved = approvalrow.every((item) => item.status === 'Approve');
                    return isAllApproved;
                } else if (row.approval.length == matchingRows.length) {
                    const approvals = JSON.stringify(row.approval) // Assuming 'approval' column stores JSON string
                    const approvalrow = JSON.parse(approvals)
                    const isAllApproved = approvalrow.every((item) => item.status === 'Approve');
                    return isAllApproved;
                }
            }
        })




        for (const row of approvedRows) {
            const [existingRow] = await connection.execute(`SELECT * FROM organizations WHERE orgname = ? AND orgcode = ? AND clientname = ?`, [orgname, orgcode, row.clientname]);
            if (existingRow.length === 0) {
                // Insert the row into the organizations table
                await connection.execute(`INSERT INTO organizations (alias, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, address, orgcode, orgname, clientname, branchname, username, uniquevalue) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`, [row.alias, row.country, row.state, row.city, row.postalcode, row.phone, row.email, row.PAN, row.GST, row.IEC, row.creditdays, row.address, row.orgcode, row.orgname, row.clientname, row.branchname, row.username, row.uniquevalue]);

                const [employees] = await connection.execute(`SELECT * FROM employees WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);

                employees.forEach(employee => {
                    broadcast({
                        username: employee.username,
                        type: 'new_org',
                        message: `A new organization ${row.clientname} has been added.`
                    });
                });

            }
        }


        return approvedRows;

    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the calling code
    }
}




export const deletedRowlist = async (orgname, orgcode, uniquevalue, approverlistname, branchname, branchcode, id) => {
    try {
        const [row] = await connection.execute(`DELETE FROM approverlist 
        WHERE orgname = ? AND orgcode = ?  AND approverlistname = ? AND branchname = ? AND branchcode = ?`, [orgname, orgcode, approverlistname, branchname, branchcode]);
        const [rows] = await connection.execute(`DELETE FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND aid = ?`, [orgname, orgcode, branchname, branchcode, approverlistname, id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const fetchOrganizationforrender = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM organizations WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const SelectedCount = async (orgname, orgcode, branchname, branchcode, approverlistname, selectedCount) => {
    try {
        const [row] = await connection.execute(`UPDATE approverlist SET selectedcount = ? 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
            [selectedCount, orgname, orgcode, branchname, branchcode, approverlistname]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const GetSelectedCount = async (orgname, orgcode, branchname, branchcode, approverlistname) => {
    try {
        const [row] = await connection.execute(`SELECT selectedcount FROM approverlist 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
            [orgname, orgcode, branchname, branchcode, approverlistname]);

        return row;
    } catch (error) {
        console.log(error);
    }
}