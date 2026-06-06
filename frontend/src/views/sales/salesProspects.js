import React from "react";
import styles from "./css/salesProspects.module.css";
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewTable from "src/components/newTable/NewTable";
import DashboardPopup from "src/components/dashboardPopup/DashboardPopup";
import LeftArrowInactive from "../buttons/buttons/LeftArrowInactive";
import RightArrowActive from "../buttons/buttons/RightArrowActive";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import ArrowCircleRight from "../buttons/buttons/ArrowCircleRight";
import RightArrow from "../buttons/buttons/RightArrow";

function salesProspects() {
  const navigate = useNavigate();
  const [currentPopup, setCurrentPopup] = useState("");
  const [activeTab, setactiveTab] = useState("Converted Prospects List");
  const tabs = ["Converted Prospects List", "Rejected Prospects List"];
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
    "Customer Name",
    "Contact Person Name",
    "Contact Details",
    "E-Mail ID",
    "Address",
    "Source",
  ];
  const data2 = [
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
  ];
  const data = [
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
    },
    {
      customerName: "06.01.25",
      ContactPersonName: "A/Mumbai/24-25",
      ContactDetails: "Adani Pvt Ltd.",
      ContactDetails: "Rs. 20,000",
      EMailID: "Rs. 20,000",
      Address: "Rs. 20,000",
      Source: "Rs. 20,000",
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
            <ArrowCircleLeft />
          </div>
          <div className={styles.salesBox}>
            <div className={styles.outerBoxSalesTitle}>
              <span>
                <LeftArrowInactive />
              </span>
              <div className={styles.salesTitle}> Sales: Prospects </div>
              <span onClick={() => navigate("/salesEnquiry")}>
                <RightArrowActive />
              </span>
            </div>
            <div
              className={styles.salesTotalJobs}
              onDoubleClick={() => navigate("/Prospect")}
            >
              Total No. of Prospects: 23
              <RightArrow height={8} width={10}/>
            </div>
          </div>
          <div className={styles.datePicker}>
            <div className={styles.DatePickerTitle}>Date: </div>
            <div className={styles.startEndDateContainer}>
              <Calendar />
            </div>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div
            className={styles.firstBlock}
            onDoubleClick={() => setCurrentPopup("callings")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Total No. of Callings</div>
                <div className={styles.firstBlockNo}>43</div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.secondBlock}
            onDoubleClick={() => setCurrentPopup("visits")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>
                  Total No. of Client Visits
                </div>
                <div className={styles.secondBlockNo}>23</div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.thirdBlock}
            onDoubleClick={() => setCurrentPopup("media")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>
                  Total No. of Social Media
                </div>
                <div className={styles.thirdBlockNo}>19</div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
        </div>
        {currentPopup === "media" && (
          <DashboardPopup
            title="Total No. of Social Media"
            content={
              <div>
                <div>
                  <li>Sales Person:</li>
                  <li>Service 1:</li>
                  <li>Service 2:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-2, #9C565A)"
            textColor="text-white"
          />
        )}
        {currentPopup === "visits" && (
          <DashboardPopup
            title="Total No. of Client Visits"
            content={
              <div>
                <div>
                  <li>Sales Person:</li>
                  <li>Service 1:</li>
                  <li>Service 2:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor=" var(--Card-Bg, #333D70)"
            textColor="text-white"
          />
        )}
        {currentPopup === "callings" && (
          <DashboardPopup
            title="Total No. of Callings"
            content={
              <div>
                <div>
                  <li>Sales Person:</li>
                  <li>Service 1:</li>
                  <li>Service 2:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-1, #337039)"
            textColor="text-white"
          />
        )}
        <div className={styles.line}></div>
        <div className={styles.thirdRow}>
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
        <div className={styles.fifthRow}>
          {" "}
          {activeTab === "Converted Prospects List" && (
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
          {activeTab === "Rejected Prospects List" && (
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

export default salesProspects;
