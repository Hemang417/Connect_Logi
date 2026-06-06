import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import { useEffect } from "react";
import NewButton from "src/views/buttons/buttons/NewButton";
import toast from "react-hot-toast";
import Select from "react-select";
import { useSelector } from "react-redux"; // Or your state management import

import { useLocation } from "react-router-dom";

import NewDropdownInput from "../DropDown/NewDropdownInput";
const InputPopupTwo = ({
  position,
  popupType,
  firstButtonText,
  secondButtonText,
  handleAdd,
  handleSave,
  title,
  fields,
  value,
  setValue,
  setCurrentPopup,
  // bgColor = "#f6fcff",
  width,
  top,
  left,
  setCustomFieldName,
  handleAddField,
  customFieldName,
  activeFields,
}) => {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const PopupStyle = {
    // width: width,
    position: "fixed",
    bottom: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

  const titleCheck = ["/import", "/export"];
  const inputCheck = [
    "/userroles",
    "/import",
    "/export",
    "/workflow",
    "/organization",
    "/impeditjob",
  ];
  const multiplcValuseReset = ["/userlist"];
  const buttonCheck = ["/userroles", "/import", "/export"];
  const dropdown = ["dropdown"];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode == 27) {
        setCurrentPopup("none");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div
        className={styles.darkBg}
        onClick={() => {
          setCurrentPopup("none");
        }}
      >
        {" "}
      </div>
      <motion.div
        className={styles.popupWrapper} // Add this class to control centering
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div className={styles.container} style={{ width: width }}>
          <div className={styles.firstRow}>
            <h2 className={styles.title}>
              <strong>{title}</strong>
            </h2>
          </div>

          <div className={styles.secondRow}>
            <div className={styles.content} style={{ gap: "2px" }}>
              <div className={styles.field} style={{ marginBottom: "10px" }}>
                {fields.some(
                  (field) => !activeFields.some((f) => f.id === field.id)
                ) && (
                  <label htmlFor="fieldName" className={styles.label}>
                    Select a predefined field:
                  </label>
                )}
                {fields.map((field) =>
                  !activeFields.some((f) => f.id === field.id) ? (
                    <button
                      key={field.id}
                      className={styles.selectButton}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleAddField(field)}
                    >
                      {field.name}
                    </button>
                  ) : null
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="fieldName" className={styles.label}>
                  Add a custom field:
                </label>
                <input
                  className={styles.input}
                  style={{ width: "100%" }}
                  type="text"
                  id="fieldName"
                  value={customFieldName}
                  onChange={(e) => setCustomFieldName(e.target.value)}
                  placeholder="Enter custom field name"
                />
              </div>
            </div>
          </div>

          <div className={styles.thirdRow}>
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={() => {
                // buttonCheck.includes(location.pathname) ? firstButtonText === "Add" ?
                // handleAdd() : handleSave() : handleAdd();
                setCurrentPopup("none");

                buttonCheck.includes(location.pathname) &&
                firstButtonText === "Save"
                  ? handleSave()
                  : handleAdd();
              }}
            >
              <NewButton width={"128px"} text={firstButtonText} value={value} />
            </button>

            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={() => {
                setCurrentPopup("none");
              }}
            >
              {" "}
              <NewButton width={"128px"} text={secondButtonText} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default InputPopupTwo;
// Example usage
