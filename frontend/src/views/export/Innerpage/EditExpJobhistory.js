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

const EditExpJobhistory = () => {
  const [edits, setEdits] = useState([]);
  const [jobnumber, setjobnumber] = useState();
  const location = useLocation();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const contactFields = [{ id: "branchName", label: "Branch Name" }];

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
    const jobNumber = queryParams.get("jobnumber");

    if (!jobNumber) {
      console.error("jobnumber not found in URL parameters");
      return;
    }

    setjobnumber(jobNumber);
    console.log("Fetching edit logs for jobnumber:", jobNumber);

    try {
      const response = await axios.get(`${API_BASE_URL}/jobEdits`, {
        params: { jobnumber: jobNumber },
      });

      if (response.data.length === 0) {
        console.log("No edit logs found for this organization.");
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
      <div style={{ marginBottom: "48px" }}>
        <CCardBody>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              position: "relative",
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#888rgb(255, 255, 255)",
            }}
          >
            <table
              className="border-separate"
              style={{
                // marginTop: "12px",
                // borderCollapse: "separate",
                borderSpacing: "0 8px",
                tableLayout: "auto",
                width: "100%",
                position: "sticky",
                top: "0",
              }}
            >
              {/* Sticky Header */}
              <thead
                className="bg-blue-900 text-white"
                style={{
                  background: "var(--tableHead-bg)",
                  fontSize: "12px",
                  color: " #F6FCFF",
                  fontFamily: "Instrument Sans",
                  fontStyle: "normal",
                  lineHeight: " normal",
                }}
              >
                <tr>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "20px", textAlign: "center" }}
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "20px", textAlign: "center" }}
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "20px", textAlign: "center" }}
                  >
                    Edit In
                  </th>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "20px", textAlign: "center" }}
                  >
                    Edit By
                  </th>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "20px", textAlign: "center" }}
                  >
                    Changes Done
                  </th>
                </tr>
              </thead>

              {/* Scrollable Body */}
              <tbody className="text-center">
                {edits.length > 0 ? (
                  edits.map((edit, index) => (
                    <React.Fragment key={index}>
                      <tr
                        colSpan="5"
                        style={{ height: "10px", border: "none" }}
                      ></tr>
                      <tr
                        key={index}
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472" // Dark  even row
                                : "#263A52" // Dark mode odd row
                              : index % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row
                          cursor: "pointer",
                          fontSize: "12px",

                          /* Table Body */
                          fontFamily: "Instrument Sans",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: " normal",
                          letterSpacing: "0.14px",
                        }}
                      >
                        <td
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "20px" }}
                        >
                          {new Date(edit.editedon).toLocaleDateString("en-GB")}
                        </td>
                        <td
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "20px" }}
                        >
                          {new Date(edit.editedon).toLocaleTimeString()}
                        </td>
                        <td
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "20px" }}
                        >
                          {edit.editin}
                        </td>
                        <td
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "20px" }}
                        >
                          {edit.editedby}
                        </td>
                        <td
                          className="td-accounts px-1 py-2 rounded-lg"
                          style={{ minWidth: "330px" }}
                        >
                          {edit.changesDetails}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      className="td-accounts px-1 py-2 rounded-lg"
                      style={{ minWidth: "20px" }}
                      colSpan="5"
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

export default EditExpJobhistory;
