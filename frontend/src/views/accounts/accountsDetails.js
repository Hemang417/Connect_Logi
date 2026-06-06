import React from "react";
import styles from "./css/accountsDetails.module.css";
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import ArrowCircleRight from "../buttons/buttons/ArrowCircleRight";
import Cookies from "js-cookie";
import { useEffect } from "react";

function accountsDetails() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);
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
              <ArrowCircleLeft />
            </div>
            <div className={styles.accountsBox}>
              <div className={styles.accountsTitle}>Accounts</div>
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
              onDoubleClick={() => navigate("/BankDetails")}
            >
              <div className={styles.outerBoxSecondRow}>
                <label className={styles.firstblockSecondRowTitle}>
                  Bank Details
                </label>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
            <div
              className={styles.secondBlockSecondRow}
              onDoubleClick={() => navigate("/accountsMilestoneReoprt")}
            >
              <div className={styles.outerBoxSecondRow}>
                <label className={styles.secondblockSecondRowTitle}>
                  Milestones{" "}
                </label>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
            <div
              className={styles.thirdBlockSecondRow}
              onDoubleClick={() => navigate("/accountsOutstanding")}
            >
              <div className={styles.outerBoxSecondRow}>
                <label className={styles.thirdblockSecondRowTitle}>
                  Oustanding against Bills{" "}
                </label>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
            <div
              className={styles.fourthBlockSecondRow}
              onDoubleClick={() => navigate("/accountsAdvance")}
            >
              <div className={styles.outerBoxSecondRow}>
                <label className={styles.thirdblockSecondRowTitle}>
                  Advanced{" "}
                </label>
                <ArrowCircleRight height={16} width={16} />
              </div>
            </div>
          </div>
          <div className={styles.thirdRow}>
            <div className={styles.graphs}></div>
            <div className={styles.graphs}></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default accountsDetails;
