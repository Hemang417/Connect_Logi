import React, { useState, useEffect } from "react";
import axios from "axios";
import { CChart } from "@coreui/react-chartjs";
import styles from "../css/userimport.module.css";
import {
  CCard,
  CCol,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  thead,
  CTableBody,
  CTableDataCell,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdown,
} from "@coreui/react";
import moment from "moment";
import CIcon from "@coreui/icons-react";
import {
  cilLockLocked,
  cilUser,
  cilBuilding,
  cilChartPie,
  cilArrowRight,
  cilSpeedometer,
  cilLayers,
  cilCloudDownload,
} from "@coreui/icons";
import API_BASE_URL from "src/config/config";

const User_Export = ({
  branch = "All",
  client = "All",
  startDate,
  endDate,
  onDataFetch,
}) => {
  const [allData, setAllData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [nonNegativeCount, setNonNegativeCount] = useState(0);
  const [branchdata, setbranchdata] = useState([]);
  const [selectedBranchofUser, setSelectedBranchofUser] = useState("All");
  const [filteredData, setFilteredData] = useState({});
  const [totalJobsofOrg, setTotalJobsofOrg] = useState(0);
  const [totalOrgs, setTotalOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("All");
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
    const branchnames = localStorage.getItem("branchnames");
    if (branchnames) {
      try {
        const parsedData = JSON.parse(branchnames.replace(/'/g, '"'));
        const branchesWithAll = [...parsedData, "All"];
        setbranchdata(branchesWithAll);
      } catch (error) {
        console.error("Error parsing branch names:", error);
      }
    }

    const getAllorgs = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getallorgsforfiltering`,
          {
            params: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        const allorgs = response.data;
        const allhaveorgs = [...allorgs, { clientname: "All" }]; // Append 'All' to the fetched array
        setTotalOrgs(allhaveorgs);
      } catch (error) {
        console.log(error);
      }
    };

    getAllorgs();
  }, []);

  const fetchAllData = async (branch = "All", org = "All") => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getAllRowsofUsernameExport`,
        {
          params: {
            username: localStorage.getItem("empnameforaccess"),
            fullname: localStorage.getItem("fullname"),
            branchnames: localStorage.getItem("branchnames"),
            startDate: startDate,
            endDate: endDate,
          },
        }
      );
      setTotalJobsofOrg(response.data.totalJobs.length);
      let data = response.data;

      // Apply branch filter if not 'All'
      if (branch !== "All") {
        data = {
          ...data,
          totalJobs: data.totalJobs.filter((row) => row.branchname === branch),
          completedRows: data.completedRows.filter(
            (row) => row.ownbranchname === branch
          ),
          rowshaiye: data.rowshaiye.filter((row) => row.branchname === branch),
        };
      }

      // Apply client name filter if not 'All'
      if (org !== "All") {
        data = {
          ...data,
          completedRows: data.completedRows.filter(
            (row) => row.clientname === org
          ),
          totalJobs: data.totalJobs.filter((row) => row.clientname === org),
        };
      }

      if (startDate && endDate) {
        data = {
          ...data,
          completedRows: data.completedRows.filter((row) => {
            const completionDate = moment(row.completiondate);
            return completionDate.isBetween(startDate, endDate, "day", "[]");
          }),
        };
      }

      setAllData(data);
      setOriginalData(response.data);

      const grouped = data.completedRows.reduce((acc, item) => {
        const key = item.tatexpcolumn;
        acc[key] = [...(acc[key] || []), item];
        return acc;
      }, {});
      setGroupedData(grouped);

      let count = 0;
      data.completedRows.forEach((item) => {
        if (item.timing === "After") {
          count++;
        }
      });
      setNonNegativeCount(count);
      setFilteredData(data);
      onDataFetch({
        allData: data,
        originalData: response.data,
        groupedData: grouped,
        nonNegativeCount: count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData(branch || "All", client || "All");
    setSelectedBranchofUser(branch || "All");
    setSelectedOrg(client || "All");
  }, [branch, client, startDate, endDate]);

  const generateRandomColor = (numColors) => {
    const colorPool = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];

    // Shuffle the colorPool using Fisher-Yates
    for (let i = colorPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
    }

    return colorPool.slice(0, numColors);
  };

  const getPieChartData = () => {
    if (!allData.totalJobs || !allData.rowshaiye || !allData.completedRows) {
      return {
        labels: [],
        datasets: [{ backgroundColor: [], data: [] }],
      };
    }

    // Filter rowshaiye based on selected branch if needed
    const relevantWorkflows =
      selectedBranchofUser === "All"
        ? allData.rowshaiye
        : allData.rowshaiye.filter(
            (item) => item.branchname === selectedBranchofUser
          );

    const chartData = relevantWorkflows.map((item) => {
      // Keep the branch filtering but ensure we're matching fields correctly
      const completedRowsForItem = allData.completedRows.filter((row) => {
        // Check if tatimpcolumn matches workflowName
        const workflowMatches = row.tatimpcolumn === item.workflowName;

        // Apply branch filter only when not "All"
        const branchMatches =
          selectedBranchofUser === "All" ||
          row.ownbranchname === item.branchname;

        return workflowMatches && branchMatches;
      });

      // Calculate the percentage based on completed count vs total jobs
      const completedCount = completedRowsForItem.length;

      // Make sure we're using correct denominator - only count jobs from relevant branch
      const relevantTotalJobs =
        selectedBranchofUser === "All"
          ? allData.totalJobs.length
          : allData.totalJobs.filter(
              (job) => job.branchname === selectedBranchofUser
            ).length;

      // Ensure we don't divide by zero
      const percentage =
        relevantTotalJobs > 0
          ? ((completedCount / relevantTotalJobs) * 100).toFixed(2)
          : 0;

      // Return as number not string
      return parseFloat(percentage);
    });

    // Generate labels with or without branch name depending on selection
    const labels = relevantWorkflows.map((item) =>
      selectedBranchofUser === "All"
        ? `${item.workflowName} (${item.branchname})`
        : item.workflowName
    );

    return {
      labels: labels,
      datasets: [
        {
          backgroundColor: generateRandomColor(relevantWorkflows.length),
          data: chartData,
        },
      ],
    };
  };

  const pieChartData = getPieChartData();
  const hasChartData =
    pieChartData &&
    pieChartData.datasets &&
    pieChartData.datasets[0] &&
    pieChartData.datasets[0].data &&
    pieChartData.datasets[0].data.some((value) => parseFloat(value) > 0);

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "30px",
          }}
        >
          <div className={styles.label}>
            Number of Jobs created:{" "}
            <span className={styles.labelData}>{allData.access?.length}</span>
          </div>
          <div className={styles.label}>
            Total Delayed Milestones:{" "}
            <span className={styles.labelData}>{nonNegativeCount}</span>
          </div>
        </div>
        <table
          className="min-w-full border-separate"
          style={{
            width: "100%",
            borderCollapse: "separate", // ✅ Ensure separate borders
            borderSpacing: "0 10px", // ✅ Adds spacing between rows
          }}
        >
          <thead className={styles.tableHead}>
            <tr>
              <th className="px-2 py-2 text-left" style={{ fontWeight: "500" }}>
                Milestone
              </th>
              <th className="px-2 py-2 text-left" style={{ fontWeight: "500" }}>
                Total
              </th>
              <th className="px-2 py-2 text-left" style={{ fontWeight: "500" }}>
                Completed
              </th>
              <th className="px-2 py-2 text-left" style={{ fontWeight: "500" }}>
                Delayed
              </th>
              <th className="px-2 py-2 text-left" style={{ fontWeight: "500" }}>
                Percentage(%)
              </th>
            </tr>
          </thead>
          <tbody>
            {allData.rowshaiye &&
              allData.rowshaiye.map((item, index) => {
                const completedRowsForItem = allData.completedRows.filter(
                  (row) =>
                    row.tatexpcolumn === item.workflowName &&
                    row.ownbranchname === item.branchname
                );
                const completedCount = completedRowsForItem.filter(
                  (row) => row.timing === "Before"
                ).length;

                const delayedCount = completedRowsForItem.filter(
                  (row) => row.timing === "After"
                ).length;
                const totalCount = allData.totalJobs.length;
                const percentage =
                  totalCount > 0
                    ? ((completedCount / totalCount) * 100).toFixed(2)
                    : 0;

                return (
                  <tr key={index} className="rounded-lg shadow-md">
                    <td
                      className={`${styles.tableData} px-4 py-2 rounded-lg`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? index % 2 === 0
                              ? "#3B5472"
                              : "#263A52"
                            : index % 2 === 0
                            ? "var(--Card-Row-2, #D8F0FD)"
                            : "var(--Table-Row-1, #F6FCFF)",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {item.workflowName}{" "}
                      {selectedBranchofUser === "All"
                        ? `(${item.branchname})`
                        : ""}
                    </td>
                    <td
                      className={`${styles.tableData} px-4 py-2 rounded-lg`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? index % 2 === 0
                              ? "#3B5472"
                              : "#263A52"
                            : index % 2 === 0
                            ? "var(--Card-Row-2, #D8F0FD)"
                            : "var(--Table-Row-1, #F6FCFF)",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {totalCount}
                    </td>
                    <td
                      className={`${styles.tableData} px-4 py-2 rounded-lg`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? index % 2 === 0
                              ? "#3B5472"
                              : "#263A52"
                            : index % 2 === 0
                            ? "var(--Card-Row-2, #D8F0FD)"
                            : "var(--Table-Row-1, #F6FCFF)",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {completedCount}
                    </td>
                    <td
                      className={`${styles.tableData} px-4 py-2 rounded-lg`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? index % 2 === 0
                              ? "#3B5472"
                              : "#263A52"
                            : index % 2 === 0
                            ? "var(--Card-Row-2, #D8F0FD)"
                            : "var(--Table-Row-1, #F6FCFF)",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {delayedCount}
                    </td>
                    <td
                      className={`${styles.tableData} px-4 py-2 rounded-lg`}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? index % 2 === 0
                              ? "#3B5472"
                              : "#263A52"
                            : index % 2 === 0
                            ? "var(--Card-Row-2, #D8F0FD)"
                            : "var(--Table-Row-1, #F6FCFF)",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className={styles.RightBox}>
        {console.log("getPieChartData() : ", getPieChartData())}
        {console.log("selectedBranchofUser:", selectedBranchofUser)}
        {console.log(
          "relevantWorkflows:",
          selectedBranchofUser === "All"
            ? allData.rowshaiye
            : allData.rowshaiye.filter(
                (item) => item.branchname === selectedBranchofUser
              )
        )}
        {console.log("hasChartData:", hasChartData)}
        {hasChartData ? (
          <CChart
            style={{ width: "90%", height: "100%" }}
            type="doughnut"
            data={pieChartData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: theme === "dark" ? "#D1EEFF" : "#263A52",
                  },
                  display: true,
                },
                tooltip: {
                  enabled: true,
                },
              },
              cutout: "70%",
              radius: "70%",
            }}
          />
        ) : (
          <div className={styles.label}>NO DATA !!! </div>
        )}
      </div>
    </div>
  );
};

export { User_Export };
