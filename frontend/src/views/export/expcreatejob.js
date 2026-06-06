import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
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
import Select from "react-select";
import "./css/export-styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { General } from "./Innerpage";
import { O2D } from "./Innerpage";
import { DoNDelivery } from "./Innerpage";
import { D2C } from "./Innerpage";
import { DocumentUpload } from "./Innerpage";
import { Collection } from "./Innerpage";
import { Transactionhistory } from "./Innerpage";
import { Quotation } from "./Innerpage";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
// import { General, Registration } from './Innerpage';
import DownloadRefTemplate from "../../assets/PaymentDetails.xlsx";
import NewInput from "src/components/NewInput/NewInput";
import NewButton from "../buttons/buttons/NewButton";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const CustomSelect = ({ options, value, onChange }) => {
  return (
    <div className="custom-select" style={{ width: "130px" }}>
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy="Select"
        overrideStrings={{
          selectSomeItems: "Select container types",
          allItemsAreSelected: "",
          selectAll: "",
          unselectAll: "",
        }}
        className="custom-multi-select"
        // Custom styles for smaller vertical height and consistent dropdown visibility
        style={{
          control: (provided) => ({
            ...provided,
            height: "20px", // Reduce control height
            minHeight: "20px", // Ensure consistent minimum height
            fontSize: "12px", // Font size for the control
            display: "flex",
            alignItems: "center", // Center content vertically
            // padding: "0 4px", // Minimal padding for compactness
          }),
          menu: (provided) => ({
            ...provided,
            maxHeight: "150px", // Set a reasonable height for dropdown
            overflowY: "auto", // Enable scrolling for long lists
            zIndex: 9999, // Ensure dropdown visibility above other elements
          }),
          option: (provided) => ({
            ...provided,
            height: "20px", // Reduce dropdown option height
            fontSize: "12px", // Font size for dropdown options
            display: "flex",
            alignItems: "center", // Center content vertically
            // padding: "2px 8px", // Adjust padding for compactness
          }),
          multiValue: (provided) => ({
            ...provided,
            height: "20px", // Reduce selected value badge height
            fontSize: "12px", // Font size for selected value text
            // padding: "2px 4px", // Compact padding inside badges
            display: "flex",
            alignItems: "center", // Center content vertically
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            fontSize: "12px", // Font size for selected value labels
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            fontSize: "12px", // Font size for remove icon
            display: "flex",
            alignItems: "center", // Center icon vertically
            cursor: "pointer", // Pointer cursor on hover
          }),
        }}
      />
    </div>
  );
};

const expcreatejob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/uploadExcel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("File uploaded successfully");
        // Handle response if needed
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("File upload failed");
    }
  };

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

  const downloadTemplate = () => {
    // Define the correct URL or file path
    const fileUrl = { DownloadRefTemplate }; // Replace this with the actual URL where the file is hosted

    // Create a link element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "container_template.xlsx"); // Set the downloaded file's name

    // Append the link, trigger the download, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  let navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  // const checkUsername = localStorage.getItem('username');
  const [showQuotation, setshowQuotation] = useState(false);

  const [containers, setContainers] = useState([
    { containerNo: "", weight: "", type: "" },
  ]);
  const currentdateandtime = moment().format("YYYY-MM-DDTHH:mm");

  const [JobformData, setJobFormData] = useState({
    jobDate: currentdateandtime,
    docReceivedOn: "",
    transportMode: "",
    customHouse: "",
    ownBooking: "",
    deliveryMode: "",
    numberOfContainer: "",
    ownTransportation: "",
    beType: "",
    consignmentType: "",
    cfsName: "",
    shippingLineName: "",
    bltypenumber: "",
    benumber: "",
    typesofContainer: "",
    OwnTransportFrom: "",
    OwnTransportTo: "",
    OwnTransportPickupDate: "",
    OwnTransportCurrentDate: "",
    exporterName: "",
    selectedBranch: "",
    createdat: currentdateandtime,
    dockExecutive: "",

    // branches: [],
    address: "",
    gst: "",
    iec: "",
    portShipment: "",
    finalDestination: "",
  });
  const [exporters, setExporters] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const checkUsername = localStorage.getItem("username");
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
    if (name === "ownTransportation") {
      setIsOwnTransportModalOpen(value === "Yes"); // Open modal
      // setIsOwnTransportModalOpen(true); // Open modal
    }
    // else if (name === "ownTransportation") {
    //   setIsOwnTransportModalOpen(false); // Close modal if "No" is selected
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobFormData({
      ...JobformData,
      [name]: value,
    });
    if (name === "numberOfContainer") {
      const numContainers = parseInt(value) || 0; // Parse the number or default to 0
      setContainers(
        Array.from({ length: numContainers }, (_, index) => ({
          container: index + 1,
          weight: "",
          type: "",
        }))
      );
    }
  };

  // Add this validation function near the top of your component
  const validateJobForm = () => {
    // Basic required field validation
    if (!JobformData.docReceivedOn) {
      toast.error("Document Received On date is required");
      return false;
    }

    if (!JobformData.transportMode) {
      toast.error("Transport Mode is required");
      return false;
    }

    if (!JobformData.customHouse) {
      toast.error("Custom House is required");
      return false;
    }

    if (!JobformData.ownBooking) {
      toast.error("Own Booking selection is required");
      return false;
    }

    if (!JobformData.deliveryMode) {
      toast.error("Delivery Mode is required");
      return false;
    }

    if (!JobformData.numberOfContainer) {
      toast.error("Number of Containers is required");
      return false;
    }

    // Validate number of containers is a positive integer
    if (
      isNaN(JobformData.numberOfContainer) ||
      JobformData.numberOfContainer <= 0
    ) {
      toast.error("Number of Containers must be a positive number");
      return false;
    }

    if (!JobformData.ownTransportation) {
      toast.error("Own Transportation selection is required");
      return false;
    }

    // Validate container details if containers exist
    if (containers.length > 0) {
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];

        if (!container.containerNo) {
          toast.error(`Container number is required for container ${i + 1}`);
          return false;
        }

        // Validate container number format (basic check)
        if (!/^[A-Za-z]{3,4}\d{6,8}$/.test(container.containerNo)) {
          toast.error(`Invalid container number format for container ${i + 1}`);
          return false;
        }

        if (!container.weight) {
          toast.error(`Weight is required for container ${i + 1}`);
          return false;
        }

        // Validate weight is a positive number
        if (isNaN(container.weight)) {
          toast.error(`Weight must be a number for container ${i + 1}`);
          return false;
        }

        if (!container.type) {
          toast.error(`Container type is required for container ${i + 1}`);
          return false;
        }
      }
    }

    // Exporter details validation
    if (!JobformData.exporterName) {
      toast.error("Exporter is required");
      return false;
    }

    if (!JobformData.selectedBranch) {
      toast.error("Branch is required");
      return false;
    }

    if (!JobformData.address) {
      toast.error("Address is required");
      return false;
    }

    // GST validation (15 digits, alphanumeric)
    if (
      !JobformData.gst ||
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        JobformData.gst
      )
    ) {
      toast.error("Valid GST number is required");
      return false;
    }

    // IEC validation
    if (
      !JobformData.iec ||
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(JobformData.iec.toUpperCase())
    ) {
      toast.error("Valid IEC code is required (PAN format: e.g. ABCDE1234F)");
      return false;
    }

    if (!JobformData.portShipment) {
      toast.error("Port of Shipment is required");
      return false;
    }

    if (!JobformData.finalDestination) {
      toast.error("Final Destination is required");
      return false;
    }

    // Validate own transportation details if selected
    if (JobformData.ownTransportation === "Yes") {
      // if (!JobformData.OwnTransportCurrentDate) {
      //   toast.error("Current Date is required for transportation");
      //   return false;
      // }

      if (!JobformData.OwnTransportFrom) {
        toast.error("Transport From location is required");
        return false;
      }

      if (!JobformData.OwnTransportTo) {
        toast.error("Transport To location is required");
        return false;
      }

      // if (!JobformData.OwnTransportPickupDate) {
      //   toast.error("Pickup Date is required for transportation");
      //   return false;
      // }

      // // Validate pickup date is not in the past
      // const pickupDate = new Date(JobformData.OwnTransportPickupDate);
      // const today = new Date();
      // today.setHours(0, 0, 0, 0);

      // if (pickupDate < today) {
      //   toast.error("Pickup Date cannot be in the past");
      //   return false;
      // }
    }

    // Additional validations for specific fields
    if (JobformData.benumber && !/^[A-Za-z0-9]+$/.test(JobformData.benumber)) {
      toast.error("BE Number must be alphanumeric");
      return false;
    }

    if (JobformData.blType && !JobformData.bltypenumber) {
      toast.error(`${JobformData.blType} number is required`);
      return false;
    }

    return true;
  };

  const handleContainerWeightChange = (index, field, value) => {
    const updatedContainers = [...containers];
    updatedContainers[index][field] = value; // Save the specific field
    setContainers(updatedContainers); // Save the state
  };
  const [isSwitchActive, setIsSwitchActive] = useState(false); // Default state
  const jobnumber = localStorage.getItem("jobNumber"); // Assuming job number is stored in local storage
  const [isOwnTransportModalOpen, setIsOwnTransportModalOpen] = useState(false);

  const fetchBranches = async (exporterName) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getbranchesofexpgen`,
        {
          params: {
            exporterName: exporterName,
            orgcode: localStorage.getItem("orgcode"),
            orgname: localStorage.getItem("orgname"),
          },
        }
      );
      setBranches(response.data); // Save branches state
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const handleExporterChange = async (e) => {
    // const selectedExporter = e.value;
    const selectedExporter = e;
    setJobFormData((prevState) => ({
      ...prevState,
      exporterName: selectedExporter,
      selectedBranch: "", // Reset branch when importer changes
      address: "",
      gst: "",
      iec: "",
    }));
    await fetchBranches(selectedExporter);
  };

  const uniqueExporters = exporters.filter(
    (exporter, index, self) =>
      index === self.findIndex((e) => e.clientname === exporter.clientname)
  );
  const exporterOptions = uniqueExporters.map((exporter) => ({
    value: exporter.clientname,
    label: exporter.clientname,
  }));
  useEffect(() => {
    const fetchJobStatus = async () => {
      // Fetch the current job status to set initial state
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getJobStatusForExp`,
          {
            params: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
              branchcode: localStorage.getItem("branchcodeofemp"),
              branchname: localStorage.getItem("branchnameofemp"),
              jobnumber: jobnumber,
            },
          }
        );

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
        `${API_BASE_URL}/updateToActiveNinActioeForExp`,
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

  // Modify your storeJob function to include validation
  async function storeJob(action) {
    // First validate the form
    if (!validateJobForm()) {
      return; // Don't proceed if validation fails
    }

    try {
      const username = localStorage.getItem("username");
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const branchnameoftheorg = localStorage.getItem("branchnameofemp");
      const branchcodeoftheorg = localStorage.getItem("branchcodeofemp");
      const currentDate = new Date();
      const dateinformat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
      console.log("data before api request", JobformData);

      const response = await axios.post(`${API_BASE_URL}/storeExpJob`, {
        ...JobformData,
        containerNoAndWeight: containers,
        jobOwner: username,
        orgname: nameoforg,
        orgcode: codeoforg,
        jobDate: currentdateandtime,
        branchname: branchnameoftheorg,
        branchcode: branchcodeoftheorg,
        currentdate: dateinformat,
      });

      if (response.status === 200) {
        toast.success("Job created successfully.");
        if (action === "new") {
          resetFormData();
        } else if (action === "close") {
          window.top.close();
        }
        const idofcol = response.data[0].id;
        let countofrow = response.data[0].count;
        const sendupdate = await axios.put(
          `${API_BASE_URL}/updateIdExp`,
          {
            jobno: idofcol,
            transportMode: JobformData.transportMode,
            count: countofrow,
            branchname: branchnameoftheorg,
            branchcode: branchcodeoftheorg,
            orgname: nameoforg,
            orgcode: codeoforg,
            jobOwner: username,
            exporterName: JobformData.exporterName,
            address: JobformData.address,
            gst: JobformData.gst,
            iec: JobformData.iec,
            portShipment: JobformData.portShipment,
            finalDestination: JobformData.finalDestination,
            selectedBranch: JobformData.selectedBranch,
            createdat: dateinformat,
          }
        );
        localStorage.setItem("jobNumber", sendupdate.data.jobNumberlatest);
        localStorage.setItem("jobDate", sendupdate.data.jobDaterow[0].jobdate);
      }
    } catch (error) {
      console.log(error);
      toast.error("Job creation failed");
    }
  }
  const [prefillData, setPrefillData] = useState(null);
  // const [isActive, setActive] = useState("false");
  const [isshown, setIsShown] = useState("general");

  const fetchDataForO2D = async () => {
    try {
      const jobNumber = localStorage.getItem("jobNumber");
      const response = await axios.get(
        `${API_BASE_URL}/prefillCreateJobOfExp`,
        { params: { jobnumber: jobNumber } }
      );

      setPrefillData(response.data[0]);
      // Set the prefill data here, you might want to set it in the state to render it in the O2D component
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...containers];
    updatedData[index][field] = value;
    setContainers(updatedData);
  };

  useEffect(() => {
    // Check if the shown component is "o2d" and localStorage has the flag set
    if (isshown === "o2d") {
      fetchDataForO2D(); // Fetch data for prefilling
      // localStorage.removeItem('onO2D');
    }
  }, [isshown]);

  useEffect(() => {
    if (localStorage.getItem("onEdit") === "true") {
      fetchDataForO2D();
    }
  }, []);

  useEffect(() => {
    // Set prefill data in the form fields
    if (prefillData) {
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
        benumber: prefillData.benumber,
        shippinglinebond: prefillData.shippinglinebond,
        OwnTransportFrom: prefillData.OwnTransportFrom,
        OwnTransportTo: prefillData.OwnTransportTo,
        exporterName: prefillData.exporterName,
        gst: prefillData.GST,
        iec: prefillData.IEC,
        address: prefillData.address,
        portShipment: prefillData.portofshipment,
        finalDestination: prefillData.finaldestination,
        selectedBranch: prefillData.branchname,
      });
    }
  }, [prefillData]);

  // Modify your updateJob function similarly
  async function updateJob() {
    // First validate the form
    if (!validateJobForm()) {
      return; // Don't proceed if validation fails
    }

    try {
      const jobNumber = localStorage.getItem("jobNumber");
      const response = await axios.put(`${API_BASE_URL}/updateJobExp`, {
        jobData: JobformData,
        jobnumber: jobNumber,
      });
      if (response.status === 200) {
        toast.success("Job updated successfully.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const handlePortShipment = (e) => {
    setJobFormData({
      ...JobformData,
      portShipment: e.target.value,
    });
  };

  const handleFinalDestination = (e) => {
    setJobFormData({
      ...JobformData,
      finalDestination: e.target.value,
    });
  };
  const handleBranchSelect = async (branchName) => {
    setJobFormData((prevState) => ({
      ...prevState,
      selectedBranch: branchName,
    }));
    await fetchOrganizationDetails(branchName);
  };
  localStorage.setItem("Selectedbranchorg", JobformData.selectedBranch);
  const fetchOrganizationDetails = async (branchName) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getorganizationdetails`,
        {
          params: {
            clientName: JobformData.exporterName,
            branchName: branchName,
            orgcode: localStorage.getItem("orgcode"),
            orgname: localStorage.getItem("orgname"),
          },
        }
      );
      setJobFormData((prevState) => ({
        ...prevState,
        address: response.data[0].address,
        gst: response.data[0].GST,
        iec: response.data[0].IEC,
      }));
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };
  localStorage.setItem("currentbranchorg", JobformData.selectedBranch);
  useEffect(() => {
    const fetchExporters = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getorgs`, {
          params: { orgcode: localStorage.getItem("orgcode") },
        });
        setExporters(response.data);
      } catch (error) {
        console.error("Error fetching exporters:", error);
      }
    };
    fetchExporters();
  }, []);

  async function handlesave() {
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
    location.reload(navigate("/export"));
  }

  const backButton = () => {
    navigate("/approverlog", { state: { from: "/expcreatejob" } });
  };
  const saveOwnTransportDetails = () => {
    // Optionally, show a success message
    toast.success("Own transportation details saved in state.");

    // Close the modal after saving
    setIsOwnTransportModalOpen(false);
    location.reload(navigate("/export"));
  };
  const isEditable =
    localStorage.getItem("onEdit") === "true" && isSwitchActive === false;

  const NavigateSave = () => {
    // navigate("/export")
    location.reload(navigate("/export"));
  };
  const NavigateSaveNNew = () => {
    // navigate("/export")
    handlesave();
    location.reload(navigate("/expcreatejob"));
  };
  const NavigateSaveNClose = () => {
    location.reload(navigate("/export"));
    // navigate("/export")
  };
  const NavigateClose = () => {
    navigate("/export");
    // location.reload(navigate('/expcreatejob'))
  };
  const fetchPrefillData = async () => {
    try {
      const jobNumber = localStorage.getItem("jobNumber");
      const response = await axios.get(
        `${API_BASE_URL}/prefillCreateJob`,
        {
          params: { jobnumber: jobNumber },
        }
      );
      const data = response.data[0];
      setJobFormData({
        jobDate: moment(data.jobdate).format("YYYY-MM-DDTHH:mm"),
        docReceivedOn: moment(data.docreceivedon).format("YYYY-MM-DDTHH:mm"),
        transportMode: data.transportmode,
        customHouse: data.customhouse,
        ownBooking: data.ownbooking,
        deliveryMode: data.deliverymode,
        numberOfContainer: data.noofcontainer,
        ownTransportation: data.owntransportation,
        beType: data.betype,
        consignmentType: data.consignmenttype,
        cfsName: data.cfsname,
        shippingLineName: data.shippinglinename,
        blType: data.bltype,
        blstatus: data.blstatus,
        bltypenumber: data.bltypenum,
        benumber: data.benumber,
        dockExecutive: data.dockExecutive,
        OwnTransportFrom: data.OwnTransportFrom,
        OwnTransportTo: data.OwnTransportTo,
        exporterName: data.exportername,
        selectedBranch: data.branchname,
        address: data.address,
        gst: data.GST,
        iec: data.IEC,
        portShipment: data.portofshipment,
        finalDestination: data.finaldestination,
      });
      setGeneralData({
        exporterName: data.exportername,
        selectedBranch: data.branchname,
        address: data.address,
        gst: data.GST,
        iec: data.IEC,
        portShipment: data.portofshipment,
        finalDestination: data.finaldestination,
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  const resetFormData = () => {
    setJobFormData({
      jobDate: currentdateandtime,
      docReceivedOn: "",
      transportMode: "",
      customHouse: "",
      ownBooking: "",
      deliveryMode: "",
      numberOfContainer: "",
      ownTransportation: "",
      beType: "",
      consignmentType: "",
      cfsName: "",
      shippingLineName: "",
      bltypenumber: "",
      blstatus: "",
      freedays: "",
      benumber: "",
      shippinglinebond: "",
      dockExecutive: "",
      typesofContainer: "",
      OwnTransportFrom: "",
      OwnTransportTo: "",
      OwnTransportPickupDate: "",
      OwnTransportCurrentDate: "",
      importerName: "",
      selectedBranch: "",
      createdat: currentdateandtime,
      address: "",
      gst: "",
      iec: "",
      portShipment: "",
      finalDestination: "",
    });

    JobformData.exporterName = "";
    setContainers([{ containerNo: "", weight: "", type: "" }]); // Reset containers
    setSelectedContainerTypes([]); // Reset selected container types

    window.location.reload();
  };
  useEffect(() => {
    if (localStorage.getItem("onEdit") === "true") {
      fetchPrefillData();
    }
  }, []);
  const handleClose = () => {
    window.top.close();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
      animate={{ opacity: 1, y: 0 }} // Becomes fully visible
      exit={{ opacity: 0, y: -20 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <div className="exp-create-title">
        <h4>Export Create Job</h4>
      </div>
      <div>
        {localStorage.getItem("onEdit") === "true" && (
          // Conditionally render if jobNumber exists
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px",
            }}
          >
            <CFormSwitch
              style={{
                backgroundColor: isSwitchActive ? "green" : "initial", // Change background color when checked
                borderColor: isSwitchActive ? "green" : "initial", // Change border color when checked
                transition: "background-color 0.3s, border-color 0.3s",

                // Smooth transition
              }}
              id="formSwitchCheckDefaultNormal"
              className=""
              checked={isSwitchActive} // Control the switch's checked state
              onChange={toggleJobActiveStatus}
              disabled={
                localStorage.getItem("username") !== "admin" &&
                isSwitchActive === false
              } // Non-admins can't activate
            />
            <span>{isSwitchActive ? "active" : "inactive"}</span>

            {/* Display job status */}
          </div>
        )}
        {/* <CCol xs={12}> */}
        <div
          className="mb-2 container-div"
          style={{
            margin: "0px 20px",
          }}
        >
          <CCardBody>
            <div>
              <div className="job-grid-container" style={{ columnGap: "22px" }}>
                <div className="grid-equalizer-1">
                  <label for="Job Owner" className="job-export-label-field">
                    Job Owner
                  </label>
                  <NewInput
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
                  <label for="Job Date" className="job-export-label-field">
                    Job Date
                  </label>

                  <NewInput
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
                <div className="grid-equalizer-1">
                  <label
                    for="Doc. Received On Date"
                    className="job-export-label-field"
                  >
                    Doc. Received On
                  </label>
                  <SingleCalender
                    width={"135px"}
                    name={"docReceivedOn"}
                    value={JobformData.docReceivedOn}
                    onDateSelect={handleChange}
                    readOnly={isEditable}
                    renderTime={true}
                    leftright={"left"}
                  />
                </div>
                <div className="grid-equalizer-1">
                  <label
                    for="Transport Mode"
                    className="job-export-label-field"
                  >
                    Transport Mode
                  </label>

                  <NewDropdownInput
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
                <div className="grid-equalizer-2">
                  <label for="Custom House" className="job-export-label-field">
                    Custom House
                  </label>

                  <NewDropdownInput
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
                  <label for="Delivery Mode" className="job-export-label-field">
                    Own Booking
                  </label>

                  <NewDropdownInput
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
                  <label for="dockExecutive" className="job-export-label-field">
                    Dock Executive
                  </label>

                  <NewDropdownInput
                    type="type2"
                    options={[
                      { value: "fetch Persons", label: "fetch Persons" },
                      // { value: "Kolkata Sea", label: "Kolkata Sea" },
                    ]}
                    placeholder={""}
                    selectedValue={JobformData.dockExecutive || ""}
                    setSelectedValue={handleDropdownChange}
                    width={"135px"}
                    nameOfDropdown={"dockExecutive"}
                    isDisabled={isEditable}
                  />
                </div>
                <div className="grid-equalizer-1">
                  <label for="Delivery Mode" className="job-export-label-field">
                    Delivery Mode
                  </label>

                  <NewDropdownInput
                    type="type2"
                    options={[
                      { value: "Dock Stuff", label: "Dock Stuff" },
                      { value: "Factory Stuff", label: "Factory Stuff" },
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
                  <label for="containerType" className="job-export-label-field">
                    Types of Container
                  </label>

                  <CustomSelect
                    className="Custom-MultiSelect"
                    options={containerTypeOptions}
                    value={selectedContainerTypes}
                    onChange={handleContainerTypeChange}
                  />
                </div>
                <div className="grid-equalizer-1">
                  <label for="Delivery Mode" className="job-export-label-field">
                    No. of Container
                  </label>

                  <NewInput
                    width={"135px"}
                    type={"text"}
                    name={"numberOfContainer"}
                    selectedValue={JobformData.numberOfContainer}
                    setSelectedValue={handleChange}
                    disabled={isEditable}
                  />
                </div>
                <div className="grid-equalizer-1">
                  <label for="BE Type" className="job-export-label-field">
                    Own Transportation
                  </label>

                  <NewDropdownInput
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
                  <label for="BE Number" className="job-export-label-field">
                    BE No.
                  </label>

                  <NewInput
                    width={"135px"}
                    type={"text"}
                    name={"benumber"}
                    selectedValue={JobformData.benumber}
                    setSelectedValue={handleChange}
                    disabled={isEditable}
                  />
                </div>
                <div className="grid-equalizer-1">
                  <label for="BE Type" className="job-export-label-field">
                    BE Type
                  </label>

                  <NewDropdownInput
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
                  <label
                    for="Consignment Type"
                    className="job-export-label-field"
                  >
                    Consignment Type
                  </label>

                  <NewDropdownInput
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
                <div className="grid-equalizer-1">
                  <label for="CFS Name" className="job-export-label-field">
                    CFS Name
                  </label>

                  <NewInput
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
                    className="job-export-label-field"
                  >
                    Shipping Line Name
                  </label>

                  <NewInput
                    width={"135px"}
                    type={"text"}
                    name={"shippingLineName"}
                    selectedValue={JobformData.shippingLineName}
                    setSelectedValue={handleChange}
                    disabled={isEditable}
                  />
                </div>

                <div className="grid-equalizer-1">
                  <label for="Bl Type" className="job-export-label-field">
                    Bl Type:
                  </label>

                  <NewDropdownInput
                    type="type2"
                    options={[
                      { value: "HBL/HAWB", label: "HBL/HAWB" },
                      { value: "MBL/MAWB", label: "MBL/MAWB" },
                    ]}
                    placeholder={"BL Type"}
                    selectedValue={JobformData.blType || ""}
                    setSelectedValue={handleDropdownChange}
                    width={"135px"}
                    nameOfDropdown={"blType"}
                    isDisabled={isEditable}
                  />
                </div>
                {JobformData.blType && (
                  <div className="grid-equalizer-1">
                    <label for="Free Days" className="job-export-label-field">
                      {`${JobformData.blType || ""}:`}
                    </label>

                    <NewInput
                      width={"135px"}
                      type={"text"}
                      name={"bltypenumber"}
                      selectedValue={JobformData.bltypenumber}
                      setSelectedValue={handleChange}
                      disabled={isEditable}
                    />
                  </div>
                )}
              </div>
              <div
                className="line"
                style={{ width: "100%", transform: "none" }}
              ></div>{" "}
              <div>
                <h5 className="exp-create-subtitles">Exporter Details</h5>
                <div className="grid-new-imp-create-alignment">
                  <div className="grid-imp-create-flex-inner-div">
                    <label className="new-imp-create-label-width">
                      Exporter :
                    </label>

                    <NewDropdownInput
                      type={"type1"}
                      options={exporterOptions}
                      placeholder={"Select Importer"}
                      selectedValue={JobformData.exporterName}
                      setSelectedValue={handleExporterChange}
                      width={"280px"}
                    />
                  </div>
                  <div className="grid-imp-create-flex-inner-div">
                    <label className="new-imp-create-label-width">
                      Branch :
                    </label>

                    <NewDropdownInput
                      type={"type1"}
                      options={branches.map((branch) => ({
                        value: branch.branchname,
                        label: branch.branchname,
                      }))}
                      selectedValue={JobformData.selectedBranch}
                      setSelectedValue={handleBranchSelect}
                      width={"280px"}
                    />
                  </div>

                  <div className="grid-imp-create-flex-inner-div address-span">
                    <label className="new-imp-create-label-width">
                      Address :{" "}
                    </label>
                    <textarea
                      name="address"
                      placeholder=""
                      // cols="50"
                      // rows="5"
                      className="new-impgen-address-text-area"
                      value={JobformData.address}
                      readOnly
                    ></textarea>
                  </div>

                  <div className="grid-imp-create-flex-inner-div">
                    <label className="new-imp-create-label-width">GST : </label>

                    <NewInput
                      width={"280px"}
                      type={"text"}
                      name={"gst"}
                      selectedValue={JobformData.gst}
                      readlyOnly={true}
                    />
                  </div>
                  <div className="grid-imp-create-flex-inner-div">
                    <label className="new-imp-create-label-width">
                      IEC Code :{" "}
                    </label>

                    <NewInput
                      width={"280px"}
                      type={"text"}
                      name={"iec"}
                      selectedValue={JobformData.iec}
                      readlyOnly={true}
                    />
                  </div>
                  <div className="grid-imp-create-flex-inner-div">
                    <label className="new-imp-create-label-width">
                      Port of Shipment :{" "}
                    </label>

                    <NewInput
                      width={"280px"}
                      type={"text"}
                      name={"portShipment"}
                      selectedValue={JobformData.portShipment}
                      setSelectedValue={handlePortShipment}
                    />
                  </div>

                  <div className="grid-imp-create-flex-inner-div">
                    <label className="new-imp-create-label-width">
                      Final Destination :{" "}
                    </label>
                    <div>
                      <NewInput
                        width={"280px"}
                        type={"text"}
                        name={"finalDestination"}
                        selectedValue={JobformData.finalDestination}
                        setSelectedValue={handleFinalDestination}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="line"
                style={{ width: "100%", transform: "none" }}
              ></div>
              <div>
                <h5 className="exp-create-subtitles">Container Details</h5>
                {/* <input type="text" /> */}

                {containers.length <= 10 ? (
                  <table className="table-wf">
                    <thead>
                      <tr className="head-wf" style={{ height: "22px" }}>
                        {/* <CTableHeaderCell>No. Of Container</CTableHeaderCell> */}
                        <th
                          style={{
                            padding: "5px 7px",
                            fontSize: "12px",
                            width: "200px",
                          }}
                        >
                          Container Number
                        </th>
                        <th
                          style={{
                            padding: "5px 7px",
                            fontSize: "12px",
                            width: "70px",
                          }}
                        >
                          Weight
                        </th>
                        <th
                          style={{
                            padding: "5px 7px",
                            fontSize: "12px",
                            width: "150px",
                          }}
                        >
                          Type Of Container
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {containers.map((container, index) => (
                        <tr key={index}>
                          {/* <CTableDataCell>
                          <CFormLabel>{container.containerNo}</CFormLabel>
                        </CTableDataCell> */}
                          <td
                            style={{
                              backgroundColor:
                                theme === "dark"
                                  ? index % 2 === 0
                                    ? "#3B5472" // Dark mode even row
                                    : "#263A52" // Dark mode odd row
                                  : index % 2 === 0
                                  ? "#D8F0FD" // Light mode even row
                                  : "#F6FCFF", // Light mode odd row

                              transition: "background-color 0.3s ease",
                              textAlign: "center",
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Number"
                              value={container.containerNo}
                              className="exp-create-tabledata"
                              onChange={(e) =>
                                handleContainerWeightChange(
                                  index,
                                  "containerNo",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td
                            style={{
                              backgroundColor:
                                theme === "dark"
                                  ? index % 2 === 0
                                    ? "#3B5472" // Dark mode even row
                                    : "#263A52" // Dark mode odd row
                                  : index % 2 === 0
                                  ? "#D8F0FD" // Light mode even row
                                  : "#F6FCFF", // Light mode odd row

                              transition: "background-color 0.3s ease",
                              textAlign: "center",
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Weight"
                              value={container.weight}
                              onChange={(e) =>
                                handleContainerWeightChange(
                                  index,
                                  "weight",
                                  e.target.value
                                )
                              }
                              className="exp-create-tabledata"
                            />
                          </td>
                          <td
                            style={{
                              backgroundColor:
                                theme === "dark"
                                  ? index % 2 === 0
                                    ? "#3B5472" // Dark mode even row
                                    : "#263A52" // Dark mode odd row
                                  : index % 2 === 0
                                  ? "#D8F0FD" // Light mode even row
                                  : "#F6FCFF", // Light mode odd row

                              transition: "background-color 0.3s ease",
                            }}
                          >
                            {" "}
                            <div
                              style={{
                                width: "fit-content",
                                transform: "translateX(34%)",
                              }}
                            >
                              <NewDropdownInput
                                type="type5"
                                options={selectedContainerTypes.map((item) => {
                                  return {
                                    label: item.label,
                                    value: item.value,
                                  };
                                })}
                                nameOfDropdown={"type"}
                                selectedValue={container.type}
                                setSelectedValue={handleInputChange}
                                width={"250px"}
                                index={index}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>
                    <div
                      className="line"
                      style={{ width: "100%", transform: "none" }}
                    ></div>
                    <h className="exp-create-subtitles">
                      Over 10 Container Enter in Excel File
                    </h>
                    <div className="container-upload-buttons">
                      <div>
                        <CButton color="primary" onClick={downloadTemplate}>
                          Download Template
                        </CButton>
                      </div>
                      <div>
                        <input
                          type="file"
                          accept=".xlsx, .xls"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              {JobformData.ownTransportation === "Yes" && (
                <div>
                  <div
                    className="line"
                    style={{ width: "100%", transform: "none" }}
                  ></div>
                  <h5 className="exp-create-subtitles">
                    Transportation Details
                  </h5>

                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <label className="new-imp-create-label-width">From</label>

                    <NewInput
                      width={"280px"}
                      type={"text"}
                      placeholder={"From location"}
                      name={"OwnTransportFrom"}
                      selectedValue={JobformData.OwnTransportFrom}
                      setSelectedValue={handleChange}
                    />
                  </div>

                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <label className="new-imp-create-label-width">To</label>

                    <NewInput
                      width={"280px"}
                      type={"text"}
                      placeholder={"To location"}
                      name={"OwnTransportTo"}
                      selectedValue={JobformData.OwnTransportTo}
                      setSelectedValue={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </CCardBody>
        </div>

        <div className="imp-create-job-all-buttons">
          <div
            onClick={() => {
              storeJob("new");
            }}
          >
            <NewButton text={"Save & New"} />
          </div>
          <div
            onClick={() => {
              storeJob("close");
            }}
          >
            <NewButton text={"Save & Close"} />
          </div>

          <div
            onClick={() => {
              handleClose();
            }}
          >
            <NewButton text={"Close"} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default expcreatejob;
