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
import "../../css/styles.css";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./css/export-styles.css";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import { getYear, getMonth } from "date-fns";
import Select from "react-select";
import TablePopup from "src/components/TablePopup/TablePopup";
import InputPopup from "src/components/inputPopup/InputPopup";

import refreshIcon from "../../importIcons/refresh.png";
import { organization } from "../organization";
import Pagination from "src/layout/Pagination";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import AddBtn from "../buttons/buttons/AddBtn";
import DownlodBtn from "../buttons/buttons/DownlodBtn";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import Calendar from "../../components/Calendar";
import Footer from "src/components/footer/Footer";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import API_BASE_URL from "src/config/config";

const Export = ({ startDate, endDate }) => {
  const [jobNo, setJobNo] = useState("");
  const [blawb, setblawb] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedMode, setselectedMode] = useState("");
  const [selectedJobStatus, setSelectedJobStatus] = useState("Active");
  const [allexpjobs, setallexpjobs] = useState([]);
  const [selectedTransportMode, setSelectedTransportMode] = useState("");
  const [selectedOwnBooking, setSelectedOwnBooking] = useState("");
  const [selectedDeliveryType, setSelectedDeliveryType] = useState("");
  const [exportername, setexportername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [remark, setRemark] = useState("");
  const [currentPopup, setCurrentPopup] = useState("none");
  const [isEditing, setIsEditing] = useState(false);
  const [completedTracking, setCompletedTracking] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowIndex2, setSelectedRowIndex2] = useState(null);
  const [exporters, setExporters] = useState([]);
  const [jobNumberToDelete, setJobNumberToDelete] = useState("");
  const [useDownload, setUseDownload] = useState(false);
  const [useDelete, setUseDelete] = useState(false);
  const [useAdd, setUseAdd] = useState(false);
  const addBtn = "Job";
  const checkUsername = localStorage.getItem("username");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const fetchExporters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorgs`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setExporters(response.data);
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
            type: "EXPORT",
          },
        }
      );

      const controlSet = new Set(data.map((item) => item.control));

      setUseDownload(controlSet.has("download-job"));
      setUseDelete(controlSet.has("delete-job"));
      setUseAdd(controlSet.has("add-job"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    // Add any additional logic for filtering or processing
  };

  const handleRowDoubleClick = (index) => {
    const selectedJob = currentItems[index];
    const jobNumber = selectedJob.jobnumber;

    window.open(`/#/expeditjob?jobnumber=${jobNumber}`, "_blank"); // Pass jobnumber in URL
  };

  useEffect(() => {
    fetchExporters();
    fetchcontrols();
  }, []);

  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [dateRangeOption, setDateRangeOption] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const datePickerRef = useRef();
  const datePickerRefStart = useRef();
  const datePickerRefEnd = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  if (location.pathname === "/export") {
    localStorage.removeItem("jobNumber");
    localStorage.removeItem("jobDate");
    localStorage.removeItem("onCreate");
    localStorage.removeItem("allbranchesofclient");
    localStorage.removeItem("onEdit");
    localStorage.removeItem("uniquevalue");
    localStorage.removeItem("exporternameofjob");
    localStorage.removeItem("OwnBookings");
    localStorage.removeItem("OwnTransport");
    localStorage.removeItem("BETYPE");
    localStorage.removeItem("consignmenttype");
  }

  const formImportRef = useRef(null);

  useEffect(() => {
    const formImport = formImportRef.current;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const scrollSpeed = 0.25; // ✅ tune this to make it faster/slower
        formImport.scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    if (formImport) {
      formImport.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (formImport) {
        formImport.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

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

  const clearExporterName = () => {
    setexportername(null); // Reset state
  };

  const fetchAllJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allexpjobs`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
        },
      });

      setallexpjobs(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllJobs();
  }, []);

  const refreshData = async () => {
    try {
      await (fetchAllJobs(), fetchcontrols());
      toast.success("Data Refreshed");
      setJobNo("");
      setblawb("");
      setexportername("");
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setDateRangeOption("");
      setselectedMode("");
      setSelectedTransportMode("");
      setSelectedDeliveryType("");
      setSelectedOwnBooking("");
      setSelectedJobStatus("Active");
    } catch (error) {
      console.log("fail to refresh ", error);
      toast.error("Fail to refresh");
    }
  };

  const handleModeChange = (mode) => {
    setselectedMode(mode); // Save selected mode
    setCurrentPage(1);
  };

  const handleOwnTransportChange = (vehicle) => {
    setSelectedTransportMode(vehicle);
    setCurrentPage(1);
  };

  const handleOwnBookingChange = (booking) => {
    setSelectedOwnBooking(booking);
    setCurrentPage(1);
  };

  const handleDeliveryType = (delivery) => {
    setSelectedDeliveryType(delivery);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedJobStatus(status);
    setCurrentPage(1);
  };

  useEffect(() => {
    // Reset pagination when selectedMode changes
    setCurrentPage(1);
  }, [
    selectedMode,
    selectedJobStatus,
    selectedTransportMode,
    selectedDeliveryType,
    selectedOwnBooking,
  ]);
  async function handleDelete(e) {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const employeename = localStorage.getItem("username");
      handleRemark(e, selectedRowIndex);
      const response = await axios.delete(
        `${API_BASE_URL}/deletethatjobexp`,
        {
          data: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            jobnumber: jobNumberToDelete,
            employeename: employeename,
          },
        }
      );

      if (response.status === 200) {
        const updatedJobs = [...allexpjobs];
        updatedJobs.splice(selectedRowIndex, 1);
        setallexpjobs(updatedJobs);
      }
      handleModalClose();
      refreshData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemark = async (e) => {
    try {
      // const thatdata = allexpjobs[selectedRowIndex];
      const response = await axios.put(
        `${API_BASE_URL}/insertRemrkForDeleteExp`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          jobnumber: jobNumberToDelete,
          remark: remark,
        }
      );

      if (response.status === 200) {
        const updatedJobs = [...allexpjobs];
        updatedJobs.splice(selectedRowIndex, 1);
        setallexpjobs(updatedJobs);
      }
    } catch (error) {
      console.error("Error Remark insert Delete the job:", error);
    }
  };

  const handledeleteOpen = (e, index) => {
    e.preventDefault();

    // Get the job from currentItems
    const selectedJob = currentItems[index];
    const jobIndexInAllJobs = allexpjobs.findIndex(
      (job) => job.jobnumber === selectedJob.jobnumber
    ); // Find the index in allimpjobs

    if (jobIndexInAllJobs !== -1) {
      setSelectedRowIndex(jobIndexInAllJobs); // Set the selected row index
      setJobNumberToDelete(selectedJob.jobnumber);
      // setIsModalOpen(true); // Open the delete confirmation modal
      setCurrentPopup("Deletion");
    }
  };
  const handleModalClose = () => {
    setRemark("");
    setIsModalOpen(false);
  };
  // const editLinkRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      // if (window.innerHeight < 625) {
      // setItemsPerPage(9); // Change default tab for smaller screens
      // } else {
      // setItemsPerPage(11); // Default for larger screens
      // }
      setItemsPerPage(5);
    };

    // Call the function once when the component mounts
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const trackingexport = async (selectedRowIndex2) => {
    const data = allexpjobs[selectedRowIndex2];
    console.log(data);
    const completedrowsofthatjobandbranchandlob = await axios.get(
      `${API_BASE_URL}/GetcompletedrowsoforplandateExp`,
      {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),

          jobnumber: data.jobnumber,
        },
      }
    );
    console.log("Response data:", completedrowsofthatjobandbranchandlob.data);
    if (completedrowsofthatjobandbranchandlob.status === 200) {
      const updatedtrack = completedrowsofthatjobandbranchandlob.data.map(
        ({ jobnumber, tatexpcolumn, plandate, actualdate, status }) => ({
          jobnumber,
          tatexpcolumn, // Include only selected fields
          plandate,
          actualdate,
          status,
        })
      );

      setCompletedTracking(updatedtrack);
    }
    // console.log(completedTracking.plandate)
  };

  const openModal = async (e, index) => {
    e.preventDefault();

    // Get the job from currentItems
    const selectedJob = currentItems[index];
    const jobIndexInAllJobs = allexpjobs.findIndex(
      (job) => job.jobnumber === selectedJob.jobnumber
    ); // Find the index in allimpjobs

    if (jobIndexInAllJobs !== -1) {
      setSelectedRowIndex2(jobIndexInAllJobs); // Set the selected row index
      setCompletedTracking([]); // Clear previous tracking data
      await trackingexport(jobIndexInAllJobs); // Fetch tracking data for the selected job

      // Open the modal after fetching the data
      setIsModalOpen2(true);
    }
  };

  const closeModal = () => {
    setCompletedTracking([]);
    setIsModalOpen2(false); // Close modal when done
  };

  const exportToExcel = () => {
    if (!allexpjobs || allexpjobs.length == 0) {
      alert("No data available in export");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(allexpjobs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Export Jobs");
    XLSX.writeFile(wb, "ExportJobs.xlsx");
  };

  useEffect(() => {
    const newFilteredJobs = allexpjobs
      .slice()
      .filter((job) => {
        const jobDate = moment(job.jobdate);
        const selectedStart = selectedStartDate
          ? moment(selectedStartDate).startOf("day")
          : null;
        const selectedEnd = selectedEndDate
          ? moment(selectedEndDate).endOf("day")
          : null;
        const selectedDateMatch =
          (!selectedStart && !selectedEnd) ||
          (selectedStart &&
            selectedEnd &&
            jobDate.isBetween(selectedStart, selectedEnd, null, "[]"));

        return (
          selectedDateMatch && // Include date filtering
          (!selectedMode || job.transportmode === selectedMode) &&
          (!selectedTransportMode ||
            job.owntransportation === selectedTransportMode) &&
          (!selectedDeliveryType ||
            job.deliverymode === selectedDeliveryType) &&
          (!selectedOwnBooking || job.ownbooking === selectedOwnBooking) &&
          (!selectedJobStatus ||
            (selectedJobStatus === "Active" &&
              job.IsActive === 0 &&
              job.IsDeleted === 0 &&
              job.IsComplete === 0) ||
            (selectedJobStatus === "Inactive" &&
              job.IsActive === 1 &&
              job.IsDeleted === 0 &&
              job.IsComplete === 0) ||
            (selectedJobStatus === "Deleted" && job.IsDeleted === 1) ||
            (selectedJobStatus === "Completed" && job.IsComplete === 1)) &&
          (!exportername ||
            job.exportername
              ?.toLowerCase()
              .trim()
              .includes(exportername.toLowerCase())) &&
          (!jobNo ||
            (jobNo.length >= 6 &&
              job.jobnumber.toLowerCase().includes(jobNo.toLowerCase())) ||
            (jobNo.length <= 2 &&
              job.jobnumber
                .split("/")
                .pop()
                .toLowerCase()
                .includes(jobNo.toLowerCase())) || // Search last part if 1-2 digits
            ((jobNo.includes("-") || jobNo.length > 3) &&
              job.jobnumber
                .split("/")[3]
                .toLowerCase()
                .includes(jobNo.toLowerCase()))) && // Search 4th part if it has '-' or length > 3 // Job No. filter
          (!blawb || job.bltypenum.toLowerCase().includes(blawb.toLowerCase())) // MBL/MAWB filter
        );
      })
      .sort((a, b) => moment(b.jobdate).diff(moment(a.jobdate))); // Sort by jobdate in descending order

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [
    allexpjobs,
    selectedStartDate,
    selectedEndDate,
    selectedMode,
    selectedJobStatus,
    exportername,
    jobNo,
    blawb,
    selectedTransportMode,
    selectedDeliveryType,
    selectedOwnBooking,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  // currentItems = currentItems.reverse();
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const uniqueExporters = exporters.filter(
    (exporter, index, self) =>
      index === self.findIndex((e) => e.clientname === exporter.clientname)
  );

  const exporterOptions = [
    { label: "All Exporters", value: "" }, // Add first option
    ...uniqueExporters.map((exporter) => ({
      value: exporter.clientname,
      label: exporter.clientname,
    })),
  ];

  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <div className="IMPORTPaginationAlignment" style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1, y: 0 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
      >
        <div>
          <CCardBody className="button-div">
            <div
              onClick={() => {
                navigate("/expdetails");
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
              <h4>Export Jobs</h4>
            </div>
            {(checkUsername === "admin" || useAdd) && (
              <div className="createjob-button">
                <Link to={"/expcreatejob"} target="_blank" className="link-btn">
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
            <div className="mx-0 container-div-export border-1">
              <CCardBody
                className="form-container mx-0 "
                style={{ marginTop: "-11px" }}
              >
                <div
                  className="date-picker-wrapper"
                  style={{
                    // display: "flex",
                    alignItems: "center",
                    gap: "0px",
                    marginTop: "0px",
                    padding: "0px",
                    marginLeft: "62px",
                    width: "248px",
                  }}
                >
                  <label
                    className="export-label-width"
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
                <div className="grid-container-imp-exp  ">
                  <div
                    className="split-search-date-exporter-dropdown-exp-div"
                    style={{ marginBottom: "2px" }}
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
                      <label htmlFor="Job Date" className="export-label-width">
                        Exporter Name :{" "}
                      </label>
                      <div style={{ display: "flex" }}>
                        <NewDropdownInput
                          type="type1"
                          options={exporterOptions}
                          placeholder={"All Exporters"}
                          selectedValue={exportername}
                          setSelectedValue={setexportername}
                          width={"150px"}
                        />
                      </div>
                    </div>

                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="export-label-width"
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
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        htmlFor="Mode"
                        className="export-label-width"
                        style={{ width: "100px" }}
                      >
                        Status :
                      </label>
                      <NewDropdownInput
                        type="type1"
                        options={[
                          { value: "Active", label: "Active" },
                          { value: "Completed", label: "Completed" },
                          { value: "Inactive", label: "Inactive" },
                          { value: "Deleted", label: "Deleted" },
                        ]}
                        placeholder={"Active"}
                        selectedValue={selectedJobStatus}
                        setSelectedValue={handleStatusChange}
                        width={"150px"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        htmlFor="Mode"
                        className="export-label-width"
                        style={{ width: "110px" }}
                      >
                        Mode :
                      </label>

                      <NewDropdownInput
                        type="type1"
                        options={[
                          { value: "", label: "Both" },
                          { value: "Air", label: "Air" },
                          { value: "Sea", label: "Sea" },
                        ]}
                        placeholder={"Both"}
                        selectedValue={selectedMode}
                        setSelectedValue={handleModeChange}
                        width={"150px"}
                      />
                    </div>
                  </div>
                  <div className="split-search-dropdown-exp-div">
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        htmlFor="Mode"
                        className="export-label-width"
                        style={{ width: "110px" }}
                      >
                        Own Transport :
                      </label>

                      <NewDropdownInput
                        type="type1"
                        options={[
                          { value: "", label: "Both" },
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                        ]}
                        placeholder={"Both"}
                        selectedValue={selectedTransportMode}
                        setSelectedValue={handleOwnTransportChange}
                        width={"150px"}
                      />
                    </div>

                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        htmlFor="Mode"
                        className="export-label-width"
                        style={{ width: "100px" }}
                      >
                        Own Booking :
                      </label>

                      <NewDropdownInput
                        type="type1"
                        options={[
                          { value: "", label: "Both" },
                          { value: "Yes", label: "Yes" },
                          { value: "No", label: "No" },
                        ]}
                        placeholder={"Both"}
                        selectedValue={selectedOwnBooking}
                        setSelectedValue={handleOwnBookingChange}
                        width={"150px"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        className="export-label-width "
                        style={{ width: "100px" }}
                      >
                        BL/AWB :
                      </label>

                      <NewInput
                        width={"150px"}
                        setSelectedValue={setblawb}
                        selectedValue={blawb}
                        placeholder={""}
                        type={"text"}
                      />
                    </div>
                    <div
                      className="grid-container-imp-exp-jobnum"
                      style={{ marginBottom: "2px" }}
                    >
                      <label
                        htmlFor="Mode"
                        className="export-label-width"
                        style={{ width: "110px" }}
                      >
                        Delivery Type :
                      </label>

                      <NewDropdownInput
                        type="type1"
                        options={[
                          { value: "", label: "Both" },
                          { value: "Factory Stuff", label: "Factory Stuff" },
                          { value: "Dock Stuff", label: "Dock Stuff" },
                        ]}
                        placeholder={"Both"}
                        selectedValue={selectedDeliveryType}
                        setSelectedValue={handleDeliveryType}
                        width={"150px"}
                      />
                    </div>
                  </div>
                </div>

                <div className="line"></div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CForm className="form-export" ref={formImportRef}>
                    <table
                      className="min-w-full border-separate"
                      style={{
                        marginTop: "12px",
                        width: "90%",
                        borderCollapse: "separate",
                        borderSpacing: "0 8px",
                        tableLayout: "auto",
                      }}
                    >
                      {/* Table Header */}
                      <thead
                        className="bg-blue-900 text-white"
                        style={{
                          background: "var(--tableHead-bg)",
                          fontSize: "12px",
                          color: " #F6FCFF",
                          fontFamily: "Instrument Sans",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        <tr>
                          {[
                            "Date",
                            "Job No.",
                            "Original Doc. Received",
                            "Exporter Name",
                            "Own Booking",
                            "HBL/HAWB No.",
                            "MBL/MAWB No.",
                            "Own Transportation",
                            "Tracking Status",
                            "Delivery Type",
                            "Job Status",
                            ...(checkUsername === "admin" || useDelete
                              ? ["Action"]
                              : []),
                          ].map((col, index) => (
                            <th
                              key={index}
                              className="head-exp-ref"
                              style={{
                                height: "41px",
                                whiteSpace: "nowrap", // ✅ Prevents text from wrapping
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                minWidth: "50px", // ✅ Ensures a reasonable column width
                                maxWidth: "200px", // ✅ Adjust max width if necessary
                                fontWeight: "500",
                                textAlign: "center",
                                padding: "0px 12px",
                              }}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      {/* Table Body */}
                      <tbody>
                        {currentItems &&
                          currentItems.map((job, index) => {
                            const isDeleted = job.IsDeleted === 1;
                            const isSelected = selectedRowIndex === index;
                            const deletebutton =
                              checkUsername === "admin" || useDelete ? (
                                <Link
                                  onClick={(e) => {
                                    if (!isDeleted) handledeleteOpen(e, index);
                                    else e.preventDefault();
                                  }}
                                  style={{
                                    paddingLeft: "9px",
                                    backgroundColor: "transparent",
                                    cursor: isDeleted
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                >
                                  <DeleteBtn
                                    fill={
                                      isDeleted
                                        ? theme === "dark"
                                          ? "#f8d7da"
                                          : "#ce2020"
                                        : "var(--page-title)"
                                    }
                                  />
                                </Link>
                              ) : null;

                            return (
                              <tr
                                key={index}
                                onDoubleClick={() =>
                                  !isDeleted && handleRowDoubleClick(index)
                                }
                                onClick={() =>
                                  !isDeleted && setSelectedRowIndex(index)
                                }
                                className={`selected-row ${
                                  isDeleted
                                    ? "deleted-selected"
                                    : isSelected
                                    ? "primary-selected"
                                    : ""
                                }`}
                                style={{
                                  backgroundColor: isDeleted
                                    ? theme === "dark"
                                      ? "rgb(123 50 50)"
                                      : "#f8d7da" // Override for deleted rows
                                    : theme === "dark"
                                    ? index % 2 === 0
                                      ? "#3B5472" // Dark  even row
                                      : "#263A52" // Dark mode odd row
                                    : index % 2 === 0
                                    ? "#D8F0FD" // Light mode even row
                                    : "#F6FCFF", // Light mode odd row
                                  cursor: isDeleted ? "not-allowed" : "pointer",
                                  fontSize: "12px",

                                  /* Table Body */
                                  fontFamily: "Instrument Sans",
                                  fontStyle: "normal",
                                  fontWeight: "400",
                                  lineHeight: " normal",
                                  letterSpacing: "0.14px",
                                }}
                              >
                                {[
                                  moment(job.jobdate).format("DD/MM/YYYY"),
                                  job.jobnumber,
                                  moment(job.docreceivedon).format(
                                    "DD/MM/YYYY : LT"
                                  ),
                                  job.exportername,
                                  job.ownbooking,
                                  job.bltype === "HBL/HAWB"
                                    ? job.bltypenum
                                    : "-",
                                  job.bltype === "MBL/MAWB"
                                    ? job.bltypenum
                                    : "-",
                                  job.owntransportation,
                                  <Link
                                    style={{
                                      color:
                                        theme === "dark"
                                          ? "#29B0FF"
                                          : "#5D70D7",
                                      fontWeight: "500",
                                      cursor: "pointer",
                                    }}
                                    className="ShowMoreBtn"
                                    onClick={(e) => openModal(e, index)}
                                  >
                                    Show More
                                  </Link>,
                                  job.deliverymode,
                                  job.IsDeleted === 1
                                    ? "Deleted"
                                    : job.IsComplete === 1
                                    ? "Completed"
                                    : job.IsActive === 0
                                    ? "Active"
                                    : "Inactive",
                                  ...(checkUsername === "admin" || useDelete
                                    ? [deletebutton]
                                    : []),
                                ].map((content, i) => (
                                  <td
                                    key={i}
                                    className="px-3 py-2 rounded-lg"
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      minWidth: "50px",
                                      maxWidth: "200px",
                                      textAlign: "Center",
                                      color: isDeleted
                                        ? theme === "dark"
                                          ? "#f8d7da"
                                          : "#ce2020"
                                        : "var(--tableData-color)",
                                    }}
                                  >
                                    {content}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    {currentPopup === "Deletion" && (
                      <InputPopup
                        title={jobNumberToDelete}
                        setCurrentPopup={setCurrentPopup}
                        fields={contactFields}
                        value={remark}
                        setValue={setRemark}
                        handleAdd={handleDelete}
                        firstButtonText={"Delete"}
                        secondButtonText={"Close"}
                        selection={"none"}
                        top={"50%"}
                        left={"50%"}          width={"450px"}

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
                      <CModalBody>
                        <p>
                          Are you sure you want to delete job Number{" "}
                          {jobNumberToDelete}?
                        </p>
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
                          // onClick={(e) => handleDelete(e, allimpjobs.length - 1 - index)}
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
                </div>
              </CCardBody>
            </div>
          </CCol>
        </div>
      </motion.div>
      {isModalOpen2 === true && (
        <TablePopup
          title={
            completedTracking.length > 0
              ? `Tracking Details of Job No. ${completedTracking[0].jobnumber}`
              : "No Tracking Data Available for job no"
          }
          tableHead={["TAT Column", " Plan Date", "Actual Date", "  Status"]}
          tableData={
            completedTracking.length > 0
              ? completedTracking.map((row) => Object.values(row).slice(1)) // Convert object to array & exclude first field
              : [["--", "--", "--", "--"]]
          }
          setCurrentPopup={setIsModalOpen2}
        />
      )}
      <div
        className="EXPORTpagination"
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

export default Export;
