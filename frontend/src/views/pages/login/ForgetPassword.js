import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import "../../../css/styles.css"
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../../assets/brand/MainLogoPNG.png";
import API_BASE_URL from "src/config/config";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [passForm, setPassForm] = useState({
    username: "",
    newpassword: "",
    orgcode: "",
    repeatPassword: "",
    remark: "",
    role: "",
  });

  function handleChange(e) {
    setPassForm({
      ...passForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgotpassword`,
        {
          username: passForm.username,
          newpassword: passForm.newpassword,
          orgcode: passForm.orgcode,
          repeatPassword: passForm.repeatPassword,
          remark: passForm.remark,
          role: passForm.role,
        }
      );
      console.log(passForm);
      if (response.status === 200) {
        toast.success(
          "Password Change Request Has Gone for Approval Please Wait..."
        );
        navigate("/login");
      }
    } catch (error) {
      toast.error("Password reset failed");
      console.log("Error: " + error);
    }
  }

  return (
    <div className="bg-register-logistics">
      <CContainer className="register-center-div LogoContainerOpacity">
        <CRow>
          <CCol>
            <CCardGroup>
              <CCard style={{width:"630px"}}>
                <CCardBody>
                  <div className="headerlogoRegister">
                    <div>
                      <h4>Reset Password</h4>
                    </div>
                    <div>
                      <img src={Logo} className="MainLogoRegister" style={{width:"250px" , height:"162px"}} />
                    </div>
                  </div>
                  <CForm onSubmit={handleSubmit}>
                    <p className="text-medium-emphasis">
                      Enter your details to reset your password
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Organization Code"
                        autoComplete="organizationcode"
                        onChange={handleChange}
                        name="orgcode"
                        value={passForm.orgcode}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={handleChange}
                        name="username"
                        value={passForm.username}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Role"
                        autoComplete="role"
                        onChange={handleChange}
                        name="role"
                        value={passForm.role}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New Password"
                        autoComplete="new-password"
                        name="newpassword"
                        onChange={handleChange}
                        value={passForm.newpassword}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Repeat Password"
                        autoComplete="new-password"
                        name="repeatPassword"
                        onChange={handleChange}
                        value={passForm.repeatPassword}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>Remark</CInputGroupText>
                      <CFormInput
                        placeholder="Enter reason for password change"
                        name="remark"
                        onChange={handleChange}
                        value={passForm.remark}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Submit
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 9999 } }}
      />
    </div>
  );
};

export default ForgetPassword;
