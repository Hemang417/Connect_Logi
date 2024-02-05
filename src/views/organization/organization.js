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
  CButton
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const organization = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <CRow>
        <CCardBody className='button-div'>
<div className='createjob-button'>
  <CButton color="primary" type="submit">
        +
      </CButton>
  </div>
  <div className='createjob-button'>
  <CButton color="primary" type="submit">
  <img src='../../importIcons/delete.png' />
      </CButton>
  </div>
  <div className='createjob-button'>
  <CButton color="primary" type="submit">
    <img src='../../importIcons/refresh.png' width="10px" height="10px" />
  </CButton>
  </div>
  <div className='createjob-button'>
  <CButton class="btn btn-primary" type="button">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon" role="img" aria-hidden="true">
    <polygon fill="var(--ci-primary-color, currentColor)" points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" class="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z" class="ci-primary"></path>
  </svg>
  <span class="visually-hidden">Download file</span>
</CButton>
  </div>

  </CCardBody>

  
    <CCol xs={12}>
      <CCard className="mb-2 container-div">
        <CCardBody>
        {/* <CDropdown>
  <CDropdownToggle color="secondary">Job No.</CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">BE No.</CDropdownItem>
    <CDropdownItem href="#">HBL/HAWB No.</CDropdownItem>
    <CDropdownItem href="#">MBL/MAWB No.</CDropdownItem>
    <CDropdownItem href="#">Container No.</CDropdownItem>
  </CDropdownMenu>
    <CFormInput type="text" size="sm" placeholder="" aria-label="sm input example"/>
  </CDropdown> */}

  <input type="text" placeholder="Job No."  className='text-field'/>

  <CFormLabel className="col-sm-1 col-form-label ">Mode</CFormLabel>
    <CDropdown className="col-sm-1 dropdown-button">
  <CDropdownToggle color="secondary">Both</CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">Air</CDropdownItem>
    <CDropdownItem href="#">Sea</CDropdownItem>
  </CDropdownMenu>
  </CDropdown>

  <CFormLabel className="col-sm-1 col-form-label">BE Type</CFormLabel>
    <CDropdown className="col-sm-1 dropdown-button">
  <CDropdownToggle color="secondary">All</CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">Home</CDropdownItem>
    <CDropdownItem href="#">In-Bond</CDropdownItem>
    <CDropdownItem href="#">In-Bond</CDropdownItem>
    <CDropdownItem href="#">SEZ-Z</CDropdownItem>
    <CDropdownItem href="#">SEZ-M</CDropdownItem>
    <CDropdownItem href="#">SEZ-T</CDropdownItem>

  </CDropdownMenu>
  </CDropdown>
  <DatePicker
        selectsStart
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
        className='col-form-label'
      />

  </CCardBody>
  <div>
  <DatePicker
        selectsEnd
        selected={endDate}
        onChange={date => setEndDate(date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
        className='col-form-label datepicker'
     />
  </div>
  <div className='search-button'>
  <CButton color="primary" type="submit">
        Search
      </CButton>
  </div>
 
  </CCard>
  </CCol>

  <CCol xs={12}>
      <CCard className="mb-2 container-div">
        <CCardBody>
        {/* <CDropdown>
  <CDropdownToggle color="secondary">Job No.</CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">BE No.</CDropdownItem>
    <CDropdownItem href="#">HBL/HAWB No.</CDropdownItem>
    <CDropdownItem href="#">MBL/MAWB No.</CDropdownItem>
    <CDropdownItem href="#">Container No.</CDropdownItem>
  </CDropdownMenu>
    <CFormInput type="text" size="sm" placeholder="" aria-label="sm input example"/>
  </CDropdown> */}

  <input type="text" placeholder="BE No."  className='text-field'/>

  <input type="text" placeholder="HBL/HAWB No." className='text-field' />

  <input type="text" placeholder="MBL/MAWB No." className='text-field' />

  <input type="text" placeholder="Container No." className='text-field' />

  </CCardBody>
  <div className='search-button'>
  <CButton color="primary" type="submit">
        Search
      </CButton>
  </div>
 
  </CCard>
  </CCol>
  
  <CForm>
  
    <CTable hover responsive striped className=''>
  <CTableHead>
    <CTableRow color='dark' >
      <CTableHeaderCell scope="col"></CTableHeaderCell>
      <CTableHeaderCell scope="col">Date</CTableHeaderCell>
      <CTableHeaderCell scope="col">Job No.</CTableHeaderCell>
      <CTableHeaderCell scope="col">Importer Name</CTableHeaderCell>
      <CTableHeaderCell scope="col">HBL/HAWB No.</CTableHeaderCell>
      <CTableHeaderCell scope="col">MBL/MAWB No.</CTableHeaderCell>
      <CTableHeaderCell scope="col">ETA</CTableHeaderCell>
      <CTableHeaderCell scope="col">IGM</CTableHeaderCell>
      <CTableHeaderCell scope="col">Checklist</CTableHeaderCell>
      <CTableHeaderCell scope="col">E-Sanchit</CTableHeaderCell>
      <CTableHeaderCell scope="col">BOE Filling</CTableHeaderCell>
      <CTableHeaderCell scope="col">DO</CTableHeaderCell>
      <CTableHeaderCell scope="col">Delivery</CTableHeaderCell>
      <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>

    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
    <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <Link to={"/Modal"}>
                        Edit
                      </Link>
                    {/* <a href="./Modal" target="_blank" rel="noopener noreferrer">
                        Edit
                    </a>   */}
                  </th>
      <CTableHeaderCell scope="row">06.09.2023 13:44:55</CTableHeaderCell>
      <CTableDataCell>S/I/0001/23-24</CTableDataCell>
      <CTableDataCell>PERMANENT MAGNET LTD</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>19-06-2023</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>Assesment</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <a href="/dashboard/import/Modal" target="_blank" rel="noopener noreferrer">Edit</a>  
    </th>
    <CTableHeaderCell scope="row">06.09.2023 13:44:55</CTableHeaderCell>
      <CTableDataCell>A/I/0001/23-24</CTableDataCell>
      <CTableDataCell>LASONS INDIA PVT LTD</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>19-06-2023</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>Done</CTableDataCell>
    </CTableRow>
    
  </CTableBody>
</CTable>
</CForm>

</CRow>

  )
}

export default organization;
