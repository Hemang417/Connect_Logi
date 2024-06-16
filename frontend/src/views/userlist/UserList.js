// import React, { useEffect } from 'react'
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableCaption,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CDropdown,
//   CDropdownToggle,
//   CDropdownMenu,
//   CDropdownItem,
//   CFormInput,
//   CFormLabel,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CForm,
//   CButton
// } from '@coreui/react'
// import '../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'
// import {useNavigate} from 'react-router-dom'

// const UserList = () => {
//   const [date, setDate] = useState(new Date());
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
//   const [visible, setVisible] = useState(false);
//   const navigate = useNavigate();
//   const [allData, setAllData] = useState();
//   const [importData, setImportData] = useState(false);

//   useEffect(() => {
//     const fetchAllusernames = async () => {
//       try {
//         const codeoforg = localStorage.getItem('orgcode');
//         const nameoforg = localStorage.getItem('orgname');
//         const username = localStorage.getItem('empnameforaccess');
//         const response = await axios.get('http://localhost:5000/fetchAllusers', {
//           params: {
//             orgcode: codeoforg,
//             orgname: nameoforg,
//             username: username
//           }
//         })

//         setAllData(response.data.rows);
//         console.log(response);
//         if(response.data.success){
//           setImportData(true);
//         }
//       } catch (error) {
//         console.log('Error: ' + error);
//       }
//     }
//     fetchAllusernames();
//   }, []);


//   async function handleAccess(index) {
//     try {
//       // Access the username at the specified index in the allData state
//       const username = allData[index].username;


//       // Store the username in localStorage
//       localStorage.setItem('empnameforaccess', username);

//       // navigate('/#/UserListAccess');
//       // Optionally, you can redirect or perform any other action here
//     } catch (error) {
//       console.log(error);
//     }
//   }




//   return (
//     <div>
//       <CTable hover responsive striped className=''>
//         <CTableHead>
//           <CTableRow color='dark' >
//             <CTableHeaderCell scope="col"></CTableHeaderCell>
//             <CTableHeaderCell scope="col">Username</CTableHeaderCell>
//             <CTableHeaderCell scope="col">Access</CTableHeaderCell>


//           </CTableRow>
//         </CTableHead>

//         <CTableBody>
//           {allData && allData.map((userData, index) => (

//             <CTableRow key={index}>
//               <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                 <Link to={'/UserListAccess'} onClick={() => handleAccess(index)}>Edit</Link>
//               </th>
//               <CTableHeaderCell scope="row">{userData.username}</CTableHeaderCell>
//               <CTableDataCell>{importData? 'Import': 'Access'}</CTableDataCell>
//             </CTableRow>

//           ))}
//         </CTableBody>
//       </CTable>
//     </div>
//   )
// }

// export default UserList;











import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton, CPopover, CRow, CCardBody
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/styles.css';
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
const UserList = () => {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [userAccessData, setuserAccessData] = useState([])
  const location = useLocation();
  if (location.pathname === '/userlist') {
    localStorage.removeItem('empnameforaccess');
    localStorage.removeItem('accessedRows')
  }
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('userauthtoken');
      if (!token){
        navigate('/login')
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    const fetchAllUsernames = async () => {
      try {
        const codeoforg = localStorage.getItem('orgcode');
        const nameoforg = localStorage.getItem('orgname');
        const username = localStorage.getItem('empnameforaccess');
        const response = await axios.get('http://localhost:5000/fetchAllusers', {
          params: {
            orgcode: codeoforg,
            orgname: nameoforg,
            username: username
          }
        });
        setAllData(response.data.rows);
        setuserAccessData(response.data.row);

      } catch (error) {
        console.log('Error: ' + error);
      }
    };
    fetchAllUsernames();
  }, []);

  const handleAccess = async (index) => {
    // Access the username at the specified index in the allData state
    const username = allData[index].username;
    const response = await axios.get('http://localhost:5000/getAccessedRowsforauser', {
      params: {
        username: username
      }
    });
    localStorage.setItem('accessedRows', JSON.stringify(response.data));
    // Store the username in localStorage
    localStorage.setItem('empnameforaccess', username);
    localStorage.setItem('fullnameforaccess', allData[index].fullname);
    navigate('/UserListAccess');
    // Optionally, you can redirect or perform any other action here
  };



  // async function getThatUserdata(username) {
  //     try {
  //       const alltherows = await axios.get('http://localhost:5000/getAllRowsofUsername', {
  //         params: {
  //           username: username
  //         }
  //       })

  //       console.log(alltherows);
  //     } catch (error) {
  //       console.log(error);
  //     }
  // }

  function gotonewuser() {
    try {
      navigate('/new_user');
    } catch {

    }
  }


  return (
    <div>

      <CRow>
        <CCardBody className="button-div">
          <div className="createjob-button">
            <CPopover content="Create a role" trigger={['hover', 'focus']}>
              <CButton color="primary" onClick={gotonewuser}>
                +
              </CButton>
            </CPopover>
          </div>
        </CCardBody>
      </CRow>



      <CTable hover responsive striped className=''>
        <CTableHead>
          <CTableRow color='dark'>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Access</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {allData.map((userData, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">
                <th scope="row" className="font-small text-gray-900 whitespace-nowrapark:text d-white">
                  <Link onClick={() => handleAccess(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                      <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                    </svg>
                  </Link>
                </th>

                {/* </CPopover> */}
              </CTableHeaderCell>
              <CTableHeaderCell scope="row">{userData.username}</CTableHeaderCell>
              <CTableDataCell>
                {userAccessData.some(accessUser => accessUser.username === userData.username) ? 'Import' : 'Access'}
              </CTableDataCell>
              {/* <CTableDataCell>
                <CButton onClick={() => getThatUserdata(userData)}>Generate Report</CButton>
              </CTableDataCell> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default UserList;
