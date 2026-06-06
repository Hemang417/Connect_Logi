import express from "express";

import {
  storeApproverName,
  getApproverlist,
  deletedApproverlist,
  UpdatedApproverList,
  Addnametoapproverlist,
  getnamesoftheapproverlist,
  deletenamefromapproverlist,
  updateApproverName,
  getApproverName,
  getApprovedButtons,
  fetchLatestOrganizationfromtable,
  fetchApprovernameunique,
  updatedData,
  getApprovedRows,
  deletedRowlist,
  fetchOrganizationforrender,
  SelectedCount,
  GetSelectedCount,
  getApproverlistall,
  getnamesoftheapproverlistForUserList,
  checkallapproverlist,
  deletenamefromapproverlistForApproval,

} from "../api/approver.js";
const router = express.Router();

router.post("/storeApproverlist", async (req, res) => {
  try {
    const {
      approverName,
      orgname,
      orgcode,
      uniquevalue,
      branchname,
      branchcode,
      username,
    } = req.body;
    // const { branchname, branchcode } = req.body.selectedBranch
    const storedname = await storeApproverName(
      orgname,
      orgcode,
      approverName,
      branchname,
      branchcode,
      uniquevalue,
      username,
    );
    res.status(200).send(storedname);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fetchApproverlist", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const allapproverlist = await getApproverlist(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(allapproverlist);
  } catch (error) {
    console.log(error);
  }
});
router.get("/fetchApproverlistAll", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const allapproverlist = await getApproverlistall(orgname, orgcode);
    res.send(allapproverlist);
  } catch (error) {
    console.log(error);
  }
});

router.get("/checkApproverlist", async (req, res) => {
  try {
    const { orgname, orgcode, branchcode, approverlistname, uniquevalue } =
      req.query;
    const checkallapproverlistall = await checkallapproverlist(
      orgname,
      orgcode,
      branchcode,
      approverlistname,
      uniquevalue
    );
    res.send(checkallapproverlistall);
  } catch (error) {
    console.log(error);
  }
});

// app.delete('/deleteApproverlist', async (req, res) => {
//     try {
//         const { orgname, orgcode, approverlistname, branchname, branchcode } = req.body;
//         const deletedRow = await deletedApproverlist(orgname, orgcode, approverlistname, branchname, branchcode);
//         res.send(deletedRow);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.put("/updateApproverlist", async (req, res) => {
  try {
    const { orgname, orgcode, approverName, uniquevalue, id } = req.body;
    const { branchname, branchcode } = req.body.selectedBranch;
    console.log("update approver backend", orgname, orgcode, approverName, branchname, branchcode, id);
    await UpdatedApproverList(
      orgname,
      orgcode,
      approverName,
      branchname,
      branchcode,
      uniquevalue,
      id
    );
    res.status(200).send("Approver name updated successfully");
  } catch (error) {
    console.error("Error updating approver name:", error);
    res.status(500).send("Failed to update approver name");
  }
});

router.post("/addApprover", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchname,
      approverlistname,
      branchcode,
      employeeName,
      uniquevalue,
      id,
    } = req.body;
    const nameadded = await Addnametoapproverlist(
      orgname,
      orgcode,
      branchname,
      approverlistname,
      branchcode,
      employeeName,
      uniquevalue,
      id
    );
    res.status(200).send(nameadded);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallapprovernames", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, approverlistname } =
      req.query;
    console.log(orgname, orgcode, branchname, branchcode, approverlistname);
    const allnames = await getnamesoftheapproverlist(
      orgname,
      orgcode,
      branchname,
      branchcode,
      approverlistname
    );
    res.send(allnames);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallapprovernamesForListSection", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    console.log(orgname, orgcode);
    const allnames = await getnamesoftheapproverlistForUserList(
      orgname,
      orgcode
    );
    res.send(allnames);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteapprovername", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchname,
      branchcode,
      employeename,
      approverlistname,
    } = req.body;
    // console.log(orgname, orgcode, branchname, branchcode, employeename, approverlistname)
    const deletedname = await deletenamefromapproverlist(
      orgname,
      orgcode,
      branchname,
      branchcode,
      employeename,
      approverlistname
    );
    res.send(deletedname);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteapprovernameForApprovalSection", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchname,
      branchcode,
      employeename,
      approverlistname,
    } = req.body;
    const deletedname = await deletenamefromapproverlistForApproval(
      orgname,
      orgcode,
      branchname,
      branchcode,
      employeename,
      approverlistname
    );
    res.send(deletedname);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateapprovername", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchname,
      branchcode,
      approverlistname,
      employeename,
      id,
    } = req.body;
    const updatedname = await updateApproverName(
      orgname,
      orgcode,
      branchname,
      branchcode,
      approverlistname,
      employeename,
      id
    );
    res.status(200).send(updatedname);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getApprovernamesfororg", async (req, res) => {
  try {
    const { orgname, orgcode, unique } = req.query;
    const response = await getApproverName(orgname, orgcode, unique);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/getlatestorg", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const fetchedlatestorg = await fetchLatestOrganizationfromtable(
      orgname,
      orgcode
    );
    res.send(fetchedlatestorg);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getapproverthathaveuniquevalue", async (req, res) => {
  try {
    const { orgname, orgcode, uniquevalue } = req.query;
    const fetchedapproverthaveuniquevalue = await fetchApprovernameunique(
      orgname,
      orgcode,
      uniquevalue
    );
    res.send(fetchedapproverthaveuniquevalue);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getapprovalbuttonsforuser", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, username } = req.query;
    const approvedButtons = await getApprovedButtons(
      orgname,
      orgcode,
      branchname,
      branchcode,
      username
    );
    res.send(approvedButtons);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/approveOrganization", async (req, res) => {
  try {
    const { orgId } = req.body;
    const {
      country,
      state,
      city,
      postalcode,
      phone,
      email,
      PAN,
      GST,
      IEC,
      creditdays,
      address,
      orgname,
      orgcode,
      clientname,
      branchname,
    } = req.body.updatedFields;
    const { username, status } = req.body.approval;
    const updatedRowinapproval = await updatedData(
      orgId,
      country,
      state,
      city,
      postalcode,
      phone,
      email,
      PAN,
      GST,
      IEC,
      creditdays,
      address,
      orgname,
      orgcode,
      clientname,
      branchname,
      username,
      status
    );
    res.send(updatedRowinapproval);
  } catch (error) {
    console.log(error);
  }
});

// app.post('/sendapprovedorginothertable', async (req, res) => {
//     try {
//         console.log(req.body);
//     } catch (error) {
//         console.log(error);
//     }
// })

router.get("/getapprovedorg", async (req, res) => {
  try {
    const { orgname, orgcode, branchnameofemp, branchcodeofemp, uniquevalue } =
      req.query;
    const approvedRows = await getApprovedRows(
      orgname,
      orgcode,
      branchnameofemp,
      branchcodeofemp,
      uniquevalue
    );
    res.send(approvedRows);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteApproverlist", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      // uniquevalue,
      approverlistname,
      branchname,
      branchcode,
      id,
    } = req.body;
    console.log("data in backend", req.body);
    const deletedRow = await deletedRowlist(
      orgname,
      orgcode,
      // uniquevalue,
      approverlistname,
      branchname,
      branchcode,
      id
    );
    res.status(200).send(deletedRow);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getorg", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const fetchedorg = await fetchOrganizationforrender(orgname, orgcode);
    res.send(fetchedorg);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateSelectedCount", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      branchname,
      branchcode,
      approverlistname,
      selectedCount,
    } = req.body;
    const selectedcountupdated = await SelectedCount(
      orgname,
      orgcode,
      branchname,
      branchcode,
      approverlistname,
      selectedCount
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/getSelectedCount", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, approverlistname } =
      req.query;
    const getthecount = await GetSelectedCount(
      orgname,
      orgcode,
      branchname,
      branchcode,
      approverlistname
    );
    res.send(getthecount);
  } catch (error) {
    console.log(error);
  }
});

export default router;
