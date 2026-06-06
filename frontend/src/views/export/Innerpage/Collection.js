import React, { useEffect, useState, useRef } from "react";
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
  CFormCheck,
} from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import "../../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import "../css/export-styles.css";
import { format } from "date-fns";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import EditBtn from "src/views/buttons/buttons/EditBtn";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewButton from "src/views/buttons/buttons/NewButton";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";

const Collection = () => {
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [refresh, setrefresh] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const [currentPopup, setCurrentPopup] = useState("none");
  const parentRef = useRef(null);
  const [parentLeft, setParentLeft] = useState(null);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");

  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  const contactFields2 = [
    { id: "date", label: "Date", inputType: "date" },
    { id: "branchname", label: "Branch Name", inputType: "text" },
    { id: "amount", label: "Amount", inputType: "number" },
    { id: "Tax", label: "Tax", inputType: "number" },
    // {
    //   id: " grandTotal",
    //   label: " Grand Total",
    //   inputType: "number",
    //   readOnly: true,
    // },
    // { id: "Assign To", label: "Assign To", inputType: "selection" },
  ];
  const contactFields3 = [
    { id: "date", label: "Date", inputType: "date" },
    { id: "branchnameoforg", label: "Branch Name", inputType: "text" },
    { id: "amount", label: "Amount", inputType: "number" },
    { id: "Tax", label: "Tax", inputType: "number" },
    {
      id: "grandTotal",
      label: " Grand Total",
      inputType: "email",
      readOnly: true,
    },
    // { id: " Assign To", label: "Assign To", inputType: "selection" },
  ];

  const [creditdays, setCreditdays] = useState(
    () => sessionStorage.getItem(`creditdays_${jobNumber}`) || ""
  );
  const [followup2, setfollowup2] = useState(
    () => sessionStorage.getItem(`followup2_${jobNumber}`) || ""
  );
  const [followup3, setfollowup3] = useState(
    () => sessionStorage.getItem(`followup3_${jobNumber}`) || ""
  );
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

  const handleRefresh = () => {
    setrefresh(!refresh);
    console.log(refresh);
    fetchCollections();
    getCreditDays();
    toast.success("Data Refreshed");
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
  };

  const formatFollowUpDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-GB", options);
  };
  const formImportRef = useRef(null);

  useEffect(() => {
    const formImport = formImportRef.current;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const scrollSpeed = 0.25; // ✅ tune this to make it faster/slower
        formImport.scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    if (formImport) {
      formImport.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (formImport) {
        formImport.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);
  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
    getCreditDays();
  }, [navigate]);

  const [collectionData, setCollectionData] = useState({
    branchnameoforg: localStorage.getItem("currentbranchorg"),
    date: new Date().toISOString().split("T")[0],
    billNo: "",
    amount: "",
    Tax: "",
    grandTotal: "",
    FollowUp1: "",
    FollowUp2: "",
    FollowUp3: "",
    TimeDelay: "",
    AssignTo: "",
    checkbox: 0,
  });

  useEffect(() => {
    const amount = parseFloat(collectionData.amount) || 0;
    const tax = parseFloat(collectionData.Tax) || 0;
    const grandTotal = amount + tax;
    setCollectionData((prevData) => ({
      ...prevData,
      grandTotal: grandTotal.toFixed(2),
    }));
  }, [collectionData.amount, collectionData.Tax]);

  useEffect(() => {
    if (selectedCollection) {
      const amount = parseFloat(selectedCollection.amount) || 0;
      const tax = parseFloat(selectedCollection.Tax) || 0;
      const grandTotal = amount + tax;
      setSelectedCollection((prev) => ({
        ...prev,
        grandTotal: grandTotal.toFixed(2),
      }));
    }
  }, [selectedCollection?.amount, selectedCollection?.Tax]);

  const storecollection = async () => {
    try {
      const branchcodeofemp = localStorage.getItem("branchcodeofemp");
      const branchnameofemp = localStorage.getItem("branchnameofemp");

      const response = await axios.post(
        `${API_BASE_URL}/storecollection`,
        {
          ...collectionData,
          clientname: localStorage.getItem("exporternameofjob"),
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          jobnumber: jobNumber,
          username: localStorage.getItem("username"),

          branchcodeofemp: branchcodeofemp,
          branchnameofemp: branchnameofemp,
        }
      );

      if (response.status === 200) {
        toast.success("Collection Created Successfully");
        setVisible(false);
        setCollectionData((prev) => ({
          ...prev,
          billNo: "",
          amount: "",
          Tax: "",
          grandTotal: "",
          AssignTo: "",
          checkbox: 0,
        }));
        fetchCollections();
      }
    } catch (error) {
      console.error(error);
      toast.error("Collection Creation Failed");
    }
  };

  const handleSaveChanges = async () => {
    await editCollection(); // Call the editCollection function
    console.log("New Collection:", selectedCollection);
    setShowEditModal(false); // Close the modal after saving changes
  };

  const editCollection = async () => {
    try {
      const sanitizedData = {
        ...selectedCollection,
        jobnumber: selectedCollection.jobnumber || null,
        orgname: selectedCollection.orgname || null,
        orgcode: selectedCollection.orgcode || null,
        branchnameoforg: selectedCollection.branchnameoforg || null,
        date: selectedCollection.date,
        billNo: selectedCollection.billNo || null,
        amount: selectedCollection.amount || null,
        Tax: selectedCollection.Tax || null,
        grandTotal: selectedCollection.grandTotal || null,
        FollowUp1: selectedCollection.FollowUp1 || null,
        FollowUp2: selectedCollection.FollowUp2 || null,
        FollowUp3: selectedCollection.FollowUp3 || null,
        TimeDelay: selectedCollection.TimeDelay || null,
        AssignTo: selectedCollection.AssignTo || null,
        checkbox: selectedCollection.checkbox || 0,
        clientname: selectedCollection.clientname || null,
        branchcodeofemp: selectedCollection.branchcodeofemp || null,
        branchnameofemp: selectedCollection.branchnameofemp || null,
      };

      const response = await axios.put(
        `${API_BASE_URL}/updatecollection`,
        sanitizedData
      );

      if (response.status === 200) {
        toast.success("Collection Updated Successfully");
        setShowEditModal(false); // Close modal
        fetchCollections(); // Refresh the list
      } else {
        toast.error("Failed to Save Collection");
      }
    } catch (error) {
      console.error("Edit Collection Error:", error);
      toast.error("Failed to Save Collection");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCollectionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditInputChange = (event) => {
    console.log("Event Triggered:", event); // Check if event exists
    console.log("Event Target:", event.target); // Ensure target is valid
    console.log("Changed Field:", event.target.name); // Check name
    const { name, value } = event.target;
    setSelectedCollection((prev) => ({ ...prev, [name]: value }));

    // If the date is being changed, ensure to recalculate follow-up dates
    if (name === "date") {
      const newDate = new Date(value);
      if (!isNaN(newDate.getTime())) {
        // Ensure newDate is valid
        const creditDaysInt = parseInt(creditdays, 10) || 0;

        // Calculate Follow-Up Dates
        const followUp1Date = new Date(newDate);
        followUp1Date.setDate(followUp1Date.getDate() + creditDaysInt + 1);

        const followUp2Date = new Date(followUp1Date);
        followUp2Date.setTime(
          followUp1Date.getTime() + followup2 * 24 * 60 * 60 * 1000
        );

        const followUp3Date = new Date(followUp2Date);
        followUp3Date.setTime(
          followUp2Date.getTime() + followup3 * 24 * 60 * 60 * 1000
        );

        const today = new Date();
        const followUpDate = new Date(followUp1Date);

        if (isNaN(followUpDate)) {
          console.error("Invalid FollowUp1 Date:", followUp1Date);
          setCollectionData((prevData) => ({
            ...prevData,
            TimeDelay: 0, // Default to 0 if there's an issue
          }));
          return;
        }

        const timeDiff = today.getTime() - followUpDate.getTime(); // Ensure both are valid dates
        const calculatedDelay =
          Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        // setCollectionData((prevData) => ({
        //   ...prevData,
        //   TimeDelay: calculatedDelay >= 0 ? calculatedDelay : 0, // Ensure no negative delay
        // }));

        setSelectedCollection((prev) => ({
          ...prev,
          FollowUp1: followUp1Date.toISOString().split("T")[0],
          FollowUp2: followUp2Date.toISOString().split("T")[0],
          FollowUp3: followUp3Date.toISOString().split("T")[0],
          TimeDelay: calculatedDelay >= 0 || null ? calculatedDelay : 0,
        }));
      }
    }
  };

  const getCreditDays = async () => {
    try {
      const orgcode = localStorage.getItem("orgcode");
      const orgname = localStorage.getItem("orgname");
      const branchname = localStorage.getItem("Selectedbranchorg");
      const clientname = localStorage.getItem("exporternameofjob");

      const response = await axios.get(
        `${API_BASE_URL}/getcreditdayforcollection`,
        {
          params: {
            orgname,
            orgcode,
            branchname,
            clientname,
            jobnumber: jobNumber, // Add job number to make request specific
          },
        }
      );

      if (response.data) {
        // Store values with job-specific keys in sessionStorage (not localStorage)
        sessionStorage.setItem(
          `followup2_${jobNumber}`,
          response.data.followup2 ?? ""
        );
        sessionStorage.setItem(
          `followup3_${jobNumber}`,
          response.data.followup3 ?? ""
        );
        sessionStorage.setItem(
          `creditdays_${jobNumber}`,
          response.data.creditdays || ""
        );

        // Update state with these values
        setfollowup2(response.data.followup2 ?? "");
        setfollowup3(response.data.followup3 ?? "");
        setCreditdays(response.data.creditdays || "");
      } else {
        console.error("No data received for credit days.");
      }
    } catch (error) {
      console.error("Error Fetching Credit Days:", error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getallEmployeesForAccess`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error Fetching Employees:", error);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getallcollection`,
        {
          params: {
            jobnumber: jobNumber,
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      console.log(localStorage);
      console.log("collections -> ", response.data);
      setCollections(response.data);
    } catch (error) {
      console.error("Error Fetching Collections:", error);
      toast.error("Failed to Fetch Collections");
    }
  };

  useEffect(() => {
    fetchCollections();

    // Check if we already have data for this job in sessionStorage
    const storedCreditDays = sessionStorage.getItem(`creditdays_${jobNumber}`);
    const storedFollowup2 = sessionStorage.getItem(`followup2_${jobNumber}`);
    const storedFollowup3 = sessionStorage.getItem(`followup3_${jobNumber}`);

    if (storedCreditDays && storedFollowup2 && storedFollowup3) {
      // Use stored values if available
      setCreditdays(storedCreditDays);
      setfollowup2(storedFollowup2);
      setfollowup3(storedFollowup3);
    } else {
      // Otherwise fetch from server
      getCreditDays();
    }

    getEmployees();

    // Cleanup function to avoid memory leaks
    return () => {
      // Optional: clear these specific values when component unmounts
      // sessionStorage.removeItem(`creditdays_${jobNumber}`);
      // sessionStorage.removeItem(`followup2_${jobNumber}`);
      // sessionStorage.removeItem(`followup3_${jobNumber}`);
    };
  }, [jobNumber]); // Add jobNumber as dependency

  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };

  useEffect(() => {
    if (creditdays && followup2 && followup3 && collectionData.date) {
      const creditDaysInt = parseInt(creditdays, 10) || 0;
      const followUp1Date = new Date(collectionData.date);
      followUp1Date.setDate(followUp1Date.getDate() + creditDaysInt + 1);

      const followUp2Date = new Date(followUp1Date);
      followUp2Date.setDate(followUp2Date.getDate() + parseInt(followup2, 10));

      const followUp3Date = new Date(followUp2Date);
      followUp3Date.setDate(followUp3Date.getDate() + parseInt(followup3, 10));

      const today = new Date();
      const followUpDate = new Date(followUp1Date);

      if (isNaN(followUpDate)) {
        console.error("Invalid FollowUp1 Date:", followUp1Date);
        setSelectedCollection((prev) => ({
          ...prev,
          TimeDelay: 0,
        }));
        return;
      }

      const timeDiff = today.getTime() - followUp1Date.getTime();
      const calculatedDelay = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

      setCollectionData((prevData) => ({
        ...prevData,
        FollowUp1: followUp1Date.toISOString().split("T")[0],
        FollowUp2: followUp2Date.toISOString().split("T")[0],
        FollowUp3: followUp3Date.toISOString().split("T")[0],
        TimeDelay: calculatedDelay >= 0 ? calculatedDelay : 0,
      }));
    }
  }, [creditdays, followup2, followup3, collectionData.date, jobNumber]);

  useEffect(() => {
    if (selectedCollection) {
      const creditDaysInt = parseInt(creditdays, 10) || 0;
      const followUp1Date = new Date(selectedCollection.date);
      followUp1Date.setDate(followUp1Date.getDate() + creditDaysInt + 1);

      const followUp2Date = new Date(followUp1Date);
      followUp2Date.setTime(
        followUp1Date.getTime() + followup2 * 24 * 60 * 60 * 1000
      );

      const followUp3Date = new Date(followUp2Date);
      followUp3Date.setTime(
        followUp2Date.getTime() + followup3 * 24 * 60 * 60 * 1000
      );

      const today = new Date();
      const followUpDate = new Date(followUp1Date);

      if (isNaN(followUpDate)) {
        console.error("Invalid FollowUp1 Date:", followUp1Date);
        setCollectionData((prevData) => ({
          ...prevData,
          TimeDelay: 0, // Default to 0 if there's an issue
        }));
        return;
      }

      const timeDiff = today.getTime() - followUpDate.getTime(); // Ensure both are valid dates
      const calculatedDelay = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      setSelectedCollection((prev) => ({
        ...prev,
        FollowUp1: followUp1Date.toISOString().split("T")[0],
        FollowUp2: followUp2Date.toISOString().split("T")[0],
        FollowUp3: followUp3Date.toISOString().split("T")[0],
        TimeDelay: calculatedDelay >= 0 || null ? calculatedDelay : 0,
      }));
    }
  }, [selectedCollection?.date, creditdays, jobNumber]);

  const handleAssigneeChange = async (id, newAssignee) => {
    try {
      await axios.put(`${API_BASE_URL}/updatecollectionassignee`, {
        id,
        AssignTo: newAssignee,
      });
      setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.id === id
            ? { ...collection, AssignTo: newAssignee }
            : collection
        )
      );
    } catch (error) {
      console.error("Error Updating Assignee:", error);
      toast.error("Failed to Save Assignee");
    }
  };

  const openEditModal = (collection) => {
    const validDate = collection.date ? new Date(collection.date) : new Date();
    setSelectedCollection({
      ...collection,
      date: validDate.toISOString().split("T")[0], // Ensure date is valid
    });
    console.log("Selected Collection:", collection);
    setShowEditModal(true);
    setCurrentPopup("newCollection");
  };

  const handleDelete = async () => {
    try {
      if (!collectionToDelete) return;

      const { billNo, id } = collectionToDelete;
      if (!billNo || !id) {
        toast.error("Invalid collection data");
        return;
      }

      await axios.put(`${API_BASE_URL}/deletecollection`, {
        billNo,
        id,
        username: localStorage.getItem("username"),
        remark, // Include the remark in the request
      });

      setCollections((prev) => prev.filter((c) => c.id !== id));
      toast.success("Collection deleted successfully");
      setDeleteModalVisible(false);
      setRemark(""); // Reset remark
    } catch (error) {
      console.error("Error Deleting Collection:", error);
      toast.error("Failed to Delete Collection");
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
          <CCardBody className="collection-card">
            <div className="add-credit-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  marginLeft: "10px",
                }}
              >
                <div
                  className="link-btn"
                  onClick={() => {
                    // setVisible(!visible)
                    setShowEditModal(false);
                    setCurrentPopup("newCollection");
                  }}
                  // className="collection-invisible-btn-style"
                >
                  <AddBtn addBtn={"Collection"} />
                </div>
                <div className="link-btn" onClick={handleRefresh}>
                  <RefreshBtn />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onDoubleClick={() => {
                  window.open(
                    `/#Editorg?alias=${sessionStorage.getItem(
                      "alias"
                    )}&branch=${sessionStorage.getItem(
                      "selectedbranch"
                    )}&id=${sessionStorage.getItem("id")}&section=accounts`,
                    "_blank"
                  );
                }}
              >
                <div className="credit-days">
                  <label
                    for="CreditDays"
                    className="text-field-3"
                    style={{ cursor: "pointer" }}
                  >
                    Credit Days :
                  </label>
                  <label
                    className="credit-text-field-4"
                    name="creditDays"
                    onDoubleClick={() => {
                      window.open(
                        `/#Editorg?alias=${sessionStorage.getItem(
                          "alias"
                        )}&branch=${sessionStorage.getItem(
                          "selectedbranch"
                        )}&id=${sessionStorage.getItem("id")}&section=accounts`,
                        "_blank"
                      );
                    }}
                    style={{
                      border: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {creditdays}
                  </label>
                </div>
                <div className="credit-days">
                  <label
                    for="CreditDays"
                    className="text-field-3"
                    style={{ cursor: "pointer" }}
                  >
                    Followup2 Days :
                  </label>
                  <label
                    className="credit-text-field-4"
                    name="creditDays"
                    onDoubleClick={() => {
                      window.open(
                        `/#Editorg?alias=${sessionStorage.getItem(
                          "alias"
                        )}&branch=${sessionStorage.getItem(
                          "selectedbranch"
                        )}&id=${sessionStorage.getItem("id")}&section=accounts`,
                        "_blank"
                      );
                    }}
                    style={{
                      border: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {followup2}
                  </label>
                </div>
                <div className="credit-days">
                  <label
                    for="CreditDays"
                    className="text-field-3"
                    style={{ cursor: "pointer" }}
                  >
                    Followup3 Days :
                  </label>
                  <label
                    className="credit-text-field-4"
                    name="creditDays"
                    onDoubleClick={() => {
                      window.open(
                        `/#Editorg?alias=${sessionStorage.getItem(
                          "alias"
                        )}&branch=${sessionStorage.getItem(
                          "selectedbranch"
                        )}&id=${sessionStorage.getItem("id")}&section=accounts`,
                        "_blank"
                      );
                    }}
                    style={{
                      border: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {followup3}
                  </label>
                </div>
              </div>
            </div>

            <div className="left-div-table" ref={formImportRef}>
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
                      Bill No.
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Branch Name
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      TAX
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Grand Total
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Follow Up 1
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Follow Up 2
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Follow Up 3
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    ></th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Time Delay
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "120px", textAlign: "center" }}
                    >
                      Assign To
                    </th>
                    <th
                      scope="col"
                      className="row-font px-1 py-2 rounded-lg"
                      style={{ minWidth: "100px", textAlign: "center" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {collections.map((collection, index) => (
                    <tr
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
                        {formatDate(collection.Date)}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {collection.billNo}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {collection.branchnameoforg}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(
                          collection.amount
                        )}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(collection.Tax)}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(
                          collection.grandTotal
                        )}
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        <input
                          className="td-accounts py-1 rounded-lg"
                          style={{
                            minWidth: "100px",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          type="date"
                          value={collection.FollowUp1.split("T")[0]}
                          disabled
                          // Format to YYYY-MM-DD
                          // onChange={(e) => handleFollowUpChange(collection.id, 'FollowUp1', e.target.value)}
                        />
                      </td>

                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        <input
                          type="date"
                          className="td-accounts py-1 rounded-lg"
                          style={{
                            minWidth: "100px",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          value={collection.FollowUp2.split("T")[0]} // Format to YYYY-MM-DD
                          disabled
                          // onChange={(e) => handleFollowUpChange(collection.id, 'FollowUp2', e.target.value)}
                        />
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        <input
                          type="date"
                          className="td-accounts py-1 rounded-lg"
                          style={{
                            minWidth: "100px",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          value={collection.FollowUp3.split("T")[0]} // Format to YYYY-MM-DD
                          disabled
                          // onChange={(e) => handleFollowUpChange(collection.id, 'FollowUp3', e.target.value)}
                        />
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        <CFormCheck className="collection-checkbox" />
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        <input
                          type="number"
                          className="td-accounts py-1 rounded-lg"
                          style={{
                            minWidth: "100px",
                            width: "40px",
                            padding: "0px",
                            appearance: "textfield",
                            backgroundColor: "transparent",
                            border: "none",
                          }} // Ensures consistent styling across browsers}}
                          value={collection.TimeDelay ?? 0} // Default to 0 if null or undefined
                          disabled
                        />
                      </td>
                      <td
                        className="td-accounts py-1 rounded-lg"
                        style={{ minWidth: "100px", paddingRight: "2px" }}
                      >
                        {" "}
                        <NewDropdownInput
                          type="type3"
                          options={employees.map((employee) => ({
                            value: employee.fullname,
                            label: employee.fullname,
                          }))}
                          placeholder={"Assign To"}
                          selectedValue={collection.AssignTo || ""}
                          setSelectedValue={handleAssigneeChange}
                          width={"140px"}
                          nameOfDropdown={collection.id}
                        />
                      </td>
                      <td
                        className="td-accounts px-3 rounded-lg"
                        style={{ minWidth: "100px" }}
                      >
                        <div className="collection-actions-cell">
                          <div
                            // className="collection-btns"
                            // color="primary"
                            size="sm"
                            onClick={() => openEditModal(collection)}
                          >
                            <EditBtn
                              fill={
                                theme === "dark"
                                  ? "#f8d7da"
                                  : "var(--page-title)"
                              }
                            />
                          </div>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setCollectionToDelete(collection);
                              // setDeleteModalVisible(true);
                              setCurrentPopup("Deletion");
                            }}
                          >
                            <DeleteBtn
                              fill={
                                theme === "dark"
                                  ? "#f8d7da"
                                  : "var(--page-title)"
                              }
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="all-buttons">
              <div
                className="search-button"
                onClick={() => {
                  toast.success("saved Successfully");
                  handleUpdate();
                }}
              >
                <NewButton width={"120px"} text={"Save"} />
              </div>
              <div
                className="search-button"
                onClick={() => {
                  handleUpdate();
                  toast.success("Updated Successfully");
                  handleClose();
                }}
              >
                <NewButton width={"120px"} text={"Save & New"} />
              </div>
              <div
                className="search-button"
                onClick={() => {
                  handleClose();
                  toast.success("saved  Successfully");
                  handleUpdate();
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
          </CCardBody>
        </div>
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">
              Add New Bill Details
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div>
              <label for="Date" className="impcollection-txt-field">
                Date
              </label>
              <input
                type="date"
                placeholder=""
                className="text-field-1"
                name="date"
                value={collectionData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label for="Branch Name" className="impcollection-txt-field">
                Branch Name
              </label>
              <input
                type="text"
                placeholder="Branch Name"
                className="text-field-1"
                name="branchname"
                value={collectionData.branchnameoforg}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label for="Amount" className="impcollection-txt-field">
                Amount
              </label>
              <input
                type="text"
                placeholder="Amount"
                className="text-field-1"
                name="amount"
                value={collectionData.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label for="Tax" className="impcollection-txt-field">
                Tax
              </label>
              <input
                type="text"
                placeholder="Tax"
                className="text-field-1"
                name="Tax"
                value={collectionData.Tax}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label for="Grand Total" className="impcollection-txt-field">
                Grand Total
              </label>
              <input
                type="text"
                placeholder="Grand Total"
                className="text-field-1"
                name="grandTotal"
                value={collectionData.grandTotal}
                onChange={handleInputChange}
                readonly
              />
            </div>
            <div>
              <label htmlFor="AssignTo" className="impcollection-txt-field">
                Assign To
              </label>
              <select
                name="AssignTo"
                className="text-field-1"
                value={collectionData.AssignTo}
                onChange={(e) =>
                  setCollectionData({
                    ...collectionData,
                    AssignTo: e.target.value,
                  })
                }
              >
                <option value="">Select Employee</option>
                {employees.map((employee, index) => (
                  <option key={index} value={employee.fullname}>
                    {employee.fullname}
                  </option>
                ))}
              </select>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={storecollection}>
              Add New
            </CButton>
          </CModalFooter>
        </CModal>
        {/* Edit Modal */}
        {/* Delete Modal */}
        <CModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          backdrop="static"
          keyboard={false}
        >
          <CModalHeader>
            <CModalTitle>Delete Confirmation</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>
              Are you sure you want to delete Bill No{" "}
              {collectionToDelete?.billNo}?
            </p>
            <CFormInput
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter reason for deletion"
            />
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={handleDelete}
              disabled={remark === ""}
            >
              Yes, Delete
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                setDeleteModalVisible(false);
                setRemark("");
              }}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>{" "}
        {currentPopup === "newCollection" && (
          <InputPopup
            position={"fixed"}
            popupType={"andNewCollection"}
            title={showEditModal ? "Edit Collection" : "Add New Collection"}
            setCurrentPopup={setCurrentPopup}
            fields={showEditModal ? contactFields3 : contactFields2}
            value={showEditModal ? selectedCollection : collectionData}
            setValue={showEditModal ? handleEditInputChange : handleInputChange}
            handleAdd={showEditModal ? handleSaveChanges : storecollection}
            firstButtonText={showEditModal ? "Save" : "Create"}
            secondButtonText={"Close"}
            top={"50%"}
            left={parentLeft}
            width={"330px"}
          />
        )}
        {currentPopup === "Deletion" && (
          <InputPopup
            title={collectionToDelete?.billNo}
            setCurrentPopup={setCurrentPopup}
            fields={contactFields}
            value={remark}
            setValue={setRemark}
            handleAdd={handleDelete}
            firstButtonText={"Delete"}
            secondButtonText={"Close"}
            width={"450px"}
            selection={"none"}
            top={"20%"}
            left={"50%"}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Collection;
