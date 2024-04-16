import React, { useEffect, useState } from 'react'
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
  CModal,
  CButton,
  CModalHeader,
  CModalBody, CModalFooter, CModalTitle
} from '@coreui/react'
// import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
const setWorkflow = () => {

  const [allbranches, setallbranches] = useState([]);
  const [allineofbusinesses, setalllineofbusinesses] = useState([]);
  const [allorgs, setallorgs] = useState([]);
  const [visible, setVisible] = useState(false);
  const getAllBranches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      })
      setallbranches(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllLineofBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getlob', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      })
      setalllineofbusinesses(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const getAllOrgs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getorgforTAT', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      })
      setallorgs(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    try {
      getAllBranches();
      getAllLineofBusinesses();
      getAllOrgs();
    } catch (error) {
      console.log(error);
    }
  }, [])



  // const combineData = (data) => {
  //   const combinedData = {};
  //   data.forEach((item) => {
  //     if (!combinedData[item.clientname]) {
  //       combinedData[item.clientname] = [];
  //     }
  //     combinedData[item.clientname].push(item);
  //   });
  //   return combinedData;
  // };


  const renderOrgOptions = () => {
    // Create a map to store unique client names
    const uniqueClientNames = new Map();
    // Iterate through allorgs to extract unique client names
    allorgs.forEach(org => {
      uniqueClientNames.set(org.clientname, org.id); // Assuming org.id is the unique identifier
    });
    // Create options array from unique client names
    const options = Array.from(uniqueClientNames, ([label, value]) => ({ label, value }));
    return options;
  };


  return (
    <CCol xs={12}>
      <CCard className="mb-2 container-div">
        <CCardBody>
          <div className='grid-container-import'>
            <div>
              <label for="Locations" className='text-field-3'>Name of Workflow</label>
              <input type="text" placeholder="" className='text-field-4' />
            </div>
            <div>
              <label htmlFor="Locations" className='text-field-3'>Applicable for</label>
              <CDropdown>
                <CDropdownToggle className="dropdown-btn" color='secondary'>All</CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  {allbranches && allbranches.map((item, index) => (
                    <CDropdownItem key={index}>
                      {item.ownbranchname}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </div>
            <div>
              <label htmlFor="Locations" className='text-field-3'>Line of Business</label>
              <CDropdown>
                <CDropdownToggle className="dropdown-btn" color='secondary'>All</CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  {allineofbusinesses && allineofbusinesses.map((item, index) => (
                    <CDropdownItem key={index}>{item.lobname}</CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
            </div>

            <div>
              <label for="Locations" className='text-field-3'>Customer/Organization</label>

              <div className='left-div'>
                <Select
                  className="impgen-text-field-1"
                  options={renderOrgOptions()}
                  placeholder="Importer Name"
                />
              </div>
            </div>
          </div>

        </CCardBody>

      </CCard>
      <CTable hover responsive striped className=''>
        <CTableHead>
          <CTableRow color='dark' >
            {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
            <CTableHeaderCell scope="col">Milestone Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
            <CTableHeaderCell scope="col">Assigned Person</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>


        <CTableBody>
          <CTableRow> <div className='search-button'>
            <CButton color="success" type="submit" className='contact-add-button' onClick={() => { setVisible(!visible); }}>
              +
            </CButton>
          </div></CTableRow>
        </CTableBody>



        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
          className='workflow-modal custom-modal '
          size="xl"
        >
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="LiveDemoExampleLabel">
              Add Workflow
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div>
              <div>
                <label for="Job Date" className='text-field-3'>Milestone Name</label>
                <input type="text" placeholder="" className='text-field-4' />
              </div>

              <CModalTitle id="LiveDemoExampleLabel">
                Planning
              </CModalTitle>
              <div>
              <label for="Job Date" className='text-field-3'>Duration</label>
              <CDropdown>
                <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  <CDropdownItem>Before</CDropdownItem>
                  <CDropdownItem>After</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <input type="text" placeholder="" className='text-field-4' />
              <label for="Job Date" className='text-field-3'>Days</label>
              <input type="text" placeholder="" className='text-field-4' />
              <label for="Job Date" className='text-field-3'>Hours</label>
              <input type="text" placeholder="" className='text-field-4' />
              <label for="Job Date" className='text-field-3'>Mins.</label>
              <label for="Job Date" className='text-field-3'>of</label>
              <CDropdown>
                <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  <CDropdownItem></CDropdownItem>
                  <CDropdownItem>Another Milestone</CDropdownItem>
                  <CDropdownItem>Job Creation Date</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CDropdown>
                <CDropdownToggle className="dropdown-btn" color='secondary'>Select Milestone</CDropdownToggle>
                <CDropdownMenu className="text-field-4">
                  <CDropdownItem></CDropdownItem>
                  <CDropdownItem>Another Milestone</CDropdownItem>
                  <CDropdownItem>Job Creation Date</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              </div>
              <div>
              <label for="Job Date" className='text-field-3'>Can Change Plan Date</label> </div>
              <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' /></CTableDataCell>
            </div>
          </CModalBody>


          <CModalFooter>
            <CButton color="secondary">
              Close
            </CButton>
            <CButton color="primary">
              Handle
            </CButton>
          </CModalFooter>
        </CModal>



      </CTable>
    </CCol>

  )
}

export default setWorkflow;