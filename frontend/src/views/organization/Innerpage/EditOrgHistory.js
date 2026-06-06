import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "src/config/config";
// import "../../css/styles.css"; // Import styles if needed

const EditOrgHistory = () => {
  const [edits, setEdits] = useState([]);
  const [aliasName, setAliasName] = useState();
  const location = useLocation();

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

  const fetchEditData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const alias = queryParams.get("alias");

    if (!alias) {
      console.error("Alias not found in URL parameters");
      return;
    }

    setAliasName(alias);
    console.log("Fetching edit logs for alias:", alias);

    try {
      const response = await axios.get(`${API_BASE_URL}/orgEdits`, {
        params: { alias },
      });

      if (response.data.length === 0) {
        console.warn("No edit logs found for this organization.");
      }

      setEdits(response.data);
    } catch (error) {
      console.error("Error fetching edit logs:", error);
    }
  };

  useEffect(() => {
    fetchEditData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} // Starts faded & moves up
      animate={{ opacity: 1 }} // Becomes fully visible
      exit={{ opacity: 0 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <div
        className="mt-0 container-div"
        style={{ margin: "0px 0px", marginBottom: "24px" }}
      >
        <CCardBody style={{ margin: "20px 0px" }}>
          <div
            style={{
              maxHeight: "440px",
              overflowY: "auto",
              position: "relative",
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "gray transparent",
            }}
          >
            <table
              className="table-wf"
              style={{
                tableLayout: "fixed",
                width: "100%",
                marginTop: "0px",
                borderCollapse: "collapse",
              }}
            >
              {/* Sticky Header */}
              <thead
                // className="table-dark"
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "1020",
                  backgroundColor: "#343a40",
                }}
              >
                <tr className="head-wf" style={{ height: "22px" }}>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "25px",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "25px",
                    }}
                  >
                    Time
                  </th>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "30px",
                    }}
                  >
                    Edit In
                  </th>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "30px",
                    }}
                  >
                    Edit By
                  </th>
                  <th
                    style={{
                      width: "68px",
                      padding: "5px 7px",
                      fontSize: "12px",
                      whiteSpace: "normal", // Allows wrapping
                      wordBreak: "break-word", // Breaks long words
                    }}
                  >
                    Changes Done
                  </th>
                </tr>
              </thead>

              {/* Scrollable Body */}
              <tbody className="text-center">
                {edits.length > 0 ? (
                  edits.map((edit, index) => (
                    <>
                      <tr style={{ height: "10px", width: "100%" }}></tr>
                      <tr key={index} className="text-center">
                        <td
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472" // Dark mode even row
                                  : "#263A52" // Dark mode odd row
                                : index % 2 === 0
                                ? "#D8F0FD" // Light mode even row
                                : "#F6FCFF", // Light mode odd row

                            transition: "background-color 0.3s ease",
                          }}
                        >
                          {new Date(edit.editedon).toLocaleDateString("en-GB")}
                        </td>
                        <td
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472" // Dark mode even row
                                  : "#263A52" // Dark mode odd row
                                : index % 2 === 0
                                ? "#D8F0FD" // Light mode even row
                                : "#F6FCFF", // Light mode odd row

                            transition: "background-color 0.3s ease",
                          }}
                        >
                          {new Date(edit.editedon).toLocaleTimeString()}
                        </td>
                        <td
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472" // Dark mode even row
                                  : "#263A52" // Dark mode odd row
                                : index % 2 === 0
                                ? "#D8F0FD" // Light mode even row
                                : "#F6FCFF", // Light mode odd row

                            transition: "background-color 0.3s ease",
                          }}
                        >
                          {edit.editin}
                        </td>
                        <td
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472" // Dark mode even row
                                  : "#263A52" // Dark mode odd row
                                : index % 2 === 0
                                ? "#D8F0FD" // Light mode even row
                                : "#F6FCFF", // Light mode odd row

                            transition: "background-color 0.3s ease",
                          }}
                        >
                          {edit.editedby}
                        </td>
                        <td
                          style={{
                            textAlign: "left",
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472"
                                  : "#263A52"
                                : index % 2 === 0
                                ? "#D8F0FD"
                                : "#F6FCFF",
                            // transition: "background-color 0.3s ease",
                            // whiteSpace: "normal", // Allows text wrapping
                            wordBreak: "break-word", // Ensures long words break properly
                            maxWidth: "100%", // Ensures it takes the remaining space
                            // overflowWrap: "break-word",
                          }}
                        >
                          {/* {edit.changesDetails.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))} */}

                          {edit.changesDetails.split("\n").map((line, i) => {
                            // Enhanced regex to handle both simple values and array structures
                            const match = line.match(
                              /^(.*?changed\s+from\s+)(?:"?(\[[^\]]*\]|"[^"]*"|[^\s]+))(?:\s+to\s+)(?:"?(\[[^\]]*\]|"[^"]*"|[^\s]+))?(.*)$/i
                            );

                            if (match) {
                              return (
                                <div
                                  key={i}
                                  style={{ marginTop: i !== 0 ? "0.5em" : 0 }}
                                >
                                  {match[1]}
                                  <strong>{match[2]}</strong>
                                  {" to "}
                                  <strong>{match[3]}</strong>
                                  {match[4]}
                                </div>
                              );
                            }

                            // Handle contact headers
                            if (/^Contact\s+\d+:$/i.test(line.trim())) {
                              return (
                                <div
                                  key={i}
                                  style={{
                                    marginTop: "1em",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {line}
                                </div>
                              );
                            }

                            // Fallback for other lines
                            return (
                              <div
                                key={i}
                                style={{ marginTop: i !== 0 ? "0.5em" : 0 }}
                              >
                                {line}
                              </div>
                            );
                          })}
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "#263A52" // Dark mode odd row
                            : "#F6FCFF", // Light mode odd row

                        transition: "background-color 0.3s ease",
                      }}
                    >
                      No edit logs available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </div>
    </motion.div>
  );
};

export default EditOrgHistory;
