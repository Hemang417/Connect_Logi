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

const DoNDelivery = () => {
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
                        <CTableHeaderCell scope="col">Type of Do & Delivery</CTableHeaderCell>
                        <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Plan Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actual Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time Delay</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    <CTableRow>
                        <CTableDataCell>BL Status & Agent Name</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>                        
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>  
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>  
                        <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem href="#">Underprocess</CDropdownItem>
                                    <CDropdownItem href="#">Completed</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>             
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Port/CFS Nomination</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>  
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        

                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Scrutiny</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>                 
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        

                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Original Doc. Received</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>      
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Invoice Received from Shipping Line</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>      
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Payment to Shipping Line</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>    
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Delivery Order</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>    
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem href="#">Underprocess</CDropdownItem>
                                    <CDropdownItem href="#">Completed</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Delivery</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>   
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>                      
                        <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                </CTableBody>
            </CTable>
        </div>
        </div>
    )
}

export default DoNDelivery;
