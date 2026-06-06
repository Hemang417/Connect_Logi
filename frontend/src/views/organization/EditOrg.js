import React, { useContext, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CNavItem,
  CNav,
  CNavLink,
  CPopover,
  CFormCheck,
} from "@coreui/react";
import "../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import NewButton from "../buttons/buttons/NewButton";
import Cookies from "js-cookie";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Accounts,
  Contactdetails,
  General,
  Registration,
  EditOrgHistory,
} from "./Innerpage";
import { AppContext, AppProvider } from "./Innerpage/AppContext";
import toast from "react-hot-toast";
import moment from "moment";
import "./css/organisation-styles.css";
import AddBtn from "../buttons/buttons/AddBtn";
import API_BASE_URL from "src/config/config";

const EditOrg = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [currentAlias, setcurrentAlias] = useState("");
  const [useAdd, setUseAdd] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const checkUsername = localStorage.getItem("username");
  const addBtn = "Client";

  const fetchcontrols = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/fetchaccesscontrols`,
        {
          params: {
            username: localStorage.getItem("username"),
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
            type: "ORGANIZATION",
          },
        }
      );

      const controlSet = new Set(data.map((item) => item.control));

      setUseAdd(controlSet.has("add-client"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcontrols();
  }, []);

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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const getFirstOrg = () => {
    try {
      return JSON.parse(localStorage.getItem("firstorgofclient")) || {};
    } catch {
      return {};
    }
  };
  const [section, setSection] = useState("general");

  const [someData, setSomeData] = useState({
    importername: localStorage.getItem("organizationclientname") || "",
    importerbranchname: getFirstOrg().branchname || "",
    address: getFirstOrg().address || "",
    GST: getFirstOrg().GST || "",
    IEC: getFirstOrg().IEC || "",
    portofshipment: "",
    finaldestination: "",
  });
  const {
    generalData,
    registrationData,
    accountData,
    contacts,
    checkedBoxOptions,
    orgganizationTypeOptions,
    setCheckedBoxOptions,
    setOrgganizationTypeOptions,
    isshown,
    setIsShown,
  } = useContext(AppContext);
  function redirectToOrg() {
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    setIsShown("general");
    toast.success("New Client Created Successfully");
    navigate("/organization#/organization");
  }
  // 1. First, modify your useEffect to sync the URL with state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sectionParam = queryParams.get("section") || "general"; // Default to 'general'
    setIsShown(sectionParam);
  }, [location.search]); // Trigger when URL changes

  // 2. Create a function to handle tab changes
  const handleTabChange = (tabName) => {
    // Update the URL
    navigate(
      `/Editorg?alias=${generalData.alias}&branch=${generalData.branchname}&id=${generalData.id}&section=${tabName}`
    );
    // Update the state immediately
    setIsShown(tabName);
  };

  const tabs = [
    "general",
    "registration",
    "accounts",
    "contactdetails",
    "edithistory",
  ];
  const nextTab = () => {
    const currentIndex = tabs.indexOf(isshown);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setIsShown(tabs[nextIndex]);
  };
  const prevTab = () => {
    const currentIndex = tabs.indexOf(isshown);
    const nextIndex = (currentIndex - 1) % tabs.length;
    setIsShown(tabs[nextIndex]);
  };

  function removeLocal() {
    toast.success("Create new client now");
    localStorage.setItem("updateBtn", false);
    localStorage.removeItem("clientname");
    localStorage.removeItem("alias");
    localStorage.removeItem("branchname");
    localStorage.removeItem("selectedBranchName");
    localStorage.removeItem("isEditing");
    localStorage.setItem("uniquevalue", "OrgButton");
  }

  const backButton = () => {
    navigate("/organization");
  };
  useEffect(() => {
    if (localStorage.getItem("firstorgofclient")) {
      const prefillwithLocal = async () => {
        try {
        } catch (error) {
          console.log("Error: " + error);
        }
      };
      prefillwithLocal();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <AppProvider>
        <div className="createjob-org-main-container">
          {/* <div
            className="approvaerlogTitleContainer"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <h4
              className="approvaerlogTitle"
              style={{
                color: theme === "dark" ? "#F6FCFF" : "#1E2652",
                fontStyle: "Instrument Sans",
              }}
            >
              {console.log("isshown -> ", isshown)}
              {isshown === "general"
                ? "General"
                : isshown === "registration"
                ? "Registration"
                : isshown === "jobapprovalexp"
                ? "Export Job Log"
                : isshown === "accounts"
                ? "Accounts"
                : isshown === "contactdetails"
                ? "Contact Details"
                : isshown === "edithistory"
                ? "Edit History"
                : ""}
            </h4>
          </div> */}
          <CCardBody className="button-div" style={{ marginBottom: "0px" }}>
            {/* <div
              className="refreshjob-button "
              style={{ transform: "translateX(24px)" }}
            >
              <Link type="submit" onClick={refreshData} className="link-btn">
                <RefreshBtn />
              </Link>
            </div> */}
            <div className="page-title" style={{ position: "relative" }}>
              <h5>General</h5>
            </div>
            {(checkUsername === "admin" || useAdd) && (
              <div
                className="createjob-button"
                style={{
                  transform: "translateX(-9px)",
                  position: "absolute",
                  right: "10px",
                }}
              >
                <Link
                  onClick={removeLocal}
                  to={"/Createorg"}
                  target="_blank"
                  className="link-btn"
                >
                  <AddBtn addBtn={addBtn} />
                </Link>
              </div>
            )}
            {/* {(checkUsername === "admin" || useDownload) && (
              <div
                className="downloadjob-button"
                style={{ transform: "translateX(-9px)" }}
              >
                <Link onClick={exportToExcel} className="link-btn">
                  <DownlodBtn />
                  <span className="visually-hidden">Download file</span>
                </Link>
              </div>
            )} */}
          </CCardBody>
          <div className="navbar-container">
            <button
              className={`navbar-button ${
                isshown === "general" ? "dark" : "light"
              }`}
              onClick={() => handleTabChange("general")} // Update the 'section' param}
            >
              General
            </button>
            <button
              className={`navbar-button ${
                isshown === "registration" ? "dark" : "light"
              }`}
              onClick={() => handleTabChange("registration")}
            >
              Registration
            </button>
            <button
              className={`navbar-button ${
                isshown === "accounts" ? "dark" : "light"
              }`}
              onClick={() => handleTabChange("accounts")}
            >
              Accounts
            </button>
            <button
              className={`navbar-button ${
                isshown === "contactdetails" ? "dark" : "light"
              }`}
              onClick={() => handleTabChange("contactdetails")}
            >
              Contact Details
            </button>
            <button
              className={`navbar-button ${
                isshown === "edithistory" ? "dark" : "light"
              }`}
              onClick={() => handleTabChange("edithistory")}
            >
              Edit History
            </button>
          </div>
          <div>
            {/* <CNav variant="tabs" className="userlist-cnav-cusros">
              <CNavItem>
                <CNavLink
                  className={`nav-link ${
                    isshown === "general" ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate(
                      `/Editorg?alias=${generalData.alias}&branch=${generalData.branchname}&id=${generalData.id}&section=general`
                    );
                  }}
                >
                  General
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  className={`nav-link ${
                    isshown === "registration" ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate(
                      `/Editorg?alias=${generalData.alias}&branch=${generalData.branchname}&id=${generalData.id}&section=registration`
                    );
                  }}
                >
                  Registration
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  className={`nav-link ${
                    isshown === "accounts" ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate(
                      `/Editorg?alias=${generalData.alias}&branch=${generalData.branchname}&id=${generalData.id}&section=accounts`
                    );
                  }}
                >
                  Accounts
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  className={`nav-link ${
                    isshown === "contactdetails" ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate(
                      `/Editorg?alias=${generalData.alias}&branch=${generalData.branchname}&id=${generalData.id}&section=contactdetails`
                    );
                  }}
                >
                  Contact Details
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  className={`nav-link ${
                    isshown === "edithistory" ? "active" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `/Editorg?alias=${generalData.alias}&branch=${generalData.branchname}&id=${generalData.id}&section=edithistory`
                    )
                  }
                >
                  Edit History
                </CNavLink>
              </CNavItem>
            </CNav> */}
            <div>
              {isshown === "general" && (
                <General data={someData} setData={setSomeData} />
              )}
              {isshown === "registration" && <Registration />}
              {isshown === "accounts" && <Accounts />}
              {isshown === "contactdetails" && <Contactdetails />}
              {isshown === "edithistory" && <EditOrgHistory />}
            </div>
            {/* <motion.div
              className="org-next-btn-edit-space"
              initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
              animate={{ opacity: 1, y: 0 }} // Becomes fully visible
              // exit={{ opacity: 0, y: -20 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
            >
              <div
                className="edit-org-next-button "
                style={{ display: "flex", gap: "10px", marginRight: "70px" }}
              >
                {isshown !== "general" && (
                  <div onClick={prevTab}>
                    <NewButton width={"120px"} text="Previous" />
                  </div>
                )}
                {isshown !== "edithistory" && (
                  <div onClick={nextTab}>
                    <NewButton width={"120px"} text="Next" />
                  </div>
                )}
              </div>
            </motion.div> */}
          </div>
        </div>
      </AppProvider>
    </motion.div>
  );
};

export default EditOrg;
