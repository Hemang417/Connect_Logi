import React from "react";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import DownlodBtn from "../buttons/buttons/DownlodBtn";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  td,
  CTableHead,
  th,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/EditLogs.css";
import "../../css/styles.css";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function EditLogs() {
  const [edits, setEdits] = useState([]);
  const navigate = useNavigate();
  const fetchEdits = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getedits`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setEdits(response.data);
      console.log("EditLogs: ", edits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEdits();
  }, []);

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

  const refreshData = async () => {
    fetchEdits();
    toast.success("Data Refreshed");
  };

    useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  return (
    <div>
      <div className="top-btn">
        <div className="refreshjob-button">
          <div
            className="link-btn"
            onClick={refreshData}
            style={{ marginLeft: "12px" }}
          >
            <RefreshBtn />
          </div>
        </div>
        <div className="page-title">
          <h4>Edit Logs</h4>
        </div>
        <div className="createjob-button">
          <Link className="link-btn">
            <DownlodBtn />
          </Link>
        </div>
      </div>

      <div>
        <CCardBody>
          <div
            style={{
              maxHeight: "74vh",
              overflowY: "auto",
              position: "relative",
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "gray transparent",
            }}
          >
            <table className="table-log">
              {/* Sticky Header */}
              <thead
                className="head-log"
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "100",
                  backgroundColor: "#343a40",
                }}
              >
                <tr>
                  <th className="text-center" style={{ width: "7%" }}>
                    Date
                  </th>
                  {/* <th
                    className="text-center"
                    style={{ width: "10%" }}
                  >
                    Time
                  </th> */}
                  <th className="text-center" style={{ width: "15%" }}>
                    Edit In
                  </th>
                  <th className="text-center" style={{ width: "12%" }}>
                    Client Name
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Edit By
                  </th>
                  <th className="text-center" style={{ width: "38%" }}>
                    Changes Done
                  </th>
                </tr>
              </thead>

              {/* Scrollable Body */}
              <tbody className="body-log">
                {edits.length > 0 ? (
                  edits.map((edit, index) => (
                    <React.Fragment key={index}>
                      <tr
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472"
                                : "#263A52"
                              : index % 2 === 0
                              ? "#D8F0FD"
                              : "#F6FCFF",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <td className="td-log">
                          {new Date(edit.editedon).toLocaleDateString("en-GB")}
                        </td>
                        {/* <td className="td-log">
                        {new Date(edit.editedon).toLocaleTimeString()}
                      </td> */}
                        <td className="td-log">{edit.editin}</td>
                        <td className="td-log">{edit.clientname}</td>
                        <td className="td-log">{edit.editedby}</td>
                        <td
                          className="td-log"
                          style={{
                            textAlign: "left",
                            width: "200px",
                            wordBreak: "break-word", // Ensures long words break properly
                          }}
                        >
                          {" "}
                          {edit.changesDetails.split("\n").map((line, i) => {
                            // Bold the parts after "from" and "to" only
                            const match = line.match(
                              /(.*from\s+)(\".*?\")(.*to\s+)(\".*?\")/i
                            );

                            if (match) {
                              return (
                                <div
                                  key={i}
                                  style={{
                                    marginTop:
                                      i !== 0 && line.startsWith("Contact")
                                        ? "1em"
                                        : 0,
                                    // width: "200px",
                                    wordBreak: "break-word !important", // Ensures long words break properly
                                  }}
                                >
                                  {match[1]}
                                  <strong>{match[2]}</strong>
                                  {match[3]}
                                  <strong>{match[4]}</strong>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={i}
                                style={{
                                  marginTop:
                                    i !== 0 && line.startsWith("Contact")
                                      ? "1em"
                                      : 0,
                                  // width: "200px",
                                  wordBreak: "break-word !important", // Ensures long words break properly
                                }}
                              >
                                {line}
                              </div>
                            );
                          })}
                        </td>
                      </tr>
                      <tr className="spacer-row">
                        <td
                          colSpan="5"
                          style={{ height: "10px", border: "none" }}
                        ></td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td className="td-log" colSpan="5">
                      No edit logs available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </div>
    </div>
  );
}

export default EditLogs;
