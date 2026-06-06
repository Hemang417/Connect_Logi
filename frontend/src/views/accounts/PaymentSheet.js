import React, { useEffect, useState, useRef } from "react";
import {
  CTableDataCell,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCol,
  CCard,
  CForm,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNav,
  CNavItem,
  CPopover,
  CNavLink,
  CRow,
} from "@coreui/react";
import "../../css/styles.css";
import Credit from "./Innerpages/CreditCreate";
import Debit from "./Innerpages/DebitCreate";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import refreshIcon from "../../importIcons/refresh.png";
import Pagination from "src/layout/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import API_BASE_URL from "src/config/config";

// Helper function to generate a range of years
const range = (start, end, step = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

const PaymentSheet = () => {
  const [visible, setVisible] = useState(false);
  const [isshown, setIsShown] = useState("credit");
  const [debitDetails, setDebitDetails] = useState([]);

  const [selectedMode, setselectedMode] = useState("");

  const [selectedDropdown, setselectedDropdown] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowIndex2, setSelectedRowIndex2] = useState(null);

  const [blTypeNum, setBlTypeNum] = useState("");
  const [PayeeDetails, setPayeeDetails] = useState("");
  const [TypeOfExpenses, setTypeOfExpenses] = useState("");
  const [JobNo, setJobNo] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [startDate, setStartDate] = useState(null);
  // const [startDate, setStartDate] = useState(new Date());
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




  
  // const [endDate, setEndDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [bankDetails, setBankDetails] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [dateRangeOption, setDateRangeOption] = useState("");

  const datePickerRef = useRef();

  const handleDateRangeSelection = (option) => {
    const today = moment();
    const fiscalYearStart = moment(today).startOf("year").add(3, "months");

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
    // if (datePickerRefStart.current) datePickerRefStart.current.setFocus();
    // if (datePickerRefEnd.current) datePickerRefEnd.current.setFocus();
  };

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDateRangeOption("");
  };

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getbankdetails`,
          {
            params: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        const formattedData = response.data.map((bank) => ({
          value: bank.bankname,
          label: bank.bankname,
        }));
        setBankDetails(formattedData);
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };
    fetchBankDetails();
  }, []);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
    getDebitDetails();
  }, [navigate]);

  const getDebitDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getdebitdetails`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setDebitDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDebitDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteDebit`, {
        data: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          debitid: id,
        },
      });

      if (response.status === 200) {
        toast.success("Debit entry deleted successfully.");
        // Refresh the debit details to reflect the deletion
        getDebitDetails();
      }
    } catch (error) {
      console.error("Error deleting debit entry:", error);
      toast.error("Failed to delete debit entry.");
    }
  };
  const refreshData = async () => {
    try {
      await getDebitDetails();
      toast.success("Data Refreshed");
    } catch (error) {
      console.log("fail to refresh", error);
      toast.error("Fail To Refresh");
    }
  };

  const formattedDates = debitDetails.map((debit) => {
    const dateString = debit.date;
    const jsDate = moment.utc(dateString).local().format("DD-MM-YYYY");
    return jsDate;
  });
  // const handledeleteOpen = (e, index) => {
  //   e.preventDefault();
  //   setSelectedRowIndex(index);
  //   setIsModalOpen(true);
  // };
  // const handleModalClose = () => {
  //   setRemark(" ");
  //   setIsModalOpen(false);
  // };
  async function handleEdit(id) {
    // const thatdata = debitDetails[index]
    // localStorage.setItem("queryDate",thatdata.date)
    localStorage.setItem("onEdit", true);
    localStorage.setItem("debitid", id);
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDetails);

    // List of fields to focus on for width adjustment
    const fields = [
      "id",
      "date",
      "bankname",
      "typeofexpense",
      "paymentdetail",
      "taxamount",
      "totalinvoiceamount",
      "gstamount",
      "tdsamount",
      "netpaymentamount",
      "utrnumber",
      "jobnumber",
      "customername",
      "remarks",
      "orgname",
      "orgcode",
      "branchname",
      "branchcode",
    ];

    // Get the maximum width for each specified column
    const colWidths = {};
    debitDetails.forEach((row) => {
      fields.forEach((field) => {
        const cellValue = row[field] !== undefined ? row[field].toString() : "";
        const cellLength = cellValue.length;

        // Save max length for the current field
        if (!colWidths[field] || cellLength > colWidths[field]) {
          colWidths[field] = cellLength;
        }
      });
    });

    // Adjust the column widths
    worksheet["!cols"] = fields.map((field) => ({
      wpx: colWidths[field] ? colWidths[field] * 10 : 50, // Default width if no content
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Details");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "PaymentDetails.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClickOutSide = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  const handleDropdownClick = (opt) => {
    if (opt === "credit") {
      navigate("/PaymentSheetCreditCreate");
    } else if (opt === "debit") {
      navigate("/PaymentSheetDebitCreate");
      localStorage.removeItem("onEdit");
      // localStorage.setItem("onCreate",true);
    }
    setVisible(false);
  };

  const genQueryMap = new Map(
    debitDetails.map((genQuery) => [genQuery.jobnumber, genQuery])
  );

  const filteredDetails = debitDetails
    .filter((detail) => {
      const lowerCaseBlTypeNum = blTypeNum.toLowerCase();
      const lowerCaseJobNumber = detail.jobnumber?.toLowerCase() || "";
      const lowerCasePaymentDetails = detail.paymentdetail?.toLowerCase() || "";
      const lowerCaseCustomerName = detail.customername?.toLowerCase() || "";
      const lowerCaseBankName = detail.bankname?.toLowerCase() || "";

      // Convert detail date for filtering
      const detailDate = moment(detail.date, "YYYY-MM-DD").toDate();

      // Check if the detail date matches the selected range or single date
      const isDateMatch =
        (!startDate || moment(detailDate).isSameOrAfter(startDate, "day")) &&
        (!endDate || moment(detailDate).isSameOrBefore(endDate, "day"));

      // Match filters based on dropdown selection
      const isDropdownMatch =
        !selectedDropdown ||
        (selectedDropdown === "Types Of Expenses" &&
          (!blTypeNum ||
            detail.typeofexpense
              ?.toLowerCase()
              .includes(lowerCaseBlTypeNum))) ||
        (selectedDropdown === "Job Number" &&
          (!blTypeNum || lowerCaseJobNumber.includes(lowerCaseBlTypeNum))) ||
        (selectedDropdown === "Payment Details" &&
          (!blTypeNum ||
            lowerCasePaymentDetails.includes(lowerCaseBlTypeNum))) ||
        (selectedDropdown === "Customer Name" &&
          (!blTypeNum || lowerCaseCustomerName.includes(lowerCaseBlTypeNum)));

      // Check if bank and mode filters match
      const isBankMatch =
        !selectedBank || lowerCaseBankName === selectedBank.toLowerCase();
      const isModeMatch = !selectedMode || detail.debitDetails === selectedMode;

      return isModeMatch && isDateMatch && isDropdownMatch && isBankMatch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by descending date

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filtering changes
  }, [selectedMode, debitDetails, selectedDropdown, blTypeNum, selectedBank]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDetails.slice(indexOfFirstItem, indexOfLastItem);

  // currentItems = currentItems.reverse();
  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <CCardBody className="button-div">
        <div
          className="createjob-button"
          onClick={() => setVisible(!visible)}
          ref={dropdownRef}
        >
          <svg
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
              fill="#1C274C"
            />
          </svg>

          {/* <CDropdown visible={visible}>
            <CDropdownToggle  caret={false} />
            <CDropdownMenu>
              <CDropdownItem onClick={() => handleDropdownClick('credit')}>Credit</CDropdownItem>
              <CDropdownItem onClick={() => handleDropdownClick('debit')}>Debit</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          {visible && (
            <div className="dropdownOptions">
              <div
                className="dropdownItem"
                onClick={() => handleDropdownClick("credit")}
              >
                Credit
              </div>
              <div
                className="dropdownItem"
                onClick={() => handleDropdownClick("debit")}
              >
                Debit
              </div>
            </div>
          )}
        </div>

        <div className="refreshjob-button">
          <CButton className="btn btn-dark" type="submit" onClick={refreshData}>
            <img src={refreshIcon} width="12px" height="12px" />
          </CButton>
        </div>

        <div className="downloadjob-button">
          <CButton
            onClick={exportToExcel}
            className="btn btn-primary"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="icon"
              role="img"
              aria-hidden="true"
            >
              <polygon
                fill="var(--ci-primary-color, currentColor)"
                points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744"
                className="ci-primary"
              ></polygon>
              <path
                fill="var(--ci-primary-color, currentColor)"
                d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z"
                className="ci-primary"
              ></path>
            </svg>
            <span className="visually-hidden">Download file</span>
          </CButton>
       
        </div>
      </CCardBody>

      <CCol xs={12}>
        <CCard className="mb-2 accounts-container-div">
          <div className="payesheet-search-field">
            <div className="grid-container-account-1">
            <select
                className="form-select-accounts"
                value={selectedDropdown}
                onChange={(e) => setselectedDropdown(e.target.value)}
              >
                <option value="">All</option>
                <option value="Payment Details">Payment Details</option>
                <option value="Types Of Expenses">Types Of Expenses</option>
                <option value="Job Number">Job Number</option>
                <option value="Customer Name">Customer Name</option>
              </select>
              <input
                type="text"
                placeholder=""
                className="payeesheet-text-field-4"
                onChange={(e) => setBlTypeNum(e.target.value)}
                disabled={!selectedDropdown}
              />
            </div>

            <div className="grid-container-account-1">
              <label htmlFor="Mode" className="imp-exp-text-field-3">
                Bank Name :
              </label>
            <select
                className="form-select-accounts"

            value={selectedBank}
            onChange={(e)=>setSelectedBank(e.target.value)}
            >
              <option value="">All</option>
              {
                bankDetails.map((bank,index)=>(
                  <option
                  value={bank.label}
                  key={index}
                  >
                    {bank.label}
                  </option>
                ))
              }
            </select>
            </div>
          </div>
          <div className="custom-date-field">
            <div>
              <label className="payesheet-date">Start Date : </label>
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 10px",
                    }}
                  >
                    <button
                      className="date-picker-button"
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      style={{ cursor: "pointer" }}
                    >
                      {"<"}
                    </button>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <select
                        className="date-picker-dropdown"
                        value={getYear(date)}
                        onChange={({ target: { value } }) =>
                          changeYear(Number(value))
                        }
                        style={{ marginRight: 10 }}
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        className="date-picker-dropdown"
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="date-picker-button"
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      style={{ cursor: "pointer" }}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="custom-date-picker"
                placeholderText="Select a date"
              />
            </div>
            <div>
              <label className="payesheet-date">End Date : </label>
              <DatePicker
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px 10px",
                    }}
                  >
                    <button
                      className="date-picker-button"
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      style={{ cursor: "pointer" }}
                    >
                      {"<"}
                    </button>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <select
                        className="date-picker-dropdown"
                        value={getYear(date)}
                        onChange={({ target: { value } }) =>
                          changeYear(Number(value))
                        }
                        style={{ marginRight: 10 }}
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select
                        className="date-picker-dropdown"
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                          changeMonth(months.indexOf(value))
                        }
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="date-picker-button"
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      style={{ cursor: "pointer" }}
                    >
                      {">"}
                    </button>
                  </div>
                )}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="custom-date-picker"
                placeholderText="Select a date"
              />
            </div>

            <div style={{ cursor: "pointer" }} onClick={clearDates}>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                aria-labelledby="cancelIconTitle"
                stroke="#000000"
                strokeWidth="1"
                strokeLinecap="square"
                strokeLinejoin="miter"
                fill="none"
                color="#000000"
              >
                <title id="cancelIconTitle">Cancel</title>
                <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339"></path>
                <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z"></path>
              </svg>
            </div>

            <div
              className={`date-range-highlight ${
                startDate && endDate ? "animate" : ""
              }`}
            >
              <select
                className="custom-date-dropdown"
                onChange={(e) => handleDateRangeSelection(e.target.value)}
                value={dateRangeOption}
              >
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisCalendarYear">This Calendar Year</option>
                <option value="lastCalendarYear">Last Calendar Year</option>
                <option value="thisFiscalYear">This Fiscal Year</option>
                <option value="lastFiscalYear">Last Fiscal Year</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          {/* <CCardBody>
            {" "}
            <input
              type="text"
              placeholder="Search Client"
              className="search-accounts"
              // value={searchValue}
              // onChange={handleInputChange}
              // onKeyDown={handleKeyPress}
            />
          </CCardBody> */}
          {/* <div className="search-button">
            <CButton
              color="primary"
              type="submit"
              className="searchbtn-icon"
              // onClick={handleSearch}
            >
              <svg
                width="24px"
                height="21px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </CButton>
          </div> */}
        </CCard>
      </CCol>

      <CForm className="form-import">
        <CTable hover borderless striped className="table-import">
          <CTableHead className="head-import">
            <CTableRow color="dark">
              <CTableHeaderCell
                scope="col"
                className="row-font"
              ></CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                className="row-font"
              ></CTableHeaderCell>

              <CTableHeaderCell scope="col" className="row-font">
                Date
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Payment Details
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Type of Expense
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Taxable Amount
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                GST Amount
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Total Invoice Amount
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                TDS Deduction Amount
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Net Payment Amount
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Job No.
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Customer Name
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                UTR Details
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Remarks
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Bank Name
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {/* {currentItems &&
                currentItems
                  .slice()
                  .reverse()
                  .filter((job) => {
                    const matchingGenJob = allgenjobs.find(
                      (genJob) => genJob.jobnumber === job.jobnumber
                    );
                    return (
                      ((!selectedMode || job.transportmode === selectedMode) &&
                        (!exportername ||
                          (matchingGenJob &&
                            matchingGenJob.exportername &&
                            matchingGenJob.exportername
                              .toLowerCase()
                              .includes(exportername.toLowerCase()))) &&
                        (!selectedDropdown ||
                          (selectedDropdown === "HBL/HAWB" &&
                            job.bltype === "HBL/HAWB" &&
                            (!blTypeNum ||
                              job.bltypenum
                                .toLowerCase()
                                .includes(blTypeNum.toLowerCase()))) ||
                          (selectedDropdown === "MBL/MAWB" &&
                            job.bltype === "MBL/MAWB" &&
                            (!blTypeNum ||
                              job.bltypenum
                                .toLowerCase()
                                .includes(blTypeNum.toLowerCase()))))) ||
                      (selectedDropdown === "JobNumber" &&
                        (!blTypeNum ||
                          job.jobnumber
                            .toLowerCase()
                            .includes(blTypeNum.toLowerCase())))
                    );
                  })
                  .map((debits, index) => {
                    const matchdetails = debitDetails.find(
                      (details) => details.jobnumber === debits.jobnumber
                    );

                    return ( */}
            {currentItems.map((debits, index) => {
              const matchingdebitdetails = debitDetails.find(
                (debitdetails) => debitdetails.jobnumber === debits.jobnumber
              );

              return (
                <CTableRow key={debits.id}>
                  <th
                    scope="row"
                    className="font-small text-gray-900 whitespace-nowrapark:text d-white"
                  >
                    <Link
                      onClick={() => handleEdit(debits.id)}
                      target="_blank"
                      to={"/PaymentSheetDebit"}
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
                  </th>
                  <th
                    scope="row"
                    className="font-small text-gray-900 whitespace-nowrapark:text d-white"
                  >
                    <Link
                      style={{
                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                        margin: "0px 10px",
                        // paddingBottom:"5px"
                      }}
                      onClick={() => handleDebitDelete(debits.id)}
                    >
                      <svg
                        fill="#000000"
                        height="22px"
                        width="22px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 493.456 493.456"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <g>
                              <path d="M246.73,0C110.682,0,0.002,110.684,0.002,246.744c0,136.032,110.68,246.712,246.728,246.712 s246.724-110.68,246.724-246.712C493.454,110.684,382.778,0,246.73,0z M360.258,348.776l-11.112,11.12 c-2.808,2.836-7.82,2.836-10.644,0l-88.68-88.672c-0.728-0.74-1.704-1.136-2.732-1.136c-1.028,0-2.004,0.4-2.732,1.136 L155.682,359.9c-2.82,2.836-7.828,2.836-10.648,0l-11.108-11.12c-1.412-1.404-2.196-3.304-2.196-5.3 c0-2.02,0.784-3.916,2.196-5.344l88.68-88.672c1.508-1.512,1.508-3.948,0-5.452l-88.68-88.68c-1.412-1.416-2.196-3.308-2.196-5.32 c0-2.02,0.784-3.916,2.196-5.328l11.108-11.108c2.82-2.82,7.828-2.82,10.648,0l88.68,88.672c1.444,1.444,4.016,1.444,5.46,0 l88.676-88.676c2.824-2.824,7.836-2.824,10.644,0l11.112,11.112c2.928,2.924,2.928,7.716,0,10.648l-88.692,88.676 c-1.504,1.504-1.504,3.94,0,5.452l88.696,88.672C363.186,341.072,363.186,345.844,360.258,348.776z"></path>
                            </g>
                          </g>
                        </g> 
                      </svg>
                    </Link>
                  </th>{" "}
                  <CTableDataCell >
                    {moment(debits.date).format("DD-MM-YYYY")}
                  </CTableDataCell>
                  <CTableDataCell >{debits.paymentdetail}</CTableDataCell>
                  <CTableDataCell >{debits.typeofexpense}</CTableDataCell>
                  <CTableDataCell >{debits.taxamount}</CTableDataCell>
                  <CTableDataCell >{debits.gstamount}</CTableDataCell>
                  <CTableDataCell >{debits.totalinvoiceamount}</CTableDataCell>
                  <CTableDataCell >{debits.tdsamount}</CTableDataCell>
                  <CTableDataCell >{debits.netpaymentamount}</CTableDataCell>
                  <CTableDataCell >{debits.jobnumber}</CTableDataCell>
                  <CTableDataCell >{debits.customername}</CTableDataCell>
                  <CTableDataCell >{debits.utrnumber}</CTableDataCell>
                  <CTableDataCell >{debits.remarks}</CTableDataCell>
                  <CTableDataCell >{debits.bankname}</CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </CForm>

      {/* <CModal
        visible={visible}
        onClose={() => setVisible(true)}
        aria-labelledby="LiveDemoExampleLabel"
        size="xl"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">
            Make Payment Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="tabs" className="nav-link-text userlist-cnav-cusros">
            <CNavItem>
              <CNavLink
                className={`nav-link ${isshown === "credit" ? "active" : ""}`}
                onClick={() => setIsShown("credit")}
              >
                Credit
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                className={`nav-link ${isshown === "debit" ? "active" : ""}`}
                onClick={() => setIsShown("debit")}
              >
                Debit
              </CNavLink>
            </CNavItem>
          </CNav>
          {isshown === "credit" && <Credit />}
          {isshown === "debit" && <Debit />}
        </CModalBody>
        <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                </CModalFooter>
      </CModal> */}

      <div className="IMPORTpagination" style={{position:"fixed" , bottom:"0px" , right:"26vw"}}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default PaymentSheet;
