import React, { useEffect, useState } from "react";
import moment from "moment";
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
  CCard,
  CFormInput,
} from "@coreui/react";
import axios from "axios";
import toast from "react-hot-toast";
import "../css/workflow-styles.css";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import NewInput from "src/components/NewInput/NewInput";
import Pagination from "src/layout/Pagination";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import InputPopup from "src/components/inputPopup/InputPopup";
import API_BASE_URL from "src/config/config";
// import { all } from "core-js/fn/promise";
const MileStone = () => {
  const [visible, setVisible] = useState(false);
  const [alllineofbusinesses, setalllineofbusinesses] = useState([]);
  const [allbranches, setallbranches] = useState([]);
  const [remark, setRemark] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedMilestoneIndex, setselectedMilestoneIndex] = useState("");
  const [milestonedata, setmilestonedata] = useState({
    milestonename: "",
    lob: "",
    ownbranchname: "",
  });
  const [currentPopup, setCurrentPopup] = useState("none");
  const [milestoneName, setMilestoneName] = useState("");
  const contactFields = [
    {
      id: "remark",
      label: "Reason",
      placeholder: "Entering Remark is Required",
      inputType: "text",
    },
  ];
  const contactFields2 = [
    { id: "milestonename", label: "Milestone Name", inputType: "text" },
    { id: "ownbranchname", label: "Branches", inputType: "select" },
    { id: "lob", label: "Line of Business", inputType: "select" },
  ];

  const [milestone, setMiletone] = useState("");
  const [lob, setLob] = useState("");
  const [branchName, setBranchName] = useState("");
  const [allmilestones, setallmilestones] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [allmilestonesOptions, setallmilestonesOptions] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
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
    setisModalOpen(false);
    setRemark("");
  };

  const getAllBranches = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchBranchesofOwn`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
          },
        }
      );
      setallbranches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLineofBusinesses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getlob`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setalllineofbusinesses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMilestones = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getmilestones`, {
        params: {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
        },
      });
      setallmilestones(response.data);
      setallmilestonesOptions(response.data);
      // console.log('allmilestones',allmilestonesOpions     )
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getAllLineofBusinesses();
    getAllBranches();
    getMilestones();
  }, []);

  const handleSubmit = async () => {
    try {
      let response;
      if (selectedMilestone) {
        // Save existing milestone
        response = await axios.put(`${API_BASE_URL}/updatemilestone`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          milestonename: milestonedata.milestonename,
          lob: milestonedata.lob,
          ownbranchname: milestonedata.ownbranchname,
          id: selectedMilestone.id,
        });

        if (response.status === 200) {
          // Save state with edited milestone data
          const updatedMilestones = allmilestones.map((milestone) => {
            if (milestone.id === selectedMilestone.id) {
              return {
                ...milestone,
                milestonename: milestonedata.milestonename,
                lobname: milestonedata.lob,
                ownbranchname: milestonedata.ownbranchname,
              };
            }
            return milestone;
          });
          setallmilestones(updatedMilestones);
          toast.success("Milestone updated successfully");
          // Close modal
          // setVisible(false);

          // Clear form data and selected milestone
          setmilestonedata({ milestonename: "", lob: "", ownbranchname: "" });
          setSelectedMilestone(null);
        }
      } else {
        // Add new milestone
        const currentDate = moment().format("YYYY-MM-DD");
        response = await axios.post(`${API_BASE_URL}/addmilestone`, {
          orgname: localStorage.getItem("orgname"),
          orgcode: localStorage.getItem("orgcode"),
          milestonename: milestonedata.milestonename,
          lob: milestonedata.lob,
          ownbranchname: milestonedata.ownbranchname,
          currentDate: currentDate,
          username: localStorage.getItem("username"),
        });

        if (response.status === 200) {
          // Fetch updated milestones
          getMilestones();

          // Close modal
          // setVisible(false);
          toast.success("Milestone added successfully");

          // Clear form data and selected milestone
          setmilestonedata({ milestonename: "", lob: "", ownbranchname: "" });
          setSelectedMilestone(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const data = allmilestones[selectedMilestoneIndex];
      const currentDate = moment().format("YYYY-MM-DD");
      const response = await axios.post(
        `${API_BASE_URL}/deletemilestone`,
        {
          id: data.id,
          deletedby: localStorage.getItem("username"),
          deletedat: currentDate,
          DeleteRemark: remark,
        }
      );
      if (response.status === 200) {
        toast.success("Milestone deleted successfully");
        getMilestones();
        setisModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting milestone");
      setisModalOpen(false);
    }
    setRemark("");
  };

  const handleEdit = (index) => {
    const milestone = allmilestones[index];
    setSelectedMilestone(milestone);
    setmilestonedata({
      milestonename: milestone.milestonename,
      lob: milestone.lobname,
      ownbranchname: milestone.ownbranchname,
    });

    setVisible(true); // Open modal
  };

  const handleOpenModal = (isEdit = false, index = null) => {
    if (isEdit && index !== null) {
      const milestone = currentItems[index];
      setSelectedMilestone(milestone);
      setmilestonedata({
        milestonename: milestone.milestonename,
        lob: milestone.lobname,
        ownbranchname: milestone.ownbranchname,
      });
    } else {
      setSelectedMilestone(null);
      setmilestonedata({
        milestonename: "",
        lob: "",
        ownbranchname: "",
      });
    }
    // setVisible(true);
    setCurrentPopup("add milestone");
    console.log("Add Button Clicked");
  };

  const handleRowDoubleClick = (index) => {
    handleOpenModal(true, index); // Edit mode
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (allmilestones.length === 0) return;

  //     if (e.key === "ArrowUp") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     } else if (e.key === "ArrowDown") {
  //       setSelectedRowIndex((prevIndex) =>
  //         prevIndex < allmilestones.length - 1 ? prevIndex + 1 : prevIndex
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
  // }, [selectedRowIndex, allmilestones]);

  const uniqueMilestones = allmilestonesOptions.filter(
    (milestones, index, self) =>
      index ===
      self.findIndex((e) => e.milestonename === milestones.milestonename)
  );

  const milestoneOptions = [
    { label: "All Milestones", value: "" }, // Add first option
    ...uniqueMilestones.map((milestone) => ({
      value: milestone.milestonename,
      label: milestone.milestonename,
    })),
  ];

  const uniqueLob = allmilestonesOptions.filter(
    (lob, index, self) =>
      index === self.findIndex((e) => e.lobname === lob.lobname)
  );

  const lobOptions = [
    { label: "All Lob", value: "" }, // Add first option
    ...uniqueLob.map((lob) => ({
      value: lob.lobname,
      label: lob.lobname,
    })),
  ];

  const uniqueBranch = allmilestonesOptions.filter(
    (branch, index, self) =>
      index === self.findIndex((e) => e.ownbranchname === branch.ownbranchname)
  );

  const branchOptions = [
    { label: "All Branches", value: "" }, // Add first option
    ...uniqueBranch.map((branch) => ({
      value: branch.ownbranchname,
      label: branch.ownbranchname,
    })),
  ];

  // useEffect(() => {
  //   const filtered = allmilestones.filter((ml) => {
  //     return (
  //       (!milestone || ml.milestonename === milestone) &&
  //       (!lob || ml.lobname === lob) &&
  //       (!branchName || ml.ownbranchname === branchName)
  //     );
  //   });

  //   setFilteredData(filtered);
  //   // setCurrentPage(1);
  // }, [allmilestones, milestone, lob, branchName]);
  // Instead, filter first, then paginate

  const filteredData = allmilestones.filter((ml) => {
    return (
      (!milestone || ml.milestonename === milestone) &&
      (!lob || ml.lobname === lob) &&
      (!branchName || ml.ownbranchname === branchName)
    );
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [milestone, lob, branchName]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const addBtn = "Milestone";

  const refreshData = async () => {
    try {
      getMilestones();
      toast.success("Data Refreshed");
      setMiletone("");
      setLob("");
      setBranchName("");
    } catch (error) {
      console.log("fail to refresh ", error);
      toast.error("Fail to refresh");
    }
  };

  return (
    <div style={{ marginTop: "25px", position: "relative", height: "454px" }}>
      <div>
        <CCardBody>
          <div>
            <div style={{ position: "absolute", top: "-59px", left: "48px" }}>
              <div
                onClick={refreshData}
                className="link-btn"
                style={{ marginLeft: "12px" }}
              >
                <RefreshBtn />
              </div>
            </div>
            <div
              className="invisible-btn-style"
              style={{ position: "relative", top: " -60px", left: " 84% " }}
              // onClick={() => setVisible(true)}
              onClick={() => handleOpenModal(false)}
            >
              <AddBtn addBtn={addBtn} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <label
                  htmlFor="Locations"
                  className="wf-label"
                  style={{ width: "fit-content", marginRight: "20px" }}
                >
                  Milestone :
                </label>

                <NewDropdownInput
                  type="type1"
                  options={milestoneOptions}
                  placeholder={"All Milestones"}
                  selectedValue={milestone || ""}
                  setSelectedValue={setMiletone}
                  width={"220px"}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <label
                  for="Active"
                  className="wf-label"
                  style={{ width: "fit-content", marginRight: "20px" }}
                >
                  Lob :
                </label>

                <NewDropdownInput
                  type="type1"
                  options={lobOptions}
                  placeholder={"All Lob"}
                  selectedValue={lob || ""}
                  setSelectedValue={setLob}
                  width={"220px"}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                }}
              >
                <label
                  for="Active"
                  className="wf-label"
                  style={{ width: "fit-content", marginRight: "20px" }}
                >
                  Branch :
                </label>

                <NewDropdownInput
                  type="type1"
                  options={branchOptions}
                  placeholder={"All Branches"}
                  selectedValue={branchName || ""}
                  setSelectedValue={setBranchName}
                  width={"220px"}
                />
              </div>
            </div>

            <div className="wf-line"></div>

            <table className="table-wf">
              <thead>
                <tr className="head-wf" style={{ height: "22px" }}>
                  <th
                    style={{
                      padding: "5px 7px",
                      fontSize: "12px",
                      width: "155px",
                    }}
                  >
                    MileStone
                  </th>
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
                    BranchName
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
              {/* {console.log("all milestone ->", allmilestones)}
              {console.log("all milestoneOptions ->", branchOptions)}
              {console.log("all allmilestonesOptions ->", allmilestonesOptions)} */}

              <tbody className="body-wf">
                {currentItems &&
                  currentItems.map((milestone, index) => {
                    const isSelected = selectedRowIndex === index;

                    return (
                      <tr
                        className={`selected-row ${
                          isSelected ? "primary-selected" : ""
                        }`}
                        onDoubleClick={() => handleRowDoubleClick(index)}
                        onClick={() => setSelectedRowIndex(index)}
                        key={index}
                      >
                        {console.log("index ->", index)}
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
                          {milestone.milestonename}
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
                          {milestone.lobname}
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
                          {milestone.ownbranchname}
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
                          {/* EDIT BUTTON */}
                          {/* <svg
                            className="editbutton-milestone-workflow"
                            onClick={() => handleEdit(index)}
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="25px"
                            height="25px"
                            viewBox="0 0 50 50"
                          >
                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                          </svg> */}
                          {/* EDIT BUTTON ENDS*/}
                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => {
                              // setisModalOpen(true);
                              setCurrentPopup("Deletion");
                              setMilestoneName(milestone.milestonename);
                              setselectedMilestoneIndex(
                                indexOfFirstItem + index
                              );
                            }}
                            className="delete-hover-color invisible-btn-style"
                          >
                            <DeleteBtn
                              fill={theme === "dark" ? "#f8d7da" : "#1e2652"}
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

      <CModal
        size="lg"
        visible={visible}
        onClose={() => {
          setVisible(false);
          setmilestonedata({ milestonename: "", lob: "", ownbranchname: "" }); // Empty form data
          setSelectedMilestone(null); // Clear selected milestone
        }}
        aria-labelledby="LiveDemoExampleLabel"
        className="workflow-modal custom-modal "
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            {selectedMilestone ? "Edit MileStone" : "Add MileStone"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <div className="select-milestone-mode-div mt-2">
              <label htmlFor="MilestoneName" className="lob-label">
                Milestone Name
              </label>
              <input
                type="text"
                placeholder=""
                className="milestone-label-name"
                value={milestonedata.milestonename}
                onChange={(e) =>
                  setmilestonedata({
                    ...milestonedata,
                    milestonename: e.target.value,
                  })
                }
              />
            </div>

            <div className="select-milestone-mode-div mt-2">
              <label htmlFor="Branches" className="lob-label">
                Branches
              </label>
              <select
                className="form-select-lob"
                value={milestonedata.ownbranchname || ""}
                onChange={(e) =>
                  setmilestonedata({
                    ...milestonedata,
                    ownbranchname: e.target.value,
                  })
                }
              >
                <option value="">Select</option>
                <option value="ALL">All</option>
                {allbranches &&
                  allbranches.map((item, index) => (
                    <option key={index} value={item.ownbranchname}>
                      {item.ownbranchname}
                    </option>
                  ))}
              </select>

              {/* <CDropdown className="milestone-dropDown-field ">
                <CDropdownToggle className="dropdown-btn" color="secondary">
                  {milestonedata.ownbranchname
                    ? milestonedata.ownbranchname
                    : "Select"}
                </CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  <CDropdownItem
                    onClick={() =>
                      setmilestonedata({
                        ...milestonedata,
                        ownbranchname: "ALL",
                      })
                    }
                  >
                    All
                  </CDropdownItem>
                  {allbranches &&
                    allbranches.map((item, index) => (
                      <CDropdownItem
                        key={index}
                        onClick={() =>
                          setmilestonedata({
                            ...milestonedata,
                            ownbranchname: item.ownbranchname,
                          })
                        }
                      >
                        {item.ownbranchname}
                      </CDropdownItem>
                    ))}
                </CDropdownMenu>
              </CDropdown> */}
            </div>

            <div className="select-milestone-mode-div mt-2">
              <label htmlFor="LineOfBusiness" className="lob-label">
                Line of Business
              </label>

              <select
                className="form-select-lob"
                value={milestonedata.lob || ""}
                onChange={(e) =>
                  setmilestonedata({
                    ...milestonedata,
                    lob: e.target.value,
                  })
                }
              >
                <option value="">Select</option>
                {alllineofbusinesses &&
                  alllineofbusinesses.map((item, index) => (
                    <option key={index} value={item.lobname}>
                      {item.lobname}
                    </option>
                  ))}
              </select>

              {/* <CDropdown className="milestone-dropDown-field">
                <CDropdownToggle className="dropdown-btn" color="secondary">
                  {milestonedata.lob ? milestonedata.lob : "Select"}
                </CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  {alllineofbusinesses &&
                    alllineofbusinesses.map((item, index) => (
                      <CDropdownItem
                        key={index}
                        onClick={() =>
                          setmilestonedata({
                            ...milestonedata,
                            lob: item.lobname,
                          })
                        }
                      >
                        {item.lobname}
                      </CDropdownItem>
                    ))}
                </CDropdownMenu>
              </CDropdown> */}
            </div>
          </div>
        </CModalBody>

        <CModalFooter>
          <button
            className="button-23 mx-2"
            onClick={() => {
              setVisible(false);
              setmilestonedata({
                milestonename: "",
                lob: "",
                ownbranchname: "",
              }); // Empty form data
              setSelectedMilestone(null); // Clear selected milestone
            }}
          >
            Close
          </button>
          {selectedMilestone ? (
            <button className="button-23" onClick={handleSubmit}>
              Save MileStone
            </button>
          ) : (
            <button className="button-23" onClick={handleSubmit}>
              Create MileStone
            </button>
          )}
        </CModalFooter>
      </CModal>
      {currentPopup === "Deletion" && (
        <InputPopup
          title={milestoneName}
          setCurrentPopup={setCurrentPopup}
          fields={contactFields}
          value={remark}
          setValue={setRemark}
          handleAdd={handleDelete}
          firstButtonText={"Delete"}
          secondButtonText={"Close"}
          width={"450px"}
          selection={"none"}
          top={"40%"}
          left={"50%"}
        />
      )}
      {console.log("milestonedata", milestonedata)}
      {currentPopup === "add milestone" && (
        <InputPopup
          title="Add Milestone"
          setCurrentPopup={setCurrentPopup}
          fields={contactFields2}
          value={milestonedata}
          setValue={setmilestonedata}
          handleAdd={handleSubmit}
          firstButtonText={selectedMilestone ? "Save" : "Add"}
          secondButtonText={"Close"}
          selection={"ownbranchname"}
          selection2={"lob"}
          showPrefix={true}
          milestoneSetvalue={true}
          dropdownType={"type1"}
          // dropdownPlaceholder={"Select Role"}
          dropdownValue={milestonedata.ownbranchname || ""}
          dropdownOptions={allbranches.map((data) => ({
            label: data.ownbranchname,
            value: data.ownbranchname,
          }))}
          dropdownSetValue={setmilestonedata}
          dropdownValue2={milestonedata.lob || ""}
          dropdownOptions2={alllineofbusinesses.map((data) => ({
            label: data.lobname,
            value: data.lobname,
          }))}
          dropdownSetValue2={setmilestonedata}
          top={"45%"}
          left={"50%"}
          width={"330px"}
        />
      )}
      <CModal
        visible={isModalOpen}
        onClose={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <CModalHeader>
          <CModalTitle>Delete Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete the Milestone</p>
          <CFormInput
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter reason for deletion "
            rows="2"
          />
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            // onClick={(e) => handleDelete(e, allimpjobs.length - 1 - index)}
            onClick={handleDelete}
            disabled={remark === ""}
          >
            Yes, Delete
          </CButton>
          <CButton color="secondary" onClick={handleModalClose}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: "2",
        }}
      >
        <Pagination
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default MileStone;
