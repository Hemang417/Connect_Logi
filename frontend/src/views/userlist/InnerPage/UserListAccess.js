import React, { useState, useEffect } from "react";
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import "../../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import ApprovalAccess from "./ApprovalAccess";
import SplAccess from "./SplAccess";
// import TranspAccess from "./TranspAccess";
import Cookies from "js-cookie";

import BranchAccess from "./BranchAccess";
import KYCAccess from "./KYCAccess";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
const UserListAccess = () => {
  const location = useLocation();
  const decodedUsername = decodeURIComponent(
    location.pathname.split("/").pop()
  );
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isshown, setIsShown] = useState("branches");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{ position: "absolute", left: "0px" }}
          onClick={() => window.close()}
        >
          <ArrowCircleLeft />
        </span>
        <h3 className="page-title">User List Access</h3>
      </div>

      <CCol xs={12}>
        <div className="mb-2 container-div">
          <CCardBody>
            <div className="grid-container">
              <div>
                <label for="Branch" className="text-field-3">
                  Full Name:
                </label>
                <h4 className="text-field-10">
                  {localStorage.getItem("fullnameforaccess")}
                </h4>
              </div>
              <div>
                <label for="User Name" className="text-field-3">
                  User Name:
                </label>
                <h4 className="text-field-10">{decodedUsername}</h4>
              </div>
            </div>
          </CCardBody>
        </div>
      </CCol>
      <div className="line"></div>
      <div
        style={{
          position: "relative",
          zIndex: "99",
          height: "fit-content",
          margin: "14px 0px",
        }}
      >
        <div
          className="navbar-container-workflow"
          style={{ position: "relative" }}
        >
          <button
            className={`navbar-button-workflow ${
              isshown === "branches" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("branches")}
          >
            Branches
          </button>
          <button
            className={`navbar-button-workflow ${
              isshown === "kyc" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("kyc")}
          >
            KYC
          </button>
          <button
            className={`navbar-button-workflow ${
              isshown === "approval" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("approval")}
          >
            Approval
          </button>
          <button
            className={`navbar-button-workflow ${
              isshown === "splaccess" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("splaccess")}
          >
            Access Control
          </button>
        </div>
      </div>

      {isshown === "approval" && <ApprovalAccess />}
      {isshown === "splaccess" && <SplAccess />}
      {isshown === "branches" && <BranchAccess />}
      {isshown === "kyc" && <KYCAccess />}
    </div>
  );
};

export default UserListAccess;
