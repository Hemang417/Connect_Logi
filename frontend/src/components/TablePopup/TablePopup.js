import React from "react";
import styles from "./TablePopup.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CPopover } from "@coreui/react";
const TablePopup = ({
  title,
  tableHead,
  tableData,
  setCurrentPopup,
  bgColor,
}) => {
  // State to track which rows have "Read More" expanded
  const [expandedRows, setExpandedRows] = useState({});
  // Character limit before showing "Read More"
  const CHARACTER_LIMIT = 30;
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
  }, []);
  // Add event listener for key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode == 27) {
        setCurrentPopup("none");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // Return original value if it's not a valid date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${day}/${month}/${year}: ${hours}.${minutes} ${amPm}`;
  };
  // Toggle expanded state for a specific row

  // Function to render cell content, with Read More option for the last column
  const renderCellContent = (cell, cellIndex, rowIndex, isLastColumn) => {
    console.log("Cell", cell);

    if (
      !isLastColumn ||
      (typeof cell === "string" && cell.length <= CHARACTER_LIMIT)
    ) {
      if ((cellIndex === 1 || cellIndex === 2) && typeof cell === "string") {
        return formatDate(cell);
      }
      if (cell === undefined || cell === null) {
        return "--";
      }
      return cell;
    }
    const isExpanded = expandedRows[rowIndex];
    const previewLength = 20; // Number of characters to show in preview

    // For last column that needs truncation and popover
    if (typeof cell === "string" && cell.length > CHARACTER_LIMIT) {
      return (
        <CPopover
          content={<div style={{ textAlign: "center" }}>{cell}</div>}
          trigger={["hover", "focus"]}
        >
          <div className={styles.lastColumnCell}>
            <div
              className={`${styles.cellContent} ${
                isExpanded ? styles.expanded : styles.collapsed
              }`}
              style={{
                maxWidth: isExpanded ? "none" : "300px",
                whiteSpace: "nowrap", // Always keep content in a single line
                overflow: isExpanded ? "auto" : "hidden",
                overflowX: isExpanded ? "scroll" : "hidden", // Add horizontal scroll when expanded
                textOverflow: isExpanded ? "clip" : "ellipsis",
                cursor: "pointer", // Indicate it's clickable
              }}
            >
              {isExpanded
                ? cell // Show full text in a single line with horizontal scroll
                : `${cell.substring(0, previewLength)} ...`}{" "}
            </div>
          </div>
        </CPopover>
      );
    }

    return cell;
  };

  return (
    <>
      <div
        className={styles.darkBg}
        onClick={() => {
          setCurrentPopup("none");
        }}
      ></div>
      <motion.div
        className={styles.popupWrapper} // Add this class to control centering
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className={styles.container} style={{ background: bgColor }}>
          <div className={styles.firstRow}>
            <h2 className={styles.title}>{title}</h2>
            <div
              className={styles.closeBtn}
              onClick={() => {
                setCurrentPopup("none");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 35 35"
                fill="none"
                style={{ filter: "none" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter =
                    "drop-shadow(0px 0px 0.5px rgb(0, 0, 0))")
                }
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                <path
                  d="M22.5017 13.8988L19.0021 17.5L22.5017 21.1012C22.6004 21.2028 22.6787 21.3234 22.7322 21.4562C22.7856 21.589 22.8131 21.7313 22.8131 21.875C22.8131 22.0187 22.7856 22.161 22.7322 22.2938C22.6787 22.4266 22.6004 22.5472 22.5017 22.6488C22.403 22.7504 22.2858 22.8311 22.1568 22.8861C22.0279 22.9411 21.8896 22.9694 21.75 22.9694C21.6104 22.9694 21.4722 22.9411 21.3432 22.8861C21.2142 22.8311 21.097 22.7504 20.9983 22.6488L17.5 19.0463L14.0017 22.6488C13.903 22.7504 13.7858 22.8311 13.6568 22.8861C13.5279 22.9411 13.3896 22.9694 13.25 22.9694C13.1104 22.9694 12.9722 22.9411 12.8432 22.8861C12.7142 22.8311 12.597 22.7504 12.4983 22.6488C12.3996 22.5472 12.3213 22.4266 12.2678 22.2938C12.2144 22.161 12.1869 22.0187 12.1869 21.875C12.1869 21.7313 12.2144 21.589 12.2678 21.4562C12.3213 21.3234 12.3996 21.2028 12.4983 21.1012L15.9979 17.5L12.4983 13.8988C12.2989 13.6936 12.1869 13.4152 12.1869 13.125C12.1869 12.8348 12.2989 12.5564 12.4983 12.3512C12.6977 12.1459 12.9681 12.0306 13.25 12.0306C13.532 12.0306 13.8024 12.1459 14.0017 12.3512L17.5 15.9537L20.9983 12.3512C21.097 12.2496 21.2142 12.1689 21.3432 12.1139C21.4722 12.0589 21.6104 12.0306 21.75 12.0306C21.8896 12.0306 22.0279 12.0589 22.1568 12.1139C22.2858 12.1689 22.403 12.2496 22.5017 12.3512C22.6004 12.4528 22.6787 12.5734 22.7322 12.7062C22.7856 12.839 22.8131 12.9813 22.8131 13.125C22.8131 13.2687 22.7856 13.411 22.7322 13.5438C22.6787 13.6766 22.6004 13.7972 22.5017 13.8988ZM31.3125 17.5C31.3125 20.3122 30.5024 23.0613 28.9847 25.3995C27.4669 27.7378 25.3097 29.5602 22.7858 30.6364C20.2619 31.7126 17.4847 31.9942 14.8053 31.4455C12.126 30.8969 9.66481 29.5427 7.73309 27.5542C5.80138 25.5656 4.48587 23.0321 3.95291 20.2739C3.41995 17.5158 3.69348 14.6569 4.73892 12.0587C5.78436 9.46058 7.55474 7.23992 9.82619 5.67754C12.0976 4.11517 14.7682 3.28125 17.5 3.28125C21.1621 3.28523 24.6731 4.78455 27.2626 7.45022C29.8522 10.1159 31.3086 13.7302 31.3125 17.5ZM29.1875 17.5C29.1875 15.1204 28.502 12.7943 27.2178 10.8158C25.9336 8.83727 24.1082 7.29519 21.9726 6.38457C19.837 5.47396 17.487 5.2357 15.2199 5.69993C12.9527 6.16416 10.8702 7.31002 9.2357 8.99262C7.60117 10.6752 6.48804 12.819 6.03708 15.1528C5.58611 17.4867 5.81756 19.9057 6.70216 22.1042C7.58676 24.3026 9.08478 26.1816 11.0068 27.5036C12.9288 28.8256 15.1884 29.5312 17.5 29.5312C20.5986 29.5276 23.5694 28.2589 25.7604 26.0034C27.9515 23.7479 29.184 20.6898 29.1875 17.5Z"
                  fill={theme === "dark" ? "#f6fcff" : "#1E2652"}
                />
              </svg>
            </div>
          </div>
          <div className={styles.secondRow}>
            <div className={styles.span}>
              <div className={styles.overflow}>
                <table
                  className="min-w-full border-separate"
                  style={{
                    width: "100%",
                    // borderCollapse: "separate", // ✅ Ensure separate borders
                    // borderSpacing: "0 8px", // ✅ Adds spacing between rows
                  }}
                >
                  {/* Table Header */}
                  <thead className={styles.tableHead}>
                    <tr>
                      {tableHead.map((col, index) => (
                        <th
                          key={index}
                          className="py-2 text-center"
                          style={{ fontWeight: "500" , padding: "0px 56px" }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.map((row, rowIndex) => {
                      const rowValues = Object.values(row);
                      return (
                        <>
                        <tr key={rowIndex} style={{ height: "8px" }}></tr>
                        <tr
                          key={rowIndex}
                          className={`rounded-lg shadow-md`}
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
                          {rowValues.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`${styles.tableData} px-4 py-2`}
                            >
                              {renderCellContent(
                                cell,
                                cellIndex,
                                rowIndex,
                                cellIndex === rowValues.length - 1
                              )}
                            </td>
                          ))}
                        </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TablePopup;
