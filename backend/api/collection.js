import { connectMySQL } from "../config/sqlconfig.js";
import { v4 as uuidv4 } from "uuid"; // Correct way to import

const connection = await connectMySQL();
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const storecollection = async (
  jobnumber,
  orgname,
  orgcode,
  branchnameoforg,
  username,
  date,
  amount,
  Tax,
  grandTotal,
  FollowUp1,
  FollowUp2,
  FollowUp3,
  TimeDelay,
  AssignTo,
  checkbox,
  clientname,
  branchcodeofemp,
  branchnameofemp
) => {
  try {
    // Insert data into `collection`
    const [result] = await connection.execute(
      `INSERT INTO collection 
      (jobnumber, orgname, orgcode, branchnameoforg, Date, amount, Tax, grandTotal, FollowUp1, FollowUp2, FollowUp3, TimeDelay, AssignTo, checkbox, createdby, clientname, branchcodeofemp, branchnameofemp) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobnumber,
        orgname,
        orgcode,
        branchnameoforg,
        date,
        amount,
        Tax,
        grandTotal,
        FollowUp1,
        FollowUp2,
        FollowUp3,
        TimeDelay,
        AssignTo,
        checkbox,
        username,
        clientname,
        branchcodeofemp,
        branchnameofemp,
      ]
    );

    // Get the `insertId` from result
    const insertedId = result.insertId || result[0]?.insertId;
    if (!insertedId) {
      throw new Error("Failed to retrieve inserted ID.");
    }

    // Generate billNo using the inserted ID
    const billNo = `BILL-${insertedId}`;

    // Update `billNo` in the collection table
    await connection.execute(`UPDATE collection SET billNo = ? WHERE id = ?`, [
      billNo,
      insertedId,
    ]);
      await connection.execute(
        "INSERT INTO editlogs (orgname, orgcode, branchname, branchcode, editedon, editin, clientname, editedby, changesDetails) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?)",
        [
          orgname,
          orgcode,
          branchnameoforg,
          branchcodeofemp,
          jobnumber,
          clientname,
          username,
          "New Collection " + billNo + " created",
        ]
      );
    // Insert into transaction history
    await connection.execute(
      `INSERT INTO transactionhistory 
      (jobnumber, currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode, orgbranchname) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobnumber,
        date,
        "Bill",
        billNo, // Use the updated `billNo`
        grandTotal,
        0,
        orgname,
        orgcode,
        branchnameoforg,
      ]
    );

    return { success: true, billNo };
  } catch (error) {
    console.error("Database query error:", error);
    return { success: false, error: error.message };
  }
};

export const updatecollection = async (
  jobnumber,
  orgname,
  orgcode,
  branchnameoforg,
  date,
  billNo,
  amount,
  Tax,
  grandTotal,
  TimeDelay,
  AssignTo,
  checkbox,
  clientname,
  branchcodeofemp,
  branchnameofemp
) => {
  try {
    // const formattedFollowUp1 = formatDate(FollowUp1);
    // const formattedFollowUp2 = formatDate(FollowUp2);
    // const formattedFollowUp3 = formatDate(FollowUp3);

    // Update the collection table
    const [rows] = await connection.execute(
      `UPDATE collection SET orgname = ?, orgcode = ?, branchnameoforg = ?, date=?, amount = ?, Tax = ?, grandTotal = ?, TimeDelay = ?, AssignTo = ?, checkbox = ?, clientname = ?, branchcodeofemp = ?, branchnameofemp = ? WHERE jobnumber = ? AND billNo = ?`,
      [
        orgname,
        orgcode,
        branchnameoforg,
        date,
        amount,
        Tax,
        grandTotal,
        // formattedFollowUp1,
        // formattedFollowUp2,
        // formattedFollowUp3,
        TimeDelay,
        AssignTo,
        checkbox,
        clientname,
        branchcodeofemp,
        branchnameofemp,
        jobnumber,
        billNo,
      ]
    );

    // If update succeeded, handle transaction history
    if (rows.affectedRows > 0) {
      // Update existing transaction
      await connection.execute(
        `UPDATE transactionhistory 
           SET 
             currentdate = ?, 
             typeofexpense = ?, 
             cr = ?, 
             dr = ?, 
             orgname = ?, 
             orgcode = ?, 
             orgbranchname = ?
           WHERE 
             jobnumber = ? AND referenceNo = ?`,
        [
          date,
          "Bill",
          grandTotal, // Credit (CR) amount
          0, // Debit (DR) amount
          orgname,
          orgcode,
          branchnameoforg,
          jobnumber,
          billNo,
        ]
      );
    }

    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error; // Propagate the error to the caller for better handling
  }
};

export const getcreditdays = async (
  orgname,
  orgcode,
  branchname,
  clientname
) => {
  console.log("Parameters:", orgname, orgcode, branchname, clientname); // Debugging log
  try {
    // Adjust the SQL query to include all necessary parameters
    const [rows] = await connection.execute(
      `SELECT creditdays, followup2, followup3 FROM organizations WHERE orgname = ? AND orgcode = ? AND branchname = ? AND clientname = ?`,
      [orgname, orgcode, branchname, clientname]
    );

    // console.log('Query Result:', rows[0]); // Debugging log
    return rows[0]; // Return the first row
  } catch (error) {
    console.error("Database query error:", error); // Improved error logging
    throw error; // Rethrow the error for handling in the route
  }
};

export const getBranchEmployeeForAccess = async (orgname, orgcode) => {
  try {
    const [row] = await connection.execute(
      `SELECT fullname FROM userkyctable WHERE orgname = ? AND orgcode = ? And IsDeleted = 0`,
      [orgname, orgcode]
    );
    return row;
  } catch (error) {
    console.error("fetching employee name error", error); // Improved error logging
    throw error;
  }
};

export const getAllCollection = async (jobnumber, orgname, orgcode) => {
  try {
    const [row] = await connection.execute(
      `SELECT * FROM collection WHERE jobnumber = ? AND orgname = ? AND orgcode = ? AND IsDeleted = 0`,
      [jobnumber, orgname, orgcode]
    );
    return row;
  } catch (error) {
    console.error("fetching employee name error", error); // Improved error logging
    throw error;
  }
};

export const updateCollectionAssignee = async (id, AssignTo) => {
  try {
    // console.log("id:", id, "assignTo:", AssignTo);
    const [row] = await connection.execute(
      `UPDATE collection SET AssignTo = ? WHERE id = ?`,
      [AssignTo, id]
    );
    return row;
  } catch (error) {
    console.error("Error updating collection assignee in database:", error);
    throw error; // Throw the error to be caught in the route handler
  }
};

export const deletecollections = async (billNo, id, username, remark) => {
  try {
    // Update the collection to mark it as deleted
    const [row] = await connection.execute(
      `UPDATE collection SET IsDeleted = 1, DeleteRemark = ?, deletedAt = NOW(), deletedby = ? WHERE billNo = ? AND id = ? `,
      [remark, username, billNo, id]
    );

    // If the collection was successfully marked as deleted, update the transaction history
    if (row.affectedRows > 0) {
      await connection.execute(
        `UPDATE transactionhistory 
         SET IsDeleted = 1 
         WHERE referenceNo = ?`, // Corrected the SQL syntax
        [billNo]
      );
    }

    return row;
  } catch (error) {
    console.error("Error deleting collection in database:", error);
    throw error; // Throw the error to be caught in the route handler
  }
};

export const individualcollections = async (billNo) => {
  try {
    const [row] = await connection.execute(
      `SELECT * FROM collection WHERE billNo = ? AND IsDeleted = 0`,
      [billNo]
    );
    return row;
  } catch (error) {
    console.error("Error fetching transaction from database:", error);
    throw error;
  }
};
