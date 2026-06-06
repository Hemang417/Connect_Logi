import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPopover,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilBuilding } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../css/styles.css";
import InputPopup from "src/components/inputPopup/InputPopup";
import Cookies from "js-cookie";
import API_BASE_URL from "src/config/config";

const NewUser = () => {
  const navigate = useNavigate();
  // const [allBranchesofourOwn, setallbranchesofourOwn] = useState([]);
  const [regForm, setregForm] = useState({
    username: "",
    password: "",
    orgcode: localStorage.getItem("orgcode"),
    repeatPassword: "",
    fullname: "",
  });
  const [currentPopup, setCurrentPopup] = useState("none");
  const [isEditing, setIsEditing] = useState(false);

  const [selectedRole, setselectedRole] = useState("");

  function handleChange(e) {
    setregForm({
      ...regForm,
      [e.target.name]: e.target.value,
    });
  }

  const contactFields = [
    { id: "orgcode", label: "Orgcode", inputType: "text" },
    { id: "fullname", label: "Full Name", inputType: "text" },
    { id: "username", label: "Username", inputType: "text" },
    { id: "dropdown", label: "Role", inputType: "" },
    { id: "password", label: "Password", inputType: "password" },
    { id: "repeatPassword", label: "Repeat Password", inputType: "password" },
  ];

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (!token) {
        navigate("/login");
      }
    };
    checkToken();
  }, [navigate]);

  async function handleSubmit(e) {
    // e.preventDefault();
    try {
      const nameoforg = localStorage.getItem("orgname");
      if (regForm.username.includes(" ")) {
        alert("No spacing in username");
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/emp/store`, {
        username: regForm.username,
        password: regForm.password,
        orgname: nameoforg,
        orgcode: regForm.orgcode,
        repeatPassword: regForm.repeatPassword,
        fullname: regForm.fullname,
        role: selectedRole,
        createdby: localStorage.getItem("username"),
      });

      // setregForm({
      //     username: '',
      //     password: '',
      //     orgcode: '',
      //     repeatPassword: '',
      //     fullname: '',
      // });

      // setselectedRole('');

      // localStorage.setItem('orgname', regForm.orgname);
      // localStorage.setItem('orgcode', response.data.register.orgcode);
      if (response.statusCode === 200) {
        setregForm({
          username: "",
          password: "",
          orgcode: "",
          repeatPassword: "",
          fullname: "",
        });

        setselectedRole("");
        toast.success("New user added successfully");
        navigate("/userlist");
      }

      location.reload(navigate("/userlist"));

      // navigate('/userlist');
    } catch (error) {
      toast.error("Error creating new user");
      console.log("Error: " + error);
    }
  }

  const [storedRoles, setStoredRoles] = useState([]);
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

  useEffect(() => {
    GetallRoles();
  }, []);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      style={{ width: "100%" }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={100} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>New User</h1>
                  <p className="text-medium-emphasis">Create your new user</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>OC</CInputGroupText>
                    <CFormInput
                      placeholder="Organization Code"
                      autoComplete="orgcode"
                      name="orgcode"
                      onChange={handleChange}
                      value={localStorage.getItem("orgcode")}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Full Name"
                      name="fullname"
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      onChange={handleChange}
                      name="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <select
                      className="form-select"
                      value={selectedRole || ""}
                      onChange={(e) => setselectedRole(e.target.value)}
                    >
                      <option value="" disabled>
                        {selectedRole ? selectedRole : "Role"}
                      </option>
                      {storedRoles.map((item, index) => (
                        <option key={index} value={item.rolename}>
                          {item.rolename}
                        </option>
                      ))}
                    </select>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    {/* <CPopover content="Create new user" trigger={['hover', 'focus']}> */}
                    <CButton color="success" onClick={handleSubmit}>
                      Create Account
                    </CButton>
                    {/* </CPopover> */}
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      {/* <InputPopup
        title="Add New Contact"
        setCurrentPopup={setCurrentPopup}
        fields={contactFields}
        value={regForm}
        left={"61%"}
        setValue={setregForm}
        handleAdd={handleSubmit}
        firstButtonText={"Create Account"}
        secondButtonText={"Close"}
        selection={"dropdown"}
        dropdownType={"type1"}
        dropdownPlaceholder={"Select Role"}
        dropdownValue={selectedRole || ""}
        dropdownOptions={storedRoles.map((items) => ({
          value: items.rolename,
          label: items.rolename,
        }))}
        dropdownSetValue={setselectedRole}
      /> */}
    </div>
  );
};

export default NewUser;
