import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./InputPopup.module.css"; // Reusing existing styles
import { useLocation } from "react-router-dom";
import NewButton from "src/views/buttons/buttons/NewButton";
import CustomColorBtn from "src/views/buttons/buttons/CustomColorBtn";
import { useSelector } from "react-redux"; // Or your state management import

const JobDataPopup = ({
  preTitleText,
  selectedJob,
  setSelectedJob,
  onApprove,
  onReject,
  type,
}) => {
  const [formData, setFormData] = useState({});
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // Initialize formData when selectedJob changes
  useEffect(() => {
    if (selectedJob) {
      setFormData({ ...selectedJob });
    }
  }, [selectedJob]);

  const handleInputChange = (e, field) => {
    if (e && e.target) {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleCancelClick = () => {
    setSelectedJob(null);
  };

  const handleApproveJob = () => {
    if (onApprove) {
      onApprove(formData);
    }
    setSelectedJob(null);
  };

  const handleRejectJob = () => {
    if (onReject) {
      onReject(formData);
    }
    setSelectedJob(null);
  };

  const PopupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1002,
    transition: "padding-left 0.3s ease",
    paddingLeft: sidebarShow ? "256px" : "0",
  };

  // For Import
  const allFields = [
    { id: "importername", label: "Importer Name", readOnly: true },
    { id: "branchname", label: "Branch", readOnly: true },
    { id: "transportmode", label: "Transport Mode", readOnly: true },
    { id: "jobnumber", label: "Job Number", readOnly: true },
    { id: "jobdate", label: "Job Date", readOnly: true },
    { id: "ownbooking", label: "Own Booking", readOnly: false },
    { id: "docreceivedon", label: "Doc Received On", readOnly: true },
    { id: "customhouse", label: "Custom House", readOnly: false },
    { id: "noofcontainer", label: "No. of Container", readOnly: false },
    { id: "deliverymode", label: "Delivery Mode", readOnly: false },
    { id: "betype", label: "BE Type", readOnly: false },
    { id: "owntransportation", label: "Own Transportation", readOnly: false },
    { id: "consignmenttype", label: "Consignment Type", readOnly: false },
    { id: "benumber", label: "BE No", readOnly: false },
    { id: "shippinglinename", label: "Shipping Line Name", readOnly: false },
    { id: "cfsname", label: "CFS Name", readOnly: false },
    { id: "bltype", label: "BL Type", readOnly: false },
    { id: "shippinglinebond", label: "Shipping Line Bond", readOnly: false },
    { id: "blstatus", label: "BL Status", readOnly: false },
    { id: "bltypenum", label: "BL No", readOnly: false },
    { id: "GST", label: "GST", readOnly: true },
    { id: "freedays", label: "Free Days", readOnly: false },
    { id: "finaldestination", label: "Final Destination", readOnly: false },
    { id: "IEC", label: "IEC", readOnly: true },
    { id: "portofshipment", label: "Port of Shipment", readOnly: false },
  ];

  // For Export
  const allFieldsExport = [
    { id: "exportername", label: "Emporter Name", readOnly: true },
    { id: "branchname", label: "Branch", readOnly: true },
    { id: "transportmode", label: "Transport Mode", readOnly: true },
    { id: "jobnumber", label: "Job Number", readOnly: true },
    { id: "jobdate", label: "Job Date", readOnly: true },
    { id: "ownbooking", label: "Own Booking", readOnly: false },
    { id: "docreceivedon", label: "Doc Received On", readOnly: true },
    { id: "customhouse", label: "Custom House", readOnly: false },
    { id: "noofcontainer", label: "No. of Container", readOnly: false },
    { id: "deliverymode", label: "Delivery Mode", readOnly: false },
    { id: "betype", label: "BE Type", readOnly: false },
    { id: "owntransportation", label: "Own Transportation", readOnly: false },
    { id: "consignmenttype", label: "Consignment Type", readOnly: false },
    { id: "benumber", label: "BE No", readOnly: false },
    { id: "shippinglinename", label: "Shipping Line Name", readOnly: false },
    { id: "cfsname", label: "CFS Name", readOnly: false },
    { id: "bltype", label: "BL Type", readOnly: false },
    { id: "shippinglinename", label: "Shipping Line Bond", readOnly: false },
    { id: "blstatus", label: "BL Status", readOnly: false },
    { id: "bltypenum", label: "BL No", readOnly: false },
    { id: "GST", label: "GST", readOnly: true },
    { id: "freedays", label: "Free Days", readOnly: false },
    { id: "finaldestination", label: "Final Destination", readOnly: false },
    { id: "IEC", label: "IEC", readOnly: true },
    { id: "portofshipment", label: "Port of Shipment", readOnly: false },
  ];

  //For Organization
  const allFieldsOrg = [
    { id: "clientname", label: "Organization Name", readOnly: false },
    { id: "branchname", label: "Branch Name", readOnly: false },
    { id: "address", label: "Address", readOnly: false },
    { id: "city", label: "City", readOnly: false },
    { id: "state", label: "State", readOnly: false },
    { id: "country", label: "Country", readOnly: false },
    { id: "postalcode", label: "PostalCode", readOnly: false },
    { id: "GST", label: "GST", readOnly: false },
    { id: "IEC", label: "IEC", readOnly: false },
    { id: "PAN", label: "PAN", readOnly: false },
    { id: "creditdays", label: "Credit Days", readOnly: false },
    { id: "phone", label: "Phone", readOnly: false },
    { id: "email", label: "Email", readOnly: false },
    { id: "username", label: "Username", readOnly: false },
  ];
  return (
    <>
      {selectedJob && (
        <>
          <div className={styles.darkBg} onClick={handleCancelClick} />
          <motion.div
            className={styles.popupWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={PopupStyle}
          >
            <div
              className={styles.container}
              style={{ background: "#f6fcff", width: "1100px" }}
            >
              <div className={styles.firstRow}>
                <h2 className={styles.title}>
                  <div className={styles.closeBtn} onClick={handleCancelClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 35 35"
                      fill="none"
                      style={{ filter: "none" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter =
                          "drop-shadow(0px 0px 0.5px rgb(0, 0, 0))")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "none")
                      }
                    >
                      <path
                        d="M22.5017 13.8988L19.0021 17.5L22.5017 21.1012C22.6004 21.2028 22.6787 21.3234 22.7322 21.4562C22.7856 21.589 22.8131 21.7313 22.8131 21.875C22.8131 22.0187 22.7856 22.161 22.7322 22.2938C22.6787 22.4266 22.6004 22.5472 22.5017 22.6488C22.403 22.7504 22.2858 22.8311 22.1568 22.8861C22.0279 22.9411 21.8896 22.9694 21.75 22.9694C21.6104 22.9694 21.4722 22.9411 21.3432 22.8861C21.2142 22.8311 21.097 22.7504 20.9983 22.6488L17.5 19.0463L14.0017 22.6488C13.903 22.7504 13.7858 22.8311 13.6568 22.8861C13.5279 22.9411 13.3896 22.9694 13.25 22.9694C13.1104 22.9694 12.9722 22.9411 12.8432 22.8861C12.7142 22.8311 12.597 22.7504 12.4983 22.6488C12.3996 22.5472 12.3213 22.4266 12.2678 22.2938C12.2144 22.161 12.1869 22.0187 12.1869 21.875C12.1869 21.7313 12.2144 21.589 12.2678 21.4562C12.3213 21.3234 12.3996 21.2028 12.4983 21.1012L15.9979 17.5L12.4983 13.8988C12.2989 13.6936 12.1869 13.4152 12.1869 13.125C12.1869 12.8348 12.2989 12.5564 12.4983 12.3512C12.6977 12.1459 12.9681 12.0306 13.25 12.0306C13.532 12.0306 13.8024 12.1459 14.0017 12.3512L17.5 15.9537L20.9983 12.3512C21.097 12.2496 21.2142 12.1689 21.3432 12.1139C21.4722 12.0589 21.6104 12.0306 21.75 12.0306C21.8896 12.0306 22.0279 12.0589 22.1568 12.1139C22.2858 12.1689 22.403 12.2496 22.5017 12.3512C22.6004 12.4528 22.6787 12.5734 22.7322 12.7062C22.7856 12.839 22.8131 12.9813 22.8131 13.125C22.8131 13.2687 22.7856 13.411 22.7322 13.5438C22.6787 13.6766 22.6004 13.7972 22.5017 13.8988ZM31.3125 17.5C31.3125 20.3122 30.5024 23.0613 28.9847 25.3995C27.4669 27.7378 25.3097 29.5602 22.7858 30.6364C20.2619 31.7126 17.4847 31.9942 14.8053 31.4455C12.126 30.8969 9.66481 29.5427 7.73309 27.5542C5.80138 25.5656 4.48587 23.0321 3.95291 20.2739C3.41995 17.5158 3.69348 14.6569 4.73892 12.0587C5.78436 9.46058 7.55474 7.23992 9.82619 5.67754C12.0976 4.11517 14.7682 3.28125 17.5 3.28125C21.1621 3.28523 24.6731 4.78455 27.2626 7.45022C29.8522 10.1159 31.3086 13.7302 31.3125 17.5ZM29.1875 17.5C29.1875 15.1204 28.502 12.7943 27.2178 10.8158C25.9336 8.83727 24.1082 7.29519 21.9726 6.38457C19.837 5.47396 17.487 5.2357 15.2199 5.69993C12.9527 6.16416 10.8702 7.31002 9.2357 8.99262C7.60117 10.6752 6.48804 12.819 6.03708 15.1528C5.58611 17.4867 5.81756 19.9057 6.70216 22.1042C7.58676 24.3026 9.08478 26.1816 11.0068 27.5036C12.9288 28.8256 15.1884 29.5312 17.5 29.5312C20.5986 29.5276 23.5694 28.2589 25.7604 26.0034C27.9515 23.7479 29.184 20.6898 29.1875 17.5Z"
                        fill="#1E2652"
                      />
                    </svg>
                  </div>

                  <label>
                    {preTitleText}
                    {type === "org" ? (
                      <strong>" {formData.clientname} "</strong>
                    ) : (
                      <strong>" {formData.jobnumber} "</strong>
                    )}{" "}
                  </label>
                </h2>
              </div>
              {console.log("form data ", formData)}
              <div className={styles.secondRow}>
                {/* Grid Layout */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    columnGap: "34px",
                    rowGap: "18px",
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  {(
                    (type === "export" && allFieldsExport) ||
                    (type === "import" && allFields) ||
                    (type === "org" && allFieldsOrg)
                  ).map((field) => (
                    <div
                      key={field.id}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label htmlFor={field.id} style={{ fontWeight: "600" }}>
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.id}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #535B87",
                          borderRadius: "8px",
                          fontSize: "12px",
                          height: "28px",
                        }}
                        value={selectedJob[field.id] || ""}
                        onChange={(e) => handleInputChange(e, field.id)}
                        readOnly={field.readOnly}
                        autoComplete="new-password"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  padding: "20px",
                  borderTop: "1px solid #e0e0e0",
                  marginTop: "20px",
                }}
              >
                <div
                  onClick={handleCancelClick}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  <NewButton text={"Close"} />
                </div>
                <div
                  onClick={handleApproveJob}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <NewButton text={"Approve"} />
                </div>
                <div
                  onClick={handleRejectJob}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  {/* <CustomColorBtn
                    text={"Reject"}
                    bgcolorlight={"red"}
                    bgcolordark={"#ff6767"}
                  /> */}
                  <NewButton text={"Reject"} bgcolor={"#dc3545"} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default JobDataPopup;
