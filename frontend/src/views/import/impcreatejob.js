import React, { useEffect } from 'react'
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
import { Quotation } from './Innerpage'
import axios from 'axios';
import toast from 'react-hot-toast'
// import { General, Registration } from './Innerpage';



const impcreatejob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();


  // const checkUsername = localStorage.getItem('username');
  const [showQuotation, setshowQuotation] = useState(false);
  // let getRole = '';

  // if (checkUsername && checkUsername.includes('@')) {
  //   getRole = checkUsername.split('@')[1];

  //   if (getRole === 'sales') {
  //     setshowQuotation(true);
  //   }
  // }


  // const [showAll, setshowAll] = useState(false);
  const currentdateandtime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const [JobformData, setJobFormData] = useState({
    jobDate: currentdateandtime,
    docReceivedOn: '',
    transportMode: '',
    customHouse: '',
    ownBooking: '',
    deliveryMode: '',
    numberOfContainer: '',
    ownTransportation: '',
    beType: '',
    consignmentType: '',
    cfsName: '',
    shippingLineName: '',
    blType: '',
    bltypenumber: '',
    blstatus: '',
    freedays: ''
  });



  useEffect(() => {
    const checkUsername = localStorage.getItem('username');
    let getRole = '';
    if (checkUsername === 'admin') {
      setshowQuotation(true);
    }
    if (checkUsername && checkUsername.includes('@')) {
      getRole = checkUsername.split('@')[1];
      if (getRole === 'sales') {
        setshowQuotation(true);
      }
    }
  }, []);


  const handleDropdownChange = (name, value) => {
    setJobFormData({
      ...JobformData,
      [name]: value
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobFormData({
      ...JobformData,
      [name]: value
    });
  };



  async function storeJob() {
    try {

      const username = localStorage.getItem('username');
      const nameoforg = localStorage.getItem('orgname');
      const codeoforg = localStorage.getItem('orgcode');
      const response = await axios.post('http://localhost:5000/storeJob', { ...JobformData, jobOwner: username, orgname: nameoforg, orgcode: codeoforg });
      if (response.status === 200) {
        toast.success('Job created successfully.');

        const idofcol = response.data[0].id;
        const sendupdate = await axios.put('http://localhost:5000/updateId', { jobno: idofcol, transportMode: JobformData.transportMode })
        localStorage.setItem('jobNumber', sendupdate.data)
      }
    } catch (error) {
      console.log(error);
    }
  }






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
                <input type="text" placeholder="" className='text-field-4' readOnly />
              </div>
              <div>
                <label for="Job Date" className='text-field-3'>Job Date</label>
                <input type="text" placeholder="" className='text-field-4' name='jobDate' value={JobformData.jobDate} readOnly />
              </div>
              <div>
                <label for="Doc. Received On Date" className='text-field-3'>Doc. Received On</label>
                <input type="datetime-local" placeholder="" className='text-field-4' name='docReceivedOn' onChange={handleChange} value={JobformData.docReceivedOn} />
              </div>
              <div>
                <label for="Transport Mode" className='text-field-3'>Transport Mode</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.transportMode ? JobformData.transportMode : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('transportMode', 'Air')}>Air</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('transportMode', 'Sea')}>Sea</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="Custom House" className='text-field-3'>Custom House</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.customHouse ? JobformData.customHouse : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4 overflow-y-scroll custom-house-dropdown
                  ">
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Mumbai Sea')}>Mumbai Sea</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Kolkata Sea')}>Kolkata Sea</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Raxaul LCS')}>Raxaul LCS</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Jogbani LCS')}>Jogbani LCS</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Sonauli LCS')}>Sonauli LCS</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Pipavav Victor Port')}>Pipavav (Victor) Port</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Hazira')}>Hazira</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'ICD Tumb')}>ICD Tumb</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Mundra Sea')}>Mundra Sea</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Nhava Sea')}>Nhava Sea</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Vadodra ICD')}>Vadodra ICD</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('customHouse', 'Valvada ICD')}>Valvada ICD</CDropdownItem>
                    {/* <CButton onClick={}>Add Custom House</CButton> */}
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="Job Owner" className='text-field-3'>Job Owner</label>
                <input type="text" placeholder="" className='text-field-4' readOnly />
              </div>
              <div>
                <label for="Delivery Mode" className='text-field-3'>Own Booking</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.ownBooking ? JobformData.ownBooking : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('ownBooking', 'Yes')}>Yes</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('ownBooking', 'No')}>No</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="Delivery Mode" className='text-field-3'>Delivery Mode</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.deliveryMode ? JobformData.deliveryMode : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('deliveryMode', 'Loaded')}>Loaded</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('deliveryMode', 'Destuff')}>Destuff</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="Delivery Mode" className='text-field-3'>No. of Container</label>
                <input type="text" placeholder="" className='text-field-4' name='numberOfContainer' onChange={handleChange} value={JobformData.numberOfContainer} />

              </div>
              <div>
                <label for="BE Type" className='text-field-3'>Own Transportation</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.ownTransportation ? JobformData.ownTransportation : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('ownTransportation', 'Yes')}>Yes</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('ownTransportation', 'No')}>No</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="BE Type" className='text-field-3'>BE Type</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.beType ? JobformData.beType : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('beType', 'Home')}>Home</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('beType', 'In-Bond')}>In-Bond</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('beType', 'Ex-Bond')}>Ex-Bond</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('beType', 'SEZ-Z')}>SEZ-Z</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('beType', 'SEZ-M')}>SEZ-M</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('beType', 'SEZ-T')}>SEZ-T</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="Consignment Type" className='text-field-3'>Consignment Type</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.consignmentType ? JobformData.consignmentType : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('consignmentType', 'FCL')}>FCL</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('consignmentType', 'LCL')}>LCL</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('consignmentType', 'Break Bulk')}>Break Bulk</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="CFS Name" className='text-field-3'>CFS Name</label>
                <input type="text" placeholder="" className='text-field-4' name='cfsName' value={JobformData.cfsName} onChange={handleChange} />
              </div>
              <div>
                <label for="Shipping Line Name" className='text-field-3'>Shipping Line Name</label>
                <input type="text" placeholder="" className='text-field-4' name='shippingLineName' onChange={handleChange} value={JobformData.shippingLineName} />
              </div>
              <div>
                <label for="Free Days" className='text-field-3'>Free Days</label>
                <input type="text" placeholder="" className='text-field-4' name='freedays' onChange={handleChange} value={JobformData.freedays} />
              </div>
              <div>
                {/* <label for="Delivery Mode" className='text-field-3'></label> */}
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.blType ? JobformData.blType : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('blType', 'HBL/MBL')}>HBL/MBL</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('blType', 'HAWB/MAWB')}>HAWB/MAWB</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <input type="text" placeholder="" className='text-field-4' name='bltypenumber' value={JobformData.bltypenumber} onChange={handleChange} />
              </div>
              <div>
                <label for="Free Days" className='text-field-3'>BL Status</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.blstatus ? JobformData.blstatus : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('blstatus', 'Surrender')}>Surrender</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('blstatus', 'Original')}>Original</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <CButton color="primary" type="submit" onClick={storeJob}>Create Job</CButton>
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
          <CNavLink onClick={() => { setIsShown("d2c") }}>Transport</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("Collection") }}>Collection</CNavLink>
        </CNavItem>
        <CNavItem>
          {showQuotation && (
            <CNavLink onClick={() => { setIsShown("Quotation") }}>Quotation</CNavLink>
          )}
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
      {isshown === "Quotation" && <Quotation />}
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
