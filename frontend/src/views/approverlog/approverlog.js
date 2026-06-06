import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CBadge,
  CNav,
  CNavItem,
  CNavLink,
  CCardBody,
  CCard,
} from "@coreui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import OrgApproval from "./Innerpage/OrgApproval";
import JobApproval from "./Innerpage/JobApproval";
import JobApprovalExp from "./Innerpage/JobApprovalExp";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";
// import Bin from "../recyclebin/RecycleBin";
const Approverlog = () => {
  const [latestOrg, setlatestOrg] = useState([]);
  const [approvalname, setapprovalname] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null); // State to store selected organization
  const [approvedOrgs, setapprovedOrgs] = useState([]);
  const [allowedButtons, setAllowedButtons] = useState([]);
  // const [showBinButton, setShowBinButton] = useState(false);

  const uniquevalue = "OrgButton";
  const location = useLocation();
  // const { state } = location;
  const navigate = useNavigate();
  const [isshown, setIsShown] = useState(null);

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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (location.pathname === "/approverlog") {
      // Check the previous location if you need
      if (location.state?.from === "/impcreatejob") {
        setIsShown("jobapproval");
        setTimeout(() => {
          window.top.close();
        }, 1000);
      }
      if (location.state?.from === "/expcreatejob") {
        setIsShown("jobapprovalexp");
        setTimeout(() => {
          window.top.close();
        }, 1000);
      }
      if (location.state?.from === "/Createorg") {
        setIsShown("organization");
        setTimeout(() => {
          window.top.close();
        }, 1000);
      }
    }
  }, [location]);

  const fetchAndSetInitialTab = async () => {
  try {
     const checkUsername = localStorage.getItem("username");

    if (checkUsername === "admin") {
      // Allow all buttons for admin
      setAllowedButtons(["OrgButton", "ImpJobButton", "ExpJobButton"]);
      // setShowBinButton(true);
      setIsShown("organization"); // default tab
      return;
    }
    // Fetch approval buttons
    const response = await axios.get(`${API_BASE_URL}/getapprovalbuttonsforuser`, {
      params: {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        branchname: localStorage.getItem("branchnameofemp"),
        branchcode: localStorage.getItem("branchcodeofemp"),
        username: localStorage.getItem("username"),
      },
    });

    const buttonNames = response.data.flatMap((item) => item.uniquevalue);
    setAllowedButtons(buttonNames);
    if (location.state?.from === "/impcreatejob" && buttonNames.includes("ImpJobButton")) {
      setIsShown("jobapproval");
      setTimeout(() => {
        window.top.close();
      }, 1000);
      return;
    } else if (location.state?.from === "/expcreatejob" && buttonNames.includes("ExpJobButton")) {
      setIsShown("jobapprovalexp");
      setTimeout(() => {
        window.top.close();
      }, 1000);
      return;
    } else if (location.state?.from === "/Createorg" && buttonNames.includes("OrgButton")) {
      setIsShown("organization");
      setTimeout(() => {
        window.top.close();
      }, 1000);
      return;
    }

    // Default tab logic based on priority (including Bin)
    if (buttonNames.includes("OrgButton")) {
      setIsShown("organization");
    } else if (buttonNames.includes("ImpJobButton")) {
      setIsShown("jobapproval");
    } else if (buttonNames.includes("ExpJobButton")) {
      setIsShown("jobapprovalexp");
    // } else if (shouldShowBin) {
    //   setIsShown("Bin");
    } else {
      setIsShown("");
    }
  } catch (error) {
    console.error("Failed to fetch allowed buttons", error);
  }
};

  useEffect(() => {
    fetchAndSetInitialTab();
  }, []);

  const fetchlatestOrg = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getlatestorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setlatestOrg(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApproverThatHaveUniqueValue = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getapproverthathaveuniquevalue`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            uniquevalue: uniquevalue,
          },
        }
      );
      setapprovalname(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function checker() {
    try {
      const response = await axios.get(`${API_BASE_URL}/getapprovedorg`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          uniquevalue: uniquevalue,
        },
      });

      setapprovedOrgs(response.data);
    } catch (error) {
      console.error(error);
    }
  }

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Promise.all([fetchApproverThatHaveUniqueValue(), fetchlatestOrg()])
      .then(() => checker())
      .then(() => getOrganizations())
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <CCardBody className="p-0 m-0">
        <motion.div
          initial={{ opacity: 0, }} // Starts faded & moves up
          animate={{ opacity: 1, }} // Becomes fully visible
          exit={{ opacity: 0, }} // Fades out & moves up
          transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
        >
          <div
            className="approvaerlogTitleContainer"
            style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "5px" }}
          >
            <h4
              className="approvaerlogTitle"
              style={{ color: theme === "dark" ? "#F6FCFF" : "#1E2652", fontStyle: "Instrument Sans", }}
            >
              {isshown === "organization"
                ? "Organization Log"
                : isshown === "jobapproval"
                  ? "Import Job Log"
                  : isshown === "jobapprovalexp"
                    ? "Export Job Log"
                    // : isshown === "Bin"
                    //   ? "Bin Log"
                      : ""}
            </h4>
          </div>
          <div style={{ position: "relative", zIndex: "99", height: "1px" }}>
            <div className="navbar-container">
              {allowedButtons.includes("OrgButton") && (
                <button
                  className={`navbar-button ${isshown === "organization" ? "dark" : "light"}`}
                  onClick={() => setIsShown("organization")}
                >
                  Organization
                </button>
              )}

              {allowedButtons.includes("ImpJobButton") && (
                <button
                  className={`navbar-button ${isshown === "jobapproval" ? "dark" : "light"}`}
                  onClick={() => setIsShown("jobapproval")}
                >
                  Import Job
                </button>
              )}

              {allowedButtons.includes("ExpJobButton") && (
                <button
                  className={`navbar-button ${isshown === "jobapprovalexp" ? "dark" : "light"}`}
                  onClick={() => setIsShown("jobapprovalexp")}
                >
                  Export Job
                </button>
              )}
              {/* {showBinButton && (
                <button
                  className={`navbar-button ${isshown === "Bin" ? "dark" : "light"}`}
                  onClick={() => setIsShown("Bin")}
                >
                  Recycle Bin
                </button>
              )} */}
            </div>
          </div>
        </motion.div>

        <div className="content-container">
          {isshown === "organization" && <OrgApproval />}
          {isshown === "jobapproval" && <JobApproval />}
          {isshown === "jobapprovalexp" && <JobApprovalExp />}
          {/* {isshown === "Bin" && <Bin />} */}
        </div>
      </CCardBody>
    </div>
  );
};

export default Approverlog;