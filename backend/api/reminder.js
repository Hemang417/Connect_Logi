import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const StoringReminders = async (reminders, jobnumber) => {
    try {
        for (const reminder of reminders) {
            const { 
                orgname, orgcode, assignedperson, workflowname, id, planDate, 
                ownbranchname, reminderdays, reminderhours, reminderminutes, status, lobname 
            } = reminder;

            // Log the current reminder data for debugging
            console.log('Processing reminder:', reminder);

            // Check if the reminder already exists
            const [existingRows] = await connection.execute(
                `SELECT * FROM reminders WHERE jobnumber = ? AND workflowname = ? AND lobname = ? AND ownbranchname = ?`,
                [jobnumber, workflowname, lobname, ownbranchname]
            );

            // If no existing rows, insert the new reminder
            if (existingRows.length === 0) {
                // Ensure all parameters are defined, replace undefined with null
                const safeOrgName = orgname ?? null;
                const safeOrgCode = orgcode ?? null;
                const safeAssignedPerson = assignedperson ? JSON.stringify(assignedperson) : null;
                const safePlanDate = planDate ?? null;
                const safeLobName = lobname ?? null;
                const safeOwnBranchName = ownbranchname ?? null;
                const safeReminderDays = reminderdays ?? null;
                const safeReminderHours = reminderhours ?? null;
                const safeReminderMinutes = reminderminutes ?? null;
                const safeStatus = status ?? null;
                const safeId = id ?? null;

                // Log the data before insertion
                console.log('Inserting reminder with data:', {
                    safeOrgName, safeOrgCode, safeAssignedPerson, workflowname, safePlanDate, 
                    safeLobName, safeOwnBranchName, safeReminderDays, safeReminderHours, 
                    safeReminderMinutes, safeStatus, safeId, jobnumber
                });

                await connection.execute(
                    `INSERT INTO reminders 
                    (orgname, orgcode, assignedpeoplereminder, workflowname, planDate, lobname, ownbranchname, reminderdays, reminderhours, reminderminutes, status, wid, jobnumber)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        safeOrgName, safeOrgCode, safeAssignedPerson, workflowname ?? null, 
                        safePlanDate, safeLobName, safeOwnBranchName, safeReminderDays, 
                        safeReminderHours, safeReminderMinutes, safeStatus, safeId, jobnumber ?? null
                    ]
                );
                console.log(`Inserted reminder for workflow: ${workflowname}`);
            } else {
                console.log(`Reminder already exists for workflow: ${workflowname}, skipping insertion.`);
            }
        }
    } catch (error) {
        console.log('Error processing reminders:', error);
    }
};



export const fetchReminders = async (orgname, orgcode, branchname) => {
    try {   
        const [rows] = await connection.execute(`SELECT * FROM reminders WHERE orgname = ? AND orgcode = ? AND ownbranchname = ?`, [orgname, orgcode , branchname]);
        // console.log(rows);
        
        return rows;
    } catch (error) {
        console.log(error);
    }
}