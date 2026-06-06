// 6. Updated TaskInputPopup component with proper edit handling
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SingleCalender from "../SingleCalender";
import axios from "axios";
import API_BASE_URL from "src/config/config";
// Mock data for assigned to dropdown - replace with your actual data source

const TaskInputPopup = ({
  firstButtonText = "Create Task",
  secondButtonText = "Cancel",
  handleAdd,
  handleSave,
  title = "Create New Task",
  setCurrentPopup,
  onTaskSubmit,
  editData,
  readonly,
}) => {
  const [formData, setFormData] = useState({
    taskname: "",
    dueDate: "",
    duration: "",
    description: "",
    assignedTo: null,
  });

  const location = useLocation();
  const [employee, setemployee] = useState();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Reset form when editData changes
  useEffect(() => {
    if (editData) {
      console.log("Setting edit data:", editData);
      setFormData({
        id: editData.id,
        taskname: editData.taskname || "",
        dueDate: editData.dueDate || "",
        duration: editData.duration || "",
        description: editData.TaskDescription || "",
        assignedTo: editData.assignedTo || null,
      });
    } else {
      // Reset form for new task creation
      setFormData({
        taskname: "",
        dueDate: "",
        duration: "",
        description: "",
        assignedTo: null,
      });
    }
  }, [editData]);

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

  const fetchAllUsernames = async () => {
    try {
      const codeoforg = localStorage.getItem("orgcode");
      const nameoforg = localStorage.getItem("orgname");
      const response = await axios.get(`${API_BASE_URL}/fetchAllusers`, {
        params: {
          orgcode: codeoforg,
          orgname: nameoforg,
        },
      });

      // Handle the updated response structure
      if (response.data) {
        setemployee(
          response.data.employees.map((employee) => {
            return { value: employee.username, label: employee.username };
          }) || []
        );
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    fetchAllUsernames();
  }, []);

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const PopupStyle = {
    width: "fit-content",
    position: "fixed",
    bottom: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.taskname.trim()) {
      alert("Task name is required");
      return;
    }

    if (!formData.dueDate) {
      alert("Due date is required");
      return;
    }

    // Prepare data for submission
    const taskData = {
      ...formData,
      assignedTo: formData.assignedTo ? formData.assignedTo.value : null,
      assignedToLabel: formData.assignedTo ? formData.assignedTo.label : null,
      orgcode: localStorage.getItem("orgcode"),
      orgname: localStorage.getItem("orgname"),
      branchname: localStorage.getItem("branchnameofemp"),
      branchcode: localStorage.getItem("branchcodeofemp"),
      assignedBy: localStorage.getItem("username"),
    };

    // Call appropriate handler
    if (onTaskSubmit) {
      onTaskSubmit(taskData);
    } else if (firstButtonText === "Save" && handleSave) {
      handleSave(taskData);
    } else if (handleAdd) {
      handleAdd(taskData);
    }

    setCurrentPopup("none");
  };

  const handleDueDate = (e) => {
    handleInputChange("dueDate", e.target.value);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        setCurrentPopup("none");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setCurrentPopup]);

  return (
    <>
      <div
        className={styles.darkBg}
        onClick={() => {
          setCurrentPopup("none");
        }}
      />
      <motion.div
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div className={styles.container} style={{ width: "500px" }}>
          <div className={styles.firstRow}>
            <h2 className={styles.title}>
              <strong>{title}</strong>
            </h2>
          </div>

          <div className={styles.secondRow}>
            <div className={styles.content} style={{ gap: "16px" }}>
              {/* Task Name Field */}
              <div className={styles.field} style={{ gap: "0px" }}>
                <label
                  htmlFor="taskname"
                  className="form-label"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "2px",
                  }}
                >
                  Task Name
                </label>
                <textarea
                  id="taskname"
                  name="taskname"
                  className={styles.input}
                  style={{
                    minHeight: "60px",
                    maxHeight: "100px",
                    paddingTop: "8px",
                    resize: "vertical",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                  placeholder="Enter task name..."
                  value={formData.taskname}
                  readOnly={readonly}
                  onChange={(e) =>
                    handleInputChange("taskname", e.target.value)
                  }
                />
              </div>

              {/* Due Date Field */}
              <div className={styles.field} style={{ gap: "0px" }}>
                <label
                  htmlFor="dueDate"
                  className="form-label"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "2px",
                  }}
                >
                  Due Date
                </label>
                <SingleCalender
                  width={"360px"}
                  name={"docReceivedOn"}
                  value={formData.dueDate}
                  onDateSelect={handleDueDate}
                  leftright={"right"}
                  readOnly={readonly}
                />
              </div>

              {/* Duration Field */}
              <div className={styles.field} style={{ gap: "0px" }}>
                <label
                  htmlFor="duration"
                  className="form-label"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "2px",
                  }}
                >
                  Duration (days)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min={0}
                  className={styles.input}
                  style={{ width: "100%", backgroundColor: "transparent" }}
                  placeholder="days"
                  value={formData.duration}
                  readOnly={readonly}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              </div>

              {/* Assigned To Field */}
              <div className={styles.field} style={{ gap: "0px" }}>
                <label
                  htmlFor="assignedTo"
                  className="form-label"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "2px",
                  }}
                >
                  Assigned To
                </label>
                <span
                  style={{
                    width: "100%",
                    border: `1px solid ${theme === "dark" ? "#D1EEFF" : "#535B87"
                      }`,
                    padding: "6px 0px",
                    borderRadius: "8px",
                  }}
                >
                  <Select
                    className={styles.importDropdown}
                    autoComplete="off"
                    options={employee}
                    isDisabled={readonly}
                    value={formData.assignedTo}
                    onChange={(selectedOption) => {
                      handleInputChange("assignedTo", selectedOption);
                    }}
                    placeholder="Select team member..."
                    isClearable
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
                        color: theme === "dark" ? "#D1EEFF" : "#535B87",
                        boxShadow: "none !important",
                        borderColor: "transparent !important",
                        width: "100%",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        textAlign: "center",
                        color: theme === "dark" ? "#D1EEFF" : "#535B87",
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        padding: "0px 8px",
                      }),
                      input: (provided) => ({
                        ...provided,
                        margin: "0px",
                        fontSize: "12px",
                        textAlign: "center",
                        color: theme === "dark" ? "#D1EEFF" : "#333d70",
                        "-webkit-text-fill-color":
                          theme === "dark" ? "#D1EEFF" : "#333d70",
                        backgroundColor: "transparent !important",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        fontSize: "12px",
                        textAlign: "center",
                        color: theme === "dark" ? "#D1EEFF" : "#333d70",
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
                        maxHeight: "150px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        msOverflowStyle: "none",
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
                </span>
              </div>

              {/* Description Field */}
              <div className={styles.field} style={{ gap: "0px" }}>
                <label
                  htmlFor="description"
                  className="form-label"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "2px",
                  }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={styles.input}
                  style={{
                    minHeight: "80px",
                    maxHeight: "120px",
                    paddingTop: "8px",
                    resize: "vertical",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                  placeholder="Enter task description..."
                  value={formData.description}
                  readOnly={readonly}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.thirdRow}>
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={handleSubmit}
            >
              <NewButton width={"128px"} text={firstButtonText} />
            </button>

            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={() => {
                setCurrentPopup("none");
              }}
            >
              <NewButton width={"128px"} text={secondButtonText} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TaskInputPopup;
