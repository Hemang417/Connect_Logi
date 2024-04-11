// import React, { useEffect } from 'react'
// import {
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableCaption,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//     CDropdown,
//     CDropdownToggle,
//     CDropdownMenu,
//     CDropdownDivider,
//     CDropdownHeader,
//     CDropdownItem,
//     CFormInput,
//     CFormLabel,
//     CForm,
//     CButton,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
//     CNavItem,
//     CNav,
//     CNavLink
// } from '@coreui/react'
// import { CChart } from '@coreui/react-chartjs'
// import '../../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'
// // import createjob from './CreateJob';

// const O2D = () => {
//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const [visible, setVisible] = useState(false);


//     const [dataAccess, setDataAccess] = useState({
//         ETAFollowUp: '',
//         ScrutinyDocument: '',
//         PortCFSNomination: '',
//         ChecklistApproval: '',
//         ESanchit: '',
//         FilingBOE: '',
//         Assesment: '',
//         DutyCall: '',
//         ExaminationOOC: '',
//     })



//     const [TATstore, setTATstore] = useState();



//     const fetchUserAccess = async () => {
//         try {
//             const username = localStorage.getItem('username');
//             const response = await axios.get(`http://localhost:5000/getUserAccess`, {
//                 params: {
//                     username: username
//                 }
//             });

//             const newState = {};
//             response.data.forEach(item => {
//                 newState[item.rowname] = item.value;
//             });

//             setDataAccess(newState);


//         } catch (error) {
//             console.log(error);
//         }
//     };


//     useEffect(() => {
//         const fetchAndStoreTAT = async () => {
//             try {
//                 const orgName = localStorage.getItem('orgname');
//                 const orgCode = localStorage.getItem('orgcode');

//                 if (!orgName || !orgCode) {
//                     console.error('Organization name or code not found in localStorage.');
//                     return;
//                 }

//                 const response = await axios.get('http://localhost:5000/getTATofO2D', {
//                     params: {
//                         orgname: orgName,
//                         orgcode: orgCode,
//                         ScrutinyDocument: 'ScrutinyDocument',
//                         PortCFSNomination: 'PortCFSNomination',
//                         ChecklistApproval: 'ChecklistApproval',
//                         ESanchit: 'ESanchit',
//                         FilingBOE: 'FilingBOE',
//                         Assesment: 'Assesment',
//                         DutyCall: 'DutyCall',
//                         ExaminationOOC: 'ExaminationOOC'
//                     }
//                 });

//                 setTATstore(response.data);

//             } catch (error) {
//                 console.error('Error fetching or storing TAT data:', error);
//             }
//         };

//         fetchAndStoreTAT();
//     }, []);

//     // localStorage.setItem('TATstore', JSON.stringify(TATstore));



// // const [fetchTAThere, setTAThere] = useState();
// // useEffect(() => {
// //     const fetchTATfromlocalstorage = async () => {
// //         try {
// //             const TATofO2D = JSON.parse(localStorage.getItem('TATofO2D'));

// //             setTAThere(TATofO2D);
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     }
// //     fetchTATfromlocalstorage();
// // }, [])




// // useEffect(() => {
// //     const TATofO2D = JSON.parse(localStorage.getItem('TATofO2D'));
// // }, [])

// console.log(TATstore);

// const formatTAT = (TAT) => {
//     const days = parseInt(TAT.days);
//     const hours = parseInt(TAT.hours);
//     const minutes = parseInt(TAT.minutes);

//     let formattedTAT = '';
//     if (days > 0) {
//         formattedTAT += `${days} d `;
//     }
//     if (hours > 0) {
//         formattedTAT += `${hours} hr `;
//     }
//     if (minutes > 0) {
//         formattedTAT += `${minutes} min`;
//     }
//     console.log(formattedTAT);
//     return formattedTAT.trim();
// };


//     useEffect(() => {
//         fetchUserAccess();

//     }, []);



//     return (
//         <div>
//             <div className='left-div-table'>
//                 <CTable hover responsive striped>
//                     <CTableHead className='c-table-head'>

//                         <CTableRow color='dark'>
//                             <CTableHeaderCell scope="col">Type of O2D</CTableHeaderCell>
//                             <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
//                             <CTableHeaderCell scope="col">Plan Date</CTableHeaderCell>
//                             <CTableHeaderCell scope="col">Actual Date</CTableHeaderCell>
//                             <CTableHeaderCell scope="col"></CTableHeaderCell>
//                             <CTableHeaderCell scope="col">Time Delay</CTableHeaderCell>
//                             <CTableHeaderCell scope="col">Status</CTableHeaderCell>
//                             <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
//                         </CTableRow>


//                     </CTableHead>

//                     <CTableBody>

//                         <CTableRow>
//                             <CTableDataCell>ETA Follow Up</CTableDataCell>
//                             <CTableDataCell></CTableDataCell>
//                             <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="date" placeholder="" className='o2d-field-4 date-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ETAFollowUp == 'ETAFollowUp' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>






//                         <CTableRow>
//                             <CTableDataCell>Scrutiny Document</CTableDataCell>
//                             <CTableDataCell>
//                                 <input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[0].ScrutinyDocument)}/>
//                             </CTableDataCell>
//                             <CTableDataCell>
//                                 <input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
//                             </CTableDataCell>
//                             <CTableDataCell>
//                                 <input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
//                             </CTableDataCell>
//                             <CTableDataCell>
//                                 <input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
//                             </CTableDataCell>
//                             <CTableDataCell>
//                                 <input type="time" placeholder="" className='o2d-field-4' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
//                             </CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell>
//                                 <input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ScrutinyDocument == 'ScrutinyDocument' ? visible : !visible} />
//                             </CTableDataCell>
//                             </CTableRow>


//                         <CTableRow>
//                             <CTableDataCell>Port/CFS Nomination</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[1].PortCFSNomination)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="time" placeholder="" className='o2d-field-4' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.PortCFSNomination == 'PortCFSNomination' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>









//                         <CTableRow>
//                             <CTableDataCell>Checklist Approval</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[2].ChecklistApproval)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ChecklistApproval == 'CheckListApproval' ? visible : !visible} /></CTableDataCell>

//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>E-Sanchit</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly  value={TATstore && formatTAT(TATstore[3].ESanchit)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ESanchit == 'ESanchit' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Filing BOE</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[4].FilingBOE)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.FilingBOE == 'FilingBOE' ? visible : !visible} /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Underprocess</CDropdownItem>
//                                     <CDropdownItem href="#">Completed</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.FillingBOE == 'FillingBOE' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Assesment</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[5].Assesment)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Underprocess</CDropdownItem>
//                                     <CDropdownItem href="#">Completed</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.Assesment == 'Assesment' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Duty Call</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[6].DutyCall)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.DutyCall == 'DutyCall' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Examination/OOC</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={TATstore && formatTAT(TATstore[7].ExaminationOOC)}/></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Underprocess</CDropdownItem>
//                                     <CDropdownItem href="#">Completed</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' readOnly={dataAccess.ExaminationOOC == 'ExaminationOOC' ? visible : !visible} /></CTableDataCell>
//                         </CTableRow>
//                     </CTableBody>
//                 </CTable>
//             </div>
//         </div>
//     )
// }

// export default O2D;












import React, { useEffect, useState, useRef } from 'react'
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
import { Link } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const O2D = () => {
    const currentdateandtime = moment().format('YYYY-MM-DDTHH:mm');
    const [visible, setvisible] = useState(false);
    const [allo2dData, setallo2dData] = useState([]);
    const [allaccessofuser, setallaccessofuser] = useState([]);
    const navigate = useNavigate();
    const [underprocessedRows, setunderprocessedRows] = useState([]);
    const [highestUnderprocessId, setHighestUnderprocessId] = useState(null);


    async function fetchUnderprocess() {
        try {

            const underprocessrow = await axios.get('http://localhost:5000/findunderprocess', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    status: 'Underprocess',
                    jobNumber: localStorage.getItem('jobNumber')
                }
            });

            setunderprocessedRows(underprocessrow.data[0]);

        } catch (error) {
            console.log(error);
        }
    }


    const fetchAllO2Drows = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getAllO2D', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            });

            const updatedData = response.data.map(item => ({
                ...item,
                remarks: '',
                status: 'Underprocess'
            }));

            setallo2dData(updatedData);
        } catch (error) {
            console.log(error);
        }
    }


    const handleAccess = async () => {
        // Access the username at the specified index in the allData state
        const username = localStorage.getItem('username');
        const response = await axios.get('http://localhost:5000/getUseraccessforuser', {
            params: {
                username: username
            }
        });
        setallaccessofuser(response.data);

    };


    const fetchO2DData = async () => {
        try {
            // Fetch data from o2dtat
            const responseTat = await axios.get('http://localhost:5000/getAllO2D', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            });

            // Fetch data from o2dimport only if it's an edit mode
            if (localStorage.getItem('onEdit') === 'true') {
                const responseImport = await axios.get('http://localhost:5000/getO2Dimport', {
                    params: {
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode'),
                        jobNumber: localStorage.getItem('jobNumber')
                    }
                });
                // Combine the data from both sources
                const combinedData = responseTat.data.map(tatItem => {
                    const matchingImportItem = responseImport.data.find(importItem => importItem.tatimpcolumn === tatItem.tatimpcolumn);
                    return matchingImportItem ? matchingImportItem : tatItem;
                });

                // Set the fetched data to the state
                setallo2dData(combinedData.map((item, index) => ({
                    ...item,
                    planDate: index === 0 && item.planDate ? item.planDate : calculatePlanDate(item, localStorage.getItem('jobDate'), index),
                })));

            } else {
                // If it's not an edit mode, only set the data from o2dtat to the state
                setallo2dData(responseTat.data.map((item, index) => ({
                    ...item,
                    remarks: '',
                    planDate: calculatePlanDate(item, localStorage.getItem('jobDate'), index)
                })));
            }
        } catch (error) {
            console.log(error);
        }
    };


    const formatTAT = (TAT, index) => {
        const days = parseInt(TAT.days);
        const hours = parseInt(TAT.hours);
        const minutes = parseInt(TAT.minutes);

        let formattedTAT = '';
        if (days > 0 || days < 0) {
            formattedTAT += `${days} d `;
        }
        if (hours > 0) {
            formattedTAT += `${hours} hr `;
        }
        if (minutes > 0) {
            formattedTAT += `${minutes} min`;
        }
        allo2dData[index].tat = formattedTAT.trim();
        return formattedTAT.trim();
    };

    const [underprocessId, setUnderprocessId] = useState(null);

    // Function to handle the selection of dropdown items and update the 'Underprocess' row id
    const handleDropdownItemClick = async (id, status) => {
        if (status === 'Underprocess') {
            setUnderprocessId(id);
            setHighestUnderprocessId(id);
            const obj = allo2dData.find(item => item.id === id);
            const tatimpcolumn = obj.tatimpcolumn;
            const planDate = obj.planDate;
            const response = await axios.post('http://localhost:5000/insertUnderprocess', {
                username: localStorage.getItem('username'),
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                jobNumber: localStorage.getItem('jobNumber'),
                rowname: tatimpcolumn,
                status: 'Underprocess',
                tat: obj.tat,
                planDate: planDate
            })

        } else {
            setUnderprocessId(null);

        }

    };



    const isEditable = (rowItem, index) => {
        try {
            if (localStorage.getItem('username') === 'admin') {
                return false; // Admin has full access
            }
            // else if (index === 0) {
            //     const hasAccess = allaccessofuser.find(accessrow => accessrow.value === rowItem.tatimpcolumn);
            //     // Return true if the user has access, otherwise keep the current row read-only
            //     return !hasAccess;
            // }
            // else if (index === 1) {
            //     const hasAccess = allaccessofuser.find(accessrow => accessrow.value === rowItem.tatimpcolumn);
            //     // Return true if the user has access, otherwise keep the current row read-only
            //     return !hasAccess;
            // }
            else {

                // const previousRow = allo2dData[index - 1];
                // const previousRowStatus = previousRow.status;
                // if (previousRowStatus === 'Completed') {
                //     console.log(previousRow);
                // Previous row is completed, so check for access control
                const hasAccess = allaccessofuser.find(accessrow => accessrow.value === rowItem.tatimpcolumn);
                // Return true if the user has access, otherwise keep the current row read-only
                return !hasAccess;
                // } else {
                //     // Previous row is not completed, so make the current row read-only
                //     return true;
                // }
            }
        } catch (error) {
            console.log(error);
            return false; // Return false in case of any error
        }
    }



    // const isEditable = (rowItem) => {
    //     if (localStorage.getItem('username') === 'admin') {
    //         return false; // Admin has full access
    //     } else if (underprocessedRows && underprocessedRows.status === "Underprocess") {
    //         // const id = allo2dData.find(item => item.tatimpcolumn === underprocessedRows.tatimpcolumn);
    //         const underprocessRowIndex = allo2dData.findIndex(item => item.tatimpcolumn === underprocessedRows.tatimpcolumn);
    //         const jobdoneby = underprocessedRows.jobdoneby;
    //         if (localStorage.getItem('username') === jobdoneby) {
    //             return allo2dData.indexOf(rowItem) !== underprocessRowIndex;
    //         } else {
    //             return true;
    //         }

    //     }
    //     else {
    //         // No "Underprocess" row, check user access for editing based on your logic
    //         const hasAccess = allaccessofuser.find(accessrow => accessrow.value === rowItem.tatimpcolumn);
    //         // Return true if the row has access, otherwise return false to make it read-only
    //         return !hasAccess;
    //     }
    // };
    const [plannedDate, setplannedDate] = useState(null);

    // const [planDate, setplanDate] = useState(null);
    let ETAPlanDate = null;
    let checklistplanDate = null;
    let fillingBOEplanDate = null;
    const calculatePlanDate = (TAT, jobDate, rowIndex) => {

        const { days, hours, minutes, id } = TAT;

        let planDateTime;

        // Initialize planDateTime with previousPlanDate if it exists; otherwise, use jobDate
        // if (previousPlanDate) {
        //     planDateTime = moment(previousPlanDate).toDate();
        // } else {
        planDateTime = moment(jobDate).toDate();
        // }


        if (rowIndex === 6) {
            planDateTime = moment(fillingBOEplanDate).toDate();
        }

        if (rowIndex === 7) {
            planDateTime = moment(ETAPlanDate).toDate();
        }
        if (rowIndex === 8) {
            planDateTime = moment(ETAPlanDate).toDate();
        }
        if (rowIndex === 4) {
            planDateTime = moment(checklistplanDate).toDate();
        }
        // Add days, hours, and minutes to the planDateTime
        if (days) {
            planDateTime.setDate(planDateTime.getDate() + parseInt(days));
        }
        if (hours) {
            planDateTime.setHours(planDateTime.getHours() + parseInt(hours));
        }
        if (minutes) {
            planDateTime.setMinutes(planDateTime.getMinutes() + parseInt(minutes));
        }

        // Check if the planDateTime is a Sunday and adjust accordingly
        if (planDateTime.getDay() === 0) {
            planDateTime.setDate(planDateTime.getDate() + 1); // If Sunday, add one more day (24 hours)
        }

        // let formatteddate = moment(planDateTime).format('YYYY-MM-DDTHH:mm')
        if (rowIndex === 3) {
            checklistplanDate = planDateTime
        }

        if (rowIndex === 5) {
            fillingBOEplanDate = planDateTime
        }

        // if(rowIndex === 6){
        //     ETAPlanDate = planDateTime
        // }
        if (rowIndex === 0) {
            if (TAT.plandate) {
                ETAPlanDate = moment(TAT.plandate).format('YYYY-MM-DDTHH:mm');
                return ETAPlanDate;
            } else {
                return null;
            }
        }
        // previousPlanDate = planDateTime;
        return moment(planDateTime).format('YYYY-MM-DDTHH:mm'); // Return the formatted date for the current row
    };


    const handleCheckboxChange = async (index) => {
        const newData = [...allo2dData];
        const isChecked = newData[index].status === 'Completed';

        if (isChecked) {
            // If the checkbox was checked, remove the status, actual date, and time delay
            try {
                newData[index].status = '';
                newData[index].actualdate = '';
                newData[index].timedelay = '';
                // Update the state with the modified data
                setallo2dData(newData); // Log the updated state
                localStorage.setItem('tatimpcolumn', newData[index].tatimpcolumn)
                // Send a request to update the backend
                await axios.delete(`http://localhost:5000/deletefromO2Dtable`, {
                    data: {
                        tatimpcolumn: newData[index].tatimpcolumn,
                        jobNumber: localStorage.getItem('jobNumber'),
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode'),
                    }
                });
            } catch (error) {
                console.log(error);
            }

        }
        else {
            newData[index].actualdate = moment().format('YYYY-MM-DDTHH:mm');
            newData[index].status = 'Completed';
            // Convert actualDate and planDate to Date objects
            const actualDate = new Date(newData[index].actualdate);
            const planDate = new Date(newData[index].planDate);
            // Calculate the difference in milliseconds
            const timeDifference = actualDate - planDate;

            // Convert milliseconds to hours, minutes, and seconds
            const hours = Math.floor((timeDifference) / (1000 * 60 * 60));
            const minutes = Math.floor(((timeDifference) % (1000 * 60 * 60)) / (1000 * 60));
            // Store the time delay in the format HH:mm
            newData[index].timedelay = `${hours} hr ${minutes} min`;
            
            setallo2dData(newData);
            try {
                // Send a request to update the backend
                const responseofinsert = await axios.post('http://localhost:5000/insertO2D', {
                    planDate: newData[index].planDate,
                    actualDate: newData[index].actualdate,
                    timedelay: newData[index].timedelay,
                    status: newData[index].status,
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    jobnumber: localStorage.getItem('jobNumber'),
                    jobdoneby: localStorage.getItem('username'),
                    tatimpcolumn: newData[index].tatimpcolumn,
                    tat: newData[index].tat
                });
                console.log(responseofinsert);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }


    async function storeRemark(e) {
        e.preventDefault();
        try {
            const remarksData = allo2dData.map(item => ({
                tatimpcolumn: item.tatimpcolumn,
                remarks: item.remarks
            }));

            const response = await axios.put('http://localhost:5000/insertRemarks', {
                remarkskaData: remarksData,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                jobnumber: localStorage.getItem('jobNumber')
            });
            window.close();
            navigate('#/import');

        } catch (error) {
            console.log(error);
        }
    }


    const handleRemarksChange = (e, index) => {
        // Get the value of remarks entered by the user
        const remarksValue = e.target.value;
        const newData = [...allo2dData];
        newData[index].remarks = remarksValue; // Update remarks property of the corresponding row
        setallo2dData(newData);
    };

    const [etaplanneddate, setetaplanneddate] = useState();

    useEffect(() => {

        fetchUnderprocess();
        fetchAllO2Drows();
        handleAccess();
        fetchO2DData();

    }, [etaplanneddate]);


    function getColor(timeDelay) {
        let color;
        let sign;

        if (timeDelay < 0) {
            color = 'green'; // Early completion color

        } else {
            color = 'red'; // Late completion color

        }

        // Return an object containing the color and the sign
        return color;
    }

    return (
        <div>
            <div className='left-div-table'>
                <CTable striped responsive hover>
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
                        {allo2dData && allo2dData.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{item.tatimpcolumn}</CTableDataCell>
                                <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={item.tat ? item.tat : formatTAT(item, index)} /></CTableDataCell>
                                <CTableDataCell>
                                    <input
                                        type="datetime-local"
                                        placeholder=""
                                        className='o2d-field-4'
                                        value={(index === 0 && isEditable(item, index)) ? item.planDate : item.planDate}
                                        readOnly={((index === 0 && isEditable(item, index)) || index !== 0)}
                                        onChange={async (e) => {
                                            const newValue = e.target.value;
                                            setetaplanneddate(e.target.value);
                                            if (index === 0 && isEditable(item, index)) {
                                                setplannedDate(newValue); // Set the planDate for the first row if editable
                                            } else {
                                                const updatedData = [...allo2dData]; // Create a copy of the allo2dData array
                                                updatedData[index].planDate = newValue; // Update the planDate for the row
                                                setallo2dData(updatedData); // Update the state with the modified data
                                                if (newValue && newValue.length === 16) {
                                                    try {
                                                        // Make the axios POST request to insert planDate and other values into the table
                                                        const sendingETA = await axios.post('http://localhost:5000/insertPlanDateETA', {
                                                            orgname: localStorage.getItem('orgname'),
                                                            orgcode: localStorage.getItem('orgcode'),
                                                            jobNumber: localStorage.getItem('jobNumber'),
                                                            jobdoneby: localStorage.getItem('username'),
                                                            tatdayhrmin: '00:00:00',
                                                            planDate: newValue,
                                                            tatimpcolumn: updatedData[index].tatimpcolumn
                                                        });
                                                    } catch (error) {
                                                        console.error('Error:', error);
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </CTableDataCell>
                                <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' value={item.actualdate ? moment(item.actualdate).format('YYYY-MM-DDTHH:mm') : ''} readOnly /></CTableDataCell>
                                <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={isEditable(item, index)} onChange={() => handleCheckboxChange(index)} checked={item.status === 'Completed'} /></CTableDataCell>
                                <CTableDataCell><input type="text" placeholder="" className='o2d-field-4' readOnly value={item.timedelay ? item.timedelay : '00:00:00'} /></CTableDataCell>
                                

                            <CTableDataCell>
                                    {index === 8 ? (
                                        <select
                                        value={item.status}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            const updatedData = [...allo2dData];
                                            updatedData[index].status = newValue;
                                            setallo2dData(updatedData);
                                        }}
                                    >
                                        <option value="Underprocess">Underprocess</option>
                                        {item.status === 'Completed' && <option value="Completed">Completed</option>}
                                    </select>
                                    ) : (
                                        item.status === "Completed" ? "Completed" : "Pending"
                                    )}
                                </CTableDataCell>



                                <CTableDataCell>
                                    <input type="text" placeholder="remarks of the process" className='remarks-field' readOnly={isEditable(item, index)} onChange={(e) => handleRemarksChange(e, index)} value={item.remarks} />
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
            <div className='search-button'>
                <CButton color="primary" type="submit" onClick={storeRemark}>
                    Save & Close
                </CButton>
            </div>
        </div>
    )

}

export default O2D;
















































