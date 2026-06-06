import express from "express";
import {
    ApprovalExportJobMainLogic,
    approveExpJob,
    getAllJobsOfExp,
    getApproverOfExportJobs,
    getExportJob,
    
  } from "../api/exportJobApproval.js";



const router = express.Router();

router.get("/getapproverofexpJobs", async (req, res) => {
  try {
    const { orgname, orgcode, uniquevalue, branchcode } = req.query;
    const approverdata = await getApproverOfExportJobs(
      orgname,
      orgcode,
      uniquevalue,
      branchcode
    );
    res.send(approverdata);
  } catch (error) {
    console.log(error);
  }
})

router.get("/fetchlatestExportjob", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const latestjob = await getExportJob(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(latestjob);
  } catch (error) {
    console.log(error);
  }
});

router.put("/approveExpJob", async (req, res) => {
  try {
    const { jobId } = req.body;
    const {
      GST,
      IEC,
      address,
      benumber,
      betype,
      bltype,
      bltypenum,
      branchcode,
      branchname,
      cfsname,
      consignmenttype,
      customhouse,
      deliverymode,
      finaldestination,
      exportername,
      jobdate,
      jobnumber,
      jobowner,
      noofcontainer,
      orgname,
      orgcode,
      ownbooking,
      owntransportation,
      portofshipment,
      shippinglinename,
      transportmode,
    } = req.body.updatedFields;
    const { username, status } = req.body.approval;
    console.log("1",req.body);
    console.log("2",req.body.updatedFields);
    console.log("3",req.body.approval);

    const updatedRowinjobapproval = await approveExpJob(
      jobId,
      GST,
      IEC,
      address,
      benumber,
      betype,
      bltype,
      bltypenum,
      branchcode,
      branchname,
      cfsname,
      consignmenttype,
      customhouse,
      deliverymode,
      finaldestination,
      exportername,
      jobdate,
      jobnumber,
      jobowner,
      noofcontainer,
      orgname,
      orgcode,
      ownbooking,
      owntransportation,
      portofshipment,
      shippinglinename,
      transportmode,
      username,
      status
    );
    res.send(updatedRowinjobapproval);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getapprovedexpJob", async (req, res) => {
  try {
    const { orgname, orgcode, uniquevalue } = req.query;
    const approvedJobshaiye = await ApprovalExportJobMainLogic(
      orgname,
      orgcode,
      uniquevalue
    );
    res.send(approvedJobshaiye);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllExpJobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname } = req.query;
    const allimpjobsisthis = await getAllJobsOfExp(
      orgname,
      orgcode,
      branchname
    );
    res.send(allimpjobsisthis);
  } catch (error) {
    console.log(error);
  }
});

export default router;