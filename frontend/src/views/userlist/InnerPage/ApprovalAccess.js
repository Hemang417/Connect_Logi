import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../user_report/css/userreport.module.css";
import axios from "axios";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Approvername } from "src/views/approver";
import toast from "react-hot-toast";
import API_BASE_URL from "src/config/config";

const ApprovalAccess = () => {
  const location = useLocation();
  const decodedUsername = decodeURIComponent(
    location.pathname.split("/").pop()
  );
  const [allBranches, setAllBranches] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [approvalName, setApprovalName] = useState([]);
  const [approvalKaNaam, setApprovalKaNaam] = useState([]);
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
  }, []);

  const getallapproverlist = async () => {
    try {
      const approvalList = await axios.get(
        `${API_BASE_URL}/fetchApproverlistAll`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setApprovalName(approvalList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getallapprovernames = async () => {
    try {
      const allnamesofemployees = await axios.get(
        `${API_BASE_URL}/getallapprovernamesForListSection`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );

      allnamesofemployees.data = allnamesofemployees.data.filter(
        (item) => item.employeename === decodedUsername
      );
      setSelectedBranches(
        allnamesofemployees.data.map((item) => ({
          approverlistname: item.approverlistname,
          branchcode: item.branchcode,
        }))
      );
      //filter
      setApprovalKaNaam(allnamesofemployees.data);
      console.log(allnamesofemployees.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkallapproverlist = async (params) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/checkApproverlist`,
        {
          params: params,
        }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking approver list:", error);
      return false;
    }
  };

  const handleCheckboxChange = async (e, branch, columnType) => {
    const isChecked = e.target.checked;

    // Determine approverlistname and uniquevalue based on the column type
    let approverlistname = "";
    let uniquevalue = "";
    let id;

    switch (columnType) {
      case "Import":
        approverlistname = "Import Job Creation";
        uniquevalue = "ImpJobButton";
        // id = 101;
        break;
      case "Export":
        approverlistname = "Export Job Creation";
        uniquevalue = "ExpJobButton";
        // id = 102;
        break;
      case "Organization":
        approverlistname = "Organization Creation";
        uniquevalue = "OrgButton";
        // id = 103;
        break;
      default:
        return;
    }
    const branchcode = branch.branchcode; // Ensure correct property
    const branchname = branch.ownbranchname; // Ensure correct property
    const orgname = branch.orgname;
    const orgcode = branch.orgcode;
    const employeename = decodedUsername;

    try {
      if (isChecked) {
        const approverlistexists = await checkallapproverlist({
          approverlistname: approverlistname,
          branchcode: branchcode,
          orgname: orgname,
          orgcode: orgcode,
          uniquevalue: uniquevalue,
        });
        if (approverlistexists && approverlistexists.length > 0) {
          id = approverlistexists[0].id; // Get the ID from the first matched row
        } else {
          // Logic to insert a new approver list
          const response = await axios.post(
            `${API_BASE_URL}/storeApproverlist`,
            {
              approverName: approverlistname,
              branchcode: branchcode,
              branchname: branchname,
              orgname: orgname,
              orgcode: orgcode,
              uniquevalue: uniquevalue,
              username: employeename,
            }
          );
          id = response.data.id; // Set id from the response
        }
        console.log("id", id);
        // Proceed with adding the approver
        if (id === null || id === undefined) {
          console.error(
            "ID is undefined. Cannot proceed with adding to approver list."
          );
          return; // Prevent further execution
        }

        await axios.post(`${API_BASE_URL}/addApprover`, {
          approverlistname: approverlistname,
          branchcode: branchcode,
          branchname: branchname,
          orgname: orgname,
          orgcode: orgcode,
          employeeName: employeename,
          uniquevalue: uniquevalue,
          id: id,
        });
        setSelectedBranches((approvalName) => [
          ...approvalName,
          { approverlistname, branchcode },
        ]);

        localStorage.setItem("uniquevalue", uniquevalue);
        toast.success(`${columnType} access added successfully`);
      } else {
        await axios.delete(`${API_BASE_URL}/deleteapprovername`, {
          data: {
            orgname: orgname,
            orgcode: orgcode,
            branchname: branchname,
            branchcode: branchcode,
            employeename: employeename,
            approverlistname: approverlistname,
            // aid: id,
          },
        });

        setSelectedBranches((prevSelected) =>
          prevSelected.filter(
            (selected) =>
              !(
                selected.branchcode === branchcode &&
                selected.approverlistname === approverlistname
              )
          )
        ); // Remove branch from selectedBranches

        toast.success(`${columnType} access removed successfully`);
      }
    } catch (error) {
      console.error(`Error adding/removing access for ${columnType}:`, error);
      toast.error(`Failed to update ${columnType} access`);
    }
  };
  useEffect(() => {
    getallapproverlist();
    getallapprovernames();
  }, []);

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
            <th
              className="px-4 py-2 text-left"
              style={{ fontWeight: "500", textAlign: "center" }}
            >
              Import
            </th>
            <th
              className="px-4 py-2 text-left"
              style={{ fontWeight: "500", textAlign: "center" }}
            >
              Export
            </th>
            <th
              className="px-4 py-2 text-left"
              style={{ fontWeight: "500", textAlign: "center" }}
            >
              Organization
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
                      (selected) =>
                        selected.approverlistname === "Import Job Creation" &&
                        selected.branchcode === branch.branchcode
                    )}
                    onChange={(e) => handleCheckboxChange(e, branch, "Import")}
                  />
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  <input
                    type="checkbox"
                    className="imp-access-checkbox"
                    checked={selectedBranches.some(
                      (selected) =>
                        selected.approverlistname === "Export Job Creation" &&
                        selected.branchcode === branch.branchcode
                    )}
                    // onChange={(e) => handleCheckboxChange(e, branch)}
                    onChange={(e) => handleCheckboxChange(e, branch, "Export")}
                  />
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  <input
                    type="checkbox"
                    className="imp-access-checkbox"
                    checked={selectedBranches.some(
                      (selected) =>
                        selected.approverlistname === "Organization Creation" &&
                        selected.branchcode === branch.branchcode
                    )}
                    // onChange={(e) => handleCheckboxChange(e, branch)}
                    onChange={(e) =>
                      handleCheckboxChange(e, branch, "Organization")
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ApprovalAccess;
