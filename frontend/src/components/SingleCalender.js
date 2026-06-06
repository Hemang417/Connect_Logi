import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import "../css/Calendar.css";
import NewButton from "src/views/buttons/buttons/NewButton";
import "../css/SingleCalender.css";
import { createPortal } from "react-dom";

const SingleCalender = ({
  onDateSelect,
  width,
  height,
  value,
  readOnly,
  index,
  name,
  leftright,
  renderTime = false, // Default to true if not provided
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [isEditingMonthYear, setIsEditingMonthYear] = useState(false);
  const [monthYearInput, setMonthYearInput] = useState("");
  const inputRef = useRef(null);
  const calendarRef = useRef(null);
  const monthYearInputRef = useRef(null);
  const location = useLocation();
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
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

  const specialPaths = [
    // "/impdetails",
    // "/expdetails",
    // "/freightforwardingDetails",
    // "/accountsDetails",
    // "/transportDetails",
    // "/individualUserReport",
    // "/salesProspects",
    // "/salesEnquiry",
    // "/salesQuotations",
    // "/user_report",
    // "/Generate_Report",
  ];

  const specialPathsTwo = [
    "/impeditjob",
    "/impDelayedJobs",
    "/impcreatejob",
    "/PaymentSheetCredit",
    "/PaymentSheetCreditCreate",
    "/PaymentSheetDebitCreate",
    "/UserListAccess",
  ];

  useEffect(() => {
    if (value) {
      let dateObj;

      if (typeof value === "string" || typeof value === "number") {
        dateObj = new Date(value);
      } else if (value instanceof Date) {
        dateObj = value;
      }

      if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        setSelectedDate(dateObj);
      } else {
        console.warn("Invalid date value passed to SingleCalendar:", value);
      }
    }
  }, [value]);

  const toggleCalendar = () => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const calendarHeight = 300;
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;

      const shouldDropUp =
        spaceBelow < calendarHeight && spaceAbove > calendarHeight;
      setDropUp(shouldDropUp);

      // Calculate position based on drop direction
      const top = shouldDropUp
        ? inputRect.top - calendarHeight
        : inputRect.bottom;

      setCalendarPosition({
        top: top + window.scrollY, // account for scroll
        left: inputRect.left - 200, // account for horizontal scroll
      });
    }

    setShowCalendar(true);
  };

  useEffect(() => {
    const updatePosition = () => {
      if (inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        setCalendarPosition({
          // top: dropUp ? inputRect.top - 300 : inputRect.bottom,
          left: inputRect.left - 200,
        });
      }
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [dropUp]);

  const handleOutsideClick = (event) => {
    // Don't close if clicking on the month/year input
    if (
      monthYearInputRef.current &&
      monthYearInputRef.current.contains(event.target)
    ) {
      return;
    }

    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
      setIsEditingMonthYear(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const escBack = (e) => {
      if (e.key === "Escape") {
        setShowCalendar(false);
        setIsEditingMonthYear(false);
      }
    };

    window.addEventListener("keydown", escBack);

    return () => {
      window.removeEventListener("keydown", escBack);
    };
  }, [showCalendar]);

  // Focus the input when editing mode is activated and maintain focus
  useEffect(() => {
    if (isEditingMonthYear && monthYearInputRef.current) {
      monthYearInputRef.current.focus();
      monthYearInputRef.current.select();

      // Maintain focus by refocusing if it gets lost
      const maintainFocus = () => {
        if (
          isEditingMonthYear &&
          monthYearInputRef.current &&
          document.activeElement !== monthYearInputRef.current
        ) {
          monthYearInputRef.current.focus();
        }
      };

      const intervalId = setInterval(maintainFocus, 100);

      return () => clearInterval(intervalId);
    }
  }, [isEditingMonthYear]);

  const clearDate = () => {
    setSelectedDate(null);
    // Call onDateSelect with the expected signature
    if (onDateSelect) {
      onDateSelect(
        {
          target: {
            name: name,
            value: "",
          },
        },
        index
      );
    }
  };

  // Format date for display
  const formatDisplayDate = (date) => {
    if (!date) return "";

    if (renderTime) {
      return moment(date).format("DD/MM/YYYY hh:mm A");
    } else {
      return moment(date).format("DD/MM/YYYY");
    }
  };

  // Returns format suitable for type="datetime-local"
  const formatDateTimeLocal = (date) => {
    if (!date) return "";
    if (renderTime) {
      return moment(date).format("YYYY-MM-DD HH:mm A");
    } else {
      return moment(date).format("YYYY-MM-DD");
    }
  };

  // Handle month/year editing
  const handleMonthYearClick = () => {
    const currentDate = selectedDate || new Date();
    setMonthYearInput(moment(currentDate).format("MM/YYYY"));
    setIsEditingMonthYear(true);
  };

  const handleMonthYearSubmit = () => {
    // Add a flag to track if we've already shown an error
    let hasShownError = false;

    try {
      // Parse the input (expecting MM/YYYY or MM-YYYY format)
      const input = monthYearInput.trim();
      let parsedDate;

      if (input.includes("/")) {
        const [month, year] = input.split("/");
        parsedDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      } else if (input.includes("-")) {
        const [month, year] = input.split("-");
        parsedDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      } else {
        // Try to parse as just year
        if (input.length === 4 && !isNaN(input)) {
          const currentMonth = selectedDate
            ? selectedDate.getMonth()
            : new Date().getMonth();
          parsedDate = new Date(parseInt(input), currentMonth, 1);
        } else {
          throw new Error("Invalid format");
        }
      }

      if (
        !isNaN(parsedDate.getTime()) &&
        parsedDate.getFullYear() >= 1900 &&
        parsedDate.getFullYear() <= 2100
      ) {
        // If we have a selected date, preserve the day and time
        if (selectedDate) {
          const newDate = new Date(selectedDate);
          newDate.setFullYear(parsedDate.getFullYear());
          newDate.setMonth(parsedDate.getMonth());
          setSelectedDate(newDate);
        } else {
          setSelectedDate(parsedDate);
        }
        setIsEditingMonthYear(false); // Close the input on success
      } else {
        if (!hasShownError) {
          hasShownError = true;
          toast.error(
            "Please enter a valid month/year (MM/YYYY format, year between 1900-2100)"
          );
        }
        return;
      }
    } catch (error) {
      if (!hasShownError) {
        hasShownError = true;
        toast.error(
          "Please enter a valid month/year in MM/YYYY format (e.g., 05/2005)"
        );
      }
      return;
    }
  };

  const handleMonthYearKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMonthYearSubmit();
    } else if (e.key === "Escape") {
      setIsEditingMonthYear(false);
      setMonthYearInput(""); // Clear the input when escaping
    }
  };
  // Render time in the custom dropdown format
  const renderTimeSelect = (rendertime) => {
    if (!selectedDate) return null;

    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

    const handleTimeChange = (newHour, newMinute, newPeriod) => {
      const newDate = new Date(selectedDate);
      let hours = parseInt(newHour);

      if (newPeriod === "PM" && hours !== 12) hours += 12;
      if (newPeriod === "AM" && hours === 12) hours = 0;

      newDate.setHours(hours);
      newDate.setMinutes(parseInt(newMinute));

      setSelectedDate(newDate);

      // Call onDateSelect with the expected signature for handleChange
      if (onDateSelect) {
        onDateSelect(
          {
            target: {
              name: name,
              value: formatDateTimeLocal(newDate),
            },
          },
          index
        );
      }
    };
    console.log("rendertime", rendertime);

    if (rendertime) {
      return (
        <div className="custom-time-selection">
          <div className="time-label">Time:</div>
          <div className="time-controls">
            <select
              value={hour12}
              onChange={(e) =>
                handleTimeChange(e.target.value, minutes, period)
              }
              className="time-select"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}
                </option>
              ))}
            </select>

            <span className="time-separator">:</span>

            <select
              value={minutes}
              onChange={(e) => handleTimeChange(hour12, e.target.value, period)}
              className="time-select"
            >
              <div style={{ height: "100px", overflowX: "scroll" }}>
                {minuteOptions.map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}
                  </option>
                ))}
              </div>
            </select>

            <div className="period-buttons">
              <button
                type="button"
                className={`period-btn ${period === "AM" ? "active" : ""}`}
                onClick={() => handleTimeChange(hour12, minutes, "AM")}
              >
                AM
              </button>
              <button
                type="button"
                className={`period-btn ${period === "PM" ? "active" : ""}`}
                onClick={() => handleTimeChange(hour12, minutes, "PM")}
              >
                PM
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date && onDateSelect) {
      // Call onDateSelect with the expected signature for handleChange
      onDateSelect(
        {
          target: {
            name: name,
            value: formatDateTimeLocal(date),
          },
        },
        index
      );
    }
  };

  const handleSave = () => {
    if (selectedDate && onDateSelect) {
      // Ensure the final value is saved when Save button is clicked
      onDateSelect(
        {
          target: {
            name: name,
            value: formatDateTimeLocal(selectedDate),
          },
        },
        index
      );
    }
    setShowCalendar(false);
  };

  // Custom DatePicker with clickable month/year header
  const CustomDatePicker = () => {
    return (
      <div style={{ position: "relative" }}>
        {/* Only render DatePicker if not editing month/year to prevent focus loss */}
        {/* {!isEditingMonthYear && ( */}
        <DatePicker
          popperClassName="SingleCalPopup"
          name={name}
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          showTimeSelect={false}
          dateFormat="MMMM d, yyyy"
          monthsShown={1}
          className="custom-datepicker"
        />
        {/* )} */}

        {/* Show a static calendar header while editing */}
        {/* {isEditingMonthYear && (
          <div style={{
            width: '100%',
            height: '250px', // Approximate height of the calendar
            backgroundColor: 'transparent',
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#6c757d'
          }}>
            Please enter month/year above
          </div>
        )} */}

        {/* Overlay for clickable month/year - only show when not editing */}
        {!isEditingMonthYear && (
          <div
            onClick={handleMonthYearClick}
            style={{
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              padding: "2px 8px",
              borderRadius: "4px",
              backgroundColor: "transparent",
              zIndex: 10,
              fontSize: "14px",
              height: "31px",
              fontWeight: "bold",
              color: "white",
              minWidth: "120px",
              textAlign: "center",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
            title="Click to edit month/year"
          >
            {/* This div acts as a clickable overlay over the month/year display */}
          </div>
        )}

        {/* Month/Year input overlay */}
        {isEditingMonthYear && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              backgroundColor: theme === "dark" ? "#101322" : "#1E2652",
              border: "2px solid #007bff",
              borderRadius: "4px",
              // padding: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              color: "white",
            }}
          >
            <input
              ref={monthYearInputRef}
              type="text"
              value={monthYearInput}
              onChange={(e) => setMonthYearInput(e.target.value)}
              onKeyDown={handleMonthYearKeyPress}
              onBlur={handleMonthYearSubmit}
              placeholder="MM/YYYY"
              style={{
                border: "none",
                outline: "none",
                textAlign: "center",
                fontSize: "14px",
                width: "100px",
                padding: "4px 4px",
                backgroundColor: "transparent",
                fontWeight: "bold",
                color: "white",
              }}
              autoComplete="off"
            />
            {/* <div style={{
              fontSize: '10px',
              color: '#666',
              textAlign: 'center',
              marginTop: '2px'
            }}>
              Enter to save, Esc to cancel
            </div> */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "0px",
        margin: "0px",
        width: "fit-content",
      }}
    >
      <div
        className="start-date-end-date-container"
        style={{ display: "flex", gap: "10px", width: "fit-content" }}
      >
        <input
          ref={inputRef}
          className={"start-date-end-date"}
          type="text"
          disabled={readOnly ? readOnly : false}
          value={
            value
              ? formatDisplayDate(value)
              : selectedDate
              ? formatDisplayDate(selectedDate)
              : ""
          }
          placeholder="Select Date"
          readOnly
          onClick={() => {
            if (!readOnly) {
              setShowCalendar(true);
              toggleCalendar();
            }
          }}
          style={{
            height: height ? height : "31px",
            width: width ? width : "150px",
            textAlign: "center",
            fontSize: "12px",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "5px",
            cursor: readOnly ? "default" : "pointer",
            backgroundColor: "transparent",
          }}
        />
        <div
          style={{
            cursor: readOnly ? "default" : "pointer",
            marginLeft: "5px",
            marginTop: "-3px",
            opacity: readOnly ? 0.5 : 1,
          }}
          onClick={readOnly ? null : clearDate}
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

      {showCalendar &&
        !readOnly &&
        createPortal(
          <div
            ref={calendarRef}
            className={`
        ${leftright === "left" ? "singleCalenderPopupLeft" : ""}
        ${leftright === "rigth" ? "singleCalenderPopupRight" : ""}
        ${dropUp ? "calendar-drop-up" : "calendar-drop-down"}
      `}
            style={{
              position: "absolute",
              top: `${calendarPosition.top}px`,
              left: `${calendarPosition.left}px`,
              zIndex: 9999,
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <div className="SingleCalContainer">
              <CustomDatePicker />

              {renderTimeSelect(renderTime)}
              {selectedDate && (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                  onClick={handleSave}
                >
                  <NewButton text={"Close"} />
                </span>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SingleCalender;
