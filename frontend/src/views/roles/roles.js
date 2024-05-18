import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
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
    CPopover
} from '@coreui/react';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserRoles = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [storedRoles, setStoredRoles] = useState([]);
    const [editRoleId, setEditRoleId] = useState(false);
    const [idofitem, setidofitem] = useState(null) // State to store the ID of the role being edited

    const handleModalClose = () => {
        setVisible(false);
        setUserRole('');
        setEditRoleId(false);
        setidofitem(null)
        // Clear editRoleId when closing the modal
    };

    const handleAddUserRole = async () => {
        // Perform validation if needed
        if (userRole.trim() === '') {
            toast.error('Please enter a user role.');
            return;
        }

        if (editRoleId) {
            // Update operation
            try {
                await axios.put(`http://localhost:5000/updateuserrole/${editRoleId}`, {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    userrole: userRole
                });
                toast.success(`User role "${userRole}" updated successfully.`);
                handleModalClose();
                GetallRoles();
            } catch (error) {
                console.log(error);
                toast.error('Failed to update user role.');
            }
        } else {
            // Add operation
            try {
                await axios.post('http://localhost:5000/storeuserrole', {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    userrole: userRole
                });
                toast.success(`User role "${userRole}" added successfully.`);
                handleModalClose();
                GetallRoles();
            } catch (error) {
                console.log(error);
                toast.error('Failed to add user role.');
            }
        }
    };

    const GetallRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getuserroles', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setStoredRoles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (item) => {
        try {
            await axios.delete('http://localhost:5000/deleteduserrole', {
                data: {
                    orgname: item.orgname,
                    orgcode: item.orgcode,
                    userrole: item.rolename
                }
            })
            toast.success(`User role "${item.rolename}" deleted successfully.`);
            GetallRoles();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete user role.');
        }
    }

    const handleEdit = (item) => {
        setUserRole(item.rolename); // Populate the input field with the role being edited
        setEditRoleId(true); // Set the ID of the role being edited
        setVisible(true);
        setidofitem(item.id)
    };

    useEffect(() => {
        GetallRoles();
    }, [])

    async function handleUpdate() {
        // Perform validation if needed
        if (userRole.trim() === '') {
            toast.error('Please enter a user role.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/updateuserrole`, {
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                userrole: userRole,
                id: idofitem
            });
            if (response.status === 200) {
                toast.success(`User role "${userRole}" updated successfully.`);
                handleModalClose();
                GetallRoles();
                setidofitem(null);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to update user role.');
        }
    }




    return (
        <CRow>

            <CRow>
                <CCardBody className="button-div">
                    <div className="createjob-button">
                        <CPopover content="Create a role" trigger={['hover', 'focus']}>
                            <CButton color="primary" onClick={() => setVisible(!visible)}>
                                +
                            </CButton>
                        </CPopover>
                    </div>
                </CCardBody>
            </CRow>

            <CCol xs={12}>
                <CForm>
                    <CTable hover responsive striped>
                        <CTableHead>
                            <CTableRow color="dark">
                                <CTableHeaderCell scope="col">User Role</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Operations</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {storedRoles && storedRoles.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className='row-font'>{item.rolename}</CTableDataCell>
                                    <CTableDataCell className='row-font'>
                                        <CPopover content="Edit the role" trigger={['hover', 'focus']}>
                                            <CButton onClick={() => handleEdit(item)}>Edit</CButton>
                                        </CPopover>
                                        <CPopover content="Delete the role" trigger={['hover', 'focus']}>
                                            <CButton onClick={() => handleDelete(item)}>Delete</CButton>
                                        </CPopover>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CForm>

                <CModal
                    visible={visible}
                    onClose={handleModalClose}
                    aria-labelledby="LiveDemoExampleLabel"
                >
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">{editRoleId ? 'Edit' : 'Add'} User Role</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label htmlFor="Userrole">Role</label>
                        <input
                            type="text"
                            placeholder="Enter user role"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                        />
                    </CModalBody>
                    <CModalFooter>
                        <CPopover content="Close the modal" trigger={['hover', 'focus']}>
                            <CButton color="secondary" onClick={handleModalClose}>
                                Close
                            </CButton>
                        </CPopover>

                        {
                            editRoleId ?
                                <CPopover content="Update the Role" trigger={['hover', 'focus']}>
                                    <CButton color="primary" onClick={handleUpdate}>
                                        Update
                                    </CButton>
                                </CPopover>
                                :
                                <CPopover content="Add the user role" trigger={['hover', 'focus']}>
                                    <CButton color="primary" onClick={handleAddUserRole}>
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

export default UserRoles;
