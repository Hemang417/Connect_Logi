import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "../../../css/styles.css";
import "../../pages/register/css/registration.css";
import { Country, State, City } from "country-state-city";
import { CCard, CCardBody } from "@coreui/react";
import axios from "axios";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewInput from "src/components/NewInput/NewInput";
import SingleCalender from "src/components/SingleCalender";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
import API_BASE_URL from "src/config/config";

const NewKYCAccess = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedIdProof, setUploadedIdProof] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [progressPercentage, setProgressPercentage] = useState(33); // Change to 100 for second page
  const [branchesoftheemp, setBranchesoftheemp] = useState([]);
  const [storedRoles, setStoredRoles] = useState([]);
  const [selectedRole, setselectedRole] = useState("");
  const [department, setDepartment] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [fileName, setFileName] = useState("");
  const [photoName, setPhotoName] = useState("");

  // Update your existing refs to include this:
  const fileInputRef = useRef();
  const idProofInputRef = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    officeMobileNumber: "",
    personalEmail: "",
    officeEmail: "",
    dateOfBirth: "",
    dateOfJoining: "",
    aadharNumber: "",
    panNumber: "",
    country: "India",
    username: "",
    role: "",
    enterPassword: "",
    confirmPassword: "",
  });
  const validateStep1 = () => {
    const {
      fullName,
      mobileNumber,
      officeMobileNumber,
      personalEmail,
      officeEmail,
      dateOfBirth,
    } = formData;

    if (!fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }

    if (!dateOfBirth) {
      toast.error("Date of Birth is required");
      return false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileNumber.trim()) {
      toast.error("Company Phone Number is required");
      return false;
    } else if (!mobileRegex.test(mobileNumber)) {
      toast.error("Invalid Company Phone Number format");
      return false;
    }

    if (!officeMobileNumber.trim()) {
      toast.error("Personal Phone Number is required");
      return false;
    } else if (!mobileRegex.test(officeMobileNumber)) {
      toast.error("Invalid Personal Phone Number format");
      return false;
    }

    if (!personalEmail.trim()) {
      toast.error("Personal Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalEmail)) {
      toast.error("Please enter a valid Personal Email");
      return false;
    }

    if (!officeEmail.trim()) {
      toast.error("Office Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officeEmail)) {
      toast.error("Please enter a valid Office Email");
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    const { aadharNumber, panNumber } = formData;
    if (!aadharNumber.trim()) {
      toast.error("Aadhar Number is required");
      return false;
    } else if (!/^\d{12}$/.test(aadharNumber)) {
      toast.error("Aadhar Number must be 12 digits");
      return false;
    }

    if (!panNumber.trim()) {
      toast.error("PAN Number is required");
      return false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      toast.error("Please enter a valid PAN Number (e.g., ABCDE1234F)");
      return false;
    }

    if (!uploadedImage) {
      toast.error("Profile Photo is required");
      return false;
    }

    if (!uploadedIdProof) {
      toast.error("ID Proof is required");
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    const { username, role, dateOfJoining, enterPassword, confirmPassword } =
      formData;

    // if (!username.trim()) {
    //   toast.error("Username is required");
    //   return false;
    // }

    if (!selectedRole.trim()) {
      toast.error("Role is required");
      return false;
    }

    if (!dateOfJoining) {
      toast.error("Date of Joining is required");
      return false;
    }

    if (!enterPassword) {
      toast.error("Password is required");
      return false;
    } else if (enterPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password");
      return false;
    } else if (enterPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const getDepartment = async () => {
    try {
      const orgcode = localStorage.getItem("orgcode");
      const orgname = localStorage.getItem("orgname");

      const response = await axios.get(`${API_BASE_URL}/getDepartment`, {
        params: {
          orgcode,
          orgname,
        },
      });

      if (response.status === 200) {
        console.log("Raw data:", response.data.data);
        const departments = response.data.data[0]; // because of nested array
        const names = departments.map((item) => item.departmentname);
        setDepartmentList(names);
        console.log("Department list:", names);
      }
    } catch (error) {
      toast.error("Failed to get department");
      console.error("Failed to get department:", error);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  async function fetchCountries() {
    const countries = Country.getAllCountries().map((country) => ({
      name: country.name,
      code: country.isoCode,
    }));
    setCountryList(countries);
  }

  const getBranches = async () => {
    try {
      const empname = decodedUsername;
      const response = await axios.get(
        `${API_BASE_URL}/branchesofthemp`,
        {
          params: {
            username: empname,
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setBranchesoftheemp(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBranches();
    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!name && !value) {
      console.log("No name or value");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event);
    setFormData((prev) => ({ ...prev, country: event }));
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    if (selectedPhoto) {
      setUploadedImage(URL.createObjectURL(selectedPhoto));
      setPhotoName(selectedPhoto.name);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUploadedIdProof(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
    }
  };

  const GetallRoles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getuserroles`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setStoredRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetallRoles();
  }, []);

  const handleSubmit = async () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
      setProgressPercentage(66);
      return;
    }

    // Validate current step before proceeding
    if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
      setProgressPercentage(100);
      return;
    }

    // Final submission for step 2
    if (!validateStep3()) return;

    try {
      // Create FormData for multipart upload
      const payload = new FormData();

      // Append all form fields
      payload.append("fullname", formData.fullName);
      payload.append("phone", formData.mobileNumber);
      payload.append("officephone", formData.officeMobileNumber);
      payload.append("personalemail", formData.personalEmail);
      payload.append("officeemail", formData.officeEmail);
      payload.append("dateofbirth", formData.dateOfBirth);
      payload.append("dateofjoining", formData.dateOfJoining);
      payload.append("aadharcard", formData.aadharNumber);
      payload.append("pancard", formData.panNumber);
      payload.append("username", generatedUsername);
      payload.append("role", selectedRole);
      payload.append("department", department);
      payload.append("password", formData.enterPassword);
      payload.append("createdby", localStorage.getItem("username"));
      payload.append("branchaccess", JSON.stringify(branchesoftheemp));

      // Append organization info from localStorage
      payload.append("orgname", localStorage.getItem("orgname"));
      payload.append("orgcode", localStorage.getItem("orgcode"));

      // Convert uploaded images to files if they're blob URLs
      if (uploadedImage) {
        const imageBlob = await fetch(uploadedImage).then((r) => r.blob());
        const imageFile = new File([imageBlob], "profile_photo.jpg", {
          type: "image/jpeg",
        });
        payload.append("profilephoto", imageFile);
      }

      if (uploadedIdProof) {
        const idBlob = await fetch(uploadedIdProof).then((r) => r.blob());
        const mimeType = idBlob.type; // e.g., "image/png" or "application/pdf"
        const ext =
          mimeType === "application/pdf"
            ? ".pdf"
            : mimeType === "image/png"
            ? ".png"
            : mimeType === "image/jpeg"
            ? ".jpg"
            : "";
        const idFile = new File([idBlob], `id_proof${ext}`, { type: mimeType });
        payload.append("idproof", idFile);
      }

      // Submit to backend
      const response = await axios.post(
        `${API_BASE_URL}/uploadKYCData`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Handle success
      if (response.status === 201 || response.status === 200) {
        toast.success(
          response.status === 201
            ? "KYC record created successfully!"
            : "KYC record updated successfully!"
        );

        // Reset form after successful submission
        setFormData({
          fullName: "",
          mobileNumber: "",
          officeMobileNumber: "",
          personalEmail: "",
          officeEmail: "",
          dateOfBirth: "",
          dateOfJoining: "",
          aadharNumber: "",
          panNumber: "",
          country: "India",
          username: "",
          role: "",
          enterPassword: "",
          confirmPassword: "",
        });
        setselectedRole("");
        setUploadedImage(null);
        setUploadedIdProof(null);
        // setCurrentStep(1);
        // setProgressPercentage(50);
        window.close();
      }
    } catch (error) {
      console.error("Submission error:", error);

      // Handle specific error cases
      if (error.response) {
        // Server responded with error status
        toast.error(
          `Server error: ${
            error.response.data.error || error.response.statusText
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error - please check your connection");
      } else {
        // Other errors
        toast.error("Error submitting KYC form. Please try again.");
      }
    }
  };

  const getUniqueId = async () => {
    // Mark as async
    if (!department) {
      console.log("department required");
      return;
    }

    try {
      // Add await for the Axios call
      const res = await axios.post(`${API_BASE_URL}/getUniqueID`, {
        department: department,
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
      });

      console.log("Response data -----------> ", res.data);

      // Update username with the new ID
      setGeneratedUsername(
        `${formData.fullName.split(" ")[0]}.${department}${
          res.data
        }@${selectedRole}`
      );
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    // Initialize with temporary ID "1"
    setGeneratedUsername(
      `${formData.fullName.split(" ")[0]}.${department}1@${selectedRole}`
    );

    if (department) {
      getUniqueId(); // Now properly handles async
    }
  }, [formData.fullName, selectedRole, department]);

  const refreshData = () => {
    alert("Refreshed Successfully");
  };

  if (currentStep === 1) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "82vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* {isLoading && <LoadingSpinner />} */}
        <CCard className="new-kyc-card">
          <div className="new-kyc-header">
            {/* <div style={{ transform: "translate(10px, 4px)" }}>
              <div onClick={refreshData} className="link-btn">
                <RefreshBtn />
              </div>
            </div> */}
            {/* <div style={{ position: "absolute", left: "20px" }}>
              <ArrowCircleLeft />
            </div> */}
            <h4
              className="page-title"
              style={{ width: "97%", marginBottom: "0px", textAlign: "left" }}
            >
              KYC: Basic Info
            </h4>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* <div className="progress-text">{progressPercentage}% </div> */}
          </div>
          <div style={{ padding: "0px 20px" }}>
            <p className="new-kyc-subtitle">
              Enter your details as they appear on the identification document
            </p>

            <div className="form-container">
              <div className="form-left">
                <div className="form-group">
                  <label className="KYC-UL">Full Name:</label>
                  <NewInput
                    name="fullName"
                    width="100%"
                    setSelectedValue={handleInputChange}
                    selectedValue={formData.fullName}
                    placeholder=""
                    type="text"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="KYC-UL">Date of Birth:</label>
                    <SingleCalender
                      width={"220px"}
                      name={"dateOfBirth"}
                      value={formData.dateOfBirth}
                      onDateSelect={handleInputChange}
                      leftright={"left"}
                    />
                  </div>
                  <div className="form-group">
                    <label className="KYC-UL">Country:</label>
                    <NewDropdownInput
                      type="type1"
                      options={countryList.map((item) => {
                        return { label: item.name, value: item.name };
                      })}
                      selectedValue={selectedCountry}
                      setSelectedValue={handleCountryChange}
                      width={"100%"}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="KYC-UL">Company Phone No.:</label>
                    <NewInput
                      name="mobileNumber"
                      width="100%"
                      setSelectedValue={handleInputChange}
                      selectedValue={formData.mobileNumber}
                      placeholder=""
                      type="text"
                    />
                  </div>

                  <div className="form-group">
                    <label className="KYC-UL">Personal Phone No.:</label>
                    <NewInput
                      name="officeMobileNumber"
                      width="100%"
                      setSelectedValue={handleInputChange}
                      selectedValue={formData.officeMobileNumber}
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="KYC-UL">Personal Mail ID:</label>
                  <NewInput
                    name="personalEmail"
                    width="100%"
                    setSelectedValue={handleInputChange}
                    selectedValue={formData.personalEmail}
                    placeholder=""
                    type="email"
                  />
                </div>

                <div className="form-group">
                  <label className="KYC-UL">Office Mail ID:</label>
                  <NewInput
                    name="officeEmail"
                    width="100%"
                    setSelectedValue={handleInputChange}
                    selectedValue={formData.officeEmail}
                    placeholder=""
                    type="email"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <div onClick={handleSubmit}>
              <NewButton text="Continue" />
            </div>
            <div
              onClick={() => {
                window.confirm("Are you sure?") ? window.close() : null;
              }}
            >
              <NewButton text="Cancel" />
            </div>
          </div>

          <style jsx>
            {`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }

              .new-kyc-header {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-top: 10px;
              }

              .form-container {
                display: flex;
                gap: 30px;
                width: 100%;
                height: 324px;
              }

              .form-left,
              .form-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 20px;
              }

              .form-row {
                display: flex;
                gap: 30px;
              }

              .form-row .form-group {
                flex: 1;
              }

              .form-group {
                display: flex;
                flex-direction: column;
                gap: 2px;
              }

              .form-actions {
                position: absolute;
                width: 86%;
                display: flex;
                align-items: center;
                justify-content: center;
                bottom: 20px;
                gap: 15px;
              }

              .link-btn {
                background: none;
                border: none;
                cursor: pointer;
              }

              @media (max-width: 768px) {
                .form-container {
                  flex-direction: column;
                  gap: 20px;
                }

                .form-row {
                  flex-direction: column;
                  gap: 20px;
                }
              }
            `}
          </style>
        </CCard>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "82vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* {isLoading && <LoadingSpinner />} */}
        <CCard className="new-kyc-card">
          <div className="new-kyc-header">
            {/* <div style={{ transform: "translate(10px, 4px)" }}>
              <div onClick={refreshData} className="link-btn">
                <RefreshBtn />
              </div>
            </div> */}
            <div
              onClick={() => {
                setCurrentStep(1);
                setProgressPercentage(33);
              }}
              style={{ position: "absolute", left: "20px", cursor: "pointer" }}
            >
              <ArrowCircleLeft />
            </div>
            <h4
              className="page-title"
              style={{ width: "97%", marginBottom: "0px", textAlign: "left" }}
            >
              KYC: Documents
            </h4>
          </div>

          {/* Progress Bar */}
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* <div className="progress-text">{progressPercentage}% </div> */}
          </div>
          <div style={{ padding: "0px 20px" }}>
            <p className="new-kyc-subtitle">
              Enter your details as they appear on the identification document
            </p>

            <div className="form-container">
              <div className="form-right">
                <div className="form-group">
                  <label className="KYC-UL">Aadhar Card No.:</label>
                  <NewInput
                    name="aadharNumber"
                    width="100%"
                    setSelectedValue={handleInputChange}
                    selectedValue={formData.aadharNumber}
                    placeholder=""
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label className="KYC-UL">PAN Card No.:</label>
                  <NewInput
                    name="panNumber"
                    width="100%"
                    setSelectedValue={handleInputChange}
                    selectedValue={formData.panNumber}
                    placeholder=""
                    type="text"
                  />
                </div>

                <div className="file-upload-group">
                  <label className="KYC-UL" style={{ width: "fit-content" }}>
                    Upload Profile Photo:
                  </label>
                  <div
                    className="file-upload-container"
                    style={{ gap: "18px" }}
                  >
                    <label
                      className={`file-upload-button ${
                        uploadedImage ? "uploaded" : ""
                      }`}
                      style={{
                        width: "fit-content",
                        maxWidth: "260px",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {!uploadedImage && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
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
                      {uploadedImage ? photoName : "Choose Photo"}
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                    </label>

                    {uploadedImage && (
                      <div className="file-actions-container">
                        <button
                          type="button"
                          className="file-edit-button"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="file-view-button"
                          onClick={() => window.open(uploadedImage, "_blank")}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
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

                <div className="file-upload-group">
                  <label className="KYC-UL" style={{ width: "fit-content" }}>
                    Upload ID Proof:
                  </label>
                  <div
                    className="file-upload-container"
                    style={{ gap: "18px" }}
                  >
                    <label
                      className={`file-upload-button ${
                        uploadedIdProof ? "uploaded" : ""
                      }`}
                      style={{
                        width: "fit-content",
                        maxWidth: "260px",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {!uploadedIdProof && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
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
                      {uploadedIdProof ? fileName : "Choose ID"}
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        ref={idProofInputRef}
                      />
                    </label>

                    {uploadedIdProof && (
                      <div className="file-actions-container">
                        <button
                          type="button"
                          className="file-edit-button"
                          onClick={() => idProofInputRef.current.click()}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="file-view-button"
                          onClick={() => window.open(uploadedIdProof, "_blank")}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
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
              </div>
            </div>
          </div>

          <div className="form-actions">
            <div onClick={handleSubmit}>
              <NewButton text="Continue" />
            </div>
            <div
              onClick={() => {
                window.confirm("Are you sure?") ? window.close() : null;
              }}
            >
              <NewButton text="Cancel" />
            </div>
          </div>

          <style jsx>
            {`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }

              .new-kyc-header {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-top: 10px;
              }

              .form-container {
                display: flex;
                gap: 30px;
                width: 100%;
                height: 324px;
              }

              .form-left,
              .form-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
              }

              .form-row {
                display: flex;
                gap: 30px;
              }

              .form-row .form-group {
                flex: 1;
              }

              .form-group {
                display: flex;
                flex-direction: column;
                gap: 2px;
              }

              .form-actions {
                position: absolute;
                width: 86%;
                display: flex;
                align-items: center;
                justify-content: center;
                bottom: 20px;
                gap: 15px;
              }

              .link-btn {
                background: none;
                border: none;
                cursor: pointer;
              }

              @media (max-width: 768px) {
                .form-container {
                  flex-direction: column;
                  gap: 20px;
                }

                .form-row {
                  flex-direction: column;
                  gap: 20px;
                }
              }
            `}
          </style>
        </CCard>
      </div>
    );
  }

  // Step 2 - Account Setup
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "82vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* {isLoading && <LoadingSpinner />} */}
      <CCard className="new-kyc-card">
        <div className="new-kyc-header">
          {/* <div style={{ transform: "translate(10px, 4px)" }}>
            <div onClick={refreshData} className="link-btn">
              <RefreshBtn />
            </div>
          </div> */}
          <div
            onClick={() => {
              setCurrentStep(2);
              setProgressPercentage(66);
            }}
            style={{ position: "absolute", left: "20px", cursor: "pointer" }}
          >
            <ArrowCircleLeft />
          </div>
          <h4
            className="page-title"
            style={{ width: "97%", marginBottom: "0px", textAlign: "left" }}
          >
            KYC: Basic Info
          </h4>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {/* <div className="progress-text">{progressPercentage}% </div> */}
        </div>
        <div className="Kyc-form-container">
          <div>
            <p className="new-kyc-subtitle">
              Enter your details as they appear on the identification document
            </p>

            <div className="form-container-step2">
              <div className="form-row">
                <div className="form-group">
                  <label className="KYC-UL">Username:</label>
                  <NewInput
                    name="username"
                    width="100%"
                    // setSelectedValue={handleInputChange}
                    selectedValue={generatedUsername}
                    placeholder=""
                    type="text"
                    readlyOnly={true}
                  />
                </div>

                <div className="form-group">
                  <label className="KYC-UL">Date of Joining:</label>
                  <SingleCalender
                    width={"100%"}
                    name={"dateOfJoining"}
                    value={formData.dateOfJoining}
                    onDateSelect={handleInputChange}
                    leftright={"left"}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="KYC-UL">Role:</label>
                  {/* <NewInput
                    name="role"
                    width="100%"
                    setSelectedValue={handleInputChange}
                    selectedValue={formData.role}
                    placeholder=""
                    type="text"
                  /> */}
                  <NewDropdownInput
                    type={"type1"}
                    width="100%"
                    setSelectedValue={setselectedRole}
                    selectedValue={selectedRole || formData.role}
                    placeholder=""
                    options={storedRoles.map((items) => ({
                      value: items.rolename,
                      label: items.rolename,
                    }))}
                  />
                </div>

                <div className="form-group">
                  <label className="KYC-UL">Department:</label>
                  <NewDropdownInput
                    type={"type1"}
                    width="100%"
                    setSelectedValue={setDepartment}
                    selectedValue={department || formData.department}
                    placeholder=""
                    options={departmentList.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="KYC-UL">Enter Password:</label>
                <NewInput
                  name="enterPassword"
                  width="100%"
                  setSelectedValue={handleInputChange}
                  selectedValue={formData.enterPassword}
                  placeholder=""
                  type="password"
                />
              </div>

              <div className="form-group">
                <label className="KYC-UL">Confirm Password:</label>
                <NewInput
                  name="confirmPassword"
                  width="100%"
                  setSelectedValue={handleInputChange}
                  selectedValue={formData.confirmPassword}
                  placeholder=""
                  type="password"
                />
              </div>
            </div>

            <div className="form-actions">
              <div onClick={handleSubmit}>
                <NewButton text="Submit" />
              </div>
              <div
                onClick={() => {
                  window.confirm("Are you sure?") ? window.close() : null;
                }}
              >
                <NewButton text="Cancel" />
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            .new-kyc-header {
              display: flex;
              align-items: center;
              gap: 20px;
              margin-top: 10px;
            }

            .form-container-step2 {
              max-width: 600px;
              display: flex;
              flex-direction: column;
              gap: 25px;
            }

            .form-row {
              display: flex;
              gap: 30px;
            }

            .form-row .form-group {
              flex: 1;
            }

            .form-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .form-actions {
              position: absolute;
              width: 71%;
              display: flex;
              align-items: center;
              justify-content: center;
              bottom: 20px;
              gap: 15px;
            }

            .link-btn {
              background: none;
              border: none;
              cursor: pointer;
            }

            @media (max-width: 768px) {
              .form-row {
                flex-direction: column;
                gap: 20px;
              }
            }
          `}
        </style>
      </CCard>
    </div>
  );
};

export default NewKYCAccess;
