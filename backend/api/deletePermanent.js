import cron from "node-cron";
import { connectMySQL } from "../config/sqlconfig.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const UPLOADS_DIR = path.resolve("uploads");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const connection = await connectMySQL();

export const scheduleCronJobs = async (currentInterval, orgname, orgcode) => {
  // console.log('cron job interval', currentInterval , orgname , orgcode);

  cron.schedule("0 * * * *", async () => {
    // console.log('Cron job is running at:', new Date().toISOString());
    try {
      const queries = [
        { table: "organizations", interval: currentInterval },
        { table: "approvalorg", interval: currentInterval },
        { table: "approvalimpjob", interval: currentInterval },
        { table: "impjobcreation", interval: currentInterval },
        { table: "approvalexpjob", interval: currentInterval },
        { table: "expjobcreation", interval: currentInterval },
        { table: "trackingimport", interval: currentInterval },
        { table: "trackingexport", interval: currentInterval },
        { table: "docsupload", interval: currentInterval },
        { table: "collection", interval: currentInterval },
        { table: "transactionhistory", interval: currentInterval },
      ];

      for (const { table, interval } of queries) {
        const [result] = await connection.execute(
          `
                    DELETE FROM ${table}
                    WHERE IsDeleted = 1 AND orgname = ? AND orgcode = ? AND DeletedAt < NOW() - INTERVAL ${interval} DAY;
                `,
          [orgname, orgcode]
        );
        if (result.affectedRows > 0) {
          console.log(
            `Deleted ${result.affectedRows} record(s) from '${table}' table.`
          );
        }
      }

      // console.log('Old deleted records permanently removed.');
    } catch (error) {
      console.error("Error during permanent deletion:", error.message);
    }
  });
};

export const emptyBin = async (orgname, orgcode) => {
  try {
    // Step 1: Retrieve file paths before deleting records in `docsupload`
    const [rows] = await connection.execute(
      "SELECT filelocation FROM docsupload WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      [orgname, orgcode]
    );

    // Step 2: Convert relative paths to absolute and delete the files
    rows.forEach(({ filelocation }) => {
      let fullPath = filelocation;
      if (!path.isAbsolute(filelocation)) {
        fullPath = path.join(UPLOADS_DIR, filelocation); // Convert to absolute path
      }

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Delete file
        console.log(`Deleted file: ${fullPath}`);
      } else {
        console.warn(`File not found: ${fullPath}`);
      }
    });

    // Step 3: Execute all DELETE queries
    const queries = [
      "DELETE FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM docsupload WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM collection WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM transactionhistory WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM approvalimpjob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM approvalexpjob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM approvalorg WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM organizations WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM lob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM milestone WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM credit WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM debit WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM workflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM delegations WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM userkyctable WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM ownbranches WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM approverlist WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM setworkflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
      "DELETE FROM setworkflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1",
    ];

    for (const query of queries) {
      await connection.execute(query, [orgname, orgcode]);
    }

    console.log("All records and associated files permanently removed.");
    return { success: true, message: "Bin cleared successfully" };
  } catch (error) {
    console.error("Error during permanent deletion:", error.message);
    throw new Error("Database and file deletion failed");
  }
};

export const deleteBinRow = async (orgname, orgcode, jobnumber, id, type) => {
  try {
    let queries = [];
    let queryParams = [];

    // Validate input parameters
    if (!orgname || !orgcode || !jobnumber || !type) {
      throw new Error("Missing required parameters");
    }

    switch (type) {
      case "Import":
        queries = [
          "DELETE FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND jobnumber = ?",
          "DELETE FROM approvalimpjob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND jobnumber = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Export":
        queries = [
          "DELETE FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND jobnumber = ?",
          "DELETE FROM approvalexpjob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND jobnumber = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Organization":
        queries = [
          "DELETE FROM approvalorg WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND clientname = ?",
          "DELETE FROM organizations WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND clientname = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Collection":
        queries = [
          "DELETE FROM collection WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND billNo = ?",
          "DELETE FROM transactionhistory WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND referenceNo = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Milestone":
        queries = [
          "DELETE FROM milestone WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, id];
        break;

      case "Milestone Details":
        queries = [
          "DELETE FROM setworkflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, id];
        break;

      case "Credit":
        queries = [
          "DELETE FROM credit WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Debit":
        queries = [
          "DELETE FROM debit WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, id];
        break;

      case "Branch":
        queries = [
          "DELETE FROM ownbranches WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND ownbranchname = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Delegation":
        queries = [
          "DELETE FROM delegations WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, id];
        break;

      case "Users":
        queries = [
          "DELETE FROM userkyctable WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1  AND id = ?",
        ];
        queryParams = [orgname, orgcode, id];
        break;

      case "Lob":
        queries = [
          "DELETE FROM lob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1  AND id = ?",
        ];
        queryParams = [orgname, orgcode, id];
        break;

      case "Branch(org)":
        const [clientname, branchname] = jobnumber
          .split(/[()]/)
          .filter(Boolean);
        if (!clientname || !branchname) {
          throw new Error("Invalid jobnumber format for Branch(org)");
        }

        await Promise.all([
          connection.execute(
            "DELETE FROM organizations WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND clientname = ? AND branchname = ?",
            [orgname, orgcode, clientname.trim(), branchname.trim()]
          ),
          connection.execute(
            "DELETE FROM branches WHERE orgcode = ? AND IsDeleted = 1 AND clientname = ? AND branchname = ?",
            [orgcode, clientname.trim(), branchname.trim()]
          ),
        ]);
        break;

      case "Approver":
        queries = [
          "DELETE FROM approverlist WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND approverlistname = ?",
          "DELETE FROM approverName WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND approverlistname = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Lob":
        queries = [
          "DELETE FROM lob WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Lob Milestone":
        queries = [
          "DELETE FROM setworkflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      case "Workflow":
        const conn = await connection.getConnection(); // Create a transactional connection
        try {
          await conn.beginTransaction(); // Start transaction

          // Fetch ownbranchname, lobname, and importername before deletion
          const [workflowRows] = await conn.execute(
            "SELECT ownbranchname, lobname, importername FROM workflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
            [orgname, orgcode, id]
          );

          if (workflowRows.length > 0) {
            const { ownbranchname, lobname, importername } = workflowRows[0]; // Store values
            console.log(
              `Fetched values - Own Branch: ${ownbranchname}, LOB Name: ${lobname}, Importer Name: ${importername}`
            );

            // Execute DELETE from workflow
            const [workflowDelete] = await conn.execute(
              "DELETE FROM workflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND id = ?",
              [orgname, orgcode, id]
            );

            // If a row was deleted, execute the second DELETE query
            if (workflowDelete.affectedRows > 0) {
              const [setWorkflowDelete] = await conn.execute(
                "DELETE FROM setworkflow WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND ownbranchname = ? AND lobname = ? AND importername = ?",
                [orgname, orgcode, ownbranchname, lobname, importername]
              );

              console.log(
                `Deleted ${setWorkflowDelete.affectedRows} rows from setworkflow.`
              );
            }
          } else {
            console.warn("No matching workflow found for deletion.");
          }

          await conn.commit(); // Commit transaction
        } catch (error) {
          await conn.rollback(); // Rollback if there's an error
          console.error("Error during permanent deletion:", error);
          throw new Error(`Failed to delete Workflow entry: ${error.message}`);
        } finally {
          conn.release(); // Release connection
        }
        break;

      case "Document":
        // First get file locations
        const [rows] = await connection.execute(
          "SELECT filelocation FROM docsupload WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND filename = ?",
          [orgname, orgcode, jobnumber]
        );

        // Delete physical files
        if (rows?.length > 0) {
          for (const row of rows) {
            const fullPath = path.isAbsolute(row.filelocation)
              ? row.filelocation
              : path.join(UPLOADS_DIR, row.filelocation);

            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
              console.log(`Deleted file: ${fullPath}`);
            }
          }
        }

        queries = [
          "DELETE FROM docsupload WHERE orgname = ? AND orgcode = ? AND IsDeleted = 1 AND filename = ?",
        ];
        queryParams = [orgname, orgcode, jobnumber];
        break;

      default:
        throw new Error(`Invalid type: ${type}`);
    }

    // Execute all queries
    for (const query of queries) {
      const [result] = await connection.execute(query, queryParams);
      if (result.affectedRows === 0) {
        console.warn(`No rows deleted for query: ${query}`);
      }
    }

    return {
      success: true,
      message: `${type} entry deleted successfully`,
      type,
      jobnumber,
    };
  } catch (error) {
    console.error("Error during permanent deletion:", error);
    throw new Error(`Failed to delete ${type} entry: ${error.message}`);
  }
};

export const updatePermanentDeleteValue = async (
  orgname,
  orgcode,
  deleteIntervalForJobsAndOrg
) => {
  try {
    await connection.execute(
      `UPDATE users SET deleteIntervalForJobsAndOrg = ? WHERE orgname = ? AND orgcode = ?`,
      [deleteIntervalForJobsAndOrg, orgname, orgcode]
    );
    scheduleCronJobs(deleteIntervalForJobsAndOrg, orgname, orgcode);
  } catch (error) {
    console.error("Error updating permanent delete value:", error.message);
  }
};

//get all deleted job and org for bin tab

export const getAllJobsAndOrg = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `
            SELECT 
                jobnumber COLLATE utf8mb4_0900_ai_ci as jobnumber, 
                NULL AS id,
                jobowner COLLATE utf8mb4_0900_ai_ci as jobowner, 
                importername COLLATE utf8mb4_0900_ai_ci as importername, 
                createdat COLLATE utf8mb4_0900_ai_ci as createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci as deletedby, 
                deletedAt, 
                remark COLLATE utf8mb4_0900_ai_ci as remark, 
                'Import' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM approvalimpjob 
            WHERE isDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_ai_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_ai_ci = ? 
            AND branchname COLLATE utf8mb4_0900_ai_ci = ? 
            AND branchcode COLLATE utf8mb4_0900_ai_ci = ?

            UNION ALL

            SELECT 
                jobnumber COLLATE utf8mb4_0900_ai_ci, 
                NULL AS id,
                jobowner COLLATE utf8mb4_0900_ai_ci, 
                exportername COLLATE utf8mb4_0900_ai_ci, 
                createdat COLLATE utf8mb4_0900_ai_ci, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci, 
                deletedAt, 
                remark COLLATE utf8mb4_0900_ai_ci, 
                'Export' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM approvalexpjob 
            WHERE isDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_ai_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_ai_ci = ? 
            AND branchname COLLATE utf8mb4_0900_ai_ci = ? 
            AND branchcode COLLATE utf8mb4_0900_ai_ci = ?

            UNION ALL

            SELECT 
                clientname COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                NULL AS id,
                username COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                NULL AS importername, 
                createdon COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci, 
                deletedAt, 
                remark COLLATE utf8mb4_0900_ai_ci, 
                'Organization' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM approvalorg 
            WHERE isDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_ai_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_ai_ci = ?

            UNION ALL

            SELECT 
                filename COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                NULL AS id,
                uploadedby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                NULL AS importername, 
                uploadedon COLLATE utf8mb4_0900_ai_ci AS createdat, 
                CAST(isDeleted AS UNSIGNED) as IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci, 
                CAST(deletedAt AS DATETIME) as deletedAt, 
                deleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Document' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM docsupload 
            WHERE isDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_ai_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_ai_ci = ?

            UNION ALL

            SELECT 
                billno COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                NULL AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                clientname COLLATE utf8mb4_0900_ai_ci AS importername, 
                Date COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Collection' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM collection 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

            UNION ALL

            SELECT 
                milestonename COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                id COLLATE utf8mb4_0900_ai_ci AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                NULL AS importername, 
                Date COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Milestone' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM milestone 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

               UNION ALL

            SELECT 
                referenceno COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                id COLLATE utf8mb4_0900_ai_ci AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                NULL AS importername, 
                currentdate COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Credit' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM credit 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

               UNION ALL

            SELECT 
                referenceno COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                   id COLLATE utf8mb4_0900_ai_ci AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                NULL AS importername, 
                date COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Debit' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM debit 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?



                        UNION ALL

            SELECT 
                lobname COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                id COLLATE utf8mb4_0900_ai_ci AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                NULL AS importername, 
                Date COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Lob' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM lob 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

                        UNION ALL

            SELECT 
                concat(lobname,'(',importername,')') COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                    id COLLATE utf8mb4_0900_ai_ci AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                importername COLLATE utf8mb4_0900_ai_ci AS importername, 
                Date COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Workflow' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM workflow 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

            
                        UNION ALL

            SELECT 
                taskname COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                id COLLATE utf8mb4_0900_ai_ci AS id, 
                assignedBy COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                Null AS importername, 
                completedOn COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                deletionRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Delegation' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM delegations 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

                       UNION ALL

                          SELECT 
                ownbranchname COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                NULL AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                headname COLLATE utf8mb4_0900_ai_ci AS importername, 
                createdAt COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Branch' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM ownbranches 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

              UNION ALL

                          SELECT 
               CONCAT(clientname, '(', branchname, ')') COLLATE utf8mb4_0900_ai_ci AS jobnumber,
               NULL AS id,
                username COLLATE utf8mb4_0900_ai_ci AS jobowner, 
               NULL AS importername, 
                createdon COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                username COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Branch(org)' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM organizations
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

             UNION ALL

                          SELECT 
              username COLLATE utf8mb4_0900_ai_ci AS jobnumber,
                id COLLATE utf8mb4_0900_ai_ci AS id, 
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
               NULL AS importername, 
                createdat COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Users' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM userkyctable
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?


                       UNION ALL

            SELECT 
                concat(workflowmilestone,'(',lobname,'~',importername,')') COLLATE utf8mb4_0900_ai_ci AS jobnumber, 
                id COLLATE utf8mb4_0900_ai_ci AS id,
                createdby COLLATE utf8mb4_0900_ai_ci AS jobowner, 
                importername COLLATE utf8mb4_0900_ai_ci AS importername, 
                created_at COLLATE utf8mb4_0900_ai_ci AS createdat, 
                IsDeleted, 
                deletedby COLLATE utf8mb4_0900_ai_ci AS deletedby, 
                CAST(deletedAt AS DATETIME) as deletedAt,
                DeleteRemark COLLATE utf8mb4_0900_ai_ci AS remark, 
                'Milestone Details' COLLATE utf8mb4_0900_ai_ci AS type 
            FROM setworkflow 
            WHERE IsDeleted = 1 
            AND orgname COLLATE utf8mb4_0900_as_ci = ? 
            AND orgcode COLLATE utf8mb4_0900_as_ci = ?

            ORDER BY deletedAt DESC;
        `,
      [
        orgname,
        orgcode,
        branchname,
        branchcode, // For approvalimpjob
        orgname,
        orgcode,
        branchname,
        branchcode, // For approvalexpjob
        orgname,
        orgcode, // For approvalorg
        orgname,
        orgcode, // For docsupload
        orgname,
        orgcode, // For collections
        orgname,
        orgcode, // For collections
        orgname,
        orgcode, // For collections
        orgname,
        orgcode, // For milestone
        orgname,
        orgcode, // For lob
        orgname,
        orgcode, // For workflow
        orgname,
        orgcode, // For ownBranches
        orgname,
        orgcode, // For organization
        orgname,
        orgcode, // For setworkflow
        orgname,
        orgcode, // For setworkflow
        orgname,
        orgcode, // For approver
      ]
    );

    console.log(`Found ${rows.length} deleted items`);
    return rows;
  } catch (error) {
    console.error("Error in getAllJobsAndOrg:", error);
    throw error;
  }
};

export const restoreJobAndOrg = async (orgname, orgcode, jobnumber) => {
  // console.log(orgname, orgcode, jobnumber);
  try {
    const [rows1] = await connection.execute(
      `UPDATE approvalexpjob SET IsDeleted = 0 , deletedby = null , remark = null, deletedAt = null WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    const [rowss1] = await connection.execute(
      `UPDATE expjobcreation SET IsDeleted = 0 , deletedAt = null WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );

    const [rows2] = await connection.execute(
      `UPDATE approvalimpjob SET IsDeleted = 0 , deletedby = null , remark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );
    const [rowss2] = await connection.execute(
      `UPDATE impjobcreation SET IsDeleted = 0 , deletedAt = null WHERE orgname = ? AND orgcode = ? AND jobnumber = ?`,
      [orgname, orgcode, jobnumber]
    );

    //In Case of Organization , approvalorg and branches jobnumber value is clientname i have just use jobnumber as clientname in case of organization
    const [rows] = await connection.execute(
      `UPDATE approvalorg SET IsDeleted = 0 , deletedby = null , remark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND clientname = ?`,
      [orgname, orgcode, jobnumber]
    );

    const [rowss] = await connection.execute(
      `UPDATE organizations SET IsDeleted = 0 , deletedAt = null WHERE orgname = ? AND orgcode = ? AND clientname = ?`,
      [orgname, orgcode, jobnumber]
    );
    const [rowsss] = await connection.execute(
      `UPDATE branches SET IsDeleted = 0 , deletedAt = null WHERE orgcode = ? AND clientname = ?`,
      [orgcode, jobnumber]
    );
    const [trekimp] = await connection.execute(
      `UPDATE trackingimport SET IsDeleted = 0 ,deletedAt = null WHERE orgcode = ? AND jobnumber = ?`,
      [orgcode, jobnumber]
    );
    const [trekexp] = await connection.execute(
      `UPDATE trackingexport SET IsDeleted = 0 , deletedAt = null WHERE orgcode = ? AND jobnumber = ?`,
      [orgcode, jobnumber]
    );
    const [docsupload] = await connection.execute(
      `UPDATE docsupload SET IsDeleted = 0 ,deletedAt = null, deleteRemark = null, deletedby = null WHERE orgcode = ? AND jobnumber = ?`,
      [orgcode, jobnumber]
    );
    const [collection] = await connection.execute(
      `UPDATE collection SET IsDeleted = 0 ,deletedAt = null WHERE orgcode = ? AND jobnumber = ?`,
      [orgcode, jobnumber]
    );
    const [transactionhistory] = await connection.execute(
      `UPDATE transactionhistory SET IsDeleted = 0 ,deletedAt = null WHERE orgcode = ? AND jobnumber = ?`,
      [orgcode, jobnumber]
    );
  } catch (error) {
    console.log(error);
  }
};

export const restoreDocument = async (orgname, orgcode, filename) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE docsupload SET IsDeleted = 0 ,deletedAt = null, deleteRemark = null, deletedby = null WHERE orgname = ? AND orgcode = ? AND filename = ?`,
      [orgname, orgcode, filename]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreUsers = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE userkyctable SET IsDeleted = 0 ,deletedAt = null, DeleteRemark = null, deletedby = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreCollection = async (orgname, orgcode, billno) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE collection SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND billno = ?`,
      [orgname, orgcode, billno]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreApprover = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE approverlist SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND approverlistname = ?`,
      [orgname, orgcode, id]
    );

    const [rows2] = await connection.execute(
      `UPDATE approvername SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND approverlistname = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
    console.log(rows2);
  } catch (error) {
    console.log(error);
  }
};

export const restoreCredit = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE credit SET IsDeleted = 0 , DeleteRemark = null, deletedby = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );

    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};
export const restoreDebit = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE debit SET IsDeleted = 0 , DeleteRemark = null, deletedby = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );

    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreMilestone = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE milestone SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};
export const restoreDelegation = async (orgname, orgcode, id) => {
  try {
    console.log(id);
    const [rows] = await connection.execute(
      `UPDATE delegations SET IsDeleted = 0 , deletionRemark = null , deletedAt = null , deletedby = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreLob = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE lob SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreWorkflow = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE workflow SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreBranch = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE ownbranches SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND ownbranchname = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const restoreBranchOrg = async (orgname, orgcode, id) => {
  try {
    // Extract clientname and branchname from the ID
    const [clientname, branchname] = id.split(/[()]/).filter(Boolean);

    const [result] = await connection.execute(
      `UPDATE organizations 
       SET IsDeleted = 0, DeleteRemark = NULL, deletedAt = NULL 
       WHERE orgname = ? AND orgcode = ? AND clientname = ? AND branchname = ?`,
      [orgname, orgcode, clientname.trim(), branchname.trim()]
    );

    if (result.affectedRows === 0) {
      throw new Error(
        "No records were restored - possibly already active or not found"
      );
    }

    return { success: true, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("Restoration failed:", error);
    throw error; // Re-throw to let caller handle it
  }
};

export const restoreLobMilestone = async (orgname, orgcode, id) => {
  try {
    const [rows] = await connection.execute(
      `UPDATE setworkflow SET IsDeleted = 0 , DeleteRemark = null , deletedAt = null WHERE orgname = ? AND orgcode = ? AND id = ?`,
      [orgname, orgcode, id]
    );
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPermanentDeleteValue = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT deleteIntervalForJobsAndOrg FROM users WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching permanent delete value:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
