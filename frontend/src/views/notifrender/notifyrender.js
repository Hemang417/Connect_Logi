import React, { useState, useEffect } from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import { NavLink, parsePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../EditLogs/css/EditLogs.css";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CForm,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CButton,
  th,
  td,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilList,
  cilMenu,
  cilExternalLink,
} from "@coreui/icons";
import axios from "axios";
import "../../css/styles.css";
import moment from "moment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const NotifyRender = () => {
  const [currentBranch, setCurrentBranch] = useState("");
  const [allnotifications, setallnotifications] = useState([]);
  const [alljobs, setalljobs] = useState([]);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

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

  const [allorg, setallorg] = useState([]);
  async function getOrganizations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setallorg(response.data);

      const jobdata = await axios.get(
        `${API_BASE_URL}/fetchJobnotifications`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );
      setalljobs(jobdata.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8081');
  //   ws.onopen = () => {
  //     ws.send(JSON.stringify({ type: 'register', username: localStorage.getItem('username') }));
  //   };
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === 'new_org') {
  //       toast.success(data.message);
  //       fetchNotifications();
  //     }
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const branchName = localStorage.getItem("branchnameofemp");
      setCurrentBranch(branchName);
      fetchNotifications();
    }, 1000); // Interval set to 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchNotifications = async (req, res) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchnotifications`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setallnotifications(response.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    getOrganizations();
  }, [currentBranch]);

  async function userhasread(item) {
    try {
      const currentDate = new Date().getTime();
      const formatattedDate = moment(currentDate).format("YYYY-MM-DD HH"); // No need to format
      const response = await axios.put(`${API_BASE_URL}/userhasread`, {
        theitemread: item,
        currentDate: formatattedDate,
        employeename: localStorage.getItem("username"),
      });
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  // Function to navigate to the '/approverlog' route and send the item object as state
  const navigateToApproverLog = (item) => {
    navigate("/approverlog", { state: item });
  };

  async function readjob(item) {
    try {
      const { jobnumber, branchcode, branchname } = item;

      const updatereadforuser = await axios.put(
        `${API_BASE_URL}/userreadforjob`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          username: localStorage.getItem("username"),
          jobnumber: jobnumber,
          branchcode: branchcode,
          branchname: branchname,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //     let countcount = allnotifications && allnotifications.filter(item =>
  //         item.reading.some(entry =>
  //             entry.employeename === localStorage.getItem('username') &&
  //             !allorg?.find(row => row.clientname === item.clientname) &&
  //             !item.reading.some(subEntry => subEntry.status === 'Reject')
  //         ) &&
  //         !item.reading.some(subEntry => subEntry.approved === -1)
  //     ).length
  //     localStorage.setItem('countofremainingrows', countcount)
  // }, [allnotifications])

  // function reverse(dateString) {
  //     const date = new Date(dateString);
  //     const day = String(date.getDate()).padStart(2, '0');
  //     const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-indexed
  //     const year = date.getFullYear();
  //     return `${day}-${month}-${year}`;
  // }
  // const reverse = (dateString) => {
  //     return moment(dateString).format('YYYY-MM-DD HH');
  // };

  // const mergeAndSortNotifications = () => {
  //     const mergedArray = [
  //         ...alljobs.map(job => ({ ...job, type: 'job' })),
  //         ...allnotifications.map(notification => ({ ...notification, type: 'notification' }))
  //     ];

  //     return mergedArray.sort((a, b) => moment(a.createdat).diff(moment(b.createdat)));
  // };

  // const sortedItems = mergeAndSortNotifications();

  const mergeAndSortNotifications = () => {
    const mergedArray = [
      ...alljobs.map((job) => ({ ...job, type: "job" })),
      ...allnotifications.map((notification) => ({
        ...notification,
        type: "notification",
      })),
    ];

    return mergedArray.sort((a, b) =>
      moment(b.createdat).diff(moment(a.createdat))
    ); // Sorting in descending order
  };

  const sortedItems = mergeAndSortNotifications();

  async function navigateToJobApproval(item) {
    try {
      navigate("/approverlog", { state: item });
    } catch (error) {
      console.log(error);
    }
  }

  const usernameoftheloggedin = localStorage.getItem("username");

  return (
    <div>
      <div
        className="page-title"
        style={{ width: "99%", marginBottom: "20px" }}
      >
        <div
          style={{ position: "absolute", left: "20px" }}
          onClick={() => navigate(-1)}
        >
          <ArrowCircleLeft />
        </div>
        <h4>Inbox</h4>
      </div>
      <div
        style={{
          height: "73vh",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "gray transparent",
        }}
      >
        <table className="table-log">
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
              <th className="text-center" style={{ width: "17%" }}>
                Date
              </th>
              <th className="text-center" style={{ width: "27%" }}>
                Task Name
              </th>
              <th className="text-center" style={{ width: "17%" }}>
                Created By
              </th>
              <th className="text-center" style={{ width: "10%" }}>
                Actions
              </th>
              <th className="text-center" style={{ width: "10%" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody className="body-log">
            {/* admin */}
            {usernameoftheloggedin === "admin"
              ? sortedItems.map((item, index) => {
                  let status = "Pending";
                  let approvedCount = 0;

                  // Iterate over item.reading to determine the status
                  item.reading.forEach((entry) => {
                    if (entry.approved === -1) {
                      status = "Rejected";
                    } else if (entry.approved === 1) {
                      approvedCount++;
                    }
                  });

                  // Determine the final status based on the conditions
                  if (status !== "Rejected") {
                    if (approvedCount === 0) {
                      status = "Pending";
                    } else if (approvedCount === 1) {
                      status = "Pending";
                    } else if (approvedCount === 2) {
                      status = "Approved";
                    }
                  }

                  return (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
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
                        <td className="td-log">{item.createdat}</td>
                        {item.type === "job" ? (
                          <>
                            <td className="td-log">{`Job: ${item.jobnumber}`}</td>
                            <td className="td-log">{item.username}</td>
                            <td className="td-log">Read</td>
                            <td className="td-log">
                              <>{status}</>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="td-log">{`Organization: ${item.clientname} is waiting for your approval`}</td>
                            <td className="td-log">{item.username}</td>
                            <td className="td-log">Read</td>
                            <td className="td-log">
                              <>{status}</>
                            </td>
                          </>
                        )}
                      </tr>
                      <tr className="spacer-row">
                        <td
                          colSpan="5"
                          style={{ height: "10px", border: "none" }}
                        ></td>
                      </tr>
                    </React.Fragment>
                  );
                })
              : // this is for not admin
                sortedItems.map((item, index) => {
                  if (item.type === "job") {
                    const isApprover = item.approvername.some(
                      (approver) =>
                        approver.employeename ===
                        localStorage.getItem("username")
                    );
                    const readingEntry = item.reading.find(
                      (entry) =>
                        entry.employeename === localStorage.getItem("username")
                    );

                    if (readingEntry && isApprover) {
                      const isRead = readingEntry.read === 1;
                      const isApproved = readingEntry.approved === 1;
                      const isRejected = readingEntry.approved === -1;
                      const hasBeenApproved = alljobs?.find(
                        (row) => row.clientname === item.clientname
                      );
                      const hasBeenRejected = item.reading.some(
                        (row) => row.approved === -1
                      );

                      return (
                        <React.Fragment key={index}>
                          <tr
                            key={index}
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
                            <td className="td-log">{item.createdat}</td>
                            <td className="td-log">{`Job: ${item.jobnumber}`}</td>
                            <td className="td-log">{item.username}</td>
                            <td className="td-log">
                              {isRead ? (
                                "Read"
                              ) : (
                                <CButton
                                  className="button-mark-as-read"
                                  onClick={() => readjob(item)}
                                >
                                  <CIcon
                                    className="icon-envelope-open"
                                    icon={cilEnvelopeOpen}
                                    size="lg"
                                  />
                                </CButton>
                              )}
                            </td>
                            <td className="td-log">
                              {isRead && isApproved
                                ? "Approved"
                                : isRejected || hasBeenRejected
                                ? "Rejected"
                                : "Pending"}
                            </td>
                          </tr>
                          <tr className="spacer-row">
                            <td
                              colSpan="5"
                              style={{ height: "10px", border: "none" }}
                            ></td>
                          </tr>
                        </React.Fragment>
                      );
                    }
                  }

                  const isApprover = item.approvername.some(
                    (approver) =>
                      approver.employeename === localStorage.getItem("username")
                  );
                  const readingEntry = item.reading.find(
                    (entry) =>
                      entry.employeename === localStorage.getItem("username")
                  );

                  if (isApprover && readingEntry) {
                    const isRead = readingEntry.read === 1;
                    const isApproved = readingEntry.approved === 1;
                    const isRejected = readingEntry.approved === -1;
                    const hasBeenRejected = item.reading.some(
                      (row) => row.approved === -1
                    );

                    return (
                      <React.Fragment key={index}>
                        <tr
                          key={index}
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
                          className={isRead ? "read-row" : "unread-row"}
                        >
                          <td
                            className="td-log"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              position: "relative",
                              height: "100%",
                            }}
                          >
                            {isRead && (
                              <span
                                style={{
                                  display: "flex",
                                  backgroundColor:
                                    theme === "dark"
                                      ? isRead
                                        ? "#55cf7a"
                                        : "#263A52"
                                      : isRead
                                      ? "#62cd81"
                                      : "#F6FCFF",
                                  transition: "background-color 0.3s ease",
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  position: "absolute",
                                  left: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              ></span>
                            )}
                            {item.createdat}
                          </td>
                          <td className="td-log">{`Organization: ${item.clientname} is waiting for your approval`}</td>
                          <td className="td-log">{item.username}</td>
                          <td>
                            {isRead ? (
                              "Read"
                            ) : (
                              <CButton
                                className="button-mark-as-read"
                                onClick={() => userhasread(item)}
                              >
                                <CIcon
                                  className="icon-envelope-open"
                                  icon={cilEnvelopeOpen}
                                  size="lg"
                                />
                              </CButton>
                            )}
                          </td>
                          <td>
                            {isRead && isApproved
                              ? "Approved"
                              : isRejected || hasBeenRejected
                              ? "Rejected"
                              : "Pending"}
                          </td>
                        </tr>
                        <tr className="spacer-row">
                          <td
                            colSpan="5"
                            style={{ height: "10px", border: "none" }}
                          ></td>
                        </tr>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotifyRender;
