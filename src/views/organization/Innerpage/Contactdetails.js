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
// import createjob from './CreateJob';

const Contactdetails = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false)
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
                    <input type="text" placeholder="Contact Name" className='text-field-1' />
                    <input type="text" placeholder="Designation" className='text-field-1' />
                    <input type="text" placeholder="Department" className='text-field-1' />
                    <input type="text" placeholder="Mobile Number" className='text-field-1' />
                    <input type="text" placeholder="Email ID" className='text-field-1' />
                    </div>
                    
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Add New</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default Contactdetails;
