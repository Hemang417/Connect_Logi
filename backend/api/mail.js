import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const CompletedJobsbasedonPreviousDataofFunctions = async () => {
    try {
        return 'Calling CompletedJobsbasedonPreviousDataofFunctions API'
    } catch (error) {
        console.log(error);
    }
}