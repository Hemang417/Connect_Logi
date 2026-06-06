import { connectMySQL } from "../config/sqlconfig.js";
import { broadcast } from "../websocketServer.js";
const connection = await connectMySQL();
import moment from "moment";

export const getEditLog = async (orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM editlogs WHERE orgcode = ? ORDER BY editedon DESC`,
      [orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
