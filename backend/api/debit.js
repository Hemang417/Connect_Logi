import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const GetClientNamesofTheOrg = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT clientname FROM organizations WHERE orgname = ? AND orgcode = ?`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const extractValue = (obj) => {
  if (typeof obj === "object" && obj !== null && obj.hasOwnProperty("label")) {
    return obj.label;
  }
  return "N/A";
};

export const StoreDebit = async (
  date,
  bankname,
  typeOfExpense,
  paymentdetail,
  taxableAmount,
  totalInvoiceAmount,
  gstAmount,
  tdsAmount,
  netPaymentAmount,
  utrDetails,
  typeofjob,
  jobNo,
  customerName,
  remarks,
  orgname,
  orgcode,
  branchname,
  branchcode,
  createdby
) => {
  // const extractedValue = extractValue(bankname)
  const referenceno = Math.floor(Math.random() * 1000);
  try {
    // Step 1: Get the reference number configuration
    const [creditno] = await connection.execute(
      `SELECT * FROM customrefnumber WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? ORDER BY id ASC`,
      [orgname, orgcode, branchname, branchcode]
    );

    // Step 2: Determine fiscal year
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-based (0 = Jan)
    const currentYear = today.getFullYear();
    const startYearPart =
      currentMonth >= 3
        ? currentYear.toString().slice(-2)
        : (currentYear - 1).toString().slice(-2);
    const endYearPart =
      currentMonth >= 3
        ? (currentYear + 1).toString().slice(-2)
        : currentYear.toString().slice(-2);
    const fiscalYear = `${startYearPart}-${endYearPart}`;

    // Step 3: Count existing records for the branch
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) AS count FROM credit WHERE branchcode = ?`,
      [branchcode]
    );
    const count = countResult[0]?.count
      ? parseInt(countResult[0].count, 10) + 1
      : 1;

    // Step 4: Prepare refNoParts map
    const refNoParts = {
      "Fiscal Year": fiscalYear,
      BranchName: branchname,
      Custom: "",
    };

    let countAppended = false;
    const refNoComponents = [];

    // Step 5: Build reference number in the correct order
    for (const item of creditno) {
      switch (item.columnname) {
        case "Fiscal Year":
          refNoComponents.push(refNoParts["Fiscal Year"]);
          break;
        case "Branch Name":
          refNoComponents.push(refNoParts["BranchName"]);
          break;
        case "Custom":
          refNoComponents.push(item.inputofcustom?.trim() || "");
          break;
        case "Credit/Debit":
          refNoComponents.push("DR");
          break;
        case "Ref No.":
          refNoComponents.push(`${count}`);
          countAppended = true;
          break;
        default:
          // Skip unknown columns safely
          break;
      }
    }

    if (!countAppended) {
      refNoComponents.push(`${count}`);
    }

    const refNolatest = refNoComponents.filter(Boolean).join("/");
    // console.log(date, bankname, typeOfExpense, paymentdetail, taxableAmount, gstAmount, totalInvoiceAmount, tdsAmount, netPaymentAmount, utrDetails,typeofjob, jobNo, customerName, remarks, orgname, orgcode, branchname, branchcode);
    const [row] = await connection.execute(
      `INSERT INTO debit (date, referenceno, bankname, typeofexpense, paymentdetail, taxamount, totalinvoiceamount, gstamount, tdsamount, netpaymentamount, utrnumber,typeofjob, jobnumber, customername, remarks, orgname, orgcode, branchname, branchcode,createdby) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        date,
        referenceno,
        bankname,
        typeOfExpense,
        paymentdetail,
        taxableAmount,
        totalInvoiceAmount,
        gstAmount,
        tdsAmount,
        netPaymentAmount,
        utrDetails,
        typeofjob,
        jobNo.value,
        customerName,
        remarks,
        orgname,
        orgcode,
        branchname,
        branchcode,
        createdby
      ]
    );

    if (row.affectedRows > 0) {
      await connection.execute(
        `INSERT INTO transactionhistory (jobnumber, currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode, orgbranchname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          jobNo.value,
          date,
          typeOfExpense,
          utrDetails,
          0,
          taxableAmount,
          orgname,
          orgcode,
          branchname,
        ]
      );
    }
    return row;
  } catch (error) {
    console.error("Error storing debit data:", error);
    throw error;
  }
};

export const GetDebitDetails = async (orgname, orgcode) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM debit WHERE orgname = ? AND orgcode = ? AND IsDeleted = 0`,
      [orgname, orgcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDebit = async (
  orgname,
  orgcode,
  debitid,
  deletedby,
  deletedRemark
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE debit SET IsDeleted = 1, DeleteRemark = ?, deletedAt = NOW(), deletedby = ?  WHERE orgname = ? AND orgcode = ?  AND id = ?`,
      [deletedRemark, deletedby, orgname, orgcode, debitid]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const UpdateDebit = async (
  id,
  orgname,
  orgcode,
  paymentdetail,
  date,
  bankname,
  taxableAmount,
  typeOfExpense,
  totalInvoiceAmount,
  gstAmount,
  tdsAmount,
  netPaymentAmount,
  utrDetails,
  typeofjob,
  jobNo,
  customerName,
  remarks
) => {
  console.log("id", id);
  console.log("orgname", orgname);
  console.log("orgcode", orgcode);
  console.log("pay details", paymentdetail);
  console.log("date", date);
  console.log("BN", bankname);
  console.log("type", typeOfExpense);
  console.log("tax", taxableAmount);
  console.log("total", totalInvoiceAmount);
  console.log("gst", gstAmount);
  console.log("tds", tdsAmount);
  console.log("net", netPaymentAmount);
  console.log("utr", utrDetails);
  console.log("job", typeofjob);
  console.log("jobno", jobNo);
  console.log("cust", customerName);
  console.log("remarks", remarks);

  try {
    const [row] = await connection.execute(
      "UPDATE debit SET date = ? , bankname = ? , typeofexpense = ? , paymentdetail =? ,taxamount =? ,totalinvoiceamount = ? , gstamount =? , tdsamount =? , netpaymentamount =? , utrnumber =? ,typeofjob = ? , jobnumber =? , customername =? , remarks =? WHERE id = ? AND orgname = ? AND orgcode = ?",
      [
        date,
        bankname,
        typeOfExpense,
        paymentdetail,
        taxableAmount,
        totalInvoiceAmount,
        gstAmount,
        tdsAmount,
        netPaymentAmount,
        utrDetails,
        typeofjob,
        jobNo,
        customerName,
        remarks,
        id,
        orgname,
        orgcode,
      ]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const GetDebitById = async (id) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM debit WHERE id = ?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobnumberfromcollectionsdebit = async (
  orgname,
  orgcode,
  branchnameofemp,
  typeOfJob
) => {
  try {
    // console.log(orgname , orgcode , branchnameofemp , typeOfJob.value);
    if (typeOfJob === "Import") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , importername FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ?`,
        [orgname, orgcode, branchnameofemp]
      );
      return rows;
    } else if (typeOfJob.value === "Import") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , importername FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ?`,
        [orgname, orgcode, branchnameofemp]
      );
      return rows;
    } else if (typeOfJob === "Export") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , exportername FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ?`,
        [orgname, orgcode, branchnameofemp]
      );
      return rows;
    } else if (typeOfJob.value === "Export") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , exportername FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ?`,
        [orgname, orgcode, branchnameofemp]
      );
      return rows;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const
