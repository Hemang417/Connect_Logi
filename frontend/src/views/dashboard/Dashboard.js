import React, { useState, useEffect } from "react";
import "./css/Dashboard.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SimpleBarChart from "../charts/SimpleBarChart";
import DoubleBarChart from "../charts/DoubleBarChart";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [useImport, setUseImport] = useState(false);
  const [useExport, setUseExport] = useState(false);
  const [useAccount, setUseAccount] = useState(false);
  const [useUserReport, setUseUserReport] = useState(false);

  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const checkUsername = localStorage.getItem("username");

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

  const fetchcontrols = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/fetchdashboardaccess`,
        {
          params: {
            username: localStorage.getItem("username"),
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
          },
        }
      );

      const controlSet = new Set(data.map((item) => item.section));

      setUseImport(controlSet.has("IMPORT"));
      setUseExport(controlSet.has("EXPORT"));
      setUseAccount(controlSet.has("ACCOUNTS"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllstats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getallstats`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchnameofemp: localStorage.getItem("branchnameofemp"),
          branchcodeofemp: localStorage.getItem("branchcodeofemp"),
        },
      });
      setDashboardData(response.data); // Update the state with the fetched data from the API;
      console.log(response.data); // Uncomment to see the fetched data in the console.
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllstats();
    fetchcontrols();
  }, []);

  return (
    <div style={{ marginBottom: "-36px" }}>
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
      >
        <div className="main-container">
          <div className="top-cards">
            {/* {useImport && ( */}
            <div
              className="import-card"
              onDoubleClick={() =>
                checkUsername === "admin"
                  ? navigate("/impdetails")
                  : useImport
                  ? navigate("/impdetails")
                  : toast.error("Access Permission Requrired")
              }
            >
              <div className="imp-outer-box">
                <h3 className="titles imp-title-color">Import</h3>
                <div className="imp-inner-box">
                  <div className="sub-boxes">
                    <label className="fields">Total No. of Jobs</label>
                    <label className="number-data imp-num-color">
                      {dashboardData.totalImpJobsCount}
                    </label>
                  </div>
                  <div className="sub-boxes">
                    <label className="fields">Jobs Completed</label>
                    <label className="number-data imp-num-color">
                      {dashboardData.totalCompletedImpJobsCount}
                    </label>
                  </div>
                  <div className="sub-boxes">
                    <label className="fields">Pending Jobs</label>
                    <label className="number-data imp-num-color">
                      {dashboardData.totalPendingImpJobsCount}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* )} */}
            <div
              className="export-card"
              onDoubleClick={() =>
                checkUsername === "admin"
                  ? navigate("/expdetails")
                  : useExport
                  ? navigate("/expdetails")
                  : toast.error("Access Permission Requrired")
              }
            >
              <div className="exp-outer-box">
                <h3 className="titles exp-title-color">Export</h3>
                <div className="exp-inner-box">
                  <div className="sub-boxes">
                    <label className="fields">Total No. of Jobs</label>
                    <label className="number-data exp-num-color">
                      {dashboardData.totalExpjobsCount}
                    </label>
                  </div>
                  <div className="sub-boxes">
                    <label className="fields">Jobs Completed</label>
                    <label className="number-data exp-num-color">
                      {dashboardData.totalCompletedExpJobsCount}
                    </label>
                  </div>
                  <div className="sub-boxes">
                    <label className="fields">Pending Jobs</label>
                    <label className="number-data exp-num-color">
                      {dashboardData.totalPendingExpJobsCount}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="middle-cards">
            <div className="dashboard-chartContainer">
              <SimpleBarChart
                data={dashboardData.chartData?.monthlyImpJobs || []}
                xDataKey="month"
                bars={[
                  {
                    fill: theme === "dark" ? "#60b6e8" : "#333d70",
                    dataKey: "ImpJobs",
                    name: "Import Jobs",
                  },
                ]}
                title="Import Jobs vs Month"
                height={200}
              />
            </div>
            <div className="dashboard-chartContainer">
              <SimpleBarChart
                data={dashboardData.chartData?.monthlyExpJobs || []}
                xDataKey="month"
                bars={[
                  {
                    fill: theme === "dark" ? "#8dcb93" : "#337039",
                    dataKey: "ExpJobs",
                    name: "Export Jobs",
                  },
                ]}
                title="Export Jobs vs Month"
                height={200}
              />
            </div>
            <div className="dashboard-chartContainer">
              <DoubleBarChart
                data={dashboardData.chartData?.monthlyAccStats || []}
                xDataKey="month"
                barKeys={["debit", "credit"]}
                barNames={["Debit", "Credit"]}
                barColors={
                  theme === "dark"
                    ? ["#e265dd", "#f592f2"]
                    : ["#823d7f", "#532651"]
                }
                title="Debit & Credit vs Month"
                height={200}
              />
            </div>
          </div>
          <div className="bottom-cards">
            <div
              className="userReport-card"
              onDoubleClick={() =>
                checkUsername === "admin"
                  ? navigate("/user_report")
                  : useExport
                  ? navigate("/user_report")
                  : toast.error("Access Permission Requrired")
              }
            >
              <div className="userReport-outer-box">
                <h3 className="titles userReport-title-color">User Report</h3>
                <div className="userReport-inner-box">
                  <div className="sales-sub-boxes">
                    <label className="fields userReport-label-color">
                      Total no. of Users
                    </label>
                    <label className="number-data userReport-num-color">
                      *
                    </label>
                  </div>

                  <div className="sales-sub-boxes">
                    <label className="fields userReport-label-color">
                      Active Users
                    </label>
                    <label className="number-data userReport-num-color">
                      *
                    </label>
                  </div>

                  <div className="sales-sub-boxes">
                    <label className="fields userReport-label-color">
                      No. of Employees
                    </label>
                    <label className="number-data userReport-num-color">
                      *
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="accounts-card"
              onDoubleClick={() =>
                checkUsername === "admin"
                  ? navigate("/accountsDetails")
                  : useAccount
                  ? navigate("/accountsDetails")
                  : toast.error("Access Permission Requrired")
              }
            >
              <div className="outer-box">
                <div className="accounts-inner-box">
                  <h3 className="titles accounts-title-color">Accounts</h3>
                  <div className="accounts-inner-container">
                    <div className="accounts-first-row">
                      <label className="accounts-first-row-fields">
                        Credit
                      </label>
                      <label className="accounts-first-row-fields">Debit</label>
                      <label className="accounts-first-row-fields">
                        Cashflow Status
                      </label>
                      <label className="accounts-first-row-fields">
                        Payment Pending against Outstanding
                      </label>
                    </div>
                    <div className="accounts-second-row">
                      <span
                        className="accounts-second-row-fields"
                        style={{ width: "104px" }}
                      >
                        Rs. ***
                      </span>
                      <span
                        className="accounts-second-row-fields"
                        style={{ width: "96px" }}
                      >
                        Rs. ***
                      </span>
                      <label
                        className="accounts-second-row-fields"
                        style={{ width: "144px" }}
                      >
                        Pending
                      </label>
                      <label
                        className="accounts-second-row-fields"
                        style={{ marginLeft: "10px" }}
                      >
                        NA
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
export default Dashboard;

{
  /* <div
              className="transportation-card"
              onDoubleClick={() => navigate("/transportDetails")}
            >
              <div className="trans-outer-box">
                <h3 className="titles trans-title-color">Transportation</h3>
                <div className="trans-inner-box" style={{ width: "140%" }}>
                  <div className="sub-boxes">
                    <label className="number-data trans-num-color">{dashboardData.totalTransportJobsCount}</label>
                    <label className="trans-fields">Total No. of Jobs</label>
                  </div>
                  <div className="sub-boxes">
                    <label className="number-data trans-num-color">*</label>
                    <label className="trans-fields">Placed Vehicles</label>
                  </div>
                  <div className="sub-boxes">
                    <label className="number-data trans-num-color">*</label>
                    <label className="trans-fields">Rejected Vehicles</label>
                  </div>
                </div>
              </div>
              <div className="trans-outerbox-right">
                <div className="trans-inner-box">
                  <div
                    className="sub-boxes"
                    style={{ flexDirection: "column-reverse" }}
                  >
                    <label className="number-data trans-num-color">*</label>
                    <label className="trans-fields">Own Vehicle</label>
                  </div>
                </div>
              </div>
            </div> */
}

{
  /* <div
              className="sales-card"
              onDoubleClick={() => navigate("/salesProspects")}
            >
              <div className="sales-outer-box">
                <h3 className="titles sales-title-color">Sales</h3>
                <div className="sales-inner-box">
                  <div className="sales-col">
                    <h4 className="sales-inner-title">Prospect</h4>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Pending Prospects
                      </label>
                      <label className="number-data sales-num-color">{dashboardData.ProspectsCount}</label>
                    </div>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Actions
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Converted Prospects
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                  </div>
                  <div className="sales-col">
                    <h4 className="sales-inner-title">Enquiries</h4>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Total Enquiries
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Converted Enquiries
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Rejected Enquiries
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                  </div>
                  <div className="sales-col">
                    <h4 className="sales-inner-title">Quotations</h4>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Total Quotations
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Approved Quotations
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                    <div className="sales-sub-boxes">
                      <label className="fields sales-label-color">
                        Rejected Quotations
                      </label>
                      <label className="number-data sales-num-color">*</label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */
}

{
  /* <div
              className="freightForwarding-card"
              onDoubleClick={() => navigate("/freightforwardingDetails")}
            >
              <div className="freightForwarding-outer-box">
                <h3 className="titles freightForwarding-title-color">
                  Freight Forwarding
                </h3>
                <div className="freightForwarding-inner-box">
                  <div className="sales-sub-boxes">
                    <label className="fields freightForwarding-label-color">
                      Total no. of Bookings
                    </label>
                    <label className="number-data freightForwarding-num-color">
                      *
                    </label>
                  </div>

                  <div className="sales-sub-boxes">
                    <label className="fields freightForwarding-label-color">
                      Completed on Time
                    </label>
                    <label className="number-data freightForwarding-num-color">
                      *
                    </label>
                  </div>

                  <div className="sales-sub-boxes">
                    <label className="fields freightForwarding-label-color">
                      Delayed
                    </label>
                    <label className="number-data freightForwarding-num-color">
                      *
                    </label>
                  </div>
                </div>
              </div>
            </div> */
}
