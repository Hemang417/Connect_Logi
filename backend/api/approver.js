import { connectMySQL } from "../config/sqlconfig.js";
import { broadcast } from "../websocketServer.js";
const connection = await connectMySQL();

export const storeApproverName = async (
  orgname,
  orgcode,
  approverName,
  branchname,
  branchcode,
  uniquevalue,
  username
) => {
  try {
    const jsonUniqueValue = JSON.stringify([uniquevalue]);
    console.log("Store Approver Name called with:", {
      orgname,
      orgcode,
      approverName,
      branchname,
      branchcode,
      jsonUniqueValue,
    });

    const [existingRows] = await connection.execute(
      "SELECT * FROM approverlist"
    );

    // Manually check if an entry with the same details exists
    const approverExists = existingRows.some(
      (row) =>
        row.orgname === orgname &&
        row.orgcode === orgcode &&
        row.approverlistname === approverName &&
        row.branchname === branchname &&
        row.branchcode === branchcode &&
        JSON.stringify(row.uniquevalue) === jsonUniqueValue
    );

    const [returnid] = await connection.execute(
      `SELECT id FROM approverlist WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, approverName, branchname, branchcode]
    );
    // console.log(returnid);
    // If a match is found, return a message indicating that the entry already exists
    if (approverExists) {
      console.log("Approver list with the same details already exists");
      return { id: returnid[0].id };
    }

    const [row] = await connection.execute(
      "INSERT INTO approverlist (orgname, orgcode, approverlistname, branchname, branchcode, uniquevalue ,selectedcount,createdby, createdAt) VALUES(?,?,?,?,?,? , ?,?,NOW())",
      [
        orgname,
        orgcode,
        approverName,
        branchname,
        branchcode,
        jsonUniqueValue,
        1,
        username,
      ]
    );

    return { id: row.insertId };
  } catch (error) {
    console.log(error);
  }
};

export const getApproverlist = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? And IsDeleted = 0",
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getApproverlistall = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ?",
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const checkallapproverlist = async (
  orgname,
  orgcode,
  approverlistname,
  branchcode,
  uniquevalue
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchcode = ? AND uniquevalue = ?",
      [orgname, orgcode, approverlistname, branchcode, uniquevalue]
    );
    return rows; // Return all matching rows
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
};

export const deletedApproverlist = async (
  orgname,
  orgcode,
  approverlistname,
  branchname,
  branchcode
) => {
  try {
    const [row] = await connection.execute(
      `DELETE FROM approverlist WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, approverlistname, branchname, branchcode]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to be caught by the calling function
  }
};

export const UpdatedApproverList = async (
  orgname,
  orgcode,
  approverName,
  branchname,
  branchcode,
  uniquevalue,
  id
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND aid = ?`,
      [orgname, orgcode, branchname, branchcode, id]
    );

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        await connection.execute(
          `UPDATE approvername SET uniquevalue = ?, approverlistname = ?, branchname = ? , branchcode = ? WHERE orgname = ? AND orgcode = ? AND aid = ?`,
          [
            uniquevalue,
            approverName,
            branchname,
            branchcode,
            orgname,
            orgcode,
            id,
          ]
        );
      }
    }


    const [row] = await connection.execute(
      `
    UPDATE approverlist 
    SET approverlistname = ?, uniquevalue = ?, branchname = ? , branchcode = ?
    WHERE orgname = ? 
    AND orgcode = ? 
    AND id = ?`,
      [approverName, uniquevalue, branchname, branchcode, orgname, orgcode, id]
    );
  } catch (error) {
    console.error("Error updating approver list:", error);
    throw error; // Rethrow the error for proper error handling in the Express route
  }
};

export const Addnametoapproverlist = async (
  orgname,
  orgcode,
  branchname,
  approverlistname,
  branchcode,
  employeeName,
  uniquevalue,
  id
) => {
  console.log(
    "Addnametoapproverlist",
    orgname,
    orgcode,
    branchname,
    approverlistname,
    branchcode,
    employeeName,
    uniquevalue,
    id
  );
  try {
    const [row] = await connection.execute(
      `INSERT INTO approvername (orgname, orgcode, branchname, approverlistname, branchcode, employeename, uniquevalue, aid) VALUES(?,?,?,?,?,?, ?, ?)`,
      [
        orgname,
        orgcode,
        branchname,
        approverlistname,
        branchcode,
        employeeName,
        [uniquevalue],
        id,
      ]
    );

    // const [Check] = await connection.execute(`SELECT * FROM approverlist  WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?  AND approverlistname = ?`, [orgname, orgcode, branchname, branchcode, approverlistname]);

    await connection.execute(
      `UPDATE approverlist SET selectedcount = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
      [1, orgname, orgcode, branchname, branchcode, approverlistname]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const getnamesoftheapproverlist = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  approverlistname
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
      [orgname, orgcode, branchname, branchcode, approverlistname]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getnamesoftheapproverlistForUserList = async (
  orgname,
  orgcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? `,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

// export const getnamesoftheapproverlistForAccess = async (orgname, orgcode, branchname, branchcode, approverlistname) => {
//     try {
//         const [rows] = await connection.execute(`SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`, [orgname, orgcode, branchname, branchcode, approverlistname]);
//         return rows;
//     } catch (error) {
//         console.log(error);
//     }
// }

export const deletenamefromapproverlist = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  employeename,
  approverlistname
) => {
  // console.log(orgname, orgcode, branchname, branchcode, employeename, approverlistname)
  try {
    const [row] = await connection.execute(
      `DELETE FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND employeename = ? AND approverlistname = ?`,
      [orgname, orgcode, branchname, branchcode, employeename, approverlistname]
    );

    const [Check] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?  AND approverlistname = ?`,
      [orgname, orgcode, branchname, branchcode, approverlistname]
    );

    if (Check.length === 0) {
      await connection.execute(
        `UPDATE approverlist SET selectedcount = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
        [0, orgname, orgcode, branchname, branchcode, approverlistname]
      );
    }
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const deletenamefromapproverlistForApproval = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  employeename,
  approverlistname
) => {
  try {
    const [row] = await connection.execute(
      `DELETE FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND employeename = ? AND approverlistname = ?`,
      [orgname, orgcode, branchname, branchcode, employeename, approverlistname]
    );

    const [Check] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?  AND approverlistname = ?`,
      [orgname, orgcode, branchname, branchcode, approverlistname]
    );

    if (Check.length === 0) {
      await connection.execute(
        `UPDATE approverlist SET selectedcount = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
        [0, orgname, orgcode, branchname, branchcode, approverlistname]
      );
    }

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const updateApproverName = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  approverlistname,
  employeename,
  id
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE approvername SET employeename = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND aid = ?`,
      [
        employeename,
        orgname,
        orgcode,
        branchname,
        branchcode,
        approverlistname,
        id,
      ]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const getApproverName = async (orgname, orgcode, unique) => {
  try {
    // Construct the SQL query to fetch rows based on orgname and orgcode
    const query = `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`;

    // Add the organization name and organization code to the parameter array
    const params = [orgname, orgcode];

    // Execute the query with the parameters
    const [rows] = await connection.execute(query, params);

    // Check if any row's uniquevalue matches the provided unique value
    const matchingRows = rows.filter((row) => row.uniquevalue.includes(unique));

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

export const getApprovedButtons = async (orgname, orgcode, branchname, branchcode, username) => {
  try {
    const [rows] = await connection.execute(
      `SELECT uniquevalue FROM approvername WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND employeename = ?`,
      [orgname, orgcode, branchname, branchcode, username]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it at a higher level
  }
};

export const fetchApprovernameunique = async (
  orgname,
  orgcode,
  uniquevalue
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    const matchingRows = rows.filter((row) =>
      row.uniquevalue.includes(uniquevalue)
    );
    return matchingRows;
  } catch (error) {
    console.log(error);
  }
};

export const updatedData = async (
  orgId,
  country,
  state,
  city,
  postalcode,
  phone,
  email,
  PAN,
  GST,
  IEC,
  creditdays,
  address,
  orgname,
  orgcode,
  clientname,
  branchname,
  username,
  status
) => {
  try {
    const [row] = await connection.execute(
      `
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
      [
        country,
        state,
        city,
        postalcode,
        phone,
        email,
        PAN,
        GST,
        IEC,
        creditdays,
        address,
        username,
        status,
        orgname,
        orgcode,
        orgId,
        clientname,
      ]
    );

    const [tobeupdatedRow] = await connection.execute(
      `
    SELECT * FROM notifications 
    WHERE orgname = ? AND orgcode = ? AND clientname = ?`,
      [orgname, orgcode, clientname]
    );

    const { reading } = tobeupdatedRow[0];

    const updatedApproval = reading.map((item) => {
      if (item.employeename === username) {
        if (status === "Approve") {
          // Update read and approved attributes
          return { ...item, read: 1, approved: 1 };
        } else if (status === "Reject") {
          return { ...item, read: 1, approved: -1 };
        }
      } else {
        // Return unchanged item
        return item;
      }
    });
    await connection.execute(
      `UPDATE notifications SET reading = ? WHERE orgname = ? AND orgcode = ? AND clientname = ?`,
      [JSON.stringify(updatedApproval), orgname, orgcode, clientname]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const getApprovedRows = async (
  orgname,
  orgcode,
  branchnameofemp,
  branchcodeofemp,
  uniquevalue
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM approvalorg WHERE orgname = ? AND orgcode = ? AND IsDeleted = 0`,
      [orgname, orgcode]
    );
    const [lengthrows] = await connection.execute(
      `SELECT * FROM approvername WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    const [mattrows] = await connection.execute(
      `SELECT * FROM approverlist WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );

    const matchingRows = lengthrows.filter((row) =>
      row.uniquevalue.includes(uniquevalue)
    );
    const matchingRows2 = mattrows.filter(
      (row) => row.uniquevalue[0] === uniquevalue
    );

    // const approvedRows = rows.filter((row) => {
    //     if (row.approval !== null && row.approval.length == matchingRows.length) {
    //         const approvals = JSON.stringify(row.approval) // Assuming 'approval' column stores JSON string
    //         const approvalrow = JSON.parse(approvals)
    //         const isAllApproved = approvalrow.every((item) => item.status === 'Approve');
    //         return isAllApproved;
    //     }
    // });

    const approvedRows = rows.filter((row) => {
      if (matchingRows2.length === 0) {
        return true;
      }
      if (!row.approval || row.approval.length === 0) {
        return false; // Return true to insert the job without approval
      }
      if (row.approval !== null) {
        const approvalArray = Array.isArray(row.approval)
          ? row.approval
          : JSON.parse(row.approval); // Parse only if it's a JSON string
        const selectedCount = matchingRows2[0]?.selectedcount || 1;
        if (selectedCount > 0) {
          const approvedCount = approvalArray.filter(
            (item) => item.status === "Approve"
          ).length;
          const isAllApproved = approvedCount >= selectedCount;
          return isAllApproved;
        }
      }
      return false;
    });

    for (const row of approvedRows) {
      const [existingRow] = await connection.execute(
        `SELECT * FROM organizations WHERE orgname = ? AND orgcode = ? AND clientname = ?`,
        [orgname, orgcode, row.clientname]
      );
      if (existingRow.length === 0) {
        const clientCode = `${row.alias}-${row.branchname}-${row.orgcode}`;
        // Insert the row into the organizations table
        const [insertedRows] = await connection.execute(
          `INSERT INTO organizations (alias, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, address, orgcode, orgname, clientname, branchname, username, uniquevalue, createdon, clientCode, checkedBoxOptions, orgganizationTypeOptions, contactDetails, showClientCode, followup2, followup3) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            row.alias,
            row.country,
            row.state,
            row.city,
            row.postalcode,
            row.phone,
            row.email,
            row.PAN,
            row.GST,
            row.IEC,
            row.creditdays,
            row.address,
            row.orgcode,
            row.orgname,
            row.clientname,
            row.branchname,
            row.username,
            row.uniquevalue,
            row.createdon,
            clientCode,
            row.checkedBoxOptions,
            row.orgganizationTypeOptions,
            row.contactDetails,
            row.showClientCode,
            row.followup2 || null,
            row.followup3 || null,
          ]
        );

        if (insertedRows.affectedRows > 0) {
          console.log("Job created successfully.");
          // Only insert into editlog if the job was successfully created
          await connection.execute(
            "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
            [
              orgname,
              orgcode,
              branchnameofemp,
              branchcodeofemp,
              "Organization",
              row.clientname,
              row.username,
              "New Organization " + row.clientname + " created",
            ]
          );
        }

        const insertedId = insertedRows.insertId;

        const [branches] = await connection.execute(
          `INSERT INTO branches (branchname, clientname, orgcode , Bid) VALUES (?, ?, ?, ?)`,
          [row.branchname, row.clientname, row.orgcode, insertedId]
        );

        const [employees] = await connection.execute(
          `SELECT * FROM userkyctable WHERE orgname = ? AND orgcode = ? And IsDeleted = 0`,
          [orgname, orgcode]
        );

        employees.forEach((employee) => {
          broadcast({
            username: employee.username,
            type: "new_org",
            message: `A new organization ${row.clientname} has been added.`,
          });
        });
      }
    }

    return approvedRows;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const deletedRowlist = async (
  orgname,
  orgcode,
  approverlistname,
  branchname,
  branchcode,
  id
) => {
  try {
    // Delete from approverlist
    const [row] = await connection.execute(
      `DELETE FROM approverlist
            WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchname = ? AND branchcode = ? AND id = ?`,
      [orgname, orgcode, approverlistname, branchname, branchcode, id]
    );

    // Delete from approverlist
    // const [row] = await connection.execute(
    //   `Update approverlist 
    //         set DeleteRemark = ?, deletedby = ?, deletedat = ? , IsDeleted = 1
    //         WHERE orgname = ? AND orgcode = ? AND approverlistname = ? AND branchname = ? AND branchcode = ? AND id = ?`,
    //   [
    //     DeleteRemark,
    //     deletedby,
    //     deletedat,
    //     orgname,
    //     orgcode,
    //     approverlistname,
    //     branchname,
    //     branchcode,
    //     id,
    //   ]
    // );

    // Check if any rows were deleted from approverlist
    if (row.affectedRows === 0) {
      console.log("No rows deleted from approverlist.");
    }

  
    // Delete from approvername
    const [rows] = await connection.execute(
      `DELETE FROM approvername
            WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND aid = ?`,
      [orgname, orgcode, branchname, branchcode, approverlistname, id]
    );

    // const [rows] = await connection.execute(
    //   `UPDATE approvername  
    //   set DeleteRemark = ?, deletedby = ?, deletedat = ? , IsDeleted = 1
    //     WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ? AND aid = ?`,
    //   [
    //     DeleteRemark,
    //     deletedby,
    //     deletedat,
    //     orgname,
    //     orgcode,
    //     branchname,
    //     branchcode,
    //     approverlistname,
    //     id,
    //   ]
    // );

    // Check if any rows were deleted from approvername
    if (rows.affectedRows === 0) {
      console.log("No rows deleted from approvername.");
    }

    return { approverlistDeleted: row, approvernameDeleted: rows };
  } catch (error) {
    console.error("Error deleting rows:", error);
    throw error; // Throw the error after logging it
  }
};

export const fetchOrganizationforrender = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM organizations WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const SelectedCount = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  approverlistname,
  selectedCount
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE approverlist SET selectedcount = ? 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
      [
        selectedCount,
        orgname,
        orgcode,
        branchname,
        branchcode,
        approverlistname,
      ]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const GetSelectedCount = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  approverlistname
) => {
  try {
    const [row] = await connection.execute(
      `SELECT selectedcount FROM approverlist 
        WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND approverlistname = ?`,
      [orgname, orgcode, branchname, branchcode, approverlistname]
    );

    return row;
  } catch (error) {
    console.log(error);
  }
};
