import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storeWorkflow = async (orgname, orgcode, branchName, lob, importername, workflowname, duration, days, hours, minutes, milestone, plandatechange, selectedEmployee) => {
    try {
        // Check if plandatechange is empty
        const plandatechangeValue = plandatechange ? plandatechange : 0;

        const [row] = await connection.execute(`
            INSERT INTO setworkflow (orgname, orgcode, lobname, ownbranchname, importername, duration, days, hours, minutes, workflowmilestone, plandatechange, workflowname, assignedperson) 
            VALUES (?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?)`, 
            [orgname, orgcode, lob, branchName, importername, duration, days, hours, minutes, milestone, plandatechangeValue, workflowname, selectedEmployee]
        );
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


export const deletesetworkflow = async (id, orgname, orgcode, importername, ownbranchname, lobname) => {
    try {
        const [row] = await connection.execute('DELETE FROM setworkflow WHERE orgname = ? AND orgcode = ? AND id = ? AND importername = ? AND lobname = ? AND ownbranchname = ?', [orgname, orgcode, id, importername, lobname, ownbranchname]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const updatesetworkflow = async(id, workflowname, days, hours, minutes, milestone, plandatechange, selectedEmployee) => {
    try {
        const [row] = await connection.execute('UPDATE setworkflow SET workflowname = ?, days = ?, hours = ?, minutes = ?, workflowmilestone = ?, plandatechange = ?, assignedperson = ? WHERE id = ?', [workflowname, days, hours, minutes, milestone, plandatechange,selectedEmployee, id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}


export const gettheemployeesofBranch = async (orgname, orgcode, branchname) => {
    try {
        const [rows] = await connection.execute(`SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ? AND ownbranchname = ?`, [orgname, orgcode, branchname]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}