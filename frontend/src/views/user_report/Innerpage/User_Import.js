// import React, { useState, useEffect } from 'react'
// import {
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CButton,
//   CCol,
//   CCard,
//   CCardBody,
//   CNav,
//   CNavItem,
//   CNavLink
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser, cilBuilding, cilChartPie, cilArrowRight } from '@coreui/icons'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import toast from 'react-hot-toast'
// import { useLocation, Link } from 'react-router-dom'
// // import { urImport } from './Innerpages';

// const User_Import = () => {

//   const [allData, setallData] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
//           params: {
//             username: localStorage.getItem('empnameforaccess'),
//             fullname: localStorage.getItem('fullname'),
//             branchname: localStorage.getItem('branchname')
//           }
//         })
//         setallData(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchAllData();
//   }, [])

//   console.log(allData);

//   return (

//     <>

//       {
//         allData.length > 0 && allData.map((item, index) => {

//           <div key={index}>
//             <h4>{item.name}</h4>
//           </div>

//         })
//       }

//     </>

//   );


// }

// export default User_Import ;


// './Innerpage/User_Import.js'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCol, CCardBody } from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import '../../../css/styles.css';

const User_Import = () => {
  const [allData, setallData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getAllRowsofUsername', {
          params: {
            username: localStorage.getItem('empnameforaccess'),
            fullname: localStorage.getItem('fullname'),
            branchname: localStorage.getItem('branchname')
          }
        });
        setallData(response.data);

        const grouped = response.data.completedRows.reduce((acc, item) => {
          const key = item.tatimpcolumn;
          acc[key] = [...(acc[key] || []), item];
          return acc;
        }, {});
        setGroupedData(grouped);
      } catch (error) {
        console.log(error);
      }
    };
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
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
      const selectedColors = [];
      for (let i = 0; i < numColors; i++) {
        const randomIndex = Math.floor(Math.random() * randomColor.length);
        selectedColors.push(randomColor[randomIndex]);
      }
      return selectedColors;
  };


  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody className='main-div'>
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
            <div className='right-div'>

              <CChart
                type="doughnut"
                data={{
                  labels: allData.access ? allData.access.map(item => item.value) : [],
                  datasets: [
                    {
                      backgroundColor: allData.access ? generateRandomColor(allData.access.length) : [],
                      data: allData.access ? allData.access.map(accessItem => groupedData[accessItem.value] ? groupedData[accessItem.value].length : 0): [],
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






















