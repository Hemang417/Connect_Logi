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

const Import = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <CRow>
        <CCardBody className='button-div'>
<div className='createjob-button'>
<Link to={'/impcreatejob'} target='_blank'>
  <CButton color="primary" type="submit">
        +
      </CButton>
      </Link>
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
            <div className='grid-container'>
            <div>
                {/* <label for="Transport Mode" className='text-field-3'>Job No.</label> */}
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Job No.</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">BE No.</CDropdownItem>
                                <CDropdownItem href="#">AWB/HAWB</CDropdownItem>
                                <CDropdownItem href="#">HBL/HAWB</CDropdownItem>
                                <CDropdownItem href="#">Container No.</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        <input type="text" placeholder="" className='text-field-4' />
              </div>
            <div>
                <label for="Mode" className='text-field-3'>Mode</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Both</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Air</CDropdownItem>
                                <CDropdownItem href="#">Sea</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        </div>
              <div>
                <label for="Job Date" className='text-field-3'>Importer Name</label>
                <input type="text" placeholder="" className='text-field-4' />
              </div>
              <div>
                <label for="Mode" className='text-field-3'>Status</label>
                <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>Both</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                <CDropdownItem href="#">Active</CDropdownItem>
                                <CDropdownItem href="#">Completed</CDropdownItem>
                                <CDropdownItem href="#">Pending</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        </div>
                        <div className='all-buttons'>
                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Search
                    </CButton>
                </div>
                </div>
            </div>
          </CCardBody>
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

export default Import;
