import React from "react";
import styles from "./css/impOwnBooking.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import Cookies from "js-cookie";

function impOwnBooking() {
  const navigate = useNavigate();
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
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);
  const columns = [
    "Sr. No.",
    "Vehicle No.",
    "No. of Trips",
    "Profit (Vehicle-Wise)",
  ];

  const data = [
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      Profit: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      Profit: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      Profit: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      Profit: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      Profit: "Rs 32,300",
    },
  ];
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
          <div className={styles.impBookBox}>
            <div className={styles.impBookTitle}>Own Booking</div>
            <div className={styles.impBookTotalJobs}>
              Total Bookings handled directly by the company: 32{" "}
            </div>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.firstPart}>
            <div className={styles.title}>Container Details</div>
            <div className={styles.innerContainer}>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>20’ Containers</div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>40’ Containers</div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>20’ ISO Tanks</div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>40’ ISO Tanks</div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>LCL</div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>Break Bulk</div>
                <div className={styles.subNo}>23</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.thirdRow}>
          <div className={styles.tableTitle}>Profit Analysis for Import</div>
          <div className={styles.graphMainContainer}>
            <div className={styles.graphInnerBox}>
              <div className={styles.graphTitle}>
                <label
                  className={styles.impBookTotalJobs}
                  style={{
                    color: "var(--Table-Column, #2F4096)",
                    fontSize: "16px",
                  }}
                >
                  Count of services provided for Import: 35
                </label>
              </div>
              <div className={styles.graph}></div>
            </div>
            <div className={styles.graphInnerBox}>
              <div className={styles.graphTitle}>
                <label
                  className={styles.impBookTotalJobs}
                  style={{
                    color: "var(--Table-Column, #2F4096)",
                    fontSize: "16px",
                  }}
                >
                  Profit generated from Import services: 75
                </label>
              </div>
              <div className={styles.graph}></div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.fourthRow}>
          <div className={styles.tableTitle2} style={{ paddingLeft: "25px" }}>
            Milestone-Wise Report
          </div>
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
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="rounded-lg shadow-md">
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`${styles.tableData} px-4 py-2 rounded-lg`}
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? rowIndex % 2 === 0
                                ? "#3B5472"
                                : "#263A52"
                              : rowIndex % 2 === 0
                              ? "var(--Card-Row-2, #D8F0FD)"
                              : "var(--Table-Row-1, #F6FCFF)",
                          transition: "background-color 0.3s ease",
                          textAlign: "center",
                        }}
                      >
                        {cell}
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

export default impOwnBooking;
