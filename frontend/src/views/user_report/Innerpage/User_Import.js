
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CCard, CCol, CCardBody, CButton } from '@coreui/react';
// import { CChart } from '@coreui/react-chartjs';
// import '../../../css/styles.css';
// import moment from 'moment';

// const User_Import = () => {
//   const [allData, setallData] = useState([]);
//   const [groupedData, setGroupedData] = useState([]);

//   const [startDate, setstartDate] = useState('');
//   const [endDate, setendDate] = useState('');
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
//       setallData(response.data);
//       // grouping code
//       const grouped = response.data.completedRows.reduce((acc, item) => {
//         const key = item.tatimpcolumn;
//         acc[key] = [...(acc[key] || []), item];
//         return acc;
//       }, {});
//       setGroupedData(grouped);
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
//       '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
//     const selectedColors = [];
//     for (let i = 0; i < numColors; i++) {
//       const randomIndex = Math.floor(Math.random() * randomColor.length);
//       selectedColors.push(randomColor[randomIndex]);
//     }
//     return selectedColors;
//   };





//   async function filterData() {
//     try {
//       const filteredRows = allData.completedRows.filter(row => {
//         const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
//         const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
//         const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
//         return actualDate >= startDateObj && actualDate <= endDateObj;
//       });

//       setallData({ ...allData, completedRows: filteredRows });
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
//   }





//   const clearFilters = () => {
//     setstartDate('');
//     setendDate('');
//     fetchAllData();
//   };




//   return (
//     <div>
//       <CCol xs={12}>
//         <CCard className="mb-2 container-div">
//           <CCardBody className='main-div'>


//             <div className="date-filters">
//               <input
//                 type="datetime-local"
//                 placeholder="Start Date"
//                 name='startDate'
//                 value={startDate}
//                 onChange={(e) => setstartDate(e.target.value)}
//               />
//               <input
//                 type="datetime-local"
//                 placeholder="End Date"
//                 name='endDate'
//                 value={endDate}
//                 onChange={(e) => setendDate(e.target.value)}
//               />
//               <CButton color="primary" onClick={filterData}>Filter</CButton>
//               <CButton color="primary" onClick={clearFilters}>Clear</CButton>
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

//               {/* {allData.completedRows && allData.completedRows.map((item, index) => {
//                 if (item.timedelay.includes('-')) {
//                   return null;
//                 } else {
//                   nonNegativeCount++; // Increment count for non-negative time delay
//                   return (
//                     <div key={index}>

//                     </div>
//                   );
//                 }
//               })} */}

//               {/* Display the count */}
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
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCol, CCardBody, CButton } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import '../../../css/styles.css';
import moment from 'moment';

const User_Import = () => {
  const [allData, setAllData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nonNegativeCount, setNonNegativeCount] = useState(0);

  const fetchAllData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
        params: {
          username: localStorage.getItem('empnameforaccess'),
          fullname: localStorage.getItem('fullname'),
          branchname: localStorage.getItem('branchname')
        }
      });
      setAllData(response.data);
      setOriginalData(response.data);
      // Grouping code
      const grouped = response.data.completedRows.reduce((acc, item) => {
        const key = item.tatimpcolumn;
        acc[key] = [...(acc[key] || []), item];
        return acc;
      }, {});
      setGroupedData(grouped);
      // Count non-negative rows
      let count = 0;
      response.data.completedRows.forEach(item => {
        if (!item.timedelay.includes('-')) {
          count++;
        }
      });
      setNonNegativeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData();
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

  const filterData = () => {
    try {
      const filteredRows = originalData.completedRows.filter(row => {
        const actualDate = moment(row.actualdate).format('YYYY-MM-DDTHH:mm');
        const startDateObj = moment(startDate).format('YYYY-MM-DDTHH:mm');
        const endDateObj = moment(endDate).format('YYYY-MM-DDTHH:mm');
        return actualDate >= startDateObj && actualDate <= endDateObj;
      });

      setAllData({ ...allData, completedRows: filteredRows });

      // Count non-negative rows
      let count = 0;
      filteredRows.forEach(row => {
        if (!row.timedelay.includes('-')) {
          count++;
        }
      });
      setNonNegativeCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setAllData(originalData);
  };

  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
          <div className="date-filters">
              <input
                type="datetime-local"
                placeholder="Start Date"
                name='startDate'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="datetime-local"
                placeholder="End Date"
                name='endDate'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className='mt-4 all-buttons-user-import'>
              <CButton color="primary" onClick={filterData}>Filter</CButton>
              <CButton color="primary" onClick={clearFilters} className='clear-button'>Clear</CButton>
              </div>
            <div className='main-div'>
            
              
            </div>
            </div>
            <div className='left-div'>
              {allData.access && allData.access.map((accessItem, index) => {
                const groupName = accessItem.value;
                const groupLength = groupedData[groupName] ? groupedData[groupName].length : 0;

                return (
                  <div key={index}>
                    <h6>{groupName}</h6>
                    <p>{groupLength + '/' + allData.totalJobs.length}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <div>Total rows completed with time delay: {nonNegativeCount}/{allData.totalJobs ? allData.totalJobs.length : 0}</div>
            </div>
            <div className='right-div'>
              <CChart
                type="doughnut"
                data={{
                  labels: allData.access ? allData.access.map(item => item.value) : [],
                  datasets: [
                    {
                      backgroundColor: allData.access ? generateRandomColor(allData.access.length) : [],
                      data: allData.access ? allData.access.map(accessItem => groupedData[accessItem.value] ? groupedData[accessItem.value].length : 0) : [],
                    },
                  ],
                }}
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
};

export { User_Import };






