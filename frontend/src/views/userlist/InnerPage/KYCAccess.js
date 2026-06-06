import React, { useState, useEffect, useRef, useCallback } from "react";
import { CCardBody } from "@coreui/react";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewInput from "src/components/NewInput/NewInput";
import SingleCalender from "src/components/SingleCalender";
import "../../pages/register/css/registration.css";
import FileUploadButton from "src/components/FileUploadButton/FileUploadButton";
import API_BASE_URL from "src/config/config";

const KYCAccess = () => {
  const location = useLocation();
  const decodedUsername = decodeURIComponent(
    location.pathname.split("/").pop()
  );
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedIdProof, setUploadedIdProof] = useState(null);
  const [branchesoftheemp, setBranchesoftheemp] = useState([]);
  const [photoName, setPhotoName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState([]);
  const [storedRoles, setStoredRoles] = useState([]);
  const [selectedRole, setselectedRole] = useState("");

  const handleFileChange = useCallback((fileType, e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      // Clear the specific file type
      setFilePreviews(prev => {
        const newMap = new Map(prev);
        const prevValue = newMap.get(fileType);
        if (prevValue?.previewUrl && !prevValue.previewUrl.startsWith("http")) {
          URL.revokeObjectURL(prevValue.previewUrl);
        }
        newMap.delete(fileType);
        return newMap;
      });

      if (fileType === "profilePhoto") {
        setPhoto(null);
        setPhotoName("");
        if (uploadedImage && !uploadedImage.startsWith("http")) {
          URL.revokeObjectURL(uploadedImage);
        }
        setUploadedImage(null);
      } else if (fileType === "idProof") {
        setFile(null);
        setFileName("");
        if (uploadedIdProof && !uploadedIdProof.startsWith("http")) {
          URL.revokeObjectURL(uploadedIdProof);
        }
        setUploadedIdProof(null);
      }
      return;
    }

    // Validate file size (2MB limit)
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error(`${fileType === "profilePhoto" ? "Profile photo" : "ID proof"} size should be less than 2MB`);
      e.target.value = "";
      return;
    }

    // Validate file type
    const allowedTypes = fileType === "profilePhoto"
      ? ["image/jpeg", "image/jpg", "image/png"]
      : ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error(`Only ${fileType === "profilePhoto" ? "JPEG, JPG, and PNG" : "JPEG, JPG, PNG, and PDF"} files are allowed for ${fileType === "profilePhoto" ? "profile photo" : "ID proof"}`);
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);

    setFilePreviews(prev => {
      const prevValue = prev.get(fileType);
      if (prevValue?.previewUrl && !prevValue.previewUrl.startsWith("http")) {
        URL.revokeObjectURL(prevValue.previewUrl);
      }
      const newMap = new Map(prev);
      newMap.set(fileType, {
        previewUrl,
        fileName: selectedFile.name,
        file: selectedFile
      });
      return newMap;
    });

    // Update legacy state for backward compatibility
    if (fileType === "profilePhoto") {
      setPhoto(selectedFile);
      setPhotoName(selectedFile.name);
      if (uploadedImage && !uploadedImage.startsWith("http")) {
        URL.revokeObjectURL(uploadedImage);
      }
      setUploadedImage(previewUrl);
    } else if (fileType === "idProof") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (uploadedIdProof && !uploadedIdProof.startsWith("http")) {
        URL.revokeObjectURL(uploadedIdProof);
      }
      setUploadedIdProof(previewUrl);
    }
  }, [uploadedImage, uploadedIdProof]);

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
    department: "",
    role: "",
    password: "",
    createdby: "",
  });

  useEffect(() => {
    return () => {
      if (uploadedImage && !uploadedImage.startsWith("http")) {
        URL.revokeObjectURL(uploadedImage);
      }
      if (uploadedIdProof && !uploadedIdProof.startsWith("http")) {
        URL.revokeObjectURL(uploadedIdProof);
      }

      // Cleanup filePreviews object URLs
      filePreviews.forEach(preview => {
        if (preview.previewUrl && !preview.previewUrl.startsWith("http")) {
          URL.revokeObjectURL(preview.previewUrl);
        }
      });
    };
  }, [uploadedImage, uploadedIdProof, filePreviews]);

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

  const fetchKYCData = async () => {
    try {
      const orgname = localStorage.getItem("orgname");
      const orgcode = localStorage.getItem("orgcode");
      const empnameforaccess = decodedUsername;

      console.log("Fetching KYC data for:", orgname, orgcode, empnameforaccess);
      const res = await axios.get(`${API_BASE_URL}/getKYCData`, {
        params: {
          orgname,
          orgcode,
          username: empnameforaccess,
        },
      });
      console.log("res.data", res.data);

      if (res.data) {
        const data = res.data;
        setFormData({
          fullName: data.fullname || "",
          mobileNumber: data.phone || "",
          officeMobileNumber: data.officephone || "",
          personalEmail: data.personalemail || "",
          officeEmail: data.officeemail || "",
          dateOfBirth: data.dateofbirth ? data.dateofbirth.slice(0, 10) : "",
          dateOfJoining: data.dateofjoining
            ? data.dateofjoining.slice(0, 10)
            : "",
          aadharNumber: data.aadharcard || "",
          panNumber: data.pancard || "",
          department: data.department || "",
          role: data.role || "",
          password: data.password || "",
          createdby: data.createdby || "",
        });

        setDepartment(data.department);
        setPhotoName(data.profilephoto.split("/").pop() || "");
        setFileName(data.idproof.split("/").pop() || "");

        // If profile photo exists, show it
        if (data.profilephoto) {
          const profileImgURL = `${API_BASE_URL}/getKYCImage?username=${empnameforaccess}&orgname=${orgname}&orgcode=${orgcode}&type=profile`;
          setUploadedImage(profileImgURL);

          // Update filePreviews for FileUploadButton
          setFilePreviews(prev => {
            const newMap = new Map(prev);
            newMap.set("profilePhoto", {
              fileName: data.profilephoto.split("/").pop() || "Profile Photo",
              previewUrl: profileImgURL,
              file: null
            });
            return newMap;
          });
        }

        // If ID proof exists, show it
        if (data.idproof) {
          const idProofURL = `${API_BASE_URL}/getKYCImage?username=${empnameforaccess}&orgname=${orgname}&orgcode=${orgcode}&type=idproof`;
          setUploadedIdProof(idProofURL);

          // Update filePreviews for FileUploadButton
          setFilePreviews(prev => {
            const newMap = new Map(prev);
            newMap.set("idProof", {
              fileName: data.idproof.split("/").pop() || "ID Proof",
              previewUrl: idProofURL,
              file: null
            });
            return newMap;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);
    }
  };

  useEffect(() => {
    fetchKYCData();
    getBranches();
  }, []);

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

  const handleInputChange = (...args) => {
    let name, value;
    // case A: called with a real event
    if (args[0] && args[0].target) {
      ({ name, value } = args[0].target);
    }
    // case B: called with (fieldName, newValue)
    else if (args.length === 2) {
      [name, value] = args;
    } else {
      console.error("handleInputChange: unexpected args", args);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const validateForm = () => {
    const errors = [];

    if (!formData.fullName.trim()) errors.push("Full Name is required");
    if (!formData.mobileNumber.trim()) errors.push("Mobile Number is required");
    if (!formData.personalEmail.trim())
      errors.push("Personal Email is required");
    if (!formData.dateOfBirth) errors.push("Date of Birth is required");
    if (!formData.aadharNumber.trim()) errors.push("Aadhar Number is required");
    if (!formData.panNumber.trim()) errors.push("PAN Number is required");

    // Validate mobile number format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
      errors.push("Invalid mobile number format");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.personalEmail && !emailRegex.test(formData.personalEmail)) {
      errors.push("Invalid personal email format");
    }
    if (formData.officeEmail && !emailRegex.test(formData.officeEmail)) {
      errors.push("Invalid office email format");
    }

    // Validate Aadhar number (12 digits)
    const aadharRegex = /^\d{12}$/;
    if (formData.aadharNumber && !aadharRegex.test(formData.aadharNumber)) {
      errors.push("Aadhar number must be 12 digits");
    }

    // Validate PAN number format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (
      formData.panNumber &&
      !panRegex.test(formData.panNumber.toUpperCase())
    ) {
      errors.push("Invalid PAN number format");
    }

    return errors;
  };

  const handleSubmit = async (closeAfter = false) => {
    if (isSaving) return;

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors.join(", "));
      return;
    }

    setIsSaving(true);

    try {
      const payload = new FormData();
      payload.append("fullname", formData.fullName);
      payload.append("phone", formData.mobileNumber);
      payload.append("officephone", formData.officeMobileNumber);
      payload.append("personalemail", formData.personalEmail);
      payload.append("officeemail", formData.officeEmail);
      payload.append("dateofbirth", formData.dateOfBirth);
      payload.append("dateofjoining", formData.dateOfJoining);
      payload.append("aadharcard", formData.aadharNumber);
      payload.append("pancard", formData.panNumber);
      payload.append("password", formData.password);
      payload.append("role", selectedRole || formData.role);
      payload.append("department", department);
      payload.append("createdby", formData.createdby);

      const fullNameSanitized = formData.fullName?.replace(/\s+/g, "_");

      // Handle files from both legacy state and filePreviews
      const profileFile = filePreviews.get("profilePhoto")?.file || photo;
      const idProofFile = filePreviews.get("idProof")?.file || file;

      if (profileFile)
        payload.append(
          "profilephoto",
          profileFile,
          `${fullNameSanitized}.${profileFile.name.split(".").pop()}`
        );
      if (idProofFile)
        payload.append(
          "idproof",
          idProofFile,
          `${fullNameSanitized}.${idProofFile.name.split(".").pop()}`
        );

      payload.append("orgname", localStorage.getItem("orgname"));
      payload.append("orgcode", localStorage.getItem("orgcode"));
      payload.append("username", decodedUsername);
      payload.append("branchaccess", JSON.stringify(branchesoftheemp));

      const resp = await axios.post(
        `${API_BASE_URL}/updateKYCData`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(
        resp.status === 201
          ? "Created new KYC record."
          : "Updated existing KYC record."
      );
      console.log("resp ----- ", resp);

      if (resp.data.data !== decodedUsername) {
        window.location.href = `/#/UserListAccess/${resp.data.data}`;
      }
      if (closeAfter) window.close();
    } catch (error) {
      console.error("Error saving KYC data. Please try again.", error);
      toast.error("Error saving KYC data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-0 container-div">
      <CCardBody>
        <div>
          <div className="grid-kyc-container">
            <div className="grid-kyc">
              <label className="KYC-UL">Full Name:</label>
              <NewInput
                name="fullName"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.fullName}
                placeholder=""
                type="text"
              />
            </div>

            <div className="grid-kyc">
              <label className="KYC-UL">Mobile No:</label>
              <NewInput
                name="mobileNumber"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.mobileNumber}
                placeholder=""
                type="text"
              />
            </div>

            <div className="grid-kyc">
              <label className="KYC-UL">Office Mobile No:</label>
              <NewInput
                name="officeMobileNumber"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.officeMobileNumber}
                placeholder=""
                type="text"
              />
            </div>

            <div className="grid-kyc">
              <label className="KYC-UL">Personal Email Id:</label>
              <NewInput
                name="personalEmail"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.personalEmail}
                placeholder=""
                type="text"
              />
            </div>
          </div>

          <div className="grid-kyc-container" style={{ marginTop: "10px" }}>
            <div className="grid-kyc">
              <label className="KYC-UL">Office Email Id:</label>
              <NewInput
                name="officeEmail"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.officeEmail}
                placeholder=""
                type="text"
              />
            </div>

            <div className="grid-kyc">
              <label className="KYC-UL">Date of Birth:</label>
              <SingleCalender
                width={"145px"}
                name={"dateOfBirth"}
                value={formData.dateOfBirth}
                onDateSelect={handleInputChange}
                leftright={"left"}
              />
            </div>

            <div className="grid-kyc">
              <label className="KYC-UL">Date of Joining:</label>
              <SingleCalender
                width={"145px"}
                name={"dateOfJoining"}
                value={formData.dateOfJoining}
                onDateSelect={handleInputChange}
                leftright={"left"}
              />
            </div>

            <div className="grid-kyc">
              <label className="KYC-UL">Aadhar Card No:</label>
              <NewInput
                name="aadharNumber"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.aadharNumber}
                placeholder=""
                type="text"
              />
            </div>
          </div>

          <div className="grid-kyc-container" style={{ marginTop: "10px" }}>
            <div className="grid-kyc">
              <label className="KYC-UL">PAN Card No:</label>
              <NewInput
                name="panNumber"
                width="180px"
                setSelectedValue={handleInputChange}
                selectedValue={formData.panNumber}
                placeholder=""
                type="text"
              />
            </div>
            <div className="grid-kyc" style={{paddingLeft:"16px"}}>
              <FileUploadButton
                fileType="profilePhoto"
                label="Upload Profile Photo"
                filePreviews={filePreviews}
                handleFileChange={handleFileChange}
              />
            </div>
            <div className="grid-kyc">
              <FileUploadButton
                fileType="idProof"
                label="Upload ID Proof"
                filePreviews={filePreviews}
                handleFileChange={handleFileChange}
              />
            </div>
            <div className="grid-kyc">
              <label className="KYC-UL">Role:</label>
              <NewDropdownInput
                type={"type1"}
                width="180px"
                setSelectedValue={setselectedRole}
                selectedValue={selectedRole || formData.role}
                placeholder=""
                options={storedRoles.map((items) => ({
                  value: items.rolename,
                  label: items.rolename,
                }))}
              />
            </div>
          </div>
          <div className="grid-kyc-container" style={{ marginTop: "10px" }}>
            <div className="grid-kyc">
              <label className="KYC-UL">Department:</label>
              <NewDropdownInput
                type={"type1"}
                width="180px"
                setSelectedValue={setDepartment}
                selectedValue={department || formData.department}
                placeholder=""
                options={departmentList.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
            <></>
            <></>
            <></>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <div onClick={() => handleSubmit(false)}>
            <NewButton text="Save" />
          </div>
          <div onClick={() => handleSubmit(true)}>
            <NewButton text="Save & Close" />
          </div>
          <div onClick={() => window.close()}>
            <NewButton text="Close" />
          </div>
        </div>
      </CCardBody>
    </div>
  );
};

export default KYCAccess;
