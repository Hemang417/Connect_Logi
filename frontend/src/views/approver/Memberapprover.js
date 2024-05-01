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
    CDropdownToggle
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Memberapprover = () => {
    const [employeesofbranch, setEmployeesOfBranch] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [allnames, setallnames] = useState([]);
    const [editstate, seteditstate] = useState(false);

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

    useEffect(() => {
        getEmployeesOfBranch();
        getallapprovernames();
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
                employeename: selectedEmployee
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
                employeeName: selectedEmployee
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
                    employeename: item.employeename
                }
            });
            await getallapprovernames();
        } catch (error) {
            console.log(error);
        }
    }


    const handleEdit = (item) => {
        setSelectedEmployee(item.employeename);
        setVisible(true);
        seteditstate(true);
    }



    return (
        <CRow>
            <CCol>
                <CForm>
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
                                        <CButton onClick={() => handleEdit(item)}>Edit</CButton>
                                        <CButton color="danger" onClick={() => handleDelete(item)}>Delete</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>

                    </CTable>
                </CForm>

                <CRow>
                    <CCardBody className="button-div">
                        <div className="createjob-button">
                            <CButton color="primary" type="submit" onClick={() => setVisible(!visible)}>
                                +
                            </CButton>
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
                        <CButton color="secondary" onClick={handleModalClose}>
                            Close
                        </CButton>
                        {
                            editstate ?
                                <CButton color="primary" onClick={handleUpdate}>
                                    Update
                                </CButton>
                                :
                                <CButton color="primary" onClick={handleAddApprover}>
                                    Add
                                </CButton>
                        }
                    </CModalFooter>
                </CModal>
            </CCol>
        </CRow>
    );
};

export default Memberapprover;
