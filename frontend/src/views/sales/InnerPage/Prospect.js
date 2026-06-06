import React, { useEffect, useRef } from "react";
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CPagination,
  CPaginationItem,
  CPopover,
  CModalTitle,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CTextarea,
  CFooter,
} from "@coreui/react";
import "../css/sales.css";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Calendar from "src/components/Calendar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import refreshIcon from "../../../importIcons/refresh.png";
import { getYear, getMonth } from "date-fns";

import Pagination from "src/layout/Pagination";
import { fetchData } from "pdfjs-dist";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DownlodBtn from "src/views/buttons/buttons/DownlodBtn";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import API_BASE_URL from "src/config/config";

function Prospect() {
  const navigate = useNavigate();
  const [prospectData, setProspectData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedMode, setselectedMode] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [searchReferenceNo, setSearchReferenceNo] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchContactPerson, setSearchContactPerson] = useState("");
  const [selectSource, setSelectSource] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [dateRangeOption, setDateRangeOption] = useState("");
  const [filteredQuery, setFilteredQuery] = useState([]);

  const datePickerRef = useRef(null);
  const datePickerRefStart = useRef();

  const handleDateSelect = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // Add any additional logic for filtering or processing
  };

  const handleDateRangeSelection = (option) => {
    const today = moment();
    const fiscalYearStart = moment(today).startOf("year").add(1, "months");
    switch (option) {
      case "today":
        setStartDate(today.startOf("day").toDate());
        setEndDate(today.endOf("day").toDate());
        // setEndDate(today.endOf("week").toDate());
        break;
      case "thisWeek":
        setStartDate(today.startOf("week").toDate());
        setEndDate(today.endOf("week").toDate());
        break;
      case "lastWeek":
        const lastWeekStart = moment(today).subtract(1, "week").startOf("week");
        setStartDate(lastWeekStart.toDate());
        setEndDate(lastWeekStart.endOf("week").toDate());
        break;
      case "thisMonth":
        setStartDate(today.startOf("month").toDate());
        setEndDate(today.endOf("month").toDate());
        break;
      case "lastMonth":
        const lastMonthStart = moment(today)
          .subtract(1, "month")
          .startOf("month");
        setStartDate(lastMonthStart.toDate());
        setEndDate(lastMonthStart.endOf("month").toDate());
        break;
      case "thisCalendarYear":
        setStartDate(today.startOf("year").toDate());
        setEndDate(today.endOf("year").toDate());
        break;
      case "lastCalendarYear":
        const lastYearStart = moment(today).subtract(1, "year").startOf("year");
        setStartDate(lastYearStart.toDate());
        setEndDate(lastYearStart.endOf("year").toDate());
        break;
      case "thisFiscalYear":
        setStartDate(fiscalYearStart.toDate());
        setEndDate(fiscalYearStart.add(1, "year").subtract(1, "day").toDate());
        break;
      case "lastFiscalYear":
        const lastFiscalYearStart = fiscalYearStart
          .subtract(1, "year")
          .startOf("year")
          .add(3, "months");
        setStartDate(lastFiscalYearStart.toDate());
        setEndDate(
          lastFiscalYearStart.add(1, "year").subtract(1, "day").toDate()
        );
        break;
      case "custom":
        setStartDate(null);
        setEndDate(null);
        if (datePickerRef.current) {
          datePickerRef.current.setFocus();
        }
      default:
        setStartDate(null);
        setEndDate(null);
    }
    setDateRangeOption(option);
  };
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangeOption("");
    if (datePickerRefStart.current) datePickerRefStart.current.setFocus();
  };
  const range = (start, end, step = 1) => {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, i) => start + i * step);
  };
  const years = range(1990, getYear(new Date()) + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDateRangeOption();
  };
  const handleSourceChange = (source) => {
    setSelectedSource(source);
    setCurrentPage(1);
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (prospectData.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < prospectData.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     } else if (e.key === "Enter") {
  //       const org = filteredQuery[selectedRowIndex];
  //       if (org) handleRowDoubleClick(org); // Call handleRowDoubleClick directly with the selected row
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, prospectData, filteredQuery]);

  const handleRowDoubleClick = (row) => {
    if (row) {
      localStorage.setItem("onEdit", true);
      localStorage.setItem("prospectid", row.id);
      navigate("/ProspectCreate");
    }
  };
  const allSources = ["online", "reference", "custom"];

  useEffect(() => {
    // Reset pagination when selectedMode changes
    setCurrentPage(1);
  }, [selectedMode, selectedSource]);

  const handleModeChange = () => {};

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getprospectdata`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setProspectData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshbutton = () => {
    try {
      toast.success("Data Refreshed");
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuery.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQuery.length / itemsPerPage);

  const genQueryMap = new Map(
    prospectData.map((genQuery) => [genQuery.referenceNo, genQuery])
  );

  useEffect(() => {
    const newFilteredQuery = prospectData
      .filter((query) => {
        const queryDate = moment(query.currentDate);
        const selectedDateMatch =
          (!startDate && !endDate) ||
          (startDate &&
            endDate &&
            queryDate.isBetween(startDate, endDate, null, "[]"));

        return (
          selectedDateMatch &&
          (!searchReferenceNo ||
            query.referenceNo
              .toLowerCase()
              .includes(searchReferenceNo.toLowerCase())) &&
          (!searchCustomerName ||
            query.customerName
              .toLowerCase()
              .includes(searchCustomerName.toLowerCase())) &&
          (!searchContactPerson ||
            (Array.isArray(query.contactPersonName) &&
              query.contactPersonName.some((name) =>
                name.toLowerCase().includes(searchContactPerson.toLowerCase())
              ))) &&
          (!selectedSource ||
            selectedSource === "All" ||
            query.source === selectedSource) // Adjusted filter condition
        );
      })
      .sort((a, b) => moment(b.currentDate).diff(moment(a.currentDate)));

    setFilteredQuery(newFilteredQuery);
    setCurrentPage(1); // reset pagination when filter changes
  }, [
    prospectData,
    startDate,
    endDate,
    searchReferenceNo,
    searchCustomerName,
    searchContactPerson,
    selectedSource,
  ]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  async function handleEdit(id) {
    // const thatdata = debitDetails[index]
    // localStorage.setItem("queryDate",thatdata.date)
    localStorage.setItem("onEdit", true);
    localStorage.setItem("prospectid", id);
  }

  const handleprospectDelete = async (id) => {
    // console.log("Deleting prospect with ID:", id);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteprospect?id=${id}`
      );

      if (response.status === 200) {
        toast.success("Debit entry deleted successfully.");
        // Refresh the debit details to reflect the deletion
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting debit entry:", error);
      toast.error("Failed to delete debit entry.");
    }
  };


  
  return (
    <div className="IMPORTPaginationAlignment">
      <div>
        <CCardBody className="button-div">
          <div>
            <Link
              to={"/ProspectCreate"}
              onClick={localStorage.removeItem("onEdit")}
            >
              <AddBtn />
            </Link>
          </div>
          <div>
            <Link onClick={() => refreshbutton()}>
              <RefreshBtn />
            </Link>
          </div>
          <div>
            <Link type="button">
              <DownlodBtn />
              {/* <span className="visually-hidden">Download file</span> */}
            </Link>
          </div>
        </CCardBody>
        <motion.div
    initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
    exit={{ opacity: 0, y: -20 }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
  >   
        <CCol xs={12}>
          <CCard className="mb-2 container-div">
            <CCardBody>
              <div className="grid-container-sales  ">
                <div className="date-picker-wrapper-sales">
                  <div className="grid-container-sales-jobnum">
                    <label className="prospect-label-width">Date : </label>
                    
                  </div>
                  <Calendar onDateSelect={handleDateSelect} />
                  
                </div>

                <div className="grid-container-sales-jobnum  ">
                  <label
                    htmlFor="Ref No."
                    onChange={handleInputChange(setSearchReferenceNo)}
                    className="prospect-label-width"
                  >
                    Reference No. :
                  </label>
                  <input
                    type="text"
                    value={searchReferenceNo}
                    onChange={handleInputChange(setSearchReferenceNo)}
                    placeholder=""
                    className="text-field-4"
                  />
                </div>
                <div className="grid-container-sales-jobnum  ">
                  <label htmlFor="Customer Name" className="prospect-label-width">
                    Customer Name :
                  </label>
                  <input
                    type="text"
                    className="text-field-4"
                    onChange={handleInputChange(setSearchCustomerName)}
                  />
                </div>
                <div className="grid-container-sales-jobnum  ">
                  <label htmlFor="Contact Person" className="prospect-label-width">
                    Contact Person :
                  </label>
                  <input
                    type="text"
                    className="text-field-4"
                    onChange={handleInputChange(setSearchContactPerson)}
                  />
                </div>
                <div className="grid-container-sales-jobnum ">
                  <label htmlFor="Mode" className="prospect-label-width">
                    Source :
                  </label>
                  <select
                    onChange={(e) => handleSourceChange(e.target.value)}
                    value={selectedSource || ""}
                  >
                    {/* <option>
                    {selectSource ? selectSource:"All"}
                    </option> */}
                    <option value="">All</option>
                    <option value="online">Online</option>
                    <option value="reference">Reference</option>
                    <option value="custom">Custom</option>
                  </select>
                  {/* <CDropdown>
                    <CDropdownToggle color="secondary">
                      {selectedSource || "Select Source"}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => handleSourceChange("All")}>
                        All
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleSourceChange("online")}
                      >
                        Online
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleSourceChange("reference")}
                      >
                        Reference
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleSourceChange("custom")}
                      >
                        Custom
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown> */}
                </div>
                <div className="grid-container-sales-search  ">
                  <div className="">
                    <CButton
                      className="btn btn-sm sales-all-buttons"
                      color="primary"
                      type="submit"
                    >
                      Search
                    </CButton>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCard>
          <CCardBody>
            <CForm className="form-import">
              <table className="table-sales-ref">
                <thead>
                  <tr className="head-sales-ref">
                    <th scope="col" className="row-font    ">
                      Date
                    </th>
                    <th scope="col" className="row-font    ">
                      Reference No.
                    </th>
                    <th scope="col" className="row-font    ">
                      Customer Name
                    </th>
                    <th scope="col" className="row-font    ">
                      Contact Person
                    </th>
                    <th scope="col" className="row-font    ">
                      Phone No.
                    </th>
                    <th scope="col" className="row-font    ">
                      Email
                    </th>
                    <th scope="col" className="row-font    ">
                      Source
                    </th>
                    <th scope="col" className="row-font "></th>
                  </tr>
                </thead>
                <tbody className="body-sales-ref">
                  {currentItems &&
                    currentItems.map((item, index) => (
                      <tr
                        onClick={() => setSelectedRowIndex(index)}
                        onDoubleClick={() => handleRowDoubleClick(item)}
                        className={` selected-row ${
                          selectedRowIndex === index ? "primary-selected" : ""
                        }`}
                        key={index}
                      >
                        {" "}
                        {/* Use item.id if available */}
                        {/* <th
                      scope="row"
                      className="font-small text-gray-900 whitespace-nowrapark:text d-white"
                    >
                      <Link
                        onClick={() => handleEdit(item.id)}
                        to={"/ProspectCreate"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                        </svg>
                      </Link>
                    </th> */}
                        <td className="td-sales-ref">
                          {moment(item.currentDate).format("DD-MM-YYYY")}
                        </td>
                        <td className="td-sales-ref">{item.referenceNo}</td>
                        <td className="td-sales-ref">{item.customerName}</td>
                        {/* <CTableDataCell>
                      {item.contactPersonName
                        ? item.contactPersonName.join(" / ")
                        : "N/A"}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.contactPersonNo
                        ? item.contactPersonNo.join(" / ")
                        : "N/A"}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.emailId ? item.emailId.join(" / ") : "N/A"}
                    </CTableDataCell> */}
                        <td className="td-sales-ref">
                          {item.contactPersonName
                            ? item.contactPersonName.map((name, index) => (
                                <span key={index}>
                                  {/* <svg
                                style={{ marginRight: "8px" }}
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 12H18M18 12L13 7M18 12L13 17"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg> */}
                                  {/* contact person name */}
                                  {/* <svg
                                width="24px"
                                height="24px"
                                style={{ marginRight: "8px" }}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="12"
                                  cy="6"
                                  r="4"
                                  stroke="#1C274C"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
                                  stroke="#1C274C"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                              </svg> */}
                                  {name} ,
                                  {/* {index < item.contactPersonName.length - 1 && (
                                <br />
                              )} */}
                                </span>
                              ))
                            : "N/A"}
                        </td>
                        <td className="td-sales-ref">
                          {item.contactPersonNo
                            ? item.contactPersonNo.map((phone, index) => (
                                <span key={index}>
                                  {/* Arrow */}
                                  {/* <svg
                                style={{ marginRight: "8px" }}
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 12H18M18 12L13 7M18 12L13 17"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg> */}
                                  {/* contact person number*/}
                                  {/* 
                              <svg
                                width="24px"
                                height="24px"
                                style={{ marginRight: "8px" }}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"
                                  fill="#1C274C"
                                />
                              </svg> */}
                                  +91-{phone} ,
                                  {/* {index < item.contactPersonNo.length - 1 && (
                                
                              )} */}
                                </span>
                              ))
                            : "N/A"}
                        </td>
                        <td className="td-sales-ref">
                          {item.emailId
                            ? item.emailId.map((email, index) => (
                                <span key={index}>
                                  {/* Arrow */}
                                  {/* <svg
                                style={{ marginRight: "8px" }}
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 12H18M18 12L13 7M18 12L13 17"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg> */}
                                  {/* email */}
                                  {/* <svg
                                width="24px"
                                height="24px"
                                style={{ marginRight: "8px" }}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                                  stroke="#1C274C"
                                  stroke-width="1.5"
                                  stroke-miterlimit="10"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                                  stroke="#1C274C"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                              </svg> */}
                                  {email} ,
                                  {/* {index < item.emailId.length - 1 && <br />} */}
                                </span>
                              ))
                            : "N/A"}
                        </td>
                        <td className="td-sales-ref">
                          {/* <svg
                                style={{ marginRight: "8px" }}
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 12H18M18 12L13 7M18 12L13 17"
                                  stroke="#000000"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg> */}

                          {/* <svg
                        style={{ marginRight: "8px" }}
                        width="24px"
                        height="24px"
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
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.962 13.41c-.927.06-1.915.09-2.962.09-1.047 0-2.035-.03-2.962-.09.267 4.954 1.884 8.74 2.962 8.74 1.078 0 2.694-3.785 2.962-8.74zm-7.936-.188c.152 3.571.961 6.533 2.06 8.442C4.983 20.404 2 16.554 2 12v-.09c1.329.621 3.003 1.056 5.026 1.312zm-4.784-3.44c1.127.662 2.719 1.14 4.769 1.42.103-3.76.933-6.882 2.074-8.866C5.67 3.386 3.03 6.23 2.242 9.782zm6.765 1.622C9.129 6.057 10.864 1.85 12 1.85s2.871 4.207 2.993 9.554c-.925.064-1.923.096-2.993.096a43.67 43.67 0 0 1-2.993-.096zm7.967 1.818c2.023-.256 3.697-.69 5.026-1.311V12c0 4.554-2.984 8.404-7.085 9.664 1.098-1.91 1.907-4.871 2.06-8.442zm4.784-3.44c-1.127.662-2.719 1.14-4.769 1.42-.103-3.76-.933-6.882-2.074-8.866 3.415 1.05 6.055 3.894 6.843 7.446z"
                            fill="#1C274C"
                          ></path>
                        </g>
                      </svg> */}

                          {/* <svg
                      style={{ marginRight: "8px" }}
                        width="24px"
                        height="24px"
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
                            d="M6 12H18M18 12L13 7M18 12L13 17"
                            stroke="#1C274C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg> */}

                          {item.source}
                        </td>
                        <td className="td-sales-ref ">
                          <button className="invisible-btn-style  delete-hover-color"  onClick={() => handleprospectDelete(item.id)}>
                            <DeleteBtn />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CForm>
          </CCardBody>
        </CCard>
        </motion.div>

      </div>
      <div className="IMPORTpagination">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Prospect;
