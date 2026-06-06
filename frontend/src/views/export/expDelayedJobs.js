import React from "react";
import styles from "./css/expDelayedJobs.module.css";
import { motion } from "framer-motion";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "src/components/Calendar";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import axios from "axios";
import Select from "react-select";
import TablePopup from "src/components/TablePopup/TablePopup";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function expDelayedJobs() {
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [delayedJobs, setDelayedJobs] = useState([]);
  const [milestoneData, setmilestoneData] = useState([]);
  const [exporters, setExporters] = useState([]);
  const [filteredMilestones, setFilteredMilestones] = useState([]);
  const [activeTab, setactiveTab] = useState("Delayed Jobs");
  const [selectedExporter, setSelectedExporter] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [searchedJobNo, setsearchedJobNo] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const [delayedJobsDetails, setDelayedJobsDetails] = useState([]);
  const [selectedjobNo, setselectedjobNo] = useState("");

  const tabs = ["Delayed Jobs", "Delayed Milestones"];

  const fetchExporters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorgs`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setExporters(response.data.map((exporter) => exporter.clientname));
      // console.log("Exporter: ", response.data);
    } catch (error) {
      console.log(error);
    }
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

  const getMilestones = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getmilestones`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });

      const fetchedMilestones = response.data;
      const workflowLobNames = ["Air EXPORT", "Sea EXPORT"];
      const workflowBranchName =
        localStorage.getItem("branchnameofemp") || "ALL";

      let filtered = fetchedMilestones.filter(
        (milestone) =>
          workflowLobNames.includes(milestone.lobname) &&
          (milestone.ownbranchname === workflowBranchName ||
            milestone.ownbranchname === "ALL")
      );

      // console.log("Milestones: ", filtered);

      // Normalize names and remove duplicates
      const testMapping = new Set();
      filtered.forEach((item) => {
        if (item.milestonename) {
          const normalizedMilestone = item.milestonename.trim().toUpperCase(); // Normalize case and trim
          testMapping.add(normalizedMilestone);
        } else {
          console.log("Missing milestonename in:", item);
        }
      });

      const uniqueMilestones = [...testMapping]; // Convert Set back to Array

      // console.log("Unique milestone names:", uniqueMilestones);
      setFilteredMilestones(uniqueMilestones);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModelOpen = async (jobno) => {
    await getDelayedJobsDetails(jobno);
    setselectedjobNo(jobno);
    setisModalOpen(true);
  };
  const getDelayedJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/expdelayedjobs`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
        },
      });
      setDelayedJobs(response.data);
      // console.log("jobs response", response.data);
    } catch (error) {
      console.error("Error fetching delayed jobs:", error);
    }
  };

  const getDelayedMilestone = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/expdelayedmilestones`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setmilestoneData(response.data);
      // console.log("milestone response", response.data);
    } catch (error) {
      console.error("Error fetching delayed milestones:", error);
    }
  };

  const getDelayedJobsDetails = async (jobno) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/expdelayedjobdetails`,
        {
          params: {
            jobnumber: jobno,
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setDelayedJobsDetails(response.data);
      // console.log("details response", response.data);
    } catch (error) {
      console.error("Error fetching delayed job details:", error);
    }
  };

  useEffect(() => {
    fetchExporters();
    getMilestones();
    getDelayedJobs();
    getDelayedMilestone();
    getDelayedJobsDetails();
  }, []);

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
  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const columns = [
    "Date",
    "Job No.",
    "Exporter Name",
    "Milestone",
    "Time Delay",
    "Remark",
  ];
  const columns2 = [
    "Date",
    "Job No.",
    "Exporter Name",
    "No of Delayed Milestone",
  ];

  const uniqueExporters = [...new Set(exporters)]; // Remove duplicates

  const formattedExporters = [
    { label: "All Exporters", value: "" }, // Add first option
    ...uniqueExporters.map((exporter) => ({
      label: exporter,
      value: exporter,
    })),
  ];

  // Format for dropdown
  const formattedMilestones = [
    { label: "All Milestones", value: "" }, // Add first option
    ...filteredMilestones.map((milestone) => ({
      label: milestone.charAt(0).toUpperCase() + milestone.slice(1), // Capitalize first letter
      value: milestone,
    })),
  ];

  const SortedMilestones = milestoneData.filter((row) => {
    const rowDate = moment(row.Date); // Convert row date to Date object
    return (
      // Date filter logic
      (!selectedStartDate ||
        rowDate >= moment(selectedStartDate).startOf("day")) && // Check if rowDate is after or equal to startDate
      (!selectedEndDate || rowDate <= moment(selectedEndDate).endOf("day")) && // Check if rowDate is before or equal to endDate
      (!selectedExporter ||
        row.exporterName
          .toLowerCase()
          .includes((selectedExporter || "").toLowerCase())) &&
      (!selectedMilestone ||
        row.MilestoneName.toLowerCase().includes(
          (selectedMilestone || "").toLowerCase()
        )) &&
      (!searchedJobNo ||
        (searchedJobNo.length >= 6 &&
          row.JobNumber.toLowerCase().includes(searchedJobNo.toLowerCase())) ||
        (searchedJobNo.length <= 2 &&
          row.JobNumber.split("/")
            .pop()
            .toLowerCase()
            .includes(searchedJobNo.toLowerCase())) || // Search last part if 1-2 digits
        ((searchedJobNo.includes("-") || searchedJobNo.length > 3) &&
          row.JobNumber.split("/")[3]
            .toLowerCase()
            .includes(searchedJobNo.toLowerCase())))
    );
  });

  const SortedJobs = delayedJobs.filter((row) => {
    const rowDate = moment(row.Date); // Convert row date to Date object
    return (
      // Date filter logic
      (!selectedStartDate ||
        rowDate >= moment(selectedStartDate).startOf("day")) && // Check if rowDate is after or equal to startDate
      (!selectedEndDate || rowDate <= moment(selectedEndDate).endOf("day")) && // Check if rowDate is before or equal to endDate
      row.ExporterName.toLowerCase().includes(
        (selectedExporter || "").toLowerCase()
      ) &&
      (!searchedJobNo ||
        (searchedJobNo.length >= 6 &&
          row.Jobnumber.toLowerCase().includes(searchedJobNo.toLowerCase())) ||
        (searchedJobNo.length <= 2 &&
          row.Jobnumber.split("/")
            .pop()
            .toLowerCase()
            .includes(searchedJobNo.toLowerCase())) || // Search last part if 1-2 digits
        ((searchedJobNo.includes("-") || searchedJobNo.length > 3) &&
          row.Jobnumber.split("/")[3]
            .toLowerCase()
            .includes(searchedJobNo.toLowerCase())))
    );
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <div className={styles.container}>
        <div className={styles.firstRow}>
          <div
            onClick={() => {
              navigate("/expdetails");
            }}
            className={styles.backButton}
          >
            <ArrowCircleLeft />
          </div>
          <div className={styles.exportBox}>
            <div className={styles.exportTitle}>{activeTab}</div>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.secondRowBlocks}>
            <label>Date:</label>
            <div className={styles.calender}>
              <Calendar onDateSelect={handleDateSelect} />
            </div>
          </div>
          <div className={styles.secondRowBlocks}>
            <label>Exporter Name:</label>
            <div>
              <NewDropdownInput
                type={"type1"}
                placeholder={"Exporter Name"}
                options={formattedExporters}
                selectedValue={selectedExporter}
                setSelectedValue={setSelectedExporter}
                width={"200px"}
              />

              {/* <NewDropDown width={22} height={21} /> */}
            </div>
          </div>
          {activeTab === "Delayed Milestones" && (
            <div className={styles.secondRowBlocks}>
              <label>Milestones:</label>
              <div>
                <NewDropdownInput
                  type="type1"
                  placeholder={"Select Milestone"}
                  options={formattedMilestones}
                  selectedValue={selectedMilestone}
                  setSelectedValue={setSelectedMilestone}
                  width={"200px"}
                />
              </div>
            </div>
          )}
          {activeTab === "Delayed Jobs" && (
            <div className={styles.secondRowBlocks}>
              <label>Job No:</label>
              <div className={styles.MBLinput}>
                <input
                  type="text"
                  class={styles.customInput}
                  placeholder="Search Job No"
                  value={searchedJobNo}
                  onChange={(e) => setsearchedJobNo(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        {activeTab === "Delayed Jobs" && (
          <div className={styles.thirdRow}></div>
        )}
        {activeTab === "Delayed Milestones" && (
          <div className={styles.thirdRow}>
            <div className={styles.secondRowBlocks}>
              <label>Job No:</label>
              <div className={styles.MBLinput}>
                <input
                  type="text"
                  class={styles.customInput}
                  placeholder="Search Job No"
                  value={searchedJobNo}
                  onChange={(e) => setsearchedJobNo(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        <div className={styles.line}></div>

        <div className={styles.tabsRow}>
          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <div
                key={tab}
                className={
                  tab === activeTab
                    ? `${styles.tabs} ${styles.ActiveTab}`
                    : styles.tabs
                }
                onClick={() => setactiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.fourthRow}>
          {activeTab === "Delayed Jobs" && (
            <div className="overflow-x-auto">
              <table
                className="min-w-full border-separate"
                style={{
                  width: "100%",
                  borderCollapse: "separate", // ✅ Ensure separate borders
                  borderSpacing: "0 8px", // ✅ Adds spacing between rows
                }}
              >
                {/* Table Header */}
                <thead className={styles.tableHead}>
                  <tr>
                    {columns2.map((col, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 text-left"
                        style={{ fontWeight: "500", textAlign: "center" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {SortedJobs.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={` rounded-lg shadow-md`}
                      onDoubleClick={() => {
                        handleModelOpen(row.Jobnumber);
                      }}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? rowIndex % 2 === 0
                              ? "#3B5472" // Dark mode even row
                              : "#263A52" // Dark mode odd row
                            : rowIndex % 2 === 0
                            ? "#D8F0FD" // Light mode even row
                            : "#F6FCFF", // Light mode odd row
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {Object.values(row).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`${styles.tableData} px-4 py-2`}
                          style={{ textAlign: "center" }}
                        >
                          {cellIndex === 0 && typeof cell === "string" // Check if it's the first column
                            ? new Date(cell).toLocaleDateString("en-GB") // Format as DD/MM/YYYY
                            : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "Delayed Milestones" && (
            <div className="overflow-x-auto">
              <table
                className="min-w-full border-separate"
                style={{
                  width: "100%",
                  borderCollapse: "separate", // ✅ Ensure separate borders
                  borderSpacing: "0 8px", // ✅ Adds spacing between rows
                }}
              >
                {/* Table Header */}
                <thead className={styles.tableHead}>
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={index}
                        className="px-4 py-2 text-left"
                        style={{ fontWeight: "500", textAlign: "center" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {SortedMilestones.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={` rounded-lg shadow-md`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? rowIndex % 2 === 0
                              ? "#3B5472" // Dark mode even row
                              : "#263A52" // Dark mode odd row
                            : rowIndex % 2 === 0
                            ? "#D8F0FD" // Light mode even row
                            : "#F6FCFF", // Light mode odd row
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {Object.values(row).map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`${styles.tableData} px-4 py-2`}
                          style={{ textAlign: "center" }}
                        >
                          {cellIndex === 0 && typeof cell === "string" // Check if it's the first column
                            ? new Date(cell).toLocaleDateString("en-GB") // Format as DD/MM/YYYY
                            : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {isModalOpen === true && (
          <TablePopup
            title={selectedjobNo}
            tableHead={[
              "Milestone Name",
              "Plan Date",
              " Actual Date",
              "Time Delay",
              "  Remark",
            ]}
            tableData={delayedJobsDetails}
            setCurrentPopup={setisModalOpen}
          />
        )}
      </div>
    </motion.div>
  );
}

export default expDelayedJobs;
