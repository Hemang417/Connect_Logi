import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  CFooter,
} from "@coreui/react";
import "../css/quotation.css";
import "../css/sales.css";
import DeleteBtn from "src/views/buttons/buttons/DeleteBtn";
import RefreshBtn from "src/views/buttons/buttons/RefreshBtn";
import DownlodBtn from "src/views/buttons/buttons/DownlodBtn";

function Quotation() {

    const [referenceNo, setReferenceNo] = useState("")
    const [referenceDate, setReferenceDate] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [enquiryFor, setEnquiryFor] = useState("")
    const [ServiceType, setServiceType] = useState("")


  const handleRowDoubleClick = () => {
    window.open("/#/QuoEdit", "_blank");
  };

  return (
    <div>
      <CCardBody className="top-btn">
        <div className="refreshjob-button">
          <Link>
            <RefreshBtn />
          </Link>
        </div>
        <div className="createjob-button ">
          <Link>
            <DownlodBtn />
          </Link>
        </div>
      </CCardBody>

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
                  onChange={(e)=>{setReferenceDate(e)}}
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
                  onChange={(e)=>{setReferenceNo(e.target.value)}}
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
                  onChange={(e)=>{setCustomerName(e.target.value)}}
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
                  onChange={(e)=>{setEnquiryFor(e.target.value)}}
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
                  onChange={(e)=>{setServiceType(e.target.value)}}
                  className="job-text-field-4"
                />
              </div>
            </div>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <CForm className="form-quotation">
              <table className="table-quo-ref">
                <thead>
                  <tr className="head-quo-ref">
                    <th className="row-font">Quotation Date</th>
                    <th className="row-font  ">Reference no.</th>
                    <th className="row-font  ">Customer Name</th>
                    <th className="row-font  ">Enquiry For</th>
                    <th className="row-font  ">Service Type</th>
                    <th className="row-font  ">Status</th>
                    <th className="row-font  ">Action Buttons</th>
                  </tr>
                </thead>
                <tbody className="body-quo-ref">
                  <tr
                    onDoubleClick={() => {
                      handleRowDoubleClick();
                    }}
                  >
                    <td className=" td-quo-ref">14-11-2024	</td>
                    <td className=" td-quo-ref">	527390606904</td>
                    <td className=" td-quo-ref">	tesla</td>
                    <td className=" td-quo-ref">Import Clearance, Freight Booking, Transportation</td>
                    <td className=" td-quo-ref">s</td>
                    <td className=" td-quo-ref">pending</td>
                    <td className=" td-quo-ref">
                      <DeleteBtn />
                    </td>
                  </tr>
                </tbody >
                {/* <tbody className="body-imp-ref">
                      {currentItems &&
                        currentItems.map((job, index) => {
                          const isDeleted = job.IsDeleted === 1;
                          const isSelected = selectedRowIndex === index;

                          return (
                            <tr
                              key={index}
                              onDoubleClick={() =>
                                !isDeleted && handleRowDoubleClick(index)
                              }
                              onClick={() =>
                                !isDeleted && setSelectedRowIndex(index)
                              }
                              className={`selected-row ${
                                isDeleted
                                  ? "deleted-selected"
                                  : isSelected
                                  ? "primary-selected"
                                  : ""
                              }`}
                              style={
                                isDeleted
                                  ? {
                                      backgroundColor: "#f8d7da",
                                      cursor: "not-allowed",
                                    }
                                  : {}
                              }
                            >
                              <td className="td-imp-ref">
                                {moment(job.jobdate).format("DD/MM/YYYY")}
                              </td>
                              <td className=" td-imp-ref">{job.jobnumber}</td>
                              <td className=" td-imp-ref">
                                {moment(job.docreceivedon).format(
                                  "DD/MM/YYYY : LT"
                                )}
                              </td>
                              <td className=" td-imp-ref">
                                {job.importername}
                              </td>
                              <td className=" td-imp-ref">{job.ownbooking}</td>
                              <td className=" td-imp-ref">
                                {job.bltype === "HBL/HAWB"
                                  ? job.bltypenum
                                  : "-"}
                              </td>
                              <td className=" td-imp-ref">
                                {job.bltype === "MBL/MAWB"
                                  ? job.bltypenum
                                  : "-"}
                              </td>
                              <td className=" td-imp-ref">{job.blstatus}</td>
                              <td className=" td-imp-ref">
                                {job.owntransportation}
                              </td>
                              <td className=" td-imp-ref">
                                <Link
                                  color="info"
                                  className="ShowMoreBtn"
                                  onClick={(e) => openModal(e, index)}
                                >
                                  Show More
                                </Link>
                              </td>
                              <td className=" td-imp-ref">
                                {job.deliverymode}
                              </td>
                              <td className=" td-imp-ref">
                                {job.IsDeleted === 1
                                  ? "Deleted"
                                  : job.IsActive === 0
                                  ? "Active"
                                  : "Inactive"}
                              </td>
                              <td className="td-imp-ref  delete-hover-color">
                                <Link
                                  onClick={(e) =>
                                    !isDeleted && handledeleteOpen(e, index)
                                  }
                                  style={
                                    isDeleted
                                      ? {
                                          backgroundColor: "#f8d7da",
                                          cursor: "not-allowed",
                                        }
                                      : {}
                                  }
                                >
                                  <DeleteBtn />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody> */}
              </table>
            </CForm>
          </CCardBody>
        </CCard>
      </motion.div>
    </div>
  );
}

export default Quotation;
