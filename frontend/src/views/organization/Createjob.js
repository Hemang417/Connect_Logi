// import React, { useState, useEffect } from 'react';
// import { CButton, CNav, CNavItem, CNavLink } from '@coreui/react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { General, Registration, Accounts, Contactdetails } from './Innerpage';

// const CreateJob = () => {
//   const [activeTab, setActiveTab] = useState('general');
//   const navigate = useNavigate();

//   const [branches, setBranches] = useState([]);

//   const [formData, setFormData] = useState({
//     clientname: '',
//     address: '',
//     country: '',
//     state: '',
//     city: '',
//     postalCode: '',
//     phoneNumber: '',
//     emailAddress: '',
//     branchName: '',
//     PAN: '',
//     GST: '',
//     IEC: '',
//     creditdays: ''
//   });





//   useEffect(() => {
//     // Fetch branches from localStorage
//     const storedBranches = JSON.parse(localStorage.getItem('branches')) || [];
//     setBranches(storedBranches);
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleSaveGeneralData = (data) => {
//     setFormData(data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/org/store', {
//         ...formData
//       });
//       navigate('/organization#/organization');
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };

//   return (
//     <div>
//       <CNav variant="tabs">
//         <CNavItem>
//           <CNavLink onClick={() => handleTabClick('general')} active={activeTab === 'general'}>General</CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink onClick={() => handleTabClick('registration')} active={activeTab === 'registration'}>Registration</CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink onClick={() => handleTabClick('accounts')} active={activeTab === 'accounts'}>Accounts</CNavLink>
//         </CNavItem>
//         <CNavItem>
//           <CNavLink onClick={() => handleTabClick('contactdetails')} active={activeTab === 'contactdetails'}>Contact Details</CNavLink>
//         </CNavItem>
//       </CNav>

//       {activeTab === 'general' && (
//         <General onSave={handleSaveGeneralData} formData={formData} branches={branches} />
//       )}

//       {activeTab === 'registration' && (
//         <Registration formData={formData} onSave={handleSaveGeneralData}/>
//       )}

//       {activeTab === 'accounts' && (
//         <Accounts formData={formData} onSave={handleSaveGeneralData}/>
//       )}

//       {activeTab === 'contactdetails' && (
//         <Contactdetails formData={formData} onSave={handleSaveGeneralData}/>
//       )}

//       <div className='all-buttons'>
//         <div className='search-button'>
//           <CButton color="primary" type="submit" onClick={handleSubmit}>Save</CButton>
//         </div>

//         <div className='search-button'>
//           <CButton color="primary" type="submit" onClick={handleSubmit}>Save & Close</CButton>
//         </div>

//         <div className='search-button'>
//           <CButton color="primary" type="submit" onClick={handleSubmit}>Close</CButton>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateJob;














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
  CButton,
  CNavItem,
  CNav,
  CNavLink
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { General, Registration, Accounts, Contactdetails } from './Innerpage';
import toast from 'react-hot-toast'

const Createjob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  // const [isActive, setActive] = useState("false");
  const [isshown, setIsShown] = useState("general");
  const navigate = useNavigate();


  const [generalData, setGeneralData] = useState({
    clientname: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postalcode: '',
    phone: '',
    email: '',
    branchName: ''
  })


  const [prefilledData, setPrefilledData] = useState({
    clientname: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postal: '',
    phone: '',
    email: '',
    branchName: '',
    PAN: '',
    GST: '',
    IEC: '',
    creditdays: ''
  })



  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (localStorage.getItem('clientname') && localStorage.getItem('alias') && localStorage.getItem('branchname')) {

          const response = await axios.get('http://localhost:5000/allFetch', {
            params: {
              clientname: localStorage.getItem('clientname'),
              alias: localStorage.getItem('alias'),
              branchname: localStorage.getItem('branchname')
            }
          });
          const data = response.data;

          setPrefilledData({
            clientname: data.clientname,
            address: data.address,
            country: data.country,
            state: data.state,
            city: data.city,
            postalcode: data.postalcode,
            phone: data.phone,
            email: data.email,
            branchName: data.branchname,
            PAN: data.PAN,
            GST: data.GST,
            IEC: data.IEC,
            creditdays: data.creditdays
          });
        }
      } catch (error) {
        console.log('Error: ' + error);
      }
    };
    fetchClientData();
  }, []);


  const [registrationData, setRegistrationData] = useState({
    PAN: '',
    GST: '',
    IEC: ''
  })

  const [accountData, setAccountData] = useState({
    creditdays: ''
  })

  // console.log(allFetch);

  async function handleSaveGeneralData(data) {
    if (localStorage.getItem('branchDataforprefill')) {
      const localstorageobjtoupdate = await JSON.parse(localStorage.getItem('branchDataforprefill'));
      localstorageobjtoupdate.address = data.address;
      localstorageobjtoupdate.country = data.country;
      localstorageobjtoupdate.state = data.state;
      localstorageobjtoupdate.city = data.city;
      localstorageobjtoupdate.postalcode = data.postalcode;
      localstorageobjtoupdate.phone = data.phone;
      localstorageobjtoupdate.email = data.email;
      localStorage.setItem('branchDataforprefill', JSON.stringify(localstorageobjtoupdate));
    }

    setGeneralData(data);
  };


  const handleSaveAccountData = async (data) => {
    if (localStorage.getItem('branchDataforprefill')) {
      const localstorageobjtoupdate = await JSON.parse(localStorage.getItem('branchDataforprefill'));
      localstorageobjtoupdate.creditdays = data.creditdays;
      localStorage.setItem('branchDataforprefill', JSON.stringify(localstorageobjtoupdate));
    }

    setAccountData(data);
  }


  const handleSaveRegistrationData = async (data) => {
    if (localStorage.getItem('branchDataforprefill')) {
      const localstorageobjtoupdate = await JSON.parse(localStorage.getItem('branchDataforprefill'));
      localstorageobjtoupdate.PAN = data.PAN;
      localstorageobjtoupdate.GST = data.GST;
      localstorageobjtoupdate.IEC = data.IEC;
      localStorage.setItem('branchDataforprefill', JSON.stringify(localstorageobjtoupdate));
    }
    setRegistrationData(data);
  }




  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem('orgname');
      const codeoforg = localStorage.getItem('orgcode');
      const employeename = localStorage.getItem('username');

      const response = await axios.post('http://localhost:5000/org/store', {
        branchName: generalData.branchName,
        clientname: generalData.clientname,
        address: generalData.address,
        country: generalData.country,
        state: generalData.state,
        city: generalData.city,
        postalcode: generalData.postalcode,
        phone: generalData.phone,
        email: generalData.email,
        PAN: registrationData.PAN,
        GST: registrationData.GST,
        IEC: registrationData.IEC,
        creditdays: accountData.creditdays,
        orgname: nameoforg,
        orgcode: codeoforg,
        username: employeename
      })
      localStorage.removeItem('isEditing');
      toast.success('Stored client successfully');

      let insertedRowsBID = response.data;

      const inserttheID = await axios.put('http://localhost:5000/updateTheBID', {
        BID: insertedRowsBID,
        clientname: generalData.clientname,
        orgcode: codeoforg,
        branchname: generalData.branchName
      });


      const inserttheIDincontact = await axios.put('http://localhost:5000/updatetheBIDcontact', {
        BID: insertedRowsBID,
        clientname: generalData.clientname,
        orgcode: codeoforg,
        orgname: nameoforg,
        branchname: generalData.branchName
      })

      localStorage.removeItem('branchnames');
      navigate('/organization#/organization');

    } catch (error) {
      toast.error('Error in storing client successfully')
      console.log("Error: " + error);
    }
  }

  // const [fetchedOrg, setFetchedOrg] = useState([]);

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       const nameoforg = localStorage.getItem('orgname');
  //       const codeoforg = localStorage.getItem('orgcode');
  //       console.log(nameoforg, codeoforg);
  //       const allData = await axios.get('http://localhost:5000/allFetch', {
  //         params: {
  //           orgname: nameoforg,
  //           orgcode: codeoforg
  //         }
  //       })
  //       setFetchedOrg(allData.data)
  //     } catch (error) {
  //       console.log("Error: " + error);
  //     }
  //   }
  //   fetchAll();
  // }, [])


  function redirectToOrg() {
    localStorage.removeItem('organizationbranches');
    localStorage.removeItem('firstorgofclient');
    localStorage.removeItem('alias');
    localStorage.removeItem('organizationclientname');
    localStorage.removeItem('isEditing');
    localStorage.removeItem('branchDataforprefill');
    navigate('/organization#/organization');
  }





  async function updateData(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem('orgname');
      const codeoforg = localStorage.getItem('orgcode');
      const alias = localStorage.getItem('alias');

      const localstorageobjtoupdate = await JSON.parse(localStorage.getItem('branchDataforprefill'));


      // Fetch the latest data from state variables
      const dataToUpdate = {
        alias: alias,
        branchname: localstorageobjtoupdate.branchname,
        id: localstorageobjtoupdate.id,
        clientname: localstorageobjtoupdate.clientname,
        address: localstorageobjtoupdate.address,
        country: localstorageobjtoupdate.country,
        state: localstorageobjtoupdate.state,
        city: localstorageobjtoupdate.city,
        postalcode: localstorageobjtoupdate.postalcode,
        phone: localstorageobjtoupdate.phone,
        email: localstorageobjtoupdate.email,
        PAN: localstorageobjtoupdate.PAN,
        GST: localstorageobjtoupdate.GST,
        IEC: localstorageobjtoupdate.IEC,
        creditdays: localstorageobjtoupdate.creditdays,
        orgname: nameoforg,
        orgcode: codeoforg
      };

      // Send update request with the latest data
      const response = await axios.put('http://localhost:5000/updateData', dataToUpdate);
      toast.success('Updated data successfully')
      // Redirect after successful update
      navigate('/organization#/organization');
    } catch (error) {
      toast.error('Error updating data')
      console.log("Error: " + error);
    }
  }







  async function storenewbranch(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem('orgname');
      const codeoforg = localStorage.getItem('orgcode');
      const employeename = localStorage.getItem('username');
      const alias = localStorage.getItem('alias');
      const response = await axios.post('http://localhost:5000/org/store', {
        branchName: localStorage.getItem('branchnames'),
        clientname: localStorage.getItem('organizationclientname'),
        address: generalData.address,
        country: generalData.country,
        state: generalData.state,
        city: generalData.city,
        postalcode: generalData.postalcode,
        phone: generalData.phone,
        email: generalData.email,
        PAN: registrationData.PAN,
        GST: registrationData.GST,
        IEC: registrationData.IEC,
        creditdays: accountData.creditdays,
        orgname: nameoforg,
        orgcode: codeoforg,
        username: employeename,
      })
      toast.success('Branch added successfully');

      let insertedRowsBID = response.data;

      const inserttheID = await axios.put('http://localhost:5000/updateTheBID', {
        BID: insertedRowsBID,
        clientname: localStorage.getItem('organizationclientname'),
        orgcode: codeoforg,
        branchname: localStorage.getItem('branchnames')
      });


      const inserttheIDincontact = await axios.put('http://localhost:5000/updatetheBIDcontact', {
        BID: insertedRowsBID,
        clientname: localStorage.getItem('organizationclientname'),
        orgcode: codeoforg,
        orgname: nameoforg,
        branchname: localStorage.getItem('branchnames')
      })



      navigate('/organization#/organization');

    } catch (error) {
      console.log(error);
    }
  }







  // async function updateData(e) {
  //   try {
  //     e.preventDefault();
  //     const nameoforg = localStorage.getItem('orgname');
  //     const codeoforg = localStorage.getItem('orgcode');
  //     const alias = localStorage.getItem('alias');
  //     // const clientname = localStorage.getItem('clientname');
  //     const selectedBranchName = localStorage.getItem('selectedBranchName');
  //     console.log(generalData, registrationData, accountData);
  //     const response = await axios.put('http://localhost:5000/updateData', {
  //       alias: alias,
  //       branchname: selectedBranchName,
  //       clientname: generalData.clientname,
  //       address: generalData.address,
  //       country: generalData.country,
  //       state: generalData.state,
  //       city: generalData.city,
  //       postalcode: generalData.postalcode,
  //       phone: generalData.phone,
  //       email: generalData.email,
  //       PAN: registrationData.PAN,
  //       GST: registrationData.GST,
  //       IEC: registrationData.IEC,
  //       creditdays: accountData.creditdays,
  //       orgname: nameoforg,
  //       orgcode: codeoforg
  //     })

  //     navigate('/organization#/organization')
  //   } catch (error) {
  //     console.log("Error: " + error);
  //   }
  // }




  return (
    <div>
      {/* <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <input type="text" placeholder="Name" className='text-field-1' />
            <input type="text" placeholder="Alias" className='text-field-1' />
          </CCardBody>
        </CCard>
      </CCol> */}

      <CNav variant="tabs">
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("general") }}>General</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("registration") }}>Registration</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("accounts") }}>Accounts</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("contactdetails") }}>Contact Details</CNavLink>
        </CNavItem>

      </CNav>
      {isshown === "general" && <General onSave={handleSaveGeneralData} gData={prefilledData} />}
      {isshown === "registration" && <Registration onSave={handleSaveRegistrationData} rData={prefilledData} />}
      {isshown === "accounts" && <Accounts onSave={handleSaveAccountData} aData={prefilledData} />}
      {isshown === "contactdetails" && <Contactdetails />}

      <div className='all-buttons'>


        {localStorage.getItem('updateBtn') === 'true' ? (
          <div className='search-button'>
            <CButton color="primary" type="submit" onClick={updateData}>
              Update
            </CButton>
          </div>
        ) : (
          <div className='search-button'>
            <CButton color="primary" type="submit" onClick={handleSubmit}>
              Save & Close
            </CButton>
          </div>
        )}


        {localStorage.getItem('isEditing') === 'true' && localStorage.getItem('branchnames') && (
          <div className='search-button'>
            <CButton color="primary" type="submit" onClick={storenewbranch}>
              Save New Branch
            </CButton>
          </div>
        )}


        <div className='search-button'>
          <CButton color="primary" type="submit" onClick={redirectToOrg}>
            Close
          </CButton>
        </div>
      </div>
    </div>

  )
}

export default Createjob;