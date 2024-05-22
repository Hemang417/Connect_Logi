import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
export const fetchAllusers = async (orgcode, orgname) => {
    try {

        const [rows] = await connection.execute(`
        SELECT *
        FROM employees
        WHERE orgname = ? AND orgcode = ?
    `, [orgname, orgcode]);


        const [row] = await connection.execute(`SELECT * FROM setworkflow`);
        
        return {
            rows: rows,
            row: row
        }
    } catch (error) {
        console.log(error);
    }
}



// API function to store individual access values
// export const storeimpaccess = async (dataAccess, username) => {
//     try {
//         const connection = await connectMySQL();

//         // const rowname = allRows[i];
//         // for (const [rowname, value] of Object.entries(allRows)) {
//         //     await connection.execute(
//         //         `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
//         //         [rowname, value, username]
//         //     );
//         // }
//         // for (let i = 0; i < allRows.length; i++) {
//         //     const rowname = allRows[i];

//         //     if (rowname != " ") {
//         //         await connection.execute(
//         //             `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
//         //             [rowname, rowname, username]
//         //         );
//         //     }
//         // }




//         const rows = await connection.execute(`INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`, [dataAccess, dataAccess, username]);





//         // for (let i = 0; i < allRows.length; i++) {
//         //     const rowname = allRows[i].trim(); // Trim to remove leading/trailing whitespace

//         //     if (rowname !== "") {
//         //         await connection.execute(
//         //             `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
//         //             [rowname, rowname, username]
//         //         );
//         //     }
//         // }






//         // Optionally, you can return something indicating success
//         return { success: true, message: "Access values inserted successfully" };
//     } catch (error) {
//         console.log('Error in storeimpaccess:', error);
//         throw error; // Re-throw the error to be caught elsewhere if needed
//     }
// }






// API function to store individual access values
// export const storeimpaccess = async (dataAccess, username) => {
//     try {
//         const connection = await connectMySQL();
//         const keys = Object.keys(dataAccess);
        
//         for (const key of keys) {
//             const value = dataAccess[key];
//             await connection.execute(
//                 `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
//                 [key, value, username]
//             );
//         }

//         // Optionally, you can return something indicating success
//         return { success: true, message: "Access values inserted successfully" };
//     } catch (error) {
//         console.log('Error in storeimpaccess:', error);
//         throw error; // Re-throw the error to be caught elsewhere if needed
//     }
// }





export const removeimpaccess = async (dataAccess, username) => {
    try {

        const [row] = await connection.execute(`DELETE FROM importaccess WHERE username = ? AND rowname = ? AND value = ? `, [username, dataAccess, dataAccess]);
        return row;
    } catch (error) {
        console.log('Error in storeimpaccess:', error);
        throw error;
    }
}



export const getUserAccess = async (username) => {
    try {
     
        const [rows] = await connection.execute(
            `SELECT value FROM importaccess WHERE username = ?`,
            [username]
        );

        return rows;
    } catch (error) {
        console.log('Error in storeimpaccess:', error);
        throw error;
    }
}




export const fetchAllaccesspoints = async (orgname, orgcode) => {
    try {
  
        const [rows] = await connection.execute(`SELECT tatimpcolumn, id FROM o2dtat WHERE orgname = ? AND orgcode = ?`, [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}




export const storeimpaccess = async (dataAccess, username) => {
    try {
   
        const [rows] = await connection.execute(`INSERT INTO importaccess (value, rowname, username) VALUES (?, ?, ?)`, [dataAccess, dataAccess, username]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}



export const storeBranchAccessforUser = async (orgcode, orgname, ownbranchname, branchcode, username) => {
    try {
        const [row] = await connection.execute(`INSERT INTO branchaccess (ownbranchname, branchcode, username, orgname, orgcode) VALUES (?,?,?,?,?)`, [ownbranchname, branchcode, username, orgname, orgcode]);
    } catch (error) {
        console.log(error);
    }
}

export const deletethatbranchaccess = async (branchcode) => {
    try {
        const [row] = await connection.execute(`DELETE FROM branchaccess WHERE branchcode = ?`, [branchcode]);
    } catch (error) {
        console.log(error);
    }
}

export const fetchExistingBranches = async (username, orgname, orgcode) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ? AND username = ?', [orgname, orgcode, username]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}