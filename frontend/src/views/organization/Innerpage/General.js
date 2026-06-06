import React, { useContext, useEffect } from "react";
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
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CNavItem,
  CNav,
  CNavLink,
  CLink,
  CFormCheck,
} from "@coreui/react";
import "../../../css/styles.css";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import InputPopup from "src/components/inputPopup/InputPopup";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import moment from "moment";
import { Country, State, City } from "country-state-city";
import "../css/organisation-styles.css";
// import createjob from './CreateJob';
import { AppContext } from "./AppContext";
import Registration from "./Registration";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import NewDropDown from "src/views/buttons/buttons/NewDropDown";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import API_BASE_URL from "src/config/config";

const queryParams = new URLSearchParams(location.search);
const alias = queryParams.get("alias");
const branchname = queryParams.get("branch");
const id = queryParams.get("id");
console.log("alias:", alias, "branchname:", branchname, "id:", id); // ✅ Check if location updates correctly

const General = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBranchName, setselectedBranchName] = useState("");
  const [currentPopup, setCurrentPopup] = useState("none");

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const {
    branchInUrl,
    aliasName,
    generalData,
    setGeneralData,
    setRegistrationData,
    setAccountData,
    setContacts,
    registrationData,
    accountData,
    contacts,
    isBranchAdded,
    setIsBranchAdded,
    checkedBoxOptions = [],
    orgganizationTypeOptions = [],
    setCheckedBoxOptions,
    setOrgganizationTypeOptions,
    setIsShown,
    isshown,
  } = useContext(AppContext);
  const currentDateandTime = moment().format("YYYY-MM-DDTHH:mm");
  const [clientCode, setClientCode] = useState("");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const contactFields = [{ id: "branchName", label: "Branch Name" }];

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

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isBranchAdded === false) {
      setCheckedBoxOptions(generalData.checkedBoxOptions || []);
      setOrgganizationTypeOptions(generalData.orgganizationTypeOptions || []);
    }
  }, [generalData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralData({ ...generalData, [name]: value });
  };

  function redirectToOrg() {
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    // localStorage.removeItem("branchDataforprefill");
    setIsShown("general");
    toast.success("New Client Created Successfully");
    setTimeout(() => {
      window.close();
    }, 1500);
  }

  function redirectToNew() {
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    // localStorage.removeItem("branchDataforprefill");
    setIsShown("general");
    toast.success("New Client Created Successfully");
    setTimeout(() => {
      navigate("/Createorg");
    }, 1500);
  }

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Ensure country list is populated before setting the selected country
    const populateCountryStateCity = async () => {
      await fetchCountries();

      if (generalData) {
        // setGeneralData(Data);
        setSelectedCountry(generalData.country);

        const countryCode = Country.getAllCountries().find(
          (c) => c.name === generalData.country
        )?.isoCode;
        if (countryCode) {
          await fetchStates(countryCode);
          setSelectedState(generalData.state);

          const stateCode = State.getStatesOfCountry(countryCode).find(
            (s) => s.name === generalData.state
          )?.isoCode;
          if (stateCode) {
            await fetchCities(countryCode, stateCode);
            setSelectedCity(generalData.city);
          }
        }
      }
    };

    populateCountryStateCity();
  }, [generalData]);

  const [allBranches, setAllBranches] = useState([]);

  useEffect(() => {
    if (!aliasName) return; // 🛑 Prevents running when aliasName is undefined

    console.log("Fetching branches for alias:", aliasName);
    const fetchAllBranches = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getOrgBranches`,
          {
            params: { alias: aliasName },
          }
        );
        // Extract branchname and id properties from each object
        const branchesArray = response.data.branches.map((branch) => ({
          id: branch.id,
          branchname: branch.branchname,
        }));
        setAllBranches(branchesArray);
      } catch (error) {
        console.error(
          "Branch API error ->",
          error.response?.data?.message || error.message
        );
      }
    };
    // Call the fetchAllBranches function
    fetchAllBranches();
  }, [aliasName]);

  const handleAddBranch = async () => {
    try {
      const codeoforg = localStorage.getItem("orgcode");

      if (localStorage.getItem("isEditing") === "true") {
        var clientname = localStorage.getItem("organizationclientname");
      } else {
        var clientname = localStorage.getItem("clientname");
      }
      console.log(
        "submited data for  branch create ->",
        generalData.clientname,
        aliasName,
        generalData.branchName,
        codeoforg
      );

      const response = await axios.post(
        `${API_BASE_URL}/storeinbranchestable`,
        {
          clientname: generalData.clientname,
          branchname: generalData.branchName,
          orgcode: codeoforg,
          id: generalData.id,
        }
      );
      setVisible(false);
      console.log("response ->", response);
      if (response) {
        toast.success("Branch added successfully");
        // const params = new URLSearchParams(window.location.hash.split("?")[1]);

        // params.set("branch", response.data.row3.branchname);
        // params.set("id", response.data.row3.id);

        // window.location.hash = `#Editorg?${params.toString()}`;

        navigate(
          `/Editorg?alias=${aliasName}&branch=${response.data.row3[0].branchname}&id=${response.data.row3[0].id}`,
          {
            replace: true, // Replace the current entry in the history stack
          }
        );
        // location.reload();
      }

      localStorage.setItem("branchnames", response.data.branchname);
      setIsBranchAdded(true);
      localStorage.removeItem("firstorgofclient");

      if (
        localStorage.getItem("branchnames") &&
        localStorage.getItem("isEditing") === "true"
      ) {
        setGeneralData({
          ...generalData,
          address: "",
          country: "",
          postalcode: "",
          state: "",
          phone: "",
          email: "",
          city: "",
          showClientCode: false,
        });
      }
      setOrgganizationTypeOptions([]);
      setCheckedBoxOptions([]);
      setAccountData({});
      setRegistrationData({});
      setContacts([]);
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Store clientname in localStorage
    if (localStorage.getItem("updateBtn") === "false") {
      localStorage.setItem("clientname", generalData.clientname);
    }
  }, [generalData.clientname]);

  async function handlebranchchange(index) {
    try {
      const selectedBranch = allBranches[index];
      setselectedBranchName(selectedBranch.branchname);
      console.log("selected branch name -> ", selectedBranchName);

      const response = await axios.get(`${API_BASE_URL}/allFetch`, {
        params: {
          alias: aliasName,
          branchname: selectedBranch.branchname,
          id: selectedBranch.id,
        },
      });
      setGeneralData(response.data);
      setRegistrationData({
        PAN: response.data.PAN,
        GST: response.data.GST,
        IEC: response.data.IEC,
      });
      setAccountData({
        creditdays: response.data.creditdays,
      });
      setCheckedBoxOptions(response.data.checkedBoxOptions);
      setOrgganizationTypeOptions(response.data.orgganizationTypeOptions);
      setContacts(response.data.contactDetails || []);
      localStorage.setItem(
        "firstorgofclient",
        JSON.stringify(selectedBranchName)
      );
      localStorage.setItem("branchnames", selectedBranchName.branchname);
      // localStorage.setItem(
      //   "branchDataforprefill",
      //   JSON.stringify(response.data)
      // );

      const country = response.data.country;
      setSelectedCountry(country);

      // Fetch states for the selected country
      const countryCode = Country.getAllCountries().find(
        (c) => c.name === country
      )?.isoCode;
      if (countryCode) {
        await fetchStates(countryCode); // Fetch states for the selected country

        // Set the selected state
        const state = response.data.state;
        setSelectedState(state);

        // Fetch cities for the selected state
        const stateCode = State.getStatesOfCountry(countryCode).find(
          (s) => s.name === state
        )?.isoCode;
        if (stateCode) {
          await fetchCities(countryCode, stateCode); // Fetch cities for the selected state

          // Set the selected city
          const city = response.data.city;
          setSelectedCity(city);
        }
      }
      toast.success("Branched switched successfully");
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  async function handleDelete(e, index) {
    e.preventDefault();
    const currentDate = moment().format("YYYY-MM-DD");

    try {
      const branchtoDelete = allBranches[index];
      const clientname = localStorage.getItem("organizationclientname");
      const codeoforg = localStorage.getItem("orgcode");
      const nameoforg = localStorage.getItem("orgname");

      // Send data to backend
      const response = await axios.put(`${API_BASE_URL}/deleteBranch`, {
        data: {
          id: branchtoDelete.id,
          branchname: branchtoDelete.branchname,
          orgcode: codeoforg,
          orgname: nameoforg,
          clientname: clientname,
          deletedat: currentDate,
        },
      });

      // Handle success response
      toast.success("Branch deleted successfully");
      console.log(response.data);
      navigate("/organization#/organization");
    } catch (error) {
      // Handle error
      console.log(error);
    }
  }

  let checkbranchname = JSON.parse(localStorage.getItem("firstorgofclient"));

  // useEffect(() => {
  //   if (Data) {
  //     setGeneralData(Data);
  //     setSelectedCountry(Data.country);
  //     setSelectedState(Data.state);
  //     setSelectedCity(Data.city);
  //   }
  // }, [Data, setGeneralData]);
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
    // const selectedState = event;
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

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedBoxOptions((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleOrgTypeChange = (event) => {
    const { value, checked } = event.target;
    setOrgganizationTypeOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  // 🧠 Place this ABOVE updateData()
  const validateForm = () => {
    const errors = [];

    if (!generalData.branchname) errors.push("Branch Name is required");
    if (!generalData.clientname) errors.push("Client Name is required");
    if (!generalData.address) errors.push("Address is required");
    if (!generalData.country && !selectedCountry) errors.push("Country is required");
    if (!generalData.state && !selectedState) errors.push("State is required");
    if (!generalData.city && !selectedCity) errors.push("City is required");
    if (!generalData.postalcode) errors.push("Postal Code is required");
    if (!generalData.phone) errors.push("Phone is required");
    if (!generalData.email) errors.push("Email is required");
    if (!registrationData.PAN) errors.push("PAN is required");
    if (!registrationData.GST) errors.push("GST is required");
    if (!registrationData.IEC) errors.push("IEC is required");
    if (!accountData.creditdays) errors.push("Credit Days is required");
    if (!checkedBoxOptions || checkedBoxOptions.length === 0)
      errors.push("Checked Box Options are required");
    if (!orgganizationTypeOptions || orgganizationTypeOptions.length === 0)
      errors.push("Organization Type Options are required");
    if (!contacts || contacts.length === 0)
      errors.push("At least one Contact Detail is required");
    if (!accountData.followup2) errors.push("Follow-up 2 is required");
    if (!accountData.followup3) errors.push("Follow-up 3 is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (generalData.email && !emailRegex.test(generalData.email)) {
      errors.push("Email format is invalid (e.g., example@gmail.com)");
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (registrationData.PAN && !panRegex.test(registrationData.PAN)) {
      errors.push("PAN format is invalid (e.g., ABCDE1234F)");
    }

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
    if (registrationData.GST && !gstRegex.test(registrationData.GST)) {
      errors.push("GST format is invalid (e.g., 22AAAAA0000A1Z5)");
    }

    if (registrationData.GST) {
      const stateCode = parseInt(registrationData.GST.slice(0, 2));
      if (stateCode < 1 || stateCode > 35) {
        errors.push("Invalid GST state code.");
      }
    }

    const iecRegex = /^[A-Z0-9]{10}$/;
    if (registrationData.IEC && !iecRegex.test(registrationData.IEC)) {
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

    if (contacts && Array.isArray(contacts)) {
      contacts.forEach((contact, index) => {
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

  async function updateData() {
    try {
      const errors = validateForm();
      if (errors.length > 0) {
        errors.forEach((err) => toast.error(err));
        return; // Don't proceed
      }

      const alias = aliasName;
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const username = localStorage.getItem("username");
      const branchnameofemp = localStorage.getItem("branchnameofemp");
      const branchcodeofemp = localStorage.getItem("branchcodeofemp");

      const dataToUpdate = {
        username: username,
        alias: alias,
        branchname: generalData.branchname,
        id: generalData.id,
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
        showClientCode: generalData.showClientCode,
        checkedBoxOptions: checkedBoxOptions,
        orgganizationTypeOptions: orgganizationTypeOptions,
        contactDetails: contacts,
        orgname: nameoforg,
        orgcode: codeoforg,
        branchnameofemp: branchnameofemp,
        branchcodeofemp: branchcodeofemp,
        followup2: accountData.followup2,
        followup3: accountData.followup3,
        section: "General",
      };

      const response = await axios.put(
        `${API_BASE_URL}/updateData`,
        dataToUpdate
      );

      localStorage.setItem("organizationData", JSON.stringify(response));
      toast.success("Updated data successfully");

      const approversResponse = await axios.get(
        `${API_BASE_URL}/getApprovernamesfororg`,
        {
          params: {
            orgname: nameoforg,
            orgcode: codeoforg,
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );

      console.log("Approvers:", approversResponse.data);
    } catch (error) {
      if (error.response) {
        toast.error(`Save failed: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error updating data:", error);
    }
  }

  return (
    <div>
      <CCol xs={12}>
        <motion.div
          initial={{ opacity: 0 }} // Starts faded & moves up
          animate={{ opacity: 1 }} // Becomes fully visible
          exit={{ opacity: 0 }} // Fades out & moves up
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
        >
          <CCard className="global-card" style={{ height: "430px" }}>
            <div className="organisation-div-general">
              <CCardBody className="org-client-code">
                <div
                  className="org-general-main-container"
                  // style={{ paddingTop: "20px" }}
                >
                  <div className="mb-2 org-card-width-100">
                    <div
                      className="org-card-width-50-left"
                      style={{
                        width: "50%",
                      }}
                    >
                      <div>
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
                                checked={orgganizationTypeOptions.includes(
                                  option
                                )} // Check if the option is in the checkedBoxOptions array
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      className="org-card-width-50-right"
                      style={{
                        width: "58%",
                        borderLeft:
                          theme === "dark"
                            ? "1px solid #BDF2F5"
                            : "1px solid #BEC3CF",
                        paddingLeft: "30px",
                      }}
                    >
                      <div>
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
                  </div>

                  {/* <div className="org-line"></div> */}

                  <div className="middle-section-orh-general">
                    <div className="org-general-part">
                      <div className="org-gen-label-input-align">
                        <label className="labelOrganizationGeneral">
                          Client Name :
                        </label>
                        <NewInput
                          width={"100%"}
                          setSelectedValue={handleChange}
                          type={"text"}
                          placeholder={"Client Name"}
                          selectedValue={
                            generalData.clientname
                              ? generalData.clientname
                              : localStorage.getItem("organizationclientname")
                          }
                          name="clientname"
                        />
                      </div>
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
                          width={"100%"}
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

                      <div
                        className="org-gen-label-input-align"
                        style={{ marginLeft: "0px" }}
                      >
                        <label className="labelOrganizationGeneral">
                          Postal Code :{" "}
                        </label>
                        <NewInput
                          width={"100%"}
                          setSelectedValue={handleChange}
                          type={"text"}
                          placeholder={"Postal Code"}
                          selectedValue={generalData.postalcode}
                          name="postalcode"
                        />
                      </div>
                      <div className="org-gen-label-input-align">
                        <label className="labelOrganizationGeneral">
                          Phone Number :{" "}
                        </label>

                        <NewInput
                          width={"100%"}
                          setSelectedValue={handleChange}
                          type={"text"}
                          placeholder={"Phone Number"}
                          selectedValue={generalData.phone}
                          name="phone"
                        />
                      </div>
                                            <div
                        className="org-gen-label-input-align"
                        style={{ marginLeft: "0px" }}
                      >
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
                          width={"100%"}
                        />
                        {/* {console.log("statelist", stateList)} */}
                        {/* <select
                        value={selectedState}
                        className="organisation-location-select  gen-text-field-1 "
                        onChange={handleStateChange}
                        disabled={!selectedCountry}
                      >
                        <option value="">Select State</option>
                        {stateList.map((state) => (
                          <option key={state.code} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select> */}
                      </div>

                      <div
                        className="org-gen-label-input-align"
                        style={{ marginLeft: "0px" }}
                      >
                        <label className="labelOrganizationGeneral">
                          Branch Name :
                        </label>

                        <CDropdown
                          className="gen-text-field-1 "
                          style={{
                            padding: "0px",
                          }}
                        >
                          <CDropdownToggle
                            // className="select-bg-change"
                            style={{
                              backgroundColor: "transparent",
                              borderColor:
                                theme === "dark" ? "#D1EEFF" : "#535B87",

                              outline: "none",
                              paddingTop: "0px",
                              paddingLeft: "20px",
                              paddingRight: "40px",
                              paddingBottom: "0px",
                              fontSize: "12px",
                              borderRadius: "10px",
                              width: "80%",
                              color: theme === "dark" ? "#D1EEFF" : "#535B87",
                              textAlign: "left",
                            }}
                            color="secondary"
                            caret={false} // Important! Removes the arrow in CoreUI
                          >
                            {branchInUrl}
                            <span style={{ marginRight: "8px" }}></span>
                            <span
                              style={{ position: "absolute", right: "10px" }}
                            >
                              <NewDropDown />
                            </span>
                          </CDropdownToggle>
                          <CDropdownMenu
                            style={{
                              // cursor: "pointer",
                              width: "100%",

                              // display: "flex",
                              // flexDirection: "column",
                              // alignItems: "center",
                              backgroundColor:
                                theme === "dark" ? "#101322" : "#1E2652",
                            }}
                            // className="gen-org-text-field-2"
                          >
                            {allBranches.map((branch, index) => (
                              <CDropdownItem
                                key={index}
                                onClick={() => {
                                  handlebranchchange(index);
                                  navigate(
                                    `/Editorg?alias=${aliasName}&branch=${branch.branchname}&id=${branch.id}`,
                                    {
                                      replace: true, // Replace the current entry in the history stack
                                    }
                                  );
                                }}
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  backgroundColor:
                                    theme === "dark" ? "#101322" : "#1E2652",
                                  color: "#f6fcff",
                                }}
                              >
                                {branch.branchname}

                                <div
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "20px",
                                    position: "absolute",
                                    right: "20px",
                                  }}
                                  onClick={(e) => handleDelete(e, index)}
                                >
                                  <DeleteBtn fill={"#f8d7da"} />
                                </div>
                              </CDropdownItem>
                            ))}

                            <CDropdownDivider />
                            <CDropdownItem
                              onClick={() => {
                                // setVisible(true)
                                setCurrentPopup("Add New branch");
                              }}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor:
                                  theme === "dark" ? "#101322" : "#1E2652",
                                color: "#f6fcff",
                              }}
                            >
                              Add New Branch
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </div>

                      <div
                        className="org-gen-label-input-align"
                        style={{ marginLeft: "0px" }}
                      >
                        <label className="labelOrganizationGeneral">
                          Email Address :{" "}
                        </label>

                        <NewInput
                          width={"100%"}
                          setSelectedValue={handleChange}
                          type={"text"}
                          placeholder={"Email Address"}
                          selectedValue={generalData.email}
                          name="email"
                        />
                      </div>
                      <div className="org-gen-label-input-align ">
                        <label className="labelOrganizationGeneral">
                          City :{" "}
                        </label>
                        {/* <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        disabled={!selectedState}
                        className="organisation-location-select gen-text-field-1"
                      >
                        <option value="">Select City</option>
                        {cityList.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select> */}

                        <NewDropdownInput
                          type="type1"
                          options={cityList.map((item) => {
                            return { label: item, value: item };
                          })}
                          selectedValue={selectedCity}
                          setSelectedValue={handleCityChange}
                          width={"100%"}
                        />
                      </div>
                      <div className="org-gen-label-input-align">
                        <label className="labelOrganizationGeneral">
                          Address :
                        </label>
                        <textarea
                          type="text"
                          name="address"
                          cols="50"
                          rows="5"
                          value={generalData.address}
                          // placeholder="Address"
                          onChange={handleChange}
                          className="gen-textarea-field"
                          style={{ width: "100%" }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="org-client-code-part">
                    <div className="client-code-creation">
                      <h6>Do you want to create Client Code?</h6>
                      {/* <CFormCheck
                      type="checkbox"
                      name="showClientCode"
                      checked={generalData.showClientCode}
                      onChange={() =>
                        setGeneralData((prevData) => ({
                          ...prevData,
                          showClientCode: !prevData.showClientCode,
                        }))
                      }
                    /> */}
                      {console.log(
                        "generalData.showClientCode",
                        generalData.showClientCode
                      )}
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
                  {/* <div className="mb-2 search-button update-button"></div> */}
                </div>
              </CCardBody>
            </div>
          </CCard>
        </motion.div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            position: "fixed",
            marginTop: "10px",
          }}
        >
          <div onClick={updateData}>
            <NewButton width={"120px"} text={"Save"} />
          </div>

          {/* <div
              onClick={async () => {
                await updateData();
                redirectToNew();
              }}
            >
              <NewButton width={"120px"} text={"Save & New"} />
            </div>

            <div
              onClick={async () => {
                await updateData();
                redirectToOrg();
              }}
            >
              <NewButton width={"120px"} text={"Save & Close"} />
            </div> */}
          <div onClick={() => window.close()}>
            <NewButton width={"120px"} text={"Close"} />
          </div>
        </div>
      </CCol>

      {currentPopup === "Add New branch" && (
        <InputPopup
          title="Add New Branch"
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={generalData}
          setValue={setGeneralData}
          handleAdd={handleAddBranch}
          firstButtonText={"Add New"}
          secondButtonText={"Close"}
          selection={"none"}
          top={"38%"}
          left={"50%"}
          width={"330px"}
        />
      )}

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            Add Branch Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* <div>
                        <input type="date" placeholder="" className='gen-text-field-1' />
                    </div>
                    <div>
                        <input type="text" placeholder="Bill No." className='gen-text-field-1' />
                    </div> */}
          <div>
            <label>Branch Name : {""}</label>
            <input
              type="text"
              // placeholder="Branch Name"
              value={generalData.branchName}
              // className="gen-text-field-1"
              name="branchName"
              onChange={handleChange}
            />
          </div>

          {/* <div>
                        <input type="text" placeholder="Amount" className='gen-text-field-1' />
                    </div>
                    <div>
                        <input type="text" placeholder="Tax" className='gen-text-field-1' />
                    </div>
                    <div>
                        <input type="text" placeholder="Grand Total" className='gen-text-field-1' />
                    </div> */}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAddBranch}>
            Add New
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default General;
