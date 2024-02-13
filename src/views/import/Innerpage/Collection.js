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

const Collection = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false)
    return (
        <div>
                <label for="Credit Days" className='text-field-3'>Credit Days</label>
            <input type="text" placeholder="" className='text-field-4' />
        <div className='left-div-table'>
            <CTable hover responsive striped>
                <CTableHead className='c-table-head'>
                    <CTableRow color='dark'>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Bill No.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                        <CTableHeaderCell scope="col">TAX</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Grand Total</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Follow Up 1</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Follow Up 2</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Follow Up 3</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time Delay</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Assign To</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    <CTableRow>
                        <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>        
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Vedprakash Mishra</CDropdownItem>
                                <CDropdownItem href="#">Bhavna Gharat</CDropdownItem>
                                <CDropdownItem href="#">Vikas Jha</CDropdownItem>
                                <CDropdownItem href="#">Prince Mishra</CDropdownItem>
                                <CDropdownItem href="#">Subhash Dhuriya</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>                      
                    </CTableRow>
                    
                </CTableBody>
            </CTable>
        </div>
        </div>
    )
}

export default Collection;
