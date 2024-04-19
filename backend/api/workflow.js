import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storeWorkflow = async (orgname, orgcode, branchName, lob, importername, workflowname, duration, days, hours, minutes, milestone, plandatechange) => {
    try {
        const [row] = await connection.execute(`INSERT INTO setworkflow (orgname, orgcode, lobname, ownbranchname, importername, duration, days, hours, minutes, workflowmilestone, plandatechange, workflowname) 
        VALUES (?,?,?,?,?,?,?, ?, ?, ?, ?, ?)`, [orgname, orgcode, lob, branchName, importername, duration, days, hours, minutes, milestone, plandatechange, workflowname]);

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


export const getSetAllWorkflow = async (orgname, orgcode, branchname, importername, lobname) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND importername = ? AND lobname = ?', [orgname, orgcode, branchname, importername, lobname]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}