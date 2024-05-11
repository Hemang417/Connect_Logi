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
    CNavLink
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
            <CCard className="mb-2 container-div">
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
                                <CDropdownToggle className="dropdown-btn" color='secondary'></CDropdownToggle>
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


            <CForm>
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
                                            <Link to={'/setWorkflow'} target='_blank' onClick={() => handleEdit(workflow)}>Edit</Link>
                                            <CButton onClick={() => handleDelete(workflow)}>Delete</CButton>
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
            <CRow>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>
                        <CButton color="primary" type="submit" onClick={() => { setvisible(!visible) }}>
                            +
                        </CButton>
                    </div>
                </CCardBody>
            </CRow>


            <CModal
                visible={visible}
                onClose={handleModalClose}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setvisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">
                        Add
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>

                        <div>
                            <label for="Locations" className='text-field-3'>Customer/Organization</label>

                            <div className='left-div'>
                                <Select
                                    className="impgen-text-field-1"
                                    options={renderOrgOptions()}
                                    onChange={handleorg}
                                    placeholder="Importer Name"
                                />
                            </div>
                        </div>

                        <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedBranch ? selectedBranch : 'Select Branch'}</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                {allbranches && allbranches.map((item, index) => (
                                    <CDropdownItem key={index} value={selectedBranch} onClick={() => setselectedBranch(item.ownbranchname)} >
                                        {item.ownbranchname}
                                    </CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>

                        <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedLOB ? selectedLOB : 'Select LOB'}</CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                {allineofbusinesses && allineofbusinesses.map((item, index) => (
                                    <CDropdownItem key={index} value={selectedLOB} onClick={() => setselectedLOB(item.lobname)}>{item.lobname}</CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>


                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleModalClose}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleAdd}>
                        Add
                    </CButton>
                </CModalFooter>
            </CModal>

        </CCol>
    )
}

export default Wf;
