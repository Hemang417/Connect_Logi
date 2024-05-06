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
//   CForm,
//   CButton
// } from '@coreui/react'
// import '../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'


// const organization = () => {
//   const [date, setDate] = useState(new Date());
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
//   const [organization, setOrganization] = useState([]);


//   useEffect(() => {
//     const renderOverview = async () => {
//       try {
//         const nameoforg = localStorage.getItem('orgname');
//         const codeoforg = localStorage.getItem('orgcode');

//         const response = await axios.get('http://localhost:5000/getOrg', {
//           params: {
//             orgname: nameoforg,
//             orgcode: codeoforg
//           }
//         });
//         setOrganization([response.data]);
//       } catch (error) {
//         console.log("Error: " + error);
//       }
//     }
//     renderOverview();
//   }, [])


// console.log(organization);

//   async function prefillData(index) {
//     try {
//       localStorage.setItem('clientname', organization[index].clientname);
//       localStorage.setItem('alias', organization[index].alias)
//       localStorage.setItem('branchname', organization[index].allbranchesofclient);
//     } catch (error) {
//       console.log("Error: " + error);
//     }
//   }


//   function removeLocal(){
//     localStorage.removeItem('clientname');
//     localStorage.removeItem('alias');
//     localStorage.removeItem('branchname');
//     localStorage.removeItem('selectedBranchName')
//   }


//   return (
//     // JOB SEARCH - DROPDOWN & TEXT FIELD
//     <CRow>
//       <CCardBody className='button-div'>
//         <div className='createjob-button'>
//           <Link to={'/Createjob'}>
//             <CButton color="primary" type="submit" onClick={removeLocal}>
//               +
//             </CButton>
//           </Link>
//         </div>
//         <div className='createjob-button'>
//           <CButton color="primary" type="submit">
//             <img src='../../importIcons/delete.png' />
//           </CButton>
//         </div>
//         <div className='createjob-button'>
//           <CButton color="primary" type="submit">
//             <img src='../../importIcons/refresh.png' width="10px" height="10px" />
//           </CButton>
//         </div>
//         <div className='createjob-button'>
//           <CButton className="btn btn-primary" type="button">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon" role="img" aria-hidden="true">
//               <polygon fill="var(--ci-primary-color, currentColor)" points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" class="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z" class="ci-primary"></path>
//             </svg>
//             <span class="visually-hidden">Download file</span>
//           </CButton>
//         </div>

//       </CCardBody>

//       <CCol xs={12}>
//         <CCard className="mb-2 container-div">
//           <CCardBody>
//             {/* <CDropdown>
//   <CDropdownToggle color="secondary">Job No.</CDropdownToggle>
//   <CDropdownMenu>
//     <CDropdownItem href="#">BE No.</CDropdownItem>
//     <CDropdownItem href="#">HBL/HAWB No.</CDropdownItem>
//     <CDropdownItem href="#">MBL/MAWB No.</CDropdownItem>
//     <CDropdownItem href="#">Container No.</CDropdownItem>
//   </CDropdownMenu>
//     <CFormInput type="text" size="sm" placeholder="" aria-label="sm input example"/>
//   </CDropdown> */}

//             <input type="text" placeholder="Name" className='text-field' />

//             <input type="text" placeholder="Alias" className='text-field' />

//           </CCardBody>
//           <div className='search-button'>
//             <CButton color="primary" type="submit">
//               Search
//             </CButton>
//           </div>

//         </CCard>
//       </CCol>

//       <CForm>

//         <CTable hover responsive striped className=''>
//           <CTableHead>
//             <CTableRow color='dark' >
//               <CTableHeaderCell scope="col"></CTableHeaderCell>
//               <CTableHeaderCell scope="col">Name</CTableHeaderCell>
//               <CTableHeaderCell scope="col">Alias</CTableHeaderCell>

//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             {organization.map((organization, index) => (
//               <CTableRow key={index}>
//                 <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                   <Link to={"/Createjob"} onClick={() => prefillData(index)}>
//                     Edit
//                   </Link>
//                 </th>
//                 <CTableHeaderCell scope="row">{organization.clientname}</CTableHeaderCell>
//                 <CTableDataCell>{organization.alias}</CTableDataCell>
//               </CTableRow>
//             ))}
//           </CTableBody>

//         </CTable>
//       </CForm>

//     </CRow>

//   )
// }

// export default organization;















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
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import toast from 'react-hot-toast'

const organization = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [organization, setOrganization] = useState([]);
  // const [searchName, setSearchName] = useState('');
  // const [searchAlias, setSearchAlias] = useState('');

  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  
  if(location.pathname=='/organization'){
    localStorage.removeItem('updateBtn');
    localStorage.removeItem('clientname');
    localStorage.removeItem('branchnames');
    localStorage.removeItem('organizationclientname');
    localStorage.removeItem('firstorgofclient');
    localStorage.removeItem('isEditing');
    localStorage.removeItem('branchDataforprefill');
    localStorage.removeItem('alias');
    localStorage.removeItem('organizationbranches');
    localStorage.removeItem('uniquevalue')    
  }

  useEffect(() => {
   const renderOverview = async () => {
      try {
        const nameoforg = localStorage.getItem('orgname');
        const codeoforg = localStorage.getItem('orgcode');
      
        const response = await axios.get('http://localhost:5000/getOrg', {
          params: {
            orgname: nameoforg,
            orgcode: codeoforg
          }
        });
       
        setOrganization(response.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
    renderOverview();
  }, [])






  const prefillData = (org) => {
    try {  
      localStorage.setItem('alias', org.alias);
      localStorage.setItem('organizationbranches', JSON.stringify(org.branches));
      localStorage.setItem('organizationclientname', org.clientname);
      localStorage.setItem('firstorgofclient', JSON.stringify(org.branches[0]));
      localStorage.setItem('updateBtn', true);
      localStorage.setItem('isEditing', true);
      localStorage.setItem('uniquevalue', 'OrgButton')
    } catch (error) {
      toast.error(error);
      console.log("Error: " + error);
    }
  };
  



  function removeLocal() {
    toast.success('Create new client now')
    localStorage.setItem('updateBtn', false);
    localStorage.removeItem('clientname');
    localStorage.removeItem('alias');
    localStorage.removeItem('branchname');
    localStorage.removeItem('selectedBranchName');
    localStorage.removeItem('isEditing');
    localStorage.setItem('uniquevalue', 'OrgButton')
  }






  const handleSearch = async () => {
    // Check if there is a search value
    if (searchValue.trim() !== '') {
      // Filter organizations based on searchValue
      const filteredOrg = organization.filter(org => {
        const clientname = org.clientname.toLowerCase();
        const alias = org.alias.toLowerCase();
        const searchTerm = searchValue.toLowerCase();
        return clientname.includes(searchTerm) || alias.includes(searchTerm);
      });
      
      setOrganization(filteredOrg);
    } else {
      // If no search value, display all organizations again
      const nameoforg = localStorage.getItem('orgname');
      const codeoforg = localStorage.getItem('orgcode');
  
      try {
        const response = await axios.get('http://localhost:5000/getOrg', {
          params: {
            orgname: nameoforg,
            orgcode: codeoforg
          }
        });
        setOrganization(response.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };
  





  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <CRow>
      <CCardBody className='button-div'>
        <div className='createjob-button'>
          <Link to={'/Createjob'}>
            <CButton color="primary" type="submit" onClick={removeLocal}>
              +
            </CButton>
          </Link>
        </div>
        <div className='createjob-button'>
          <CButton color="primary" type="submit">
            <img src='../../importIcons/delete.png' />
          </CButton>
        </div>
        <div className='createjob-button'>
          <CButton color="primary" type="submit">
            <img src='../../importIcons/refresh.png' width="10px" height="10px" />
          </CButton>
        </div>
        <div className='createjob-button'>
          <CButton className="btn btn-primary" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon" role="img" aria-hidden="true">
              <polygon fill="var(--ci-primary-color, currentColor)" points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" className="ci-primary">
              </polygon><path fill="var(--ci-primary-color, currentColor)" d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z" className="ci-primary"></path>
            </svg>
            <span className="visually-hidden">Download file</span>
          </CButton>
        </div>

      </CCardBody>

      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            {/* <CDropdown>
  <CDropdownToggle color="secondary">Job No.</CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">BE No.</CDropdownItem>
    <CDropdownItem href="#">HBL/HAWB No.</CDropdownItem>
    <CDropdownItem href="#">MBL/MAWB No.</CDropdownItem>
    <CDropdownItem href="#">Container No.</CDropdownItem>
  </CDropdownMenu>
    <CFormInput type="text" size="sm" placeholder="" aria-label="sm input example"/>
  </CDropdown> */}

            {/* <input type="text" placeholder="Name" className='text-field' />

            <input type="text" placeholder="Alias" className='text-field' /> */}



            {/* <input
              type="text"
              placeholder="Name"
              className="text-field"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Alias"
              className="text-field"
              value={searchAlias}
              onChange={(e) => setSearchName(e.target.value)}
            /> */}



            <input
              type='text' placeholder="Search Client" className="text-field" 
              onChange={(e) => setSearchValue(e.target.value)}
            />




          </CCardBody>
          <div className='search-button'>
            <CButton color="primary" type="submit" onClick={handleSearch}>
              Search
            </CButton>
            
          </div>

        </CCard>
      </CCol>

      <CForm>

        <CTable hover responsive striped className=''>
          <CTableHead>
            <CTableRow color='dark' >
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Alias</CTableHeaderCell>

            </CTableRow>
          </CTableHead>
          <CTableBody>

            {organization && organization.length > 0 ?
              organization.map((org, index) => (
                <CTableRow key={index}>
                  <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={"/Createjob"} onClick={() => prefillData(org)}>
                      Edit
                    </Link>
                  </th>
                  <CTableHeaderCell scope="row">{org.clientname}</CTableHeaderCell>
                  <CTableDataCell>{org.alias}</CTableDataCell>
                </CTableRow>
              )) :
              <CTableRow>
                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  No organizations found
                </th>
              </CTableRow>
            }



          </CTableBody>

        </CTable>
      </CForm>

    </CRow>

  )
}

export default organization;