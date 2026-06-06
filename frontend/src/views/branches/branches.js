import React, { useState } from "react";
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
  CPopover,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilBuilding } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "src/config/config";

const AddressSvg = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 1024 1024"
      fill="#364657"
      class="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z"
          fill=""
        ></path>
      </g>
    </svg>
  );
};

const BPNSVG = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#364657"
      transform="matrix(-1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs>
          <style>
            {`.cls-1 {
              fill: none;
              stroke: #364657;
              stroke-linecap: square;
              stroke-miterlimit: 10;
              stroke-width: 1.91px;
            }`}
          </style>
        </defs>
        <g id="human_resource" data-name="human resource">
          <path
            className="cls-1"
            d="M9.14,22.5V19.68a0,0,0,0,0-.05,0H7.27a2,2,0,0,1-1.95-2V14.86l-1.91-.95,1.9-3.81V9.47a7.86,7.86,0,0,1,7.13-8,7.61,7.61,0,0,1,8.14,7.62,10.49,10.49,0,0,1-2.86,7.2V22.5"
          ></path>
          <circle className="cls-1" cx="12.95" cy="10.09" r="2.86"></circle>
          <line
            className="cls-1"
            x1="12.95"
            y1="6.27"
            x2="12.95"
            y2="7.23"
          ></line>
          <line
            className="cls-1"
            x1="12.95"
            y1="13.91"
            x2="12.95"
            y2="12.95"
          ></line>
          <line
            className="cls-1"
            x1="9.65"
            y1="8.18"
            x2="10.47"
            y2="8.66"
          ></line>
          <line
            className="cls-1"
            x1="16.26"
            y1="12"
            x2="15.43"
            y2="11.52"
          ></line>
          <line
            className="cls-1"
            x1="16.26"
            y1="8.18"
            x2="15.43"
            y2="8.66"
          ></line>
          <line
            className="cls-1"
            x1="9.65"
            y1="12"
            x2="10.47"
            y2="11.52"
          ></line>
        </g>
      </g>
    </svg>
  );
};
const BranchSvg = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M6 7H7M6 10H7M11 10H12M11 13H12M6 13H7M11 7H12M7 21V18C7 16.8954 7.89543 16 9 16C10.1046 16 11 16.8954 11 18V21H7ZM7 21H3V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H13.4C13.9601 3 14.2401 3 14.454 3.10899C14.6422 3.20487 14.7951 3.35785 14.891 3.54601C15 3.75992 15 4.03995 15 4.6V9M19.7 13.5C19.7 14.3284 19.0284 15 18.2 15C17.3716 15 16.7 14.3284 16.7 13.5C16.7 12.6716 17.3716 12 18.2 12C19.0284 12 19.7 12.6716 19.7 13.5ZM21.5 21V20.5C21.5 19.1193 20.3807 18 19 18H17.5C16.1193 18 15 19.1193 15 20.5V21H21.5Z"
          stroke="#364657"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};
const OrgcodeSVG = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M14 1.99774C11.6528 1.99774 9.75 3.90053 9.75 6.24774C9.75 8.33903 11.2605 10.0775 13.25 10.4318V13.5H8.75C7.50736 13.5 6.5 14.5074 6.5 15.75V17.566C4.51049 17.9202 3 19.6587 3 21.75C3 24.0972 4.90279 26 7.25 26C9.59721 26 11.5 24.0972 11.5 21.75C11.5 19.6587 9.98951 17.9202 8 17.566V15.75C8 15.3358 8.33579 15 8.75 15H19.25C19.6642 15 20 15.3358 20 15.75V17.566C18.0105 17.9202 16.5 19.6587 16.5 21.75C16.5 24.0972 18.4028 26 20.75 26C23.0972 26 25 24.0972 25 21.75C25 19.6587 23.4895 17.9202 21.5 17.566V15.75C21.5 14.5074 20.4926 13.5 19.25 13.5H14.75V10.4318C16.7395 10.0775 18.25 8.33904 18.25 6.24774C18.25 3.90053 16.3472 1.99774 14 1.99774ZM11.25 6.24774C11.25 4.72896 12.4812 3.49774 14 3.49774C15.5188 3.49774 16.75 4.72896 16.75 6.24774C16.75 7.76652 15.5188 8.99774 14 8.99774C12.4812 8.99774 11.25 7.76652 11.25 6.24774ZM4.5 21.75C4.5 20.2312 5.73122 19 7.25 19C8.76878 19 10 20.2312 10 21.75C10 23.2688 8.76878 24.5 7.25 24.5C5.73122 24.5 4.5 23.2688 4.5 21.75ZM20.75 19C22.2688 19 23.5 20.2312 23.5 21.75C23.5 23.2688 22.2688 24.5 20.75 24.5C19.2312 24.5 18 23.2688 18 21.75C18 20.2312 19.2312 19 20.75 19Z"
          fill="#364657"
        ></path>{" "}
      </g>
    </svg>
  );
};

const BPMSVG = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M8.21922 4H5C4.44772 4 4 4.44772 4 5V6C4 13.732 10.268 20 18 20H19C19.5523 20 20 19.5523 20 19V15.7808C20 15.3219 19.6877 14.9219 19.2425 14.8106L16.5493 14.1373C16.2085 14.0521 15.848 14.152 15.5996 14.4004L15.0023 14.9977C15.0008 14.9992 14.9988 15 14.9967 15C11.6848 15 9 12.3152 9 9.00329C9 9.00118 9.00084 8.99916 9.00232 8.99768L9.59964 8.40036C9.84802 8.15198 9.94787 7.79149 9.86268 7.45072L9.18937 4.75746C9.07807 4.3123 8.67809 4 8.21922 4Z"
          stroke="#364657"
          stroke-width="2"
          stroke-linecap="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

const branches = () => {
  const navigate = useNavigate();

  const [branchCreate, setbranchCreate] = useState({
    orgcode: localStorage.getItem("orgcode"),
    ownbranchname: "",
    address: "",
    gst: "",
    iec: "",
    headname: "",
    headnum: "",
  });

  function handleChange(e) {
    setbranchCreate({
      ...branchCreate,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const nameoforg = localStorage.getItem("orgname");
      const reponse = await axios.post(
        `${API_BASE_URL}/createownbranch`,
        {
          orgcode: branchCreate.orgcode,
          ownbranchname: branchCreate.ownbranchname,
          address: branchCreate.address,
          gst: branchCreate.gst,
          iec: branchCreate.iec,
          headname: branchCreate.headname,
          headnum: branchCreate.headnum,
          orgname: nameoforg,
        }
      );
      navigate("/branchlist");
    } catch (error) {
      toast.error("Error creating new user");
      console.log("Error: " + error);
    }
  }

  return (
    <div className="bg-light my-2 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {/* <CForm>
                  <h1>New Branch</h1>
                  <p className="text-medium-emphasis">Create New Branches</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="svg-register-width">
                      {" "}
                      <OrgcodeSVG style={{ width: "24px", height: "24px" }} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Organization Code"
                      autoComplete="orgcode"
                      name="orgcode"
                      value={localStorage.getItem("orgcode")}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="svg-register-width">
                      <BranchSvg style={{ width: "24px", height: "24px" }} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Branch Name"
                      name="ownbranchname"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="svg-register-width">
                      {" "}
                      <AddressSvg style={{ width: "24px", height: "24px" }} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Address"
                      onChange={handleChange}
                      name="address"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>GST</CInputGroupText>
                    <CFormInput
                      placeholder="GST No."
                      onChange={handleChange}
                      name="gst"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="svg-register-width">
                      IEC
                    </CInputGroupText>
                    <CFormInput
                      placeholder="IEC No."
                      onChange={handleChange}
                      name="iec"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="svg-register-width">
                      {" "}
                      <BPNSVG style={{ width: "24px", height: "24px" }} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Branch Head Name"
                      onChange={handleChange}
                      name="headname"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="svg-register-width">
                      {" "}
                      <BPMSVG style={{ width: "24px", height: "24px" }} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Branch Head Mobile No."
                      onChange={handleChange}
                      name="headnum"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CPopover
                      content="Create new branch"
                      trigger={["hover", "focus"]}
                    >
                      <CButton color="success" onClick={handleSubmit}>
                        Create Account
                      </CButton>
                    </CPopover>
                  </div>
                </CForm> */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default branches;
