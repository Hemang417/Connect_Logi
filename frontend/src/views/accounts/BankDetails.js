import React, { useEffect, useState, useCallback } from "react";
import BankDetailsPopup from "src/components/inputPopup/BankDetailsPopup";
import { motion } from "framer-motion";
import {
  CCardBody,
  CRow,
  CModal,
  CCol,
  CCard,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CForm,
} from "@coreui/react";
import "../../css/styles.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import "./css/accounts-styles.css";

import Pagination from "src/layout/Pagination";
import moment from "moment";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import AddBtn from "../buttons/buttons/AddBtn";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import DownlodBtn from "../buttons/buttons/DownlodBtn";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import { use } from "react";

// API endpoint constant
import API_BASE_URL from "src/config/config";

const BankDetails = () => {
  const navigate = useNavigate();

  // State management
  const [selectedBranches, setSelectedBranches] = useState(new Set());
  const [showBankPopup, setShowBankPopup] = useState(false);

  const [branchlist, setBranchlist] = useState([]);
  const [visible, setVisible] = useState(false);
  const [allbankdetails, setAllBankdetails] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [useAdd, setUseAdd] = useState(false);
  const [useDelete, setUseDelete] = useState(false);
  const [useDownload, setUseDownload] = useState(false);
  const checkUsername = localStorage.getItem("username");
  // Filter states
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedIfsc, setSelectedIfsc] = useState("");
  const [selectedAccountNo, setSelectedAccountNo] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [selectedCheque, setSelectedCheque] = useState("");

  // Form state
  const [bankdetails, setBankdetails] = useState({
    bankname: "",
    accounttype: "",
    bankaccountno: "",
    ifsc: "",
    branchname: [],
    branchcode: [],
    closingBalance: "",
    chequedetails: "",
  });

  const addBtn = "Bank";
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Get organization data from localStorage once
  const orgData = {
    orgname: localStorage.getItem("orgname"),
    orgcode: localStorage.getItem("orgcode"),
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

      setUseDownload(controlSet.has("download-bank"));
      setUseDelete(controlSet.has("delete-bank"));
      setUseAdd(controlSet.has("add-bank"));

      // console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  // API calls with error handling
  const fetchData = useCallback(async (endpoint, params = {}) => {
    fetchcontrols();
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      toast.error(`Failed to load ${endpoint}`);
      return [];
    }
  }, []);

  // Get bank details
  const getbankdetails = useCallback(async () => {
    const data = await fetchData("getbankdetails", orgData);
    if (data) setAllBankdetails(data);
  }, [fetchData, orgData]);

  // Get branches
  const getBranches = useCallback(async () => {
    const data = await fetchData("getbranchesforacc", orgData);
    if (data) setBranchlist(data);
  }, [fetchData, orgData]);

  // Refresh data
  const refreshData = async () => {
    try {
      await fetchcontrols();
      await getbankdetails();
      toast.success("Data Refreshed");
    } catch (error) {
      console.error("Failed to refresh:", error);
      toast.error("Failed to refresh data");
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

  // Initialize data
  useEffect(() => {
    getbankdetails();
    getBranches();

    // Check authentication
    const checkToken = () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [getbankdetails, getBranches]);

  // Reset form state
  const resetFormState = () => {
    setBankdetails({
      bankname: "",
      accounttype: "",
      bankaccountno: "",
      ifsc: "",
      branchname: [],
      branchcode: [],
      closingBalance: "",
      chequedetails: "",
    });
    setSelectedBranches(new Set());
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankdetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dropdown change
  const handleDropdownChange = (selectedItem) => {
    setBankdetails((prev) => ({
      ...prev,
      accounttype: selectedItem,
    }));
  };

  // Add bank details
  const handleAddBankDetails = async () => {
    // IFSC code validation
    const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!bankdetails.ifsc || bankdetails.ifsc.trim() === "") {
      toast.error("Please enter a valid IFSC Code");
      return;
    }

    if (!regex.test(bankdetails.ifsc)) {
      toast.error("Invalid IFSC Code format");
      return;
    }

    // Validate other required fields
    if (
      !bankdetails.bankname ||
      !bankdetails.accounttype ||
      !bankdetails.bankaccountno
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    console.log("bankdetails ->", bankdetails);

    try {
      const response = await axios.post(`${API_BASE_URL}/addbankdetails`, {
        ...bankdetails,
        ...orgData,
      });

      if (response.status === 200) {
        toast.success("Bank details added successfully");
        getbankdetails();
        resetFormState();
        setVisible(false);
      }
    } catch (error) {
      console.error("Error adding bank details:", error);
      toast.error("Failed to add bank details");
    }
  };

  // Delete bank details
  const handleDelete = async (bank) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deletebankdetails`, {
        data: {
          accountnum: bank.accountnum,
          ifscCode: bank.ifscCode,
          ...orgData,
        },
      });

      if (response.status === 200) {
        toast.success("Bank details deleted successfully");
        getbankdetails();
      }
    } catch (error) {
      console.error("Error deleting bank details:", error);
      toast.error("Failed to delete bank details");
    }
  };

  // Modal close
  const handleModalClose = () => {
    setVisible(false);
    resetFormState();
  };

  // Add dropdown for branch
  const handleAddDropdown = () => {
    setBankdetails((prev) => ({
      ...prev,
      branchname: [...prev.branchname, { branchname: "" }],
      branchcode: [...prev.branchcode, { branchcode: "" }],
    }));
  };

  // Handle branch selection
  const handleBranchSelect = (branch, index) => {
    const updatedBranches = [...bankdetails.branchname];
    const updatedBranchesCode = [...bankdetails.branchcode];
    updatedBranches[index] = { branchname: branch.ownbranchname };
    updatedBranchesCode[index] = { branchcode: branch.branchcode };

    setBankdetails((prev) => ({
      ...prev,
      branchname: updatedBranches,
      branchcode: updatedBranchesCode,
    }));

    setSelectedBranches((prev) => {
      const newSet = new Set(prev);
      newSet.add(branch.ownbranchname);
      return newSet;
    });
  };

  // Delete dropdown for branch
  const handleDeleteDropdown = (index) => {
    const removeBranchName = bankdetails.branchname[index]?.branchname;

    setBankdetails((prev) => ({
      ...prev,
      branchname: prev.branchname.filter((_, i) => i !== index),
      branchcode: prev.branchcode.filter((_, i) => i !== index),
    }));

    if (removeBranchName) {
      setSelectedBranches((prev) => {
        const newSet = new Set(prev);
        newSet.delete(removeBranchName);
        return newSet;
      });
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = allbankdetails.map((bank) => ({
      "Bank Name": bank.bankname,
      "Account Type": bank.accountype,
      "Bank Account No.": bank.accountnum,
      "IFSC Code": bank.ifscCode,
      "Organization Branch": Array.isArray(bank.ownbranchname)
        ? bank.ownbranchname
            .map((b) => (typeof b === "object" ? b.branchname : b))
            .join(", ")
        : bank.ownbranchname,
      "Cheque Details": bank.chequedetails || "NA",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bank Details");

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
    link.download = "BankDetails.xlsx";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Memoized filter options
  const bankOptions = React.useMemo(() => {
    const uniqueBanks = [
      ...new Set(allbankdetails.map((bank) => bank.bankname)),
    ];
    return [
      { label: "All Banks", value: "" },
      ...uniqueBanks.map((name) => ({ value: name, label: name })),
    ];
  }, [allbankdetails]);

  const ifscCodeOptions = React.useMemo(() => {
    const uniqueIfscs = [
      ...new Set(allbankdetails.map((bank) => bank.ifscCode)),
    ];
    return [
      { label: "All IFSC Code", value: "" },
      ...uniqueIfscs.map((code) => ({ value: code, label: code })),
    ];
  }, [allbankdetails]);

  const branchOptions = React.useMemo(() => {
    const branchNames = new Set();
    allbankdetails.forEach((bank) => {
      if (Array.isArray(bank.ownbranchname)) {
        bank.ownbranchname.forEach((branch) => {
          const branchName =
            typeof branch === "object" ? branch.branchname : branch;
          if (branchName) branchNames.add(branchName);
        });
      }
    });

    return [
      { label: "All Branches", value: "" },
      ...[...branchNames].map((name) => ({ value: name, label: name })),
    ];
  }, [allbankdetails]);

  // Filter branches that aren't already selected
  const filteredBranchList = React.useMemo(
    () =>
      branchlist.filter(
        (branch) => !selectedBranches.has(branch.ownbranchname)
      ),
    [branchlist, selectedBranches]
  );

  // Filter bank details based on selection
  const filteredDetails = React.useMemo(() => {
    return allbankdetails.filter((detail) => {
      // Date filtering
      const formattedDetailDate = detail.date
        ? moment(detail.date).format("YYYY-MM-DD")
        : null;
      const dateMatch =
        !startDate ||
        !endDate ||
        !formattedDetailDate ||
        moment(formattedDetailDate).isBetween(startDate, endDate, "day", "[]");

      if (!dateMatch) return false;

      // Text-based filtering - case insensitive
      const bankNameMatch =
        !selectedBank ||
        detail.bankname?.toLowerCase().includes(selectedBank.toLowerCase());

      const ifscMatch =
        !selectedIfsc ||
        detail.ifscCode?.toLowerCase().includes(selectedIfsc.toLowerCase());

      const accountNoMatch =
        !selectedAccountNo ||
        detail.accountnum
          ?.toLowerCase()
          .includes(selectedAccountNo.toLowerCase());

      // Branch name filtering
      let branchMatch = true;
      if (selectedBranch) {
        branchMatch = false;
        const lowerBranch = selectedBranch.toLowerCase();

        if (Array.isArray(detail.ownbranchname)) {
          for (const branch of detail.ownbranchname) {
            const branchName =
              typeof branch === "object" ? branch.branchname : branch;
            if (branchName?.toLowerCase().includes(lowerBranch)) {
              branchMatch = true;
              break;
            }
          }
        }
      }

      const accountTypeMatch =
        !selectedAccountType ||
        detail.accountype
          ?.toLowerCase()
          .includes(selectedAccountType.toLowerCase());

      const chequeMatch =
        !selectedCheque ||
        (detail.chequedetails?.toLowerCase() || "").includes(
          selectedCheque.toLowerCase()
        );

      return (
        bankNameMatch &&
        ifscMatch &&
        accountNoMatch &&
        branchMatch &&
        accountTypeMatch &&
        chequeMatch
      );
    });
  }, [
    allbankdetails,
    selectedBank,
    selectedIfsc,
    selectedAccountNo,
    selectedBranch,
    selectedAccountType,
    selectedCheque,
    startDate,
    endDate,
  ]);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedBank,
    selectedIfsc,
    selectedAccountNo,
    selectedBranch,
    selectedAccountType,
    selectedCheque,
  ]);

  // Pagination
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = filteredDetails.slice(indexOfFirstPage, indexOfLastPage);
  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // // Keyboard navigation
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (filteredDetails.length === 0) return;

  //     const itemsOnCurrentPage = currentItems.length;
  //     const maxIndex = itemsOnCurrentPage - 1;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prev) => (prev > 0 ? prev - 1 : prev));
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [selectedRowIndex, currentItems.length, filteredDetails.length]);

  return (
    <div className="IMPORTPaginationAlignment" style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
        animate={{ opacity: 1, y: 0 }} // Becomes fully visible
        exit={{ opacity: 0, y: -20 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        <div>
          {/* Header Section */}
          <CCardBody className="button-div">
            <div
              onClick={() => navigate("/accountsDetails")}
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
              <h4>Bank Details</h4>
            </div>

            {(checkUsername === "admin" || useAdd) && (
              <div className="createjob-button">
                <Link
                  onClick={() => {
                    setShowBankPopup(true);
                    setBankdetails({
                      bankname: "",
                      accounttype: "",
                      bankaccountno: "",
                      ifsc: "",
                      branchname: [],
                      branchcode: [],
                      closingBalance: "",
                      chequedetails: "",
                    });
                  }}
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

          {/* Filter Section */}
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
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{
                        marginRight: "0",
                        marginBottom: "0px",
                        width: "150px",
                      }}
                    >
                      <label className="account-label-width">
                        Account Type :{" "}
                      </label>
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
                    <div className="grid-container-imp-exp-jobnum">
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Bank Account No. :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setSelectedAccountNo}
                        selectedValue={selectedAccountNo}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                  </div>
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
                        style={{ width: "110px" }}
                      >
                        IFSC Code :
                      </label>
                      <NewDropdownInput
                        type={"type1"}
                        options={ifscCodeOptions}
                        placeholder={"All IFSC Code"}
                        selectedValue={selectedIfsc}
                        setSelectedValue={setSelectedIfsc}
                        width={"150px"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{
                        marginRight: "0",
                        marginBottom: "0px",
                        width: "150px",
                      }}
                    >
                      <label className="account-label-width">
                        Organization Branch :
                      </label>
                      <NewDropdownInput
                        type={"type1"}
                        options={branchOptions}
                        placeholder={"All Branches"}
                        selectedValue={selectedBranch}
                        setSelectedValue={setSelectedBranch}
                        width={"150px"}
                      />
                    </div>
                    <div className="grid-container-imp-exp-jobnum">
                      <label
                        className="account-label-width"
                        style={{ width: "100px" }}
                      >
                        Cheque Details :
                      </label>
                      <NewInput
                        width={"150px"}
                        setSelectedValue={setSelectedCheque}
                        selectedValue={selectedCheque}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                  </div>
                </div>
              </CCardBody>
            </div>
          </CCol>

          <div className="line"></div>

          {/* Data Table */}
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
                      style={{ width: "10%" }}
                    >
                      Bank Name
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "10%" }}
                    >
                      Account Type
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "10%" }}
                    >
                      Bank Account No.
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "10%" }}
                    >
                      IFSC Code
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "10%" }}
                    >
                      Organization Branch
                    </th>
                    <th
                      scope="col"
                      className="row-font px-4 py-2 rounded-lg"
                      style={{ width: "10%" }}
                    >
                      Cheque Details
                    </th>

                    {(checkUsername === "admin" || useDelete) && (
                      <th
                        scope="col"
                        className="row-font px-4 py-2 rounded-lg"
                        style={{ width: "10%" }}
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="body-accounts">
                  {currentItems?.map((bank, index) => {
                    const isSelected = selectedRowIndex === index;

                    return (
                      <tr
                        onClick={() => setSelectedRowIndex(index)}
                        className={`selected-row ${
                          isSelected ? "primary-selected" : ""
                        }`}
                        key={index}
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
                        <td className="td-accounts px-4 py-2 rounded-lg">
                          {bank.bankname}
                        </td>
                        <td className="td-accounts px-4 py-2 rounded-lg">
                          {bank.accountype}
                        </td>
                        <td className="td-accounts px-4 py-2 rounded-lg">
                          {bank.accountnum}
                        </td>
                        <td className="td-accounts px-4 py-2 rounded-lg">
                          {bank.ifscCode}
                        </td>
                        <td className="td-accounts px-4 py-2 rounded-lg">
                          {Array.isArray(bank.ownbranchname) &&
                            bank.ownbranchname.map((branch, i) => (
                              <React.Fragment key={i}>
                                {typeof branch === "object"
                                  ? branch.branchname
                                  : branch}
                                {i < bank.ownbranchname.length - 1 ? ", " : ""}
                              </React.Fragment>
                            ))}
                        </td>
                        <td className="td-accounts px-4 py-2 rounded-lg">
                          {bank.chequedetails}
                        </td>
                        {(checkUsername === "admin" || useDelete) && (
                          <td className="td-accounts px-4 py-2 rounded-lg">
                            <Link
                              className="invisible-btn-style delete-hover-color"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.confirm(
                                  "Are you sure you want to delete?"
                                )
                                  ? handleDelete(bank)
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

          {/* Modal for adding bank details */}
          <CModal
            visible={visible}
            onClose={handleModalClose}
            aria-labelledby="LiveDemoExampleLabel"
            size="xl"
          >
            <CModalHeader>
              <CModalTitle id="LiveDemoExampleLabel">Bank Details</CModalTitle>
            </CModalHeader>
            <CModalBody className="accounts-bank-details-modal">
              <div className="paye-details-1">
                <label
                  htmlFor="bankname"
                  className="accounts-bank-details-text-field-3"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="accounts-text-field-4"
                  name="bankname"
                  value={bankdetails.bankname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="paye-details-1">
                <label
                  htmlFor="accounttype"
                  className="accounts-bank-details-text-field-3"
                >
                  Account Type
                </label>
                <select
                  className="form-select accounts-text-field-4 bankdetails-account-dropdown-btn"
                  value={bankdetails.accounttype || ""}
                  onChange={(e) => handleDropdownChange(e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Cash Credit">Cash Credit</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                  <option value="Recurring Deposit">Recurring Deposit</option>
                </select>
              </div>
              <div className="paye-details-1">
                <label
                  htmlFor="bankaccountno"
                  className="accounts-bank-details-text-field-3"
                >
                  Bank Account No.
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="accounts-text-field-4"
                  name="bankaccountno"
                  value={bankdetails.bankaccountno}
                  onChange={handleInputChange}
                />
              </div>
              <div className="paye-details-1">
                <label
                  htmlFor="ifsc"
                  className="accounts-bank-details-text-field-3"
                >
                  IFSC Code
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="accounts-text-field-4"
                  name="ifsc"
                  value={bankdetails.ifsc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="bank-details-branchname-addbutton">
                <label
                  htmlFor="branchname"
                  className="accounts-bank-details-text-field-3"
                >
                  Organization Branch
                </label>
                <div>
                  {bankdetails.branchname &&
                    bankdetails.branchname.length > 0 &&
                    bankdetails.branchname.map((branchname, index) => (
                      <div key={index} className="addworkflow-dropdown-access">
                        <CDropdown>
                          <CDropdownToggle
                            className="branchname-dropdown-btn"
                            color="secondary"
                          >
                            {branchname.branchname || "Select"}
                          </CDropdownToggle>

                          <CDropdownMenu>
                            {filteredBranchList.map(
                              (branchItem, branchIndex) => (
                                <CDropdownItem
                                  key={branchIndex}
                                  onClick={() =>
                                    handleBranchSelect(branchItem, index)
                                  }
                                >
                                  {branchItem.ownbranchname}
                                </CDropdownItem>
                              )
                            )}
                          </CDropdownMenu>
                        </CDropdown>
                        <img
                          className="addworkflow-deletebutton"
                          onClick={() => handleDeleteDropdown(index)}
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/50/000000/cancel.png"
                          alt="cancel"
                        />
                      </div>
                    ))}
                  <svg
                    className="mt-2"
                    onClick={handleAddDropdown}
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                      fill="#1C274C"
                    />
                  </svg>
                </div>
              </div>
              <div className="paye-details-1">
                <label
                  htmlFor="closingBalance"
                  className="accounts-bank-details-text-field-3"
                >
                  Closing Balance
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="accounts-text-field-4"
                  name="closingBalance"
                  value={bankdetails.closingBalance}
                  onChange={handleInputChange}
                />
              </div>
              <div className="paye-details-1">
                <label
                  htmlFor="chequedetails"
                  className="accounts-bank-details-text-field-3"
                >
                  Cheque Details
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="accounts-text-field-4"
                  name="chequedetails"
                  value={bankdetails.chequedetails || ""}
                  onChange={handleInputChange}
                />
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={handleModalClose}>
                Cancel
              </CButton>
              <CButton color="primary" onClick={handleAddBankDetails}>
                Add
              </CButton>
            </CModalFooter>
          </CModal>
          {showBankPopup && (
            <BankDetailsPopup
              visible={showBankPopup}
              onClose={() => setShowBankPopup(false)}
              bankdetails={bankdetails}
              handleInputChange={handleInputChange}
              handleDropdownChange={handleDropdownChange}
              handleBranchSelect={handleBranchSelect}
              handleDeleteDropdown={handleDeleteDropdown}
              handleAddDropdown={handleAddDropdown}
              handleAddBankDetails={handleAddBankDetails}
              // filteredBranchList={filteredBranchList}
              filteredBranchList={branchlist}
              setCurrentPopup={() => setShowBankPopup(false)}
            />
          )}
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

export default BankDetails;
