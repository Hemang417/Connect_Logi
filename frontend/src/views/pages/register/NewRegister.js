import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import "../../../css/styles.css";
import { Country } from "country-state-city";
import { CCard } from "@coreui/react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Using your existing imported components
import SingleCalender from "src/components/SingleCalender";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import Logo from "../../../assets/brand/MainLogoPNG.png";
import ArrowCircleLeft from "src/views/buttons/buttons/ArrowCircleLeft";
import "./css/registration.css";
import FileUploadButton from "src/components/FileUploadButton/FileUploadButton";
import API_BASE_URL from "src/config/config"; 

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB 
const MAX_DIRECTORS = 100;

const CustomSelect = React.memo(({ options, value, onChange }) => {
  const multiSelectRef = useRef(null);
  const applyStyles = useCallback(() => {
    if (!multiSelectRef.current) return;

    const container = multiSelectRef.current;
    const dropdownContent = container.querySelector(".dropdown-content");

    if (dropdownContent) {
      Object.assign(dropdownContent.style, {
        backgroundColor: "#101322",
        border: "1px solid #3498DB"
      });
    }

    const options = container.querySelectorAll(".option");
    options.forEach((option) => {
      Object.assign(option.style, {
        backgroundColor: "#101322",
        color: "#FFFFFF"
      });

      option.removeEventListener("mouseenter", option._hoverEnter);
      option.removeEventListener("mouseleave", option._hoverLeave);

      option._hoverEnter = function () {
        this.style.backgroundColor = "#1ABC9C";
      };
      option._hoverLeave = function () {
        if (!this.classList.contains("selected")) {
          this.style.backgroundColor = "#101322";
        }
      };

      option.addEventListener("mouseenter", option._hoverEnter);
      option.addEventListener("mouseleave", option._hoverLeave);
    });

    const selectedOptions = container.querySelectorAll(".option.selected");
    selectedOptions.forEach((option) => {
      Object.assign(option.style, {
        backgroundColor: "#3498DB",
        color: "#FFFFFF"
      });
    });

    const searchInput = container.querySelector(".search input");
    if (searchInput) {
      Object.assign(searchInput.style, {
        backgroundColor: "#101322",
        color: "#FFFFFF",
        border: "none"
      });
    }

    const selectAll = container.querySelector(".selectAll");
    if (selectAll) {
      Object.assign(selectAll.style, {
        backgroundColor: "#101322",
        color: "#FFFFFF"
      });
    }
  }, []);

  useEffect(() => {
    applyStyles();

    let observer;
    if (multiSelectRef.current) {
      observer = new MutationObserver(applyStyles);
      observer.observe(multiSelectRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [applyStyles]);

  return (
    <div
      ref={multiSelectRef}
      className="custom-select"
      style={{ width: "100%" }}
    >
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy="Select"
        overrideStrings={{
          selectSomeItems: "Select Service Types",
          allItemsAreSelected: "",
          selectAll: "",
          unselectAll: "",
        }}
        className="custom-multi-select"
      />
    </div>
  );
});
const NewRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(25);
  const navigate = useNavigate();
  // OPTIMIZATION 9: Memoize country list to prevent re-computation
  const countryList = useMemo(() => {
    return Country.getAllCountries().map(country => ({
      name: country.name,
      code: country.isoCode
    }));
  }, []);

  const [directors, setDirectors] = useState([
    { name: "", email: "", mobile: "" }
  ]);
  // OPTIMIZATION 10: Use more efficient data structure for services
  const [services, setServices] = useState(() => new Set());

  const [formData, setFormData] = useState({
    // Step 1: General Info
    legalName: "",
    address: "",
    // tan: "",
    establishedDate: "",
    country: "",
    companyType: "",
    panNumber: "",
    gstNumber: "",
    cinNumber: "",
    aeoNumber: "",
    chaLicense: "",

    // Step 2: Branch Head Details
    branchName: "",
    branchHeadName: "",
    branchHeadEmail: "",
    branchHeadMobile: "",
    chaBranchLicence: "",

    // Step 3: Credentials
    organizationName: "",
    organizationCode: "",
    username: "",
    password: "",
    repeatPassword: ""
  });

  const [filePreviews, setFilePreviews] = useState(new Map());

  const handleFormChange = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // OPTIMIZATION 11: Memoize validation functions to prevent recreation
  const validators = useMemo(() => ({
    step1: () => {
      const {
        legalName, address, establishedDate, country, companyType,
        panNumber, gstNumber, cinNumber, aeoNumber, chaLicense
      } = formData;

      const errors = [];

      // Basic validations
      if (!legalName.trim()) errors.push("Legal Name is required");
      if (legalName.length > 100) errors.push("Legal Name must be less than 100 characters");

      if (!address.trim()) errors.push("Address is required");
      if (address.length > 255) errors.push("Address must be less than 255 characters");

      if (!establishedDate) errors.push("Established Date is required");
      if (!country) errors.push("Country is required");
      if (!companyType) errors.push("Type of Company is required");

      // PAN
      if (!panNumber.trim()) errors.push("PAN Number is required");
      if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(panNumber)) errors.push("Invalid PAN format");
      if (!filePreviews.get('panCopy')) errors.push("PAN Copy is required");

      // GST
      if (!gstNumber.trim()) errors.push("GST Number is required");
      if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gstNumber)) {
        errors.push("Invalid GST format");
      }
      if (!filePreviews.get('gstCopy')) errors.push("GST Copy is required");

      // CIN Validation (if provided)
      const CIN_REGEX = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;

      const validStates = [
        "AN", "AP", "AR", "AS", "BR", "CH", "CT", "DL", "DN", "DD",
        "GA", "GJ", "HR", "HP", "JH", "JK", "KA", "KL", "LA", "LD",
        "MH", "ML", "MN", "MP", "MZ", "NL", "OD", "PB", "PY", "RJ",
        "SK", "TN", "TG", "TR", "UP", "UT", "WB"
      ];

      const expectedEntityCodes = {
        sole_proprietorship: [],
        partnership: [],
        llc: ["LLP"],
        private_limited: ["PTC"],
        public_limited: ["PLC"],
        cooperative: ["NPL"],
        nonprofit: ["NPL"]
      };

      if (cinNumber.trim()) {
        if (!CIN_REGEX.test(cinNumber)) {
          errors.push("CIN must follow a valid format");
        } else {
          const stateCode = cinNumber.slice(6, 8);
          const entityCode = cinNumber.slice(12, 15);

          if (!validStates.includes(stateCode)) {
            errors.push("Invalid CIN state code");
          }

          const expectedEntity = expectedEntityCodes[companyType];
          if (expectedEntity?.length && !expectedEntity.includes(entityCode)) {
            errors.push(`CIN entity type must be one of ${expectedEntity.join(", ")} for selected company type`);
          }
        }
      }

      // AEO Validation (optional)
      if (aeoNumber.trim()) {
        const validAEOFormats = [
          /^[A-Z]{6}\d{4}[A-Z]{1}\d{1}[A-Z]{1}\d{3}$/,
          /^AEO-[CTSFLO]-IN-\d{10}$/,
          /^AEO[A-Z]\d{6}$/,
          /^[A-Z]{2}AEO(C|S|F)\d{9}$/,
          /^C-TPAT\d{6,10}$/,
          /^JP\d{6,10}AEO$/,
          /^[A-Z]{2}AEOT\d{9}$/
        ];
        const isValidAEO = validAEOFormats.some((regex) => regex.test(aeoNumber));
        if (!isValidAEO) errors.push("Invalid AEO number format");
      }

      // CHA License (optional)
      if (
        chaLicense.trim() &&
        !/^(CHA[-/]?[A-Z]{2,4}[-/]?\d{3,6}([-/]?\d{2,4})?|[A-Z]{2,4}[-/]?CHA[-/]?\d{3,6}([-/]?\d{2,4})?|INCHA\d{7,10}[A-Z]{2,4})$/i.test(chaLicense)
      ) {
        errors.push("Invalid CHA License format");
      }

      // File: logo
      if (!filePreviews.get('logo')) errors.push("Logo is required");

      // MOA Upload
      if (!filePreviews.get('moa')) errors.push("MOA is required");

      // Return validation result
      if (errors.length > 0) {
        toast.error(errors[0]);
        return false;
      }
      return true;
    },

    step2: () => {
      const errors = [];

      // ✅ Branch validations
      const {
        branchName,
        branchHeadName,
        branchHeadEmail,
        branchHeadMobile,
        chaBranchLicence
      } = formData;

      // ✅ Director validations
      const minDirectorsByType = {
        sole_proprietorship: 1,
        partnership: 2,
        llc: 1,
        private_limited: 2,
        public_limited: 3,
        cooperative: 2,
        nonprofit: 1
      };

      const minRequired = minDirectorsByType[formData.companyType] || 1;

      if (directors.length < minRequired) {
        errors.push(`At least ${minRequired} director(s) required for selected company type`);
      }

      directors.forEach((director, index) => {
        if (!director.name.trim()) errors.push(`Director ${index + 1}: Name is required`);
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(director.email)) {
          errors.push(`Director ${index + 1}: Invalid email format`);
        }
        if (!/^\d{10}$/.test(director.mobile)) {
          errors.push(`Director ${index + 1}: Mobile must be 10 digits`);
        }
        if (!filePreviews.get(`director-${index}-photo`)) {
          errors.push(`Director ${index + 1}: Photo is required`);
        }
        if (!filePreviews.get(`director-${index}-doc`)) {
          errors.push(`Director ${index + 1}: Document is required`);
        }
      });

      if (!branchName.trim()) errors.push("Branch Name is required");
      if (branchName.length > 100) errors.push("Branch Name must be less than 100 characters");

      if (!branchHeadName.trim()) errors.push("Branch Head Name is required");
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(branchHeadEmail)) {
        errors.push("Invalid Branch Head Email");
      }
      if (!/^\d{10}$/.test(branchHeadMobile)) {
        errors.push("Branch Head Mobile must be 10 digits");
      }

      if (
        chaBranchLicence.trim() &&
        !/^((CHA[-/]?[A-Z]{2,4}[-/]?\d{3,6}([-/]?\d{2,4})?)|([A-Z]{2,4}[-/]?CHA[-/]?\d{3,6}([-/]?\d{2,4})?)|(INCHA\d{6,10}[A-Z]{2,4})|(CHA\d{6}))$/i.test(chaBranchLicence)
      ) {
        errors.push("Invalid CHA Branch License format");
      }

      if (!filePreviews.get('branchHeadPhoto')) errors.push("Branch Head Photo is required");
      if (!filePreviews.get('branchHeadID')) errors.push("Branch Head ID is required");

      if (errors.length > 0) {
        toast.error(errors[0]);
        return false;
      }
      return true;
    },

    step3: () => {
      const {
        organizationName,
        organizationCode,
        username,
        password,
        repeatPassword
      } = formData;
      const errors = [];

      // Organization validation
      if (!organizationName.trim()) errors.push("Organization Name is required");
      if (organizationName.length > 50) errors.push("Organization Name must be less than 50 characters");
      if (!organizationCode.trim()) errors.push("Organization Code is required");
      if (organizationCode.length > 10) errors.push("Organization Code must be less than 10 characters");

      // Credential validation
      if (!username.trim()) errors.push("Username is required");
      if (username.length < 5) errors.push("Username must be at least 5 characters");
      if (!password.trim()) errors.push("Password is required");
      if (password.length < 8) errors.push("Password must be at least 8 characters");
      if (!/[A-Z]/.test(password)) errors.push("Password must contain an uppercase letter");
      if (!/[a-z]/.test(password)) errors.push("Password must contain a lowercase letter");
      if (!/\d/.test(password)) errors.push("Password must contain a number");
      if (password !== repeatPassword) errors.push("Passwords do not match");

      // Agreement validations
      const requiredFiles = ['mou', 'nda'];
      requiredFiles.forEach(file => {
        if (!filePreviews.get(file)) errors.push(`${file.toUpperCase()} is required`);
      });

      if (errors.length > 0) {
        toast.error(errors[0]);
        return false;
      }
      return true;
    }
  }), [formData, filePreviews, directors]);

  // OPTIMIZATION 12: Use useCallback for event handlers to prevent unnecessary re-renders
  const handleFieldChange = useCallback((fieldName) => (value) => {
    setFormData(prev => ({
      ...prev, [fieldName]: value,
      // ...(fieldName === "branchAddress" && { address: value })  // sync address
    }));
  }, []);

  const handleCalenderChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      ["establishedDate"]: value,
    });
  };


  const handleDirectorChange = useCallback((index, field, value) => {
    setDirectors(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: typeof value === 'object' && value?.target ? value.target.value : value
      };
      return updated;
    });
  }, []);

  // OPTIMIZATION 13: Optimize file handling with Map for O(1) access
  const handleFileChange = useCallback((fileType, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File "${file.name}" exceeds 5MB limit`);
      e.target.value = ""; // Reset input
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFilePreviews(prev => {
      const prevValue = prev.get(fileType);
      if (prevValue?.previewUrl) URL.revokeObjectURL(prevValue.previewUrl);
      const newMap = new Map(prev);
      // Store with just the fileType (fieldname) as the key
      newMap.set(fileType, { // Corrected line
        previewUrl,
        fileName: file.name,
        file  // Store file object
      });
      return newMap;
    });

    // Force re-render for immediate UI update
    setFormData(prev => ({ ...prev }));
  }, []);

  useEffect(() => {
    const limitByType = {
      sole_proprietorship: 1,
      partnership: 2,
      llc: 10,
      private_limited: 15,
      public_limited: 20,
      cooperative: 10,
      nonprofit: 15
    };

    const limit = limitByType[formData.companyType] || MAX_DIRECTORS;
    if (directors.length > limit) {
      setDirectors(prev => prev.slice(0, limit));
    }
  }, [formData.companyType, directors.length]);

  const addDirector = useCallback(() => {
    const limitByType = {
      sole_proprietorship: 1,
      partnership: 2,
      llc: 10,
      private_limited: 15,
      public_limited: 20,
      cooperative: 10,
      nonprofit: 15
    };

    const maxAllowed = limitByType[formData.companyType] || MAX_DIRECTORS;

    if (directors.length >= maxAllowed) {
      toast.error(`Max ${maxAllowed} director(s) allowed for selected company type`);
      return;
    }

    setDirectors(prev => [...prev, { name: "", email: "", mobile: "" }]);
  }, [directors.length, formData.companyType]);

  const removeDirector = useCallback((indexToRemove) => {
    if (directors.length <= 1) return;

    // Only allow removing last director
    if (indexToRemove !== directors.length - 1) {
      toast.error("You can only remove the last director");
      return;
    }

    setDirectors(prev => prev.slice(0, -1));
  }, [directors.length]);

  // OPTIMIZATION 15: Memoize step configuration for better performance
  const stepConfig = useMemo(() => ({
    1: { title: "General Information", progress: 33 },
    2: { title: `Director Details & Branch Head Details`, progress: 66 },
    3: { title: "Agreements & Credentials", progress: 90 }
  }), []);

  const nextStep = useCallback(() => {
    if (currentStep < 3) {
      const nextStepNum = currentStep + 1;
      setCurrentStep(nextStepNum);
      setProgressPercentage(stepConfig[nextStepNum].progress);
    }
  }, [currentStep, stepConfig]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);
      setProgressPercentage(stepConfig[prevStepNum].progress);
    }
  }, [currentStep, stepConfig]);

  const handleContinue = useCallback(() => {
    // if (validators[`step${currentStep}`]()) {
    //   nextStep();
    // }
    nextStep();
  }, [currentStep, validators, nextStep]);

  useEffect(() => {
    const generateOrgCode = async () => {
      if (!formData.organizationName.trim()) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/ctclient/nextid`);
        const nextId = response.data.nextId;

        const firstWord = formData.organizationName.trim().split(" ")[0].toLowerCase();
        const generatedCode = `${firstWord}@${nextId}`;

        setFormData(prev => ({
          ...prev,
          organizationCode: generatedCode
        }));
      } catch (error) {
        console.error("Failed to fetch next registration ID:", error);
      }
    };

    generateOrgCode();
  }, [formData.organizationName]);


  const handleSubmit = useCallback(async (e) => {
    e?.preventDefault?.();

    if (!validators.step3()) return;

    const formPayload = new FormData();

    // ✅ Append legalName first so multer gets it
    formPayload.append("legalName", formData.legalName);

    // ✅ Append all form fields (excluding legalName which is already added)
    for (const key in formData) {
      if (key !== "legalName") formPayload.append(key, formData[key]);
    }

    // ✅ Append directors JSON
    formPayload.append("directors", JSON.stringify(directors));

    // ✅ Append selected services
    formPayload.append("services", Array.from(services).join(","));

    // ✅ Append file inputs — names must match multer config
    filePreviews.forEach((value, key) => {
      formPayload.append(key, value.file);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/ctclient/register`, formPayload, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const { orgcode, branchcode } = response.data;
      localStorage.setItem("orgname", formData.organizationName);
      localStorage.setItem("orgcode", orgcode);
      localStorage.setItem("branchcodeofemp", branchcode);
      localStorage.setItem("branchnameofemp", formData.branchName);

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed");
    }
  }, [formData, filePreviews, validators, services, directors, navigate]);

  // OPTIMIZATION 16: Cleanup effect for URL objects to prevent memory leaks
  useEffect(() => {
    const currentPreviews = filePreviews;
    return () => {
      currentPreviews.forEach(value => {
        if (value?.previewUrl && value.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(value.previewUrl);
        }
      });
    };
  }, [filePreviews]);

  // OPTIMIZATION 17: Memoized service options to prevent recreation
  const serviceOptions = useMemo(() =>
    ['customClearance', 'freightForwarding', 'transportation', 'warehousing', 'eximConsultancy']
      .map(key => ({
        label: key.split(/(?=[A-Z])/).join(" ")
          .replace(/\b\w/g, char => char.toUpperCase()),
        value: key,
      }))
    , []);

  // OPTIMIZATION 19: Memoized render functions to prevent unnecessary re-renders
  const renderStep1 = useMemo(() => (
    <div className="form-container">
      <div className="form-left">
        <div className="form-group">
          <label className="KYC-UL">Legal Name:</label>
          <NewInput
            name="legalName"
            width="100%"
            setSelectedValue={handleFieldChange("legalName")}
            selectedValue={formData.legalName}
            placeholder=""
            height="31px"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">Established Date:</label>
            <SingleCalender
              width={"100%"}
              name={"establishedDate"}
              value={formData.establishedDate}
              onDateSelect={handleCalenderChange}
              // readOnly={isEditable}
              leftright={"left"}
            />
          </div>
          <div className="form-group">
            <label className="KYC-UL">Country:</label>
            <NewDropdownInput
              type="type1"
              options={countryList.map(item => ({ label: item.name, value: item.name }))}
              selectedValue={formData.country}
              setSelectedValue={handleFormChange("country")}
              width="100%"
              height="31px"
              placeholder={"Select Country"}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">Type of Company:</label>
            <NewDropdownInput
              type="type1"
              options={[
                { label: "Sole Proprietorship", value: "sole_proprietorship" },
                { label: "Partnership", value: "partnership" },
                { label: "Limited Liability Company (LLC)", value: "llc" },
                { label: "Private Limited Company", value: "private_limited" },
                { label: "Public Limited Company", value: "public_limited" },
                { label: "Cooperative", value: "cooperative" },
                { label: "Nonprofit Organization", value: "nonprofit" }
              ]}
              selectedValue={formData.companyType}
              setSelectedValue={handleFormChange("companyType")}
              width="100%"
              height="31px"
              placeholder={"Select Company Type"}
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="moa"
              label="MOA"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="KYC-UL">Address:</label>
          <NewInput
            name="address"
            width="100%"
            setSelectedValue={handleFieldChange("address")}
            selectedValue={formData.address}
            placeholder=""
            textarea={true}
            textareaMinHeight={"85px"}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">PAN Number:</label>
            <NewInput
              name="panNumber"
              width="100%"
              setSelectedValue={handleFieldChange("panNumber")}
              selectedValue={formData.panNumber}
              // placeholder="Ex: ABCDE1234F"
              height="31px"
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="panCopy"
              label="PAN Copy"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">GST Number:</label>
            <NewInput
              name="gstNumber"
              width="100%"
              setSelectedValue={handleFieldChange("gstNumber")}
              selectedValue={formData.gstNumber}
              placeholder=""
              height="31px"
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="gstCopy"
              label="GST Copy"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">CIN Number:</label>
            <NewInput
              name="cinNumber"
              width="100%"
              setSelectedValue={handleFieldChange("cinNumber")}
              selectedValue={formData.cinNumber}
              placeholder=""
              height="31px"
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="cinCopy"
              label="CIN Copy"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">AEO Number:</label>
            <NewInput
              name="aeoNumber"
              width="100%"
              setSelectedValue={handleFieldChange("aeoNumber")}
              selectedValue={formData.aeoNumber}
              placeholder=""
              height="31px"
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="aeoCertificate"
              label="AEO Certificate"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">CHA License:</label>
            <NewInput
              name="chaLicense"
              width="100%"
              setSelectedValue={handleFieldChange("chaLicense")}
              selectedValue={formData.chaLicense}
              placeholder=""
              height="31px"
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="chaDoc"
              label="CHA Document"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">Type of Services:</label>
            <CustomSelect
              options={serviceOptions}
              value={Array.from(services).map(service => ({
                label: serviceOptions.find(opt => opt.value === service)?.label || service,
                value: service,
              }))}
              onChange={(selectedOptions) => {
                setServices(new Set(selectedOptions.map(opt => opt.value)));
              }}
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="logo"
              label="Logo"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  ), [formData, countryList, services, serviceOptions, handleFieldChange]);

  const renderStep2 = useMemo(() => {
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
      <div className="form-container">
        <div className="form-left" style={{ width: "100%" }}>
          {/* ========== Directors Section ========== */}
          <h4 style={{ marginBottom: "0px" }}>Director Details</h4>

          {directors.map((director, index) => {
            const ordinal = getOrdinal(index + 1);

            return (
              <div key={index} style={{ gap: "12px", display: "flex", flexDirection: "column" }}>
                <hr style={{ margin: "0px" }} />
                <h4 style={{ margin: "0px" }}>{ordinal} Director</h4>

                <div className="form-row">
                  <div className="form-group">
                    <label className="KYC-UL">{ordinal} Director Name:</label>
                    <NewInput
                      name={`director-name-${index}`}
                      selectedValue={director.name}
                      width="100%"
                      setSelectedValue={(value) => handleDirectorChange(index, "name", value)}
                      placeholder=""
                      height="31px"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="KYC-UL">{ordinal} Director Mobile:</label>
                    <NewInput
                      name={`director-mobile-${index}`}
                      selectedValue={director.mobile}
                      width="100%"
                      setSelectedValue={(value) => handleDirectorChange(index, "mobile", value)}
                      placeholder=""
                      height="31px"
                    />
                  </div>
                  <div className="form-group">
                    <label className="KYC-UL">{ordinal} Director Email:</label>
                    <NewInput
                      name={`director-email-${index}`}
                      selectedValue={director.email}
                      width="100%"
                      setSelectedValue={(value) => handleDirectorChange(index, "email", value)}
                      placeholder=""
                      height="31px"
                      type="email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <FileUploadButton
                      fileType={`director-${index}-photo`}
                      label={`${ordinal} Director Photo`}
                      filePreviews={filePreviews}
                      handleFileChange={handleFileChange}
                    />
                  </div>
                  <div className="form-group">
                    <FileUploadButton
                      fileType={`director-${index}-doc`}
                      label={`${ordinal} Director Document`}
                      filePreviews={filePreviews}
                      handleFileChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {formData.companyType !== "sole_proprietorship" && (<div className="form-row" style={{ gap: "10px" }}>
            <div onClick={addDirector}>
              <NewButton text="+" width="35px" />
            </div>
            {directors.length > 1 && (
              <div onClick={() => removeDirector(directors.length - 1)}>
                <NewButton text="-" width="35px" />
              </div>
            )}
          </div>)}

          {/* ========== Branch Details Section ========== */}
          <hr style={{ margin: "0px" }} />
          <h4 style={{ marginBottom: "15px" }}>Branch Details</h4>

          <div className="form-row">
            <div className="form-group">
              <label className="KYC-UL">Branch Name:</label>
              <NewInput
                name="branchName"
                width="100%"
                setSelectedValue={handleFieldChange("branchName")}
                selectedValue={formData.branchName}
                placeholder=""
                height="31px"
              />
            </div>
            <div className="form-group">
              <label className="KYC-UL">Branch Head Name:</label>
              <NewInput
                name="branchHeadName"
                width="100%"
                setSelectedValue={handleFieldChange("branchHeadName")}
                selectedValue={formData.branchHeadName}
                placeholder=""
                height="31px"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="KYC-UL">Branch Head Mobile:</label>
              <NewInput
                name="branchHeadMobile"
                width="100%"
                setSelectedValue={handleFieldChange("branchHeadMobile")}
                selectedValue={formData.branchHeadMobile}
                placeholder=""
                height="31px"
              />
            </div>
            <div className="form-group">
              <label className="KYC-UL">Branch Head Email:</label>
              <NewInput
                name="branchHeadEmail"
                width="100%"
                setSelectedValue={handleFieldChange("branchHeadEmail")}
                selectedValue={formData.branchHeadEmail}
                placeholder=""
                height="31px"
                type="email"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <FileUploadButton
                fileType="branchHeadPhoto"
                label="Branch Head Photo"
                filePreviews={filePreviews}
                handleFileChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <FileUploadButton
                fileType="branchHeadID"
                label="Branch Head ID"
                filePreviews={filePreviews}
                handleFileChange={handleFileChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="KYC-UL">CHA Branch Licence:</label>
            <NewInput
              name="chaBranchLicence"
              width="100%"
              setSelectedValue={handleFieldChange("chaBranchLicence")}
              selectedValue={formData.chaBranchLicence}
              placeholder=""
              height="31px"
            />
          </div>

          <div className="form-group">
            <label className="KYC-UL">Branch Address:</label>
            <NewInput
              name="address"
              width="100%"
              setSelectedValue={handleFieldChange("address")}
              selectedValue={formData.address}
              placeholder=""
              textarea={true}
              textareaMinHeight="85px"
            />
          </div>
        </div>
      </div>
    );
  }, [directors, formData, handleFieldChange, handleDirectorChange, addDirector, removeDirector]);

  // Step 3: Credentials
  const renderStep3 = useMemo(() => (
    <div className="form-container">
      <div className="form-left">
        <div className="form-row">
          <div className="form-group">
            <FileUploadButton
              fileType="mou"
              label="MOU"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <FileUploadButton
              fileType="nda"
              label="NDA"
              filePreviews={filePreviews}
              handleFileChange={handleFileChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">Organization Name:</label>
            <NewInput
              name="organizationName"
              width="100%"
              setSelectedValue={handleFieldChange("organizationName")}
              selectedValue={formData.organizationName}
              placeholder=""
              height="31px"
            />
          </div>
          <div className="form-group">
            <label className="KYC-UL">Organization Code:</label>
            <NewInput
              name="organizationCode"
              width="100%"
              selectedValue={formData.organizationCode}
              setSelectedValue={handleFieldChange("organizationCode")}
              placeholder=""
              height="31px"
              readOnly={true}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="KYC-UL">Username:</label>
          <NewInput
            name="username"
            width="100%"
            setSelectedValue={handleFieldChange("username")}
            selectedValue={formData.username}
            placeholder=""
            height="31px"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="KYC-UL">Password:</label>
            <NewInput
              name="password"
              width="100%"
              setSelectedValue={handleFieldChange("password")}
              selectedValue={formData.password}
              placeholder=""
              height="31px"
              type="password"
            />
          </div>
          <div className="form-group">
            <label className="KYC-UL">Confirm Password:</label>
            <NewInput
              name="repeatPassword"
              width="100%"
              setSelectedValue={handleFieldChange("repeatPassword")}
              selectedValue={formData.repeatPassword}
              placeholder=""
              height="31px"
              type="password"
            />
          </div>
        </div>
      </div>
    </div>
  ), [formData, handleFieldChange]);

  // Main render
  const currentStepTitle = useMemo(() => {
    const titles = {
      1: "General Information",
      2: "Directors & Branch Details", // Updated
      3: "Agreements & Credentials"
    };
    return `Register: ${titles[currentStep] || ""}`;
  }, [currentStep]);

  return (
    <div className="page-container">
      <CCard className="new-register-card">
        <div className='logoContainer'>
          <img src={Logo} className="MainLogoRegister" alt="Company Logo" />
        </div>
        {currentStep > 1 && (
          <div className="back-button" onClick={prevStep} >
            <ArrowCircleLeft />
          </div>
        )}
        <div className="new-register-header">
          <h4 className="page-title" style={{ width: "94%", textAlign: "left", marginBottom: "0px" }}>
            {currentStepTitle}
          </h4>
        </div>

        <div className="progress-container" style={{ margin: "14px 0 16px 0" }}>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="form-content">
          {currentStep === 1 && renderStep1}
          {currentStep === 2 && renderStep2}
          {currentStep === 3 && renderStep3}
        </div>

        <div className="form-actions">
          {currentStep < 3 ? (
            <div onClick={handleContinue}>
              <NewButton text="Continue" />
            </div>
          ) : (
            <div onClick={handleSubmit}>
              <NewButton text="Submit" />
            </div>
          )}

          <div onClick={() => window.close()}>
            <NewButton text="Cancel" />
          </div>
        </div>
      </CCard>
    </div>
  );
};

export default NewRegister;