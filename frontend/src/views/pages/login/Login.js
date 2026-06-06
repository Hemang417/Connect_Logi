import React, { useState, useEffect } from "react";
import "../css/Login.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CFormSelect,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { branches } from "src/views/branches";

import HeroLogo from "../../../assets/brand/MainLogoPNG.png";
import API_BASE_URL from "src/config/config";

const OrgSvg = (props) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M14 1.99774C11.6528 1.99774 9.75 3.90053 9.75 6.24774C9.75 8.33903 11.2605 10.0775 13.25 10.4318V13.5H8.75C7.50736 13.5 6.5 14.5074 6.5 15.75V17.566C4.51049 17.9202 3 19.6587 3 21.75C3 24.0972 4.90279 26 7.25 26C9.59721 26 11.5 24.0972 11.5 21.75C11.5 19.6587 9.98951 17.9202 8 17.566V15.75C8 15.3358 8.33579 15 8.75 15H19.25C19.6642 15 20 15.3358 20 15.75V17.566C18.0105 17.9202 16.5 19.6587 16.5 21.75C16.5 24.0972 18.4028 26 20.75 26C23.0972 26 25 24.0972 25 21.75C25 19.6587 23.4895 17.9202 21.5 17.566V15.75C21.5 14.5074 20.4926 13.5 19.25 13.5H14.75V10.4318C16.7395 10.0775 18.25 8.33904 18.25 6.24774C18.25 3.90053 16.3472 1.99774 14 1.99774ZM11.25 6.24774C11.25 4.72896 12.4812 3.49774 14 3.49774C15.5188 3.49774 16.75 4.72896 16.75 6.24774C16.75 7.76652 15.5188 8.99774 14 8.99774C12.4812 8.99774 11.25 7.76652 11.25 6.24774ZM4.5 21.75C4.5 20.2312 5.73122 19 7.25 19C8.76878 19 10 20.2312 10 21.75C10 23.2688 8.76878 24.5 7.25 24.5C5.73122 24.5 4.5 23.2688 4.5 21.75ZM20.75 19C22.2688 19 23.5 20.2312 23.5 21.75C23.5 23.2688 22.2688 24.5 20.75 24.5C19.2312 24.5 18 23.2688 18 21.75C18 20.2312 19.2312 19 20.75 19Z"
        fill="#364657"
      ></path>
    </g>
  </svg>
);

const UserSvg = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <circle cx="12" cy="6" r="4" stroke="#364657" strokeWidth="1.5"></circle>
      <path
        d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18"
        stroke="#364657"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </g>
  </svg>
);

const PasswordSvg = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
        stroke="#364657"
        strokeWidth="1.5"
      ></path>
      <path
        d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"
        stroke="#364657"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </g>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    orgcode: "",
  });
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);
  const [allBranchesOfOurOwn, setAllBranchesOfOurOwn] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [approvers, setapprovers] = useState([]);
  const [dropValue, setdropValue] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get("userauthtoken");
      if (token) {
        // Token exists, redirect to dashboard
        navigate("/dashboard");
      }
    };
    checkToken();
  }, []);

  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  // Add this enhanced error handling to your handleSubmit function
  async function handleSubmit(e) {
    e.preventDefault();

    if (!loginData.username || !loginData.password || !loginData.orgcode) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: loginData.username,
        password: loginData.password,
        orgcode: loginData.orgcode,
      });

      if (response.status === 200) {
        localStorage.setItem("orgcode", response.data.orgcode);
        localStorage.setItem("orgname", response.data.orgname);
        localStorage.setItem("username", response.data.username);

        // Store the token in state
        setAuthToken(response.data.token);

        const branches = await fetchBranchesOfOurOwn(
          response.data.orgcode,
          response.data.orgname,
          response.data.username
        );

        if (branches.length === 1) {
          handleSelect(branches[0].ownbranchname, branches[0].branchcode, response.data.token);
        } else {
          setAllBranchesOfOurOwn(branches);
          setShowDropdown(true);
        }
      } else {
        toast.error("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error details:", error);

      if (error.response) {
        // Server responded with error status
        console.log("Error response data:", error.response.data);
        console.log("Error status:", error.response.status);

        const errMsg = error.response.data?.error || "An error occurred.";

        if (errMsg.includes("already logged in")) {
          toast.error("You are already logged in from another device. Please log out first.");
        } else if (error.response.status === 401) {
          toast.error("Invalid username or password.");
        } else {
          toast.error(errMsg);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.log("No response received:", error.request);
        console.log("Error code:", error.code);

        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          toast.error("Cannot connect to server. Please check if the server is running on port 5000.");
        } else {
          toast.error("Unable to connect to server. Please try again later.");
        }
      } else {
        // Something else happened
        console.log("Other error:", error.message);
        toast.error("An unexpected error occurred: " + error.message);
      }
    }
  }

  const fetchBranchesOfOurOwn = async (orgcode, orgname, username) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/fetchallownbranchname`,
        {
          params: {
            orgcode: orgcode,
            orgname: orgname,
            username: username,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  async function handleSelect(branchname, branchcode, token) {
    setSelectedBranch({ branchname, branchcode });
    localStorage.setItem("branchnameofemp", branchname);
    localStorage.setItem("branchcodeofemp", branchcode);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/dashboard`,
        { username: loginData.username, branchname, branchcode },
        {
          headers: {
            userauthtoken: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Only set cookie and show success after validation passes
        Cookies.set("userauthtoken", token);
        toast.success("Accessing dashboard...");
        setIsNavigatingAway(true);
        navigate("/dashboard");
      } else {
        toast.error("Token validation failed. Please login again.");
        Cookies.remove("userauthtoken");
      }
    } catch (error) {
      console.error("Dashboard auth failed:", error);
      toast.error("Session expired or invalid. Please log in again.");
      Cookies.remove("userauthtoken");
    }
  }

  const handleUnload = () => {
    if (!isNavigatingAway) {
      Cookies.remove("userauthtoken");
    }
  };

  // Add event listener for beforeunload when component mounts
  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div className="bg-login-logistics min-vh-100 d-flex">
      <div className=" flex-grow-1 d-flex justify-content-center align-items-center">
        <CContainer className=" LogoContainerOpacity">
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4 LoginDiv" id="container">
                  <div className="MainLogoLeft">
                    <img className="logoImgLogin" id="logo" src={HeroLogo} />
                  </div>
                  <CCardBody>
                    <CForm
                      onSubmit={handleSubmit}
                      className="d-flex flex-column"
                    >
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <div>
                        <CInputGroup className="mb-3 w-100">
                          <CInputGroupText className="svg-login-width">
                            <OrgSvg style={{ width: "24px", height: "24px" }} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Organization Code"
                            autoComplete="organizationcode"
                            onChange={handleChange}
                            name="orgcode"
                            className="svg-login-input-field"
                            disabled={showDropdown}
                          />
                        </CInputGroup>
                      </div>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className="svg-login-width">
                          <UserSvg style={{ width: "24px", height: "24px" }} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          onChange={handleChange}
                          name="username"
                          className="svg-login-input-field"
                          disabled={showDropdown}
                        />
                      </CInputGroup>
                      <CInputGroup className="">
                        <CInputGroupText className="svg-login-width">
                          <PasswordSvg
                            style={{ width: "24px", height: "24px" }}
                          />
                        </CInputGroupText>
                        <CFormInput
                          className="svg-login-input-field"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          onChange={handleChange}
                          disabled={showDropdown}
                        />
                      </CInputGroup>
                      {showDropdown && allBranchesOfOurOwn.length > 0 && (
                        <CCardBody>
                          <CFormSelect
                            aria-label="Default select example"
                            value={dropValue || ""}
                            onChange={(e) => {
                              const selectedBranchName = e.target.value;
                              setdropValue(selectedBranchName === "" ? null : selectedBranchName);
                            }}
                          >
                            <option value="">Select One</option>
                            {allBranchesOfOurOwn.map((branch, index) => (
                              <option key={index} value={branch.ownbranchname}>
                                {branch.ownbranchname}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCardBody>
                      )}
                      <div className="forgotpassword-alignment">
                        <div>
                          <CButton
                            color="primary"
                            className="px-4 mt-4"
                            type={showDropdown ? "button" : "submit"}
                            onClick={(e) => {
                              if (showDropdown) {
                                e.preventDefault();
                                if (dropValue == null) {
                                  toast.error("Please select a branch");
                                  return;
                                }
                                const selectedBranch = allBranchesOfOurOwn.find(
                                  (branch) => branch.ownbranchname === dropValue
                                );

                                if (selectedBranch) {
                                  // Move the success toast inside handleSelect, and use authToken instead of loginData.token
                                  handleSelect(
                                    selectedBranch.ownbranchname,
                                    selectedBranch.branchcode,
                                    authToken // Use the stored token instead of loginData.token
                                  );
                                }
                              }
                            }}
                          >
                            Login
                          </CButton>
                        </div>
                        <div className=" new-register">
                          <div
                            className="login-regiter-buttons mt-4"
                            color="link"
                            // className="px-0"
                            onClick={() => navigate("/forgetpassword")}
                          >
                            Forgot password?
                          </div>
                        </div>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 9999 } }}
      />
    </div>
  );
};

export default Login;
