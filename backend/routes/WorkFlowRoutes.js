import express from "express";

import {
  storethelob,
  getAlltheLOB,
  deleteLOB,
  updateLOB,
  fetchorgTAT,
} from "../api/lineofbusiness.js";
import {
  storeMilestone,
  getAllMilestones,
  deleteMilestone,
  updateMilestone,
} from "../api/milestone.js";
import {
  storeWorkflow,
  readAllWorkflow,
  createOverviewofWorkflow,
  deletedWorkflowRow,
  getSetAllWorkflow,
  deletesetworkflow,
  updatesetworkflow,
  gettheemployeesofBranch,
} from "../api/workflow.js";
import {
  getallthelobdataofbranchandlob,
  getallthelobdataofbranchandlobValid,
  getallthelobdataofbranchandlobValidForExport,
} from "../api/newimport.js";
import {
  storeArrangement,
  storeRefArrangement,
  getBranchcodeandname,
  deleteArrangement,
  deleteRefArrangement,
  getArrangementofthatbranch,
  getRefNoofthatbranch,
  updateColumn,
  updateRefColumn,
} from "../api/arrangement.js";
const router = express.Router();

router.post("/storelob", async (req, res) => {
  try {
    const { lobname, transportmode, orgname, orgcode, currentDate, username } =
      req.body;
    const lobstorehua = await storethelob(
      lobname,
      transportmode,
      orgname,
      orgcode,
      currentDate,
      username
    );
    res.status(200).send(lobstorehua);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getlob", async (req, res) => {
  try {
    const { orgcode, orgname } = req.query;
    const allDataofLOB = await getAlltheLOB(orgcode, orgname);
    res.send(allDataofLOB);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletelob", async (req, res) => {
  try {
    const { id, deletedby, deletedat, DeleteRemark } = req.body;
    const deletedLOB = await deleteLOB(id, deletedby, deletedat, DeleteRemark);
    res.status(200).send(deletedLOB);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updatelob", async (req, res) => {
  try {
    const { id, lobname ,transportmode} = req.body;
    const updatedLOB = await updateLOB(id, lobname,transportmode);
    res.status(200).send(updatedLOB);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getorgforTAT", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const data = await fetchorgTAT(orgname, orgcode);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addmilestone", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      milestonename,
      lob,
      ownbranchname,
      currentDate,
      username,
    } = req.body;
    const addedMilestone = await storeMilestone(
      orgname,
      orgcode,
      milestonename,
      lob,
      ownbranchname,
      currentDate,
      username
    );
    res.send(addedMilestone);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getmilestones", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const allmilestones = await getAllMilestones(orgname, orgcode);
    res.send(allmilestones);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletemilestone", async (req, res) => {
  try {
    const { id, deletedby, deletedat, DeleteRemark } = req.body;

    const deletedMilestone = await deleteMilestone(
      id,
      deletedby,
      deletedat,
      DeleteRemark
    );
    res.status(200).send(deletedMilestone);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updatemilestone", async (req, res) => {
  try {
    const { orgname, orgcode, milestonename, lob, ownbranchname, id } =
      req.body;
    const updatedData = await updateMilestone(
      orgname,
      orgcode,
      milestonename,
      lob,
      ownbranchname,
      id
    );
    res.status(200).send(updatedData);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createworkflow", async (req, res) => {
  try {
    const { orgname, orgcode, branchName, lob, importername, username } =
      req.body;
    const {
      workflowname,
      duration,
      days,
      hours,
      minutes,
      milestone,
      plandatechange,
      selectedEmployee,
      reminderdays,
      reminderhours,
      reminderminutes,
      owntransport,
      ownbooking,
      consignmenttype,
      betype,
    } = req.body.workflowData;
    const storedWorkflow = await storeWorkflow(
      orgname,
      orgcode,
      branchName,
      lob,
      importername,
      username,
      owntransport,
      ownbooking,
      consignmenttype,
      betype,
      workflowname,
      duration,
      days,
      hours,
      minutes,
      milestone,
      plandatechange,
      JSON.stringify(selectedEmployee),
      reminderdays,
      reminderhours,
      reminderminutes
    );
    res.status(200).send(storedWorkflow);
  } catch (error) {
    console.log(error);
  }
});

router.get("/readallworkflows", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const allWorkflow = await readAllWorkflow(orgname, orgcode);
    res.send(allWorkflow);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createOverviewofWorkflow", async (req, res) => {
  try {
    const { orgname, orgcode, client, lob, branch, currentDate, username } =
      req.body;
    const createdoverview = await createOverviewofWorkflow(
      orgname,
      orgcode,
      client,
      lob,
      branch,
      currentDate,
      username
    );
    res.status(200).send(createdoverview);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteWorkflow", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      id,
      importername,
      ownbranchname,
      lobname,
      deletedby,
      deletedat,
      DeleteRemark,
    } = req.body;
    const deletedRow = await deletedWorkflowRow(
      orgname,
      orgcode,
      id,
      importername,
      ownbranchname,
      lobname,
      deletedby,
      deletedat,
      DeleteRemark
    );
    res.status(200).send(deletedRow);
  } catch (error) {
    console.log(error);
  }
});

router.get("/readsetworkflow", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, importername, lobname } = req.query;
    const gotallthesetworkflow = await getSetAllWorkflow(
      orgname,
      orgcode,
      branchname,
      importername,
      lobname
    );
    res.send(gotallthesetworkflow);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletesetworkflow", async (req, res) => {
  try {
    const {
      id,
      orgname,
      orgcode,
      importername,
      ownbranchname,
      lobname,
      deletedby,
      deletedat,
      DeleteRemark,
    } = req.body;
    const deletedSetWorkflow = await deletesetworkflow(
      id,
      orgname,
      orgcode,
      importername,
      ownbranchname,
      lobname,
      deletedby,
      deletedat,
      DeleteRemark
    );
    res.status(200).send(deletedSetWorkflow);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updatesetworkflow", async (req, res) => {
  try {
    const {
      id,
      workflowname,
      days,
      hours,
      minutes,
      milestone,
      plandatechange,
      selectedEmployee,
      reminderdays,
      reminderhours,
      reminderminutes,
      owntransport,
      ownbooking,
      consignmenttype,
      betype,
    } = req.body;
    const updatedWorkflowHaiYe = await updatesetworkflow(
      id,
      workflowname,
      days,
      hours,
      minutes,
      milestone,
      plandatechange,
      selectedEmployee,
      reminderdays,
      reminderhours,
      reminderminutes,
      owntransport,
      ownbooking,
      consignmenttype,
      betype
    );
    res.status(200).send(updatedWorkflowHaiYe);
  } catch (error) {
    console.log(error);
  }
});

router.get("/readlobdataspecific", async (req, res) => {
  try {
    const { orgname, orgcode, lobname, ownbranchname } = req.query;
    // const currentTime = new Date();
    // const timeLimit = new Date(currentTime.getTime() - 1 * 60  * 1000);
    // console.log('Current Time:', currentTime);
    // console.log('Time Limit:', timeLimit);
    const allThatLOBdata = await getallthelobdataofbranchandlob(
      orgname,
      orgcode,
      lobname,
      ownbranchname
    );

    // const newWorkflows = allThatLOBdata.filter(row => new Date(row.created_at) >= timeLimit);
    // const oldWorkflows = allThatLOBdata.filter(row => new Date(row.created_at) < timeLimit);

    // console.log( "new", newWorkflows,"old" ,oldWorkflows);

    // const combined = [...newWorkflows, ...oldWorkflows];

    res.send(allThatLOBdata);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getValidWorkflowsForJob", async (req, res) => {
  console.log("IMP valid API called");
  try {
    const {
      orgname,
      orgcode,
      lobname,
      ownbranchname,
      jobnumber,
      importername,
      ownbooking,
      owntransportation,
      betype,
      consignmenttype,
    } = req.query;

    console.log("getValidWorkflowsForJob", req.query);
    const allThatLOBdata = await getallthelobdataofbranchandlobValid(
      orgname,
      orgcode,
      lobname,
      ownbranchname,
      jobnumber,
      importername,
      ownbooking,
      owntransportation,
      betype,
      consignmenttype
    );
    res.status(200).json(allThatLOBdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getValidWorkflowsForExpJob", async (req, res) => {
  console.log("EXP valid API called");
  try {
    const {
      orgname,
      orgcode,
      lobname,
      ownbranchname,
      jobnumber,
      importername,
      ownbooking,
      owntransportation,
      betype,
      consignmenttype,
    } = req.query;
    console.log("getValidWorkflowsForExpJob", req.query);
    const allThatLOBdata = await getallthelobdataofbranchandlobValidForExport(
      orgname,
      orgcode,
      lobname,
      ownbranchname,
      jobnumber,
      importername,
      ownbooking,
      owntransportation,
      betype,
      consignmenttype
    );

    res.send(allThatLOBdata);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAlltheemployeeswiththatbranchaccess", async (req, res) => {
  try {
    const { orgname, orgcode, branchname } = req.query;
    const allusersofthatorg = await gettheemployeesofBranch(
      orgname,
      orgcode,
      branchname
    );
    res.send(allusersofthatorg);
  } catch (error) {
    console.log(error);
  }
});

router.post("/storeArrangement", async (req, res) => {
  try {
    const { orgname, orgcode, data, branchname, branchcode } = req.body;
    const storeArrangemented = await storeArrangement(
      orgname,
      orgcode,
      data,
      branchname,
      branchcode
    );
    res.status(200).send(storeArrangemented);
  } catch (error) {
    console.log(error);
  }
});

router.post("/storeRefArrangement", async (req, res) => {
  try {
    const { orgname, orgcode, data, branchname, branchcode } = req.body;
    const storeArrangemented = await storeRefArrangement(
      orgname,
      orgcode,
      data,
      branchname,
      branchcode
    );
    res.status(200).send(storeArrangemented);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getbranchesforarrangement", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const finallygot = await getBranchcodeandname(orgname, orgcode);
    res.send(finallygot);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteArrangement", async (req, res) => {
  try {
    const { orgname, orgcode, data, branchname, branchcode } = req.body;
    const deletedhaiye = await deleteArrangement(
      orgname,
      orgcode,
      data,
      branchname,
      branchcode
    );
    res.status(200).send(deletedhaiye);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteRefArrangement", async (req, res) => {
  try {
    const { orgname, orgcode, data, branchname, branchcode } = req.body;
    const deletedhaiye = await deleteRefArrangement(
      orgname,
      orgcode,
      data,
      branchname,
      branchcode
    );
    res.status(200).send(deletedhaiye);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getArrangementofthatbranch", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const gotit = await getArrangementofthatbranch(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(gotit);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getRefNoofthatbranch", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const gotit = await getRefNoofthatbranch(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(gotit);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateColumn", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, custominput } = req.body;
    const updated = await updateColumn(
      orgname,
      orgcode,
      branchname,
      branchcode,
      custominput
    );
    res.status(200).send(updated);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateRefColumn", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, custominput } = req.body;
    const updated = await updateRefColumn(
      orgname,
      orgcode,
      branchname,
      branchcode,
      custominput
    );
    res.status(200).send(updated);
  } catch (error) {
    console.log(error);
  }
});

export default router;