import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Link } from "react-router-dom";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Calendar from "src/components/Calendar";
import "./passwordChanges.css";
import "../../css/styles.css";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const PasswordApprover = () => {
  const [latestApproval, setLatestApproval] = useState([]);
  const [filteredApproval, setFilteredApproval] = useState([]); // Add this line
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
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

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/userreq`);
      // localStorage.setItem('forgotUsername', username);
      setLatestApproval(response.data);
      setFilteredApproval(response.data); // Initialize filtered data with all data
    } catch (error) {
      toast.error("Failed to fetch password change requests.");
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    // Fetch password change requests from the server

    fetchRequests();
  }, []);

  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    // Filter the data client-side
    if (startDate && endDate) {
      const filtered = latestApproval.filter((request) => {
        const requestDate = new Date(request.created_at);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include entire end day

        return requestDate >= start && requestDate <= end;
      });
      setFilteredApproval(filtered);
    } else {
      // If no dates selected, show all data
      setFilteredApproval(latestApproval);
    }
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

  // Update your approve/reject handlers to update both state arrays
  const handleApprove = async (username) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/userreq/approve`, {
        username,
      });
      toast.success("Password change request approved.");

      setLatestApproval((prev) =>
        prev.map((req) =>
          req.username === username ? { ...req, status: "Approved" } : req
        )
      );
      setFilteredApproval((prev) =>
        prev.map((req) =>
          req.username === username ? { ...req, status: "Approved" } : req
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve the request.");
    }
  };

  // Make the same update to handleReject
  const handleReject = async (username) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/userreq/reject`, {
        username,
      });
      toast.success("Password change request rejected.");

      setLatestApproval((prev) =>
        prev.map((req) =>
          req.username === username ? { ...req, status: "Rejected" } : req
        )
      );
      setFilteredApproval((prev) =>
        prev.map((req) =>
          req.username === username ? { ...req, status: "Rejected" } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject the request.");
    }
  };

  const refreshData = async () => {
    try {
      await fetchRequests();
      toast.success("Data Refreshed");
    } catch (error) {
      toast.error("Fail To Refresh");
    }
  };

  return (
    <div>
      <div className="refreshjob-button ">
        <Link
          type="submit"
          onClick={refreshData}
          className="link-btn"
          style={{
            marginLeft: "20px",
            height: "fit-content",
            position: "absolute",
          }}
        >
          <RefreshBtn />
        </Link>
      </div>
      <div
        className="page-title"
        style={{ marginBottom: "20px", width: "99%" }}
      >
        <h5>Password Change Requests</h5>
      </div>
      <div style={{ gap: "4px", marginLeft: "40px" }}>
        <label className="change-req-labels">Date:</label>
        <div className="">
          <Calendar onDateSelect={handleDateSelect} />
        </div>
      </div>
      <div>
        <div className="form-pass">
          <table
            className="border-separate"
            style={{
              marginTop: "12px",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
              tableLayout: "auto",
              width: "100%",
            }}
          >
            <thead
              className="headRow-pass text-white "
              style={{
                background: theme === "dark" ? "#101322" : "#2f4096",
                fontSize: "12px",
                color: " #F6FCFF",
                fontFamily: "Instrument Sans",
                fontStyle: "normal",
                lineHeight: " normal",
              }}
            >
              <tr className="head-pass">
                <th
                  scope="col"
                  className="row-font px-1 py-2 rounded-lg"
                  style={{ minWidth: "100px" }}
                >
                  Employee Username
                </th>
                <th
                  scope="col"
                  className="row-font px-1 py-2 rounded-lg"
                  style={{ minWidth: "100px" }}
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="row-font px-1 py-2 rounded-lg"
                  style={{ minWidth: "100px" }}
                >
                  New Password
                </th>
                <th
                  scope="col"
                  className="row-font px-1 py-2 rounded-lg"
                  style={{ minWidth: "100px" }}
                >
                  Remarks
                </th>
                <th
                  scope="col"
                  className="row-font px-1 py-2 rounded-lg"
                  style={{ minWidth: "100px" }}
                >
                  Actions
                </th>
                <th
                  scope="col"
                  className="row-font px-1 py-2 rounded-lg"
                  style={{ minWidth: "100px" }}
                >
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="body-pass">
              {filteredApproval.map((request, index) => (
                <tr
                  key={request.id}
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
                    className="td-pass px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px" }}
                  >
                    {request.username}
                  </td>
                  <td
                    className="td-pass px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px" }}
                  >
                    {request.role}
                  </td>
                  <td
                    className="td-pass px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px" }}
                  >
                    {request.newpassword}
                  </td>
                  <td
                    className="td-pass px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px" }}
                  >
                    {request.remark}
                  </td>
                  <td
                    className="td-pass px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px" }}
                  >
                    {request.status === "Approved" ||
                    request.status === "Rejected" ? (
                      <span>{request.status}</span>
                    ) : (
                      <>
                        <CButton
                          color="success"
                          onClick={() => handleApprove(request.username)}
                        >
                          Approve
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleReject(request.username)}
                        >
                          Reject
                        </CButton>
                      </>
                    )}
                  </td>
                  <td
                    className="td-pass px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px" }}
                  >
                    {new Intl.DateTimeFormat("en-IN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(request.created_at))}
                    {/* {new Intl.DateTimeFormat("en-IN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Kolkata",
                }).format(new Date(request.created_at))} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PasswordApprover;
