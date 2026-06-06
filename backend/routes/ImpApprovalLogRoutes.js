import express from "express";
import {
    getapproverofJobs,
    getJob,
    approveImpJob,
    ApprovalJobMainLogic,
    getAllJobsofImp,
  } from "../api/jobapproval.js";


const router = express.Router();

router.get("/getapproverofJobs", async (req, res) => {
  try {
    const { orgname, orgcode, uniquevalue, branchcode } = req.query;
    const approverdata = await getapproverofJobs(
      orgname,
      orgcode,
      uniquevalue,
      branchcode
    );
    res.send(approverdata);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchlatestjob", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const latestjob = await getJob(orgname, orgcode, branchname, branchcode);
    res.send(latestjob);
  } catch (error) {
    console.log(error);
  }
});

router.put("/approveImpJob", async (req, res) => {
  try {
    const { jobId } = req.body;
    // console.log("jobId", jobId);
    const {
      GST,
      IEC,
      address,
      benumber,
      betype,
      blstatus,
      bltype,
      bltypenum,
      branchcode,
      branchname,
      cfsname,
      consignmenttype,
      customhouse,
      deliverymode,
      finaldestination,
      freedays,
      importername,
      jobdate,
      jobnumber,
      jobowner,
      noofcontainer,
      orgname,
      orgcode,
      ownbooking,
      owntransportation,
      portofshipment,
      shippinglinebond,
      shippinglinename,
      transportmode,
    } = req.body.updatedFields;
    // console.log("updatedFields", req.body.updatedFields);
    const { username, status } = req.body.approval;
    // console.log("approval", req.body.approval);

    const updatedRowinjobapproval = await approveImpJob(
      jobId,
      GST,
      IEC,
      address,
      benumber,
      betype,
      blstatus,
      bltype,
      bltypenum,
      branchcode,
      branchname,
      cfsname,
      consignmenttype,
      customhouse,
      deliverymode,
      finaldestination,
      freedays,
      importername,
      jobdate,
      jobnumber,
      jobowner,
      noofcontainer,
      orgname,
      orgcode,
      ownbooking,
      owntransportation,
      portofshipment,
      shippinglinebond,
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

router.get("/getapprovedJob", async (req, res) => {
  try {
    const { orgname, orgcode, uniquevalue } = req.query;
    const approvedJobshaiye = await ApprovalJobMainLogic(
      orgname,
      orgcode,
      uniquevalue
    );
    res.send(approvedJobshaiye);
  } catch (error) {
    console.log(error);
  }
});


router.get("/getAllJobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname } = req.query;
    const allimpjobsisthis = await getAllJobsofImp(
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