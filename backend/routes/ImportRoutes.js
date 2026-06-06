import express from "express";
import {
  storeJob,
  updateJobNumber,
  fetchBranches,
  fetchOrgdata,
  fetchAllorgdata,
  getClient,
  fetchJobData,
  fetchallimpjobs,
  deleteJob,
  fetchingGeneralofJob,
  updateGeneral,
  getAliasAndId,
  updateCurrentJob,
  createdatemanually,
  getCompletedRowsofthetracking,
  insertedCompletedTrackingRows,
  deleteCompletedRowofImport,
  updateRemarks,
  StoreRemarkOfJobImp,
  getCompletedtrackingplandate,
  toggleJobActiveStatus,
  getJobStatus,
  fetchcontainerdetails,
  documentUpload,
  fetchUploadedFiles,
  renameFile,
  deleteFile,
  getJobEdits,
  getImpDelayedJobs,
  getImpDelayedMilestones,
  getImpDelayedJobDetails,
  getImpCompletedJobs,
  saveexe,
  getexe,
  saveexechanges,
} from "../api/import.js";

import path from "path";
import fs from "fs";
import { upload_middleware } from "../middleware/documentupload.middleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(import.meta.url);

// Route to store a job
router.post("/storeJob", async (req, res) => {
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
      freedays,
      blstatus,
      benumber,
      shippinglinebond,
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
    } = req.body;
    console.log("transport mode route", transportMode);

    const storeandcreateJob = await storeJob(
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
      freedays,
      blstatus,
      benumber,
      shippinglinebond,
      branchname,
      branchcode,
      currentdate,
      typesofContainer,
      dockExecutive,
      OwnTransportFrom,
      OwnTransportTo,
      OwnTransportPickupDate,
      OwnTransportCurrentDate,
      containerNoAndWeight
    );

    res.status(200).json(storeandcreateJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error storing job" });
  }
});

// Route to update job number
router.put("/updateId", async (req, res) => {
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
      importerName,
      address,
      gst,
      iec,
      portShipment,
      finalDestination,
      selectedBranch,
      createdat,
    } = req.body;

    const sendtoAPI = await updateJobNumber(
      jobno,
      transportMode,
      count,
      branchname,
      branchcode,
      orgname,
      orgcode,
      jobOwner,
      importerName,
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
    res.status(500).json({ message: "Error updating job number" });
  }
});

// Route to fetch branches
router.get("/getbranches", async (req, res) => {
  try {
    const { importerName, orgcode, orgname } = req.query;
    console.log(req.query);
    const branches = await fetchBranches(importerName, orgcode, orgname);
    res.json(branches);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching branches" });
  }
});

// Route to fetch organization details
router.get("/getorganizationdetails", async (req, res) => {
  try {
    const { clientName, branchName, orgcode, orgname } = req.query;
    const alldata = await fetchOrgdata(
      clientName,
      branchName,
      orgcode,
      orgname
    );
    res.send(alldata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching organization details" });
  }
});

// Route to fetch all organization details
router.get("/getallorganizationdetails", async (req, res) => {
  try {
    const { orgcode, orgname } = req.query;
    const alldata = await fetchAllorgdata(orgcode, orgname);
    res.send(alldata);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching all organization details" });
  }
});

// Route to fetch importers
router.get("/getorgs", async (req, res) => {
  try {
    const { orgcode } = req.query;
    const getClients = await getClient(orgcode);
    res.send(getClients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching importers" });
  }
});

// Route to prefill job creation
router.get("/prefillCreateJob", async (req, res) => {
  try {
    const { jobnumber } = req.query;
    const currentJobData = await fetchJobData(jobnumber);
    res.send(currentJobData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job data" });
  }
});

// Route to fetch all import jobs
router.get("/allimpjobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    const allJobsFetched = await fetchallimpjobs(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.send(allJobsFetched);
  } catch (error) {
    console.error("Error fetching all import jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to toggle job active status
router.put("/updateToActiveNinActioe", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, jobnumber, IsActive } =
      req.body;
    const updateRemark = await toggleJobActiveStatus(
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
    res.status(500).json({ message: "Error updating job status" });
  }
});

// Route to get job status
router.get("/getJobStatus", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode, jobnumber } = req.query;
    const status = await getJobStatus(
      orgname,
      orgcode,
      branchcode,
      branchname,
      jobnumber
    );
    res.status(200).json(status);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching job status" });
  }
});

// Route to delete a job
router.delete("/deletethatjob", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber, employeename } = req.body;
    const deletedjob = await deleteJob(
      orgname,
      orgcode,
      jobnumber,
      employeename
    );
    res.status(200).json(deletedjob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting job" });
  }
});

// INSERT REMARK AFTER IMPORT JOB DELETION
router.put("/insertRemrkForDelete", async (req, res) => {
  const { orgname, orgcode, jobnumber, remark } = req.body;
  const insertRemrkForDelete = await StoreRemarkOfJobImp(
    orgname,
    orgcode,
    jobnumber,
    remark
  );
  res.status(200).json(insertRemrkForDelete);
});

router.get("/prefillGeneralJob", async (req, res) => {
  try {
    const { jobnumber, orgcode, orgname } = req.query;
    const fetchedRowforgeneral = await fetchingGeneralofJob(
      jobnumber,
      orgcode,
      orgname
    );
    res.send(fetchedRowforgeneral);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getAliasAndId", async (req, res) => {
  try {
    const { importerName, branch } = req.query;

    console.log("Import data reached to backend ->", importerName, branch);

    // Check if parameters are provided
    if (!importerName || !branch) {
      return res.status(400).json({ error: "Missing importerName or branch" });
    }

    // Call function with both parameters
    const result = await getAliasAndId(importerName, branch);

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

router.post("/saveExcelData", async (req, res) => {
  try {
    const tableData = req.body.tableData; // 2D array
    const section = req.body.section;
    const jobnumber = req.body.jobNumber;
    const orgcode = req.body.orgcode;
    const orgname = req.body.orgname;
    const username = req.body.username;
    const branchcodeofemp = req.body.branchcodeofemp;
    const clientname = req.body.clientname;
    const branchnameofemp = req.body.branchnameofemp;

    console.log("data in backend", req.body)

    const formattedData = tableData.map((row) => [JSON.stringify(row)]);

    const saveexe2 = await saveexe(
      formattedData,
      section,
      jobnumber,
      orgcode,
      orgname,
      username,
      branchcodeofemp,        
      clientname,
      branchnameofemp
    );
    res.send(saveexe2);
  } catch (error) {
    console.log(error);
  }
});

router.post("/saveExcelChanges", async (req, res) => {
  try {
    const tableData = req.body.tableData; // 2D array
    const section = req.body.section;
    const jobnumber = req.body.jobNumber;
    const orgcode = req.body.orgcode;
    const orgname = req.body.orgname;
    const username = req.body.username;
    const branchcodeofemp = req.body.branchcodeofemp;
    const clientname = req.body.clientname;
    const branchnameofemp = req.body.branchnameofemp;
    const formattedData = tableData.map((row) => [
      JSON.stringify(row.json_data),
    ]);
    console.log("tableData", tableData);

    const saveexechnages2 = await saveexechanges(
      formattedData,
      section,
      jobnumber,
      orgcode,
      orgname,
      username,
      branchcodeofemp,        
      clientname,
      branchnameofemp
    );
    res.send(saveexechnages2);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getQuotation", async (req, res) => {
  try {
    const jobnumber = req.query.jobnumber;
    const orgcode = req.query.orgcode;
    const orgname = req.query.orgname;

    const getexe2 = await getexe(jobnumber, orgcode, orgname);
    res.send(getexe2);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateGeneral", async (req, res) => {
  try {
    const {
      orgname,
      orgcode,
      jobnumber,
      jobowner,
      branchnameofemp,
      branchcodeofemp,
      section,
    } = req.body;
    const {
      importerName,
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
      freedays,
      benumber,
      blstatus,
      shippinglinebond,
      dockExecutive,
      typesofContainer,
    } = req.body;

    const updatedGeneral = await updateGeneral(
      importerName,
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
      branchnameofemp,
      branchcodeofemp,
      section,
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
      freedays,
      benumber,
      blstatus,
      shippinglinebond,
      dockExecutive,
      typesofContainer
    );
  } catch (error) {
    console.log(error);
  }
});

router.put("/sendmanualdate", async (req, res) => {
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
    await createdatemanually(
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
    // console.log(req.statusCode);
  } catch (error) {
    console.log(error);
  }
});

router.get("/Getcompletedrowsofthatjobandbranchandlob", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber } = req.query;
    const allCompletedRowsofthatjobintracking =
      await getCompletedRowsofthetracking(orgname, orgcode, jobnumber);
    res.status(200).send(allCompletedRowsofthatjobintracking);
    // console.log(`status ${req.statusCode}`);
  } catch (error) {
    console.log(error);
  }
});

router.get("/Getcompletedrowsoforplandate", async (req, res) => {
  try {
    const { orgname, orgcode, jobnumber } = req.query;
    const allCompletedRowsofthatjobintracking =
      await getCompletedtrackingplandate(orgname, orgcode, jobnumber);
    res.status(200).send(allCompletedRowsofthatjobintracking);
    // console.log(`status ${req.statusCode}`);
  } catch (error) {
    console.log(error);
  }
});

router.post("/insertCompletedRow", async (req, res) => {
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

    const { jobnumber, jobdoneby, ownbranchcode, importername } = req.body;
    const insertedCompletedRow = await insertedCompletedTrackingRows(
      lobname,
      ownbranchname,
      importername,
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

router.put("/deleteCompletedRow", async (req, res) => {
  // console.log("req :", req.body);
  try {
    const { jobnumber, ownbranchcode, importername } = req.body.data;

    const { lobname, ownbranchname, orgname, orgcode, workflowname } =
      req.body.data.row;

    const deletedRow = await deleteCompletedRowofImport(
      lobname,
      ownbranchname,
      importername,
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

router.post("/updateRemarkinthatrow", async (req, res) => {
  console.log("API hit: /updateRemarkinthatrow");
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
      console.log("data", JSON.stringify());
      await updateRemarks(
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

router.get("/fetchcontainerdetails", async (req, res) => {
  try {
    const { jobnumber, orgname, orgcode } = req.query;
    // console.log(jobnumber , orgname , orgcode)

    const containerNoAndWeight = await fetchcontainerdetails(
      jobnumber,
      orgname,
      orgcode
    );
    res.status(200).send(containerNoAndWeight);
  } catch (error) {
    console.log(error);
  }
});

// Route to upload files
router.post(
  "/upload",
  upload_middleware.array("files", 5),
  async (req, res) => {
    try {
      const renamedFiles = await documentUpload(req);

      res.status(200).json({
        message: "Files uploaded and data inserted successfully",
        files: renamedFiles.map((file) => file.filename),
      });
    } catch (error) {
      console.error("File upload failed:", error);
      res.status(500).json({
        message: "File upload failed",
        error: error.message,
      });
    }
  }
);

// File view route
router.get("/uploads/:jobnumber/:filename", (req, res) => {
  const { jobnumber, filename } = req.params;
  console.log("doc upload data in backend -> /n", req.params);
  const sanitizedFilename = path.basename(filename); // Prevent path traversal attacks
  const formattedJobNumber = jobnumber
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9-]/g, ""); // Sanitize job number
  const filePath = path.join(__dirname, "..", filelocation);

  // Debugging log
  console.log(`Serving file from path: ${filePath}`);

  // Check if the file exists before sending
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error sending file:`, err);
        res
          .status(500)
          .send({ message: "Error sending file", error: err.message });
      }
    });
  } else {
    console.error(`File not found at path: ${filePath}`);
    res.status(404).send("File not found");
  }
});

router.get("/uploadedfiles", async (req, res) => {
  try {
    const { jobnumber, orgname, orgcode, branchname, branchcode } = req.query;

    // Log the received parameters
    console.log("API called with parameters:", {
      jobnumber,
      orgname,
      orgcode,
      branchname,
      branchcode,
    });

    // Check for missing parameters
    if (!jobnumber || !orgname || !orgcode || !branchname || !branchcode) {
      console.error("Missing required parameters");
      return res.status(400).json({ error: "Missing required parameters." });
    }

    const rows = await fetchUploadedFiles(
      jobnumber,
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    res.status(200).json({ files: rows });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//renaming uploaded files route
router.put("/rename-file", async (req, res) => {
  const { fileid, originalFileName, updatedFileName, type, jobnumber } =
    req.body;
  const id = parseInt(fileid);

  if (!id || !originalFileName || !updatedFileName || !type || !jobnumber) {
    console.log("id");
    return res.status(400).json({ message: "Missing required parameters." });
  }

  try {
    const result = await renameFile(
      type,
      jobnumber,
      originalFileName,
      updatedFileName,
      id
    );
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to rename file.", error: error.message });
  }
});

//Deleteting uploaded files route
router.put("/delete-file", async (req, res) => {
  const { fileid, remark, username } = req.body;
  const id = parseInt(fileid);
  if (!id || !remark || !username) {
    console.log("username", username);
    return res.status(400).json({ message: "Missing required parameters." });
  }

  try {
    const result = await deleteFile(id, remark, username);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete file.", error: error.message });
  }
});

router.get("/jobEdits", async (req, res) => {
  try {
    const { jobnumber } = req.query;
    console.log("jobnumber", jobnumber);
    const fetchjobedits = await getJobEdits(jobnumber);
    res.send(fetchjobedits);
  } catch (error) {
    console.log(error);
  }
});

router.get("/impcompletedjobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("orgname", orgname, "orgcode", orgcode);
    const getimpcompletedjobs = await getImpCompletedJobs(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getimpcompletedjobs);
    res.send(getimpcompletedjobs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/impdelayedjobs", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("orgname", orgname, "orgcode", orgcode);
    const getimpdelayedjobs = await getImpDelayedJobs(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getimpdelayedjobs);
    res.send(getimpdelayedjobs);
  } catch (error) {
    console.log(error);
  }
});

router.get("/impdelayedmilestones", async (req, res) => {
  try {
    const { orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("orgname", orgname, "orgcode", orgcode);
    const getimpdelayedmilestones = await getImpDelayedMilestones(
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getimpdelayedmilestones);
    res.send(getimpdelayedmilestones);
  } catch (error) {
    console.log(error);
  }
});

router.get("/impdelayedjobdetails", async (req, res) => {
  try {
    const { jobnumber, orgname, orgcode, branchname, branchcode } = req.query;
    // console.log("jobnumber", jobnumber, "orgname", orgname, "orgcode", orgcode);
    const getimpdelayedmilestonesdetails = await getImpDelayedJobDetails(
      jobnumber,
      orgname,
      orgcode,
      branchname,
      branchcode
    );
    // console.log(getimpdelayedmilestonesdetails);
    res.send(getimpdelayedmilestonesdetails);
  } catch (error) {
    console.log(error);
  }
});
export default router;
