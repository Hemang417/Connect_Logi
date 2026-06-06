import { CCard, CCardBody,CButton, CFormCheck, CFormInput } from "@coreui/react";
import React from "react";
import "../css/transportation-styles.css";
import { useNavigate } from "react-router-dom";
function ReturnLoadOwnVehicleCreate() {
  const navigate = useNavigate()
  const closeBtnNavigate = () =>{
    navigate("/Uneed")
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
    </CCard>

    <CCard className="card-body-1">
      <CCardBody className="grid-transport-section">
        <div>
          <label className="transport-label-grid-section">Job No.</label>
          <input />
        </div>

        <div>
          <label className="transport-label-grid-section">Customer Name</label>
          <input />
        </div>

        <div>
          <label className="transport-label-grid-section">Weight</label>
          <input />
        </div>

        <div>
          <label className="transport-label-grid-section">From</label>
          <input />
        </div>

        <div className="select-type-imp-exp ">
          <div className="transport-label-grid-section">
            <label>Select Type </label>
          </div>
          <div className="type-checkbox">
            <input type="radio"  value="Import" />
            <label >Import</label>
            <input type="radio"  value="Export" />
            <label >Export</label>
          </div>
        </div>


        <div>
          <label className="transport-label-grid-section">To</label>
          <input />
        </div>

      
      

        <div>
          <label className="transport-label-grid-section">TAT</label>
          <input />
        </div>

        <div>
          <label className="transport-label-grid-section">Driver Advance</label>
          <input />
        </div>
        <div>
          <label className="transport-label-grid-section">Rate</label>
          <input />
        </div>
        <div>
          <label className="transport-label-grid-section">Advance Rate</label>
          <input />
        </div>
        <div className="remark-field-owncreate">
          <label className="transport-label-grid-section">Remark</label>
          <textarea className="transport-remark"></textarea>
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
  )
}

export default ReturnLoadOwnVehicleCreate
