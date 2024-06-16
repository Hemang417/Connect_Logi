import React from 'react'
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
    CModalFooter, CNav, CNavItem, CNavLink
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

const BankDetails = () => {
    const [visible, setVisible] = useState(false);

    return (
        <CRow>
            <CCardBody className='button-div'>
                <div className='createjob-button'>
                    <svg type="submit" onClick={() => {
                        setVisible(true)
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
                            <CTableHeaderCell scope="col" className='row-font'>Bank Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Account Type</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Bank Account No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>IFSC Code</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Branch Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Cheque Details</CTableHeaderCell>

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
                    <CModalTitle id="LiveDemoExampleLabel">Bank Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <label for="bank-name" className='text-field-3'>Bank Name</label>
                        <input type="text" placeholder="" className='text-field-4' name='bank-name' />
                    </div>
                    <div>
                        <label for="account-type" className='text-field-3'>Account Type</label>
                        <input type="text" placeholder="" className='text-field-4' name='account-type' />
                    </div>
                    <div>
                        <label for="bank-account-no" className='text-field-3'>Bank Account No.</label>
                        <input type="text" placeholder="" className='text-field-4' name='bank-account-no' />
                    </div>
                    <div>
                        <label for="ifsc-code" className='text-field-3'>IFSC Code</label>
                        <input type="text" placeholder="" className='text-field-4' name='ifsc-code' />
                    </div>
                    <div>
                        <label for="branch-name" className='text-field-3'>Branch Name</label>
                        <input type="text" placeholder="" className='text-field-4' name='branch-name' />
                    </div>
                    <div>
                        <label for="cheque-details" className='text-field-3'>Cheque Details</label>
                        <input type="text" placeholder="" className='text-field-4' name='cheque-details' />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" >
                        Add
                    </CButton>
                </CModalFooter>

            </CModal>
        </CRow>
    )
}

export default BankDetails;