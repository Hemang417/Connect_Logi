import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewDropdownInput from "../DropDown/NewDropdownInput";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Or your state management import

const WorkflowPopup = ({
  position,
  width,
  top,
  left,
  visible,
  setVisible,
  title = "Add Workflow",
  // bgColor = "#f6fcff",
  filteredMilestones = [],
  employeeData = [],
  selectedWorkflow = null,
  handleSave,
  handleCreate,
  handleDelete,
  handleModalClose,
  workflowData,
  setWorkflowData,
}) => {
  // const [workflowData, setWorkflowData] = useState({
  //   workflowname: "",
  //   plandatechange: false,
  //   duration: "",
  //   days: "",
  //   hours: "",
  //   minutes: "",
  //   milestone: "",
  //   selectedEmployee: [],
  //   reminderdays: "",
  //   reminderhours: "",
  //   reminderminutes: "",
  //   ownbooking: "No",
  //   owntransport: "No",
  //   consignmenttype: [],
  //   betype: []
  // });

  const [remark, setRemark] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
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

  // Populate form if editing
  // useEffect(() => {
  //   if (selectedWorkflow) {
  //     setWorkflowData(selectedWorkflow);
  //   }
  // }, [selectedWorkflow]);

  // ESC key handler

  // Get sidebar state directly from your state management
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const PopupStyle = {
    width: "850px",
    position: "fixed",
    bottom: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "margin-left 0.3s ease",
    marginLeft: sidebarShow ? "140px" : "0",
    maxHeight: "94vh",
    overflowY: "auto",
    // scrollbarColor: "#abd3eb  transparent",
    // scrollbarWidth: "thin",
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        setVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setVisible]);

  const handleChange = (field, value) => {
    setWorkflowData({
      ...workflowData,
      [field]: value,
    });
  };

  const handleCheckboxChange = (field, checked) => {
    setWorkflowData({
      ...workflowData,
      [field]: checked,
    });
  };

  // const handleEmployeeSelect = (employee, index) => {
  //   const newSelectedEmployee = [...workflowData.selectedEmployee];
  //   newSelectedEmployee[index] = employee;
  //   setWorkflowData({
  //     ...workflowData,
  //     selectedEmployee: newSelectedEmployee,
  //   });
  // };

  // 1. First, create a filtered list of available employees
  // const availableEmployees = employeeData.filter(
  //   (employee) =>
  //     !workflowData.selectedEmployee.some(
  //       (e, i) => i !== index && e.username === employee.username
  //     )
  // );

  // Simplified handler
  const handleEmployeeSelect = (employee, index) => {
    const updatedEmployees = [...workflowData.selectedEmployee];
    updatedEmployees[index] = employee; // Store the whole employee object
    setWorkflowData({
      ...workflowData,
      selectedEmployee: updatedEmployees,
    });
  };

  const handleAddDropdown = () => {
    setWorkflowData({
      ...workflowData,
      selectedEmployee: [...workflowData.selectedEmployee, { username: "" }],
    });
  };

  const handleDeleteDropdown = (index) => {
    const newSelectedEmployee = [...workflowData.selectedEmployee];
    newSelectedEmployee.splice(index, 1);
    setWorkflowData({
      ...workflowData,
      selectedEmployee: newSelectedEmployee,
    });
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setRemark("");
  };

  const submitDelete = () => {
    handleDelete(remark);
    closeConfirmModal();
  };

  const handleSubmit = () => {
    if (selectedWorkflow) {
      handleSave(workflowData);
    } else {
      handleCreate(workflowData);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Dark background overlay */}
      <div className={styles.darkBg} onClick={() => setVisible(false)}></div>

      {/* Main popup */}
      <motion.div
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div
          className={styles.container}
          //  style={{ overflowY: "scroll" , scrollbarColor: "gray transparent" , scrollbarWidth: "thin"}}
        >
          {/* Header */}
          <div>
            <div className={styles.firstRow}>
              <h2 className={styles.title}>
                <strong>{title}</strong>
              </h2>
            </div>

            {/* Content area */}
            <div className={styles.secondRow}>
              <div className={styles.content} style={{ padding: "2% 8%" }}>
                {/* Milestone Names */}
                <div style={{ display: "flex", width: "100%" }}>
                  <div
                    className="workflow-milestone-name-spacing"
                    style={{
                      width: "49%",
                      borderRight: "1px solid #ccc",
                      paddingRight: "20px",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="workflowname"
                        className="workflow-text-field-3"
                      >
                        <h6
                          className={styles.field}
                          style={{ fontWeight: "bold", marginBottom: "10px" }}
                        >
                          Milestone Names
                        </h6>
                      </label>
                      {/* <select
                      className={styles.input}
                      style={{ width: "109%" }}
                      value={workflowData.workflowname || ""}
                      onChange={(e) =>
                        handleChange("workflowname", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        {workflowData.workflowname
                          ? workflowData.workflowname
                          : "Select"}
                      </option>
                      {filteredMilestones.map((milestone, index) => (
                        <option key={index} value={milestone.milestonename}>
                          {milestone.milestonename}
                        </option>
                      ))}
                    </select> */}
                      <NewDropdownInput
                        type="type2"
                        options={filteredMilestones.map((milestone) => {
                          return {
                            value: milestone.milestonename,
                            label: milestone.milestonename,
                          };
                        })}
                        placeholder={"Select"}
                        selectedValue={workflowData.workflowname || ""}
                        setSelectedValue={handleChange}
                        width={"320px"}
                        nameOfDropdown={"workflowname"}
                      />
                    </div>
                  </div>
                  <div
                    className="workflow-milestone-name-inner-spacing"
                    style={{ marginTop: "10px" }}
                  >
                    <label className={styles.field} htmlFor="plandatechange">
                      <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Can Change Plan Date
                      </h6>
                    </label>
                    {/* <input
                    type="checkbox"
                    id="plandatechange"
                    checked={workflowData.plandatechange}
                    onChange={(e) =>
                      handleCheckboxChange("plandatechange", e.target.checked)
                    }
                    style={{ marginLeft: "10px" }}
                  /> */}
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "8px",
                        }}
                      >
                        <input
                          type="checkbox"
                          name="plandatechange"
                          checked={workflowData.plandatechange}
                          onChange={(e) => {
                            handleCheckboxChange(
                              "plandatechange",
                              e.target.checked
                            );
                          }}
                          style={{ marginRight: "5px" }}
                        />
                        <span className={styles.field}>Yes</span>
                      </label>
                      {/* <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        name="plandatechange"
                        checked={workflowData.plandatechange === false}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "plandatechange",
                            e.target.checked
                          )
                        }
                        style={{ marginRight: "5px" }}
                      />
                      <span>No</span>
                    </label> */}
                    </div>
                  </div>
                </div>

                {/* Planning section - only show if plandatechange is false */}
                {workflowData.plandatechange === true && (
                  <div className={styles.field} style={{ marginTop: "20px" }}>
                    <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      Planning
                    </h6>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <label htmlFor="duration" style={{ marginRight: "5px" }}>
                        <h6>Duration</h6>
                      </label>
                      {/* <select
                      id="duration"
                      className={styles.input}
                      style={{ width: "100px" }}
                      value={workflowData.duration || ""}
                      onChange={(e) => handleChange("duration", e.target.value)}
                    >
                      <option value="" disabled>
                        {workflowData.duration
                          ? workflowData.duration
                          : "Select"}
                      </option>
                      <option value="Before">Before</option>
                      <option value="After">After</option>
                    </select> */}
                      <NewDropdownInput
                        type="type2"
                        options={[
                          { value: "Before", label: "Before" },
                          { value: "After", label: "After" },
                        ]}
                        placeholder={"Select"}
                        selectedValue={workflowData.duration || ""}
                        setSelectedValue={handleChange}
                        width={"150px"}
                        nameOfDropdown={"duration"}
                      />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "5px",
                        }}
                      >
                        <input
                          type="text"
                          className={styles.input}
                          style={{ width: "60px" }}
                          onChange={(e) => handleChange("days", e.target.value)}
                          value={workflowData.days}
                        />
                        <label style={{ margin: "0 10px 0 5px" }}>Days</label>

                        <input
                          type="text"
                          className={styles.input}
                          style={{ width: "60px" }}
                          onChange={(e) =>
                            handleChange("hours", e.target.value)
                          }
                          value={workflowData.hours}
                        />
                        <label style={{ margin: "0 10px 0 5px" }}>Hours</label>

                        <input
                          type="text"
                          className={styles.input}
                          style={{ width: "60px" }}
                          onChange={(e) =>
                            handleChange("minutes", e.target.value)
                          }
                          value={workflowData.minutes}
                        />
                        <label style={{ margin: "0 10px 0 5px" }}>Mins.</label>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "5px",
                          width: "100%",
                        }}
                      >
                        <label style={{ marginRight: "10px" }}>of</label>
                        {/* <select
                        className={styles.input}
                        style={{ flex: 1 }}
                        value={workflowData.milestone || ""}
                        onChange={(e) =>
                          handleChange("milestone", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          {workflowData.milestone
                            ? workflowData.milestone
                            : "Select"}
                        </option>
                        <option value="Job Creation Date">
                          Job Creation Date
                        </option>
                        {filteredMilestones.map((milestone, index) => (
                          <option key={index} value={milestone.milestonename}>
                            {milestone.milestonename}
                          </option>
                        ))}
                      </select> */}

                        <NewDropdownInput
                          type="type2"
                          options={filteredMilestones
                            .map((milestone) => ({
                              value: milestone.milestonename,
                              label: milestone.milestonename,
                            }))
                            .concat([
                              {
                                value: "Job Creation Date",
                                label: "Job Creation Date",
                              },
                            ])}
                          placeholder={"Select"}
                          selectedValue={workflowData.milestone || ""}
                          setSelectedValue={handleChange}
                          width={"620px"}
                          nameOfDropdown={"milestone"}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* Access section */}
                  <div
                    style={{
                      marginTop: "20px",
                      width: "49%",
                      borderRight: "1px solid #ccc",
                      paddingRight: "20px",
                    }}
                  >
                    <h6
                      className={styles.field}
                      style={{
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      Access
                    </h6>
                    {workflowData.selectedEmployee &&
                      workflowData.selectedEmployee.length > 0 &&
                      workflowData.selectedEmployee.map(
                        (selectedEmployee, index) => {
                          const availableEmployees = employeeData.filter(
                            (employee) =>
                              !workflowData.selectedEmployee.some(
                                (e, i) =>
                                  i !== index &&
                                  e.username === employee.username
                              )
                          );

                          return (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <NewDropdownInput
                                type="type8"
                                options={availableEmployees.map((employee) => ({
                                  value: employee.username, // Use username as value
                                  label: `${employee.username} (${
                                    employee.fullName || "No name"
                                  })`,
                                  employeeObject: employee, // Store full object separately
                                }))}
                                placeholder="Select Employee"
                                selectedValue={selectedEmployee.username || ""}
                                setSelectedValue={(selectedOption) => {
                                  // Handle both direct values and option objects
                                  const username =
                                    selectedOption?.value || selectedOption;
                                  const employee = availableEmployees.find(
                                    (emp) => emp.username === username
                                  ) || { username };
                                  handleEmployeeSelect(employee, index);
                                }}
                                width="100%"
                                nameOfDropdown={`employee-${index}`}
                                isSearchable={true}
                              />
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  padding: "5px",
                                  color: `${
                                    theme === "dark" ? "#FFF" : "#1C274C"
                                  }`,
                                }}
                                onClick={() => handleDeleteDropdown(index)}
                              >
                                ✖
                              </button>
                            </div>
                          );
                        }
                      )}
                    <div onClick={handleAddDropdown}>
                      <div className="search-button">
                        <svg
                          type="submit"
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
                            fill={theme === "dark" ? "#FFF" : "#1C274C"}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: "20px" }}>
                    <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      Reminder Duration
                    </h6>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <input
                        type="text"
                        className={styles.input}
                        style={{ width: "60px" }}
                        onChange={(e) =>
                          handleChange("reminderdays", e.target.value)
                        }
                        value={workflowData.reminderdays}
                      />
                      <label style={{ marginRight: "10px" }}>Days</label>

                      <input
                        type="text"
                        className={styles.input}
                        style={{ width: "60px" }}
                        onChange={(e) =>
                          handleChange("reminderhours", e.target.value)
                        }
                        value={workflowData.reminderhours}
                      />
                      <label style={{ marginRight: "10px" }}>Hours</label>

                      <input
                        type="text"
                        className={styles.input}
                        style={{ width: "60px" }}
                        onChange={(e) =>
                          handleChange("reminderminutes", e.target.value)
                        }
                        value={workflowData.reminderminutes}
                      />
                      <label>Mins.</label>
                    </div>
                  </div>
                </div>

                {/* Own Booking */}
                <div style={{ display: "flex" }}>
                  <div style={{ width: "49%" }}>
                    <div
                      className={styles.field}
                      style={{
                        marginTop: "20px",
                        borderRight: "1px solid #ccc",
                        paddingRight: "20px",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Own Booking
                      </h6>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <label
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="radio"
                            name="ownbooking"
                            value="Yes"
                            checked={workflowData.ownbooking === "Yes"}
                            onChange={(e) =>
                              handleChange("ownbooking", e.target.value)
                            }
                            style={{ marginRight: "5px" }}
                          />
                          <span>Yes</span>
                        </label>
                        <label
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="radio"
                            name="ownbooking"
                            value="No"
                            checked={workflowData.ownbooking === "No"}
                            onChange={(e) =>
                              handleChange("ownbooking", e.target.value)
                            }
                            style={{ marginRight: "5px" }}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Own Transport */}
                  <div
                    className={styles.field}
                    style={{ marginTop: "20px", marginLeft: "38px" }}
                  >
                    <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      Own Transport
                    </h6>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="radio"
                          name="owntransport"
                          value="Yes"
                          checked={workflowData.owntransport === "Yes"}
                          onChange={(e) =>
                            handleChange("owntransport", e.target.value)
                          }
                          style={{ marginRight: "5px" }}
                        />
                        <span>Yes</span>
                      </label>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="radio"
                          name="owntransport"
                          value="No"
                          checked={workflowData.owntransport === "No"}
                          onChange={(e) =>
                            handleChange("owntransport", e.target.value)
                          }
                          style={{ marginRight: "5px" }}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
                {/* Consignment Type */}

                <div style={{ display: "flex" }}>
                  <div style={{ width: "49%" }}>
                    <div
                      className={styles.field}
                      style={{
                        marginTop: "20px",
                        borderRight: "1px solid #ccc",
                        paddingRight: "20px",
                      }}
                    >
                      <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        Consignment Type
                      </h6>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {["FCL", "LCL", "Break Bulk"].map((type) => (
                          <label
                            key={type}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              checked={workflowData.consignmenttype.includes(
                                type
                              )}
                              onChange={() => {
                                const updatedConsignmentTypes =
                                  workflowData.consignmenttype.includes(type)
                                    ? workflowData.consignmenttype.filter(
                                        (item) => item !== type
                                      )
                                    : [...workflowData.consignmenttype, type];
                                setWorkflowData({
                                  ...workflowData,
                                  consignmenttype: updatedConsignmentTypes,
                                });
                              }}
                              style={{ marginRight: "10px" }}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BE Type */}
                  <div
                    className={styles.field}
                    style={{ marginTop: "20px", marginLeft: "38px" }}
                  >
                    <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      BE Type
                    </h6>
                    <div style={{ display: "flex", gap: "120px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {["Home", "In-Bond", "Ex-Bond"].map((type) => (
                          <label
                            key={type}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              checked={workflowData.betype.includes(type)}
                              onChange={() => {
                                const updatedBETypes =
                                  workflowData.betype.includes(type)
                                    ? workflowData.betype.filter(
                                        (item) => item !== type
                                      )
                                    : [...workflowData.betype, type];
                                setWorkflowData({
                                  ...workflowData,
                                  betype: updatedBETypes,
                                });
                              }}
                              style={{ marginRight: "10px" }}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        {["SEZ-Z", "SEZ-M", "SEZ-T"].map((type) => (
                          <label
                            key={type}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              checked={workflowData.betype.includes(type)}
                              onChange={() => {
                                const updatedBETypes =
                                  workflowData.betype.includes(type)
                                    ? workflowData.betype.filter(
                                        (item) => item !== type
                                      )
                                    : [...workflowData.betype, type];
                                setWorkflowData({
                                  ...workflowData,
                                  betype: updatedBETypes,
                                });
                              }}
                              style={{ marginRight: "10px" }}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className={styles.thirdRow}>
              <button
                style={{ border: "none", padding: "0px", borderRadius: "8px" }}
                onClick={handleSubmit}
              >
                <NewButton
                  width={"128px"}
                  text={selectedWorkflow ? "Save " : "Create "}
                />
              </button>

              <button
                style={{ border: "none", padding: "0px", borderRadius: "8px" }}
                onClick={() => setVisible(false)}
              >
                <NewButton width={"128px"} text={"Close"} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Modal for Delete */}
      {isConfirmModalOpen && (
        <>
          <div className={styles.darkBg} onClick={closeConfirmModal}></div>
          <motion.div
            className={styles.popupWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{
              width: "400px",
              top: "50%",
              left: "50%",
              position: "absolute",
            }}
          >
            <div className={styles.container}>
              <div className={styles.firstRow}>
                <h2 className={styles.title}>
                  <strong>Delete Confirmation</strong>
                </h2>
              </div>

              <div className={styles.secondRow}>
                <div className={styles.content}>
                  <p>Are you sure you want to delete the Lob Milestone?</p>
                  <input
                    type="text"
                    className={styles.input}
                    style={{ width: "100%" }}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter reason for deletion"
                  />
                </div>
              </div>

              <div className={styles.thirdRow}>
                <button
                  style={{
                    border: "none",
                    padding: "0px",
                    borderRadius: "8px",
                  }}
                  onClick={submitDelete}
                  disabled={remark === ""}
                >
                  <NewButton width={"128px"} text={"Yes, Delete"} />
                </button>

                <button
                  style={{
                    border: "none",
                    padding: "0px",
                    borderRadius: "8px",
                  }}
                  onClick={closeConfirmModal}
                >
                  <NewButton width={"128px"} text={"No"} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default WorkflowPopup;
