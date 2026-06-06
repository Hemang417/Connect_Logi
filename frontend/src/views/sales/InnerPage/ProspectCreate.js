import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  CCard,
  CCardBody,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import { useNavigate, Link } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import "../css/sales.css";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import sales from "../sales";
import { number } from "prop-types";
import API_BASE_URL from "src/config/config";
function ProspectCreate() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");
  const [source, setSource] = useState("");
  const [customSource, setCustomSource] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const currentDateandTime = moment().format("YYYY-MM-DDTHH:mm");

  const [salesData, setSalesData] = useState({
    // querydate: currentDateandTime,
    username: localStorage.getItem("username"),
    customerName: "",
    contactPersonName: [""],
    contactPersonNo: [""],
    emailId: [""],
    address: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    // source: source,
    // customSource: customSource,
  });

  async function storeQuery() {
    try {
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const branchnameoftheorg = localStorage.getItem("branchnameofemp");
      const branchcodeoftheorg = localStorage.getItem("branchcodeofemp");
      const currentDate = new Date();
      const dateinformat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");

      const response = await axios.post(
        `${API_BASE_URL}/storeprospectdata`,
        {
          ...salesData,
          source: source,
          customSource: customSource,
          orgname: nameoforg,
          orgcode: codeoforg,
          branchname: branchnameoftheorg,
          branchcode: branchcodeoftheorg,
          currentDate: dateinformat,
        }
      );

      if (response.status === 200) {
        toast.success("Query Created Successfully");
        navigate("/Prospect");
      }
    } catch (error) {
      console.log(error);
      toast.error("Job creation failed");
    }
  }

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD format
    setCurrentDate(formattedDate);
  }, []);

  const handleSourceChange = (event) => {
    const { value } = event.target;
    setSource(value);
    if (value !== "custom") {
      setCustomSource(""); // Clear custom text if another option is selected
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
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSalesData((prevData) => ({ ...prevData, country: selectedCountry }));
    const countryCode = countryList.find(
      (c) => c.name === selectedCountry
    )?.code;
    fetchStates(countryCode);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSalesData((prevData) => ({ ...prevData, state: selectedState }));
    const countryCode = countryList.find(
      (c) => c.name === selectedCountry
    )?.code;
    const stateCode = stateList.find((s) => s.name === selectedState)?.code;
    fetchCities(countryCode, stateCode);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    setSalesData((prevData) => ({ ...prevData, city: selectedCity }));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSave = async () => {
    // Add save functionality here
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSalesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [prefillData, setPrefillData] = useState(null);

  const fetchPrefillData = async () => {
    try {
      const id = localStorage.getItem("prospectid");
      const response = await axios.get(
        `${API_BASE_URL}/getprospectbyid`,
        {
          params: {
            id: id,
          },
        }
      );
      // console.log('sds',response.data[0])
      setPrefillData(response.data[0]);
    } catch (error) {
      console.error("Error fetching prefill data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("onEdit") === "true") {
      fetchPrefillData();
    }
  }, []);

  useEffect(() => {
    if (prefillData) {
      const countryCode = Country.getAllCountries().find(
        (c) => c.name === prefillData.country
      )?.isoCode;
      const stateCode = State.getStatesOfCountry(countryCode).find(
        (s) => s.name === prefillData.state
      )?.isoCode;
      setSalesData({
        referenceNo: prefillData.referenceNo,
        name: prefillData.name,
        emailId: Array.isArray(prefillData.emailId)
          ? prefillData.emailId
          : [prefillData.emailId || ""], // Ensure it's an array
        phone: prefillData.phone,
        customerName: prefillData.customerName,
        contactPersonName: Array.isArray(prefillData.contactPersonName)
          ? prefillData.contactPersonName
          : [prefillData.contactPersonName || ""],
        contactPersonNo: Array.isArray(prefillData.contactPersonNo)
          ? prefillData.contactPersonNo
          : [prefillData.contactPersonNo],

        source: prefillData.source,
        address: prefillData.address,
        country: prefillData.country,
        state: prefillData.state,
        city: prefillData.city,
        postalcode: prefillData.postalcode,
      });

      // Set source and customSource states
      setSource(prefillData.source);
      setCustomSource(prefillData.customSource || "");

      // Set selected country and state
      setSelectedCountry(prefillData.country);
      setSelectedState(prefillData.state);
      setSelectedCity(prefillData.city);

      // Fetch states and cities
      fetchStates(countryCode).then(() => {
        fetchCities(countryCode, stateCode);
      });
    }
  }, [prefillData]);

  const updateprospect = async () => {
    try {
      const id = localStorage.getItem("prospectid");
      console.log("Prospect ID:", id);
      const response = await axios.put(
        `${API_BASE_URL}/updateprospect/${id}`,
        {
          customerName: salesData.customerName,
          contactPersonName: salesData.contactPersonName,
          contactPersonNo: salesData.contactPersonNo,
          emailId: salesData.emailId,
          address: salesData.address,
          source: source,
          customSource: customSource,
          country: salesData.country,
          state: salesData.state,
          city: salesData.city,
          postalcode: salesData.postalcode,
        }
      );

      if (response.status === 200) {
        toast.success("Debit details updated successfully");
        localStorage.removeItem("prospectid");
        navigate("/Prospect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const backButton = () => {
    navigate("/Prospect");
    localStorage.removeItem("prospectid");
  };

  const handleAddContactPersonName = () => {
    setSalesData((prevData) => ({
      ...prevData,
      contactPersonName: [...prevData.contactPersonName, ""], // Add an empty string for the new contact person name
    }));
  };

  const handleAddContactPersonNumber = () => {
    setSalesData((prevData) => ({
      ...prevData,
      contactPersonNo: [...prevData.contactPersonNo, ""], // Add an empty string for the new contact person number
    }));
  };

  const handleAddEmailId = () => {
    setSalesData((prevData) => ({
      ...prevData,
      emailId: [...prevData.emailId, ""], // Add an empty string for the new email ID
    }));
  };

  const handleContactPersonNameChange = (index, value) => {
    setSalesData((prevData) => {
      const updatedNames = [...prevData.contactPersonName];
      updatedNames[index] = value; // Save the name at the specified index
      return { ...prevData, contactPersonName: updatedNames };
    });
  };

  const handleContactPersonNumberChange = (index, value) => {
    setSalesData((prevData) => {
      const updatedNumber = [...prevData.contactPersonNo];
      updatedNumber[index] = value;
      return { ...prevData, contactPersonNo: updatedNumber };
    });
  };

  const handleemailIDChange = (index, value) => {
    setSalesData((prevData) => {
      const updatedEmail = [...prevData.emailId];
      updatedEmail[index] = value;
      return { ...prevData, emailId: updatedEmail };
    });
  };

  const handleDeleteContactPersonName = (index) => {
    setSalesData((prevData) => {
      const updatedNames = prevData.contactPersonName.filter(
        (_, i) => i !== index
      );
      return { ...prevData, contactPersonName: updatedNames };
    });
  };

  const handleDeleteContactPersonNumber = (index) => {
    setSalesData((prevData) => {
      const updatedNumbers = prevData.contactPersonNo.filter(
        (_, i) => i !== index
      );
      return { ...prevData, contactPersonNo: updatedNumbers };
    });
  };

  const handleDeleteEmailId = (index) => {
    setSalesData((prevData) => {
      const updatedEmails = prevData.emailId.filter((_, i) => i !== index);
      return { ...prevData, emailId: updatedEmails };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <CCard className="card-space-prospect">
        <CCardBody className="prospect-primary-container">
          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="jobNo" className="prospect-job-label">
                Reference No. :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="referenceNo"
                value={salesData.referenceNo}
                readOnly
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-date">
              <label htmlFor="date" className="prospectdate-job-text-field-3">
                Date :
              </label>
              <input
                type="text"
                value={currentDate}
                className="job-text-field-4"
                readOnly
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="username" className="prospect-job-label">
                Username :
              </label>
              <input
                type="text"
                placeholder=""
                name="username"
                onChange={handleInputChange}
                value={salesData.username}
                className="job-text-field-4"
              />
            </div>
          </div>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <h4>Prospect Details</h4>
          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label
                htmlFor="customerName"
                className="prospect-job-label-three"
              >
                Customer Name :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="customerName"
                value={salesData.customerName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-secondary">
            <label
              htmlFor="ContactPersonName"
              className="prospect-job-label-three"
            >
              Contact Person Name :
            </label>
            <div>
              {salesData.contactPersonName.map((name, index) => (
                <div
                  className="prospect-job-grid-container-secondary"
                  key={index}
                >
                  <div className="grid-equalizer-1">
                    <input
                      type="text"
                      placeholder="Contact Person Name"
                      className="job-text-field-4"
                      value={name}
                      onChange={(e) =>
                        handleContactPersonNameChange(index, e.target.value)
                      }
                    />
                  </div>
                  {index > 0 && (
                    <div onClick={() => handleDeleteContactPersonName(index)}>
                      <svg
                        style={{ marginLeft: "12px", cursor: "pointer" }}
                        width="24px"
                        height="24px"
                        viewBox="0 0 117 117"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title></title>
                          <desc></desc>
                          <defs></defs>
                          <g
                            fill="none"
                            fillRule="evenodd"
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                          >
                            <g fillRule="nonzero" id="remove">
                              <path
                                d="M58.5,116.4 C90.4,116.4 116.4,90.4 116.4,58.5 C116.4,26.6 90.4,0.6 58.5,0.6 C26.6,0.6 0.6,26.6 0.6,58.5 C0.6,90.4 26.6,116.4 58.5,116.4 Z M58.5,8.7 C85.9,8.7 108.3,31 108.3,58.5 C108.3,86 86,108.3 58.5,108.3 C31,108.3 8.7,85.9 8.7,58.5 C8.7,31.1 31.1,8.7 58.5,8.7 Z"
                                fill="#000000"
                                id="Shape"
                              ></path>
                              <path
                                d="M31.8,62 L85.1,62 C87.4,62 89.2,60.2 89.2,57.9 C89.2,55.6 87.4,53.8 85.1,53.8 L31.8,53.8 C29.5,53.8 27.7,55.6 27.7,57.9 C27.7,60.2 29.6,62 31.8,62 Z"
                                fill="#000000"
                                id="Shape"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              <div className="prospect-job-grid-container-secondary">
                <Link onClick={handleAddContactPersonName}>
                  <svg
                    width="34px"
                    height="34px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        opacity="0.5"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        fill="#1C274C"
                      ></path>
                      <path
                        d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                        fill="#1C274C"
                      ></path>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="prospect-job-grid-container-secondary">
            <label
              htmlFor="customerPhoneNumber"
              className="prospect-job-label-three"
            >
              Contact Person Number :
            </label>
            <div>
              {salesData.contactPersonNo.map((number, index) => (
                <div
                  className="prospect-job-grid-container-secondary"
                  key={index}
                >
                  <div className="grid-equalizer-1">
                    <input
                      type="text"
                      placeholder="Contact Person Number"
                      className="job-text-field-4"
                      value={number}
                      onChange={(e) =>
                        handleContactPersonNumberChange(index, e.target.value)
                      }
                    />
                  </div>

                  {index > 0 && (
                    <div onClick={() => handleDeleteContactPersonNumber(index)}>
                      <svg
                        style={{ marginLeft: "12px", cursor: "pointer" }}
                        width="24px"
                        height="24px"
                        viewBox="0 0 117 117"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title></title>
                          <desc></desc>
                          <defs></defs>
                          <g
                            fill="none"
                            fillRule="evenodd"
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                          >
                            <g fillRule="nonzero" id="remove">
                              <path
                                d="M58.5,116.4 C90.4,116.4 116.4,90.4 116.4,58.5 C116.4,26.6 90.4,0.6 58.5,0.6 C26.6,0.6 0.6,26.6 0.6,58.5 C0.6,90.4 26.6,116.4 58.5,116.4 Z M58.5,8.7 C85.9,8.7 108.3,31 108.3,58.5 C108.3,86 86,108.3 58.5,108.3 C31,108.3 8.7,85.9 8.7,58.5 C8.7,31.1 31.1,8.7 58.5,8.7 Z"
                                fill="#000000"
                                id="Shape"
                              ></path>
                              <path
                                d="M31.8,62 L85.1,62 C87.4,62 89.2,60.2 89.2,57.9 C89.2,55.6 87.4,53.8 85.1,53.8 L31.8,53.8 C29.5,53.8 27.7,55.6 27.7,57.9 C27.7,60.2 29.6,62 31.8,62 Z"
                                fill="#000000"
                                id="Shape"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              <div className="prospect-job-grid-container-secondary">
                <Link onClick={handleAddContactPersonNumber}>
                  <svg
                    width="34px"
                    height="34px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        opacity="0.5"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        fill="#1C274C"
                      ></path>
                      <path
                        d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                        fill="#1C274C"
                      ></path>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="prospect-job-grid-container-secondary">
            <label htmlFor="emailID" className="prospect-job-label-three">
              Email :
            </label>
            <div>
              {salesData.emailId.map((email, index) => (
                <div
                  className="prospect-job-grid-container-secondary"
                  key={index}
                >
                  <div className="grid-equalizer-1">
                    <input
                      type="text"
                      placeholder="Email ID"
                      className="job-text-field-4"
                      value={email}
                      onChange={(e) =>
                        handleemailIDChange(index, e.target.value)
                      }
                    />
                  </div>
                  {index > 0 && (
                    <div onClick={() => handleDeleteEmailId(index)}>
                      <svg
                        style={{ marginLeft: "12px", cursor: "pointer" }}
                        width="24px"
                        height="24px"
                        viewBox="0 0 117 117"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title></title>
                          <desc></desc>
                          <defs></defs>
                          <g
                            fill="none"
                            fillRule="evenodd"
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                          >
                            <g fillRule="nonzero" id="remove">
                              <path
                                d="M58.5,116.4 C90.4,116.4 116.4,90.4 116.4,58.5 C116.4,26.6 90.4,0.6 58.5,0.6 C26.6,0.6 0.6,26.6 0.6,58.5 C0.6,90.4 26.6,116.4 58.5,116.4 Z M58.5,8.7 C85.9,8.7 108.3,31 108.3,58.5 C108.3,86 86,108.3 58.5,108.3 C31,108.3 8.7,85.9 8.7,58.5 C8.7,31.1 31.1,8.7 58.5,8.7 Z"
                                fill="#000000"
                                id="Shape"
                              ></path>
                              <path
                                d="M31.8,62 L85.1,62 C87.4,62 89.2,60.2 89.2,57.9 C89.2,55.6 87.4,53.8 85.1,53.8 L31.8,53.8 C29.5,53.8 27.7,55.6 27.7,57.9 C27.7,60.2 29.6,62 31.8,62 Z"
                                fill="#000000"
                                id="Shape"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              <div className="prospect-job-grid-container-secondary">
                <Link onClick={handleAddEmailId}>
                  <svg
                    width="34px"
                    height="34px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        opacity="0.5"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        fill="#1C274C"
                      ></path>
                      <path
                        d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                        fill="#1C274C"
                      ></path>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label htmlFor="address" className="prospect-job-label-three">
                Address :
              </label>
              <textarea
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="address"
                value={salesData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label htmlFor="country" className="prospect-job-label-three">
                Country :
              </label>
              <select
                name="country"
                value={selectedCountry || salesData.country}
                onChange={handleCountryChange}
                className="prospect-location-select"
              >
                <option value="">Select Country</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label htmlFor="state" className="prospect-job-label-three">
                State/Province :
              </label>
              <select
                name="state"
                value={selectedState || salesData.state}
                className="prospect-location-select"
                onChange={handleStateChange}
                disabled={!selectedCountry}
              >
                <option value="">Select State</option>
                {stateList.map((state) => (
                  <option key={state.code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label htmlFor="city" className="prospect-job-label-three">
                City :
              </label>
              <select
                name="city"
                value={selectedCity || salesData.city}
                onChange={handleCityChange}
                disabled={!selectedState}
                className="prospect-location-select"
              >
                <option value="">Select City</option>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label htmlFor="postalcode" className="prospect-job-label-three">
                Postal Code :
              </label>
              <input
                type="text"
                name="postalcode"
                placeholder=""
                className="job-text-field-4"
                value={salesData.postalcode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-secondary">
            <div className="source-container">
              <label htmlFor="source" className="prospect-job-label-three">
                Source :
              </label>
              <div className="prospect-source-options">
                <div className="source-default-label">
                  <label>
                    <input
                      type="radio"
                      name="source"
                      value="online"
                      checked={source === "online"}
                      onChange={handleSourceChange}
                    />{" "}
                    Online
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="source"
                      value="reference"
                      checked={source === "reference"}
                      onChange={handleSourceChange}
                    />{" "}
                    Reference
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="source"
                      value="custom"
                      checked={source === "custom"}
                      onChange={handleSourceChange}
                    />{" "}
                    Add Custom
                  </label>
                  {"    "}
                  <div>
                    {source === "custom" && (
                      <div className="textarea-wrapper">
                        <textarea
                          type="text"
                          placeholder="Specify Source"
                          name="customSource"
                          value={customSource}
                          onChange={(e) => setCustomSource(e.target.value)}
                          className="source-textarea-field"
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>

      <div style={{ display: "flex", gap: "20px", margin: "0 0 10px 5px" }}>
        <div className="prospect-search-button">
          {localStorage.getItem("onEdit") === "true" ? (
            <button
              className="button-23"
              type="submit"
              onClick={updateprospect}
            >
              <b>Save</b>
            </button>
          ) : (
            <button className="button-23" type="submit" onClick={storeQuery}>
              <b>Create</b>
            </button>
          )}
        </div>

        <div className="prospect-search-button">
          <button onClick={backButton} className="button-23" type="submit">
            <b>Close</b>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProspectCreate;
