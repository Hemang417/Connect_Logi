import React, { useEffect, useState } from 'react';
import {
    CCardBody,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CButton,
    CForm, CTableDataCell
} from '@coreui/react';
import '../../css/styles.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const BankDetails = () => {
    const [branchlist, setBranchlist] = useState([]);
    const [visible, setVisible] = useState(false);
    const [allbankdetails, setAllBankdetails] = useState([]);
    // const [isEdit, setisEdit] = useState(false);
    const [bankdetails, setBankdetails] = useState({
        bankname: '',
        accounttype: '',
        bankaccountno: '',
        ifsc: '',
        branchname: '',
        branchcode: '',
        closingBalance: ''
    });

    const navigate = useNavigate();

    const getbankdetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getbankdetails', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            })
            setAllBankdetails(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getbankdetails();
    }, [])

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('userauthtoken');
            if (!token) {
                navigate('/login');
            }
        };
        checkToken();
    }, [navigate]);

    useEffect(() => {
        const getBranches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getbranchesforacc', {
                    params: {
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode')
                    }
                });
                setBranchlist(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getBranches();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBankdetails({
            ...bankdetails,
            [name]: value
        });
    };

    const handleDropdownChange = (selectedItem) => {
        setBankdetails({
            ...bankdetails,
            accounttype: selectedItem
        });
    };

    const handleAddBankDetails = async () => {

        let regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/)
        if (bankdetails.ifsc === null || bankdetails.ifsc === '') {
            alert('Please enter a valid IFSC Code');
            setBankdetails({
                bankname: '',
                accounttype: '',
                bankaccountno: '',
                ifsc: '',
                branchname: '',
                branchcode: '',
                closingBalance: ''
            });
            return;
        }

        if (!regex.test(bankdetails.ifsc)) {
            alert('Invalid IFSC Code format');
            setBankdetails({
                bankname: '',
                accounttype: '',
                bankaccountno: '',
                ifsc: '',
                branchname: '',
                branchcode: '',
                closingBalance: ''
            });
            return;
        }
        try {

            const response = await axios.post('http://localhost:5000/addbankdetails', {
                ...bankdetails,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });


            if (response.status === 200) {
                toast.success('Bank details added successfully');
                getbankdetails();
                setBankdetails({
                    bankname: '',
                    accounttype: '',
                    bankaccountno: '',
                    ifsc: '',
                    branchname: '',
                    branchcode: '',
                    closingBalance: ''
                });
            }
            setVisible(false); // Close modal after adding
        } catch (error) {
            console.log(error);
        }
    };


    async function handleDelete(bank) {

        const response = await axios.delete('http://localhost:5000/deletebankdetails', {
            data: {
                branchcode: bank.ownbranchcode,
                accountnum: bank.accountnum,
                ifscCode: bank.ifscCode,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            }
        });

        if (response.status === 200) {
            toast.success('Bank details deleted successfully');
            getbankdetails();
        }
    }

    const handleModalClose = async () => {
        setVisible(false);
        // setisEdit(false);
        setBankdetails({
            bankname: '',
            accounttype: '',
            bankaccountno: '',
            ifsc: '',
            branchname: '',
            branchcode: '',
            closingBalance: '',
        });
    }

    // const handleEdit = async (bank) => {
    //     setisEdit(true);
    //     setBankdetails({
    //         bankname: bank.bankname,
    //         accounttype: bank.accountype,
    //         bankaccountno: bank.accountnum,
    //         ifsc: bank.ifscCode,
    //         branchname: bank.ownbranchname,
    //         branchcode: bank.ownbranchcode
    //     });
    //     setVisible(true);
    // }

    return (
        <CRow>
            <CCardBody className='button-div'>
                <div className='createjob-button'>
                    <svg type="button" onClick={() => setVisible(true)} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                    </svg>
                </div>
                <div className='createjob-button'>
                    <CButton color="primary" type="button">
                        <img src='../../importIcons/delete.png' alt="Delete" />
                    </CButton>
                </div>
                <div className='createjob-button'>
                    <CButton color="primary" type="button">
                        <img src='../../importIcons/refresh.png' width="10px" height="10px" alt="Refresh" />
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
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Bank Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Account Type</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Bank Account No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>IFSC Code</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Branch Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Cheque Details</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Operations</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    {
                        allbankdetails?.map((bank, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableHeaderCell scope="row" className='row-font'></CTableHeaderCell>
                                    <CTableDataCell >{bank.bankname}</CTableDataCell>
                                    <CTableDataCell >{bank.accountype}</CTableDataCell>
                                    <CTableDataCell >{bank.accountnum}</CTableDataCell>
                                    <CTableDataCell >{bank.ifscCode}</CTableDataCell>
                                    <CTableDataCell >{bank.ownbranchname}</CTableDataCell>
                                    <CTableDataCell >NA</CTableDataCell>
                                    <CButton onClick={() => handleDelete(bank)}>Delete</CButton>
{/* 
                                    <CButton onClick={() => handleEdit(bank)}>Edit</CButton> */}
                                </CTableRow>
                            )
                        })
                    }
                </CTable>

            </CForm >
            <CModal
                visible={visible}
                onClose={handleModalClose}
                aria-labelledby="LiveDemoExampleLabel"
                size="xl"
            >
                <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">Bank Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <label htmlFor="bankname" className='text-field-3'>Bank Name</label>
                        <input type="text" placeholder="" className='text-field-4' name='bankname' value={bankdetails.bankname} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="accounttype" className='text-field-3'>Account Type</label>
                        <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>
                                {bankdetails.accounttype || 'Select'}
                            </CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem onClick={() => handleDropdownChange('Savings')}>Savings</CDropdownItem>
                                <CDropdownItem onClick={() => handleDropdownChange('Current')}>Current</CDropdownItem>
                                <CDropdownItem onClick={() => handleDropdownChange('Cash Credit')}>Cash Credit</CDropdownItem>
                                <CDropdownItem onClick={() => handleDropdownChange('Fixed Deposit')}>Fixed Deposit</CDropdownItem>
                                <CDropdownItem onClick={() => handleDropdownChange('Recurring Deposit')}>Recurring Deposit</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                    <div>
                        <label htmlFor="bankaccountno" className='text-field-3'>Bank Account No.</label>
                        <input type="text" placeholder="" className='text-field-4' name='bankaccountno' value={bankdetails.bankaccountno} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="ifsc" className='text-field-3'>IFSC Code</label>
                        <input type="text" placeholder="" className='text-field-4' name='ifsc' value={bankdetails.ifsc} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="branchname" className='text-field-3'>Branch Name</label>
                        <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>
                                {bankdetails.branchname || 'Select'}
                            </CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                {branchlist.map((branch, index) => (
                                    <CDropdownItem key={index} onClick={() => setBankdetails({ ...bankdetails, branchname: branch.ownbranchname, branchcode: branch.branchcode })}>
                                        {branch.ownbranchname}
                                    </CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                    <div>
                        <label htmlFor="closingBalance" className='text-field-3'>Closing Balance</label>
                        <input type="text" placeholder="" className='text-field-4' name='closingBalance' value={bankdetails.closingBalance} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="chequedetails" className='text-field-3'>Cheque Details</label>
                        <input type="text" placeholder="" className='text-field-4' name='chequedetails' onChange={handleInputChange} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleAddBankDetails}>
                        Add
                    </CButton>

                </CModalFooter>
            </CModal>
        </CRow >
    );
}

export default BankDetails;
