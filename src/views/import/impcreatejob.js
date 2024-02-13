import React from 'react'
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
  CNavItem,
  CNav,
  CNavLink
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { General } from './Innerpage';
import { O2D } from './Innerpage';
import { DoNDelivery } from './Innerpage';
import { D2C } from './Innerpage'
import { DocumentUpload } from './Innerpage';
import { Collection } from './Innerpage';
import { Transactionhistory } from './Innerpage'
// import { General, Registration } from './Innerpage';


const impcreatejob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  // const [isActive, setActive] = useState("false");
  const [isshown, setIsShown] = useState("general");
  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <div className='grid-container'>
              <div>
                <label for="Job No." className='text-field-3'>Job No.</label>
                <input type="text" placeholder="" className='text-field-4' />
              </div>
              <div>
                <label for="Job Date" className='text-field-3'>Job Date</label>
                <input type="date" placeholder="" className='text-field-4' />
              </div>
              <div>
                <label for="Doc. Received On Date" className='text-field-3'>Doc. Received On</label>
                <input type="datetime-local" placeholder="" className='text-field-4' />
              </div>
              <div>
                <label for="Transport Mode" className='text-field-3'>Transport Mode</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Air</CDropdownItem>
                                <CDropdownItem href="#">Sea</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
              </div>
              <div>
                <label for="Custom House" className='text-field-3'>Custom House</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Mumbai Sea</CDropdownItem>
                                <CDropdownItem href="#">Kolkata Sea</CDropdownItem>
                                <CDropdownItem href="#">Raxaul LCS</CDropdownItem>
                                <CDropdownItem href="#">Jogbani LCS</CDropdownItem>
                                <CDropdownItem href="#">Sonauli LCS</CDropdownItem>
                                <CDropdownItem href="#">Pipavav (Victor) Port</CDropdownItem>
                                <CDropdownItem href="#">Hazira</CDropdownItem>
                                <CDropdownItem href="#">ICD Tumb</CDropdownItem>
                                <CDropdownItem href="#">Mundra Sea</CDropdownItem>
                                <CDropdownItem href="#">Nhava Sea</CDropdownItem>
                                <CDropdownItem href="#">Vadodra ICD</CDropdownItem>
                                <CDropdownItem href="#">Valvada ICD</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
              </div>
              <div>
                <label for="Job Owner" className='text-field-3'>Job Owner</label>
                <input type="text" placeholder="" className='text-field-4' />
              </div>
              <div>
                <label for="Delivery Mode" className='text-field-3'>Delivery Mode</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Loaded</CDropdownItem>
                                <CDropdownItem href="#">Destuff</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
              </div>
              <div>
                <label for="BE Type" className='text-field-3'>BE Type</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Home</CDropdownItem>
                                <CDropdownItem href="#">In-Bond</CDropdownItem>
                                <CDropdownItem href="#">Ex-Bond</CDropdownItem>
                                <CDropdownItem href="#">SEZ-Z</CDropdownItem>
                                <CDropdownItem href="#">SEZ-M</CDropdownItem>
                                <CDropdownItem href="#">SEZ-T</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
              </div>
              <div>
                <label for="Consignment Type" className='text-field-3'>Consignment Type</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">FCL</CDropdownItem>
                                <CDropdownItem href="#">LCL</CDropdownItem>
                                <CDropdownItem href="#">Break Bulk</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
              </div>
              <div>
                <label for="CFS Name" className='text-field-3'>CFS Name</label>
                <input type="text" placeholder="" className='text-field-4' />
              </div>
              <div>
                <label for="Shipping Line Name" className='text-field-3'>Shipping Line Name</label>
                <input type="text" placeholder="" className='text-field-4' />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CNav variant="tabs" className='nav-link-text'>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("general") }}>General</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("o2d") }}>O2D</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("DoNDelivery") }}>Do & Delivery</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("d2c") }}>Delivery to Disptach</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("Collection") }}>Collection</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("registration") }}>Quotation</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("documentupload") }}>Documents Upload</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("Transactionhistory") }}>Transaction History</CNavLink>
        </CNavItem>
        {/* <CNavItem>
  <CNavLink href="#">Link</CNavLink>
</CNavItem> */}
        {/* <CNavItem>
  <CNavLink href="#" disabled>
    Disabled
  </CNavLink>
</CNavItem> */}
      </CNav>
      {isshown === "general" && <General />}
      {isshown === "o2d" && <O2D />}
      {isshown === "DoNDelivery" && <DoNDelivery />}
      {isshown === "d2c" && <D2C />}
      {isshown === "documentupload" && <DocumentUpload />}
      {isshown === "Collection" && <Collection />}
      {isshown === "Transactionhistory" && <Transactionhistory />}
        {/* {isshown === "registration" && <Registration />} */}
      {/* <General /> */}
      {/* <Registration /> */}
      <div className='all-buttons'>
                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Save
                    </CButton>
                </div>

                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Save & Close
                    </CButton>
                </div>

                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Save & New
                    </CButton>
                </div>

                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Close
                    </CButton>
                </div>
            </div>
    </div>
  )
}

export default impcreatejob;
