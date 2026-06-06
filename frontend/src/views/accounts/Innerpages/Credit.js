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
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import refreshIcon from "../../../importIcons/refresh.png";
import Pagination from "src/layout/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/accounts-styles.css";
import { getYear, getMonth } from "date-fns";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DownlodBtn from "src/views/buttons/buttons/DownlodBtn";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
import Calendar from "src/components/Calendar";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";

// Helper function to generate a range of years
const range = (start, end, step = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

const Credit = () => {
  const [visible, setVisible] = useState(false);
  const [isshown, setIsShown] = useState("credit");
  const [creditDetails, setCreditDetails] = useState([]);
  const [filteredCredit, setFilteredCredit] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [remark, setRemark] = useState("");
  const [creditToDelete, setCreditToDelete] = useState("");

  const [selectedMode, setSelectedMode] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDropdown, setselectedDropdown] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowIndex2, setSelectedRowIndex2] = useState(null);

  const [blTypeNum, setBlTypeNum] = useState("");
  const [PayeeDetails, setPayeeDetails] = useState("");
  const [TypeOfExpenses, setTypeOfExpenses] = useState("");
  const [jobNo, setJobNo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [bankDetails, setBankDetails] = useState([]);
  const [referenceNo, setReferenceNo] = useState("");
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [totalCredit, setTotalCredit] = useState(0);
  const [useDownload, setUseDownload] = useState(false);
  const [useDelete, setUseDelete] = useState(false);
  const [useAdd, setUseAdd] = useState(false);
  const checkUsername = localStorage.getItem("username");

  const datePickerRef = useRef();
  const addBtn = "Credit";

  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];

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

      setUseDownload(controlSet.has("download-credit"));
      setUseDelete(controlSet.has("delete-credit"));
      setUseAdd(controlSet.has("add-credit"));

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
    fetchcontrols();
    fetchBankDetails();
    fetchOrganizations();
  }, []);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
    getCreditDetails();
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

  const parseData = (data) => {
    return typeof data === "string" ? JSON.parse(data) : data;
  };

  const getCreditDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getallcreditdetails`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setCreditDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const refreshData = async () => {
    try {
      await getCreditDetails();
      await fetchcontrols();
      toast.success("Data Refreshed");
    } catch (error) {
      console.log("fail to refresh", error);
      toast.error("Fail To Refresh");
    }
  };

  const exportToExcel = () => {
    if (!creditDetails || creditDetails.length == 0) {
      alert("No data available in import");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(creditDetails);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Credit Details");
    XLSX.writeFile(wb, "CreditDetails.xlsx");
  };

  async function handleEdit(id) {
    localStorage.setItem("creditid", id);
    localStorage.setItem("onEdit", true);
    navigate("/PaymentSheetCreditCreate");
  }

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

  const getJobNumber = (credit) => {
    try {
      if (credit.onAccountType === "against-job") {
        const details =
          typeof credit.againstJobDetails === "string"
            ? JSON.parse(credit.againstJobDetails)
            : credit.againstJobDetails;
        return details[0]?.jobNo?.label || "";
      } else {
        const details =
          typeof credit.againstBillDetails === "string"
            ? JSON.parse(credit.againstBillDetails)
            : credit.againstBillDetails;
        return details[0]?.jobNoForAgainstBill || "";
      }
    } catch (error) {
      console.error("Error parsing job details", error);
      return "";
    }
  };

  useEffect(() => {
    const filtered = creditDetails.filter((credit) => {
      const creditDate = moment(credit.currentdate);
      const selectedStart = selectedStartDate
        ? moment(selectedStartDate).startOf("day")
        : null;
      const selectedEnd = selectedEndDate
        ? moment(selectedEndDate).endOf("day")
        : null;

      // Extract the full job number and convert to lowercase
      const jobNumberFull = getJobNumber(credit);
      const creditJobNo = jobNumberFull.toLowerCase();
      // Split the job number by "/" assuming the format: Mode/City/Type/...
      const parts = creditJobNo.split("/");
      const jobMode = parts[0] ? parts[0].trim() : ""; // e.g., "a" for Air
      const jobType = parts[2] ? parts[2].trim() : ""; // e.g., "i" for Import

      // Existing job number search filter using your logic:
      const jobNoFilter =
        !jobNo ||
        (jobNo.length >= 6 && creditJobNo.includes(jobNo.toLowerCase())) ||
        (jobNo.length <= 2 &&
          creditJobNo.split("/").pop().includes(jobNo.toLowerCase())) ||
        (jobNo.includes("-") && creditJobNo.includes(jobNo.toLowerCase()));

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

      return (
        (!selectedStart ||
          !selectedEnd ||
          creditDate.isBetween(selectedStart, selectedEnd, null, "[]")) &&
        (!selectedBank || credit.bankAccount === selectedBank) &&
        (!referenceNo ||
          credit.referenceno
            ?.toLowerCase()
            .includes(referenceNo.toLowerCase())) &&
        (!selectedExpenseType ||
          credit.receivedPayementType === selectedExpenseType) &&
        (!selectedOrganization ||
          credit.organizationName === selectedOrganization) &&
        jobNoFilter &&
        typeFilter &&
        modeFilter
      );
    });

    const total = filtered.reduce(
      (sum, credit) => sum + Number(credit.amountReceived),
      0
    );
    setTotalCredit(total);

    setFilteredCredit(filtered);
    setCurrentPage(1);
  }, [
    creditDetails,
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
  const currentItems = filteredCredit.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCredit.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDebitDelete = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/deleteCredit`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        deletedby: localStorage.getItem("username"),
        deletedRemark: remark,
        creditid: creditToDelete.id,
      });

      if (response.status === 200) {
        toast.success("credit entry deleted successfully.");
        getCreditDetails();
      }
    } catch (error) {
      console.error("Error deleting credit entry:", error);
      toast.error("Failed to delete credit entry.");
    }
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
  //       const selectedCredit = currentItems[selectedRowIndex];
  //       if (selectedCredit) {
  //         handleEdit(selectedCredit.id); // Pass the specific ID directly
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
              <h4>Credit Sheets</h4>
            </div>
            {(checkUsername === "admin" || useAdd) && (
              <div
                className="createjob-button"
                onClick={() => localStorage.setItem("onEdit" , "false")}
              >
                <Link
                  to={"/PaymentSheetCreditCreate"}
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
                  <span className="visually-hidden">Download file</span>
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
                          type="type1"
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
                        type="type1"
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
                        type="type1"
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
                          type="type1"
                          options={[
                            { value: "", label: "All Expenses" },
                            { value: "against-bill", label: "Against Bill" },
                            { value: "on-account", label: "On-Account" },
                          ]}
                          placeholder={"Type of Expenses"}
                          selectedValue={selectedExpenseType}
                          setSelectedValue={setSelectedExpenseType}
                          width={"150px"}
                        />
                      </div>
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      // style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Bank Name :
                      </label>
                      <NewDropdownInput
                        type="type1"
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
                        Total Credit:
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={() => {}}
                        selectedValue={new Intl.NumberFormat("en-IN").format(
                          totalCredit
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
                  width: "100%",
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
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px" }}
                    >
                      Date
                    </th>
                    <th scope="col" className="row-font px-1 py-2 rounded-lg">
                      Reference No.
                    </th>
                    <th scope="col" className="row-font px-1 py-2 rounded-lg">
                      Bank A/C
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "140px" }}
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "135px" }}
                    >
                      Job Number
                    </th>
                    <th scope="col" className="row-font px-1 py-2 rounded-lg">
                      Type of Expenses
                    </th>
                    <th scope="col" className="row-font px-1 py-2 rounded-lg">
                      Amount Recieved
                    </th>
                    <th scope="col" className="row-font px-1 py-2 rounded-lg">
                      Remarks
                    </th>
                    {(checkUsername === "admin" || useDelete) && (
                      <th scope="col" className="row-font px-1 py-2 rounded-lg">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="body-accounts">
                  {currentItems.map((credits, index) => {
                    const matchingdebitdetails = creditDetails.find(
                      (creditdetails) =>
                        creditdetails.jobnumber === credits.jobnumber
                    );
                    const isSelected = selectedRowIndex === index;

                    return (
                      <tr
                        key={credits.id}
                        onDoubleClick={() => handleEdit(credits.id)}
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
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "100px" }}
                        >
                          {moment(credits.currentdate).format("DD-MM-YYYY")}
                        </td>
                        <td className="td-accounts px-1 py-2 rounded-lg">
                          {credits.referenceno}
                        </td>
                        <td className="td-accounts px-1 py-2 rounded-lg">
                          {credits.bankAccount}
                        </td>
                        <td
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "140px" }}
                        >
                          {credits.organizationName}
                        </td>
                        <td
                          className="td-accounts px-1 py-2 rounded-lg "
                          style={{ minWidth: "135px" }}
                        >
                          {credits.onAccountType === "against-job"
                            ? parseData(credits.againstJobDetails)[0].jobNo
                                .label
                            : parseData(credits.againstBillDetails)[0]
                                .jobNoForAgainstBill}
                        </td>
                        <td className="td-accounts px-1 py-2 rounded-lg">
                          {credits.receivedPayementType}
                        </td>
                        <td className="td-accounts px-1 py-2 rounded-lg">
                          {new Intl.NumberFormat("en-IN").format(
                            credits.amountReceived
                          )}
                        </td>
                        <td className="td-accounts px-1 py-2 rounded-lg">
                          {credits.remarks}
                        </td>
                        {(checkUsername === "admin" || useDelete) && (
                          <td className="td-accounts px-1 py-2 rounded-lg">
                            <div
                              className="invisible-btn-style  delete-hover-color"
                              onClick={() => {
                                setRemark("");
                                setCurrentPopup("Deletion");
                                setCreditToDelete(credits);
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
          title={creditToDelete.referenceno}
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

export default Credit;
