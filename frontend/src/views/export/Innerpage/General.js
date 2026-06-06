import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Select from "react-select";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import "../../../css/styles.css";
import { CChart } from "@coreui/react-chartjs";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import NewButton from "src/views/buttons/buttons/NewButton";
import NewInput from "src/components/NewInput/NewInput";
import NewDropDown from "src/views/buttons/buttons/NewDropDown";
import NewDropdownInput from "src/components/DropDown/NewDropdownInput";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const General = ({ data, setData }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobNumber = queryParams.get("jobnumber");
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
    console.log("Data received in General component:", data);
  }, [data]);

  const [formData, setFormData] = useState({
    exporterName: "",
    selectedBranch: "",
    id: 0,
    branches: [],
    address: "",
    gst: "",
    iec: "",
    portShipment: "",
    finalDestination: "",
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        exporterName: data.exportername || "",
        selectedBranch: data.exporterbranchname || "",
        id: data.id || 0,
        branches: data.branches || [],
        address: data.address || "",
        gst: data.gst || "", // Fixed case sensitivity
        iec: data.iec || "", // Fixed case sensitivity
        portShipment: data.portofshipment || "",
        finalDestination: data.finaldestination || "",
      }));
    }
    console.log(
      "expname ->",
      data.exportername,
      "selectedbranch -> ",
      data.exporterbranchname
    );
    sessionStorage.setItem("exporterName", data.exportername);
    sessionStorage.setItem("selectedbranch", data.exporterbranchname);
    getAlias();
  }, [data]);

  const getAlias = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/exportgetAliasAndId`,
        {
          params: {
            exporterName: sessionStorage.getItem("exporterName"),
            branch: sessionStorage.getItem("selectedbranch"),
          },
        }
      );
      console.log("alias in import -> ", response);
      sessionStorage.setItem("alias", response.data.alias);
      sessionStorage.setItem("id", JSON.stringify(response.data.id));
    } catch (e) {
      console.log(e);
    }
  };

  const setPortOfShipment = (e) => {
    setFormData({
      ...formData,
      portShipment: e.target.value,
    });
  };

  const setfinalDestination = (e) => {
    setFormData({
      ...formData,
      finalDestination: e.target.value,
    });
  };
  useEffect(() => {
    if (formData.exporterName) {
      fetchBranches();
    }
  }, [formData.exporterName]);

  // console.log("gst:", data.gst);

  const [exporters, setExporters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const codeoforg = localStorage.getItem("orgcode");
        const response = await axios.get(`${API_BASE_URL}/getorgs`, {
          params: {
            orgcode: codeoforg,
          },
        });
        setExporters(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllClients();
  }, []);

  const handleInputChange = (newValue) => {
    setFormData({
      ...formData,
      exporterName: newValue,
      address: "",
      iec: "",
      gst: "",
    });
  };

  useEffect(() => {
    // Create a Set to store unique client names
    const uniqueClientNames = new Set(
      exporters.map((exporter) => exporter.clientname)
    );
    // Convert Set back to array and map to options format required by Select component
    const options = Array.from(uniqueClientNames).map((clientname) => ({
      value: clientname,
      label: clientname,
    }));
    setFiltered(options);
  }, [exporters]);

  const handleBranchSelect = async (branchName, id) => {
    setFormData({
      ...formData,
      selectedBranch: branchName,
      id: id,
    });

    await fetchOrganizationDetails(branchName, id);
  };
  localStorage.setItem("Selectedbranchorg", formData.selectedBranch);

  async function prefillData() {
    try {
      const jobnumber = jobNumber;
      const orgcode = localStorage.getItem("orgcode");
      const orgname = localStorage.getItem("orgname");
      const prefilledgeneral = await axios.get(
        `${API_BASE_URL}/prefillGeneralJobExp`,
        {
          params: {
            jobnumber: jobnumber,
            orgcode: orgcode,
            orgname: orgname,
          },
        }
      );

      // localStorage.setItem('jobData', JSON.stringify(prefilledgeneral.data));
      const {
        exportername,
        GST,
        IEC,
        address,
        portofshipment,
        finaldestination,
        exporterbranchname,
      } = prefilledgeneral.data;
      setFormData({
        exporterName: exportername,
        gst: GST,
        iec: IEC,
        address: address,
        portShipment: portofshipment,
        finalDestination: finaldestination,
        selectedBranch: exporterbranchname,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("onEdit") === "true") {
      prefillData();
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const username = localStorage.getItem("username");
      const nameoforg = localStorage.getItem("orgname");
      const codeoforg = localStorage.getItem("orgcode");
      const response = await axios.put(
        `${API_BASE_URL}/updateGeneralExp`,
        {
          ...data,
          formData: formData,
          orgname: nameoforg,
          orgcode: codeoforg,
          jobowner: username,
          jobnumber: jobNumber,
        }
      );
      const getApprovers = await axios.get(
        `${API_BASE_URL}/getApprovernamesfororg`,
        {
          params: {
            orgname: localStorage.getItem("orgname"),
            orgcode: localStorage.getItem("orgcode"),
            unique: localStorage.getItem("uniquevalue"),
          },
        }
      );
      // toast.success("Successfully updated General Details");
    } catch (error) {
      toast.error("Error updating General Details.");
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const codeoforg = localStorage.getItem("orgcode");
      const nameoforg = localStorage.getItem("orgname");
      const response = await axios.get(
        `${API_BASE_URL}/getbranchesofexpgen`,
        {
          params: {
            exporterName:
              formData.exporterName ||
              localStorage.getItem("exporternameofjob"),
            orgcode: codeoforg,
            orgname: nameoforg,
          },
        }
      );
      localStorage.setItem(
        "allbranchesofclient",
        JSON.stringify(response.data)
      );
      setFormData({
        ...formData,
        branches: response.data,
      });
    } catch (error) {
      console.error("Error fetching branches:", error);
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
  }, []);

  const fetchOrganizationDetails = async (branchName, id) => {
    try {
      const codeoforg = localStorage.getItem("orgcode");
      const response = await axios.get(
        `${API_BASE_URL}/getorganizationdetails`,
        {
          params: {
            clientName: formData.exporterName,
            branchName: branchName,
            orgcode: codeoforg,
            orgname: localStorage.getItem("orgname"),
            id: id,
          },
        }
      );
      if (response.data && response.data.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          selectedBranch: branchName,
          address: response.data[0].address || "",
          gst: response.data[0].GST || "",
          iec: response.data[0].IEC || "",
          id: id,
        }));
      }
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      window.top.close();
    }, 500);
  };
  return (
    console.log("formdata", formData),
    (
      <motion.div
        initial={{ opacity: 0 }} // Starts faded & moves up
        animate={{ opacity: 1 }} // Becomes fully visible
        exit={{ opacity: 0 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        <CCol xs={12}>
          <div className="mx-2 my-2 container-div">
            <CCardBody>
              <div className="main-div">
                <div className="left-div">
                  <div className="label-input-container">
                    <section className="labelImport">Exporter Name : </section>
                    <NewDropdownInput
                      type={"type1"}
                      placeholder={"Exporter Name"}
                      options={filtered}
                      selectedValue={formData.exporterName}
                      setSelectedValue={handleInputChange}
                      width={"300px"}
                    />
                  </div>
                  <div className="label-input-container">
                    <label className="labelImport">Select Branch:</label>
                    <NewDropdownInput
                      placeholder="Branch Names"
                      options={
                        formData.branches?.map((branch) => ({
                          label: branch.branchname,
                          value: branch,
                        })) || []
                      }
                      selectedValue={formData.branches?.find(
                        (b) => b.branchname === formData.selectedBranch
                      )}
                      setSelectedValue={(selectedOption) => {
                        handleBranchSelect(
                          selectedOption.value.branchname,
                          selectedOption.value.id
                        );
                      }}
                      width="300px"
                      type="type8" // Using type8 since it passes the entire selected option
                      isDisabled={
                        !formData.branches || formData.branches.length === 0
                      }
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          height: "28px",
                          minHeight: "28px",
                          borderColor: theme === "dark" ? "#D1EEFF" : "#535B87",
                          borderRadius: "8px",
                          backgroundColor: "transparent",
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          padding: "4px",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />
                  </div>

                  <div className="label-input-container">
                    <label className="labelImport">Address : </label>
                    <NewInput
                      width={"300px"}
                      textarea={true}
                      selectedValue={formData.address}
                      readlyOnly={true}
                    />
                  </div>

                  <div className="label-input-container">
                    <label className="labelImport">GST : </label>
                    <NewInput
                      width={"300px"}
                      selectedValue={formData.gst}
                      readlyOnly={true}
                    />
                  </div>
                  <div className="label-input-container">
                    <label className="labelImport">IEC Code : </label>
                    <NewInput
                      width={"300px"}
                      selectedValue={formData.iec}
                      readlyOnly={true}
                    />
                  </div>
                  <div className="label-input-container">
                    <label className="labelImport">Port of Shipment : </label>
                    <NewInput
                      width={"300px"}
                      selectedValue={formData.portShipment}
                      type={"text"}
                      name={"portShipment"}
                      setSelectedValue={setPortOfShipment}
                    />
                  </div>

                  <div className="label-input-container">
                    <label className="labelImport">Final Destination : </label>
                    <div>
                      <NewInput
                        width={"300px"}
                        selectedValue={formData.finalDestination}
                        type={"text"}
                        name={"finalDestination"}
                        setSelectedValue={setfinalDestination}
                      />
                    </div>
                  </div>
                </div>
                <div className="right-div">
                  <CChart
                    type="doughnut"
                    data={{
                      labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                      datasets: [
                        {
                          backgroundColor: [
                            "#41B883",
                            "#E46651",
                            "#00D8FF",
                            "#DD1B16",
                          ],
                          data: [40, 20, 80, 10],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          labels: {
                            // color: getStyle('--cui-body-color'),
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </CCardBody>
          </div>
        </CCol>
        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <input type="text" placeholder="Name" className="text-field-1" />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary">Add New</CButton>
          </CModalFooter>
        </CModal>
        <div className="all-buttons">
          <div
            className="search-button"
            onClick={() => {
              handleUpdate();
              toast.success("Updated Successfully");
            }}
          >
            <NewButton width={"120px"} text={"Save"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              handleUpdate();
              toast.success("Updated Successfully");
              navigate("/expcreatejob");
            }}
          >
            <NewButton width={"120px"} text={"Save & New"} />
          </div>
          <div
            className="search-button"
            onClick={() => {
              handleUpdate();
              toast.success("Updated Successfully");
              handleClose();
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
    )
  );
};

export default General;
