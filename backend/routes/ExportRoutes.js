import express from "express";
import {
  createdatemanuallyForExport,
  deleteCompletedRowofImportExp,
  deleteJobExp,
  fetchallexpjobs,
  fetchBranchesforExpGen,
  fetchingGeneralofJobExp,
  fetchJobDataOfExp,
  getCompletedRowsofthetrackingExp,
  getCompletedtrackingplandateExp,
  getJobStatusExp,
  insertedCompletedTrackingRowsExp,
  storeExportJob,
  storeGeneralExportData,
  getAliasAndId,
  StoreRemarkOfJobExp,
  toggleJobActiveStatusExp,
  updateContainerDetails,
  updateCurrentJobExp,
  updateGeneralExp,
  updateJobNumberExp,
  updateRemarksExp,
  getExpDelayedMilestones,
  getExpDelayedJobDetails,
  getExpDelayedJobs,
  getExpCompletedJobs,
  saveexe,
} from "../api/export.js";

const router = express.Router();

// store the job in export tables

router.post("/storeExpJob", async (req, res) => {
  try {
    const {
      jobDate,
      docReceivedOn,
      transportMode,
      customHouse,
      ownBooking,
      deliveryMode,
      numberOfContainer,
      ownTransportation,
      beType,
      consignmentType,
      cfsName,
      shippingLineName,
      blType,
      bltypenumber,
      jobOwner,
      orgname,
      orgcode,
      // lastIc,
      // freedays,
      // blstatus,
      benumber,
      // shippinglinebond,
      branchname,
      branchcode,
      currentdate,
      typesofContainer,
      dockExecutive,
      OwnTransportFrom,
      OwnTransportTo,
      OwnTransportPickupDate,
      OwnTransportCurrentDate,
      containerNoAndWeight,
      exporterName,
    } = req.body;
    console.log("Received Data in export backend -> ", req.body);
    const storeandcreateJob = await storeExportJob(
      jobDate,
      docReceivedOn,
      transportMode,
      customHouse,
      ownBooking,
      deliveryMode,
      numberOfContainer,
      ownTransportation,
      beType,
      consignmentType,
      cfsName,
      shippingLineName,
      blType,
      bltypenumber,
      jobOwner,
      orgcode,
      orgname,
      // lastIc,
      // freedays,
      // blstatus,
      benumber,
      // shippinglinebond,
      branchname,
      branchcode,
      currentdate,
      typesofContainer,
      dockExecutive,
      OwnTransportFrom,
      OwnTransportTo,
      OwnTransportPickupDate,
      OwnTransportCurrentDate,
      containerNoAndWeight,
      exporterName,
    );

    res.status(200).json(storeandcreateJob);
  } catch (error) {
    console.log(error);
  }
});

//udate job numb
router.put("/updateIdExp", async (req, res) => {
  try {
    const {
      jobno,
      transportMode,
      count,
      branchname,
      branchcode,
      orgname,
      orgcode,
      jobOwner,
      exporterName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
      createdat,
    } = req.body;
    const sendtoAPI = await updateJobNumberExp(
      jobno,
      transportMode,
      count,
      branchname,
      branchcode,
      orgname,
      orgcode,
      jobOwner,
      exporterName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
      createdat
    );
    res.status(200).json(sendtoAPI);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getbranchesofexpgen", async (req, res) => {
  try {
    const { exporterName, orgcode, orgname } = req.query;
    const branches = await fetchBranchesforExpGen(
      exporterName,
      orgcode,
      orgname
    );
    res.json(branches);
  } catch (error) {
    console.log(error);
  }
});

router.get("/prefillCreateJobOfExp", async (req, res) => {
  try {
    const { jobnumber } = req.query;
    const currentJobData = await fetchJobDataOfExp(jobnumber);
    res.send(currentJobData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/allexpjobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const allJobsFetched = await fetchallexpjobs(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(allJobsFetched);
  } catch (error) {
    console.error("Error fetching all importers:", error);
    res.status(500).send("Internal Server Error"); // Send an internal server error response
  }
});

//active and inactive api //////////////////////////////////////////////////////////////

router.put("/updateToActiveNinActioeForExp", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, jobnumber, IsActive } =
      req.body;
    // console.log(orgname, orgcode, branchname , branchcode , jobnumber , IsActive);
    const updateRemark = await toggleJobActiveStatusExp(
      orgname,
      orgcode,
      branchcode,
      branchname,
      jobnumber,
      IsActive
    );
    res.status(200).json(updateRemark);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getJobStatusForExp", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, jobnumber } = req.query;
    // console.log(orgname, orgcode, branchname, branchcode, jobnumber);
    const status = await getJobStatusExp(
      orgname,
      orgcode,
      branchcode,
      branchname,
      jobnumber
    );
    res.status(200).json(status);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///////////////////////////////////////////

router.delete("/deletethatjobexp", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber, employeename } = req.body;
    const deletedjob = await deleteJobExp(
      orgname,
      orgcode,
      jobnumber,
      employeename
    );
    res.status(200).json(deletedjob);
  } catch (error) {
    console.log(error);
  }
});

// INSERT REMARK AFTER EXPORT JOB DELETION
router.put("/insertRemrkForDeleteExp", async (req, res) => {
  const { orgname, orgcode, jobnumber, remark } = req.body;
  const insertRemrkForDelete = await StoreRemarkOfJobExp(
    orgname,
    orgcode,
    jobnumber,
    remark
  );
  res.status(200).json(insertRemrkForDelete);
});

router.get("/prefillGeneralJobExp", async (req, res) => {
  try {
    const { jobnumber, orgcode, orgname } = req.query;
    const fetchedRowforgeneral = await fetchingGeneralofJobExp(
      jobnumber,
      orgcode,
      orgname
    );
    res.send(fetchedRowforgeneral);
  } catch (error) {
    console.log(error);
  }
});

router.post("/saveExcelDataExp", async (req, res) => {
  try {
    const tableData = req.body.tableData; // 2D array
    const formattedData = tableData.map((row) => [JSON.stringify(row)]);

    const saveexe2 = await saveexe(formattedData);
    res.send(saveexe2);
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateGeneralExp", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber, jobowner } = req.body;
    const {
      exporterName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
    } = req.body.formData;
    const {
      docReceivedOn,
      transportMode,
      customHouse,
      ownBooking,
      deliveryMode,
      numberOfContainer,
      ownTransportation,
      beType,
      consignmentType,
      cfsName,
      shippingLineName,
      blType,
      bltypenumber,
      benumber,
      typesofContainer,
    } = req.body;
    console.log(req.body);
    const updatedGeneral = await updateGeneralExp(
      exporterName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
      orgname,
      orgcode,
      jobnumber,
      jobowner,
      docReceivedOn,
      transportMode,
      customHouse,
      ownBooking,
      deliveryMode,
      numberOfContainer,
      ownTransportation,
      beType,
      consignmentType,
      cfsName,
      shippingLineName,
      blType,
      bltypenumber,
      benumber,
      typesofContainer
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/exportgetAliasAndId", async (req, res) => {
  try {
    const { exporterName, branch } = req.query;

    console.log("export data reached to backend ->", exporterName, branch);

    // Check if parameters are provided
    if (!exporterName || !branch) {
      return res.status(400).json({ error: "Missing importerName or branch" });
    }

    // Call function with both parameters
    const result = await getAliasAndId(exporterName, branch);

    // Handle case when no matching data is found
    if (!result) {
      return res.status(404).json({ error: "No data found" });
    }

    res.json(result); // Send JSON response properly
  } catch (error) {
    console.error("Error fetching alias and ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateJobExp", async (req, res) => {
  try {
    const { jobnumber } = req.body;
    const {
      docReceivedOn,
      transportMode,
      customHouse,
      ownBooking,
      deliveryMode,
      numberOfContainer,
      ownTransportation,
      beType,
      consignmentType,
      cfsName,
      shippingLineName,
      blType,
      bltypenumber,
      // blstatus,
      // freedays,
      benumber,
      // shippinglinebond,
    } = req.body.jobData;
    const updatedJob = await updateCurrentJobExp(
      docReceivedOn,
      transportMode,
      customHouse,
      ownBooking,
      deliveryMode,
      numberOfContainer,
      ownTransportation,
      beType,
      consignmentType,
      cfsName,
      shippingLineName,
      blType,
      bltypenumber,
      // blstatus,
      // freedays,
      jobnumber,
      benumber
      // shippinglinebond
    );
  } catch (error) {
    console.log(error);
  }
});

router.put("/sendmanualdateExp", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      ownbranchname,
      lobname,
      workflowname,
      plandate,
      days,
      hours,
      minutes,
      username,
      jobnumber,
      ownbranchcode,
      clientName,
    } = req.body;
    await createdatemanuallyForExport(
      orgname,
      orgcode,
      ownbranchname,
      lobname,
      workflowname,
      plandate,
      days,
      hours,
      minutes,
      username,
      jobnumber,
      ownbranchcode,
      clientName
    );

    res.status(200).send({ message: " created successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/GetcompletedrowsoforplandateExp", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber } = req.query;
    const allCompletedRowsofthatjobintrackingExp =
      await getCompletedtrackingplandateExp(orgname, orgcode, jobnumber);
    res.status(200).send(allCompletedRowsofthatjobintrackingExp);
    // console.log(`status ${req.statusCode}`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/GetcompletedrowsofthatjobandbranchandlobExp", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber } = req.query;
    const allCompletedRowsofthatjobintracking =
      await getCompletedRowsofthetrackingExp(orgname, orgcode, jobnumber);
    res.status(200).send(allCompletedRowsofthatjobintracking);
  } catch (error) {
    console.log(error);
  }
});

router.post("/insertCompletedRowExp", async (req, res) => {
  try {
    const {
      lobname,
      ownbranchname,
      orgname,
      orgcode,
      workflowname,
      status,
      planDate,
      timing,
      timedelay,
      days,
      hours,
      minutes,
      actualdate,
    } = req.body.row;

    const { jobnumber, jobdoneby, ownbranchcode, exportername } = req.body;
    const insertedCompletedRow = await insertedCompletedTrackingRowsExp(
      lobname,
      ownbranchname,
      exportername,
      orgname,
      orgcode,
      workflowname,
      status,
      planDate,
      timing,
      timedelay,
      days,
      hours,
      minutes,
      actualdate,
      jobnumber,
      jobdoneby,
      ownbranchcode
    );

    res.status(200).send({ message: " Inserted successfully" });
    // console.log(`status ${req.statusCode}`);
  } catch (error) {
    console.log(error);
  }
});

router.put("/deleteCompletedRowExp", async (req, res) => {
  try {
    const { jobnumber, ownbranchcode, exportername } = req.body.data;
    const { lobname, ownbranchname, orgname, orgcode, workflowname } =
      req.body.data.row;

    const deletedRow = await deleteCompletedRowofImportExp(
      lobname,
      ownbranchname,
      exportername,
      orgname,
      orgcode,
      workflowname,
      jobnumber,
      ownbranchcode
    );

    res.status(200).send({ message: " Deleted successfully" });
    // console.log(`status ${req.statusCode}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateRemarkinthatrowexp", async (req, res) => {
  try {
    const { orgname, orgcode, data, jobnumber } = req.body;

    console.log("Received Data:", JSON.stringify(data, null, 2));

    // Ensure data is an array and has items
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "Invalid data provided" });
    }

    // Update remarks for each item in data array
    for (const item of data) {
      const { remarks, workflowname } = item;
      await updateRemarksExp(
        jobnumber,
        orgname,
        orgcode,
        remarks === "" ? null : remarks,
        workflowname
      );
    }

    // Respond with success message
    res.status(200).json({ message: "Remarks updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updatecontainerdetails", async (req, res) => {
  try {
    const {
      jobnumber,
      orgname,
      orgcode,
      containerDetails,
      OwnTransportFrom,
      OwnTransportTo,
      OwnTransportPickupDate,
      OwnTransportCurrentDate,
    } = req.body;
    // console.log(req.body);
    const updatedContainerDetails = await updateContainerDetails(
      jobnumber,
      orgname,
      orgcode,
      containerDetails,
      OwnTransportFrom,
      OwnTransportTo,
      OwnTransportPickupDate,
      OwnTransportCurrentDate
    );
    res.send(updatedContainerDetails);
  } catch (error) {
    console.log(error);
  }
});

router.get("/expcompletedjobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("orgname", orgname, "orgcode", orgcode);
    const getexpcompletedjobs = await getExpCompletedJobs(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getexpcompletedjobs);
    res.send(getexpcompletedjobs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/expdelayedjobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("orgname", orgname, "orgcode", orgcode);
    const getexpdelayedjobs = await getExpDelayedJobs(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getexpdelayedjobs);
    res.send(getexpdelayedjobs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/expdelayedmilestones", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("orgname", orgname, "orgcode", orgcode);
    const getexpdelayedmilestones = await getExpDelayedMilestones(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getexpdelayedmilestones);
    res.send(getexpdelayedmilestones);
  } catch (error) {
    console.log(error);
  }
});

router.get("/expdelayedjobdetails", async (req, res) => {
  try {
    const { jobnumber, orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("jobnumber", jobnumber, "orgname", orgname, "orgcode", orgcode);
    const getexpdelayedmilestonesdetails = await getExpDelayedJobDetails(
      jobnumber,
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getexpdelayedmilestonesdetails);
    res.send(getexpdelayedmilestonesdetails);
  } catch (error) {
    console.log(error);
  }
});
export default router;
