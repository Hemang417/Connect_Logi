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












import React, { useEffect, useState } from 'react'
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
// import createjob from './CreateJob';


const O2D = () => {
    const currentdateandtime = moment().format('YYYY-MM-DDTHH:mm');
    const [visible, setvisible] = useState(false);
    const [allo2dData, setallo2dData] = useState([]);
    const [allaccessofuser, setallaccessofuser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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
                    planDate: calculatePlanDate(item, localStorage.getItem('jobDate')),
                    remarks: ''
                }));

                setallo2dData(updatedData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllO2Drows();
    }, [])



    const formatTAT = (TAT, index) => {
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
        allo2dData[index].tat = formattedTAT.trim();
        return formattedTAT.trim();
    };



    useEffect(() => {
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
        handleAccess();
    }, [])


    // const isEditable = (rowItem) => {

    //     if (localStorage.getItem('username') === 'admin') {
    //         return true;
    //     } else {
    //         return allaccessofuser.some((accessrow) => accessrow.value === rowItem.tatimpcolumn);
    //     }

    // };



    const [underprocessId, setUnderprocessId] = useState(null);

    // Function to handle the selection of dropdown items and update the 'Underprocess' row id
    const handleDropdownItemClick = (id, status) => {
        if (status === 'Underprocess') {
            setUnderprocessId(id);
        } else {
            setUnderprocessId(null);
        }
        // Update the status of the selected row based on the dropdown item clicked
        const updatedData = allo2dData.map(row => {
            if (row.id === id) {
                return { ...row, status: status };
            }
            return row;
        });
        setallo2dData(updatedData);
    };

    const isEditable = (rowItem) => {
        if (localStorage.getItem('username') === 'admin') {
            return true;
        } else if(underprocessId != null){
            if(rowItem.id>underprocessId){
                return false;
            }else if(rowItem.id < underprocessId){
                return false;
            }else {
                return true;
            }
        }else{
           return allaccessofuser.some(accessrow => accessrow.value === rowItem.tatimpcolumn);
        }
    };
    
    


    useEffect(() => {
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
                    setallo2dData(combinedData.map(item => ({
                        ...item,
                        planDate: calculatePlanDate(item, localStorage.getItem('jobDate')),
                    })));
                } else {
                    // If it's not an edit mode, only set the data from o2dtat to the state
                    setallo2dData(responseTat.data.map(item => ({
                        ...item,
                        planDate: calculatePlanDate(item, localStorage.getItem('jobDate')),
                        remarks: ''
                    })));
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        // Call the fetchO2DData function when the component mounts
        fetchO2DData();
    }, []);
    














    // useEffect(() => {
    //     if (localStorage.getItem('onEdit') === 'true') {
    //         const fetchO2DData = async () => {
    //             try {
    //                 const response = await axios.get('http://localhost:5000/getO2Dimport', {
    //                     params: {
    //                         orgname: localStorage.getItem('orgname'),
    //                         orgcode: localStorage.getItem('orgcode'),
    //                         jobNumber: localStorage.getItem('jobNumber')
    //                     }
    //                 });
    //                 console.log(response.data);
    //                 setallo2dData(response.data); // Set the fetched data to the state
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         };
    //         fetchO2DData();
    //     }
    //     // Call the fetchO2DData function when the component mounts
    // }, []);





    let previousPlanDate = null;

    const calculatePlanDate = (TAT, jobDate) => {
        const { days, hours, minutes } = TAT;
        let planDateTime;

        // Initialize planDateTime with previousPlanDate if it exists; otherwise, use jobDate
        if (previousPlanDate) {
            planDateTime = moment(previousPlanDate).toDate();
        } else {
            planDateTime = moment(jobDate).toDate();
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

        // Store the current planDateTime as the previousPlanDate for the next iteration
        previousPlanDate = planDateTime;

        return moment(planDateTime).format('YYYY-MM-DDTHH:mm'); // Return the formatted date for the current row
    };






    // const calculatePlanDate = (TAT, jobDate) => {
    //     const { days, hours, minutes } = TAT;
    //     const planDateTime = new Date(jobDate); // Initialize planDateTime with jobDate

    //     // Add days to the planDateTime
    //     if (days) {
    //         planDateTime.setDate(planDateTime.getDate() + parseInt(days));
    //     }

    //     // Add hours to the planDateTime
    //     if (hours) {
    //         planDateTime.setHours(planDateTime.getHours() + parseInt(hours));
    //     }

    //     // Add minutes to the planDateTime
    //     if (minutes) {
    //         planDateTime.setMinutes(planDateTime.getMinutes() + parseInt(minutes));
    //     }
    //     if (planDateTime.getDay() === 0) {
    //         // If Sunday, add one more day (24 hours)
    //         planDateTime.setDate(planDateTime.getDate() + 1);
    //     }

    //     return moment(planDateTime).format('YYYY-MM-DDTHH:mm'); // You can format this date as per your requirement
    // };




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
                setallo2dData(newData);
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
        } else {
            // If the checkbox was unchecked, update the status and actual date
            newData[index].actualdate = moment().format('YYYY-MM-DDTHH:mm');
            newData[index].status = 'Completed';
            // Convert actualDate and planDate to Date objects
            const actualDate = new Date(newData[index].actualdate);
            const planDate = new Date(newData[index].planDate);
            // Calculate the difference in milliseconds
            const timeDifference = actualDate - planDate;
            // Convert milliseconds to hours, minutes, and seconds
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            // Store the time delay in the format HH:mm
            newData[index].timedelay = `${hours} hr ${minutes} min`;
            // Update the state with the modified data
            setallo2dData(newData);
            try {

                // Send a request to update the backend
                await axios.post('http://localhost:5000/insertO2D', {
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
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };



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
                                <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' readOnly value={item.tat? item.tat:formatTAT(item, index)} /></CTableDataCell>
                                <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' value={calculatePlanDate(item, localStorage.getItem('jobDate'))} readOnly /></CTableDataCell>
                                <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' value={item.actualdate ? moment(item.actualdate).format('YYYY-MM-DDTHH:mm') : ''} readOnly /></CTableDataCell>
                                <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' disabled={!isEditable(item)} onChange={() => handleCheckboxChange(index)} checked={item.status === 'Completed'}/></CTableDataCell>
                                <CTableDataCell><input type="text" placeholder="" className='o2d-field-4' readOnly value={item.timedelay ? item.timedelay : '00:00:00'} /></CTableDataCell>
                                <CDropdown>
                                    <CDropdownToggle className="dropdown-btn" color='secondary' disabled={!isEditable(item)}>{item.status ? item.status : 'Select Query'}</CDropdownToggle>
                                    <CDropdownMenu className="text-field-4">
                                        <CDropdownItem onClick={() => handleDropdownItemClick(item.id, 'Underprocess')}>Underprocess</CDropdownItem>
                                        <CDropdownItem onClick={() => handleDropdownItemClick(item.id, 'Completed')}>Completed</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                                <CTableDataCell><input type="text" placeholder="remarks of the process" className='remarks-field' readOnly={!isEditable(item)} onChange={(e) => handleRemarksChange(e, index)} value={item.remarks}/></CTableDataCell>
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

















































