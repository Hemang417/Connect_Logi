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
  CModalBody, CModalFooter, CModalTitle, CPopover
} from '@coreui/react'
// import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import toast from 'react-hot-toast';
const setWorkflow = () => {

  const [allbranches, setallbranches] = useState([]);
  const [allineofbusinesses, setalllineofbusinesses] = useState([]);
  const [allorgs, setallorgs] = useState([]);
  const [visible, setVisible] = useState(false);

  const [selectedLOB, setselectedLOB] = useState('');
  const [selectedBranch, setselectedBranch] = useState('');
  const [selectedOrg, setselectedOrg] = useState('');

  const [WorkFlowsData, setWorkflowsData] = useState([]);

  const [filteredMilestones, setFilteredMilestones] = useState([]);
  const [allmilestones, setallmilestones] = useState([]);

  const [workflowData, setworkflowData] = useState({
    workflowname: '',
    duration: '',
    days: '',
    hours: '',
    minutes: '',
    milestone: '',
    plandatechange: '',
    selectedEmployee: [],
    reminderdays: '',
    reminderhours: '',
    reminderminutes: '',
  })

  const [employeeData, setemployeeData] = useState([]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);


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

  // const handleEmployeeSelect = (employee) => {
  //   setworkflowData({
  //     ...workflowData,
  //     selectedEmployee: employee.username // Set the selected employee in workflowData
  //   });
  // };


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


  const getMilestones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getmilestones', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode')
        }
      });
      setallmilestones(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const openEditModal = (workflow) => {

    setSelectedWorkflow(workflow); // Set the selected workflow data
    setworkflowData({ // Populate the workflowData state with the selected workflow data
      workflowname: workflow.workflowname,
      duration: workflow.duration,
      days: workflow.days,
      hours: workflow.hours,
      minutes: workflow.minutes,
      milestone: workflow.workflowmilestone,
      plandatechange: workflow.plandatechange,
      selectedEmployee: workflow.assignedperson,
      reminderdays: workflow.reminderdays,
      reminderhours: workflow.reminderhours,
      reminderminutes: workflow.reminderminutes // Split existing selected employees into an array
      // selectedEmployee: workflow.assignedperson
    });
    setVisible(true); // Open the modal
  };




  const handleChange = (name, value) => {
    setworkflowData({ ...workflowData, [name]: value });
  };


  const updateWorkflow = async () => {
    try {

      // Send request to update workflow data
      const response = await axios.put('http://localhost:5000/updatesetworkflow', {
        id: selectedWorkflow.id,
        ...workflowData,
      });
      readsetworkflow();
      setVisible(false);

      toast.success(`Workflow updated successfully`)
    } catch (error) {
      console.log(error);
      toast.error('Error updating workflow')
    }
  };


  const handleCheckboxChange = (name, checked) => {
    let checkvalue = 0;
    if (checked) {
      checkvalue = 1;
    }
    setworkflowData({ ...workflowData, [name]: checkvalue });
  };


  const handleModalClose = () => {
    setVisible(false);
    setworkflowData({
      workflowname: '',
      duration: '',
      days: '',
      hours: '',
      minutes: '',
      milestone: '',
      plandatechange: '',
      selectedEmployee: [],
      reminderdays: '',
      reminderhours: '',
      reminderminutes: '',
    });
    setSelectedWorkflow(null);
  };


  const CreateWorkflow = async () => {
    try {

      const response = await axios.post('http://localhost:5000/createworkflow', {
        orgname: localStorage.getItem('orgname'),
        orgcode: localStorage.getItem('orgcode'),
        workflowData: workflowData,
        branchName: localStorage.getItem('workflowbranchname'),
        lob: localStorage.getItem('workflowlobname'),
        importername: localStorage.getItem('workflowimportername')
      });
      readsetworkflow();
      toast.success('Workflow created successfully');
      setVisible(false);

    } catch (error) {
      console.log(error);
      toast.error(' Error creating workflow')
    }
  }


  const handleDelete = async (workflow) => {
    try {

      const response = await axios.delete('http://localhost:5000/deletesetworkflow', {
        data: {
          id: workflow.id,
          orgname: workflow.orgname,
          orgcode: workflow.orgcode,
          importername: workflow.importername,
          ownbranchname: workflow.ownbranchname,
          lobname: workflow.lobname
        }
      });
      if (response.status === 200) {
        toast.success('Milestone deleted successfully');
        readsetworkflow();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error deleting workflow');
    }
  };


  async function readsetworkflow() {
    try {
      const response = await axios.get('http://localhost:5000/readsetworkflow', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
          importername: localStorage.getItem('workflowimportername'),
          lobname: localStorage.getItem('workflowlobname'),
          branchname: localStorage.getItem('workflowbranchname')
        }
      })
      setWorkflowsData(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  async function getAlltheemployeeswiththatbranchaccess() {
    try {
      const response = await axios.get('http://localhost:5000/getAlltheemployeeswiththatbranchaccess', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
          branchname: localStorage.getItem('workflowbranchname')
        }
      })
      setemployeeData(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    try {
      getAllBranches();
      getAllLineofBusinesses();
      getAllOrgs();
      getMilestones();
      getAlltheemployeeswiththatbranchaccess();
      // readAllWorkflows();
      readsetworkflow();
    } catch (error) {
      console.log(error);
    }
  }, [])





  const handleEmployeeSelect = (employee, index) => {
    const updatedSelectedEmployees = [...workflowData.selectedEmployee]; // Get the current selected employees array
    updatedSelectedEmployees[index] = { username: employee.username }; // Update the selected employee for the specified index
    setworkflowData({ ...workflowData, selectedEmployee: updatedSelectedEmployees }); // Update the workflowData state with the updated selected employees
  };


  // const handleEmployeeSelect = (employee, index) => {
  //   const updatedWorkflows = [...selectedWorkflows];
  //   updatedWorkflows[index].selectedEmployee = employee.username; // Set selected employee for the specific dropdown
  //   setSelectedWorkflows(updatedWorkflows);
  // };



  const handleAddDropdown = () => {
    setworkflowData(prevState => ({
      ...prevState,
      selectedEmployee: Array.isArray(prevState.selectedEmployee) ? [...prevState.selectedEmployee, ''] : ['']
    }));
  };


  const handleDeleteDropdown = (index) => {
    setworkflowData(prevState => ({
      ...prevState,
      selectedEmployee: Array.isArray(prevState.selectedEmployee) ? prevState.selectedEmployee.filter((_, i) => i !== index) : []
    }));
  };



  return (
    <CCol xs={12}>

      <CCard className="mb-2 container-div">
        <CCardBody>
          <div className='grid-container-import'>
            <div>
              <label htmlFor="Locations" className='text-field-3'><h6>Applicable for</h6></label>
              <input value={localStorage.getItem('workflowbranchname')} readOnly />

            </div>
            <div>
              <label htmlFor="Locations" className='text-field-3'><h6>Line of Business</h6></label>
              <input value={localStorage.getItem('workflowlobname')} readOnly />

            </div>

            <div>
              <label for="Locations" className='text-field-3'><h6>Customer/Organization</h6></label>
              <input className='setworkflow-input-org' value={localStorage.getItem('workflowimportername')} readOnly />
              {/* 
              <div className='left-div'>


              </div> */}
            </div>
          </div>

        </CCardBody>

      </CCard>

      <CTableBody>
        <CTableRow> <div className='search-button'>
          {/* ADD BUTTON */}
          <svg className="workflow-setworflow-addbutton" type="submit" onClick={() => { setVisible(!visible); }} style={{ marginBottom: 20 }} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
          </svg>
          {/* ADD BUTTON ENDS*/}
        </div></CTableRow>
      </CTableBody>

      <div className='setworkflow-table'>
        <CTable hover responsive striped className=''>
          <CTableHead>
            <CTableRow color='dark' >
              <CTableHeaderCell scope="col">Milestone Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
              <CTableHeaderCell scope="col">Assigned Person</CTableHeaderCell>
              <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {WorkFlowsData && WorkFlowsData.map((workflow, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{workflow.workflowname}</CTableDataCell>
                  <CTableDataCell>{workflow.days ? `${workflow.days + ' days ' + workflow.hours + ' hours ' + workflow.minutes + ' mins '}` : 'NA'}</CTableDataCell>
                  <CTableDataCell>{workflow.assignedPerson ? workflow.assignedPerson : 'NA'}</CTableDataCell>
                  <CTableDataCell>
                    {/* EDIT BUTTON */}
                    <svg className="editbutton-milestone-workflow" onClick={() => openEditModal(workflow)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50">
                      <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                    </svg>
                    {/* EDIT BUTTON ENDS*/}
                    {/* DELETE BUTTON */}
                    <img className="deletebutton-milestone-workflow" onClick={() => handleDelete(workflow)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                    {/* DELETE BUTTON ENDS*/}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>


          <CModal
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="LiveDemoExampleLabel"
            className='workflow-modal custom-modal '
            size="xl"
          >
            <CModalHeader onClose={handleModalClose}>
              <CModalTitle id="LiveDemoExampleLabel">
                Add Workflow
              </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div>
                <div>
                  <label for="Job Date" className='text-field-3'><h6>Milestone Names</h6></label>

                  <CDropdown>
                    <CDropdownToggle className="dropdown-btn" color='secondary'>{workflowData.workflowname ? workflowData.workflowname : 'Select'}</CDropdownToggle>
                    <CDropdownMenu className="text-field-4">
                      {allmilestones && allmilestones.map((milestone, index) => (
                        <CDropdownItem key={index} onClick={() => handleChange('workflowname', milestone.milestonename)}>{milestone.milestonename}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>


                  <label for="Job Date" className='text-field-3 addworflow-labelfield'><h6>Can Change Plan Date</h6></label>
                  <input type="checkbox" placeholder="" className='addworkflow-checkboxbutton' onChange={(e) => handleCheckboxChange('plandatechange', e.target.checked)} checked={workflowData.plandatechange} />
                </div>
              </div>

              {!workflowData.plandatechange && (

                <div>
                  <CModalTitle id="LiveDemoExampleLabel" className='mt-4'>
                    Planning
                  </CModalTitle>
                  <label htmlFor="Job Date" className='text-field-3 mt-3'><h6>Duration</h6></label>
                  <CDropdown>
                    <CDropdownToggle className="dropdown-btn" color='secondary'>{workflowData.duration ? workflowData.duration : 'Select'}</CDropdownToggle>
                    <CDropdownMenu className="text-field-4">
                      <CDropdownItem onClick={() => handleChange('duration', 'Before')}>Before</CDropdownItem>
                      <CDropdownItem onClick={() => handleChange('duration', 'After')}>After</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('days', e.target.value)} value={workflowData.days} />
                  <label htmlFor="Job Date" className='text-field-3 addworkflow-day'>Days</label>
                  <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('hours', e.target.value)} value={workflowData.hours} />
                  <label htmlFor="Job Date" className='text-field-3 addworkflow-day'>Hours</label>
                  <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('minutes', e.target.value)} value={workflowData.minutes} />
                  <label htmlFor="Job Date" className='text-field-3 addworkflow-day'>Mins.</label>
                  <label htmlFor="Job Date" className='text-field-3'>of</label>

                  <CDropdown>
                    <CDropdownToggle className="dropdown-btn" color='secondary'>{workflowData.milestone ? workflowData.milestone : 'Select'}</CDropdownToggle>
                    <CDropdownMenu className="text-field-4">
                      <CDropdownItem onClick={() => handleChange('milestone', 'Job Creation Date')}>Job Creation Date</CDropdownItem>
                      {allmilestones && allmilestones.map((milestone, index) => (
                        <React.Fragment key={index}>
                          <CDropdownItem onClick={() => handleChange('milestone', milestone.milestonename)}>{milestone.milestonename}</CDropdownItem>
                        </React.Fragment>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              )}


              <div>
                <CModalTitle id="LiveDemoExampleLabel" className='mt-4'>
                  Access
                </CModalTitle>


                {workflowData.selectedEmployee && workflowData.selectedEmployee.map((selectedEmployee, index) => (
                  <div key={index} className='addworkflow-dropdown-access'>
                    <CDropdown>
                      <CDropdownToggle color="secondary">{selectedEmployee.username || 'Select'}</CDropdownToggle>
                      <CDropdownMenu>
                        {employeeData && employeeData.map((employee, empIndex) => (
                          <CDropdownItem key={empIndex} onClick={() => handleEmployeeSelect(employee, index)}>{employee.username}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    {/* DELETE BUTTON */}
                    <img className='addworkflow-deletebutton' onClick={() => handleDeleteDropdown(index)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                    {/* DELETE BUTTON ENDS*/}
                  </div>
                ))}
                {/* ADD BUTTON */}
                <svg className='mt-2' onClick={handleAddDropdown} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                </svg>
                {/* ADD BUTTON ENDS*/}

              </div>


              {/* Reminder days, hrs, mins  */}
              <div>
                <CModalTitle id="LiveDemoExampleLabel" className='mt-4'>
                  Reminder Duration
                </CModalTitle>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('reminderdays', e.target.value)} value={workflowData.reminderdays}/>
                <label htmlFor="Job Date" className='text-field-3 addworkflow-day'>Days</label>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('reminderhours', e.target.value)} value={workflowData.reminderhours}/>
                <label htmlFor="Job Date" className='text-field-3 addworkflow-day'>Hours</label>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('reminderminutes', e.target.value)} value={workflowData.reminderminutes}/>
                <label htmlFor="Job Date" className='text-field-3 addworkflow-day'>Mins.</label>
              </div>

            </CModalBody>

            <CModalFooter>
              <CPopover content="Close Modal" trigger={['hover', 'focus']}>
                <CButton color="secondary" onClick={handleModalClose}>
                  Close
                </CButton>
              </CPopover>

              <CButton color="primary" onClick={selectedWorkflow ? updateWorkflow : CreateWorkflow}>
                {selectedWorkflow ? 'Update Workflow' : 'Create Workflow'}
              </CButton>

            </CModalFooter>
          </CModal>


        </CTable>
      </div>
    </CCol>

  )
}

export default setWorkflow;