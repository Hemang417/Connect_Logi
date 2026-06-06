import React from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import styles from "./delegations.module.css";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import AddBtn from "../buttons/buttons/AddBtn";
import Calendar from "src/components/Calendar";
import SingleCalender from "src/components/SingleCalender";
import { useNavigate } from "react-router-dom";
import TaskInputPopup from "src/components/inputPopup/TaskInputPopup";
import TaskRemarkPopup from "src/components/inputPopup/TaskRemarkPopup";
import axios from "axios";
import NewButton from "../buttons/buttons/NewButton";
import Pagination from "src/layout/Pagination";
import toast from "react-hot-toast";
import InputPopup from "src/components/inputPopup/InputPopup";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function delegations() {
  const [currentPopup, setCurrentPopup] = useState("");
  const [delegations, fetchDelegation] = useState([]);
  const [assignedBy, setAssignedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [duration, setDuration] = useState();
  const [taskName, setTaskName] = useState("");
  const [isadmin, setisadmin] = useState(false);
  // 1. Add state for edit mode and selected delegation in your main component
  const [editMode, setEditMode] = useState(false);
  const [selectedDelegation, setSelectedDelegation] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  // Example usage
  const [showRemarkPopup, setShowRemarkPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowRemarkPopup(true);
    getDelegation();
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

  const handleRemarkConfirm = async (remarkData) => {
    console.log("Remark data:", remarkData);
    // Handle the remark data here
    // remarkData contains: taskId, taskName, remark, timestamp, addedBy
    try {
      const response = await axios.put(
        `${API_BASE_URL}/completeTask`,
        remarkData
      );
      console.log("Data updated successfully:", response.data);
      // Refresh delegations after updating

      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleRemarkClose = () => {
    setShowRemarkPopup(false);
    setSelectedTask(null);
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

  useEffect(() => {
    if (localStorage.getItem("username") === "admin") {
      setisadmin(true);
      setItemsPerPage(6);
    }
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deleteDelegation`,
        {
          id: selectedTask.id,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          remark: remark.remark,
          deletedby: localStorage.getItem("username"),
        }
      );

      console.log("deleted", response.data);
      getDelegation();
      toast.success("Task Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task.");
    }
  };

  const checkStatus = async () => {
    for (let i = 0; i < delegations.length; i++) {
      if (new Date(delegations[i].deadline) < new Date()) {
        console.log("Deadline has passed:", delegations[i].deadline);
        try {
          const response = await axios.put(
            `${API_BASE_URL}/delayedTask`,
            {
              taskId: delegations[i].id,
              taskStatus: "Delayed",
              orgcode: localStorage.getItem("orgcode"),
              orgname: localStorage.getItem("orgname"),
            }
          );
          console.log("Data updated successfully:", response.data);
          // Refresh delegations after updating
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    checkStatus();
  }, [delegations]);

  // 2. Add function to handle row double-click
  const handleRowDoubleClick = (delegation) => {
    console.log("Double clicked delegation:", delegation);

    // Transform delegation data to match popup form structure
    const editData = {
      id: delegation.id, // Add ID for update operations
      taskname: delegation.taskname || "",
      dueDate: delegation.deadline || "",
      duration: delegation.duration || "",
      TaskDescription: delegation.TaskDescription || "",
      assignedTo: delegation.assignedTo
        ? {
            value: delegation.assignedTo,
            label: delegation.assignedTo,
          }
        : null,
    };

    setSelectedDelegation(editData);
    setEditMode(true);
    setCurrentPopup("task");
  };

  // 3. Add function to handle task update
  const handleTaskUpdate = async (task) => {
    console.log("Updating task ->", task);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateDelegation`,
        task
      );
      console.log("Data updated successfully:", response.data);
      // Refresh delegations after updating
      getDelegation();
      setEditMode(false);
      setSelectedDelegation(null);
      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleTaskCreation = async (task) => {
    console.log("task ->", task);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/setDelegation`,
        task
      );
      console.log("Data stored successfully:", response.data);
      toast.success("Task Created Successfully");
      // Refresh delegations after creating new task
      getDelegation();
    } catch (error) {
      console.error(
        "Error storing data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getDelegation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getDelegation`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
        },
      });
      fetchDelegation(response.data || []);
      console.log("dele", response.data);
    } catch (error) {
      console.log(error);
      fetchDelegation([]);
    }
  };

  useEffect(() => {
    getDelegation();
  }, []);

  // Generate employee options from actual delegation data
  const assignedByOptions = useMemo(() => {
    if (!delegations || delegations.length === 0) return [];
    const uniqueAssignedBy = [
      ...new Set(delegations.map((d) => d.assignedBy).filter(Boolean)),
    ];
    return uniqueAssignedBy.map((name) => ({ label: name, value: name }));
  }, [delegations]);

  const assignedToOptions = useMemo(() => {
    if (!delegations || delegations.length === 0) return [];
    const uniqueAssignedTo = [
      ...new Set(delegations.map((d) => d.assignedTo).filter(Boolean)),
    ];
    return uniqueAssignedTo.map((name) => ({ label: name, value: name }));
  }, [delegations]);

  const setDueDateFun = (selectedDate) => {
    console.log(
      "Due date function called with:",
      selectedDate,
      typeof selectedDate
    );
    // Handle different possible formats from SingleCalender
    let dateValue = "";
    if (selectedDate) {
      if (typeof selectedDate === "string") {
        dateValue = selectedDate;
      } else if (selectedDate.target && selectedDate.target.value) {
        dateValue = selectedDate.target.value;
      } else if (selectedDate instanceof Date) {
        dateValue = selectedDate.toISOString().split("T")[0];
      }
    }
    console.log("Due date set to:", dateValue);
    setDueDate(dateValue);
  };

  const setAssignedDateFun = (selectedDate) => {
    console.log(
      "Assigned date function called with:",
      selectedDate,
      typeof selectedDate
    );
    // Handle different possible formats from SingleCalender
    let dateValue = "";
    if (selectedDate) {
      if (typeof selectedDate === "string") {
        dateValue = selectedDate;
      } else if (selectedDate.target && selectedDate.target.value) {
        dateValue = selectedDate.target.value;
      } else if (selectedDate instanceof Date) {
        dateValue = selectedDate.toISOString().split("T")[0];
      }
    }
    console.log("Assigned date set to:", dateValue);
    setAssignedDate(dateValue);
  };

  useEffect(() => {
    if (localStorage.getItem("username") !== "admin") {
      setAssignedTo(localStorage.getItem("username"));
    }
  }, []);

  const normalizeDateString = (dateInput) => {
    if (!dateInput) return null;

    try {
      let date;
      if (typeof dateInput === "string") {
        // Handle different string formats
        if (dateInput.includes("T")) {
          // ISO format: "2025-06-04T18:30:00.000Z"
          date = new Date(dateInput);
        } else if (dateInput.includes("-")) {
          // Already in YYYY-MM-DD format, return as-is
          return dateInput;
        } else {
          date = new Date(dateInput);
        }
      } else {
        date = new Date(dateInput);
      }

      if (isNaN(date.getTime())) return null;

      // Format using local date components (no UTC shift)
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd}`;
    } catch (error) {
      console.error("Error normalizing date:", error);
      return null;
    }
  };

  // Filter the delegations based on selected filters
  const filteredDelegations = useMemo(() => {
    if (!delegations || delegations.length === 0) return [];

    console.log("Starting filter with:", {
      assignedBy,
      assignedTo,
      assignedDate,
      dueDate,
      duration,
    });

    return delegations.filter((delegation) => {
      // Filter by assigned by
      if (assignedBy && assignedBy !== "") {
        const delegationAssignedBy = delegation.assignedBy?.toLowerCase();
        const filterAssignedBy = assignedBy.toLowerCase();
        if (
          !delegationAssignedBy ||
          !delegationAssignedBy.includes(filterAssignedBy)
        ) {
          console.log("Filtered out by assignedBy:", delegation.assignedBy);
          return false;
        }
      }

      // Filter by assigned to
      if (assignedTo && assignedTo !== "") {
        const delegationAssignedTo = delegation.assignedTo?.toLowerCase();
        const filterAssignedTo = assignedTo.toLowerCase();
        if (
          !delegationAssignedTo ||
          !delegationAssignedTo.includes(filterAssignedTo)
        ) {
          console.log("Filtered out by assignedTo:", delegation.assignedTo);
          return false;
        }
      }

      // Filter by assigned date
      if (assignedDate && assignedDate !== "") {
        const normalizedDelegationDate = normalizeDateString(
          delegation.assignedDate
        );
        const normalizedFilterDate = normalizeDateString(assignedDate);

        console.log("Date comparison (assigned):", {
          originalAssignedDate: delegation.assignedDate,
          normalizedDelegationDate,
          filterDate: assignedDate,
          normalizedFilterDate,
          match: normalizedDelegationDate === normalizedFilterDate,
        });

        if (normalizedDelegationDate !== normalizedFilterDate) {
          console.log("Filtered out by assignedDate");
          return false;
        }
      }

      // Filter by due date
      if (dueDate && dueDate !== "") {
        const normalizedDelegationDate = normalizeDateString(
          delegation.deadline
        );
        const normalizedFilterDate = normalizeDateString(dueDate);

        console.log("Date comparison (due):", {
          originalDeadline: delegation.deadline,
          normalizedDelegationDate,
          filterDate: dueDate,
          normalizedFilterDate,
          match: normalizedDelegationDate === normalizedFilterDate,
        });

        if (
          !normalizedDelegationDate ||
          normalizedDelegationDate !== normalizedFilterDate
        ) {
          console.log("Filtered out by dueDate");
          return false;
        }
      }

      // Filter by duration
      if (duration && duration !== "") {
        const delegationDuration = delegation.duration;
        const filterDuration = parseInt(duration);
        console.log(
          "Duration comparison:",
          delegationDuration,
          "vs",
          filterDuration
        );
        if (!delegationDuration || delegationDuration != filterDuration) {
          console.log("Filtered out by duration");
          return false;
        }
      }

      console.log("Delegation passed all filters:", delegation);
      return true;
    });
  }, [delegations, assignedBy, assignedTo, assignedDate, dueDate, duration]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDelegations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDelegations.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-GB");
    } catch (error) {
      return "Invalid Date";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {console.log("dele", delegations)}
      <div className={styles.container}>
        <div className={styles.firstRow}>
          <div
            onClick={() => {
              getDelegation();
              toast.success("Data Refreshed");
            }}
            className={styles.backButton}
          >
            <div className="link-btn">
              <RefreshBtn />
            </div>
          </div>
          <div className={styles.importBox}>
            <div className={styles.importTitle}>Delegation</div>
          </div>
          {isadmin && (
            <div
              onClick={() => {
                setCurrentPopup("task");
                setEditMode(false);
              }}
              className={styles.addButton}
            >
              <div className="link-btn">
                <AddBtn />
              </div>
            </div>
          )}
        </div>
        {console.log("items per page", itemsPerPage)}

        {/* Filter Section */}
        {isadmin && (
          <>
            <div className={styles.secondRow}>
              <div className={styles.secondRowBlocks}>
                <label>Assigned By:</label>
                <div>
                  <NewDropdownInput
                    type={"type1"}
                    placeholder={"Select Employee"}
                    options={assignedByOptions}
                    selectedValue={assignedBy}
                    setSelectedValue={setAssignedBy}
                    width={"160px"}
                  />
                </div>
              </div>
              <div className={styles.secondRowBlocks}>
                <label>Assigned To:</label>
                <div className={styles.MBLinput}>
                  <NewDropdownInput
                    type={"type1"}
                    placeholder={"Select Employee"}
                    options={assignedToOptions}
                    selectedValue={assignedTo}
                    setSelectedValue={setAssignedTo}
                    width={"160px"}
                  />
                </div>
              </div>
              <div className={styles.secondRowBlocks}>
                <label>Assigned Date:</label>
                <div className={styles.calender}>
                  <SingleCalender
                    width={"125px"}
                    name={"date"}
                    value={assignedDate}
                    onDateSelect={setAssignedDateFun}
                    leftright={"left"}
                  />
                </div>
              </div>
            </div>
            <div className={styles.secondRow}>
              <div className={styles.secondRowBlocks}>
                <label>Duration:</label>
                <div className={styles.MBLinput}>
                  <NewInput
                    width={"160px"}
                    type={"number"}
                    setSelectedValue={setDuration}
                    selectedValue={duration}
                    min={1}
                    placeholder={"Duration (days)"}
                  />
                </div>
              </div>
              <div className={styles.secondRowBlocks}>
                <label>Due Date:</label>
                <div className={styles.calender}>
                  <SingleCalender
                    width={"125px"}
                    name={"date"}
                    value={dueDate}
                    onDateSelect={setDueDateFun}
                    leftright={"left"}
                  />
                </div>
              </div>
              <div
                className={styles.secondRowBlocks}
                style={{ width: "160px" }}
              ></div>
            </div>
            <div className={styles.line}></div>
          </>
        )}
        {/* Results Count
        <div
          style={{
            textAlign: "center",
            margin: "10px 0",
            fontSize: "14px",
            color: theme === "dark" ? "#9ca3af" : "#6b7280",
          }}
        >
          Showing {filteredDelegations.length} of {delegations.length}{" "}
          delegations
        </div> */}

        {/* Table Section */}
        <div
          // className="overflow-x-auto"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
            overflowX: "scroll",
            scrollbarWidth: "thin",
            scrollbarColor: "gray transparent",
          }}
        >
          {/* // 4. Modified table with double-click handler */}
          <table
            className="min-w-full border-separate"
            style={{
              width: "95%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            {/* Table Header */}
            <thead className={styles.tableHead}>
              <tr>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  Date
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "220px",
                  }}
                >
                  Assigned By
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "220px",
                  }}
                >
                  Assigned To
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "160px",
                  }}
                >
                  Duration
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  Due Date
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "260px",
                  }}
                >
                  Task
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "160px",
                  }}
                >
                  Status
                </th>
                <th
                  className=" py-2 text-left"
                  style={{
                    fontWeight: "500",
                    textAlign: "center",
                    width: "150px",
                  }}
                >
                  Action
                </th>
                {isadmin && (
                  <th
                    className=" py-2 text-left"
                    style={{
                      fontWeight: "500",
                      textAlign: "center",
                      width: "88  px",
                    }}
                  >
                    Delete
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((delegation, rowIndex) => (
                  <tr
                    key={delegation.id || rowIndex}
                    className={`rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-all duration-200`}
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? rowIndex % 2 === 0
                            ? "#3B5472"
                            : "#263A52"
                          : rowIndex % 2 === 0
                          ? "#D8F0FD"
                          : "#F6FCFF",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                    }}
                    onDoubleClick={() => {
                      delegation.taskStatus === "pending"
                        ? handleRowDoubleClick(delegation)
                        : delegation.taskStatus === "Completed"
                        ? handleTaskClick(delegation)
                        : null;
                    }}
                    // title="Double-click to edit this delegation"
                  >
                    {/* Date */}
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {formatDate(delegation.assignedDate)}
                    </td>
                    {/* Assigned By */}
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {delegation.assignedBy || "N/A"}
                    </td>
                    {/* Assigned To */}
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {delegation.assignedTo || "N/A"}
                    </td>
                    {/* Duration */}
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {delegation.duration
                        ? `${delegation.duration} days`
                        : "N/A"}
                    </td>
                    {/* Due Date */}
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {formatDate(delegation.deadline)}
                    </td>
                    {/* Task */}
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {delegation.taskname || "N/A"}
                    </td>
                    <td
                      className={`${styles.tableData}  py-2`}
                      style={{ textAlign: "center" }}
                    >
                      {delegation.taskStatus || "N/A"}
                    </td>
                    <td
                      className={`${styles.tableData} `}
                      style={{ textAlign: "center" }}
                    >
                      {delegation.taskStatus === "pending" && (
                        <span onClick={() => handleTaskClick(delegation)}>
                          <NewButton text={"Mark as Done"} height={"24px"} />
                        </span>
                      )}
                    </td>
                    {isadmin && (
                      <td
                        className={`${styles.tableData}  py-2`}
                        style={{ textAlign: "center" }}
                        onClick={() => {
                          setCurrentPopup("delete");
                          setTaskName(delegation.taskname);
                          setSelectedTask(delegation);
                        }}
                      >
                        <DeleteBtn
                          fill={theme === "dark" ? "#f8d7da" : "#1E266D"}
                        />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      fontStyle: "italic",
                      color: theme === "dark" ? "#9ca3af" : "#6b7280",
                      backgroundColor: theme === "dark" ? "#3B5472" : "#D8F0FD",
                    }}
                  >
                    {delegations.length === 0
                      ? "No delegations found"
                      : "No delegations match the current filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
      {/* 5. Updated popup component call */}
      {currentPopup === "task" && (
        <TaskInputPopup
          title={editMode ? "Edit Task" : "Create New Task"}
          firstButtonText={editMode ? "Update Task" : "Create Task"}
          secondButtonText="Cancel"
          setCurrentPopup={setCurrentPopup}
          onTaskSubmit={editMode ? handleTaskUpdate : handleTaskCreation}
          editData={editMode ? selectedDelegation : null}
          width="720px"
          readonly={!isadmin}
        />
      )}
      {currentPopup === "delete" && (
        <InputPopup
          title={taskName}
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
      {showRemarkPopup && (
        <TaskRemarkPopup
          taskData={selectedTask}
          onConfirm={handleRemarkConfirm}
          onClose={handleRemarkClose}
          setCurrentPopup={setShowRemarkPopup}
        />
      )}
    </motion.div>
  );
}

export default delegations;
