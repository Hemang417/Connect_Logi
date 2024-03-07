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
        PortCFSNomination: '',
        ChecklistApproval: '',
        ESanchit: '',
        FilingBOE: '',
        Assesment: '',
        DutyCall: '',
        ExaminationOOC: '',
    })



    const [TATstore, setTATstore] = useState();



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
        const fetchAndStoreTAT = async () => {
            try {
                const orgName = localStorage.getItem('orgname');
                const orgCode = localStorage.getItem('orgcode');
                
                if (!orgName || !orgCode) {
                    console.error('Organization name or code not found in localStorage.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/getTATofO2D', {
                    params: {
                        orgname: orgName,
                        orgcode: orgCode,
                        ScrutinyDocument: 'ScrutinyDocument',
                        PortCFSNomination: 'PortCFSNomination',
                        ChecklistApproval: 'ChecklistApproval',
                        ESanchit: 'ESanchit',
                        FilingBOE: 'FilingBOE',
                        Assesment: 'Assesment',
                        DutyCall: 'DutyCall',
                        ExaminationOOC: 'ExaminationOOC'
                    }
                });

                setTATstore(response.data);
                
            } catch (error) {
                console.error('Error fetching or storing TAT data:', error);
            }
        };

        fetchAndStoreTAT();
    }, []);

    // localStorage.setItem('TATstore', JSON.stringify(TATstore));



// const [fetchTAThere, setTAThere] = useState();
// useEffect(() => {
//     const fetchTATfromlocalstorage = async () => {
//         try {
//             const TATofO2D = JSON.parse(localStorage.getItem('TATofO2D'));
            
//             setTAThere(TATofO2D);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     fetchTATfromlocalstorage();
// }, [])




// useEffect(() => {
//     const TATofO2D = JSON.parse(localStorage.getItem('TATofO2D'));
// }, [])

console.log(TATstore);

const formatTAT = (TAT) => {
    const days = parseInt(TAT.days);
    const hours = parseInt(TAT.hours);
    const minutes = parseInt(TAT.minutes);

    let formattedTAT = '';
    if (days > 0) {
        formattedTAT += `${days} d `;
    }
    if (hours > 0) {
        formattedTAT += `${hours} hr `;
    }
    if (minutes > 0) {
        formattedTAT += `${minutes} min`;
    }
    console.log(formattedTAT);
    return formattedTAT.trim();
};


    useEffect(() => {
        fetchUserAccess();
        
    }, []);



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
                            <CTableDataCell></CTableDataCell>
                            <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>


                



                        <CTableRow>
                            <CTableDataCell>Scrutiny Document</CTableDataCell>
                            <CTableDataCell>
                                <input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[0].ScrutinyDocument)}/>
                            </CTableDataCell>
                            <CTableDataCell>
                                <input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
                            </CTableDataCell>
                            <CTableDataCell>
                                <input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
                            </CTableDataCell>
                            <CTableDataCell>
                                <input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
                            </CTableDataCell>
                            <CTableDataCell>
                                <input type="time" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
                            </CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell>
                                <input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
                            </CTableDataCell>
                            </CTableRow>


                        <CTableRow>
                            <CTableDataCell>Port/CFS Nomination</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[1].PortCFSNomination)}/></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="time" placeholder="" className='o2d-field-4' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>









                        <CTableRow>
                            <CTableDataCell>Checklist Approval</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[2].ChecklistApproval)}/></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>

                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>E-Sanchit</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly  value={TATstore && formatTAT(TATstore[3].ESanchit)}/></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Filing BOE</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[4].FilingBOE)}/></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
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
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[5].Assesment)}/></CTableDataCell>
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
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[6].DutyCall)}/></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                            <CTableDataCell readOnly>UnderProcess</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Examination/OOC</CTableDataCell>
                            <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[7].ExaminationOOC)}/></CTableDataCell>
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
