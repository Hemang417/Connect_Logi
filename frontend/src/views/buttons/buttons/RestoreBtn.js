import React from "react";

const RestoreBtn = () => {
  return (
    <div>
      <svg
        className="restore-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 1.71-9.11L1 10"></path>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <style>
        {`
        .restore-icon {
          transition: stroke 0.3s ease;
        }

        .restore-icon:hover {
          stroke: #EDAD21; /* Change stroke color to yellow on hover */
        }
        `}
      </style>
    </div>
  );
};

export default RestoreBtn;
