import React from "react";
import styles from "./css/salesEnquiry.module.css";
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewTable from "src/components/newTable/NewTable";
import DashboardPopup from "src/components/dashboardPopup/DashboardPopup";
import { act } from "react-dom/test-utils";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import ArrowCircleRight from "../buttons/buttons/ArrowCircleRight";
import LeftArrowActive from "../buttons/buttons/LeftArrowActive";
import RightArrowActive from "../buttons/buttons/RightArrowActive";
import RightArrow from "../buttons/buttons/RightArrow";

function salesEnquiry() {
  const navigate = useNavigate();
  const [currentPopup, setCurrentPopup] = useState("");
  const [activeTab, setactiveTab] = useState("Working Completed Enquiries");
  const tabs = ["Working Completed Enquiries", "Pending Enquiries"];
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
    "RFQ No.",
    "Customer Name",
    "Profit (Vehicle-Wise)",
    "Line of Business",
  ];
  const columns2 = [
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
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
    },
    {
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
    },
    {
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
    },
    {
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
    },
    {
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
    },
    {
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
    },

    {
      RFQNo: "06.01.25",
      CustomnerName: "A/Mumbai/24-25",
      profit: "Adani Pvt Ltd.",
      lineOfBusiness: "Rs. 20,000",
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
              <span onClick={() => navigate("/salesProspects")}>
                <LeftArrowActive />
              </span>
              <div className={styles.salesTitle}> Sales: Enquiry </div>
              <span onClick={() => navigate("/salesQuotations")}>
                <RightArrowActive />
              </span>
            </div>
            <div
              className={styles.salesTotalJobs}
              onDoublelick={() => navigate("/NewEnquiry")}
            >
              Total No. of Enquiry: 23
              <RightArrow height={8} width={10} />
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
            onDoubleClick={() => setCurrentPopup("Custom Clearance")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Custom Clearance</div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.secondBlock}
            onDoubleClick={() => setCurrentPopup("Freight Forwarding")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Freight Forwarding </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.thirdBlock}
            onDoubleClick={() => setCurrentPopup("Transportation")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Transportation</div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.fourthBlock}
            onDoubleClick={() => setCurrentPopup("Exim Consultancy")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Exim Consultancy</div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
        </div>
        {currentPopup === "Custom Clearance" && (
          <DashboardPopup
            title="Custom Clearance"
            content={
              <div>
                <div>
                  <li>Enquiry through:</li>
                  <li>Completed:</li>
                  <li>Pending:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-5, #8E7B3A)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Freight Forwarding" && (
          <DashboardPopup
            title="Freight Forwarding"
            content={
              <div>
                <div>
                  <li>Enquiry through:</li>
                  <li>Completed:</li>
                  <li>Pending:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-7, #4092A4)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Transportation" && (
          <DashboardPopup
            title="Transportation"
            content={
              <div>
                <div>
                  <li>Enquiry through:</li>
                  <li>Completed:</li>
                  <li>Pending:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-6, #A44082)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Exim Consultancy" && (
          <DashboardPopup
            title="Exim Consultancy"
            content={
              <div>
                <div>
                  <li>Enquiry through:</li>
                  <li>Completed:</li>
                  <li>Pending:</li>
                </div>
                <div>
                  <li> Mr. Amey Patil</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg, #333D70)"
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
        <div className={styles.fourthRow}>
          *Custom Clearance= CC, Freight Forwarding= FF, Transportation= T, Exim
          Consultancy= EC*
        </div>
        <div className={styles.fifthRow}>
          {" "}
          {activeTab === "Working Completed Enquiries" && (
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
          {activeTab === "Pending Enquiries" && (
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

export default salesEnquiry;
