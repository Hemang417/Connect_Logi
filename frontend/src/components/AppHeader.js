import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import avatar8 from "../assets/images/avatars/8.jpg";
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux';


import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CForm,
  CTable,
  CTableBody,
} from "@coreui/react";

import { CAvatar } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilMenu } from "@coreui/icons";
import axios from "axios";
import { AppHeaderDropdown } from "./header/index";
import "../../src/css/styles.css";
import moment from "moment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import NewDropdownInput from "./DropDown/NewDropdownInput";
import { getSocket } from "src/utils/socket";
import API_BASE_URL from "src/config/config";

const AppHeader = () => {
  const [currentBranch, setCurrentBranch] = useState("");
  const [allnotifications, setallnotifications] = useState([]);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [allorg, setallorg] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);

  const [reminderNotifications, setReminderNotifications] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [profilePhoto, setProfilePhoto] = useState(null);
  const checkUsername = localStorage.getItem("username");
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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Add event listener for key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Normalize key to uppercase to avoid case sensitivity issues
      if (event.ctrlKey && event.key.toUpperCase() === "D") {
        event.preventDefault(); // Prevent any unwanted default behavior
        toggleDarkMode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const FetchAllBranches = async (branch) => {
    try {
      const branches = await axios.get(`${API_BASE_URL}/getAllBranches`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          username: localStorage.getItem("username"),
        },
      });
      setallBranches(branches.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchAllBranches();
  }, []);

  const handleBranchSelection = (branch) => {
    if (!branch) return; // Guard clause for undefined branch

    const userConfirmed = window.confirm(
      `Are you sure you want to switch to ${branch.label}?`
    );

    if (userConfirmed) {
      try {
        // Save localStorage with the selected branch's details
        localStorage.setItem("branchnameofemp", branch.label);
        localStorage.setItem("branchcodeofemp", branch.value);
        // location.reload();
        setSelectedBranch(branch.label);
        setIsOpen(false);
        FetchAllBranches();
        location.reload(navigate("/dashboard"));
        // navigate('/dashboard')
        // toast.success(`Branch Changed`)
      } catch (error) {
        console.error("Error during branch switch:", error);
        // toast.error("Failed to switch branches");
      }
    } else {
      // If user cancels, reset to null or keep previous selection
      setSelectedBranch(selectedBranch); // Keep current selection instead of null
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllBranches`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          username: localStorage.getItem("username"),
        },
      });

      const branchOptions = response.data.map((branch) => ({
        value: branch.branchcode,
        label: branch.ownbranchname,
      }));

      setBranches(branchOptions);

      const selectedBranch = branchOptions.find(
        (branch) => branch.label === localStorage.getItem("branchname")
      );

      if (selectedBranch) {
        setSelectedBranch(selectedBranch); // You probably want to set the entire object, not just value
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Failed to load branches");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchProfilePhoto = async () => {
    try {
      const username = localStorage.getItem("username");
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");

      const profilePhotoUrl = `${API_BASE_URL}/getKYCImage?username=${username}&orgname=${orgname}&orgcode=${orgcode}&type=profile`;
      setProfilePhoto(profilePhotoUrl);
    } catch (err) {
      console.error("Failed to fetch profile photo:", err);
      setProfilePhoto(null);
    }
  };

  useEffect(() => {
    fetchProfilePhoto();
  }, []);


  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Update date immediately
    setCurrentDate(new Date());

    // Optional: Update every minute to keep current
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const dateNumber = currentDate.getDate();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayNames[currentDate.getDay()];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[currentDate.getMonth()];

  async function getOrganizations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setallorg(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const remindernotif = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/fetchremindernotifications`,
          {
            params: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
              branchname: localStorage.getItem("branchnameofemp"),
            },
          }
        );
        const fetchedReminders = response.data;

        const username = localStorage.getItem("username");

        const filteredReminders = fetchedReminders.filter((reminder) => {
          const assignedPeople =
            typeof reminder.assignedpeoplereminder === "string"
              ? JSON.parse(reminder.assignedpeoplereminder) // Parse if it's a string
              : reminder.assignedpeoplereminder; // Use it as is if it's already an object

          return assignedPeople.some((person) => person.username === username);
        });

        setReminderNotifications(filteredReminders);
      } catch (error) {
        console.log(error);
      }
    };

    remindernotif();
  }, [localStorage.getItem("branchnameofemp")]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault(); // Prevent default browser behavior
        dispatch({ type: "set", sidebarShow: !sidebarShow }); // Toggle sidebar
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch, sidebarShow]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const socket = getSocket(); // Use managed instance
    console.log('this is the loop')

    socket.emit("register", username);

    const newOrgHandler = (data) => {
      toast.success(data.message);
      fetchNotifications();
      addNotification(data.message);
    };
    const newJobHandler = (data) => {
      toast.success(data.message);
      addNotification(data.message);
    };

    socket.on("new_org", newOrgHandler);
    socket.on("new_job", newJobHandler);

    return () => {
      socket.off("new_org", newOrgHandler);
      socket.off("new_job", newJobHandler);
    };
  }, []);

  const addNotification = (message) => {
    const expirationTime = Date.now() + 300000; // 5 minutes
    const newNotification = { message, expirationTime };
    const existingNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    const updatedNotifications = [...existingNotifications, newNotification];
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    setVisibleNotifications(updatedNotifications);
    setTimeout(() => {
      removeExpiredNotifications();
    }, 300000); // Set timeout to remove expired notifications
  };

  const removeExpiredNotifications = () => {
    const existingNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    const currentTime = Date.now();

    const filteredNotifications = existingNotifications.filter(
      (notification) => notification.expirationTime > currentTime
    );
    localStorage.setItem(
      "notifications",
      JSON.stringify(filteredNotifications)
    );
    setVisibleNotifications(filteredNotifications);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      removeExpiredNotifications();
    }, 1000); // Check for expired notifications every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [approvers, setapprovers] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const branchName = localStorage.getItem("branchnameofemp");
      setCurrentBranch(branchName);
      fetchNotifications();
      dispatch({ type: 'toggleLatestMessage' })
    }, 1000); // Interval set to 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Get the avatar element (you might need to adjust this selector)
      const avatarElement = document.querySelector(".avatar-container");

      // Check if click is outside both popup and avatar
      if (
        isOpen &&
        !event.target.closest(".menu-popup") &&
        !event.target.closest(".avatar-container")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

  // optional logout
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        Cookies.remove("userauthtoken");
        const response = await axios.post(`${API_BASE_URL}/auth/logout`, {
          username: localStorage.getItem("username"),
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        });
        localStorage.clear();
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout error:", error);
        // Still clear local data and redirect even if server request fails
        // localStorage.clear();
        // window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    let countcount =
      allnotifications &&
      allnotifications.filter(
        (item) =>
          item.reading.some(
            (entry) =>
              entry.employeename === localStorage.getItem("username") &&
              !allorg?.find((row) => row.clientname === item.clientname) &&
              !item.reading.some((subEntry) => subEntry.status === "Reject")
          ) && !item.reading.some((subEntry) => subEntry.approved === -1)
      ).length;
    localStorage.setItem("countofremainingrows", countcount);
  }, [allnotifications]);

  const navigateToImport = (item) => {
    navigate("/import", { state: item });
  };

  return (
    <CHeader position="sticky" className="mb-3 header-main-container">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          // onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CIcon
            icon={cilMenu}
            size="lg"
            style={{ fontWeight: 900, color: "var(--Date-and-Icons, #BDF2F5)" }}
          />
        </CHeaderToggler>
        {/* <CHeaderNav className="ms-1">
          <AppHeaderDropdown />
        </CHeaderNav> */}
        {/* // Then modify your avatar container to add a class: */}
        <div
          className="avatar-container" // Add this class
          // onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
        >
          <CAvatar
            src={profilePhoto}
            size="md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = avatar8;
            }}
          />
        </div>
        {isOpen && (
          <div
            className="menu-popup" // Add this class
            style={{
              position: "absolute",
              top: "100%",
              left: 8,
              marginTop: "8px",
              background: theme === "dark" ? "#101321" : "#1E2652",
              // borderRadius: "8px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              minWidth: "280px",
              padding: "16px",
              zIndex: 1000,
              color: "white",
              animation: "dropdownFadeIn 0.2s ease-out",
            }}
          >
            {/* Branches Section */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "12px",
                  color: "white",
                }}
              >
                Branches:
              </div>
              <div style={{ position: "relative" }}>
                <Select
                  className="header-dropdown-select"
                  autoComplete="off"
                  options={branches}
                  value={
                    branches.find((option) => option === selectedBranch) || null
                  }
                  onChange={(selectedOption) =>
                    handleBranchSelection(selectedOption)
                  }
                  // ... rest of your props
                  // isDisabled={isDisabled}
                  placeholder={localStorage.getItem("branchnameofemp")}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "22px",
                      paddingLeft: "5px",
                      border: "0px",
                      zIndex: "100",
                      borderRadius: "5px",
                      fontSize: "12px",
                      backgroundColor: "transparent !important",
                      color: theme === "dark" ? "#D1EEFF" : "#D1EEFF",
                      boxShadow: "none !important",
                      borderColor: "transparent !important",
                      width: "100%",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      textAlign: "center", // ✅ added
                      color: theme === "dark" ? "#D1EEFF" : "#D1EEFF",
                    }),

                    valueContainer: (provided) => ({
                      ...provided,
                      padding: "0px 8px",
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: "0px",
                      fontSize: "12px",
                      textAlign: "center", // ✅ added
                      color: theme === "dark" ? "#D1EEFF" : "#D1EEFF",
                      "-webkit-text-fill-color":
                        theme === "dark" ? "#D1EEFF" : "#333d70",
                      backgroundColor: "transparent !important",
                    }),

                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: "12px",
                      textAlign: "center", // ✅ added
                      color: theme === "dark" ? "#D1EEFF" : "#D1EEFF",
                      backgroundColor: "transparent !important",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      fontSize: "12px",
                      zIndex: 9999,
                      backgroundColor: theme === "dark" ? "#101322" : "#fff",
                      borderRadius: "5px",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused
                        ? theme === "dark"
                          ? "#252A37"
                          : "#f0f0f0"
                        : "transparent !important",
                      color: theme === "dark" ? "#D1EEFF" : "#333d70",
                      cursor: "pointer",
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      height: "22px",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "150px", // Adjust as needed for visible options
                      overflowY: "auto",
                      scrollbarWidth: "thin", // Firefox
                      msOverflowStyle: "none", // IE 10+
                      "&::-webkit-scrollbar": {
                        width: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor:
                          theme === "dark" ? "#D1EEFF" : "#333d70",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent !important",
                      },
                    }),
                  }}
                  menuPortalTarget={document.body}
                />
                {/* {console.log("selectedBranch", selectedBranch)} */}
              </div>
            </div>

            {/* Projects Section */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                <span>Projects</span>
                <span
                  style={{
                    background: "#D1EEFF",
                    color: "#2C3E7A",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: "50%",
                    minWidth: "24px",
                    textAlign: "center",
                  }}
                >
                  15
                </span>
              </div>
            </div>

            {/* Dark Mode Section */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={toggleDarkMode}
              >
                <span>Dark Mode</span>
                <div
                  style={{
                    width: "44px",
                    height: "24px",
                    background: darkMode
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(255, 255, 255, 0.3)",
                    borderRadius: "12px",
                    position: "relative",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "white",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "2px",
                      left: "2px",
                      transform: darkMode
                        ? "translateX(20px)"
                        : "translateX(0)",
                      transition: "transform 0.3s ease",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Logout Section */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0 12px 0",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: 500,
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  marginTop: "4px",
                }}
                onClick={handleLogout}
              >
                Log out
              </div>
            </div>
          </div>
        )}
        <CHeaderBrand className="mx-auto d-md-none" to="/"></CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink
              to="/dashboard"
              component={NavLink}
              className="headerLabels"
            >
              Welcome, {localStorage.getItem("username")}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink
              to="/dashboard"
              component={NavLink}
              className="headerLabels"
            >
              {localStorage.getItem("orgname")}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <p></p>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink className="headerLabels">
              Current Branch : {currentBranch}
            </CNavLink>
          </CNavItem>

          <div className="date-container">
            <div className="date-circle">{dateNumber}</div>
            <div className="date-text">
              <span className="day-name">{dayName},</span>
              <span className="month-name">{monthName}</span>
            </div>
          </div>

          <CDropdown variant="nav-item">
            <CDropdownToggle
              placement="bottom-end"
              className="py-2"
              caret={false}
            >
              <CIcon
                icon={cilBell}
                size="lg"
                onClick={() => fetchNotifications()}
                className="headerLabels"
              />
            </CDropdownToggle>

            <CDropdownMenu
              className="pt-4 dropdown-menu-notifications"
              placement="bottom-end"
            >
              <CForm>
                <CTable hover responsive striped className="notiftable">
                  <CTableBody className="notifrow">
                    <CDropdownHeader className="bg-light fw-bold py-2 notif-header1">
                      Alerts
                    </CDropdownHeader>
                    <CRow>
                      <div className="notification-area">
                        {visibleNotifications &&
                          visibleNotifications.map((notification, index) => (
                            <CDropdownItem
                              key={index}
                              style={{ marginLeft: 20 }}
                            >
                              {notification.message}
                            </CDropdownItem>
                          ))}
                      </div>
                    </CRow>
                  </CTableBody>
                </CTable>
              </CForm>
              <CDropdownHeader className="bg-light fw-bold py-2 notif-header1">
                Reminders
              </CDropdownHeader>

              <CForm>
                <CTableBody
                  className="notifrow"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxHeight: "300px", // Limit the height to show scrollbar when necessary
                    overflowY: "auto", // Enable vertical scrolling
                    padding: "10px", // Add padding for better spacing
                    alignItems: "center", // Center the notification boxes
                  }}
                >
                  {reminderNotifications &&
                    reminderNotifications.map((reminder, index) => (
                      <CDropdownItem
                        key={index}
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "10px",
                          borderRadius: "5px",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          color: "#333",
                          maxWidth: "300px",
                          wordWrap: "break-word", // Ensure text wraps to the next line if too long
                          whiteSpace: "normal", // Allow text to wrap
                          width: "100%", // Ensure boxes take the full width of the parent container
                        }}
                        onClick={() => navigateToImport(reminder)}
                      >
                        {`Reminder for ${reminder.workflowname}: ${reminder.status} for job ${reminder.jobnumber}`}
                      </CDropdownItem>
                    ))}
                </CTableBody>
              </CForm>
            </CDropdownMenu>
          </CDropdown>

          <div
            className="nav-items-container"
            onClick={() => navigate("/notifyrender")}
          >
            <CBadge
              color="danger"
              position="top"
              shape="rounded-pill"
              className="notificationcount"
            >
              {allnotifications &&
                allnotifications.filter((item) =>
                  item.reading.some(
                    (entry) =>
                      entry.employeename === localStorage.getItem("username") &&
                      entry.read === 0
                  )
                ).length}
            </CBadge>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="18"
              viewBox="0 0 30 22"
              fill="none"
              style={{ marginBottom: "4px" }}
            >
              <path
                d="M28.125 0.0625H1.875C1.58492 0.0625 1.30672 0.177734 1.1016 0.382852C0.896484 0.58797 0.78125 0.866169 0.78125 1.15625V19.75C0.78125 20.3302 1.01172 20.8866 1.42195 21.2968C1.83219 21.707 2.38859 21.9375 2.96875 21.9375H27.0312C27.6114 21.9375 28.1678 21.707 28.578 21.2968C28.9883 20.8866 29.2188 20.3302 29.2188 19.75V1.15625C29.2188 0.866169 29.1035 0.58797 28.8984 0.382852C28.6933 0.177734 28.4151 0.0625 28.125 0.0625ZM25.3127 2.25L15 11.7041L4.6873 2.25H25.3127ZM27.0312 19.75H2.96875V3.64316L14.2604 13.9941C14.4621 14.1794 14.7261 14.2822 15 14.2822C15.2739 14.2822 15.5379 14.1794 15.7396 13.9941L27.0312 3.64316V19.75Z"
                fill="#BDF2F5"
              />
            </svg>
            <label className="logo-titles">Inbox</label>
          </div>
        </CHeaderNav>
      </CContainer>
      <style jsx>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </CHeader>
  );
};

export default AppHeader;
