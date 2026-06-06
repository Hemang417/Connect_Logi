import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CCard,
} from "@coreui/react";
import "../css/workflow-styles.css";
import axios from "axios";
import toast from "react-hot-toast";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import LeftShift from "src/views/buttons/buttons/LeftShift";
import RightShift from "src/views/buttons/buttons/RightShift";
import InputPopupTwo from "src/components/inputPopup/InputPopupTwo";
import NewButton from "src/views/buttons/buttons/NewButton";
import API_BASE_URL from "src/config/config";

const JobValue = () => {
  // Original fields from the server
  const [serverFields, setServerFields] = useState([]);
  // Working copy of fields that can be modified before saving
  const [fields, setFields] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [customFieldName, setCustomFieldName] = useState("");
  const [addFieldModalVisible, setAddFieldModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const contactFields = [
    { id: "contactName", label: "Contact Name", inputType: "text" },
  ];

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Default fields that appear in the yellow box
  const availableFields = [
    { id: "mode", name: "Air/Sea" },
    { id: "branchname", name: "BranchName" },
    { id: "importExport", name: "Import/Export" },
    { id: "fiscalYear", name: "Fiscal Year" },
    { id: "jobno.", name: "Job No." },
  ];

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
    // Fetch branch data when component mounts
    fetchBranches();
  }, []);

  useEffect(() => {
    // Fetch field arrangement when branch is selected
    if (selectedBranch) {
      fetchFieldArrangement();
    } else {
      // Clear fields if no branch is selected
      setFields([]);
      setServerFields([]);
      setHasUnsavedChanges(false);
    }
  }, [selectedBranch]);

  useEffect(() => {
    setSelectedBranch({
      value: localStorage.getItem("branchcodeofemp"),
      label: localStorage.getItem("branchnameofemp"),
    });
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getbranchesforarrangement`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );

      const branchOptions = response.data.map((branch) => ({
        value: branch.branchcode,
        label: branch.ownbranchname,
      }));

      setBranches(branchOptions);

      const selectedBranch = branchOptions.find(
        (branch) => branch.label === localStorage.getItem("branchname")
      );

      if (selectedBranch) {
        setSelectedBranch(selectedBranch); // You probably want to set the entire object, not just value
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Failed to load branches");
    }
  };

  const fetchFieldArrangement = async () => {
    try {
      console.log("Fetching field arrangement for branch:", selectedBranch);
      const response = await axios.get(
        `${API_BASE_URL}/getArrangementofthatbranch`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: selectedBranch.label,
            branchcode: selectedBranch.value,
          },
        }
      );

      console.log("Response data:", response.data);

      // Map response data to our field format
      const fetchedFields = response.data.map((item) => {
        if (item.columnname === "Custom") {
          // Fix 1: Create consistent IDs for custom fields to maintain them across refreshes
          // Using the custom value for the ID to ensure it remains consistent
          return {
            id: `custom_${item.inputofcustom || ""}`,
            name: item.inputofcustom || "Custom Field",
            isCustom: true,
            customValue: item.inputofcustom,
          };
        }

        // Map API column names to our field IDs
        const fieldMap = {
          // "Mode of Transport": "mode",
          "Air/Sea": "mode",
          BranchName: "branchname",
          "Import/Export": "importExport",
          "Fiscal Year": "fiscalYear",
          jobnumber: "jobNo",
        };

        const id =
          fieldMap[item.columnname] ||
          item.columnname.toLowerCase().replace(/\s+/g, "");
        return {
          id,
          name: item.columnname,
          isCustom: false,
        };
      });

      console.log("Processed fields:", fetchedFields);
      setServerFields([...fetchedFields]); // Store original fields
      setFields([...fetchedFields]); // Working copy
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error fetching field arrangement:", error);
      toast.error("Failed to load field arrangement");
      setServerFields([]);
      setFields([]);
    }
  };

  // Local function to add a field (doesn't affect the server yet)
  const handleAddField = (field) => {
    // Check if field already exists
    if (fields.some((f) => f.id === field.id)) {
      toast.error(`${field.name} is already added`);
      return;
    }

    // Create a copy of the field to avoid reference issues
    const newField = { ...field };

    // Add field to local state
    setFields([...fields, newField]);
    setHasUnsavedChanges(true);
  };

  // Handle adding a custom field locally
  const handleAddCustomField = () => {
    if (!customFieldName.trim()) {
      toast.error("Field name cannot be empty");
      return;
    }

    // Fix 2: Create consistent ID for custom fields
    const customId = `custom_${customFieldName.trim()}`;

    // Check if this custom field already exists
    if (fields.some((f) => f.id === customId)) {
      toast.error(
        `A custom field with name "${customFieldName}" already exists`
      );
      return;
    }

    // Add custom field to local state with consistent ID
    const newCustomField = {
      id: customId,
      name: customFieldName.trim(),
      isCustom: true,
      customValue: customFieldName.trim(),
    };

    setFields([...fields, newCustomField]);
    setCustomFieldName(""); // Clear input field
    setAddFieldModalVisible(false);
    setHasUnsavedChanges(true);
  };

  // Handle deleting field locally
  const handleDeleteField = (field) => {
    setFields(fields.filter((f) => f !== field));
    setHasUnsavedChanges(true);
  };

  // Handle moving fields locally
  const moveField = (index, direction) => {
    const newFields = [...fields];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= newFields.length) return;

    [newFields[index], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[index],
    ];

    setFields(newFields);
    setHasUnsavedChanges(true);
  };

  // Save all changes to the server
  const handleSave = async () => {
    if (!selectedBranch) {
      toast.error("Please select a branch first");
      return;
    }

    try {
      // Delete all existing fields one by one for this branch
      for (const serverField of serverFields) {
        try {
          await axios.delete(`${API_BASE_URL}/deleteArrangement`, {
            data: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
              data: serverField.isCustom ? "Custom" : serverField.name,
              branchname: selectedBranch.label,
              branchcode: selectedBranch.value,
            },
          });
          console.log(
            `Deleted field: ${
              serverField.isCustom ? "Custom" : serverField.name
            }`
          );
        } catch (err) {
          console.error(`Error deleting field:`, err);
          // Continue with other deletions
        }
      }

      // Fix 3: Improved way to save fields - add all fields in sequence
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        try {
          if (field.isCustom) {
            // Add custom field
            const response = await axios.post(
              `${API_BASE_URL}/storeArrangement`,
              {
                orgname: localStorage.getItem("orgname"),
                orgcode: localStorage.getItem("orgcode"),
                data: "Custom", // This must be "Custom" to indicate a custom field
                branchname: selectedBranch.label,
                branchcode: selectedBranch.value,
              }
            );

            console.log("Added Custom field", response.data);

            // Update its value immediately after adding
            await axios.put(`${API_BASE_URL}/updateColumn`, {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
              branchname: selectedBranch.label,
              branchcode: selectedBranch.value,
              custominput: field.customValue || field.name, // Use the stored custom value
            });
            console.log(
              `Updated custom field value to: ${
                field.customValue || field.name
              }`
            );
          } else {
            // Add regular field
            await axios.post(`${API_BASE_URL}/storeArrangement`, {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
              data: field.name,
              branchname: selectedBranch.label,
              branchcode: selectedBranch.value,
            });
            console.log(`Added field: ${field.name}`);
          }
        } catch (err) {
          console.error(`Error adding field ${field.name}:`, err);
          // Continue with other additions
        }
      }

      // Refresh data from server to ensure we're in sync
      await fetchFieldArrangement();
      setHasUnsavedChanges(false);
      toast.success("Field arrangement saved successfully");
    } catch (error) {
      console.error("Error saving field arrangement:", error);
      toast.error("Failed to save field arrangement");
    }
  };

  // Cancel changes and revert to server state
  const handleCancel = () => {
    setFields([...serverFields]);
    setHasUnsavedChanges(false);
  };

  const generatePreview = () => {
    const preview = fields.map((field) => field.name).join(" - ");

    // Create an example based on fields
    let example = "";
    if (fields.length > 0) {
      example = fields
        .map((field) => {
          switch (field.id) {
            case "mode":
              return "A";
            case "branchname":
              return "Mumbai";
            case "importExport":
              return "I";
            case "fiscalYear":
              return "24-25";
            case "jobno.":
              return "26";
            default:
              // Fix 4: Better handling of custom field values in preview
              return field.isCustom ? field.customValue : field.name;
          }
        })
        .join("/");
    }

    return { preview, example };
  };

  const { preview, example } = generatePreview();

  // Handle refresh to fetch latest data
  const handleRefresh = async () => {
    if (selectedBranch) {
      await fetchFieldArrangement();
      toast.success("Data refreshed successfully");
    }
  };

  return (
    <div style={{ marginTop: "52px", position: "relative", height: "454px" }}>
      <CCard className="global-card">
        <div style={{ margin: "10px 40px" }}>
          <div style={{ marginLeft: "18px" }}>
            <label className="textType1-JobValue">Select Branch</label>
            <NewDropdownInput
              type={"type7"}
              options={branches}
              placeholder={localStorage.getItem("branchnameofemp")}
              selectedValue={selectedBranch}
              setSelectedValue={setSelectedBranch}
              width={"250px"}
            />
          </div>
          {selectedBranch && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2 className="textType2-JobValue">Customize Format: Job No.</h2>
            </div>
          )}

          {selectedBranch && (
            <>
              {/* Yellow Box with Fields */}
              <div
                className="field-container"
                style={{
                  padding: "8px 0px",
                  borderRadius: "8px",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: "8px",
                }}
              >
                {fields.length === 0 ? (
                  <div
                    className="textType6-JobValue"
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: "20px",
                      fontWeight: "400",
                    }}
                  >
                    No fields added yet. Click "Add Field" to add fields to your
                    format.
                  </div>
                ) : (
                  fields.map((field, index) => (
                    <div
                      key={field.id || index}
                      className="field-item"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px 15px",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "150px",
                          textAlign: "center",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                        className="textType3-JobValue"
                      >
                        {field.name}
                        {field.isCustom && " (Custom)"}
                      </div>
                      <div
                        className="actions"
                        style={{
                          display: "flex",
                          position: "relative",
                          justifyContent: "center",
                          width: "150px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div
                            onClick={() => moveField(index, -1)}
                            disabled={index === 0}
                            style={{
                              margin: "0 3px",
                              cursor: index === 0 ? "not-allowed" : "pointer",
                            }}
                          >
                            <LeftShift disabled={index === 0} />
                          </div>
                          <div
                            onClick={() => moveField(index, 1)}
                            disabled={index === fields.length - 1}
                            style={{
                              margin: "0 3px",
                              cursor:
                                index === fields.length - 1
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            <RightShift
                              disabled={index === fields.length - 1}
                            />
                          </div>
                        </div>
                        <div
                          onClick={() => handleDeleteField(field)}
                          style={{
                            marginLeft: "10px",
                            color: "red",
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px",
                          }}
                        >
                          <DeleteBtn
                            fill={theme === "dark" ? "#f8d7da" : "#1E266D"}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Field Button */}
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "fit-content",
                  paddingLeft: "18px",
                }}
              >
                <svg
                  onClick={() => {
                    setCurrentPopup("Add New Field");
                    setCustomFieldName("");
                  }}
                  type="submit"
                  width="40px"
                  height="40px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                    fill={theme === "dark" ? "#ABD3EB" : "#2F4096"}
                  />
                </svg>
                <label className="textType4-JobValue">Add Field</label>
              </div>

              {/* Preview Section */}
              <div style={{ marginBottom: "20px", marginLeft: "18px" }}>
                <h5 className="textType5-JobValue">
                  Preview:{"  "}
                  {preview}
                </h5>
                <div className="textType6-JobValue">Eg: {example}</div>
              </div>

              {/* Save and Cancel Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginLeft: "18px",
                  marginBottom: "10px",
                }}
              >
                <div onClick={handleSave} disabled={!hasUnsavedChanges}>
                  <NewButton text={"Save"} />
                </div>
                <div
                  color="secondary"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={!hasUnsavedChanges}
                >
                  <NewButton text={"Cancel"} />
                </div>
                {hasUnsavedChanges && (
                  <div
                    style={{
                      marginLeft: "15px",
                      display: "flex",
                      alignItems: "center",
                      color: "#dc3545",
                      fontSize: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "italic",
                        color: theme === "dark" ? "#ff8585" : "#E55353",
                      }}
                    >
                      * You have unsaved changes
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {currentPopup === "Add New Field" && (
            <InputPopupTwo
              title={`Add New Field`}
              setCurrentPopup={setCurrentPopup}
              fields={availableFields}
              activeFields={fields}
              handleAdd={handleAddCustomField}
              firstButtonText={"Add New"}
              secondButtonText={"Close"}
              selection={"none"}
              top={"42%"}
              left={"50%"}
              handleAddField={handleAddField}
              customFieldName={customFieldName}
              setCustomFieldName={setCustomFieldName}
              width={"330px"}
            />
          )}

         
        </div>
      </CCard>
    </div>
  );
};

export default JobValue;
