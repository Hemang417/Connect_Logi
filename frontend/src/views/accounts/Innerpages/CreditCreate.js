import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CButton } from "@coreui/react";
import "../css/accounts-styles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { on } from "ws";
import toast from "react-hot-toast";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewButton from "src/views/buttons/buttons/NewButton";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import SingleCalender from "src/components/SingleCalender";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

// import { MultiSelect } from "react-multi-select-component";
const CreditCreate = () => {
  const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const [paymentType, setPaymentType] = useState("");
  const [radioSelection, setRadioSelection] = useState("against-job");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [bankDetails, setBankDetails] = useState([]);
  // organisation
  const [organizationType, setOrganizationType] = useState("existing");
  const [newOrganization, setNewOrganization] = useState("");
  const [existingOrganizations, setExistingOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [postDate, setPostDate] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [remarks, setRemarks] = useState("");
  const [useEdit, setUseEdit] = useState(false);
  const [useAdd, setUseAdd] = useState(false);
  const checkUsername = localStorage.getItem("username");
  const [prefillData, setPrefillData] = useState(null);
  const [AgainstOutstandingPaymentAdvise, setAgainstOutstandingPaymentAdvise] =
    useState("");
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

  const navigate = useNavigate();

  const fetchcontrols = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/fetchaccesscontrols`,
        {
          params: {
            username: localStorage.getItem("username"),
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("branchnameofemp"),
            branchcode: localStorage.getItem("branchcodeofemp"),
            type: "ACCOUNTS",
          },
        }
      );
      console.log(`access`, data);
      const controlSet = new Set(data.map((item) => item.control));

      setUseEdit(controlSet.has("edit-credit"));
      setUseAdd(controlSet.has("add-credit"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };
  const hanlePostValue = (e) => {
    setPostDate(e.target.value);
  };

  useEffect(() => {
    fetchcontrols();
    // return () => {
    //   localStorage.removeItem("creditid");
    //   localStorage.removeItem("onEdit");
    // };
  }, []);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getbankdetails`,
          {
            params: {
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        const formattedData = response.data.map((bank) => ({
          value: bank.bankname,
          label: bank.bankname,
        }));
        setBankDetails(formattedData);
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };
    fetchBankDetails();
  }, []);

  // const [jobDetails, setJobDetails] = useState([
  //   { typeOfJob: "", jobNo: "", amount: "" },
  // ]);

  const [jobDetails, setJobDetails] = useState([
    // Each object should now include its own jobOptions
    {
      typeOfJob: "",
      jobNo: "",
      amount: "",
      jobOptions: [], // Add this field
    },
  ]);

  // const handleAddJobDetail = () => {
  //   setJobDetails([...jobDetails, { typeOfJob: "", jobNo: "", amount: "" }]);
  // };

  const handleAddJobDetail = () => {
    setJobDetails([
      ...jobDetails,
      {
        typeOfJob: "",
        jobNo: "",
        amount: "",
        jobOptions: [], // Initialize with empty options
      },
    ]);
  };

  const handleDeleteJobDetail = (index) => {
    setJobDetails(jobDetails.filter((_, i) => i !== index));
  };

  const handleOrganizationChange = (selectedOption) => {
    setSelectedOrganization(selectedOption ? selectedOption.value : "");
    // console.log('selectedOption working ',selectedOption)

    if (selectedOption) {
      fetchbillNo(selectedOption); // Fetch bills based on the selected organization
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  // const handleChangeJobDetail = (index, field, value) => {
  //   const updatedJobDetails = jobDetails.map((detail, i) => {
  //     if (i === index) {
  //       const updatedDetail = { ...detail, [field]: value };

  //       // If the field is typeOfJob, fetch job numbers based on the selected job type
  //       if (field === "typeOfJob") {
  //         fetchjobNo(value); // Call fetchjobNo with the selected job type
  //       }

  //       return updatedDetail;
  //     }
  //     return detail;
  //   });
  //   setJobDetails(updatedJobDetails);
  // };

  const fetchjobNoForRow = async (index, typeOfJob) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchjobnofromcollection`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchnameofemp: localStorage.getItem("branchnameofemp"),
            typeOfJob: typeOfJob,
            clientname: selectedOrganization,
          },
        }
      );

      const formattedOptions = response.data.map((bill) => ({
        value: bill.jobnumber,
        label: bill.jobnumber,
      }));

      // Update options for this specific row only
      setJobDetails((prev) => {
        const newDetails = [...prev];
        newDetails[index] = {
          ...newDetails[index],
          jobOptions: formattedOptions,
        };
        return newDetails;
      });
    } catch (error) {
      console.error("Error fetching job options:", error);
    }
  };

  const handleChangeJobDetail = (index, field, value) => {
    setJobDetails((prev) => {
      const updatedDetails = [...prev];

      if (field === "typeOfJob") {
        // Update typeOfJob and reset jobNo
        updatedDetails[index] = {
          ...updatedDetails[index],
          typeOfJob: value,
          jobNo: "",
          jobOptions: [], // Clear previous options
        };

        // Fetch job options for this specific row
        fetchjobNoForRow(index, value);
      } else {
        // For other fields
        updatedDetails[index] = {
          ...updatedDetails[index],
          [field]: value,
        };
      }

      return updatedDetails;
    });
  };

  const handleReceivedPayment = (e) => {
    setPaymentType(e.value);
    setAmountReceived(0);
  };

  const [billDetails, setBillDetails] = useState([
    {
      billNoForAgainstBill: "",
      jobNoForAgainstBill: "",
      billamountForAgainstBill: "",
      tdsDeductionForAgainstBill: "",
      totalReceivableForAgainstBill: "",
    },
  ]);
  const handleAddBillDetail = () => {
    setBillDetails([
      ...billDetails,
      {
        billNoForAgainstBill: "" || null,
        jobNoForAgainstBill: "" || null,
        billamountForAgainstBill: "" || null,
        tdsDeductionForAgainstBill: "" || null,
        totalReceivableForAgainstBill: "" || null,
      },
    ]);
  };
  const handleDeleteBillDetail = (index) => {
    setBillDetails(billDetails.filter((_, i) => i !== index));
  };
  const handleChangeBillDetail = (index, field, selectedOption) => {
    const updatedBillDetails = billDetails.map((detail, i) => {
      if (i === index) {
        const updatedDetail = { ...detail, [field]: selectedOption };

        // Automatically set the bill amount (grand total) when a bill is selected
        if (field === "billNoForAgainstBill" && selectedOption) {
          // find the full option object from the dropdown options list
          const fullOption =
            options.find((opt) => opt.value === selectedOption) || {};

          updatedDetail.billamountForAgainstBill = fullOption.grandTotal ?? "";
          updatedDetail.jobNoForAgainstBill = fullOption.jobnumber ?? "";
        }
        if (
          field === "billamountForAgainstBill" ||
          field === "tdsDeductionForAgainstBill"
        ) {
          const billAmount =
            parseFloat(updatedDetail.billamountForAgainstBill) || 0;
          const tdsDeduction =
            parseFloat(updatedDetail.tdsDeductionForAgainstBill) || 0;
          updatedDetail.totalReceivableForAgainstBill = (
            billAmount - tdsDeduction
          ).toFixed(2);
        }
        return updatedDetail;
      }
      return detail;
    });
    setBillDetails(updatedBillDetails);
  };

  const SumBillAmount = billDetails.reduce(
    (sum, bill) => sum + (parseFloat(bill.billamountForAgainstBill) || 0),
    0
  );

  const SumTdsDeduction = billDetails.reduce(
    (sum, bill) => sum + (parseFloat(bill.tdsDeductionForAgainstBill) || 0),
    0
  );

  const SumRecievable = billDetails.reduce(
    (sum, bill) => sum + (parseFloat(bill.totalReceivableForAgainstBill) || 0),
    0
  );
  const bankOptions = bankDetails.map((bank) => ({
    value: bank.label,
    label: bank.label,
  }));

  const orgOptions = existingOrganizations.map((org) => ({
    value: org.name,
    label: org.name,
  }));

  useEffect(() => {
    const fetchOrganizations = async () => {
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
        console.log("Fetched organizations:", response.data); // Log the data to check the structure
        const uniqueOrganizations = new Set();
        const formattedOrganizations = response.data
          .filter((org) => {
            if (!uniqueOrganizations.has(org.clientname)) {
              uniqueOrganizations.add(org.clientname);
              return true; // Keep this organization
            }
            return false; // Skip this organization
          })
          .map((org) => ({
            name: org.clientname, // Assuming the response contains clientname
          }));

        setExistingOrganizations(formattedOrganizations);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    fetchOrganizations();
  }, []);

  const validatePayload = (payload) => {
    const errors = [];

    if (!payload.postDate) {
      toast.error("Post date is required.");
      return false;
    }
    if (!payload.bankAccount) {
      toast.error("Bank account is required.");
      return false;
    }
    if (!payload.organizationType) {
      toast.error("Organization type is required.");
      return false;
    }
    if (!payload.organizationName) {
      toast.error("Organization name is required.");
    }
    if (!payload.receivedPayementType) {
      toast.error("Payment type is required.");
      return false;
    }

    // Special handling for amount validation based on payment type and onAccountType
    // if (
    //   payload.receivedPayementType === "on-account" &&
    //   payload.onAccountType === "against-outstanding"
    // ) {
    //   if (
    //     !payload.amountReceived ||
    //     isNaN(parseFloat(payload.amountReceived)) ||
    //     parseFloat(payload.amountReceived) < 0
    //   ) {
    //     toast.error("Valid amount received is required. 1");
    //     return false;
    //   }
    // } else {
    //   if (
    //     (!payload.amountReceived ||
    //       isNaN(parseFloat(payload.amountReceived))) &&
    //     localStorage.getItem("onEdit") === "true"
    //   ) {
    //     toast.error("Valid amount received is required. 2");
    //     return false;
    //   }
    // }

    // Validate job details when applicable
    // if (
    //   payload.receivedPayementType === "on-account" &&
    //   radioSelection === "against-job"
    // ) {
    //   // Check if there are any job details
    //   if (payload.againstJobDetails.length === 0) {
    //     toast.error("At least one job entry is required");
    //     return false;
    //   }

    //   // Validate each job row
    //   for (let i = 0; i < payload.againstJobDetails.length; i++) {
    //     const job = payload.againstJobDetails[i];
    //     console.log("Payload received:", JSON.stringify(payload, null, 2));
    //     console.log("First job detail:", payload.againstJobDetails[0]);
    //     console.log(
    //       "Type of job in first row:",
    //       payload.againstJobDetails[0].typeOfJob
    //     );

    //     if (!job.typeOfJob || job.typeOfJob.trim() === "") {
    //       toast.error(`Type of Job is required in row ${i + 1}`);
    //       return false;
    //     }

    //     if (!job.jobNo || job.jobNo.trim() === "") {
    //       toast.error(`Job No. is required in row ${i + 1}`);
    //       return false;
    //     }

    //     if (
    //       !job.amount ||
    //       isNaN(parseFloat(job.amount)) ||
    //       parseFloat(job.amount) <= 0
    //     ) {
    //       toast.error(`Valid Amount is required in row ${i + 1}`);
    //       return false;
    //     }
    //   }
    // }
    if (!payload.orgname) {
      toast.error("Organization name (orgname) is required.");
      return false;
    }
    if (!payload.orgcode) {
      toast.error("Organization code (orgcode) is required.");
      return false;
    }
    if (!payload.branchname) {
      toast.error("Branch name is required.");
      return false;
    }
    if (!payload.branchcode) {
      toast.error("Branch code is required.");
      return false;
    }
    if (!payload.remarks) {
      toast.error("remark is required.");
      return false;
    }
  };
  const handleSubmit = async (action) => {
    const orgname = localStorage.getItem("orgname");
    const orgcode = localStorage.getItem("orgcode");
    const branchname = localStorage.getItem("branchnameofemp");
    const branchcode = localStorage.getItem("branchcodeofemp");

    // Validate branchname and branchcode
    if (!branchname || !branchcode) {
      console.error("Branch name or branch code is missing");
      return; // Exit early if values are missing
    }

    const organizationName =
      organizationType === "new" ? newOrganization : selectedOrganization;
    const payload = {
      currentdate: currentDate,
      postDate: postDate || null, // Ensure postDate is null if undefined
      bankAccount: selectedBank || null,
      organizationType: organizationType || null,
      organizationName: organizationName || null,
      receivedPayementType: paymentType || null,
      amountReceived:
        paymentType === "on-account" && radioSelection === "against-outstanding"
          ? parseFloat(amountReceived || 0)
          : totalAmountReceived || 0,
      remarks: remarks || null,
      orgname: orgname || null,
      orgcode: orgcode || null,
      branchname: branchname || null,
      branchcode: branchcode || null,
      onAccountType: radioSelection || null,
      paymentAdvise: AgainstOutstandingPaymentAdvise || null,
      againstBillDetails: JSON.stringify(billDetails),
      againstJobDetails: JSON.stringify(jobDetails),
      createdby: localStorage.getItem("username"),
    };

    // Validate payload

    if (validatePayload(payload)) {
      return; // Stop execution if validation fails
    } else {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/storecredit`,
          payload
        );
        toast.success("credit details added successfully");

        console.log("Data stored successfully:", response.data);
        localStorage.removeItem("onEdit");
        localStorage.removeItem("creditid");

        if (action === "save") {
          navigate("/PaymentSheetCreditCreate");
          window.location.reload();
        }
        if (action === "close") {
          if (localStorage.getItem("onEdit") === "true") {
            navigate("/PaymentSheetCredit");
          } else {
            window.close();
          }
        }
      } catch (error) {
        console.error(
          "Error storing data:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };
  const resetForm = () => {
    setPostDate("");
    setSelectedBank("");
    setOrganizationType("existing");
    setNewOrganization("");
    setSelectedOrganization("");
    setPaymentType("");
    setAmountReceived("");
    setRemarks("");
    setBillDetails([
      {
        billNo: "",
        jobNo: "",
        billAmount: "",
        tdsDeduction: "",
        totalRecievable: "",
      },
    ]);
    setJobDetails([{ typeOfJob: "", jobNo: "", amount: "" }]);
    setRadioSelection("");
  };

  const [options, setOptions] = useState([]);
  // const [jobOptions, setJobOptions] = useState([]);

  const fetchbillNo = async (clientname) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchbillfromcollection`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchnameofemp: localStorage.getItem("branchnameofemp"),
            branchcodeofemp: localStorage.getItem("branchcodeofemp"),
            clientname: clientname,
          },
        }
      );
      console.log("fetched bill options ->", response.data);
      const formattedOptions = response.data.map((bill) => ({
        label: bill.billNo,
        value: bill.billNo,
        grandTotal: bill.grandTotal,
        jobnumber: bill.jobnumber,
      }));
      console.log("Options:", formattedOptions);

      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // console.log("selectedorg -> ", selectedOrganization);
    const selectedOrg = {
      value: selectedOrganization,
      label: selectedOrganization,
    };
    fetchbillNo(selectedOrg);
  }, [prefillData, selectedOrganization]);

  const fetchjobNo = async (typeOfJob) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchjobnofromcollection`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchnameofemp: localStorage.getItem("branchnameofemp"),
            typeOfJob: typeOfJob,
            clientname: selectedOrganization,
          },
        }
      );
      console.log(response.data);
      const formattedOptions = response.data.map((bill) => ({
        value: bill.jobnumber,
        label: bill.jobnumber,
      }));
      setJobOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const jobTypeOptions = [
    { value: "Import", label: "Import" },
    { value: "Export", label: "Export" },
  ];

  const totalBillAmountReceived = SumRecievable; // Total from bill details
  const totalJobAmountReceived = jobDetails.reduce(
    (sum, job) => sum + (parseFloat(job.amount) || 0),
    0
  );

  // Calculate the total amount received
  const totalAmountReceived = totalBillAmountReceived + totalJobAmountReceived;

  const fetchPrefillData = async () => {
    try {
      const id = localStorage.getItem("creditid");
      const response = await axios.get(
        `${API_BASE_URL}/PrefillcreditDetails`,
        {
          params: {
            id: id,
          },
        }
      );
      console.log("fetched prefill data ->", response.data[0]);
      setPrefillData(response.data[0]);
    } catch (error) {
      console.error("Error fetching prefill data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("onEdit") === "true") {
      fetchPrefillData();
    }
  }, []);

  useEffect(() => {
    if (prefillData) {
      prefillData.referenceno;

      setOrganizationType(prefillData.organizationType);
      setNewOrganization(prefillData.organizationName);
      setSelectedOrganization(prefillData.organizationName);
      setPaymentType(prefillData.receivedPayementType);
      setAgainstOutstandingPaymentAdvise(prefillData.paymentAdvise);
      setBillDetails(prefillData.againstBillDetails);
      setRadioSelection(prefillData.onAccountType);
      setJobDetails(prefillData.againstJobDetails);
      setAmountReceived(prefillData.amountReceived);
      setRemarks(prefillData.remarks);
      setPostDate(prefillData.postDate);
      setSelectedBank(prefillData.bankAccount);
    }
    console.log("billDetails --->", billDetails);
    console.log("jobDetails --->", jobDetails);
  }, [prefillData]);

  const updateCredit = async () => {
    const orgname = localStorage.getItem("orgname");
    const orgcode = localStorage.getItem("orgcode");
    const branchname = localStorage.getItem("branchnameofemp");
    const branchcode = localStorage.getItem("branchcodeofemp");
    const organizationName =
      organizationType === "new" ? newOrganization : selectedOrganization;

    const payload = {
      postDate: postDate || null,
      bankAccount: selectedBank || null,
      organizationType: organizationType || null,
      organizationName: organizationName || null,
      receivedPayementType: paymentType || null,
      amountReceived:
        paymentType === "on-account" && radioSelection === "against-outstanding"
          ? amountReceived || 0
          : totalAmountReceived || 0,
      remarks: remarks || null,
      orgname: orgname || null,
      orgcode: orgcode || null,
      branchname: branchname || null,
      branchcode: branchcode || null,
      onAccountType: radioSelection || null,
      paymentAdvise: AgainstOutstandingPaymentAdvise || null,
      againstBillDetails: JSON.stringify(billDetails),
      againstJobDetails: JSON.stringify(jobDetails),
    };

    if (validatePayload(payload)) {
      return; // Stop execution if validation fails
    } else {
      try {
        const id = localStorage.getItem("creditid");
        const orgname = localStorage.getItem("orgname");
        const orgcode = localStorage.getItem("orgcode");

        const organizationName =
          organizationType === "new" ? newOrganization : selectedOrganization;

        const response = await axios.put(
          `${API_BASE_URL}/updatecredit/${id}`,
          payload
        );
        toast.success("credit details updated successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        className="paymentsheet-create-title"
        // style={{ position: "absolute", margin: "0px" }}
      >
        <h4>
          {localStorage.getItem("onEdit") === "true"
            ? "Edit Credit"
            : "Create Credit"}
        </h4>
      </div>
      <div>
        <CCardBody className="credit-primary-div">
          <div className="credit-date-fields">
            <div className="paye-details-1" style={{ flexDirection: "row" }}>
              <label
                htmlFor="reference-number"
                style={{ width: "124px" }}
                className="accounts-text-field-3"
              >
                Reference Number:
              </label>
              {console.log("prefillData", prefillData)}
              <NewInput
                type={"text"}
                name={"reference-number"}
                selectedValue={
                  prefillData ? prefillData.referenceno : "generates later"
                }
                readlyOnly={true}
                width={"fit-content"}
              />
            </div>

            <div
              className="paye-details-1"
              style={{ flexDirection: "row", width: "188px" }}
            >
              <label
                htmlFor="date"
                style={{ width: "44px" }}
                className="accounts-text-field-3"
              >
                Date:
              </label>
              <NewInput
                type={"date"}
                name={"date"}
                selectedValue={currentDate}
                readlyOnly={true}
                width={"100px"}
              />
            </div>

            <div className="paye-details-1" style={{ flexDirection: "row" }}>
              <label
                htmlFor="post-date"
                style={{ width: "74px" }}
                className="accounts-text-field-3"
              >
                Post Date:
              </label>
              {/* <NewInput
                type={"date"}
                name={"date"}
                selectedValue={postDate}
                setSelectedValue={setPostDate}
                width={"120px"}
              /> */}
              <SingleCalender
                width={"120px"}
                name={"docReceivedOn"}
                value={postDate}
                onDateSelect={hanlePostValue}
                renderTime={false}
                // readOnly={isEditable}
                leftright={"left"}
              />
            </div>
          </div>
        </CCardBody>
      </div>
      <div
        className="line"
        style={{ width: "100%", transform: "none", marginTop: "10px" }}
      ></div>
      <div className="mb-2 credit-secondary-div">
        <CCardBody>
          <div className="payee-credit">
            <div className="payee-row-container">
              <div className="paye-details-1">
                <label htmlFor="bank-account" className="accounts-text-field-3">
                  Bank Account:
                </label>
                <NewDropdownInput
                  type="type1"
                  options={bankDetails.map((bank) => {
                    return { value: bank.label, label: bank.label };
                  })}
                  placeholder={"Bank Account"}
                  selectedValue={selectedBank || ""}
                  setSelectedValue={setSelectedBank}
                  width={"185px"}
                  nameOfDropdown={"Bank Accounts"}
                />
              </div>

              <div className="paye-details-1">
                <label htmlFor="organization" className="accounts-text-field-3">
                  Organization:
                </label>
                <div
                  style={{
                    width: "176px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      width: "fit-content",
                    }}
                  >
                    <input
                      type="radio"
                      name="organization-type"
                      value="new"
                      checked={organizationType === "new"}
                      onChange={(e) => {
                        setNewOrganization("");
                        setOrganizationType(e.target.value);
                      }}
                    />
                    <span
                      className="accounts-text-field-3"
                      style={{ width: "fit-content", fontWeight: "500" }}
                    >
                      New
                    </span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      width: "fit-content",
                    }}
                  >
                    <input
                      type="radio"
                      name="organization-type"
                      value="existing"
                      checked={organizationType === "existing"}
                      onChange={(e) => setOrganizationType(e.target.value)}
                    />
                    <span
                      className="accounts-text-field-3"
                      style={{ width: "fit-content", fontWeight: "500" }}
                    >
                      Existing
                    </span>
                  </label>
                </div>
              </div>
              {console.log("organizationType -> ", organizationType)}
              <div className="paye-details-1">
                <label className="accounts-text-field-3">
                  Organization Name:
                </label>
                {organizationType === "new" && (
                  <NewInput
                    type={"text"}
                    name={"text"}
                    placeholder={"New Organization Name"}
                    selectedValue={newOrganization}
                    setSelectedValue={setNewOrganization}
                    width={"185px"}
                  />
                )}

                {organizationType === "existing" && (
                  <NewDropdownInput
                    type="type4"
                    options={orgOptions}
                    placeholder={"Organization"}
                    selectedValue={selectedOrganization || ""}
                    setSelectedValue={handleOrganizationChange}
                    width={"185px"}
                    nameOfDropdown={"Bank Accounts"}
                  />
                )}
              </div>
            </div>

            <div className="payee-row-container">
              <div className="paye-details-1">
                <label htmlFor="payment-type" className="accounts-text-field-3">
                  Received Payment Type:
                </label>
                <NewDropdownInput
                  type="type4"
                  options={[
                    { value: "against-bill", label: "Against Bill" },
                    { value: "on-account", label: "On A/C" },
                  ]}
                  selectedValue={paymentType || ""}
                  setSelectedValue={handleReceivedPayment}
                  width={"185px"}
                  nameOfDropdown={"Received Payment Type"}
                />
              </div>

              <div className="paye-details-1">
                <label
                  htmlFor="amountreceived"
                  className="accounts-text-field-3"
                >
                  Amount Received:
                </label>
                <NewInput
                  type={"text"}
                  selectedValue={
                    paymentType === "on-account" &&
                    radioSelection === "against-outstanding"
                      ? new Intl.NumberFormat("en-IN").format(
                          Number(amountReceived || "0")
                        )
                      : new Intl.NumberFormat("en-IN").format(
                          Number(totalAmountReceived || "0")
                        )
                  }
                  setSelectedValue={(val) => {
                    if (
                      paymentType === "on-account" &&
                      radioSelection === "against-outstanding"
                    ) {
                      const raw = val.replace(/,/g, "").replace(/\D/g, ""); // remove commas, keep digits
                      setAmountReceived(raw);
                    }
                  }}
                  readlyOnly={
                    !(
                      paymentType === "on-account" &&
                      radioSelection === "against-outstanding"
                    )
                  }
                  width={"185px"}
                />
              </div>

              <div className="paye-details-1">
                <label htmlFor="remarks" className="accounts-text-field-3">
                  Remarks:
                </label>
                <NewInput
                  type={"textarea"}
                  selectedValue={remarks}
                  setSelectedValue={setRemarks}
                  textarea={true}
                  width={"185px"}
                  height={"fit-content"}
                  textareaMinHeight={"26px"}
                  textareaMaxHeight={"100px"}
                  textareaHeight={"26px"}
                />
              </div>
            </div>

            {paymentType === "on-account" && (
              <div className="payee-row-container">
                <div className="paye-details-1">
                  <label
                    htmlFor="organization"
                    className="accounts-text-field-3"
                  >
                    Against:
                  </label>
                  <div
                    style={{
                      width: "290px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        width: "fit-content",
                      }}
                    >
                      <input
                        type="radio"
                        value="against-job"
                        name="on-account-radio"
                        checked={radioSelection === "against-job"}
                        onChange={(e) => setRadioSelection(e.target.value)}
                      />
                      <span
                        className="accounts-text-field-3"
                        style={{ width: "fit-content", fontWeight: "500" }}
                      >
                        Job
                      </span>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        width: "fit-content",
                      }}
                    >
                      <input
                        type="radio"
                        value="against-outstanding"
                        name="on-account-radio"
                        checked={radioSelection === "against-outstanding"}
                        onChange={(e) => setRadioSelection(e.target.value)}
                      />
                      <span
                        className="accounts-text-field-3"
                        style={{ width: "fit-content", fontWeight: "500" }}
                      >
                        Outstanding
                      </span>
                    </label>
                  </div>
                </div>

                {radioSelection === "against-outstanding" && (
                  <div className="paye-details-1">
                    <label className="accounts-text-field-3">
                      Payment Advise:
                    </label>
                    <NewInput
                      type={"textarea"}
                      selectedValue={AgainstOutstandingPaymentAdvise}
                      setSelectedValue={setAgainstOutstandingPaymentAdvise}
                      textarea={true}
                      width={"185px"}
                      height={"fit-content"}
                      textareaMinHeight={"26px"}
                      textareaMaxHeight={"100px"}
                      textareaHeight={"26px"}
                    />
                  </div>
                )}
                <div style={{ width: "285px" }}></div>
              </div>
            )}

            <div
              className="line"
              style={{ width: "100%", transform: "none", marginTop: "10px" }}
            ></div>

            {radioSelection === "against-job" &&
              paymentType === "on-account" && (
                <div>
                  <div
                    style={{
                      width: "fit-content",
                    }}
                    onClick={handleAddJobDetail}
                  >
                    <NewButton text={"Add Job"} width={"100px"} />
                  </div>

                  <table
                    className="border-separate"
                    style={{
                      marginTop: "12px",
                      borderCollapse: "separate",
                      borderSpacing: "0 8px",
                      tableLayout: "auto",
                      width: "100%",
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
                      <tr className="head-accounts">
                        <th
                          scope="col"
                          className="row-font px-2 py-2 rounded-lg"
                          style={{ width: "25%", height: "30px" }}
                        >
                          Type Of job
                        </th>
                        <th
                          scope="col"
                          className="row-font px-2 py-2 rounded-lg"
                          style={{ width: "25%", height: "30px" }}
                        >
                          Job No.
                        </th>
                        <th
                          scope="col"
                          className="row-font px-2 py-2 rounded-lg"
                          style={{ width: "25%", height: "30px" }}
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="row-font px-2 py-2 rounded-lg"
                          style={{ width: "12%", height: "30px" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobDetails.map((job, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472"
                                  : "#263A52"
                                : index % 2 === 0
                                ? "#D8F0FD"
                                : "#F6FCFF",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontFamily: "Instrument Sans",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal",
                            letterSpacing: "0.14px",
                          }}
                        >
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            // style={{ minWidth: "100px" }}
                          >
                            <NewDropdownInput
                              type="type5"
                              index={index}
                              options={jobTypeOptions}
                              selectedValue={job.typeOfJob || ""}
                              setSelectedValue={handleChangeJobDetail}
                              width={"100%"}
                              nameOfDropdown={"typeOfJob"}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            // style={{
                            //   minWidth: "100px",
                            //   justifyContent: "center",
                            // }}
                          >
                            {/* <NewDropdownInput
                              type="type5"
                              index={index}
                              options={jobOptions}
                              selectedValue={job.jobNo || ""}
                              setSelectedValue={handleChangeJobDetail}
                              width={"100%"}
                              nameOfDropdown={"jobNo"}
                            /> */}
                            <NewDropdownInput
                              type="type5"
                              index={index}
                              options={job.jobOptions || []}
                              selectedValue={job.jobNo || ""}
                              setSelectedValue={handleChangeJobDetail}
                              width={"100%"}
                              nameOfDropdown={"jobNo"}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            // style={{ minWidth: "100px" }}
                          >
                            <NewInput
                              inputType={"type1"}
                              type={"number"}
                              placeholder={"Enter Amount"}
                              selectedValue={job.amount}
                              setSelectedValue={handleChangeJobDetail}
                              width={"100%"}
                              specialName={"amount"}
                              index={index}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            // style={{ minWidth: "100px" }}
                          >
                            <Link>
                              <div onClick={() => handleDeleteJobDetail(index)}>
                                <DeleteBtn
                                  fill={
                                    theme === "dark" ? "#f8d7da" : "#1E266D"
                                  }
                                />
                              </div>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr
                        style={{
                          backgroundColor: "transparent",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        <td
                          className="td-accounts px-2 py-2 rounded-lg"
                          style={{ minWidth: "100px" }}
                        ></td>
                        <td
                          className="td-accounts px-2 py-2 rounded-lg"
                          style={{ minWidth: "100px" }}
                        >
                          Total:
                        </td>
                        <td
                          className="td-accounts py-2 rounded-lg"
                          style={{
                            minWidth: "100px",
                            textAlign: "left",
                            paddingLeft: "28px",
                          }}
                        >
                          {new Intl.NumberFormat("en-IN").format(
                            jobDetails
                              .reduce(
                                (sum, job) =>
                                  sum + (parseFloat(job.amount) || 0),
                                0
                              )
                              .toFixed(2)
                          )}
                        </td>
                        <td
                          className="td-accounts px-2 py-2 rounded-lg"
                          style={{ minWidth: "100px" }}
                        ></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}

            {paymentType === "against-bill" && (
              <div className="mt-3">
                <div
                  style={{
                    width: "fit-content",
                  }}
                  onClick={handleAddBillDetail}
                >
                  <NewButton text={"Add Bill"} width={"100px"} />
                </div>

                <table
                  className="border-separate"
                  style={{
                    marginTop: "12px",
                    borderCollapse: "separate",
                    borderSpacing: "0 8px",
                    tableLayout: "auto",
                    width: "100%",
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
                    <tr className="head-accounts">
                      <th
                        scope="col"
                        className="row-font px-2 py-2 rounded-lg"
                        style={{ minWidth: "100px", height: "30px" }}
                      >
                        Bill No.
                      </th>
                      <th
                        scope="col"
                        className="row-font px-2 py-2 rounded-lg"
                        style={{ minWidth: "100px", height: "30px" }}
                      >
                        Job No.
                      </th>
                      <th
                        scope="col"
                        className="row-font px-2 py-2 rounded-lg"
                        style={{ minWidth: "100px", height: "30px" }}
                      >
                        Bill Amount
                      </th>
                      <th
                        scope="col"
                        className="row-font px-2 py-2 rounded-lg"
                        style={{ minWidth: "100px", height: "30px" }}
                      >
                        TDS Deduction
                      </th>
                      <th
                        scope="col"
                        className="row-font px-2 py-2 rounded-lg"
                        style={{ minWidth: "100px", height: "30px" }}
                      >
                        Total Receivable
                      </th>
                      <th
                        scope="col"
                        className="row-font px-2 py-2 rounded-lg"
                        style={{ minWidth: "100px", height: "30px" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="body-accounts">
                    {billDetails.map((bill, index) => {
                      const isSelected = selectedRowIndex === index;

                      return (
                        <tr
                          key={index}
                          onClick={() => setSelectedRowIndex(index)}
                          className={`selected-row ${
                            isSelected ? "primary-selected" : ""
                          }`}
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? index % 2 === 0
                                  ? "#3B5472"
                                  : "#263A52"
                                : index % 2 === 0
                                ? "#D8F0FD"
                                : "#F6FCFF",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontFamily: "Instrument Sans",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal",
                            letterSpacing: "0.14px",
                          }}
                        >
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            style={{ minWidth: "100px" }}
                          >
                            <NewDropdownInput
                              type="type5"
                              index={index}
                              options={options}
                              selectedValue={bill.billNoForAgainstBill || ""}
                              setSelectedValue={handleChangeBillDetail}
                              width={"100%"}
                              nameOfDropdown={"billNoForAgainstBill"}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            style={{ minWidth: "100px" }}
                          >
                            <NewInput
                              type="text"
                              selectedValue={bill.jobNoForAgainstBill}
                              width="100%"
                              // explicitly pass the index and field name so your handler can update this field
                              setSelectedValue={(value) =>
                                handleChangeBillDetail(
                                  index,
                                  "jobNoForAgainstBill",
                                  value
                                )
                              }
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            style={{ minWidth: "100px" }}
                          >
                            <NewInput
                              inputType={"type1"}
                              type={"number"}
                              placeholder={"Enter Bill Amount"}
                              selectedValue={bill.billamountForAgainstBill}
                              setSelectedValue={handleChangeBillDetail}
                              width={"100%"}
                              specialName={"billamountForAgainstBill"}
                              index={index}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            style={{ minWidth: "100px" }}
                          >
                            <NewInput
                              inputType={"type1"}
                              type={"number"}
                              placeholder={"Enter TDS Deduction"}
                              selectedValue={bill.tdsDeductionForAgainstBill}
                              setSelectedValue={handleChangeBillDetail}
                              width={"100%"}
                              specialName={"tdsDeductionForAgainstBill"}
                              index={index}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            style={{ minWidth: "100px" }}
                          >
                            <NewInput
                              inputType={"type1"}
                              type={"text"}
                              selectedValue={bill.totalReceivableForAgainstBill}
                              width={"100%"}
                              placeholder={"Total Receivable"}
                              readlyOnly={true}
                            />
                          </td>
                          <td
                            className="td-accounts px-2 py-2 rounded-lg"
                            style={{ minWidth: "100px" }}
                          >
                            <Link>
                              <div
                                onClick={() => handleDeleteBillDetail(index)}
                              >
                                <DeleteBtn
                                  fill={
                                    theme === "dark" ? "#f8d7da" : "#1E266D"
                                  }
                                />
                              </div>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr
                      style={{
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                      }}
                    >
                      <td></td>
                      <td
                        colSpan="1"
                        className="td-accounts px-2 py-2 rounded-lg"
                      >
                        {" "}
                        Totals:
                      </td>
                      <td
                        className="td-accounts py-2 rounded-lg"
                        style={{ textAlign: "left", paddingLeft: "28px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(SumBillAmount)}{" "}
                      </td>
                      <td
                        className="td-accounts py-2 rounded-lg"
                        style={{ textAlign: "left", paddingLeft: "28px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(SumTdsDeduction)}
                      </td>
                      <td
                        className="td-accounts py-2 rounded-lg"
                        style={{ textAlign: "left", paddingLeft: "28px" }}
                      >
                        {new Intl.NumberFormat("en-IN").format(SumRecievable)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </CCardBody>
      </div>
      {console.log("remarks ----> ", remarks)}
      {localStorage.getItem("onEdit") === "true" ? (
        <div className="credits-save-btn-div">
          {(checkUsername === "admin" || useEdit) && (
            <div
              className="button-23"
              onClick={() => {
                updateCredit();
              }}
            >
              <NewButton text={"Save"} width={"140px"} />
            </div>
          )}
          {/* {(checkUsername === "admin" || useEdit) && (
            <div
              className="button-23"
              onClick={() => {
                updateCredit();
                if (localStorage.getItem("onEdit") === "true") {
                  navigate("/PaymentSheetCredit");
                } else {
                  window.close();
                }
              }}
            >
              <NewButton text={" Save & Close edit  "} width={"140px"} />
            </div>
          )} */}
          <div
            className="button-23"
            onClick={() => {
              if (localStorage.getItem("onEdit") === "true") {
                navigate("/PaymentSheetCredit");
              } else {
                window.close();
              }
            }}
          >
            <NewButton text={"Close"} width={"140px"} />
          </div>
        </div>
      ) : (
        <div className="credits-save-btn-div">
          {(checkUsername === "admin" || useAdd) && (
            <div
              className="button-23"
              onClick={() => {
                handleSubmit("save");
              }}
            >
              <NewButton text={"Save & new"} width={"140px"} />
            </div>
          )}
          {(checkUsername === "admin" || useAdd) && (
            <div
              className="button-23"
              onClick={() => {
                handleSubmit("close");
              }}
            >
              <NewButton text={" Save & Close "} width={"140px"} />
            </div>
          )}
          <div
            className="button-23"
            onClick={() => {
              if (localStorage.getItem("onEdit") === "true") {
                navigate("/PaymentSheetCredit");
              } else {
                window.close();
              }
            }}
          >
            <NewButton text={"Close"} width={"140px"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCreate;
