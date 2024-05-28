import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import { getTheUser, insertUser, getApproverNameinOrg } from './api/user.js';
import { OrgDataStorage, OrgRender, insertEmployees, fetchBranchData, updateRow, insertContact, fetchAllContacts, deleteContact, updateContact, saveBranchinTable, updateBID, deleteBranch, fetchAllContactsofNew, updateContactduringNew, updateBIDContact } from './api/organization.js';
import { fetchAllusers, storeimpaccess, removeimpaccess, fetchAllaccesspoints, getUserAccess, storeBranchAccessforUser, deletethatbranchaccess, fetchExistingBranches } from './api/userlist.js';
import {
    storeJob, updateJobNumber, fetchBranches, fetchAllorgdata, storeGeneralImportData,
    getClient, storeO2D, get02ddata, deleteO2D, updateO2D, fetchAlluseraccess, fetchJobData, storeinO2Dtable, deletetheO2DtoNull,
    fetchallimpjobs, storeRemark, deleteJob, fetchingGeneralofJob, updateGeneral, updateCurrentJob, getO2Ddatafromo2dimport,
    getDND, storeDNDintable, updateDND, deleteDND, storeDispatchintable, getDispatch, updateDispatch, deleteDispatch, O2DinsertUnderprocess,
    GetUnderprocess, putETA, fetchPlanDateETA, createdatemanually, getCompletedRowsofthetracking, insertedCompletedTrackingRows, deleteCompletedRowofImport,
    updateRemarks
} from './api/import.js';
import { storeOwnBranch, getOwnBranches, fetchBranchskhudka, deletekhudkaBranch, updatedOwnBranch } from './api/user.js'
import { setMail, fetchMail } from './api/mail.js'
import { getCompletedRows } from './api/userreport.js';
import { switchBranchsogetBranch } from './api/dashboard.js';
import { storethelob, getAlltheLOB, deleteLOB, updateLOB, fetchorgTAT } from './api/lineofbusiness.js';
import { storeMilestone, getAllMilestones, deleteMilestone, updateMilestone } from './api/milestone.js';
import { storeWorkflow, readAllWorkflow, createOverviewofWorkflow, deletedWorkflowRow, getSetAllWorkflow, deletesetworkflow, updatesetworkflow, gettheemployeesofBranch } from './api/workflow.js';
import {
    storeApproverName, getApproverlist, deletedApproverlist, UpdatedApproverList,
    Addnametoapproverlist, getnamesoftheapproverlist, deletenamefromapproverlist,
    updateApproverName, getApproverName,
    fetchLatestOrganizationfromtable, fetchApprovernameunique, updatedData, getApprovedRows, deletedRowlist,
    fetchOrganizationforrender, SelectedCount, GetSelectedCount
} from './api/approver.js'
import { getallthelobdataofbranchandlob } from './api/newimport.js'
import { storingRole, getUserRoles, DeleteUserRole, updateRoleofuser } from './api/role.js';
import { fetchNotifications, updatethereadingrowwithtimeandvalue, readallnotifications } from './api/notifications.js'
import { storeArrangement, getBranchcodeandname, deleteArrangement, getArrangementofthatbranch, updateColumn } from './api/arrangement.js'
import { getBranches, storeKYC } from './api/kyc.js'
import {getapproverofJobs,getJob} from './api/jobapproval.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


// LOGIN ROUTE
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password, orgcode } = req.body;
        if (!username || !password || !orgcode) {
            return res.status(404).json({ message: 'All fields (username, password, orgcode) are required' });
        }
        const userdetails = await getTheUser(username, password, orgcode);
        if (userdetails) {
            res.status(200).json(userdetails);
        }
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


// SIGNUP ROUTE
app.post('/auth/signup', async (req, res) => {
    try {
        const { username, password, orgname, repeatPassword, orgcode } = req.body;
        if (!username || !password || !orgcode || !orgname) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        if (password !== repeatPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const register = await insertUser(username, password, orgname, orgcode);
        res.status(200).json({ register, orgcode });
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.post('/org/store', async (req, res) => {
    try {
        const { clientname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode, branchName, username, createdon } = req.body;
        const allstoredinDB = await OrgDataStorage(clientname, orgname, orgcode, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, branchName, username, createdon);
        res.status(200).json(allstoredinDB);
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/getOrg', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const renderData = await OrgRender(orgname, orgcode);
        res.status(200).json(renderData);
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.post('/emp/store', async (req, res) => {
    try {
        const { username, password, orgcode, repeatPassword, orgname, fullname, role } = req.body;

        if (!username || !password || !orgcode || !orgname || !fullname) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        if (password !== repeatPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const allStorageofemp = await insertEmployees(username, password, orgcode, orgname, fullname, role);

        res.status(200).json(allStorageofemp);
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/allFetch', async (req, res) => {
    try {
        const { clientname, alias, branchname, id } = req.query;

        const allDataofBranch = await fetchBranchData(clientname, alias, branchname, id);
        res.json(allDataofBranch);
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



app.put('/updateData', async (req, res) => {
    try {
        const { orgcode, orgname, clientname, alias, branchname, id, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays } = req.body;
        console.log(orgcode, orgname, clientname, alias, branchname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays);
        // Call the updateRow function to update the row in the database
        const allDataupdate = await updateRow(orgcode, orgname, clientname, alias, branchname, id, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays);

        res.status(200).json(allDataupdate);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/storeContact', async (req, res) => {
    try {
        const { contactName, designation, department, mobile, email, branchname, orgname, orgcode, id, clientname } = req.body;
        const contactStore = await insertContact(contactName, designation, department, mobile, email, branchname, orgname, orgcode, id, clientname);
        return res.status(200).json(contactStore);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/getAllContacts', async (req, res) => {
    try {
        const { branchname, clientname, id, orgname, orgcode } = req.query;
        const allContacts = await fetchAllContacts(branchname, clientname, id, orgname, orgcode);
        res.json(allContacts);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/getAllContactsofNew', async (req, res) => {
    try {
        const { branchname, clientname, orgname, orgcode } = req.query;
        const allContacts = await fetchAllContactsofNew(branchname, clientname, orgname, orgcode);
        res.json(allContacts);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.delete('/deleteContact', async (req, res) => {
    try {
        const { email,
            mobile,
            contactName,
            designation,
            department } = req.body;

        const updatedContact = await deleteContact(email, mobile, contactName, designation, department);
        return res.status(200).json(updatedContact);

    } catch (error) {
        console.log(error);
    }
})



app.put('/updateContact', async (req, res) => {
    try {
        const { contactName, designation, department, mobile, email, branchname, clientname, id, orgname, orgcode } = req.body;

        const contactStore = await updateContact(contactName, designation, department, mobile, email, branchname, clientname, id, orgname, orgcode);
        return res.status(200).json(contactStore);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.put('/updateContactduringNew', async (req, res) => {
    try {
        const { contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname } = req.body;
        const response = await updateContactduringNew(contactName, designation, department, mobile, email, branchname, orgname, orgcode, clientname);
        return res.status(200).json(response);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/fetchAllusers', async (req, res) => {
    try {
        const { orgcode, orgname } = req.query;
        const getAllusers = await fetchAllusers(orgcode, orgname);

        // if(getAllusers.status === 200){
        //     res.status(200);
        // }
        res.json(getAllusers);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


// app.post('/impstore', async (req, res) => {
//     try {
//         // const {
//         //     ETAFollowUp,
//         //     ScrutinyDocument,
//         //     ChecklistApproval,
//         //     ESanchit,
//         //     FillingBOE,
//         //     Assesment,
//         //     DutyCall,
//         //     ExaminationOOC,
//         //     EBLStatusAgentName,
//         //     PortCFSNomination,
//         //     Scrutiny,
//         //     OriginalDocReceived,
//         //     InvoiceReceivedfromShippingLine,
//         //     PaymenttoShippingLine,
//         //     DeliveryOrder,
//         //     Delivery,
//         //     ShippingLine,
//         //     CFS,
//         //     StampDuty,
//         //     CustomDuty,
//         //     Insurance,
//         //     LREmptySlipBill,
//         //     Billing,
//         //     Dispatch,
//         //     Miscellaneous,
//         // } = req.body.dataAccess; 
//         const { username, ...dataAccess } = req.body; // Destructure username and dataAccess from req.body
//         const storeimp = await storeimpaccess(dataAccess, username);
//         res.json(storeimp)

//         // const allRows = [
//         //     ETAFollowUp,
//         //     ScrutinyDocument,
//         //     ChecklistApproval,
//         //     ESanchit,
//         //     FillingBOE,
//         //     Assesment,
//         //     DutyCall,
//         //     ExaminationOOC,
//         //     EBLStatusAgentName,
//         //     PortCFSNomination,
//         //     Scrutiny,
//         //     OriginalDocReceived,
//         //     InvoiceReceivedfromShippingLine,
//         //     PaymenttoShippingLine,
//         //     DeliveryOrder,
//         //     Delivery,
//         //     ShippingLine,
//         //     CFS,
//         //     StampDuty,
//         //     CustomDuty,
//         //     Insurance,
//         //     LREmptySlipBill,
//         //     Billing,
//         //     Dispatch,
//         //     Miscellaneous
//         // ]

//         // const storeimp = await storeimpaccess(allRows, username);

//     } catch (error) {
//         console.log('Error during data update:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// })


// app.delete('/delimp', async (req, res) => {
//     try {
//         const { username, ...dataAccess } = req.body;
//         const removeimp = await removeimpaccess(dataAccess, username);
//         res.json(removeimp);
//     } catch (error) {
//         console.log('Error during data update:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// })


// app.get('/getUserAccess', async (req, res) => {
//     try {
//         const { username } = req.query;
//         const userAccess = await getUserAccess(username);
//         res.json(userAccess);
//     } catch (error) {
//         console.log('Error during data update:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// })




app.post('/storeJob', async (req, res) => {
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
            orgname, orgcode, lastIc, freedays, blstatus, benumber, shippinglinebond,
            branchname, branchcode, currentdate
        } = req.body;
        const storeandcreateJob = await storeJob(jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgcode, orgname, lastIc, freedays, blstatus, benumber, shippinglinebond, branchname, branchcode, currentdate);

        res.status(200).json(storeandcreateJob);

    } catch (error) {
        console.log(error);
    }
})


app.put('/updateId', async (req, res) => {
    try {
        const { jobno, transportMode, count, branchname, branchcode, orgname, orgcode } = req.body;
        const sendtoAPI = await updateJobNumber(jobno, transportMode, count, branchname, branchcode, orgname, orgcode);
        res.status(200).json(sendtoAPI);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getbranches', async (req, res) => {
    try {
        const { importerName, orgcode, orgname } = req.query;
        const branches = await fetchBranches(importerName, orgcode, orgname);
        res.json(branches)
    } catch (error) {
        console.log(error);
    }
})


app.get('/getorganizationdetails', async (req, res) => {
    try {
        const { clientName, branchName, orgcode, orgname, id } = req.query;

        const alldata = await fetchAllorgdata(clientName, branchName, orgcode, orgname, id);

        res.send(alldata);
    } catch (error) {
        console.log(error);
    }
})



app.post('/createGeneral', async (req, res) => {
    try {
        const { orgname, orgcode, jobowner, jobnumber, branchname, branchcode } = req.body;
        const { importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, id } = req.body.formData;
        const storingGeneralImportData = await storeGeneralImportData(orgname, orgcode, jobowner, jobnumber, importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, id, branchname, branchcode);

        res.send(storingGeneralImportData);
    } catch (error) {
        console.log(error);
    }
})



app.get('/getimporters', async (req, res) => {
    try {
        const { orgcode } = req.query;
        const getClients = await getClient(orgcode);
        res.send(getClients);
    } catch (error) {
        console.log(error);
    }
})





app.post('/storeinbranchestable', async (req, res) => {
    try {
        const { clientname, orgcode, branchname } = req.body;
        const storingbranchesinbranchtable = await saveBranchinTable(clientname, orgcode, branchname);

        res.send(storingbranchesinbranchtable);
    } catch (error) {
        console.log(error);
    }
})




app.put('/updateTheBID', async (req, res) => {
    try {
        const { BID, clientname, orgcode, branchname } = req.body;

        const updatingtheBID = await updateBID(BID, clientname, orgcode, branchname);

        res.status(200).json({ success: true, message: "BID updated successfully" });
    } catch (error) {
        console.log(error);
        // Sending an error response back to the client
        res.status(500).json({ success: false, message: "Error updating BID" });
    }
});



app.put('/updatetheBIDcontact', async (req, res) => {
    try {
        const { BID, clientname, orgname, orgcode, branchname } = req.body;
        const updationofBIDincontact = await updateBIDContact(BID, clientname, orgcode, orgname, branchname);
        res.send(updationofBIDincontact);
    } catch (error) {
        console.log(error);
        // Sending an error response back to the client
        res.status(500).json({ success: false, message: "Error updating BID" });
    }
})




app.delete('/deleteBranch', async (req, res) => {
    try {
        const { id, branchname, orgcode, orgname, clientname } = req.body;

        // Call your deleteBranch function passing the received data
        const deletedBranch = await deleteBranch(id, branchname, orgcode, orgname, clientname);

        // Send the response back to the frontend
        res.send(deletedBranch);
    } catch (error) {
        console.log(error);
        // Handle errors and send an appropriate response
        res.status(500).send({ success: false, message: 'Error deleting branch' });
    }
});



// this is for ImpTAT file

// app.post('/storeimpTAT', async (req, res) => {
//     try {
//         const { impTATData, orgname, orgcode } = req.body;
//         const storedimpTATData = await storeimpTAT(impTATData, orgname, orgcode);
//     } catch (error) {
//         console.log(error);
//     }
// })


// app.get('/getImpTATData', async (req, res) => {
//     try {
//         const { orgname, orgcode } = req.query;
//         const getImpTATData = await fetchImpTATData(orgname, orgcode);
//         res.send(getImpTATData);
//     } catch (error) {
//         console.log(error);
//     }
// })


// app.put('/updateImpTAT', async (req, res) => {
//     try {
//         const { impTATData, orgname, orgcode } = req.body;

//         const updateTATdata = await updateImpTATData(impTATData, orgname, orgcode);
//         res.send(updateTATdata);
//     } catch (error) {
//         console.log(error);
//     }
// })



// app.get('/getTATofO2D', async (req, res) => {
//     try {
//         const {orgname, orgcode, ScrutinyDocument, PortCFSNomination, ChecklistApproval, ESanchit, FilingBOE, Assesment, DutyCall, ExaminationOOC } = req.query;
//         const getTATofO2D = await TATget(orgname, orgcode, ScrutinyDocument, PortCFSNomination, ChecklistApproval, ESanchit, FilingBOE, Assesment, DutyCall, ExaminationOOC);
//         res.send(getTATofO2D);
//     } catch (error) {
//         console.log(error);
//     }
// })



app.post('/storeO2D', async (req, res) => {
    try {
        const { tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode } = req.body;
        const storedData = await storeO2D(tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode);
        res.status(200).json(storedData);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getAllO2D', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const allo2ddata = await get02ddata(orgname, orgcode);
        res.send(allo2ddata);
    } catch (error) {
        console.log(error);
    }
})


app.delete('/deleteO2D', async (req, res) => {
    try {
        const { orgname, orgcode, deletionrowid } = req.body;
        const deletedO2D = await deleteO2D(orgname, orgcode, deletionrowid);
        res.status(200).json({ message: "O2D deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.put('/updateO2D', async (req, res) => {
    try {
        const { tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode, id } = req.body;
        const updatedO2DDATA = await updateO2D(tatimpcolumn, days, hours, minutes, dstatus, orgname, orgcode, id);
        res.status(200).json(updatedO2DDATA);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getAllAccess', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const allpoints = await fetchAllaccesspoints(orgname, orgcode);
        res.send(allpoints);
    } catch (error) {
        console.log(error);
    }
})


app.post('/applyAccess', async (req, res) => {
    try {
        const { accessChecked, username } = req.body;
        const accessgiven = await storeimpaccess(accessChecked, username);
        res.send(accessgiven);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getAccessedRowsforauser', async (req, res) => {
    try {
        const { username } = req.query;
        const alluserrows = await getUserAccess(username);
        res.send(alluserrows);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/removeAccess', async (req, res) => {
    try {
        const { accessChecked, username } = req.body;
        const deletedRow = await removeimpaccess(accessChecked, username);
        res.send(deletedRow)
    } catch (error) {
        console.log(error);
    }
})


app.get('/getUseraccessforuser', async (req, res) => {
    try {
        const { username } = req.query;
        const alluserrows = await fetchAlluseraccess(username);
        res.send(alluserrows);
    } catch (error) {
        console.log(error);
    }
})

app.get('/prefillCreateJob', async (req, res) => {
    try {
        const { jobnumber } = req.query;
        const currentJobData = await fetchJobData(jobnumber);
        res.send(currentJobData);
    } catch (error) {
        console.log(error);
    }
})



app.post('/insertO2D', async (req, res) => {
    try {
        const { planDate, actualDate, timedelay, status, orgname, orgcode, jobnumber, jobdoneby, tatimpcolumn, tat } = req.body;
        const storedInO2D = await storeinO2Dtable(planDate, actualDate, timedelay, status, orgname, orgcode, jobnumber, jobdoneby, tatimpcolumn, tat);
        return storedInO2D;
    } catch (error) {
        console.log(error);
    }
});

// app.post('/updateNextRowPlanDate', async (req, res) => {
//     try {
//         const {planDate, tatimpcolumn, orgname, orgcode, jobnumber, jobdoneby, tat, status, actualDate, timedelay} = req.body;
//         const storednextRow = await storeNextRow(planDate, tatimpcolumn, orgname, orgcode, jobnumber, jobdoneby, tat, status, actualDate, timedelay);
//     } catch (error) {
//         console.log(error);
//     }
// })



app.delete('/deletefromO2Dtable', async (req, res) => {
    try {
        const { tatimpcolumn, jobNumber, orgname, orgcode } = req.body;
        const updatetherowtoNull = await deletetheO2DtoNull(tatimpcolumn, jobNumber, orgname, orgcode);
        // res.send(updatetherowtoNull);
    } catch (error) {
        console.log(error);
    }
})


app.get('/allimpjobs', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode } = req.query;
        const allJobsFetched = await fetchallimpjobs(orgname, orgcode, branchname, branchcode);
        res.send(allJobsFetched);
    } catch (error) {
        console.error('Error fetching all importers:', error);
        res.status(500).send('Internal Server Error'); // Send an internal server error response
    }
});


app.put('/insertRemarks', async (req, res) => {
    try {
        const { remarkskaData, orgname, orgcode, jobnumber } = req.body;
        const updateRemark = await storeRemark(remarkskaData, orgname, orgcode, jobnumber);
    } catch (error) {
        console.log(error);
    }
})


app.delete('/deletethatjob', async (req, res) => {
    try {
        const { orgname, orgcode, jobnumber } = req.body;
        const deletedjob = await deleteJob(orgname, orgcode, jobnumber);
        res.status(200).json(deletedjob)
    } catch (error) {
        console.log(error);
    }
})


app.get('/prefillGeneralJob', async (req, res) => {
    try {
        const { jobnumber, orgcode, orgname } = req.query;
        const fetchedRowforgeneral = await fetchingGeneralofJob(jobnumber, orgcode, orgname);
        res.send(fetchedRowforgeneral);
    } catch (error) {
        console.log(error);
    }
})


app.put('/updateGeneral', async (req, res) => {
    try {
        const { orgname, orgcode, jobnumber, jobowner } = req.body;
        const { importerName, address, gst, iec, portShipment, finalDestination, selectedBranch } = req.body.formData;

        const updatedGeneral = await updateGeneral(importerName, address, gst, iec, portShipment, finalDestination, selectedBranch, orgname, orgcode, jobnumber, jobowner);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateJob', async (req, res) => {
    try {
        const { jobnumber } = req.body;
        const { docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, blstatus, freedays, benumber, shippinglinebond } = req.body.jobData;
        const updatedJob = await updateCurrentJob(docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, blstatus, freedays, jobnumber, benumber, shippinglinebond)
    } catch (error) {
        console.log(error);
    }
})


app.get('/getO2Dimport', async (req, res) => {
    try {
        const { orgname, orgcode, jobNumber } = req.query;
        const allo2drows = await getO2Ddatafromo2dimport(orgname, orgcode, jobNumber);
        res.send(allo2drows);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getDoNDelivery', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const allDD = await getDND(orgname, orgcode);
        res.send(allDD);
    } catch (error) {
        console.log(error);
    }
})

app.post('/storeDND', async (req, res) => {
    try {
        const { tatimpcolumn, days, hours, minutes, orgname, orgcode } = req.body;
        const storedDND = await storeDNDintable(tatimpcolumn, days, hours, minutes, orgname, orgcode);
        res.status(200).json(storedDND);
    } catch (error) {
        console.log(error);
    }
})


app.put('/updateDND', async (req, res) => {
    try {
        const { tatimpcolumn, days, hours, minutes, orgname, orgcode, id } = req.body;
        const updatedDND = await updateDND(tatimpcolumn, days, hours, minutes, orgname, orgcode, id);
        res.status(200).json(updateDND);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteDND', async (req, res) => {
    try {
        const { orgname, orgcode, deletionrowid } = req.body;
        const deletedDND = await deleteDND(orgname, orgcode, deletionrowid);
        res.status(200).json(deletedDND);
    } catch (error) {
        console.log(error);
    }
})









app.get('/getDispatch', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const allDispatch = await getDispatch(orgname, orgcode);
        res.send(allDispatch);
    } catch (error) {
        console.log(error);
    }
})

app.post('/storeDispatch', async (req, res) => {
    try {
        const { tatimpcolumn, days, hours, minutes, orgname, orgcode } = req.body;
        const storedDispatch = await storeDispatchintable(tatimpcolumn, days, hours, minutes, orgname, orgcode);
        res.status(200).json(storedDispatch);
    } catch (error) {
        console.log(error);
    }
})


app.put('/updateDispatch', async (req, res) => {
    try {
        const { tatimpcolumn, days, hours, minutes, orgname, orgcode, id } = req.body;
        const updatedDispatch = await updateDispatch(tatimpcolumn, days, hours, minutes, orgname, orgcode, id);
        res.status(200).json(updatedDispatch);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteDispatch', async (req, res) => {
    try {
        const { orgname, orgcode, deletionrowid } = req.body;
        const deletedDispatch = await deleteDispatch(orgname, orgcode, deletionrowid);
        res.status(200).json(deletedDispatch);
    } catch (error) {
        console.log(error);
    }
})



app.post('/insertUnderprocess', async (req, res) => {
    try {
        const { username, orgname, orgcode, jobNumber, rowname, status, tat, planDate } = req.body;

        const insertUnderprocess = await O2DinsertUnderprocess(username, orgname, orgcode, jobNumber, rowname, status, tat, planDate);
    } catch (error) {
        console.log(error);
    }
})


app.get('/findunderprocess', async (req, res) => {
    try {
        const { orgname, orgcode, status, jobNumber } = req.query;
        const underprocessed = await GetUnderprocess(orgname, orgcode, status, jobNumber);
        res.send(underprocessed);
    } catch (error) {
        console.log(error);
    }
})


app.post('/insertPlanDateETA', async (req, res) => {
    try {
        const { orgname, orgcode, jobNumber, jobdoneby, tatdayhrmin, planDate, tatimpcolumn } = req.body;
        const storedETAdate = putETA(orgname, orgcode, jobNumber, jobdoneby, tatdayhrmin, planDate, tatimpcolumn);
    } catch (error) {
        console.log(error);
    }
})

app.get('/pullPlanDateETA', async (req, res) => {
    try {
        const { orgname, orgcode, jobNumber, tatimpcolumn } = req.query;
        const fetchedETA = await fetchPlanDateETA(orgname, orgcode, jobNumber, tatimpcolumn);
        res.send(fetchedETA);
    } catch (error) {
        console.log(error);
    }
})

app.post('/settimeandmail', async (req, res) => {
    try {
        const { email, passcode, hours, minutes, orgname, orgcode } = req.body;
        const settedmail = await setMail(email, passcode, hours, minutes, orgname, orgcode);
    } catch (error) {
        console.log(error);
    }
})

app.get('/gettimeandmail', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const fetchedMail = await fetchMail(orgname, orgcode);
        res.json(fetchedMail);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getAllRowsofUsername', async (req, res) => {
    try {
        const { username, fullname, branchnames } = req.query;
        const alltherows = await getCompletedRows(username, fullname, branchnames);
        res.send(alltherows);
    } catch (error) {
        console.log(error);
    }
})


app.post('/createownbranch', async (req, res) => {
    try {
        const { orgcode, ownbranchname, address, gst, iec, headname, headnum, orgname } = req.body;
        const storedOwnBranch = await storeOwnBranch(orgcode, ownbranchname, address, gst, iec, headname, headnum, orgname);
        res.status(200).send(storedOwnBranch);
    } catch (error) {
        console.log(error);
    }
})

app.get('/fetchBranchesofOwn', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const sendOwnBranches = await getOwnBranches(orgname, orgcode);
        res.send(sendOwnBranches);
    } catch (error) {
        console.log(error);
    }
})

app.get('/fetchallownbranchname', async (req, res) => {
    try {
        const { orgcode, orgname, username } = req.query;
        const sendAllBranches = await fetchBranchskhudka(orgname, orgcode, username);
        res.send(sendAllBranches);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteOwnBranch', async (req, res) => {
    try {
        const { id, orgname, orgcode } = req.query;
        const deletedOwnBranch = await deletekhudkaBranch(id, orgname, orgcode);
        res.send(deletedOwnBranch);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateOwnBranch', async (req, res) => {
    try {
        const { id, orgcode, orgname, ownbranchname, gstnum, iecnum, headname, headnum, address, branchcode } = req.body;
        const updatedownbranch = await updatedOwnBranch(id, orgcode, orgname, ownbranchname, gstnum, iecnum, headname, headnum, address, branchcode);
        res.send(updatedownbranch);
    } catch (error) {
        console.log(error);
    }
})

app.post('/insertBranchaccess', async (req, res) => {
    try {
        const { orgcode, orgname, ownbranchname, branchcode } = req.body.branch;
        const { username } = req.body;
        const storedBranchAccess = await storeBranchAccessforUser(orgcode, orgname, ownbranchname, branchcode, username);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteBranchaccess', async (req, res) => {
    try {
        const { branchcode } = req.body;
        const deletedBranchAccess = await deletethatbranchaccess(branchcode);
    } catch (error) {
        console.log(error);
    }
})

app.get('/fetchExistingBranches', async (req, res) => {
    try {
        const { username, orgname, orgcode } = req.query;
        const fetchexisting = await fetchExistingBranches(username, orgname, orgcode);
        res.send(fetchexisting);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getAllBranches', async (req, res) => {
    try {
        const { orgname, orgcode, username } = req.query;
        const response = await switchBranchsogetBranch(orgname, orgcode, username);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
})

app.post('/storelob', async (req, res) => {
    try {
        const { lobname, transportmode, orgname, orgcode } = req.body;
        const lobstorehua = await storethelob(lobname, transportmode, orgname, orgcode);
        res.status(200).send(lobstorehua);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getlob', async (req, res) => {
    try {
        const { orgcode, orgname } = req.query;
        const allDataofLOB = await getAlltheLOB(orgcode, orgname);
        res.send(allDataofLOB);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deletelob', async (req, res) => {
    try {
        const { id } = req.body;
        const deletedLOB = await deleteLOB(id);
        res.status(200).send(deletedLOB);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updatelob', async (req, res) => {
    try {
        const { id, lobname } = req.body;
        const updatedLOB = await updateLOB(id, lobname);
        res.status(200).send(updatedLOB);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getorgforTAT', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const data = await fetchorgTAT(orgname, orgcode);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    }
})

app.post('/addmilestone', async (req, res) => {
    try {
        const { orgname, orgcode, milestonename, lob, ownbranchname } = req.body;
        const addedMilestone = await storeMilestone(orgname, orgcode, milestonename, lob, ownbranchname);
        res.send(addedMilestone);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getmilestones', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const allmilestones = await getAllMilestones(orgname, orgcode);
        res.send(allmilestones);
    } catch (error) {
        console.log(error);
    }
});

app.delete('/deletemilestone', async (req, res) => {
    try {
        const { id } = req.body;
        const deletedMilestone = await deleteMilestone(id);
        res.status(200).send(deletedMilestone);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updatemilestone', async (req, res) => {
    try {
        const { orgname, orgcode, milestonename, lob, ownbranchname, id } = req.body;
        const updatedData = await updateMilestone(orgname, orgcode, milestonename, lob, ownbranchname, id);
        res.status(200).send(updatedData);
    } catch (error) {
        console.log(error);
    }
})

app.post('/createworkflow', async (req, res) => {
    try {
        const { orgname, orgcode, branchName, lob, importername } = req.body;
        const { workflowname, duration, days, hours, minutes, milestone, plandatechange, selectedEmployee } = req.body.workflowData;
        const storedWorkflow = await storeWorkflow(orgname, orgcode, branchName, lob, importername, workflowname, duration, days, hours, minutes, milestone, plandatechange, JSON.stringify(selectedEmployee));
        res.status(200).send(storedWorkflow);
    } catch (error) {
        console.log(error);
    }
})

app.get('/readallworkflows', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const allWorkflow = await readAllWorkflow(orgname, orgcode);
        res.send(allWorkflow);
    } catch (error) {
        console.log(error);
    }
})


app.post('/createOverviewofWorkflow', async (req, res) => {
    try {
        const { orgname, orgcode, client, lob, branch } = req.body;
        const createdoverview = await createOverviewofWorkflow(orgname, orgcode, client, lob, branch);
        res.status(200).send(createdoverview);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteWorkflow', async (req, res) => {
    try {
        const { orgname, orgcode, id } = req.body;
        const deletedRow = await deletedWorkflowRow(orgname, orgcode, id);
        res.status(200).send(deletedRow);
    } catch (error) {
        console.log(error);
    }
})

app.get('/readsetworkflow', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, importername, lobname } = req.query;
        const gotallthesetworkflow = await getSetAllWorkflow(orgname, orgcode, branchname, importername, lobname);
        res.send(gotallthesetworkflow);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deletesetworkflow', async (req, res) => {
    try {
        const { id, orgname, orgcode, importername, ownbranchname, lobname } = req.body;
        const deletedSetWorkflow = await deletesetworkflow(id, orgname, orgcode, importername, ownbranchname, lobname);
        res.status(200).send(deletedSetWorkflow);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updatesetworkflow', async (req, res) => {
    try {
        const { id, workflowname, days, hours, minutes, milestone, plandatechange, selectedEmployee } = req.body;
        const updatedWorkflowHaiYe = await updatesetworkflow(id, workflowname, days, hours, minutes, milestone, plandatechange, selectedEmployee);
        res.status(200).send(updatedWorkflowHaiYe);
    } catch (error) {
        console.log(error);
    }
})

app.get('/readlobdataspecific', async (req, res) => {
    try {
        const { orgname, orgcode, lobname, ownbranchname } = req.query;
        const allThatLOBdata = await getallthelobdataofbranchandlob(orgname, orgcode, lobname, ownbranchname);
        res.send(allThatLOBdata);
    } catch (error) {
        console.log(error);
    }
})

app.post('/sendmanualdate', async (req, res) => {
    try {
        const { orgname, orgcode, ownbranchname, lobname, workflowname, plandate, days, hours, minutes, username, jobnumber, ownbranchcode } = req.body;
        const manualdatestored = await createdatemanually(orgname, orgcode, ownbranchname, lobname, workflowname, plandate, days, hours, minutes, username, jobnumber, ownbranchcode);
    } catch (error) {
        console.log(error);
    }
});

app.get('/Getcompletedrowsofthatjobandbranchandlob', async (req, res) => {
    try {
        const { orgname, orgcode, lobname, ownbranchname, jobnumber } = req.query;
        const allCompletedRowsofthatjobintracking = await getCompletedRowsofthetracking(orgname, orgcode, lobname, ownbranchname, jobnumber);
        res.send(allCompletedRowsofthatjobintracking);
    } catch (error) {
        console.log(error);
    }
});

app.post('/insertCompletedRow', async (req, res) => {
    try {

        const { lobname, ownbranchname, importername,
            orgname, orgcode, workflowname, status, planDate,
            timedelay, days, hours, minutes, actualdate } =
            req.body.row;

        const { jobnumber, jobdoneby, ownbranchcode } = req.body;
        const insertedCompletedRow = await insertedCompletedTrackingRows(lobname, ownbranchname, importername,
            orgname, orgcode, workflowname, status, planDate,
            timedelay, days, hours, minutes, actualdate, jobnumber, jobdoneby, ownbranchcode)


    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteCompletedRow', async (req, res) => {

    try {
        const { jobnumber, ownbranchcode } = req.body;
        const { lobname, ownbranchname, importername,
            orgname, orgcode, workflowname } = req.body.row;
        console.log(req.body.row);
        const deletedRow = await deleteCompletedRowofImport(lobname, ownbranchname, importername,
            orgname, orgcode, workflowname, jobnumber, ownbranchcode);

    } catch (error) {
        console.log(error);
    }
})

app.post('/updateRemarkinthatrow', async (req, res) => {
    try {
        const { orgname, orgcode, data } = req.body;

        // Ensure data is an array and has items
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: 'Invalid data provided' });
        }

        // Update remarks for each item in data array
        for (const item of data) {
            const { id, lobname, importername, remarks, workflowname } = item;
            await updateRemarks(id, lobname, importername, orgname, orgcode, remarks, workflowname);
        }

        // Respond with success message
        res.status(200).json({ message: 'Remarks updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/getAlltheemployeeswiththatbranchaccess', async (req, res) => {
    try {
        const { orgname, orgcode, branchname } = req.query;
        const allusersofthatorg = await gettheemployeesofBranch(orgname, orgcode, branchname);
        res.send(allusersofthatorg);
    } catch (error) {
        console.log(error);
    }
})

app.post('/storeApproverlist', async (req, res) => {
    try {
        const { approverName, orgname, orgcode, uniquevalue } = req.body;
        const { branchname, branchcode } = req.body.selectedBranch
        const storedname = await storeApproverName(orgname, orgcode, approverName, branchname, branchcode, uniquevalue);
        res.status(200).send(storedname);
    } catch (error) {
        console.log(error);
    }
})

app.get('/fetchApproverlist', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode } = req.query;
        const allapproverlist = await getApproverlist(orgname, orgcode, branchname, branchcode);
        res.send(allapproverlist);
    } catch (error) {
        console.log(error);
    }
})

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

app.put('/updateApproverlist', async (req, res) => {
    try {
        const { orgname, orgcode, approverName, uniquevalue, id } = req.body;
        const { branchname, branchcode } = req.body.selectedBranch;

        await UpdatedApproverList(orgname, orgcode, approverName, branchname, branchcode, uniquevalue, id);
        res.status(200).send('Approver name updated successfully');
    } catch (error) {
        console.error('Error updating approver name:', error);
        res.status(500).send('Failed to update approver name');
    }
});

app.post('/addApprover', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, approverlistname, branchcode, employeeName, uniquevalue, id } = req.body;
        const nameadded = await Addnametoapproverlist(orgname, orgcode, branchname, approverlistname, branchcode, employeeName, uniquevalue, id);
        res.status(200).send(nameadded);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getallapprovernames', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode, approverlistname } = req.query;
        const allnames = await getnamesoftheapproverlist(orgname, orgcode, branchname, branchcode, approverlistname);
        res.send(allnames)
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteapprovername', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode, approverlistname, employeename, id } = req.body;
        const deletedname = await deletenamefromapproverlist(orgname, orgcode, branchname, branchcode, approverlistname, employeename, id);
        res.send(deletedname)
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateapprovername', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode, approverlistname, employeename, id } = req.body;
        const updatedname = await updateApproverName(orgname, orgcode, branchname, branchcode, approverlistname, employeename, id);
        res.status(200).send(updatedname);
    } catch (error) {
        console.log(error);
    }
})

app.post('/storeuserrole', async (req, res) => {
    try {
        const { orgname, orgcode, userrole } = req.body;
        const storedRole = await storingRole(orgname, orgcode, userrole);
        res.send(storedRole);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getuserroles', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const rolesofuser = await getUserRoles(orgname, orgcode);
        res.send(rolesofuser);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteduserrole', async (req, res) => {
    try {
        const { orgname, orgcode, userrole } = req.body;
        const deletedrole = await DeleteUserRole(orgname, orgcode, userrole);
        res.send(deletedrole);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateuserrole', async (req, res) => {
    try {
        const { orgname, orgcode, userrole, id } = req.body;
        const updatedUserRole = updateRoleofuser(orgname, orgcode, userrole, id);
        res.status(200).send(updatedUserRole)
    } catch (error) {
        console.log(error);
    }
})

app.get('/getApprovernamesfororg', async (req, res) => {
    try {
        const { orgname, orgcode, unique } = req.query;
        const response = await getApproverName(orgname, orgcode, unique);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getlatestorg', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const fetchedlatestorg = await fetchLatestOrganizationfromtable(orgname, orgcode);
        res.send(fetchedlatestorg)
    } catch (error) {
        console.log(error);
    }
})

app.get('/getapproverthathaveuniquevalue', async (req, res) => {
    try {
        const { orgname, orgcode, uniquevalue } = req.query;
        const fetchedapproverthaveuniquevalue = await fetchApprovernameunique(orgname, orgcode, uniquevalue);
        res.send(fetchedapproverthaveuniquevalue);
    } catch (error) {
        console.log(error);
    }
})

app.put('/approveOrganization', async (req, res) => {
    try {
        const { orgId } = req.body;
        const { country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, address, orgname, orgcode, clientname, branchname } = req.body.updatedFields;
        const { username, status } = req.body.approval
        const updatedRowinapproval = await updatedData(orgId, country, state, city,
            postalcode, phone, email, PAN, GST, IEC, creditdays, address, orgname, orgcode, clientname, branchname, username, status);
        res.send(updatedRowinapproval);
    } catch (error) {
        console.log(error);
    }
})

// app.post('/sendapprovedorginothertable', async (req, res) => {
//     try {
//         console.log(req.body);
//     } catch (error) {
//         console.log(error);
//     }
// })


app.get('/getapprovedorg', async (req, res) => {
    try {
        const { orgname, orgcode, uniquevalue } = req.query;
        const approvedRows = await getApprovedRows(orgname, orgcode, uniquevalue);
        res.send(approvedRows)
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteApproverlist', async (req, res) => {
    try {
        const { orgname, orgcode, uniquevalue, approverlistname, branchname, branchcode, id } = req.body.item;
        const deletedRow = await deletedRowlist(orgname, orgcode, uniquevalue, approverlistname, branchname, branchcode, id);
        res.status(200).send(deletedRow)
    } catch (error) {
        console.log(error);
    }
})


app.get('/getorg', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const fetchedorg = await fetchOrganizationforrender(orgname, orgcode);
        res.send(fetchedorg);
    } catch (error) {
        console.log(error);
    }

})

app.put('/updateSelectedCount', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode, approverlistname, selectedCount } = req.body;
        const selectedcountupdated = await SelectedCount(orgname, orgcode, branchname, branchcode, approverlistname, selectedCount)
    } catch (error) {
        console.log(error);
    }
})

app.get('/getSelectedCount', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode, approverlistname } = req.query;
        const getthecount = await GetSelectedCount(orgname, orgcode, branchname, branchcode, approverlistname);
        res.send(getthecount);
    } catch (error) {
        console.log(error);
    }
})

app.get('/fetchnotifications', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const fetchednotifications = await fetchNotifications(orgname, orgcode);
        res.send(fetchednotifications);
    } catch (error) {
        console.log(error);
    }
})


app.put('/userhasread', async (req, res) => {
    try {
        const { orgname, orgcode, address, clientname, country, state, city, postalcode, alias, pan, gst, iec, branchname, creditdays, username, id, reading, timeofreading } = req.body.theitemread;
        const { currentDate, employeename } = req.body;
        const updatedReadRow = await updatethereadingrowwithtimeandvalue(orgname, orgcode, address, clientname, country, state, city, postalcode, alias, pan, gst, iec, branchname, creditdays, username, id, currentDate, reading, timeofreading, employeename);
        res.send(updatedReadRow); // Make sure updatedReadRow contains the updated row
    } catch (error) {
        console.log(error);
    }
})


app.put('/makereadall', async (req, res) => {
    try {
        const { currentDate, notifications } = req.body;
        const everythingread = await readallnotifications(currentDate, notifications);
        res.status(200).send(everythingread);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getnamesofapproversinorg', async (req, res) => {
    try {
        const { orgcode } = req.query;
        const appdata = await getApproverNameinOrg(orgcode);
        res.send(appdata);
    } catch (error) {
        console.log(error);
    }
})


app.post('/storeArrangement', async (req, res) => {
    try {
        const { orgname, orgcode, data, branchname, branchcode } = req.body;
        const storeArrangemented = await storeArrangement(orgname, orgcode, data, branchname, branchcode);
        res.status(200).send(storeArrangemented);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getbranchesforarrangement', async (req, res) => {
    try {
        const { orgname, orgcode } = req.query;
        const finallygot = await getBranchcodeandname(orgname, orgcode);
        res.send(finallygot);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deleteArrangement', async (req, res) => {
    try {
        const { orgname, orgcode, data, branchname, branchcode } = req.body;
        const deletedhaiye = await deleteArrangement(orgname, orgcode, data, branchname, branchcode);
        res.status(200).send(deletedhaiye);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getArrangementofthatbranch', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode } = req.query;
        const gotit = await getArrangementofthatbranch(orgname, orgcode, branchname, branchcode);
        res.send(gotit);
    } catch (error) {
        console.log(error);
    }
})

app.put('/updateColumn', async (req, res) => {
    try {
        const { orgname, orgcode, branchname, branchcode, custominput } = req.body;
        const updated = await updateColumn(orgname, orgcode, branchname, branchcode, custominput);
        res.status(200).send(updated);
    } catch (error) {
        console.log(error);
    }
})


app.get('/branchesofthemp', async (req, res) => {
    try {
        const { username, orgname, orgcode } = req.query;

        const gotbranches = await getBranches(username, orgname, orgcode);
        res.send(gotbranches);
    } catch (error) {
        console.log(error);
    }
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const currentDate = new Date().toISOString().slice(0, 10);
        // Concatenate the original file name with the current date and a dash
        const filename = `${currentDate}-${file.originalname}`;
        cb(null, filename);
    }
});

// Initialize multer middleware
const upload = multer({ storage: storage });

app.post('/uploadKYCData', upload.single('profilePhoto'), async (req, res) => {
    try {
        const formData = req.body; // Form data
        const profilePhoto = req.file; // Uploaded file
        const filePath = profilePhoto.path;

        // Read the file as a buffer
        const fileData = await fs.readFile(filePath);

        const { fullName, mobileNumber, officeMobileNumber, dateOfBirth, personalEmail, officeEmail, dateOfJoining, aadharNumber, panNumber, orgname, orgcode, username, branches } = formData;

        const storedData = await storeKYC(
            fullName,
            mobileNumber,
            officeMobileNumber,
            dateOfBirth,
            personalEmail,
            officeEmail,
            dateOfJoining,
            aadharNumber,
            panNumber,
            orgname,
            orgcode,
            username,
            branches,
            fileData
        );

        res.status(200).send({ message: 'KYC data stored successfully', storedData });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while processing the request' });
    }
});

app.get('/getapproverofJobs', async (req, res) => {
    try {
        const {orgname, orgcode, uniquevalue} = req.query;
        const approverdata = await getapproverofJobs(orgname, orgcode, uniquevalue);
        res.send(approverdata);
    } catch (error) {
        console.log(error);
    }
})

app.get('/fetchlatestjob', async (req, res) => {
    try {
        const {orgname, orgcode} = req.query;
        const latestjob = await getJob(orgname, orgcode);
        res.send(latestjob);
    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});