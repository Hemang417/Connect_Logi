import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CPopover,
} from "@coreui/react";
import Cookies from "js-cookie";
import axios from "axios";
import "./css/user-role.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AddBtn from "../buttons/buttons/AddBtn";
import InputPopup from "src/components/inputPopup/InputPopup";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import styles from "../user_report/css/userreport.module.css";
import API_BASE_URL from "src/config/config";

const UserRoles = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [storedRoles, setStoredRoles] = useState([]);
  const [editRoleId, setEditRoleId] = useState(false);
  const [idofitem, setidofitem] = useState(null); // State to store the ID of the role being edited
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
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

  const handleModalClose = () => {
    setVisible(false);
    setUserRole("");
    setEditRoleId(false);
    setidofitem(null);
    // Clear editRoleId when closing the modal
  };

  const contactFields = [{ id: "role", label: "Role", inputType: "text" }];

  const handleAddUserRole = async () => {
    // Perform validation if needed
    if (userRole.length === 0) {
      toast.error("Please enter a user role.");
      return;
    }

    if (editRoleId) {
      // Save operation
      try {
        await axios.put(`${API_BASE_URL}/updateuserrole/${editRoleId}`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          userrole: userRole,
        });
        toast.success(`User role "${userRole}" updated successfully.`);
        handleModalClose();
        GetallRoles();
      } catch (error) {
        console.log(error);
        toast.error("Failed to update user role.");
      }
    } else {
      // Add operation
      try {
        await axios.post(`${API_BASE_URL}/storeuserrole`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          userrole: userRole,
        });
        toast.success(`User role "${userRole}" added successfully.`);
        handleModalClose();
        GetallRoles();
      } catch (error) {
        console.log(error);
        toast.error("Failed to add user role.");
      }
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

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteduserrole`, {
        data: {
          orgname: item.orgname,
          orgcode: item.orgcode,
          userrole: item.rolename,
        },
      });
      toast.success(`User role "${item.rolename}" deleted successfully.`);
      GetallRoles();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user role.");
    }
  };

  const handleEdit = (item) => {
    setUserRole(item.rolename); // Populate the input field with the role being edited
    setEditRoleId(true); // Set the ID of the role being edited
    // setVisible(true);
    setCurrentPopup("adduserrole");
    setidofitem(item.id);
  };

  useEffect(() => {
    GetallRoles();
  }, []);

  async function handleUpdate() {
    // Perform validation if needed
    if (userRole.trim() === "") {
      toast.error("Please enter a user role.");
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/updateuserrole`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        userrole: userRole,
        id: idofitem,
      });
      if (response.status === 200) {
        toast.success(`User role "${userRole}" updated successfully.`);
        handleModalClose();
        GetallRoles();
        setidofitem(null);
        setUserRole("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user role.");
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, []);

  const handleRowDoubleClick = (item) => {
    handleEdit(item); // Edit mode
  };
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (storedRoles.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < storedRoles.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     } else if (e.key === "Enter") {
  //       if (selectedRowIndex !== null) {
  //         handleEdit(storedRoles[selectedRowIndex]);
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, storedRoles]);

  return (
    <CRow>
      <div>
        <CCardBody>
          <div>
            <div className={styles.firstRow}>
              <button
                className="invisible-btn-style"
                style={{ position: "absolute", right: "100px", top: "2px" }}
                onClick={
                  // handleClick
                  () => {
                    setEditRoleId(false);
                    setCurrentPopup("adduserrole");
                    localStorage.setItem("onCreate", true);
                    localStorage.setItem("uniquevalue", "JobsButton");
                  }
                }
              >
                <AddBtn SvgWidth={"35px"} SVGheight={"35px"} />
              </button>

              {/* <div
                      onClick={() => {
                        navigate("/impdetails");
                      }}
                      className={styles.backButton}
                    >
                      <ArrowCircleLeft />
                    </div> */}
              <div className={styles.importBox}>
                <div className={styles.Title}>User Role</div>
              </div>
            </div>

            <table
              className="min-w-full border-separate"
              style={{
                width: "100%",
                borderCollapse: "separate", // ✅ Ensure separate borders
                borderSpacing: "0 8px", // ✅ Adds spacing between rows
                marginTop: "20px",
              }}
            >
              <thead className={styles.tableHead}>
                <tr>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    User Role
                  </th>
                  <th
                    className="px-4 py-2 text-left"
                    style={{ fontWeight: "500", textAlign: "center" }}
                  >
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody>
                {storedRoles &&
                  storedRoles.map((item, rowIndex) => {
                    const isSelected = selectedRowIndex === rowIndex;

                    return (
                      <tr
                        key={rowIndex}
                        onClick={() => setSelectedRowIndex(rowIndex)}
                        onDoubleClick={() => handleRowDoubleClick(item)}
                        className={` rounded-lg shadow-md`}
                        style={{
                          backgroundColor:
                            theme === "dark"
                              ? rowIndex % 2 === 0
                                ? "#3B5472" // Dark mode even row
                                : "#263A52" // Dark mode odd row
                              : rowIndex % 2 === 0
                              ? "#D8F0FD" // Light mode even row
                              : "#F6FCFF", // Light mode odd row
                          transition: "background-color 0.3s ease",
                          padding: "0px 8px",
                        }}
                      >
                        <td
                          className={`${styles.tableData}`}
                          style={{ textAlign: "center", padding: "5px 0px" }}
                        >
                          {item.rolename}
                        </td>
                        <td
                          className={`${styles.tableData}`}
                          style={{ textAlign: "center", padding: "5px 0px" }}
                        >
                          {/* <CPopover content="Edit the role" trigger={['hover', 'focus']}> */}
                          {/* <CButton className='mx-2' onClick={() => handleEdit(item)}>Edit</CButton> */}
                          {/* <svg
                      className="editbutton-lob"
                      onClick={() => handleEdit(item)}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25px"
                      height="25px"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                    </svg> */}
                          {/* </CPopover> */}
                          {/* <CPopover content="Delete the role" trigger={['hover', 'focus']}> */}
                          {/* <CButton className='mx-2' onClick={() => handleDelete(item)}>Delete</CButton> */}
                          <span
                            onClick={() => {
                              // handleDelete(item)
                              confirm(
                                "Are you sure you want to delete this role?"
                              )
                                ? handleDelete(item)
                                : "";
                              setCurrentPopup("deleteuserrole");
                            }}
                          >
                            <DeleteBtn
                              fill={
                                theme === "dark"
                                  ? "#f8d7da"
                                  : "var(--page-title)"
                              }
                            />
                          </span>
                          {/* </CPopover> */}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CCardBody>
      </div>
      {console.log("editRoleId", editRoleId)}
      {currentPopup === "adduserrole" && (
        <InputPopup
          title={`${editRoleId ? "Edit" : "Add"} User Role`}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={userRole}
          setValue={setUserRole}
          handleAdd={handleAddUserRole}
          handleSave={handleUpdate}
          firstButtonText={editRoleId ? "Save" : "Add"}
          secondButtonText={"Close"}
          selection={"none"}
          left={"60%"}
          top={"50%"}
          width={"330px"}
        />
      )}

      <CModal
        visible={visible}
        onClose={handleModalClose}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            {editRoleId ? "Edit" : "Add"} User Role
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <label htmlFor="Userrole">Role</label>
          <input
            className="user-role-modal"
            type="text"
            placeholder="Enter user role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          />
        </CModalBody>
        <CModalFooter>
          <button className="button-23 mx-2" onClick={handleModalClose}>
            Close
          </button>

          {editRoleId ? (
            <button className="button-23" onClick={handleUpdate}>
              Save
            </button>
          ) : (
            <button className="button-23" onClick={handleAddUserRole}>
              Add
            </button>
          )}
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default UserRoles;
