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
    postalCode: '',
    phoneNumber: '',
    emailAddress: '',
    branchName: ''
  })


  const [prefilledData, setPrefilledData] = useState({
    clientname: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    emailAddress: '',
    branchName: '',
    PAN: '',
    GST: '',
    IEC: '',
    creditdays: ''
  })



  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if(localStorage.getItem('clientname') && localStorage.getItem('alias') && localStorage.getItem('branchname')){

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
          postalCode: data.postalcode,
          phoneNumber: data.phone,
          emailAddress: data.email,
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

  const handleSaveGeneralData = (data) => {
    setGeneralData(data);
  };


  const handleSaveAccountData = (data) => {
    setAccountData(data);
  }


  const handleSaveRegistrationData = (data) => {
    setRegistrationData(data);
  }




  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem('orgname');
      const codeoforg = localStorage.getItem('orgcode');
      const response = await axios.post('http://localhost:5000/org/store', {
        branchName: generalData.branchName,
        clientname: generalData.clientname,
        address: generalData.address,
        country: generalData.country,
        state: generalData.state,
        city: generalData.city,
        postalCode: generalData.postalCode,
        phoneNumber: generalData.phoneNumber,
        emailAddress: generalData.emailAddress,
        PAN: registrationData.PAN,
        GST: registrationData.GST,
        IEC: registrationData.IEC,
        creditdays: accountData.creditdays,
        orgname: nameoforg,
        orgcode: codeoforg
      })

      navigate('/organization#/organization')
    } catch (error) {
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
        <div className='search-button'>
          <CButton color="primary" type="submit">
            Save
          </CButton>
        </div>

        <div className='search-button'>
          <CButton color="primary" type="submit" onClick={handleSubmit}>
            Save & Close
          </CButton>
        </div>

        <div className='search-button'>
          <CButton color="primary" type="submit">
            Close
          </CButton>
        </div>
      </div>
    </div>

  )
}

export default Createjob;
