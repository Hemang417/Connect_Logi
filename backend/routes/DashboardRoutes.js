import express from "express";
import {
  switchBranchsogetBranch,
  fetchBranchStats,
  fetchImpStats,
  fetchExpStats,
  fetchDashboardAccess,
} from "../api/dashboard.js";

const router = express.Router();

router.get("/getAllBranches", async (req, res) => {
  try {
    const { orgname, orgcode, username } = req.query;
    const response = await switchBranchsogetBranch(orgname, orgcode, username);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallstats", async (req, res) => {
  try {
    const { orgname, orgcode, branchnameofemp, branchcodeofemp } = req.query;
    const response = await fetchBranchStats(
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp
    );
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getimpstats", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      startDate,
      endDate,
    } = req.query;
    const response = await fetchImpStats(
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      startDate,
      endDate
    );
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getexpstats", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      startDate,
      endDate,
    } = req.query;
    const response = await fetchExpStats(
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      startDate,
      endDate
    );
    res.json(response);
  } catch (error) {
    console.error("Error in /getexpstats:", error);
    res.status(500).send(error.message);
  }
});

router.get("/fetchdashboardaccess", async (req, res) => {
  try {
    const { username, orgname, orgcode, branchname, branchcode } = req.query;
    const response = await fetchDashboardAccess(
      username,
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
