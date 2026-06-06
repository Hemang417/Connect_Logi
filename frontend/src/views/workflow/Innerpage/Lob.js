import React, { useState, useEffect } from "react";
import Pagination from "src/layout/Pagination";
import {
  CCardBody,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CDropdown,
  CPopover,
  CFormInput,
  CCard,
} from "@coreui/react";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import "../css/workflow-styles.css";
import { Link } from "react-router-dom";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";
// import { transform } from "html2canvas/dist/types/css/property-descriptors/transform";
const Lob = () => {
  const [lobdata, setLobdata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [remark, setRemark] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const [index, setIndex] = useState("");
  const [lobName, setlobName] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedLob, setSelectedLob] = useState(null);
  const [currentPopup, setCurrentPopup] = useState("none");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const contactFields2 = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  const [isEditing, setIsEditing] = useState(false);
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
  const [lob, setLob] = useState({
    lobname: "",
    transportmode: "", // Added transportmode field
  });

  const contactFields = [
    { id: "lobname", label: "Name of Lob", inputType: "text" },
    { id: "transportmode", label: "Transport Mode", inputType: "select" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = lobdata.slice(indexOfFirstItem, indexOfLastItem);
  // currentItems = currentItems.reverse();
  const totalPages = Math.ceil(lobdata.length / itemsPerPage);

  const fetchLOBdata = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getlob`, {
        params: {
          orgcode: localStorage.getItem("orgcode"),
          orgname: localStorage.getItem("orgname"),
        },
      });

      setLobdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLOBdata();
  }, []);

  const handleEdit = (index) => {
    const selectedLineOfBusiness = lobdata[index];
    setSelectedLob(selectedLineOfBusiness);
    // Set lob state including lobname and transportmode
    setLob({
      lobname: selectedLineOfBusiness.lobname,
      transportmode: selectedLineOfBusiness.transportmode,
    });
    setVisible(true);
  };

  const handleDelete = async () => {
    try {
      const lobIdToDelete = lobdata[index].id;
      const currentDate = moment().format("YYYY-MM-DD");

      const deletedRow = await axios.post(`${API_BASE_URL}/deletelob`, {
        id: lobIdToDelete,
        deletedby: localStorage.getItem("username"),
        deletedat: currentDate,
        DeleteRemark: remark,
      });

      if (deletedRow.status === 200) {
        fetchLOBdata();
        toast.success(`Line of business deleted successfully`);
        handleModalClose(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting Line of Business");
      handleModalClose(false);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log(" after submit button is clicked selectedLob:", selectedLob);

      const updatedData = await axios.put(`${API_BASE_URL}/updatelob`, {
        id: selectedLob.id,
        lobname: selectedLob.lobname,
        transportmode: selectedLob.transportmode, // Include transportmode in update
      });
      if (updatedData.status === 200) {
        fetchLOBdata();
        setLob({
          lobname: "",
          transportmode: "",
        });
        setVisible(false);
        toast.success("Line of business updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating Line of Business");
    }
  };

  const handleChange = (e) => {
    setLob({ ...lob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const currentDate = moment().format("YYYY-MM-DD");
      const response = await axios.post(`${API_BASE_URL}/storelob`, {
        lobname: lob.lobname,
        transportmode: lob.transportmode, // Include transportmode in submission
        orgname: localStorage.getItem("orgname"),
        orgcode: localStorage.getItem("orgcode"),
        currentDate: currentDate,
        username: localStorage.getItem("username"),
      });
      toast.success("Line of business added successfully");
      setVisible(false);
      fetchLOBdata();

      setLob({
        lobname: "",
        transportmode: "", // Clear transportmode field after submission
      });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  // const handleRowDoubleClick = (index) => {
  //   handleEdit(index);
  // };
  const handleModalClose = () => {
    setisModalOpen(false);
    setRemark("");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened inside the table
      if (!event.target.closest(".selected-row")) {
        setSelectedRowIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOpenModal = (isEdit, index) => {
    if (isEdit && index !== null) {
      const selectedLineOfBusiness = lobdata[index];
      setSelectedLob(selectedLineOfBusiness);
      setLob({
        lobname: selectedLineOfBusiness.lobname,
        transportmode: selectedLineOfBusiness.transportmode,
      });
    } else {
      setSelectedLob(null);
      setLob({
        lobname: "",
        transportmode: "",
      });
    }
    // setVisible(true);
    setCurrentPopup("addlob");
  };

  const handleRowDoubleClick = (index) => {
    handleOpenModal(true, index); // Edit mode
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (lobdata.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < lobdata.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     } else if (e.key === "Enter") {
  //       if (selectedRowIndex !== null) {
  //         handleOpenModal(true, selectedRowIndex); /// Call handleAccess with the selected row index
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectedRowIndex, lobdata]);

  const refreshData = async () => {
    try {
      fetchLOBdata();
      toast.success("Data Refreshed");
    } catch (error) {
      console.log("fail to refresh ", error);
      toast.error("Fail to refresh");
    }
  };

  return (
    <div style={{ marginTop: "25px", position: "relative" }}>
      <div>
        <div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "-61px", left: "48px" }}>
              <div
                onClick={refreshData}
                className="link-btn"
                style={{ marginLeft: "12px" }}
              >
                <RefreshBtn />
              </div>
            </div>
            <button
              className="invisible-btn-style"
              style={{ position: "relative", top: " -62px", left: " 84% " }}
              onClick={
                () => {
                  setSelectedLob(null);
                  setLob({
                    lobname: "",
                    transportmode: "",
                  });
                  setCurrentPopup("addlob");
                }
                // handleOpenModal(false)
              }
            >
              <AddBtn addBtn={"Lob"} />
            </button>
            {console.log("selected lob", selectedLob)}
            <div style={{ height: "400px" }}>
              <table className="table-wf">
                <thead>
                  <tr className="head-wf" style={{ height: "22px" }}>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Line of Business
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "120px",
                      }}
                    >
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((row, index) => {
                      return (
                        <tr
                          key={index}
                          // onClick={() => setSelectedRowIndex(row.id)}
                          onDoubleClick={() => {
                            const actualIndex = indexOfFirstItem + index;
                            handleRowDoubleClick(actualIndex);
                          }}
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
                            {`${row.lobname} (${row.transportmode})`}
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
                            <button
                              onClick={() => {
                                setCurrentPopup("Deletion");
                                setlobName(row.lobname);
                                // Calculate the actual index in the full array
                                const actualIndex = indexOfFirstItem + index;
                                setIndex(actualIndex);
                              }}
                              className="delete-hover-color invisible-btn-style"
                            >
                              <DeleteBtn
                                fill={theme === "dark" ? "#f8d7da" : "#1e2652"}
                              />
                            </button>{" "}
                            {/* DELETE BUTTON ENDS*/}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3">No Line of Business data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {console.log("selected lob -> ", selectedLob)}
      {currentPopup === "addlob" && (
        <InputPopup
          title="Add Line of Business"
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={selectedLob ? selectedLob : lob}
          setValue={selectedLob ? setSelectedLob : setLob}
          handleAdd={selectedLob ? handleUpdate : handleSubmit}
          showPrefix={true}
          width={"330px"}
          firstButtonText={selectedLob ? "Update" : "Add"}
          secondButtonText={"Close"}
          selection={"transportmode"}
          dropdownType={"type1"}
          dropdownPlaceholder={"Select Role"}
          dropdownValue={
            selectedLob ? selectedLob.transportmode : lob.transportmode
          }
          dropdownOptions={[
            { value: "Both", label: "Both" },
            { value: "Air", label: "Air" },
            { value: "Sea", label: "Sea" },
          ]}
          dropdownSetValue={selectedLob ? setSelectedLob : setLob}
          left={"50%"}
          top={"50%"}
        />
      )}
      <CModal
        size="lg"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            {selectedLob ? "Edit Line of Business" : "Add Line of Business"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <div className="select-transport-mode-div mt-3">
              <label className="lob-label">
                <h6>Name LOB : </h6>
              </label>
              <input
                className="lob-name"
                type="text"
                name="lobname"
                value={selectedLob ? selectedLob.lobname : lob.lobname}
                onChange={(e) => {
                  if (selectedLob) {
                    setSelectedLob({
                      ...selectedLob,
                      lobname: e.target.value,
                    });
                  } else {
                    setLob({ ...lob, lobname: e.target.value });
                  }
                }}
                // style={{ width: "75%", marginLeft: "2%" }}
              />
            </div>
            <div className="select-transport-mode-div mt-3">
              <label className="lob-label">
                <h6>Transport Mode : </h6>
              </label>

              <select
                className="form-select-lob"
                value={
                  selectedLob ? selectedLob.transportmode : lob.transportmode
                }
                onChange={(e) => {
                  if (selectedLob) {
                    setSelectedLob({
                      ...selectedLob,
                      transportmode: e.target.value,
                    });
                  } else {
                    setLob({ ...lob, transportmode: e.target.value });
                  }
                }}
              >
                <option value="">Select Mode</option>
                <option value="Air">Air</option>
                <option value="Sea">Sea</option>
              </select>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <button
            className="button-23"
            onClick={() => {
              setVisible(false);
              setSelectedLob(null);
              setLob({
                lobname: "",
                transportmode: "",
              });
            }}
          >
            Close
          </button>
          <button
            className="button-23 mx-2"
            onClick={selectedLob ? handleUpdate : handleSubmit}
          >
            {selectedLob ? "Save changes" : "Create"}
          </button>
        </CModalFooter>
      </CModal>
      {currentPopup === "Deletion" && (
        <InputPopup
          title={lobName}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields2}
          value={remark}
          setValue={setRemark}
          handleAdd={handleDelete}
          firstButtonText={"Delete"}
          secondButtonText={"Close"}
          width={"450px"}
          selection={"none"}
          top={"60%"}
          left={"50%"}
        />
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Lob;
