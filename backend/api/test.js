import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

const [jobformat] = await connection.execute(`SELECT * FROM customjobnumber WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`, 
['Seawave Forwarding Logistics', 'seawave@2323', 'Raxaul', 'Raxaul-2323']);

console.log('Job Format:', jobformat);