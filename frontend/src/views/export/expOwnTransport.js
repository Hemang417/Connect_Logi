import React from "react";
import styles from "./css/expOwnTransport.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import Cookies from "js-cookie";

function impOwnTransport() {
  const navigate = useNavigate();
  const [activeTab, setactiveTab] = useState("Vehicle Performance");
  const tabs = ["Vehicle Performance", "Milestones"];
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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

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
              navigate("/expdetails");
            }}
            className={styles.backButton}
          >
            <ArrowCircleLeft />
          </div>
          <div className={styles.expTransBox}>
            <div className={styles.expTransTitle}>Own Transportation</div>
            <div className={styles.expTransTotalJobs}>
              Total No. of Own Transportation Vehicles: 23
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
          <div className={styles.secondPart}>
            <div className={styles.title}>Transport Enquiry</div>
            <div className={styles.innerContainer}>
              {" "}
              <div className={styles.subBox}>
                <div className={styles.subTitle}>
                  Total Transport Enquiries received for Export:
                </div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>
                  Number of Vehicles placed from Total Enquiries:
                </div>
                <div className={styles.subNo}>23</div>
              </div>
            </div>
          </div>
          <div className={styles.thirdPart}>
            <div className={styles.title}>Outside Vehicle Summary</div>
            <div className={styles.innerContainer}>
              {" "}
              <div className={styles.subBox}>
                <div className={styles.subTitle}>
                  Total Transport Enquiries received for Export:
                </div>
                <div className={styles.subNo}>23</div>
              </div>
              <div className={styles.subBox}>
                <div className={styles.subTitle}>
                  Number of Vehicles placed from Total Enquiries:
                </div>
                <div className={styles.subNo}>23</div>
              </div>
            </div>
          </div>
        </div>
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

        <div className={styles.thirdRow}>
          {activeTab === "Vehicle Performance" && (
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
          )}
          {activeTab === "Milestones" && (
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
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default impOwnTransport;
