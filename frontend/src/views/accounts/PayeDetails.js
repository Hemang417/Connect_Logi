import React, { useEffect, useState } from "react";
import InputPopup from "src/components/inputPopup/InputPopup";
import { motion } from "framer-motion";
import {
  CCardBody,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCol,
  CCard,
  CModalFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CForm,
  CTableDataCell,
} from "@coreui/react";
import "../../css/styles.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Select from "react-select";
import * as XLSX from "xlsx";
import refreshIcon from "../../importIcons/refresh.png";
import "./css/accounts-styles.css";
import Pagination from "src/layout/Pagination";
import moment from "moment";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import AddBtn from "../buttons/buttons/AddBtn";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import DownlodBtn from "../buttons/buttons/DownlodBtn";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import API_BASE_URL from "src/config/config";

const PayeDetails = () => {
  const [visible, setVisible] = useState(false);
  const [allpayedetails, setAllPayeDetails] = useState([]);
  const [orgdetails, setOrgDetails] = useState([]);
  const [newPayeclientArray, setNewPayeClientArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [blTypeNum, setBlTypeNum] = useState("");
  const [currentPopup, setCurrentPopup] = useState("none");

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDropdown, setselectedDropdown] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMode, setselectedMode] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [searchPayeName, setSearchPayeName] = useState("");
  const [searchBankName, setSearchBankName] = useState("");
  const [searchIFSC, setSearchIFSC] = useState("");
  const [selectedAccountNo, setSelectedAccountNo] = useState("");
  const [useAdd, setUseAdd] = useState(false);
  const [useDelete, setUseDelete] = useState(false);
  const [useDownload, setUseDownload] = useState(false);
  const checkUsername = localStorage.getItem("username");
  const addBtn = "PayE";
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // const [isEdit, setisEdit] = useState(false);
  const [payedetails, setPayeDetails] = useState({
    payename: null,
    bankname: "",
    accounttype: "",
    bankaccountno: "",
    ifsc: "",
  });
  const contactFields = [
    { id: "payename", label: "PayE Name", inputType: "select" },
    { id: "bankname", label: "PayE Bank Name", inputType: "text" },
    { id: "accounttype", label: "PayE Account Type", inputType: "select" },
    { id: "bankaccountno", label: "PayE Account No", inputType: "number" },
    { id: "ifsc", label: "IFSC Code", inputType: "text" },
  ];

  const navigate = useNavigate();

  const getPayeDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getpayedetails`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setAllPayeDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrgDetails = async () => {
    // Function to fetch bank accounts
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getallorganizationdetails`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      const formattedData = response.data.map((org) => ({
        value: org.clientname,
        label: org.clientname,
      }));
      setOrgDetails(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshData = async () => {
    try {
      await fetchcontrols();
      await getPayeDetails();
      await getOrgDetails();
      toast.success("Data Refreshed");
    } catch (error) {
      console.log("fail to refresh", error);
      toast.error("Fail To Refresh");
    }
  };

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

      setUseDownload(controlSet.has("download-paye"));
      setUseDelete(controlSet.has("delete-paye"));
      setUseAdd(controlSet.has("add-paye"));

      // console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcontrols();
    getPayeDetails();
    getOrgDetails();

    const storedArray = localStorage.getItem("payeOptions");
    const parsedArray = JSON.parse(storedArray) || []; // Initialize as empty array if not found
    setNewPayeClientArray(parsedArray);
  }, []);

  useEffect(() => {
    localStorage.setItem("newPayeclient", userInput);
  }, [userInput]);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayeDetails({
      ...payedetails,
      [name]: value,
    });
  };

  const handleDropdownChange = (selectedItem) => {
    setUserInput(selectedItem);
  };
  const handleDropdownChange2 = (selectedItem) => {
    setPayeDetails({
      ...payedetails,
      accounttype: selectedItem,
    });
  };

  const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  const handleAddpayedetails = async () => {
    if (!payedetails.ifsc || !payedetails.ifsc.trim()) {
      alert("Please enter the IFSC code");
      return;
    }

    if (!IFSC_REGEX.test(payedetails.ifsc)) {
      alert("Invalid IFSC Code. Format must be like 'HDFC0001234'");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/addpayedetails`, {
        payename: localStorage.getItem("newPayeclient"),
        payedetails: payedetails,
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
      });

      if (response.status === 200) {
        toast.success("Paye details added successfully");
        getPayeDetails();
        setPayeDetails({
          payename: "",
          bankname: "",
          accounttype: "",
          bankaccountno: "",
          ifsc: "",
        });
        setVisible(false); // Close modal after adding
      }
    } catch (error) {
      console.error("Failed to add payee details:", error);
    }
  };

  async function handleDelete(paye) {
    const response = await axios.delete(
      `${API_BASE_URL}/deletepayedetails`,
      {
        data: {
          accountnum: paye.accountnum,
          ifscCode: paye.ifscCode,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      }
    );

    response.status === 200
      ? toast.success("Paye details deleted successfully")
      : toast.success("Paye details deleted successfully");
    getPayeDetails();
  }

  const handleModalClose = async () => {
    setVisible(false);
    // setisEdit(false);
    setPayeDetails({
      payename: "",
      bankname: "",
      accounttype: "",
      bankaccountno: "",
      ifsc: "",
    });
  };

  const handleInputValueChange = (inputValue) => {
    setUserInput(inputValue);
  };

  const handleBlur = (item) => {
    if (item.trim() !== "") {
      const newClient = { value: item, label: item };
      setOrgDetails([...orgdetails, newClient]);
      toast.success("New client added successfully");
      localStorage.setItem("newPayeclient", item);

      const updatedArray = [...newPayeclientArray, newClient].reduce(
        (acc, item) => {
          const exists = acc.some(
            (existingItem) => existingItem.value === item.value
          );
          if (!exists) {
            acc.push(item);
          }
          return acc;
        },
        []
      );
      localStorage.setItem("payeOptions", JSON.stringify(updatedArray));
    }
  };

  const localmapped = localStorage.getItem("payeOptions");
  const parsedArray = JSON.parse(localmapped) || []; // Initialize as empty array if not found
  const optionsValue = [...orgdetails, ...parsedArray];
  const payeOptions = optionsValue.reduce((acc, item) => {
    const exists = acc.some(
      (existingItem) => existingItem.value === item.value
    );
    if (!exists) {
      acc.push(item);
    }
    return acc;
  }, []);

  const sortedpayeOptions = payeOptions.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    } else {
      return 0;
    }
  });

  const exportToExcel = () => {
    // Map the required fields to a new array
    const exportData = allpayedetails.map((paye) => ({
      "PayE Name": paye.payename,
      "Bank Name": paye.bankname,
      "PayE Account Type": paye.accounttype,
      "PayE Account No.": paye.accountnum,
      "IFSC Code": paye.ifscCode,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Paye Details");

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
    link.download = "PayeDetails.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredDetails = allpayedetails
    .filter((detail) => {
      const lowerCaseBlTypeNum = blTypeNum.toLowerCase();
      const lowerCasePayeName = detail.payename?.toLowerCase() || "";
      const lowerCasePayeAccountType = detail.accounttype?.toLowerCase() || "";
      const lowerCaseAccountNumber = detail.accountnum?.toLowerCase() || "";
      const lowerCaseBankName = detail.bankname?.toLowerCase() || "";
      const lowerCaseIFSC = detail.ifscCode?.toLowerCase() || "";

      const formattedDetailDate = moment(detail.date).format("YYYY-MM-DD");
      const selectedDateMatch =
        (!startDate && !endDate) ||
        (startDate &&
          endDate &&
          moment(formattedDetailDate).isBetween(
            startDate,
            endDate,
            "day",
            "[]"
          ));

      const accountTypeMatch =
        !selectedAccountType ||
        lowerCasePayeAccountType === selectedAccountType.toLowerCase();

      return (
        selectedDateMatch &&
        accountTypeMatch &&
        // (!selectedMode || detail.payedetails === selectedMode) &&
        (!searchPayeName ||
          lowerCasePayeName.includes(searchPayeName.toLowerCase())) &&
        (!searchBankName ||
          lowerCaseBankName.includes(searchBankName.toLowerCase())) &&
        (!selectedAccountNo ||
          lowerCaseAccountNumber.includes(selectedAccountNo.toLowerCase())) &&
        (!searchIFSC || lowerCaseIFSC.includes(searchIFSC.toLowerCase()))
      );
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filtering changes
  }, [selectedMode, payedetails, selectedDropdown, selectedAccountType]);

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = filteredDetails.slice(indexOfFirstPage, indexOfLastPage);

  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (filteredDetails.length === 0) return;

  //     const itemsOnCurrentPage = currentItems.length; // Get the number of items on the current page
  //     const maxIndex = itemsOnCurrentPage - 1; // Maximum index for the current page

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < maxIndex ? prevIndex + 1 : prevIndex
  //       );
  //     } else if (e.key === "Enter") {
  //       //..
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, currentItems, filteredDetails, payedetails]);

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
              onClick={() => navigate("/dashboard")}
              className="backButton"
              style={{ marginTop: "-16px" }}
            >
              <ArrowCircleLeft />
            </div>
            <div className="refreshjob-button">
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
              <h4>PayE Details</h4>
            </div>
            {(checkUsername === "admin" || useAdd) && (
              <div className="createjob-button">
                <Link
                  onClick={() => setCurrentPopup("createPayE")}
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
                <div className="grid-container-account-1">
                  <div
                    className="grid-container-filter"
                    style={{ marginBottom: "2px" }}
                  >
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        PayE Name :{" "}
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setSearchPayeName}
                        selectedValue={searchPayeName}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Bank Name :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setSearchBankName}
                        selectedValue={searchBankName}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label className="account-label-width">
                        PayE Account Type :
                      </label>
                      <div>
                        <NewDropdownInput
                          type={"type1"}
                          options={[
                            { value: "", label: "All Types" },
                            { value: "Savings", label: "Savings" },
                            { value: "Current", label: "Current" },
                            { value: "Cash Credit", label: "Cash Credit" },
                            { value: "Fixed Deposit", label: "Fixed Deposit" },
                            {
                              value: "Recurring Deposit",
                              label: "Recurring Deposit",
                            },
                          ]}
                          placeholder={"All Types"}
                          selectedValue={selectedAccountType}
                          setSelectedValue={setSelectedAccountType}
                          width={"150px"}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="grid-container-filter"
                    style={{
                      marginBottom: "2px",
                    }}
                  >
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        PayE Account No :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setSelectedAccountNo}
                        selectedValue={selectedAccountNo}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        IFSC Code :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setSearchIFSC}
                        selectedValue={searchIFSC}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div style={{ width: "150px" }}>
                      {/* Empty div to adjust IFSC Code below Bank Name */}
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
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "168px" }}
                    >
                      PayE Name
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "152px" }}
                    >
                      Bank Name
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "196px" }}
                    >
                      PayE Account Type
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "188px" }}
                    >
                      PayE Account No.
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "172px" }}
                    >
                      IFSC Code
                    </th>
                    {(checkUsername === "admin" || useDelete) && (
                      <th
                        scope="col"
                        className="row-font px-4 py-2 rounded-lg"
                        style={{ width: "132px" }}
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="body-accounts">
                  {currentItems?.map((paye, index) => {
                    const isSelected = selectedRowIndex === index;

                    return (
                      <tr
                        key={index}
                        onClick={() => setSelectedRowIndex(index)}
                        className={`selected-row ${isSelected ? "primary-selected" : ""
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
                          className="td-accounts px-4 py-2 rounded-lg"
                          style={{ width: "168px" }}
                        >
                          {paye.payename}
                        </td>
                        <td
                          className="td-accounts px-4 py-2 rounded-lg"
                          style={{ width: "152px" }}
                        >
                          {paye.bankname}
                        </td>
                        <td
                          className="td-accounts px-4 py-2 rounded-lg"
                          style={{ width: "196px" }}
                        >
                          {paye.accounttype}
                        </td>
                        <td
                          className="td-accounts px-4 py-2 rounded-lg"
                          style={{ width: "188px" }}
                        >
                          {paye.accountnum}
                        </td>
                        <td
                          className="td-accounts px-4 py-2 rounded-lg"
                          style={{ width: "172px" }}
                        >
                          {paye.ifscCode}
                        </td>
                        {(checkUsername === "admin" || useDelete) && (
                          <td
                            className="td-accounts px-4 py-2 rounded-lg"
                            style={{ width: "132px" }}
                          >
                            <Link
                              className="invisible-btn-style  delete-hover-color"
                              onClick={() => {
                                window.confirm(
                                  "Are you sure you want to delete?"
                                )
                                  ? handleDelete(paye)
                                  : null;
                              }}
                              style={{
                                paddingLeft: "9px",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                              }}
                            >
                              <DeleteBtn fill="var(--page-title)" />
                            </Link>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CForm>
          </div>
          {currentPopup === "createPayE" && (
            <InputPopup
              title="Add New PayE"
              setCurrentPopup={setCurrentPopup}
              fields={contactFields}
              value={payedetails}
              width={"330px"}
              setValue={setPayeDetails}
              handleAdd={handleAddpayedetails}
              firstButtonText={"Add"}
              secondButtonText={"Close"}
              selection={"payename"}
              selection2={"accounttype"}
              dropdownType={"type1"}
              // dropdownPlaceholder={"Select Role"}
              dropdownValue={userInput ? userInput : ""}
              dropdownOptions={sortedpayeOptions}
              dropdownSetValue={handleDropdownChange}
              dropdownValue2={payedetails.accounttype}
              dropdownOptions2={[
                { label: "Savings", value: "Savings" },
                { label: "Current", value: "Current" },
                { label: "Cash Credit", value: "Cash Credit" },
                { label: "Fixed Deposit", value: "Fixed Deposit" },
                { label: "Recurring Deposit", value: "Recurring Deposit" },
              ]}
              dropdownSetValue2={handleDropdownChange2}
              top={"50%"}
              left={"50%"}
            />
          )}
          <CModal
            visible={visible}
            onClose={handleModalClose}
            aria-labelledby="LiveDemoExampleLabel"
            size="xl"
          >
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">PayE Details</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="paye-modal">
                <div className="paye-modal-details-2">
                  <label htmlFor="payename" className="accounts-text-field-3">
                    PayE Name
                  </label>
                  <select
                    className="accounts-text-field-4"
                    value={
                      localStorage.getItem("newPayeclient") === ""
                        ? ""
                        : localStorage.getItem("newPayeclient")
                    }
                    onChange={(e) => {
                      setUserInput(e.target.value);
                      localStorage.setItem("newPayeclient", e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    {sortedpayeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {/* <Select
                  className="text-field-4"
                  options={sortedpayeOptions}
                  value={
                    localStorage.getItem("newPayeclient") === ""
                      ? { value: "", label: "Select" }
                      : {
                          value: localStorage.getItem("newPayeclient"),
                          label: localStorage.getItem("newPayeclient"),
                        }
                  }
                  placeholder="Importer Name"
                  onInputChange={handleInputValueChange}
                  onBlur={handleBlur}
                  onChange={(selectedOption) => {
                    setUserInput(selectedOption.label);
                    localStorage.setItem("newPayeclient", selectedOption.label);
                  }}
                /> */}
                </div>
                <div className="paye-modal-details-1">
                  <label htmlFor="bankname" className="accounts-text-field-3">
                    PayE Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="accounts-text-field-4"
                    name="bankname"
                    value={payedetails.bankname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="paye-modal-details-2">
                  <label
                    htmlFor="accounttype"
                    className="accounts-text-field-3"
                  >
                    PayE Account Type
                  </label>
                  <select
                    className="accounts-text-field-4"
                    value={payedetails.accounttype}
                    onChange={(e) => handleDropdownChange(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Cash Credit">Cash Credit</option>
                    <option value="Fixed Deposit">Fixed Deposit</option>
                    <option value="Recurring Deposit">Recurring Deposit</option>
                  </select>
                  {/* <CDropdown className="accounts-text-field-4 ">
                  <CDropdownToggle
                    className="accounts-dropdown-btn"
                    color="secondary"
                  >
                    {payedetails.accounttype || "Select"}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() => handleDropdownChange("Savings")}
                    >
                      Savings
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleDropdownChange("Current")}
                    >
                      Current
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleDropdownChange("Cash Credit")}
                    >
                      Cash Credit
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleDropdownChange("Fixed Deposit")}
                    >
                      Fixed Deposit
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => handleDropdownChange("Recurring Deposit")}
                    >
                      Recurring Deposit
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown> */}
                </div>
                <div className="paye-modal-details-1">
                  <label
                    htmlFor="bankaccountno"
                    className="accounts-text-field-3"
                  >
                    PayE Account No.
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="accounts-text-field-4"
                    name="bankaccountno"
                    value={payedetails.bankaccountno}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="paye-modal-details-1">
                  <label htmlFor="ifsc" className="accounts-text-field-3">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="accounts-text-field-4"
                    name="ifsc"
                    value={payedetails.ifsc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={handleAddpayedetails}>
                Add
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      </motion.div>
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

export default PayeDetails;
