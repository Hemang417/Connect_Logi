import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import Select from "react-select";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Or your state management import

const InputPopup = ({
  position,
  popupType,
  firstButtonText,
  secondButtonText,
  handleAdd,
  handleSave,
  title,
  fields,
  value,
  showPrefix,
  milestoneSetvalue,
  setValue,
  setCurrentPopup,
  bgColor = "#f6fcff",
  width,
  top,
  left,
  accept,
  selection,
  selection2,
  selection3,
  selection4,
  dropdownType,
  dropdownPlaceholder,
  dropdownValue,
  dropdownOptions,
  dropdownSetValue,
  dropdownPlaceholder2,
  dropdownValue2,
  dropdownOptions2,
  dropdownSetValue2,
  dropdownPlaceholder3,
  dropdownValue3,
  dropdownOptions3,
  dropdownSetValue3,
  dropdownPlaceholder4,
  dropdownValue4,
  dropdownOptions4,
  dropdownSetValue4,
  deletePrefix,
}) => {
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const location = useLocation();
  // Get sidebar state directly from your state management
  // const sidebarShow = useSelector((state) => state.sidebarShow);
  const isConfirmationPopup = popupType === "confirmation";

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
  // Get sidebar state directly from your state management
  const sidebarShow = useSelector((state) => state.sidebarShow);

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

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const titleCheck = ["/import", "/export"];
  const inputCheck = [
    "/userroles",
    "/import",
    "/PaymentSheetCredit",
    "/export",
    "/workflow",
    "/organization",
    "/impeditjob",
    "/expeditjob",
    "/approvername",
    "/approverlog",
  ];
  const multiplcValuseReset = ["/userlist", "/Editorg"];
  const buttonCheck = [
    "/userroles",
    "/import",
    "/export",
    "/PaymentSheetCredit",
  ];
  const dropdown = ["dropdown"];

  // Check if form is valid (has input content)
  useEffect(() => {
    const checkFormValidity = () => {

      // Add this condition in the form validity check
      if (popupType === "confirmation") {
        setIsFormValid(true);
        return;
      }
      // For confirmation popups, always set as valid
      if (isConfirmationPopup) {
        setIsFormValid(true);
        return;
      }
      // For paths that use a single value string
      if (
        inputCheck.includes(location.pathname) &&
        (title !== "Add New Collection" || title !== "Edit Collection") &&
        showPrefix != true
      ) {
        const isValid =
          typeof value === "string"
            ? value.trim() !== ""
            : Object.values(value || {}).some(
              (val) => val !== undefined && val !== null && val !== ""
            );
        setIsFormValid(isValid);
      }

      // For dropdown selection types
      else if (dropdown.includes(selection)) {
        setIsFormValid(!!dropdownValue);
      }
      // For object-based values (most forms)
      else {
        const hasValues = Object.values(value || {}).some(
          (val) => val !== undefined && val !== null && val !== ""
        );
        setIsFormValid(hasValues);
      }
    };

    checkFormValidity();
  }, [value, dropdownValue, location.pathname, title, selection]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        setCurrentPopup("none");
        if (
          inputCheck.includes(location.pathname) &&
          title !== "Edit Collection" &&
          title !== "Add New Collection"
        ) {
          setValue("");
        } else if (
          multiplcValuseReset.includes(location.pathname) ||
          title === "Edit Collection" ||
          title === "Add New Collection"
        ) {
          // Handle multiple values reset
        } else {
          setValue({});
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // 3. Replace your handleFirstButtonClick with this:
  const handleFirstButtonClick = () => {
    if (!isFormValid && popupType !== "confirmation") return;

    if (popupType === "confirmation") {
      handleAdd(); // This will call handleDeleteConfirm
      setCurrentPopup("none");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setCurrentPopup("none");
    if (buttonCheck.includes(location.pathname) && firstButtonText === "Save") {
      handleSave();
    } else {
      handleAdd();
    }
  };

  // Update the handleCancelClick function (around line 165-185):
  const handleCancelClick = () => {
    setCurrentPopup("none");

    if (popupType === "confirmation") {
      // For confirmation popups, just close without resetting values
      return;
    }

    if (
      title === "Grant Additional Access" ||
      title === "Edit Collection" ||
      title === "Add New Collection" ||
      title === "Add New Branch"
    ) {
      // Do nothing special
    }
    //  else if (location.pathname === "/workflow") {
    //   setValue(null);
    // }
    else if (
      inputCheck.includes(location.pathname) &&
      location.pathname !== "/workflow"
    ) {
      setValue("");
    } else {
      setValue({});
    }

    if (dropdown.includes(selection)) {
      dropdownSetValue("");
    }
  };

  /*************  ✨ Windsurf Command 🌟  *************/
  /**
   * Validate the form by checking if all fields have valid values.
   * This function is called whenever the form is submitted or when the user clicks outside the form.
   * @returns {boolean} True if the form is valid, false otherwise.
   */
  const validateForm = () => {
    // Handle single string value case (when fields array isn't used)
    if (typeof value === "string") {
      return value.trim() !== "";
    }

    // Handle cases where fields array is provided
    if (fields && fields.length > 0) {
      return fields.every((field) => {
        // Skip validation for read-only fields
        if (field.readOnly) return true;

        // Handle select/dropdown fields
        if (field.inputType === "select") {
          if (field.id === selection) return !!dropdownValue;
          if (field.id === selection2) return !!dropdownValue2;
          if (field.id === selection3) return !!dropdownValue3;
          if (field.id === selection4) return !!dropdownValue4;
          return false;
        }

        // Get the field value - checks both value[field.id] and direct value for single fields
        const fieldValue =
          value?.[field.id] !== undefined ? value[field.id] : value;

        // Handle different input types
        switch (field.inputType) {
          case "text":
          case "textarea":
            return typeof fieldValue === "string" && fieldValue.trim() !== "";

          case "number":
            return !isNaN(Number(fieldValue)) && fieldValue !== "";

          case "checkbox":
            return fieldValue !== undefined; // Checkbox is valid if it has any value

          case "date":
            return (
              fieldValue instanceof Date ||
              !isNaN(new Date(fieldValue).getTime())
            );

          default:
            return (
              fieldValue !== undefined &&
              fieldValue !== null &&
              fieldValue !== ""
            );
        }
      });
    }

    // Default case (shouldn't normally reach here)
    return false;
  };
  /*******  ed86540f-b12d-4ea2-ae3e-8b00ea7cbe61  *******/

  // 2. Replace your existing useEffect for form validation with this:
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [
    value,
    dropdownValue,
    dropdownValue2,
    dropdownValue3,
    dropdownValue4,
    location.pathname,
  ]);

  // 4. Add this helper function (put it with your other functions):
  const renderLabel = (field) => {
    return (
      <label htmlFor={field.id} className={styles.label}>
        {`${field.label}${!field.readOnly ? "" : " (Read-only)"} : `}
      </label>
    );
  };

  return (
    <>
      <div className={styles.darkBg} onClick={handleCancelClick} />

      <motion.div
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        {popupType === "andNewCollection" ? (
          <div className={styles.container} style={{ width: width }}>
            <div className={styles.firstRow}>
              <h2 className={styles.title}>
                {titleCheck.includes(location.pathname) ? (
                  <>
                    Are you sure you want to delete Job No.
                    <strong>{title}</strong>
                  </>
                ) : (location.pathname === "/impeditjob" ||
                  location.pathname === "/expeditjob") &&
                  title !== "Add New Collection" &&
                  title !== "Edit Collection" ? (
                  <>
                    Are you sure you want to delete Bill No. <br />
                    <strong>{title}</strong>
                  </>
                ) : (
                  <strong>{title}</strong>
                )}
              </h2>
            </div>

            <div className={styles.secondRow}>
              <div
                className={
                  fields[0].inputType !== "checkbox"
                    ? styles.content
                    : styles.contentCheckbox
                }
              >
                {fields.map((field) => (
                  <>
                    {field.id !== selection &&
                      field.id !== "address" &&
                      field.inputType !== "checkbox" && (
                        <div
                          key={`${field.id}-not-selected`}
                          className={styles.field}
                        >
                          {renderLabel(field)}
                          <input
                            type="text"
                            name="fakeusernameremembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type="password"
                            name="fakepasswordremembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type="textarea"
                            name="faketextarearemembered"
                            style={{ display: "none" }}
                          />

                          <input
                            type={field.inputType}
                            accept={accept}
                            id={field.id}
                            name={`${field.id}`}
                            className={`${styles.input} ${!field.readOnly &&
                              !value[field.id] &&
                              styles.invalid
                              }`}
                            placeholder={field.placeholder}
                            readOnly={field.readOnly}
                            autoComplete="new-password"
                            onFocus={(e) => {
                              e.target.setAttribute("autocomplete", "off");
                              e.target.setAttribute("readonly", "readonly");
                              setTimeout(
                                () => e.target.removeAttribute("readonly"),
                                100
                              );
                            }}
                            value={
                              inputCheck.includes(location.pathname) &&
                                title !== "Add New Collection" &&
                                title !== "Edit Collection"
                                ? value || ""
                                : value[field.id] || ""
                            }
                            onChange={field.readOnly === true ? null : setValue}
                          />
                        </div>
                      )}

                    {field.id === "address" && (
                      <div
                        key={`${field.id}-not-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}
                        <textarea
                          id={field.id}
                          name={`no-autofill-${field.id}`}
                          className={`${styles.input} ${!field.readOnly &&
                            !value[field.id] &&
                            styles.invalid
                            }`}
                          required={field.required}
                          style={{ minHeight: "80px", maxHeight: "180px" }}
                          placeholder={field.placeholder}
                          autoComplete="new-password"
                          onFocus={(e) =>
                            e.target.setAttribute(
                              "autocomplete",
                              "new-password"
                            )
                          }
                          value={
                            inputCheck.includes(location.pathname)
                              ? value || ""
                              : value[field.id] || ""
                          }
                          onChange={(e) =>
                            inputCheck.includes(location.pathname)
                              ? setValue(e.target.value)
                              : setValue({
                                ...value,
                                [field.id]: e.target.value,
                              })
                          }
                        />
                      </div>
                    )}

                    {field.inputType === "checkbox" && (
                      <div
                        key={`${field.id}-not-selected`}
                        className={styles.field}
                        style={{
                          display: "flex",
                          marginRight: "60px",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <input
                          type="text"
                          name="fakeusernameremembered"
                          style={{ display: "none" }}
                        />
                        <input
                          type="password"
                          name="fakepasswordremembered"
                          style={{ display: "none" }}
                        />
                        <input
                          type="textarea"
                          name="faketextarearemembered"
                          style={{ display: "none" }}
                        />
                        <input
                          type={field.inputType}
                          accept={accept}
                          id={field.id}
                          name={`${field.id}`}
                          className={`${styles.input} ${!field.readOnly &&
                            !value[field.id] &&
                            styles.invalid
                            }`}
                          required={field.required}
                          placeholder={field.placeholder}
                          readOnly={field.readOnly}
                          autoComplete="new-password"
                          onFocus={(e) => {
                            e.target.setAttribute("autocomplete", "off");
                            e.target.setAttribute("readonly", "readonly");
                            setTimeout(
                              () => e.target.removeAttribute("readonly"),
                              100
                            );
                          }}
                          value={
                            inputCheck.includes(location.pathname) &&
                              title !== "Add New Collection" &&
                              title !== "Edit Collection"
                              ? value || ""
                              : value[field.id] || ""
                          }
                          onChange={field.readOnly === true ? null : setValue}
                        />
                        <label htmlFor={field.id} className={styles.label}>
                          {`${field.label} `}
                        </label>
                      </div>
                    )}

                    {field.id === selection && (
                      <div
                        key={`${field.id}-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}

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
                            options={dropdownOptions}
                            value={
                              dropdownOptions.find(
                                (option) => option.value === dropdownValue
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              if (
                                location.pathname === "/workflow" ||
                                location.pathname === "/expeditjob" ||
                                location.pathname === "/impeditjob"
                              ) {
                                dropdownSetValue((prev) => ({
                                  ...prev,
                                  [field.id]: selectedOption.value,
                                }));
                              } else {
                                dropdownSetValue(selectedOption.value);
                              }
                            }}
                            placeholder={dropdownPlaceholder}
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
                                textAlign: "center", // ✅ added
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
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                "-webkit-text-fill-color":
                                  theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),

                              singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                zIndex: 9999,
                                backgroundColor:
                                  theme === "dark" ? "#101322" : "#fff",
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
                                maxHeight: "150px", // Adjust as needed for visible options
                                overflowY: "auto",
                                scrollbarWidth: "thin", // Firefox
                                msOverflowStyle: "none", // IE 10+
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
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className={styles.thirdRow}>
              <button
                style={{
                  border: "none",
                  padding: "0px",
                  borderRadius: "8px",
                  opacity: isFormValid ? 1 : 0.5,
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
                onClick={handleFirstButtonClick}
              // disabled={!isFormValid}
              >
                <NewButton
                  width={"90px"}
                  text={firstButtonText}
                  value={value}
                // disabled={!isFormValid}
                />
              </button>

              <button
                style={{ border: "none", padding: "0px", borderRadius: "8px" }}
                onClick={handleCancelClick}
              >
                <NewButton width={"90px"} text={secondButtonText} />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={styles.container}
            style={{ width: width }}
          >
            <div className={styles.firstRow}>
              <h2 className={styles.title}>
                {titleCheck.includes(location.pathname) ? (
                  <>
                    Are you sure you want to delete Job No.
                    <br /> <strong>{title}</strong>
                  </>
                ) : (location.pathname === "/impeditjob" ||
                  location.pathname === "/expeditjob") &&
                  title !== "Add New Collection" &&
                  title !== "Edit Collection" &&
                  !(deletePrefix === true) ? (
                  <>
                    Are you sure you want to delete Bill No. <br />
                    <strong>{title}</strong>
                  </>
                ) : (location.pathname === "/setWorkflow" ||
                  location.pathname === "/workflow" ||
                  location.pathname === "/impeditjob" ||
                  location.pathname === "/expeditjob" ||
                  location.pathname === "/PaymentSheetCredit" ||
                  location.pathname === "/branchlist") &&
                  showPrefix !== true ? (
                  <>
                    Are you sure you want to delete <br />
                    <strong>{title}</strong>
                  </>
                ) : (
                  <strong>{title}</strong>
                )}
              </h2>
            </div>
{/* 
            <div className={styles.secondRow}>
              <div className={styles.content}>
                {fields.map((field) => (
                  <>
                    {field.id !== selection &&
                      field.id !== selection2 &&
                      field.id !== selection3 &&
                      field.id !== selection4 &&
                      field.id !== "address" && (
                        <div
                          key={`${field.id}-not-selected`}
                          className={styles.field}
                        >
                          {renderLabel(field)}
                          <input
                            type="text"
                            name="fakeusernameremembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type="password"
                            name="fakepasswordremembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type="textarea"
                            name="faketextarearemembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type={field.inputType}
                            accept={accept}
                            id={field.id}
                            name={`no-autofill-${field.id}`}
                            className={`${styles.input} ${!field.readOnly &&
                              !value[field.id] &&
                              styles.invalid
                              }`}
                            placeholder={field.placeholder}
                            readOnly={field.readOnly || false}
                            autoComplete="new-password"
                            onFocus={(e) => {
                              e.target.setAttribute("autocomplete", "off");
                              e.target.setAttribute("readonly", "readonly");
                              setTimeout(
                                () => e.target.removeAttribute("readonly"),
                                100
                              );
                            }}
                            value={
                              inputCheck.includes(location.pathname) &&
                                title !== "Add New Collection" &&
                                title !== "Edit Collection" &&
                                showPrefix != true
                                ? value || ""
                                : value[field.id] || ""
                            }
                            onChange={(e) =>
                              inputCheck.includes(location.pathname) &&
                                title !== "Add New Collection" &&
                                title !== "Edit Collection" &&
                                showPrefix != true
                                ? setValue(e.target.value)
                                : setValue({
                                  ...value,
                                  [field.id]: e.target.value,
                                })
                            }
                          />
                        </div>
                      )} */}
            <div className={styles.secondRow}>
              <div className={styles.content}>
                {fields.map((field) => (
                  <>
                    {field.id !== selection &&
                      field.id !== selection2 &&
                      field.id !== selection3 &&
                      field.id !== selection4 &&
                      field.id !== "address" && (
                        <div
                          key={`${field.id}-not-selected`}
                          className={styles.field}
                        >
                         {renderLabel(field)}
                          <input
                            type="text"
                            name="fakeusernameremembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type="password"
                            name="fakepasswordremembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type="textarea"
                            name="faketextarearemembered"
                            style={{ display: "none" }}
                          />
                          <input
                            type={field.inputType}
                            accept={accept}
                            id={field.id}
                            name={`no-autofill-${field.id}`}
                            className={`${styles.input} ${!field.readOnly &&
                              !value[field.id] &&
                              styles.invalid
                            }`}
                            placeholder={field.placeholder}
                            readOnly={field.readOnly || false}
                            autoComplete="new-password"
                            onFocus={(e) => {
                              e.target.setAttribute("autocomplete", "off");
                              e.target.setAttribute("readonly", "readonly");
                              setTimeout(
                                () => e.target.removeAttribute("readonly"),
                                100
                              );
                            }}
                            value={
                              inputCheck.includes(location.pathname) &&
                              title !== "Add New Collection" &&
                              title !== "Edit Collection" &&
                              showPrefix != true
                                ? value || ""
                                : value[field.id] || ""
                            }
                            onChange={(e) =>
                              inputCheck.includes(location.pathname) &&
                              title !== "Add New Collection" &&
                              title !== "Edit Collection" &&
                              showPrefix != true
                                ? setValue(e.target.value)
                                : setValue({
                                    ...value,
                                    [field.id]: e.target.value,
                                  })
                              }
                            />
                          </div>
                        )}

                    {field.id === "address" && (
                      <div
                        key={`${field.id}-not-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}
                        <textarea
                          id={field.id}
                          name={`no-autofill-${field.id}`}
                          className={`${styles.input} ${!field.readOnly &&
                            !value[field.id] &&
                            styles.invalid
                            }`}
                          required={field.required}
                          style={{ minHeight: "80px", maxHeight: "180px" }}
                          placeholder={field.placeholder}
                          autoComplete="new-password"
                          onFocus={(e) =>
                            e.target.setAttribute(
                              "autocomplete",
                              "new-password"
                            )
                          }
                          value={
                            inputCheck.includes(location.pathname)
                              ? value || ""
                              : value[field.id] || ""
                          }
                          onChange={(e) =>
                            inputCheck.includes(location.pathname)
                              ? setValue(e.target.value)
                              : setValue({
                                ...value,
                                [field.id]: e.target.value,
                              })
                          }
                        />
                      </div>
                    )}
                    {field.id === selection && (
                      <div
                        key={`${field.id}-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}
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
                            options={dropdownOptions}
                            value={
                              dropdownOptions.find(
                                (option) => option.value === dropdownValue
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              if (
                                location.pathname === "/workflow" ||
                                location.pathname === "/expeditjob" ||
                                location.pathname === "/impeditjob"
                                //  &&                                milestoneSetvalue !== true
                              ) {
                                dropdownSetValue((prev) => ({
                                  ...prev,
                                  [field.id]: selectedOption.value,
                                }));
                              } else {
                                dropdownSetValue(selectedOption.value);
                              }
                            }}
                            placeholder={dropdownPlaceholder}
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
                                textAlign: "center", // ✅ added
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
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                "-webkit-text-fill-color":
                                  theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),

                              singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                zIndex: 9999,
                                backgroundColor:
                                  theme === "dark" ? "#101322" : "#fff",
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
                                maxHeight: "150px", // Adjust as needed for visible options
                                overflowY: "auto",
                                scrollbarWidth: "thin", // Firefox
                                msOverflowStyle: "none", // IE 10+
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
                    )}
                    {field.id === selection2 && (
                      <div
                        key={`${field.id}-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}
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
                            options={dropdownOptions2}
                            value={
                              dropdownOptions2.find(
                                (option) => option.value === dropdownValue2
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              if (
                                location.pathname === "/workflow" ||
                                location.pathname === "/expeditjob" ||
                                location.pathname === "/impeditjob"
                              ) {
                                dropdownSetValue2((prev) => ({
                                  ...prev,
                                  [field.id]: selectedOption.value,
                                }));
                              } else {
                                dropdownSetValue2(selectedOption.value);
                              }
                            }}
                            placeholder={dropdownPlaceholder2}
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
                                textAlign: "center", // ✅ added
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
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                "-webkit-text-fill-color":
                                  theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),

                              singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                zIndex: 9999,
                                backgroundColor:
                                  theme === "dark" ? "#101322" : "#fff",
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
                                maxHeight: "150px", // Adjust as needed for visible options
                                overflowY: "auto",
                                scrollbarWidth: "thin", // Firefox
                                msOverflowStyle: "none", // IE 10+
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
                    )}
                    {field.id === selection3 && (
                      <div
                        key={`${field.id}-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}
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
                            options={dropdownOptions3}
                            value={
                              dropdownOptions3.find(
                                (option) => option.value === dropdownValue3
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              if (
                                location.pathname === "/workflow" ||
                                location.pathname === "/expeditjob" ||
                                location.pathname === "/impeditjob"
                              ) {
                                dropdownSetValue3((prev) => ({
                                  ...prev,
                                  [field.id]: selectedOption.value,
                                }));
                              } else {
                                dropdownSetValue3(selectedOption.value);
                              }
                            }}
                            placeholder={dropdownPlaceholder3}
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
                                textAlign: "center", // ✅ added
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
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                "-webkit-text-fill-color":
                                  theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),

                              singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                zIndex: 9999,
                                backgroundColor:
                                  theme === "dark" ? "#101322" : "#fff",
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
                                maxHeight: "150px", // Adjust as needed for visible options
                                overflowY: "auto",
                                scrollbarWidth: "thin", // Firefox
                                msOverflowStyle: "none", // IE 10+
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
                    )}
                    {/* specally for approverlist */}
                    {field.id === selection4 && (
                      <div
                        key={`${field.id}-selected`}
                        className={styles.field}
                      >
                        {renderLabel(field)}
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
                            options={dropdownOptions4}
                            value={
                              dropdownOptions4.find(
                                (option) =>
                                  option.value === dropdownValue4.branchcode
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              if (
                                location.pathname === "/workflow" ||
                                location.pathname === "/expeditjob" ||
                                location.pathname === "/impeditjob"
                                //  &&                                milestoneSetvalue !== true
                              ) {
                                dropdownSetValue4((prev) => ({
                                  ...prev,
                                  [field.id]: selectedOption.value,
                                }));
                              } else {
                                dropdownSetValue4({
                                  branchname: selectedOption.label,
                                  branchcode: selectedOption.value,
                                });
                              }
                            }}
                            placeholder={dropdownPlaceholder4}
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
                                textAlign: "center", // ✅ added
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
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                "-webkit-text-fill-color":
                                  theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),

                              singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                textAlign: "center", // ✅ added
                                color: theme === "dark" ? "#D1EEFF" : "#333d70",
                                backgroundColor: "transparent !important",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                zIndex: 9999,
                                backgroundColor:
                                  theme === "dark" ? "#101322" : "#fff",
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
                                maxHeight: "150px", // Adjust as needed for visible options
                                overflowY: "auto",
                                scrollbarWidth: "thin", // Firefox
                                msOverflowStyle: "none", // IE 10+
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
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className={styles.thirdRow}>
              <button
                style={{
                  border: "none",
                  padding: "0px",
                  borderRadius: "8px",
                  opacity: isFormValid ? 1 : 0.5,
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
                onClick={handleFirstButtonClick}
              // disabled={!isFormValid}
              >
                <NewButton
                  width={"90px"}
                  text={firstButtonText}
                  value={value}
                // disabled={!isFormValid}
                />
              </button>

              <button
                style={{ border: "none", padding: "0px", borderRadius: "8px" }}
                onClick={handleCancelClick}
              >
                <NewButton width={"90px"} text={secondButtonText} />
              </button>
            </div>
        </div>
        )}
        </motion.div>
        </>
      );
};

export default InputPopup;
