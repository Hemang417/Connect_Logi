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

const DocumentUpload = () => {
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
                        <CTableHeaderCell scope="col">Type of Document Upload</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Upload</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    <CTableRow>
                        <CTableDataCell>Bill of Entry</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Bill of Lading</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Commerical Invoice</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Packing List</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Insurance</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Delivery Order</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Shipping Line Invoice</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>CFS Invoice</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Stamp Duty</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Custom Duty</CTableDataCell>                                            
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Others</CTableDataCell>                                            
                    </CTableRow>
                    
                </CTableBody>
            </CTable>
        </div>
        </div>
    )
}

export default DocumentUpload;
