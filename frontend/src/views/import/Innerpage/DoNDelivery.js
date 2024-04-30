// import React from 'react'
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
// // import createjob from './CreateJob';

// const DoNDelivery = () => {
//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const [visible, setVisible] = useState(false)
//     return (
//         <div>
//             <div className='left-div-table'>
//                 <CTable hover responsive striped>
//                     <CTableHead className='c-table-head'>
//                         <CTableRow color='dark'>
//                             <CTableHeaderCell scope="col">Type of Do & Delivery</CTableHeaderCell>
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
//                             <CTableDataCell>BL Status & Agent Name</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4 date-field' /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Underprocess</CDropdownItem>
//                                     <CDropdownItem href="#">Completed</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Shipping Line Bond</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Yearly</CDropdownItem>
//                                     <CDropdownItem href="#">One Time</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>

//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>BL Documents</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>

//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Original Doc. Received</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Invoice Received from Shipping Line</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Payment to Shipping Line</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Delivery Order</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select Query</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Underprocess</CDropdownItem>
//                                     <CDropdownItem href="#">Completed</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Container Arrived at CFS</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Yes</CDropdownItem>
//                                     <CDropdownItem href="#">No</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Delivery</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell readOnly>UnderProcess</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                         <CTableRow>
//                             <CTableDataCell>Empty Container Recieving</CTableDataCell>
//                             <CTableDataCell><input type="text" placeholder="" className='o2d-field-5' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
//                                 <CDropdownMenu className="text-field-4">
//                                     <CDropdownItem href="#">Yes</CDropdownItem>
//                                     <CDropdownItem href="#">No</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <CTableDataCell><input type="text" placeholder="" className='remarks-field' /></CTableDataCell>
//                         </CTableRow>
//                     </CTableBody>
//                 </CTable>
//             </div>
//         </div>
//     )
// }

// export default DoNDelivery;



































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
// import { Link, parsePath } from 'react-router-dom';
// import axios from 'axios'
// // import createjob from './CreateJob';

// const DoNDelivery = () => {
//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const [visible, setVisible] = useState(false);
//     const [allLobData, setallLobData] = useState([]);

//     const readallspecificlobdata = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/readlobdataspecific', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                     lobname: localStorage.getItem('modeoftransport'),
//                     ownbranchname: localStorage.getItem('branchnameofemp')
//                 }
//             });


//             const updatedData = response.data.map(item => {
//                 // Calculate plan date only if the workflow milestone is "job creation date"
//                 if (item.workflowmilestone === "Job Creation Date") {
//                     // Get job date from localStorage
//                     const jobDate = new Date(localStorage.getItem('jobDate'));

//                     // Convert days, hours, minutes to numbers
//                     const { days, hours, minutes } = item;
//                     const milestoneDays = parseInt(days);
//                     const milestoneHours = parseInt(hours);
//                     const milestoneMinutes = parseInt(minutes);

//                     // Calculate plan date based on before or after
//                     let planDate = new Date(jobDate);

//                     if (item.duration === "After") {
//                         planDate.setDate(planDate.getDate() + milestoneDays);
//                         planDate.setHours(planDate.getHours() + milestoneHours);
//                         planDate.setMinutes(planDate.getMinutes() + milestoneMinutes);
//                     } else if (item.duration === "Before") {
//                         planDate.setDate(planDate.getDate() - milestoneDays);
//                         planDate.setHours(planDate.getHours() - milestoneHours);
//                         planDate.setMinutes(planDate.getMinutes() - milestoneMinutes);
//                     }


//                     return { ...item, planDate };
//                 }

//                 // For other items, return the original object
//                 return item;
//             });

//             setallLobData(updatedData)


//         } catch (error) {
//             console.log(error);
//         }
//     }


//     useEffect(() => {
//         readallspecificlobdata();
//     }, [])




//     return (
//         <div>
//             <div className='left-div-table'>
//                 <CTable striped responsive hover>
//                     <CTableHead className='c-table-head'>
//                         <CTableRow color='dark'>
//                             <CTableHeaderCell scope="col">Type of Milestone</CTableHeaderCell>
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
//                         {allLobData && allLobData.map((item, index) => (
//                             <CTableRow key={index}>
//                                 <CTableDataCell>{item.workflowname}</CTableDataCell>
//                                 <CTableDataCell><input type="text" placeholder="00d:00h:00m" className='o2d-field-5' value={item.days + ' days ' + item.hours + ' hrs ' + item.minutes + ' mins'}/></CTableDataCell>
//                                 <CTableDataCell>
//                                     <input
//                                         type="datetime-local"
//                                         placeholder=""
//                                         className='o2d-field-4'
//                                         readOnly={item.plandatechange === 1 ? false : true}
//                                         value={item.planDate ? item.planDate.toISOString().slice(0, 16) : ''}
//                                     />
//                                 </CTableDataCell>
//                                 <CTableDataCell><input type="datetime-local" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                                 <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
//                                 <CTableDataCell><input type="text" placeholder="" className='o2d-field-4' /></CTableDataCell>

//                                 <CTableDataCell>
//                                     Underprocess
//                                 </CTableDataCell>

//                                 <CTableDataCell>
//                                     <input type="text" placeholder="remarks of the process" className='remarks-field' />
//                                 </CTableDataCell>
//                             </CTableRow>
//                         ))}
//                     </CTableBody>
//                 </CTable>
//             </div>
//             <div className='search-button'>
//                 <CButton color="primary" type="submit">
//                     Save & Close
//                 </CButton>
//             </div>
//         </div>
//     )

// }
// export default DoNDelivery;












































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     CButton,
//     CTable,
//     CTableBody,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow
// } from '@coreui/react';
// import 'react-datepicker/dist/react-datepicker.css';

// const DoNDelivery = () => {
//     const [allLobData, setAllLobData] = useState([]);

//     const readAllSpecificLobData = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/readlobdataspecific', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                     lobname: localStorage.getItem('modeoftransport'),
//                     ownbranchname: localStorage.getItem('branchnameofemp')
//                 }
//             });

//             setAllLobData(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         readAllSpecificLobData();
//     }, []);

//     const calculatePlanDate = (referenceDate, days, hours, minutes, duration) => {
//         const milestoneDays = parseInt(days);
//         const milestoneHours = parseInt(hours);
//         const milestoneMinutes = parseInt(minutes);

//         let planDate = new Date(referenceDate);

//         if (duration === 'After') {
//             planDate.setDate(planDate.getDate() + milestoneDays);
//             planDate.setHours(planDate.getHours() + milestoneHours);
//             planDate.setMinutes(planDate.getMinutes() + milestoneMinutes);
//         } else if (duration === 'Before') {
//             planDate.setDate(planDate.getDate() - milestoneDays);
//             planDate.setHours(planDate.getHours() - milestoneHours);
//             planDate.setMinutes(planDate.getMinutes() - milestoneMinutes);
//         }

//         return planDate;
//     };

//     useEffect(() => {
//         if (allLobData.length > 0) {
//             const firstRow = allLobData[0];
//             const referenceDate = new Date(localStorage.getItem('jobDate'));
//             const updatedData = allLobData.map(item => {
//                 if (item.workflowmilestone === 'Job Creation Date') {
//                     return { ...item, planDate: referenceDate };
//                 } else {
//                     return {
//                         ...item,
//                         planDate: calculatePlanDate(
//                             referenceDate,
//                             item.days,
//                             item.hours,
//                             item.minutes,
//                             item.duration
//                         )
//                     };
//                 }
//             });
//             setAllLobData(updatedData);
//         }
//     }, []);

//     return (
//         <div>
//             <div className="left-div-table">
//                 <CTable striped responsive hover>
//                     <CTableHead className="c-table-head">
//                         <CTableRow color="dark">
//                             <CTableHeaderCell scope="col">Type of Milestone</CTableHeaderCell>
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
//                         {allLobData.map((item, index) => (
//                             <CTableRow key={index}>
//                                 <CTableDataCell>{item.workflowname}</CTableDataCell>
//                                 <CTableDataCell>
//                                     <input
//                                         type="text"
//                                         placeholder="00d:00h:00m"
//                                         className="o2d-field-5"
//                                         value={`${item.days} days ${item.hours} hrs ${item.minutes} mins`}
//                                         readOnly
//                                     />
//                                 </CTableDataCell>
//                                 <CTableDataCell>
//                                     <input
//                                         type="datetime-local"
//                                         placeholder=""
//                                         className="o2d-field-4"
//                                         readOnly={item.plandatechange === 1 ? false : true}
//                                         value={item.planDate ? item.planDate.toISOString().slice(0, 16) : ''}
//                                     />
//                                 </CTableDataCell>
//                                 <CTableDataCell>
//                                     <input type="datetime-local" placeholder="" className="o2d-field-4" />
//                                 </CTableDataCell>
//                                 <CTableDataCell>
//                                     <input type="checkbox" placeholder="" className="o2d-field-4" />
//                                 </CTableDataCell>
//                                 <CTableDataCell>Underprocess</CTableDataCell>
//                                 <CTableDataCell>
//                                     <input type="text" placeholder="remarks of the process" className="remarks-field" />
//                                 </CTableDataCell>
//                             </CTableRow>
//                         ))}
//                     </CTableBody>
//                 </CTable>
//             </div>
//             <div className="search-button">
//                 <CButton color="primary" type="submit">
//                     Save & Close
//                 </CButton>
//             </div>
//         </div>
//     );
// };

// export default DoNDelivery;
























































import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react';
import 'react-datepicker/dist/react-datepicker.css';

const DoNDelivery = () => {
    const [allLobData, setAllLobData] = useState([]);
    const [manualDate, setmanualDate] = useState('');

    const readAllSpecificLobData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/readlobdataspecific', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    lobname: localStorage.getItem('modeoftransport'),
                    ownbranchname: localStorage.getItem('branchnameofemp')
                }
            });

            response.data.map((item) => {
                item.status = 'Pending',
                item.remarks = ' '
            })

            const completedrowsofthatjobandbranchandlob = await axios.get('http://localhost:5000/Getcompletedrowsofthatjobandbranchandlob', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    lobname: localStorage.getItem('modeoftransport'),
                    ownbranchname: localStorage.getItem('branchnameofemp'),
                    jobnumber: localStorage.getItem('jobNumber')
                }
            })

            completedrowsofthatjobandbranchandlob.data.forEach((item) => {
                const index = response.data.findIndex(row => row.workflowname === item.tatimpcolumn);
                if (index > -1) {
                    // Update status, planDate, actualdate, and timedelay for completed items
                    response.data[index] = { ...response.data[index], planDate: item.plandate, actualdate: item.actualdate, status: 'Completed', timedelay: item.timedelay, remarks: item.remarks };
                }
            });
            setAllLobData(completedrowsofthatjobandbranchandlob.data);
            // completedrowsofthatjobandbranchandlob.data.map((item) => {
            //     const index = response.data.findIndex(row => row.workflowname === item.tatimpcolumn);
            //     if (index > -1) {
            //         response.data[index] = { ...response.data[index], planDate: item.plandate, actualdate: item.actualdate, status: 'Completed', timedelay: item.timedelay};
            //     }
            // })


            const updatedData = response.data.map(item => {
                // Calculate plan date only if the workflow milestone is "job creation date"
                if (item.workflowmilestone === "Job Creation Date") {
                    // Get job date from localStorage
                    const jobDate = new Date(localStorage.getItem('jobDate'));

                    // Convert days, hours, minutes to numbers
                    const { days, hours, minutes } = item;
                    const milestoneDays = parseInt(days);
                    const milestoneHours = parseInt(hours);
                    const milestoneMinutes = parseInt(minutes);

                    // Calculate plan date based on before or after
                    let planDate = new Date(jobDate);

                    if (item.duration === "After") {
                        planDate.setDate(planDate.getDate() + milestoneDays);
                        planDate.setHours(planDate.getHours() + milestoneHours);
                        planDate.setMinutes(planDate.getMinutes() + milestoneMinutes);
                    } else if (item.duration === "Before") {
                        planDate.setDate(planDate.getDate() - milestoneDays);
                        planDate.setHours(planDate.getHours() - milestoneHours);
                        planDate.setMinutes(planDate.getMinutes() - milestoneMinutes);
                    }

                    return { ...item, planDate };
                }

                // For other items, return the original object
                return item;
            });

            setAllLobData(updatedData)
            updatedData.forEach((item, index) => {
                if (item.workflowmilestone && item.workflowmilestone !== 'Job Creation Date') {
                    const dependencyRow = updatedData.find(row => row.workflowname === item.workflowmilestone);
                    if (dependencyRow && dependencyRow.planDate) {
                        const newPlanDate = calculatePlanDate(
                            dependencyRow.planDate,
                            item.days,
                            item.hours,
                            item.minutes,
                            item.duration
                        );
                        updatedData[index] = { ...item, planDate: newPlanDate };
                    }
                }
            });

            // Update the state with the final updated data
            setAllLobData(updatedData);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readAllSpecificLobData();
    }, [localStorage.getItem('jobDate'), localStorage.getItem('orgname'), localStorage.getItem('orgcode'), localStorage.getItem('modeoftransport'), localStorage.getItem('branchnameofemp'), localStorage.getItem('jobNumber')]);



    const calculatePlanDate = (referenceDate, days, hours, minutes, duration) => {
        const milestoneDays = parseInt(days);
        const milestoneHours = parseInt(hours);
        const milestoneMinutes = parseInt(minutes);

        let planDate = new Date(referenceDate);

        if (duration === 'After') {
            planDate.setDate(planDate.getDate() + milestoneDays);
            planDate.setHours(planDate.getHours() + milestoneHours);
            planDate.setMinutes(planDate.getMinutes() + milestoneMinutes);
        } else if (duration === 'Before') {
            planDate.setDate(planDate.getDate() - milestoneDays);
            planDate.setHours(planDate.getHours() - milestoneHours);
            planDate.setMinutes(planDate.getMinutes() - milestoneMinutes);
        }

        return planDate;
    };


    const handleManualDateChange = async (index, newPlanDate) => {
        const updatedData = [...allLobData];
        updatedData[index].planDate = newPlanDate;
        setAllLobData(updatedData);
        setmanualDate(newPlanDate);

        const response = await axios.post('http://localhost:5000/sendmanualdate', {
            orgname: localStorage.getItem('orgname'),
            orgcode: localStorage.getItem('orgcode'),
            ownbranchname: localStorage.getItem('branchnameofemp'),
            lobname: localStorage.getItem('workflowlobname'),
            workflowname: updatedData[index].workflowname,
            plandate: moment(newPlanDate).format('YYYY-MM-DDTHH:mm'),
            days: updatedData[index].days,
            hours: updatedData[index].hours,
            minutes: updatedData[index].minutes,
            username: localStorage.getItem('username'),
            jobnumber: localStorage.getItem('jobNumber'),
            ownbranchcode: localStorage.getItem('branchcodeofemp'),
        })

    };

    const isEditable = (item) => {
        try {
            // Check if the localStorage username and assignedperson match
            if(localStorage.getItem('username') === item.assignedperson){
                // If they match, the row should be editable
                return false;
            } else {
                // If they don't match, check if the localStorage username is 'admin'
                return localStorage.getItem('username') !== 'admin';
            }
        } catch (error) {
            console.log(error);
            // Default to false if there's an error
            return false;
        }
    }
    

    const handleCheckboxChange = async (index) => {
        try {
            const newData = [...allLobData];
            const isChecked = newData[index].status === 'Completed';

            if (isChecked) {
                // If the checkbox was checked, remove the status, actual date, and time delay
                newData[index].status = '';
                newData[index].actualdate = '';
                newData[index].timedelay = '';

                // Update the state with the modified data
                setAllLobData(newData);

                // Send a request to update the backend
                await axios.delete('http://localhost:5000/deleteCompletedRow', {
                    data: {
                        row: newData[index],
                        jobnumber: localStorage.getItem('jobNumber'),
                        jobdoneby: localStorage.getItem('username'),
                        ownbranchcode: localStorage.getItem('branchcodeofemp')
                    }
                });
            } else {
                // If the checkbox was unchecked, set actual date and status to 'Completed'
                newData[index].actualdate = moment().format('YYYY-MM-DDTHH:mm');
                newData[index].status = 'Completed';

                // Convert actualDate and planDate to Date objects
                const actualDate = new Date(newData[index].actualdate);
                const planDate = new Date(newData[index].planDate);

                // Calculate the difference in milliseconds
                const timeDifference = actualDate - planDate;

                // Convert milliseconds to hours and minutes
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

                // Store the time delay in the format HH:mm
                newData[index].timedelay = `${hours} hr ${minutes} min`;

                // Update the state with the modified data
                setAllLobData(newData);

                // Send a request to update the backend
                await axios.post('http://localhost:5000/insertCompletedRow', {
                    row: newData[index],
                    jobnumber: localStorage.getItem('jobNumber'),
                    jobdoneby: localStorage.getItem('username'),
                    ownbranchcode: localStorage.getItem('branchcodeofemp')
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handleRemarkChange = (index, event) => {
        const newData = [...allLobData];
        newData[index].remarks = event.target.value;
        setAllLobData(newData);
    };

    async function remarkstoreofimport(e){
        e.preventDefault();
        try {
            const lobDataWithRemarks = allLobData.filter(item => item.remarks.trim() !== '');

            const storedRemark = await axios.post('http://localhost:5000/updateRemarkinthatrow', {
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                data: lobDataWithRemarks
            })
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <div className="left-div-table">
                <CTable striped responsive hover>
                    <CTableHead className="c-table-head">
                        <CTableRow color="dark">
                            <CTableHeaderCell scope="col">Type of Milestone</CTableHeaderCell>
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
                        {allLobData.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{item.workflowname}</CTableDataCell>
                                <CTableDataCell>
                                    <input
                                        type="text"
                                        placeholder="00d:00h:00m"
                                        className="o2d-field-5"
                                        value={item.days ? `${item.days} days ${item.hours} hrs ${item.minutes} mins` : `00 days: 00 hrs : 00 mins`}
                                        readOnly
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <input
                                        type="datetime-local"
                                        placeholder=""
                                        className="o2d-field-4"
                                        readOnly={item.plandatechange === 1 ? false : true}
                                        defaultValue={item.planDate ? moment(item.planDate).format('YYYY-MM-DDTHH:mm') : ''}
                                        onChange={(e) => {
                                            const newPlanDate = moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate();
                                            handleManualDateChange(index, newPlanDate);
                                        }}
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <input type="datetime-local" placeholder="" className="o2d-field-4" value={item.actualdate ? moment(item.actualdate).format('YYYY-MM-DDTHH:mm') : ''} readOnly />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4'
                                        checked={item.status === 'Completed'}
                                        onChange={() => handleCheckboxChange(index)}
                                        disabled={isEditable(item)}
                                    /></CTableDataCell>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <input type='text' placeholder='time delay' value={item.timedelay ? item.timedelay : ''} />
                                </CTableDataCell>
                                <CTableDataCell>
                                    {item.status}
                                </CTableDataCell>
                                
                                <CTableDataCell>
                                    <input type="text" placeholder="remarks of the process" className="remarks-field" name='remarks' value={item.remarks} onChange={(e) => handleRemarkChange(index, e)}/>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
            <div className="search-button">
                <CButton color="primary" type="submit" onClick={remarkstoreofimport}>
                    Save 
                </CButton>
            </div>
        </div>
    );
};

export default DoNDelivery;
