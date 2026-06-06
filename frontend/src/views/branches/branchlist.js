import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import InputPopup from "src/components/inputPopup/InputPopup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CCardBody, CCard
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/styles.css";
import Cookies from "js-cookie";
import styles from "./css/branches.module.css";
import moment from "moment";

import "./css/branches-style.css";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import AddBtn from "../buttons/buttons/AddBtn";
import RefreshBtn from "../buttons/buttons/RefreshBtn";
import FileUploadButton from "src/components/FileUploadButton/FileUploadButton";
import NewInput from "src/components/NewInput/NewInput";
import NewButton from "../buttons/buttons/NewButton";
import API_BASE_URL from "src/config/config";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB 

const BranchList = () => {
  const navigate = useNavigate();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [ownBranch, setOwnBranch] = useState([]);
  const [editData, setEditData] = useState(null);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [isEditing, setisEditing] = useState(false);
  const [remark, setRemark] = useState("");
  const [branchName, setbranchName] = useState("");
  const [selectedbranch, setselectedbranch] = useState("");
  const [filePreviews, setFilePreviews] = useState(new Map());

  const [branchCreate, setbranchCreate] = useState({
    orgcode: localStorage.getItem("orgcode"),
    ownbranchname: "",
    address: "",
    gstnum: "",
    chabranchlicence: "",
    headname: "",
    headnum: "",
    heademail: ""
  });

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

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  const fetchOwnBranches = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchBranchesofOwn`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setOwnBranch(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOwnBranches();
  }, []);

  const getFullUrl = (path) => {
    if (!path.startsWith("http")) {
      return `${API_BASE_URL}${path}`;
    }
    return path;
  };

  const handleEdit = (item) => {
    setEditData({
      id: item.id,
      orgcode: item.orgcode ?? "",
      ownbranchname: item.ownbranchname ?? "",
      address: item.address ?? "",
      gstnum: item.gstnum ?? "",
      chabranchlicence: item.chabranchlicence ?? "",
      headname: item.headname ?? "",
      headnum: item.headnum ?? "",
      heademail: item.heademail ?? ""
    });

    const previews = new Map();

    const extractFileName = (url) => {
      try {
        return decodeURIComponent(url.split("/").pop());
      } catch {
        return "Uploaded File";
      }
    };

    if (item.headphoto) {
      previews.set("branchHeadPhoto", {
        fileName: extractFileName(item.headphoto),
        previewUrl: getFullUrl(item.headphoto),
        file: null
      });
    }

    if (item.headdocument) {
      previews.set("branchHeadID", {
        fileName: extractFileName(item.headdocument),
        previewUrl: getFullUrl(item.headdocument),
        file: null
      });
    }

    setFilePreviews(previews);
    setisEditing(true);
    setCurrentPopup("createBranch");
  };

  const handleAdd = (indexOrEvent, name, value) => {
    // Case 1: Event object passed (for special paths)
    if (indexOrEvent && indexOrEvent.target) {
      const { name, value } = indexOrEvent.target;
      setbranchCreate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Case 2: Called as setSelectedValue(index, name, value)
    else if (typeof name === "string") {
      setbranchCreate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Case 3: Only value passed (for non-special paths) - MISSING CASE
    else if (typeof indexOrEvent === "string") {
      // This case was missing! NewInput passes only e.target.value for non-special paths
      // But we need to know which field this is for
      console.warn("handleAdd: Only value passed, cannot determine field name", indexOrEvent);
    }
  };
  const handleCancel = () => {
    // Revoke all object URLs to prevent memory leaks
    filePreviews.forEach(preview => {
      if (preview.previewUrl) {
        URL.revokeObjectURL(preview.previewUrl);
      }
    });

    // Clear all uploaded files
    setFilePreviews(new Map());

    // Reset form state
    setbranchCreate({
      orgcode: localStorage.getItem("orgcode"),
      ownbranchname: "",
      address: "",
      gstnum: "", // ✅ Matches DB column 'gstnum'
      chabranchlicence: "", // ✅ Matches DB column 'chabranchlicence'
      headname: "",
      headnum: "",
      heademail: ""
    });

    setEditData(null);
    setisEditing(false);

    // Clear popup
    setCurrentPopup("none");
  };

  const handleFieldChange = (fieldName) => (value) => {
    if (isEditing) {
      handleChange(null, fieldName, value);
    } else {
      handleAdd(null, fieldName, value);
    }
  };

  const handleChange = (indexOrEvent, name, value) => {
    // Case 1: Normal input event
    if (indexOrEvent?.target) {
      const { name, value } = indexOrEvent.target;
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Case 2: Called as setSelectedValue(index, name, value)
    else if (typeof name === "string") {
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Optional: Fallback warning
    else {
      console.warn("handleChange: Unexpected input", indexOrEvent, name, value);
    }
  };

  // OPTIMIZATION 13: Optimize file handling with Map for O(1) access
  const handleFileChange = useCallback((fileType, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File "${file.name}" exceeds 5MB limit`);
      e.target.value = ""; // Reset input
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFilePreviews(prev => {
      const prevValue = prev.get(fileType);
      if (prevValue?.previewUrl) URL.revokeObjectURL(prevValue.previewUrl);
      const newMap = new Map(prev);
      // Store with just the fileType (fieldname) as the key
      newMap.set(fileType, { // Corrected line
        previewUrl,
        fileName: file.name,
        file  // Store file object
      });
      return newMap;
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const dataToSubmit = isEditing ? editData : branchCreate;
      const { data } = await axios.get(`${API_BASE_URL}/getLegalName`, {
        params: { orgcode: dataToSubmit.orgcode }
      });

      const formData = new FormData();
      Object.entries(dataToSubmit).forEach(([key, val]) => formData.append(key, val));
      formData.append("legalName", data.legalName);
      formData.append("username", localStorage.getItem("username"));
      formData.append("orgname", localStorage.getItem("orgname"));

      if (filePreviews.has("branchHeadPhoto") && filePreviews.get("branchHeadPhoto").file) {
        formData.append("branchHeadPhoto", filePreviews.get("branchHeadPhoto").file);
      }
      if (filePreviews.has("branchHeadID") && filePreviews.get("branchHeadID").file) {
        formData.append("branchHeadID", filePreviews.get("branchHeadID").file);
      }

      const url = isEditing ? `${API_BASE_URL}/updateOwnBranch` : `${API_BASE_URL}/createownbranch`;
      const method = isEditing ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(`${isEditing ? "Updated" : "Created"} successfully`);
      handleCancel();
      fetchOwnBranches();
    } catch (err) {
      toast.error(`Error ${isEditing ? "updating" : "creating"} branch`);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/deleteOwnBranch`, {
        id: selectedbranch.id,
        orgname: selectedbranch.orgname,
        orgcode: selectedbranch.orgcode,
        DeleteRemark: remark,
        deletedby: localStorage.getItem("username"),
        deletedat: moment().format("YYYY-MM-DD"),
      });
      if (response.status === 200) {
        toast.success("Branch deleted successfully");
        fetchOwnBranches();
        setCurrentPopup("none");
      }
    } catch (err) {
      toast.error("Error deleting branch");
      console.error(err);
    }
  };

  const handleRowDoubleClick = (item) => handleEdit(item);

  const contactFields2 = [{
    id: "remark",
    label: "Reason",
    placeholder: "Entering Remark is Required",
    inputType: "text",
  }];

  return (
    <div style={{ position: "relative", height: "75vh" }}>
      <div>
        <CCardBody>
          <div className={styles.firstRow}>
            <div className="refreshjob-button ">
              <Link
                type="submit"
                onClick={() => {
                  fetchOwnBranches();
                  toast.success("Refreshed Successfully");
                }}
                className="link-btn"
                style={{
                  marginLeft: "12px",
                  position: "absolute",
                  left: "10px",
                  top: "0px",
                }}
              >
                <RefreshBtn />
              </Link>
            </div>
            <button
              className="invisible-btn-style"
              style={{ position: "absolute", right: "0px", top: "2px" }}
              onClick={
                // handleClick
                () => {
                  setisEditing(false);
                  setbranchCreate({
                    orgcode: localStorage.getItem("orgcode"),
                    ownbranchname: "",
                    address: "",
                    gstnum: "", // ✅ Matches DB column 'gstnum'
                    chabranchlicence: "", // ✅ Matches DB column 'chabranchlicence'
                    headname: "",
                    headnum: "",
                    heademail: "" // ✅ Added missing field
                  });
                  setCurrentPopup("createBranch");
                }
              }
            >
              <AddBtn SvgWidth={"35px"} SVGheight={"35px"} />
            </button>
            <div className={styles.importBox}>
              <div className={styles.Title}>Branch List</div>
            </div>
          </div>

          <div className="branchlist-table">
            <table
              className="min-w-full border-separate"
              style={{
                width: "100%",
                borderCollapse: "separate", // ✅ Ensure separate borders
                borderSpacing: "0 8px", // ✅ Adds spacing between rows
                marginTop: "30px",
              }}
            >
              <thead className={styles.tableHead}>
                <tr>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Branch Code
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Branch Name
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    GST No.
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    CHA Branch License
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Branch Head Name
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Branch Head Mobile No.
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {ownBranch.map((item, rowIndex) => (
                  <tr key={rowIndex}
                    onClick={() => setSelectedRowIndex(rowIndex)}
                    onDoubleClick={() => handleRowDoubleClick(item)}
                    className={` rounded-lg shadow-md`}
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? rowIndex % 2 === 0
                            ? "#3B5472" // Dark mode even row
                            : "#263A52" // Dark mode odd row
                          : rowIndex % 2 === 0
                            ? "#D8F0FD" // Light mode even row
                            : "#F6FCFF", // Light mode odd row
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      {item.branchcode}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      {item.ownbranchname}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      {item.gstnum}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      {item.chabranchlicence}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      {item.headname}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      {item.headnum}
                    </td>
                    <td
                      className={`${styles.tableData}`}
                      style={{ textAlign: "center", padding: "5px 0px" }}
                    >
                      <div
                        onClick={() => {
                          setselectedbranch(item);
                          setbranchName(item.ownbranchname);
                          setRemark("");
                          setCurrentPopup("Deletion");
                        }}
                        className="delete-hover-color invisible-btn-style"
                      >
                        <DeleteBtn
                          fill={
                            theme === "dark" ? "#f8d7da" : "var(--page-title)"
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </div>
      {console.log("value before popup -> ", branchCreate)}
      {currentPopup === "createBranch" && (
        <div className="popup-backdrop">
          <div className="popup-overlay">
            <div className="page-container"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}>
              <h5 className="page-title" style={{ textAlign: "left", transform: "none" }}>{isEditing ? "Edit Branch" : "Create Branch"}</h5>

              {/* Form fields */}
              <div className="form-row">
                <div className="form-group">
                  <label className="KYC-UL">Branch Head Name :</label>
                  <NewInput
                    name="headname"
                    selectedValue={isEditing ? editData?.headname || "" : branchCreate.headname}
                    setSelectedValue={handleFieldChange("headname")}
                    width={"100%"}
                    height={"31px"}
                  />
                </div>
                <div className="form-group">
                  <label className="KYC-UL">Branch Name :</label>
                  <NewInput
                    name="ownbranchname"
                    selectedValue={isEditing ? editData?.ownbranchname || "" : branchCreate.ownbranchname}
                    setSelectedValue={handleFieldChange("ownbranchname")}
                    width={"100%"}
                    height={"31px"}
                  />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="form-row">
                <div className="form-group">
                  <label className="KYC-UL">Branch Head Mobile :</label>
                  <NewInput
                    name="headnum"
                    selectedValue={isEditing ? editData?.headnum || "" : branchCreate.headnum}
                    setSelectedValue={handleFieldChange("headnum")}
                    width={"100%"}
                    height={"31px"}
                  />
                </div>
                <div className="form-group">
                  <label className="KYC-UL">Branch Head E-Mail :</label>
                  <NewInput
                    name="heademail"
                    selectedValue={isEditing ? editData?.heademail || "" : branchCreate.heademail || ""}
                    setSelectedValue={handleFieldChange("heademail")}
                    width={"100%"}
                    height={"31px"}
                  />
                </div>
              </div>

              {/* GST + CHA */}
              <div className="form-row">
                <div className="form-group">
                  <label className="KYC-UL">GST No. :</label>
                  <NewInput
                    type="text"
                    name="gstnum"
                    selectedValue={isEditing ? editData?.gstnum || "" : branchCreate.gstnum}
                    setSelectedValue={handleFieldChange("gstnum")}
                    width={"100%"}
                    height={"31px"}
                  />
                </div>
                <div className="form-group">
                  <label className="KYC-UL">CHA Branch License :</label>
                  <NewInput
                    type="text"
                    name="chabranchlicence"
                    selectedValue={isEditing ? editData?.chabranchlicence || "" : branchCreate.chabranchlicence}
                    setSelectedValue={handleFieldChange("chabranchlicence")}
                    width={"100%"}
                    height={"31px"}
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="form-row">
                <FileUploadButton
                  fileType="branchHeadPhoto"
                  label="Branch Head Photo"
                  filePreviews={filePreviews}
                  handleFileChange={handleFileChange}
                />

                <FileUploadButton
                  fileType="branchHeadID"
                  label="Branch Head Document"
                  filePreviews={filePreviews}
                  handleFileChange={handleFileChange}
                />
              </div>

              {/* Address */}
              <div className="form-group">
                <label className="KYC-UL">Address:</label>
                <NewInput
                  textarea={true}
                  textareaMinHeight={"85px"}
                  name="address"
                  selectedValue={isEditing ? editData?.address || "" : branchCreate.address}
                  setSelectedValue={handleFieldChange("address")}
                  width={"100%"}
                />
              </div>

              {/* Buttons */}
              <div className="form-actions">
                <div
                  onClick={handleSubmit}
                  className="confirm-button">
                  <NewButton text={isEditing ? "Update" : "Create"} />
                </div>
                <div
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  <NewButton text="Cancel" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {" "}
      {currentPopup === "Deletion" && (
        <InputPopup
          title={branchName}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields2}
          value={remark}
          setValue={setRemark}
          handleAdd={handleDelete}
          firstButtonText={"Delete"}
          secondButtonText={"Close"}
          width={"450px"}
          selection={"none"}
          top={"50%"}
          left={"50%"}
        />
      )}
    </div>
  );
};

export default BranchList;
