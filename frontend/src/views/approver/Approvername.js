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
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle
} from '@coreui/react'

import axios from 'axios'
import toast from 'react-hot-toast'


const Approvername = () => {

    const [visible, setVisible] = useState(false);
    const [approverName, setApproverName] = useState('');
    const [allbranches, setallbranches] = useState([]);
    const [selectedBranch, setselectedBranch] = useState({});
    const [allapproverlist, setallapproverlist] = useState([]);
    const [editstate, seteditstate] = useState(false);

    const handleModalClose = () => {
        setVisible(false);
        setApproverName('');
        setselectedBranch({});
        seteditstate(false);
    };

    const handleAddApproverName = async () => {
        try {
            // Send a backend request to add the approver name
            const response = await axios.post('http://localhost:5000/storeApproverlist', {
                approverName: approverName,
                selectedBranch: selectedBranch,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')

            });

            // Handle success response
            if (response.status === 200) {
                toast.success('Approver name added successfully');
                handleModalClose();
                getApproverlist();
            } else {
                toast.error('Failed to add approver name');
            }
        } catch (error) {
            console.error('Error adding approver name:', error);
            toast.error('Failed to add approver name');
        }
    };


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

    const getApproverlist = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchApproverlist', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            })
            setallapproverlist(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllBranches();
        getApproverlist();
    }, [])


    const handleChange = (e) => {
        setApproverName(e.target.value);
    };


    const handleDelete = async (item) => {
        try {
            const deletedRow = await axios.delete('http://localhost:5000/deleteApproverlist', {
                data: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    approverlistname: item.approverlistname,
                    branchname: item.branchname,
                    branchcode: item.branchcode
                }
            });

            getApproverlist();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleEdit(item) {
        try {
            setApproverName(item.approverlistname);
            setselectedBranch({ branchname: item.branchname, branchcode: item.branchcode });
            setVisible(true);
            seteditstate(true);
        } catch (error) {
            console.log(error);
        }
    }


    async function handleUpdate() {
        try {

            const response = await axios.put('http://localhost:5000/updateApproverlist', {
                approverName: approverName,
                selectedBranch: selectedBranch,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });

            toast.success('Approver name updated successfully');
            handleModalClose();
            getApproverlist();
            seteditstate(false);

        } catch (error) {
            console.error('Error updating approver name:', error);
            toast.error('Failed to update approver name');
        }
    }


    return (
        <CRow>
            <CCol xs={12}>
                <CForm>
                    <CTable hover responsive striped className=''>
                        <CTableHead>
                            <CTableRow color='dark'>
                                <CTableHeaderCell scope="col" className='row-font'>Approver List Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className='row-font'>Operations</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {allapproverlist && allapproverlist.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className='row-font'>{item.approverlistname}</CTableDataCell>
                                    <CTableDataCell className='row-font'>
                                        <CButton onClick={() => handleEdit(item)}>Edit</CButton>
                                        <CButton color="danger" onClick={() => handleDelete(item)}>Delete</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CForm>



                <CRow>
                    <CCardBody className='button-div'>
                        <div className='createjob-button'>
                            <CButton color="primary" type="submit" onClick={() => setVisible(!visible)}>
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
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">
                            Add Approver List Name
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>

                        <label htmlFor="ApproverName" className='text-field-3'>Approver Name</label>
                        <input
                            type='text'
                            id="ApproverName"
                            placeholder='Enter list name'
                            value={approverName}
                            onChange={handleChange}
                        />
                        <div>
                            <label htmlFor="Locations" className='text-field-3'>Locations</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedBranch.branchname ? selectedBranch.branchname : 'Select'}</CDropdownToggle>

                                <CDropdownMenu className="text-field-4">
                                    {allbranches && allbranches.map((item, index) => (
                                        <CDropdownItem key={index} onClick={(e) => { setselectedBranch({ branchname: item.ownbranchname, branchcode: item.branchcode }) }}>
                                            {item.ownbranchname}
                                        </CDropdownItem>
                                    ))}

                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={handleModalClose}>
                            Close
                        </CButton>
                        {
                            editstate ?
                                <CButton color="primary" onClick={handleUpdate}>
                                    Update
                                </CButton>
                                :
                                <CButton color="primary" onClick={handleAddApproverName}>
                                    Add
                                </CButton>
                        }

                    </CModalFooter>
                </CModal>

            </CCol>
        </CRow>
    )
}

export default Approvername;
