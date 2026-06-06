import React from "react";
import styles from "./css/transportOwnVehicles.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";

function transportOwnVehicles() {
  const navigate = useNavigate();
  const [activeTab, setactiveTab] = useState("Vehicle Performance");
  const tabs = ["Vehicle Performance", "Expenses"];
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

  const columns = [
    "Sr. No.",
    "Vehicle No.",
    "Billing Amount",
    "Profit (Rs)",
    "Profit (%)",
    "Total Expenses",
  ];

  const data1 = [
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
    {
      SrNo: "1",
      VehicleNo: "MH 02 RH 1010",
      NoofTrips: "45",
      billig: "Rs 32,300",
      Profit2: "Rs 32,300",
      expanse: "Rs 32,300",
    },
  ];

  const columns2 = [
    "Vehicle No.",
    "Diesel",
    "Toll Tax",
    "Driver Salary",
    "Running",
    "Servicing",
    "Taxation",
    "EMI",
  ];
  const data2 = [
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },

    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
    },
    {
      VehicleNo: "MH 02 RH 1010",
      Diesel: "Rs 32,300",
      TollTax: "Rs 32,300",
      DriverSalary: "Rs 32,300",
      Running: "Rs 32,300",
      Servicing: "Rs 32,300",
      Taxation: "Rs 32,300",
      EMI: "Rs 32,300",
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
              navigate("/transportDetails");
            }}
            className={styles.backButton}
          >
            <ArrowCircleLeft />
          </div>
          <div className={styles.impTransBox}>
            <div className={styles.impTransTitle}>Own Vehicle</div>
          </div>
        </div>
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
                        style={{ fontWeight: "500" , textAlign: "center" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {data1.map((row, rowIndex) => (
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
                            transition: "background-color 0.3s ease",   textAlign: "center",
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
          {activeTab === "Expenses" && (
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
                        style={{ fontWeight: "500" , textAlign: "center" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {data2.map((row, rowIndex) => (
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
                            transition: "background-color 0.3s ease", textAlign: "center"
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

export default transportOwnVehicles;
