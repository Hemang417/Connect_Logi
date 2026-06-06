import { connectMySQL } from "../config/sqlconfig.js";
import { broadcast } from "../websocketServer.js";
const connection = await connectMySQL();
import moment from "moment";

export const setDelegation = async (
  orgcode,
  orgname,
  taskname,
  dueDate,
  description,
  assignedTo,
  assignedToLabel,
  branchcode,
  branchname,
  assignedBy,
  duration
) => {
  try {
    const [rows] = await connection.execute(
      `Insert into delegations (orgcode , orgname , taskname , deadline , TaskDescription , assignedTo , branchcode , branchname ,assignedBy,duration , assignedDate) values (?,?,?,?,?,?,?,?,?,?,now())`,
      [
        orgcode,
        orgname,
        taskname,
        dueDate,
        description,
        assignedTo,
        branchcode,
        branchname,
        assignedBy,
        duration,
      ]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const getDelegation = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM delegations WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND IsDeleted = 0`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};
export const updateDelegation = async (
  taskname,
  dueDate,
  description,
  assignedTo,
  assignedBy,
  duration,
  id
) => {
  try {
    console.log('updateDelegation', taskname, dueDate, description, assignedTo, assignedBy, duration, id);
    
    // Convert the ISO date string to MySQL datetime format
    const mysqlDateTime = moment(dueDate).format('YYYY-MM-DD HH:mm:ss');
    
    const [rows] = await connection.execute(
      `update delegations SET taskname = ? , deadline = ? , TaskDescription = ? , assignedTo = ? , assignedBy = ? , duration = ? WHERE id = ?`,
      [taskname, mysqlDateTime, description, assignedTo, assignedBy, duration, id]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // It's good practice to rethrow the error after logging
  }
};
export const completeTask = async (
  taskId, taskName, remark, timestamp, addedBy
) => {
  try {    
    // Convert the ISO date string to MySQL datetime format
    // const mysqlDateTime = moment(dueDate).format('YYYY-MM-DD HH:mm:ss');
    
    const [rows] = await connection.execute(
      `update delegations SET taskStatus = "Completed" , completionRemark = ? , completedOn = Now(), completedBy = ? WHERE id = ?`,
      [ remark, addedBy,taskId]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // It's good practice to rethrow the error after logging
  }
};

export const deleteDelegation = async (
  id, orgname, orgcode, remark,deletedby
) => {
  try {    
    // Convert the ISO date string to MySQL datetime format
    // const mysqlDateTime = moment(dueDate).format('YYYY-MM-DD HH:mm:ss');
    
    const [rows] = await connection.execute(
      `update delegations SET IsDeleted = 1 , deletionRemark = ? , deletedAt = Now(), deletedby = ? WHERE id = ? AND orgname = ? AND orgcode = ?`,
      [ remark,deletedby, id,orgname,orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // It's good practice to rethrow the error after logging
  }
};
export const delayedTask = async (
  orgcode,
      orgname, taskId, taskStatus
) => {
  try {    
    // Convert the ISO date string to MySQL datetime format
    // const mysqlDateTime = moment(dueDate).format('YYYY-MM-DD HH:mm:ss');
    
    const [rows] = await connection.execute(
      `update delegations SET taskStatus = ? WHERE id = ? AND orgname = ? AND orgcode = ?`,
      [ taskStatus,taskId,orgname,orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error; // It's good practice to rethrow the error after logging
  }
};
