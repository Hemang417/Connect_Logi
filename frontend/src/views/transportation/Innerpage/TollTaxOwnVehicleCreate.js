import { CCard, CCardBody,CButton, CFormCheck, CFormInput } from "@coreui/react";
import React from "react";
import "../css/transportation-styles.css";
import { useNavigate } from "react-router-dom";
function TollTaxOwnVehicleCreate() {
  const navigate = useNavigate()


  const closeBtnNavigate =()=>{
      navigate("/Expenses")
  }
  return (
    <div>
      <CCard className="card-body-1">
        <CCardBody className="own-vehicle-first-div card-body-1">
          <div>
            <label className="transport-label">Reference No.</label>
            <input />
          </div>

          <div>
            <label className="transport-label">Date</label>
            <input />
          </div>

          <div>
            <label className="transport-label">Username</label>
            <input />
          </div>

          <div>
            <label className="transport-label">Vehicle Placed Date</label>
            <input />
          </div>
        </CCardBody>
      </CCard>

      <CCard className="card-body-1">
        <CCardBody>
          {/* <h2>Requirement Details </h2> */}
          <div className="toll-tax-div">
            <label className="transport-heading">Toll Tax Amount</label>
            <label className="class-bold-toll">It should be uploaded every week</label>
            <input className="toll-tax-input-width" />
          </div>
        </CCardBody>
      </CCard>
      <div className="all-buttons">
        <div className="all-buttons-inner-div">
          <div className="search-button">
            <CButton color="primary" type="submit">
              Save
            </CButton>
          </div>
          <div className="search-button">
            <CButton color="primary" type="submit">
              Save & Close
            </CButton>
          </div>
        </div>
        <div className="all-buttons-inner-div">
          {" "}
          <div className="search-button">
            <CButton color="primary" type="submit">
              Save & New
            </CButton>
          </div>
          <div className="search-button">
            <CButton color="primary" onClick={closeBtnNavigate}>
              Close
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TollTaxOwnVehicleCreate;
