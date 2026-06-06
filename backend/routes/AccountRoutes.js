import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  GetbranchesforAccounts,
  StoreBankDetails,
  GetBankDetails,
  deleteBankDetails,
} from "../api/bankdetails.js";
import {
  GetClientNamesofTheOrg,
  fetchJobnumberfromcollectionsdebit,
  StoreDebit,
  GetDebitDetails,
  deleteDebit,
  UpdateDebit,
  GetDebitById,
} from "../api/debit.js";

import {
  StorePayEDetails,
  GetPayEDetails,
  deletePayEDetails,
} from "../api/payebankdetails.js";

import {
  deleteCredit,
  fetchbillfromcollectionss,
  fetchJobnumberfromcollectionss,
  getAllCredit,
  GetCreditById,
  StoreCredit,
  transactionHistory,
  updateCredit,
} from "../api/credit.js";
import {
  getAllCollection,
  getBranchEmployeeForAccess,
  getcreditdays,
  storecollection,
  updatecollection,
  deletecollections,
  individualcollections,
  updateCollectionAssignee,
} from "../api/collection.js";

const router = express.Router();

router.get("/getbranchesforacc", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const fetchedbranches = await GetbranchesforAccounts(orgname, orgcode);
    res.send(fetchedbranches);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addbankdetails", async (req, res) => {
  try {
    const {
      bankname,
      accounttype,
      bankaccountno,
      ifsc,
      branchname,
      orgname,
      orgcode,
      branchcode,
      closingBalance,
      chequedetails,
    } = req.body;
    console.log("closingBalance 2 ", req.body);

    const storeddatabank = await StoreBankDetails(
      bankname,
      accounttype,
      bankaccountno,
      ifsc,
      JSON.stringify(branchname),
      orgname,
      orgcode,
      JSON.stringify(branchcode),
      closingBalance,
      chequedetails
    );
    res.status(200).send(storeddatabank);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getbankdetails", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const gotbankdata = await GetBankDetails(orgname, orgcode);
    res.send(gotbankdata);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deletebankdetails", async (req, res) => {
  try {
    const { orgname, orgcode } = req.body;
    const { accountnum, ifscCode } = req.body;
    const deletedbankdata = await deleteBankDetails(
      orgname,
      orgcode,
      accountnum,
      ifscCode
    );
    res.status(200).send(deletedbankdata);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete bank details");
  }
});

router.post("/addpayedetails", async (req, res) => {
  try {
    const { payename, orgname, orgcode } = req.body;
    const { bankname, accounttype, bankaccountno, ifsc } = req.body.payedetails;
    const storeddatapaye = await StorePayEDetails(
      payename,
      bankname,
      accounttype,
      bankaccountno,
      ifsc,
      orgname,
      orgcode
    );
    res.status(200).send(storeddatapaye);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getpayedetails", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const gotpayedata = await GetPayEDetails(orgname, orgcode);
    res.send(gotpayedata);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deletepayedetails", async (req, res) => {
  try {
    const { orgname, orgcode } = req.body;
    const { accountnum, ifscCode } = req.body;
    const deletedpayedata = await deletePayEDetails(
      orgname,
      orgcode,
      accountnum,
      ifscCode
    );
    res.status(200).send(deletedpayedata);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete bank details");
  }
});

router.get("/getclientnameoforg", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const clientnamesgotten = await GetClientNamesofTheOrg(orgname, orgcode);
    res.send(clientnamesgotten);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addDebit", async (req, res) => {
  try {
    // console.log(req.body);
    const { orgname, orgcode, branchname, branchcode } = req.body;
    const {
      date,
      bankname,
      typeOfExpense,
      taxableAmount,
      gstAmount,
      totalInvoiceAmount,
      paymentdetail,
      tdsAmount,
      netPaymentAmount,
      utrDetails,
      typeofjob,
      jobNo,
      customerName,
      remarks,
      createdby,
    } = req.body.formData;
    // console.log(req.body);
    const storedDebit = await StoreDebit(
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
    );
    res.send(storedDebit);
  } catch (error) {
    console.log(error);
  }
});

///
router.get("/getdebitdetails", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const gotdebitdata = await GetDebitDetails(orgname, orgcode);
    res.send(gotdebitdata);
  } catch (error) {
    console.log(error);
  }
});

router.put("/deleteDebit", async (req, res) => {
  try {
    const { orgname, orgcode, deletedby, deletedRemark } = req.body;
    const { debitid } = req.body;
    // console.log(orgname, orgcode, debitid)
    const deleteddebitdata = await deleteDebit(
      orgname,
      orgcode,
      debitid,
      deletedby,
      deletedRemark
    );
    res.status(200).send(deleteddebitdata);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to delete bank details");
  }
});

router.put("/updateDebit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const {
      orgname,
      orgcode,
      paymentdetail,
      date,
      bankname,
      typeOfExpense,
      taxableAmount,
      gstAmount,
      totalInvoiceAmount,
      tdsAmount,
      netPaymentAmount,
      utrDetails,
      typeofjob,
      jobNo,
      customerName,
      remarks,
    } = req.body;
    console.log("data in router -> ", req.body);
    const updatedJob = await UpdateDebit(
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
    );
    res.send(updatedJob);
  } catch (error) {
    console.log(error);
  }
});

router.get("/PrefilldebitDetails", async (req, res) => {
  try {
    const { id, orgname, orgcode } = req.query;
    const gotdebitdata = await GetDebitById(id, orgname, orgcode);
    res.send(gotdebitdata);
  } catch (error) {
    console.log(error);
  }
});

router.post("/storecredit", async (req, res) => {
  try {
    const {
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
    } = req.body;
    console.log("data in router -> ", req.body);
    const storecreditss = await StoreCredit(
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
      createdby
    );
    res.status(200).send(storecreditss);
  } catch (error) {
    console.log(error);
  }
});
router.put("/updatecredit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
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
      againstJobDetails,
    } = req.body;

    //
    const updatecredit = updateCredit(
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
    );
    res.status(200).send(updatecredit);
  } catch (error) {
    console.log(error);
  }
});
router.put("/deleteCredit", async (req, res) => {
  try {
    const { creditid, orgname, orgcode, deletedby, deletedRemark } = req.body;
    // console.log(creditid, orgname , orgcode)
    const deletedCredit = await deleteCredit(
      creditid,
      orgname,
      orgcode,
      deletedby,
      deletedRemark
    );
    res.status(200).send(deletedCredit);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallcreditdetails", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;

    const getallcreditdetailsss = await getAllCredit(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.status(200).send(getallcreditdetailsss);
  } catch (error) {
    console.log(error);
  }
});

router.get("/PrefillcreditDetails", async (req, res) => {
  try {
    const { id } = req.query;
    // console.log(id)
    const gotcreditdata = await GetCreditById(id);
    res.send(gotcreditdata);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updatecollectionassignee", async (req, res) => {
  try {
    // console.log(req.body)
    const { id, AssignTo } = req.body;
    const updatecollectionassignee = await updateCollectionAssignee(
      id,
      AssignTo
    );

    res.status(200).send(updatecollectionassignee);
  } catch (error) {
    console.log(error);
  }
});

//fetch bill from collection for against bill

router.get("/fetchbillfromcollection", async (req, res) => {
  try {
    const { orgname, orgcode, clientname, branchnameofemp, branchcodeofemp } =
      req.query;
     const fetchbillfromcollection = await fetchbillfromcollectionss(
      orgname,
      orgcode,
      clientname,
      branchnameofemp,
      branchcodeofemp
    );
    res.status(200).send(fetchbillfromcollection);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchjobnofromcollection", async (req, res) => {
  try {
    const { orgname, orgcode, branchnameofemp, typeOfJob, clientname } =
      req.query;
    // console.log(orgname , orgcode , branchnameofemp , typeOfJob)
    const fetchjobnofromcollection = await fetchJobnumberfromcollectionss(
      orgname,
      orgcode,
      branchnameofemp,
      typeOfJob,
      clientname
    );
    res.status(200).send(fetchjobnofromcollection);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchjobnofromcollectiondebit", async (req, res) => {
  try {
    const { orgname, orgcode, branchnameofemp, typeOfJob } = req.query;
    // console.log(orgname , orgcode , branchnameofemp , typeOfJob)
    const fetchjobnofromcollectiondebit =
      await fetchJobnumberfromcollectionsdebit(
        orgname,
        orgcode,
        branchnameofemp,
        typeOfJob
      );
    res.status(200).send(fetchjobnofromcollectiondebit);
  } catch (error) {
    console.log(error);
  }
});

// All Transaction Details
router.get("/transactionhistory", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber } = req.query;
    // console.log(orgname , orgcode , jobnumber)
    const transactionhistory = await transactionHistory(
      orgname,
      orgcode,
      jobnumber
    );
    res.status(200).send(transactionhistory);
  } catch (error) {}
});

//individual Transaction Details
router.get("/getCollectionByBillNo", async (req, res) => {
  try {
    const { billNo } = req.query;
    const individualcollection = await individualcollections(billNo);
    res.status(200).send(individualcollection);
  } catch (error) {}
});

//store new collection
router.post("/storecollection", async (req, res) => {
  try {
    const {
      jobnumber,
      orgname,
      orgcode,
      branchnameoforg,
      username,
      date,
      billNo,
      amount,
      Tax,
      grandTotal,
      FollowUp1,
      FollowUp2,
      FollowUp3,
      TimeDelay,
      AssignTo,
      checkbox,
      clientname,
      branchcodeofemp,
      branchnameofemp,
    } = req.body;

    const storecollections = await storecollection(
      jobnumber,
      orgname,
      orgcode,
      branchnameoforg,
      username,
      date,
      amount,
      Tax,
      grandTotal,
      FollowUp1,
      FollowUp2,
      FollowUp3,
      TimeDelay,
      AssignTo,
      checkbox,
      clientname,
      branchcodeofemp,
      branchnameofemp
    );
    res.status(200).send(storecollections);
  } catch (error) {
    console.log(error);
  }
});

//update collection
router.put("/updatecollection", async (req, res) => {
  try {
    const {
      jobnumber,
      orgname,
      orgcode,
      branchnameoforg,
      date,
      billNo,
      amount,
      Tax,
      grandTotal,
      TimeDelay,
      AssignTo,
      checkbox,
      clientname,
      branchcodeofemp,
      branchnameofemp,
    } = req.body;

    // console.log(req.body);
    const updatecollections = await updatecollection(
      jobnumber,
      orgname,
      orgcode,
      branchnameoforg,
      date,
      billNo,
      amount,
      Tax,
      grandTotal,
      TimeDelay,
      AssignTo,
      checkbox,
      clientname,
      branchcodeofemp,
      branchnameofemp
    );
    res.status(200).send(updatecollections);
  } catch (error) {
    console.log(error);
  }
});

//delete collection
router.put("/deletecollection", async (req, res) => {
  try {
    const { billNo, id, username, remark } = req.body;
    const deletecollection = await deletecollections(
      billNo,
      id,
      username,
      remark
    );
    res.status(200).send(deletecollection);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting collection");
  }
});

router.get("/getcreditdayforcollection", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, clientname } = req.query;
    console.log("creditdays", req.query);

    const getcreditday = await getcreditdays(
      orgname,
      orgcode,
      branchname,
      clientname
    );
    res.status(200).send(getcreditday);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallEmployeesForAccess", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;

    const getALLEmp = await getBranchEmployeeForAccess(orgname, orgcode);
    res.status(200).send(getALLEmp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallcollection", async (req, res) => {
  try {
    const { jobnumber, orgname, orgcode } = req.query;

    const getallcollectionss = await getAllCollection(
      jobnumber,
      orgname,
      orgcode
    );
    res.status(200).send(getallcollectionss);
  } catch (error) {
    console.log(error);
  }
});
export default router;
