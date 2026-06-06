import React from "react";
import moment from "moment";

export const DatePresets = ({ startDate, endDate, showDateFormat, handlePresets, focusStartDateInput }) => {
  const today = moment();

  const presets = [
    {
      text: "Today",
      start: today,
      end: today,
    },
    {
      text: "This Week",
      start: today.clone().startOf("week"),
      end: today.clone().endOf("week"),
    },
    {
      text: "Last Week",
      start: today.clone().subtract(1, "weeks").startOf("week"),
      end: today.clone().subtract(1,"weeks").endOf("week"),
    },
    {
      text: "This Month",
      start: today.clone().startOf("month"),
      end: today.clone().endOf("month"),
    },
    {
      text: "Last Month",
      start: today.clone().subtract(1, "months").startOf("month"),
      end: today.clone().subtract(1,"months").endOf("month"),
    },
    {
      text: "This Calendar Year",
      start: today.clone().startOf("year"),
      end: today.clone().endOf("year"),
    },
    {
      text: "Last Calendar Year",
      start: today.clone().subtract(1, "year").startOf("year"),
      end: today.clone().subtract(1, "year").endOf("year"),
    },
    {
      text: "This Fiscal Year",
      start: today.month() < 4
        ? today.clone().subtract(1, "year").startOf("year").add(3, "months")
        : today.clone().startOf("year").add(3, "months"),
      end: today.month() < 4
        ? today.clone().subtract(1, "year").endOf("year").add(3, "months")
        : today.clone().endOf("year").add(3, "months"),
    },
    {
      text: "Last Fiscal Year",
      start: today.month() < 4 
      ? today.clone().subtract(2, "year").startOf("year").add(3, "months")
      : today.clone().subtract(1, "year").startOf("year").add(3, "months"),
      end: today.month() < 4 
      ? today.clone().subtract(2, "year").endOf("year").add(3, "months") 
      : today.clone().subtract(1, "year").endOf("year").add(3, "months"),
    },
    { text: "Custom", 
      start: "custom", 
      end: "custom" 
    },
  ];

  const handleChange = (event) => {
    const selectedPreset = presets[event.target.value];
    if (selectedPreset) {
      handlePresets(selectedPreset.start, selectedPreset.end);

      // Call the ref function to focus on the start date input field
      if (focusStartDateInput) {
        focusStartDateInput();
      }
    }
  };

  const selectedPresetIndex = presets.findIndex(
    ({ start, end }) =>
      moment(start).format(showDateFormat) ===
        moment(startDate).format(showDateFormat) &&
      moment(end).format(showDateFormat) === moment(endDate).format(showDateFormat)
  );

  return (
    <div className="p-3">
      <select
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid gray",
          backgroundColor: "white",
        }}
        value={selectedPresetIndex}
        onChange={handleChange}
      >
        <option value="">Select a date preset</option>
        {presets.map(({ text }, index) => (
          <option key={text} value={index}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
