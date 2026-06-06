import express from "express";
import {
  setDelegation,
  getDelegation,
  updateDelegation,
  completeTask,
  deleteDelegation,
  delayedTask,
} from "../api/delegation.js";

const router = express.Router();

router.post("/setDelegation", async (req, res) => {
  try {

    const {
      orgcode,
      orgname,
      taskname,
      durationtype,
      description,
      assignedTo,
      branchcode,
      branchname,
      assignedBy,
      duration,
    } = req.body;
    console.log("back", req.body);
    const dele = await setDelegation(
      orgcode,
      orgname,
      taskname,
      durationtype,
      description,
      assignedTo,
      branchcode,
      branchname,
      assignedBy,
      duration
    );
    res.send(dele);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getDelegation", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;

    const getDelegationss = await getDelegation(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.status(200).send(getDelegationss);
  } catch (error) {
    console.log(error);
  }
});
router.put("/updateDelegation", async (req, res) => {
  try {
    const { taskname, dueDate, description, assignedTo, assignedBy, duration, id } =
      req.body;

    const updateDelegationss = await updateDelegation(
      taskname,
      dueDate,
      description,
      assignedTo,
      assignedBy,
      duration, id
    );
    res.status(200).send(updateDelegationss);
    console.log("back", req.body);
  } catch (error) {
    console.log(error);
  }
});
router.put("/completeTask", async (req, res) => {
  try {
    const { taskId, taskName, remark, timestamp, addedBy } =
      req.body;

    const completeTaskss = await completeTask(
      taskId, taskName, remark, timestamp, addedBy
    );
    res.status(200).send(completeTaskss);
    console.log("back", req.body);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteDelegation", async (req, res) => {
  try {
    const { id, orgname, orgcode, remark, deletedby } =
      req.body;

    const deleteDelegationss = await deleteDelegation(
      id, orgname, orgcode, remark, deletedby
    );
    res.status(200).send(deleteDelegationss);
    console.log("back", req.body);
  } catch (error) {
    console.log(error);
  }
});
router.put("/delayedTask", async (req, res) => {
  try {
    const { orgcode,
      orgname, taskId, taskStatus } =
      req.body;

    const delayedTaskss = await delayedTask(
      orgcode,
      orgname, taskId, taskStatus);
    res.status(200).send(delayedTaskss);
    console.log("back", req.body);
  } catch (error) {
    console.log(error);
  }
});

export default router;
