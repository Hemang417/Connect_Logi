import { CCard, CCardBody } from "@coreui/react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import SingleCalender from "src/components/SingleCalender";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewInput from "src/components/NewInput/NewInput";
import API_BASE_URL from "src/config/config";

function TransportationDetails() {
  const [containerDetails, setContainerDetails] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchcontainerdetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/fetchcontainerdetails`,
          {
            params: {
              jobnumber: localStorage.getItem("jobNumber"),
              orgname: localStorage.getItem("orgname"),
              orgcode: localStorage.getItem("orgcode"),
            },
          }
        );
        const data = {
          OwnTransportFrom: response.data.OwnTransportFrom,
          OwnTransportTo: response.data.OwnTransportTo,
          OwnTransportPickupDate: moment(
            response.data.OwnTransportPickupDate
          ).format("YYYY-MM-DD"),
          OwnTransportCurrentDate: moment(
            response.data.OwnTransportCurrentDate
          ).format("YYYY-MM-DD"),
        };
        console.log(data);
        setContainerDetails(data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchcontainerdetails();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContainerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // const jobNumber = localStorage.getItem("jobNumber");
      const orgName = localStorage.getItem("orgname");
      const orgCode = localStorage.getItem("orgcode");

      const payload = {
        jobnumber: jobNumber,
        orgname: orgName,
        orgcode: orgCode,
        containerDetails: [],
        OwnTransportFrom: containerDetails.OwnTransportFrom,
        OwnTransportTo: containerDetails.OwnTransportTo,
        OwnTransportPickupDate: containerDetails.OwnTransportPickupDate,
        OwnTransportCurrentDate: containerDetails.OwnTransportCurrentDate,
      };

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
      {" "}
      <div>
        {/* <CCardBody>
          <div className="px-2">
            <div>
              <label className="new-imp-create-label-width">Current Date</label>
              <input
                type="date"
                name="OwnTransportCurrentDate"
                value={containerDetails.OwnTransportCurrentDate}
                onChange={(e) =>
                  handleInputChange("OwnTransportCurrentDate", e.target.value)
                }
                className="new-impgen-select-field"
              />
            </div>
            <div>
              <label className="new-imp-create-label-width">From</label>
              <input
                type="text"
                placeholder="From location"
                value={containerDetails.OwnTransportFrom}
                name="OwnTransportFrom"
                onChange={(e) =>
                  handleInputChange("OwnTransportFrom", e.target.value)
                }
                className="new-impgen-select-field"
              />
            </div>

            <div>
              <label className="new-imp-create-label-width">To</label>
              <input
                type="text"
                placeholder="To location"
                name="OwnTransportTo"
                value={containerDetails.OwnTransportTo}
                onChange={(e) =>
                  handleInputChange("OwnTransportTo", e.target.value)
                }
                className="new-impgen-select-field"
              />
            </div>

            <div>
              <label className="new-imp-create-label-width">Pickup Date</label>
              <input
                type="date"
                name="OwnTransportPickupDate"
                value={containerDetails.OwnTransportPickupDate}
                onChange={(e) =>
                  handleInputChange("OwnTransportPickupDate", e.target.value)
                }
                className="new-impgen-select-field"
              />
            </div>
          </div>
        </CCardBody> */}

        <CCardBody>
          <div className="px-2 ">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <label
                  className="new-imp-create-label-width"
                  style={{ width: "110px" }}
                >
                  Current Date:
                </label>
                {/* <input
                        type="date"
                        name="OwnTransportCurrentDate"
                        value={containerDetails.OwnTransportCurrentDate}
                        onChange={(e) =>
                          handleInputChange("OwnTransportCurrentDate", e.target.value)
                        }
                        className="new-impgen-select-field"
                      /> */}
                {/* <NewInput
                  className="new-impgen-select-field"
                  width={"280px"}
                  type={"date"}
                  name={"OwnTransportCurrentDate"}
                  selectedValue={containerDetails.OwnTransportCurrentDate}
                  setSelectedValue={handleInputChange}
                /> */}
                <SingleCalender
                  width={"280px"}
                  name={"OwnTransportCurrentDate"}
                  value={containerDetails.OwnTransportCurrentDate}
                  onDateSelect={handleInputChange}
                  leftright={"left"}
                />
              </div>
              <div style={{ display: "flex" }}>
                <label
                  className="new-imp-create-label-width"
                  style={{ width: "110px" }}
                >
                  Pickup Date:
                </label>
                {/* <input
                        type="date"
                        name="OwnTransportPickupDate"
                        value={containerDetails.OwnTransportPickupDate}
                        onChange={(e) =>
                          handleInputChange("OwnTransportPickupDate", e.target.value)
                        }
                        className="new-impgen-select-field"
                      /> */}
                {/* <NewInput
                  width={"280px"}
                  type={"date"}
                  placeholder={"OwnTransport PickupDate"}
                  name={"OwnTransportPickupDate"}
                  selectedValue={containerDetails.OwnTransportPickupDate}
                  setSelectedValue={handleInputChange}
                /> */}
                <SingleCalender
                  width={"280px"}
                  name={"OwnTransportPickupDate"}
                  value={containerDetails.OwnTransportPickupDate}
                  onDateSelect={handleInputChange}
                  leftright={"left"}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
              }}
            >
              <div style={{ display: "flex", marginTop: "10px" }}>
                <label
                  className="new-imp-create-label-width"
                  style={{ width: "110px" }}
                >
                  From:
                </label>
                {/* <input
                        type="text"
                        placeholder="From location"
                        value={containerDetails.OwnTransportFrom}
                        name="OwnTransportFrom"
                        onChange={(e) =>
                          handleInputChange("OwnTransportFrom", e.target.value)
                        }
                        className="new-impgen-select-field"
                      /> */}
                <NewInput
                  width={"280px"}
                  type={"text"}
                  placeholder={"From location"}
                  name={"OwnTransportFrom"}
                  selectedValue={containerDetails.OwnTransportFrom}
                  setSelectedValue={handleInputChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "20px",
                  marginRight: "36px",
                }}
              >
                <label
                  className="new-imp-create-label-width"
                  style={{ width: "110px" }}
                >
                  To:
                </label>
                {/* <input
                        type="text"
                        placeholder="To location"
                        name="OwnTransportTo"
                        value={containerDetails.OwnTransportTo}
                        onChange={(e) =>
                          handleInputChange("OwnTransportTo", e.target.value)
                        }
                        className="new-impgen-select-field"
                      /> */}
                <NewInput
                  width={"280px"}
                  type={"text"}
                  placeholder={"To location"}
                  name={"OwnTransportTo"}
                  selectedValue={containerDetails.OwnTransportTo}
                  setSelectedValue={handleInputChange}
                />
              </div>
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
            navigate("/impcreatejob");
            // toast.success("Updated Successfully")
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

export default TransportationDetails;
