import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getTheUser, insertUser } from './api/user.js';
import { OrgDataStorage, OrgRender, insertEmployees, fetchBranchData, updateRow, insertContact, fetchAllContacts, deleteContact, updateContact, saveBranchinTable, updateBID, deleteBranch, fetchAllContactsofNew, updateContactduringNew, updateBIDContact } from './api/organization.js';
import { fetchAllusers, storeimpaccess, removeimpaccess, fetchAllaccesspoints, getUserAccess} from './api/userlist.js';
import { storeJob, updateJobNumber, fetchBranches, fetchAllorgdata, storeGeneralImportData, getClient, storeO2D, get02ddata, deleteO2D, updateO2D, fetchAlluseraccess, fetchJobData} from './api/import.js';

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
        const { clientname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode, branchName, username } = req.body;
        const allstoredinDB = await OrgDataStorage(clientname, orgname, orgcode, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, branchName, username);
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
        const { username, password, orgcode, branchname, repeatPassword, orgname } = req.body;

        if (!username || !password || !orgcode || !branchname || !orgname) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        if (password !== repeatPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const allStorageofemp = await insertEmployees(username, password, orgcode, branchname, orgname);

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
        const { orgcode, orgname, username } = req.query;
        const getAllusers = await fetchAllusers(orgcode, orgname, username);

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
            orgname, orgcode, lastIc, freedays, blstatus
        } = req.body;
        const storeandcreateJob = await storeJob(jobDate, docReceivedOn, transportMode, customHouse, ownBooking, deliveryMode, numberOfContainer, ownTransportation, beType, consignmentType, cfsName, shippingLineName, blType, bltypenumber, jobOwner, orgcode, orgname, lastIc, freedays, blstatus);
       
        res.status(200).json(storeandcreateJob);

    } catch (error) {
        console.log(error);
    }
})


app.put('/updateId', async (req, res) => {
    try {
        const { jobno, transportMode } = req.body;
        const sendtoAPI = await updateJobNumber(jobno, transportMode);
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
        const { orgname, orgcode, jobowner, jobnumber } = req.body;
        const { importerName, address, gst, iec, portShipment, finalDestination } = req.body.formData;
        const storingGeneralImportData = await storeGeneralImportData(orgname, orgcode, jobowner, jobnumber, importerName, address, gst, iec, portShipment, finalDestination);
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
        const {tatimpcolumn, days, hours, minutes, orgname, orgcode} = req.body;
        const storedData = await storeO2D(tatimpcolumn, days, hours, minutes, orgname, orgcode);
        res.status(200).json(storedData);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getAllO2D', async (req, res) => {
    try {
        const {orgname, orgcode} = req.query;
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
        const {tatimpcolumn, days, hours, minutes, orgname, orgcode, id} = req.body;
        const updatedO2DDATA = await updateO2D(tatimpcolumn, days, hours, minutes, orgname, orgcode, id);
        res.status(200).json(updatedO2DDATA);
    } catch (error) {
        console.log(error);
    }
})


app.get('/getAllAccess', async(req, res) => {
    try {
        const {orgname, orgcode} = req.query;
        const allpoints = await fetchAllaccesspoints(orgname, orgcode);
        res.send(allpoints);
    } catch (error) {
        console.log(error);
    }
})


app.post('/applyAccess', async (req, res) => {
    try {
        const {accessChecked, username} = req.body;
        const accessgiven = await storeimpaccess(accessChecked, username);
        res.send(accessgiven);
    } catch (error) {
        console.log(error);
    }
})

app.get('/getAccessedRowsforauser', async (req, res) => {
    try {
        const {username} = req.query;
        const alluserrows = await getUserAccess(username);
        res.send(alluserrows);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/removeAccess', async (req, res) => {
    try {
        const {accessChecked, username} = req.body;
        const deletedRow = await removeimpaccess(accessChecked, username);
        res.send(deletedRow)
    } catch (error) {
        console.log(error);
    }
})


app.get('/getUseraccessforuser', async (req, res) => {
    try {
        const {username} = req.query;
        const alluserrows = await fetchAlluseraccess(username);
        res.send(alluserrows);
    } catch (error) {
        console.log(error);
    }
})

app.get('/prefillCreateJob', async (req, res) => {
    try {
        const {jobnumber} = req.query;
        const currentJobData = await fetchJobData(jobnumber);
        res.send(currentJobData);
    } catch (error) {
        console.log(error);
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});