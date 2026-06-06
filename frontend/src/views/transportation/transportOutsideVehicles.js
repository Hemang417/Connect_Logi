import React from "react";
import styles from "./css/transportOutsideVehicles.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropDown from "../buttons/buttons/NewDropDown";

function transportOutsideVehicles() {
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

  const columns = [
    "Date",
    "Job No.",
    "Customer Name",
    "Container Type",
    "From",
    "To",
    "Profit(Rs)",
    "Profit(%)",
  ];

  const data = [
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
    },
    {
      date: "06.01.25",
      jobNo: "A/Mumbai/24-25",
      customer: "Adani Pvt Ltd.",
      containerType: "20'",
      From: "Mumbai",
      To: "Goa",
      profit1: "Rs. 20,00,000",
      profit2: "80%",
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
          <div className={styles.importBox}>
            <div className={styles.importTitle}>Outside Vehicles</div>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.secondRowBlocks}>
            <label>Job No. :</label>
            <div className={styles.HBLinput}>
              <input
                type="text"
                class={styles.customInput}
                placeholder="Select Job No. "
              />
              <NewDropDown width={22} height={21} />
            </div>
          </div>
          <div className={styles.secondRowBlocks}>
            <label>Customer Name:</label>
            <div className={styles.nameInput}>
              <input
                type="text"
                class={styles.customInput}
                placeholder="Select Customer Name"
              />
              <NewDropDown width={22} height={21} />
            </div>
          </div>
          <div className={styles.secondRowBlocks}>
            <label>Profit:</label>
            <div className={styles.HBLinput}>
              <input
                type="text"
                class={styles.customInput}
                placeholder="Profit"
              />
              <NewDropDown width={22} height={21} />
            </div>
          </div>
        </div>
        <div className={styles.thirdRow}>
          <div className={styles.secondRowBlocks}>
            <label>Container Type:</label>
            <div className={styles.MBLinput}>
              <input
                type="text"
                class={styles.customInput}
                placeholder="Container Type"
              />
              <NewDropDown width={22} height={21} />
            </div>
          </div>
        </div>
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
                {data.map((row, rowIndex) => (
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
                      textAlign: "center",
                    }}
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`${styles.tableData} px-4 py-2`}
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

export default transportOutsideVehicles;
