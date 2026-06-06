import React from "react";
import "./fileuploadbutton.css";

const FileUploadButton = React.memo(({ fileType, label, filePreviews, handleFileChange }) => (
  <div className="file-upload-group">
    <label className="KYC-UL" style={{ width: "196px" }}>{label}:</label>
    <div className="file-upload-container">
      <label
        className={`file-upload-button ${filePreviews.get(fileType) ? "uploaded" : ""}`}
      >
        {!filePreviews.get(fileType) && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--btn-text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "5px" }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        )}
        {filePreviews.get(fileType)?.fileName || "Choose File"}
        <input
          type="file"
          name={fileType}
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={(e) => handleFileChange(fileType, e)}
          style={{ display: "none" }}
        />
      </label>

      {filePreviews.get(fileType) && (
        <div className="file-actions-container">
          <button
            type="button"
            className="file-edit-button"
            onClick={() =>
              document.querySelector(`input[name="${fileType}"]`).click()
            }
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--btn-text)" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            type="button"
            className="file-view-button"
            onClick={() =>
              window.open(filePreviews.get(fileType)?.previewUrl, "_blank")
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--btn-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  </div>
));

export default FileUploadButton;