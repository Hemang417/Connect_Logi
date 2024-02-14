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

const O2D = () => {
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
                        <CTableHeaderCell scope="col">Type of O2D</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Plan Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Actual Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time Delay</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    <CTableRow>
                        <CTableDataCell>ETA Follow Up</CTableDataCell>
                        <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>                        
                        <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Scrutiny Document</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        

                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Checklist Approval</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>               
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>               
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell> 
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        

                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>E-Sanchit</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>    
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>    
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Filling BOE</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>  
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>  
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Assesment</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell> 
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell> 
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Duty Call</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>  
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>  
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                    <CTableRow>
                        <CTableDataCell>Examination/OOC</CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell> 
                        <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell> 
                        <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>                        
                        <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>                        
                    </CTableRow>
                </CTableBody>
            </CTable>
        </div>
        </div>
    )
}

export default O2D;
