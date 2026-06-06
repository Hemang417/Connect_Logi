import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import NewButton from "src/views/buttons/buttons/NewButton";
import styles from "./InputPopup.module.css"; // You'll need to create this CSS module
import API_BASE_URL from "src/config/config";

const FileUploadComponent = ({
  type,
  title = "Upload Files",
  setCurrentPopup,
  jobNumber,
  fetchUploadedFiles,
  setUploadedFiles,
  width = "500px",
  bgColor = "#f6fcff",
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [renamedFiles, setRenamedFiles] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const sidebarShow = useSelector((state) => state.sidebarShow);

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
      let response; // ✅ Declare outside the if blocks

      if (type === "import") {
        response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          params: {
            type: "import",
            jobnumber: jobNumber.replace(/\//g, "-"),
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
            filelocation: localStorage.getItem("filelocation"),
            clientname: sessionStorage.getItem("importername"),
            username: localStorage.getItem("username"),
          },
        });
      }

      if (type === "export") {
        response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          params: {
            type: "export",
            jobnumber: jobNumber.replace(/\//g, "-"),
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
            filelocation: localStorage.getItem("filelocation"),
            clientname: sessionStorage.getItem("exporterName"),
            username: localStorage.getItem("username"),
          },
        });
      }

      if (response?.status === 200) {
        toast.success("Files uploaded successfully!");
        setUploadedFiles(response.data.files);
        setSelectedFiles([]);
        setRenamedFiles({});
        setCurrentPopup("none");
      }
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed. Please Change Filename");
    } finally {
      setIsUploading(false);
      fetchUploadedFiles && fetchUploadedFiles();
    }
  };

  const handleDeleteFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    const updatedRenamedFiles = { ...renamedFiles };
    delete updatedRenamedFiles[index];
    setRenamedFiles(updatedRenamedFiles);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 27) {
        setCurrentPopup("none");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const PopupStyle = {
    width: width,
    position: "fixed",
    bottom: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

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
        className={styles.popupWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={PopupStyle}
      >
        <div className={styles.container} >
          <div className={styles.firstRow}>
            <h2 className={styles.title}>
              <strong>{title}</strong>
            </h2>
          </div>

          <div className={styles.secondRow}>
            <div className={styles.content} style={{ padding: "0px" }}>
              <div className={styles.fileUploadContainer}>
                <label className={styles.fileInputLabel}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                  <span className={styles.customFileButton}>Choose Files</span>
                </label>
              </div>

              <div className={styles.fileList}>
                {selectedFiles.map((file, index) => (
                  <div key={index} className={styles.fileItem}>
                    <span className={styles.fileName}>{file.name}</span>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Rename file"
                      value={renamedFiles[index] || ""}
                      onChange={(e) =>
                        handleRenameChange(index, e.target.value)
                      }
                    />
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteFile(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.thirdRow}>
            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={handleUpload}
              disabled={isUploading || selectedFiles.length === 0}
            >
              <NewButton
                width={"128px"}
                text={isUploading ? "Uploading..." : "Upload"}
              />
            </button>

            <button
              style={{ border: "none", padding: "0px", borderRadius: "8px" }}
              onClick={() => {
                setCurrentPopup("none");
              }}
            >
              <NewButton width={"128px"} text="Cancel" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FileUploadComponent;
