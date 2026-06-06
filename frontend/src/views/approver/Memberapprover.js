import React, { useEffect, useState } from "react";
import {
  CCol,
  CCardBody,
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
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CPopover,
  CCard,
} from "@coreui/react";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteBtn from "../buttons/buttons/DeleteBtn";
import "./css/approvers.css";
import NewInput from "src/components/NewInput/NewInput";
import NewButton from "../buttons/buttons/NewButton";
import InputPopup from "src/components/inputPopup/InputPopup";
import ArrowCircleLeft from "../buttons/buttons/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const Memberapprover = () => {
  const [employeesofbranch, setEmployeesOfBranch] = useState([]);
  const [visible, setVisible] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [allnames, setallnames] = useState([]);
  const [editstate, seteditstate] = useState(false);
  const [selectedCount, setselectedCount] = useState("");
  const navigate = new useNavigate();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [currentPopup, setCurrentPopup] = useState("none");
  const contactFields = [
    {
      id: "selectionapprover",
      label: "Name of Approver",
      placeholder: "Enter Name of Approver",
      inputType: "text",
    },
  ];
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

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  const getallapprovernames = async () => {
    try {
      const allnamesofemployees = await axios.get(
        `${API_BASE_URL}/getallapprovernames`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("approverbranchname"),
            branchcode: localStorage.getItem("approverbranchcode"),
            approverlistname: localStorage.getItem("approverlistname"),
          },
        }
      );
      setallnames(allnamesofemployees.data);
      console.log(allnamesofemployees.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeesOfBranch = async () => {
    try {
      const allemployees = await axios.get(
        `${API_BASE_URL}/getAlltheemployeeswiththatbranchaccess`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("approverbranchname"),
          },
        }
      );
      setEmployeesOfBranch(allemployees.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function getSelectedCount() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getSelectedCount`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("approverbranchname"),
            branchcode: localStorage.getItem("approverbranchcode"),
            approverlistname: localStorage.getItem("approverlistname"),
          },
        }
      );
      setselectedCount(response.data[0].selectedcount);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEmployeesOfBranch();
    getallapprovernames();
    getSelectedCount();
  }, []);

  const handleModalClose = () => {
    setVisible(false);
    setSelectedEmployee("");
    seteditstate(false);
  };

  const addToLocalStorage = (employeeName) => {
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("approverData")) || [];
    // Add new employee name to the existing data
    const updatedData = [
      ...existingData,
      { uniqueValue: localStorage.getItem("uniquevalue"), employeeName },
    ];
    // Save local storage
    localStorage.setItem("approverData", JSON.stringify(updatedData));
  };

  const updateLocalStorage = (employeeName) => {
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("approverData")) || [];
    // Save employee name in the existing data
    const updatedData = existingData.map((item) => {
      if (item.uniqueValue === localStorage.getItem("uniquevalue")) {
        return { ...item, employeeName };
      }
      return item;
    });
    // Save local storage
    localStorage.setItem("approverData", JSON.stringify(updatedData));
  };

  const removeFromLocalStorage = (employeeName) => {
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("approverData")) || [];
    // Remove the employee name from the existing data
    const updatedData = existingData.filter(
      (item) => item.employeeName !== employeeName
    );
    // Save local storage
    localStorage.setItem("approverData", JSON.stringify(updatedData));
  };

  const handleUpdate = () => {
    try {
      axios
        .put(`${API_BASE_URL}/updateapprovername`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          branchname: localStorage.getItem("approverbranchname"),
          branchcode: localStorage.getItem("approverbranchcode"),
          approverlistname: localStorage.getItem("approverlistname"),
          employeename: selectedEmployee,
          id: localStorage.getItem("approverid"),
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Approver updated successfully");
            handleModalClose();
            getallapprovernames();
            updateLocalStorage(selectedEmployee);
          } else {
            toast.error("Failed to update approver");
          }
        });
    } catch (error) {
      console.error("Error updating approver:", error);
      toast.error("Failed to update approver");
    }
  };

  const handleAddApprover = async () => {
    try {
      // Send a request to the backend to add the selected employee as an approver
      const response = await axios.post(`${API_BASE_URL}/addApprover`, {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        branchname: localStorage.getItem("approverbranchname"),
        approverlistname: localStorage.getItem("approverlistname"),
        branchcode: localStorage.getItem("approverbranchcode"),
        employeeName: selectedEmployee,
        uniquevalue: localStorage.getItem("uniquevalue"),
        id: localStorage.getItem("approverid"),
      });

      if (response.status === 200) {
        toast.success("Approver added successfully");
        handleModalClose();
        getallapprovernames();
      } else {
        toast.error("Failed to add approver");
      }
    } catch (error) {
      console.error("Error adding approver:", error);
      toast.error("Failed to add approver");
    }
  };

  async function handleDelete(item) {
    try {
      console.log(selectedEmployee);
      const deletedRow = await axios.delete(
        `${API_BASE_URL}/deleteapprovernameForApprovalSection`,
        {
          data: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            branchname: localStorage.getItem("approverbranchname"),
            branchcode: localStorage.getItem("approverbranchcode"),
            employeename: item.employeename,
            approverlistname: localStorage.getItem("approverlistname"),
          },
        }
      );
      console.log(deletedRow);
      toast.success(`Approver deleted successfully`);
      await getallapprovernames();
    } catch (error) {
      console.log(error);
      toast.error(`Error in approver deletion`);
    }
  }

  const handleEdit = (item) => {
    setSelectedEmployee(item.employeename);
    // setVisible(true);
    setCurrentPopup("Add Approvers List");
    seteditstate(true);
  };

  async function storeSelectedCount() {
    const response = await axios.put(
      `${API_BASE_URL}/updateSelectedCount`,
      {
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        branchname: localStorage.getItem("approverbranchname"),
        branchcode: localStorage.getItem("approverbranchcode"),
        approverlistname: localStorage.getItem("approverlistname"),
        selectedCount: selectedCount,
      }
    );
  }

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (allnames.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < allnames.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     }
  //     //   else if (e.key === "Enter") {
  //     //     if (selectedRowIndex !== null) {
  //     //       const selectedWorkflow = WorkFlowsData[selectedRowIndex];
  //     // handleRowDoubleClick(selectedWorkflow);
  //     //     }

  //     //   }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, allnames]);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => navigate("/approvername")}
        style={{ position: "absolute" }}
      >
        <ArrowCircleLeft />
      </div>
      <div
        className="page-title"
        style={{ width: "99%", marginBottom: "20px" }}
      >
        <h4>Approvers Details</h4>
      </div>
      <div>
        <div>
          <div>
            <CCardBody className="memberapprover">
              {/* <div className='memberapprover-no'> */}
              <h6 className="memberapprover-totalapprover">
                Total Approver:{" "}
                <span className="memberapprover-totalapprover-data">
                  {allnames.length}
                </span>
              </h6>

              <h6 className="memberapprover-totalapprover">
                Choose How Many Approvers:{" "}
                {/* <input
                  type="number"
                  max={allnames.length}
                  value={selectedCount}
                  name="selectedCount"
                  onChange={(e) => setselectedCount(e.target.value)}
                /> */}
                <NewInput
                  type={"number"}
                  selectedValue={selectedCount}
                  setSelectedValue={setselectedCount}
                  max={allnames.length}
                  width={"160px"}
                />
              </h6>
              <div onClick={storeSelectedCount}>
                <NewButton text={"Submit"} />
              </div>

              {/* </div> */}
            </CCardBody>
          </div>

          <div>
            <CCardBody>
              <div>
                <table className=" table-wf">
                  <thead className="head-wf">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Operations</th>
                    </tr>
                  </thead>

                  <tbody className="body-wf">
                    {allnames &&
                      allnames.map((item, index) => {
                        const isSelected = setSelectedRowIndex === index;
                        return (
                          <tr
                            key={index}
                            onClick={() => {
                              setSelectedRowIndex(index);
                            }}
                            onDoubleClick={() => handleEdit(item)}
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
                            <td className="td-wf">{item.employeename}</td>
                            <td className="td-wf">
                              {/* DELETE BUTTON */}
                              <button
                                style={{
                                  paddingBottom: "4px",
                                }}
                                className="invisible-btn-style"
                                onClick={() => handleDelete(item)}
                              >
                                <DeleteBtn
                                  fill={
                                    theme === "dark" ? "#f8d7da" : "#1E266D"
                                  }
                                  onClick={() => handleDelete(item)}
                                />
                              </button>
                              {/* DELETE BUTTON ENDS*/}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CCardBody>
          </div>
          <div className="button-div mt-2" style={{ width: "40px" }}>
            {/* ADD BUTTON */}
            <svg
              className="memberapprover-addbutton"
              type="submit"
              onClick={() => setCurrentPopup("Add Approvers List")}
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
                fill={theme === "dark" ? "#FFFFFF" : "#1C274C"}
              />
            </svg>
            {/* ADD BUTTON ENDS */}
          </div>
        </div>
        {currentPopup === "Add Approvers List" && (
          <InputPopup
            title="Add Approvers List"
            setCurrentPopup={setCurrentPopup}
            fields={contactFields}
            value={selectedEmployee}
            setValue={setSelectedEmployee}
            width={"330px"}
            handleAdd={editstate ? handleUpdate : handleAddApprover}
            firstButtonText={editstate ? "Save" : "Add"}
            secondButtonText={"Close"}
            selection={"selectionapprover"}
            dropdownType={"type1"}
            dropdownPlaceholder={"Select Approver"}
            dropdownValue={selectedEmployee || ""}
            dropdownOptions={employeesofbranch.map((items) => ({
              value: items.username,
              label: items.username,
            }))}
            dropdownSetValue={setSelectedEmployee}
            top={"89%"}
            left={"50%"}
          />
        )}
        {/* <CModal
          visible={visible}
          onClose={handleModalClose}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">
              Add Approvers List
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <label>
              <h6>Name of Approver</h6>
            </label>
            <CDropdown className="addapproverlist-memberapprover">
              <CDropdownToggle className="dropdown-btn" color="secondary">
                {selectedEmployee ? selectedEmployee : "Select"}
              </CDropdownToggle>
              <CDropdownMenu className="text-field-4 addapproverlist-memberapprover">
                {employeesofbranch &&
                  employeesofbranch.map((item, index) => (
                    <CDropdownItem
                      className="addapproverlist-memberapprover-1"
                      key={index}
                      onClick={() => setSelectedEmployee(item.username)}
                    >
                      {item.username}
                    </CDropdownItem>
                  ))}
              </CDropdownMenu>
            </CDropdown>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={handleModalClose}>
              Close
            </CButton>
            {editstate ? (
              <CButton color="primary" onClick={handleUpdate}>
                Save
              </CButton>
            ) : (
              <CButton color="primary" onClick={handleAddApprover}>
                Add
              </CButton>
            )}
          </CModalFooter>
        </CModal> */}
      </div>
    </div>
  );
};

export default Memberapprover;
