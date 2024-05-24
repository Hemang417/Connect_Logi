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
    CPopover,
    CCard
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





    const addToLocalStorage = (employeeName) => {
        // Retrieve existing data from local storage
        const existingData = JSON.parse(localStorage.getItem('approverData')) || [];
        // Add new employee name to the existing data
        const updatedData = [...existingData, { uniqueValue: localStorage.getItem('uniquevalue'), employeeName }];
        // Update local storage
        localStorage.setItem('approverData', JSON.stringify(updatedData));
    };

    const updateLocalStorage = (employeeName) => {
        // Retrieve existing data from local storage
        const existingData = JSON.parse(localStorage.getItem('approverData')) || [];
        // Update employee name in the existing data
        const updatedData = existingData.map(item => {
            if (item.uniqueValue === localStorage.getItem('uniquevalue')) {
                return { ...item, employeeName };
            }
            return item;
        });
        // Update local storage
        localStorage.setItem('approverData', JSON.stringify(updatedData));
    };

    const removeFromLocalStorage = (employeeName) => {
        // Retrieve existing data from local storage
        const existingData = JSON.parse(localStorage.getItem('approverData')) || [];
        // Remove the employee name from the existing data
        const updatedData = existingData.filter(item => item.employeeName !== employeeName);
        // Update local storage
        localStorage.setItem('approverData', JSON.stringify(updatedData));
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
                    updateLocalStorage(selectedEmployee);
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
                    <CCard>
                        <CCardBody className="button-div memberapprover">
                            {/* <div className='memberapprover-no'> */}
                            <h6 className='memberapprover-totalapprover mt-3'>Total Approver: {allnames.length}</h6>

                            <h6 className='memberapprover-howmanyapprover mt-3'>Choose How Many Approvers: <input type="number" max={allnames.length} value={selectedCount} name='selectedCount' onChange={(e) => setselectedCount(e.target.value)} /></h6>
                            <CButton className='memberapprover-submit mt-2' color="primary" onClick={storeSelectedCount}>Submit</CButton>

                            {/* </div> */}
                        </CCardBody>
                    </CCard>

                    <CRow>
                        <CCardBody className="button-div mt-2">
                            {/* ADD BUTTON */}
                            <svg className='memberapprover-addbutton' type="submit" onClick={() => setVisible(!visible)} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                            </svg>
                            {/* ADD BUTTON ENDS*/}
                        </CCardBody>
                    </CRow>
                    <div className='memberapprover-table'>
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
                                            {/* DELETE BUTTON */}
                                            <img className="deletebutton-milestone-workflow" onClick={() => handleDelete(index)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                                            {/* DELETE BUTTON ENDS*/}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>

                        </CTable>
                    </div>
                </CForm>



                <CModal visible={visible} onClose={handleModalClose} aria-labelledby="LiveDemoExampleLabel">
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Add Approvers List</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label><h6>Name of Approver</h6></label>
                        <CDropdown className='addapproverlist-memberapprover'>
                            <CDropdownToggle className="dropdown-btn" color="secondary">
                                {selectedEmployee ? selectedEmployee : 'Select'}
                            </CDropdownToggle>
                            <CDropdownMenu className="text-field-4 addapproverlist-memberapprover">
                                {employeesofbranch && employeesofbranch.map((item, index) => (
                                    <CDropdownItem className='addapproverlist-memberapprover-1'
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
