import React, { useEffect, useState } from "react";
import NewButton from "src/views/buttons/buttons/NewButton";
import { motion } from "framer-motion";
import NewDownloadSvg from "src/views/buttons/buttons/NewDownloadSvg";
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CFormInput,
} from "@coreui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../css/export-styles.css";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import EditBtn from "src/views/buttons/buttons/EditBtn";
import SaveBtn from "src/views/buttons/buttons/SaveBtn";
import FileUploadComponent from "src/components/inputPopup/FileUploadComponent";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [renamedFiles, setRenamedFiles] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentPopup, setCurrentPopup] = useState("none");

  const [editingFileIndex, setEditingFileIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null); // Store the file to delete
  const [remark, setRemark] = useState(""); // Store the deletion remark

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");

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
  }, [navigate]);
  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];

  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };

  const handleUpdate = async () => {
    try {
      const jobnumber = jobNumber;
      const username = localStorage.getItem("username");
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const response = await axios.put(
        `${API_BASE_URL}/updateGeneralExp`,
        {
          ...data,
          formData: formData,
          orgname: nameoforg,
          orgcode: codeoforg,
          jobowner: username,
          jobnumber: jobnumber,
        }
      );
      const getApprovers = await axios.get(
        `${API_BASE_URL}/getApprovernamesfororg`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );
      // toast.success("Successfully updated General Details");
    } catch (error) {
      // toast.error("Error updating General Details.");
      console.log(error);
    }
  };

  const fetchUploadedFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/uploadedfiles`, {
        params: {
          clientname: sessionStorage.getItem("exportername"),
          jobnumber: jobNumber.replace(/\//g, "-"),
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
        },
      });
      console.log(response.data.files); // Log to check the structure
      setUploadedFiles(response.data.files || []);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
      toast.error("Failed to fetch uploaded files.");
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const filelocation = (filename) => {
    const jobnumber = jobNumber.replace(/\//g, "-");
    return `${API_BASE_URL}/uploads/export/${jobnumber}/${filename}`;
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter((file) => file.size <= 1 * 1024 * 1024);
    const invalidFiles = newFiles.filter((file) => file.size > 1 * 1024 * 1024);

    if (invalidFiles.length > 0) {
      toast.error(
        `Some files exceed the 1 MB size limit: ${invalidFiles
          .map((file) => file.name)
          .join(", ")}`
      );
    }
    setSelectedFiles((prev) => [
      ...prev,
      ...validFiles.filter((file) => !prev.some((f) => f.name === file.name)),
    ]);
  };

  const handleRenameChange = (index, newName) => {
    if (newName === "" || /^[a-zA-Z0-9_-]+$/.test(newName)) {
      setRenamedFiles((prev) => ({
        ...prev,
        [index]: newName,
      }));
    } else {
      toast.error(
        "Invalid file name. Only alphanumeric characters, hyphens, and underscores are allowed."
      );
    }
  };

  const handleDeleteFile = (index) => {
    setFileToDelete(uploadedFiles[index]); // Set the file to delete
    // setDeleteModalVisible(true); // Show the confirmation modal
    setCurrentPopup("Deletion");
  };

  const handleConfirmedDelete = async () => {
    if (!fileToDelete) return;

    const fileid = fileToDelete.id;
    if (!fileid) {
      toast.error("File missing.");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/delete-file`, {
        fileid,
        remark, // Send the remark to the backend
        username: localStorage.getItem("username"),
      });
      setUploadedFiles((prev) => prev.filter((item) => item.id !== fileid));
      toast.success("File deleted successfully.");
    } catch (error) {
      console.error("File deletion failed:", error);
      toast.error("Failed to delete the file. Please try again.");
    } finally {
      setDeleteModalVisible(false);
      setFileToDelete(null);
      setRemark(""); // Clear the remark
    }
  };

  const handleEditFile = (index) => {
    setEditingFileIndex(index);
  };

  const handleSaveEdit = async (index) => {
    // Use the existing file name if no new name is set
    const updatedFileName =
      renamedFiles[index] !== undefined
        ? renamedFiles[index]
        : uploadedFiles[index].filename;

    const originalFileName = String(uploadedFiles[index].filename); // Convert to string
    const fileid = uploadedFiles[index].id;

    if (updatedFileName.split("_")[0] != originalFileName.split("_")[0]) {
      // Validate inputs
      if (!updatedFileName || !originalFileName || !fileid) {
        toast.error("File names cannot be empty.");
        return;
      }

      try {
        const response = await axios.put(`${API_BASE_URL}/rename-file`, {
          fileid,
          originalFileName,
          updatedFileName,
          type: "export",
          jobnumber: String(jobNumber).replace(/\//g, "-"), // Convert job number to string
        });

        if (
          response.data &&
          response.data.message === "File renamed successfully."
        ) {
          setUploadedFiles((prev) =>
            prev.map((file, i) => (i === index ? updatedFileName : file))
          );
          setEditingFileIndex(null);
          toast.success("File renamed successfully.");
        } else {
          throw new Error("Server response did not indicate success.");
        }
      } catch (error) {
        console.error("File renaming failed:", error);
        toast.error("Failed to rename the file. Please try again.");
      }
    } else {
      setUploadedFiles((prev) =>
        prev.map((file, i) =>
          i === index ? { ...file, filename: updatedFileName } : file
        )
      );
      setEditingFileIndex(null);
      toast.success("File renamed successfully.");
    }
    fetchUploadedFiles();
  };

  const handleUpload = async () => {
    setIsUploading(true);

    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      const newName = renamedFiles[index] || file.name.split(".")[0];
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));
      const renamedFile = `${newName}${fileExtension}`;
      formData.append("files", new File([file], renamedFile));
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        params: {
          type: "export",
          jobnumber: jobNumber.replace(/\//g, "-"),
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("branchnameofemp"),
          branchcode: localStorage.getItem("branchcodeofemp"),
          filelocation: localStorage.getItem("filelocation"),
          clientname: sessionStorage.getItem("exportername"),
          username: localStorage.getItem("username"),
        },
      });

      if (response.status === 200) {
        toast.success("Files uploaded successfully!");
        setUploadedFiles(response.data.files);
        setSelectedFiles([]);
        setRenamedFiles({});
        setShowModal(false);
      }
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed. Please Change Filename.");
    } finally {
      setIsUploading(false);
      fetchUploadedFiles();
    }
  };

  const handleModalDeleteFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    const updatedRenamedFiles = { ...renamedFiles };
    delete updatedRenamedFiles[index];
    setRenamedFiles(updatedRenamedFiles);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        <div className="p-2 container-div-import">
          <CCardBody>
            <div className="documentHeader">
              <h4></h4>
              <div className="documentUpload-mainContainer">
                Requisition Upload:
                <div
                  color="primary"
                  className="document_upload_btn"
                  onClick={() => {
                    // setShowModal(true);
                    setCurrentPopup("fileUpload");
                  }}
                >
                  <NewDownloadSvg
                    fill={theme === "dark" ? "#D1EEFF" : "var(--page-title)"}
                    size={"16"}
                  />
                  Choose Files
                </div>
              </div>
            </div>
            <table
              style={{
                // marginTop: "12px",
                borderCollapse: "separate",
                borderSpacing: "0 8px",
                tableLayout: "auto",
                width: "100%",
              }}
            >
              <thead
                className="bg-blue-900 text-white"
                style={{
                  background: "var(--tableHead-bg)",
                  fontSize: "12px",
                  color: " #F6FCFF",
                  fontFamily: "Instrument Sans",
                  fontStyle: "normal",
                  lineHeight: " normal",
                }}
              >
                <tr>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px", textAlign: "center" }}
                  >
                    {" "}
                    File Name
                  </th>
                  <th
                    scope="col"
                    className="row-font px-1 py-2 rounded-lg"
                    style={{ minWidth: "100px", textAlign: "center" }}
                  >
                    {" "}
                    Actions
                    {/* </div> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? index % 2 === 0
                            ? "#3B5472" // Dark  even row
                            : "#263A52" // Dark mode odd row
                          : index % 2 === 0
                          ? "#D8F0FD" // Light mode even row
                          : "#F6FCFF", // Light mode odd row
                      cursor: "pointer",
                      fontSize: "12px",

                      /* Table Body */
                      fontFamily: "Instrument Sans",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: " normal",
                      letterSpacing: "0.14px",
                    }}
                    onDoubleClick={() => {
                      if (editingFileIndex !== index) {
                        window.open(filelocation(file.filename), "_blank");
                      }
                    }}
                  >
                    <td
                      className="td-accounts px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px" }}
                    >
                      {editingFileIndex === index ? (
                        <input
                          type="text"
                          style={{ height: "24px" }}
                          value={
                            renamedFiles[index] !== undefined
                              ? renamedFiles[index]
                              : file.filename.split("_")[0]
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleSaveEdit(index);
                            }
                          }}
                          onChange={(e) =>
                            handleRenameChange(index, e.target.value)
                          }
                          onBlur={() => handleSaveEdit(index)} // Auto-save when clicking outside
                          onDoubleClick={(e) => e.stopPropagation()} // Prevents row's onDoubleClick
                          onClick={(e) => e.stopPropagation()} // Prevents file opening while renaming
                          autoFocus // Focuses input when renaming starts
                        />
                      ) : (
                        <span
                          onDoubleClick={(e) => {
                            e.stopPropagation(); // Prevents row double-click from firing
                            handleEditFile(index);
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevents accidental file opening
                        >
                          {file.filename}
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {editingFileIndex === index ? (
                        <div onClick={() => handleSaveEdit(index)}>
                          <SaveBtn
                            fill={
                              theme === "dark" ? "#f8d7da" : "var(--page-title)"
                            }
                          />
                        </div>
                      ) : (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFile(index);
                          }}
                        >
                          <EditBtn
                            fill={
                              theme === "dark" ? "#f8d7da" : "var(--page-title)"
                            }
                          />
                        </div>
                      )}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(index);
                        }}
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
          </CCardBody>
        </div>
        <div className="all-buttons">
          <div
            className="search-button"
            onClick={() => {
              toast.success("saved Successfully");
              handleUpdate();
            }}
          >
            <NewButton width={"120px"} text={"Save"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              handleUpdate();
              toast.success("Updated Successfully");
              handleClose();
            }}
          >
            <NewButton width={"120px"} text={"Save & New"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              handleClose();
              toast.success("saved  Successfully");
              handleUpdate();
            }}
          >
            <NewButton width={"120px"} text={"Save & Close"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              handleClose();
            }}
          >
            <NewButton width={"120px"} text={"Close"} />
          </div>
        </div>

        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader>Upload Files</CModalHeader>
          <CModalBody>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
            />
            <div className="mt-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <span className="me-3">{file.name}</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rename file"
                    value={renamedFiles[index] || ""}
                    onChange={(e) => handleRenameChange(index, e.target.value)}
                  />
                  <CButton
                    className="btn btn-sm btn-danger documentUploadBTN"
                    onClick={() => handleModalDeleteFile(index)}
                  >
                    Delete
                  </CButton>
                </div>
              ))}
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="btn btn-sm btn-outline-primary"
              onClick={() => setShowModal(false)}
            >
              <b>Close</b>
            </CButton>
            <CButton
              color="btn btn-sm btn-primary"
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
            >
              {isUploading ? "Uploading..." : <b>Upload</b>}
            </CButton>
          </CModalFooter>
        </CModal>

        {currentPopup === "fileUpload" && (
          <FileUploadComponent
            type={"export"}
            title="Upload Documents"
            setCurrentPopup={setCurrentPopup}
            jobNumber={jobNumber}
            fetchUploadedFiles={fetchUploadedFiles}
            setUploadedFiles={setUploadedFiles}
            width="fit-content"
            bgColor="#f6fcff"
            style={{ zIndex: 1000 }} // Ensure proper stacking
          />
        )}
        {console.log("currentPopup", currentPopup)}
        {currentPopup === "Deletion" && (
          <InputPopup
            title={fileToDelete?.filename}
            setCurrentPopup={setCurrentPopup}
            fields={contactFields}
            value={remark}
            setValue={setRemark}
            handleAdd={handleConfirmedDelete}
            firstButtonText={"Delete"}
            secondButtonText={"Close"}
            width={"450px"}
            selection={"none"}
            top={"50%"}
            left={"50%"}
            style={{ zIndex: 1001 }} // Ensure proper stacking
            deletePrefix={true}
          />
        )}

        {/* Delete Document Modal */}
        <CModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          backdrop="static"
          keyboard={false}
        >
          <CModalHeader>
            <CModalTitle>Delete Confirmation</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Are you sure you want to delete the file{" "}
              <strong>{fileToDelete?.filename}</strong>?
            </p>
            <CFormInput
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter reason for deletion"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={handleConfirmedDelete}>
              Yes, Delete
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                setDeleteModalVisible(false);
                setRemark("");
              }}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      </motion.div>
    </>
  );
};

export default DocumentUpload;
