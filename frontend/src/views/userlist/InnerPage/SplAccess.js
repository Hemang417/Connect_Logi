import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import styles from "../../user_report/css/userreport.module.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import AccessControlPopup from "src/components/inputPopup/AccessControlPopup"; // ✅ Replace InputPopup
import toast from "react-hot-toast";
import API_BASE_URL from "src/config/config";

const SplAccess = () => {
  const location = useLocation();
  const decodedUsername = decodeURIComponent(
    location.pathname.split("/").pop()
  );
  const [showModal, setShowModal] = useState(false);
  const [allBranches, setAllBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [currentBranch, setCurrentBranch] = useState(null);
  const [existingSelections, setExistingSelections] = useState([]);

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
      setAllBranches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOwnBranches();

    const fetchSelectedBranches = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/fetchExistingBranches`,
          {
            params: {
              username: decodedUsername,
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        setSelectedBranches(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSelectedBranches();
  }, []);

  const handleCheckboxChange = async (branch) => {
    try {
      setCurrentBranch(branch);
      console.log("Fetching access for branch:", branch);

      // Check if branch data is valid
      if (!branch || !branch.ownbranchname || !branch.branchcode) {
        console.error("Invalid branch data:", branch);
        return;
      }

      const resp = await axios.get(`${API_BASE_URL}/fetchuseraccess`, {
        params: {
          username: decodedUsername,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: branch.ownbranchname,
          branchcode: branch.branchcode,
        },
      });

      const params = {
        username: decodedUsername,
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        branchname: branch.ownbranchname,
        branchcode: branch.branchcode,
      };
      console.log("Sending params to fetchuseraccess:", params);
      console.log("Server response:", resp.data);

      // Check if response data is valid
      if (!resp.data || !Array.isArray(resp.data)) {
        console.error("Invalid response data:", resp.data);
        setExistingSelections([]);
      } else {
        const existing = resp.data.map((r) => `${r.section}|${r.control}`);
        setExistingSelections(existing);
      }

      setCurrentPopup("GrantAccess");
    } catch (error) {
      console.error("Error fetching user access:", error);
      // Still open the popup but with empty selections
      setExistingSelections([]);
      setCurrentPopup("GrantAccess");
    }
  };

  const handleSave = async (selectedIds) => {
    if (!selectedIds || !currentBranch) {
      console.error("Missing selected IDs or branch data");
      return;
    }

    const selections = selectedIds.map((combined) => {
      const [sectionTitle, controlId] = combined.split("|");
      return { section: sectionTitle, control: controlId };
    });

    try {
      await axios.put(`${API_BASE_URL}/updateuseraccess`, {
        username: decodedUsername,
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        branchname: currentBranch.ownbranchname,
        branchcode: currentBranch.branchcode,
        changedby: localStorage.getItem("username"),
        selections,
      });
      setCurrentPopup("none");
      toast.success("Access updated successfully");
    } catch (error) {
      console.error("Error updating user access:", error);
      toast.error("Failed to update user access");
    }
  };

  // ✅ Hierarchical access control data
  const accessControlData = [
    {
      id: "org",
      title: "ORGANIZATION",
      controls: [
        { id: "add-client", label: "Add Client" },
        { id: "download-client", label: "Download Clientlist" },
        { id: "delete-client", label: "Delete Client" },
      ],
    },
    {
      id: "import",
      title: "IMPORT",
      controls: [
        { id: "add-job", label: "Add Job" },
        { id: "delete-job", label: "Delete Job" },
        { id: "download-job", label: "Download Joblist" },
        { id: "track-job", label: "Tracking" },
        { id: "container-details", label: "Container Details" },
        { id: "transport", label: "Transport" },
        { id: "doc-upload", label: "Document Upload" },
        { id: "collection", label: "Collection" },
        { id: "transaction", label: "Transaction History" },
        { id: "quotation", label: "Quotation" },
      ],
    },
    {
      id: "export",
      title: "EXPORT",
      controls: [
        { id: "add-job", label: "Add Job" },
        { id: "delete-job", label: "Delete Job" },
        { id: "download-job", label: "Download Joblist" },
        { id: "track-job", label: "Tracking" },
        { id: "container-details", label: "Container Details" },
        { id: "transport", label: "Transport" },
        { id: "doc-upload", label: "Document Upload" },
        { id: "collection", label: "Collection" },
        { id: "transaction", label: "Transaction History" },
        { id: "quotation", label: "Quotation" },
      ],
    },
    {
      id: "accounts",
      title: "ACCOUNTS",
      controls: [
        { id: "add-credit", label: "Add Credit" },
        { id: "delete-credit", label: "Delete Credit" },
        { id: "edit-credit", label: "Edit Credit" },
        { id: "download-credit", label: "Download Creditlist" },
        { id: "add-debit", label: "Add Debit" },
        { id: "delete-debit", label: "Delete Debit" },
        { id: "edit-debit", label: "Edit Debit" },
        { id: "download-debit", label: "Download Debitlist" },
        { id: "add-bank", label: "Add Bank" },
        { id: "delete-bank", label: "Delete Bank" },
        // { id: "edit-bank", label: "Edit Bank" },
        { id: "download-bank", label: "Download Banklist" },
        { id: "add-paye", label: "Add PayE" },
        { id: "delete-paye", label: "Delete PayE" },
        // { id: "edit-paye", label: "Edit PayE" },
        { id: "download-paye", label: "Download PayElist" },
      ],
    },
  ];

  return (
    <>
      <table
        className="min-w-full border-separate"
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 8px",
        }}
      >
        <thead className={styles.tableHead}>
          <tr color="dark">
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
            <th style={{ fontWeight: "500", textAlign: "center" }}>
              Employee Access
            </th>
          </tr>
        </thead>
        <tbody>
          {allBranches &&
            allBranches.map((branch, index) => (
              <tr
                key={index}
                className="rounded-lg shadow-md"
                style={{
                  backgroundColor:
                    theme === "dark"
                      ? index % 2 === 0
                        ? "#3B5472"
                        : "#263A52"
                      : index % 2 === 0
                      ? "#D8F0FD"
                      : "#F6FCFF",
                  transition: "background-color 0.3s ease",
                  height: "34px",
                }}
              >
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {branch.branchcode}
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {branch.ownbranchname}
                </td>
                <td
                  className={styles.tableData}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                >
                  <div
                    color="primary"
                    style={{ width: "fit-content" }}
                    onClick={() => handleCheckboxChange(branch)}
                  >
                    <NewButton text={"Show More"} height={"28px"} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* ✅ New Access Control Popup */}
      {currentPopup === "GrantAccess" && (
        <AccessControlPopup
          data={accessControlData}
          isOpen={currentPopup === "GrantAccess"}
          onClose={() => setCurrentPopup("none")}
          firstButtonText="Save"
          secondButtonText="Close"
          onFirstClick={(selectedIds) => handleSave(selectedIds || [])}
          onSecondClick={() => setCurrentPopup("none")}
          renderCheckboxes={true}
          existingSelections={existingSelections || []}
        />
      )}
    </>
  );
};

export default SplAccess;
