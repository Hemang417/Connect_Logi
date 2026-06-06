import React, { useState, useEffect, useRef } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCol,
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CSidebar,
  CSidebarNav,
  CSidebarBrand,
  CSidebarHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import {
  cilLockLocked,
  cilUser,
  cilBuilding,
  cilChartPie,
  cilArrowRight,
  cilSpeedometer,
  cilLayers,
  cilCloudDownload,
} from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, Link } from "react-router-dom";
import { User_General } from "./Innerpage/User_General";
import { User_Import } from "./Innerpage/User_Import";
import { User_Export } from "./Innerpage/User_Export";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import Cookies from "js-cookie";
import styles from "./css/userreport.module.css";
import Calendar from "src/components/Calendar";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import API_BASE_URL from "src/config/config";
const Generate_Report = () => {
  const [isshown, setIsShown] = useState("urGeneral");
  const [branchdata, setbranchdata] = useState([]);
  const [branch, setBranch] = useState(""); // ← string, matches option.value
  const [clientsList, setClientsList] = useState([]); // store your fetched orgs here
  const [client, setClient] = useState(""); // selected client as string
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);

  const getAllClients = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getallorgsforfiltering`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      const allorgs = response.data;
      const allhaveorgs = [...allorgs];
      setClientsList(allhaveorgs); // ← keep list separate
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const branchnames = localStorage.getItem("branchnames");
    if (branchnames) {
      try {
        // Parse the JSON-like string
        const parsedData = JSON.parse(branchnames.replace(/'/g, '"'));
        setbranchdata(parsedData);
      } catch (error) {
        console.error("Error parsing branch names:", error);
      }
    }
    getAllClients();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  const handleDataFetch = (data) => {
    setReportData(data);
  };

  const uniqueBranches = branchdata.filter(
    (branch, index, self) =>
      index ===
      self.findIndex((e) =>
        typeof branch === "string"
          ? e === branch
          : e.branchname === branch.branchname
      )
  );

  const BranchOptions = [
    { label: "All Branches", value: "" }, // Default "All Branches" option
    ...uniqueBranches.map((branch) => ({
      value: typeof branch === "string" ? branch : branch.branchname,
      label: typeof branch === "string" ? branch : branch.branchname,
    })),
  ];

  const uniqueClient = clientsList.filter(
    (c, i, self) => i === self.findIndex((e) => e.clientname === c.clientname)
  );
  const ClientOptions = [
    { label: "All Clients", value: "" },
    ...uniqueClient.map((c) => ({
      value: typeof c === "string" ? c : c.clientname,
      label: typeof c === "string" ? c : c.clientname,
    })),
  ];

  const handleDateSelect = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // Add any additional logic for filtering or processing
  };

  const renderBranchNames = () => {
    if (branchdata.length === 0) {
      return <p>No branch data available</p>;
    }

    // Join branch names with commas
    const branchNamesString = branchdata.join(", ");

    return <span>{branchNamesString}</span>;
  };

  return (
    <div>
      <CCol xs={12}>
        <div className={styles.firstRow}>
          <div
            onClick={() => {
              navigate("/user_report");
            }}
            className="backButton"
            style={{ marginTop: "-16px" }}
          >
            <ArrowCircleLeft />
          </div>
          <div className={styles.importBox}>
            <div className={styles.Title}>
              <h4>Service Report</h4>
            </div>
          </div>
        </div>
        <div className="mb-2 container-div">
          <CCardBody>
            <div className={styles.secondRow}>
              <div>
                <label
                  for="Branch"
                  className="text-field-10"
                  style={{ display: "flex" }}
                >
                  Name:{" "}
                </label>
                <span className="text-data-1">
                  {localStorage.getItem("fullname")}
                </span>
              </div>
              <div>
                <label
                  for="Username"
                  className="text-field-10"
                  style={{ display: "flex" }}
                >
                  Username:{" "}
                </label>
                <span className="text-data-1">
                  {localStorage.getItem("empnameforaccess")}
                </span>
              </div>

              <div className="text-field-10">
                <label>Branch:</label>
                {/* <div className="branch-items">{renderBranchNames()}</div> */}
                <div style={{ display: "flex" }}>
                  <NewDropdownInput
                    type="type1"
                    options={BranchOptions}
                    placeholder={"All Branches"}
                    selectedValue={branch}
                    setSelectedValue={setBranch}
                    width={"150px"}
                  />
                </div>
              </div>
              <div className="text-field-10">
                <label>Client:</label>
                {/* <div className="branch-items">{renderBranchNames()}</div> */}
                <div style={{ display: "flex" }}>
                  <NewDropdownInput
                    type="type1"
                    options={ClientOptions}
                    placeholder={"All Clients"}
                    selectedValue={client}
                    setSelectedValue={setClient}
                    width={"150px"}
                  />
                </div>
              </div>
              <div className="text-field-10">
                <label>Completion Date:</label>
                <div style={{ position: "relative" }}>

{/* //                   <Calendar onDateSelect={(range) => setDateRange(range)} /> */}

                  <Calendar onDateSelect={handleDateSelect} />

                </div>
              </div>
            </div>
          </CCardBody>
        </div>
      </CCol>

      <div className={styles.line}></div>
      {console.log("clientsList", clientsList)}
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
              isshown === "urGeneral" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("urGeneral")}
          >
            General{" "}
          </button>
          <button
            className={`navbar-button-workflow ${
              isshown === "urImport" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("urImport")}
          >
            Import
          </button>
          <button
            className={`navbar-button-workflow ${
              isshown === "urExport" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("urExport")}
          >
            Export
          </button>
          <button
            className={`navbar-button-workflow ${
              isshown === "urAccounts" ? "dark" : "light"
            }`}
            onClick={() => setIsShown("urAccounts")}
          >
            Accounts{" "}
          </button>
        </div>
      </div>

      {isshown === "urGeneral" && (
        <User_General
          branch={branch}
          client={client}
          startDate={startDate}
          endDate={endDate}
          onDataFetch={handleDataFetch}
        />
      )}
      {isshown === "urImport" && (
        <User_Import
          branch={branch}
          client={client}
          startDate={startDate}
          endDate={endDate}
          onDataFetch={handleDataFetch}
        />
      )}
      {isshown === "urExport" && (
        <User_Export
          branch={branch}
          client={client}
          startDate={startDate}
          endDate={endDate}
          onDataFetch={handleDataFetch}
        />
      )}
    </div>
  );
};

export default Generate_Report;
