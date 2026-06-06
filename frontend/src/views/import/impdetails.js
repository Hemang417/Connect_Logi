import React from "react";
import styles from "./css/impdetails.module.css";
// import "../../css/allVars.css"
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewTable from "src/components/newTable/NewTable";
import DashboardPopup from "src/components/dashboardPopup/DashboardPopup";
import Cookies from "js-cookie";
import axios from "axios";
import RightArrow from "../buttons/buttons/RightArrow";
import ArrowCircleRight from "../buttons/buttons/ArrowCircleRight";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import SimpleLineChart from "../charts/SimpleLineChart";
import SimpleBarChart from "../charts/SimpleBarChart";
import API_BASE_URL from "src/config/config";

function impdetails() {
  const navigate = useNavigate();
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
  const [currentPopup, setCurrentPopup] = useState("");
  const [importdata, setImportData] = useState({
    impStats: {},
    allStats: {},
    chartData: {
      monthlyCompletionStats: [],
      monthlyConsignmentStats: [],
      delayedMilestoneStats: [],
    },
  });
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const getImpstats = async () => {
    try {
      console.log("Function called");

      // Get organization and branch details from localStorage once
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const branchnameofemp = localStorage.getItem("branchnameofemp");
      const branchcodeofemp = localStorage.getItem("branchcodeofemp");

      // Define default dates in case state values are not set
      const defaultStartDate = new Date("1800-01-01T00:00:00.000Z");
      const defaultEndDate = new Date(); // Today by default
      defaultEndDate.setHours(23, 59, 59, 999);

      // Convert selected dates (if provided) to Date objects; otherwise, use defaults
      const startDateObj = selectedStartDate
        ? new Date(selectedStartDate)
        : defaultStartDate;
      const endDateObj = selectedEndDate
        ? new Date(selectedEndDate)
        : defaultEndDate;

      // Set the times to cover the entire day
      startDateObj.setHours(0, 0, 0, 0);
      endDateObj.setHours(23, 59, 59, 999);

      // Convert Date objects back to ISO strings for the API call
      const startDate = startDateObj.toISOString();
      const endDate = endDateObj.toISOString();

      // Use Promise.all to fetch both API calls simultaneously
      const [impStats, allStats] = await Promise.all([
        axios.get(`${API_BASE_URL}/getimpstats`, {
          params: {
            orgname,
            orgcode,
            branchnameofemp,
            branchcodeofemp,
            startDate,
            endDate,
          },
        }),
        axios.get(`${API_BASE_URL}/getallstats`, {
          params: { orgname, orgcode, branchnameofemp, branchcodeofemp },
        }),
      ]);

      // Combine both API responses if necessary
      const combinedResponse = {
        impStats: impStats.data,
        allStats: allStats.data,
        chartData: impStats.data.chartData || {
          monthlyCompletionStats: [],
          monthlyConsignmentStats: [],
          delayedMilestoneStats: [],
        },
      };

      // Update state with the fetched data
      setImportData(combinedResponse);
      console.log("Combined Response:", combinedResponse);
    } catch (error) {
      console.log("Error fetching data:", error);
      console.error(error);
    }
  };

  useEffect(() => {
    getImpstats();
    console.log("useEffect triggered");
  }, [selectedStartDate, selectedEndDate]);

  const handleDateSelect = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  // Format month for better display
  const formatMonth = (monthString) => {
    if (!monthString) return "";
    const date = new Date(monthString + "-01");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Process chart data to ensure proper month formatting
  const processedCompletionData =
    importdata.chartData?.monthlyCompletionStats?.map((item) => ({
      ...item,
      month: formatMonth(item.month),
    })) || [];

  const processedConsignmentData =
    importdata.chartData?.monthlyConsignmentStats?.map((item) => ({
      ...item,
      month: formatMonth(item.month),
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      {/* <NewTable columns={columns} data={data} />*/}

      <div className={styles.container}>
        <div className={styles.firstRow}>
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className={styles.backButton}
          >
            <ArrowCircleLeft height={26} width={26} />
          </div>
          <div className={styles.importBox}>
            <div className={styles.importTitle}>Import</div>

            <div
              className={styles.importTotalJobs}
              onDoubleClick={() => navigate("/import")}
            >
              Total No. of Jobs: {importdata.allStats.totalImpJobsCount}
              <RightArrow height={8} width={10} />
            </div>
          </div>
          <div className={styles.datePicker}>
            <div className={styles.DatePickerTitle}>Date: </div>
            <div className={styles.startEndDateContainer}>
              <Calendar onDateSelect={handleDateSelect} />
            </div>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div
            className={styles.firstBlock}
            onDoubleClick={() => navigate("/impCompletedOnTime")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Completed on Time</div>
                <div className={styles.firstBlockNo}>
                  {importdata.impStats.CompletedOnTimeCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.secondBlock}
            onDoubleClick={() => navigate("/impDelayedJobs")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Delayed Jobs</div>
                <div className={styles.secondBlockNo}>
                  {" "}
                  {importdata.impStats.DelayedCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.thirdBlock}
            onDoubleClick={() => navigate("/impOwnTransport")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Own Transportation</div>
                <div className={styles.thirdBlockNo}>
                  {importdata.impStats.OwnTransportJobCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.fourthBlock}
            onDoubleClick={() => navigate("/impOwnBooking")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Own Booking</div>
                <div className={styles.fourthBlockNo}>
                  {importdata.impStats.OwnBookingJobCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.fifthBlock}
            onDoubleClick={() => setCurrentPopup("Total No. of Containers")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Total No. of Containers</div>
                <div className={styles.fifthBlockNo}>
                  {importdata.impStats.TotalContainers}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
        </div>
        {/* Charts Division */}
        <div className={styles.thirdRow}>
          <div className={styles.chartContainer}>
            <SimpleLineChart
              data={processedCompletionData}
              xDataKey="month"
              lines={[
                {
                  dataKey: "completedOnTime",
                  name: "Completed On Time",
                  color: theme === "dark" ? "#8dcb93" : "#337039",
                },
                {
                  dataKey: "delayed",
                  name: "Delayed",
                  color: theme === "dark" ? "#60b6e8" : "#333d70",
                },
              ]}
              title="Job Timing vs Month"
              height={200}
            />
          </div>

          <div className={styles.chartContainer}>
            <SimpleBarChart
              data={importdata.chartData?.delayedMilestoneStats || []}
              xDataKey="tatimpcolumn"
              bars={[
                {
                  dataKey: "count",
                  name: "Number of Jobs",
                  fill: theme === "dark" ? "#e265dd" : "#823d7f",
                },
              ]}
              title="Delayed Milestone vs Number of Jobs"
              height={200}
            />
          </div>

          <div className={styles.chartContainer}>
            <SimpleLineChart
              data={processedConsignmentData}
              xDataKey="month"
              lines={[
                {
                  dataKey: "FCL",
                  name: "FCL",
                  color: theme === "dark" ? "#f07e84" : "#9C565A",
                },
                {
                  dataKey: "LCL",
                  name: "LCL",
                  color: theme === "dark" ? "#89e1f5" : "#4092A4",
                },
                {
                  dataKey: "BreakBulk",
                  name: "Break Bulk",
                  color: theme === "dark" ? "#f1da8b" : "#8E7B3A",
                },
              ]}
              title="Consignment Type vs Month"
              height={200}
            />
          </div>
        </div>
        <div className={styles.fourthRow}>
          <div
            className={styles.firstBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Transport Mode")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.firstBolckForthRowTitle}>
                Transport Mode
              </label>
              <ArrowCircleRight height={16} width={16} />
            </div>
          </div>
          <div
            className={styles.secondBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Consignment Type")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.secondBolckForthRowTitle}>
                Consignment Type
              </label>
              <ArrowCircleRight height={16} width={16} />
            </div>
          </div>
          <div
            className={styles.thirdBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Delivery Mode")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.thirdBolckForthRowTitle}>
                Delivery Mode
              </label>
              <ArrowCircleRight height={16} width={16} />
            </div>
          </div>
        </div>
        {currentPopup === "Transport Mode" && (
          <DashboardPopup
            title="Transport Mode"
            content={
              <div>
                <div>
                  <li>Air:</li>
                  <li>Sea:</li>
                </div>
                <div>
                  {" "}
                  <li>{importdata.impStats.AirTransportationCount}</li>
                  <li>{importdata.impStats.SeaTransportationCount}</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor=" var(--Card-Bg-9, #8E7B3A)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Total No. of Containers" && (
          <DashboardPopup
            title={`Total No. of Containers: ${importdata.impStats.TotalContainers}`}
            content={
              <div>
                <div>
                  <li>20' Container:</li>
                  <li>40' Container:</li>
                  <li>20' ISO Tank:</li>
                  <li>40' ISO Tank:</li>
                  <li>LCL:</li>
                  <li>Flat Bulk:</li>
                  <li>Break Bulk:</li>
                </div>
                <div>
                  {" "}
                  <li>{importdata.impStats.TwentyCount}</li>
                  <li>{importdata.impStats.FortyCount}</li>
                  <li>{importdata.impStats.TwentyISOCount}</li>
                  <li>{importdata.impStats.FortyISOCount}</li>
                  <li>{importdata.impStats.LCLCount}</li>
                  <li>{importdata.impStats.FlatBulkCount}</li>
                  <li>{importdata.impStats.BreakBulkCount}</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-4, #336C70)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Consignment Type" && (
          <DashboardPopup
            title="Consignment Type"
            content={
              <div>
                <div>
                  <li>FCL:</li>
                  <li>LCL:</li>
                  <li>Break Bulk:</li>
                </div>
                <div>
                  {" "}
                  <li>{importdata.impStats.FCLConsignmentCount}</li>
                  <li>{importdata.impStats.LCLConsignmentCount}</li>
                  <li>{importdata.impStats.BreakBulkConsignmentCount}</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-7, #4092A4)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Delivery Mode" && (
          <DashboardPopup
            title="Delivery Mode"
            content={
              <div>
                <div>
                  <li>Loaded:</li>
                  <li>Destuff:</li>
                </div>
                <div>
                  {" "}
                  <li>{importdata.impStats.LoadedDeliveryCount}</li>
                  <li>{importdata.impStats.DestuffDeliveryCount}</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg8, #823D7F)"
            textColor="text-white"
          />
        )}
      </div>
    </motion.div>
  );
}

export default impdetails;
