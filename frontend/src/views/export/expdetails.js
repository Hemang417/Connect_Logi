import React from "react";
import styles from "./css/expdetails.module.css";
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardPopup from "src/components/dashboardPopup/DashboardPopup";
import { useState, useEffect } from "react";
import axios from "axios";
import RightArrow from "../buttons/buttons/RightArrow";
import ArrowCircleRight from "../buttons/buttons/ArrowCircleRight";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import SimpleLineChart from "../charts/SimpleLineChart";
import SimpleBarChart from "../charts/SimpleBarChart";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

function expdetails() {
  const navigate = useNavigate();
  const [currentPopup, setCurrentPopup] = useState("");
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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);
  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [exportdata, setExportData] = useState({
    expStats: {},
    allStats: {},
    chartData: {
      monthlyCompletionStats: [],
      monthlyConsignmentStats: [],
      delayedMilestoneStats: [],
    },
  });
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const getExpstats = async () => {
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

      // console.log("Start Date:", startDate);
      // console.log("End Date:", endDate);

      // Use Promise.all to fetch both API calls simultaneously
      const [expStats, allStats] = await Promise.all([
        axios.get(`${API_BASE_URL}/getexpstats`, {
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
        expStats: expStats.data,
        allStats: allStats.data,
        chartData: expStats.data.chartData || {
          monthlyCompletionStats: [],
          monthlyConsignmentStats: [],
          delayedMilestoneStats: [],
        },
      };

      // Update state with the fetched data
      setExportData(combinedResponse);
      console.log("Combined Response:", combinedResponse);
    } catch (error) {
      console.log("Error fetching data:", error);
      console.error(error);
    }
  };

  useEffect(() => {
    getExpstats();
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
    exportdata.chartData?.monthlyCompletionStats?.map((item) => ({
      ...item,
      month: formatMonth(item.month),
    })) || [];

  const processedConsignmentData =
    exportdata.chartData?.monthlyConsignmentStats?.map((item) => ({
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
          <div className={styles.exportBox}>
            <div className={styles.exportTitle}>Export</div>
            <div
              className={styles.exportTotalJobs}
              onDoubleClick={() => navigate("/export")}
            >
              Total No. of Jobs: {exportdata.allStats.totalExpjobsCount}
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
            onDoubleClick={() => navigate("/expCompletedOnTime")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Completed on Time</div>
                <div className={styles.firstBlockNo}>
                  {exportdata.expStats.CompletedOnTimeCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.secondBlock}
            onDoubleClick={() => navigate("/expDelayedJobs")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Delayed Jobs</div>
                <div className={styles.secondBlockNo}>
                  {exportdata.expStats.DelayedCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.thirdBlock}
            onDoubleClick={() => navigate("/expOwnTransport")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Own Transportation</div>
                <div className={styles.thirdBlockNo}>
                  {exportdata.expStats.OwnTransportJobCount}
                </div>
              </div>
              <div className={styles.secondHalf}>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div
            className={styles.fourthBlock}
            onDoubleClick={() => navigate("/expOwnBooking")}
          >
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Own Booking</div>
                <div className={styles.fourthBlockNo}>
                  {exportdata.expStats.OwnBookingJobCount}
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
                  {exportdata.expStats.TotalContainers}
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
              data={exportdata.chartData?.delayedMilestoneStats || []}
              xDataKey="tatexpcolumn"
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
                  <li> {exportdata.expStats.AirTransportationCount}</li>
                  <li> {exportdata.expStats.SeaTransportationCount}</li>
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
            title="Total No. of Containers: 12"
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
                  <li>{exportdata.expStats.TwentyCount}</li>
                  <li>{exportdata.expStats.FortyCount}</li>
                  <li>{exportdata.expStats.TwentyISOCount}</li>
                  <li>{exportdata.expStats.FortyISOCount}</li>
                  <li>{exportdata.expStats.LCLCount}</li>
                  <li>{exportdata.expStats.FlatBulkCount}</li>
                  <li>{exportdata.expStats.BreakBulkCount}</li>
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
                  <li>{exportdata.expStats.FCLConsignmentCount}</li>
                  <li>{exportdata.expStats.LCLConsignmentCount}</li>
                  <li>{exportdata.expStats.BreakBulkConsignmentCount}</li>
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
                  <li>Factory Stuff:</li>
                  <li>Dock Stuff:</li>
                </div>
                <div>
                  {" "}
                  <li>{exportdata.expStats.FactoryStuffCount}</li>
                  <li>{exportdata.expStats.DockStuffCount}</li>
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

export default expdetails;
