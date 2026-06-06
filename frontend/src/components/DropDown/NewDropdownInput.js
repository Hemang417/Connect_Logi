import React from "react";
import styles from "./NewDropdownInput.module.css";
import Select from "react-select";
import { useState, useEffect } from "react";
// import { isDisabled } from "@testing-library/user-event/dist/types/utils";

const NewDropdownInput = ({
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  width,
  height,
  type,
  nameOfDropdown,
  isDisabled,
  index,
}) => {
  const globalstyles = {
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
      height: height,
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
      textAlign: "left", // ✅ added
      color: theme === "dark" ? "#D1EEFF" : "#333d70",
      "-webkit-text-fill-color": theme === "dark" ? "#D1EEFF" : "#333d70",
      backgroundColor: "transparent !important",
    }),

    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
      textAlign: "left", // ✅ added
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
        backgroundColor: theme === "dark" ? "#D1EEFF" : "#333d70",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent !important",
      },
    }),
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
  return (
    <span
      className={styles.span}
      style={{ width: width, height: height, display: "flex" }}
    >
      {type === "type1" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option.value === selectedValue) || null}
          onChange={(selectedOption) => setSelectedValue(selectedOption.value)}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type2" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option.value === selectedValue) || null}
          onChange={(selectedOption) =>
            setSelectedValue(`${nameOfDropdown}`, selectedOption.value)
          }
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type3" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option.value === selectedValue) || null}
          onChange={(selectedOption) =>
            setSelectedValue(nameOfDropdown, selectedOption.value)
          }
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type4" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option.value === selectedValue) || null}
          onChange={setSelectedValue}
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type5" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((opt) => opt.value === selectedValue) || null}
          onChange={(selectedOption) =>
            setSelectedValue(index, nameOfDropdown, selectedOption.value)
          }
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type6" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option.value === selectedValue) || null}
          onChange={(e) => {
            const selectedBank = options.find((bank) => bank.label === e.value);
            setSelectedValue(`${nameOfDropdown}`, selectedBank);
          }}
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type7" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option === selectedValue) || null}
          onChange={setSelectedValue}
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
      {type === "type8" && (
        <Select
          className={styles.importDropdown}
          autoComplete="off"
          options={options}
          value={options.find((option) => option.value === selectedValue) || null}
          onChange={(selectedOption) => {
            // Pass the entire selected option to parent
            setSelectedValue(selectedOption);
          }}
          isDisabled={isDisabled}
          placeholder={placeholder}
          styles={globalstyles}
          menuPortalTarget={document.body}
        />
      )}
    </span>
  );
};

export default NewDropdownInput;
