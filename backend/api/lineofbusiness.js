import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storethelob = async (
  lobname,
  transportmode,
  orgname,
  orgcode,
  currentDate,
  username
) => {
  try {
    // const fulllobname = lobname + " " + "(" + transportmode + ")";
    const fulllobname = lobname;
    // Execute the INSERT query to insert the new LOB into the database
    const [row] = await connection.execute(
      `INSERT INTO lob (lobname, orgname, orgcode, transportmode , Date , createdby) VALUES (?,?,?, ?,?,?)`,
      [fulllobname, orgname, orgcode, transportmode, currentDate, username]
    );

    // Return the inserted row
    return row;
  } catch (error) {
    // Log any errors that occur during the database operation
    console.log(error);
  }
};

export const getAlltheLOB = async (orgcode, orgname) => {
  try {
    const IsDeleted = 0;
    const [rows] = await connection.execute(
      "SELECT * FROM lob WHERE orgname = ? AND orgcode = ? AND IsDeleted = ?",
      [orgname, orgcode , IsDeleted]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLOB = async (id, deletedby , deletedat , DeleteRemark ) => {
  try {
    const isdelete = 1;
        const [row] = await connection.execute('UPDATE lob SET IsDeleted = ?,deletedby = ? , deletedAt = ? , DeleteRemark = ?  WHERE id = ?', [ isdelete , deletedby , deletedat , DeleteRemark , id]);
        return row;
  } catch (error) {
    console.log(error);
  }
};

export const updateLOB = async (id, lobname,transportmode) => {
  try {
    const [row] = await connection.execute(
      "UPDATE lob SET lobname = ?,transportmode = ? WHERE id = ?",
      [lobname,transportmode, id]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const fetchorgTAT = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT clientname, id FROM organizations WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
