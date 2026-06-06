import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const storeWorkflow = async (
  orgname,
  orgcode,
  branchName,
  lob,
  importername,
  username,
  owntransport,
  ownbooking,
  consignmenttype,
  betype,
  workflowname,
  duration,
  days,
  hours,
  minutes,
  milestone,
  plandatechange,
  selectedEmployee,
  reminderdays,
  reminderhours,
  reminderminutes
) => {
  try {
    // Check if plandatechange is empty
    const plandatechangeValue = plandatechange ? plandatechange : 0;

    const [row] = await connection.execute(
      `
            INSERT INTO setworkflow (orgname, orgcode, lobname, ownbranchname, importername, createdby , owntransport , ownbooking , consignmenttype , betype,duration, days, hours, minutes, workflowmilestone, plandatechange, workflowname, assignedperson, reminderdays, reminderhours, reminderminutes) 
            VALUES (?,?,?,?,?,?,?, ?,?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)`,
      [
        orgname,
        orgcode,
        lob,
        branchName,
        importername,
        username,
        owntransport,
        ownbooking,
        consignmenttype,
        betype,
        duration,
        days,
        hours,
        minutes,
        milestone,
        plandatechangeValue,
        workflowname,
        selectedEmployee,
        reminderdays,
        reminderhours,
        reminderminutes,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

export const readAllWorkflow = async (orgname, orgcode) => {
  try {
    const isdelete = 0;
    const [rows] = await connection.execute(
      "SELECT * FROM workflow WHERE orgname = ? AND orgcode = ? And IsDeleted = ?",
      [orgname, orgcode, isdelete]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const createOverviewofWorkflow = async (
  orgname,
  orgcode,
  client,
  lob,
  branch,
  currentDate,
  username
) => {
  try {
    const [row] = await connection.execute(
      "INSERT INTO workflow (orgname, orgcode, lobname, ownbranchname, importername , Date , createdby) VALUES (?,?,?,?,?,?,?)",
      [orgname, orgcode, lob, branch, client, currentDate, username]
    );
    return row;
  } catch (error) {
    console.log(error);
  }
};

export const deletedWorkflowRow = async (
  orgname,
  orgcode,
  id,
  importername,
  ownbranchname,
  lobname,
  deletedby,
  deletedat,
  DeleteRemark
) => {
  try {
    // Start a transaction

    // Delete from the workflow table
    const isDeleted = 1;
    const [workflowResult] = await connection.execute(
      "UPDATE workflow SET IsDeleted = ?, deletedby = ?, deletedAt = ?, DeleteRemark = ? WHERE id = ? AND orgcode = ? AND orgname = ?;",
      [isDeleted, deletedby, deletedat, DeleteRemark, id, orgcode, orgname]
    );

    if (workflowResult.affectedRows > 0) {
      // If deletion from workflow was successful, delete from the setworkflow table
      const [setWorkFlowDeleted] = await connection.execute(
        "UPDATE setworkflow set IsDeleted = ? , deletedby = ? , deletedAt = ? , DeleteRemark = ? WHERE orgname = ? AND orgcode = ? AND importername = ? AND ownbranchname = ? AND lobname = ?",
        [
          isDeleted,
          deletedby,
          deletedat,
          DeleteRemark,
          orgname,
          orgcode,
          importername,
          ownbranchname,
          lobname,
        ]
      );

      return {
        message: "Workflow and related setworkflow deleted successfully",
        workflowResult,
        setWorkFlowDeleted,
      };
    } else {
      // If no rows were affected, rollback the transaction
      return { message: "No data found in workflow to delete" };
    }
  } catch (error) {
    // Rollback the transaction in case of error

    console.log("Error deleting workflow or related setworkflow:", error);
    throw error;
  }
};

export const getSetAllWorkflow = async (
  orgname,
  orgcode,
  branchname,
  importername,
  lobname
) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM setworkflow WHERE orgname = ? AND orgcode = ? AND ownbranchname = ? AND importername = ? AND lobname = ? AND IsDeleted = 0",
      [orgname, orgcode, branchname, importername, lobname]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const deletesetworkflow = async (
  id,
  orgname,
  orgcode,
  importername,
  ownbranchname,
  lobname,
  deletedby,
  deletedat,
  DeleteRemark
) => {
  try {
    const [row] = await connection.execute(
      "UPDATE setworkflow SET deletedby = ?, deletedAt = ?, DeleteRemark = ?, IsDeleted = 1 WHERE id = ? AND orgname = ? AND orgcode = ? AND importername = ? AND ownbranchname = ? AND lobname = ?",
      [
        deletedby,
        deletedat,
        DeleteRemark.remark,
        id,
        orgname,
        orgcode,
        importername,
        ownbranchname,
        lobname,
      ]
    );

    return row;
  } catch (error) {
    console.log(error);
  }
};

export const updatesetworkflow = async (
  id,
  workflowname,
  days,
  hours,
  minutes,
  milestone,
  plandatechange,
  selectedEmployee,
  reminderdays,
  reminderhours,
  reminderminutes,
  owntransport,
  ownbooking,
  consignmenttype,
  betype
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE setworkflow 
             SET workflowname = ?, 
                 days = ?, 
                 hours = ?, 
                 minutes = ?, 
                 workflowmilestone = ?, 
                 plandatechange = ?, 
                 assignedperson = ?, 
                 reminderdays = ?, 
                 reminderhours = ?, 
                 reminderminutes = ?, 
                 owntransport = ?, 
                 ownbooking = ?, 
                 consignmenttype = ?, 
                 betype = ?, 
                 created_at = NOW()  -- Set created_at to current date
             WHERE id = ?`,
      [
        workflowname,
        days,
        hours,
        minutes,
        milestone,
        plandatechange,
        selectedEmployee,
        reminderdays,
        reminderhours,
        reminderminutes,
        owntransport,
        ownbooking,
        consignmenttype,
        betype,
        id,
      ]
    );

    return row;
  } catch (error) {
    console.error("Error updating workflow:", error);
    throw new Error("Failed to update workflow");
  }
};

export const gettheemployeesofBranch = async (orgname, orgcode, branchname) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ? AND ownbranchname = ?`,
      [orgname, orgcode, branchname]
    );

    if (rows.length === 0) {
      const [allRows] = await connection.execute(
        `SELECT * FROM branchaccess WHERE orgname = ? AND orgcode = ?`,
        [orgname, orgcode]
      );
      return allRows;
    }

    return rows;
  } catch (error) {
    console.log(error);
  }
};
