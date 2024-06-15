
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CCard, CCol, CCardBody, CButton } from '@coreui/react';
// import { CChart } from '@coreui/react-chartjs';
// import '../../../css/styles.css';
// import moment from 'moment';

// const User_Import = () => {
//   const [allData, setAllData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [groupedData, setGroupedData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [nonNegativeCount, setNonNegativeCount] = useState(0);

//   const fetchAllData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
//         params: {
//           username: localStorage.getItem('empnameforaccess'),
//           fullname: localStorage.getItem('fullname'),
//           branchname: localStorage.getItem('branchname')
//         }
//       });
//       setAllData(response.data);
//       setOriginalData(response.data);
//       // Grouping code
//       const grouped = response.data.completedRows.reduce((acc, item) => {
//         const key = item.tatimpcolumn;
//         acc[key] = [...(acc[key] || []), item];
//         return acc;
//       }, {});
//       setGroupedData(grouped);
//       // Count non-negative rows
//       let count = 0;
//       response.data.completedRows.forEach(item => {
//         if (!item.timedelay.includes('-')) {
//           count++;
//         }
//       });
//       setNonNegativeCount(count);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const generateRandomColor = (numColors) => {
//     const randomColor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
//       '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
//       '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
//       '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
//       '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
//       '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
//       '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
//       '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
//       '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
//       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
//     const selectedColors = [];
//     for (let i = 0; i < numColors; i++) {
//       const randomIndex = Math.floor(Math.random() * randomColor.length);
//       selectedColors.push(randomColor[randomIndex]);
//     }
//     return selectedColors;
//   };

//   const filterData = () => {
//     try {
//       const filteredRows = originalData.completedRows.filter(row => {
//         const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
//         const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
//         const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
//         return actualDate >= startDateObj && actualDate <= endDateObj;
//       });

//       setAllData({ ...allData, completedRows: filteredRows });

//       // Count non-negative rows
//       let count = 0;
//       filteredRows.forEach(row => {
//         if (!row.timedelay.includes('-')) {
//           count++;
//         }
//       });
//       setNonNegativeCount(count);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const clearFilters = () => {
//     setStartDate('');
//     setEndDate('');
//     setAllData(originalData);
//   };
// console.log(groupedData);
//   return (
//     <div>
//       <CCol xs={12}>
//         <CCard className="mb-2 container-div">
//           <CCardBody>
//           <div className="date-filters">
//               <input
//                 type="datetime-local"
//                 placeholder="Start Date"
//                 name='startDate'
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               <input
//                 type="datetime-local"
//                 placeholder="End Date"
//                 name='endDate'
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//               <div className='mt-4 all-buttons-user-import'>
//               <CButton color="primary" onClick={filterData}>Filter</CButton>
//               <CButton color="primary" onClick={clearFilters} className='clear-button'>Clear</CButton>
//               </div>
//             <div className='main-div'>


//             </div>
//             </div>
//             <div className='left-div'>
//               {allData.access && allData.access.map((accessItem, index) => {
//                 const groupName = accessItem.value;
//                 const groupLength = groupedData[groupName] ? groupedData[groupName].length : 0;

//                 return (
//                   <div key={index}>
//                     <h6>{groupName}</h6>
//                     <p>{groupLength + '/' + allData.totalJobs.length}</p>
//                   </div>
//                 );
//               })}
//             </div>
//             <div>
//               <div>Total rows completed with time delay: {nonNegativeCount}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//             </div>
//             <div className='right-div'>
//               <CChart
//                 type="doughnut"
//                 data={{
//                   labels: allData.access ? allData.access.map(item => item.value) : [],
//                   datasets: [
//                     {
//                       backgroundColor: allData.access ? generateRandomColor(allData.access.length) : [],
//                       data: allData.access ? allData.access.map(accessItem => groupedData[accessItem.value] ? groupedData[accessItem.value].length : 0) : [],
//                     },
//                   ],
//                 }}
//                 options={{
//                   plugins: {
//                     legend: {
//                       labels: {
//                         color: 'blue',
//                       }
//                     }
//                   },
//                 }}
//               />
//             </div>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </div>
//   );
// };

// export { User_Import };























// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import axios from 'axios';
// import { CCard, CCol, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
// import { CChart } from '@coreui/react-chartjs';
// import '../../../css/styles.css';
// import moment from 'moment';

// const User_Import = ({onDataFetch}) => {
//   const [allData, setAllData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [groupedData, setGroupedData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [nonNegativeCount, setNonNegativeCount] = useState(0);

//   const fetchAllData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
//         params: {
//           username: localStorage.getItem('empnameforaccess'),
//           fullname: localStorage.getItem('fullname'),
//           branchnames: localStorage.getItem('branchnames')
//         }
//       });

//       console.log(response.data);

//       setAllData(response.data);
//       setOriginalData(response.data);
//       // Grouping code
//       const grouped = response.data.completedRows.reduce((acc, item) => {
//         const key = item.tatimpcolumn;
//         acc[key] = [...(acc[key] || []), item];
//         return acc;
//       }, {});
//       setGroupedData(grouped);
//       // Count non-negative rows
//       let count = 0;
//       response.data.completedRows.forEach(item => {
//         if (!item.timedelay.includes('-')) {
//           count++;
//         }
//       });
//       setNonNegativeCount(count);
//       onDataFetch({
//         allData: response.data,
//         originalData: response.data,
//         groupedData: grouped,
//         nonNegativeCount: count
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const generateRandomColor = (numColors) => {
//     const randomColor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
//       '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
//       '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
//       '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
//       '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
//       '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
//       '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
//       '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
//       '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
//       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
//     const selectedColors = [];
//     for (let i = 0; i < numColors; i++) {
//       const randomIndex = Math.floor(Math.random() * randomColor.length);
//       selectedColors.push(randomColor[randomIndex]);
//     }
//     return selectedColors;
//   };

//   const filterData = () => {
//     try {
//       const filteredRows = originalData.completedRows.filter(row => {
//         const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
//         const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
//         const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
//         return actualDate >= startDateObj && actualDate <= endDateObj;
//       });

//       setAllData({ ...allData, completedRows: filteredRows });

//       // Count non-negative rows
//       let count = 0;
//       filteredRows.forEach(row => {
//         if (!row.timedelay.includes('-')) {
//           count++;
//         }
//       });
//       setNonNegativeCount(count);
//       onDataFetch({
//         allData: { ...allData, completedRows: filteredRows },
//         nonNegativeCount: count
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const clearFilters = () => {
//     setStartDate('');
//     setEndDate('');
//     setAllData(originalData);
//   };


// const empnameasusername = localStorage.getItem('fullname');





//   return (
//     <div>
//       <CCol xs={12}>
//         <CCard className="mb-2 container-div">
//           <CCardBody>
//             <div className="date-filters-report">
//               <input
//               className='start-date-filters-report'
//                 type="datetime-local"
//                 placeholder="Start Date"
//                 name='startDate'
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               <input
//               className='end-date-filters-report'
//                 type="datetime-local"
//                 placeholder="End Date"
//                 name='endDate'
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//               <div className='mt-4 all-buttons-user-import'>
//                 <CButton color="primary" onClick={filterData} className='filter-button'>Search</CButton>
//                 <CButton color="primary" onClick={clearFilters} className='clear-button'>Clear</CButton>
//               </div>
//             </div>
//             <div>
//               {/* {allData.access && allData.access.map((accessItem, index) => {
//                 const groupName = accessItem.value;
//                 const groupData = groupedData[groupName] || []; // Get group data or an empty array if groupName doesn't exist
//                 const groupLength = groupData.length;
//                 let nonNegativeCount = 0;
//                 groupData.forEach(item => {
//                   if (!item.timedelay.includes('-')) {
//                     nonNegativeCount++;
//                   }
//                 });

//                 return (
//                   <div >
//                     <div key={index} className='main-div-report'>
//                       <h6>{groupName}</h6>
//                       <p>{groupLength}/{allData.totalJobs.length}</p>
//                       <p>Non-negative time delay: {nonNegativeCount}</p>
//                     </div>
//                   </div>
//                 );
//               })} */}
//             </div>

//             <CTable className='left-div-report'>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col">Assigned</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Completed</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Delayed</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">%</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>


//               {allData.rowshaiye && allData.rowshaiye.map((item, index) => {

//                 return (
//                   <CTableRow key={index}>
//                     <CTableHeaderCell>{item}</CTableHeaderCell>
//                     {/* <CTableHeaderCell scope="row">{}/{allData.totalJobs.length}</CTableHeaderCell> */}
//                     {/* <CTableHeaderCell>{nonNegativeCount}</CTableHeaderCell>
//                     <CTableHeaderCell>{percentage + '%'}</CTableHeaderCell> */}
//                   </CTableRow>
//                 );
//               })}



//                 {/* {allData.access && allData.access.map((accessItem, index) => {
//                   const groupName = accessItem.value;
//                   const groupData = groupedData[groupName] || [];
//                   const groupLength = groupData.length;
//                   let nonNegativeCount = 0;
//                   groupData.forEach(item => {
//                     if (!item.timedelay.includes('-')) {
//                       nonNegativeCount++;
//                     }
//                   });
//                   const percentage = ((groupLength / allData.totalJobs.length) * 100).toFixed(2);
//                   return (
//                     <CTableRow key={index}>
//                       <CTableHeaderCell>{groupName}</CTableHeaderCell>
//                       <CTableHeaderCell scope="row">{groupLength}/{allData.totalJobs.length}</CTableHeaderCell>
//                       <CTableHeaderCell>{nonNegativeCount}</CTableHeaderCell>
//                       <CTableHeaderCell>{percentage + '%'}</CTableHeaderCell>
//                     </CTableRow>
//                   );
//                 })} */}
//               </CTableBody>
//             </CTable>
//             <div>
//               <div>Total rows completed with time delay: {nonNegativeCount}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//               <div>Number of Jobs created by {empnameasusername} : {allData.access?.length}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//             </div>

//             {/* <div className='right-div-report'>
//               <CChart
//                 type="doughnut"
//                 data={{
//                   labels: allData.access ? allData.access.map(item => item.value) : [],
//                   datasets: [
//                     {
//                       backgroundColor: allData.access ? generateRandomColor(allData.access.length) : [],
//                       data: allData.access ? allData.access.map(accessItem => groupedData[accessItem.value] ? groupedData[accessItem.value].length : 0) : [],
//                     },
//                   ],
//                 }}
//                 options={{
//                   plugins: {
//                     legend: {
//                       labels: {
//                         color: 'blue',
//                       }
//                     }
//                   },
//                 }}
//               />
//             </div> */}
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </div>
//   );
// }


// export { User_Import };













































// All branches data 


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CChart } from '@coreui/react-chartjs';
// import { CCard, CCol, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdown } from '@coreui/react';
// import moment from 'moment';
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser, cilBuilding, cilChartPie, cilArrowRight, cilSpeedometer, cilLayers, cilCloudDownload } from '@coreui/icons'

// const User_Import = ({ onDataFetch }) => {
//   const [allData, setAllData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [groupedData, setGroupedData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [nonNegativeCount, setNonNegativeCount] = useState(0);
//   const [branchdata, setbranchdata] = useState([]);


//   useEffect(() => {
//     const branchnames = localStorage.getItem('branchnames');
//     if (branchnames) {
//       try {
//         // Parse the JSON-like string
//         const parsedData = JSON.parse(branchnames.replace(/'/g, '"'));
//         const branchesWithAll = [...parsedData, 'All'];
//         // Set the branch data state
//         setbranchdata(branchesWithAll);
//       } catch (error) {
//         console.error("Error parsing branch names:", error);
//       }
//     }
//   }, []);


//   const fetchAllData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
//         params: {
//           username: localStorage.getItem('empnameforaccess'),
//           fullname: localStorage.getItem('fullname'),
//           branchnames: localStorage.getItem('branchnames')
//         }
//       });

//       setAllData(response.data);
//       setOriginalData(response.data);

//       // Grouping code
//       const grouped = response.data.completedRows.reduce((acc, item) => {
//         const key = item.tatimpcolumn;
//         acc[key] = [...(acc[key] || []), item];
//         return acc;
//       }, {});
//       setGroupedData(grouped);
//       // Count non-negative rows
//       let count = 0;
//       response.data.completedRows.forEach(item => {
//         if (!item.timedelay.includes('-')) {
//           count++;
//         }
//       });
//       setNonNegativeCount(count);
//       onDataFetch({
//         allData: response.data,
//         originalData: response.data,
//         groupedData: grouped,
//         nonNegativeCount: count
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const generateRandomColor = (numColors) => {
//     const randomColor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
//       '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
//       '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
//       '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
//       '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
//       '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
//       '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
//       '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
//       '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
//       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
//     const selectedColors = [];
//     for (let i = 0; i < numColors; i++) {
//       const randomIndex = Math.floor(Math.random() * randomColor.length);
//       selectedColors.push(randomColor[randomIndex]);
//     }
//     return selectedColors;
//   };

//   const filterData = async () => {
//     try {
//       const filteredRows = (originalData.completedRows || []).filter(row => {
//         const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
//         const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
//         const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
//         return actualDate >= startDateObj && actualDate <= endDateObj;
//       });

//       const updatedAllData = { ...allData, completedRows: filteredRows };

//       setAllData(updatedAllData);

//       // Count non-negative rows
//       let count = 0;
//       filteredRows.forEach(row => {
//         if (!row.timedelay.includes('-')) {
//           count++;
//         }
//       });
//       setNonNegativeCount(count);
//       onDataFetch({
//         allData: updatedAllData,
//         nonNegativeCount: count
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const clearFilters = () => {
//     setStartDate('');
//     setEndDate('');
//     setAllData(originalData);
//   };


//   const empnameasusername = localStorage.getItem('fullname');

//   const getPieChartData = () => {
//     const totalJobs = allData.totalJobs ? allData.totalJobs.length : 0;

//     const chartData = allData.rowshaiye ? allData.rowshaiye.map(item => {
//       const completedRowsForItem = allData.completedRows.filter(row => row.tatimpcolumn === item);
//       const completedCount = completedRowsForItem.length;
//       const percentage = ((completedCount / totalJobs) * 100).toFixed(2);
//       return parseFloat(percentage);
//     }) : [];

//     return {
//       labels: allData.rowshaiye ? allData.rowshaiye : [],
//       datasets: [
//         {
//           backgroundColor: allData.rowshaiye ? generateRandomColor(allData.rowshaiye.length) : [],
//           data: chartData
//         }
//       ]
//     };
//   };

//   const [selectedBranchofUser, setSelectedBranchofUser] = useState('')

//   async function handleChangeBranch(branch){
//     try {
//         setSelectedBranchofUser(branch);
//     } catch (error) {
//       console.log(error);
//     }
//   }



//   return (
//     <div>
//       <CCol xs={12}>
//         <CCard className="mb-2 container-div">
//           <CCardBody>
//             <div className="date-filters-report">
//               <input
//                 className='start-date-filters-report'
//                 type="datetime-local"
//                 placeholder="Start Date"
//                 name='startDate'
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               <input
//                 className='end-date-filters-report'
//                 type="datetime-local"
//                 placeholder="End Date"
//                 name='endDate'
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//               <div className='mt-4 all-buttons-user-import'>
//                 <CButton color="primary" onClick={filterData} className='filter-button'>Search</CButton>
//                 <CButton color="primary" onClick={clearFilters} className='clear-button'>Clear</CButton>
//               </div>
//             </div>

//             <div>
//               <label>Select Branch For the User:</label>
//               <CDropdown>
//                 <CDropdownToggle color="secondary">
//                    {selectedBranchofUser ? selectedBranchofUser : branchdata[branchdata.length-1]}
//                 </CDropdownToggle>
//               <CDropdownMenu>
//                   {branchdata && branchdata.map((branch, index) => (
//                 <CDropdownItem key={index} onClick={() => handleChangeBranch(branch)}>
//                   {branch}
//                 </CDropdownItem>
//                   ))}
//               </CDropdownMenu>
//               </CDropdown>
//             </div>

//             <CTable className='left-div-report'>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col">Assigned</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Completed</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Delayed</CTableHeaderCell>
//                   <CTableHeaderCell scope="col">%</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>

//                 {allData.rowshaiye && allData.rowshaiye.map((item, index) => {
//                   const completedRowsForItem = allData.completedRows.filter(row => row.tatimpcolumn === item);
//                   const completedCount = completedRowsForItem.length;
//                   const totalCount = allData.totalJobs.length;
//                   const percentage = ((completedCount / totalCount) * 100).toFixed(2);

//                   return (
//                     <CTableRow key={index}>
//                       <CTableHeaderCell>{item}</CTableHeaderCell>
//                       <CTableDataCell>{completedCount}/{totalCount}</CTableDataCell>
//                       <CTableDataCell>{completedRowsForItem.filter(row => !row.timedelay.includes('-')).length}</CTableDataCell>
//                       <CTableDataCell>{percentage}%</CTableDataCell>
//                     </CTableRow>
//                   );
//                 })}
//               </CTableBody>
//             </CTable>
//             <div>
//               <div>Total rows completed with time delay: {nonNegativeCount}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//               <div>Number of Jobs created by {empnameasusername} : {allData.access?.length}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//             </div>

//             <div className='right-div-report'>
//               <CChart
//                 type="pie"
//                 data={getPieChartData()}
//                 options={{
//                   plugins: {
//                     legend: {
//                       labels: {
//                         color: 'blue',
//                       }
//                     }
//                   },
//                 }}
//               />
//             </div>

//           </CCardBody>
//         </CCard>










//       </CCol>
//     </div>
//   );
// }

// export { User_Import };


















































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CChart } from '@coreui/react-chartjs';
// import { CCard, CCol, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
// import moment from 'moment';

// const User_Import = ({ onDataFetch }) => {
//   const [allData, setAllData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [nonNegativeCount, setNonNegativeCount] = useState({});
//   const [branchnames, setBranchNames] = useState([]);

//   useEffect(() => {
//     const branchNames = JSON.parse(localStorage.getItem('branchnames')) || [];
//     setBranchNames(branchNames);
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
//         params: {
//           username: localStorage.getItem('empnameforaccess'),
//           fullname: localStorage.getItem('fullname'),
//           branchnames: localStorage.getItem('branchnames')
//         }
//       });

//       setAllData(response.data);
//       setOriginalData(response.data);

//       // Initialize nonNegativeCount for each branch
//       const initialNonNegativeCount = {};
//       branchnames.forEach(branch => {
//         initialNonNegativeCount[branch] = 0;
//       });
//       setNonNegativeCount(initialNonNegativeCount);

//       onDataFetch({
//         allData: response.data,
//         originalData: response.data,
//         nonNegativeCount: initialNonNegativeCount
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, [branchnames]);

//   const generateRandomColor = (numColors) => {
//     const randomColor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
//       '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
//       '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
//       '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
//       '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
//       '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
//       '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
//       '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
//       '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
//       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
//     const selectedColors = [];
//     for (let i = 0; i < numColors; i++) {
//       const randomIndex = Math.floor(Math.random() * randomColor.length);
//       selectedColors.push(randomColor[randomIndex]);
//     }
//     return selectedColors;
//   };

//   const filterData = async () => {
//     try {
//       const filteredRows = (originalData.completedRows || []).filter(row => {
//         const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
//         const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
//         const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
//         return actualDate >= startDateObj && actualDate <= endDateObj;
//       });

//       const updatedAllData = { ...allData, completedRows: filteredRows };

//       setAllData(updatedAllData);

//       // Update nonNegativeCount for each branch
//       const updatedNonNegativeCount = { ...nonNegativeCount };
//       branchnames.forEach(branch => {
//         updatedNonNegativeCount[branch] = filteredRows.filter(row => row.ownbranchname === branch && !row.timedelay.includes('-')).length;
//       });
//       setNonNegativeCount(updatedNonNegativeCount);

//       onDataFetch({
//         allData: updatedAllData,
//         nonNegativeCount: updatedNonNegativeCount
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const clearFilters = () => {
//     setStartDate('');
//     setEndDate('');
//     setAllData(originalData);
//   };

//   const empnameasusername = localStorage.getItem('fullname');

//   const getPieChartData = (branch) => {
//     const totalJobs = allData.totalJobs ? allData.totalJobs.length : 0;

//     const chartData = allData.rowshaiye ? allData.rowshaiye.map(item => {
//       const completedRowsForItem = allData.completedRows.filter(row => row.tatimpcolumn === item && row.ownbranchname === branch);
//       const completedCount = completedRowsForItem.length;
//       const percentage = ((completedCount / totalJobs) * 100).toFixed(2);
//       return parseFloat(percentage);
//     }) : [];

//     return {
//       labels: allData.rowshaiye ? allData.rowshaiye : [],
//       datasets: [
//         {
//           backgroundColor: allData.rowshaiye ? generateRandomColor(allData.rowshaiye.length) : [],
//           data: chartData
//         }
//       ]
//     };
//   };

//   return (
//     <div>
//       <CCol xs={12}>
//         <CCard className="mb-2 container-div">
//           <CCardBody>
//             <div className="date-filters-report">
//               <input
//                 className='start-date-filters-report'
//                 type="datetime-local"
//                 placeholder="Start Date"
//                 name='startDate'
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//               <input
//                 className='end-date-filters-report'
//                 type="datetime-local"
//                 placeholder="End Date"
//                 name='endDate'
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//               <div className='mt-4 all-buttons-user-import'>
//                 <CButton color="primary" onClick={filterData} className='filter-button'>Search</CButton>
//                 <CButton color="primary" onClick={clearFilters} className='clear-button'>Clear</CButton>
//               </div>
//             </div>

//             {branchnames.map(branch => (
//               <div key={branch}>
//                 <h3>{branch}</h3>
//                 <CTable className='left-div-report'>
//                   <CTableHead>
//                     <CTableRow>
//                       <CTableHeaderCell scope="col">Assigned</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Completed</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">Delayed</CTableHeaderCell>
//                       <CTableHeaderCell scope="col">%</CTableHeaderCell>
//                     </CTableRow>
//                   </CTableHead>
//                   <CTableBody>
//                     {allData.rowshaiye && allData.rowshaiye.map((item, index) => {
//                       const completedRowsForItem = allData.completedRows.filter(row => row.tatimpcolumn === item && row.ownbranchname === branch);
//                       const completedCount = completedRowsForItem.length;
//                       const totalCount = allData.totalJobs.length;
//                       const percentage = ((completedCount / totalCount) * 100).toFixed(2);

//                       return (
//                         <CTableRow key={index}>
//                           <CTableHeaderCell>{item}</CTableHeaderCell>
//                           <CTableDataCell>{completedCount}/{totalCount}</CTableDataCell>
//                           <CTableDataCell>{completedRowsForItem.filter(row => !row.timedelay.includes('-')).length}</CTableDataCell>
//                           <CTableDataCell>{percentage}%</CTableDataCell>
//                         </CTableRow>
//                       );
//                     })}
//                   </CTableBody>
//                 </CTable>
//                 <div>
//                   <div>Total rows completed with time delay: {nonNegativeCount[branch]}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//                   <div>Number of Jobs created by {empnameasusername} : {allData.access?.length}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
//                 </div>

//                 <div className='right-div-report'>
//                   <CChart
//                     type="pie"
//                     data={getPieChartData(branch)}
//                     options={{
//                       plugins: {
//                         legend: {
//                           labels: {
//                             color: 'blue',
//                           }
//                         }
//                       },
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </div>
//   );
// }

// export { User_Import };





















































































































// this code filters data as per branches and renders in the UI.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CChart } from '@coreui/react-chartjs';
import { CCard, CCol, CCardBody, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdown } from '@coreui/react';
import moment from 'moment';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilBuilding, cilChartPie, cilArrowRight, cilSpeedometer, cilLayers, cilCloudDownload } from '@coreui/icons';

const User_Import = ({ onDataFetch }) => {
  const [allData, setAllData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nonNegativeCount, setNonNegativeCount] = useState(0);
  const [branchdata, setbranchdata] = useState([]);
  const [selectedBranchofUser, setSelectedBranchofUser] = useState('');
  const [filteredData, setFilteredData] = useState({});
  const [totalJobsofOrg, setTotalJobsofOrg] = useState(0);

  useEffect(() => {
    const branchnames = localStorage.getItem('branchnames');
    if (branchnames) {
      try {
        const parsedData = JSON.parse(branchnames.replace(/'/g, '"'));
        const branchesWithAll = [...parsedData, 'All'];
        setbranchdata(branchesWithAll);
      } catch (error) {
        console.error("Error parsing branch names:", error);
      }
    }
  }, []);

  const fetchAllData = async (branch) => {
    try {
      const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
        params: {
          username: localStorage.getItem('empnameforaccess'),
          fullname: localStorage.getItem('fullname'),
          branchnames: localStorage.getItem('branchnames')
        }
      });
      setTotalJobsofOrg(response.data.totalJobs.length);
      let data = response.data;
      if (branch !== 'All') {
        data = {
          ...response.data,
          totalJobs: response.data.totalJobs.filter(row => row.branchname === branch),
          completedRows: response.data.completedRows.filter(row => row.ownbranchname === branch),
          rowshaiye: response.data.rowshaiye.filter(row => row.branchname === branch)
        };
      }

      setAllData(data);
      setOriginalData(response.data);

      const grouped = data.completedRows.reduce((acc, item) => {
        const key = item.tatimpcolumn;
        acc[key] = [...(acc[key] || []), item];
        return acc;
      }, {});
      setGroupedData(grouped);

      let count = 0;
      data.completedRows.forEach(item => {
        if (!item.timedelay.includes('-')) {
          count++;
        }
      });
      setNonNegativeCount(count);
      setFilteredData(data);
      onDataFetch({
        allData: data,
        originalData: response.data,
        groupedData: grouped,
        nonNegativeCount: count
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData('All');
    setSelectedBranchofUser('All');
  }, []);

  const generateRandomColor = (numColors) => {
    const randomColor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    const selectedColors = [];
    for (let i = 0; i < numColors; i++) {
      const randomIndex = Math.floor(Math.random() * randomColor.length);
      selectedColors.push(randomColor[randomIndex]);
    }
    return selectedColors;
  };

  const filterData = async () => {
    try {
      const filteredRows = (originalData.completedRows || []).filter(row => {
        const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
        const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
        const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
        return actualDate >= startDateObj && actualDate <= endDateObj;
      });

      const updatedAllData = { ...allData, completedRows: filteredRows };

      setAllData(updatedAllData);

      let count = 0;
      filteredRows.forEach(row => {
        if (!row.timedelay.includes('-')) {
          count++;
        }
      });
      setNonNegativeCount(count);
      onDataFetch({
        allData: updatedAllData,
        nonNegativeCount: count
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setAllData(originalData);
  };

  const getPieChartData = () => {
    const totalJobs = allData.totalJobs ? allData.totalJobs.length : 0;

    const chartData = allData.rowshaiye ? allData.rowshaiye.map(item => {
      const completedRowsForItem = allData.completedRows.filter(row => row.tatimpcolumn === item.workflowName && row.ownbranchname === item.branchname);
      const completedCount = completedRowsForItem.length;
      const percentage = totalJobs > 0 ? ((completedCount / totalJobs) * 100).toFixed(2) : 0;
      return parseFloat(percentage);
    }) : [];

    return {
      labels: allData.rowshaiye ? allData.rowshaiye.map(item => `${item.workflowName} (${item.branchname})`) : [],
      datasets: [
        {
          backgroundColor: allData.rowshaiye ? generateRandomColor(allData.rowshaiye.length) : [],
          data: chartData
        }
      ]
    };

  };

  async function handleChangeBranch(branch) {
    try {
      setSelectedBranchofUser(branch);
      fetchAllData(branch);
    } catch (error) {
      console.log(error);
    }
  }

  const empnameasusername = localStorage.getItem('fullname');

  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <div className="date-filters-report">
              <input
                className='start-date-filters-report'
                type="datetime-local"
                placeholder="Start Date"
                name='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className='end-date-filters-report'
                type="datetime-local"
                placeholder="End Date"
                name='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className='mt-4 all-buttons-user-import'>
                <CButton color="primary" onClick={filterData} className='filter-button'>Search</CButton>
                <CButton color="primary" onClick={clearFilters} className='clear-button'>Clear</CButton>
              </div>
            </div>

            <div>
              <label>Select Branch For the User:</label>
              <CDropdown>
                <CDropdownToggle color="secondary">
                  {selectedBranchofUser ? selectedBranchofUser : branchdata[branchdata.length - 1]}
                </CDropdownToggle>
                <CDropdownMenu>
                  {branchdata && branchdata.map((branch, index) => (
                    <CDropdownItem key={index} onClick={() => handleChangeBranch(branch)}>
                      {branch}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </div>

            <CTable className='left-div-report'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Assigned</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Completed</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Delayed</CTableHeaderCell>
                  <CTableHeaderCell scope="col">%</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {allData.rowshaiye && allData.rowshaiye.map((item, index) => {
                  const completedRowsForItem = allData.completedRows.filter(row => row.tatimpcolumn === item.workflowName && row.ownbranchname === item.branchname);
                  const completedCount = completedRowsForItem.length;
                  const delayedCount = completedRowsForItem.filter(row => !row.timedelay.includes('-')).length;
                  const totalCount = allData.totalJobs.length;
                  const percentage = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(2) : 0;

                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell>
                        {item.workflowName} {selectedBranchofUser === 'All' ? `(${item.branchname})` : ''}
                      </CTableHeaderCell>
                      <CTableDataCell>{completedCount}/{totalCount}</CTableDataCell>
                      <CTableDataCell>{delayedCount}</CTableDataCell>
                      <CTableDataCell>{percentage}%</CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>
            </CTable>
            <div>
              <div>Total rows completed with time delay: {nonNegativeCount}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
              <div>Number of Jobs created by {empnameasusername} : {allData.access?.length}/{totalJobsofOrg}</div>
            </div>
            <div className='right-div-report'>
              <CChart
                type="pie"
                data={getPieChartData()}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: 'blue',
                      }
                    }
                  },
                }}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  );
}

export { User_Import };










































































































































