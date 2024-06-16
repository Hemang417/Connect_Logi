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
  CNavLink,
  CPopover
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
import moment from 'moment';
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

  // const dates = new Date();
  // const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
  //         date.getUTCDate(), date.getUTCHours(),
  //         date.getUTCMinutes(), date.getUTCSeconds());

  // console.log(new Date(now_utc));
  // console.log(date.toISOString());

  // var isoDateString = new Date().toISOString();
  // console.log(isoDateString);



  const currentdateandtime = moment().format('YYYY-MM-DDTHH:mm');

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
    freedays: '',
    benumber: '',
    shippinglinebond: ''
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
      const branchnameoftheorg = localStorage.getItem('branchnameofemp');
      const branchcodeoftheorg = localStorage.getItem('branchcodeofemp');
      const currentDate = new Date();
      const dateinformat = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')
      const response = await axios.post('http://localhost:5000/storeJob', { ...JobformData, jobOwner: username, orgname: nameoforg, orgcode: codeoforg, jobDate: currentdateandtime, branchname: branchnameoftheorg, branchcode: branchcodeoftheorg, currentdate: dateinformat });

      if (response.status === 200) {
        toast.success('Job created successfully.');
        const idofcol = response.data[0].id;
        let countofrow = response.data[0].count;
        const sendupdate = await axios.put('http://localhost:5000/updateId', { jobno: idofcol, transportMode: JobformData.transportMode, count: countofrow, branchname: branchnameoftheorg, branchcode: branchcodeoftheorg, orgname: nameoforg, orgcode: codeoforg });
        localStorage.setItem('jobNumber', sendupdate.data.jobNumberlatest);
        localStorage.setItem('jobDate', sendupdate.data.jobDaterow[0].jobdate);
      }
    } catch (error) {
      console.log(error);
      toast.error('Job creation failed')
    }
  }





  const [prefillData, setPrefillData] = useState(null);
  // const [isActive, setActive] = useState("false");
  const [isshown, setIsShown] = useState("general");

  const fetchDataForO2D = async () => {
    try {
      const jobNumber = localStorage.getItem('jobNumber');
      const response = await axios.get('http://localhost:5000/prefillCreateJob', { params: { jobnumber: jobNumber } });

      setPrefillData(response.data[0]);
      // Set the prefill data here, you might want to set it in the state to render it in the O2D component
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {

    // Check if the shown component is "o2d" and localStorage has the flag set
    if (isshown === "o2d") {
      fetchDataForO2D(); // Fetch data for prefilling
      // localStorage.removeItem('onO2D'); 
    }


  }, [isshown]);


  useEffect(() => {
    if (localStorage.getItem('onEdit') === 'true') {
      fetchDataForO2D();
    }
  }, [])



  useEffect(() => {
    // Set prefill data in the form fields
    if (prefillData) {
      setJobFormData({
        jobDate: moment(prefillData.jobdate).format('YYYY-MM-DDTHH:mm'),
        docReceivedOn: moment(prefillData.docreceivedon).format('YYYY-MM-DDTHH:mm'),
        transportMode: prefillData.transportmode,
        customHouse: prefillData.customhouse,
        ownBooking: prefillData.ownbooking,
        deliveryMode: prefillData.deliverymode,
        numberOfContainer: prefillData.noofcontainer,
        ownTransportation: prefillData.owntransportation,
        beType: prefillData.betype,
        consignmentType: prefillData.consignmenttype,
        cfsName: prefillData.cfsname,
        shippingLineName: prefillData.shippinglinename,
        blType: prefillData.bltype,
        bltypenumber: prefillData.bltypenum,
        blstatus: prefillData.blstatus,
        freedays: prefillData.freedays,
        benumber: prefillData.benumber,
        shippinglinebond: prefillData.shippinglinebond
      });
    }
  }, [prefillData]);



  async function updateJob() {
    try {
      const jobNumber = localStorage.getItem('jobNumber');
      const response = await axios.put(`http://localhost:5000/updateJob`, {
        jobData: JobformData,
        jobnumber: jobNumber
      });
      if (response.status === 200) {
        toast.success('Job updated successfully.');
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }


  async function handlesave() {
    const getApprovers = await axios.get('http://localhost:5000/getApprovernamesfororg', {
      params: {
        orgname: localStorage.getItem('orgname'),
        orgcode: localStorage.getItem('orgcode'),
        unique: localStorage.getItem('uniquevalue')
      }
    })
  }



  // useEffect(() => {
  //   if (isshown === "general") {
  //     setPrefillData(null);
  //     setJobFormData({
  //       jobDate: '',
  //       docReceivedOn: '',
  //       transportMode: '',
  //       customHouse: '',
  //       ownBooking: '',
  //       deliveryMode: '',
  //       numberOfContainer: '',
  //       ownTransportation: '',
  //       beType: '',
  //       consignmentType: '',
  //       cfsName: '',
  //       shippingLineName: '',
  //       blType: '',
  //       bltypenumber: '',
  //       blstatus: '',
  //       freedays: ''
  //     })
  //   }
  // }, [isshown]);


  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <div className='grid-container'>
              <div>
                <label for="Job No." className='text-field-3'>Job No.</label>
                <input type="text" placeholder="" className='text-field-4' readOnly value={localStorage.getItem('jobNumber') ? localStorage.getItem('jobNumber') : ''} />
              </div>
              <div>
                <label for="Job Date" className='text-field-3'>Job Date</label>
                <input type="datetime-local" placeholder="" className='text-field-4' name='jobDate' value={JobformData.jobDate ? JobformData.jobDate : currentdateandtime} readOnly />
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
                <input type="text" placeholder="" className='text-field-4' readOnly value={localStorage.getItem('username') ? localStorage.getItem('username') : ''} />
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
                <label for="BE Number" className='text-field-3'>BE No.</label>
                <input type="text" placeholder="" className='text-field-4' name='benumber' onChange={handleChange} value={JobformData.benumber} />
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
                <label for="Delivery Mode" className='text-field-3'>Shipping Line Bond</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.shippinglinebond ? JobformData.shippinglinebond : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('shippinglinebond', 'Yearly')}>Yearly</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('shippinglinebond', 'OneTime')}>One-Time</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label for="Free Days" className='text-field-3'>Free Days</label>
                <input type="text" placeholder="" className='text-field-4' name='freedays' onChange={handleChange} value={JobformData.freedays} />
              </div>

              <div>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{JobformData.blType ? JobformData.blType : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleDropdownChange('blType', 'HBL/HAWB')}>HBL/HAWB</CDropdownItem>
                    <CDropdownItem onClick={() => handleDropdownChange('blType', 'MBL/MAWB')}>MBL/MAWB</CDropdownItem>
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



                {localStorage.getItem('onEdit') === 'true' ?
                  <CPopover content="Update Job Details" trigger={['hover', 'focus']}>
                    <CButton color="primary" type="submit" onClick={updateJob}>
                      Update Job
                    </CButton>
                  </CPopover>
                  :
                  <CPopover content="Create New Job" trigger={['hover', 'focus']}>
                    <CButton color="primary" type="submit" onClick={storeJob}>
                      Create Job
                    </CButton>
                  </CPopover>
                }


              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>


      {/* <CNav variant="tabs" className='nav-link-text'>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("general") }}>General</CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink onClick={() => { setIsShown("DoNDelivery") }}>Tracking</CNavLink>
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

      </CNav> */}

      <CNav variant="tabs" className='nav-link-text userlist-cnav-cusros'>
        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'general' ? 'active' : ''}`} onClick={() => setIsShown('general')}>General</CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'DoNDelivery' ? 'active' : ''}`} onClick={() => setIsShown('DoNDelivery')}>Tracking</CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'documentupload' ? 'active' : ''}`} onClick={() => setIsShown('documentupload')}>Document Upload</CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'Collection' ? 'active' : ''}`} onClick={() => setIsShown('Collection')}>Collection</CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'Transactionhistory' ? 'active' : ''}`} onClick={() => setIsShown('Transactionhistory')}>Transaction History</CNavLink>
        </CNavItem>
        {showQuotation && (
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Quotation' ? 'active' : ''}`} onClick={() => setIsShown('Quotation')}>Quotation</CNavLink>
          </CNavItem>
        )}
      </CNav>




      {isshown === "general" && <General />}
      {/* {isshown === "o2d" && <O2D />} */}
      {isshown === "DoNDelivery" && <DoNDelivery />}
      {/* {isshown === "d2c" && <D2C />} */}
      {isshown === "documentupload" && <DocumentUpload />}
      {isshown === "Collection" && <Collection />}
      {isshown === "Transactionhistory" && <Transactionhistory />}
      {isshown === "Quotation" && <Quotation />}
      {/* {isshown === "registration" && <Registration />} */}
      {/* <General /> */}
      {/* <Registration /> */}



      <div className='all-buttons'>
        {/* <div className='search-button'>
          <CButton color="primary" type="submit">
            Save
          </CButton>
        </div> */}

        <div className='search-button'>
          <CPopover content="Save New Job" trigger={['hover', 'focus']}>
            <CButton color="primary" type="submit" onClick={handlesave}>
              Save & Close
            </CButton>
          </CPopover>
        </div>
        {/* 
        <div className='search-button'>
          <CButton color="primary" type="submit">
            Save & New
          </CButton>
        </div> */}

        <div className='search-button'>
          <CPopover content="Close Tab" trigger={['hover', 'focus']}>
            <CButton color="primary" type="submit">
              Close
            </CButton>
          </CPopover>
        </div>
      </div>


    </div>
  )
}

export default impcreatejob;
