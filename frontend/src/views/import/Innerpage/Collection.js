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

            <div className='mb-2'>
                <label for="Credit Days" className='text-field-3'>Credit Days</label>
                <input type="text" placeholder="" className='text-field-4' />
            </div>


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
                                <CDropdownMenu className="text-field-4 overflow-y-scroll">
                                    <CDropdownItem href="#">Vedprakash Mishra</CDropdownItem>
                                    <CDropdownItem href="#">Bhavna Gharat</CDropdownItem>
                                    <CDropdownItem href="#">Vikas Jha</CDropdownItem>
                                    <CDropdownItem href="#">Prince Mishra</CDropdownItem>
                                    <CDropdownItem href="#">Subhash Dhuriya</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CTableRow>
                        <div className='impcollection-search-button'>
                            <CButton color="success" type="submit" className='contact-add-button' onClick={() => setVisible(!visible)}>
                                +
                            </CButton>
                        </div>

                    </CTableBody>
                </CTable>
            </div>

            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add New Bill Details</CModalTitle>
                </CModalHeader>
                <CModalBody >
                    <div>
                        {/* <label for="Date" className='impcollection-txt-field'>Date</label> */}
                        <input type="date" placeholder="" className='text-field-1' />
                    </div>
                    <div>
                        {/* <label for="Bill No." className='impcollection-txt-field'>Bill No.</label> */}
                        <input type="text" placeholder="Bill No." className='text-field-1' />
                    </div>
                    <div>
                        {/* <label for="Branch Name" className='impcollection-txt-field'>Branch Name</label> */}
                        <input type="text" placeholder="Branch Name" className='text-field-1' />
                    </div>
                    <div>
                        {/* <label for="Amount" className='impcollection-txt-field'>Amount</label> */}
                        <input type="text" placeholder="Amount" className='text-field-1' />
                    </div>
                    <div>
                        {/* <label for="Tax" className='impcollection-txt-field'>Tax</label> */}
                        <input type="text" placeholder="Tax" className='text-field-1' />
                    </div>
                    <div>
                        {/* <label for="Grand Total" className='impcollection-txt-field'>Grand Total</label> */}
                        <input type="text" placeholder="Grand Total" className='text-field-1' />
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

export default Collection;
