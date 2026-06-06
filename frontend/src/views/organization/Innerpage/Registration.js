import React, { useContext, useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CButton } from "@coreui/react";
import "../../../css/styles.css";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import NewInput from "src/components/NewInput/NewInput";
import NewButton from "src/views/buttons/buttons/NewButton";
import API_BASE_URL from "src/config/config";
const Registration = () => {
  const {
    aliasName,
    registrationData,
    setRegistrationData,
    generalData,
    accountData,
    contacts,
    isBranchAdded,
    setIsBranchAdded,
    orgganizationTypeOptions,
    checkedBoxOptions,
    setIsShown,
  } = useContext(AppContext);
  // const [validationMessage, setValidationMessage] = useState('');

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const navigate = useNavigate();
  function redirectToOrg() {
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    // localStorage.removeItem("branchDataforprefill");
    setIsShown("");
    toast.success("New Client Created Successfully");
    navigate("/organization#/organization");
    setTimeout(() => {
      window.top.close();
    }, 500);
  }
  function redirectToNew() {
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    // localStorage.removeItem("branchDataforprefill");
    setIsShown("general");
    toast.success("New Client Created Successfully");
    setTimeout(() => {
      navigate("/Createorg");
    }, 1500);
  }

  const validateForm = () => {
    const errors = [];

    if (!generalData.branchname) errors.push("Branch Name is required");
    if (!generalData.clientname) errors.push("Client Name is required");
    if (!generalData.address) errors.push("Address is required");
    if (!generalData.country) errors.push("Country is required");
    if (!generalData.state) errors.push("State is required");
    if (!generalData.city) errors.push("City is required");
    if (!generalData.postalcode) errors.push("Postal Code is required");
    if (!generalData.phone) errors.push("Phone is required");
    if (!generalData.email) errors.push("Email is required");
    if (!registrationData.PAN) errors.push("PAN is required");
    if (!registrationData.GST) errors.push("GST is required");
    if (!registrationData.IEC) errors.push("IEC is required");
    if (!accountData.creditdays) errors.push("Credit Days is required");
    if (!checkedBoxOptions || checkedBoxOptions.length === 0)
      errors.push("Checked Box Options are required");
    if (!orgganizationTypeOptions || orgganizationTypeOptions.length === 0)
      errors.push("Organization Type Options are required");
    if (!contacts || contacts.length === 0)
      errors.push("At least one Contact Detail is required");
    if (!accountData.followup2) errors.push("Follow-up 2 is required");
    if (!accountData.followup3) errors.push("Follow-up 3 is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (generalData.email && !emailRegex.test(generalData.email)) {
      errors.push("Email format is invalid (e.g., example@gmail.com)");
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (registrationData.PAN && !panRegex.test(registrationData.PAN)) {
      errors.push("PAN format is invalid (e.g., ABCDE1234F)");
    }

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
    if (registrationData.GST && !gstRegex.test(registrationData.GST)) {
      errors.push("GST format is invalid (e.g., 22AAAAA0000A1Z5)");
    }

    if (registrationData.GST) {
      const stateCode = parseInt(registrationData.GST.slice(0, 2));
      if (stateCode < 1 || stateCode > 35) {
        errors.push("Invalid GST state code.");
      }
    }

    const iecRegex = /^[A-Z0-9]{10}$/;
    if (registrationData.IEC && !iecRegex.test(registrationData.IEC)) {
      errors.push(
        "IEC format is invalid (should be a 10-character alphanumeric code)"
      );
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (generalData.phone && !phoneRegex.test(generalData.phone)) {
      errors.push("Phone number must be 10 digits");
    }

    const postalCodeRegex = /^[0-9]{6}$/;
    if (
      generalData.postalcode &&
      !postalCodeRegex.test(generalData.postalcode)
    ) {
      errors.push("Postal Code must be 6 digits");
    }

    if (contacts && Array.isArray(contacts)) {
      contacts.forEach((contact, index) => {
        const label = `Contact ${index + 1}`;
        if (!contact.contactName) {
          errors.push(`${label}: Name is required`);
        }
        if (!contact.mobile || !/^[0-9]{10}$/.test(contact.mobile)) {
          errors.push(`${label}: Mobile must be a 10-digit number`);
        }
        if (!contact.email || !emailRegex.test(contact.email)) {
          errors.push(`${label}: Email is invalid`);
        }
      });
    }

    return errors;
  };

  async function updateData() {
    try {
      const errors = validateForm();
      if (errors.length > 0) {
        errors.forEach((err) => toast.error(err));
        return; // Don't proceed
      }

      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const username = localStorage.getItem("username");
      const branchnameofemp = localStorage.getItem("branchnameofemp");
      const branchcodeofemp = localStorage.getItem("branchcodeofemp");
      const alias = aliasName;

      // Prepare the data to update
      const dataToUpdate = {
        alias: alias,
        branchname: generalData.branchname,
        id: generalData.id,
        clientname: generalData.clientname,
        address: generalData.address,
        country: generalData.country,
        state: generalData.state,
        city: generalData.city,
        postalcode: generalData.postalcode,
        phone: generalData.phone,
        email: generalData.email,
        PAN: registrationData.PAN,
        GST: registrationData.GST,
        IEC: registrationData.IEC,
        creditdays: accountData.creditdays,
        showClientCode: generalData.showClientCode,
        checkedBoxOptions: checkedBoxOptions,
        orgganizationTypeOptions: orgganizationTypeOptions,
        contactDetails: contacts,
        orgname: nameoforg,
        orgcode: codeoforg,
        followup2: accountData.followup2,
        followup3: accountData.followup3,
        branchnameofemp: branchnameofemp,
        branchcodeofemp: branchcodeofemp,
        username: username,
        section: "Registration",
      };

      // Save API call
      const response = await axios.put(
        `${API_BASE_URL}/updateData`,
        dataToUpdate
      );

      toast.success("Updated data successfully");

      // Fetch approvers (optional)
      const approversResponse = await axios.get(
        `${API_BASE_URL}/getApprovernamesfororg`,
        {
          params: {
            orgname: nameoforg,
            orgcode: codeoforg,
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );

      console.log("Approvers:", approversResponse.data);

      // Redirect after successful update
      //   navigate("/organization#/organization");
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        toast.error(`Save failed: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error updating data:", error);
    }
  }

  return (
    <div>
      <CCol xs={12}>
        <motion.div
          initial={{ opacity: 0 }} // Starts faded & moves up
          animate={{ opacity: 1 }} // Becomes fully visible
          exit={{ opacity: 0 }} // Fades out & moves up
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
        >
          <div style={{ height: "430px" }}>
            <CCard className="global-card">
              <div className="mt-0 container-div">
                <CCardBody style={{ margin: "20px 0px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <label className="labelOrganization">PAN Details: </label>
                    <NewInput
                      width={"30%"}
                      setSelectedValue={handleChange}
                      type={"text"}
                      placeholder={"PAN"}
                      selectedValue={registrationData.PAN || ""}
                      name="PAN"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <label className="labelOrganization">GST Details: </label>
                    <NewInput
                      width={"30%"}
                      setSelectedValue={handleChange}
                      type={"text"}
                      placeholder={"GST"}
                      selectedValue={registrationData.GST || ""}
                      name="GST"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <label className="labelOrganization">IEC Code: </label>
                    <NewInput
                      width={"30%"}
                      setSelectedValue={handleChange}
                      type={"text"}
                      placeholder={"IEC"}
                      selectedValue={registrationData.IEC || ""}
                      name="IEC"
                    />
                  </div>

                  {/* {validationMessage && <p className="error-message">{validationMessage}</p>} */}

                  {/* <div className="mb-2 search-button update-button"></div> */}
                </CCardBody>
              </div>
            </CCard>
          </div>
        </motion.div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <div onClick={updateData}>
            <NewButton width={"120px"} text={"Save"} />
          </div>

          {/* <div
            onClick={async () => {
              await updateData();
              redirectToNew();
            }}
          >
            <NewButton width={"120px"} text={"Save & New"} />
          </div>

          <div
            onClick={() => {
              updateData();
              redirectToOrg();
            }}
          >
            <NewButton width={"120px"} text={"Save & Close"} />
          </div> */}
          {/* <button
              type="submit"
              className="button-23 mx-2"
              onClick={() =>redirectToOrg()}
            >
              close
            </button> */}
          <div onClick={() => window.close()}>
            <NewButton width={"120px"} text={"Close"} />
          </div>
        </div>
      </CCol>
    </div>
  );
};

export default Registration;
