import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storeWorkflow = async (orgname, orgcode, workflowname, workflowbranchname, duration, days, hours, minutes, milestone, plandatechange, branchName, lob, importername) => {
    try {
        const [row] = await connection.execute(`INSERT INTO workflow (orgname, orgcode, workflowname, lobname, ownbranchname, importername, duration, days, hours, minutes, milestone, plandatechange) 
        VALUES (?,?,?,?,?,?,?, ?, ?, ?, ?, ?)`, [orgname, orgcode, workflowname, lob, branchName, importername, duration, days, hours, minutes, milestone, plandatechange]);

    } catch (error) {
        console.log(error);
    }
}


export const readAllWorkflow = async (orgname, orgcode) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM workflow WHERE orgname = ? AND orgcode = ?', [orgname, orgcode]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export const createOverviewofWorkflow = async (orgname, orgcode, client, lob, branch) => {
    try {
        const [row] = await connection.execute('INSERT INTO workflow (orgname, orgcode, lobname, ownbranchname, importername) VALUES (?,?,?,?,?)', [orgname, orgcode, lob, branch, client]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const deletedWorkflowRow = async (orgname, orgcode, id) => {
    try {
        const [row] = await connection.execute('DELETE FROM workflow WHERE orgname = ? AND orgcode = ? AND id = ?', [orgname, orgcode, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}