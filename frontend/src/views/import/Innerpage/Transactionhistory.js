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

const Transactionhistory = () => {
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
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Type of Expense</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Reference No.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Cr.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Dr.</CTableHeaderCell>
                        
                    </CTableRow>
                </CTableHead>

                <CTableBody>

                    
                </CTableBody>
            </CTable>
        </div>
        </div>
    )
}

export default Transactionhistory;
