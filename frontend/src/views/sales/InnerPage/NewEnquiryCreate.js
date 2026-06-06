import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import {
  CCard,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CFormInput,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormCheck,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

import "../css/sales.css";
import "../../../css/styles.css";
import NewEnquiry from "./NewEnquiry";
import Quotation from "./Quotation";
import toast from "react-hot-toast";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // ✅ Import the autoTable plugin
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
function NewEnquiryCreate() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");
  const [isshown, setIsShown] = useState("");
  const [isEditable, setIsEditable] = useState("");
  const [enquiryDetails, setenquiryDetails] = useState([]);
  const [source, setSource] = useState("new");
  const [allCompanyName, setAllCompanyName] = useState([]);
  const [showImportClearanceFields, setShowImportClearanceFields] =
    useState(false);

  const [showExportClearanceFields, setShowExportClearanceFields] =
    useState(false);
  const [showEximConsultancyFields, setShowEximConsultancyFields] =
    useState(false);
  const [showFreightBookingFields, setShowFreightBookingFields] =
    useState(false);
  const [showTransportationFields, setShowTransportationFields] =
    useState(false);
  const containerTypeOptions = [
    { value: "20'", label: "20'" },
    { value: "40'", label: "40'" },
    { value: "20' ISO Tank", label: "20' ISO Tank" },
    { value: "40' ISO Tank", label: "40' ISO Tank" },
    { value: "LCL", label: "LCL" },
    { value: "Flat Bulk", label: "Flat Bulk" },
    { value: "Break Bulk", label: "Break Bulk" },
  ];
  const [numberOfContainers, setNumberOfContainers] = useState(1);
  const [containerData, setContainerData] = useState([
    {
      weight: "",
      commodity: "",
      portOfLoading: "",
      portOfDischarge: "",
      typeOfDelivery: "",
      typeOfContainer: "",
    },
  ]);
  const [selectedContainerTypes, setSelectedContainerTypes] = useState({
    importClearance: [],
    exportClearance: [],
    freightBooking: [],
    transportation: [],
    eximConsultancy: [],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submittedOptions, setSubmittedOptions] = useState([]); // Stores final selections

  const handleCheckboxChange2 = (event) => {
    const { id, checked } = event.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleSubmit = () => {
    setSubmittedOptions(selectedOptions); // Save selected options
    setIsOpen(true);
  };

  const handleContainerTypeChange = (selectedOptions, enquiryType) => {
    setSelectedContainerTypes((prev) => ({
      ...prev,
      [enquiryType]: selectedOptions,
    }));

    setEnquiryForData((prevData) => ({
      ...prevData,
      [enquiryType]: {
        ...prevData[enquiryType],
        typeOfContainer: selectedOptions
          .map((option) => option.value)
          .join(", "),
      },
    }));
  };
  const handleContainerWeightChange = (index, field, value) => {
    const updatedContainers = [...containers];
    updatedContainers[index][field] = value; // Save the specific field
    setContainers(updatedContainers); // Save the state
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numberOfContainer") {
      const numContainers = parseInt(value) || 0; // Parse the number or default to 0

      setNumberOfContainers(numContainers);

      // Save the container data array to match the number of containers
      setContainerData(
        Array.from({ length: numContainers }, (_, index) => ({
          weight: "",
          commodity: "",
          portOfLoading: "",
          portOfDischarge: "",
          typeOfDelivery: "",
          typeOfContainer: "",
        }))
      );
    }
  };

  const [containers, setContainers] = useState([
    { containerNo: "", weight: "", type: "" },
  ]);
  const [enquiry, setEnquiry] = useState({
    username: localStorage.getItem("username"),
    companyname: "",
    contactPerson: "",
    phoneNo: "",
    emailId: "",
    enquiryFor: [],
    rfq: "",
  });

  const [enquiryForData, setEnquiryForData] = useState({
    importClearance: {
      enquiryForType: "importClearance",
      weight: "",
      commodity: "",
      portOfLoading: "",
      portOfDischarge: "",
      typeOfContainer: "",
      typeOfDelivery: "",
    },
    exportClearance: {
      enquiryForType: "exportClearance",
      weight: "",
      commodity: "",
      portOfLoading: "",
      portOfDischarge: "",
      typeOfContainer: "",
      typeOfDelivery: "",
    },
    freightBooking: {
      enquiryForType: "freightBooking",
      weight: "",
      commodity: "",
      portOfLoading: "",
      portOfDischarge: "",
      typeOfContainer: "",
      typeOfDelivery: "",
    },
    transportation: {
      enquiryForType: "transportation",
      weight: "",
      commodity: "",
      portOfLoading: "",
      portOfDischarge: "",
      typeOfContainer: "",
      typeOfDelivery: "",
    },
    eximConsultancy: {
      enquiryForType: "eximConsultancy",
      weight: "",
      commodity: "",
      portOfLoading: "",
      portOfDischarge: "",
      typeOfContainer: "",
      typeOfDelivery: "",
    },
  });

  const storeEnquiry = async () => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const branchname = localStorage.getItem("branchnameofemp");
      const branchcode = localStorage.getItem("branchcodeofemp");

      const { data: res } = await axios.post(
        `${API_BASE_URL}/storeenquirydata`,
        {
          orgname,
          orgcode,
          branchname,
          branchcode,
          enquirycreationdate: currentDate,
          clientType: source,
          ...enquiry,
        }
      );

      // Ensure that the enquiry_id is available
      if (!res.id) {
        throw new Error("Enquiry ID not returned from store enquiry data.");
      }

      const enquiryDetails = {};

      // Only include the enquiry details if the corresponding checkbox is checked
      if (enquiry.enquiryFor.includes("Import Clearance")) {
        enquiryDetails.importClearance = enquiryForData.importClearance;
      }
      if (enquiry.enquiryFor.includes("Export Clearance")) {
        enquiryDetails.exportClearance = enquiryForData.exportClearance;
      }
      if (enquiry.enquiryFor.includes("Freight Booking")) {
        enquiryDetails.freightBooking = enquiryForData.freightBooking;
      }
      if (enquiry.enquiryFor.includes("Transportation")) {
        enquiryDetails.transportation = enquiryForData.transportation;
      }
      if (enquiry.enquiryFor.includes("Exim Consultancy")) {
        enquiryDetails.eximConsultancy = enquiryForData.eximConsultancy;
      }

      const { data: response } = await axios.post(
        `${API_BASE_URL}/storeenquiryfordetails`,
        {
          enquiry_id: res.id, // Pass the enquiry_id here
          ...enquiryDetails,
        }
      );

      if (response) {
        toast.success("Enquiry Created Successfully");
        navigate("/NewEnquiry");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Create Enquiry");
    }
  };

  const handleCheckboxChange = (type) => {
    setEnquiry((prevData) => {
      const enquiryFor = prevData.enquiryFor.includes(type)
        ? prevData.enquiryFor.filter((item) => item !== type) // Remove if already selected
        : [...prevData.enquiryFor, type]; // Add if not selected

      return { ...prevData, enquiryFor };
    });
  };
  const handleImportClearanceChange = () => {
    setShowImportClearanceFields((prev) => !prev);
    handleCheckboxChange("Import Clearance");
  };

  const handleEximConsultancyChange = () => {
    setShowEximConsultancyFields((prev) => !prev);
    handleCheckboxChange("Exim Consultancy");
  };

  const handleExportClearanceChange = () => {
    setShowExportClearanceFields((prev) => !prev);
    handleCheckboxChange("Export Clearance");
  };

  const handleFreightBookingChange = () => {
    setShowFreightBookingFields((prev) => !prev);
    handleCheckboxChange("Freight Booking");
  };

  const handleTransportationChange = () => {
    setShowTransportationFields((prev) => !prev);
    handleCheckboxChange("Transportation");
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD format
    setCurrentDate(formattedDate);
  }, []);

  const handleSourceChange = (event) => {
    const { value } = event.target;
    setSource(value);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEnquiry((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleEnquiryForInputChange = (event, type) => {
    const { name, value } = event.target;

    setEnquiryForData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [name]: value,
      },
    }));
  };
  const fetchAllCompanyName = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getenquirycompanyname`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );

      setAllCompanyName(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllorgClientName = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getorgclientname`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setAllCompanyName((prevData) => [
        ...prevData,
        ...response.data.map((client) => ({ companyname: client.clientname })), // Standardize the property name
      ]);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllCompanyName();
    fetchAllorgClientName();
  }, []);

  const handleSave = async () => {
    // Add save functionality here
  };

  const [prefillData, setPrefillData] = useState(null);
  const [prefillData2, setPrefillData2] = useState({});

  const fetchPrefillData = async () => {
    try {
      const id = localStorage.getItem("enquiryid");

      const response = await axios.get(`${API_BASE_URL}/getenquirybyid`, {
        params: { id: id },
      });

      const response2 = await axios.get(
        `${API_BASE_URL}/getenquirydetailsbyid`,
        {
          params: { id: id },
        }
      );

      // Ensure response2.data is always an array
      const formattedData = Array.isArray(response2.data)
        ? response2.data
        : [response2.data];

      setenquiryDetails(formattedData); // Correctly setting array
      setPrefillData2(formattedData);
      setPrefillData(response.data[0]);

      console.log(formattedData);
    } catch (error) {
      console.error("Error fetching prefill data:", error);
    }
  };

  const generatePDF = () => {
    if (!enquiryDetails || enquiryDetails.length === 0) {
      console.error("No data available for PDF generation.");
      return;
    }

    // Create a new jsPDF instance with landscape orientation
    const doc = new jsPDF({
      orientation: "landscape", // Set orientation to landscape
      unit: "mm",
      format: "a4",
    });

    // Add a title to the PDF
    doc.text(`Enquiry Details of ${enquiry.companyname} enquiry_id-${enquiryDetails[0].enquiry_id}`, 14, 10);

    // Extract headers and table data
    const headers = Object.keys(enquiryDetails[0] || {}).slice(2);
    const tableData = enquiryDetails.map((row) =>
      headers.map((header) => row[header])
    );

    // Generate the table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 20, // Start the table below the title
    });

    // Save the PDF
    const fileName = `enquiry-details-${enquiry.companyname}-enquiry_id-${enquiryDetails[0].enquiry_id}.pdf`;
    doc.save(fileName);
  };
  useEffect(() => {
    if (localStorage.getItem("onEdit") === "true") {
      fetchPrefillData();
    }
  }, []);

  useEffect(() => {
    if (prefillData && prefillData2) {
      console.log("Prefill Data:", prefillData);
      console.log("Prefill Data 2:", prefillData2);
      setEnquiry({
        referenceNo: prefillData.referenceNo,
        clientType: prefillData.clientType,
        companyname: prefillData.companyname,
        contactPerson: prefillData.contactPerson,
        phoneNo: prefillData.phoneNo,
        emailId: prefillData.emailId,
        enquiryFor: prefillData.enquiryFor,
        rfq: prefillData.rfq,
        enquirycreationdate: prefillData.enquirycreationdate,
      });

      setSource(prefillData.clientType);
      setShowImportClearanceFields(
        prefillData.enquiryFor.includes("Import Clearance")
      );
      setShowExportClearanceFields(
        prefillData.enquiryFor.includes("Export Clearance")
      );
      setShowFreightBookingFields(
        prefillData.enquiryFor.includes("Freight Booking")
      );
      setShowTransportationFields(
        prefillData.enquiryFor.includes("Transportation")
      );
      setShowEximConsultancyFields(
        prefillData.enquiryFor.includes("Exim Consultancy")
      );

      const newEnquiryForData = {
        importClearance: {
          enquiryForType: "importClearance",
          weight: "",
          commodity: "",
          portOfLoading: "",
          portOfDischarge: "",
          typeOfContainer: "",
          typeOfDelivery: "",
        },
        exportClearance: {
          enquiryForType: "exportClearance",
          weight: "",
          commodity: "",
          portOfLoading: "",
          portOfDischarge: "",
          typeOfContainer: "",
          typeOfDelivery: "",
        },
        freightBooking: {
          enquiryForType: "freightBooking",
          weight: "",
          commodity: "",
          portOfLoading: "",
          portOfDischarge: "",
          typeOfContainer: "",
          typeOfDelivery: "",
        },
        transportation: {
          enquiryForType: "transportation",
          weight: "",
          commodity: "",
          portOfLoading: "",
          portOfDischarge: "",
          typeOfContainer: "",
          typeOfDelivery: "",
        },
        eximConsultancy: {
          enquiryForType: "eximConsultancy",
          weight: "",
          commodity: "",
          portOfLoading: "",
          portOfDischarge: "",
          typeOfContainer: "",
          typeOfDelivery: "",
        },
      };

      // Iterate over each detail in prefillData2
      prefillData2.forEach((detail) => {
        const {
          enquiryForType,
          weight,
          commodity,
          portOfLoading,
          portOfDischarge,
          typeOfContainer,
          typeOfDelivery,
        } = detail;

        // Save the corresponding enquiryForData field based on the enquiryForType
        if (enquiryForType === "importClearance") {
          setShowImportClearanceFields(true);
          newEnquiryForData.importClearance = {
            weight: weight || "",
            commodity: commodity || "",
            portOfLoading: portOfLoading || "",
            portOfDischarge: portOfDischarge || "",
            typeOfContainer: typeOfContainer || "",
            typeOfDelivery: typeOfDelivery || "",
          };
        }

        if (enquiryForType === "exportClearance") {
          setShowExportClearanceFields(true);
          newEnquiryForData.exportClearance = {
            weight: weight || "",
            commodity: commodity || "",
            portOfLoading: portOfLoading || "",
            portOfDischarge: portOfDischarge || "",
            typeOfContainer: typeOfContainer || "",
            typeOfDelivery: typeOfDelivery || "",
          };
        }

        if (enquiryForType === "freightBooking") {
          setShowFreightBookingFields(true);
          newEnquiryForData.freightBooking = {
            weight: weight || "",
            commodity: commodity || "",
            portOfLoading: portOfLoading || "",
            portOfDischarge: portOfDischarge || "",
            typeOfContainer: typeOfContainer || "",
            typeOfDelivery: typeOfDelivery || "",
          };
        }

        if (enquiryForType === "transportation") {
          setShowTransportationFields(true);
          newEnquiryForData.transportation = {
            weight: weight || "",
            commodity: commodity || "",
            portOfLoading: portOfLoading || "",
            portOfDischarge: portOfDischarge || "",
            typeOfContainer: typeOfContainer || "",
            typeOfDelivery: typeOfDelivery || "",
          };
        }

        if (enquiryForType === "eximConsultancy") {
          setShowEximConsultancyFields(true);
          newEnquiryForData.eximConsultancy = {
            weight: weight || "",
            commodity: commodity || "",
            portOfLoading: portOfLoading || "",
            portOfDischarge: portOfDischarge || "",
            typeOfContainer: typeOfContainer || "",
            typeOfDelivery: typeOfDelivery || "",
          };
        }
      });

      // Finally, set the updated enquiryForData to state
      setEnquiryForData(newEnquiryForData);
    }
  }, [prefillData, prefillData2]);

  useEffect(() => {
    if (prefillData && prefillData2) {
      // ... your existing prefill logic for enquiryForData, etc.

      // Suppose your database stored value is in prefillData.importClearance.typeOfContainer
      const storedContainers = prefillData.importClearance?.typeOfContainer;

      if (storedContainers) {
        // If storedContainers is a comma-separated string, split it into an array:
        const containerValues = storedContainers
          .split(",")
          .map((val) => val.trim());

        // Filter containerTypeOptions to get only the ones that match
        const selectedOptions = containerTypeOptions.filter((option) =>
          containerValues.includes(option.value)
        );

        // Update selectedContainerTypes state for importClearance
        setSelectedContainerTypes((prev) => ({
          ...prev,
          importClearance: selectedOptions,
        }));
      }
    }
  }, [prefillData, prefillData2, containerTypeOptions]);

  const updateprospect = async () => {
    try {
      const id = localStorage.getItem("enquiryid");
      console.log("Prospect ID:", id);
      const response = await axios.put(
        `${API_BASE_URL}/updateenquiry/${id}`,
        {
          clientType: enquiry.clientType,
          companyname: enquiry.companyname,
          contactPerson: enquiry.contactPerson,
          phoneNo: enquiry.phoneNo,
          emailId: enquiry.emailId,
          enquiryFor: enquiry.enquiryFor,
          rfq: enquiry.rfq,
        }
      );

      if (response.status === 200) {
        // toast.success("enquiry details updated successfully");
        const enquiryForDataToUpdate = {
          enquiry_id: id, // Pass the enquiry_id here
        };

        // Include the enquiry details based on the enquiryForData state
        if (showImportClearanceFields) {
          enquiryForDataToUpdate.importClearance =
            enquiryForData.importClearance;
        }
        if (showExportClearanceFields) {
          enquiryForDataToUpdate.exportClearance =
            enquiryForData.exportClearance;
        }
        if (showFreightBookingFields) {
          enquiryForDataToUpdate.freightBooking = enquiryForData.freightBooking;
        }
        if (showTransportationFields) {
          enquiryForDataToUpdate.transportation = enquiryForData.transportation;
        }
        if (showEximConsultancyFields) {
          enquiryForDataToUpdate.eximConsultancy =
            enquiryForData.eximConsultancy;
        }

        // Second API call to update enquiry for data
        const enquiryForDataResponse = await axios.put(
          `${API_BASE_URL}/updateenquiryfordetails/${id}`, // Adjust the endpoint as necessary
          enquiryForDataToUpdate
        );

        if (enquiryForDataResponse.status === 200) {
          toast.success("enquiry details updated successfully");
          fetchPrefillData();
        } else {
          console.log(enquiryForDataResponse.status);
        }

        // Clean up and navigate
        localStorage.removeItem("enquiryid");
        navigate("/NewEnquiry");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while updating the enquiry. Please try again."
      );
    }
  };

  const uniqueCompanyNames = Array.from(
    new Set(allCompanyName.map((company) => company.companyname))
  );
  const backButton = () => {
    navigate("/NewEnquiry");
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
    exit={{ opacity: 0, y: -20 }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
  >   
    <div>
      {console.log("Prospect ID:", localStorage.getItem("enquiryid"))}
      <CCard className="card-space-enquiry">
        <CCardBody className="prospect-primary-container">
          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="jobNo" className="prospect-job-label">
                Reference No :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="referenceNo"
                value={enquiry.referenceNo}
                readOnly
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-date">
              <label htmlFor="date" className="prospect-job-label">
                Date :
              </label>
              <input
                type="text"
                value={currentDate}
                // onChange={handleInputChange}
                className="job-date-field-4"
                readOnly
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="username" className="prospect-job-label">
                Username :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                value={localStorage.getItem("username")}
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="source" className="prospect-job-label">
                Client Type :
              </label>
              <div className="enquiry-source-options">
                <label
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <input
                    type="radio"
                    name="source"
                    value="new"
                    checked={source === "new"}
                    onChange={handleSourceChange}
                  />
                  New
                </label>
                <label
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <input
                    type="radio"
                    name="source"
                    value="existing"
                    checked={source === "existing"}
                    onChange={handleSourceChange}
                  />
                  Existing
                </label>
              </div>
            </div>
          </div>
          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="customerName" className="prospect-job-label">
                Company Name :
              </label>
              {source === "new" ? (
                <input
                  type="text"
                  placeholder="Company Name"
                  className="job-text-field-4"
                  name="companyname"
                  value={enquiry.companyname}
                  onChange={handleInputChange}
                />
              ) : (
                <select
                  className="job-text-field-4"
                  value={enquiry.companyname}
                  onChange={(e) => {
                    setEnquiry((prevData) => ({
                      ...prevData,
                      companyname: e.target.value,
                    }));
                  }}
                >
                  <option value="" disabled>
                    Select Company Name
                  </option>
                  {uniqueCompanyNames.map((companyName) => (
                    <option key={companyName} value={companyName}>
                      {companyName}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="contactPersonName" className="prospect-job-label">
                Contact Person Name :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="contactPerson"
                value={enquiry.contactPerson}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-primary">
            <div className="grid-equalizer-1">
              <label htmlFor="contactPersonNo" className="prospect-job-label">
                Contact Person No :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="phoneNo"
                value={enquiry.phoneNo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="prospect-job-grid-container-secondary">
            <div className="grid-equalizer-1">
              <label htmlFor="email" className="prospect-job-label">
                Email :
              </label>
              <input
                type="text"
                placeholder=""
                className="job-text-field-4"
                name="emailId"
                value={enquiry.emailId}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </CCardBody>
      </CCard>

      <CCard className="mb-2">
        <CCardBody className="py-1">
          <div style={{ display: "flex" }}>
            <label
              htmlFor="contactPersonNo"
              style={{
                paddingTop: "10px",
                marginRight: "10px",
                fontWeight: "bold",
              }}
            >
              Enquiry For :
            </label>
            <div style={{ padding: "10px", display: "flex", gap: "16px" }}>
              <label className="enquiry-option">
                <input
                  type="checkbox"
                  id="Import Clearance"
                  checked={selectedOptions.includes("Import Clearance")}
                  onChange={handleCheckboxChange2}
                />
                Import Clearance
              </label>
              <br />
              <label className="enquiry-option">
                <input
                  type="checkbox"
                  id="Export Clearance"
                  checked={selectedOptions.includes("Export Clearance")}
                  onChange={handleCheckboxChange2}
                />
                Export Clearance
              </label>
              <br />
              <label className="enquiry-option">
                <input
                  type="checkbox"
                  id="Freight Booking"
                  checked={selectedOptions.includes("Freight Booking")}
                  onChange={handleCheckboxChange2}
                />
                Freight Booking
              </label>
              <br />
              <label className="enquiry-option">
                <input
                  type="checkbox"
                  id="Transportation"
                  checked={selectedOptions.includes("Transportation")}
                  onChange={handleCheckboxChange2}
                />
                Transportation
              </label>
              <br />
              <label className="enquiry-option">
                <input
                  type="checkbox"
                  id="Exim Consultancy"
                  checked={selectedOptions.includes("Exim Consultancy")}
                  onChange={handleCheckboxChange2}
                />
                Exim Consultancy
              </label>
              <br />
            </div>
          </div>
        </CCardBody>
      </CCard>

      <CNav variant="tabs" className="nav-link-text userlist-cnav-cusros">
        {selectedOptions.includes("Import Clearance") && (
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Import Clearance" ? "active" : ""
              }`}
              onClick={() => setIsShown("Import Clearance")}
            >
              Import Clearance
            </CNavLink>
          </CNavItem>
        )}

        {selectedOptions.includes("Export Clearance") && (
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Export Clearance" ? "active" : ""
              }`}
              onClick={() => setIsShown("Export Clearance")}
              disabled={isEditable}
            >
              Export Clearance
            </CNavLink>
          </CNavItem>
        )}
        {selectedOptions.includes("Freight Booking") && (
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Freight Booking" ? "active" : ""
              }`}
              onClick={() => setIsShown("Freight Booking")}
              disabled={isEditable}
            >
              Freight Booking
            </CNavLink>
          </CNavItem>
        )}
        {selectedOptions.includes("Transportation") && (
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Transportation" ? "active" : ""
              }`}
              onClick={() => setIsShown("Transportation")}
              disabled={isEditable}
            >
              Transportation
            </CNavLink>
          </CNavItem>
        )}
        {selectedOptions.includes("Exim Consultancy") && (
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Exim Consultancy" ? "active" : ""
              }`}
              onClick={() => setIsShown("Exim Consultancy")}
              disabled={isEditable}
            >
              Exim Consultancy
            </CNavLink>
          </CNavItem>
        )}
      </CNav>

      {selectedOptions != "" && (
        <CCard>
          <CCardBody>
            <div className="prospect-job-grid-container-secondary">
              <div className="enquiry-checkbox-field">
                <div
                // className={`import-extended-div ${
                //   showImportClearanceFields ? "bordered" : ""
                // }`}
                >
                  {/* <CFormCheck
                  id="importClearanceCheck"
                  label="Import Clearance"
                  onChange={handleImportClearanceChange}
                  checked={
                    showImportClearanceFields &&
                    enquiry.enquiryFor.includes("Import Clearance")
                  }
                /> */}
                  {isshown === "Import Clearance" && (
                       <motion.div
                       initial={{ opacity: 0, }} // Starts faded & moves up
                       animate={{ opacity: 1 }} // Becomes fully visible
                       exit={{ opacity: 0,  }} // Fades out & moves up
                       transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                     >
                    <div>
                      <h3>Import Clearance</h3>
                      <div
                        className={`import-clearance-fields ${
                          showImportClearanceFields ? "bordered" : ""
                        }`}
                      >
                        <div className="checkbox-inner-single-div">
                          <label>Weight :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="weight"
                            value={enquiryForData.importClearance.weight}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "importClearance")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Commodity :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="commodity"
                            value={enquiryForData.importClearance.commodity}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "importClearance")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Loading :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfLoading"
                            value={enquiryForData.importClearance.portOfLoading}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "importClearance")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Discharge :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfDischarge"
                            value={
                              enquiryForData.importClearance.portOfDischarge
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "importClearance")
                            }
                          />
                        </div>
                        {/* <div className="checkbox-inner-single-div">
                      <label>Type of Container</label>
                      <select
                        className="clearance-fields-text-box"
                        name="typeOfContainer"
                        value={enquiryForData.importClearance.typeOfContainer}
                        onChange={(e) =>
                          handleEnquiryForInputChange(e, "importClearance")
                        }
                      >
                        <option>Select</option>

                        <option>20'</option>
                        <option>40'</option>
                        <option>20' ISO Tank</option>
                        <option>40' ISO Tank</option>
                        <option>LCL</option>
                        <option>Flat Bulk</option>
                        <option>Break Bulk</option>
                      </select>
                    </div> */}
                        <div className="checkbox-inner-single-div">
                          <label>Type of Delivery :</label>
                          <select
                            className="clearance-fields-text-box"
                            name="typeOfDelivery"
                            value={
                              enquiryForData.importClearance.typeOfDelivery
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "importClearance")
                            }
                          >
                            <option>Select</option>
                            <option>Loaded</option>
                            <option>Destuff</option>
                          </select>
                        </div>
                        {console.log(
                          "selected typr --> ",
                          enquiryForData.importClearance.typeOfContainer,
                          enquiryForData.importClearance.weight
                        )}
                        <div className="checkbox-inner-single-div">
                          <label>Type of Container :</label>
                          <CustomSelect
                            className="Custom-MultiSelect"
                            options={containerTypeOptions}
                            value={selectedContainerTypes.importClearance || []}
                            onChange={(selectedOptions) =>
                              handleContainerTypeChange(
                                selectedOptions,
                                "importClearance"
                              )
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label for="Delivery Mode">No. of Container :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="numberOfContainer"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    </motion.div>
                  )}
                </div>

                <div
                // className={`export-extended-div ${
                //   showExportClearanceFields ? "bordered" : ""
                // }`}
                >
                  {/* <CFormCheck
                  id="exportClearanceCheck"
                  label="Export Clearance"
                  onChange={handleExportClearanceChange}
                  checked={
                    showExportClearanceFields &&
                    enquiry.enquiryFor.includes("Export Clearance")
                  }
                /> */}
                  {isshown === "Export Clearance" && (
                       <motion.div
    initial={{ opacity: 0, }} // Starts faded & moves up
    animate={{ opacity: 1 }} // Becomes fully visible
    exit={{ opacity: 0,  }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
  >
                    <div>
                      <h3>Export Clearance</h3>
                      <div
                        className={`export-clearance-fields ${
                          showExportClearanceFields ? "bordered" : ""
                        }`}
                      >
                        <div className="checkbox-inner-single-div">
                          <label>Weight :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="weight"
                            value={enquiryForData.exportClearance.weight}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "exportClearance")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Commodity :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="commodity"
                            value={enquiryForData.exportClearance.commodity}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "exportClearance")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Loading :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfLoading"
                            value={enquiryForData.exportClearance.portOfLoading}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "exportClearance")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Discharge :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfDischarge"
                            value={
                              enquiryForData.exportClearance.portOfDischarge
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "exportClearance")
                            }
                          />
                        </div>
                        {/* <div className="checkbox-inner-single-div">
                      <label>Type of Container</label>
                      <select
                        className="clearance-fields-text-box"
                        name="typeOfContainer"
                        value={enquiryForData.exportClearance.typeOfContainer}
                        onChange={(e) =>
                          handleEnquiryForInputChange(e, "exportClearance")
                        }
                      >
                        <option>Select</option>

                        <option>20'</option>
                        <option>40'</option>
                        <option>20' ISO Tank</option>
                        <option>40' ISO Tank</option>
                        <option>LCL</option>
                        <option>Flat Bulk</option>
                        <option>Break Bulk</option>
                      </select>
                    </div> */}
                        <div className="checkbox-inner-single-div">
                          <label>Type of Delivery :</label>
                          <select
                            className="clearance-fields-text-box"
                            name="typeOfDelivery"
                            value={
                              enquiryForData.exportClearance.typeOfDelivery
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "exportClearance")
                            }
                          >
                            <option>Select</option>
                            <option>Factory Stuff</option>
                            <option>Dock Stuff</option>
                            <option>Cargo With Container</option>
                          </select>
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Type of Container :</label>
                          <CustomSelect
                            className="Custom-MultiSelect"
                            options={containerTypeOptions}
                            value={selectedContainerTypes.exportClearance}
                            onChange={(selectedOptions) =>
                              handleContainerTypeChange(
                                selectedOptions,
                                "exportClearance"
                              )
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label for="Delivery Mode">No. of Container :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="numberOfContainer"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    </motion.div>
                  )}
                </div>

                <div
                // className={`freight-booking-extended-div ${
                //   showFreightBookingFields ? "bordered" : ""
                // }`}
                >
                  {/* <CFormCheck
                  id="FreightBookingCheck"
                  label="Freight Booking"
                  onChange={handleFreightBookingChange}
                  checked={
                    showFreightBookingFields &&
                    enquiry.enquiryFor.includes("Freight Booking")
                  }
                /> */}
                  {isshown === "Freight Booking" && (
                       <motion.div
    initial={{ opacity: 0, }} // Starts faded & moves up
    animate={{ opacity: 1 }} // Becomes fully visible
    exit={{ opacity: 0,  }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
  >
                    <div>
                      <h3>Freight Booking</h3>
                      <div
                        className={`freight-booking-fields ${
                          showFreightBookingFields ? "bordered" : ""
                        }`}
                      >
                        <div className="checkbox-inner-single-div">
                          <label>Weight :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="weight"
                            value={enquiryForData.freightBooking.weight}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "freightBooking")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Commodity :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="commodity"
                            value={enquiryForData.freightBooking.commodity}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "freightBooking")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Loading :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfLoading"
                            value={enquiryForData.freightBooking.portOfLoading}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "freightBooking")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Discharge :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfDischarge"
                            value={
                              enquiryForData.freightBooking.portOfDischarge
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "freightBooking")
                            }
                          />
                        </div>
                        {/* <div className="checkbox-inner-single-div">
                      <label>Type of Container</label>
                      <select
                        className="clearance-fields-text-box"
                        name="typeOfContainer"
                        value={enquiryForData.freightBooking.typeOfContainer}
                        onChange={(e) =>
                          handleEnquiryForInputChange(e, "freightBooking")
                        }
                      >
                        <option>Select</option>

                        <option>20'</option>
                        <option>40'</option>
                        <option>20' ISO Tank</option>
                        <option>40' ISO Tank</option>
                        <option>LCL</option>
                        <option>Flat Bulk</option>
                        <option>Break Bulk</option>
                      </select>
                    </div> */}

                        <div className="checkbox-inner-single-div">
                          <label>Type of Delivery :</label>
                          <select
                            className="clearance-fields-text-box"
                            name="typeOfDelivery"
                            value={enquiryForData.freightBooking.typeOfDelivery}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "freightBooking")
                            }
                          >
                            <option>Select</option>
                            <option>Loaded</option>
                            <option>Destuff</option>
                          </select>
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Type of Container :</label>
                          <CustomSelect
                            className="Custom-MultiSelect"
                            options={containerTypeOptions}
                            value={selectedContainerTypes.freightBooking}
                            onChange={(selectedOptions) =>
                              handleContainerTypeChange(
                                selectedOptions,
                                "freightBooking"
                              )
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label for="Delivery Mode">No. of Container :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="numberOfContainer"
                            onChange={handleChange}
                          />
                        </div>
                        {enquiryForData.freightBooking.typeOfContainer ===
                          "LCL" && (
                          <>
                            <div className="checkbox-inner-single-div">
                              <label>Height :</label>
                              <input
                                type="text"
                                // placeholder="Enter Height"
                                className="clearance-fields-text-box"
                                name="height"
                                // value={enquiryForData.freightBooking.height}
                                // onChange={(e) => handleEnquiryForInputChange(e, "freightBooking")}
                              />
                            </div>
                            <div className="checkbox-inner-single-div">
                              <label>Length :</label>
                              <input
                                type="text"
                                // placeholder="Enter Length"
                                className="clearance-fields-text-box"
                                name="length"
                                // value={enquiryForData.freightBooking.length}
                                // onChange={(e) => handleEnquiryForInputChange(e, "freightBooking")}
                              />
                            </div>
                          </>
                          
                        )}
                      </div>
                      <hr></hr>
                    </div>
                    </motion.div>
                  )}
                </div>
                <div
                // className={`transportation-extended-div ${
                //   showTransportationFields ? "bordered" : ""
                // }`}
                >
                  {/* <CFormCheck
                  id="TransportationCheck"
                  label="Transportation"
                  onChange={handleTransportationChange}
                  checked={
                    showTransportationFields &&
                    enquiry.enquiryFor.includes("Transportation")
                  }
                /> */}
                  {isshown === "Transportation" && (
                       <motion.div
    initial={{ opacity: 0, }} // Starts faded & moves up
    animate={{ opacity: 1 }} // Becomes fully visible
    exit={{ opacity: 0,  }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} >// Smooth transition
                    <div>
                      <h3>Transportation</h3>
                      <div
                        className={`transportation-fields ${
                          showTransportationFields ? "bordered" : ""
                        }`}
                      >
                        <div className="checkbox-inner-single-div">
                          <label>Weight :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="weight"
                            value={enquiryForData.transportation.weight}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "transportation")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Commodity :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="commodity"
                            value={enquiryForData.transportation.commodity}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "transportation")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Loading :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfLoading"
                            value={enquiryForData.transportation.portOfLoading}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "transportation")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Discharge :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfDischarge"
                            value={
                              enquiryForData.transportation.portOfDischarge
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "transportation")
                            }
                          />
                        </div>
                        {/* <div className="checkbox-inner-single-div">
                      <label>Type of Container</label>
                      <select
                        className="clearance-fields-text-box"
                        name="typeOfContainer"
                        value={enquiryForData.transportation.typeOfContainer}
                        onChange={(e) =>
                          handleEnquiryForInputChange(e, "transportation")
                        }
                      >
                        <option>Select</option>

                        <option>20'</option>
                        <option>40'</option>
                        <option>20' ISO Tank</option>
                        <option>40' ISO Tank</option>
                        <option>LCL</option>
                        <option>Break Bulk</option>
                      </select>
                    </div> */}
                        <div className="checkbox-inner-single-div">
                          <label>Type of Delivery :</label>
                          <select
                            className="clearance-fields-text-box"
                            name="typeOfDelivery"
                            value={enquiryForData.transportation.typeOfDelivery}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "transportation")
                            }
                          >
                            <option>Select</option>
                            <option>Loaded</option>
                            <option>Destuff</option>
                          </select>
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Type of Container :</label>
                          <CustomSelect
                            className="Custom-MultiSelect"
                            options={containerTypeOptions}
                            value={selectedContainerTypes.transportation}
                            onChange={(selectedOptions) =>
                              handleContainerTypeChange(
                                selectedOptions,
                                "transportation"
                              )
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label for="Delivery Mode">No. of Container :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="numberOfContainer"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    </motion.div>
                  )}
                </div>

                <div
                // className={`exim-consultancy-extended-div ${
                //   showEximConsultancyFields ? "bordered" : ""
                // }`}
                >
                  {/* <CFormCheck
                  id="EximConsultancyCheck"
                  label="Exim Consultancy"
                  onChange={handleEximConsultancyChange}
                  checked={
                    showEximConsultancyFields &&
                    enquiry.enquiryFor.includes("Exim Consultancy")
                  }
                /> */}
                  {isshown === "Exim Consultancy" && (
                       <motion.div
    initial={{ opacity: 0, }} // Starts faded & moves up
    animate={{ opacity: 1 }} // Becomes fully visible
    exit={{ opacity: 0,  }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
  >
                    <div>
                      <h3>Exim Consultancy</h3>
                      <div
                        className={`exim-consultancy-fields ${
                          showEximConsultancyFields ? "bordered" : ""
                        }`}
                      >
                        {/* <div className="container-no-div">
                          <label htmlFor="DeliveryMode">
                            No. of Container :
                          </label>
                          <input
                            type="text"
                            placeholder=""
                            value={numberOfContainers}
                            className="checkbox-inner-single-div-containerno"
                            name="numberOfContainer"
                            onChange={handleChange}
                          />
                        </div>

                        <table hover responsive bordered>
                          <thead className="table-head-row-enquiry">
                            <tr className="tr-enquiry-head">
                              <th>Weight</th>
                              <th>Commodity</th>
                              <th>Port of Loading</th>
                              <th>Port of Discharge</th>
                              <th>Type of Delivery</th>
                              <th>Type of Container</th>
                            </tr>
                          </thead>
                          <tbody>
                            {containerData.map((container, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    className="width-enquiry-table"
                                    type="text"
                                    placeholder=""
                                    name="weight"
                                    value={container.weight}
                                    onChange={(e) => {
                                      const updatedData = [...containerData];
                                      updatedData[index].weight =
                                        e.target.value;
                                      setContainerData(updatedData);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="width-enquiry-table"
                                    type="text"
                                    placeholder=""
                                    name="commodity"
                                    value={container.commodity}
                                    onChange={(e) => {
                                      const updatedData = [...containerData];
                                      updatedData[index].commodity =
                                        e.target.value;
                                      setContainerData(updatedData);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="width-enquiry-table"
                                    type="text"
                                    placeholder=""
                                    name="portOfLoading"
                                    value={container.portOfLoading}
                                    onChange={(e) => {
                                      const updatedData = [...containerData];
                                      updatedData[index].portOfLoading =
                                        e.target.value;
                                      setContainerData(updatedData);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="width-enquiry-table"
                                    type="text"
                                    placeholder=""
                                    name="portOfDischarge"
                                    value={container.portOfDischarge}
                                    onChange={(e) => {
                                      const updatedData = [...containerData];
                                      updatedData[index].portOfDischarge =
                                        e.target.value;
                                      setContainerData(updatedData);
                                    }}
                                  />
                                </td>
                                <td>
                                  <select
                                    className="width-enquiry-table"
                                    name="typeOfDelivery"
                                    value={container.typeOfDelivery}
                                    onChange={(e) => {
                                      const updatedData = [...containerData];
                                      updatedData[index].typeOfDelivery =
                                        e.target.value;
                                      setContainerData(updatedData);
                                    }}
                                  >
                                    <option>Select</option>
                                    <option>Loaded</option>
                                    <option>Destuff</option>
                                  </select>
                                </td>
                                <td>
                                  <select
                                    className="width-enquiry-table"
                                    name="typeOfContainer"
                                    value={container.typeOfContainer}
                                    onChange={(e) => {
                                      const updatedData = [...containerData];
                                      updatedData[index].typeOfContainer =
                                        e.target.value;
                                      setContainerData(updatedData);
                                    }}
                                  >
                                    <option value="" disabled>
                                      Select
                                    </option>
                                    <option value="20'">20'</option>
                                    <option value="40'">40'</option>
                                    <option value="20' ISO Tank">
                                      20' ISO Tank
                                    </option>
                                    <option value="40' ISO Tank">
                                      40' ISO Tank
                                    </option>
                                    <option value="LCL">LCL</option>
                                    <option value="Flat Bulk">Flat Bulk</option>
                                    <option value="Break Bulk">
                                      Break Bulk
                                    </option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table> */}

                        <div className="checkbox-inner-single-div">
                          <label>Weight :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="weight"
                            value={enquiryForData.eximConsultancy.weight}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "eximConsultancy")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Commodity :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="commodity"
                            value={enquiryForData.eximConsultancy.commodity}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "eximConsultancy")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Loading :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfLoading"
                            value={enquiryForData.eximConsultancy.portOfLoading}
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "eximConsultancy")
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Port of Discharge :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="portOfDischarge"
                            value={
                              enquiryForData.eximConsultancy.portOfDischarge
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "eximConsultancy")
                            }
                          />
                        </div>
                        {/* <div className="checkbox-inner-single-div">
                      <label>Type of Container</label>
                      <select
                        className="clearance-fields-text-box"
                        name="typeOfContainer"
                        value={enquiryForData.transportation.typeOfContainer}
                        onChange={(e) =>
                          handleEnquiryForInputChange(e, "transportation")
                        }
                      >
                        <option>Select</option>

                        <option>20'</option>
                        <option>40'</option>
                        <option>20' ISO Tank</option>
                        <option>40' ISO Tank</option>
                        <option>LCL</option>
                        <option>Break Bulk</option>
                      </select>
                    </div> */}
                        <div className="checkbox-inner-single-div">
                          <label>Type of Delivery :</label>
                          <select
                            className="clearance-fields-text-box"
                            name="typeOfDelivery"
                            value={
                              enquiryForData.eximConsultancy.typeOfDelivery
                            }
                            onChange={(e) =>
                              handleEnquiryForInputChange(e, "eximConsultancy")
                            }
                          >
                            <option>Select</option>
                            <option>Loaded</option>
                            <option>Destuff</option>
                          </select>
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label>Type of Container :</label>
                          <CustomSelect
                            className="Custom-MultiSelect"
                            options={containerTypeOptions}
                            value={selectedContainerTypes.eximConsultancy}
                            onChange={(selectedOptions) =>
                              handleContainerTypeChange(
                                selectedOptions,
                                "eximConsultancy"
                              )
                            }
                          />
                        </div>
                        <div className="checkbox-inner-single-div">
                          <label for="Delivery Mode">No. of Container :</label>
                          <input
                            type="text"
                            placeholder=""
                            className="clearance-fields-text-box"
                            name="numberOfContainer"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <motion.div
            key={isshown}
    initial={{ opacity: 0, }} // Starts faded & moves up
    animate={{ opacity: 1 }} // Becomes fully visible
    exit={{ opacity: 0,  }} // Fades out & moves up
    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
  >
            <div className="prospect-job-grid-container-secondary">
              <div className="grid-equalizer-1">
                <label htmlFor="contactPersonNo" className="prospect-RFQ-label">
                  Request For Quote (RFQ) Reason :
                </label>
                <textarea
                  type="text"
                  placeholder=""
                  className="prospect-job-textarea"
                  name="rfq"
                  value={enquiry.rfq}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            </motion.div>
          </CCardBody>
        </CCard>
      )}

      <div style={{ display: "flex", gap: "4px" }}>
        <div className="prospect-search-button">
          {localStorage.getItem("onEdit") === "true" ? (
            <button
              className="button-23"
              type="submit"
              onClick={() => {
                updateprospect();
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="button-23"
              onClick={() => {
                storeEnquiry();
              }}
            >
              Create
            </button>
          )}
        </div>
        <div className="prospect-search-button">
          <button className="button-23" onClick={backButton}>
            Close
          </button>
        </div>
        <div className="prospect-search-button">
          <button
            className="button-23"
            onClick={generatePDF}
            disabled={!enquiryDetails}
          >
            Generate PDF
          </button>
        </div>
        <div className="prospect-search-button">
          <button
            className="button-23"
            onClick={()=> navigate("/Quotation")}
            target="_blank"
            >
            Quotation
          </button>
        </div>
      </div>
    </div>
    </motion.div>

  );
}

export default NewEnquiryCreate;
