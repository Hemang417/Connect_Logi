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
import DatePicker from "react-datepicker";
import Calendar from "src/components/Calendar";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import "../css/sales.css";
import { getYear, getMonth } from "date-fns";

import refreshIcon from "../../../importIcons/refresh.png";
import Pagination from "src/layout/Pagination";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DownlodBtn from "src/views/buttons/buttons/DownlodBtn";
import API_BASE_URL from "src/config/config";

function NewEnquiry() {
  const navigate = useNavigate();
  const [enquiryData, setEnquiryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredQuery, setFilteredQuery] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [dateRangeOption, setDateRangeOption] = useState("");

  const [searchReferenceNo, setSearchReferenceNo] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchContactPerson, setSearchContactPerson] = useState("");
  const [searchEnquiryFor, setSearchEnquiryFor] = useState("");
  const [selectSource, setSelectSource] = useState("");
  const [selectClientType, setSelectClientType] = useState("");
  const [selectEnquiryFor, setSelectEnquiryFor] = useState("");

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getenquirydata`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
        },
      });
      setEnquiryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (enquiryData.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < enquiryData.length - 1 ? prevIndex + 1 : prevIndex
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
  // }, [selectedRowIndex, enquiryData, filteredQuery]);

  const handleRowDoubleClick = (row) => {
    if (row) {
      localStorage.setItem("onEdit", true);
      localStorage.setItem("enquiryid", row.id);
      navigate("/NewEnquiryCreate");
    }
  };

  const refreshbutton = () => {
    try {
      toast.success("Data Refreshed");
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredQuery.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQuery.length / itemsPerPage);

  const genQueryMap = new Map(
    enquiryData.map((genQuery) => [genQuery.referenceNo, genQuery])
  );
  const handleSourceChange = (source) => {
    setSelectClientType(source);
    setCurrentPage(1);
  };
  const handleEnquirySearch = (enq) => {
    setSelectEnquiryFor(enq);
    setCurrentPage(1);
  };

  const handleprospectDelete = async (id) => {
    // console.log("Deleting prospect with ID:", id);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/deleteenquiry?id=${id}`
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

  async function handleEdit(id) {
    // const thatdata = debitDetails[index]
    // localStorage.setItem("queryDate",thatdata.date)
    localStorage.setItem("onEdit", true);
    localStorage.setItem("enquiryid", id);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  useEffect(() => {
    const newFilteredQuery = enquiryData
      .filter((query) => {
        const queryDate = moment(query.currentDate);
        const selectedDateMatch =
          (!startDate && !endDate) ||
          (startDate &&
            endDate &&
            queryDate.isBetween(startDate, endDate, null, "[]"));
        const enquiryForMatch =
          !selectEnquiryFor ||
          selectEnquiryFor === "All" ||
          (Array.isArray(query.enquiryFor)
            ? query.enquiryFor.some((enq) =>
                enq.toLowerCase().includes(selectEnquiryFor.toLowerCase())
              )
            : query.enquiryFor?.toLowerCase() ===
              selectEnquiryFor.toLowerCase());
        return (
          selectedDateMatch &&
          (!searchReferenceNo ||
            query.referenceNo
              .toLowerCase()
              .includes(searchReferenceNo.toLowerCase())) &&
          (!searchCustomerName ||
            query.companyname
              .toLowerCase()
              .includes(searchCustomerName.toLowerCase())) &&
          (!searchEnquiryFor || // Add this condition for Enquiry For
            (Array.isArray(query.enquiryFor) &&
              query.enquiryFor.some((eq) =>
                eq.toLowerCase().includes(searchEnquiryFor.toLowerCase())
              ))) &&
          (!selectClientType ||
            selectClientType === "All" ||
            query.clientType === selectClientType) &&
            enquiryForMatch
        );
      })
      .sort((a, b) => moment(b.currentDate).diff(moment(a.currentDate)));

    setFilteredQuery(newFilteredQuery);
    setCurrentPage(1); // reset pagination when filter changes
  }, [
    enquiryData,
    startDate,
    endDate,
    searchReferenceNo,
    searchCustomerName,
    searchContactPerson,
    searchEnquiryFor,
    selectEnquiryFor,
    selectClientType,
  ]);
  return (
    <div className="IMPORTPaginationAlignment">
      <div>
        <CCardBody className="button-div">
          <div className="createjob-button ">
            <Link
              to={"/NewEnquiryCreate"}
              onClick={localStorage.removeItem("onEdit")}
            >
              <AddBtn />
            </Link>
            {/* </CPopover> */}
          </div>
          {/* <div className='createjob-button'>
              <CButton color="primary" type="submit">
                <img src='../../importIcons/delete.png' />
              </CButton>
            </div> */}
          <div className="refreshjob-button">
            <Link type="submit">
              <RefreshBtn />
            </Link>
          </div>
          <div className="downloadjob-button">
            <Link type="button">
              <DownlodBtn />
              <span className="visually-hidden">Download file</span>
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
                    <Calendar onDateSelect={handleDateSelect} />
                </div>
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
                  <label
                    htmlFor="Customer Name"
                    className="prospect-label-width"
                  >
                    Customer Name :
                  </label>
                  <input
                    type="text"
                    className="text-field-4"
                    onChange={handleInputChange(setSearchCustomerName)}
                  />
                </div>

                <div className="grid-container-sales-1 ">
                  <label className="prospect-label-width">Client Type :</label>
                  <select
                    onChange={(e) => handleSourceChange(e.target.value)}
                    value={selectClientType || ""}
                  >
                    {/* <option>
                    {selectSource ? selectSource:"All"}
                    </option> */}
                    <option value="">All</option>
                    <option value="new">New</option>
                    <option value="existing">Existing</option>
                  </select>{" "}
                </div>
                <div className="grid-container-sales-jobnum">
                  <label className="prospect-label-width">Enquiry For :</label>
                  <select
                    value={selectEnquiryFor}
                    onChange={(e) => handleEnquirySearch(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Import Clearance">Import Clearance</option>
                    <option value="Export Clearance">Export Clearance</option>
                    <option value="Freight Booking">Freight Booking</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Exim Consultancy">Exim Consultancy</option>
                  </select>
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
                    <th scope="col" className="row-font  ">
                      Date
                    </th>
                    <th scope="col" className="row-font  ">
                      Reference No.
                    </th>
                    <th scope="col" className="row-font  ">
                      Customer Name
                    </th>
                    <th scope="col" className="row-font  ">
                      Contact Person
                    </th>
                    <th scope="col" className="row-font  ">
                      Client Type
                    </th>

                    <th scope="col" className="row-font  ">
                      Phone No.
                    </th>
                    <th scope="col" className="row-font  ">
                      Email
                    </th>
                    <th scope="col" className="row-font  ">
                      Enquiry For
                    </th>
                    <th scope="col" className="row-font  "></th>
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
                        to={"/NewEnquiryCreate"}
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
                          {moment(item.enquirycreationdate).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td className="td-sales-ref">{item.referenceNo}</td>
                        <td className="td-sales-ref">{item.companyname}</td>
                        <td className="td-sales-ref">{item.contactPerson}</td>
                        <td className="td-sales-ref">{item.clientType}</td>
                        <td className="td-sales-ref">{item.phoneNo}</td>
                        <td className="td-sales-ref">{item.emailId}</td>
                        <td className="td-sales-ref">
                          {/* {item.enquiryFor
                        ? item.enquiryFor.map((name, index) => (
                            <span key={index}>
                              <svg
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
                              </svg>

                              {name}
                              {index < item.enquiryFor.length - 1 && (
                                <br />
                              )}
                            </span>
                          ))
                        : "N/A"} */}
                          {item.enquiryFor && item.enquiryFor.length > 0
                            ? item.enquiryFor.join(", ")
                            : "N/A"}
                        </td>
                        <td className=" td-sales-ref ">
                          <button
                            className="invisible-btn-style  delete-hover-color"
                            onClick={() => handleprospectDelete(item.id)}
                          >
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

export default NewEnquiry;
