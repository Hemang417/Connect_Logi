import { connectMySQL } from "../config/sqlconfig.js";
let increamentNumber=0;
export const storeJob = async (jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode) => {
    try {
        const connection = await connectMySQL();
        const firstletter = transportMode.charAt(0).toUpperCase();

        if (typeof increamentNumber === 'undefined') {
            increamentNumber = -1;
        } else {
            increamentNumber++; // Increment for subsequent calls
        }



        // let randNumber = 1;
        // let increamentNumber = randNumber;
        // increamentNumber++;
        let currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth()-1; // April (zero-based index)
        
        // Determine the year range based on the current month
        let startYear = currentMonth >= 3 ? currentYear : currentYear - 1;
        let endYear = startYear + 1;
        
        // Extract the last two digits of the years
        let startYearPart = startYear.toString().slice(-2);
        let endYearPart = endYear.toString().slice(-2);
        
        // Construct the year range
        let yearPart = `${startYearPart}-${endYearPart}`;

        let jobNumber = `${firstletter}/I/${increamentNumber}/${yearPart}`


        const [row] = await connection.execute(`INSERT INTO impjobcreation 
        (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, bltype, bltypenum, jobowner, orgname, orgcode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [jobNumber, jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode]);


        return row;

    } catch (error) {
        console.log(error);
    }
}