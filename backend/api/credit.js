import { connectMySQL } from "../config/sqlconfig.js";
const connection = await connectMySQL();

export const StoreCredit = async (
  currentdate,
  postDate,
  bankAccount,
  organizationType,
  organizationName,
  receivedPayementType,
  amountReceived,
  remarks,
  orgname,
  orgcode,
  branchname,
  branchcode,
  againstBillDetails,
  againstJobDetails,
  onAccountType,
  paymentAdvise,
  createdby,
) => {
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
          refNoComponents.push("CR");
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

    // Step 6: Insert into credit table
    const [row] = await connection.execute(
      `INSERT INTO credit (referenceno, currentdate, postDate, bankAccount, organizationType, organizationName, receivedPayementType, amountReceived, remarks, orgname, orgcode, branchname, branchcode, againstBillDetails, againstJobDetails, onAccountType, paymentAdvise,createdby) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        refNolatest,
        currentdate,
        postDate,
        bankAccount,
        organizationType,
        organizationName,
        receivedPayementType,
        amountReceived,
        remarks,
        orgname,
        orgcode,
        branchname,
        branchcode,
        againstBillDetails,
        againstJobDetails,
        onAccountType,
        paymentAdvise,
        createdby,
      ]
    );

    // Step 7: Insert into transactionHistory if applicable
    if (row.affectedRows > 0) {
      if (againstBillDetails) {
        for (const bill of JSON.parse(againstBillDetails)) {
          if (bill.jobNoForAgainstBill) {
            await connection.execute(
              `INSERT INTO transactionhistory (jobnumber, currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode, orgbranchname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                bill.jobNoForAgainstBill,
                currentdate,
                receivedPayementType,
                referenceno,
                bill.totalReceivableForAgainstBill,
                0,
                orgname,
                orgcode,
                branchname,
              ]
            );
          }
        }
      }

      if (
        receivedPayementType === "on-account" &&
        onAccountType === "against-outstanding"
      ) {
        // For outstanding payments, create a single transaction record without job number
        await connection.execute(
          `INSERT INTO transactionhistory (currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode, orgbranchname, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            currentdate,
            receivedPayementType + " - " + onAccountType,
            refNolatest, // Use the generated reference number
            amountReceived,
            0,
            orgname,
            orgcode,
            branchname,
            paymentAdvise || remarks,
          ]
        );
      } else if (againstJobDetails) {
        for (const job of JSON.parse(againstJobDetails)) {
          if (job.jobNo?.value) {
            await connection.execute(
              `INSERT INTO transactionhistory (jobnumber, currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode, orgbranchname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                job.jobNo.value,
                currentdate,
                receivedPayementType,
                refNolatest, // Use the generated reference number
                job.amount,
                0,
                orgname,
                orgcode,
                branchname,
              ]
            );
          }
        }
      }
    }

    return row;
  } catch (error) {
    console.error("Error storing credit data:", error);
    throw error;
  }
};

export const getAllCredit = async (
  orgname,
  orgcode,
  branchname,
  branchcode
) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM credit WHERE orgname = ? AND orgcode = ? AND branchname = ? AND branchcode = ? AND IsDeleted = 0`,
      [orgname, orgcode, branchname, branchcode]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchbillfromcollectionss = async (
  orgname,
  orgcode,
  clientname,
  branchnameofemp,
  branchcodeofemp
) => {
  try {
    if (clientname.label === "All") {
      const [rows] = await connection.execute(
        `SELECT billNo , grandTotal , jobnumber FROM collection WHERE orgname = ? AND orgcode = ? AND branchnameofemp = ? AND branchcodeofemp = ?`,
        [orgname, orgcode, branchnameofemp, branchcodeofemp]
      );
      return rows;
    }
    const [rows] = await connection.execute(
      `SELECT billNo , grandTotal , jobnumber FROM collection WHERE orgname = ? AND orgcode = ? AND clientname = ? AND branchnameofemp = ? AND branchcodeofemp = ?`,
      [orgname, orgcode, clientname.value, branchnameofemp, branchcodeofemp]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobnumberfromcollectionss = async (
  orgname,
  orgcode,
  branchnameofemp,
  typeOfJob,
  clientname
) => {
  try {
    // console.log(orgname , orgcode , branchnameofemp , typeOfJob.value);
    if (typeOfJob === "Import") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , importername FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND importername = ?`,
        [orgname, orgcode, branchnameofemp, clientname]
      );
      return rows;
    } else if (typeOfJob.value === "Import") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , importername FROM impjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND importername = ?`,
        [orgname, orgcode, branchnameofemp, clientname]
      );
      return rows;
    } else if (typeOfJob === "Export") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , exportername FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND exportername = ?`,
        [orgname, orgcode, branchnameofemp, clientname]
      );
      return rows;
    } else if (typeOfJob.value === "Export") {
      const [rows] = await connection.execute(
        `SELECT jobnumber , exportername FROM expjobcreation WHERE orgname = ? AND orgcode = ? AND branchname = ? AND exportername = ?`,
        [orgname, orgcode, branchnameofemp, clientname]
      );
      return rows;
    }
  } catch (error) {
    console.log(error);
  }
};

export const transactionHistory = async (orgname, orgcode, jobnumber) => {
  // console.log(orgname, orgcode, jobnumber);
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM transactionhistory WHERE orgname = ? AND orgcode = ? AND jobnumber = ? AND IsDeleted = 0`,
      [orgname, orgcode, jobnumber]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCredit = async (
  creditid,
  orgname,
  orgcode,
  deletedby,
  deletedRemark
) => {
  try {
    const [row] = await connection.execute(
      `UPDATE credit SET IsDeleted = 1, DeleteRemark = ?, deletedAt = NOW(), deletedby = ?  WHERE orgname = ? AND orgcode = ?  AND id = ?`,
      [deletedRemark, deletedby, orgname, orgcode, creditid]
    );
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const GetCreditById = async (id) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM credit WHERE id = ?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

export const updateCredit = async (
  id,
  postDate,
  bankAccount,
  organizationType,
  organizationName,
  receivedPayementType,
  amountReceived,
  remarks,
  orgname,
  orgcode,
  onAccountType,
  paymentAdvise,
  againstBillDetails,
  againstJobDetails
) => {
  try {
    // Update the credit record
    const [rows] = await connection.execute(
      `UPDATE credit SET postDate = ?,
      bankAccount = ?,
      organizationType = ?,
      organizationName = ?,
      receivedPayementType = ?,
      amountReceived = ?,
      remarks = ?,
      onAccountType = ?,
      paymentAdvise = ?,
      againstBillDetails = ?,
      againstJobDetails = ?  WHERE id = ? AND orgname = ? AND orgcode = ?`,
      [
        postDate,
        bankAccount,
        organizationType,
        organizationName,
        receivedPayementType,
        amountReceived,
        remarks,
        onAccountType,
        paymentAdvise,
        againstBillDetails,
        againstJobDetails,
        id,
        orgname,
        orgcode,
      ]
    );

    // Get the reference number for the updated credit
    const [creditRecord] = await connection.execute(
      `SELECT referenceno, currentdate , branchname FROM credit WHERE id = ?`,
      [id]
    );

    if (creditRecord && creditRecord.length > 0) {
      const refNo = creditRecord[0].referenceno;
      const currentDate = creditRecord[0].currentdate;
      const ownbranchname = creditRecord[0].branchname;

      // Remove existing transaction history records
      await connection.execute(
        `DELETE FROM transactionhistory WHERE referenceNo = ?`,
        [refNo]
      );

      // Recreate transaction history based on updated data
      if (
        receivedPayementType === "on-account" &&
        onAccountType === "against-outstanding"
      ) {
        // For outstanding payments
        await connection.execute(
          `INSERT INTO transactionhistory (currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode, orgbranchname, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            currentDate,
            receivedPayementType + " - " + onAccountType,
            refNo,
            amountReceived,
            0,
            orgname,
            orgcode,
            ownbranchname, // Assuming branch name isn't available in the update context
            paymentAdvise || remarks,
          ]
        );
      } else {
        // Handle bill details
        if (againstBillDetails) {
          const bills = JSON.parse(againstBillDetails);
          for (const bill of bills) {
            if (bill.billNoForAgainstBill && bill.jobNoForAgainstBill) {
              await connection.execute(
                `INSERT INTO transactionhistory (jobnumber, currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode , orgbranchname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  bill.jobNoForAgainstBill,
                  currentDate,
                  "against-bill",
                  refNo,
                  bill.totalReceivableForAgainstBill,
                  0,
                  orgname,
                  orgcode,
                  ownbranchname,
                ]
              );
            }
          }
        }

        // Handle job details
        if (againstJobDetails) {
          const jobs = JSON.parse(againstJobDetails);
          for (const job of jobs) {
            if (job.jobNo && job.amount) {
              await connection.execute(
                `INSERT INTO transactionhistory (jobnumber, currentdate, typeofexpense, referenceNo, cr, dr, orgname, orgcode , orgbranchname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  job.jobNo,
                  currentDate,
                  "against-job",
                  refNo,
                  job.amount,
                  0,
                  orgname,
                  orgcode,
                  ownbranchname,
                ]
              );
            }
          }
        }
      }
    }

    return rows;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow to allow proper error handling upstream
  }
};
