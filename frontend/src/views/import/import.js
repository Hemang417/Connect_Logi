import React, { useEffect, useRef } from 'react'
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
  CPopover
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './css/import-styles.css';

const Import = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedMode, setselectedMode] = useState('');
  const [allimpjobs, setallimpjobs] = useState();
  const [allgenjobs, setallgenjobs] = useState();
  const [importername, setimportername] = useState('');
  const [selectedDropdown, setselectedDropdown] = useState('');
  const [blTypeNum, setBlTypeNum] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  if (location.pathname === '/import') {
    localStorage.removeItem('jobNumber');
    localStorage.removeItem('jobDate');
    localStorage.removeItem('onCreate');
    localStorage.removeItem('allbranchesofclient');
    localStorage.removeItem('onEdit');
    localStorage.removeItem('uniquevalue');
    localStorage.removeItem('importernameofjob');
  }


  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allimpjobs', {
          params: {
            orgname: localStorage.getItem('orgname'),
            orgcode: localStorage.getItem('orgcode'),
            branchname: localStorage.getItem('branchnameofemp'),
            branchcode: localStorage.getItem('branchcodeofemp')
          }
        });

        setallimpjobs(response.data.rows);
        setallgenjobs(response.data.genrows);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllJobs();
  }, []);



  const handleModeChange = (mode) => {
    setselectedMode(mode); // Update selected mode
  };

  // const [highlightedRow, setHighlightedRow] = useState(-1);
  async function handleDelete(e, index) {
    try {
      const thatdata = allimpjobs[index];

      const orgname = thatdata.orgname;
      const orgcode = thatdata.orgcode;
      const jobnumber = thatdata.jobnumber;
      const response = await axios.delete('http://localhost:5000/deletethatjob', {
        data: {
          orgname: orgname,
          orgcode: orgcode,
          jobnumber: jobnumber
        }
      });


      if (response.status === 200) {
        const updatedJobs = [...allimpjobs];
        updatedJobs.splice(index, 1);
        setallimpjobs(updatedJobs);
      }

    } catch (error) {
      console.log(error);
    }
  }
  // const editLinkRef = useRef();

  async function handleEdit(index, genjob) {
    // editLinkRef.current = index;
    const thatdata = allimpjobs[index];

    localStorage.setItem('jobNumber', thatdata.jobnumber);
    localStorage.setItem('jobDate', thatdata.jobdate);
    localStorage.setItem('onEdit', true);
    localStorage.setItem('modeoftransport', thatdata.transportmode + ' ' + 'Import');
    localStorage.setItem('uniquevalue', 'JobsButton')
    localStorage.setItem('importernameofjob', genjob.importername)

    // navigate('/impcreatejob');
    // if (editLinkRef.current) {
    //   navigate('/impcreatejob')
    //   // editLinkRef.current.click();
    // }
  }


  // useEffect(() => {
  //   if (state && state.jobnumber) {
  //     const jobToEdit = allimpjobs?.find(job => job.jobnumber === state.jobnumber);
  //     if (jobToEdit) {
  //       const { id } = jobToEdit
  //       setHighlightedRow(id);
  //     }
    
  //   }
  // }, [state, allgenjobs, allimpjobs])

  // useEffect(() => {
  //   if (state && state.jobnumber && editLinkRef.current !== undefined) {
  //     const index = editLinkRef.current;
  //     // Find the job to edit based on the state job number
  //     const jobToEdit = allimpjobs?.find(job => job.jobnumber === state.jobnumber);

  //     if (jobToEdit) {
  //       // Find the corresponding general job
  //       const genJob = allgenjobs.find(genJob => genJob.jobnumber === jobToEdit.jobnumber);

  //       // Find the index of jobToEdit in the original list (allimpjobs)
  //       const originalIndex = allimpjobs.findIndex(job => job.jobnumber === jobToEdit.jobnumber);

  //       handleEdit(allimpjobs.length - 1 - originalIndex, genJob);
  //     }
  //   }
  // }, [state, allgenjobs, allimpjobs]);


  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <CRow>
      <CCardBody className='button-div'>
        <div className='createjob-button'>
          <CPopover content="Create new Job" trigger={['hover', 'focus']}>
            <Link to={'/impcreatejob'} target='_blank'>

              <svg type="submit" onClick={() => {
                localStorage.setItem('onCreate', true);
                localStorage.setItem('uniquevalue', 'JobsButton');
              }} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
              </svg>

            </Link>
          </CPopover>
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
          <CButton className="btn btn-primary" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon" role="img" aria-hidden="true">
              <polygon fill="var(--ci-primary-color, currentColor)" points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" className="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z" className="ci-primary"></path>
            </svg>
            <span className="visually-hidden">Download file</span>
          </CButton>
        </div>

      </CCardBody>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <div className='grid-container-import'>
              <div>

                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedDropdown ? selectedDropdown : 'Job No.'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    {/* <CDropdownItem href="#">BE No.</CDropdownItem> */}
                    <CDropdownItem onClick={(e) => setselectedDropdown('HBL/HAWB')}>HBL/HAWB</CDropdownItem>
                    <CDropdownItem onClick={(e) => setselectedDropdown('MBL/MAWB')}>MBL/MAWB</CDropdownItem>
                    <CDropdownItem onClick={(e) => setselectedDropdown('JobNumber')}>Job Number</CDropdownItem>
                    <CDropdownItem onClick={(e) => setselectedDropdown('')}>All</CDropdownItem>
                    {/* <CDropdownItem href="#">Container No.</CDropdownItem> */}
                  </CDropdownMenu>
                </CDropdown>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => setBlTypeNum(e.target.value)} />
              </div>
              <div>
                <label htmlFor="Mode" className='text-field-3'>Mode</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedMode ? selectedMode : 'Both'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleModeChange('Air')}>Air</CDropdownItem>
                    <CDropdownItem onClick={() => handleModeChange('Sea')}>Sea</CDropdownItem>
                    <CDropdownItem onClick={() => handleModeChange('')}>Both</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div>
                <label htmlFor="Job Date" className='text-field-3'>Importer Name</label>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => setimportername(e.target.value)} />
              </div>
              <div>
                <label htmlFor="Mode" className='text-field-3'>Status</label>
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

      <CForm className='form-import'>

        <CTable hover borderless className='table-import'>
          <CTableHead className='head-import'>
            <CTableRow color='dark'>
              <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Date</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Job No.</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Importer Name</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>HBL/HAWB No.</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>MBL/MAWB No.</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>ETA</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Filling BOE</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Assesment</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Examination/OOC</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>BL Status/Agent Name</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Original Doc. Received</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Delivery Order</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Delivery</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>LR/Empty Slip/Bill</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Billing</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Dispatch</CTableHeaderCell>
              <CTableHeaderCell scope="col" className='row-font'>Job Status</CTableHeaderCell>

            </CTableRow>
          </CTableHead>
          <CTableBody>

            {
              allimpjobs && allimpjobs
                .slice()
                .reverse()
                .filter(job => {
                  const matchingGenJob = allgenjobs.find(genJob => genJob.jobnumber === job.jobnumber);
                  return (
                    (!selectedMode || job.transportmode === selectedMode) &&
                    (!importername || (matchingGenJob && matchingGenJob.importername && matchingGenJob.importername.toLowerCase().includes(importername.toLowerCase()))) &&
                    (!selectedDropdown || (selectedDropdown === 'HBL/HAWB' && job.bltype === 'HBL/HAWB' && (!blTypeNum || job.bltypenum.toLowerCase().includes(blTypeNum.toLowerCase()))) ||
                      (selectedDropdown === 'MBL/MAWB' && job.bltype === 'MBL/MAWB' && (!blTypeNum || job.bltypenum.toLowerCase().includes(blTypeNum.toLowerCase())))) ||
                    (selectedDropdown === 'JobNumber' && (!blTypeNum || job.jobnumber.toLowerCase().includes(blTypeNum.toLowerCase())))
                  );
                })
                .map((job, index) => {
                  const matchingGenJob = allgenjobs.find(genJob => genJob.jobnumber === job.jobnumber);

                  return (
                    <CTableRow key={index}>
                      <th scope="row" className="font-small text-gray-900 whitespace-nowrapark:text d-white">
                        {/* <CPopover content="Edit Job" trigger={['hover', 'focus']}> */}
                        <Link onClick={() => handleEdit(allimpjobs.length - 1 - index, matchingGenJob)} to={'/impcreatejob'}
                        // ref={editLinkRef}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                          </svg>
                        </Link>
                        {/* </CPopover> */}
                      </th>
                      <th scope="row" className="font-small text-gray-900 whitespace-nowrapark:text d-white">
                        <CPopover content="Delete Job" trigger={['hover', 'focus']}>
                          <Link onClick={(e) => handleDelete(e, allimpjobs.length - 1 - index)}>
                            <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                          </Link>
                        </CPopover>
                      </th>

                      <CTableHeaderCell scope="row" className='row-font'>{moment(job.jobdate).format('YYYY-MM-DDTHH:mm')}</CTableHeaderCell>
                      <CTableDataCell className='row-font'>{job.jobnumber}</CTableDataCell>
                      <CTableDataCell className='row-font'>{matchingGenJob.importername}</CTableDataCell>
                      <CTableDataCell className='row-font'>{job.bltypenum}</CTableDataCell>
                      <CTableDataCell className='row-font'>RTTT5787088</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>{job.blstatus}</CTableDataCell>
                      <CTableDataCell className='row-font'>{job.docreceivedon}</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
                      <CTableDataCell className='row-font'>Completed</CTableDataCell>

                    </CTableRow>
                  )
                })}

          </CTableBody>
        </CTable>

      </CForm>

    </CRow>

  )
}

export default Import;

























// <CTable hover responsive striped className=''>
//           <CTableHead>
//             <CTableRow color='dark'>
//               <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Date</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Job No.</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Importer Name</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>HBL/HAWB No.</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>MBL/MAWB No.</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>ETA</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Filling BOE</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Assesment</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Examination/OOC</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>BL Status/Agent Name</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Original Doc. Received</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Delivery Order</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Delivery</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>LR/Empty Slip/Bill</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Billing</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Dispatch</CTableHeaderCell>
//               <CTableHeaderCell scope="col" className='row-font'>Job Status</CTableHeaderCell>

//             </CTableRow>
//           </CTableHead>
//           <CTableBody>
//             <CTableRow>
//               <th scope="row" class="font-small text-gray-900 whitespace-nowrapark:text d-white">
//                 <Link to={"/impcreatejob"}>
//                   Edit
//                 </Link> <br />
//                 <Link>
//                   Delete
//                 </Link>
//               </th>
//               <CTableHeaderCell scope="row" className='row-font'>06.09.2023 13:44:55</CTableHeaderCell>
//               <CTableDataCell className='row-font'>S/I/0001/23-24</CTableDataCell>
//               <CTableDataCell className='row-font'>PERMANENT MAGNET LTD</CTableDataCell>
//               <CTableDataCell className='row-font'>RTTT5787088</CTableDataCell>
//               <CTableDataCell className='row-font'>RTTT5787088</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'>19-06-2023 16:37:00</CTableDataCell>
//               <CTableDataCell className='row-font'></CTableDataCell>

//             </CTableRow>











//           </CTableBody>
//         </CTable>