import React from "react";

function SaveBtn({fill}) {
  return (
    <div
      style={{
        position: "relative",
        left: "2px",
        top: "2px",
        marginRight: "4px",
      }}
    >
      <svg
        className="save-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={fill}
        stroke-width="1.1"
        // stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 21H5a2 2 0 01-2-2V3a2 2 0 012-2h12l4 2v16a2 2 0 01-2 2z" />
        <path d="M7 2v4h7V2" />
        <path d="M7 12h10" />
        {/* <path d="M7 17h10" /> */}
        <path d="M7 12v9" />
        <path d="M17 12v9" />
      </svg>

      <style>
        {`
         .save-icon {
    transition: stroke 0.3s ease; /* Smooth transition for the stroke color */
  }

  .save-icon:hover {
    stroke: green; /* Change stroke color to green on hover */
  }
        `}
      </style>
    </div>
  );
}

export default SaveBtn;
