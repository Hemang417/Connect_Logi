import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import { useSelector } from "react-redux";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";

import Select from "react-select";

const BankDetailsPopup = ({
  visible,
  onClose,
  bankdetails,
  handleInputChange,
  handleDropdownChange,
  handleBranchSelect,
  handleDeleteDropdown,
  handleAddDropdown,
  handleAddBankDetails,
  filteredBranchList,
  setCurrentPopup,
}) => {
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const sidebarShow = useSelector((state) => state.sidebarShow);

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

  // Validation function for this specific form
  const validateForm = () => {
    return (
      bankdetails.bankname?.trim() !== "" &&
      bankdetails.accounttype &&
      bankdetails.bankaccountno?.trim() !== "" &&
      bankdetails.ifsc?.trim() !== "" &&
      bankdetails.closingBalance?.trim() !== "" &&
      (!bankdetails.branchname ||
        bankdetails.branchname.length === 0 ||
        bankdetails.branchname.every((b) => b.branchname))
    );
  };

  const handleAddClick = () => {
    if (validateForm()) {
      handleAddBankDetails();
      onClose();
      setCurrentPopup && setCurrentPopup("none");
    } else {
      setShowValidationErrors(true);
      toast.error("Please fill all required fields");
    }
  };

  // Helper to determine if a field should show error
  const shouldShowError = (fieldName) => {
    if (!showValidationErrors) return false;

    switch (fieldName) {
      case "bankname":
        return !bankdetails.bankname?.trim();
      case "accounttype":
        return !bankdetails.accounttype;
      case "bankaccountno":
        return !bankdetails.bankaccountno?.trim();
      case "ifsc":
        return !bankdetails.ifsc?.trim();
      case "closingBalance":
        return !bankdetails.closingBalance?.trim();
      case "branchname":
        return bankdetails.branchname?.some((b) => !b.branchname);
      default:
        return false;
    }
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

  const accountTypeOptions = [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
    { value: "Cash Credit", label: "Cash Credit" },
    { value: "Fixed Deposit", label: "Fixed Deposit" },
    { value: "Recurring Deposit", label: "Recurring Deposit" },
  ];

  return (
    <>
      <div
        className={styles.darkBg}
        onClick={() => {
          onClose();
          setCurrentPopup && setCurrentPopup("none");
        }}
      ></div>
      <motion.div
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div className={styles.container} style={{ width: "330px" }}>
          <div className={styles.firstRow}>
            <h2 className={styles.title}>
              <strong>Bank Details</strong>
            </h2>
          </div>

          <div className={styles.secondRow}>
            <div
              className={styles.content}
              style={{ gap: "10px", padding: "2% 8%" }}
            >
              <div>
                <div
                  className={styles.field}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexDirection: "row",
                  }}
                >
                  <label htmlFor="branchname" className={styles.label}>
                    Organization Branch
                  </label>
                  <svg
                    onClick={handleAddDropdown}
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                      fill={theme === "dark" ? "#D1EEFF" : "#535B87"}
                    />
                  </svg>
                </div>
                <div
                  style={{
                    maxHeight: "100px",
                    overflowY: "auto",
                    overflowX: "hidden", // <--- prevents horizontal scroll
                    scrollbarWidth: "thin",
                    scrollbarColor: "gray transparent",
                  }}
                >
                  {bankdetails.branchname &&
                    bankdetails.branchname.length > 0 &&
                    bankdetails.branchname.map((branchname, index) => (
                      <div
                        key={index}
                        className={`${
                          shouldShowError("branchname") &&
                          !branchname.branchname
                            ? styles.invalidSelectWrapper
                            : ""
                        }`}
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "4px",
                        }}
                      >
                        {/* <Select
                          options={filteredBranchList.map((branch) => ({
                            value: branch,
                            label: branch.ownbranchname,
                          }))}
                          value={
                            branchname.branchname
                              ? {
                                  value: branchname,
                                  label: branchname.branchname,
                                }
                              : null
                          }
                          onChange={(selectedOption) =>
                            handleBranchSelect(selectedOption.value, index)
                          }
                          placeholder="Select"
                          className="basic-single"
                          classNamePrefix="select"
                        /> */}
                        <span
                          style={{
                            width: "160px",
                            border: `1px solid ${
                              theme === "dark" ? "#D1EEFF" : "#535B87"
                            }`,

                            padding: "6px 0px",
                            borderRadius: "8px",
                            display: "block",
                          }}
                        >
                          <Select
                            className={styles.importDropdown}
                            autoComplete="off"
                            options={filteredBranchList.map((branch) => ({
                              value: branch,
                              label: branch.ownbranchname,
                            }))}
                            value={
                              branchname.branchname
                                ? {
                                    value: branchname,
                                    label: branchname.branchname,
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              handleBranchSelect(selectedOption.value, index);
                            }}
                            placeholder={"Select"}
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
                        {/* <img
                          className="addworkflow-deletebutton"
                          onClick={() => handleDeleteDropdown(index)}
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/50/000000/cancel.png"
                          alt="cancel"
                        /> */}

                        <div
                          style={{
                            cursor: "pointer",
                            marginLeft: "5px",
                            marginTop: "7px",
                            opacity: 1,
                          }}
                          onClick={() => handleDeleteDropdown(index)}
                        >
                          <svg
                            className="cross-btn"
                            width="22px"
                            height="22px"
                            viewBox="0 0 24 24"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="cancelIconTitle"
                            stroke={theme === "dark" ? "#D1EEFF" : "#535B87"}
                            strokeWidth="0.8"
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                            fill="none"
                            color="#000000"
                          >
                            <title id="cancelIconTitle">Cancel</title>
                            <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339" />
                            <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="bankname" className={styles.label}>
                  Bank Name
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`${styles.input} ${
                    shouldShowError("bankname") ? styles.invalid : ""
                  }`}
                  style={{ width: "100%" }}
                  name="bankname"
                  value={bankdetails.bankname}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="accounttype" className={styles.label}>
                  Account Type
                </label>
                <span
                  className={`${
                    shouldShowError("accounttype")
                      ? styles.invalidSelectWrapper
                      : ""
                  }`}
                  style={{
                    width: "100%",
                    border: `1px solid ${
                      theme === "dark" ? "#D1EEFF" : "#535B87"
                    }`,

                    padding: "6px 0px",
                    borderRadius: "8px",
                  }}
                >
                  <Select
                    className={styles.importDropdown}
                    autoComplete="off"
                    options={accountTypeOptions}
                    value={
                      bankdetails.accounttype
                        ? accountTypeOptions.find(
                            (opt) => opt.value === bankdetails.accounttype
                          )
                        : null
                    }
                    onChange={(selectedOption) => {
                      handleDropdownChange(selectedOption?.value);
                    }}
                    placeholder="Select"
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
              <div className={styles.field}>
                <label htmlFor="bankaccountno" className={styles.label}>
                  Bank Account No.
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`${styles.input} ${
                    shouldShowError("bankname") ? styles.invalid : ""
                  }`}
                  style={{ width: "100%" }}
                  name="bankaccountno"
                  value={bankdetails.bankaccountno}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="ifsc" className={styles.label}>
                  IFSC Code
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`${styles.input} ${
                    shouldShowError("bankname") ? styles.invalid : ""
                  }`}
                  style={{ width: "100%" }}
                  name="ifsc"
                  value={bankdetails.ifsc}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="closingBalance" className={styles.label}>
                  Closing Balance
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`${styles.input} ${
                    shouldShowError("bankname") ? styles.invalid : ""
                  }`}
                  style={{ width: "100%" }}
                  name="closingBalance"
                  value={bankdetails.closingBalance}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="chequedetails" className={styles.label}>
                  Cheque Details
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`${styles.input} ${
                    shouldShowError("bankname") ? styles.invalid : ""
                  }`}
                  style={{ width: "100%" }}
                  name="chequedetails"
                  value={bankdetails.chequedetails || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.thirdRow} style={{ marginTop: "10px" }}>
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={() => {
                handleAddClick();
              }}
            >
              <NewButton width={"128px"} text={"Add"} />
            </button>
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={() => {
                onClose();
                setCurrentPopup && setCurrentPopup("none");
              }}
            >
              <NewButton width={"128px"} text={"Cancel"} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BankDetailsPopup;
