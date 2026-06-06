import React from "react";
import styles from "./css/impCompletedOnTime.module.css";
import { motion } from "framer-motion";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NewDropDown from "../buttons/buttons/NewDropDown";
import moment from "moment";
import Calendar from "src/components/Calendar";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function impCompletedOnTime() {
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [completedJobs, setCompletedJobs] = useState([]);
  const [importers, setImporters] = useState([]);
  const [selectedImporter, setSelectedImporter] = useState("");
  const [searchedJobNo, setsearchedJobNo] = useState("");

  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    console.log(startDate, endDate);
  };

  const fetchImporters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorgs`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      // Correctly map and extract client names
      setImporters(response.data.map((importer) => importer.clientname));
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
  const getCompletedJobs = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/impcompletedjobs`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setCompletedJobs(response.data);
      console.log("jobs response", response.data);
    } catch (error) {
      console.error("Error fetching delayed jobs:", error);
    }
  };

  useEffect(() => {
    fetchImporters();
    getCompletedJobs();
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

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const columns = ["Date", "Job No.", "Importer Name", "Before Time"];

  const uniqueImporters = [...new Set(importers)]; // Remove duplicates

  const formattedImporters = [
    { label: "All Importers", value: "" }, // Add first option
    ...uniqueImporters.map((importer) => ({
      label: importer,
      value: importer,
    })),
  ];

  const SortedJobs = completedJobs.filter((row) => {
    const jobDate = moment(row.Date);
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
      // Date filter logic
      selectedDateMatch && // Include date filtering
      row.ImporterName.toLowerCase().includes(
        (selectedImporter || "").toLowerCase()
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
              navigate("/impdetails");
            }}
            className={styles.backButton}
          >
            <ArrowCircleLeft />
          </div>
          <div className={styles.importBox}>
            <div className={styles.importTitle}>Completed on Time</div>
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
            <label>Importer Name:</label>
            <div>
              <NewDropdownInput
                type={"type1"}
                placeholder={"Importer Name"}
                options={formattedImporters}
                selectedValue={selectedImporter}
                setSelectedValue={setSelectedImporter}
                width={"200px"}
              />
              {/* <NewDropDown width={22} height={21} /> */}
            </div>
          </div>
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
        {/* <div className={styles.thirdRow}>
          <div className={styles.secondRowBlocks}>
            <label>MBL:</label>
            <div className={styles.MBLinput}>
              <input
                type="text"
                class={styles.customInput}
                placeholder="Select MBL"
              />
              <NewDropDown width={22} height={21} />
            </div>
          </div>
        </div> */}

        <div className={styles.fourthRow}>
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
                {SortedJobs.map((row, rowIndex) => (
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
        </div>
      </div>
    </motion.div>
  );
}

export default impCompletedOnTime;
