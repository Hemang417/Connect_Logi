import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import styles from "../../user_report/css/userreport.module.css";
import API_BASE_URL from "src/config/config";

const BranchAccess = () => {
  const location = useLocation();
  const decodedUsername = decodeURIComponent(
    location.pathname.split("/").pop()
  );

  const [allBranches, setAllBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
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
    // Fetch selected branches from the server and set them in the state
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

  const handleCheckboxChange = async (e, branch) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Add the branch to the selectedBranches state
      setSelectedBranches([...selectedBranches, branch]);
      // Send a POST request to insert the branch data
      try {
        await axios.post(`${API_BASE_URL}/insertBranchaccess`, {
          branch: branch,
          username: decodedUsername,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      // Remove the branch from the selectedBranches state
      const updatedSelectedBranches = selectedBranches.filter(
        (selected) => selected.branchcode !== branch.branchcode
      );
      setSelectedBranches(updatedSelectedBranches);
      // Send a DELETE request to remove the branch data
      try {
        await axios.delete(`${API_BASE_URL}/deleteBranchaccess`, {
          data: { branchcode: branch.branchcode ,  username: decodedUsername,},
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
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
          <th
            className="px-4 py-2 text-left"
            style={{ fontWeight: "500", textAlign: "center" }}
          >
            Access
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
                style={{ textAlign: "center", padding: "8px" }}
              >
                <input
                  type="checkbox"
                  className="imp-access-checkbox"
                  checked={selectedBranches.some(
                    (selected) => selected.branchcode === branch.branchcode
                  )}
                  onChange={(e) => handleCheckboxChange(e, branch)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BranchAccess;
