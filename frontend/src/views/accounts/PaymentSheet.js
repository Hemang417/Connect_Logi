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
    CDropdownItem,
    CFormInput,
    CFormLabel,
    CForm,
    CButton,
    CPopover,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const PaymentSheet = () => {
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [organization, setOrganization] = useState([]);

    useEffect(() => {
        const checkToken = async () => {
          const token = Cookies.get('userauthtoken');
          if (token) {
            // Token exists, redirect to dashboard
            navigate('/dashboard');
          }else{
            navigate('/login')
          }
        };
        checkToken();
      }, []);


    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');

    if (location.pathname == '/organization') {
        localStorage.removeItem('updateBtn');
        localStorage.removeItem('clientname');
        localStorage.removeItem('branchnames');
        localStorage.removeItem('organizationclientname');
        localStorage.removeItem('firstorgofclient');
        localStorage.removeItem('isEditing');
        localStorage.removeItem('branchDataforprefill');
        localStorage.removeItem('alias');
        localStorage.removeItem('organizationbranches');
        localStorage.removeItem('uniquevalue')
    }

    useEffect(() => {
        const renderOverview = async () => {
            try {
                const nameoforg = localStorage.getItem('orgname');
                const codeoforg = localStorage.getItem('orgcode');

                const response = await axios.get('http://localhost:5000/getOrg', {
                    params: {
                        orgname: nameoforg,
                        orgcode: codeoforg
                    }
                });

                setOrganization(response.data);
            } catch (error) {
                console.log("Error: " + error);
            }
        }
        renderOverview();
    }, [])






    const prefillData = (org) => {
        try {
            localStorage.setItem('alias', org.alias);
            localStorage.setItem('organizationbranches', JSON.stringify(org.branches));
            localStorage.setItem('organizationclientname', org.clientname);
            localStorage.setItem('firstorgofclient', JSON.stringify(org.branches[0]));
            localStorage.setItem('updateBtn', true);
            localStorage.setItem('isEditing', true);
            localStorage.setItem('uniquevalue', 'OrgButton')
        } catch (error) {
            toast.error(error);
            console.log("Error: " + error);
        }
    };




    function removeLocal() {
        toast.success('Create new client now')
        localStorage.setItem('updateBtn', false);
        localStorage.removeItem('clientname');
        localStorage.removeItem('alias');
        localStorage.removeItem('branchname');
        localStorage.removeItem('selectedBranchName');
        localStorage.removeItem('isEditing');
        localStorage.setItem('uniquevalue', 'OrgButton')
    }






    const handleSearch = async () => {
        // Check if there is a search value
        if (searchValue.trim() !== '') {
            // Filter organizations based on searchValue
            const filteredOrg = organization.filter(org => {
                const clientname = org.clientname.toLowerCase();
                const alias = org.alias.toLowerCase();
                const searchTerm = searchValue.toLowerCase();
                return clientname.includes(searchTerm) || alias.includes(searchTerm);
            });

            setOrganization(filteredOrg);
        } else {
            // If no search value, display all organizations again
            const nameoforg = localStorage.getItem('orgname');
            const codeoforg = localStorage.getItem('orgcode');

            try {
                const response = await axios.get('http://localhost:5000/getOrg', {
                    params: {
                        orgname: nameoforg,
                        orgcode: codeoforg
                    }
                });
                setOrganization(response.data);
            } catch (error) {
                console.log("Error: " + error);
            }
        }
    };






    return (
        // JOB SEARCH - DROPDOWN & TEXT FIELD
        <CRow>
            <CCardBody className='button-div'>
                <div className='createjob-button'>
                    <svg type="submit" onClick={() => {
                        setVisible (true)
                    }} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                    </svg>
                </div>
                <div className='createjob-button'>
                    <CButton color="primary" type="submit">
                        <img src='../../importIcons/delete.png' />
                    </CButton>
                </div>
                <div className='createjob-button'>
                    <CButton color="primary" type="submit">
                        <img src='../../importIcons/refresh.png' width="10px" height="10px" />
                    </CButton>
                </div>
                <div className='createjob-button'>
                    <CButton className="btn btn-primary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon" role="img" aria-hidden="true">
                            <polygon fill="var(--ci-primary-color, currentColor)" points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" className="ci-primary">
                            </polygon><path fill="var(--ci-primary-color, currentColor)" d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z" className="ci-primary"></path>
                        </svg>
                        <span className="visually-hidden">Download file</span>
                    </CButton>
                </div>

            </CCardBody>


            <CForm className='form-import'>
                <CTable hover borderless className='table-import'>
                    <CTableHead className='head-import'>
                        <CTableRow color='dark' >
                            <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Payment Details</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Type of Expense</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Taxable Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>GST Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Total Invoice Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>TDS Deduction Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Net Payment Amount</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Job No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Customer Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>UTR Details</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Remarks</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Bank Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Purchase No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>

                        </CTableRow>

                    </CTableHead>
                </CTable>
            </CForm>

            <CModal
                visible={visible}
                // onClose={handleModalClose}
                aria-labelledby="LiveDemoExampleLabel"
                size="xl"
            >
                <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">Make Payment Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <label htmlFor="Payment Details">Date</label>
                    <input type="date" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Payment Details</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Type of Expense</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Taxable Amount</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">GST Amount</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Total Invoice Amount</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">TDS Deduction Amount</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Net Payment Amount</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Job No.</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Customer Name</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">UTR Details</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Remarks</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Bank Name</label>
                    <input type="text" placeholder=""/>
                    
                    <label htmlFor="Payment Details">Purchase No.</label>
                    <input type="text" placeholder=""/>
                </CModalBody>
                <CModalFooter>
                    <CPopover content="Close the modal" trigger={['hover', 'focus']}>
                        <CButton color="secondary" >
                            Close
                        </CButton>
                    </CPopover>

                    {/* {
                            editRoleId ?
                                <CPopover content="Update the Role" trigger={['hover', 'focus']}>
                                    <CButton color="primary" >
                                        Update
                                    </CButton>
                                </CPopover>
                                :
                                <CPopover content="Add the user role" trigger={['hover', 'focus']}>
                                    <CButton color="primary" >
                                        Add
                                    </CButton>
                                </CPopover>
                        } */}
                </CModalFooter>
            </CModal>

        </CRow>


    )
}

export default PaymentSheet;