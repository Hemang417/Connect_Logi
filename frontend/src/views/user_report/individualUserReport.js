import React from "react";
import styles from "./css/individualUserReport.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "src/components/Calendar";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";

function individualUserReport() {
  const navigate = useNavigate();
  const [activeTab, setactiveTab] = useState("Import");
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
  

  const tabs = [
    "Import",
    "Export",
    "Transportation",
    "Freight Forwarding",
    "Accounts",
    "Sales",
    "General",
  ];
  const columns = [
    "Milestone",
    "Total",
    "Completed",
    "Pending",
    "Percentage(%)",
  ];
  const columns2 = [
    "Date",
    "Task",
    "Deadline",
    "Completed Date",
    "Time Delay",
    "Status",
  ];
  const data2 = [
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
    {
      Date: "06.01.25",
      Task: "A/Mumbai/24-25",
      Deadline: "Adani Pvt Ltd.",
      CompletedDate: "Rs. 20,000",
      TimeDelay: "Rs. 20,000",
      Status: "Rs. 20,000",
    },
  ];
  const data = [
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
    },
    {
      Milestone: "06.01.25",
      Total: "A/Mumbai/24-25",
      Completed: "Adani Pvt Ltd.",
      Pending: "Rs. 20,000",
      Percentage: "Rs. 20,000",
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
              navigate("/dashboard");
            }}
            className={styles.backButton}
          >
           <ArrowCircleLeft/>
          </div>
          <div className={styles.userReportBox}>
            <div className={styles.userReportTitle}>Service Report</div>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.secondRowBlocks}>
            <label className={styles.userNameAndId}>Name:</label>
            <label className={styles.userNameAndIdValue}>Aryan Shinde</label>
            <label className={styles.userNameAndId}>ID:</label>
            <label className={styles.userNameAndIdValue}>1223445</label>
          </div>
          <div className={styles.secondRowBlocks}>
            <label>Branch:</label>
            <div className={styles.branchinput}>
              <input
                type="text"
                class={styles.customInput}
                placeholder="Select Branch"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
                viewBox="0 0 30 29"
                fill="none"
              >
                <path
                  d="M25.0383 11.5167L15.6633 20.5792C15.5762 20.6634 15.4729 20.7303 15.359 20.7759C15.2452 20.8215 15.1232 20.845 15 20.845C14.8768 20.845 14.7548 20.8215 14.641 20.7759C14.5272 20.7303 14.4238 20.6634 14.3368 20.5792L4.96175 11.5167C4.78584 11.3466 4.68701 11.116 4.68701 10.8755C4.68701 10.635 4.78584 10.4044 4.96175 10.2343C5.13766 10.0643 5.37625 9.96875 5.62503 9.96875C5.87381 9.96875 6.1124 10.0643 6.28831 10.2343L15 18.6568L23.7118 10.2343C23.7989 10.1501 23.9023 10.0833 24.0161 10.0378C24.1299 9.9922 24.2519 9.96875 24.375 9.96875C24.4982 9.96875 24.6202 9.9922 24.734 10.0378C24.8478 10.0833 24.9512 10.1501 25.0383 10.2343C25.1254 10.3185 25.1945 10.4185 25.2417 10.5285C25.2888 10.6385 25.3131 10.7564 25.3131 10.8755C25.3131 10.9946 25.2888 11.1125 25.2417 11.2225C25.1945 11.3325 25.1254 11.4325 25.0383 11.5167Z"
                  fill="#535B87"
                />
              </svg>
            </div>
          </div>
          <div className={styles.secondRowBlocks}>
            <label>Date:</label>
            <div className={styles.calender}>
              <Calendar />
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.thirdRow}>
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
        <div className={styles.fourthRow}>
          {activeTab === "Import" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
            </motion.div>
          )}
          {activeTab === "Export" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
            </motion.div>
          )}
          {activeTab === "Transportation" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
            </motion.div>
          )}
          {activeTab === "Freight Forwarding" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
            </motion.div>
          )}
          {activeTab === "Accounts" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
            </motion.div>
          )}
          {activeTab === "Sales" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
            </motion.div>
          )}
          {activeTab === "General" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
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
                     style={{ fontWeight: "500" }}
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
                         transition: "background-color 0.3s ease",
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
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default individualUserReport;
