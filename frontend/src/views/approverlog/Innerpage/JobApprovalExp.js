import React, { useEffect, useState, useRef } from "react";
import CustomColorBtn from "src/views/buttons/buttons/CustomColorBtn";
import JobDataPopup from "src/components/inputPopup/JobDataPopup";
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CPagination,
  CPaginationItem,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCardBody,
  CCol,
  CCard,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
  CPopover,
} from "@coreui/react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../../css/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "src/layout/Pagination";
import refreshIcon from "../../../importIcons/refresh.png";
import ExcelJS from "exceljs";
import autoTable from "jspdf-autotable";
import Calendar from "src/components/Calendar";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";

import DownlodBtn from "../../buttons/buttons/DownlodBtn";
import RefreshBtn from "../../buttons/buttons/RefreshBtn";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { getYear, getMonth } from "date-fns";
import API_BASE_URL from "src/config/config";

const range = (start, end, step = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

const JobApprovalExp = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [latestJobs, setLatestJobs] = useState([]);
  const [approvalName, setApprovalName] = useState([]);
  const uniqueValue = "ExpJobButton";
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [approvedJobs, setapprovedJobs] = useState([]);
  const [alljobsexp, setalljobsexp] = useState([]);
  const [createdBySearchValue, setCreatedBySearchValue] = useState("");
  const [searchValueByJobNo, setSearchValueByJobNo] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // State for selected status

  const [dateRangeOption, setDateRangeOption] = useState("");
  const [filteredJob, setFilteredJob] = useState([]);
  const datePickerRef = useRef(null);
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
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangeOption("");
    if (datePickerRefStart.current) datePickerRefStart.current.setFocus();
    if (datePickerRefEnd.current) datePickerRefEnd.current.setFocus();
  };
  useEffect(() => {
    setSelectedJob(state);
  }, []);

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

  const fetchApprovers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getapproverofexpJobs`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            uniquevalue: uniqueValue,
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setApprovalName(response.data);
    } catch (error) {
      console.error("Error fetching approvers:", error);
    }
  };

  const fetchLatestJobs = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchlatestExportjob`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setLatestJobs(response.data);
      setOriginalLatestJob(response.data);
    } catch (error) {
      console.error("Error fetching latest jobs:", error);
    }
  };

  async function checker() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getapprovedexpJob`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            uniquevalue: uniqueValue,
          },
        }
      );
      setapprovedJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllJobs() {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllExpJobs`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
        },
      });
      setalljobsexp(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Promise.all([fetchApprovers(), fetchLatestJobs()])
      .then(() => checker())
      .then(() => getAllJobs())
      .catch((error) => console.error(error));
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openModal = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const handleInputChange = (e, field) => {
    setSelectedJob({
      ...selectedJob,
      [field]: e.target.value,
    });
  };

  const handleApproveJob = async () => {
    try {
      await axios.put(`${API_BASE_URL}/approveExpJob`, {
        jobId: selectedJob.id,
        updatedFields: selectedJob,
        approval: {
          username: localStorage.getItem("username"),
          status: "Approve",
        },
      });
      toast.success("Export Job approved successfully");
      closeModal();
      checker();
      const updatedLatestJob = latestJobs.filter(
        (job) => job.jobnumber !== selectedJob.jobnumber
      );
      setLatestJobs(updatedLatestJob);
      setalljobsexp(updatedLatestJob);

      // -------------------
      fetchLatestJobs();
      fetchApprovers();
      getAllJobs();
    } catch (error) {
      console.error("Error approving job:", error);
      toast.error("Failed to approve Import Job");
    }
  };
  const handleDateSelect = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // Add any additional logic for filtering or processing
  };
  const handleRejectJob = async () => {
    try {
      await axios.put(`${API_BASE_URL}/approveExpJob`, {
        jobId: selectedJob.id,
        updatedFields: selectedJob,
        approval: {
          username: localStorage.getItem("username"),
          status: "Reject",
        },
      });
      toast.success("Export Job rejected successfully");
      closeModal();
      checker();
      const updatedLatestJob = latestJobs.filter(
        (job) => job.jobnumber !== selectedJob.jobnumber
      );
      setLatestJobs(updatedLatestJob);
      setalljobsexp(updatedLatestJob);

      // -------------------
      fetchLatestJobs();
      fetchApprovers();
      getAllJobs();
    } catch (error) {
      console.error("Error rejecting job:", error);
      toast.error("Failed to reject export Job");
    }
  };
  useEffect(() => {
    navigate("/approverlog", { state: null });
  }, []);

  const sortedLatestJob = [...latestJobs].sort((a, b) => {
    const dateA = new Date(a.createdat);
    const dateB = new Date(b.createdat);
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });

  const indexofLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;
  // const currentItems = latestJobs.slice(indexOfFirstItem, indexofLastItem);
  // const totalPages = Math.ceil(latestJobs.length / itemsPerPage);

  const currentItems = filteredJob.slice(indexOfFirstItem, indexofLastItem);
  const totalPages = Math.ceil(filteredJob.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [originalLatestJob, setOriginalLatestJob] = useState([]);

  const refreshData = () => {
    fetchLatestJobs();
    fetchApprovers();
    getAllJobs();
    setSearchValue("");
    setSelectedStatus("");
    toast.success("Refreshed Successfully");
  };

  const handleSearch = (searchTerm) => {
    const term = searchTerm.trim().toLowerCase();
    if (term !== "") {
      const filteredJobs = originalLatestJob.filter((exp) => {
        const exporter = exp.exportername.toLowerCase();
        return exporter.includes(term);
      });

      setLatestJobs(filteredJobs);
    } else {
      setLatestJobs(originalLatestJob); // Reset to original data when search is empty
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ExportApproval");

    // Get the organization name
    const orgName = latestJobs[0].orgname;

    // Add the organization name as a separate row
    worksheet.addRow(["Organization Name: " + orgName]);
    worksheet.getRow(1).font = { bold: true };

    // Add the header row for branch details
    const header = [
      "Exporter Name",
      "Job No",
      "Created By",
      "Custom House",
      "Job Date",
      "Job Recieved On",
    ];
    worksheet.addRow(header);
    worksheet.getRow(2).font = { bold: true };

    latestJobs.forEach((job) => {
      let actions = job.approval;

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
      // const formattedActions = actions.map((action, index) => {
      //   return ` Status ${index + 1}: ${action.status}\n By ${index + 1}: ${action.username} |`;
      // }).join('\n');

      worksheet.addRow([
        job.exportername || "N/A",
        job.jobnumber || "N/A",
        // formattedActions || "N/A", // Use formatted actions
        job.createdon || "N/A",
        job.customhouse || "N/A",
        job.jobdate || "N/A",
        job.docreceivedon || "N/A",
        // org.GST || "N/A",
        // org.IEC || "N/A",
        // org.creditdays || "N/A",
        // org.deletedby || "N/A",
        // org.remark || "N/A",
      ]);
    });

    // Auto-adjust column widths
    header.forEach((column, index) => {
      const columnData = latestJobs.map((job) => {
        let actions = job.approval;

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
    link.download = "ExpApproval.xlsx";
    link.click();
  };

  const exportToPdf = async () => {
    const doc = new jsPDF("p", "pt", "a4"); // Portrait orientation, points, A4 size
    const orgName = latestJobs[0]?.orgname || "Unknown Organization";

    // Add organization name
    doc.setFontSize(10);
    doc.text(`Organization Name: ${orgName}`, 15, 20); // Increased left margin

    // Define the table headers
    const headers = [
      { content: "Exporter Name", styles: { cellWidth: "auto" } },
      { content: "Job No", styles: { cellWidth: "auto" } },
      { content: "Created By", styles: { cellWidth: "auto" } },
      { content: "Custom House", styles: { cellWidth: "auto" } },
      { content: "Job Date", styles: { cellWidth: "auto" } },
      { content: "Job Recieved On", styles: { cellWidth: "auto" } },
      // { content: "Email ID", styles: { cellWidth: 80 } },
      // { content: "PAN", styles: { cellWidth: "auto" } },
      // { content: "GST", styles: { cellWidth: "auto" } },
      // { content: "IEC", styles: { cellWidth: "auto" } },
      // { content: "Credit Days", styles: { cellWidth: "auto" } },
      // { content: "Deleted By", styles: { cellWidth: "auto" } },
      // { content: "Remark", styles: { cellWidth: "auto" } },
    ];

    // Define the table data
    const data = latestJobs.map((job) => {
      let actions = job.approval;

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
        job.exportername || "N/A",
        job.jobnumber || "N/A",
        // formattedActions || "N/A", // Use formatted actions
        job.createdon || "N/A",
        job.customhouse || "N/A",
        job.jobdate || "N/A",
        job.docreceivedon || "N/A",
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
    doc.save("ExpApproval.pdf");
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    filterExpJobs();
  };

  const filterExpJobs = () => {
    const filtered = latestJobs.filter((job) => {
      const jobDate = new Date(job.createdat);
      const isWithinDateRange =
        (!startDate && !endDate) ||
        (startDate && endDate && jobDate >= startDate && jobDate <= endDate);

      const matchesExporter = job.exportername
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesJobNo = job.jobnumber
        .toLowerCase()
        .includes(searchValueByJobNo.toLowerCase());

      const matchesCreator = job.jobowner
        .toLowerCase()
        .includes(createdBySearchValue.toLowerCase());

      //   const matchesStatus = (() => {
      //     switch (selectedStatus) {
      //       case "Deleted":
      //         return job.IsDeleted === 1;
      //       case "Approved":
      //         return alljobsexp?.some(
      //           (approvedJob) => approvedJob.jobnumber === job.jobnumber
      //         );
      //       case "Pending":
      //         return (
      //           job.IsDeleted !== 1 &&
      //           !job.approval?.some((approval) => approval.status === "Reject") &&
      //           !alljobsexp.some(
      //             (approvedJob) => approvedJob.jobnumber === job.jobnumber
      //           )
      //         );
      //       case "Rejected":
      //         return job.approval?.some((approval) => approval.status === "Reject");
      //       case "All":
      //       default:
      //         return true; // Show all jobs
      //     }
      //   })();

      // return (
      //   isWithinDateRange &&
      //   matchesCreator &&
      //   matchesExporter &&
      //   matchesJobNo &&
      //   matchesStatus
      // );

      const matchesStatus =
        selectedStatus === "Deleted"
          ? job.IsDeleted === 1
          : selectedStatus === "Approved"
          ? alljobsexp?.some(
              (approvedJob) => approvedJob.jobnumber === job.jobnumber
            ) && job.IsDeleted !== 1 // Ensure the job is not deleted
          : selectedStatus === "Pending"
          ? !alljobsexp.some(
              (approvedJobs) => approvedJobs.jobnumber === job.jobnumber
            ) &&
            job.IsDeleted !== 1 &&
            !job.approval?.some((approval) => approval.status === "Reject")
          : selectedStatus === "Rejected"
          ? job.approval?.some((approval) => approval.status === "Reject")
          : selectedStatus === "All"
          ? true
          : true;

      return (
        isWithinDateRange &&
        matchesJobNo &&
        matchesCreator &&
        matchesStatus &&
        matchesExporter
      );
    });

    const sortedFiltered = filtered.sort((a, b) =>
      moment(b.createdat).diff(moment(a.createdat))
    );

    setFilteredJob(sortedFiltered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterExpJobs();
  }, [
    latestJobs,
    startDate,
    endDate,
    searchValue,
    selectedStatus,
    createdBySearchValue,
    searchValueByJobNo,
  ]);

  const handleRestoreJob = async (job) => {
    try {
      await axios.put(`${API_BASE_URL}/restoreExpJob`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        jobnumber: job,
      });
      toast.success("Job restored successfully");
      // checker();
      navigate("/export");
    } catch (error) {
      console.error("Error restoring job:", error);
    }
  };
  return (
    <div
      className="PaginationAlignment"
      style={{
        height: "69vh",
        paddingTop: "4px !important",
        position: "relative",
        top: "60px",
        // overflow: "hidden",
      }}
    >
      <div>
        <CCardBody>
          <div>
            <section
              className="orgApprovalHeader mt-2 mb-3"
              style={{
                position: "fixed",
                top: "68px",
                width: "77.9%",
                zIndex: "4",
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

            <CCol xs={12}>
              <div
                className="mb-2 org-container-div px-0"
                style={{ justifyContent: "flex-start", border: "0px" }}
              >
                <div
                  className="grid-container-approval"
                  style={{ gap: "0px 130px" }}
                >
                  {/* <div className="date-picker-wrapper">
                  <div>
                    <label className="new-date-label-imp-exp">
                      Start Date :{" "}
                    </label>
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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                      className="start-date-picker"
                      placeholderText="Select a date"
                    />
                  </div>
                  <div>
                    <label className="new-date-label-imp-exp">
                      End Date :{" "}
                    </label>
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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                      className="end-date-picker"
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
                      <option value="thisCalendarYear">
                        This Calendar Year
                      </option>
                      <option value="lastCalendarYear">
                        Last Calendar Year
                      </option>
                      <option value="thisFiscalYear">This Fiscal Year</option>
                      <option value="lastFiscalYear">Last Fiscal Year</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div> */}
                  <div className="approvelog-date-picker-wrapper">
                    <label
                      className="approvals-text-field-3"
                      style={{
                        fontSize: "12px",
                        width: "84px",
                        margin: "0px",
                      }}
                    >
                      Date :
                    </label>
                    {/* <div>

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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                      className="start-date-picker"
                      placeholderText="Select a date"
                    />
                  </div>
                  <div>

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
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                      className="end-date-picker"
                      placeholderText="Select a date"
                    />
                  </div> */}

                    <Calendar onDateSelect={handleDateSelect} />
                  </div>

                  <div className="grid-container-taskname">
                    <label
                      htmlFor="Job Date"
                      className="approvals-text-field-3"
                      style={{ fontSize: "12px" }}
                    >
                      Exporter Name :
                    </label>
                    <NewInput
                      width={"160px"}
                      setSelectedValue={setSearchValue}
                      type={"text"}
                      placeholder={"Exporter Name"}
                    />
                  </div>
                  <div
                    className="grid-container-impapp-jobno"
                    style={{ margin: "0px" }}
                  >
                    <label
                      htmlFor="Job Date"
                      className="approvals-text-field-3"
                      style={{ fontSize: "12px" }}
                    >
                      Job No. :
                    </label>
                    <NewInput
                      width={"160px"}
                      setSelectedValue={setSearchValueByJobNo}
                      type={"text"}
                      placeholder={"Job No."}
                    />
                  </div>
                  <div
                    className="grid-container-createdby-imp "
                    style={{ gap: "65px" }}
                  >
                    <label
                      htmlFor="Job Date"
                      className="approvals-text-field-3"
                      style={{ fontSize: "12px" }}
                    >
                      Created By :
                    </label>
                    <NewInput
                      width={"160px"}
                      setSelectedValue={setCreatedBySearchValue}
                      type={"text"}
                      placeholder={"Created By"}
                    />
                  </div>
                  <div className="grid-container-approvals-1  ">
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
              </div>
            </CCol>
            <motion.div
              initial={{ opacity: 0 }} // Starts faded & moves up
              animate={{ opacity: 1 }} // Becomes fully visible
              exit={{ opacity: 0 }} // Fades out & moves up
              transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
            >
              <table className="table-wf">
                <thead>
                  <tr className="head-wf" style={{ height: "22px" }}>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "10%",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "20%",
                      }}
                    >
                      Job Number
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "18%",
                      }}
                    >
                      Exporter Name
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "15%",
                      }}
                    >
                      Created By
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "20%",
                      }}
                    >
                      Actions
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "20%",
                      }}
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="body-wf">
                  {/* {localStorage.getItem('username') !== 'admin' ? (
                        approvalName?.some(item => item.employeename === localStorage.getItem('username')) ? (
                            latestJobs
                                ?.filter(item => item.IsDeleted === 0)
                                .filter(item => !alljobsexp?.some(job => job.jobnumber === item.jobnumber))
                                .filter(item => {
                                    const hasRejected = item.approval && item.approval.some(approval => approval.status === 'Reject');
                                    return !hasRejected;
                                })
                                .map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{formatDateString(item.createdat)}</CTableDataCell>
                                        <CTableDataCell>{item.jobnumber}</CTableDataCell>
                                        <CTableDataCell>{item.exportername}</CTableDataCell>
                                        <CTableDataCell>{item.jobowner}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton color="success" size="sm" onClick={() => openModal(item)}>Show More</CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="5" className="text-center">Jobs Approval access is not to you</CTableDataCell>
                            </CTableRow>
                        )
                    ) : (
                        latestJobs && latestJobs.map((item, index) => {

                            const isPresent = alljobsexp?.some(row => row.jobnumber === item.jobnumber);
                            const rejct = item.approval?.some(job => job.status === 'Reject');
                            const status = item.IsDeleted === 1 ? `Deleted By ${item.deletedby}` : (isPresent ? 'Approved' : (rejct ? 'Rejected' : 'Pending'));

                            return (
                                <CTableRow key={index}>
                                    <CTableDataCell>{formatDateString(item.createdat)}</CTableDataCell>
                                    <CTableDataCell>{item.jobnumber}</CTableDataCell>
                                    <CTableDataCell>{item.exportername}</CTableDataCell>
                                    <CTableDataCell>{item.jobowner}</CTableDataCell>
                                    <CTableDataCell>{status}</CTableDataCell>
                                    <CTableDataCell>{item.remark}</CTableDataCell>
                                </CTableRow>
                            )
                        })
                    )} */}

                  {localStorage.getItem("username") !== "admin" ? (
                    approvalName?.some(
                      (item) =>
                        item.employeename === localStorage.getItem("username")
                    ) ? (
                      currentItems &&
                      currentItems
                        // ?.sort(
                        //   (a, b) => new Date(b.createdat) - new Date(a.createdat)
                        // )
                        // .reverse()
                        .map((item, index) => {
                          // Check if the user has approved the job
                          const hasApproved = item.approval?.some(
                            (approval) =>
                              approval.employeename ===
                                localStorage.getItem("username") &&
                              approval.status === "Approve"
                          );

                          // Check if the user has Rejected the job
                          const hasRejectedByYou = item.approval?.some(
                            (approval) =>
                              approval.employeename ===
                                localStorage.getItem("username") &&
                              approval.status === "Reject"
                          );

                          // Check if the job was rejected and by whom
                          const approvedby = item.approval?.find(
                            (approval) => approval.status === "Approve"
                          );

                          //   console.log(hasApproved)
                          // Check if the job was rejected and by whom
                          const rejection = item.approval?.find(
                            (approval) => approval.status === "Reject"
                          );

                          // Check if the job is marked as Approved
                          const isApproved = alljobsexp?.some(
                            (job) => job.jobnumber === item.jobnumber
                          );

                          // Determine the job status
                          const status =
                            item.IsDeleted === 1
                              ? `Deleted By ${item.deletedby}`
                              : hasApproved
                              ? "Approved by you"
                              : isApproved
                              ? `Approved by ${approvedby?.employeename}`
                              : hasRejectedByYou
                              ? "Rejected by you"
                              : rejection
                              ? `Rejected by ${rejection.employeename}`
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
                                {formatDateString(item.createdat)}
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
                                {item.jobnumber}
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
                                {item.exportername}
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
                                {item.jobowner}
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
                                  <div
                                    onClick={() => openModal(item)}
                                    style={{ width: "fit-content" }}
                                  >
                                    <CustomColorBtn
                                      text={" Show More"}
                                      bgcolorlight={"#38b700"}
                                      bgcolordark={"#5abd2d"}
                                      height={"28px"}
                                    />
                                  </div>
                                ) : (
                                  <span>{status}</span> // Display the status
                                )}
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
                                {item.remark}
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? "#263A52" // Dark mode odd row
                                : "#F6FCFF", // Light mode odd row

                            transition: "background-color 0.3s ease",
                          }}
                          colSpan={6}
                        >
                          Jobs Approval access is not to you
                        </td>
                      </tr>
                    )
                  ) : (
                    currentItems &&
                    currentItems
                      // ?.sort(
                      //   (a, b) => new Date(b.createdat) - new Date(a.createdat)
                      // )
                      // .reverse()
                      .map((item, index) => {
                        // Check if the job was rejected and by whom
                        const rejection = item.approval?.find(
                          (approval) => approval.status === "Reject"
                        );

                        // Check if the job is marked as Approved
                        const isApproved = alljobsexp?.some(
                          (job) => job.jobnumber === item.jobnumber
                        );

                        // Determine the job status
                        const status =
                          item.IsDeleted === 1
                            ? `Deleted By ${item.deletedby}`
                            : isApproved
                            ? "Approved"
                            : rejection
                            ? `Rejected by ${rejection.employeename}`
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
                              {formatDateString(item.createdat)}
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
                              {item.jobnumber}
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
                              {item.exportername}
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
                              {item.jobowner}
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
                              {item.remark}
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

        {/* <CModal size="xl" visible={selectedJob !== null} onClose={closeModal}>
        <CModalHeader onClose={closeModal}>
          <CModalTitle>All Job Data</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedJob && (
            <>
              <div className="impapprovalmodal">
                <label>Exporter Name:</label>
                <input
                  type="text"
                  value={selectedJob.exportername}
                  readOnly
                />

                <label>Branch</label>
                <input
                  type="text"
                  value={selectedJob.exportername}
                  readOnly
                />
              </div>

              <div className="impapprovalmodal">
                <label>Job Number:</label>
                <input type="text" value={selectedJob.jobnumber} readOnly />

                <label>Job Date:</label>
                <input type="text" value={selectedJob.jobdate} readOnly />

                <label>Doc Received On:</label>
                <input
                  type="text"
                  value={selectedJob.docreceivedon}
                  readOnly
                />

                <label>Transport Mode:</label>
                <input
                  type="text"
                  value={selectedJob.transportmode}
                  onChange={(e) => handleInputChange(e, "transportmode")}
                  readOnly
                />
              </div>

              <div className="impapprovalmodal">
                <label>Custom House:</label>
                <input
                  type="text"
                  value={selectedJob.customhouse}
                  onChange={(e) => handleInputChange(e, "customhouse")}
                />

                <label>Own Booking:</label>
                <input
                  type="text"
                  value={selectedJob.ownbooking}
                  onChange={(e) => handleInputChange(e, "ownbooking")}
                />

                <label>Delivery Mode:</label>
                <input
                  type="text"
                  value={selectedJob.deliverymode}
                  onChange={(e) => handleInputChange(e, "deliverymode")}
                />

                <label>No. of Container:</label>
                <input
                  type="text"
                  value={selectedJob.noofcontainer}
                  onChange={(e) => handleInputChange(e, "noofcontainer")}
                />
              </div>

              <div className="impapprovalmodal">
                <label>Own Transportation:</label>
                <input
                  type="text"
                  value={selectedJob.owntransportation}
                  onChange={(e) => handleInputChange(e, "owntransportation")}
                />

                <label>BE Type:</label>
                <input
                  type="text"
                  value={selectedJob.betype}
                  onChange={(e) => handleInputChange(e, "betype")}
                />

                <label>BE No:</label>
                <input
                  type="text"
                  value={selectedJob.benumber}
                  onChange={(e) => handleInputChange(e, "benumber")}
                />

                <label>Consignment Type:</label>
                <input
                  type="text"
                  value={selectedJob.consignmenttype}
                  onChange={(e) => handleInputChange(e, "consignmenttype")}
                />
              </div>

              <div className="impapprovalmodal">
                <label>CFS Name:</label>
                <input
                  type="text"
                  value={selectedJob.cfsname}
                  onChange={(e) => handleInputChange(e, "cfsname")}
                />

                <label>Shipping Line Name:</label>
                <input
                  type="text"
                  value={selectedJob.shippinglinename}
                  onChange={(e) => handleInputChange(e, "shippinglinename")}
                />

                <label>Shipping Line Bond:</label>
                <input
                  type="text"
                  value={selectedJob.shippinglinebond}
                  onChange={(e) => handleInputChange(e, "shippinglinebond")}
                />

                <label>BL Type:</label>
                <input
                  type="text"
                  value={selectedJob.bltype}
                  onChange={(e) => handleInputChange(e, "bltype")}
                />
              </div>

              <div className="impapprovalmodal">
                <label>BL No:</label>
                <input
                  type="text"
                  value={selectedJob.bltypenum}
                  onChange={(e) => handleInputChange(e, "bltypenum")}
                />

                <label>BL Status:</label>
                <input
                  type="text"
                  value={selectedJob.blstatus}
                  onChange={(e) => handleInputChange(e, "blstatus")}
                />

                <label>Free Days:</label>
                <input
                  type="text"
                  value={selectedJob.freedays}
                  onChange={(e) => handleInputChange(e, "freedays")}
                />

                <label>GST:</label>
                <input type="text" value={selectedJob.GST} readOnly />
              </div>

              <div className="impapprovalmodal">
                <label>IEC:</label>
                <input type="text" value={selectedJob.IEC} readOnly />

                <label>Final Destination:</label>
                <input
                  type="text"
                  value={selectedJob.finaldestination}
                  onChange={(e) => handleInputChange(e, "finaldestination")}
                />

                <label>Port of Shipment:</label>
                <input
                  type="text"
                  value={selectedJob.portofshipment}
                  onChange={(e) => handleInputChange(e, "portofshipment")}
                />
              </div>

              <div className="impapprovalmodal-1"></div>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CPopover content="Close Modal" trigger={["hover", "focus"]}>
            <CButton color="secondary" onClick={closeModal}>
              Close
            </CButton>
          </CPopover>
          <CPopover content="Approve Job" trigger={["hover", "focus"]}>
            <CButton color="primary" onClick={handleApproveJob}>
              Approve
            </CButton>
          </CPopover>
          <CPopover content="Reject Job" trigger={["hover", "focus"]}>
            <CButton color="danger" onClick={handleRejectJob}>
              Reject
            </CButton>
          </CPopover>
        </CModalFooter>
      </CModal> */}
        <JobDataPopup
          type={"export"}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          onApprove={handleApproveJob}
          onReject={handleRejectJob}
          preTitleText="Request For Job "
        />
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default JobApprovalExp;
