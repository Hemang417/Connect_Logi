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
                        <CButton color="success" type="submit" className='contact-add-button' onClick={() => setVisible(!visible)}>
                            +
                        </CButton>
                    </div>
                </CTable>
            </div>

            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
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
                    <CButton color="primary" onClick={handleSubmit}>Add New</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default Contactdetails;
