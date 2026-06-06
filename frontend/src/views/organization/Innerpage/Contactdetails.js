import React, { useContext, useEffect } from "react";
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
  CPopover,
} from "@coreui/react";
import InputPopup from "src/components/inputPopup/InputPopup";
import { CChart } from "@coreui/react-chartjs";
import "../../../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "./AppContext";
import { motion } from "framer-motion";
import EditBtn from "src/views/buttons/buttons/EditBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import NewButton from "src/views/buttons/buttons/NewButton";
import API_BASE_URL from "src/config/config";

// import createjob from './CreateJob';
const Contactdetails = () => {
  // const [date, setDate] = useState(new Date());
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  const navigate = useNavigate();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [editIndex, setEditIndex] = useState(null); // To track which contact is being edited
  const [isEditing, setIsEditing] = useState(false);
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    // Ensure theme updates when switching
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const {
    aliasName,
    contacts,
    setContacts,
    generalData,
    registrationData,
    accountData,
    isBranchAdded,
    setIsBranchAdde,
    orgganizationTypeOptions,
    checkedBoxOptions,
    setIsShown,
    allBranches,
    setAllBranches,
  } = useContext(AppContext);
  const [newContact, setNewContact] = useState({
    contactName: "",
    designation: "",
    department: "",
    mobile: "",
    email: "",
  });
  function redirectToOrg() {
    localStorage.removeItem("organizationbranches");
    localStorage.removeItem("firstorgofclient");
    localStorage.removeItem("alias");
    localStorage.removeItem("organizationclientname");
    localStorage.removeItem("isEditing");
    // localStorage.removeItem("branchDataforprefill");
    setIsShown("");
    toast.success("New Client Created Successfully");
    setTimeout(() => {
      window.top.close();
    }, 500);
  }

  const contactFields = [
    { id: "contactName", label: "Contact Name", inputType: "text" },
    { id: "designation", label: "Designation", inputType: "text" },
    { id: "department", label: "Department", inputType: "text" },
    { id: "mobile", label: "Mobile No", inputType: "number" },
    { id: "email", label: "Email ID", inputType: "email" },
  ];

  // useEffect(() => {
  //   // Add keydown event listener
  //   const handleKeyDown = (e) => {
  //     if (contacts.length === 0) return; // Ensure there are contacts to navigate

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : contacts.length - 1
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < contacts.length - 1 ? prevIndex + 1 : 0
  //       );
  //     } else if (e.key === "Enter") {
  //       // Trigger double-click action
  //       const contact = contacts[selectedRowIndex];
  //       if (contact) handleEdit(selectedRowIndex);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   // Cleanup listener on unmount
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, contacts]);

  const handleAddContact = () => {
    if (editIndex !== null) {
      // Save existing contact
      const updatedContacts = contacts.map((contact, index) =>
        index === editIndex ? newContact : contact
      );
      setContacts(updatedContacts);
      setEditIndex(null); // Reset edit index
    } else {
      // Add new contact
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
    setNewContact({
      contactName: "",
      designation: "",
      department: "",
      mobile: "",
      email: "",
    });
    setVisible(false);
  };

  const handleEdit = (index) => {
    setNewContact(contacts[index]);
    setEditIndex(index); // Set the index of the contact being edited
    // setVisible(true); // Open the modal
    setCurrentPopup("Add New Contact");
  };
  // const openAddNewContactModal = () => {
  //   setNewContact({
  //     contactName: "",
  //     designation: "",
  //     department: "",
  //     mobile: "",
  //     email: "",
  //   }); // Clear the form
  //   setEditIndex(null); // Ensure it's not in edit mode
  //   setVisible(true); // Open the modal
  // };

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

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    };

  const validateAccountsForm = () => {
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

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
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
      const validationErrors = validateAccountsForm();
      if (validationErrors.length > 0) {
        validationErrors.forEach((err) => toast.error(err));
        return; // stop here if invalid
      }

      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const alias = aliasName;
      const username = localStorage.getItem("username");
      const branchnameofemp = localStorage.getItem("branchnameofemp");
      const branchcodeofemp = localStorage.getItem("branchcodeofemp");
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
        orgganizationTypeOptions: checkedBoxOptions,
        contactDetails: contacts,
        orgname: nameoforg,
        orgcode: codeoforg,
        followup2: accountData.followup2,
        followup3: accountData.followup3,
        branchnameofemp: branchnameofemp,
        branchcodeofemp: branchcodeofemp,
        username: username,
        section: "Contact Details",
      };

      // Save API call
      const response = await axios.put(
        `${API_BASE_URL}/updateData`,
        dataToUpdate
      );

      toast.success("Updated data successfully");

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

  async function storenewbranch(e) {
    // console.log("jkjfs",generalData , registrationData, accountData, contacts);
    try {
      e.preventDefault();
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const employeename = localStorage.getItem("username");
      const alias = localStorage.getItem("alias");
      const response = await axios.post(`${API_BASE_URL}/orgStore`, {
        branchName: localStorage.getItem("branchnames"),
        clientname: localStorage.getItem("organizationclientname"),
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
        username: employeename,
        createdon: new Date().toISOString(),
        // allBranches:generalData.allBranches,
      });
      toast.success("Branch added successfully");

      let insertedRowsBID = response.data;

      const inserttheID = await axios.put(
        `${API_BASE_URL}/updateTheBID`,
        {
          BID: insertedRowsBID,
          clientname: localStorage.getItem("organizationclientname"),
          orgcode: codeoforg,
          branchname: localStorage.getItem("branchnames"),
        }
      );
      setTimeout(() => {
        window.top.close();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{ position: "relative" }}>
      <div style={{ height: "430px" }}>
        <div className="left-div-table">
          <div className="mt-0 container-div" style={{ margin: "0px " }}>
            <motion.div
              initial={{ opacity: 0 }} // Starts faded & moves up
              animate={{ opacity: 1 }} // Becomes fully visible
              exit={{ opacity: 0 }} // Fades out & moves up
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
              style={{ width: "100%" }}
            >
              <CCardBody style={{ margin: "20px 0px" }}>
                <table className="table-wf">
                  <thead>
                    <tr className="head-wf" style={{ height: "22px" }}>
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "70px",
                        }}
                      >
                        Contact Name
                      </th>
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "70px",
                        }}
                      >
                        Designation
                      </th>
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "70px",
                        }}
                      >
                        Department
                      </th>
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "70px",
                        }}
                      >
                        Mobile
                      </th>
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "70px",
                        }}
                      >
                        Email ID
                      </th>
                      {/* <th   style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "70px",
                      }}></th> */}
                      <th
                        style={{
                          padding: "5px 7px",
                          fontSize: "12px",
                          width: "70px",
                        }}
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts && contacts.length > 0 ? (
                      contacts.map((contact, index) => (
                        <tr
                          className={` selected-row-org ${
                            selectedRowIndex === index
                              ? "primary-selected-row-org"
                              : ""
                          }`}
                          onClick={() => setSelectedRowIndex(index)}
                          onDoubleClick={() => {
                            setIsEditing(true);
                            handleEdit(index);
                          }}
                          key={index}
                        >
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
                            {contact.contactName}
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
                            {contact.designation}
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
                            {contact.department}
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
                            {contact.mobile}
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
                            {contact.email}
                          </td>

                          {/* <th
                        scope="row"
                        className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link onClick={() => handleEdit(index)}>
                        <EditBtn/>
                        </Link>
                      </th> */}
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
                            <button
                              className="delete-text-color"
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              onClick={() => handleDelete(index)}
                            >
                              <DeleteBtn
                                fill={
                                  theme === "dark"
                                    ? "#f8d7da"
                                    : "var(--page-title)"
                                }
                              />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? "#263A52" // Dark mode odd row
                                : "#F6FCFF", // Light mode odd row

                            transition: "background-color 0.3s ease",
                          }}
                        >
                          No contacts found for this branch and for this client
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <div className="search-button">
                    <svg
                      onClick={() => {
                        setIsEditing(false);
                        setCurrentPopup("Add New Contact");
                      }}
                      type="submit"
                      width="40px"
                      height="40px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
                        fill={theme === "dark" ? "#fff" : "#2F4096"}
                      />
                    </svg>
                  </div>
                </table>
              </CCardBody>
            </motion.div>
          </div>
        </div>
      </div>
      {currentPopup === "Add New Contact" && (
        <InputPopup
          title={`${isEditing ? "Edit" : "Add New"} Contact`}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={newContact}
          setValue={setNewContact}
          handleAdd={handleAddContact}
          firstButtonText={isEditing ? "Save" : "Add New"}
          secondButtonText={"Close"}
          selection={"none"}
          top={"74%"}
          left={"50%"}
          width={"330px"}
        />
      )}

      <CModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Add New Contact</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <div>
              <label style={{ width: "140px" }}>Contact Name : </label>
              <input
                type="text"
                name="contactName"
                className="text-field-1"
                value={newContact.contactName}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    contactName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label style={{ width: "140px" }}>Designation : </label>
              <input
                type="text"
                name="designation"
                className="text-field-1"
                value={newContact.designation}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    designation: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={{ width: "140px" }}>Department : </label>
              <input
                type="text"
                name="department"
                className="text-field-1"
                value={newContact.department}
                onChange={(e) =>
                  setNewContact({ ...newContact, department: e.target.value })
                }
              />
            </div>

            <div>
              <label style={{ width: "140px" }}>Mobile Number : </label>
              <input
                type="text"
                name="mobile"
                className="text-field-1"
                value={newContact.mobile}
                onChange={(e) =>
                  setNewContact({ ...newContact, mobile: e.target.value })
                }
              />
            </div>
            <div>
              <label style={{ width: "140px" }}>Email ID : </label>
              <input
                type="text"
                name="email"
                className="text-field-1"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <button
            className="button-23 mx-2"
            color="secondary"
            onClick={() => setVisible(false)}
          >
            Close
          </button>
          {
            // If the modal is opened for editing, show the update button
            // Otherwise, show the add new button
            setVisible ? (
              <button
                className="button-23"
                color="primary"
                onClick={handleAddContact}
              >
                Save
              </button>
            ) : (
              <button
                className="button-23"
                color="primary"
                onClick={handleAddContact}
              >
                Add New
              </button>
            )
          }
        </CModalFooter>
      </CModal>

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
    </div>
  );
};

export default Contactdetails;
