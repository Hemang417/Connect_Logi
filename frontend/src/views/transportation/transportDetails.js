import React from "react";
import styles from "./css/transportDetails.module.css";
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";

function transportDetails() {
  const navigate = useNavigate();

  return (
    <div>
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
             <ArrowCircleLeft/>
            </div>
            <div className={styles.transportBox}>
              <div className={styles.transportTitle}>Transportation</div>
              <div className={styles.transportTotalJobs}>
                Total No. of Vehicles: 23
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="8"
                viewBox="0 0 13 11"
                fill="none"
              >
                <path
                  d="M12.6823 4.72184C12.783 4.82398 12.8629 4.94529 12.9174 5.07881C12.9719 5.21234 13 5.35546 13 5.5C13 5.64454 12.9719 5.78766 12.9174 5.92119C12.8629 6.05471 12.783 6.17601 12.6823 6.27816L8.34924 10.6777C8.14598 10.8841 7.8703 11 7.58284 11C7.29538 11 7.01969 10.8841 6.81643 10.6777C6.61316 10.4713 6.49897 10.1914 6.49897 9.89951C6.49897 9.60764 6.61316 9.32773 6.81643 9.12135L9.30116 6.59988H1.08326C0.795963 6.59988 0.520432 6.484 0.317281 6.27773C0.11413 6.07147 0 5.79171 0 5.5C0 5.20829 0.11413 4.92854 0.317281 4.72227C0.520432 4.516 0.795963 4.40012 1.08326 4.40012H9.30116L6.81643 1.87865C6.61316 1.67227 6.49897 1.39236 6.49897 1.10049C6.49897 0.808621 6.61316 0.528707 6.81643 0.322325C7.01969 0.115944 7.29538 0 7.58284 0C7.8703 0 8.14598 0.115944 8.34924 0.322325L12.6823 4.72184Z"
                  fill="#1E2652"
                />
              </svg>
              </div>
            </div>
            <div className={styles.datePicker}>
              <div className={styles.DatePickerTitle}>Date: </div>
              <div className={styles.startEndDateContainer}>
                <Calendar />
              </div>
            </div>
          </div>
          <div className={styles.secondRow}>
            <div
              className={styles.firstBlockSecondRow}
              onDoubleClick={() => navigate("/transportOwnVehicles")}
            >
              <div
                className={styles.blockTitle1}
              >
                Own Vehicle
              </div>
              <div className={styles.secondRowFirstBlockGrid}>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>
                    Total No. of Vehicles
                  </div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Total No. of Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Profit (Rs)</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    Rs 23000
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Profit (%)</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>In-House Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Outside Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Return Load Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.firstBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
              </div>
            </div>
            <div
              className={styles.secondBlockSecondRow}
              onDoubleClick={() => navigate("/transportOutsideVehicles")}
            >
              <div
                className={styles.blockTitle2}
              >
                Outside Vehicle
              </div>
              <div className={styles.secondRowSecondBlockGrid}>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Total No. of Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.secondBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Profit (Rs)</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.secondBlockLabelColor}`}
                  >
                    Rs 23000
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Profit (%)</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.secondBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>In-House Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.secondBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Outside Trips</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.secondBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Return Load Trips </div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.secondBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.thirdRow}>
            <div className={styles.firstBlockThirdRow}>
              <div
                className={styles.blockTitle3}
              >
                Container Details
              </div>
              <div className={styles.thirdRowFirstBlockGrid}>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>20’ Containers </div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.thirdBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>40’ Containers</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.thirdBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>20’ ISO Tanks</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.thirdBlockLabelColor}`}
                  >
                    Rs 23000
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>40’ ISO Tanks</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.thirdBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>LCL</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.thirdBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Break Bulk</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.thirdBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.fourthRow}>
            <div className={styles.firstBlockFourthRow}>
              <div
                className={styles.blockTitle4}
              >
                Type of Container
              </div>
              <div className={styles.fourthRowFirstBlockGrid}>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Type of Shipment </div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>In-house Vehicle</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Outside Own Vehicle</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    Rs 23000
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>
                    Own Vehicle Return Load
                  </div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Outside Vehicle</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Type of Shipment</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    Rs 23000
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>In-house Vehicle</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Outside Own Vehicle</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>
                    Own Vehicle Return Load
                  </div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
                <div className={styles.subBox}>
                  <div className={styles.subBoxTitle}>Outside Vehicle</div>
                  <div
                    className={`${styles.subBoxLabel} ${styles.fourthBlockLabelColor}`}
                  >
                    23
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default transportDetails;
