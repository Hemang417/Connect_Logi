import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "src/layout/Pagination";
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
  CPopover,
} from "@coreui/react";
import "../../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import InputPopup from "src/components/inputPopup/InputPopup";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import "../css/workflow-styles.css";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import workflow from "../workflow";
import API_BASE_URL from "src/config/config";

const Wf = () => {
  const [allbranches, setallbranches] = useState([]);
  const [allineofbusinesses, setalllineofbusinesses] = useState([]);
  const [visible, setvisible] = useState(false);
  const [allorgs, setallorgs] = useState([]);
  const [remark, setRemark] = useState("");
  const [selectedLOB, setselectedLOB] = useState("");
  const [selectedBEType, setselectedBEType] = useState("");
  const [selectedOwnTran, setselectedOwnTran] = useState("");
  const [selectedOwnBooking, setselectedOwnBooking] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedConsignment, setselectedConsignment] = useState("");
  const [selectedBranch, setselectedBranch] = useState("");
  const [selectedOrg, setselectedOrg] = useState("");
  const [selectedWorkflow, setselectedWorkflow] = useState("");
  const [WorkFlowsData, setWorkflowsData] = useState([]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [WorkFlowsDataPopup, setWorkflowsDataPopup] = useState({
    org: "",
    ownbranchname: "",
    lob: "",
  });
  const [isModalOpen, setisModalOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [wfName, setwfName] = useState("");
  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  const contactFields2 = [
    { id: "org", label: "Customer/Organization", inputType: "select" },
    { id: "ownbranchname", label: "Branches", inputType: "select" },
    { id: "lob", label: "Line of Business", inputType: "select" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
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

  // First filter the full dataset based on selectedBranch
  const filteredWorkflows = selectedBranch
    ? WorkFlowsData.filter(
        (workflow) => workflow.ownbranchname === selectedBranch
      )
    : WorkFlowsData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Then apply pagination to the filtered results
  const currentItems = filteredWorkflows.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (location.pathname === "/workflow") {
    localStorage.removeItem("idofworkflow");
    localStorage.removeItem("workflowlobname");
    localStorage.removeItem("workflowbranchname");
    localStorage.removeItem("workflowimportername");
    // localStorage.removeItem("workflowowntran");
    // localStorage.removeItem("workflowownbooking");
    // localStorage.removeItem("workflowconsignment");
    // localStorage.removeItem("workflowbetype");
  }

  const getAllBranches = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchBranchesofOwn`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setallbranches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllOrgs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getorgforTAT`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setallorgs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLineofBusinesses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getlob`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setalllineofbusinesses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOrgOptions = () => {
    // Create a map to store unique client names
    const uniqueClientNames = new Map();
    // Iterate through allorgs to extract unique client names
    allorgs.forEach((org) => {
      // uniqueClientNames.set(org.clientname, org.id); // Assuming org.id is the unique identifier
      uniqueClientNames.set(org.clientname, org.clientname); // Assuming org.id is the unique identifier
    });
    // Create options array from unique client names
    const options = Array.from(uniqueClientNames, ([label, value]) => ({
      label,
      value,
    }));

    // options.unshift({ label: "ALL", value: "ALL" });
    return options;
  };

  const handleorg = (value) => {
    const selectedOption = renderOrgOptions().find(
      (option) => option.value == value
    );
    setselectedOrg(selectedOption);
  };
  const handleModalClose = () => {
    setvisible(false);
    setselectedBranch("");
    setselectedLOB("");
    setselectedOrg("");
    setRemark("");
    setisModalOpen(false);
    // setselectedBEType("");
    // setselectedOwnTran("");
    // setselectedOwnBooking("");
    // setselectedConsignment("");
  };

  const readAllWorkflows = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/readallworkflows`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setWorkflowsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const currentDate = moment().format("YYYY-MM-DD");

      const response = await axios.post(
        `${API_BASE_URL}/deleteWorkflow`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          id: selectedWorkflow.id,
          importername: selectedWorkflow.importername,
          ownbranchname: selectedWorkflow.ownbranchname,
          lobname: selectedWorkflow.lobname,
          deletedby: localStorage.getItem("username"),
          deletedat: currentDate,
          DeleteRemark: remark,
        }
      );
      if (response.status === 200) {
        readAllWorkflows();
        toast.success(`Workflow deleted successfully`);
        setisModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Workflow issue try again");
      setisModalOpen(false);
    }
  };

  const handleAdd = async () => {
    console.log("Selected Org:", selectedOrg);
    try {
      const currentDate = moment().format("YYYY-MM-DD");
      const response = await axios.post(
        `${API_BASE_URL}/createOverviewofWorkflow`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branch: WorkFlowsDataPopup.ownbranchname || "All",
          lob: WorkFlowsDataPopup.lob,
          client: WorkFlowsDataPopup.org ? WorkFlowsDataPopup.org : "ALL",
          currentDate: currentDate,
          username: localStorage.getItem("username"),
          // betype: selectedBEType,
          // ownbooking: selectedOwnBooking,
          // owntransport: selectedOwnTran,
          // consignmenttype: selectedConsignment,
        }
      );
      setvisible(false);
      setselectedBranch("");
      setselectedLOB("");
      setselectedOrg("");
      readAllWorkflows();
      toast.success("Workflow added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Workflow issue");
    }
  };

  useEffect(() => {
    getAllBranches();
    getAllLineofBusinesses();
    getAllOrgs();
    readAllWorkflows();
  }, []);

  async function handleEdit(workflow) {
    try {
      localStorage.setItem("idofworkflow", workflow.id);
      localStorage.setItem("workflowlobname", workflow.lobname);
      localStorage.setItem("workflowbranchname", workflow.ownbranchname);
      localStorage.setItem("workflowimportername", workflow.importername);
      // localStorage.setItem("workflowowntran", workflow.owntransport);
      // localStorage.setItem("workflowownbooking", workflow.ownbooking);
      // localStorage.setItem("workflowconsignment", workflow.consignmenttype);
      // localStorage.setItem("workflowbetype", workflow.betype);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModeChange = () => {};
  const handleRowDoubleClick = (workflow) => {
    handleEdit(workflow);
    navigate("/setWorkflow");
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (WorkFlowsData.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < WorkFlowsData.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     } else if (e.key === "Enter") {
  //       if (selectedRowIndex !== null) {
  //         const selectedWorkflow = WorkFlowsData[selectedRowIndex];
  //         handleRowDoubleClick(selectedWorkflow);
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, WorkFlowsData]);

  const locationOptions = [
    { label: "All Locations", value: "" }, // Add first option
    ...allbranches.map((item) => ({
      value: item.ownbranchname,
      label: item.ownbranchname,
    })),
  ];

  const refreshData = async () => {
    try {
      readAllWorkflows();
      setselectedBranch("");
      toast.success("Data Refreshed");
    } catch (error) {
      console.log("fail to refresh ", error);
      toast.error("Fail to refresh");
    }
  };
  return (
    <div xs={12} style={{ position: "relative" }}>
      <div style={{ marginTop: "22px", position: "relative" }}>
        <div style={{ position: "absolute", top: "-58px", left: "48px" }}>
          <div
            onClick={refreshData}
            className="link-btn"
            style={{ marginLeft: "12px" }}
          >
            <RefreshBtn />
          </div>
        </div>
        <button
          className="invisible-btn-style"
          style={{ position: "relative", top: " -58px", left: " 84% " }}
          onClick={() => {
            // setvisible(!visible);
            setCurrentPopup("addwf");
          }}
        >
          <AddBtn addBtn={"Workflow"} />
        </button>
        <div className="container-div mb-2">
          <CCardBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <label htmlFor="Locations" className="wf-label">
                  Locations :
                </label>

                {/* <select
                  className="form-select-lob"
                  value={selectedBranch || ""}
                  onChange={(e) => setselectedBranch(e.target.value)}
                >
                  {allbranches &&
                    allbranches.map((item, index) => (
                      <option key={index} value={item.ownbranchname}>
                        {item.ownbranchname}
                      </option>
                    ))}
                  <option value=""> All</option>
                </select> */}
                <NewDropdownInput
                  type="type1"
                  options={locationOptions}
                  placeholder={"All Locations"}
                  selectedValue={selectedBranch || ""}
                  setSelectedValue={setselectedBranch}
                  width={"250px"}
                />

                {/* <CDropdown className="milestone-dropDown-field">
                  <CDropdownToggle className="dropdown-btn" color="secondary">
                    All
                  </CDropdownToggle>

                  <CDropdownMenu className="text-field-4">
                    {allbranches &&
                      allbranches.map((item, index) => (
                        <CDropdownItem
                          key={index}
                          onClick={() => setselectedBranch(item.ownbranchname)}
                        >
                          {item.ownbranchname}
                        </CDropdownItem>
                      ))}
                    <CDropdownItem onClick={() => setselectedBranch("")}>
                      All
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown> */}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <label for="Active" className="wf-label">
                  Active :
                </label>
                {/* <select className="form-select-lob">
                  <option onClick={() => handleModeChange("")}>Both</option>
                  <option onClick={() => handleModeChange("")}>Yes</option>
                  <option onClick={() => handleModeChange("")}>No</option>
                </select> */}
                <NewDropdownInput
                  type="type1"
                  options={[
                    { label: "Both", value: "" },
                    { label: "Yes", value: "" },
                    { label: "No", value: "" },
                  ]}
                  placeholder={"Active"}
                  selectedValue={""}
                  setSelectedValue={setselectedBranch}
                  width={"250px"}
                />
                {/* <CDropdown className="milestone-dropDown-field">
                  <CDropdownToggle className="dropdown-btn" color="secondary">
                    Select
                  </CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleModeChange("Air")}>
                      Yes
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handleModeChange("Sea")}>
                      No
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handleModeChange("")}>
                      Both
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown> */}
              </div>
            </div>
            {/* <div className="all-buttons" style={{ marginLeft: "40px" }}>
              <div>
                <button className="button-23">Search</button>
              </div>
            </div> */}
          </CCardBody>
        </div>
      </div>
      <div className="wf-line"></div>

      <div style={{ marginTop: "12px" }}>
        <CCardBody>
          {/* <CForm className="worflow-table"> */}
          <table className="table-wf">
            <thead>
              <tr className="head-wf" style={{ height: "22px" }}>
                {/* <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell> */}
                <th
                  style={{
                    padding: "5px 7px",
                    fontSize: "12px",
                    width: "120px",
                  }}
                >
                  Locations
                </th>

                <th
                  style={{
                    padding: "5px 7px",
                    fontSize: "12px",
                    width: "120px",
                  }}
                >
                  Organization/Customer
                </th>
                <th
                  style={{
                    padding: "5px 7px",
                    fontSize: "12px",
                    width: "120px",
                  }}
                >
                  Line of Business
                </th>

                <th
                  style={{
                    padding: "5px 7px",
                    fontSize: "12px",
                    width: "120px",
                  }}
                >
                  Operation
                </th>
              </tr>
            </thead>

            <tbody className="body-wf">
              {currentItems &&
                (selectedBranch
                  ? currentItems.filter(
                      (workflow) => workflow.ownbranchname === selectedBranch
                    ) // Filter workflows by selected branch
                  : currentItems
                ).map((workflow, index) => {
                  const isSelected = selectedRowIndex === index;
                  return (
                    <tr
                      key={index}
                      onClick={() => setSelectedRowIndex(index)}
                      className={`selected-row ${
                        isSelected ? "primary-selected" : ""
                      }`}
                      onDoubleClick={() => handleRowDoubleClick(workflow)}
                    >
                      <td
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472" // Dark mode even row
                                : "#263A52" // Dark mode odd row
                              : index % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row

                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {workflow.ownbranchname}
                      </td>
                      <td
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472" // Dark mode even row
                                : "#263A52" // Dark mode odd row
                              : index % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row

                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {workflow.importername}
                      </td>
                      <td
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472" // Dark mode even row
                                : "#263A52" // Dark mode odd row
                              : index % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row

                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {workflow.lobname}
                      </td>
                      <td
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? index % 2 === 0
                                ? "#3B5472" // Dark mode even row
                                : "#263A52" // Dark mode odd row
                              : index % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row

                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {/* <Link
                            to={"/setWorkflow"}
                          > */}
                        {/* EDIT BUTTON */}
                        {/* <svg
                              className="editbutton-workflow"
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="25px"
                              height="25px"
                              viewBox="0 0 50 50"
                            >
                              <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                            </svg> */}
                        {/* EDIT BUTTON ENDS*/}
                        {/* </Link> */}
                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => {
                            setRemark("");
                            setselectedWorkflow(workflow);
                            // setisModalOpen(true);
                            setCurrentPopup("Deletion");
                            setwfName(workflow.ownbranchname);
                          }}
                          className="delete-hover-color invisible-btn-style"
                        >
                          <DeleteBtn
                            fill={theme === "dark" ? "#f8d7da" : "#1e2652"}
                          />
                        </button>{" "}
                        {/* DELETE BUTTON ENDS*/}
                      </td>
                    </tr>
                  );
                })}
            </tbody>

            {/* <CTableBody>
                        {WorkFlowsData && WorkFlowsData.map((workflow, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableDataCell>{workflow.ownbranchname}</CTableDataCell>

                                    <CTableDataCell>{workflow.importername}</CTableDataCell>
                                    <CTableDataCell>{workflow.lobname}</CTableDataCell>
                                    <CTableDataCell>
                                        <Link to={'/setWorkflow'} target='_blank' onClick={() => handleEdit(workflow)}>Edit</Link>
                                        <CButton onClick={() => handleDelete(workflow)}>Delete</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })}
                    </CTableBody> */}
          </table>
          {/* </CForm> */}
        </CCardBody>
      </div>
      {/* <CTableBody></CTableBody> */}
      {/* <CRow>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>
                        <CPopover content="Add Workflow" trigger={['hover', 'focus']}>
                            <CButton color="primary" type="submit" onClick={() => { setvisible(!visible) }}>
                                +
                            </CButton>
                        </CPopover>
                    </div>
                </CCardBody>
            </CRow> */}

      <CModal
        size="lg"
        visible={visible}
        onClose={handleModalClose}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setvisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Add Workflow</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <div className="select-milestone-mode-div mt-2">
              <label for="Locations" className="lob-label">
                <h6>Customer/Organization </h6>
              </label>

              {/* <div className='left-div'> */}
              {/* <Select
                className="addwf-dropdownbutton"
                options={renderOrgOptions()}
                onChange={handleorg}
                placeholder="Customer/Organization Name"
              /> */}

              <select
                className="form-select-wf"
                onChange={(e) => handleorg(e.target.value)}
                placeholder="Customer/Organization Name"
              >
                {/* <option value="">
                  All
                </option> */}
                {renderOrgOptions().map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* </div> */}
            </div>
            <div className="select-milestone-mode-div mt-2">
              <label for="Locations" className="lob-label">
                <h6>Select Branch</h6>
              </label>

              <select
                className="form-select-wf wf-modal-fiels-width"
                onChange={(e) => setselectedBranch(e.target.value)}
                value={selectedBranch || ""}
              >
                <option value="">All</option>
                {allbranches &&
                  allbranches.map((item, index) => (
                    <option key={index} value={item.ownbranchname}>
                      {item.ownbranchname}
                    </option>
                  ))}
              </select>

              {/* <CDropdown className="wf-selectbranch-dropdown">
              <CDropdownToggle className="dropdown-btn" color="secondary">
                {selectedBranch ? selectedBranch : "Select"}
              </CDropdownToggle>
              <CDropdownMenu className="text-field-4 wf-menu-dropdown">
                <CDropdownItem
                  className="wf-item-dropdown"
                  key="all"
                  value="ALL"
                  onClick={() => setselectedBranch("ALL")}
                >
                  ALL
                </CDropdownItem>
                {allbranches &&
                  allbranches.map((item, index) => (
                    <CDropdownItem
                      className="wf-item-dropdown"
                      key={index}
                      value={selectedBranch}
                      onClick={() => setselectedBranch(item.ownbranchname)}
                    >
                      {item.ownbranchname}
                    </CDropdownItem>
                  ))}
              </CDropdownMenu>
            </CDropdown> */}
            </div>

            <div className="select-milestone-mode-div mt-2">
              <label for="Locations" className="lob-label">
                <h6>Select Line of Business</h6>
              </label>

              <select
                className="form-select-wf"
                value={selectedLOB || ""}
                onChange={(e) => setselectedLOB(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {allineofbusinesses &&
                  allineofbusinesses.map((item, index) => (
                    <option key={index} value={item.lobname}>
                      {item.lobname}
                    </option>
                  ))}
                <option></option>
              </select>

              {/* <CDropdown className="wf-selectbranch-dropdown">
                <CDropdownToggle className="dropdown-btn" color="secondary">
                  {selectedLOB ? selectedLOB : "Select"}
                </CDropdownToggle>
                <CDropdownMenu className="text-field-4 wf-menu-dropdown">
                  {allineofbusinesses &&
                    allineofbusinesses.map((item, index) => (
                      <CDropdownItem
                        className="wf-item-dropdown"
                        key={index}
                        value={selectedLOB}
                        onClick={() => setselectedLOB(item.lobname)}
                      >
                        {item.lobname}
                      </CDropdownItem>
                    ))}
                </CDropdownMenu>
              </CDropdown> */}
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleModalClose}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleAdd}>
            Add
          </CButton>
        </CModalFooter>
      </CModal>
      {currentPopup === "Deletion" && (
        <InputPopup
          title={wfName}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={remark}
          setValue={setRemark}
          handleAdd={handleDelete}
          firstButtonText={"Delete"}
          secondButtonText={"Close"}
          width={"450px"}
          selection={"none"}
          top={"60%"}
          left={"50%"}
        />
      )}
      {console.log("workflowpop", WorkFlowsDataPopup)}
      {currentPopup === "addwf" && (
        <InputPopup
          title="Add Workflow"
          setCurrentPopup={setCurrentPopup}
          fields={contactFields2}
          value={WorkFlowsDataPopup}
          setValue={setWorkflowsDataPopup}
          handleAdd={handleAdd}
          firstButtonText={"Add"}
          secondButtonText={"Close"}
          selection={"ownbranchname"}
          selection2={"lob"}
          selection3={"org"}
          showPrefix={true}
          milestoneSetvalue={true}
          dropdownType={"type1"}
          // dropdownPlaceholder={"Select Role"}
          dropdownValue={WorkFlowsDataPopup.ownbranchname || ""}
          dropdownOptions={allbranches.map((data) => ({
            label: data.ownbranchname,
            value: data.ownbranchname,
          }))}
          dropdownSetValue={setWorkflowsDataPopup}
          dropdownValue2={WorkFlowsDataPopup.lob || ""}
          dropdownOptions2={allineofbusinesses.map((data) => ({
            label: data.lobname,
            value: data.lobname,
          }))}
          dropdownSetValue2={setWorkflowsDataPopup}
          dropdownValue3={WorkFlowsDataPopup.org || ""}
          dropdownOptions3={renderOrgOptions()}
          dropdownSetValue3={setWorkflowsDataPopup}
          top={"60%"}
          left={"50%"}
          width={"330px"}
        />
      )}
      <CModal
        visible={isModalOpen}
        onClose={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader>
          <CModalTitle>Delete Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete the Milestone</p>
          <CFormInput
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter reason for deletion "
            rows="2"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            // onClick={(e) => handleDelete(e, allimpjobs.length - 1 - index)}
            onClick={handleDelete}
            disabled={remark === ""}
          >
            Yes, Delete
          </CButton>
          <CButton color="secondary" onClick={handleModalClose}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Wf;
