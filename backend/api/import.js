import { connectMySQL } from "../config/sqlconfig.js";



let incrementNumber = 0;
export const storeJob = async (jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode, lastIc) => {
    try {
        const connection = await connectMySQL();
        const firstletter = transportMode.charAt(0).toUpperCase();
     
    
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

        let jobNumber = `${firstletter}/I/${yearPart}`


        const [result] = await connection.execute(`INSERT INTO impjobcreation 
        (jobnumber, jobdate, docreceivedon, transportmode, customhouse, ownbooking, deliverymode, noofcontainer, owntransportation, betype, consignmenttype, cfsname, shippinglinename, bltype, bltypenum, jobowner, orgname, orgcode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [jobNumber, jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgname, orgcode]);

        const insertedId = result.insertId;

        // Retrieve the inserted row
        const [row] = await connection.execute('SELECT * FROM impjobcreation WHERE id = ?', [insertedId]);
       
        return row;

    } catch (error) {
        console.log(error);
    }
}




export const updateJobNumber = async (id, transportMode) => {
    try {
        const connection = await connectMySQL();

        const firstletter = transportMode.charAt(0).toUpperCase();
     
    
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

        let jobNumberlatest = `${firstletter}/I/${id}/${yearPart}`


        const [row] = await connection.execute(
            `UPDATE impjobcreation SET jobnumber = ? WHERE id = ?`,
            [jobNumberlatest, id]
        );
        
        return jobNumberlatest;
    } catch (error) {
        console.log(error);
    }
}



export const fetchBranches = async (importerName, orgcode) => {
    try {
        const connection = await connectMySQL();
        
        const [rows] = await connection.execute(`SELECT branchname FROM branches WHERE clientname = ? AND orgcode = ?`, [importerName, orgcode]);
       
        return rows;
    } catch (error) {
        console.log(error);
    }
}



export const fetchAllorgdata = async (clientName, branchName, orgcode) => {
    try {
        const connection = await connectMySQL();
        
        const [rows] = await connection.execute(`SELECT GST, IEC, address FROM organizations WHERE clientname = ? AND orgcode = ? AND branchname = ?`, [clientName, orgcode, branchName]);
      
        return rows;
        
    } catch (error) {
        console.error('Error fetching organization data:', error);
        throw error; // Rethrow the error or handle it appropriately
    }
}



export const storeGeneralImportData = async (orgname, orgcode, jobowner, jobnumber, importerName, address, gst, iec, portShipment, finalDestination) => {
    try {
        const connection = await connectMySQL();
        const [row] = await connection.execute(
            `INSERT INTO impgeneral (orgname, orgcode, jobowner, jobnumber, importername, address, gst, iec, portofshipment, finaldestination) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [orgname, orgcode, jobowner, jobnumber, importerName, address, gst, iec, portShipment, finalDestination]
        );
        return row;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error or handle it appropriately
    }
};



export const getClient = async (orgcode) => {
    try {
        const connection = await connectMySQL();
        const [rows] = await connection.execute(`SELECT clientname FROM organizations WHERE orgcode = ?`, [orgcode]);
       
        return rows;
    } catch (error) {
        console.log(error);
    }
}