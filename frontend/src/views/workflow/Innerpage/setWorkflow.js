import React, { useEffect, useState } from "react";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
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
  CModal,
  CButton,
  CModalHeader,
  CFormCheck,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CPopover,
} from "@coreui/react";
// import '../../../css/styles.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import "../css/workflow-styles.css";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
// Import the component
import WorkflowPopup from "../../../components/inputPopup/WorkflowPopup";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";

const setWorkflow = () => {
  const [allbranches, setallbranches] = useState([]);
  const [allineofbusinesses, setalllineofbusinesses] = useState([]);
  const [allorgs, setallorgs] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [selectedLOB, setselectedLOB] = useState("");
  const [selectedBranch, setselectedBranch] = useState("");
  const [selectedOrg, setselectedOrg] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const [remark, setRemark] = useState("");
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
  const [WorkFlowsData, setWorkflowsData] = useState([]);

  const [filteredMilestones, setFilteredMilestones] = useState([]);
  const [allmilestones, setallmilestones] = useState([]);

  const [workflowData, setworkflowData] = useState({
    // workflowname: "",
    // duration: "",
    // days: "",
    // hours: "",
    // minutes: "",
    // milestone: "",
    // plandatechange: "",
    // selectedEmployee: [],
    // reminderdays: "",
    // reminderhours: "",
    // reminderminutes: "",
    // owntransport: "",
    // ownbooking: "",
    // consignmenttype: [],
    // betype: [],

    workflowname: "",
    plandatechange: true,
    duration: "",
    days: "",
    hours: "",
    minutes: "",
    milestone: "",
    selectedEmployee: [],
    reminderdays: "",
    reminderhours: "",
    reminderminutes: "",
    ownbooking: "No",
    owntransport: "No",
    consignmenttype: [],
    betype: [],
  });

  const [employeeData, setemployeeData] = useState([]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedWorkflow2, setSelectedWorkflow2] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [selectedBEType, setSelectedBEType] = useState([]);
  const [selectedConsignmentType, setSelectedConsignmentType] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [employees, setEmployees] = useState([]);

  const handleCreate = (workflowData) => {
    // Handle creation logic
    console.log("Creating workflow:", workflowData);
    // API calls, state updates, etc.
  };
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

  // const handleEmployeeSelect = (employee) => {
  //   setworkflowData({
  //     ...workflowData,
  //     selectedEmployee: employee.username // Set the selected employee in workflowData
  //   });
  // };

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

  useEffect(() => {
    const getMilestones = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getmilestones`,
          {
            params: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        // setallmilestones(response.data);
        const fetchedMilestones = response.data;
        setallmilestones(fetchedMilestones);

        // Filter milestones based on workflowlobname
        const workflowLobName = localStorage.getItem("workflowlobname");
        const workflowbranchname = localStorage.getItem("workflowbranchname");

        let filtered = fetchedMilestones.filter(
          (milestone) =>
            milestone.lobname === workflowLobName &&
            milestone.ownbranchname === workflowbranchname
        );
        console.log(filtered);

        // If no milestones match the specific branch, check for "ALL"
        if (filtered.length === 0) {
          filtered = fetchedMilestones.filter(
            (milestone) =>
              milestone.lobname === workflowLobName &&
              milestone.ownbranchname === "ALL"
          );
        }

        setFilteredMilestones(filtered);
      } catch (error) {
        console.log(error);
      }
    };
    getMilestones();
  }, []);

  const openEditModal = (workflow) => {
    setSelectedWorkflow(workflow); // Set the selected workflow data
    setworkflowData({
      workflowname: workflow.workflowname,
      duration: workflow.duration,
      days: workflow.days,
      hours: workflow.hours,
      minutes: workflow.minutes,
      milestone: workflow.workflowmilestone,
      plandatechange: workflow.plandatechange,
      selectedEmployee: workflow.assignedperson,
      reminderdays: workflow.reminderdays,
      reminderhours: workflow.reminderhours,
      reminderminutes: workflow.reminderminutes,
      owntransport: workflow.owntransport,
      ownbooking: workflow.ownbooking,
      consignmenttype: workflow.consignmenttype,
      betype: workflow.betype,
    });
    // setVisible(true); // Open the modal
    setIsVisible(true);
  };

  const handleRowDoubleClick = (workflow) => {
    openEditModal(workflow);
  };
  const handleChange = (name, value) => {
    setworkflowData({ ...workflowData, [name]: value });
  };

  const updateWorkflow = async () => {
    try {
      // Send request to update workflow data
      const response = await axios.put(
        `${API_BASE_URL}/updatesetworkflow`,
        {
          id: selectedWorkflow.id,
          ...workflowData,
        }
      );
      readsetworkflow();
      setVisible(false);
      window.location.reload();

      toast.success(`Workflow updated successfully`);
      location.reload(navigate("/setWorkflow"));
    } catch (error) {
      console.log(error);
      toast.error("Error updating workflow");
    }
  };

  const handleCheckboxChange = (name, checked) => {
    let checkvalue = 0;
    if (checked) {
      checkvalue = 1;
    }
    setworkflowData({ ...workflowData, [name]: checkvalue });
  };

  const resetSelectedEmployee = () => {
    setworkflowData((prevState) => ({
      ...prevState,
      searchQuery: "",
      selectedEmployee: [{ username: "" }],
    }));
  };

  // Save the handleModalClose function to call resetSelectedEmployee
  // const handleModalClose1 = () => {
  //   resetSelectedEmployee();
  //   setVisible(false);
  // };
  // const handleModalClose1 = () => {
  //   setVisible(false);
  //   setworkflowData({
  //     workflowname: null,
  //     duration: "",
  //     days: "",
  //     hours: "",
  //     minutes: "",
  //     milestone: "",
  //     plandatechange: "",
  //     selectedEmployee: [],
  //     reminderdays: "",
  //     reminderhours: "",
  //     reminderminutes: "",
  //   });
  //   setSelectedWorkflow(new Set());
  // };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedWorkflow(null); // Reset selected workflow
    setworkflowData({
      workflowname: "",
      duration: "",
      days: "",
      hours: "",
      minutes: "",
      milestone: "",
      plandatechange: "",
      selectedEmployee: [],
      reminderdays: "",
      reminderhours: "",
      reminderminutes: "",
      owntransport: "",
      ownbooking: "",
      consignmenttype: [],
      betype: [],
    });
    setSelectedEmployees(new Set());
    setisModalOpen(false);
    setRemark("");
  };
  const CreateWorkflow = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/createworkflow`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          workflowData: workflowData,
          branchName: localStorage.getItem("workflowbranchname"),
          lob: localStorage.getItem("workflowlobname"),
          importername: localStorage.getItem("workflowimportername"),
          username: localStorage.getItem("username"),
          // owntransport: localStorage.getItem("workflowowntran"),
          // ownbooking: localStorage.getItem("workflowownbooking"),
          // consignmenttype: localStorage.getItem("workflowconsignment"),
          // betype: localStorage.getItem("workflowbetype"),
        }
      );
      readsetworkflow();
      toast.success("Workflow created successfully");
      setVisible(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(" Error creating workflow");
    }
  };

  const handleDelete = async () => {
    try {
      const currentDate = moment().format("YYYY-MM-DD");

      const response = await axios.post(
        `${API_BASE_URL}/deletesetworkflow`,
        {
          id: selectedWorkflow2.id,
          orgname: selectedWorkflow2.orgname,
          orgcode: selectedWorkflow2.orgcode,
          importername: selectedWorkflow2.importername,
          ownbranchname: selectedWorkflow2.ownbranchname,
          lobname: selectedWorkflow2.lobname,
          deletedby: localStorage.getItem("username"),
          deletedat: currentDate,
          DeleteRemark: remark,
        }
      );
      if (response.status === 200) {
        toast.success("Milestone deleted successfully");
        readsetworkflow();
        setisModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting workflow");
      setisModalOpen(false);
    }
  };

  async function readsetworkflow() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/readsetworkflow`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            importername: localStorage.getItem("workflowimportername"),
            lobname: localStorage.getItem("workflowlobname"),
            branchname: localStorage.getItem("workflowbranchname"),
          },
        }
      );
      setWorkflowsData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAlltheemployeeswiththatbranchaccess() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getAlltheemployeeswiththatbranchaccess`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("workflowbranchname"),
          },
        }
      );
      // Remove duplicate employee names
      const uniqueUsernames = new Set();
      const uniqueEmployees = response.data.filter((employee) => {
        if (!uniqueUsernames.has(employee.username)) {
          uniqueUsernames.add(employee.username);
          return true; // Include in the filtered array
        }
        return false; // Exclude duplicate
      });
      setemployeeData(uniqueEmployees);
      console.log("employee with branch access", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      getAllBranches();
      getAllLineofBusinesses();
      getAllOrgs();
      // getMilestones();
      getAlltheemployeeswiththatbranchaccess();
      // readAllWorkflows();
      readsetworkflow();
    } catch (error) {
      console.log(error);
    }
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

  const handleEmployeeSelect = (employee, index) => {
    const updatedSelectedEmployees = [...workflowData.selectedEmployee];
    updatedSelectedEmployees[index] = { username: employee.username };
    setworkflowData({
      ...workflowData,
      selectedEmployee: updatedSelectedEmployees,
    });

    const newSelectedEmployees = new Set(selectedEmployees);
    newSelectedEmployees.add(employee.username);
    setSelectedEmployees(newSelectedEmployees);
  };

  // const handleEmployeeSelect = (employee, index) => {
  //   const updatedWorkflows = [...selectedWorkflows];
  //   updatedWorkflows[index].selectedEmployee = employee.username; // Set selected employee for the specific dropdown
  //   setSelectedWorkflows(updatedWorkflows);
  // };

  const handleAddDropdown = () => {
    setworkflowData((prevState) => ({
      ...prevState,
      selectedEmployee: [...prevState.selectedEmployee, { username: "" }],
    }));
  };

  // const handleDeleteDropdown = (index) => {
  //   setworkflowData((prevState) => ({
  //     ...prevState,
  //     selectedEmployee: Array.isArray(prevState.selectedEmployee)
  //       ? prevState.selectedEmployee.filter((_, i) => i !== index)
  //       : [],
  //   }));
  // };

  const handleDeleteDropdown = (index) => {
    const updatedEmployees = workflowData.selectedEmployee.filter(
      (_, i) => i !== index
    );
    setworkflowData({
      ...workflowData,
      selectedEmployee: updatedEmployees,
    });

    const updatedSelectedEmployees = new Set(selectedEmployees);
    const removedEmployee =
      workflowData.selectedEmployee[index].selectedEmployee;
    updatedSelectedEmployees.delete(removedEmployee);
    setSelectedEmployees(updatedSelectedEmployees);
  };

  return (
    <CCol xs={12} style={{ position: "relative" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <span
          style={{ position: "absolute", left: "20px" }}
          onClick={() => {
            navigate(`/workflow?section=Workflow`);
          }}
        >
          <ArrowCircleLeft />
        </span>
        <label className="workflow-label">Workflow Details</label>
      </div>
      <div className="mb-2 container-div">
        <CCardBody>
          <div className="grid-container-workflow">
            <div>
              <label
                className="wf-label"
                style={{ width: "fit-content", marginRight: "20px" }}
              >
                Applicable for:
              </label>
              {/* <input
                value={localStorage.getItem("workflowbranchname")}⌫⌫⌫⌫⌫⌫

                readOnly
              />{" "} */}
              <NewInput
                selectedValue={localStorage.getItem("workflowbranchname")}
                readlyOnly={true}
              />
            </div>
            <div>
              <label
                className="wf-label"
                style={{ width: "fit-content", marginRight: "20px" }}
              >
                Line of Business:
              </label>
              {/* <input value={localStorage.getItem("workflowlobname")} readOnly /> */}
              <NewInput
                selectedValue={localStorage.getItem("workflowlobname")}
                readlyOnly={true}
              />
            </div>

            <div>
              <label
                className="wf-label"
                style={{ width: "fit-content", marginRight: "20px" }}
              >
                Customer/Organization:
              </label>
              {/* <input
                className="setworkflow-input-org"
                value={localStorage.getItem("workflowimportername")}
                readOnly
              />{" "} */}
              <NewInput
                selectedValue={localStorage.getItem("workflowimportername")}
                readlyOnly={true}
              />
              {/* 
              <div className='left-div'>


              </div> */}
            </div>
            {/* <div>
              <label htmlFor="Locations" className="workflow-text-field-3">
                <h6>BE Type</h6>
              </label>
              <input value={localStorage.getItem("workflowbetype")} readOnly />
            </div>
            <div>
              <label htmlFor="Locations" className="workflow-text-field-3">
                <h6>Own Booking</h6>
              </label>
              <input value={localStorage.getItem("workflowownbooking")} readOnly />
            </div>
            <div>
              <label htmlFor="Locations" className="workflow-text-field-3">
                <h6>Own Transportation</h6>
              </label>
              <input value={localStorage.getItem("workflowowntran")} readOnly />
            </div>
            <div>
              <label htmlFor="Locations" className="workflow-text-field-3">
                <h6>Consignment Type</h6>
              </label>
              <input value={localStorage.getItem("workflowconsignment")} readOnly />
            </div>
             */}
          </div>
        </CCardBody>
      </div>

      {/* <CTableBody>
        <CTableRow>
          {" "}
          <div className="search-button">
            <svg
              className="workflow-setworflow-addbutton"
              type="submit"
              onClick={() => {
                setVisible(!visible);
              }}
              style={{ marginBottom: 20 }}
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                fill="#1C274C"
              />
            </svg>
          </div>
        </CTableRow>
      </CTableBody> */}

      <div>
        <CCardBody>
          <div>
            <button
              className="invisible-btn-style"
              onClick={() => {
                setIsVisible(true);
                setworkflowData({
                  workflowname: "",
                  plandatechange: true,
                  duration: "",
                  days: "",
                  hours: "",
                  minutes: "",
                  milestone: "",
                  selectedEmployee: [],
                  reminderdays: "",
                  reminderhours: "",
                  reminderminutes: "",
                  ownbooking: "No",
                  owntransport: "No",
                  consignmenttype: [],
                  betype: [],
                });
              }}
            >
              <AddBtn SvgWidth={"35px"} SVGheight={"35px"} />
            </button>
            <table className="table-wf">
              <thead>
                <tr className="head-wf" style={{ height: "18px" }}>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "100px",
                    }}
                  >
                    Milestone Name
                  </th>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "120px",
                    }}
                  >
                    TAT
                  </th>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "200px",
                    }}
                  >
                    Assigned Person
                  </th>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "20px",
                    }}
                  >
                    Operation
                  </th>
                </tr>
              </thead>

              <tbody className="body-wf">
                {WorkFlowsData &&
                  WorkFlowsData.map((workflow, index) => {
                    return (
                      <tr
                        className={`selected-row`}
                        key={index}
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
                          {workflow.workflowname}
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
                          {workflow.days
                            ? `${
                                workflow.days +
                                " days " +
                                workflow.hours +
                                " hours " +
                                workflow.minutes +
                                " mins "
                              }`
                            : "NA"}
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
                          {workflow.assignedperson.map((person) => (
                            <>
                              {person.username} {","}{" "}
                            </>
                          ))}
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
                          {/* EDIT BUTTON */}
                          {/* <svg
                            className="editbutton-milestone-workflow"
                            onClick={() => openEditModal(workflow)}
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
                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => {
                              setSelectedWorkflow2(workflow);
                              setCurrentPopup("Deletion");
                              // setisModalOpen(true);
                              setwfName(workflow.workflowname);
                            }}
                            className="delete-hover-color invisible-btn-style"
                          >
                            <DeleteBtn
                              fill={theme === "dark" ? "#f8d7da" : "#1e2652"}
                            />
                          </button>
                          {/* DELETE BUTTON ENDS*/}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </div>

      <WorkflowPopup
        visible={isVisible}
        setVisible={setIsVisible}
        filteredMilestones={filteredMilestones}
        employeeData={employeeData}
        handleCreate={CreateWorkflow}
        handleSave={updateWorkflow}
        handleDelete={(remark) => console.log("Deleting with reason:", remark)}
        selectedWorkflow={selectedWorkflow}
        workflowData={workflowData}
        setWorkflowData={setworkflowData}
      />
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
          top={"50%"}
          left={"50%"}
        />
      )}
    </CCol>
  );
};

export default setWorkflow;
