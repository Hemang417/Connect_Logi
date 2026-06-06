import React, { useEffect } from "react";
import { motion } from "framer-motion";

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CDropdownDivider,
  CForm,
  CButton,
  CNavItem,
  CNav,
  CNavLink,
  CPopover,
  CFormCheck,
} from "@coreui/react";
import "../../css/styles.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { General, Registration, Accounts, Contactdetails } from "./Innerpage";
import toast from "react-hot-toast";
import moment from "moment";
import { Country, State, City } from "country-state-city";
import Cookies from "js-cookie";

import "./css/organisation-styles.css";
import EditBtn from "../buttons/buttons/EditBtn";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import NewButton from "../buttons/buttons/NewButton";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";

const CreateOrg = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [visible, setVisible] = useState(false);
  const [isBranchModalVisible, setIsBranchModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  // const [isActive, setActive] = useState("false");

  const navigate = useNavigate();
  const [checkedBoxOptions, setCheckedBoxOptions] = useState([]);
  const [orgganizationTypeOptions, setOrgganizationTypeOptions] = useState([]); // Correct initialization
  const [currentPopup, setCurrentPopup] = useState("none");
  const [isEditing, setIsEditing] = useState(false);

  //===========================================================
  // General Section

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // Correct initialization
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [allBranches, setAllBranches] = useState([]);
  // const [contactDetails, setContactDetails] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    contactName: "",
    designation: "",
    department: "",
    mobile: "",
    email: "",
  });
  const contactFields = [
    { id: "contactName", label: "Contact Name", inputType: "text" },
    { id: "designation", label: "Designation", inputType: "text" },
    { id: "department", label: "Department", inputType: "text" },
    { id: "mobile", label: "Mobile No", inputType: "number" },
    { id: "email", label: "Email ID", inputType: "email" },
  ];
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);
  const [generalData, setGeneralData] = useState({
    clientname: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    phone: "",
    email: "",
    PAN: "",
    GST: "",
    IEC: "",
    creditdays: "",
    followup2: "",
    followup3: "",
    showClientCode: false,
    branchName: "",
    contactDetails: [],
    checkedBoxOptions: [],
    orgganizationTypeOptions: [],
    // allBranches: [],
  });

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen to changes within the same tab
    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Add this validation function at the top of your component
  // const validateForm = () => {
  //   const errors = [];

  //   // Basic required field checks
  //   if (!generalData.branchName) errors.push("Branch Name is required");
  //   if (!generalData.clientname) errors.push("Client Name is required");
  //   if (!generalData.address) errors.push("Address is required");
  //   if (!generalData.country) errors.push("Country is required");
  //   if (!generalData.state) errors.push("State is required");
  //   if (!generalData.city) errors.push("City is required");
  //   if (!generalData.postalcode) errors.push("Postal Code is required");
  //   if (!generalData.phone) errors.push("Phone is required");
  //   if (!generalData.email) errors.push("Email is required");
  //   if (!generalData.PAN) errors.push("PAN is required");
  //   if (!generalData.GST) errors.push("GST is required");
  //   if (!generalData.IEC) errors.push("IEC is required");
  //   if (!generalData.creditdays) errors.push("Credit Days is required");
  //   // if (!generalData.showClientCode)
  //   //   errors.push("Client Code visibility status is required");

  //   // if (!nameoforg) errors.push("Organization Name is required");
  //   // if (!codeoforg) errors.push("Organization Code is required");
  //   // if (!employeename) errors.push("Username is required");
  //   // if (!dateinformat) errors.push("Creation Date is required");
  //   if (!checkedBoxOptions) errors.push("Checked Box Options are required");
  //   if (!orgganizationTypeOptions)
  //     errors.push("Organization Type Options are required");
  //   if (!generalData.contactDetails)
  //     errors.push("Contact Details are required");
  //   if (!generalData.followup2) errors.push("Follow-up 2 is required");
  //   if (!generalData.followup3) errors.push("Follow-up 3 is required");

  //   // Format validations
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (generalData.email && !emailRegex.test(generalData.email)) {
  //     errors.push("Email format is invalid (e.g., example@gmail.com)");
  //   }

  //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  //   if (generalData.PAN && !panRegex.test(generalData.PAN)) {
  //     errors.push("PAN format is invalid (e.g., ABCDE1234F)");
  //   }

  //   const gstRegex =
  //     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  //   if (generalData.GST && !gstRegex.test(generalData.GST)) {
  //     errors.push("GST format is invalid (e.g., 22AAAAA0000A1Z5)");
  //   }

  //   const iecRegex = /^[A-Z0-9]{10}$/;
  //   if (generalData.IEC && !iecRegex.test(generalData.IEC)) {
  //     errors.push(
  //       "IEC format is invalid (should be a 10-character alphanumeric code)"
  //     );
  //   }

  //   const phoneRegex = /^[0-9]{10}$/;
  //   if (generalData.phone && !phoneRegex.test(generalData.phone)) {
  //     errors.push("Phone number must be 10 digits");
  //   }

  //   const postalCodeRegex = /^[0-9]{6}$/;
  //   if (
  //     generalData.postalcode &&
  //     !postalCodeRegex.test(generalData.postalcode)
  //   ) {
  //     errors.push("Postal Code must be 6 digits");
  //   }

  //   return errors;
  // };

  const validateForm = () => {
    const errors = [];

    // Basic required field checks
    if (!generalData.branchName) errors.push("Branch Name is required");
    if (!generalData.clientname) errors.push("Client Name is required");
    if (!generalData.address) errors.push("Address is required");
    if (!generalData.country) errors.push("Country is required");
    if (!generalData.state) errors.push("State is required");
    if (!generalData.city) errors.push("City is required");
    if (!generalData.postalcode) errors.push("Postal Code is required");
    if (!generalData.phone) errors.push("Phone is required");
    if (!generalData.email) errors.push("Email is required");
    if (!generalData.PAN) errors.push("PAN is required");
    if (!generalData.GST) errors.push("GST is required");
    if (!generalData.IEC) errors.push("IEC is required");
    if (!generalData.creditdays) errors.push("Credit Days is required");
    if (!checkedBoxOptions) errors.push("Checked Box Options are required");
    if (!orgganizationTypeOptions)
      errors.push("Organization Type Options are required");
    if (!generalData.contactDetails || generalData.contactDetails.length === 0)
      errors.push("At least one Contact Detail is required");
    if (!generalData.followup2) errors.push("Follow-up 2 is required");
    if (!generalData.followup3) errors.push("Follow-up 3 is required");

    // Format validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (generalData.email && !emailRegex.test(generalData.email)) {
      errors.push("Email format is invalid (e.g., example@gmail.com)");
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (generalData.PAN && !panRegex.test(generalData.PAN)) {
      errors.push("PAN format is invalid (e.g., ABCDE1234F)");
    }

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
    if (generalData.GST && !gstRegex.test(generalData.GST)) {
      errors.push("GST format is invalid (e.g., 22AAAAA0000A1Z5)");
    }

    const stateCode = parseInt(generalData.GST.slice(0, 2));
    if (stateCode < 1 || stateCode > 35) {
      errors.push("Invalid GST state code.");
    }

    const iecRegex = /^[A-Z0-9]{10}$/;
    if (generalData.IEC && !iecRegex.test(generalData.IEC)) {
      errors.push(
        "IEC format is invalid (should be a 10-character alphanumeric code)"
      );
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (generalData.phone && !phoneRegex.test(generalData.phone)) {
      errors.push("Phone number must be 10 digits");
    }

    const postalCodeRegex = /^[0-9]{6}$/;
    if (
      generalData.postalcode &&
      !postalCodeRegex.test(generalData.postalcode)
    ) {
      errors.push("Postal Code must be 6 digits");
    }

    // 🔽 Contact Details Validation
    if (
      generalData.contactDetails &&
      Array.isArray(generalData.contactDetails)
    ) {
      generalData.contactDetails.forEach((contact, index) => {
        const label = `Contact ${index + 1}`;
        if (!contact.contactName) {
          errors.push(`${label}: Name is required`);
        }
        if (!contact.mobile || !/^[0-9]{10}$/.test(contact.mobile)) {
          errors.push(`${label}: Mobile must be a 10-digit number`);
        }
        if (!contact.email || !emailRegex.test(contact.email)) {
          errors.push(`${label}: Email is invalid`);
        }
      });
    }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      toast(
        <div>
          <strong>Please fix the following required fields:</strong>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>,
        {
          duration: 5000,
          style: {
            maxWidth: "500px",
            border: "1px solid #713200",
          },
          iconTheme: {
            primary: "#ffffff", // White icon
            secondary: "#dc3545", // Red background for icon
          },
        }
      );
      return;
    }

    try {
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const employeename = localStorage.getItem("username");
      const currentDate = new Date();
      const dateinformat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
      const response = await axios.post(`${API_BASE_URL}/orgStore`, {
        branchName: generalData.branchName,
        clientname: generalData.clientname,
        address: generalData.address,
        country: generalData.country,
        state: generalData.state,
        city: generalData.city,
        postalcode: generalData.postalcode,
        phone: generalData.phone,
        email: generalData.email,
        PAN: generalData.PAN,
        GST: generalData.GST,
        IEC: generalData.IEC,
        creditdays: generalData.creditdays,
        showClientCode: generalData.showClientCode,
        orgname: nameoforg,
        orgcode: codeoforg,
        username: employeename,
        createdon: dateinformat,
        checkedBoxOptions: checkedBoxOptions,
        orgganizationTypeOptions: orgganizationTypeOptions,
        contactDetails: generalData.contactDetails,
        followup2: generalData.followup2,
        followup3: generalData.followup3,
        section: "Organization",
      });

      if (response.status === 200) {
        toast.success("Client stored successfully");
        navigate("/approverlog", { state: { from: "/Createorg" } });
      }
    } catch (error) {
      toast.error("Error in storing client successfully");
      console.log("Error: " + error);
    }
  };

  const saveAndNew = async () => {
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      toast(
        <div>
          <strong>Please fix the following required fields:</strong>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>,
        {
          duration: 5000,
          style: {
            maxWidth: "500px",
            border: "1px solid #713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        }
      );
      return;
    }

    try {
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const employeename = localStorage.getItem("username");
      const currentDate = new Date();
      const dateinformat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
      const response = await axios.post(`${API_BASE_URL}/orgStore`, {
        branchName: generalData.branchName,
        clientname: generalData.clientname,
        address: generalData.address,
        country: generalData.country,
        state: generalData.state,
        city: generalData.city,
        postalcode: generalData.postalcode,
        phone: generalData.phone,
        email: generalData.email,
        PAN: generalData.PAN,
        GST: generalData.GST,
        IEC: generalData.IEC,
        creditdays: generalData.creditdays,
        showClientCode: generalData.showClientCode,
        orgname: nameoforg,
        orgcode: codeoforg,
        username: employeename,
        createdon: dateinformat,
        checkedBoxOptions: checkedBoxOptions,
        orgganizationTypeOptions: orgganizationTypeOptions,
        contactDetails: generalData.contactDetails,
        followup2: generalData.followup2,
        followup3: generalData.followup3,
        section: "Organization",
      });

      if (response.status === 200) {
        toast.success("Client stored successfully");
        // navigate("/approverlog" , { state: { from: "/Createorg" } });

        setDate(new Date());
        setStartDate();
        setVisible(false);
        setIsBranchModalVisible(false);
        setIsContactModalVisible(false);

        // const [isActive, setActive] = useState("false");

        setCheckedBoxOptions([]);
        setOrgganizationTypeOptions([]); // Correct initialization

        //===========================================================
        // General Section

        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity(""); // Correct initialization
        setCountryList([]);
        setStateList([]);
        setCityList([]);
        setAllBranches([]);
        // const [contactDetails, setContactDetails] = useState([]);
        setCurrentContact({
          contactName: "",
          designation: "",
          department: "",
          mobile: "",
          email: "",
        });
        setGeneralData({
          clientname: "",
          address: "",
          country: "",
          state: "",
          city: "",
          postalcode: "",
          phone: "",
          email: "",
          PAN: "",
          GST: "",
          IEC: "",
          creditdays: "",
          showClientCode: false,
          branchName: "",
          contactDetails: [],
          checkedBoxOptions: [],
          orgganizationTypeOptions: [],
          followup2: "",
          followup3: "",
          // allBranches: [],
        });
      }
    } catch (error) {
      toast.error("Error in storing client successfully");
      console.log("Error: " + error);
    }
  };

  async function fetchCountries() {
    const countries = Country.getAllCountries().map((country) => ({
      name: country.name,
      code: country.isoCode,
    }));
    setCountryList(countries);
  }

  async function fetchStates(countryCode) {
    const states = State.getStatesOfCountry(countryCode).map((state) => ({
      name: state.name,
      code: state.isoCode,
    }));
    setStateList(states);
  }
  async function fetchCities(countryCode, stateCode) {
    const cities = City.getCitiesOfState(countryCode, stateCode).map(
      (city) => city.name
    );
    setCityList(cities);
  }
  const handleCountryChange = (event) => {
    const selectedCountry = event;
    setSelectedCountry(selectedCountry);
    setSelectedState(""); // Reset state when changing country
    setGeneralData((prevData) => ({ ...prevData, country: selectedCountry }));

    const countryCode = countryList.find(
      (c) => c.name === selectedCountry
    )?.code;

    if (countryCode) {
      console.log("Fetching states for country:", countryCode); // Debugging log
      fetchStates(countryCode);
    } else {
      console.error(
        "Country code not found for selected country:",
        selectedCountry
      );
    }
  };

  const handleStateChange = (event) => {
    const selectedState = event;
    setSelectedState(selectedState);
    setGeneralData((prevData) => ({ ...prevData, state: selectedState }));
    const countryCode = countryList.find(
      (c) => c.name === selectedCountry
    )?.code;
    const stateCode = stateList.find((s) => s.name === selectedState)?.code;
    fetchCities(countryCode, stateCode);
  };

  const handleCityChange = (event) => {
    const selectedCity = event;
    setSelectedCity(selectedCity);
    setGeneralData((prevData) => ({ ...prevData, city: selectedCity }));
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setGeneralData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    if (
      !currentContact.contactName ||
      !currentContact.mobile ||
      !currentContact.email
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setGeneralData((prevData) => {
      const contactDetails = [...prevData.contactDetails];
      if (currentContact.id !== undefined && currentContact.id !== null) {
        // Save existing contact
        contactDetails[currentContact.id] = { ...currentContact };
      } else {
        // Add new contact
        contactDetails.push({ ...currentContact });
      }
      return { ...prevData, contactDetails };
    });

    toast.success(
      currentContact.id !== undefined && currentContact.id !== null
        ? "Contact updated successfully!"
        : "Contact added successfully!"
    );
    setCurrentContact({
      contactName: "",
      designation: "",
      department: "",
      mobile: "",
      email: "",
    });
    setIsContactModalVisible(false);
  };

  const handleEditContact = (index) => {
    setCurrentContact({ ...generalData.contactDetails[index], id: index });
    // setIsContactModalVisible(true);
    setCurrentPopup("Add New Contact");
  };

  const handleDeleteContact = (index) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setGeneralData((prevData) => ({
        ...prevData,
        contactDetails: prevData.contactDetails.filter((_, i) => i !== index),
      }));
      toast.success("Contact deleted successfully!");
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedBoxOptions([...checkedBoxOptions, value]);
    } else {
      setCheckedBoxOptions(
        checkedBoxOptions.filter((option) => option !== value)
      );
    }
  };

  const handleOrgTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setOrgganizationTypeOptions([...orgganizationTypeOptions, value]);
    } else {
      setOrgganizationTypeOptions(
        orgganizationTypeOptions.filter((option) => option !== value)
      );
    }
  };

  // const handleAddNewBranch = () => {
  //   const newBranchName = generalData.branchName; // Get the branch name from the input
  //   if (newBranchName) {
  //     setAllBranches((prevBranches) => [
  //       ...prevBranches,
  //       { branchname: newBranchName },
  //     ]);
  //     setGeneralData((prev) => ({ ...prev, branchName: newBranchName })); // Set the selected branch
  //     setIsBranchModalVisible(false); // Close the modal
  //     toast.success("Branch added successfully!");
  //   } else {
  //     toast.error("Please enter a branch name.");
  //   }
  // };
  const backButton = () => {
    navigate("/organization");
  };
  const handleClose = () => {
    window.top.close();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <CCard className="global-card" style={{ padding: "20px 0px" }}>
        <div className="createjob-org-main-container">
          <div className="org-card-width-100">
            <div className="org-card-complete-100vw">
              <div className="create-org-title">
                <h4>Create Organization</h4>
              </div>
              <div className="org-line"></div>
              <CCardBody>
                <div className="create-org-first-row">
                  <div style={{ width: "50%" }}>
                    <h5 className="create-org-labels">Select Options</h5>
                    <div className="org-checkers">
                      {["Import", "Export", "Transport", "Freight"].map(
                        (option) => (
                          <CFormCheck
                            className="create-org-checkbox"
                            key={option}
                            label={option}
                            value={option}
                            onChange={handleOrgTypeChange}
                            checked={orgganizationTypeOptions.includes(option)} // Check if the option is in the
                            //checkedBoxOptions array
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "57%",
                      borderLeft:
                        theme === "dark"
                          ? "1px solid #BDF2F5"
                          : "1px solid #BEC3CF",
                      paddingLeft: "20px",
                    }}
                  >
                    <h5 className="create-org-labels">Select Options</h5>
                    <div className="org-selectors">
                      {[
                        "Shippers",
                        "Consignee",
                        "Services",
                        "Agent",
                        "Carrier",
                        "Global",
                      ].map((option) => (
                        <CFormCheck
                          className="create-org-checkbox"
                          key={option}
                          label={option}
                          value={option}
                          onChange={handleCheckboxChange}
                          checked={checkedBoxOptions.includes(option)} // Check if the option is in the checkedBoxOptions array
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="org-line"></div>

                <div>
                  {/* <CCard className="mb-2 organisation-div-general"> */}
                  <h5 className="create-org-labels">General</h5>
                  <CCardBody className="org-client-code-create">
                    <div className="org-general-main-container">
                      <div className="middle-section-orh-general">
                        <div className="org-general-part">
                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Client Name :
                            </label>
                            {/* <input
                            type="text"
                            name="clientname"
                            value={generalData.clientname}
                            placeholder="Client Name"
                            onChange={handleChange}
                            className="gen-text-field-1 "
                          /> */}
                            <NewInput
                              width={"80%"}
                              setSelectedValue={handleChange}
                              type={"text"}
                              // placeholder={"Client Name"}
                              selectedValue={generalData.clientname}
                              name="clientname"
                            />
                          </div>
                          {/* <input
                            type="text"
                            name="clientname"
                            value={generalData.clientname}
                            placeholder="Alias"
                            onChange={handleChange}
                            className='gen-text-field-1'
                        /> */}
                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Country :{" "}
                            </label>

                            <NewDropdownInput
                              type="type1"
                              options={countryList.map((item) => {
                                return { label: item.name, value: item.name };
                              })}
                              selectedValue={selectedCountry}
                              setSelectedValue={handleCountryChange}
                              width={"80%"}
                            />
                          </div>
                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Postal Code :{" "}
                            </label>

                            <NewInput
                              width={"80%"}
                              name="postalcode"
                              setSelectedValue={handleChange}
                              type={"text"}
                              selectedValue={generalData.postalcode}
                            />
                          </div>
                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Phone Number :{" "}
                            </label>
                            <NewInput
                              width={"80%"}
                              name="phone"
                              setSelectedValue={handleChange}
                              type={"text"}
                              selectedValue={generalData.phone}
                            />
                          </div>

                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              State/Province :{" "}
                            </label>
                            <NewDropdownInput
                              type="type1"
                              options={stateList.map((item) => {
                                return { label: item.name, value: item.name };
                              })}
                              selectedValue={selectedState}
                              setSelectedValue={handleStateChange}
                              width={"80%"}
                            />
                          </div>

                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Branch Name :
                            </label>
                            {/* <input
                            type="text"
                            name="branchName"
                            value={generalData.branchName}
                            placeholder="Branch Name"
                            onChange={handleChange}
                            className="gen-text-field-1"
                          /> */}
                            <NewInput
                              width={"80%"}
                              setSelectedValue={handleChange}
                              type={"text"}
                              // placeholder={"Branch Name"}
                              selectedValue={generalData.branchName}
                              name="branchName"
                            />
                          </div>

                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Email Address :{" "}
                            </label>
                            <NewInput
                              width={"80%"}
                              name="email"
                              setSelectedValue={handleChange}
                              type={"text"}
                              selectedValue={generalData.email}
                            />
                          </div>

                          <div className="org-gen-label-input-align ">
                            <label className="labelOrganizationGeneral">
                              City :{" "}
                            </label>

                            <NewDropdownInput
                              type="type1"
                              options={cityList.map((item) => {
                                return { label: item, value: item };
                              })}
                              selectedValue={selectedCity}
                              setSelectedValue={handleCityChange}
                              width={"80%"}
                            />
                          </div>
                          <div className="org-gen-label-input-align">
                            <label className="labelOrganizationGeneral">
                              Address :
                            </label>
                            <textarea
                              spellCheck="false"
                              name="address"
                              cols="200"
                              rows="5"
                              style={{ width: "80%", height: "60px" }}
                              value={generalData.address}
                              onChange={handleChange}
                              className="gen-textarea-field"
                              onAnimationStart={(e) => {
                                // This detects autofill in most browsers
                                if (e.animationName === "onAutoFillStart") {
                                  e.target.style.background = "transparent";
                                }
                              }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div
                        className="org-client-code-part"
                        style={{
                          position: "relative",
                          bottom: "0px",
                          left: "0px",
                        }}
                      >
                        <div className="client-code-creation">
                          <h6>Do you want to create Client Code?</h6>
                          {/* <CFormCheck
                          className="create-org-checkbox"
                          type="checkbox"
                          name="showClientCode"
                          // style={{ backgroundColor: "transparent" }}
                          checked={generalData.showClientCode}
                          onChange={() =>
                            setGeneralData((prevData) => ({
                              ...prevData,
                              showClientCode: !prevData.showClientCode,
                            }))
                          }
                        /> */}
                          <div style={{ display: "flex", gap: "10px" }}>
                            <input
                              type="radio"
                              name="yes_no"
                              onClick={() =>
                                setGeneralData((prevData) => ({
                                  ...prevData,
                                  showClientCode: true,
                                }))
                              }
                              checked={generalData.showClientCode}
                            />
                            Yes
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <input
                              type="radio"
                              name="yes_no"
                              onClick={() =>
                                setGeneralData((prevData) => ({
                                  ...prevData,
                                  showClientCode: false,
                                }))
                              }
                              checked={!generalData.showClientCode}
                            />
                            No
                          </div>
                        </div>

                        {/* <span className="client-code-creation">
                        <label>Client Code : </label>
                        {generalData.showClientCode === 1 && (
                          <input
                            name="clientCodeWidth"
                            value={generalData.clientCode}
                            readOnly
                          />
                        )}
                      </span> */}
                        {/* <span className="client-code-creation">
                      
                        {(generalData.showClientCode === 1 ||
                          generalData.showClientCode === true) && (
                        
                          <NewInput
                            width={"270px"}
                            type={"text"}
                            placeholder={"Client Code"}
                            selectedValue={generalData.clientCode}
                            name="clientCodeWidth"
                          />
                        )}
                      </span> */}
                      </div>
                      {/* <div className="mb-2 search-button update-button">
                        <CButton
                          color="primary"
                          type="submit"
                          onClick={handleSave}
                        >
                          Save
                        </CButton>
                      </div> */}
                    </div>
                  </CCardBody>
                  {/* </CCard> */}

                  {/* <CModal
  visible={isBranchModalVisible}
  onClose={() => setIsBranchModalVisible(false)}
  aria-labelledby="LiveDemoExampleLabel"
>
  <CModalHeader onClose={() => setIsBranchModalVisible(false)}>
    <CModalTitle id="LiveDemoExampleLabel">Add Branch Details</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <input
      type="text"
      placeholder="Branch Name"
      value={generalData.branchName} // Use the branchName from generalData
      className="gen-text-field-1"
      onChange={(e) => setGeneralData((prev) => ({ ...prev, branchName: e.target.value }))}
    />
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setIsBranchModalVisible(false)}>
      Close
    </CButton>
    <CButton color="primary" onClick={handleAddNewBranch}>
      Add New
    </CButton>
  </CModalFooter>
</CModal> */}
                </div>
                <div className="org-line"></div>

                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "49%", paddingLeft: "4px" }}>
                    <h5 className="create-org-labels">Registration</h5>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className="labelOrganization">
                        PAN Details :{" "}
                      </label>
                      <NewInput
                        width={"50%"}
                        name="PAN"
                        setSelectedValue={handleChange}
                        type={"text"}
                        selectedValue={generalData.PAN}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className="labelOrganization">
                        GST Details :{" "}
                      </label>

                      <NewInput
                        width={"50%"}
                        name="GST"
                        setSelectedValue={handleChange}
                        type={"text"}
                        selectedValue={generalData.GST}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className="labelOrganization">IEC Code : </label>

                      <NewInput
                        width={"50%"}
                        name="IEC"
                        setSelectedValue={handleChange}
                        type={"text"}
                        selectedValue={generalData.IEC}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "49%",
                      paddingLeft: "50px",
                      borderLeft:
                        theme === "dark"
                          ? "1px solid #BDF2F5"
                          : "1px solid #BEC3CF",
                    }}
                  >
                    <h5 className="create-org-labels">Accounts</h5>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className="labelOrganization">
                        Credit Days :{" "}
                      </label>

                      <NewInput
                        width={"50%"}
                        name="creditdays"
                        setSelectedValue={handleChange}
                        type={"text"}
                        selectedValue={generalData.creditdays}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className="labelOrganization">
                        Second Followup :{" "}
                      </label>

                      <NewInput
                        width={"50%"}
                        name="followup2"
                        setSelectedValue={handleChange}
                        type={"text"}
                        selectedValue={generalData.followup2}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label className="labelOrganization">
                        Third Followup :{" "}
                      </label>

                      <NewInput
                        width={"50%"}
                        name="followup3"
                        setSelectedValue={handleChange}
                        type={"text"}
                        selectedValue={generalData.followup3}
                      />
                    </div>

                    {/* <div className="mb-2 search-button update-button">
                <CButton color="primary" type="submit" onClick={handleSave}>
                  Save
                </CButton>
              </div> */}
                  </div>
                </div>
                <div className="org-line"></div>

                <div>
                  <h5 className="create-org-labels">Contact Details</h5>
                  <div className="left-div-table">
                    <table className="table-wf" style={{ width: "92%" }}>
                      <thead>
                        <tr
                          className="head-wf"
                          style={{
                            padding: "5px 7px",
                            fontSize: "12px",
                            width: "120px",
                          }}
                        >
                          <th
                            style={{
                              padding: "5px 7px",
                              fontSize: "12px",
                              width: "120px",
                            }}
                          >
                            Contact Name
                          </th>
                          <th
                            style={{
                              padding: "5px 7px",
                              fontSize: "12px",
                              width: "120px",
                            }}
                          >
                            Designation
                          </th>
                          <th
                            style={{
                              padding: "5px 7px",
                              fontSize: "12px",
                              width: "120px",
                            }}
                          >
                            Department
                          </th>
                          <th
                            style={{
                              padding: "5px 7px",
                              fontSize: "12px",
                              width: "120px",
                            }}
                          >
                            Mobile
                          </th>
                          <th
                            style={{
                              padding: "5px 7px",
                              fontSize: "12px",
                              width: "120px",
                            }}
                          >
                            Email ID
                          </th>
                          <th
                            style={{
                              padding: "5px 7px",
                              fontSize: "12px",
                              width: "120px",
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {generalData.contactDetails.length > 0 ? (
                          generalData.contactDetails.map((contact, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#E3F1F9" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                {contact.contactName}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#E3F1F9" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                {contact.designation}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#E3F1F9" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                {contact.department}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#E3F1F9" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                {contact.mobile}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#E3F1F9" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  textAlign: "center",
                                }}
                              >
                                {contact.email}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#E3F1F9" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "5px",
                                }}
                              >
                                <Link
                                  onClick={() => {
                                    handleEditContact(index);
                                    setIsEditing(true);
                                  }}
                                >
                                  <EditBtn
                                    fill={
                                      theme === "dark"
                                        ? "#f8d7da"
                                        : "var(--page-title)"
                                    }
                                  />
                                </Link>
                                <Link
                                  onClick={() => handleDeleteContact(index)}
                                >
                                  <DeleteBtn
                                    fill={
                                      theme === "dark"
                                        ? "#f8d7da"
                                        : "var(--page-title)"
                                    }
                                  />
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              style={{
                                backgroundColor:
                                  theme === "dark"
                                    ? "#263A52" // Dark mode odd row
                                    : "#F6FCFF", // Light mode odd row

                                transition: "background-color 0.3s ease",
                                textAlign: "center",
                              }}
                              colSpan="6"
                            >
                              No contacts found
                            </td>
                          </tr>
                        )}
                      </tbody>

                      <div className="search-button">
                        <svg
                          onClick={() => {
                            setCurrentContact({
                              contactName: "",
                              designation: "",
                              department: "",
                              mobile: "",
                              email: "",
                            });
                            setIsEditing(false);
                            setCurrentPopup("Add New Contact");
                            // setVisible(false); // Ensure edit mode is off
                            // setIsContactModalVisible(true); // Open the modal for adding a new contact
                          }}
                          width="40px"
                          height="40px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                            fill={theme === "dark" ? "#fff" : "#1C274C"}
                          />
                        </svg>
                      </div>
                    </table>
                  </div>

                  {currentPopup === "Add New Contact" && (
                    <InputPopup
                      title={`${isEditing ? "Edit" : "Add New"} Contact`}
                      setCurrentPopup={setCurrentPopup}
                      fields={contactFields}
                      value={currentContact}
                      setValue={setCurrentContact}
                      handleAdd={handleAddContact}
                      firstButtonText={isEditing ? "Save" : "Add New"}
                      secondButtonText={"Close"}
                      selection={"none"}
                      top={"50%"}
                      left={"50%"}
                      width={"330px"}
                    />
                  )}

                  <CModal
                    // visible={visible}
                    // onClose={() => {
                    //   setVisible(false);
                    // }}
                    visible={isContactModalVisible}
                    onClose={() => setIsContactModalVisible(false)}
                    aria-labelledby="LiveDemoExampleLabel"
                  >
                    <CModalHeader
                      // onClose={() => setVisible(false)}
                      onClose={() => setIsContactModalVisible(false)}
                      // onClick={() => setIsContactModalVisible(true)}
                    >
                      <CModalTitle id="LiveDemoExampleLabel">
                        Add New Contact
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <div>
                        <div>
                          <label style={{ width: "150px" }}>
                            Contact Name :{" "}
                          </label>
                          <input
                            type="text"
                            name="contactName"
                            className="text-field-1"
                            value={currentContact.contactName} // Use currentContact instead of contactDetails
                            onChange={handleContactChange}
                          />
                        </div>
                        <div>
                          <label style={{ width: "150px" }}>
                            Designation :{" "}
                          </label>
                          <input
                            type="text"
                            name="designation"
                            className="text-field-1"
                            value={currentContact.designation} // Use currentContact instead of contactDetails
                            onChange={handleContactChange}
                          />
                        </div>

                        <div>
                          <label style={{ width: "150px" }}>
                            Department :{" "}
                          </label>
                          <input
                            type="text"
                            name="department"
                            className="text-field-1"
                            value={currentContact.department} // Use currentContact instead of contactDetails
                            onChange={handleContactChange}
                          />
                        </div>

                        <div>
                          <label style={{ width: "150px" }}>
                            Mobile Number :{" "}
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            className="text-field-1"
                            value={currentContact.mobile} // Use currentContact instead of contactDetails
                            onChange={handleContactChange}
                          />
                        </div>
                        <div>
                          <label style={{ width: "150px" }}>Email ID : </label>
                          <input
                            type="text"
                            name="email"
                            className="text-field-1"
                            value={currentContact.email} // Use currentContact instead of contactDetails
                            onChange={handleContactChange}
                          />
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        // onClick={() => setVisible(false)}
                        onClick={() => setIsContactModalVisible(false)}
                      >
                        Close
                      </CButton>
                      <CButton color="primary" onClick={handleAddContact}>
                        {currentContact.id !== undefined &&
                        currentContact.id !== null
                          ? "Save"
                          : "Add New"}
                      </CButton>
                      {/* <CButton color="primary" onClick={handleSubmit}>Add New</CButton> */}
                    </CModalFooter>
                  </CModal>
                </div>
                <div className="org-line"></div>
              </CCardBody>
            </div>
          </div>
          <div>
            {
              // checkbox on right side and clientcode on left clientcode autogenrated in backend do not send clientcode to backend send only
              //checkbox data checkedBoxOptions name in backend
            }

            <div className="create-org-all-buttons">
              {/* <div className="search-button">
          <button class="button-23" role="button"  type="submit" 
          
          onClick={ handleSubmit}>
            Save
          </button>
        </div> */}

              <div
                className="search-button"
                onClick={async () => {
                  saveAndNew();
                }}
              >
                {" "}
                <NewButton width={"120px"} text={"Save & New"} />
              </div>

              <div className="search-button" onClick={handleSubmit}>
                <NewButton width={"120px"} text={"Save & Close"} />
              </div>

              {/* <div className="search-button">
          <button class="button-23" role="button"  type="submit" onClick={ handleSubmit}>
            Save & New
          </button>
        </div> */}

              <div className="search-button" onClick={() => handleClose()}>
                <NewButton width={"120px"} text={"Close"} />
              </div>
            </div>
          </div>
        </div>
      </CCard>
    </motion.div>
  );
};

export default CreateOrg;
