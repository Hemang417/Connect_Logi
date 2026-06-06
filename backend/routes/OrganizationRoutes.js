import express from "express";
import {
  OrgDataStorage,
  OrgRender,
  insertEmployees,
  fetchBranchData,
  updateRow,
  saveBranchinTable,
  updateBID,
  deleteBranch,
  getOrgsforfiltering,
  getBranches,
  OrgRenderAll,
  OrgDelete,
  StoreRemarkOfOrg,
  deleteEmployee,
  renderAllbrenches,
  getOrgEdits,
  addDepartment,
  getDepartment,
} from "../api/organization.js";

const router = express.Router();

// CREATE ORGANIZATION AND STORE IN APPROVAL TABLE
router.post("/orgStore", async (req, res) => {
  try {
    const {
      clientname,
      address,
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
      orgname,
      orgcode,
      branchName,
      username,
      createdon,
      checkedBoxOptions,
      orgganizationTypeOptions,
      contactDetails,
      showClientCode,
      followup2,
      followup3,
    } = req.body;
    const allstoredinDB = await OrgDataStorage(
      clientname,
      orgname,
      orgcode,
      address,
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
      branchName,
      username,
      createdon,
      checkedBoxOptions,
      orgganizationTypeOptions,
      contactDetails,
      showClientCode,
      followup2,
      followup3
    );
    res.status(200).json(allstoredinDB);
  } catch (error) {
    console.log("Error during Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET ORGANIZATION DATA
router.get("/getOrg", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const renderData = await OrgRender(orgname, orgcode);
    res.status(200).json(renderData);
  } catch (error) {
    console.log("Error during Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//// DELETE ORGANIZATION
router.delete("/deleteorg", async (req, res) => {
  try {
    const { orgname, clientname, orgcode, employeename } = req.query;
    const renderData = await OrgDelete(
      orgname,
      clientname,
      orgcode,
      employeename
    );
    res.status(200).json(renderData);
  } catch (error) {
    console.log("Error during Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/// INSERT REMARK AFTER ORGANIZATION DELETION
router.put("/insertRemrkForOrg", async (req, res) => {
  const { orgname, orgcode, clientname, remark } = req.body;
  const insertRemrkForDelete = await StoreRemarkOfOrg(
    orgname,
    orgcode,
    clientname,
    remark
  );
  res.status(200).json(insertRemrkForDelete);
});

//GET ALL ORGANIZATIONS
router.get("/getOrgAll", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const renderData = await OrgRenderAll(orgname, orgcode);
    res.status(200).json(renderData);
  } catch (error) {
    console.log("Error during Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//getOrgBranches
router.get("/getOrgBranches", async (req, res) => {
  try {
    const { alias } = req.query;

    if (!alias) {
      return res.status(400).json({ message: "Alias is required" });
    }

    const renderData = await getBranches(alias);
    res.json({ branches: renderData });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// fetch organization branch data
router.get("/allFetch", async (req, res) => {
  try {
    const { alias, branchname, id } = req.query;

    const allDataofBranch = await fetchBranchData(alias, branchname, id);
    res.json(allDataofBranch);
  } catch (error) {
    console.log("Error during Login:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/addDepartment", async (req, res) => {
  try {
    const { orgname, orgcode, category } = req.body;  // ✅ Use req.body
    console.log("data received dept ->", req.body);

    const adddepartment = await addDepartment(orgname, orgcode, category);
    res.json({ message: "Department added", data: adddepartment });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getDepartment", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;  // ✅ Use req.body
    console.log("data received ->", req.query);

    const getdepartment = await getDepartment(orgname, orgcode);
    res.json({ message: "Department added", data: getdepartment });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// UPDATE ORGANIZATION DATA
router.put("/updateData", async (req, res) => {
  try {
    const {
      orgcode,
      orgname,
      branchnameofemp,
      branchcodeofemp,
      username,
      clientname,
      alias,
      branchname,
      id,
      address,
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
      showClientCode,
      checkedBoxOptions,
      orgganizationTypeOptions,
      contactDetails,
      followup2,
      followup3,
      section,
    } = req.body;
    // console.log("data to update ->", req.body);
    // Call the updateRow function to update the row in the database
    const allDataupdate = await updateRow(
      orgcode,
      orgname,
      branchnameofemp,
      branchcodeofemp,
      username,
      clientname,
      alias,
      branchname,
      id,
      address,
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
      showClientCode,
      checkedBoxOptions,
      orgganizationTypeOptions,
      contactDetails,
      followup2,
      followup3,
      section
    );

    res.status(200).json(allDataupdate);
  } catch (error) {
    console.log("Error during data update:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// INSERT EMPLOYEES
router.post("/emp/store", async (req, res) => {
  try {
    const {
      username,
      password,
      orgcode,
      repeatPassword,
      orgname,
      fullname,
      role,createdby
    } = req.body;

    if (!username || !password || !orgcode || !orgname || !fullname) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (password !== repeatPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const allStorageofemp = await insertEmployees(
      username,
      password,
      orgcode,
      orgname,
      fullname,
      role,createdby

    );

    res.status(200).json(allStorageofemp);
  } catch (error) {
    console.log("Error during Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE EMPLOYEES
router.post("/emp/delete", async (req, res) => {
  try {
    const { username, orgcode, orgname , remark , deletedby} = req.body;

    // Check if username is provided
    if (!username || !orgcode || !orgname) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Call the function to delete the employee (assume deleteEmployee is defined elsewhere)
    const result = await deleteEmployee(username, orgcode, orgname, remark , deletedby);

    if (result) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during user deletion:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/storeinbranchestable", async (req, res) => {
  try {
    const { clientname, orgcode, branchname, id } = req.body;
    console.log("data reached in storebranch ->", req.body);
    const storingbranchesinbranchtable = await saveBranchinTable(
      clientname,
      orgcode,
      branchname,
      id
    );

    res.send(storingbranchesinbranchtable);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateTheBID", async (req, res) => {
  try {
    const { BID, clientname, orgcode, branchname } = req.body;

    const updatingtheBID = await updateBID(
      BID,
      clientname,
      orgcode,
      branchname
    );

    res
      .status(200)
      .json({ success: true, message: "BID updated successfully" });
  } catch (error) {
    console.log(error);
    // Sending an error response back to the client
    res.status(500).json({ success: false, message: "Error updating BID" });
  }
});

router.put("/deleteBranch", async (req, res) => {
  try {
    const { id, branchname, orgcode, orgname, clientname ,deletedat} = req.body.data;
    console.log("data reached in deletebranch ->", req.body);

    // Call your deleteBranch function passing the received data
    const deletedBranch = await deleteBranch(
      id,
      branchname,
      orgcode,
      orgname,
      clientname,deletedat
    );

    // Send the response back to the frontend
    res.send(deletedBranch);
  } catch (error) {
    console.log(error);
    // Handle errors and send an appropriate response
    res.status(500).send({ success: false, message: "Error deleting branch" });
  }
});

router.get("/getBranchesnameforclient", async (req, res) => {
  try {
    const { clientname, orgcode } = req.query;
    const getBranchesname = await renderAllbrenches(clientname, orgcode);
    res.send(getBranchesname);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getallorgsforfiltering", async (req, res) => {
  try {
    const { orgname, orgcode } = req.query;
    const fetchedorgs = await getOrgsforfiltering(orgname, orgcode);
    res.send(fetchedorgs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/orgEdits", async (req, res) => {
  try {
    const { alias } = req.query;
    const fetchorgedits = await getOrgEdits(alias);
    res.send(fetchorgedits);
  } catch (error) {
    console.log(error);
  }
});

export default router;
