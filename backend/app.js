import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getTheUser, insertUser } from './api/user.js';
import { OrgDataStorage, OrgRender, insertEmployees, fetchBranchData, updateRow, insertContact, fetchAllContacts, deleteContact, updateContact } from './api/organization.js';

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
        const { clientname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, orgname, orgcode, branchName } = req.body;
        const allstoredinDB = await OrgDataStorage(clientname, orgname, orgcode, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays, branchName);
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

    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/allFetch', async (req, res) => {
    try {
        const { clientname, alias, branchname } = req.query;

        const allDataofBranch = await fetchBranchData(clientname, alias, branchname);
        res.json(allDataofBranch);
    } catch (error) {
        console.log('Error during Login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



app.put('/updateData', async (req, res) => {
    try {
        const { orgcode, orgname, clientname, alias, branchname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays } = req.body;

        // Call the updateRow function to update the row in the database
        const allDataupdate = await updateRow(orgcode, orgname, clientname, alias, branchname, address, country, state, city, postalcode, phone, email, PAN, GST, IEC, creditdays);

        res.status(200).json(allDataupdate);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/storeContact', async (req, res) => {
    try {
        const { contactName, designation, department, mobile, email, branchname, orgname, orgcode } = req.body;
        const contactStore = await insertContact(contactName, designation, department, mobile, email, branchname, orgname, orgcode);
        return res.status(200).json(contactStore);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get('/getAllContacts', async (req, res) => {
    try {
        const { branchname, orgname, orgcode } = req.query;
        const allContacts = await fetchAllContacts(branchname, orgname, orgcode);
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



app.put('/updateContact', async(req, res) => {
    try {
        const { contactName, designation, department, mobile, email, branchname, orgname, orgcode } = req.body;
        const contactStore = await updateContact(contactName, designation, department, mobile, email, branchname, orgname, orgcode);
        return res.status(200).json(contactStore);
    } catch (error) {
        console.log('Error during data update:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});