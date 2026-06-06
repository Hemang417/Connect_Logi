import express from "express";

import {
  fetchPermanentDeleteValue,
  getAllJobsAndOrg,
  restoreJobAndOrg,
  restoreDocument,
  restoreCollection,
  restoreMilestone,
  restoreLob,
  restoreWorkflow,
  restoreBranch,
  restoreBranchOrg,
  restoreLobMilestone,
  scheduleCronJobs,
  updatePermanentDeleteValue,
  emptyBin,
  deleteBinRow,
  restoreApprover,
  restoreCredit,
  restoreUsers,
  restoreDebit,
  restoreDelegation,
} from "../api/deletePermanent.js";

const router = express.Router();

router.put("/restoreJobAndOrg", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber } = req.body;
    const restoredjob = await restoreJobAndOrg(orgname, orgcode, jobnumber);
    res.send(restoredjob);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreDocument", async (req, res) => {
  try {
    const { orgname, orgcode, filename } = req.body;
    const restoredfile = await restoreDocument(orgname, orgcode, filename);
    res.send(restoredfile);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreCollection", async (req, res) => {
  try {
    const { orgname, orgcode, billno } = req.body;
    const restoredcollection = await restoreCollection(
      orgname,
      orgcode,
      billno
    );
    res.send(restoredcollection);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreApprover", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoredapprover = await restoreApprover(orgname, orgcode, id);
    res.send(restoredapprover);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreUsers", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreusers = await restoreUsers(orgname, orgcode, id);
    res.send(restoreusers);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreCredit", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoredapprover = await restoreCredit(orgname, orgcode, id);
    res.send(restoredapprover);
  } catch (error) {
    console.log(error);
  }
});
router.put("/restoreDebit", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoredapprover = await restoreDebit(orgname, orgcode, id);
    res.send(restoredapprover);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreMilestone", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreMilestone2 = await restoreMilestone(orgname, orgcode, id);
    res.send(restoreMilestone2);
  } catch (error) {
    console.log(error);
  }
});
router.put("/restoreDelegation", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreDelegation2 = await restoreDelegation(orgname, orgcode, id);
    res.send(restoreDelegation2);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreLob", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreLob2 = await restoreLob(orgname, orgcode, id);
    res.send(restoreLob2);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreWorkflow", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreWorkflow2 = await restoreWorkflow(orgname, orgcode, id);
    res.send(restoreWorkflow2);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreBranch", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreBranch2 = await restoreBranch(orgname, orgcode, id);
    res.send(restoreBranch2);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreBranchOrg", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreBranchOrg2 = await restoreBranchOrg(orgname, orgcode, id);
    res.send(restoreBranchOrg2);
  } catch (error) {
    console.log(error);
  }
});

router.put("/restoreLobMilestone", async (req, res) => {
  try {
    const { orgname, orgcode, id } = req.body;
    const restoreLobMilestone2 = await restoreLobMilestone(
      orgname,
      orgcode,
      id
    );
    res.send(restoreLobMilestone2);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchpermanentDeletevalue", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;

    const permanentDeleteValue = await fetchPermanentDeleteValue(
      orgname,
      orgcode
    );
    res.status(200).send(permanentDeleteValue);
    scheduleCronJobs(
      permanentDeleteValue.deleteIntervalForJobsAndOrg,
      orgname,
      orgcode
    );
  } catch (error) {
    console.log(error);
  }
});

router.put("/updatepermanentDeletevalue", async (req, res) => {
  try {
    const { orgname, orgcode, deleteIntervalForJobsAndOrg } = req.body;
    // console.log(orgname , orgcode , parseInt(deleteIntervalForJobsAndOrg))

    const permanentDeleteValue = await updatePermanentDeleteValue(
      orgname,
      orgcode,
      parseInt(deleteIntervalForJobsAndOrg)
    );
    res.status(200).send(permanentDeleteValue);
  } catch (error) {
    console.log(error);
  }
});

//Fetch all Deleted jobs and Organisation for bin tab
router.get("/getalljobsandorg", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const gotalljobs = await getAllJobsAndOrg(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.status(200).send(gotalljobs);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/emptyBin", async (req, res) => {
  try {
    const { orgname, orgcode } = req.body;

    if (!orgname || !orgcode) {
      return res.status(400).json({ error: "Missing orgname or orgcode" });
    }

    console.log("orgname:", orgname, "orgcode:", orgcode);

    const deleteBin = await emptyBin(orgname, orgcode);

    res
      .status(200)
      .json({ message: "Bin emptied successfully", data: deleteBin });
  } catch (error) {
    console.error("Error emptying bin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/DeleteBinRow", async (req, res) => {
  try {
    const { orgname, orgcode, jobNumber, id , type } = req.body;

    console.log(
      "orgname:",
      orgname,
      "orgcode:",
      orgcode,
      "jobNumber:",
      jobNumber,
      "id:",
      id,
      "type:",
      type
    );

    // Validate required parameters
    if (!orgname || !orgcode || !jobNumber|| !type) {
      return res.status(400).json({
        error: "Missing required parameters",
        details: "orgname, orgcode, jobNumber, id , and type are required",
      });
    }

    const result = await deleteBinRow(orgname, orgcode, jobNumber, id , type);
    res.status(200).json({
      message: `${type} entry deleted permanently`,
      data: result,
    });
  } catch (error) {
    console.error("Error deleting bin entry:", error);
    res.status(500).json({
      error: "Failed to delete entry",
      details: error.message,
    });
  }
});

export default router;
