import { connectMySQL } from "../config/sqlconfig.js";

const connection = await connectMySQL();

/////////prospect///////
export const storeProspect = async (
  currentDate,
  username,
  customerName,
  contactPersonName,
  contactPersonNo,
  emailId,
  address,
  source,
  customSource,
  country,
  state,
  city,
  postalcode,
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    let startYearPart, endYearPart;
    if (currentMonth >= 3) {
      startYearPart = currentYear.toString().slice(-2);
      endYearPart = (currentYear + 1).toString().slice(-2);
    } else {
      startYearPart = (currentYear - 1).toString().slice(-2);
      endYearPart = currentYear.toString().slice(-2);
    }
    let ran = Math.floor(100 + Math.random() * 900)
    let yearPart = `${startYearPart}-${endYearPart}`;
    const referenceNo = `pros/${yearPart}/${branchname}/${ran}`;
    const [rows] = await connection.execute(
      `INSERT INTO prospect (referenceNo , currentDate , username , customerName , contactPersonName , contactPersonNo , emailId , address , source , customSource ,country, state , city ,postalcode , orgname , orgcode , branchname , branchcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ? , ?)`,
      [
        referenceNo,
        currentDate,
        username,
        customerName,
        contactPersonName,
        contactPersonNo,
        emailId,
        address,
        source,
        customSource,
        country,
        state,
        city,
        postalcode,
        orgname,
        orgcode,
        branchname,
        branchcode,
      ]
    );

    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProspect = async (orgname, orgcode, branchname, branchcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM prospect WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProspectDataById = async (id) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM prospect WHERE id = ?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProspect = async (
  id,
  customerName,
  contactPersonName,
  contactPersonNo,
  emailId,
  address,
  source,
  customSource,
  country,
  state,
  city,
  postalcode
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE prospect SET customerName = ? , contactPersonName = ? , contactPersonNo = ? , emailId = ?  , address = ? , source = ? , customSource = ? , country = ? , state = ? , city = ? , postalcode = ? WHERE id = ?`,
      [
        customerName,
        contactPersonName,
        contactPersonNo,
        emailId,
        address,
        source,
        customSource || null,
        country,
        state,
        city,
        postalcode,
        id,
      ]
    );
    // console.log(row);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProspect = async (id) => {
  try {
    // console.log(id);
    const [row] = await connection.execute(
      `DELETE FROM prospect WHERE id = ?`,
      [id]
    );
    // console.log("Delete result:", row);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

////Enquiry////

export const storeEnquiry = async (
  clientType,
  companyname,
  contactPerson,
  phoneNo,
  emailId,
  enquiryFor,
  rfq,
  enquirycreationdate,
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    let startYearPart, endYearPart;
    if (currentMonth >= 3) {
      startYearPart = currentYear.toString().slice(-2);
      endYearPart = (currentYear + 1).toString().slice(-2);
    } else {
      startYearPart = (currentYear - 1).toString().slice(-2);
      endYearPart = currentYear.toString().slice(-2);
    }
    let ran = Math.floor(100 + Math.random() * 900)
    let yearPart = `${startYearPart}-${endYearPart}`;

    const enquiryForAbbreviation = enquiryFor
      .map((item) => item.charAt(0).toUpperCase()) // Get the first letter and capitalize it
      .join(''); // Combine into a single string
    const referenceNo = `${enquiryForAbbreviation}/${yearPart}/${branchname}/${ran}`
    const [result] = await connection.execute(
      `INSERT INTO enquiry (referenceNo ,
          clientType,
    companyname, 
    contactPerson,
    phoneNo,
    emailId,
    enquiryFor,
    rfq,
    enquirycreationdate,
    orgname,
    orgcode,
    branchname,
    branchcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`,
      [
        referenceNo,
        clientType,
        companyname,
        contactPerson,
        phoneNo,
        emailId,
        enquiryFor,
        rfq,
        enquirycreationdate,
        orgname,
        orgcode,
        branchname,
        branchcode,
      ]
    );
    //  console.log("ufifs",rows);
    return { id: result.insertId };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const storeEnquiryForDetails = async (
  enquiry_id,
  enquiryDetails
) => {
  try {
    const { enquiryForType, weight, commodity, portOfLoading, portOfDischarge, typeOfContainer, typeOfDelivery } = enquiryDetails;
    const [rows] = await connection.execute(
      `INSERT INTO enquiry_details (
        enquiry_id,
        enquiryForType,
        weight,
      commodity,
      portOfLoading,
      portOfDischarge,
     typeOfContainer,
      typeOfDelivery) VALUES (?, ?, ?, ?, ?, ? , ? , ?)`,
      [
        enquiry_id,
        enquiryForType,
        weight,
        commodity,
        portOfLoading,
        portOfDischarge,
        typeOfContainer,
        typeOfDelivery,
      ]
    );
    //  console.log("ufifs",rows);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateEnquiryForDetails = async (
  enquiry_id,
  enquiryDetails,
  enquiryForType
) => {
  console.log(enquiry_id, enquiryDetails, enquiryForType);
  try {
    const { weight, commodity, portOfLoading, portOfDischarge, typeOfContainer, typeOfDelivery } = enquiryDetails;

    // Check if the record exists
    const [existingRecord] = await connection.execute(
      `SELECT * FROM enquiry_details 
       WHERE enquiry_id = ? AND enquiryForType = ?`,
      [enquiry_id, enquiryForType]
    );

    // If the record exists, update it
    if (existingRecord.length > 0) {
      const [result] = await connection.execute(
        `UPDATE enquiry_details
         SET 
           weight = ?, 
           commodity = ?, 
           portOfLoading = ?,   
           portOfDischarge = ?, 
           typeOfContainer = ?, 
           typeOfDelivery = ?
         WHERE 
           enquiry_id = ? AND 
           enquiryForType = ?`,
        [
          weight,
          commodity,
          portOfLoading,
          portOfDischarge,
          typeOfContainer,
          typeOfDelivery,
          enquiry_id,
          enquiryForType,
        ]
      );

      // Check if any rows were affected
      if (result.affectedRows === 0) {
        throw new Error('No records updated. Please check if the enquiry ID and type are correct.');
      }

      return result; // Return the result of the update
    } else {
      // If the record does not exist, insert a new one
      const [insertResult] = await connection.execute(
        `INSERT INTO enquiry_details (enquiry_id, enquiryForType, weight, commodity, portOfLoading, portOfDischarge, typeOfContainer, typeOfDelivery)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          enquiry_id,
          enquiryForType,
          weight,
          commodity,
          portOfLoading,
          portOfDischarge,
          typeOfContainer,
          typeOfDelivery,
        ]
      );

      return insertResult; // Return the result of the insert
    }
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for further handling
  }
};

export const getEnquiry = async (orgname, orgcode, branchname, branchcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM enquiry WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ?`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getEnquiryCompany = async (orgname, orgcode) => {
  try {
    // Single query to get companyname and clientname using JOIN
    const [rows] = await connection.execute(
      `SELECT companyname FROM enquiry WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );

    return rows; // This will return an array of objects with companyname and clientname
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const getorgclientname = async (orgname, orgcode) => {
  try {
    // Single query to get companyname and clientname using JOIN
    const [rows] = await connection.execute(
      `SELECT clientname FROM organizations WHERE orgname = ? AND orgcode = ? AND IsDeleted = 0`,
      [orgname, orgcode]
    );
    return rows; // This will return an array of objects with companyname and clientname
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const getEnquiryDataById = async (id) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM enquiry WHERE id = ?`,
      [id]
    );
    // const [rows1] = await connection.execute(
    //   `SELECT * FROM enquiry_details WHERE enquiry_id = ?`,
    //   [id]
    // )
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEnquiryDetailsDataById = async (id) => {
  try {
    // const [rows] = await connection.execute(
    //   `SELECT * FROM enquiry WHERE id = ?`,
    //   [id]
    // );
    const [rows] = await connection.execute(
      `SELECT * FROM enquiry_details WHERE enquiry_id = ?`,
      [id]
    )
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEnquiry = async (
  clientType,
  companyname,
  contactPerson,
  phoneNo,
  emailId,
  enquiryFor,
  rfq,
  id
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE enquiry SET clientType = ? , companyname = ? , contactPerson = ? , phoneNo = ? , emailId = ? , enquiryFor = ? , rfq = ? WHERE id = ?`,
      [
        clientType,
        companyname,
        contactPerson,
        phoneNo,
        emailId,
        enquiryFor,
        rfq,
        id,
      ]
    );

    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteEnquiry = async (id) => {
  try {
    const [row] = await connection.execute(`DELETE FROM enquiry WHERE id = ?`, [
      id,
    ]);
    const [row1] = await connection.execute(
      `DELETE FROM enquiry_details WHERE enquiry_id = ?`,
      [id],
    )
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
