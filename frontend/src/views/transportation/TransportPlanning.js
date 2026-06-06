import {
  CCard,
  CForm,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./css/transportation-styles.css";

function TransportPlanning() {
  const [isOwnTransportModalOpen, setIsOwnTransportModalOpen] = useState(false);
  const [pickupDate, setpickupDate] = useState(new Date());
  return (
    <div>
      <CCard className="card-search-padding-set">
        <div>
          <label className="label-width-planning-search">Date</label>
          <input></input>
        </div>
        <div>
          <label className="label-width-planning-search">Reference No. </label>
          <input></input>
        </div>
        <div>
          <label className="label-width-planning-search">Planning Date </label>
          <input></input>
        </div>
      </CCard>

      <CForm className="form-import">
        <CTable hover borderless striped className="table-import">
          <CTableHead className="head-import">
            <CTableRow color="dark">
              <CTableHeaderCell
                scope="col"
                className="row-font"
              ></CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                className="row-font"
              ></CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Date
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Reference
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Shipment Type
              </CTableHeaderCell>

              <CTableHeaderCell scope="col" className="row-font">
                Total No. of Containers
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="row-font">
                Pickup Date
              </CTableHeaderCell>
              <CTableHeaderCell
                scope="col"
                className="row-font"
              ></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <th
                scope="row"
                className="font-small text-gray-900 whitespace-nowrapark:text d-white"
              >
                <Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                  </svg>
                </Link>
              </th>

              <th
                scope="row"
                className="font-small text-gray-900 whitespace-nowrapark:text d-white"
              >
                <Link>
                  <svg
                    fill="#000000"
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 493.456 493.456"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path d="M246.73,0C110.682,0,0.002,110.684,0.002,246.744c0,136.032,110.68,246.712,246.728,246.712 s246.724-110.68,246.724-246.712C493.454,110.684,382.778,0,246.73,0z M360.258,348.776l-11.112,11.12 c-2.808,2.836-7.82,2.836-10.644,0l-88.68-88.672c-0.728-0.74-1.704-1.136-2.732-1.136c-1.028,0-2.004,0.4-2.732,1.136 L155.682,359.9c-2.82,2.836-7.828,2.836-10.648,0l-11.108-11.12c-1.412-1.404-2.196-3.304-2.196-5.3 c0-2.02,0.784-3.916,2.196-5.344l88.68-88.672c1.508-1.512,1.508-3.948,0-5.452l-88.68-88.68c-1.412-1.416-2.196-3.308-2.196-5.32 c0-2.02,0.784-3.916,2.196-5.328l11.108-11.108c2.82-2.82,7.828-2.82,10.648,0l88.68,88.672c1.444,1.444,4.016,1.444,5.46,0 l88.676-88.676c2.824-2.824,7.836-2.824,10.644,0l11.112,11.112c2.928,2.924,2.928,7.716,0,10.648l-88.692,88.676 c-1.504,1.504-1.504,3.94,0,5.452l88.696,88.672C363.186,341.072,363.186,345.844,360.258,348.776z"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </Link>
              </th>

              <CTableDataCell className="row-font"></CTableDataCell>
              <CTableDataCell className="row-font"></CTableDataCell>

              <CTableDataCell className="row-font"></CTableDataCell>

              <CTableDataCell className="row-font"></CTableDataCell>

              <CTableDataCell className="row-font"></CTableDataCell>
              <CTableDataCell className="row-font">
                <CButton
                  color="info"
                  className="btn-sm  text-white"
                  onClick={() => setIsOwnTransportModalOpen(true)}
                >
                  Show More
                </CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CForm>
      <CModal
        scrollable
        visible={isOwnTransportModalOpen} // Control visibility with state
        onClose={() => setIsOwnTransportModalOpen(false)} // Close modal on backdrop click or close button
      >
        <CModalHeader closeButton>
          <CModalTitle>Own Transportation Details</CModalTitle>
        </CModalHeader>
        <CModalBody className="modal-inner-fields-alignment">
          <div>
            <label className="label-width-planning-search my-2">From</label>
            <input type="text" />
          </div>

          <div>
            <label className="label-width-planning-search my-2">To</label>
            <input type="text" />
          </div>

          <div>
            <label className="label-width-planning-search my-2">
              No. of Containers
            </label>
            <input type="text" />
          </div>

          <CTable className="transport-planning-modal-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Container No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Weight</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>1</CTableDataCell>
                <CTableDataCell>48 ton</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>2</CTableDataCell>
                <CTableDataCell>26 ton</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <div>
            <label className="label-width-planning-search my-2">
              Pickup Date
            </label>
            {/* <input type="date" /> */}
            <DatePicker
            // className="pickupDate-css-fix"
            //   showIcon
              selected={pickupDate}
              onChange={(date) => setpickupDate(date)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                >
                  <mask id="ipSApplication0">
                    <g
                      fill="none"
                      stroke="#fff"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    >
                      <path
                        strokeLinecap="round"
                        d="M40.04 22v20h-32V22"
                      ></path>
                      <path
                        fill="#fff"
                        d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                      ></path>
                    </g>
                  </mask>
                  <path
                    fill="currentColor"
                    d="M0 0h48v48H0z"
                    mask="url(#ipSApplication0)"
                  ></path>
                </svg>
              }
            />
          </div>

          <div>
            <label className="label-width-planning-search my-2">
              Vehicle Status
            </label>
            <input type="radio" name="fav_language" value="Yes" />
            <label>Yes</label>
            <input type="radio" name="fav_language" value="No" />
            <label>No</label>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsOwnTransportModalOpen(false)}
          >
            Close
          </CButton>
          <CButton color="primary">Save</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default TransportPlanning;
