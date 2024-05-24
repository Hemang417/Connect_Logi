import React, { useState, useEffect } from 'react'
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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CButton,
    CNav,
    CNavItem,
    CNavLink,
    CPopover
} from '@coreui/react'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import Select from 'react-select';
import { useLocation } from 'react-router-dom';


const Wf = () => {

    const [allbranches, setallbranches] = useState([]);
    const [allineofbusinesses, setalllineofbusinesses] = useState([]);
    const [visible, setvisible] = useState(false);
    const [allorgs, setallorgs] = useState([]);
    const [selectedLOB, setselectedLOB] = useState('');
    const [selectedBranch, setselectedBranch] = useState('');
    const [selectedOrg, setselectedOrg] = useState('');
    const [WorkFlowsData, setWorkflowsData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/workflow') {
        localStorage.removeItem('idofworkflow');
        localStorage.removeItem('workflowlobname');
        localStorage.removeItem('workflowbranchname');
        localStorage.removeItem('workflowimportername');
    }


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

    const handleorg = (selectedOrg) => {
        setselectedOrg(selectedOrg)
    }
    const handleModalClose = () => {
        setvisible(false);
        setselectedBranch('')
        setselectedLOB('')
        setselectedOrg('')
    };


    const readAllWorkflows = async () => {
        try {
            const response = await axios.get('http://localhost:5000/readallworkflows', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setWorkflowsData(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async (workflow) => {
        try {
            const response = await axios.delete('http://localhost:5000/deleteWorkflow', {
                data: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    id: workflow.id
                }
            });
            if (response.status === 200) {
                readAllWorkflows();
                toast.success(`Workflow deleted successfully`);
            }

        } catch (error) {
            console.log(error);
            toast.error('Workflow issue try again')
        }
    }


    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:5000/createOverviewofWorkflow',
                {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branch: selectedBranch,
                    lob: selectedLOB,
                    client: selectedOrg.label ? selectedOrg.label : null
                })
            setvisible(false);
            setselectedBranch('')
            setselectedLOB('')
            setselectedOrg('')
            readAllWorkflows();
            toast.success('Workflow added successfully');
        } catch (error) {
            console.log(error);
            toast.error('Workflow issue');
        }
    }


    useEffect(() => {
        getAllBranches();
        getAllLineofBusinesses();
        getAllOrgs();
        readAllWorkflows();
    }, [])



    async function handleEdit(workflow) {
        try {
            localStorage.setItem('idofworkflow', workflow.id);
            localStorage.setItem('workflowlobname', workflow.lobname);
            localStorage.setItem('workflowbranchname', workflow.ownbranchname);
            localStorage.setItem('workflowimportername', workflow.importername);
        } catch (error) {
            console.log(error);
        }
    }



    return (

        <CCol xs={12}>
            <div className='mt-4'>
                <CCard className="container-div">
                    <CCardBody>
                        <div className='grid-container-import'>
                            <div>
                                <label htmlFor="Locations" className='text-field-3'>Locations</label>
                                <CDropdown>
                                    <CDropdownToggle className="dropdown-btn" color='secondary'>All</CDropdownToggle>

                                    <CDropdownMenu className="text-field-4">
                                        {allbranches && allbranches.map((item, index) => (
                                            <CDropdownItem key={index} onClick={() => setselectedBranch(item.ownbranchname)}>
                                                {item.ownbranchname}
                                            </CDropdownItem>

                                        ))}
                                        <CDropdownItem onClick={() => setselectedBranch('')}>All</CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            </div>


                            <div>
                                <label for="Active" className='text-field-3'>Active</label>
                                <CDropdown>
                                    <CDropdownToggle className="dropdown-btn" color='secondary'>Select</CDropdownToggle>
                                    <CDropdownMenu className="text-field-4">
                                        <CDropdownItem onClick={() => handleModeChange('Air')}>Yes</CDropdownItem>
                                        <CDropdownItem onClick={() => handleModeChange('Sea')}>No</CDropdownItem>
                                        <CDropdownItem onClick={() => handleModeChange('')}>Both</CDropdownItem>
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
            </div>

            <CRow>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>
                        {/* ADD BUTTON */}
                        <svg className='worflow-addbutton' type="submit" onClick={() => { setvisible(!visible) }} style={{ marginTop: 20 }} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                        </svg>
                        {/* ADD BUTTON ENDS*/}
                    </div>
                </CCardBody>
            </CRow>

            <CForm className='worflow-table'>
                <CTable hover responsive striped className=''>
                    <CTableHead>
                        <CTableRow color='dark'>
                            {/* <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell> */}
                            <CTableHeaderCell scope="col" className='row-font'>Locations</CTableHeaderCell>

                            <CTableHeaderCell scope="col" className='row-font'>Organization/Customer</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Line of Business</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Operation</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>



                    <CTableBody>
                        {WorkFlowsData && (selectedBranch
                            ? WorkFlowsData.filter(workflow => workflow.ownbranchname === selectedBranch) // Filter workflows by selected branch
                            : WorkFlowsData)
                            .map((workflow, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{workflow.ownbranchname}</CTableDataCell>
                                        <CTableDataCell>{workflow.importername}</CTableDataCell>
                                        <CTableDataCell>{workflow.lobname}</CTableDataCell>
                                        <CTableDataCell>
                                            <Link to={'/setWorkflow'} target='_blank' onClick={() => handleEdit(workflow)}>
                                                {/* EDIT BUTTON */}
                                                <svg className='editbutton-workflow' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50">
                                                    <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                                                </svg>
                                                {/* EDIT BUTTON ENDS*/}
                                            </Link>
                                            {/* DELETE BUTTON */}
                                            <img onClick={() => handleDelete(workflow)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                                            {/* DELETE BUTTON ENDS*/}
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                    </CTableBody>






                    {/* <CTableBody>
                        {WorkFlowsData && WorkFlowsData.map((workflow, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableDataCell>{workflow.ownbranchname}</CTableDataCell>

                                    <CTableDataCell>{workflow.importername}</CTableDataCell>
                                    <CTableDataCell>{workflow.lobname}</CTableDataCell>
                                    <CTableDataCell>
                                        <Link to={'/setWorkflow'} target='_blank' onClick={() => handleEdit(workflow)}>Edit</Link>
                                        <CButton onClick={() => handleDelete(workflow)}>Delete</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })}
                    </CTableBody> */}



                </CTable>
            </CForm>
            <CTableBody>
            </CTableBody>
            {/* <CRow>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>
                        <CPopover content="Add Workflow" trigger={['hover', 'focus']}>
                            <CButton color="primary" type="submit" onClick={() => { setvisible(!visible) }}>
                                +
                            </CButton>
                        </CPopover>
                    </div>
                </CCardBody>
            </CRow> */}


            <CModal
                visible={visible}
                onClose={handleModalClose}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setvisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">
                        Add Workflow
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>

                        <div>
                            <label for="Locations" className='text-field-3'>
                            <h6>Customer/Organization </h6>
                            </label>

                            {/* <div className='left-div'> */}
                                <Select
                                    className="addwf-dropdownbutton"
                                    options={renderOrgOptions()}
                                    onChange={handleorg}
                                    placeholder="Customer/Organization Name"
                                />
                            {/* </div> */}
                            </div>
                            <label for="Locations" className='text-field-3 mt-2'>
                            <h6>Select Branch</h6>
                            </label>
                        <CDropdown className='wf-selectbranch-dropdown'>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedBranch ? selectedBranch : 'Select'}</CDropdownToggle>
                            <CDropdownMenu className="text-field-4 wf-menu-dropdown">
                                {allbranches && allbranches.map((item, index) => (
                                    <CDropdownItem className='wf-item-dropdown' key={index} value={selectedBranch} onClick={() => setselectedBranch(item.ownbranchname)} >
                                        {item.ownbranchname}
                                    </CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>

                        <label for="Locations" className='text-field-3 mt-2'>
                            <h6>Select Line of Business</h6>
                            </label>
                        <CDropdown className='wf-selectbranch-dropdown'>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedLOB ? selectedLOB : 'Select'}</CDropdownToggle>
                            <CDropdownMenu className="text-field-4 wf-menu-dropdown">
                                {allineofbusinesses && allineofbusinesses.map((item, index) => (
                                    <CDropdownItem className='wf-item-dropdown' key={index} value={selectedLOB} onClick={() => setselectedLOB(item.lobname)}>{item.lobname}</CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>


                    </div>
                </CModalBody>
                <CModalFooter>
                    <CPopover content="Update Workflow" trigger={['hover', 'focus']}>
                        <CButton color="secondary" onClick={handleModalClose}>
                            Close
                        </CButton>
                    </CPopover>
                    <CPopover content="Create Workflow" trigger={['hover', 'focus']}>
                        <CButton color="primary" onClick={handleAdd}>
                            Add
                        </CButton>
                    </CPopover>
                </CModalFooter>
            </CModal>

        </CCol>
    )
}

export default Wf;
