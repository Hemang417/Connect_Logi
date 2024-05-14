import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

const [existingData] = await connection.execute(`SELECT * FROM notifications WHERE orgname = ? AND orgcode = ? AND id = ?`, ['Seawave Forwarding Logistics', 'seawave@2323', 1]);
        console.log(existingData);
        // Prepare the new data to be inserted
        const newReading = { employeename: employeename, reading: 1 };
        const newTimeOfReading = { employeename: employeename, time: currentDate };

        // If existing data is present, append the new data
        if (existingData.reading && existingData.timeofreading) {
            existingData.reading.push(newReading);
            existingData.timeofreading.push(newTimeOfReading);
        } else {
            // If no existing data, initialize the arrays with the new data
            existingData.reading = [newReading];
            existingData.timeofreading = [newTimeOfReading];
        }
