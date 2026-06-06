import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CPagination,
  CPaginationItem,
  CPopover,
  CModalTitle,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CFooter,
} from "@coreui/react";
import "../css/sales.css";
import { MultiSelect } from "react-multi-select-component";

function QuoEdit() {
  const [referenceNo, setReferenceNo] = useState("");
  const [referenceDate, setReferenceDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [enquiryFor, setEnquiryFor] = useState("");
  const [ServiceType, setServiceType] = useState("");
  const [isshown, setIsShown] = useState("");
  const [isEditable, setIsEditable] = useState("");

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Starts faded & moves up
        animate={{ opacity: 1, y: 0 }} // Becomes fully visible
        exit={{ opacity: 0, y: -20 }} // Fades out & moves up
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        <CCard className="card-space-enquiry">
          <CCardBody className="prospect-primary-container">
            <div className="prospect-job-grid-container-primary">
              <div className="grid-equalizer-date">
                <label htmlFor="date" className="prospect-job-label">
                  Reference Date :
                </label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setReferenceDate(e.target.value);
                  }}
                  className="job-text-field-4"
                />
              </div>
            </div>

            <div className="prospect-job-grid-container-primary">
              <div className="grid-equalizer-1">
                <label htmlFor="jobNo" className="prospect-job-label">
                  Reference No :
                </label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setReferenceNo(e.target.value);
                  }}
                  className="job-text-field-4"
                  name="referenceNo"
                />
              </div>
            </div>

            <div className="prospect-job-grid-container-primary">
              <div className="grid-equalizer-1">
                <label htmlFor="username" className="prospect-job-label">
                  Customer Name :
                </label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                  className="job-text-field-4"
                />
              </div>
            </div>

            <div className="prospect-job-grid-container-primary">
              <div className="grid-equalizer-1">
                <label htmlFor="username" className="prospect-job-label">
                  Enquiry For :
                </label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setEnquiryFor(e.target.value);
                  }}
                  className="job-text-field-4"
                />
              </div>
            </div>

            <div className="prospect-job-grid-container-primary">
              <div className="grid-equalizer-1">
                <label htmlFor="username" className="prospect-job-label">
                  Service Type :
                </label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setServiceType(e.target.value);
                  }}
                  className="job-text-field-4"
                />
              </div>
            </div>
          </CCardBody>
        </CCard>

        <CNav variant="tabs" className="nav-link-text userlist-cnav-cusros">
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Import Clearance" ? "active" : ""
              }`}
              onClick={() => setIsShown("Import Clearance")}
            >
              Import Clearance
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Export Clearance" ? "active" : ""
              }`}
              onClick={() => setIsShown("Export Clearance")}
              disabled={isEditable}
            >
              Export Clearance
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Freight Booking" ? "active" : ""
              }`}
              onClick={() => setIsShown("Freight Booking")}
              disabled={isEditable}
            >
              Freight Booking
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Transportation" ? "active" : ""
              }`}
              onClick={() => setIsShown("Transportation")}
              disabled={isEditable}
            >
              Transportation
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              className={`nav-link ${
                isshown === "Exim Consultancy" ? "active" : ""
              }`}
              onClick={() => setIsShown("Exim Consultancy")}
              disabled={isEditable}
            >
              Exim Consultancy
            </CNavLink>
          </CNavItem>
        </CNav>

        <CCard>
          <CCardBody>
            <div className="prospect-job-grid-container-secondary">
              <div className="enquiry-checkbox-field">
                {isshown === "Import Clearance" && (
                  <motion.div
                    initial={{ opacity: 0 }} // Starts faded & moves up
                    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
                    exit={{ opacity: 0 }} // Fades out & moves up
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                  >
                    <div>
                      <div>
                        <h3>Import Clearance</h3>
                        <div className={`import-clearance-fields`}>
                          <div className="checkbox-inner-single-div">
                            <label>Weight :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="weight"
                              //   value={enquiryForData.importClearance.weight}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "importClearance")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Commodity :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="commodity"
                              //   value={enquiryForData.importClearance.commodity}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "importClearance")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Loading :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfLoading"
                              //   value={enquiryForData.importClearance.portOfLoading}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "importClearance")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Discharge :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfDischarge"
                              //   value={
                              //     enquiryForData.importClearance.portOfDischarge
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "importClearance")
                              //   }
                            />
                          </div>
                          {/* <div className="checkbox-inner-single-div">
                            <label>Type of Container</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfContainer"
                              value={enquiryForData.importClearance.typeOfContainer}
                              onChange={(e) =>
                                handleEnquiryForInputChange(e, "importClearance")
                              }
                            >
                              <option>Select</option>
      
                              <option>20'</option>
                              <option>40'</option>
                              <option>20' ISO Tank</option>
                              <option>40' ISO Tank</option>
                              <option>LCL</option>
                              <option>Flat Bulk</option>
                              <option>Break Bulk</option>
                            </select>
                          </div> */}
                          <div className="checkbox-inner-single-div">
                            <label>Type of Delivery :</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfDelivery"
                              //   value={
                              //     enquiryForData.importClearance.typeOfDelivery
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "importClearance")
                              //   }
                            >
                              <option>Select</option>
                              <option>Loaded</option>
                              <option>Destuff</option>
                            </select>
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Type of Container :</label>
                            {/* <CustomSelect
                                  className="Custom-MultiSelect"
                                //   options={containerTypeOptions}
                                //   value={selectedContainerTypes.importClearance || []}
                                //   onChange={(selectedOptions) =>
                                //     handleContainerTypeChange(
                                //       selectedOptions,
                                //       "importClearance"
                                //     )
                                //   }
                                */}
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label for="Delivery Mode">
                              No. of Container :
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="numberOfContainer"
                              //   onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isshown === "Export Clearance" && (
                  <motion.div
                    initial={{ opacity: 0 }} // Starts faded & moves up
                    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
                    exit={{ opacity: 0 }} // Fades out & moves up
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                  >
                    <div>
                      <div>
                        <h3>Export Clearance</h3>
                        <div className={`export-clearance-fields`}>
                          <div className="checkbox-inner-single-div">
                            <label>Weight :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="weight"
                              //   value={enquiryForData.exportClearance.weight}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "exportClearance")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Commodity :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="commodity"
                              //   value={enquiryForData.exportClearance.commodity}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "exportClearance")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Loading :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfLoading"
                              //   value={enquiryForData.exportClearance.portOfLoading}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "exportClearance")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Discharge :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfDischarge"
                              //   value={
                              //     enquiryForData.exportClearance.portOfDischarge
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "exportClearance")
                              //   }
                            />
                          </div>
                          {/* <div className="checkbox-inner-single-div">
                            <label>Type of Container</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfContainer"
                              value={enquiryForData.exportClearance.typeOfContainer}
                              onChange={(e) =>
                                handleEnquiryForInputChange(e, "exportClearance")
                              }
                            >
                              <option>Select</option>
      
                              <option>20'</option>
                              <option>40'</option>
                              <option>20' ISO Tank</option>
                              <option>40' ISO Tank</option>
                              <option>LCL</option>
                              <option>Flat Bulk</option>
                              <option>Break Bulk</option>
                            </select>
                          </div> */}
                          <div className="checkbox-inner-single-div">
                            <label>Type of Delivery :</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfDelivery"
                              //   value={
                              //     enquiryForData.exportClearance.typeOfDelivery
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "exportClearance")
                              //   }
                            >
                              <option>Select</option>
                              <option>Factory Stuff</option>
                              <option>Dock Stuff</option>
                              <option>Cargo With Container</option>
                            </select>
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Type of Container :</label>
                            {/* <CustomSelect
                                  className="Custom-MultiSelect"
                                //   options={containerTypeOptions}
                                //   value={selectedContainerTypes.exportClearance}
                                //   onChange={(selectedOptions) =>
                                //     handleContainerTypeChange(
                                //       selectedOptions,
                                //       "exportClearance"
                                //     )
                                //   }
                                /> */}
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label for="Delivery Mode">
                              No. of Container :
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="numberOfContainer"
                              //   onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </motion.div>
                )}
                {isshown === "Freight Booking" && (
                  <motion.div
                    initial={{ opacity: 0 }} // Starts faded & moves up
                    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
                    exit={{ opacity: 0 }} // Fades out & moves up
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                  >
                    <div>
                      <div>
                        <h3>Freight Booking</h3>
                        <div className={`freight-booking-fields`}>
                          <div className="checkbox-inner-single-div">
                            <label>Weight :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="weight"
                              //   value={enquiryForData.freightBooking.weight}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "freightBooking")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Commodity :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="commodity"
                              //   value={enquiryForData.freightBooking.commodity}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "freightBooking")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Loading :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfLoading"
                              //   value={enquiryForData.freightBooking.portOfLoading}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "freightBooking")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Discharge :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfDischarge"
                              //   value={
                              //     enquiryForData.freightBooking.portOfDischarge
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "freightBooking")
                              //   }
                            />
                          </div>
                          {/* <div className="checkbox-inner-single-div">
                            <label>Type of Container</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfContainer"
                              value={enquiryForData.freightBooking.typeOfContainer}
                              onChange={(e) =>
                                handleEnquiryForInputChange(e, "freightBooking")
                              }
                            >
                              <option>Select</option>
      
                              <option>20'</option>
                              <option>40'</option>
                              <option>20' ISO Tank</option>
                              <option>40' ISO Tank</option>
                              <option>LCL</option>
                              <option>Flat Bulk</option>
                              <option>Break Bulk</option>
                            </select>
                          </div> */}

                          <div className="checkbox-inner-single-div">
                            <label>Type of Delivery :</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfDelivery"
                              //   value={enquiryForData.freightBooking.typeOfDelivery}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "freightBooking")
                              //   }
                            >
                              <option>Select</option>
                              <option>Loaded</option>
                              <option>Destuff</option>
                            </select>
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Type of Container :</label>
                            {/* <CustomSelect
                                  className="Custom-MultiSelect"
                                //   options={containerTypeOptions}
                                //   value={selectedContainerTypes.freightBooking}
                                //   onChange={(selectedOptions) =>
                                //     handleContainerTypeChange(
                                //       selectedOptions,
                                //       "freightBooking"
                                //     )
                                //   }
                                /> */}
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label for="Delivery Mode">
                              No. of Container :
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="numberOfContainer"
                              //   onChange={handleChange}
                            />
                          </div>
                          {/* {enquiryForData.freightBooking.typeOfContainer ===
                                "LCL" && (
                                <>
                                  <div className="checkbox-inner-single-div">
                                    <label>Height :</label>
                                    <input
                                      type="text"
                                      // placeholder="Enter Height"
                                      className="clearance-fields-text-box"
                                      name="height"
                                      // value={enquiryForData.freightBooking.height}
                                      // onChange={(e) => handleEnquiryForInputChange(e, "freightBooking")}
                                    />
                                  </div>
                                  <div className="checkbox-inner-single-div">
                                    <label>Length :</label>
                                    <input
                                      type="text"
                                      // placeholder="Enter Length"
                                      className="clearance-fields-text-box"
                                      name="length"
                                      // value={enquiryForData.freightBooking.length}
                                      // onChange={(e) => handleEnquiryForInputChange(e, "freightBooking")}
                                    />
                                  </div>
                                </>
                              )} */}
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </motion.div>
                )}
                {isshown === "Transportation" && (
                  <motion.div
                    initial={{ opacity: 0 }} // Starts faded & moves up
                    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
                    exit={{ opacity: 0 }} // Fades out & moves up
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                  >
                    <div>
                      <div>
                        <h3>Transportation</h3>
                        <div className={`transportation-fields`}>
                          <div className="checkbox-inner-single-div">
                            <label>Weight :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="weight"
                              //   value={enquiryForData.transportation.weight}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "transportation")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Commodity :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="commodity"
                              //   value={enquiryForData.transportation.commodity}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "transportation")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Loading :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfLoading"
                              //   value={enquiryForData.transportation.portOfLoading}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "transportation")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Discharge :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfDischarge"
                              //   value={
                              //     enquiryForData.transportation.portOfDischarge
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "transportation")
                              //   }
                            />
                          </div>
                          {/* <div className="checkbox-inner-single-div">
                            <label>Type of Container</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfContainer"
                              value={enquiryForData.transportation.typeOfContainer}
                              onChange={(e) =>
                                handleEnquiryForInputChange(e, "transportation")
                              }
                            >
                              <option>Select</option>
      
                              <option>20'</option>
                              <option>40'</option>
                              <option>20' ISO Tank</option>
                              <option>40' ISO Tank</option>
                              <option>LCL</option>
                              <option>Break Bulk</option>
                            </select>
                          </div> */}
                          <div className="checkbox-inner-single-div">
                            <label>Type of Delivery :</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfDelivery"
                              //   value={enquiryForData.transportation.typeOfDelivery}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "transportation")
                              //   }
                            >
                              <option>Select</option>
                              <option>Loaded</option>
                              <option>Destuff</option>
                            </select>
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Type of Container :</label>
                            {/* <CustomSelect
                                  className="Custom-MultiSelect"
                                //   options={containerTypeOptions}
                                //   value={selectedContainerTypes.transportation}
                                //   onChange={(selectedOptions) =>
                                //     handleContainerTypeChange(
                                //       selectedOptions,
                                //       "transportation"
                                //     )
                                //   }
                                /> */}
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label for="Delivery Mode">
                              No. of Container :
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="numberOfContainer"
                              //   onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isshown === "Exim Consultancy" && (
                  <motion.div
                    initial={{ opacity: 0 }} // Starts faded & moves up
                    animate={{ opacity: 1, y: 0 }} // Becomes fully visible
                    exit={{ opacity: 0 }} // Fades out & moves up
                    transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                  >
                    <div>
                      <div>
                        <h3>Exim Consultancy</h3>
                        <div className={`exim-consultancy-fields`}>
                          <div className="checkbox-inner-single-div">
                            <label>Weight :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="weight"
                              //   value={enquiryForData.eximConsultancy.weight}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "eximConsultancy")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Commodity :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="commodity"
                              //   value={enquiryForData.eximConsultancy.commodity}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "eximConsultancy")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Loading :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfLoading"
                              //   value={enquiryForData.eximConsultancy.portOfLoading}
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "eximConsultancy")
                              //   }
                            />
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Port of Discharge :</label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="portOfDischarge"
                              //   value={
                              //     enquiryForData.eximConsultancy.portOfDischarge
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "eximConsultancy")
                              //   }
                            />
                          </div>
                          {/* <div className="checkbox-inner-single-div">
                            <label>Type of Container</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfContainer"
                              value={enquiryForData.transportation.typeOfContainer}
                              onChange={(e) =>
                                handleEnquiryForInputChange(e, "transportation")
                              }
                            >
                              <option>Select</option>
      
                              <option>20'</option>
                              <option>40'</option>
                              <option>20' ISO Tank</option>
                              <option>40' ISO Tank</option>
                              <option>LCL</option>
                              <option>Break Bulk</option>
                            </select>
                          </div> */}
                          <div className="checkbox-inner-single-div">
                            <label>Type of Delivery :</label>
                            <select
                              className="clearance-fields-text-box"
                              name="typeOfDelivery"
                              //   value={
                              //     enquiryForData.eximConsultancy.typeOfDelivery
                              //   }
                              //   onChange={(e) =>
                              //     handleEnquiryForInputChange(e, "eximConsultancy")
                              //   }
                            >
                              <option>Select</option>
                              <option>Loaded</option>
                              <option>Destuff</option>
                            </select>
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label>Type of Container :</label>
                            {/* <CustomSelect
                                  className="Custom-MultiSelect"
                                //   options={containerTypeOptions}
                                //   value={selectedContainerTypes.eximConsultancy}
                                //   onChange={(selectedOptions) =>
                                //     handleContainerTypeChange(
                                //       selectedOptions,
                                //       "eximConsultancy"
                                //     )
                                //   }
                                /> */}
                          </div>
                          <div className="checkbox-inner-single-div">
                            <label for="Delivery Mode">
                              No. of Container :
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="clearance-fields-text-box"
                              name="numberOfContainer"
                              //   onChange={handleChange}
                            />
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <motion.div
              key={isshown} // Forces re-render when `isshown` changes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="prospect-job-grid-container-secondary">
                <div className="grid-equalizer-1">
                  <label
                    htmlFor="contactPersonNo"
                    className="prospect-RFQ-label"
                  >
                    Request For Quote (RFQ) Reason :
                  </label>
                  <textarea
                    type="text"
                    placeholder=""
                    className="prospect-job-textarea"
                    name="rfq"
                  ></textarea>
                </div>
              </div>
            </motion.div>
          </CCardBody>
        </CCard>

        <div style={{display:"flex", justifyContent:"space-between"}}>

        <div style={{ display: "flex", gap: "4px" }}>
            <div className="prospect-search-button">
              <button className="button-23">Save</button>
            </div>
            <div className="prospect-search-button">
              <button className="button-23">Save & New</button>
            </div>
            <div className="prospect-search-button">
              <button className="button-23">Save & Close</button>
            </div>
            <div className="prospect-search-button">
              <button className="button-23">Close</button>
            </div>
          </div>
          <div className="prospect-search-button">
            <button className="button-23">Generate Quotation</button>
          </div>
         
        </div>
      </motion.div>
    </div>
  );
}

export default QuoEdit;
