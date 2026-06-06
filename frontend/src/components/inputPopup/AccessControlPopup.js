import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css";
import { useSelector } from "react-redux";
import NewButton from "src/views/buttons/buttons/NewButton";

const AccessControlPopup = ({
  data = [],
  isOpen = false,
  onClose,
  firstButtonText,
  secondButtonText,
  onFirstClick,
  onSecondClick,
  renderCheckboxes = false,
  // bgColor = "#f6fcff",
  width = "400px",
  existingSelections = [],
}) => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [selectedItems, setSelectedItems] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

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

  useEffect(() => {
    setSelectedItems(existingSelections || []);
  }, [existingSelections]);

  // Calculate all possible control IDs
  const getAllControlIds = useCallback(() => {
    return data.flatMap((section) =>
      section.controls.map((control) => `${section.title}|${control.id}`)
    );
  }, [data]);

  // Calculate section control IDs
  const getSectionControlIds = useCallback(
    (sectionId) => {
      const section = data.find((s) => s.id === sectionId);
      if (!section) return [];
      return section.controls.map(
        (control) => `${section.title}|${control.id}`
      );
    },
    [data]
  );

  // Master checkbox state
  const masterChecked =
    selectedItems.length > 0 &&
    selectedItems.length === getAllControlIds().length;

  // Section checkbox states
  const isSectionChecked = useCallback(
    (sectionId) => {
      const sectionIds = getSectionControlIds(sectionId);
      return (
        sectionIds.length > 0 &&
        sectionIds.every((id) => selectedItems.includes(id))
      );
    },
    [getSectionControlIds, selectedItems]
  );

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCheckboxChange = (childId, checked) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, childId];
      } else {
        return prev.filter((id) => id !== childId);
      }
    });
  };

  // Handle master checkbox change
  const handleMasterChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedItems(getAllControlIds());
    } else {
      setSelectedItems([]);
    }
  };

  // Handle section checkbox change
  const handleSectionChange = (sectionId, e) => {
    const checked = e.target.checked;
    const sectionIds = getSectionControlIds(sectionId);

    setSelectedItems((prev) => {
      if (checked) {
        // Add section items, removing duplicates
        return [...new Set([...prev, ...sectionIds])];
      } else {
        // Remove all items from this section
        return prev.filter((id) => !sectionIds.includes(id));
      }
    });
  };

  // Validate whenever selectedItems changes
  useEffect(() => {
    setIsValid(selectedItems.length > 0);
  }, [selectedItems]);

  const handleFirstButtonClick = () => {
    if (isValid) {
      onFirstClick(selectedItems);
    }
  };

  const PopupStyle = {
    position: "fixed",
    bottom: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.darkBg} onClick={onClose}></div>
      <motion.div
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div className={styles.container}>
          <div className={styles.firstRow}>
            <h2 className={styles.title}>
              <strong>Access Control</strong>
            </h2>
            {/* Master Checkbox */}
            <div
              className={styles.masterCheckbox}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={masterChecked}
                onChange={handleMasterChange}
                style={{
                  marginLeft: "10px",
                  width: "16px",
                  height: "16px",
                  cursor: "pointer",
                }}
              />
              {/* <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                Select All
              </span> */}
            </div>
          </div>

          <div className={styles.secondRow}>
            <div
              className={styles.content}
              style={{
                overflowY: "scroll",
                maxHeight: "404px",
                scrollbarWidth: "thin",
                scrollbarColor: "gray transparent",
                marginBottom: "16px",
              }}
            >
              {data.map((section) => (
                <div key={section.id}>
                  <div
                    onClick={() => toggleExpand(section.id)}
                    className="cursor-pointer flex justify-between items-center p-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{
                      width: "164px",
                      fontWeight: "bold",
                      color: theme === "dark" ? "#d6f1ff" : "#333d70"
                    }}>
                      {section.title}
                    </span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Section Checkbox */}
                      {section.controls.length > 0 && (
                        <input
                          type="checkbox"
                          checked={isSectionChecked(section.id)}
                          onChange={(e) => handleSectionChange(section.id, e)}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            marginRight: "10px",
                            width: "16px",
                            height: "16px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                      <span
                        style={{
                          backgroundColor: "#2F4096",
                          height: "23px",
                          width: "23px",
                          borderRadius: "30%",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {expandedIds.includes(section.id) ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-1 ml-4 ${expandedIds.includes(section.id)
                      ? styles.expandedPanel
                      : styles.collapsedPanel
                      }`}
                  >
                    {section.controls.map((control) => (
                      <div
                        key={control.id}
                        className="p-1 flex items-center"
                        style={{ margin: "4px 0" }}
                      >
                        {renderCheckboxes ? (
                          <div
                            className={styles.contentCheckbox}
                            style={{ padding: "0% 8%" }}
                          >
                            <input
                              type="checkbox"
                              id={control.id}
                              name={control.id}
                              checked={selectedItems.includes(
                                `${section.title}|${control.id}`
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  `${section.title}|${control.id}`,
                                  e.target.checked
                                )
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <label
                              htmlFor={control.id}
                              style={{
                                fontSize: "12px",
                                cursor: "pointer",
                                color: theme === "dark" ? "#d6f1ff" : "#333d70"
                              }}
                            >
                              {control.label}
                            </label>
                          </div>
                        ) : (
                          <div style={{ paddingLeft: "8px" }}>
                            {control.label}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.thirdRow}>
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={handleFirstButtonClick}
            >
              <NewButton
                width={"128px"}
                text={firstButtonText}
                disabled={!isValid}
                value={isValid}
              />
            </button>

            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={onSecondClick || onClose}
            >
              <NewButton width={"128px"} text={secondButtonText} />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AccessControlPopup;
