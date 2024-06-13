import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const StoringReminders = async (reminders, jobnumber) => {
    try {
        for (const reminder of reminders) {
            const { orgname, orgcode, assignedperson, workflowname, id, planDate, ownbranchname, reminderdays, reminderhours, reminderminutes, status, lobname } = reminder;

            // Check if the reminder already exists
            const [existingRows] = await connection.execute(
                `SELECT * FROM reminders WHERE jobnumber = ? AND workflowname = ? AND lobname = ? AND ownbranchname = ?`,
                [jobnumber, workflowname, lobname, ownbranchname]
            );

            // If no existing rows, insert the new reminder
            if (existingRows.length === 0) {
                await connection.execute(
                    `INSERT INTO reminders 
                    (orgname, orgcode, assignedpeoplereminder, workflowname, planDate, lobname, ownbranchname, reminderdays, reminderhours, reminderminutes, status, wid, jobnumber)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [orgname, orgcode, JSON.stringify(assignedperson), workflowname, planDate, lobname, ownbranchname, reminderdays, reminderhours, reminderminutes, status, id, jobnumber]
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