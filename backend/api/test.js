import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

const [usernames] = await connection.execute(
      `SELECT * FROM approvername 
      WHERE JSON_CONTAINS(uniquevalue, '\"JobsButton\"')`,);
  console.log(usernames);