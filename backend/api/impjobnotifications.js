import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();
import moment from 'moment';

export const fetchImpJobs = async (orgname, orgcode, branchcode) => {
    try {
        const [row] = await connection.execute(`SELECT * FROM impnotifications WHERE orgname = ? AND orgcode = ? AND branchcode = ?`, [orgname, orgcode, branchcode]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export const readjobforuser = async (orgname, orgcode, username, jobnumber, branchcode, branchname) => {
    try {
        const [rows] = await connection.execute(
            `SELECT * FROM impnotifications WHERE orgname = ? AND orgcode = ? AND branchname = ? AND jobnumber = ? AND branchcode = ?`,
            [orgname, orgcode, branchname, jobnumber, branchcode]
        );

        if (rows.length === 0) {
            throw new Error('No matching record found.');
        }

        const updated = rows[0];

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

        const updatingarray = await updated.reading.map((row) => {
            if (row.employeename === username) {
                return { ...row, read: 1 };
            }
            return row; // Return the original object if the condition is not met
        });
        
        const updatedTime = await updated.timeofreading.map((row) => {
            if (row.employeename === username) {
                return { ...row, time: currentTime };
            }
            return row; // Return the original object if the condition is not met
        });
        




        await connection.execute(
            `UPDATE impnotifications SET reading = ?, timeofreading = ? WHERE orgname = ? AND orgcode = ? AND branchname = ? AND jobnumber = ? AND branchcode = ?`,
            [
                updatingarray,
                updatedTime,
                orgname,
                orgcode,
                branchname,
                jobnumber,
                branchcode
            ]
        );

    } catch (error) {
        console.log(error);
    }
}