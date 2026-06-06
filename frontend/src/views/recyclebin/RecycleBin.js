import React, { useEffect, useState, useRef } from "react";
import EmptyBinPopup from "src/components/inputPopup/EmptyBinPopup";
import InputPopup from "src/components/inputPopup/InputPopup";
import DeleteConfirmationPopup from "src/components/inputPopup/DeleteConfirmationPopup ";
import DeleteDaysConfirmationPopup from "src/components/inputPopup/DeleteDaysConfirmationPopup";
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
  CPagination,
  CPaginationItem,
  CCardBody,
  CCol,
  CCard,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CIcon,
} from "@coreui/react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../css/styles.css";
import "./css/recyclebin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "src/layout/Pagination";
// import refreshIcon from "../../../importIcons/refresh.png";
import ExcelJS from "exceljs";
import { motion } from "framer-motion";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import autoTable from "jspdf-autotable";
import Calendar from "src/components/Calendar";
import Cookies from "js-cookie";

import { jsPDF } from "jspdf";
import moment from "moment";
import { getYear, getMonth } from "date-fns";
import DownlodBtn from "../buttons/buttons/DownlodBtn";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import DeleteBtn from "../buttons/buttons/DeleteBtn";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import { use } from "react";
import RestoreBtn from "src/views/buttons/buttons/RestoreBtn";
import API_BASE_URL from "src/config/config";

const range = (start, end, step = 1) => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

const RecycleBin = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [latestJobs, setLatestJobs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [alljobsimp, setalljobsimp] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [createdBySearchValue, setCreatedBySearchValue] = useState("");

  const [selectedType, setselectedType] = useState(""); // State for selected status
  const [deleteDays, setDeleteDays] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredJob, setFilteredJob] = useState([]);
  const [isClearModalOpen, setisClearModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [refresh, setrefresh] = useState(0);
  const [selectedJobForDelete, setSelectedJobForDelete] = useState({
    jobNumber: "",
    id: "",
    type: "",
  });
  const CheckUsername = localStorage.getItem("username");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
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
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const datePickerRefStart = useRef();
  const datePickerRefEnd = useRef();
  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangeOption("");
    if (datePickerRefStart.current) datePickerRefStart.current.setFocus();
    if (datePickerRefEnd.current) datePickerRefEnd.current.setFocus();
  };
  const [selectedOrg, setSelectedOrg] = useState(null);
  useEffect(() => {
    setSelectedJob(state);
  }, []);
  const handleDateSelect = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // Add any additional logic for filtering or processing
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  async function getAllJobs() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getalljobsandorg`,

        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setalljobsimp(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setisClearModalOpen(false);
    setDeleteDays(deleteDays);
    setisDeleteModalOpen(false);
  };

  const handleInputChange = (e, field) => {
    setSelectedJob({
      ...selectedJob,
      [field]: e.target.value,
    });
  };
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
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentItems = filteredJob.slice(indexofFirstItem, indexofLastItem);
  const totalPages = Math.ceil(filteredJob.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [originalLatestJob, setOriginalLatestJob] = useState([]);

  const refreshData = () => {
    setrefresh(refresh + 1);
    setSearchValue("");
    setselectedType("");
    setCreatedBySearchValue("");
    getAllJobs();
    toast.success("Refreshed Successfully");
  };

  const handleSearch = (searchTerm) => {
    const term = searchTerm.trim().toLowerCase();
    if (term !== "") {
      const filteredJobs = originalLatestJob.filter((imp) => {
        const importer = imp.importername.toLowerCase();
        return importer.includes(term);
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
    filterImpJobs();
  };

  const exportToExcel = async () => {
    // Check if there's data to export
    if (!alljobsimp || alljobsimp.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ImportApproval");

    // Get the organization name from localStorage instead of latestJobs
    const orgName = localStorage.getItem("orgname") || "Unknown Organization";

    // Add the organization name as a separate row
    worksheet.addRow(["Organization Name: " + orgName]);
    worksheet.getRow(1).font = { bold: true };

    // Add the header row for branch details
    const header = [
      "Date",
      "Job Number/Organization",
      "Type Of Job",
      "Created By",
      "Remarks",
    ];
    worksheet.addRow(header);
    worksheet.getRow(2).font = { bold: true };

    alljobsimp.forEach((job) => {
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

      worksheet.addRow([
        job.createdat || "N/A",
        job.jobnumber || "N/A",
        job.type || "N/A", // Changed from createdat to jobowner to match the data
        job.jobowner || "N/A",
        job.remark || "N/A",
      ]);
    });

    // Auto-adjust column widths
    header.forEach((column, index) => {
      const columnData = alljobsimp.map((job) => {
        let actions = job.approval;

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
      worksheet.getColumn(index + 1).width = maxLength + 2;
    });

    try {
      // Write to file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Bin.xlsx";
      link.click();
      toast.success("Export successful");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export data");
    }
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
        job.importername || "N/A",
        job.jobnumber || "N/A",
        // formattedActions || "N/A", // Use formatted actions
        job.createdat || "N/A",
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
    doc.save("Bin.pdf");
  };

  const handleStatusChange = (status) => {
    setselectedType(status);
    // filterImpJobs();
  };

  const filterImpJobs = () => {
    const filtered = alljobsimp.filter((job) => {
      const jobDate = new Date(job.createdat);
      // console.log('jobDate', jobDate);

      const selectedStart = startDate ? moment(startDate).startOf("day") : null;
      const selectedEnd = endDate ? moment(endDate).endOf("day") : null;

      const isWithinDateRange =
        (!selectedStart && !selectedEnd) ||
        (selectedStart &&
          selectedEnd &&
          jobDate >= selectedStart &&
          jobDate <= selectedEnd) ||
        (selectedStart && !selectedEnd && jobDate >= selectedStart) ||
        (!selectedStart && selectedEnd && jobDate <= selectedEnd);

      const matchesCreator = (job.jobowner || "")
        .toLowerCase()
        .includes(createdBySearchValue.toLowerCase());

      const matchesType =
        selectedType === "Import"
          ? job.type === "Import"
          : selectedType === "Export"
          ? job.type === "Export"
          : selectedType === "Organization"
          ? job.type === "Organization"
          : selectedType === "Collection"
          ? job.type === "Collection"
          : selectedType === "Document"
          ? job.type === "Document"
          : selectedType === "Milestone"
          ? job.type === "Milestone"
          : selectedType === "Lob"
          ? job.type === "Lob"
          : selectedType === "Workflow"
          ? job.type === "Workflow"
          : selectedType === "Credit"
          ? job.type === "Credit"
          : selectedType === "Debit"
          ? job.type === "Debit"
          : selectedType === "Branch"
          ? job.type === "Branch"
          : selectedType === "Delegation"
          ? job.type === "Delegation"
          : selectedType === "Branch(org)"
          ? job.type === "Branch(org)"
          : selectedType === "Users"
          ? job.type === "Users"
          : selectedType === "Milestone Details"
          ? job.type === "Milestone Details"
          : selectedType === "Approver"
          ? job.type === "Approver"
          : selectedType === "All" // If "All" is selected, include all types
          ? true
          : true; // Default case, include all

      return isWithinDateRange && matchesCreator && matchesType;
    });

    const sortedFiltered = filtered.sort((a, b) =>
      moment(b.createdat).diff(moment(a.createdat))
    );

    setFilteredJob(sortedFiltered); // Ensure you're setting a valid array
    setCurrentPage(1);
  };

  useEffect(() => {
    filterImpJobs();
  }, [
    alljobsimp,
    startDate,
    endDate,
    // searchValue,
    selectedType,
    createdBySearchValue,
    // searchValueByJobNo,
  ]);

  const handleRestoreJob = async (job, type) => {
    if (type === "Document") {
      try {
        await axios.put(`${API_BASE_URL}/restoreDocument`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          filename: job.jobnumber,
        });
        toast.success("Document restored successfully");

        getAllJobs();
      } catch (error) {
        console.error("Error restoring job:", error);
      }
    } else if (type === "Collection") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreCollection`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          billno: job.jobnumber,
        });
        toast.success("Collection restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Collection:", error);
      }
    } else if (type === "Users") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreUsers`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Users restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Approver:", error);
      }
    } else if (type === "Credit") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreCredit`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Credit restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Credit:", error);
      }
    } else if (type === "Debit") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreDebit`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Debit restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Debit:", error);
      }
    } else if (type === "Milestone") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreMilestone`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Milestone restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Milestone:", error);
      }
    } else if (type === "Delegation") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreDelegation`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Milestone restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Milestone:", error);
      }
    } else if (type === "Lob") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreLob`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Lob restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring Lob:", error);
      }
    } else if (type === "Branch") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreBranch`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.jobnumber,
        });
        toast.success("Branch restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring workflow:", error);
      }
    } else if (type === "Branch(org)") {
      try {
        console.log("Job number to restore:", job);
        const res = await axios.put(`${API_BASE_URL}/restoreBranchOrg`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.jobnumber,
        });
        console.error("res of branchorg restore:", res.data);

        toast.success("Branch restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring workflow:", error);
      }
    } else if (type === "Workflow") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreWorkflow`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Workflow restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoring workflow:", error);
      }
    } else if (type === "Milestone Details") {
      try {
        console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreLobMilestone`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: job.id,
        });
        toast.success("Milestone Details restored successfully");
        getAllJobs();
      } catch (error) {
        console.error("Error restoreLobMilestone Lob:", error);
      }
    } else {
      try {
        // console.log("Job number to restore:", job);
        await axios.put(`${API_BASE_URL}/restoreJobAndOrg`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          jobnumber: job.jobnumber,
        });
        toast.success("Job restored successfully");
      } catch (error) {
        console.error("Error restoring job:", error);
      }
    }
    getAllJobs();
  };
  const handlePermanentDeleteOpen = () => {
    openModal();
  };

  const handlePermanentDelete = async (daysFromPopup) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/updatepermanentDeletevalue`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          deleteIntervalForJobsAndOrg: daysFromPopup, // Use the value from popup
        }
      );
      console.log("res", res.data);
      toast.success("Delete value updated successfully");

      // Update your parent component's state as well
      setDeleteDays(daysFromPopup);
      fetchpermanentDeletevalue();

      closeModal();
    } catch (error) {
      console.error("Error updating delete value:", error);
    }
  };
  const fetchpermanentDeletevalue = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/fetchpermanentDeletevalue`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      console.log(res.data.deleteIntervalForJobsAndOrg);
      setDeleteDays(res.data.deleteIntervalForJobsAndOrg);
    } catch (error) {
      console.error("Error fetching delete value:", error);
    }
  };
  useEffect(() => {
    fetchpermanentDeletevalue();
  }, []);

  const handleEmptyBin = async () => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      console.log("orgname:", orgname, "orgcode:", orgcode);

      const res = await axios.delete(`${API_BASE_URL}/emptyBin`, {
        headers: { "Content-Type": "application/json" },
        data: { orgname, orgcode }, // Ensure data is properly sent
      });

      toast.success(res.data.message || "Bin cleared successfully");
      getAllJobs();
    } catch (error) {
      console.error("Error clearing bin:", error);
      toast.error(error.response?.data?.error || "Failed to clear bin");
    }
  };

  const handledeleteBinRow = async (type, jobNumber, id) => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      const res = await axios.delete(`${API_BASE_URL}/DeleteBinRow`, {
        headers: { "Content-Type": "application/json" },
        data: { orgname, orgcode, jobNumber, id, type }, // Ensure data is properly sent
      });

      toast.success(res.data.message || "Deleted successfully");
      getAllJobs();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error(error.response?.data?.error || "Failed to delete entry");
    }
  };

  return (
    <div
      className="PaginationAlignment"
      style={{
        height: "fit-content",
        paddingTop: "4px !important",
        position: "relative",
      }}
    >
      <div>
        <CCardBody>
          <div>
            <div
              className="approvaerlogTitleContainer"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
                padding: "0px 20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Link type="submit" onClick={refreshData} className="link-btn">
                  <RefreshBtn />
                </Link>
              </div>

              <h4
                className="approvaerlogTitle"
                style={{
                  color: theme === "dark" ? "#F6FCFF" : "#1E2652",
                  fontStyle: "Instrument Sans",
                  margin: 0,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Recycle Bin
              </h4>

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Link onClick={exportToExcel} className="link-btn">
                  <DownlodBtn />
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }} // Starts faded & moves up
              animate={{ opacity: 1 }} // Becomes fully visible
              exit={{ opacity: 0 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
              <CCol xs={12}>
                <div
                  className="mb-2 org-container-div"
                  style={{
                    justifyContent: "flex-start",
                    border: "0px",
                    paddingLeft: "0px",
                  }}
                >
                  <div className="grid-container-approval">
                    <div className="approvelog-date-picker-wrapper">
                      <label
                        className="approvals-text-field-3"
                        style={{
                          fontSize: "12px",
                          width: "66px",
                          margin: "0px",
                        }}
                      >
                        Date :
                      </label>
                      <Calendar onDateSelect={handleDateSelect} />
                    </div>
                    <div className="grid-container-createdby-imp ">
                      <label
                        htmlFor="Job Date"
                        className="approvals-text-field-3"
                      >
                        Created By :
                      </label>
                      <NewInput
                        width={"160px"}
                        setSelectedValue={setCreatedBySearchValue}
                        selectedValue={createdBySearchValue}
                        type={"text"}
                        placeholder={"Created By"}
                      />
                    </div>
                    <div></div>

                    <div className="grid-container-approvals-1  ">
                      <label htmlFor="Mode" className="approvals-text-field-3">
                        Type :
                      </label>
                      <div className="approvals-input-field">
                        <NewDropdownInput
                          type="type1"
                          placeholder={"All"}
                          options={[
                            { value: "All", label: "All" },
                            { value: "Lob", label: "Lob" },
                            { value: "Debit", label: "Debit" },
                            { value: "Users", label: "Users" },
                            { value: "Credit", label: "Credit" },
                            { value: "Branch", label: "Branch" },
                            { value: "Import", label: "Import" },
                            { value: "Export", label: "Export" },
                            { value: "Document", label: "Document" },
                            { value: "Workflow", label: "Workflow" },
                            { value: "Milestone", label: "Milestone" },
                            { value: "Collection", label: "Collection" },
                            { value: "Delegation", label: "Delegation" },
                            { value: "Branch(org)", label: "Branch(org)" },
                            { value: "Organization", label: "Organization" },
                            {
                              value: "Milestone Details",
                              label: "Milestone Details",
                            },
                          ]}
                          selectedValue={selectedType || searchValue}
                          setSelectedValue={handleStatusChange}
                          width={"150px"}
                        />
                      </div>
                    </div>
                    <div
                      className="grid-container-permanent-bin"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <section
                        htmlFor="permanent-delete"
                        className="approvals-text-field-3"
                        style={{ widows: "fit-content" }}
                      >
                        Permanent Delete After <strong>{deleteDays}</strong>{" "}
                        Days
                      </section>
                      {/* {CheckUsername == "admin" && (
                        <button
                          onClick={handlePermanentDeleteOpen}
                          className=" mx-4 button-23"
                          style={{
                            height: "28px",
                            padding: "0px 12px",
                            borderRadius: "12px",
                            backgroundColor: "transparent",
                            borderColor:
                              theme === "dark" ? "#D1EEFF" : "#535B87",
                            color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          }}
                        >
                          Change
                        </button>
                      )} */}
                    </div>
                    {CheckUsername == "admin" && (
                      <div>
                        <label
                          htmlFor="Mode"
                          className="approvals-text-field-3"
                        >
                          Clear Bin :
                        </label>
                        <button
                          className=" mx-4 button-23"
                          onClick={() => setisClearModalOpen(true)}
                          style={{
                            height: "28px",
                            padding: "0px 12px",
                            borderRadius: "12px",
                            letterSpacing: "0.7px",
                            backgroundColor: "transparent",
                            borderColor:
                              theme === "dark" ? "#D1EEFF" : "#535B87",
                            color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </CCol>

              <table className="table-wf">
                <thead>
                  <tr className="head-wf" style={{ height: "22px" }}>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Deleted on
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Job Number/Organization
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Type Of Job
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Deleted By
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Actions
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="body-wf">
                  {currentItems && currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr>
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
                            fontSize: "12px",
                          }}
                        >
                          {moment(item.deletedAt).format("DD-MM-YYYY")}
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
                            fontSize: "12px",
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
                            fontSize: "12px",
                          }}
                        >
                          {item.type}
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
                            fontSize: "12px",
                          }}
                        >
                          {item.deletedby}
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
                            fontSize: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <CPopover
                              content={`Job was Created By ${
                                item.jobowner
                              } on ${formatDateString(item.createdat)}`}
                              trigger={["hover", "focus"]}
                            >
                              <div
                                onClick={() =>
                                  handleRestoreJob(item, item.type)
                                }
                                style={{ display: "inline-block" }}
                              >
                                <RestoreBtn />
                              </div>
                            </CPopover>
                            <section
                              onClick={() => {
                                setisDeleteModalOpen(true);
                                // setjobNo(item.jobnumber);
                                setSelectedJobForDelete({
                                  jobNumber: item.jobnumber,
                                  id: item.id,
                                  type: item.type,
                                });
                              }}
                              style={{
                                position: "relative",
                                top: "-1px",
                                paddingLeft: "14px",
                              }}
                            >
                              <CPopover
                                content={`Delete Job`}
                                trigger={["hover", "focus"]}
                              >
                                <section>
                                  <DeleteBtn
                                    fill={
                                      theme === "dark"
                                        ? "#f8d7da"
                                        : "var(--page-title)"
                                    }
                                  />
                                </section>
                              </CPopover>
                            </section>
                          </div>
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
                            fontSize: "12px",

                            minWidth: "120px", // ✅ Prevents shrinking
                            maxWidth: "120px", // ✅ Prevents expanding
                            whiteSpace: "normal", // ✅ Allows multi-line text
                            wordBreak: "break-word", // ✅ Ensures long words wrap
                            overflowWrap: "break-word", // ✅ Breaks overflowing words
                          }}
                        >
                          {item.remark}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6} // Replace totalColumns with the actual number of columns
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? "#263A52" // Dark mode odd row
                              : "#F6FCFF", // Light mode odd row

                          transition: "background-color 0.3s ease",
                          fontSize: "12px",
                        }}
                      >
                        No jobs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          </div>
          <DeleteDaysConfirmationPopup
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handlePermanentDelete}
            initialDeleteDays={deleteDays}
            title="Confirm Delete Days"
            message="Are you sure you want to change the delete days?"
          />
          <EmptyBinPopup
            isOpen={isClearModalOpen}
            setisOpen={setisClearModalOpen}
            title={"Empty Bin"}
            onDelete={handleEmptyBin}
            // itemIdentifier={jobNumber} // Field to show in confirmation text
            confirmText="permanent delete" // Text user must type
          />

          <DeleteConfirmationPopup
            selectedItem={selectedJobForDelete}
            setSelectedItem={setSelectedJobForDelete}
            onDelete={handledeleteBinRow}
            // itemIdentifier={jobNumber} // Field to show in confirmation text
            confirmText="permanent delete" // Text user must type
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
          {/* </div> */}
        </CCardBody>
      </div>
    </div>
  );
};

export default RecycleBin;
