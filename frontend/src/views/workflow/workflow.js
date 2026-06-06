import React, { useEffect, useState } from "react";
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
  CNav,
  CNavItem,
  CNavLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import "../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Lob from "./Innerpage/Lob";
import Wf from "./Innerpage/Wf";
import toast from "react-hot-toast";
import MileStone from "./Innerpage/milestone";
import JobValue from "./Innerpage/JobValue";
import Cookies from "js-cookie";
import BillRefValue from "./Innerpage/BillRefValue";

const workflow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get("section") || "lob";
  const [isshown, setIsShown] = useState("Lob");
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

  return (
    <div>
      <div>
        {/* <CNav variant="tabs" className='userlist-cnav-cusros'>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Lob' ? 'active' : ''}`} onClick={() => { setIsShown("Lob") }}>Line of Business</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Milestone' ? 'active' : ''}`} onClick={() => { setIsShown("Milestone") }}>Milestone</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Wf' ? 'active' : ''}`} onClick={() => { setIsShown("Wf") }}>Workflow</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'JobValue' ? 'active' : ''}`} onClick={() => { setIsShown("JobValue") }}>JobValue</CNavLink>
          </CNavItem>

          </CNav> */}
        <div
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
            {section === "lob"
              ? "Line Of Business"
              : section === "Milestone"
              ? "Milestone"
              : section === "Workflow"
              ? "Workflow"
              : section === "JobValue"
              ? "Job Value"
              : section === "BillRefValue"
              ? "Bill Ref Value"
              : ""}
          </h4>
        </div>
        <div
          style={{ position: "relative", zIndex: "99", height: "fit-content" }}
        >
          <div className="navbar-container-workflow">
            <button
              className={`navbar-button-workflow ${
                section === "lob" ? "dark" : "light"
              }`}
              onClick={() =>  { navigate(
                    `/workflow?section=lob`
                  );}}
            >
              Line Of Business
            </button>
            <button
              className={`navbar-button-workflow ${
                section === "Milestone" ? "dark" : "light"
              }`}
              onClick={() =>  { navigate(
                    `/workflow?section=Milestone`
                  );}}
            >
              Milestone
            </button>
            <button
              className={`navbar-button-workflow ${
                section === "Workflow" ? "dark" : "light"
              }`}
              onClick={() =>  { navigate(
                    `/workflow?section=Workflow`
                  );}}
            >
              Workflow{" "}
            </button>
            <button
              className={`navbar-button-workflow ${
                section === "JobValue" ? "dark" : "light"
              }`}
              onClick={() =>  { navigate(
                    `/workflow?section=JobValue`
                  );}}
            >
              Job Value
            </button>
            <button
              className={`navbar-button-workflow ${
                section === "BillRefValue" ? "dark" : "light"
              }`}
              onClick={() =>   { navigate(
                    `/workflow?section=BillRefValue`
                  );}}
            >
              Bill Ref Value
            </button>
          </div>
        </div>

        {section === "lob" && <Lob />}
        {section === "Milestone" && <MileStone />}
        {section === "Workflow" && <Wf />}
        {section === "JobValue" && <JobValue />}
        {section === "BillRefValue" && <BillRefValue />}
      </div>
    </div>
  );
};

export default workflow;
