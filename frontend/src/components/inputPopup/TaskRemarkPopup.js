import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import { useSelector } from "react-redux";
import moment from "moment";
const TaskRemarkPopup = ({
  taskData = null,
  onConfirm,
  onClose,
  setCurrentPopup,
}) => {
  const [remark, setRemark] = useState("");
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Theme effect
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

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

  // Update theme class
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const PopupStyle = {
    width: "fit-content",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

  const handleConfirm = () => {
    if (!remark.trim()) {
      alert("Please enter a remark");
      return;
    }

    const remarkData = {
      taskId: taskData?.id,
      taskName: taskData?.taskname,
      remark: remark.trim(),
      timestamp: new Date().toISOString(),
      addedBy: localStorage.getItem("username"),
    };

    if (onConfirm) {
      onConfirm(remarkData);
    }

    handleClose();
  };

  const handleClose = () => {
    setRemark("");
    if (setCurrentPopup) {
      setCurrentPopup("none");
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={styles.darkBg}
        onClick={handleClose}
      />
      <motion.div
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div className={styles.container} style={{ width: "450px" }}>
          <div className={styles.firstRow}>
            <h2 className={styles.title}>
              <strong>{taskData.completedOn ? "Task Completion" : "Add Remark on Task"}</strong>
            </h2>
          </div>

          <div className={styles.secondRow}>
            <div className={styles.content} style={{ gap: "16px" }}>
              {/* Task Info Display (Optional) */}
              {taskData && (
                <div className={styles.field} style={{ gap: "0px" }}>
                  <label
                    className="form-label"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "2px",
                    }}
                  >
                    Task
                  </label>
                  <div
                    style={{
                      padding: "8px 12px",
                      backgroundColor: theme === "dark" ? "rgba(209, 238, 255, 0.1)" : "rgba(83, 91, 135, 0.1)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: theme === "dark" ? "#D1EEFF" : "#535B87",
                      border: `1px solid ${theme === "dark" ? "rgba(209, 238, 255, 0.2)" : "rgba(83, 91, 135, 0.2)"}`,
                    }}
                  >
                    {taskData.taskname}
                  </div>
                </div>
              )}
              {(taskData && taskData.completedOn) && (
                <div className={styles.field} style={{ gap: "0px" }}>
                  <label
                    className="form-label"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "2px",
                    }}
                  >
                    Completeded On
                  </label>
                  <div
                    style={{
                      padding: "8px 12px",
                      backgroundColor: theme === "dark" ? "rgba(209, 238, 255, 0.1)" : "rgba(83, 91, 135, 0.1)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: theme === "dark" ? "#D1EEFF" : "#535B87",
                      border: `1px solid ${theme === "dark" ? "rgba(209, 238, 255, 0.2)" : "rgba(83, 91, 135, 0.2)"}`,
                    }}
                  >
                    {moment(taskData.completedOn).format('DD-MM-YYYY   hh:mm a')}
                  </div>
                </div>
              )}

              {/* Remark Field */}
              <div className={styles.field} style={{ gap: "0px" }}>
                <label
                  htmlFor="remark"
                  className="form-label"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "2px",
                  }}
                >
                  Remark
                </label>
                <textarea
                  id="remark"
                  name="remark"
                  className={styles.input}
                  style={{
                    minHeight: "100px",
                    maxHeight: "150px",
                    paddingTop: "8px",
                    resize: "vertical",
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                  placeholder="Enter your remark here..."
                  value={remark ? remark : taskData.completionRemark}
                  onChange={(e) => setRemark(e.target.value)}
                  readOnly={taskData?.completionRemark ? true : false}
                //   autoFocus
                />
              </div>
            </div>
          </div>

          <div className={styles.thirdRow}>
           {!taskData.completedOn && <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={handleConfirm}
            >
              <NewButton width={"128px"} text="Confirm" />
            </button>
}
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={handleClose}
            >
              <NewButton width={"128px"} text="Close" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TaskRemarkPopup;