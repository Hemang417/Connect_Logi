import React, { useEffect } from "react";
import { motion } from "framer-motion";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CNavItem,
  CNav,
  CNavLink,
} from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import "../../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import NewButton from "src/views/buttons/buttons/NewButton";
import TransHistoryPopup from "src/components/inputPopup/TransHistoryPopup";
import API_BASE_URL from "src/config/config";
// import createjob from './CreateJob';

const Transactionhistory = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [visible, setVisible] = useState(false);
  const [collectionData, setCollectionData] = useState([]);

  const [transactionhistory, setTransactionhistory] = useState([]);
  const location = useLocation();
  const [transactionModal, setTransactionModal] = useState(false);
  const [currentPopup, setCurrentPopup] = useState("none");
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");

  const contactFields = [
    { id: "date", label: "Date", inputType: "text", readOnly: true },
    { id: "billNo", label: "Bill No.", inputType: "text", readOnly: true },
    {
      id: "branchnameoforg",
      label: "Branch Name",
      inputType: "text",
      readOnly: true,
    },
    { id: "amount", label: "Amount", inputType: "text", readOnly: true },
    { id: "Tax", label: "Tax", inputType: "text", readOnly: true },
    {
      id: "grandTotal",
      label: "Grand Total",
      inputType: "text",
      readOnly: true,
    },
    { id: "AssignTo", label: "Assign To", inputType: "text", readOnly: true },
  ];

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

  const fetchTransactionHistory = async () => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const jobnumber = jobNumber; // You can set this based on your requirements

      const response = await axios.get(
        `${API_BASE_URL}/transactionhistory`,
        {
          params: {
            orgname: orgname,
            orgcode: orgcode,
            jobnumber: jobnumber,
          },
        }
      );
      console.log(response.data);
      const data = response.data;
      setTransactionhistory(data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      toast.error("Failed to fetch transaction history");
    }
  };

  const openTransactionModal = async (transaction) => {
    // setTransactionModal(true);
    setCurrentPopup("TransHistory");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/getCollectionByBillNo`,
        {
          params: {
            billNo: transaction.referenceNo, // Use the referenceNo from the transaction
          },
        }
      );

      // Log the response data to check its structure
      console.log("Fetched collection data:", response.data);

      // Assuming the response contains the collection data
      const collectionData = response.data[0]; // Assuming the response is an array

      // Check if collectionData is defined
      if (collectionData) {
        // Set the collection data in the state to display in the modal
        setCollectionData({
          date: moment(collectionData.Date).format("YYYY-MM-DD"), // Format the date
          billNo: collectionData.billNo,
          branchnameoforg: collectionData.branchnameoforg,
          amount: collectionData.amount,
          Tax: collectionData.Tax,
          grandTotal: collectionData.grandTotal,
          AssignTo: collectionData.AssignTo,
        });
      } else {
        console.error("No collection data found for the given billNo.");
        toast.error("No collection data found.");
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
      toast.error("Failed to fetch collection data");
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  const navigate = useNavigate();

  // Calculate total debit and credit
  const totalDebit = transactionhistory.reduce(
    (sum, transaction) => sum + (parseFloat(transaction.dr) || 0),
    0
  );
  const totalCredit = transactionhistory.reduce(
    (sum, transaction) => sum + (parseFloat(transaction.cr) || 0),
    0
  );

  const closingBalance = totalCredit - totalDebit; // Adjust this calculation based on your requirements

  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };

  const handleUpdate = async () => {
    try {
      const username = localStorage.getItem("username");
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const response = await axios.put(
        `${API_BASE_URL}/updateGeneralExp`,
        {
          ...data,
          formData: formData,
          orgname: nameoforg,
          orgcode: codeoforg,
          jobowner: username,
          jobnumber: jobNumber,
        }
      );
      const getApprovers = await axios.get(
        `${API_BASE_URL}/getApprovernamesfororg`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );
      // toast.success("Successfully updated General Details");
    } catch (error) {
      // toast.error("Error updating General Details.");
      console.log(error);
    }
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        <div className="mb-2 container-div">
          <CCardBody>
            <div className="left-div-table">
              <table
                className="border-separate"
                style={{
                  // marginTop: "12px",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                  tableLayout: "auto",
                }}
              >
                <thead
                  className="bg-blue-900 text-white"
                  style={{
                    background: "var(--tableHead-bg)",
                    fontSize: "12px",
                    color: " #F6FCFF",
                    fontFamily: "Instrument Sans",
                    fontStyle: "normal",
                    lineHeight: " normal",
                  }}
                >
                  <tr color="dark">
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Type of Expense
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Reference No.
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Dr.
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Cr.
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactionhistory.map((transaction, index) => (
                    <tr
                      onDoubleClick={() => openTransactionModal(transaction)}
                      key={index}
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? index % 2 === 0
                              ? "#3B5472" // Dark  even row
                              : "#263A52" // Dark mode odd row
                            : index % 2 === 0
                            ? "#D8F0FD" // Light mode even row
                            : "#F6FCFF", // Light mode odd row
                        cursor: "pointer",
                        fontSize: "12px",

                        /* Table Body */
                        fontFamily: "Instrument Sans",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: " normal",
                        letterSpacing: "0.14px",
                      }}
                    >
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {moment(transaction.currentdate).format(
                          "DD/MM/YYYY : LT"
                        )}{" "}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {transaction.typeofexpense}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {transaction.referenceNo}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(transaction.dr)}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(transaction.cr)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <tr>
                <td
                  className="td-accounts py-1 rounded-lg"
                  colSpan={3}
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Closing Balance:
                </td>
                <td
                  className="td-accounts py-1 rounded-lg"
                  colSpan={2}
                  style={{ fontWeight: "bold" }}
                >
                  {new Intl.NumberFormat("en-IN").format(closingBalance)}
                </td>
              </tr>
            </div>
          </CCardBody>
        </div>

        {currentPopup === "TransHistory" && (
          <TransHistoryPopup
            position={"fixed"}
            popupType={"Transaction History"}
            title={"Transaction History"}
            setCurrentPopup={setCurrentPopup}
            fields={contactFields}
            value={collectionData}
            width={"330px"}
            top={"55%"}
          />
        )}

        <div className="all-buttons">
          <div
            className="search-button"
            onClick={() => {
              toast.success("saved Successfully");
            }}
          >
            <NewButton width={"120px"} text={"Save"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              toast.success("saved  Successfully");
              navigate("/impcreatejob");
            }}
          >
            <NewButton width={"120px"} text={"Save & New"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              toast.success("saved  Successfully");
              handleClose();
            }}
          >
            <NewButton width={"120px"} text={"Save & Close"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              handleClose();
            }}
          >
            <NewButton width={"120px"} text={"Close"} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Transactionhistory;
