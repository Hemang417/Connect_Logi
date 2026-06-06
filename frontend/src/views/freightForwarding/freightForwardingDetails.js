import React from "react";
import styles from "./css/freightForwardingDetails.module.css";
import Calendar from "../../components/Calendar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardPopup from "src/components/dashboardPopup/DashboardPopup";
import { useState, useEffect } from "react";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import ArrowCircleRight from "../buttons/buttons/ArrowCircleRight";
function freightForwardingDetails() {
  const navigate = useNavigate();
  const [currentPopup, setCurrentPopup] = useState("");

  return (
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
          <div className={styles.freightForwardingBox}>
            <div className={styles.freightForwardingTitle}>
              FreightForwarding
            </div>
            <div className={styles.freightForwardingTotalJobs}>
              Total No. of Bookings: 23
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
          <div className={styles.firstBlock}>
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Completed</div>
                <div className={styles.firstBlockNo}>69</div>
              </div>
              <div className={styles.secondHalf}>
            <ArrowCircleRight height={16} width={16}/>
              </div>
            </div>
          </div>
          <div className={styles.secondBlock}>
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>In-Progress</div>
                <div className={styles.secondBlockNo}>69</div>
              </div>
              <div className={styles.secondHalf}>
            <ArrowCircleRight height={16} width={16}/>
              </div>
            </div>
          </div>
          <div className={styles.thirdBlock}>
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Profit Margin</div>
                <div className={styles.thirdBlockNo}>69</div>
              </div>
              <div className={styles.secondHalf}>
            <ArrowCircleRight height={16} width={16}/>
              </div>
            </div>
          </div>
          <div className={styles.fourthBlock}>
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Delayed</div>
                <div className={styles.fourthBlockNo}>69</div>
              </div>
              <div className={styles.secondHalf}>
            <ArrowCircleRight height={16} width={16}/>
              </div>
            </div>
          </div>
          <div className={styles.fifthBlock}>
            <div className={styles.innerBlock}>
              <div className={styles.firstHalf}>
                <div className={styles.blockTitle}>Incoterm</div>
                <div className={styles.fifthBlockNo}>69</div>
              </div>
              <div className={styles.secondHalf}>
            <ArrowCircleRight height={16} width={16}/>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdRow}>
          <img></img>
          <img></img>
          <img></img>
        </div>
        <div className={styles.fourthRow}>
          <div
            className={styles.firstBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Transport Mode")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.firstblockForthRowTitle}>
                Transport Mode
              </label>
          <ArrowCircleRight height={16} width={16}/>
            </div>
          </div>
          <div
            className={styles.secondBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Consignment Type")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.secondblockForthRowTitle}>
                Consignment Type
              </label>
          <ArrowCircleRight height={16} width={16}/>
            </div>
          </div>
          <div
            className={styles.thirdBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Delivery Mode")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.thirdblockForthRowTitle}>
                Delivery Mode
              </label>
          <ArrowCircleRight height={16} width={16}/>
            </div>
          </div>
          <div
            className={styles.fourthBlockForthRow}
            onDoubleClick={() => setCurrentPopup("Booking")}
          >
            <div className={styles.outerBoxForthRow}>
              <label className={styles.thirdblockForthRowTitle}>Booking</label>
          <ArrowCircleRight height={16} width={16}/>
            </div>
          </div>
        </div>
        {currentPopup === "Transport Mode" && (
          <DashboardPopup
            title="Transport Mode"
            content={
              <div>
                <div>
                  <li>Air:</li>
                  <li>Sea:</li>
                </div>
                <div>
                  {" "}
                  <li> 3</li>
                  <li> 1</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor=" var(--Card-Bg-9, #8E7B3A)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Total No. of Containers" && (
          <DashboardPopup
            title="Total No. of Containers: 12"
            content={
              <div>
                <div>
                  <li>20' Container:</li>
                  <li>40' Container:</li>
                  <li>20' ISO Tank:</li>
                  <li>40' ISO Tank:</li>
                  <li>LCL:</li>
                  <li>Break Bulk:</li>
                </div>
                <div>
                  {" "}
                  <li> 3</li>
                  <li> 1</li>
                  <li> 2</li>
                  <li> 1</li>
                  <li> 3</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-4, #336C70)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Consignment Type" && (
          <DashboardPopup
            title="Consignment Type"
            content={
              <div>
                <div>
                  <li>FCL:</li>
                  <li>LCL:</li>
                  <li>Break Bulk:</li>
                </div>
                <div>
                  {" "}
                  <li> 3</li>
                  <li> 1</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg-7, #4092A4)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Delivery Mode" && (
          <DashboardPopup
            title="Delivery Mode"
            content={
              <div>
                <div>
                  <li>Loaded:</li>
                  <li>Destuff:</li>
                  <li>Loaded Examine:</li>
                  <li>Destuff Examine:</li>
                </div>
                <div>
                  {" "}
                  <li> 3</li>
                  <li> 1</li>
                  <li> 2</li>
                  <li> 2</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg8, #823D7F)"
            textColor="text-white"
          />
        )}
        {currentPopup === "Booking" && (
          <DashboardPopup
            title="Booking"
            content={
              <div>
                <div>
                  <li>Import:</li>
                  <li>Export:</li>
                </div>
                <div>
                  {" "}
                  <li> 3</li>
                  <li> 1</li>
                </div>
              </div>
            }
            setCurrentPopup={setCurrentPopup}
            bgColor="var(--Card-Bg, #333D70)"
            textColor="text-white"
          />
        )}
      </div>
    </motion.div>
  );
}

export default freightForwardingDetails;
