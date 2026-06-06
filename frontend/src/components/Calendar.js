import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useLocation } from "react-router-dom";
import "../css/Calendar.css"; // Custom styles

const Calendar = ({ onDateSelect }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [presetValue, setpresetValue] = useState(false);
  const inputRef = useRef(null);
  const endDateFocus = useRef(null);
  const location = useLocation();

  const calendarRef = useRef(null);

  const specialPaths = [
    "/impdetails",
    "/expdetails",
    "/freightforwardingDetails",
    "/accountsDetails",
    "/transportDetails",
    "/individualUserReport",
    "/salesProspects",
    "/salesEnquiry",
    "/salesQuotations",
    "/user_report",
    "/Generate_Report",
  ]; // shifts to left
  const specialPathsTwo = [
    "/impDelayedJobs",
    "/expDelayedJobs",
    "/expCompletedOnTime",
    "/impCompletedOnTime",
    "/approverlog",
    "/recyclebin",
    "/import",
    "/export",
    "/PaymentSheetCredit",
    "/passReq",
    "/PaymentSheetDebit",
  ]; // shifts to right
  const presets = [
    {
      text: "Custom",
      start: "custom",
      end: "custom",
    },
    {
      text: "Today",
      start: moment().startOf("day"), // Start of day
      end: moment().endOf("day"), // End of day
    },
    {
      text: "This Week",
      start: moment().startOf("week"),
      end: moment().endOf("week"),
    },
    {
      text: "Last Week",
      start: moment().subtract(1, "weeks").startOf("week"),
      end: moment().subtract(1, "weeks").endOf("week"),
    },
    {
      text: "This Month",
      start: moment().startOf("month"),
      end: moment().endOf("month"),
    },
    {
      text: "Last Month",
      start: moment().subtract(1, "months").startOf("month"),
      end: moment().subtract(1, "months").endOf("month"),
    },
    {
      text: "This Calendar Year",
      start: moment().startOf("year"),
      end: moment().endOf("year"),
    },
    {
      text: "Last Calendar Year",
      start: moment().subtract(1, "year").startOf("year"),
      end: moment().subtract(1, "year").endOf("year"),
    },
    {
      text: "This Fiscal Year",
      start:
        moment().month() < 3
          ? moment().subtract(1, "year").month(3).startOf("month") // April 1 of last year
          : moment().month(3).startOf("month"), // April 1 of this year
      end:
        moment().month() < 3
          ? moment().month(2).endOf("month") // March 31 of this year
          : moment().add(1, "year").month(2).endOf("month"), // March 31 of next year
    },
    {
      text: "Last Fiscal Year",
      start:
        moment().month() < 3
          ? moment().subtract(2, "year").month(3).startOf("month") // April 1, 2 years ago
          : moment().subtract(1, "year").month(3).startOf("month"), // April 1, last year
      end:
        moment().month() < 3
          ? moment().subtract(1, "year").month(2).endOf("month") // March 31, last year
          : moment().month(2).endOf("month"), // March 31, this year
    },
  ];

  // Handle clicks outside to close the calendar
  const handleOutsideClick = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
      setpresetValue(false);
    }
  };
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Moves focus to the input field
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const escBack = (e) => {
      if (e.key === "Escape") {
        setShowCalendar(false);
      }
    };

    window.addEventListener("keydown", escBack);

    return () => {
      window.removeEventListener("keydown", escBack);
    };
  }, [showCalendar]);

  useEffect(() => {
    if (presetValue) {
      handleClick(); // This will run AFTER presetValue is updated
    }
  }, [presetValue]);
  // Handle preset selection
  const handlePresetSelection = (preset) => {
    if (preset.start === "custom") {
      setpresetValue(true);
    } else {
      const adjustedEnd = adjustToEndOfDay(preset.end.toDate());
      setStartDate(preset.start.toDate());
      setEndDate(adjustedEnd);
      onDateSelect(preset.start.toDate(), adjustedEnd);
      setShowCalendar(false);
      setpresetValue(false);
    }
  };

  // Helper function to adjust date to end of day
  const adjustToEndOfDay = (date) => {
    if (!date) return null;
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    onDateSelect(null, null);
  };

  return (
    <div style={{ position: "relative", padding: "0px", margin: "0px" }}>
      {/* Start and End Date Input Fields */}
      {console.log("month start", moment().startOf("year").add(3, "months"))}
      {console.log("month end", moment().endOf("year").add(3, "months"))}
      <div
        className="start-date-end-date-container"
        style={{ display: "flex", gap: "10px" }}
      >
        <input
          className={
            specialPaths.includes(location.pathname)
              ? "start-date-end-date"
              : specialPathsTwo.includes(location.pathname)
              ? "start-date-end-date"
              : "none"
          }
          type="text"
          value={startDate ? moment(startDate).format("DD/MM/YYYY") : ""}
          placeholder="Start Date"
          readOnly
          onClick={() => setShowCalendar(true)}
          style={{
            height: "31px",
            width: "100px",
            textAlign: "center",
            fontSize: "12px",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
        />
        <input
          className={
            specialPaths.includes(location.pathname)
              ? "start-date-end-date"
              : specialPathsTwo.includes(location.pathname)
              ? "start-date-end-date"
              : "none"
          }
          type="text"
          value={endDate ? moment(endDate).format("DD/MM/YYYY") : ""}
          placeholder="End Date"
          readOnly
          onClick={() => setShowCalendar(true)}
          style={{
            height: "31px",
            width: "100px",
            textAlign: "center",
            fontSize: "12px",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
        />
        <div
          style={{ cursor: "pointer", marginLeft: "5px", marginTop: "-3px" }}
          onClick={clearDates}
        >
          <svg
            className="cross-btn"
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="cancelIconTitle"
            stroke="#000000"
            strokeWidth="0.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
            color="#000000"
          >
            <title id="cancelIconTitle">Cancel</title>
            <path d="M15.5355339 15.5355339L8.46446609 8.46446609M15.5355339 8.46446609L8.46446609 15.5355339"></path>
            <path d="M4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C8.83417511,1.02368927 15.1658249,1.02368927 19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C15.1658249,22.9763107 8.83417511,22.9763107 4.92893219,19.0710678 Z"></path>
          </svg>
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div
          className={
            specialPaths.includes(location.pathname)
              ? "CalenderPopupLeft"
              : specialPathsTwo.includes(location.pathname)
              ? "CalenderPopupRight"
              : "CalendarPopup"
          }
          ref={calendarRef}
        >
          {/* DatePicker Component */}
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
              if (start && end) {
                // Adjust end date to end of day
                const adjustedEnd = adjustToEndOfDay(end);
                onDateSelect(start, adjustedEnd);
                setShowCalendar(false);
              }
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={2}
            style={{ gap: "0px !important" }}
          />

          {presetValue && (
            <>
              <div className="custom-input-container">
                <input
                  className="custom-date-input"
                  placeholder="Start date"
                  ref={inputRef}
                  type="date"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      endDateFocus.current.focus();
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setStartDate(new Date(value));
                    } else {
                      setStartDate(null); // or handle empty date cases gracefully
                    }
                  }}
                ></input>

                <input
                  className="custom-date-input"
                  placeholder="End date"
                  type="date"
                  ref={endDateFocus}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowCalendar(false);
                      // Adjust end date to end of day
                      const adjustedEnd = adjustToEndOfDay(endDate);
                      onDateSelect(startDate, adjustedEnd);
                      setpresetValue(false);
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      setEndDate(new Date(value));
                    } else {
                      setEndDate(null);
                    }
                  }}
                ></input>
              </div>
            </>
          )}

          {/* Preset Buttons */}
          <div className="preset-divider">
            <div className="d-grid gap-1 d-md-block " id="calender">
              {presets.map((preset) => (
                <button
                  className="preset-buttons"
                  key={preset.text}
                  onClick={() => handlePresetSelection(preset)}
                >
                  {preset.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
