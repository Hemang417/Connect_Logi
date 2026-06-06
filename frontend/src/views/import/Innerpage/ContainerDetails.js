import React, { useEffect, useState } from "react";
import "../css/container-table.css";
import { motion } from "framer-motion";
import "../../../css/styles.css";
import axios from "axios";
import { CCard, CCardBody } from "@coreui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddBtn from "src/views/buttons/buttons/AddBtn";
import NewButton from "src/views/buttons/buttons/NewButton";
import toast from "react-hot-toast";
import NewInput from "src/components/NewInput/NewInput";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import API_BASE_URL from "src/config/config";

function ContainerDetails({ data, Setdata }) {
  // State to hold table rows data
  const [containerData, setContainerData] = useState([]);
  const [noofcontainer, setNoofcontainer] = useState(0);
  const [typesofContainer, setTypesofContainer] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const contactFields = [{ id: "branchName", label: "Branch Name" }];

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

  const navigate = useNavigate();
  // Function to handle input change for a specific row
  const handleInputChange = (index, field, value) => {
    const updatedData = [...containerData];
    updatedData[index][field] = value;
    setContainerData(updatedData);
  };

  useEffect(() => {
    const fetchcontainerdetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/fetchcontainerdetails`,
          {
            params: {
              jobnumber: jobNumber,
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        // console.log(response.data)
        const fetchedNoOfContainer = response.data.noofcontainer;
        setNoofcontainer(fetchedNoOfContainer);

        // Use the fetched containerNoAndWeight data to initialize containerData
        const fetchedContainerData = response.data.containerNoAndWeight || [];

        // If the fetched data is less than noofcontainer, fill the rest with empty objects
        const initialContainerData = Array.from(
          { length: fetchedNoOfContainer },
          (_, index) => {
            return (
              fetchedContainerData[index] || {
                containerNo: "",
                weight: "",
                type: "",
              }
            );
          }
        );

        setContainerData(initialContainerData);
        // Convert typesofContainer string to an array
        if (response.data.typesofContainer) {
          const cleanedContainerTypes = response.data.typesofContainer.trim(); // Trim any leading/trailing whitespace

          const containerTypesArray = cleanedContainerTypes
            .split(",") // Split by commas
            .map((type) => type.trim()); // Trim each type

          setTypesofContainer(containerTypesArray);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchcontainerdetails();
  }, []);
  const handleUpdate = async () => {
    try {
      const orgName = localStorage.getItem("orgname");
      const orgCode = localStorage.getItem("orgcode");

      const payload = {
        jobnumber: jobNumber,
        orgname: orgName,
        orgcode: orgCode,
        containerDetails: containerData,
      };
      console.log("payload", payload);
      const response = await axios.put(
        `${API_BASE_URL}/updatecontainerdetails`,
        payload
      );

      if (response.status === 200) {
        toast.success("Container details updated successfully!");
      } else {
        toast.error("Failed to update container details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating container details:", error);
      toast.error("An error occurred while updating. Please try again.");
    }
  };
  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} // Starts faded & moves up
      animate={{ opacity: 1 }} // Becomes fully visible
      exit={{ opacity: 0 }} // Fades out & moves up
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
    >
      <div className="mb-2 container-div">
        <CCardBody>
          <div>
            <div
              className="container-head"
              style={{ marginBottom: "20px", margin: "0px" }}
            >
              <label className="container-details-label">
                Total No. of Container:
              </label>
              {/* <input type="number" value={noofcontainer} readOnly /> */}
              {/* <NewInput
          type={"number"}
          selectedValue={noofcontainer}
          readlyOnly={true}
          width={"200px"}
        /> */}
              <label
                className="credit-text-field-4"
                style={{ fontWeight: "bold" }}
              >
                {noofcontainer}
              </label>
            </div>
            <div>
              <table className="table-wf">
                <thead>
                  <tr className="head-wf" style={{ height: "22px" }}>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "200px",
                      }}
                    >
                      Container Number
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "200px",
                      }}
                    >
                      Weight
                    </th>
                    <th
                      style={{
                        padding: "5px 7px",
                        fontSize: "12px",
                        width: "200px",
                      }}
                    >
                      Type Of Container{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="container-table-head">
                  {containerData.map((row, index) => (
                    <tr key={index}>
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
                          padding: "4px 0px",
                        }}
                      >
                        <input
                          className="exp-create-tabledata"
                          type="text"
                          placeholder="Container Number"
                          value={row.containerNo}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "containerNo",
                              e.target.value
                            )
                          }
                        />
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
                        <input
                          className="exp-create-tabledata"
                          type="text"
                          placeholder="Enter Weight"
                          value={row.weight}
                          onChange={(e) =>
                            handleInputChange(index, "weight", e.target.value)
                          }
                        />
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

                          // display: "flex",
                          // justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "fit-content",
                            transform: "translateX(34%)",
                          }}
                        >
                          <NewDropdownInput
                            type="type5"
                            options={typesofContainer.map((item) => {
                              return { label: item, value: item };
                            })}
                            nameOfDropdown={"type"}
                            selectedValue={row.type}
                            setSelectedValue={handleInputChange}
                            width={"250px"}
                            index={index}
                          />
                        </div>
                        {/* <select
                          className="exp-create-tabledata-select"
                          name="typesofContainer"
                          value={row.type}
                          onChange={(e) =>
                            handleInputChange(index, "type", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {typesofContainer.map((type, idx) => (
                            <option key={idx} value={type}>
                              {type}
                            </option>
                          ))}
                        </select> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CCardBody>
      </div>
      <div className="all-buttons">
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            // toast.success("Updated Successfully")
          }}
        >
          <NewButton width={"120px"} text={"Save"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            toast.success("Updated Successfully");
            navigate("/impcreatejob");
          }}
        >
          <NewButton width={"120px"} text={"Save & New"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleUpdate();
            handleClose();
            // toast.success("Updated Successfully")
          }}
        >
          <NewButton width={"120px"} text={"Save & Close"} />
        </div>
        <div
          className="search-button"
          onClick={() => {
            handleClose();
          }}
        >
          <NewButton width={"120px"} text={"Close"} />
        </div>
      </div>
    </motion.div>
  );
}

export default ContainerDetails;
