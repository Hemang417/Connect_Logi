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

            setAllLobData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readAllSpecificLobData();
    }, []);

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

    useEffect(() => {
        if (allLobData.length > 0) {
            setAllLobData(prevData => {
                const firstRow = prevData[0];
                const referenceDate = new Date(localStorage.getItem('jobDate'));
                const updatedData = prevData.map((item, index) => {
                    if (index === 0 && item.workflowmilestone === 'Job Creation Date') {
                        return { ...item, planDate: referenceDate };
                    } else if (index !== 0 && item.workflowmilestone !== 'Job Creation Date') {
                        return {
                            ...item,
                            planDate: calculatePlanDate(
                                referenceDate,
                                item.days,
                                item.hours,
                                item.minutes,
                                item.duration
                            )
                        };
                    }
                    return item;
                });
                return updatedData;
            });
        }
    }, []); // Added allLobData as a dependency

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
                                        value={`${item.days} days ${item.hours} hrs ${item.minutes} mins`}
                                        readOnly
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <input
                                        type="datetime-local"
                                        placeholder=""
                                        className="o2d-field-4"
                                        readOnly={item.plandatechange === 1 ? false : true}
                                        value={item.planDate ? item.planDate.toISOString().slice(0, 16) : ''}
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <input type="datetime-local" placeholder="" className="o2d-field-4" />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <input type="checkbox" placeholder="" className="o2d-field-4" />
                                </CTableDataCell>
                                <CTableDataCell>Underprocess</CTableDataCell>
                                <CTableDataCell>
                                    <input type="text" placeholder="remarks of the process" className="remarks-field" />
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
            <div className="search-button">
                <CButton color="primary" type="submit">
                    Save & Close
                </CButton>
            </div>
        </div>
    );
};

export default DoNDelivery;
