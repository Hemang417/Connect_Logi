import express from "express";
import {
    deleteEnquiry,
    deleteProspect,
    getEnquiry,
    getEnquiryCompany,
    getEnquiryDataById,
    getEnquiryDetailsDataById,
    getorgclientname,
    getProspect,
    getProspectDataById,
    storeEnquiry,
    storeEnquiryForDetails,
    storeProspect,
    updateEnquiry,
    updateEnquiryForDetails,
    updateProspect,
  } from "../api/sales.js";
const router = express.Router();

router.post("/storeprospectdata", async (req, res) => {
    try {
      const {
        currentDate,
        username,
        customerName,
        contactPersonName,
        contactPersonNo,
        emailId,
        address,
        source,
        customSource,
        country,
        state,
        city,
        postalcode,
        orgname,
        orgcode,
        branchname,
        branchcode,
      } = req.body;
      const storedSales = await storeProspect(
        currentDate,
        username,
        customerName,
        contactPersonName,
        contactPersonNo,
        emailId,
        address,
        source,
        customSource,
        country,
        state,
        city,
        postalcode,
        orgname,
        orgcode,
        branchname,
        branchcode
      );
      res.status(200).send(storedSales);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  router.get("/getprospectdata", async (req, res) => {
    try {
      const { orgname, orgcode, branchname, branchcode } = req.query;
      const gotprospectdata = await getProspect(
        orgname,
        orgcode,
        branchname,
        branchcode
      );
      res.status(200).send(gotprospectdata);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/getprospectbyid", async (req, res) => {
    try {
      const { id } = req.query;
      const gotprospectdata = await getProspectDataById(id);
      res.send(gotprospectdata);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.put("/updateprospect/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const {
        customerName,
        contactPersonName,
        contactPersonNo,
        emailId,
        address,
        source,
        customSource,
        country,
        state,
        city,
        postalcode,
      } = req.body;
      const updatedJob = await updateProspect(
        id,
        customerName,
        contactPersonName,
        contactPersonNo,
        emailId,
        address,
        source,
        customSource,
        country,
        state,
        city,
        postalcode
      );
      res.send(updatedJob);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.delete("/deleteprospect", async (req, res) => {
    try {
      const { id } = req.query;
      // console.log(id);
      const deletedprospectdata = await deleteProspect(id);
      res.status(200).send(deletedprospectdata);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.post("/storeenquirydata", async (req, res) => {
    // console.log(req.body);
    try {
      const {
        clientType,
        companyname,
        contactPerson,
        phoneNo,
        emailId,
        enquiryFor,
        rfq,
        enquirycreationdate,
        orgname,
        orgcode,
        branchname,
        branchcode,
      } = req.body;
      const storeEnquirydata = await storeEnquiry(
        clientType,
        companyname,
        contactPerson,
        phoneNo,
        emailId,
        enquiryFor,
        rfq,
        enquirycreationdate,
        orgname,
        orgcode,
        branchname,
        branchcode
      );
      res.status(200).send(storeEnquirydata);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  router.post("/storeenquiryfordetails", async (req, res) => {
    // console.log(req.body);
    try {
      const {
        enquiry_id,
        importClearance,
        exportClearance,
        freightBooking,
        transportation,
        eximConsultancy
      } = req.body;
      const storeResults = [];
  
      if (importClearance) {
        const result = await storeEnquiryForDetails(enquiry_id, importClearance);
        storeResults.push(result);
      }
  
      if (exportClearance) {
        const result = await storeEnquiryForDetails(enquiry_id, exportClearance);
        storeResults.push(result);
      }
  
      if (freightBooking) {
        const result = await storeEnquiryForDetails(enquiry_id, freightBooking);
        storeResults.push(result);
      }
  
      if (transportation) {
        const result = await storeEnquiryForDetails(enquiry_id, transportation);
        storeResults.push(result);
      }
  
      if (eximConsultancy) {
        const result = await storeEnquiryForDetails(enquiry_id, eximConsultancy);
        storeResults.push(result);
      }
  
      res.status(200).send(storeResults);
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  router.put("/updateenquiryfordetails/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the enquiry ID from the URL parameters
      const {
  
        importClearance,
        exportClearance,
        freightBooking,
        transportation,
        eximConsultancy
      } = req.body;
  
      // console.log(req.body);
      const updateResults = [];
      let enquiryForType;
  
      // Update import clearance details if present
      if (importClearance) {
        console.log("importClearance data reached to the backend")

        enquiryForType = 'importClearance'
        const result = await updateEnquiryForDetails(id, importClearance, enquiryForType); // Assume this function handles the update logic
        updateResults.push(result);
      }
  
      // Update export clearance details if present
      if (exportClearance) {
        console.log("exportClearance data reached to the backend")
        enquiryForType = 'exportClearance'
        const result = await updateEnquiryForDetails(id, exportClearance, enquiryForType);
        updateResults.push(result);
      }
  
      // Update freight booking details if present
      if (freightBooking) {
        enquiryForType = 'freightBooking'
        const result = await updateEnquiryForDetails(id, freightBooking, enquiryForType);
        updateResults.push(result);
      }
  
      // Update transportation details if present
      if (transportation) {
        enquiryForType = 'transportation'
        const result = await updateEnquiryForDetails(id, transportation, enquiryForType);
        updateResults.push(result);
      }
  
      // Update exim consultancy details if present
      if (eximConsultancy) {
        enquiryForType = 'eximConsultancy'
        const result = await updateEnquiryForDetails(id, eximConsultancy, enquiryForType);
        updateResults.push(result);
      }
  
      res.status(200).send(updateResults); // Send back the results of the updates
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
  
  router.get("/getenquirydata", async (req, res) => {
    try {
      const { orgname, orgcode, branchname, branchcode } = req.query;
      const gotenquirydata = await getEnquiry(
        orgname,
        orgcode,
        branchname,
        branchcode
      );
      res.status(200).send(gotenquirydata);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/getenquirycompanyname", async (req, res) => {
    try {
      const { orgname, orgcode } = req.query;
      const companyname = await getEnquiryCompany(
        orgname,
        orgcode
      );
      res.status(200).json(companyname);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/getorgclientname", async (req, res) => {
    try {
      const { orgname, orgcode } = req.query;
      const companyname = await getorgclientname(
        orgname,
        orgcode
      );
      res.status(200).json(companyname);
    } catch (error) {
      console.log(error);
    }
  });
  
  
  router.get("/getenquirybyid", async (req, res) => {
    try {
      const { id } = req.query;
      const gerenquirybyiddata = await getEnquiryDataById(id);
      // const otherdetails = await getEnquiryDetailsDataById(id);
      res.send(gerenquirybyiddata);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/getenquirydetailsbyid", async (req, res) => {
    try {
      const { id } = req.query;
      // const gerenquirybyiddata = await getEnquiryDataById(id);
      const otherdetails = await getEnquiryDetailsDataById(id);
      res.send(otherdetails);
    } catch (error) {
      console.log(error);
    }
  });
  
  
  
  
  router.put("/updateenquiry/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const {
        clientType,
        companyname,
        contactPerson,
        phoneNo,
        emailId,
        enquiryFor,
        rfq
      } = req.body;
      const updatedpros = await updateEnquiry(
        clientType,
        companyname,
        contactPerson,
        phoneNo,
        emailId,
        enquiryFor,
        rfq,
        id
      );
      res.send(updatedpros);
    } catch (error) {
      console.log(error);
    }
  });
  
  
  router.delete("/deleteenquiry", async (req, res) => {
    try {
      const { id } = req.query;
      const deletedEnquirydata = await deleteEnquiry(id);
      res.status(200).send(deletedEnquirydata);
    } catch (error) {
      console.log(error);
    }
  });
  

export default router;