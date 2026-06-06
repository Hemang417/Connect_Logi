import React, { useEffect } from "react";
import styles from "../css/userreport.module.css";
import "../../../css/styles.css";
import { useState } from "react";
import axios from "axios";
import Pagination from "src/layout/Pagination";
import API_BASE_URL from "src/config/config";

const User_General = ({ branch, client, startDate, endDate, onDataFetch }) => {
  const [genData, setGenData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedGenData = [...genData].sort((a, b) => a.jobnumber.localeCompare(b.jobnumber));
  let currentItems = sortedGenData.slice(indexOfFirstItem, indexOfLastItem);
  // currentItems = currentItems.reverse();
  const totalPages = Math.ceil(genData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  const GeneralData = async () => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const username = localStorage.getItem("empnameforaccess");
      const response = await axios.get(
        `${API_BASE_URL}/getGeneralEmployeeData`,
        {
          params: {
            orgname: orgname,
            orgcode: orgcode,
            employeename: username,
          },
        }
      );
      let filteredData = response.data;

      if (branch) {
        filteredData = filteredData.filter((item) => item.ownbranchname === branch);
      }

      if (client) {
        filteredData = filteredData.filter(
          (item) => item.clientname === client
        );
      }

      if (startDate && endDate) {
        const sDate = new Date(startDate);
        const eDate = new Date(endDate);
        console.log("startDate", sDate);
        console.log("endDate", eDate);

        filteredData = filteredData.filter((item) => {
          const compDate = new Date(item.completiondate);
          return compDate >= sDate && compDate <= eDate;
        });
      }

      setGenData(filteredData);
      // console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // console.log("General Data called");
    GeneralData();
  }, [genData]);

  const formatDate = (date) => {
    if (!date) return ""; // Handle empty/null date

    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div style={{ height: "298px" }}>
        <table
          className="min-w-full border-separate"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0 8px",
          }}
        >
          <thead className={styles.tableHead}>
            <tr>
              {[
                "Job Number",
                // "Branch",
                "Client",
                "Milestone",
                "Deadline",
                "Completion Date",
                "Time Delay",
                "Status",
              ].map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left"
                  style={{ fontWeight: "500", textAlign: "center" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
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
                  {item.jobnumber}
                </td>
                {/* <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {item.ownbranchname}
                </td> */}
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {item.clientname}
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {item.milestone}
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {formatDate(item.deadline)}
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {formatDate(item.completiondate)}
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {item.timedelay}
                </td>
                <td
                  className={styles.tableData}
                  style={{ textAlign: "center", padding: "8px" }}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        // className="IMPORTpagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          bottom: "8px",
        }}
      >
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export { User_General };
