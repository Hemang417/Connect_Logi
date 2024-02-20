import React, { useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CFormInput,
    CFormLabel,
    CForm,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CNavItem,
    CNav,
    CNavLink
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import createjob from './CreateJob';

const Contactdetails = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);


    const [allcontacts, setAllContacts] = useState([]);


    const [contact, setContact] = useState({
        contactName: '',
        designation: '',
        department: '',
        mobile: '',
        email: ''
    });



    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/storeContact', {
                contactName: contact.contactName,
                designation: contact.designation,
                department: contact.department,
                mobile: contact.mobile,
                email: contact.email,
                branchname: localStorage.getItem('selectedBranchName'),
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });

            setVisible(false);
            fetchAllContacts();
        } catch (error) {
            console.log(error);
        }
    }



    const fetchAllContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getAllContacts', {
                params: {
                    branchname: localStorage.getItem('selectedBranchName'),
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setAllContacts(response.data);
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        const fetchAllpeopleContact = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAllContacts', {
                    params: {
                        branchname: localStorage.getItem('selectedBranchName'),
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode'),
                    }
                });
                setAllContacts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllpeopleContact();
    }, []);

// const newContacts = allcontacts.filter((contact, i) => i !== index);
        // setAllContacts(newContacts);

   


        async function handleDelete(index) {
            try {
                const contactToDelete = allcontacts[index];
                const { email, mobile, contactName, designation, department } = contactToDelete;
        
                // Send DELETE request to backend with contact data to identify and delete the contact
                const response = await axios.delete('http://localhost:5000/deleteContact', {
                    data: {
                        email,
                        mobile,
                        contactName,
                        designation,
                        department
                    }
                });
                fetchAllContacts();
                
            } catch (error) {
                console.log(error);
            }
        }
        
        const [editVisible, seteditVisible] = useState(false);

        // const [editContact, setEditContact] = useState(null);
        const handleEdit = (index) => {
            const contactToEdit = allcontacts[index];
            setContact(contactToEdit);
            // seteditVisible(true);
            setVisible(true); // Open the modal for editing

            handleUpdate();


        };
        
        // // Function to update the edited contact
        const handleUpdate = async () => {
            try {
                // Send a PUT request to update the contact
                const response = await axios.put('http://localhost:5000/updateContact', {
                    contactName: contact.contactName,
                    designation: contact.designation,
                    department: contact.department,
                    mobile: contact.mobile,
                    email: contact.email,
                });
                
                // Fetch updated contacts after editing
                fetchAllContacts();
                setVisible(false); // Close the modal after editing
               
            } catch (error) {
                console.log(error);
            }
        };





    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };



    return (
        <div>
            <div className='left-div-table'>
                <CTable hover responsive striped>
                    <CTableHead className='c-table-head'>
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col">Contact Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
                            <CTableHeaderCell scope="col"></CTableHeaderCell>
                            <CTableDataCell>

                            </CTableDataCell>
                        </CTableRow>
                    </CTableHead>


                    <CTableBody>
                        {allcontacts && allcontacts.length > 0 ? allcontacts.map((contact, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{contact.contactName}</CTableDataCell>
                                <CTableDataCell>{contact.email}</CTableDataCell>
                                <CTableDataCell>{contact.designation}</CTableDataCell>
                                <CTableDataCell>{contact.department}</CTableDataCell>
                                <CTableDataCell>{contact.mobile}</CTableDataCell>
                                
                                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link onClick={() => handleEdit(index)}>
                                        Edit
                                    </Link>
                                </th>
                                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link className='delete-text-color' onClick={() => handleDelete(index)}>
                                        Delete
                                    </Link>
                                </th>
                            </CTableRow>
                        )) :
                            <CTableRow>
                                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    No contacts found for this branch and for this client
                                </th>
                            </CTableRow>

                        }
                    </CTableBody>



                    <div className='search-button'>
                        <CButton color="success" type="submit" className='contact-add-button' onClick={() => {setVisible(!visible); seteditVisible(false)}}>
                            +
                        </CButton>
                    </div>
                </CTable>
            </div>

            <CModal
                visible={visible}
                onClose={() => { setVisible(false) }}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add New Contact</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <input type="text" name='contactName' placeholder="Contact Name" className='text-field-1' value={contact.contactName} onChange={handleChange} />
                        <input type="text" name='designation' placeholder="Designation" className='text-field-1' value={contact.designation} onChange={handleChange} />
                        <input type="text" name='department' placeholder="Department" className='text-field-1' value={contact.department} onChange={handleChange} />
                        <input type="text" name='mobile' placeholder="Mobile Number" className='text-field-1' value={contact.mobile} onChange={handleChange} />
                        <input type="text" name='email' placeholder="Email ID" className='text-field-1' value={contact.email} onChange={handleChange} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    {
                        editVisible ? <CButton color="primary">Update</CButton>:
                        <CButton color="primary" onClick={handleSubmit}>Add New</CButton>
                    }
                    
                    
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default Contactdetails;
