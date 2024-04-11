import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

// LOGIN API
export const getTheUser = async (username, password, orgcode) => {
    try {

        if (username === "admin") {
            const [rows] = await connection.execute(
                `SELECT * FROM users WHERE username = ? AND password = ? AND orgcode = ?`,
                [username, password, orgcode]
            );
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } else {
            const [rows] = await connection.execute(
                `SELECT * FROM employees WHERE username = ? AND password = ? AND orgcode = ?`,
                [username, password, orgcode]
            );
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        }
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
}




// REGISTER API
export const insertUser = async (username, password, orgname, orgcode) => {
    try {
 
        const firstEmptyIndex = orgname.indexOf(' ');
        const orgNamehaiye = orgname.slice(0, firstEmptyIndex !== -1 ? firstEmptyIndex : orgname.length).toLowerCase();
        const newOrgcode = orgNamehaiye + '@' + orgcode
        const [rows] = await connection.execute(`INSERT INTO users (username, password, orgcode, orgname) VALUES (?, ?, ?, ?)`,
            [username, password, newOrgcode, orgname]
        ); // Replace orgcode with newOrgCode
        return { rows: rows, orgcode: newOrgcode };
    } catch (error) {
        console.error('Error inserting user:', error.message);
        throw error;
    }
}

function extractNumbersAfterAt(orgcode) {
    const numbersAfterAt = orgcode.match(/@(\d+)/);
    if (numbersAfterAt && numbersAfterAt.length > 1) {
      return numbersAfterAt[1];
    } else {
      return null;
    }
  }
  

export const storeOwnBranch = async (orgcode, ownbranchname, address, gst, iec, headname, headnum, orgname) => {
    try {
        const codecode = extractNumbersAfterAt(orgcode);
        const branchcode = ownbranchname + '-' + codecode;
        const [row] = await connection.execute(`INSERT INTO ownbranches (orgcode, orgname, ownbranchname, gstnum, iecnum, headname, headnum, address, branchcode) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [orgcode, orgname, ownbranchname, gst, iec, headname, headnum, address, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const getOwnBranches = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM ownbranches WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const fetchBranchskhudka = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT ownbranchname, branchcode FROM ownbranches WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const deletekhudkaBranch = async (id, orgname, orgcode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM ownbranches WHERE id = ? AND orgname = ? AND orgcode = ?`, [id, orgname, orgcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const updatedOwnBranch = async (id, orgcode, orgname, ownbranchname, gstnum, iecnum, headname, headnum, address, branchcode) => {
    try {
        const [row] = await connection.execute(`UPDATE ownbranches SET 
            ownbranchname = ?, gstnum = ?, headname = ?, headnum = ?, iecnum = ?, address = ? 
            WHERE id = ? AND orgcode = ? AND orgname = ? AND branchcode = ?`, 
            [ownbranchname, gstnum, headname, headnum, iecnum, address, id, orgcode, orgname, branchcode]);
        return row; // Assuming you want to return the updated row
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
}
