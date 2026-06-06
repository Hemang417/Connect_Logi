import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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
import "../../../css/styles.css";
import "../css/accounts-styles.css";

import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import Pagination from "src/layout/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getYear, getMonth } from "date-fns";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DownlodBtn from "src/views/buttons/buttons/DownlodBtn";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
import Calendar from "src/components/Calendar";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";

const Debit = () => {
  const [visible, setVisible] = useState(false);
  const [isshown, setIsShown] = useState("debit");
  const [debitDetails, setDebitDetails] = useState([]);
  const [filteredDebit, setFilteredDebit] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDropdown, setselectedDropdown] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowIndex2, setSelectedRowIndex2] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [blTypeNum, setBlTypeNum] = useState("");
  const [PayeeDetails, setPayeeDetails] = useState("");
  const [TypeOfExpenses, setTypeOfExpenses] = useState("");
  const [jobNo, setJobNo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [bankDetails, setBankDetails] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [totalDebit, setTotalDebit] = useState(0);
  const [dateRangeOption, setDateRangeOption] = useState("");
  const [useDownload, setUseDownload] = useState(false);
  const [useDelete, setUseDelete] = useState(false);
  const [useAdd, setUseAdd] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [remark, setRemark] = useState("");
  const [debitToDelete, setDebitToDelete] = useState("");
  const checkUsername = localStorage.getItem("username");

  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];

  const datePickerRef = useRef();
  const addBtn = "Debit";
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const handleDateSelect = (selectedStartDate, selectedEndDate) => {
    setSelectedStartDate(selectedStartDate);
    setSelectedEndDate(selectedEndDate);
    // Add any additional logic for filtering or processing
  };

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorgs`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchcontrols = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/fetchaccesscontrols`,
        {
          params: {
            username: localStorage.getItem("username"),
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
            type: "ACCOUNTS",
          },
        }
      );

      const controlSet = new Set(data.map((item) => item.control));

      setUseDownload(controlSet.has("download-debit"));
      setUseDelete(controlSet.has("delete-debit"));
      setUseAdd(controlSet.has("add-debit"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getbankdetails`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setBankDetails(response.data);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };
  useEffect(() => {
    fetchBankDetails();
    fetchOrganizations();
    fetchcontrols();
  }, []);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
    getDebitDetails();
  }, [navigate]);

  const uniqueOrganizations = organizations.filter(
    (organization, index, self) =>
      index === self.findIndex((e) => e.clientname === organization.clientname)
  );

  const organizationOptions = [
    { label: "All Clients", value: "" }, // Add first option
    ...uniqueOrganizations.map((organization) => ({
      value: organization.clientname,
      label: organization.clientname,
    })),
  ];

  const uniqueBanks = bankDetails.filter(
    (bank, index, self) =>
      index === self.findIndex((e) => e.bankname === bank.bankname)
  );
  const bankOptions = [
    { label: "All Banks", value: "" },
    ...uniqueBanks.map((bank) => ({
      value: bank.bankname,
      label: bank.bankname,
    })),
  ];

  const expensetype = [
    { label: "All Expenses", value: "" },
    ...Array.from(
      new Set(debitDetails.map((expense) => expense.typeofexpense))
    ).map((expense) => ({
      value: expense,
      label: expense,
    })),
  ];

  const paymentdetails = [
    { label: "All Payments", value: "" },
    ...Array.from(
      new Set(debitDetails.map((payment) => payment.paymentdetail))
    ).map((payment) => ({
      value: payment,
      label: payment,
    })),
  ];

  const parseData = (data) => {
    return typeof data === "string" ? JSON.parse(data) : data;
  };

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
  const handleDebitDelete = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/deleteDebit`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        deletedby: localStorage.getItem("username"),
        debitid: debitToDelete.id,
        deletedRemark: remark.remark,
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
      await fetchcontrols();
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

  async function handleEdit(id) {
    localStorage.setItem("onEdit", true);
    localStorage.setItem("debitid", id);
    navigate("/PaymentSheetDebitCreate");
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDetails);

    // List of fields to focus on for width adjustment
    const fields = [
      "id",
      "referenceno",
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

  const genQueryMap = new Map(
    debitDetails.map((genQuery) => [genQuery.jobnumber, genQuery])
  );

  useEffect(() => {
    const filtered = debitDetails.filter((debit) => {
      const debitDate = moment(debit.date);
      const selectedStart = selectedStartDate
        ? moment(selectedStartDate).startOf("day")
        : null;
      const selectedEnd = selectedEndDate
        ? moment(selectedEndDate).endOf("day")
        : null;

      // Extract the full job number and convert to lowercase
      const jobNumberFull = debit.jobnumber;
      const debitJobNo = jobNumberFull.toLowerCase();
      // Split the job number by "/" assuming the format: Mode/City/Type/...
      const parts = debitJobNo.split("/");
      const jobMode = parts[0] ? parts[0].trim() : ""; // e.g., "a" for Air
      const jobType = parts[2] ? parts[2].trim() : ""; // e.g., "i" for Import

      // Existing job number search filter using your logic:
      const jobNoFilter =
        !jobNo ||
        (jobNo.length >= 6 && debitJobNo.includes(jobNo.toLowerCase())) ||
        (jobNo.length <= 2 &&
          debitJobNo.split("/").pop().includes(jobNo.toLowerCase())) ||
        (jobNo.includes("-") && debitJobNo.includes(jobNo.toLowerCase()));

      // New Type of Job filter:
      const typeFilter =
        !selectedType ||
        selectedType === "" ||
        jobType === selectedType.toLowerCase();

      // New Mode filter
      const modeFilter =
        !selectedMode ||
        selectedMode === "" ||
        jobMode === selectedMode.toLowerCase();

      // Reference number filter
      const referenceFilter =
        !referenceNo ||
        (debit.referenceno &&
          debit.referenceno.toLowerCase().includes(referenceNo.toLowerCase()));

      return (
        (!selectedStart ||
          !selectedEnd ||
          debitDate.isBetween(selectedStart, selectedEnd, null, "[]")) &&
        (!selectedBank || debit.bankname === selectedBank) &&
        (!paymentDetails ||
          debit.paymentdetail
            ?.toLowerCase()
            .includes(paymentDetails.toLowerCase())) &&
        (!selectedExpenseType ||
          debit.typeofexpense
            ?.toLowerCase()
            .includes(selectedExpenseType.toLowerCase())) &&
        (!selectedOrganization ||
          debit.customername === selectedOrganization) &&
        jobNoFilter &&
        typeFilter &&
        modeFilter &&
        referenceFilter // Add this condition
      );
    });

    const total = filtered.reduce(
      (sum, debit) => sum + Number(debit.netpaymentamount),
      0
    );
    setTotalDebit(total);

    setFilteredDebit(filtered);
    setCurrentPage(1);
  }, [
    debitDetails,
    selectedStartDate,
    selectedEndDate,
    selectedBank,
    referenceNo,
    selectedExpenseType,
    selectedOrganization,
    jobNo,
    selectedType,
    selectedMode,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDebit.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDebit.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (currentItems.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < currentItems.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     } else if (e.key === "Enter" && selectedRowIndex !== null) {
  //       const selectedDebit = currentItems[selectedRowIndex];
  //       if (selectedDebit) {
  //         handleEdit(selectedDebit.id); // Pass the specific ID directly
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, currentItems]);

  return (
    <div className="IMPORTPaginationAlignment" style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
        animate={{ opacity: 1, y: 0 }} // Becomes fully visible
        exit={{ opacity: 0, y: -20 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        <div>
          <CCardBody className="button-div">
            <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className="backButton"
              style={{ marginTop: "-16px" }}
            >
              <ArrowCircleLeft />
            </div>
            <div className="refreshjob-button ">
              <Link
                type="submit"
                onClick={refreshData}
                className="link-btn"
                style={{ marginLeft: "12px" }}
              >
                <RefreshBtn />
              </Link>
            </div>
            <div className="page-title">
              <h4>Debit Sheets</h4>
            </div>
            {(checkUsername === "admin" || useAdd) && (
              <div className="createjob-button">
                <Link
                  to={"/PaymentSheetDebitCreate"}
                  target="_blank"
                  className="link-btn"
                >
                  <AddBtn addBtn={addBtn} />
                </Link>
              </div>
            )}
            {(checkUsername === "admin" || useDownload) && (
              <div className="downloadjob-button">
                <Link onClick={exportToExcel} className="link-btn">
                  <DownlodBtn />
                </Link>
              </div>
            )}
          </CCardBody>

          <CCol xs={12}>
            <div className="mx-0 accounts-container-div">
              <CCardBody className="payesheet-search-field mx-0">
                <div
                  className="date-picker-wrapper-account"
                  style={{
                    // display: "flex",
                    alignItems: "center",
                    gap: "0px",
                    padding: "0px",
                    marginLeft: "62px",
                    width: "248px",
                  }}
                >
                  <label
                    className="account-label-width"
                    id="date"
                    style={{
                      bottom: "4px",
                      width: "110px",
                      // marginLeft: "0px",
                    }}
                  >
                    Date :{" "}
                  </label>
                  <div style={{ position: "relative" }}>
                    <Calendar onDateSelect={handleDateSelect} />
                  </div>
                </div>
                <div className="grid-container-account-1">
                  <div
                    className="grid-container-filter"
                    // style={{ marginBottom: "2px" }}
                  >
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{
                        marginRight: "0",
                        marginBottom: "0px",
                        width: "150px",
                        // display: "flex",
                      }}
                    >
                      <label className="account-label-width">
                        Client Name :{" "}
                      </label>
                      <div style={{ display: "flex" }}>
                        <NewDropdownInput
                          type={"type1"}
                          options={organizationOptions}
                          placeholder={"All Clients"}
                          selectedValue={selectedOrganization}
                          setSelectedValue={setSelectedOrganization}
                          width={"150px"}
                        />
                      </div>
                    </div>
                    <div className="grid-container-imp-exp-jobnum">
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Job No. :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setJobNo}
                        selectedValue={jobNo}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      // style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "110px" }}
                      >
                        Type of Job :
                      </label>

                      <NewDropdownInput
                        type={"type1"}
                        options={[
                          { value: "", label: "Both" },
                          { value: "I", label: "Import" },
                          { value: "E", label: "Export" },
                        ]}
                        placeholder={"Both"}
                        selectedValue={selectedType}
                        setSelectedValue={setSelectedType}
                        width={"150px"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      // style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "110px" }}
                      >
                        Mode of Job:
                      </label>

                      <NewDropdownInput
                        type={"type1"}
                        options={[
                          { value: "", label: "Both" },
                          { value: "A", label: "Air" },
                          { value: "S", label: "Sea" },
                        ]}
                        placeholder={"Both"}
                        selectedValue={selectedMode}
                        setSelectedValue={setSelectedMode}
                        width={"150px"}
                      />
                    </div>
                  </div>
                  <div
                    className="grid-container-filter"
                    // style={{ marginBottom: "2px" }}
                  >
                    <div className="grid-container-imp-exp-jobnum">
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Reference No. :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setReferenceNo}
                        selectedValue={referenceNo}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{
                        marginRight: "0",
                        marginBottom: "0px",
                        width: "150px",
                        // display: "flex",
                      }}
                    >
                      <label className="account-label-width">
                        Expense Type :{" "}
                      </label>
                      <div style={{ display: "flex" }}>
                        <NewDropdownInput
                          type={"type1"}
                          options={expensetype}
                          placeholder={"Type of Expenses"}
                          selectedValue={selectedExpenseType}
                          setSelectedValue={setSelectedExpenseType}
                          width={"150px"}
                        />
                      </div>
                    </div>
                    <div className="grid-container-imp-exp-jobnum">
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Bank Name :
                      </label>
                      <NewDropdownInput
                        type={"type1"}
                        options={bankOptions}
                        placeholder={"All Banks"}
                        selectedValue={selectedBank}
                        setSelectedValue={setSelectedBank}
                        width={"150px"}
                      />
                    </div>
                    <div className="grid-container-imp-exp-jobnum">
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Total Net Payment:
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={() => {}}
                        selectedValue={new Intl.NumberFormat("en-IN").format(
                          totalDebit
                        )}
                        placeholder={""}
                        type={"text"}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
              </CCardBody>
            </div>
          </CCol>

          <div className="line"></div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CForm className="form-account">
              <table
                className="border-separate"
                style={{
                  marginTop: "12px",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                  tableLayout: "auto",
                }}
              >
                <thead
                  className="bg-blue-900 text-white"
                  style={{
                    background: "var(--tableHead-bg)",
                    fontSize: "12px",
                    color: " #F6FCFF",
                    fontFamily: "Instrument Sans",
                    fontStyle: "normal",
                    lineHeight: " normal",
                  }}
                >
                  <tr className="head-accounts">
                    <th
                      scope="col"
                      className="row-font px-2 py-2 rounded-lg"
                      style={{ minWidth: "100px" }}
                    >
                      Date
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Reference No.
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Payment Details
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Type of Expense
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Taxable Amount
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      GST Amount
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Total Invoice Amount
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      TDS Deduction Amount
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Net Payment Amount
                    </th>
                    <th
                      scope="col"
                      className="row-font px-2 py-2 rounded-lg"
                      style={{ minWidth: "135px" }}
                    >
                      Job No.
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Customer Name
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      UTR Details
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Remarks
                    </th>
                    <th scope="col" className="row-font px-2 py-2 rounded-lg">
                      Bank Name
                    </th>
                    {/* <th scope="col" className="row-font px-2 py-2 rounded-lg"></th> */}
                    {(checkUsername === "admin" || useDelete) && (
                      <th scope="col" className="row-font px-2 py-2 rounded-lg">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="body-accounts">
                  {currentItems.map((debits, index) => {
                    const matchingdebitdetails = debitDetails.find(
                      (debitdetails) =>
                        debitdetails.jobnumber === debits.jobnumber
                    );
                    const isSelected = selectedRowIndex === index;

                    return (
                      <tr
                        key={debits.id}
                        onDoubleClick={() => handleEdit(debits.id)}
                        onClick={() => setSelectedRowIndex(index)}
                        className={`selected-row ${
                          isSelected ? "primary-selected" : ""
                        }`}
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472" // Dark  even row
                                : "#263A52" // Dark mode odd row
                              : index % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row
                          cursor: "pointer",
                          fontSize: "12px",

                          /* Table Body */
                          fontFamily: "Instrument Sans",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: " normal",
                          letterSpacing: "0.14px",
                        }}
                      >
                        <td
                          className="td-accounts px-2 py-2 rounded-lg"
                          style={{ minWidth: "100px" }}
                        >
                          {moment(debits.date).format("DD-MM-YYYY")}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.referenceno}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.paymentdetail}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.typeofexpense}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {new Intl.NumberFormat("en-IN").format(
                            debits.taxamount
                          )}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {new Intl.NumberFormat("en-IN").format(
                            debits.gstamount
                          )}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {new Intl.NumberFormat("en-IN").format(
                            debits.totalinvoiceamount
                          )}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {new Intl.NumberFormat("en-IN").format(
                            debits.tdsamount
                          )}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {new Intl.NumberFormat("en-IN").format(
                            debits.netpaymentamount
                          )}
                        </td>
                        <td
                          className="td-accounts px-2 py-2 rounded-lg"
                          style={{ minWidth: "135px" }}
                        >
                          {debits.jobnumber}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.customername}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.utrnumber}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.remarks}
                        </td>
                        <td className="td-accounts px-2 py-2 rounded-lg">
                          {debits.bankname}
                        </td>
                        {(checkUsername === "admin" || useDelete) && (
                          <td className="td-accounts px-2 py-2 rounded-lg">
                            <div
                              className="invisible-btn-style  delete-hover-color"
                              onClick={() => {
                                setRemark("");
                                setCurrentPopup("Deletion");
                                setDebitToDelete(debits);
                              }}
                              style={{
                                paddingLeft: "9px",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                              }}
                            >
                              <DeleteBtn fill="var(--page-title)" />
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CForm>
          </div>
        </div>
      </motion.div>
      {currentPopup === "Deletion" && (
        <InputPopup
          title={debitToDelete.referenceno}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={remark}
          setValue={setRemark}
          handleAdd={handleDebitDelete}
          firstButtonText={"Delete"}
          secondButtonText={"Close"}
          width={"450px"}
          selection={"none"}
          top={"50%"}
          left={"50%"}
        />
      )}
      <div
        className="IMPORTpagination"
        style={{
          position: "absolute",
          bottom: "-18px",
          left: "calc(43% - 12px)",
          zIndex: "2",
        }}
      >
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

export default Debit;
