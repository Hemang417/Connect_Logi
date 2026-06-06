import React, { useEffect } from "react";
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CPopover,
} from "@coreui/react";
import "../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import deleteIcon from "../../importIcons/delete.png";
import refreshIcon from "../../importIcons/refresh.png";
import { Button } from "@coreui/coreui";
import AddBtn from "../buttons/buttons/AddBtn";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import Pagination from "src/layout/Pagination";
import DownlodBtn from "../buttons/buttons/DownlodBtn";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import "./css/organisation-styles.css";
import { max } from "moment";
import Footer from "src/components/footer/Footer";
import { motion } from "framer-motion";
import InputPopup from "src/components/inputPopup/InputPopup";
import { SearchBtn } from "../buttons/buttons/SearchBtn";
import API_BASE_URL from "src/config/config";

const organization = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [organization, setOrganization] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [allOrganization, setallOrganization] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedOrgName, setSelectedOrgName] = useState("");
  const [useDownload, setUseDownload] = useState(false);
  const [useDelete, setUseDelete] = useState(false);
  const [useAdd, setUseAdd] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  // const [ClientNameToDelete, setClientNameToDelete] = useState("");
  const navigate = useNavigate();
  const checkUsername = localStorage.getItem("username");
  const addBtn = "Client";
  // const [searchName, setSearchName] = useState('');
  // const [searchAlias, setSearchAlias] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPopup, setCurrentPopup] = useState("none");

  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = organization.slice(indexOfFirstItem, indexOfLastItem);
  // let allItems = organization;
  // currentItems = currentItems.reverse();
  const totalPages =
    itemsPerPage > 0
      ? Math.max(1, Math.ceil(organization.length / itemsPerPage))
      : 1;
  console.log("itemsPerPage", itemsPerPage);
  console.log("Organizations", organization.length);
  console.log("totalPages", totalPages);
  console.log("currentPage", currentPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  if (location.pathname == "/organization") {
    localStorage.removeItem("updateBtn");
    localStorage.removeItem("clientname");
    localStorage.removeItem("branchnames");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("isEditing");
    localStorage.removeItem("branchDataforprefill");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("uniquevalue");
  }

  const handleRowDoubleClick = (index) => {
    try {
      const selectedOrg = currentItems[index];
      const alias = selectedOrg.alias;
      const branch = selectedOrg.branches[0].branchname;
      const BranchId = selectedOrg.branches[0].id;
      // const branchId = selectedOrg.
      console.log("Selected organization:", selectedOrg);

      if (!selectedOrg) {
        toast.error("No organisation selected");
        return;
      }

      // Log the search criteria
      console.log("Searching for clientname:", selectedOrg.clientname);
      console.log("Current allOrganization state:", allOrganization);

      // First try to find in currentItems
      if (selectedOrg) {
        console.log(
          "Found in currentItems, proceeding with data:",
          selectedOrg
        );
        prefillData(selectedOrg);
        window.open(
          `/#Editorg?alias=${alias}&branch=${branch}&id=${BranchId}&section=general`,
          "_blank"
        );
        return;
      }

      // Fallback to searching in allOrganization
      const orgData = allOrganization.find(
        (org) => org.clientname === selectedOrg.clientname
      );

      if (orgData) {
        console.log("Found in allOrganization, proceeding with data:", orgData);
        prefillData(orgData);
        window.open("/#Editorg", "_blank");
      } else {
        console.log("Organization not found in either array");
        toast.error("Organization data not found");
      }
    } catch (error) {
      console.error("Error handling row click:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  const renderOverview = async () => {
    try {
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");

      const response = await axios.get(`${API_BASE_URL}/getOrg`, {
        params: {
          orgname: nameoforg,
          orgcode: codeoforg,
        },
      });
      setAllItems(response.data);
      setOrganization(response.data || []);
      console.log("Updated Data:", response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
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
            type: "ORGANIZATION",
          },
        }
      );

      const controlSet = new Set(data.map((item) => item.control));

      setUseDownload(controlSet.has("download-client"));
      setUseDelete(controlSet.has("delete-client"));
      setUseAdd(controlSet.has("add-client"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderOverview(); // Initial data fetch

    const handleStorageChange = (event) => {
      if (event.key === "organizationData") {
        renderOverview(); // Fetch updated data when localStorage changes
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    renderOverview();
    fetchcontrols();
  }, []);
  const prefillData = (orgData) => {
    try {
      console.log("Prefill data received:", orgData);

      if (!orgData) {
        console.error("No organization data provided to prefillData");
        toast.error("Invalid organization data.");
        return;
      }

      // Handle empty branches gracefully
      const branches = orgData.branches || [];
      console.log("Branches data:", branches);

      const firstBranch = branches.length > 0 ? branches[0] : {};
      console.log("First branch:", firstBranch);

      // Store all the data
      const dataToStore = {
        alias: orgData.alias || "",
        organizationbranches: JSON.stringify(branches),
        organizationclientname: orgData.clientname || "",
        firstorgofclient: JSON.stringify(firstBranch),
        updateBtn: true,
        isEditing: true,
        uniquevalue: "OrgButton",
      };

      // Log what we're about to store
      console.log("Data being stored in localStorage:", dataToStore);

      // Store each item
      Object.entries(dataToStore).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      console.log("Data successfully stored in localStorage");
    } catch (error) {
      console.error("Error in prefillData:", error);
      toast.error("Failed to prefill data");
    }
  };

  function removeLocal() {
    toast.success("Create new client now");
    localStorage.setItem("updateBtn", false);
    localStorage.removeItem("clientname");
    localStorage.removeItem("alias");
    localStorage.removeItem("branchname");
    localStorage.removeItem("selectedBranchName");
    localStorage.removeItem("isEditing");
    localStorage.setItem("uniquevalue", "OrgButton");
  }

  const handleSearch = (searchTerm) => {
    const term = searchTerm.trim().toLowerCase();

    if (term !== "") {
      const filtered = allItems.filter((org) => {
        const clientname = org.clientname?.toLowerCase() || "";
        const alias = org.alias?.toLowerCase() || "";
        return clientname.includes(term) || alias.includes(term);
      });

      setOrganization(filtered);
      setCurrentPage(1);
    } else {
      // If search term is empty, show full list
      setOrganization(allItems);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() !== "") {
      handleSearch(value);
    } else {
      renderOverview();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchValue); // Trigger search when Enter is pressed
    }
  };

  const refreshData = async () => {
    renderOverview();
    fetchcontrols();
    setSearchValue("");
    setSelectedRowIndex(null);
    toast.success("Refreshed Successfully");
  };

  useEffect(() => {
    const renderOverviewAll = async () => {
      try {
        const nameoforg = localStorage.getItem("orgname");
        const codeoforg = localStorage.getItem("orgcode");

        const response = await axios.get(`${API_BASE_URL}/getOrgAll`, {
          params: {
            orgname: nameoforg,
            orgcode: codeoforg,
          },
        });
        console.log("allOrganization data:", response.data);
        setallOrganization(response.data);
        console.log;
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    renderOverviewAll();
  }, []);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Organizations");

    // Get the organization name
    const orgName = allOrganization[0].orgname;

    // Add the organization name as a separate row
    worksheet.addRow(["Organization Name : " + orgName]);
    worksheet.getRow(1).font = { bold: true };

    // Add the header row for branch details
    const header = [
      "Client Name",
      "Branch Name",
      "Address",
      "Contact No",
      "Email ID",
      "PAN",
      "GST",
      "IEC",
      "Credit Days",
    ];
    worksheet.addRow(header);
    worksheet.getRow(2).font = { bold: true };

    allOrganization.forEach((org) => {
      worksheet.addRow([
        org.clientname || "N/A",
        org.branchname || "N/A",
        org.address || "N/A",
        org.phone || "N/A",
        org.email || "N/A",
        org.PAN || "N/A",
        org.GST || "N/A",
        org.IEC || "N/A",
        org.creditdays || "N/A",
      ]);
    });

    // Auto-adjust column widths
    header.forEach((column, index) => {
      const columnData = allOrganization.map((org) => {
        // Dynamically access the property based on the header name
        switch (column) {
          case "Client Name":
            return org.clientname || "N/A";
          case "Branch Name":
            return org.branchname || "N/A";
          case "Address":
            return org.address || "N/A";
          case "Contact No":
            return org.phone || "N/A";
          case "Email ID":
            return org.email || "N/A";
          case "PAN":
            return org.PAN || "N/A";
          case "GST":
            return org.GST || "N/A";
          case "IEC":
            return org.IEC || "N/A";
          case "Credit Days":
            return org.creditdays || "N/A";
          default:
            return "N/A";
        }
      });

      // Calculate the maximum length for the column
      const maxLength = Math.max(
        ...columnData.map((item) => String(item).length),
        column.length
      );
      worksheet.getColumn(index + 1).width = maxLength + 2; // Adding extra space
    });

    // Write to file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Organizations.xlsx";
    link.click();
  };

  const exportToPdf = async () => {
    const doc = new jsPDF("p", "pt", "a4"); // Portrait orientation, points, A4 size
    const orgName = allOrganization[0]?.orgname || "Unknown Organization";

    // Add organization name
    doc.setFontSize(10);
    doc.text(`Organization Name: ${orgName}`, 15, 20); // Increased left margin

    // Define the table headers
    const headers = [
      { content: "Client Name", styles: { cellWidth: "auto" } },
      { content: "Branch Name", styles: { cellWidth: "auto" } },
      { content: "Address", styles: { cellWidth: 80 } },
      { content: "Contact No", styles: { cellWidth: "auto" } },
      { content: "Email ID", styles: { cellWidth: 80 } },
      { content: "PAN", styles: { cellWidth: "auto" } },
      { content: "GST", styles: { cellWidth: "auto" } },
      { content: "IEC", styles: { cellWidth: "auto" } },
      { content: "Credit Days", styles: { cellWidth: "auto" } },
    ];

    // Define the table data
    const data = allOrganization.map((org) => [
      org.clientname || "N/A",
      org.branchname || "N/A",
      org.address || "N/A",
      org.phone || "N/A",
      org.email || "N/A",
      org.PAN || "N/A",
      org.GST || "N/A",
      org.IEC || "N/A",
      org.creditdays || "N/A",
    ]);

    doc.setFontSize(10);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 50,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: {
        cellPadding: 3, // Increased padding for better spacing
        fontSize: 8,
        minCellHeight: 10,
        overflow: "linebreak",
      },
      margin: { top: 10, left: 10, right: 10 }, // Adjusted margins for better fit
    });

    doc.save("organizations.pdf");
  };

  const handleDelete = async (e) => {
    // e.preventDefault();
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const clientname = selectedOrgName;
      const employeename = localStorage.getItem("username");

      handleRemark(e, selectedRowIndex);

      if (!clientname || !orgname || !orgcode || !employeename) {
        console.error("Organization name or code is missing");
        return;
      }

      const response = await axios.delete(`${API_BASE_URL}/deleteorg`, {
        params: {
          orgname,
          orgcode,
          clientname,
          employeename,
        },
      });

      if (response.status === 200) {
        const updatedOrg = allOrganization.map((org, index) => {
          if (index === selectedRowIndex) {
            return { ...org, IsDeleted: 1 }; // Mark as deleted
          }
          return org;
        });
        setallOrganization(updatedOrg);
        setOrganization(updatedOrg); // Save displayed organizations

        toast.success("Organization deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete organization.");
    }
    setIsModalOpen(false);
    refreshData();
  };

  const handleRemark = async (e) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/insertRemrkForOrg`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          clientname: selectedOrgName,
          remark: remark,
        }
      );
      console.log("data", response.data);
      if (response.status === 200) {
        console.log("Remark inserted successfully" + remark);
      }
    } catch (error) {
      console.error("Error Remark insert Delete the job:", error);
    }
  };

  const handledeleteOpen = (e, index) => {
    // e.preventDefault();

    const selectedOrg = currentItems[index];

    const jobIndexInAllJobs = organization.findIndex(
      (org) => org.clientname === selectedOrg.clientname
    );
    if (jobIndexInAllJobs !== -1) {
      setSelectedRowIndex(jobIndexInAllJobs);
      setSelectedOrgName(selectedOrg.clientname);
      // setIsModalOpen(true);
      setCurrentPopup("Deletion");
    }
  };

  const handleModalClose = () => {
    setRemark("");
    setIsModalOpen(false);
  };

  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <div className="IMPORTPaginationAlignment" style={{ height: "80vh" }}>
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
      >
        <CRow>
          <CCardBody className="button-div">
            <div
              className="refreshjob-button "
              style={{ transform: "translateX(24px)" }}
            >
              <Link type="submit" onClick={refreshData} className="link-btn">
                <RefreshBtn />
              </Link>
            </div>
            <div className="page-title">
              <h4>Organization</h4>
            </div>
            {(checkUsername === "admin" || useAdd) && (
              <div
                className="createjob-button"
                style={{ transform: "translateX(-9px)" }}
              >
                <Link
                  onClick={removeLocal}
                  to={"/Createorg"}
                  target="_blank"
                  className="link-btn"
                >
                  <AddBtn addBtn={addBtn} />
                </Link>
              </div>
            )}
            {(checkUsername === "admin" || useDownload) && (
              <div
                className="downloadjob-button"
                style={{ transform: "translateX(-9px)" }}
              >
                <Link onClick={exportToExcel} className="link-btn">
                  <DownlodBtn />
                  <span className="visually-hidden">Download file</span>
                </Link>
              </div>
            )}
          </CCardBody>

          <CCol xs={12}>
            {/* <CCard className="mb-2 container-div"> */}
            <div className="mb-2 container-div">
              <div className="search-box">
                <CCardBody>
                  <input
                    type="text"
                    placeholder="Search Client"
                    className="text-field"
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                  />
                </CCardBody>
                <div style={{ marginRight: "28px", marginBottom: "4px" }}>
                  <SearchBtn />
                </div>
              </div>
            </div>
            {/* </CCard> */}
            {/* <CCard> */}
            <CCardBody>
              <CForm id="table-container-org">
                <div
                  style={{
                    overflowX: "auto",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <table className="table-wf">
                    <thead>
                      <tr className="head-wf">
                        <th className="row-font org-name-col-width">Name</th>
                        <th className="row-font org-alias-col-width">Alias</th>
                        <th className="row-font org-servicetype-col-width">
                          Service Type
                        </th>
                        <th className="row-font org-entitytype-col-width">
                          Entity Type
                        </th>
                        {(checkUsername === "admin" || useDelete) && (
                          <th className="row-font org-actions-col-width">
                            Actions
                          </th>
                        )}
                        <th className="row-font org-actions-col-width">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="body-wf">
                      {currentItems ? (
                        currentItems.map((org, index) => (
                          <tr
                            key={index}
                            style={{
                              backgroundColor:
                                org.isDeleted === 1
                                  ? theme === "dark"
                                    ? "rgb(123 50 50)"
                                    : "#f8d7da" // Override for deleted rows
                                  : theme === "dark"
                                  ? index % 2 === 0
                                    ? "#3B5472" // Dark mode even row
                                    : "#263A52" // Dark mode odd row
                                  : index % 2 === 0
                                  ? "#D8F0FD" // Light mode even row
                                  : "#F6FCFF", // Light mode odd row
                              cursor:
                                org.isDeleted === 1 ? "not-allowed" : "default",
                              color:
                                org.isDeleted === 1 ? "not-allowed" : "default",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={() =>
                              org.isDeleted !== 1 && setSelectedRowIndex(index)
                            }
                            onDoubleClick={() =>
                              org.isDeleted !== 1 && handleRowDoubleClick(index)
                            }
                            className={`selected-row ${
                              org.isDeleted !== 0
                                ? "deleted-selected"
                                : selectedRowIndex === index
                                ? "primary-selected"
                                : ""
                            }`}
                          >
                            <td
                              className="td-wf"
                              style={{
                                color:
                                  org.isDeleted === 1
                                    ? theme === "dark"
                                      ? "#f8d7da"
                                      : "#ce2020"
                                    : "var(--page-title)",
                              }}
                            >
                              {org.clientname}
                            </td>
                            <td
                              className="td-wf"
                              style={{
                                color:
                                  org.isDeleted === 1
                                    ? theme === "dark"
                                      ? "#f8d7da"
                                      : "#ce2020"
                                    : "var(--page-title)",
                              }}
                            >
                              {org.alias}
                            </td>
                            <td
                              className="td-wf"
                              style={{
                                color:
                                  org.isDeleted === 1
                                    ? theme === "dark"
                                      ? "#f8d7da"
                                      : "#ce2020"
                                    : "var(--page-title)",
                              }}
                            >
                              {org.orgganizationTypeOptions &&
                              org.orgganizationTypeOptions.length > 0
                                ? org.orgganizationTypeOptions.join(", ")
                                : "N/A"}
                            </td>
                            <td
                              className="td-wf"
                              style={{
                                color:
                                  org.isDeleted === 1
                                    ? theme === "dark"
                                      ? "#f8d7da"
                                      : "#ce2020"
                                    : "var(--page-title)",
                              }}
                            >
                              {org.checkedBoxOptions &&
                              org.checkedBoxOptions.length > 0
                                ? org.checkedBoxOptions.join(", ")
                                : "N/A"}
                            </td>
                            {(checkUsername === "admin" || useDelete) && (
                              <td className="td-wf">
                                <div
                                  onClick={(e) =>
                                    org.isDeleted !== 1 &&
                                    handledeleteOpen(e, index)
                                  }
                                  style={
                                    org.isDeleted === 1
                                      ? {
                                          backgroundColor: "transparent",
                                          cursor: "not-allowed",
                                        }
                                      : {}
                                  }
                                >
                                  <DeleteBtn
                                    fill={
                                      org.isDeleted === 1
                                        ? theme === "dark"
                                          ? "#f8d7da"
                                          : "#ce2020"
                                        : "var(--page-title)"
                                    }
                                  />
                                </div>
                              </td>
                            )}
                            <td
                              className="td-wf"
                              style={{
                                color:
                                  org.isDeleted === 1
                                    ? theme === "dark"
                                      ? "#f8d7da"
                                      : "#ce2020"
                                    : "var(--page-title)",
                              }}
                            >
                              {org.isDeleted === 1 ? "Deleted" : "Active"}
                            </td>
                          </tr>
                        ))
                      ) : organization ? (
                        <tr>
                          <td
                            colSpan="6"
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            No data found
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            Loading data...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {currentPopup === "Deletion" && (
                  <InputPopup
                    title={"Delete Organization"}
                    setCurrentPopup={setCurrentPopup}
                    fields={contactFields}
                    value={remark}
                    setValue={setRemark}
                    handleAdd={handleDelete}
                    firstButtonText={"Delete"}
                    secondButtonText={"Close"}
                    width={"450px"}
                    selection={"none"}
                    top={"50%"}
                    left={"50%"}
                  />
                )}
                <CModal
                  visible={isModalOpen}
                  onClose={handleModalClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <CModalHeader>
                    <CModalTitle>Delete Confirmation</CModalTitle>
                  </CModalHeader>
                  <CModalBody
                  // onClick={(e) => {
                  //   if (e.target.tagName !== "INPUT") {
                  //     e.stopPropagation();
                  //   }
                  // }}
                  >
                    <p>Are you sure you want to delete {selectedOrgName}</p>
                    <CFormInput
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      placeholder="Enter reason for deletion "
                      rows="2"
                    />
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      color="danger"
                      onClick={handleDelete}
                      disabled={remark === ""}
                    >
                      Yes, Delete
                    </CButton>
                    <CButton color="secondary" onClick={handleModalClose}>
                      No
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CForm>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </motion.div>

      <div
        className="IMPORTpagination"
        // style={{ position: "absolute", bottom: "-8px", left: "40%", zIndex: "2" }}
      >
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      {/* <div style={{ position: "fixed", bottom: "0px", right: "0px" }}>
        <Footer />
      </div> */}
    </div>
  );
};

export default organization;
