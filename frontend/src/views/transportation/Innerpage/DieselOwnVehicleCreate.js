import { CCard, CCardBody,CButton, CFormCheck, CFormInput } from "@coreui/react";
import React from "react";
import "../css/transportation-styles.css";
import { useNavigate } from "react-router-dom";

function DieselOwnVehicleCreate() {
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
      {/* <CCard className="card-body-1">
        <CCardBody>
          <div>
            <label className="transport-label ">Vehicle No.</label>
            <select className="form-select-imp-create select-width-input">
              <option>Select</option>
            </select>
          </div>

          <div>
            <label className="transport-label">Type of Container</label>
            <select className="form-select-imp-create select-width-input">
              <option disabled>Select</option>
              <option>20'</option>
              <option>40'</option>
              <option>20' ISO Tank</option>
              <option>40' ISO Tank</option>
              <option>LCL</option>
            </select>
          </div>

          <div>
            <label className="transport-label">Tranporter Name</label>
            <input value="Seawave" readOnly />
          </div>

       
        </CCardBody>
      </CCard> */}

      <CCard className="card-body-1">
        <CCardBody className="grid-transport-section">

          <div>
            <label className="transport-label-grid-section">Odometer No.</label>
            <input />
          </div>

          <div>
            <label className="transport-label-grid-section">Rate Diesel</label>
            <input />
          </div>

          <div className="balance-diesel">
            <div className="transport-label-grid-section">
              <label  className="">Balance Details</label>
              <span className="balance-diesel-refill-question">
                How much diesel was left in the tank before refilling{" "}
              </span>
            </div>
            <input className="diesel-span-input"/>
          </div>

          <div>
            <label className="transport-label-grid-section">In Litre (Refilling)</label>
            <input />
          </div>

          <div>
            <label className="transport-label-grid-section">Amount</label>
            <input />
          </div>

          <div>
            <label className="transport-label-grid-section" for="myfile">
              Upload Receipt:{" "}
            </label>
            <input type="file" id="myfile" name="myfile" />
          </div>
          <div>
            <label className="transport-label-grid-section" for="myfile">
              Requistion Upload:{" "}
            </label>
            <input type="file" id="myfile" name="myfile" />
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

export default DieselOwnVehicleCreate;
