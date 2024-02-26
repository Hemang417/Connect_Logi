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
import axios from 'axios'
// import createjob from './CreateJob';

const O2D = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);


    const [dataAccess, setDataAccess] = useState({
        ETAFollowUp: '',
        ScrutinyDocument: '',
        ChecklistApproval: '',
        ESanchit: '',
        FillingBOE: '',
        Assesment: '',
        DutyCall: '',
        ExaminationOOC: '',
    })







    const fetchUserAccess = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get(`http://localhost:5000/getUserAccess`, {
                params: {
                    username: username
                }
            });

            const newState = {};
            response.data.forEach(item => {
                newState[item.rowname] = item.value;
            });

            setDataAccess(newState);


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserAccess();
    }, []);






    console.log(dataAccess);



    return (
        <div>
            <div className='left-div-table'>
                <CTable hover responsive striped>
                    <CTableHead className='c-table-head'>

                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col">Type of O2D</CTableHeaderCell>
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
                            <CTableDataCell>ETA Follow Up</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>


                        {/* {dataAccess.ScrutinyDocument == 'ScrutinyDocument' && (
                            <CTableRow>
                                <CTableDataCell>Scrutiny Document</CTableDataCell>
                                <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
                                <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                                <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
                                <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
                                <CTableDataCell><input type="time" placeholder="" className='o2d-field-4' /></CTableDataCell>
                                <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
                            </CTableRow>
                        )} */}



                        <CTableRow>
                            <CTableDataCell>Scrutiny Document</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="time" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>




                        <CTableRow>
                            <CTableDataCell>Checklist Approval</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>

                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>E-Sanchit</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Filling BOE</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem href="#">Underprocess</CDropdownItem>
                                    <CDropdownItem href="#">Completed</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Assesment</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem href="#">Underprocess</CDropdownItem>
                                    <CDropdownItem href="#">Completed</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Duty Call</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Examination/OOC</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem href="#">Underprocess</CDropdownItem>
                                    <CDropdownItem href="#">Completed</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>
        </div>
    )
}

export default O2D;
