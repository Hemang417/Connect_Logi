import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

const [approverdata] = await connection.execute(`SELECT * FROM approvername WHERE orgcode = ?`, ['seawave@2323']);
const data = approverdata.filter(item => {
    return item.uniquevalue[0] === 'OrgButton'
})

console.log(data);