import React from "react";
import styles from "./css/expCompletedOnTime.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "src/components/Calendar";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropDown from "../buttons/buttons/NewDropDown";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function expCompletedOnTime() {
  const navigate = useNavigate();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [completedJobs, setCompletedJobs] = useState([]);
  const [exporters, setExporters] = useState("");
  const [selectedExporter, setSelectedExporter] = useState("");
  const [searchedJobNo, setsearchedJobNo] = useState("");

  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const fetchExporters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorgs`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setExporters(response.data.map((exporters) => exporters.clientname));
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedJobs = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/expcompletedjobs`,
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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  useEffect(() => {
    fetchExporters();
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

  const uniqueExporters = [...new Set(exporters)]; // Remove duplicates

  const formattedExporters = [
    { label: "All Exporters", value: "" }, // Add first option
    ...uniqueExporters.map((exporter) => ({
      label: exporter,
      value: exporter,
    })),
  ];

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const columns = ["Date", "Job No.", "Exporter Name", "Before Time"];

  const SortedJobs = completedJobs.filter((row) => {
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

export default expCompletedOnTime;
