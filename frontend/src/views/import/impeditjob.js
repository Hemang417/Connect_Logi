import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../import/css/impDelayedJob.module.css";
import SingleCalender from "src/components/SingleCalender";
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
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CNavItem,
  CNav,
  CNavLink,
  CPopover,
  CFormSwitch,
} from "@coreui/react";
import "../../css/styles.css";
import "./css/impeditjob-style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { General } from "./Innerpage";
import { O2D } from "./Innerpage";
import { DoNDelivery } from "./Innerpage";
import { ContainerDetails } from "./Innerpage";
import { D2C } from "./Innerpage";
import { DocumentUpload } from "./Innerpage";
import { TransportationDetails } from "./Innerpage";
import { Collection } from "./Innerpage";
import { Transactionhistory } from "./Innerpage";
import { Quotation } from "./Innerpage";
import { EditImpJobhistory } from "./Innerpage";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
// import { General, Registration } from './Innerpage';
import NewMultiSelectDropdown from "src/components/NewMultiSelectDropdown/NewMultiSelectDropdown";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useLocation } from "react-router-dom";
import NewInput from "src/components/NewInput/NewInput";
import NewButton from "../buttons/buttons/NewButton";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const CustomSelect = ({ options, value, onChange }) => {
  return (
    <div
      className="custom-select"
      style={{
        width: "135px",
      }}
    >
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy="Select"
        isSearchable={false} // 👈 this hides the search bar
        overrideStrings={{
          selectSomeItems: "Select container types",
          allItemsAreSelected: "",
          selectAll: "",
          unselectAll: "",
        }}
        className="custom-multi-select"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            // border: "2px so",
            color: "#3498DB",
          }),
          valueContainer: (provided) => ({
            ...provided,
            color: "#3498DB",
          }),
          input: (provided) => ({
            ...provided,
            color: "#3498DB",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#3498DB",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#00008B",
          }),
          menuList: (provided) => ({
            ...provided,
            backgroundColor: "#00008B",
          }),
          menuPortal: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            zIndex: 9999,
          }),
          option: (provided, { isSelected, isFocused }) => ({
            ...provided,
            backgroundColor: isSelected
              ? "#3498DB"
              : isFocused
              ? "#1ABC9C"
              : "#00008B",
            color: "#FFFFFF",
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#2980B9",
            color: "#FFFFFF",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "#FFFFFF",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "#FFFFFF",
            ":hover": {
              backgroundColor: "#1A5276",
              color: "white",
            },
          }),
        }}
      />
    </div>
  );
};

const impeditjob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [accessControls, setAccessControls] = useState({
    useTracking: false,
    useContainer: false,
    useTransport: false,
    useDocument: false,
    useCollection: false,
    useTransaction: false,
    useQuotation: false,
  });

  let navigate = useNavigate();

  const checkUsername = localStorage.getItem("username");
  const [showQuotation, setshowQuotation] = useState(false);
  const [containers, setContainers] = useState([]);
  const currentdateandtime = moment().format("YYYY-MM-DDTHH:mm");

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
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  const [JobformData, setJobFormData] = useState({
    jobDate: currentdateandtime,
    docReceivedOn: "",
    transportMode: "",
    customHouse: "",
    ownBooking: "",
    deliveryMode: "",
    numberOfContainer: 0,
    ownTransportation: "",
    beType: "",
    consignmentType: "",
    cfsName: "",
    shippingLineName: "",
    blType: "",
    bltypenumber: "",
    blstatus: "",
    freedays: "",
    benumber: "",
    shippinglinebond: "",
    dockExecutive: "",
    typesofContainer: "",
    onEdit: false,
  });

  const handleDateSelect2 = (date) => {
    console.log("Selected date:", date);
    console.log("type of Selected date:", typeof date);

    // Do something with the selected date
  };

  const fetchControls = async () => {
    const username = localStorage.getItem("username");
    const orgname = localStorage.getItem("orgname");
    const orgcode = localStorage.getItem("orgcode");
    const branchname = localStorage.getItem("branchnameofemp");
    const branchcode = localStorage.getItem("branchcodeofemp");

    if (!username || !orgname || !orgcode || !branchname || !branchcode) {
      console.warn("Missing required localStorage values");
      return;
    }

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/fetchaccesscontrols`,
        {
          params: {
            username,
            orgname,
            orgcode,
            branchname,
            branchcode,
            type: "IMPORT",
          },
        }
      );

      const controlSet = new Set(data?.map(({ control }) => control));

      setAccessControls({
        useTracking: controlSet.has("track-job"),
        useContainer: controlSet.has("container-details"),
        useTransport: controlSet.has("transport"),
        useDocument: controlSet.has("doc-upload"),
        useCollection: controlSet.has("collection"),
        useTransaction: controlSet.has("transaction"),
        useQuotation: controlSet.has("quotation"),
      });

      console.log("controls", data);
    } catch (error) {
      console.error("Failed to fetch access controls", error);
    }
  };

  useEffect(() => {
    fetchControls();
    // const checkUsername = localStorage.getItem("username");
    let getRole = "";
    if (checkUsername === "admin") {
      setshowQuotation(true);
    }
    if (checkUsername && checkUsername.includes("@")) {
      getRole = checkUsername.split("@")[1];
      if (getRole === "sales") {
        setshowQuotation(true);
      }
    }
  }, []);

  const handleDropdownChange = (name, value) => {
    setJobFormData({
      ...JobformData,
      [name]: value,
    });
    if (name === "ownTransportation" && value === "Yes") {
      setIsOwnTransportModalOpen(true); // Open modal
    } else if (name === "ownTransportation" && value === "No") {
      setIsOwnTransportModalOpen(false); // Close modal if "No" is selected
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobFormData({
      ...JobformData,
      [name]: value,
    });
  };

  const handleContainerWeightChange = (index, value) => {
    const updatedContainers = [...containers];
    updatedContainers[index].weight = value; // Save the weight for the specific container
    setContainers(updatedContainers);
  };

  const [isOwnTransportModalOpen, setIsOwnTransportModalOpen] = useState(false);
  const [isSwitchActive, setIsSwitchActive] = useState(null); // Default state
  const [isSwitch2Active, setIsSwitch2Active] = useState(true);
  const [shouldRender, setShouldRender] = useState(isSwitch2Active);
  const [showContainer, setShowContainer] = useState(true); // Default state
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get("section") || "general";
  const jobnumber = queryParams.get("jobnumber");
  console.log("jobnumber", jobnumber);
  const [activeTab, setactiveTab] = useState(section);
  const tabs = [
    { label: "General", alwaysVisible: true, name: "general" },
    { label: "Tracking", alwaysVisible: false, name: "DoNDelivery" },
    {
      label: "Container Details",
      alwaysVisible: false,
      name: "ContainerDetails",
    },
    { label: "Transport", alwaysVisible: false, name: "TransportationDetails" },
    { label: "Document Upload", alwaysVisible: false, name: "documentupload" },
    { label: "Collection", alwaysVisible: false, name: "Collection" },
    {
      label: "Transcation History",
      alwaysVisible: false,
      name: "Transactionhistory",
    },
    { label: "Quotaiton", alwaysVisible: false, name: "Quotation" },
    { label: "Edit History", alwaysVisible: true, name: "Edithistory" },
  ];

  const visibleTabs = tabs.filter((tab) => {
    if (checkUsername === "admin") return true;
    if (tab.alwaysVisible) return true;
    switch (tab.name) {
      case "TransportationDetails":
        return (
          JobformData.ownTransportation === "Yes" && accessControls.useTransport
        );
      case "DoNDelivery":
        return accessControls.useTracking;
      case "ContainerDetails":
        return accessControls.useContainer;
      case "documentupload":
        return accessControls.useDocument;
      case "Collection":
        return accessControls.useCollection;
      case "Transactionhistory":
        return accessControls.useTransaction;
      case "Quotation":
        return accessControls.useQuotation;
      default:
        return false;
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSection = params.get("section");
    const currentJobNumber = params.get("jobnumber");

    // If no section is specified, default to "general"
    if (!currentSection) {
      navigate(`/impeditjob?jobnumber=${currentJobNumber}&section=general`, {
        replace: true, // Replace the current entry in the history stack
      });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const fetchJobStatus = async () => {
      // Fetch the current job status to set initial state
      try {
        const response = await axios.get(`${API_BASE_URL}/getJobStatus`, {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchcode: localStorage.getItem("branchcodeofemp"),
            branchname: localStorage.getItem("branchnameofemp"),
            jobnumber: jobnumber,
          },
        });

        if (response.status === 200) {
          const isActive = response.data.IsActive; // Ensure this path is correct
          setIsSwitchActive(isActive === 0); // Set true if IsActive is 0 (active)
          console.log("Job status fetched:", isActive);
        }
      } catch (error) {
        console.error("Error fetching job status:", error);
      }
    };

    if (jobnumber) {
      fetchJobStatus();
    }
  }, [jobnumber]);

  const toggleJobActiveStatus = async () => {
    const newActiveState = !isSwitchActive;
    const isActiveValue = newActiveState ? 0 : 1; // 0 = Active, 1 = Inactive

    console.log("Toggling job status to:", isActiveValue); // Log the value before sending to backend

    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateToActiveNinActioe`,
        {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchcode: localStorage.getItem("branchcodeofemp"),
          branchname: localStorage.getItem("branchnameofemp"),
          jobnumber: jobnumber,
          IsActive: isActiveValue, // Send the new status directly
        }
      );

      if (response.status === 200) {
        setIsSwitchActive(newActiveState);
        console.log("after toggle", newActiveState); // Log the new state
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const [prefillData, setPrefillData] = useState(null);

  const fetchDataForO2D = async (jobNumber) => {
    // Accept jobNumber as parameter
    try {
      const response = await axios.get(
        `${API_BASE_URL}/prefillCreateJob`,
        { params: { jobnumber: jobNumber } }
      );
      setPrefillData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleswitch = () => {
    setIsSwitch2Active(!isSwitch2Active);
  };

  useEffect(() => {
    // Check if the shown component is "o2d" and localStorage has the flag set
    if (section === "o2d") {
      fetchDataForO2D();
      // Fetch data for prefilling
      // localStorage.removeItem('onO2D');
    }
  }, [section]);

  useEffect(() => {
    if (jobnumber) {
      // Use jobnumber from URL
      fetchDataForO2D(jobnumber); // Pass jobnumber
    }
  }, [jobnumber]); // Trigger when URL changes

  useEffect(() => {
    if (prefillData) {
      setIsSwitchActive(prefillData.IsActive === 0);
      setJobFormData({
        jobDate: moment(prefillData.jobdate).format("YYYY-MM-DDTHH:mm"),
        docReceivedOn: moment(prefillData.docreceivedon).format(
          "YYYY-MM-DDTHH:mm"
        ),
        transportMode: prefillData.transportmode,
        customHouse: prefillData.customhouse,
        ownBooking: prefillData.ownbooking,
        deliveryMode: prefillData.deliverymode,
        numberOfContainer: prefillData.noofcontainer,
        ownTransportation: prefillData.owntransportation,
        beType: prefillData.betype,
        consignmentType: prefillData.consignmenttype,
        cfsName: prefillData.cfsname,
        shippingLineName: prefillData.shippinglinename,
        blType: prefillData.bltype,
        bltypenumber: prefillData.bltypenum,
        blstatus: prefillData.blstatus,
        freedays: prefillData.freedays,
        benumber: prefillData.benumber,
        shippinglinebond: prefillData.shippinglinebond,
        dockExecutive: prefillData.dockExecutive,
        OwnTransportFrom: prefillData.OwnTransportFrom,
        OwnTransportTo: prefillData.OwnTransportTo,
        importername: prefillData.importername,
        importerbranchname: prefillData.importerbranchname,
        address: prefillData.address,
        portofshipment: prefillData.portofshipment,
        finaldestination: prefillData.finaldestination,
        typesofContainer: prefillData.typesofContainer,
        gst: prefillData.GST,
        iec: prefillData.IEC,
        onEdit: true,
      });
      if (prefillData.typesofContainer) {
        const containerTypesArray = prefillData.typesofContainer
          .split(",") // Split by commas
          .map((type) => ({ value: type.trim(), label: type.trim() })); // Map to value-label objects

        setSelectedContainerTypes(containerTypesArray);
      } else {
        setSelectedContainerTypes([]); // Empty selection if not defined
      }
      localStorage.setItem("importernameofjob", prefillData.importername);
      localStorage.setItem("currentbranchorg", prefillData.importerbranchname);
    }
  }, [prefillData]);

  const containerTypeOptions = [
    { value: "20'", label: "20'" },
    { value: "40'", label: "40'" },
    { value: "20' ISO Tank", label: "20' ISO Tank" },
    { value: "40' ISO Tank", label: "40' ISO Tank" },
    { value: "LCL", label: "LCL" },
    { value: "Flat Bulk", label: "Flat Bulk" },
    { value: "Break Bulk", label: "Break Bulk" },
  ];
  const [selectedContainerTypes, setSelectedContainerTypes] = useState([]);
  const handleContainerTypeChange = (selectedOptions) => {
    setSelectedContainerTypes(selectedOptions);
    // If you want to update the JobformData with selected container types
    setJobFormData({
      ...JobformData,
      typesofContainer: selectedOptions
        .map((option) => option.value)
        .join(", "), // Join selected values as a string
    });
  };

  const isEditable = JobformData.onEdit === true && isSwitchActive === false;

  // Add this before the return statement
  const renderTabContent = () => {
    try {
      console.log("JobformData!:", JobformData);
      switch (section) {
        case "general":
          return <General data={JobformData} setData={setJobFormData} />;
        case "DoNDelivery":
          return <DoNDelivery data={JobformData} setData={setJobFormData} />;
        case "ContainerDetails":
          return (
            <ContainerDetails data={JobformData} setData={setJobFormData} />
          );
        case "TransportationDetails":
          return JobformData.ownTransportation === "Yes" ? (
            <TransportationDetails
              data={JobformData}
              setData={setJobFormData}
            />
          ) : null;
        case "documentupload":
          return <DocumentUpload data={JobformData} setData={setJobFormData} />;
        case "Collection":
          return <Collection data={JobformData} setData={setJobFormData} />;
        case "Transactionhistory":
          return (
            <Transactionhistory data={JobformData} setData={setJobFormData} />
          );
        case "Quotation":
          return showQuotation ? (
            <Quotation data={JobformData} setData={setJobFormData} />
          ) : null;
        case "Edithistory":
          return (
            <EditImpJobhistory data={JobformData} setData={setJobFormData} />
          );
        default:
          return <General data={JobformData} setData={setJobFormData} />;
      }
    } catch (error) {
      console.error("Error rendering tab content:", error);
      return <div>Error loading content. Please try again.</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      style={{ position: "relative" }}
    >
      {" "}
      {(JobformData.onEdit === true || prefillData) && ( // Use boolean true instead of string "true"
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px",
            marginTop: "0px",
            gap: "10px",
            position: "relative",
          }}
        >
          <div
            className="imp-create-title"
            style={{ position: "absolute", margin: "0px" }}
          >
            <h4>Import Details</h4>
          </div>
          <CFormSwitch
            style={{
              backgroundColor: isSwitchActive ? "green" : "initial",
              borderColor: isSwitchActive ? "green" : "initial",
              transition: "background-color 0.3s, border-color 0.3s",
              position: "absolute",
              right: "80px",
              zIndex: "10",
            }}
            id="formSwitchCheckDefaultNormal"
            className=""
            checked={isSwitchActive}
            onChange={toggleJobActiveStatus}
            disabled={
              localStorage.getItem("username") !== "admin" &&
              isSwitchActive === false
            }
          />
          <span className="job-text-field-3" style={{ fontSize: "18px" }}>
            {isSwitchActive ? "active" : "inactive"}
          </span>
        </div>
      )}
      <div
        className="container-div"
        style={{
          // opacity: isSwitch2Active ? 1 : 0,
          minHeight: isSwitch2Active ? "auto" : "38px",
          maxHeight: isSwitch2Active ? "500px" : "38px",
          padding: "10px 4px",
          // overflow: "hidden",
          transition: "opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
          display: shouldRender ? "block" : "none",
          borderBottom: `1px solid ${theme === "dark" ? "#F6FCFF" : "#333D70"}`,
          // borderTop: `1px solid ${theme === "dark" ? "#F6FCFF" : "#333D70"}`,
          position: "relative",
        }}
      >
        <CCardBody>
          <CCard
            className="global-card"
            style={{ padding: "20px", borderRadius: "34px" }}
          >
            <div className="job-grid-container">
              <div className="switch-container">
                <div
                  className={`switch-item ${
                    !isSwitch2Active ? "visible" : "hidden"
                  }`}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <label for="Job No." className="job-text-field-3">
                    Job No:
                  </label>
                  <label className="job-text-field-4">{jobnumber || ""}</label>
                </div>
                <div
                  className={`switch-item ${
                    isSwitch2Active ? "visible" : "hidden"
                  }`}
                >
                  <label for="Job No." className="job-text-field-3">
                    Job No:
                  </label>
                  <label
                    type="text"
                    placeholder=""
                    className="job-text-field-4"
                    readOnly
                  >
                    {jobnumber || ""}
                  </label>
                </div>
              </div>

              <div className="switch-container">
                <div
                  className={`switch-item ${
                    !isSwitch2Active ? "visible" : "hidden"
                  }`}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <label className="job-text-field-3">Branch Name:</label>
                  <label className="job-text-field-4" name="Branch Name">
                    {localStorage.getItem("Selectedbranchorg") || ""}
                  </label>
                </div>
                <div
                  className={`switch-item ${
                    isSwitch2Active ? "visible" : "hidden"
                  }`}
                >
                  <label className="job-text-field-3">Job Date:</label>
                  <NewInput
                    height={"22px"}
                    width={"135px"}
                    type={"text"}
                    name="jobDate"
                    selectedValue={
                      JobformData.jobDate
                        ? JobformData.jobDate
                        : currentdateandtime
                    }
                    readlyOnly={true}
                  />
                </div>
              </div>

              <div className="switch-container">
                <div
                  className={`switch-item ${
                    !isSwitch2Active ? "visible" : "hidden"
                  }`}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <label className="job-text-field-3">Importer Name:</label>
                  <label className="job-text-field-4" name="Branch Name">
                    {localStorage.getItem("importernameofjob") || ""}
                  </label>
                </div>
                <div
                  style={{ zIndex: "100" }}
                  className={`switch-item ${
                    isSwitch2Active ? "visible" : "hidden"
                  }`}
                >
                  <label
                    for="Doc. Received On Date"
                    className="job-text-field-3"
                  >
                    Doc. Received On:
                  </label>
                  {/* <NewInput
                                      height={"22px"}

                  width={"135px"}
                  type={"datetime-local"}
                  name={"docReceivedOn"}
                  selectedValue={JobformData.docReceivedOn}
                  setSelectedValue={handleChange}
                  disabled={isEditable}
                /> */}
                  <SingleCalender
                    width={"135px"}
                    name={"docReceivedOn"}
                    value={JobformData.docReceivedOn}
                    onDateSelect={handleChange}
                    readOnly={isEditable}
                    leftright={"left"}
                    renderTime={true}
                    height={"22px"}
                  />
                </div>
              </div>

              <div className="switch-container">
                <div
                  className={`switch-item ${
                    !isSwitch2Active ? "visible" : "hidden"
                  }`}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <label for="Delivery Mode" className="job-text-field-3">
                    No. of Container:
                  </label>
                  <label className="job-text-field-4" name="numberOfContainer">
                    {JobformData.numberOfContainer}
                  </label>
                </div>
                <div
                  className={`switch-item ${
                    isSwitch2Active ? "visible" : "hidden"
                  }`}
                >
                  {console.log(
                    "JobformData.ownTransportation ",
                    JobformData.ownTransportation
                  )}
                  <label for="Transport Mode" className="job-text-field-3">
                    Transport Mode:
                  </label>
                  <NewDropdownInput
                    height={"22px"}
                    type="type2"
                    options={[
                      { value: "Air", label: "Air" },
                      { value: "Sea", label: "Sea" },
                    ]}
                    placeholder={""}
                    selectedValue={JobformData.transportMode || ""}
                    setSelectedValue={handleDropdownChange}
                    width={"135px"}
                    nameOfDropdown={"transportMode"}
                    isDisabled={isEditable}
                  />
                </div>
              </div>
              <div className="grid-equalizer-2">
                <label for="Custom House" className="job-import-label-field">
                  Custom House:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Mumbai Sea", label: "Mumbai Sea" },
                    { value: "Kolkata Sea", label: "Kolkata Sea" },
                    { value: "Raxaul LCS", label: "Raxaul LCS" },
                    { value: "Jogbani LCS", label: "Jogbani LCS" },
                    { value: "Sonauli LCS", label: "Sonauli LCS" },
                    {
                      value: "Pipavav Victor Port",
                      label: "Pipavav (Victor) Port",
                    },
                    { value: "Hazira", label: "Hazira" },
                    { value: "ICD Tumb", label: "ICD Tumb" },
                    { value: "Mundra Sea", label: "Mundra Sea" },
                    { value: "Nhava Sea", label: "Nhava Sea" },
                    { value: "Vadodra ICD", label: "Vadodra ICD" },
                    { value: "Valvada ICD", label: "Valvada ICD" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.customHouse || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"customHouse"}
                  isDisabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="Job Owner" className="job-import-label-field">
                  Job Owner:
                </label>
                <NewInput
                  height={"22px"}
                  width={"135px"}
                  type={"text"}
                  selectedValue={
                    localStorage.getItem("username")
                      ? localStorage.getItem("username")
                      : ""
                  }
                  readlyOnly={true}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="Delivery Mode" className="job-import-label-field">
                  Own Booking:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.ownBooking || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"ownBooking"}
                  isDisabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="Delivery Mode" className="job-import-label-field">
                  Delivery Mode:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Loaded", label: "Loaded" },
                    { value: "Destuff", label: "Destuff" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.deliveryMode || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"deliveryMode"}
                  isDisabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="Delivery Mode" className="job-import-label-field">
                  No. of Container:
                </label>
                <label className="job-text-field-4" name="numberOfContainer">
                  {JobformData.numberOfContainer}
                </label>
              </div>
              <div className="grid-equalizer-1" style={{ height: "24px" }}>
                <label
                  for="containerType"
                  className="job-text-field-3"
                  style={{ margin: "0px", width: "122px" }}
                >
                  Types of Container:
                </label>

                <CustomSelect
                  className="Custom-MultiSelect"
                  options={containerTypeOptions}
                  value={selectedContainerTypes}
                  onChange={handleContainerTypeChange}
                  style={{ height: "24px" }}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="BE Type" className="job-import-label-field">
                  Own Transportation:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.ownTransportation || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"ownTransportation"}
                  isDisabled={isEditable}
                />
              </div>

              <div className="grid-equalizer-1">
                <label for="BE Number" className="job-import-label-field">
                  BE No:
                </label>
                <NewInput
                  height={"22px"}
                  width={"135px"}
                  type={"text"}
                  name={"benumber"}
                  selectedValue={JobformData.benumber}
                  setSelectedValue={handleChange}
                  disabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="BE Type" className="job-import-label-field">
                  BE Type:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Home", label: "Home" },
                    { value: "In-Bond", label: "In-Bond" },
                    { value: "Ex-Bond", label: "Ex-Bond" },
                    { value: "SEZ-Z", label: "SEZ-Z" },
                    { value: "SEZ-M", label: "SEZ-M" },
                    { value: "SEZ-T", label: "SEZ-T" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.beType || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"beType"}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="consignmentType" className="job-import-label-field">
                  Consignment Type:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "FCL", label: "FCL" },
                    { value: "LCL", label: "LCL" },
                    { value: "Break Bulk", label: "Break Bulk" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.consignmentType || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"consignmentType"}
                  isDisabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1" style={{ height: "24px" }}>
                <label for="CFS Name" className="job-import-label-field">
                  CFS Name:
                </label>
                <NewInput
                  height={"22px"}
                  width={"135px"}
                  type={"text"}
                  name={"cfsName"}
                  selectedValue={JobformData.cfsName}
                  setSelectedValue={handleChange}
                  disabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label
                  for="Shipping Line Name"
                  className="job-import-label-field"
                >
                  Shipping Line Name:
                </label>
                <NewInput
                  height={"22px"}
                  width={"135px"}
                  type={"text"}
                  name={"shippingLineName"}
                  selectedValue={JobformData.shippingLineName}
                  setSelectedValue={handleChange}
                  disabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="Delivery Mode" className="job-import-label-field">
                  Shipping Line Bond:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Yearly", label: "Yearly" },
                    { value: "One-Time", label: "One-Time" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.shippinglinebond || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"shippinglinebond"}
                  isDisabled={isEditable}
                />
              </div>
              <div className="grid-equalizer-1">
                <label for="Free Days" className="job-import-label-field">
                  Free Days:
                </label>
                <NewInput
                  height={"22px"}
                  width={"135px"}
                  type={"text"}
                  name={"freedays"}
                  selectedValue={JobformData.freedays}
                  setSelectedValue={handleChange}
                  disabled={isEditable}
                />
              </div>

              <div className="grid-equalizer-1">
                <label for="Bl Type" className="job-import-label-field">
                  Bl Type:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "HBL/HAWB", label: "HBL/HAWB" },
                    { value: "MBL/MAWB", label: "MBL/MAWB" },
                  ]}
                  placeholder={"BL Type"}
                  selectedValue={JobformData.blType || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"134px"}
                  nameOfDropdown={"blType"}
                  isDisabled={isEditable}
                />
              </div>

              <div className="grid-equalizer-1">
                <label for="Free Days" className="job-import-label-field">
                  {`${JobformData.blType}:`}
                </label>

                <NewInput
                  height={"22px"}
                  width={"135px"}
                  type={"text"}
                  name={"bltypenumber"}
                  selectedValue={JobformData.bltypenumber}
                  setSelectedValue={handleChange}
                  disabled={isEditable}
                />
              </div>

              <div className="grid-equalizer-1">
                <label for="Free Days" className="job-import-label-field">
                  BL Status:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[
                    { value: "Surrender", label: "Surrender" },
                    { value: "Original", label: "Original" },
                  ]}
                  placeholder={""}
                  selectedValue={JobformData.blstatus || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"blstatus"}
                  isDisabled={isEditable}
                />
              </div>

              <div className="grid-equalizer-1">
                <label for="dockExecutive" className="job-import-label-field">
                  Dock Executive:
                </label>
                <NewDropdownInput
                  height={"22px"}
                  type="type2"
                  options={[{ value: "fetch Persons", label: "fetch Persons" }]}
                  placeholder={""}
                  selectedValue={JobformData.dockExecutive || ""}
                  setSelectedValue={handleDropdownChange}
                  width={"135px"}
                  nameOfDropdown={"dockExecutive"}
                  isDisabled={isEditable}
                />
              </div>
            </div>
          </CCard>
        </CCardBody>
        <div
          onClick={handleswitch}
          style={{
            display: "flex",
            cursor: "pointer",
            // backgroundColor: "white",
            height: "22px",
            width: "30px",
            alignItems: "right",
            justifyContent: "center",
            border: `1px solid ${theme === "dark" ? "#F6FCFF" : "#333D70"}`,
            borderTop: "none",
            position: "absolute",
            bottom: "-22px",
            right: "2%",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
            marginTop: "-2px",
            marginLeft: "99%",
            zIndex: "102",
            transition: "border-color 0.3s ease-in-out",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.3s ease-in-out", // Smooth transition effect
              transform: isSwitch2Active ? "rotate(180deg)" : "rotate(0deg)", // Rotate on state change
            }}
          >
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke={theme === "dark" ? "#F6FCFF" : "#333D70"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: "100",
          backgroundColor: theme === "dark" ? "#242A36" : "#EBEFF8",
          transition: "background-color 0.3s ease",
          paddingTop: "1px",
          height: "50vh"
        }}
      >
        <div className={styles.tabsRow} style={{ margin: "29px 0px " }}>
          <div className={styles.tabsContainer}>
            {visibleTabs.map((tab) => (
              <div
                key={tab.label}
                className={
                  tab.name === activeTab
                    ? `${styles.tabs} ${styles.ActiveTab}`
                    : styles.tabs
                }
                onClick={() => {
                  setactiveTab(tab.name);
                  navigate(
                    `/impeditjob?jobnumber=${jobnumber}&section=${tab.name}`
                  );
                }}
                style={{
                  fontSize: "11px",
                  padding: "8px 4px",
                  width: "226px",
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>
        {renderTabContent()}
      </div>
    </motion.div>
  );
};

export default impeditjob;
