import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storeArrangement = async (
  orgname,
  orgcode,
  data,
  branchname,
  branchcode
) => {
  try {
    // Check if the row already exists
    const [existingRows] = await connection.execute(
      `SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND columnname = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, data, branchname, branchcode]
    );

    // If the row exists, return without inserting
    if (existingRows.length > 0) {
      console.log("Row already exists. Skipping insert.");
      return { message: "Row already exists", inserted: false };
    }

    // Insert the new row if it doesn't exist
    const [row] = await connection.execute(
      `INSERT INTO customjobnumber (orgname, orgcode, columnname, branchname, branchcode) VALUES(?,?,?,?,?)`,
      [orgname, orgcode, data, branchname, branchcode]
    );

    return { message: "Row inserted successfully", inserted: true, row };
  } catch (error) {
    console.log(error);
    return { message: "Error occurred", error };
  }
};

export const storeRefArrangement = async (
  orgname,
  orgcode,
  data,
  branchname,
  branchcode
) => {
  try {
    // Check if the row already exists
    const [existingRows] = await connection.execute(
      `SELECT * FROM customrefnumber WHERE orgname = ? AND orgcode = ? AND columnname = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, data, branchname, branchcode]
    );

    // If the row exists, return without inserting
    if (existingRows.length > 0) {
      console.log("Row already exists. Skipping insert.");
      return { message: "Row already exists", inserted: false };
    }

    // Insert the new row if it doesn't exist
    const [row] = await connection.execute(
      `INSERT INTO customrefnumber (orgname, orgcode, columnname, branchname, branchcode) VALUES(?,?,?,?,?)`,
      [orgname, orgcode, data, branchname, branchcode]
    );

    return { message: "Row inserted successfully", inserted: true, row };
  } catch (error) {
    console.log(error);
    return { message: "Error occurred", error };
  }
};

export const getBranchcodeandname = async (orgname, orgcode) => {

    try {
    const [rows] = await connection.execute(`SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ? AND IsDeleted = 0`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
};

export const deleteArrangement = async (
  orgname,
  orgcode,
  data,
  branchname,
  branchcode
) => {
  try {
    const [row] = await connection.execute(
      `DELETE FROM customjobnumber 
        WHERE orgname = ? AND orgcode = ? AND columnname = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, data, branchname, branchcode]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRefArrangement = async (
  orgname,
  orgcode,
  data,
  branchname,
  branchcode
) => {
  try {
    const [row] = await connection.execute(
      `DELETE FROM customrefnumber 
        WHERE orgname = ? AND orgcode = ? AND columnname = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, data, branchname, branchcode]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const getArrangementofthatbranch = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ?
        AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getRefNoofthatbranch = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM customrefnumber WHERE orgname = ? AND orgcode = ? AND branchname = ?
        AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updateColumn = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  custominput
) => {
  try {
    console.log("custom input -> " , custominput);
    const [row] = await connection.execute(
      `UPDATE customjobnumber 
            SET inputofcustom = ? 
            WHERE orgname = ? 
            AND orgcode = ? 
            AND branchname = ? 
            AND branchcode = ? 
            AND columnname = 'Custom'`,
      [custominput, orgname, orgcode, branchname, branchcode]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const updateRefColumn = async (
  orgname,
  orgcode,
  branchname,
  branchcode,
  custominput
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE customrefnumber
            SET inputofcustom = ? ,
            columnname = ?
            WHERE orgname = ? 
            AND orgcode = ? 
            AND branchname = ? 
            AND branchcode = ? 
            AND columnname = 'Custom'`,
      [custominput, custominput, orgname, orgcode, branchname, branchcode]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};