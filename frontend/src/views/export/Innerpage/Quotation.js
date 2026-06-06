import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  CCard,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from "@coreui/react";
import "../../../css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import API_BASE_URL from "src/config/config";

const Quotation = () => {
  const [data, setData] = useState([]); // For newly pasted data
  const [fetchedData, setFetchedData] = useState([]); // For data from database
  const [displayData, setDisplayData] = useState([]); // For data to display in the table
  const [makeFirstRowHeader, setMakeFirstRowHeader] = useState(true);
  const [hasPastedNewData, setHasPastedNewData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");
  const section = queryParams.get("section");

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

  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };

  const handleUpdate = async () => {
    try {
      const branchcodeofemp = localStorage.getItem("branchcodeofemp");
      const branchnameofemp = localStorage.getItem("branchnameofemp");
      
      if (!displayData || displayData.length === 0) {
        toast.error("No data to save.");
        return;
      }

      // If we're using newly pasted data
      if (hasPastedNewData) {
        await handleExcelInsert();
        return;
      }

      // Export-specific update logic
      const jobkanum = localStorage.getItem("jobNumber");
      const username = localStorage.getItem("username");
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      
      const response = await axios.put(
        `${API_BASE_URL}/updateGeneralExp`,
        {
          tableData: displayData.map((row) => ({ json_data: row.json_data })),
          orgname: nameoforg,
          orgcode: codeoforg,
          jobowner: username,
          jobnumber: jobkanum,
          section: section,
          branchcodeofemp: branchcodeofemp,
          branchnameofemp: branchnameofemp,
          clientname: sessionStorage.getItem("exportername"),
        }
      );
      
      const getApprovers = await axios.get(
        `${API_BASE_URL}/getApprovernamesfororg`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );
      
      if (response) {
        toast.success("Quotation updated successfully.");
      }
    } catch (error) {
      toast.error("Error updating Quotation.");
      console.log(error);
    }
  };

  const fetchQuotation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getQuotationExp`, {
        params: {
          jobnumber: jobNumber,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });

      if (response.data) {
        setFetchedData(response.data);
        setDisplayData(response.data);
      }
    } catch (error) {
      console.error("Error Fetching Collections:", error);
      toast.error("Failed to Fetch Collections");
    }
  };

  useEffect(() => {
    fetchQuotation();
  }, []);

  const handleExcelInsert = async () => {
    const branchcodeofemp = localStorage.getItem("branchcodeofemp");
    const branchnameofemp = localStorage.getItem("branchnameofemp");

    try {
      const excelsave = await axios.post(
        `${API_BASE_URL}/saveExcelDataExp`,
        {
          username: localStorage.getItem("username"),
          tableData: data, // your 2D array
          section: section,
          jobNumber: jobNumber,
          orgcode: localStorage.getItem("orgcode"),
          orgname: localStorage.getItem("orgname"),
          branchcodeofemp: branchcodeofemp,
          branchnameofemp: branchnameofemp,
          clientname: sessionStorage.getItem("exportername"),
        }
      );

      if (excelsave) {
        toast.success("Data saved to database successfully!");
        fetchQuotation();
        setHasPastedNewData(false);
      }
    } catch (error) {
      toast.error("Error updating Quotation.");
      console.log(error);
    }
  };

  // Handle paste from Excel
  const handlePaste = (e) => {
    const clipboardData = e.clipboardData.getData("Text");
    const rows = clipboardData
      .trim()
      .split("\n")
      .map((row) => row.split("\t"));

    // Update both data array and display data
    setData(rows);
    setDisplayData(rows.map((row) => ({ json_data: row })));
    setHasPastedNewData(true);
    e.preventDefault();
  };

  // Handle inline cell edit
  const handleCellEdit = (rowIndex, colIndex, value) => {
    const updated = [...displayData];

    if (hasPastedNewData) {
      // If we're editing newly pasted data
      if (!updated[rowIndex].json_data) {
        updated[rowIndex].json_data = updated[rowIndex];
      }
      updated[rowIndex].json_data[colIndex] = value;
    } else {
      // If we're editing fetched data
      updated[rowIndex].json_data[colIndex] = value;
    }

    setDisplayData(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div>
        <h3
          className="text-data-1"
          style={{ fontSize: "20px", fontWeight: "500" }}
        >
          Paste Excel Data Below:
        </h3>
        <div
          contentEditable
          onPaste={handlePaste}
          style={{
            border: "1px solid #ccc",
            display: "flex",
            textJustify: "inter-word",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            minHeight: "100px",
            marginBottom: "20px",
          }}
        >
          <label className="text-data-1">
            (Click here and paste your Excel data)
          </label>
        </div>

        {displayData.length > 0 && (
          <>
            <h4
              className="text-data-1"
              style={{
                fontSize: "20px",
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Editable Table:
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <label>Make First Row as Header</label>
                <input
                  type="checkbox"
                  checked={makeFirstRowHeader}
                  onChange={() => setMakeFirstRowHeader(!makeFirstRowHeader)}
                />
              </div>
            </h4>
            <div
              style={{
                width: "100%",
                overflow: "scroll",
                maxHeight: "400px",
                padding: "10px",
                boxShadow:
                  theme !== "dark"
                    ? "0 0 10px rgba(0, 0, 0, 0.1)"
                    : "0 0 10px #101322",
                scrollbarWidth: "thin",
                scrollbarColor: "gray Transparent",
              }}
            >
              <table
                border="0"
                cellPadding="6"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  border: "1px solid #d4d4d4",
                }}
              >
                <tbody>
                  {displayData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      style={{
                        backgroundColor:
                          rowIndex === 0
                            ? makeFirstRowHeader
                              ? theme === "dark"
                                ? "#101322"
                                : "#2F4096"
                              : null
                            : rowIndex % 2 === 0
                            ? "#ffffff !important"
                            : "#ABD3EB !important",
                        fontWeight:
                          rowIndex === 0
                            ? makeFirstRowHeader
                              ? "bold"
                              : "normal"
                            : "normal",
                      }}
                    >
                      {(hasPastedNewData ? row.json_data : row.json_data).map(
                        (cell, colIndex) => (
                          <td
                            key={colIndex}
                            style={{
                              color:
                                rowIndex === 0
                                  ? makeFirstRowHeader
                                    ? "#fff"
                                    : null
                                  : null,
                              border: "1px solid #d4d4d4",
                              padding: "8px",
                              minWidth: "100px",
                              position: "relative",
                            }}
                          >
                            <div
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleCellEdit(
                                  rowIndex,
                                  colIndex,
                                  e.target.innerText
                                )
                              }
                              style={{
                                minHeight: "20px",
                                outline: "none",
                              }}
                            >
                              {cell}
                            </div>
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="all-buttons">
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
          }}
        >
          <NewButton width={"120px"} text={"Save"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            fetchQuotation();
            setHasPastedNewData(false);
          }}
        >
          <NewButton width={"120px"} text={"Save & New"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            handleClose();
          }}
        >
          <NewButton width={"120px"} text={"Save & Close"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleClose();
          }}
        >
          <NewButton width={"120px"} text={"Close"} />
        </div>
      </div>
    </motion.div>
  );
};

export default Quotation;