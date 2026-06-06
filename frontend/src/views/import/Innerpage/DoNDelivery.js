import React, { useEffect, useState } from "react";
import axios from "axios";
import NewButton from "src/views/buttons/buttons/NewButton";
import moment from "moment";
import { motion } from "framer-motion";
import SingleCalender from "src/components/SingleCalender";
import {
  CCardBody,
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/import-styles.css";
import API_BASE_URL from "src/config/config";

const DoNDelivery = ({ data, setData }) => {
  const [allLobData, setAllLobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualDate, setManualDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const contactFields = [{ id: "branchName", label: "Branch Name" }];

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

  useEffect(() => {
    console.log("Data received in DoND component:", data);
  }, [data]);

  const [formData, setFormData] = useState({
    OwnBookings: "",
    OwnTransport: "",
    betype: "",
    consignmenttype: "",
    modeoftransport: "",
    jobdate: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        OwnBookings: data.ownBooking || "",
        OwnTransport: data.ownTransportation || "",
        betype: data.beType || "",
        consignmenttype: data.consignmentType || "",
        modeoftransport: data.transportMode
          ? `${data.transportMode} Import`
          : "",
        jobdate: data.jobDate || "",
      });
    }
  }, [data]);

  const handleDateSelect2 = (e, index) => {
    const newPlanDate = moment(e.target.value, "YYYY-MM-DDTHH:mm").toDate();
    handleManualDateChange(index, newPlanDate);
  };

  const readAllSpecificLobData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getValidWorkflowsForJob`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            lobname: formData.modeoftransport,
            ownbranchname: localStorage.getItem("branchnameofemp"),
            jobnumber: jobNumber,
            importername: localStorage.getItem("importernameofjob"),
            ownbooking: formData.OwnBookings,
            owntransportation: formData.OwnTransport,
            betype: formData.betype,
            consignmenttype: formData.consignmenttype,
          },
        }
      );

      console.log("Workflow Response data:", response.data);

      // Initialize updatedData with workflow data
      let updatedData = response.data.map((item) => ({
        ...item,
        status: item.actualdate ? "Completed" : "Pending",
        remarks: item.remarks || "",
      }));

      // Fetch completed tracking data
      const completedTrackingResponse = await axios.get(
        `${API_BASE_URL}/Getcompletedrowsofthatjobandbranchandlob`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            jobnumber: jobNumber,
          },
        }
      );

      console.log(
        "Completed Tracking Response data:",
        completedTrackingResponse.data
      );

      // Merge the two datasets
      completedTrackingResponse.data.forEach((trackingItem) => {
        const index = updatedData.findIndex(
          (workflowItem) =>
            workflowItem.workflowname === trackingItem.tatimpcolumn
        );
        if (index > -1) {
          // Save the existing workflow item with tracking data
          updatedData[index] = {
            ...updatedData[index],
            planDate: trackingItem.plandate,
            actualdate: trackingItem.actualdate,
            status: trackingItem.actualdate ? "Completed" : "Pending",
            timing: trackingItem.timing,
            timedelay: trackingItem.timedelay,
            remarks: trackingItem.remarks,
          };
        }
      });

      // Calculate plan dates based on the workflow milestones
      updatedData = updatedData.map((item) => {
        if (item.workflowmilestone === "Job Creation Date") {
          const jobDate = new Date(formData.jobdate);
          const { days, hours, minutes } = item;
          let planDate = new Date(jobDate);

          if (item.duration === "After") {
            planDate.setDate(planDate.getDate() + parseInt(days));
            planDate.setHours(planDate.getHours() + parseInt(hours));
            planDate.setMinutes(planDate.getMinutes() + parseInt(minutes));
          } else if (item.duration === "Before") {
            planDate.setDate(planDate.getDate() - parseInt(days));
            planDate.setHours(planDate.getHours() - parseInt(hours));
            planDate.setMinutes(planDate.getMinutes() - parseInt(minutes));
          }
          return { ...item, planDate };
        }
        return item;
      });

      // Save state with the merged data
      setAllLobData(updatedData);
      console.log("Merged and updated data set in state:", updatedData);

      // Handle reminders
      const reminders = updatedData
        .filter(
          (item) =>
            item.reminderdays !== null &&
            item.reminderhours !== null &&
            item.reminderminutes !== null &&
            item.status === "Pending"
          // &&
          // new Date(item.planDate) > new Date()
        )
        .map((item) => {
          const reminderDate = calculateReminderTimes(
            item.planDate,
            item.reminderdays,
            item.reminderhours,
            item.reminderminutes
          );
          return {
            ...item,
            reminderdate: reminderDate,
            users: item.assignedperson,
            ownbranchname: localStorage.getItem("branchnameofemp"),
          };
        });

      try {
        const reminderinserted = await axios.post(
          `${API_BASE_URL}/insertreminder`,
          {
            reminders: reminders,
            jobnumber: jobNumber,
          }
        );
      } catch (error) {
        console.error("Failed to insert reminders:", error);
      }

      localStorage.setItem("reminders", JSON.stringify(reminders));
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      throw error; // Re-throw the error to be caught by the useEffect
    }
  };

  useEffect(() => {
    if (formData.modeoftransport) {
      setLoading(true);
      setError(null);
      readAllSpecificLobData()
        .then(() => setLoading(false))
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [formData, jobNumber]);

  useEffect(() => {
    console.log("Current allLobData state after update:", allLobData);
  }, [allLobData]);

  const calculateReminderTimes = (
    planDate,
    reminderdays,
    reminderhours,
    reminderminutes
  ) => {
    const reminderDate = new Date(planDate);
    reminderDate.setDate(reminderDate.getDate() - parseInt(reminderdays));
    reminderDate.setHours(reminderDate.getHours() - parseInt(reminderhours));
    reminderDate.setMinutes(
      reminderDate.getMinutes() - parseInt(reminderminutes)
    );
    return reminderDate;
  };

  const calculatePlanDate = (referenceDate, days, hours, minutes, duration) => {
    const milestoneDays = parseInt(days);
    const milestoneHours = parseInt(hours);
    const milestoneMinutes = parseInt(minutes);

    let planDate = new Date(referenceDate);

    if (duration === "After") {
      planDate.setDate(planDate.getDate() + milestoneDays);
      planDate.setHours(planDate.getHours() + milestoneHours);
      planDate.setMinutes(planDate.getMinutes() + milestoneMinutes);
    } else if (duration === "Before") {
      planDate.setDate(planDate.getDate() - milestoneDays);
      planDate.setHours(planDate.getHours() - milestoneHours);
      planDate.setMinutes(planDate.getMinutes() - milestoneMinutes);
    }
    console.log("Calculated plan date:", planDate);
    return planDate;
  };

  const handleManualDateChange = async (index, newPlanDate) => {
    const updatedData = [...allLobData];

    // Check if plan date change is allowed
    if (updatedData[index].plandatechange !== 1) {
      toast.error("Date change not allowed for this milestone");
      return;
    }

    updatedData[index].planDate = newPlanDate;
    // updatedData[index].status = 'Pending';

    // const dependencies = [];
    // Save dependent milestones immediately
    const updateDependencies = (currentMilestone, currentPlanDate) => {
      updatedData.forEach((item, i) => {
        if (item.workflowmilestone === currentMilestone) {
          const newPlanDateForDependent = calculatePlanDate(
            currentPlanDate,
            item.days,
            item.hours,
            item.minutes,
            item.duration
          );

          // Only update if the new date is different
          if (updatedData[i].planDate !== newPlanDateForDependent) {
            updatedData[i].planDate = newPlanDateForDependent;
            updateDependencies(item.workflowname, newPlanDateForDependent);
          }
        }
      });
    };

    // Start cascading updates for dependencies
    updateDependencies(updatedData[index].workflowname, newPlanDate);

    setAllLobData(updatedData);
    setManualDate(newPlanDate);

    // console.log('dependencies', dependencies);
    console.log("Updated data after manual date change:", updatedData);
    // setAllLobData(updatedData);

    // Save the backend
    try {
      const updatePromises = updatedData.map((item) =>
        axios
          .put(`${API_BASE_URL}/sendmanualdate`, {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            ownbranchname: localStorage.getItem("branchnameofemp"),
            lobname: formData.modeoftransport,
            workflowname: item.workflowname,
            plandate: moment(item.planDate).format("YYYY-MM-DDTHH:mm"),
            days: item.days,
            hours: item.hours,
            minutes: item.minutes,
            username: localStorage.getItem("username"),
            jobnumber: jobNumber,
            ownbranchcode: localStorage.getItem("branchcodeofemp"),
            clientName: localStorage.getItem("importernameofjob"),
          })
          .then(() => {
            console.log(`Plan date updated successfully`);
          })
          .catch((error) => {
            console.error(`Error updating plan date`, error);
            toast.error(`Failed to update plan date for ${item.workflowname}`);
          })
      );
      toast.success(`Plan date updated successfully`);
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating selected milestone date:", error);
      toast.error("Failed to update milestone date");
    }
  };

  const isEditable = (item) => {
    try {
      if (localStorage.getItem("username") === "admin") {
        return false;
      } else {
        if (item.assignedperson.length === 1) {
          return (
            item.assignedperson[0].username !== localStorage.getItem("username")
          );
        } else if (item.assignedperson.length > 1) {
          const assignedPerson = item.assignedperson.find(
            (person) => person.username === localStorage.getItem("username")
          );
          return !assignedPerson;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleCheckboxChange = async (index) => {
    try {
      const newData = [...allLobData];
      const isChecked = newData[index].status === "Completed";

      if (isChecked) {
        // If the checkbox was checked, remove the status, actual date, and time delay
        newData[index].status = "Pending";
        newData[index].actualdate = "";
        newData[index].timedelay = "";
        newData[index].timing = "";
        newData[index].remarks = "";

        // Save the state with the modified data
        setAllLobData(newData);

        // Send a request to update the backend
        try {
          await axios.put(`${API_BASE_URL}/deleteCompletedRow`, {
            data: {
              row: newData[index],
              jobnumber: jobNumber,
              jobdoneby: localStorage.getItem("username"),
              ownbranchcode: localStorage.getItem("branchcodeofemp"),
              importername: localStorage.getItem("importernameofjob"),
            },
          });
        } catch (e) {
          console.log("error --> ", e);
        }
      } else {
        // If the checkbox was unchecked, set actual date and status to 'Completed'
        newData[index].actualdate = moment().format("YYYY-MM-DDTHH:mm");
        newData[index].status = "Completed";

        // Convert actualDate and planDate to Date objects
        const actualDate = new Date(newData[index].actualdate);
        const planDate = new Date(newData[index].planDate);

        // Calculate the difference in milliseconds
        const timeDifference = actualDate - planDate;

        // Convert milliseconds to days and hours
        const days = Math.floor(
          Math.abs(timeDifference) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (Math.abs(timeDifference) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        // Store the time delay in the format "X Days Y Hours"
        newData[index].timedelay = `${days} Days ${hours} Hours`;

        if (timeDifference > 0) {
          newData[index].timing = `After`;
        } else {
          newData[index].timing = `Before`;
        }

        // Save the state with the modified data
        setAllLobData(newData);

        // Send a request to update the backend
        await axios.post(`${API_BASE_URL}/insertCompletedRow`, {
          row: newData[index],
          jobnumber: jobNumber,
          jobdoneby: localStorage.getItem("username"),
          ownbranchcode: localStorage.getItem("branchcodeofemp"),
          importername: localStorage.getItem("importernameofjob"),
        });

        // setAllLobData(newData);

        // readAllSpecificLobData();
        const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        const updatedReminders = reminders.filter(
          (reminder) => reminder.workflowname !== newData[index].workflowname
        );
        localStorage.setItem("reminders", JSON.stringify(updatedReminders));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //  readAllSpecificLobData();

  const handleRemarkChange = (index, event) => {
    const newData = [...allLobData];
    newData[index].remarks = event.target.value;
    setAllLobData(newData);
    console.log("Updated allLobData:", newData);
  };

  async function remarkstoreofimport(e) {
    e.preventDefault();
    try {
      const lobDataWithRemarks = allLobData.filter((item) =>
        item.hasOwnProperty("remarks")
      );
      console.log(
        "Data being sent:",
        JSON.stringify(lobDataWithRemarks, null, 2)
      );

      await axios.post(`${API_BASE_URL}/updateRemarkinthatrow`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        data: lobDataWithRemarks,
        jobnumber: jobNumber,
      });

      toast.success("Remarks stored successfully");
    } catch (error) {
      console.log(error);
      toast.error("Remarks stored unsuccessfully");
    }
  }
  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };
  return (
    console.log("Formdata", formData),
    (
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        {/* <div className="tracking-container"> */}
          <div className="mb-2 container-div">
            <div style={{ width: "100%" }}>
              <CCardBody>
                <div className="left-div-table">
                  <table
                    className="border-separate"
                    style={{
                      // marginTop: "12px",
                      borderCollapse: "separate",
                      borderSpacing: "0 8px",
                      tableLayout: "auto",
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
                      <tr className="c-table-head-row" color="dark">
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "140px", textAlign: "center" }}
                        >
                          Type of Milestone
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "100px", textAlign: "center" }}
                        >
                          TAT
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "190px", textAlign: "center" }}
                        >
                          Plan Date
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "100px", textAlign: "center" }}
                        >
                          Actual Date
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ maxWidth: "20px", textAlign: "center" }}
                        ></th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "100px", textAlign: "center" }}
                        >
                          Timing
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "10px", textAlign: "center" }}
                        >
                          Time Delay
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "100px", textAlign: "center" }}
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="row-font px-1 py-2 rounded-lg"
                          style={{ minWidth: "100px", textAlign: "center" }}
                        >
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allLobData.length > 0 ? (
                        allLobData.map((item, index) => (
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
                          >
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              {item.workflowname}
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              <input
                                type="text"
                                placeholder="00d:00h:00m"
                                className="o2d-field-5"
                                value={
                                  item.days
                                    ? `${item.days} days ${item.hours} hrs ${item.minutes} mins`
                                    : `00 days: 00 hrs : 00 mins`
                                }
                                readOnly
                              />
                            </td>

                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              <SingleCalender
                                onDateSelect={handleDateSelect2}
                                value={
                                  item.planDate
                                    ? moment(item.planDate).format(
                                      "YYYY-MM-DDTHH:mm"
                                    )
                                    : ""
                                }
                                readOnly={
                                  item.plandatechange === 1 ? false : true
                                }
                                index={index}
                              />
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              <input
                                type="datetime-local"
                                placeholder=""
                                className="o2d-field-4"
                                value={
                                  item.actualdate
                                    ? moment(item.actualdate).format(
                                      "YYYY-MM-DDTHH:mm"
                                    )
                                    : ""
                                }
                                readOnly
                              />
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ maxWidth: "10px", minWidth: "24px" }}
                            >
                              <input
                                type="checkbox"
                                placeholder=""
                                className="o2d-field-check-box"
                                checked={
                                  item.status === "Completed" &&
                                  item.actualdate !== "" &&
                                  item.timedelay !== ""
                                }
                                onChange={() => handleCheckboxChange(index)}
                                disabled={isEditable(item)}
                              />
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{
                                minWidth: "100px",
                              }}
                            >
                              <input
                                type="text"
                                placeholder=""
                                className="o2d-field-7"
                                value={item.timing ? item.timing : "N/A"}
                              />
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              {/* {" "} */}
                              <input
                                type="text"
                                placeholder="time delay"
                                className="o2d-field-8"
                                value={item.timedelay ? item.timedelay : "N/A"}
                              />
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              {item.status}
                            </td>
                            <td
                              className="td-accounts px-1 py-2 rounded-lg"
                              style={{ minWidth: "100px" }}
                            >
                              <textarea
                                className="o2d-field-remark "
                                value={item.remarks || ""}
                                onChange={(event) =>
                                  handleRemarkChange(index, event)
                                }
                              ></textarea>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? "#263A52" // Dark mode odd row
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
                        >
                          <td
                            colSpan={9}
                            className="td-accounts px-1 py-2 rounded-lg"
                          >
                            No workflow available for this job
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CCardBody>
            </div>
          </div>
        {/* </div> */}
        <div className="all-buttons">
          <div className="search-button" onClick={remarkstoreofimport}>
            <NewButton width={"120px"} text={"Save"} />
          </div>

          <div
            className="search-button"
            onClick={() => {
              remarkstoreofimport;
              toast.success("Updated Successfully");
              navigate("/impcreatejob");
            }}
          >
            <NewButton width={"120px"} text={"Save & New"} />
          </div>

          <div
            className="search-button"
            onClick={() => {
              remarkstoreofimport;
              toast.success("Updated Successfully");
              handleClose();
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
      </motion.div>
    )
  );
};

export default DoNDelivery;
