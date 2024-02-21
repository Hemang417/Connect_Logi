import { connectMySQL } from "../config/sqlconfig.js";

export const fetchAllusers = async (orgcode, orgname, username) => {
    try {
        const connection = await connectMySQL();

        const [rows] = await connection.execute(`
        SELECT username
        FROM employees
        WHERE orgname = ? AND orgcode = ?
    `, [orgname, orgcode]);
        // const [row] = await connection.execute(`SELECT * FROM importaccess WHERE username = ?`, [username]);
        // if(row.length>0){
        //     return { status: 200 };
        // }
        return rows;
    } catch (error) {
        console.log(error);
    }
}



// API function to store individual access values
export const storeimpaccess = async (allRows, username) => {
    try {
        const connection = await connectMySQL();

        // const rowname = allRows[i];
        // for (const [rowname, value] of Object.entries(allRows)) {
        //     await connection.execute(
        //         `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
        //         [rowname, value, username]
        //     );
        // }
        // for (let i = 0; i < allRows.length; i++) {
        //     const rowname = allRows[i];

        //     if (rowname != " ") {
        //         await connection.execute(
        //             `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
        //             [rowname, rowname, username]
        //         );
        //     }
        // }



        for (let i = 0; i < allRows.length; i++) {
            const rowname = allRows[i].trim(); // Trim to remove leading/trailing whitespace
        
            if (rowname !== "") {
                await connection.execute(
                    `INSERT INTO importaccess (rowname, value, username) VALUES (?, ?, ?)`,
                    [rowname, rowname, username]
                );
            }
        }
        





        // Optionally, you can return something indicating success
        return { success: true, message: "Access values inserted successfully" };
    } catch (error) {
        console.log('Error in storeimpaccess:', error);
        throw error; // Re-throw the error to be caught elsewhere if needed
    }
}
