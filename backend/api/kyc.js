import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();


export const getBranches = async (username, orgname, orgcode) => {
    try {
        const [rows] = await connection.execute(`SELECT ownbranchname, branchcode FROM branchaccess WHERE orgname = ? AND orgcode = ? AND username = ?`, [orgname, orgcode, username]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const storeKYC = async (
    fullName,
    mobileNumber,
    officeMobileNumber,
    dateOfBirth,
    personalEmail,
    officeEmail,
    dateOfJoining,
    aadharNumber,
    panNumber,
    orgname,
    orgcode,
    username,
    branches,
    fileData
) => {
    try {
        const [result] = await connection.execute(
            `INSERT INTO userkyctable (fullname, phone, officephone, dateofbirth, personalemail, officeemail, dateofjoining, aadharcard, pancard, orgname, orgcode, username, branchaccess, profilephoto)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                fullName,
                mobileNumber,
                officeMobileNumber,
                dateOfBirth,
                personalEmail,
                officeEmail,
                dateOfJoining,
                aadharNumber,
                panNumber,
                orgname,
                orgcode,
                username,
                branches,
                fileData
            ]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};