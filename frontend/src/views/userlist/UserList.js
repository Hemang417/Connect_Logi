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
  CTableRow
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/styles.css';
import {useLocation} from 'react-router-dom'

const UserList = () => {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [userAccessData, setuserAccessData] = useState([])
  const location = useLocation();
  if(location.pathname === '/userlist'){
    localStorage.removeItem('empnameforaccess');
    localStorage.removeItem('accessedRows')
  }


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
    // navigate('/#/UserListAccess');
    // Optionally, you can redirect or perform any other action here
  };

  return (
    <div>
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
                <Link to={'/UserListAccess'} onClick={() => handleAccess(index)}>Edit</Link>
              </CTableHeaderCell>
              <CTableHeaderCell scope="row">{userData.username}</CTableHeaderCell>
              <CTableDataCell>
                {userAccessData.some(accessUser => accessUser.username === userData.username) ? 'Import' : 'Access'}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default UserList;
