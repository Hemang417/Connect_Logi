import express from "express";
import { uploadKYCFiles } from "../middleware/uploadKYC.middleware.js";
import {
  fetchAllusers,
  storeBranchAccessforUser,
  deletethatbranchaccess,
  fetchExistingBranches,
  fetchuseraccess,
  updateuseraccess,
  fetchNavSections,
  getAccessControls,
  getBinAccessControls,
} from "../api/userlist.js";

import {
  storingRole,
  getUserRoles,
  DeleteUserRole,
  updateRoleofuser,
} from "../api/role.js";

import { getCompletedRows } from "../api/userreport.js";

import { getCompletedRowsExport } from "../api/userreport.js";

import {
  getLegalName,
  storeBranch,
  getOwnBranches,
  fetchBranchskhudka,
  deletekhudkaBranch,
  updatedOwnBranch,
  getAllUsers,
  getUserDetails,
} from "../api/user.js";

import {
  getBranches,
  uploadKYCData,
  updateKYCData,
  getKYCData,
  getKYCImage,
  getUniqueID,
} from "../api/kyc.js";
import { uploadClientFiles } from "../middleware/clientRegistration.middleware.js";

const router = express.Router();

router.get("/getUseraccessforuser", async (req, res) => {
  try {
    const { orgcode, orgname } = req.query;
    const getAllusers = await fetchAllusers(orgcode, orgname);

    // if(getAllusers.status === 200){
    //     res.status(200);
    // }
    res.json(getAllusers);
  } catch (error) {
    console.log("Error during data update:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/insertBranchaccess", async (req, res) => {
  try {
    const { orgcode, orgname, ownbranchname, branchcode } = req.body.branch;
    const { username } = req.body;
    const storedBranchAccess = await storeBranchAccessforUser(
      orgcode,
      orgname,
      ownbranchname,
      branchcode,
      username
    );
    res.send(storedBranchAccess);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteBranchaccess", async (req, res) => {
  try {
    const { branchcode, username } = req.body;
    const deletedBranchAccess = await deletethatbranchaccess(branchcode, username);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchExistingBranches", async (req, res) => {
  try {
    const { username, orgname, orgcode } = req.query;
    const fetchexisting = await fetchExistingBranches(
      username,
      orgname,
      orgcode
    );
    res.send(fetchexisting);
  } catch (error) {
    console.log(error);
  }
});

router.post("/storeuserrole", async (req, res) => {
  try {
    const { orgname, orgcode, userrole } = req.body;
    const storedRole = await storingRole(orgname, orgcode, userrole);
    res.send(storedRole);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getuserroles", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const rolesofuser = await getUserRoles(orgname, orgcode);
    res.send(rolesofuser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteduserrole", async (req, res) => {
  try {
    const { orgname, orgcode, userrole } = req.body;
    const deletedrole = await DeleteUserRole(orgname, orgcode, userrole);
    res.send(deletedrole);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateuserrole", async (req, res) => {
  try {
    const { orgname, orgcode, userrole, id } = req.body;
    const updatedUserRole = updateRoleofuser(orgname, orgcode, userrole, id);
    res.status(200).send(updatedUserRole);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAllRowsofUsername", async (req, res) => {
  try {
    const { username, fullname, branchnames, startDate, endDate } = req.query;
    const alltherows = await getCompletedRows(
      username,
      fullname,
      branchnames,
      startDate,
      endDate
    );
    res.send(alltherows);
  } catch (error) {
    console.log(error);
  }
});
router.get("/getAllRowsofUsernameExport", async (req, res) => {
  try {
    const { username, fullname, branchnames } = req.query;
    const alltherows = await getCompletedRowsExport(
      username,
      fullname,
      branchnames
    );
    res.send(alltherows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getLegalName", getLegalName);

router.post("/createownbranch", uploadClientFiles, storeBranch);

router.get("/fetchBranchesofOwn", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const sendOwnBranches = await getOwnBranches(orgname, orgcode);
    res.send(sendOwnBranches);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchallownbranchname", async (req, res) => {
  try {
    const { orgcode, orgname, username } = req.query;
    const sendAllBranches = await fetchBranchskhudka(
      orgname,
      orgcode,
      username
    );
    res.send(sendAllBranches);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteOwnBranch", async (req, res) => {
  try {
    const { id, orgname, orgcode, deletedat, deletedby, DeleteRemark } =
      req.body; // <-- FIXED HERE

    console.log({ deletedat, deletedby, DeleteRemark, id, orgname, orgcode });

    const deletedOwnBranch = await deletekhudkaBranch(
      id,
      orgname,
      orgcode,
      deletedat,
      deletedby,
      DeleteRemark
    );
    res.send(deletedOwnBranch);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.put("/updateOwnBranch", uploadClientFiles, updatedOwnBranch);

router.get("/branchesofthemp", async (req, res) => {
  try {
    const { username, orgname, orgcode } = req.query;
    if (!username || !orgname || !orgcode) {
      return res.status(400).json({
        error: "Missing required query parameters: username, orgname, orgcode",
      });
    }
    const gotBranches = await getBranches(username, orgname, orgcode);
    return res.json(gotBranches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    return res
      .status(500)
      .json({ error: "Failed to load branches. Please try again later." });
  }
});

router.get("/fetchAllusers", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const gotusers = await getAllUsers(orgname, orgcode);
    res.send(gotusers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getGeneralEmployeeData", async (req, res) => {
  try {
    const { orgname, orgcode, employeename } = req.query;
    const getusersdetails = await getUserDetails(
      orgname,
      orgcode,
      employeename
    );
    res.status(200).json(getusersdetails);
  } catch (error) {
    console.error("Error in /getGeneralEmployeeData route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(
  "/uploadKYCData",
  uploadKYCFiles, // handles both profilephoto and idproof
  uploadKYCData
);

router.post(
  "/updateKYCData",
  uploadKYCFiles, // handles both profilephoto and idproof
  updateKYCData
);

router.get("/getKYCData", getKYCData);

router.get("/getKYCImage", getKYCImage);

router.get("/fetchuseraccess", fetchuseraccess);

router.put("/updateuseraccess", updateuseraccess);

router.get('/fetchNavSections', fetchNavSections);

router.get("/fetchaccesscontrols", async (req, res) => {
  try {
    const { username, orgname, orgcode, branchname, branchcode, type } = req.query;
    const fetchaccesscontrols = await getAccessControls(
      username,
      orgname,
      orgcode,
      branchname,
      branchcode,
      type,
    );
    res.send(fetchaccesscontrols);
  } catch (error) {
    console.log(error);
  }
});

router.post("/getUniqueID", async (req, res) => {
  try {
    const { orgcode, orgname, department } = req.body;
    const getUniqueID2 = await getUniqueID(
      orgcode,
      orgname,
      department
    );
    res.send(getUniqueID2);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchbinaccesscontrols", async (req, res) => {
  try {
    let { username, orgname, orgcode, branchname, branchcode, type } = req.query;

    // Ensure 'type' is always an array
    if (!Array.isArray(type)) {
      type = [type];
    }

    const fetchbinaccesscontrols = await getBinAccessControls(
      username,
      orgname,
      orgcode,
      branchname,
      branchcode,
      type
    );

    res.send(fetchbinaccesscontrols);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching bin access controls");
  }
});


export default router;