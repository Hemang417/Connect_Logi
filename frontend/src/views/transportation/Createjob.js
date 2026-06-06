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
//       const response = await axios.post('http://localhost:5000/orgStore', {
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

import React, { useEffect } from "react";
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
  CNavLink,
  CPopover,
  CFormCheck,
} from "@coreui/react";
import "../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { General, Registration, Accounts, Contactdetails } from "./Innerpage";
import toast from "react-hot-toast";
import moment from "moment";
import "./css/organisation-styles.css"
const Createjob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  // const [isActive, setActive] = useState("false");
  const [isshown, setIsShown] = useState("general");
  const navigate = useNavigate();
  const [checkedBoxOptions, setCheckedBoxOptions] = useState([]);

  const [generalData, setGeneralData] = useState({
    clientname: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    phone: "",
    email: "",
    branchName: "",
  });

  const [prefilledData, setPrefilledData] = useState({
    clientname: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postal: "",
    phone: "",
    email: "",
    branchName: "",
    PAN: "",
    GST: "",
    IEC: "",
    creditdays: "",
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (
          localStorage.getItem("clientname") &&
          localStorage.getItem("alias") &&
          localStorage.getItem("branchname")
        ) {
          const response = await axios.get("http://localhost:5000/allFetch", {
            params: {
              clientname: localStorage.getItem("clientname"),
              alias: localStorage.getItem("alias"),
              branchname: localStorage.getItem("branchname"),
            },
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
            creditdays: data.creditdays,
          });
          const selectedOptions = data.checkedBoxOptions || [];
          setCheckedBoxOptions(selectedOptions);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchClientData();
  }, []);

  const [registrationData, setRegistrationData] = useState({
    PAN: "",
    GST: "",
    IEC: "",
  });

  const [accountData, setAccountData] = useState({
    creditdays: "",
    followup2: "",
    followup: "",
  });

  // console.log(allFetch);

  async function handleSaveGeneralData(data) {
    if (localStorage.getItem("branchDataforprefill")) {
      const localstorageobjtoupdate = await JSON.parse(
        localStorage.getItem("branchDataforprefill")
      );
      localstorageobjtoupdate.address = data.address;
      localstorageobjtoupdate.country = data.country;
      localstorageobjtoupdate.state = data.state;
      localstorageobjtoupdate.city = data.city;
      localstorageobjtoupdate.postalcode = data.postalcode;
      localstorageobjtoupdate.phone = data.phone;
      localstorageobjtoupdate.email = data.email;
      localStorage.setItem(
        "branchDataforprefill",
        JSON.stringify(localstorageobjtoupdate)
      );
    }

    setGeneralData(data);
  }

  const handleSaveAccountData = async (data) => {
    if (localStorage.getItem("branchDataforprefill")) {
      const localstorageobjtoupdate = await JSON.parse(
        localStorage.getItem("branchDataforprefill")
      );
      localstorageobjtoupdate.creditdays = data.creditdays;
      localStorage.setItem(
        "branchDataforprefill",
        JSON.stringify(localstorageobjtoupdate)
      );
    }

    setAccountData(data);
  };

  const handleSaveRegistrationData = async (data) => {
    if (localStorage.getItem("branchDataforprefill")) {
      const localstorageobjtoupdate = await JSON.parse(
        localStorage.getItem("branchDataforprefill")
      );
      localstorageobjtoupdate.PAN = data.PAN;
      localstorageobjtoupdate.GST = data.GST;
      localstorageobjtoupdate.IEC = data.IEC;
      localStorage.setItem(
        "branchDataforprefill",
        JSON.stringify(localstorageobjtoupdate)
      );
    }
    setRegistrationData(data);
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const employeename = localStorage.getItem("username");
      const currentDate = new Date();
      const dateinformat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
      const response = await axios.post("http://localhost:5000/orgStore", {
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
        username: employeename,
        createdon: dateinformat,
        checkedBoxOptions,
      });
      localStorage.removeItem("isEditing");
      toast.success("Stored client successfully");

      let insertedRowsBID = response.data;

      const inserttheID = await axios.put(
        "http://localhost:5000/updateTheBID",
        {
          BID: insertedRowsBID,
          clientname: generalData.clientname,
          orgcode: codeoforg,
          branchname: generalData.branchName,
        }
      );

      const inserttheIDincontact = await axios.put(
        "http://localhost:5000/updatetheBIDcontact",
        {
          BID: insertedRowsBID,
          clientname: generalData.clientname,
          orgcode: codeoforg,
          orgname: nameoforg,
          branchname: generalData.branchName,
        }
      );

      // const getApprovers = await axios.get('http://localhost:5000/getApprovernamesfororg', {
      //   params: {
      //     orgname: localStorage.getItem('orgname'),
      //     orgcode: localStorage.getItem('orgcode'),
      //     unique: localStorage.getItem('uniquevalue')
      //   }
      // })

      localStorage.removeItem("branchnames");
      navigate("/organization#/organization");
    } catch (error) {
      toast.error("Error in storing client successfully");
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
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    localStorage.removeItem("branchDataforprefill");
    navigate("/organization#/organization");
  }

  // async function updateData(e) {
  //   try {
  //     e.preventDefault();
  //     const nameoforg = localStorage.getItem('orgname');
  //     const codeoforg = localStorage.getItem('orgcode');
  //     const alias = localStorage.getItem('alias');

  //     const localstorageobjtoupdate = await JSON.parse(localStorage.getItem('branchDataforprefill'));

  //     // Fetch the latest data from state variables
  //     const dataToUpdate = {
  //       alias: alias,
  //       branchname: localstorageobjtoupdate.branchname,
  //       id: localstorageobjtoupdate.id,
  //       clientname: localstorageobjtoupdate.clientname,
  //       address: localstorageobjtoupdate.address,
  //       country: localstorageobjtoupdate.country,
  //       state: localstorageobjtoupdate.state,
  //       city: localstorageobjtoupdate.city,
  //       postalcode: localstorageobjtoupdate.postalcode,
  //       phone: localstorageobjtoupdate.phone,
  //       email: localstorageobjtoupdate.email,
  //       PAN: localstorageobjtoupdate.PAN,
  //       GST: localstorageobjtoupdate.GST,
  //       IEC: localstorageobjtoupdate.IEC,
  //       creditdays: localstorageobjtoupdate.creditdays,
  //       orgname: nameoforg,
  //       orgcode: codeoforg
  //     };

  //     // Send update request with the latest data
  //     const response = await axios.put('http://localhost:5000/updateData', dataToUpdate);
  //     toast.success('Updated data successfully')

  //     const getApprovers = await axios.get('http://localhost:5000/getApprovernamesfororg', {
  //       params: {
  //         orgname: localStorage.getItem('orgname'),
  //         orgcode: localStorage.getItem('orgcode'),
  //         unique: localStorage.getItem('uniquevalue')
  //       }
  //     })
  //     console.log(getApprovers.data);
  //     // Redirect after successful update
  //     navigate('/organization#/organization');
  //   } catch (error) {
  //     toast.error('Error updating data')
  //     console.log("Error: " + error);
  //   }
  // }

  async function updateData(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const alias = localStorage.getItem("alias");

      // Fetch data from localStorage
      const localstorageobjtoupdate = JSON.parse(
        localStorage.getItem("branchDataforprefill")
      );

      // Log the data before updating
      console.log("Data to update:", localstorageobjtoupdate);

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
        orgcode: codeoforg,
      };

      // Send update request with the latest data
      const response = await axios.put(
        "http://localhost:5000/updateData",
        dataToUpdate
      );

      console.log("Save response:", response.data); // Log response from the backend

      toast.success("Updated data successfully");

      // Fetch approvers if needed (optional)
      const getApprovers = await axios.get(
        "http://localhost:5000/getApprovernamesfororg",
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );

      console.log("Approvers:", getApprovers.data);

      // Redirect after successful update
      navigate("/organization#/organization");
    } catch (error) {
      toast.error("Error updating data");
      console.error("Error:", error); // Log the error
    }
  }

  async function storenewbranch(e) {
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const employeename = localStorage.getItem("username");
      const alias = localStorage.getItem("alias");
      const response = await axios.post("http://localhost:5000/orgStore", {
        branchName: localStorage.getItem("branchnames"),
        clientname: localStorage.getItem("organizationclientname"),
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
        createdon: new Date().toISOString(),
      });
      toast.success("Branch added successfully");

      let insertedRowsBID = response.data;

      const inserttheID = await axios.put(
        "http://localhost:5000/updateTheBID",
        {
          BID: insertedRowsBID,
          clientname: localStorage.getItem("organizationclientname"),
          orgcode: codeoforg,
          branchname: localStorage.getItem("branchnames"),
        }
      );

      const inserttheIDincontact = await axios.put(
        "http://localhost:5000/updatetheBIDcontact",
        {
          BID: insertedRowsBID,
          clientname: localStorage.getItem("organizationclientname"),
          orgcode: codeoforg,
          orgname: nameoforg,
          branchname: localStorage.getItem("branchnames"),
        }
      );

      navigate("/organization#/organization");
    } catch (error) {
      console.log(error);
    }
  }
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedBoxOptions((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };



  useEffect(() => {
    if (localStorage.getItem("firstorgofclient")) {
      const prefillwithLocal = async () => {
        try {
        
        } catch (error) {
          console.log("Error: " + error);
        }
      };
      prefillwithLocal();
    }
  }, []); // Empty dependency array ensures the effect runs only once during component mounting


  return (
    <div className="createjob-org-main-container">
      <div>
        <CCard>
        <CCardBody>
            <h6>Select Options</h6>
            <div className="org-checkers">
              {["Shippers", "Consignee", "Services", "Agent", "Carrier", "Global"].map((option) => (
                <CFormCheck
                  key={option}
                  label={option}
                  value={option}
                  onChange={handleCheckboxChange}
                  checked={checkedBoxOptions.includes(option)} // Check if the option is in the checkedBoxOptions array
                />
              ))}
            </div>
          </CCardBody>
        </CCard>
      </div>
      <div>
        {
          // checkbox on right side and clientcode on left clientcode autogenrated in backend do not send clientcode to backend send only
          //checkbox data checkedBoxOptions name in backend
        }

            <div className="tabs-container">
        <div className="custom-tabs">
          <input type="radio" id="tab-general" name="tab-control" checked={isshown === "general"} onChange={() => setIsShown("general")} />
          <input type="radio" id="tab-registration" name="tab-control" checked={isshown === "registration"} onChange={() => setIsShown("registration")} />
          <input type="radio" id="tab-accounts" name="tab-control" checked={isshown === "accounts"} onChange={() => setIsShown("accounts")} />
          <input type="radio" id="tab-contactdetails" name="tab-control" checked={isshown === "contactdetails"} onChange={() => setIsShown("contactdetails")} />

          <ul className="custom-tab-labels">
            <li><label htmlFor="tab-general">General</label></li>
            <li><label htmlFor="tab-registration">Registration</label></li>
            <li><label htmlFor="tab-accounts">Accounts</label></li>
            <li><label htmlFor="tab-contactdetails">Contact Details</label></li>
          </ul>

          <div className="custom-tab-content">
            {isshown === "general" && (
              <div className="tab-pane">
                <h2>General</h2>
                {/* General Component */}
              </div>
            )}
            {isshown === "registration" && (
              <div className="tab-pane">
                <h2>Registration</h2>
                {/* Registration Component */}
              </div>
            )}
            {isshown === "accounts" && (
              <div className="tab-pane">
                <h2>Accounts</h2>
                {/* Accounts Component */}
              </div>
            )}
            {isshown === "contactdetails" && (
              <div className="tab-pane">
                <h2>Contact Details</h2>
                {/* Contactdetails Component */}
              </div>
            )}
          </div>
        </div>
      </div>
        <div className="all-buttons">
          {localStorage.getItem("updateBtn") === "true" ? (
            <div className="search-button">
              <CPopover
                content="Save Organization data"
                trigger={["hover", "focus"]}
              >
                <CButton color="primary" type="submit" onClick={updateData}>
                  Save
                </CButton>
              </CPopover>
            </div>
          ) : (
            <div className="search-button">
              <CPopover
                content="Save Organization data"
                trigger={["hover", "focus"]}
              >
                <CButton color="primary" type="submit" onClick={handleSubmit}>
                  Save & Close
                </CButton>
              </CPopover>
            </div>
          )}

          {localStorage.getItem("isEditing") === "true" &&
            localStorage.getItem("branchnames") && (
              <div className="search-button">
                <CButton color="primary" type="submit" onClick={storenewbranch}>
                  Save New Branch
                </CButton>
              </div>
            )}

          <div className="search-button">
            <CPopover
              content="Close Organization data"
              trigger={["hover", "focus"]}
            >
              <CButton color="primary" type="submit" onClick={redirectToOrg}>
                Close
              </CButton>
            </CPopover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createjob;
