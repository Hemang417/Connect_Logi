import React, { useEffect, useState } from "react";
import SingleCalender from "src/components/SingleCalender";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewButton from "src/views/buttons/buttons/NewButton";
import InputPopup from "src/components/inputPopup/InputPopup";
import Cookies from "js-cookie";

import {
  CButton,
  CCardBody,
  CModalFooter,
  CDropdown,
  CDropdownItem,
  CCard,
  CModalHeader,
  CModalTitle,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownDivider,
  CModal,
  CModalBody,
  CInput,
} from "@coreui/react";
import "../css/accounts-styles.css";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
import API_BASE_URL from "src/config/config";

const DebitCreate = () => {
  const [allBankDetails, setAllBankDetails] = useState([]);
  const [payBankDetails, setPayBankDetails] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [gstpercentage, setGstpercentage] = useState(0);
  const [tdsname, setTDSname] = useState("");
  const [tdspercentage, setTDSpercentage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [typeofexpense, settypeofexpense] = useState([]);
  const [useEdit, setUseEdit] = useState(false);
  const [useAdd, setUseAdd] = useState(false);
  const checkUsername = localStorage.getItem("username");
  const [currentPopup, setCurrentPopup] = useState("none");

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

  const [customGSTPercentage, setCustomGSTPercentage] = useState("");
  const [customGstVisible, setCustomGstVisible] = useState(false);

  const tdsOptions = [
    { description: "TDS COMM.", percentage: "5" },
    { description: "194-C", percentage: "2" },
    { description: "94I", percentage: "10" },
    { description: "94J", percentage: "10" },
    { description: "94C1%", percentage: "1" },
    { description: "94A", percentage: "10" },
    { description: "Zero", percentage: "0" },
  ];

  const [formData, setFormData] = useState({
    date: "",
    referenceno: "",
    bankname: null, // For Select, initialize as null
    typeOfExpense: "",
    paymentdetail: null,
    taxableAmount: "",
    gstAmount: "",
    totalInvoiceAmount: "",
    tdsAmount: "",
    netPaymentAmount: "",
    utrDetails: "",
    typeofjob: "",
    jobNo: "",
    customerName: "",
    remarks: "",
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

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

      const controlSet = new Set(data.map((item) => item.control));

      setUseEdit(controlSet.has("edit-debit"));
      setUseAdd(controlSet.has("add-debit"));

      console.log("controls", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcontrols();
    return () => {
      localStorage.removeItem("debitid");
      localStorage.removeItem("onEdit");
    };
  }, []);
  const getBankDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getbankdetails`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      const formattedPayBankDetails = response.data.map((bank) => ({
        bankkanaam: bank.bankname,
        accountkanum: bank.accountnum,
      }));

      setPayBankDetails(formattedPayBankDetails);

      const formattedData = response.data.map((bank) => ({
        value: bank.bankname,
        label: bank.bankname,
      }));

      setAllBankDetails(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrgdata = async () => {
    try {
      const orgresponse = await axios.get(
        `${API_BASE_URL}/getallorganizationdetails`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );

      const formattedData = orgresponse.data.map((client) => ({
        value: client.clientname,
        label: client.clientname,
      }));
      setFiltered(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getPayeDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getpayedetails`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });

      const formattedPayEDetails = response.data.map((bankkadata) => ({
        payEkaNaam: bankkadata.payename,
        payEkaAcc: bankkadata.accountnum,
      }));
      console.log("formattedPayEDetails:", formattedPayEDetails);
      const mergedPayBankDetails = [
        ...new Set(
          [...payBankDetails, ...formattedPayEDetails].map((item) =>
            JSON.stringify(item)
          )
        ),
      ].map((item) => JSON.parse(item));

      console.log("mergedPayBankDetails:", mergedPayBankDetails);
      setPayBankDetails(mergedPayBankDetails);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("payBankDetails:", payBankDetails);

  useEffect(() => {
    getBankDetails();
    getOrgdata();
    getPayeDetails();
  }, []);

  const handleInputChangeForField = (e) => {
    const { name, value } = e.target;
    if (name === "taxableAmount") {
      calculateGSTandstuff(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  // Define initial form data
  const initialFormData = {
    date: "",
    referenceno: "",
    bankname: null,
    typeOfExpense: "",
    paymentdetail: null,
    taxableAmount: "",
    gstAmount: "",
    totalInvoiceAmount: "",
    tdsAmount: "",
    netPaymentAmount: "",
    utrDetails: "",
    typeofjob: "",
    jobNo: "",
    customerName: "",
    remarks: "",
  };

  // Add this function to handle closing
  const handleClose = () => {
    // Try to close the window (works for popups)
    try {
      window.close();
    } catch (e) {
      // If closing fails, navigate to the payments sheet
      navigate("/PaymentSheetDebit");
    }
  };

  const validateDebitForm = (formData) => {
    if (!formData.date) {
      toast.error("Date is required");
      return false;
    }

    if (!formData.bankname) {
      toast.error("Bank Account is required");
      return false;
    }

    if (!formData.paymentdetail) {
      toast.error("Payment Details are required");
      return false;
    }

    if (!formData.typeOfExpense) {
      toast.error("Type of Expense is required");
      return false;
    }

    const utrRegex = /^[A-Z]{4}[0-9]{1}[0-9]{2}[0-3][0-9]{2}[0-9]{6,}$/;

    if (!formData.utrDetails || formData.utrDetails.trim() === "") {
      toast.error("UTR Details are required");
      return false;
    }

    if (!utrRegex.test(formData.utrDetails.trim())) {
      toast.error("Invalid UTR Number format");
      return false;
    }

    if (!formData.typeofjob) {
      toast.error("Type of Job is required");
      return false;
    }

    if (!formData.jobNo || Object.keys(formData.jobNo).length === 0) {
      toast.error("Job Number is required");
      return false;
    }

    if (!formData.customerName) {
      toast.error("Customer Name is required");
      return false;
    }

    if (!formData.remarks) {
      toast.error("Remarks are required");
      return false;
    }

    // Numeric validations
    const taxableAmount = parseFloat(formData.taxableAmount);
    if (isNaN(taxableAmount) || taxableAmount <= 0) {
      toast.error("Taxable Amount must be a valid number greater than 0");
      return false;
    }

    const gstAmount = parseFloat(formData.gstAmount);
    if (isNaN(gstAmount)) {
      toast.error("GST Amount must be a valid number");
      return false;
    }

    const tdsAmount = parseFloat(formData.tdsAmount);
    if (isNaN(tdsAmount)) {
      toast.error("TDS Amount must be a valid number");
      return false;
    }

    const totalInvoiceAmount = parseFloat(formData.totalInvoiceAmount);
    const calculatedTotal = taxableAmount + gstAmount;
    if (Math.abs(calculatedTotal - totalInvoiceAmount) > 0.01) {
      toast.error("Total Invoice Amount doesn't match Taxable + GST amounts");
      return false;
    }

    const netPaymentAmount = parseFloat(formData.netPaymentAmount);
    const calculatedNet = calculatedTotal - tdsAmount;
    if (Math.abs(calculatedNet - netPaymentAmount) > 0.01) {
      toast.error(
        "Net Payment Amount doesn't match Total Invoice - TDS amounts"
      );
      return false;
    }

    return true;
  };

  const AddDebit = async (action) => {
    // Add this at the beginning
    if (!validateDebitForm(formData)) {
      return;
    }

    const formDataToSend = {
      date: formData.date,
      bankname: formData.bankname ? formData.bankname.value : null,
      typeOfExpense: formData.typeOfExpense,
      paymentdetail: formData.paymentdetail
        ? formData.paymentdetail.payEkaNaam
        : null,
      taxableAmount: formData.taxableAmount,
      gstAmount: formData.gstAmount,
      totalInvoiceAmount: formData.totalInvoiceAmount,
      tdsAmount: formData.tdsAmount,
      netPaymentAmount: formData.netPaymentAmount,
      utrDetails: formData.utrDetails,
      typeofjob: formData.typeofjob,
      jobNo: formData.jobNo,
      customerName: formData.jobNo.name,
      remarks: formData.remarks,
      createdby: localStorage.getItem("username"),
    };

    console.log("Data to send:", formDataToSend);
    try {
      const response = await axios.post(`${API_BASE_URL}/addDebit`, {
        formData: formDataToSend,
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        branchname: localStorage.getItem("branchnameofemp"),
        branchcode: localStorage.getItem("branchcodeofemp"),
      });

      if (response.status === 200) {
        toast.success("Debit details added successfully");
        setFormData({
          date: "",
          bankname: "",
          typeOfExpense: "",
          paymentdetail: "",
          taxableAmount: "",
          gstAmount: "",
          totalInvoiceAmount: "",
          tdsAmount: "",
          netPaymentAmount: "",
          utrDetails: "",
          typeofjob: "",
          jobNo: "",
          customerName: "",
          remarks: "",
        });

        console.log("action -> ", action);

        // Reset form for "Save & New"
        if (action === "new") {
          // setFormData(initialFormData);
          // setGstpercentage(0);
          // setTDSname("");
          // setTDSpercentage(0);
          // setJobType("");
          // setJobOptions([]);
          // setCustomGSTPercentage("");

          window.location.reload();
        }
        // Close for "Save & Close"
        else if (action === "close") {
          handleClose();
        }
      }
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [prefillData, setPrefillData] = useState(null);

  const fetchPrefillData = async () => {
    try {
      const id = localStorage.getItem("debitid");
      const response = await axios.get(
        `${API_BASE_URL}/PrefilldebitDetails`,
        {
          params: {
            id: id,
          },
        }
      );
      console.log("sds", response.data[0]);
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
      const paymentDetailMatch =
        payBankDetails.find(
          (detail) => detail.payEkaNaam === prefillData.paymentdetail
        ) || null;
      setFormData({
        date: moment(prefillData.date).format("YYYY-MM-DD"), // Adjust format as needed
        bankname: allBankDetails.find(
          (bank) => bank.value === prefillData.bankname
        ), // Find the corresponding bank object
        typeOfExpense: prefillData.typeofexpense, // Map to the correct field name
        paymentdetail: paymentDetailMatch
          ? {
              payEkaNaam: paymentDetailMatch.payEkaNaam,
              payEkaAcc: paymentDetailMatch.payEkaAcc,
              label: paymentDetailMatch.payEkaNaam,
              value: paymentDetailMatch.payEkaNaam,
            }
          : null,
        taxableAmount: prefillData.taxamount, // Map to the correct field name
        gstAmount: prefillData.gstamount, // Map to the correct field name
        totalInvoiceAmount: prefillData.totalinvoiceamount, // Map to the correct field name
        tdsAmount: prefillData.tdsamount, // Map to the correct field name
        netPaymentAmount: prefillData.netpaymentamount, // Map to the correct field name
        utrDetails: prefillData.utrnumber, // Map to the correct field name
        typeofjob: prefillData.typeofjob,
        jobNo: prefillData.jobnumber, // Map to the correct field name
        referenceno: prefillData.referenceno,
        customerName: prefillData.customername, // Map to the correct field name
        remarks: prefillData.remarks,
      });
      setJobType(prefillData.typeofjob);

      if (prefillData.taxamount && prefillData.gstamount) {
        const taxAmount = parseFloat(prefillData.taxamount);
        const gstAmount = parseFloat(prefillData.gstamount);
        if (taxAmount > 0) {
          const calculatedGstPercentage = (gstAmount / taxAmount) * 100;
          setGstpercentage(parseFloat(calculatedGstPercentage.toFixed(2)));
        }
      }
    }
  }, [prefillData, payBankDetails, allBankDetails]);

  const updateDebit = async () => {
    try {
      // Add this at the beginning
      if (!validateDebitForm(formData)) {
        return;
      }

      const id = localStorage.getItem("debitid");

      const response = await axios.put(
        `${API_BASE_URL}/updateDebit/${id}`,
        {
          date: formData.date,
          bankname: formData.bankname ? formData.bankname.value : null,
          typeOfExpense: formData.typeOfExpense,
          paymentdetail: formData.paymentdetail
            ? formData.paymentdetail.payEkaNaam
            : null,
          taxableAmount: formData.taxableAmount,
          gstAmount: formData.gstAmount,
          totalInvoiceAmount: formData.totalInvoiceAmount,
          tdsAmount: formData.tdsAmount,
          netPaymentAmount: formData.netPaymentAmount,
          utrDetails: formData.utrDetails,
          typeofjob: formData.typeofjob,
          jobNo: formData.jobNo,
          customerName: formData.customerName,
          remarks: formData.remarks,
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        }
      );

      if (response.status === 200) {
        toast.success("Debit details updated successfully");
        navigate("/PaymentSheetDebit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGSTChange = (selectedValue) => {
    if (selectedValue === "Custom") {
      setCurrentPopup("Add Custom GST");
    } else {
      setGstpercentage(parseFloat(selectedValue));
      calculateGSTandstuff(formData.taxableAmount);
      // Update the display value in the form data
      const updatedGstAmount =
        (parseFloat(formData.taxableAmount || 0) * parseFloat(selectedValue)) /
        100;
      setFormData((prevState) => ({
        ...prevState,
        gstAmount: updatedGstAmount.toFixed(2),
      }));
    }
  };

  const handleTDSChange = (selectedValue) => {
    const selectedOption = tdsOptions.find(
      (item) => item.description === selectedValue
    );
    if (selectedOption) {
      setTDSname(selectedValue);
      setTDSpercentage(parseFloat(selectedOption.percentage));

      // Recalculate TDS amount based on the selected percentage
      const taxAmountNumber = parseFloat(formData.taxableAmount) || 0;
      const tdsamt =
        (taxAmountNumber * parseFloat(selectedOption.percentage)) / 100;

      // Update form data with new TDS info
      setFormData((prevState) => ({
        ...prevState,
        tdsAmount: tdsamt.toFixed(2),
        netPaymentAmount: (
          parseFloat(prevState.totalInvoiceAmount) - tdsamt
        ).toFixed(2),
      }));
    }
  };

  useEffect(() => {
    calculateGSTandstuff(formData.taxableAmount);
  }, [gstpercentage, tdspercentage, formData.taxableAmount]);

  const calculateGSTandstuff = (taxamt) => {
    try {
      const taxAmountNumber = parseFloat(taxamt) || 0;
      const gstamt = parseFloat(customGSTPercentage.addGst)
        ? (taxAmountNumber * parseFloat(customGSTPercentage.addGst)) / 100
        : (taxAmountNumber * gstpercentage) / 100;
      const totalInvoice = taxAmountNumber + gstamt;
      const tdsamt = (taxAmountNumber * tdspercentage) / 100;
      const netPayment = totalInvoice - tdsamt;
      setFormData({
        ...formData,
        taxableAmount: taxamt,
        gstAmount: gstamt.toFixed(2),
        totalInvoiceAmount: totalInvoice.toFixed(2),
        tdsAmount: tdsamt.toFixed(2),
        netPaymentAmount: netPayment.toFixed(2),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomGSTChange = (e) => {
    // Check if e is an event or a direct value
    if (e && e.target) {
      setCustomGSTPercentage(parseFloat(e.target.value));
    } else if (e !== undefined) {
      // If it's a direct value (from InputPopup component)
      setCustomGSTPercentage(parseFloat(e));
    }
  };

  const handleAddCustomGST = () => {
    setGstpercentage(parseFloat(customGSTPercentage.addGst));
    calculateGSTandstuff(formData.taxableAmount);
    setCustomGstVisible(false);
  };

  const [jobType, setJobType] = useState("");
  const [jobOptions, setJobOptions] = useState([]);
  const jobTypeOptions = [
    { value: "Import", label: "Import" },
    { value: "Export", label: "Export" },
  ];

  const fetchjobNo = async (typeOfJob) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchjobnofromcollectiondebit`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchnameofemp: localStorage.getItem("branchnameofemp"),
            typeOfJob: typeOfJob,
          },
        }
      );
      console.log(response.data);
      const formattedOptions = response.data.map((bill) => ({
        value: bill.jobnumber,
        label: bill.jobnumber,
        name: bill.importername || bill.exportername,
      }));
      console.log(formattedOptions);
      setJobOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleJobTypeChange = (selectedOption) => {
    setJobType(selectedOption.value);
    formData.typeofjob = selectedOption.value;
  };

  useEffect(() => {
    fetchjobNo(jobType);
  }, [jobType]);

  const getDebitDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getdebitdetails`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      console.log(response.data);
      settypeofexpense(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDebitDetails();
  }, []);

  return (
    <>
      <div className="paymentsheet-create-title">
        <h4>
          {localStorage.getItem("onEdit") === "true"
            ? "Debit Details"
            : "Debit Create"}
        </h4>
      </div>
      <div className="mb-2 container-div-general">
        <CCardBody>
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <label htmlFor="date" className="text-field-3">
                  Date:
                </label>
                {/* <NewInput
                  type={"date"}
                  name={"date"}
                  selectedValue={formData.date}
                  setSelectedValue={handleInputChangeForField}
                  width={"185px"}
                /> */}
                <SingleCalender
                  width={"145px"}
                  name={"date"}
                  value={formData.date}
                  onDateSelect={handleInputChangeForField}
                  leftright={"right"}
                />
              </div>

              <div>
                <label htmlFor="bank-account" className="text-field-3">
                  Bank Account:
                </label>
                <NewDropdownInput
                  type="type6"
                  options={allBankDetails}
                  placeholder={"Bank Account"}
                  selectedValue={formData.bankname ? formData.bankname.label : ""}
                  setSelectedValue={handleSelectChange}
                  width={"185px"}
                  nameOfDropdown={"bankname"}
                />
              </div>

              <div>
                <label htmlFor="payment-details" className="text-field-3">
                  Payment Details:
                </label>
                <NewDropdownInput
                  type="type6"
                  options={payBankDetails.map((item) => ({
                    value: item.payEkaNaam,
                    label: item.payEkaNaam,
                  }))}
                  placeholder={"Payment Details"}
                  selectedValue={
                    formData.paymentdetail
                      ? formData.paymentdetail.payEkaNaam
                      : ""
                  }
                  setSelectedValue={(name, value) => {
                    const selectedDetail = payBankDetails.find(
                      (detail) => detail.payEkaNaam === value.value
                    );
                    if (selectedDetail) {
                      setFormData({
                        ...formData,
                        paymentdetail: {
                          payEkaNaam: selectedDetail.payEkaNaam,
                          payEkaAcc: selectedDetail.payEkaAcc,
                        },
                      });
                    }
                  }}
                  width={"185px"}
                  nameOfDropdown={"paymentdetail"}
                />
              </div>
            </div>

            <div className="debit-modal">
              <div className="paye-debit-details-1">
                <div className="debit-modal-field-2">
                  <label htmlFor="type-of-expense" className="text-field-3">
                    Type of Expense:
                  </label>
                  <div className="newBorder">
                    <CreatableSelect
                      isClearable
                      className="fixed-width-select"
                      name="typeOfExpense"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          minHeight: "22px",
                          paddingLeft: "5px",
                          border: "0px",
                          zIndex: "100",
                          borderRadius: "5px",
                          fontSize: "12px",
                          backgroundColor: "transparent !important",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          boxShadow: "none !important",
                          borderColor: "transparent !important",
                          width: "180px",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          padding: "0px 8px",
                        }),
                        input: (provided) => ({
                          ...provided,
                          margin: "0px",
                          fontSize: "12px",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          "-webkit-text-fill-color":
                            theme === "dark" ? "#D1EEFF" : "#535B87",
                          backgroundColor: "transparent !important",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          backgroundColor: "transparent !important",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                          zIndex: 9999,
                          backgroundColor:
                            theme === "dark" ? "#101322" : "#fff",
                          borderRadius: "5px",
                          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused
                            ? theme === "dark"
                              ? "#252A37"
                              : "#f0f0f0"
                            : "transparent !important",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          cursor: "pointer",
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: "22px",
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: "180px", // Adjust as needed for visible options
                          overflowY: "auto",
                          scrollbarWidth: "thin", // Firefox
                          msOverflowStyle: "none", // IE 10+
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor:
                              theme === "dark" ? "#D1EEFF" : "#535B87",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "transparent !important",
                          },
                        }),
                      }}
                      options={Array.from(
                        new Set(
                          typeofexpense.map((expense) => expense.typeofexpense)
                        )
                      ).map((expense) => ({
                        value: expense,
                        label: expense,
                      }))}
                      value={
                        formData.typeOfExpense
                          ? {
                              label: formData.typeOfExpense,
                              value: formData.typeOfExpense,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        setFormData({
                          ...formData,
                          typeOfExpense: selectedOption
                            ? selectedOption.value
                            : "", // Set the value to the selected option
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="debit-modal-field-2">
                  <label htmlFor="taxable-amount" className="text-field-3">
                    Taxable Amount:
                  </label>
                  <NewInput
                    type={"number"}
                    name={"taxableAmount"}
                    selectedValue={formData.taxableAmount}
                    setSelectedValue={handleInputChangeForField}
                    width={"180px"}
                  />
                </div>

                <div className="debit-modal-field-2">
                  <label
                    htmlFor="gst-amount"
                    className="text-field-3"
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    GST Amount:{" "}
                    <strong>{`${new Intl.NumberFormat("en-IN").format(
                      formData.gstAmount
                    )}`}</strong>
                    {/* <NewInput
                      type={"text"}
                      name={"gstAmount"}
                      selectedValue={`${new Intl.NumberFormat("en-IN").format(
                        formData.gstAmount
                      )}`}
                      width={"50px"}
                      readlyOnly={true}
                    /> */}
                  </label>
                  <NewDropdownInput
                    type="type1"
                    options={[
                      { value: "0", label: "0%" },
                      { value: "5", label: "5%" },
                      { value: "12", label: "12%" },
                      { value: "18", label: "18%" },
                      { value: "28", label: "28%" },
                      { value: "Custom", label: "Custom" },
                    ]}
                    placeholder={"Select GST"}
                    selectedValue={
                      gstpercentage !== 0
                        ? `${gstpercentage}`
                        : gstpercentage === 0
                        ? "0%"
                        : ""
                    }
                    setSelectedValue={handleGSTChange}
                    width={"180px"}
                    nameOfDropdown={"transportMode"}
                  />
                </div>
              </div>

              <div className="paye-debit-details-1">
                <div className="debit-modal-field-2">
                  <label
                    htmlFor="total-invoice-amount"
                    className="text-field-3"
                  >
                    Total Invoice Amount:
                  </label>
                  <strong
                    className="text-field-3"
                    style={{ paddingLeft: "10px" }}
                  >
                    {new Intl.NumberFormat("en-IN").format(
                      formData.totalInvoiceAmount
                    )}
                  </strong>
                  {/* <NewInput
                    type={"text"}
                    name={"totalInvoiceAmount"}
                    selectedValue={new Intl.NumberFormat("en-IN").format(
                      formData.totalInvoiceAmount
                    )}
                    width={"180px"}
                    readlyOnly={true}
                  /> */}
                </div>
                {console.log("formdata", formData)}
                {console.log("prifill", prefillData)}
                <div className="tds-modal-field">
                  <label
                    htmlFor="tds-amount"
                    className="text-field-3"
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    TDS Amount:{" "}
                    <strong>{`${new Intl.NumberFormat("en-IN").format(
                      tdspercentage
                    )}%`}</strong>
                    <strong>{`(${new Intl.NumberFormat("en-IN").format(
                      formData.tdsAmount
                    )})`}</strong>
                  </label>
                  <NewDropdownInput
                    type="type1"
                    options={[
                      { value: "Zero", label: "0%" },
                      { value: "TDS COMM.", label: "TDS COMM." },
                      { value: "194-C", label: "194-C" },
                      { value: "94I", label: "94I" },
                      { value: "94J", label: "94J" },
                      { value: "94C1%", label: "94C1%" },
                      { value: "94A", label: "94A" },
                    ]}
                    placeholder="Select TDS"
                    selectedValue={tdsname || ""}
                    setSelectedValue={handleTDSChange}
                    width="180px"
                    nameOfDropdown="tdsAmount"
                  />
                </div>
                <div className="debit-modal-field-2">
                  <label htmlFor="net-payment-amount" className="text-field-3">
                    Net Payment Amount:{" "}
                  </label>
                  <strong
                    className="text-field-3"
                    style={{ paddingLeft: "10px" }}
                  >
                    {new Intl.NumberFormat("en-IN").format(
                      formData.netPaymentAmount
                    )}
                  </strong>
                </div>
              </div>
              <div className="paye-debit-details-1">
                <div className="debit-modal-field-2">
                  <label htmlFor="utr-details" className="text-field-3">
                    UTR No:
                  </label>
                  <NewInput
                    type={"text"}
                    name={"utrDetails"}
                    selectedValue={formData.utrDetails}
                    setSelectedValue={handleInputChangeForField}
                    width={"180px"}
                  />
                </div>
                <div className="debit-modal-field-2">
                  <label htmlFor="typeofjob" className="text-field-3">
                    Type Of Job:
                  </label>
                  <div className="newBorder">
                    <Select
                      className="fixed-width-select"
                      options={jobTypeOptions}
                      value={
                        jobTypeOptions.find(
                          (option) => option.value === jobType
                        ) || { label: jobType, value: jobType }
                      }
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          minHeight: "22px",
                          paddingLeft: "5px",
                          border: "0px",
                          zIndex: "100",
                          borderRadius: "5px",
                          fontSize: "12px",
                          backgroundColor: "transparent !important",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          boxShadow: "none !important",
                          borderColor: "transparent !important",
                          width: "180px",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          padding: "0px 8px",
                        }),
                        input: (provided) => ({
                          ...provided,
                          margin: "0px",
                          fontSize: "12px",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          "-webkit-text-fill-color":
                            theme === "dark" ? "#D1EEFF" : "#535B87",
                          backgroundColor: "transparent !important",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          backgroundColor: "transparent !important",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                          zIndex: 9999,
                          backgroundColor:
                            theme === "dark" ? "#101322" : "#fff",
                          borderRadius: "5px",
                          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused
                            ? theme === "dark"
                              ? "#252A37"
                              : "#f0f0f0"
                            : "transparent !important",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          cursor: "pointer",
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: "22px",
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: "150px", // Adjust as needed for visible options
                          overflowY: "auto",
                          scrollbarWidth: "thin", // Firefox
                          msOverflowStyle: "none", // IE 10+
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor:
                              theme === "dark" ? "#D1EEFF" : "#535B87",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "transparent !important",
                          },
                        }),
                      }}
                      name="typeofjob"
                      onChange={handleJobTypeChange}
                      placeholder="Select Job Type"
                    />
                  </div>
                </div>
                <div className="debit-modal-field-2">
                  <label htmlFor="job-no" className="text-field-3">
                    Job No:
                  </label>
                  <div className="newBorder">
                    <Select
                      className="fixed-width-select"
                      options={jobOptions}
                      name="jobNo"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          minHeight: "22px",
                          paddingLeft: "5px",
                          border: "0px",
                          zIndex: "100",
                          borderRadius: "5px",
                          fontSize: "12px",
                          backgroundColor: "transparent !important",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          boxShadow: "none !important",
                          borderColor: "transparent !important",
                          width: "180px",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          padding: "0px 8px",
                        }),
                        input: (provided) => ({
                          ...provided,
                          margin: "0px",
                          fontSize: "12px",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          "-webkit-text-fill-color":
                            theme === "dark" ? "#D1EEFF" : "#535B87",
                          backgroundColor: "transparent !important",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          backgroundColor: "transparent !important",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          fontSize: "12px",
                          zIndex: 9999,
                          backgroundColor:
                            theme === "dark" ? "#101322" : "#fff",
                          borderRadius: "5px",
                          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused
                            ? theme === "dark"
                              ? "#252A37"
                              : "#f0f0f0"
                            : "transparent !important",
                          color: theme === "dark" ? "#D1EEFF" : "#535B87",
                          cursor: "pointer",
                        }),
                        indicatorsContainer: (provided) => ({
                          ...provided,
                          height: "22px",
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: "180px", // Adjust as needed for visible options
                          overflowY: "auto",
                          scrollbarWidth: "thin", // Firefox
                          msOverflowStyle: "none", // IE 10+
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor:
                              theme === "dark" ? "#D1EEFF" : "#535B87",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "transparent !important",
                          },
                        }),
                      }}
                      value={jobOptions.find(
                        (option) => option.value === formData.jobNo
                      )}
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          // Update job number and automatically set customer name
                          setFormData({
                            ...formData,
                            jobNo: selectedOption,
                            customerName: selectedOption.name || "",
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="paye-debit-details-1">
                <div className="debit-modal-field-2">
                  <label htmlFor="customer-name" className="text-field-3">
                    Customer Name:
                  </label>
                  <NewInput
                    type={"text"}
                    name={"customerName"}
                    selectedValue={
                      formData.jobNo && formData.jobNo.name
                        ? formData.jobNo.name
                        : formData.customerName
                    }
                    setSelectedValue={handleInputChangeForField}
                    width={"180px"}
                  />
                </div>

                <div className="debit-modal-field-2">
                  <label htmlFor="remarks" className="text-field-3">
                    Remarks:
                  </label>
                  <NewInput
                    type={"text"}
                    name={"remarks"}
                    selectedValue={formData.remarks}
                    setSelectedValue={handleInputChangeForField}
                    width={"180px"}
                  />
                </div>
                {formData.referenceno ? (
                  <div className="debit-modal-field-2">
                    <label htmlFor="remarks" className="text-field-3">
                      Reference No:
                    </label>
                    <NewInput
                      type={"text"}
                      name={"referenceno"}
                      selectedValue={formData.referenceno}
                      setSelectedValue={handleInputChangeForField}
                      width={"180px"}
                    />
                  </div>
                ) : (
                  <div className="debit-modal-field-2"></div>
                )}
              </div>
            </div>
            {console.log(
              "customGSTPercentage",
              parseFloat(customGSTPercentage.addGst)
            )}
            {console.log("gstpercentage", gstpercentage)}
            {currentPopup === "Add Custom GST" && (
              <InputPopup
                title={`Add Custom GST`}
                setCurrentPopup={setCurrentPopup}
                fields={[
                  { id: "addGst", label: "Custom GST", inputType: "number" },
                ]}
                value={customGSTPercentage}
                setValue={setCustomGSTPercentage}
                handleAdd={handleAddCustomGST}
                firstButtonText={`Add`}
                secondButtonText={"Close"}
                top={"50%"}
                left={"50%"}
                width={"330px"}
              />
            )}
          </div>
        </CCardBody>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginLeft: "9%",
          marginTop: "20px",
        }}
      >
        {localStorage.getItem("onEdit") === "true"
          ? (checkUsername === "admin" || useEdit) && (
              <div onClick={updateDebit}>
                <NewButton text={"Save"} width={"110px"} />
              </div>
            )
          : (checkUsername === "admin" || useAdd) && (
              <>
                {/* <div onClick={AddDebit}>
                  <NewButton text={"Save"} width={"110px"} />
                </div> */}

                <div
                  onClick={() => {
                    AddDebit("new");
                  }}
                >
                  <NewButton text={"Save & New"} width={"110px"} />
                </div>
                <div
                  onClick={() => {
                    AddDebit("close");
                  }}
                >
                  <NewButton text={"Save & Close"} width={"110px"} />
                </div>
              </>
            )}

        <div
          onClick={() => {
            if (localStorage.getItem("onEdit") === "true") {
              navigate("/PaymentSheetDebit");
            } else {
              window.close();
            }
          }}
        >
          <NewButton text={"Close"} width={"110px"} />
        </div>
      </div>
    </>
  );
};

export default DebitCreate;
