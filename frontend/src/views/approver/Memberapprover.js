import React, { useEffect, useState } from 'react';
import {
    CCol,
    CCardBody,
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
    CDropdownToggle,
    CPopover
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Memberapprover = () => {
    const [employeesofbranch, setEmployeesOfBranch] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [allnames, setallnames] = useState([]);
    const [editstate, seteditstate] = useState(false);
    const [selectedCount, setselectedCount] = useState('');

    const getallapprovernames = async () => {
        try {
            const allnamesofemployees = await axios.get('http://localhost:5000/getallapprovernames', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchname: localStorage.getItem('approverbranchname'),
                    branchcode: localStorage.getItem('approverbranchcode'),
                    approverlistname: localStorage.getItem('approverlistname')
                }
            });
            setallnames(allnamesofemployees.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getEmployeesOfBranch = async () => {
        try {
            const allemployees = await axios.get('http://localhost:5000/getAlltheemployeeswiththatbranchaccess', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchname: localStorage.getItem('approverbranchname')
                }
            });
            setEmployeesOfBranch(allemployees.data);
        } catch (error) {
            console.log(error);
        }
    };


    async function getSelectedCount() {
        try {
            const response = await axios.get(`http://localhost:5000/getSelectedCount`, {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchname: localStorage.getItem('approverbranchname'),
                    branchcode: localStorage.getItem('approverbranchcode'),
                    approverlistname: localStorage.getItem('approverlistname')
                }
            })
            setselectedCount(response.data[0].selectedcount);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getEmployeesOfBranch();
        getallapprovernames();
        getSelectedCount();
    }, []);

    const handleModalClose = () => {
        setVisible(false);
        setSelectedEmployee('');
        seteditstate(false);
    };


    const handleUpdate = () => {
        try {
            axios.put('http://localhost:5000/updateapprovername', {
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                branchname: localStorage.getItem('approverbranchname'),
                branchcode: localStorage.getItem('approverbranchcode'),
                approverlistname: localStorage.getItem('approverlistname'),
                employeename: selectedEmployee,
                id: localStorage.getItem('approverid'),
            }).then((response) => {
                if (response.status === 200) {
                    toast.success('Approver updated successfully');
                    handleModalClose();
                    getallapprovernames();
                } else {
                    toast.error('Failed to update approver');
                }
            });
        } catch (error) {
            console.error('Error updating approver:', error);
            toast.error('Failed to update approver');
        }
    }

    const handleAddApprover = async () => {
        try {
            // Send a request to the backend to add the selected employee as an approver
            const response = await axios.post('http://localhost:5000/addApprover', {
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                branchname: localStorage.getItem('approverbranchname'),
                approverlistname: localStorage.getItem('approverlistname'),
                branchcode: localStorage.getItem('approverbranchcode'),
                employeeName: selectedEmployee,
                uniquevalue: localStorage.getItem('uniquevalue'),
                id: localStorage.getItem('approverid')
            });

            if (response.status === 200) {
                toast.success('Approver added successfully');
                handleModalClose();
                getallapprovernames();
            } else {
                toast.error('Failed to add approver');
            }
        } catch (error) {
            console.error('Error adding approver:', error);
            toast.error('Failed to add approver');
        }
    };


    async function handleDelete(item) {
        try {
            const deletedRow = await axios.delete('http://localhost:5000/deleteapprovername', {
                data: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchname: localStorage.getItem('approverbranchname'),
                    branchcode: localStorage.getItem('approverbranchcode'),
                    approverlistname: localStorage.getItem('approverlistname'),
                    employeename: item.employeename,
                    id: localStorage.getItem('approverid'),
                }
            });
            toast.success(`Approver deleted successfully`)
            await getallapprovernames();
        } catch (error) {
            console.log(error);
            toast.error(`Error in approver deletion`)
        }
    }


    const handleEdit = (item) => {
        setSelectedEmployee(item.employeename);
        setVisible(true);
        seteditstate(true);
    }



    async function storeSelectedCount() {
        const response = await axios.put(`http://localhost:5000/updateSelectedCount`, {
            orgname: localStorage.getItem('orgname'),
            orgcode: localStorage.getItem('orgcode'),
            branchname: localStorage.getItem('approverbranchname'),
            branchcode: localStorage.getItem('approverbranchcode'),
            approverlistname: localStorage.getItem('approverlistname'),
            selectedCount: selectedCount
        })
    }


    return (
        <CRow>
            <CCol>
                <CForm>
                    <div>
                        Total Approver: {allnames.length}
                    </div>
                    <div>
                        Choose How Many Approvers: <input type="number" max={allnames.length} value={selectedCount} name='selectedCount' onChange={(e) => setselectedCount(e.target.value)} />
                    </div>
                    <div>
                        <CPopover content="Select number of selected people to approve" trigger={['hover', 'focus']}>
                            <CButton color="primary" onClick={storeSelectedCount}>Submit</CButton>
                        </CPopover>
                    </div>
                    <CTable hover responsive striped className="">
                        <CTableHead>
                            <CTableRow color="dark">
                                <CTableHeaderCell scope="col" className="row-font">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className="row-font">Operations</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>

                        <CTableBody>
                            {allnames && allnames.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className='row-font'>{item.employeename}</CTableDataCell>
                                    <CTableDataCell className='row-font'>
                                        <CPopover content="Edit approver name" trigger={['hover', 'focus']}>
                                            <CButton onClick={() => handleEdit(item)}>Edit</CButton>
                                        </CPopover>
                                        <CPopover content="Delete the approver name" trigger={['hover', 'focus']}>
                                            <CButton color="danger" onClick={() => handleDelete(item)}>Delete</CButton>
                                        </CPopover>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>

                    </CTable>
                </CForm>

                <CRow>
                    <CCardBody className="button-div">
                        <div className="createjob-button">
                            <CPopover content="Create a member in approver list" trigger={['hover', 'focus']}>
                                <CButton color="primary" type="submit" onClick={() => setVisible(!visible)}>
                                    +
                                </CButton>
                            </CPopover>
                        </div>
                    </CCardBody>
                </CRow>

                <CModal visible={visible} onClose={handleModalClose} aria-labelledby="LiveDemoExampleLabel">
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Add Approvers to the List</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label>Name of Approver</label>
                        <CDropdown>
                            <CDropdownToggle className="dropdown-btn" color="secondary">
                                {selectedEmployee ? selectedEmployee : 'Select'}
                            </CDropdownToggle>
                            <CDropdownMenu className="text-field-4">
                                {employeesofbranch && employeesofbranch.map((item, index) => (
                                    <CDropdownItem
                                        key={index}
                                        onClick={() => setSelectedEmployee(item.username)}
                                    >
                                        {item.username}
                                    </CDropdownItem>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>
                    </CModalBody>
                    <CModalFooter>
                        <CPopover content="Close Modal" trigger={['hover', 'focus']}>
                            <CButton color="secondary" onClick={handleModalClose}>
                                Close
                            </CButton>
                        </CPopover>
                        {
                            editstate ?
                                <CPopover content="Update approver details" trigger={['hover', 'focus']}>
                                    <CButton color="primary" onClick={handleUpdate}>
                                        Update
                                    </CButton>
                                </CPopover>

                                :
                                <CPopover content="Add approver details" trigger={['hover', 'focus']}>
                                    <CButton color="primary" onClick={handleAddApprover}>
                                        Add
                                    </CButton>
                                </CPopover>

                        }
                    </CModalFooter>
                </CModal>
            </CCol>
        </CRow>
    );
};

export default Memberapprover;
