import React, { useState, useEffect, useRef } from "react";

const NewMultiSelectDropdown = ({ options, value, onchange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null);

  //   const options = [
  //     "20' ISO Tanks",
  //     "40' ISO Tanks",
  //     "LCL",
  //     "Flat Bulk"
  //   ];
  const containerTypeOptions = [
    { value: "20'", label: "20'" },
    { value: "40'", label: "40'" },
    { value: "20' ISO Tank", label: "20' ISO Tank" },
    { value: "40' ISO Tank", label: "40' ISO Tank" },
    { value: "LCL", label: "LCL" },
    { value: "Flat Bulk", label: "Flat Bulk" },
    { value: "Break Bulk", label: "Break Bulk" },
  ];
  useEffect(() => {
    // Function to check if clicked outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (optionValue) => {
    // if (selected.includes(optionValue.value)) {
    //   setSelected(selected.filter((item) => item !== optionValue));
    // } else {
      setSelected([...selected, optionValue]);
      onchange(selected);
    // }
  };

  // Custom Chevron Down Icon
  const ChevronDownIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "16px", height: "16px", marginLeft: "8px" }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  // Custom Check Icon
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "12px", height: "12px" }}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  const dropdownStyles = {
    container: {
      position: "relative",
      width: "160px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "8px 12px",
      fontSize: "14px",
      color: "#374151",
      backgroundColor: "#e5e7eb",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      outline: "none",
      cursor: "pointer",
    },
    buttonText: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    menu: {
      position: "absolute",
      zIndex: 10,
      width: "100%",
      marginTop: "4px",
      backgroundColor: "white",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    option: {
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      fontSize: "14px",
      cursor: "pointer",
    },
    optionHover: {
      backgroundColor: "#f3f4f6",
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "16px",
      height: "16px",
      marginRight: "8px",
      border: "1px solid #6b7280",
      borderRadius: "3px",
      backgroundColor: "#f9fafb",
    },
  };

  return (
    <div style={dropdownStyles.container} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button onClick={toggleDropdown} style={dropdownStyles.button}>
        <span style={dropdownStyles.buttonText}>
          {value.length === 0 ? "Select" : value.map((v) => v.label).join(", ")}
        </span>

        <ChevronDownIcon />
      </button>
      {console.log("selected options -> ", selected)}
      {/* Dropdown Menu */}
      {isOpen && (
        <div style={dropdownStyles.menu}>
          {containerTypeOptions.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              style={dropdownStyles.option}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <div style={dropdownStyles.checkbox}>
                {option.value.includes(value) && <CheckIcon />}
              </div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewMultiSelectDropdown;
