import { CCard, CCardBody,CButton, CFormCheck, CFormInput } from "@coreui/react";
import React from "react";
import "../css/transportation-styles.css";
import { useNavigate } from "react-router-dom";

function TaxANDInsuranceOwnVehicleCreate() {
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
            <CCardBody className="grid-transport-section">
            <div>
                <label className="transport-label-grid-section">Vehicle No.</label>
                <select className="form-select-imp-create select-width-input">
                  <option>Select</option>
                </select>
              </div>
    
              <div>
                <label className="transport-label-grid-section">Select Type </label>
                <select className="form-select-imp-create select-width-input">
                  <option disabled>Select</option>
                  <option>Insurance</option>
                  <option>PUC</option>
                  <option>MV Tax</option>
                  <option>National Permit</option>
                  <option>Permit</option>
                  <option>Fitness</option>
                </select>
              </div>
             
    
              <div>
                <label className="transport-label-grid-section">
                   Amount
                </label>
                <input />
              </div>
    
              <div>
                <label className="transport-label-grid-section" for="myfile">
                  Requistion Upload:{" "}
                </label>
                <input type="file" id="myfile" name="myfile" />
              </div>
    
              <div className="remark-field-owncreate">
                <label className="transport-label-grid-section">Remark</label>
                <textarea className="transport-remark"></textarea>
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
                <CButton color="primary" 
                
                onClick={closeBtnNavigate}
                >
                  Close
                </CButton>
              </div>
            </div>
          </div>
        </div>
      );
}

export default TaxANDInsuranceOwnVehicleCreate