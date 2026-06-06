import React, { useEffect, useState, useRef } from "react";
import JobDataPopup from "src/components/inputPopup/JobDataPopup";
import { motion } from "framer-motion";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import CustomColorBtn from "src/views/buttons/buttons/CustomColorBtn";

import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CCard,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CBadge,
  CNav,
  CNavItem,
  CNavLink,
  CCardBody,
} from "@coreui/react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { getYear, getMonth } from "date-fns";
import RefreshBtn from "../../buttons/buttons/RefreshBtn";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "src/layout/Pagination";
// import { all } from "core-js/fn/promise";
import ExcelJS from "exceljs";
import autoTable from "jspdf-autotable";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import "../css/approvals.css";
import { jsPDF } from "jspdf";
import Calendar from "src/components/Calendar";

import refreshIcon from "../../../importIcons/refresh.png";
import DownlodBtn from "../../buttons/buttons/DownlodBtn";
import API_BASE_URL from "src/config/config";

const range = (start, end, step = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

const OrgApproval = () => {
  const [allorg, setallorg] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [latestOrg, setlatestOrg] = useState([]);
  const [approvalname, setapprovalname] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null); // State to store selected organization
  const [approvedOrgs, setapprovedOrgs] = useState([]);
  const uniquevalue = "OrgButton";
  const location = useLocation();
  const { state } = location;
  const [selectedMode, setselectedMode] = useState("");
  const [createdBySearchValue, setCreatedBySearchValue] = useState("");
  const navigate = useNavigate();
  const [isshown, setIsShown] = useState(["organization"]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(""); // State for selected status

  const [dateRangeOption, setDateRangeOption] = useState("");
  const [filteredOrg, setFilteredOrg] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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

  const datePickerRefStart = useRef();
  const datePickerRefEnd = useRef();
  const datePickerRef = useRef();

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

  const columns = ["Date", "Task Name", "Created BY", "Actions", "Remarks"];

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
        break;
      default:
        setStartDate(null);
        setEndDate(null);
    }
    setDateRangeOption(option);
  };

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setDateRangeOption("");
  };
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangeOption("");
    if (datePickerRefStart.current) datePickerRefStart.current.setFocus();
    if (datePickerRefEnd.current) datePickerRefEnd.current.setFocus();
  };
  useEffect(() => {
    setSelectedOrg(state);
  }, []);

  const fetchlatestOrg = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getlatestorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      console.log(response.data);
      setlatestOrg(response.data);
      setOriginalLatestOrg(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApproverThatHaveUniqueValue = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getapproverthathaveuniquevalue`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            uniquevalue: uniquevalue,
          },
        }
      );
      setapprovalname(response.data);
      // Check if approvers exist, if not, bypass approval and directly add the org
      if (response.data.length === 0) {
        // Assuming 'latestOrg' contains the new organization data
        if (latestOrg.length > 0) {
          const newOrg = latestOrg[0]; // Get the first (and likely only) new org
          await autoApproveOrganization(orgData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const autoApproveOrganization = async (orgData) => {
    try {
      // Simulate auto-approval by calling the existing approval endpoint with a specific status
      const response = await axios.put(
        `${API_BASE_URL}/approveOrganization`,
        {
          orgId: orgData.id,
          updatedFields: orgData,
          approval: {
            username: localStorage.getItem("username"),
            status: "Auto-Approved", // or any status that indicates auto-approval
          },
        }
      );

      toast.success("Organization auto-approved successfully (no approver).");

      // Remove the organization from latestOrg
      setlatestOrg(
        latestOrg.filter((org) => org.clientname !== orgData.clientname)
      );

      // Refresh the organizations list
      getOrganizations();
    } catch (error) {
      console.error("Error auto-approving organization:", error);
      toast.error("Failed to auto-approve organization.");
    }
  };

  async function checker() {
    try {
      const response = await axios.get(`${API_BASE_URL}/getapprovedorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchnameofemp: localStorage.getItem("branchnameofemp"),
          branchcodeofemp: localStorage.getItem("branchcodeofemp"),
          uniquevalue: uniquevalue,
        },
      });

      const data = response.data.map((org) => {
        const remark = org.remark;
        return { ...org, remark };
      });

      setapprovedOrgs(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getOrganizations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setallorg(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchlatestOrg(); // Fetch latest organizations first
        await fetchApproverThatHaveUniqueValue(); // Then fetch approvers, which will handle adding the org if no approvers are found
        await checker(); // Check approved orgs
        await getOrganizations(); // Get all orgs
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openModal = (org) => {
    setSelectedOrg(org);
  };

  const closeModal = () => {
    setSelectedOrg(null);
  };

  const handleInputChange = (e, field) => {
    setSelectedOrg({
      ...selectedOrg,
      [field]: e.target.value,
    });
  };

  const approveOrganization = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/approveOrganization`,
        {
          orgId: selectedOrg.id,
          updatedFields: selectedOrg,
          approval: {
            username: localStorage.getItem("username"),
            status: "Approve",
          },
        }
      );

      toast.success("Organization approved successfully");
      fetchlatestOrg();
      getOrganizations();
      fetchApproverThatHaveUniqueValue();
      closeModal();
      checker();
      const updatedLatestOrg = latestOrg.filter(
        (org) => org.clientname !== selectedOrg.clientname
      );
      setlatestOrg(updatedLatestOrg);
      // navigate(location.pathname, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve organization");
    }
  };

  const rejectOrg = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/approveOrganization`,
        {
          orgId: selectedOrg.id,
          updatedFields: selectedOrg,
          approval: {
            username: localStorage.getItem("username"),
            status: "Reject",
          },
        }
      );
      toast.success("Organization rejected successfully");
      fetchlatestOrg();
      getOrganizations();
      fetchApproverThatHaveUniqueValue();
      closeModal();
      checker();

      const updatedLatestOrg = latestOrg.filter(
        (org) => org.clientname !== selectedOrg.clientname
      );
      setlatestOrg(updatedLatestOrg);
      // navigate(location.pathname, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Reject organization");
    }
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterOrganizations(status);
  };
  useEffect(() => {
    navigate("/approverlog", { state: null });
  }, []);

  function reverse(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const updateLatestOrg = () => {
    checker();
  };
  const sortedLatestOrg = [...latestOrg].sort((a, b) => {
    const dateA = new Date(a.createdon);
    const dateB = new Date(b.createdon);
    return dateB - dateA; // Sort in descending order
  });
  const indexofLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;

  const currentItems = filteredOrg.slice(indexOfFirstItem, indexofLastItem);
  const totalPages = Math.ceil(filteredOrg.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [originalLatestOrg, setOriginalLatestOrg] = useState([]);

  const refreshData = () => {
    fetchlatestOrg();
    getOrganizations();
    fetchApproverThatHaveUniqueValue();
    setSearchValue("");
    setSelectedStatus("");
    toast.success("Refreshed Successfully");
  };

  const handleSearch = (searchTerm) => {
    const term = searchTerm.trim().toLowerCase();
    if (term !== "") {
      const filteredOrg = originalLatestOrg.filter((org) => {
        const clientname = org.clientname.toLowerCase();
        return clientname.includes(term);
      });

      setlatestOrg(filteredOrg);
    } else {
      setlatestOrg(originalLatestOrg); // Reset to original data when search is empty
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
    filterOrganizations();
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Organizations");

    // Get the organization name
    const orgName = latestOrg[0].orgname;

    // Add the organization name as a separate row
    worksheet.addRow(["Organization Name: " + orgName]);
    worksheet.getRow(1).font = { bold: true };

    // Add the header row for branch details
    const header = [
      "Task Name",
      "Created By",
      "Actions",
      "Date",
      "Phone",
      "Email ID",
      "PAN",
      "GST",
      "IEC",
      "Credit Days",
      "Deleted By",
      "Remark",
    ];
    worksheet.addRow(header);
    worksheet.getRow(2).font = { bold: true };

    latestOrg.forEach((org) => {
      let actions = org.approval;

      // Check if actions is a string that needs to be parsed
      if (typeof actions === "string") {
        try {
          actions = JSON.parse(actions);
        } catch (e) {
          console.error("Error parsing actions:", e);
          actions = []; // Fallback to empty array if parsing fails
        }
      }

      // If actions is already an object, ensure it is an array
      if (!Array.isArray(actions)) {
        actions = []; // Fallback to empty array if not an array
      }

      // Format the actions
      const formattedActions = actions
        .map((action, index) => {
          return ` Status ${index + 1}: ${action.status}\n By ${index + 1}: ${
            action.username
          } |`;
        })
        .join("\n");

      worksheet.addRow([
        org.clientname || "N/A",
        org.username || "N/A",
        formattedActions || "N/A", // Use formatted actions
        org.createdon || "N/A",
        org.phone || "N/A",
        org.email || "N/A",
        org.PAN || "N/A",
        org.GST || "N/A",
        org.IEC || "N/A",
        org.creditdays || "N/A",
        org.deletedby || "N/A",
        org.remark || "N/A",
      ]);
    });

    // Auto-adjust column widths
    header.forEach((column, index) => {
      const columnData = latestOrg.map((org) => {
        let actions = org.approval;

        // Same checks as above
        if (typeof actions === "string") {
          try {
            actions = JSON.parse(actions);
          } catch (e) {
            actions = [];
          }
        }

        if (!Array.isArray(actions)) {
          actions = [];
        }

        return (
          actions
            .map(
              (action, index) =>
                `Status ${index + 1}: ${action.status}\nApprover ${
                  index + 1
                }: ${action.username}`
            )
            .join("\n") || "N/A"
        );
      });

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
    link.download = "OrgApproval.xlsx";
    link.click();
  };

  const exportToPdf = async () => {
    const doc = new jsPDF("p", "pt", "a4"); // Portrait orientation, points, A4 size
    const orgName = latestOrg[0]?.orgname || "Unknown Organization";

    // Add organization name
    doc.setFontSize(10);
    doc.text(`Organization Name: ${orgName}`, 15, 20); // Increased left margin

    // Define the table headers
    const headers = [
      { content: "Client Name", styles: { cellWidth: "auto" } },
      { content: "User Name", styles: { cellWidth: "auto" } },
      { content: "Actions", styles: { cellWidth: "auto" } },
      { content: "Created On", styles: { cellWidth: 80 } },
      { content: "Contact No", styles: { cellWidth: "auto" } },
      { content: "Email ID", styles: { cellWidth: 80 } },
      { content: "PAN", styles: { cellWidth: "auto" } },
      { content: "GST", styles: { cellWidth: "auto" } },
      { content: "IEC", styles: { cellWidth: "auto" } },
      { content: "Credit Days", styles: { cellWidth: "auto" } },
      { content: "Deleted By", styles: { cellWidth: "auto" } },
      { content: "Remark", styles: { cellWidth: "auto" } },
    ];

    // Define the table data
    const data = latestOrg.map((org) => {
      let actions = org.approval;

      // Check if actions is a string that needs to be parsed
      if (typeof actions === "string") {
        try {
          actions = JSON.parse(actions);
        } catch (e) {
          console.error("Error parsing actions:", e);
          actions = []; // Fallback to empty array if parsing fails
        }
      }

      // If actions is already an object, ensure it is an array
      if (!Array.isArray(actions)) {
        actions = []; // Fallback to empty array if not an array
      }

      // Format the actions for PDF
      const formattedActions = actions
        .map((action, index) => {
          return `Status ${index + 1}: ${action.status}\nBy ${index + 1}: ${
            action.username
          }`;
        })
        .join("\n");

      return [
        org.clientname || "N/A",
        org.username || "N/A",
        formattedActions || "N/A", // Use formatted actions
        org.createdon || "N/A",
        org.phone || "N/A",
        org.email || "N/A",
        org.PAN || "N/A",
        org.GST || "N/A",
        org.IEC || "N/A",
        org.creditdays || "N/A",
        org.deletedby || "N/A",
        org.remark || "N/A",
      ];
    });

    // Set font size for table
    doc.setFontSize(10);

    // Set up the table in the PDF
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

    // Save the PDF
    doc.save("OrgApproval.pdf");
  };

  // Define the filterOrganizations function
  const filterOrganizations = () => {
    const filtered = latestOrg.filter((org) => {
      const orgDate = new Date(org.createdon);
      const isWithinDateRange =
        (!startDate && !endDate) ||
        (startDate && endDate && orgDate >= startDate && orgDate <= endDate);

      const matchesSearch = org.clientname
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesCreator = org.username
        .toLowerCase()
        .includes(createdBySearchValue.toLowerCase());

      const matchesStatus =
        selectedStatus === "Deleted"
          ? org.IsDeleted === 1
          : selectedStatus === "Approved"
          ? allorg?.some(
              (approvedOrg) => approvedOrg.clientname === org.clientname
            )
          : selectedStatus === "Pending"
          ? !allorg.some(
              (approvedOrgs) => approvedOrgs.clientname === org.clientname
            ) &&
            org.IsDeleted !== 1 &&
            !org.approval?.some((approval) => approval.status === "Reject")
          : selectedStatus === "Rejected"
          ? org.approval?.some((approval) => approval.status === "Reject")
          : selectedStatus === "All"
          ? true
          : true;

      return (
        isWithinDateRange && matchesSearch && matchesCreator && matchesStatus
      );
    });
    const sortedFiltered = filtered.sort((a, b) =>
      moment(b.createdon).diff(moment(a.createdon))
    );

    setFilteredOrg(sortedFiltered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterOrganizations(); // Call filterOrganizations whenever relevant state changes
  }, [
    latestOrg,
    startDate,
    endDate,
    searchValue,
    createdBySearchValue,
    selectedStatus,
  ]);
  const handleDateSelect = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);

    console.log('startDate test -> ', startDate);
    console.log('endDate test -> ', endDate);
    
    // Add any additional logic for filtering or processing
  };
  const handleRestoreJob = async (clientname) => {
    try {
      await axios.put(`${API_BASE_URL}/restoreOrg`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        clientname: clientname,
      });
      toast.success("Job restored successfully");
      checker();
      navigate("/organization");
    } catch (error) {
      console.error("Error restoring job:", error);
    }
  };
  return (
    <div
      className="PaginationAlignmentOrg"
      style={{
        height: "100%",
        paddingTop: "4px !important",
        position: "relative",
        top: "68px",
      }}
    >
      <div>
        <CCardBody style={{ height: "67vh" }}>
          <div style={{ position: "relative", top: "-15px" }}>
            <section
              className="orgApprovalHeader mt-2 mb-3"
              style={{
                position: "fixed",
                top: "68px",
                zIndex: "4",
                width: "77.9%",
              }}
            >
              <div style={{ transform: "translate(10px, 4px)" }}>
                <Link type="submit" onClick={refreshData} className="link-btn">
                  <RefreshBtn />
                </Link>
              </div>

              <div style={{ transform: "translate(11px, 7px)" }}>
                <Link onClick={exportToExcel} className="link-btn">
                  <DownlodBtn />
                </Link>
              </div>
            </section>
            <motion.div
              initial={{ opacity: 0 }} // Starts faded & moves up
              animate={{ opacity: 1 }} // Becomes fully visible
              exit={{ opacity: 0 }} // Fades out & moves up
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            >
              <CCol xs={12}>
                {/* <CCard
                  className="mb-2 org-container-div px-0"
                  style={{ justifyContent: "t", border: "0px" }}
                > */}
                <div
                  className="grid-container-approval-new"
                  // style={{ gap: "0px 130px" }}
                >
                  <div className="approvelog-date-picker-wrapper">
                    <label
                      className="new-date-label-approval"
                      style={{ fontSize: "12px", margin: "-1px" }}
                    >
                      Date :
                    </label>

                    <Calendar onDateSelect={handleDateSelect} />
                  </div>
                  <div className="grid-container-taskname">
                    <label
                      htmlFor="Job Date"
                      className="approvals-text-field-3"
                      style={{ fontSize: "12px" }}
                    >
                      Task Name :
                    </label>
                    {/* <input
                      type="text"
                      placeholder=""
                      className="text-field-4"
                      style={{ height: "22px" }}
                      onChange={(e) => setSearchValue(e.target.value)}
                    /> */}
                    <NewInput
                      width={"150px"}
                      setSelectedValue={setSearchValue}
                      type={"text"}
                      placeholder={"Task Name"}
                    />
                  </div>
                  <div className="grid-container-createdby ">
                    <label
                      htmlFor="Job Date"
                      className="approvals-text-field-3"
                      style={{ fontSize: "12px" }}
                    >
                      Created By :
                    </label>
                    {/* <input
                      type="text"
                      placeholder=""
                      style={{ height: "22px" }}
                      className="text-field-4"
                      onChange={(e) => setCreatedBySearchValue(e.target.value)}

                      // onChange={(e) => setimportername(e.target.value)}
                    /> */}
                    <NewInput
                      width={"150px"}
                      setSelectedValue={setCreatedBySearchValue}
                      type={"text"}
                      placeholder={"Created By"}
                    />
                  </div>

                  <div className="grid-container-approvals-org  ">
                    <label
                      htmlFor="Mode"
                      className="approvals-text-field-3"
                      style={{ fontSize: "12px" }}
                    >
                      Actions :
                    </label>
                    <div className="approvals-input-field">
                      <NewDropdownInput
                        type="type1"
                        placeholder={"All"}
                        options={[
                          { value: "All", label: "All" },
                          { value: "Approved", label: "Approved" },
                          { value: "Deleted", label: "Deleted" },
                          { value: "Pending", label: "Pending" },
                          { value: "Rejected", label: "Rejected" },
                        ]}
                        selectedValue={selectedStatus}
                        setSelectedValue={handleStatusChange}
                        width={"140px"}
                      />
                    </div>
                  </div>
                </div>
                {/* </CCard> */}
              </CCol>

              <table className="table-wf">
                <thead>
                  <tr className="head-wf" style={{ height: "22px" }}>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "12%",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "22%",
                      }}
                    >
                      Task Name
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "22%",
                      }}
                    >
                      Created By
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "22%",
                      }}
                    >
                      Actions
                    </th>
                    {localStorage.getItem("username") === "admin" ? (
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "22%",
                        }}
                      >
                        Remarks
                      </th>
                    ) : null}
                  </tr>
                </thead>

                <tbody className="body-wf">
                  {localStorage.getItem("username") !== "admin" ? (
                    approvalname?.some(
                      (item) =>
                        item.employeename === localStorage.getItem("username")
                    ) ? (
                      currentItems &&
                      currentItems
                        //  .reverse()
                        .map((org, index) => {
                          const isPresent = allorg?.some(
                            (approvedOrg) =>
                              approvedOrg.clientname === org.clientname
                          );

                          // Check if the current user has approved the organization
                          const hasApproved = org.approval?.some(
                            (approval) =>
                              approval.username ===
                                localStorage.getItem("username") &&
                              approval.status === "Approve"
                          );

                          // Check if the organization was rejected and by whom
                          const ApprovedBy = org.approval?.find(
                            (approval) => approval.status === "Approve"
                          );

                          // Check if the organization was rejected and by whom
                          const rejection = org.approval?.find(
                            (approval) => approval.status === "Reject"
                          );

                          const status =
                            org.IsDeleted === 1
                              ? `Deleted By ${org.deletedby}`
                              : hasApproved
                              ? "Approved by you"
                              : isPresent
                              ? `Approved by ${ApprovedBy?.username}`
                              : rejection
                              ? `Rejected by ${rejection?.username}`
                              : "Pending";

                          return (
                            <tr key={index}>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#D8F0FD" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                }}
                              >
                                {reverse(org.createdon)}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#D8F0FD" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                }}
                              >
                                {org.clientname}
                              </td>
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#D8F0FD" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                }}
                              >
                                {org.username}
                              </td>
                              {/* <td>{status}</td> */}
                              <td
                                style={{
                                  backgroundColor:
                                    theme === "dark"
                                      ? index % 2 === 0
                                        ? "#3B5472" // Dark mode even row
                                        : "#263A52" // Dark mode odd row
                                      : index % 2 === 0
                                      ? "#D8F0FD" // Light mode even row
                                      : "#F6FCFF", // Light mode odd row

                                  transition: "background-color 0.3s ease",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                {status === "Pending" ? (
                                  <CPopover
                                    content="Show Details of Organization"
                                    trigger={["hover", "focus"]}
                                  >
                                    <div
                                      onClick={() => openModal(org)}
                                      style={{ width: "fit-content" }}
                                    >
                                      <CustomColorBtn
                                        text={" Show More"}
                                        bgcolorlight={"#38b700"}
                                        bgcolordark={"#5abd2d"}
                                        height={"28px"}
                                      />
                                    </div>
                                  </CPopover>
                                ) : (
                                  <span>{status}</span> // Display the status
                                )}
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <p>You do not have permission for approval.</p>
                    )
                  ) : (
                    currentItems &&
                    currentItems
                      // .reverse()
                      .map((org, index) => {
                        const isPresent = allorg?.some(
                          (row) => row.clientname === org.clientname
                        );

                        // Check if the organization was rejected and by whom
                        const rejection = org.approval?.find(
                          (item) => item.status === "Reject"
                        );

                        const status =
                          org.IsDeleted === 1
                            ? `Deleted By ${org.deletedby}`
                            : isPresent
                            ? "Approved"
                            : rejection
                            ? `Rejected by ${rejection.username}`
                            : "Pending";

                        return (
                          <tr
                            key={index}
                            style={{
                              height: "28px",
                              fontSize: "12px",
                              backgroundColor: "white",
                            }}
                          >
                            <td
                              style={{
                                backgroundColor:
                                  theme === "dark"
                                    ? index % 2 === 0
                                      ? "#3B5472" // Dark mode even row
                                      : "#263A52" // Dark mode odd row
                                    : index % 2 === 0
                                    ? "#D8F0FD" // Light mode even row
                                    : "#F6FCFF", // Light mode odd row

                                transition: "background-color 0.3s ease",
                              }}
                            >
                              {reverse(org.createdon)}
                            </td>
                            <td
                              style={{
                                backgroundColor:
                                  theme === "dark"
                                    ? index % 2 === 0
                                      ? "#3B5472" // Dark mode even row
                                      : "#263A52" // Dark mode odd row
                                    : index % 2 === 0
                                    ? "#D8F0FD" // Light mode even row
                                    : "#F6FCFF", // Light mode odd row

                                transition: "background-color 0.3s ease",
                              }}
                            >
                              {org.clientname}
                            </td>
                            <td
                              style={{
                                backgroundColor:
                                  theme === "dark"
                                    ? index % 2 === 0
                                      ? "#3B5472" // Dark mode even row
                                      : "#263A52" // Dark mode odd row
                                    : index % 2 === 0
                                    ? "#D8F0FD" // Light mode even row
                                    : "#F6FCFF", // Light mode odd row

                                transition: "background-color 0.3s ease",
                              }}
                            >
                              {org.username}
                            </td>
                            <td
                              style={{
                                backgroundColor:
                                  theme === "dark"
                                    ? index % 2 === 0
                                      ? "#3B5472" // Dark mode even row
                                      : "#263A52" // Dark mode odd row
                                    : index % 2 === 0
                                    ? "#D8F0FD" // Light mode even row
                                    : "#F6FCFF", // Light mode odd row

                                transition: "background-color 0.3s ease",
                              }}
                            >
                              {status}
                            </td>
                            <td
                              style={{
                                backgroundColor:
                                  theme === "dark"
                                    ? index % 2 === 0
                                      ? "#3B5472" // Dark mode even row
                                      : "#263A52" // Dark mode odd row
                                    : index % 2 === 0
                                    ? "#D8F0FD" // Light mode even row
                                    : "#F6FCFF", // Light mode odd row

                                transition: "background-color 0.3s ease",
                              }}
                            >
                              {org.remark}
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </motion.div>
          </div>
        </CCardBody>

        {/* <CModal
          visible={selectedOrg !== null}
          onClose={closeModal}
          aria-labelledby="LiveDemoExampleLabel"
          size="lg"
        >
          <CModalHeader onClose={closeModal}>
            <CModalTitle id="LiveDemoExampleLabel">All Data</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {selectedOrg && (
              <>
                <div className="orgapprovalmodal">
                  <CModalTitle className="modaltitleorgapproval">
                    Organization Details
                  </CModalTitle>

                  <label>Organization Name</label>
                  <input
                    type="text"
                    value={selectedOrg.clientname}
                    onChange={(e) => handleInputChange(e, "clientname")}
                  />

                  <label className="branchnameorgapprovalmodal">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    value={selectedOrg.branchname}
                    onChange={(e) => handleInputChange(e, "branchname")}
                  />
                </div>

                <div>
                  <CModalTitle className="modaltitleorgapproval">
                    Address Details
                  </CModalTitle>
                  <label className="addresslabeltorgapprovalmodal">
                    Address
                  </label>
                  <input
                    className="addressinputorgapprovalmodal"
                    type="text"
                    value={selectedOrg.address}
                    onChange={(e) => handleInputChange(e, "address")}
                  />
                </div>
                <div className="orgapprovalmodal-1">
                  <label className="addresslabelorgapprovalmodal">City</label>
                  <input
                    type="text"
                    value={selectedOrg.city}
                    onChange={(e) => handleInputChange(e, "city")}
                  />

                  <label className="addresslabelorgapprovalmodal-1">
                    State
                  </label>
                  <input
                    className="addresslabelorgapprovalmodal-2"
                    type="text"
                    value={selectedOrg.state}
                    onChange={(e) => handleInputChange(e, "state")}
                  />
                </div>
                <div className="orgapprovalmodal-1">
                  <label className="addresslabelorgapprovalmodal">
                    Country
                  </label>
                  <input
                    className="addresslabelorgapprovalmodal-2"
                    type="text"
                    value={selectedOrg.country}
                    onChange={(e) => handleInputChange(e, "country")}
                  />

                  <label className="addresslabelorgapprovalmodal-1">
                    PostalCode
                  </label>
                  <input
                    className="addresslabelorgapprovalmodal-2"
                    type="text"
                    value={selectedOrg.postalcode}
                    onChange={(e) => handleInputChange(e, "postalcode")}
                  />
                </div>

                <CModalTitle className="modaltitleorgapproval">
                  Registration Details
                </CModalTitle>
                <div className="registrationorgarpproval">
                  <label>
                    <h6>GST</h6>
                  </label>
                  <input
                    type="text"
                    value={selectedOrg.GST}
                    onChange={(e) => handleInputChange(e, "GST")}
                  />

                  <label className="registrationorgarpproval-1">
                    <h6>IEC</h6>
                  </label>
                  <input
                    type="text"
                    value={selectedOrg.IEC}
                    onChange={(e) => handleInputChange(e, "IEC")}
                  />

                  <label className="registrationorgarpproval-1">
                    <h6>PAN</h6>
                  </label>
                  <input
                    type="text"
                    value={selectedOrg.PAN}
                    onChange={(e) => handleInputChange(e, "PAN")}
                  />
                </div>

                <div>
                  <CModalTitle className="modaltitleorgapproval">
                    Account Details
                  </CModalTitle>

                  <label className="accountorgapproval">
                    <h6>Credit Days</h6>
                  </label>
                  <input
                    type="text"
                    value={selectedOrg.creditdays}
                    onChange={(e) => handleInputChange(e, "creditdays")}
                  />
                </div>

                <CModalTitle className="modaltitleorgapproval">
                  Contact Details
                </CModalTitle>
                <div>
                  <label className="contactorgapprovalmodal">
                    <h6>Phone</h6>
                  </label>
                  <input
                    className="contactorgapprovalmodal"
                    type="text"
                    value={selectedOrg.phone}
                    onChange={(e) => handleInputChange(e, "phone")}
                  />

                  <label>
                    <h6>Email</h6>
                  </label>
                  <input
                    className="contactorgapprovalmodal-1"
                    type="text"
                    value={selectedOrg.email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </div>
                <div>
                  <CModalTitle className="modaltitleorgapproval">
                    Created By
                  </CModalTitle>
                  <label>
                    <h6>Username</h6>
                  </label>
                  <input
                    className="contactorgapprovalmodal-1"
                    type="text"
                    value={selectedOrg.username}
                    onChange={(e) => handleInputChange(e, "username")}
                  />
                </div>
              </>
            )}
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={closeModal}>
              Close
            </CButton>
            <CButton color="primary" onClick={approveOrganization}>
              Approve
            </CButton>
            <CButton color="danger" onClick={rejectOrg}>
              Reject
            </CButton>
          </CModalFooter>
        </CModal> */}
      </div>

      <JobDataPopup
        selectedJob={selectedOrg}
        setSelectedJob={setSelectedOrg}
        onApprove={approveOrganization}
        onReject={rejectOrg}
        type={"org"}
        preTitleText="Request For Organization "
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default OrgApproval;
