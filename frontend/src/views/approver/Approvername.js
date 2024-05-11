// import React, { useEffect, useState } from 'react'
// import {
//     CCard,
//     CCardBody,
//     CCardHeader,
//     CCol,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableCaption,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//     CButton,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
//     CForm,
//     CDropdown,
//     CDropdownItem,
//     CDropdownMenu,
//     CDropdownToggle
// } from '@coreui/react'

// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

// const Approvername = () => {
//     const navigate = useNavigate();
//     const [visible, setVisible] = useState(false);
//     const [approverName, setApproverName] = useState('');
//     const [allbranches, setallbranches] = useState([]);
//     const [selectedBranch, setselectedBranch] = useState({});
//     const [allapproverlist, setallapproverlist] = useState([]);
//     const [editstate, seteditstate] = useState(false);
//     const [uniquevalue, setuniquevalue] = useState([]);

//     const location = useLocation();
//     if (location.pathname === '/approvername') {
//         localStorage.removeItem('approverlistname');
//         localStorage.removeItem('approverbranchname');
//         localStorage.removeItem('approverbranchcode');
//         localStorage.removeItem('uniquevalue');
//     }
//     const handleModalClose = () => {
//         setVisible(false);
//         setApproverName('');
//         setselectedBranch({});
//         seteditstate(false);
//         setuniquevalue([]);
//     };

//     const handleAddApproverName = async () => {
//         try {
//             // Send a backend request to add the approver name
//             const response = await axios.post('http://localhost:5000/storeApproverlist', {
//                 approverName: approverName,
//                 selectedBranch: selectedBranch,
//                 orgname: localStorage.getItem('orgname'),
//                 orgcode: localStorage.getItem('orgcode'),
//                 uniquevalue: uniquevalue.map(item => item.uniquevalue) // Extract only uniquevalue
//             });

//             // Handle success response
//             if (response.status === 200) {
//                 toast.success('Approver name added successfully');
//                 handleModalClose();
//                 getApproverlist();
//             } else {
//                 toast.error('Failed to add approver name');
//             }
//         } catch (error) {
//             console.error('Error adding approver name:', error);
//             toast.error('Failed to add approver name');
//         }
//     };

//     const getAllBranches = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                 }
//             })
//             setallbranches(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const getApproverlist = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/fetchApproverlist', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                 }
//             })
//             setallapproverlist(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     useEffect(() => {
//         getAllBranches();
//         getApproverlist();
//     }, [])


//     const handleChange = (e) => {
//         setApproverName(e.target.value);
//     };


//     const handleDelete = async (item) => {
//         try {
//             const deletedRow = await axios.delete('http://localhost:5000/deleteApproverlist', {
//                 data: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                     approverlistname: item.approverlistname,
//                     branchname: item.branchname,
//                     branchcode: item.branchcode
//                 }
//             });

//             getApproverlist();
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async function handleEdit(item) {
//         try {
//             setApproverName(item.approverlistname);
//             setselectedBranch({ branchname: item.branchname, branchcode: item.branchcode });
//             setVisible(true);
//             seteditstate(true);
//             setuniquevalue(item.uniquevalue)
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     const handleUpdate = async () => {
//         try {
//             const response = await axios.put('http://localhost:5000/updateApproverlist', {
//                 approverName: approverName,
//                 selectedBranch: selectedBranch,
//                 orgname: localStorage.getItem('orgname'),
//                 orgcode: localStorage.getItem('orgcode'),
//                 uniquevalue: uniquevalue.map(item => item.uniquevalue) // Extract only uniquevalue
//             });

//             toast.success('Approver name updated successfully');
//             handleModalClose();
//             getApproverlist();
//             seteditstate(false);
//         } catch (error) {
//             console.error('Error updating approver name:', error);
//             toast.error('Failed to update approver name');
//         }
//     };


//     async function handleMembers(item) {
//         localStorage.setItem('approverlistname', item.approverlistname);
//         localStorage.setItem('approverbranchname', item.branchname);
//         localStorage.setItem('approverbranchcode', item.branchcode);
//         localStorage.setItem('uniquevalue', item.uniquevalue);
//         navigate('/memberapprover')
//     }



//     return (
//         <CRow>
//             <CCol xs={12}>
//                 <CForm>
//                     <CTable hover responsive striped className=''>
//                         <CTableHead>
//                             <CTableRow color='dark'>
//                                 <CTableHeaderCell scope="col" className='row-font'>Approver List Name</CTableHeaderCell>
//                                 <CTableHeaderCell scope="col" className='row-font'>Operations</CTableHeaderCell>
//                             </CTableRow>
//                         </CTableHead>
//                         <CTableBody>
//                             {allapproverlist && allapproverlist.map((item, index) => (
//                                 <CTableRow key={index}>
//                                     <CTableDataCell className='row-font'>{item.approverlistname}</CTableDataCell>
//                                     <CTableDataCell className='row-font'>
//                                         <CButton onClick={() => handleEdit(item)}>Edit</CButton>
//                                         <CButton onClick={() => handleMembers(item)}>Add Members</CButton>
//                                         <CButton color="danger" onClick={() => handleDelete(item)}>Delete</CButton>
//                                     </CTableDataCell>
//                                 </CTableRow>
//                             ))}
//                         </CTableBody>
//                     </CTable>
//                 </CForm>



//                 <CRow>
//                     <CCardBody className='button-div'>
//                         <div className='createjob-button'>
//                             <CButton color="primary" type="submit" onClick={() => setVisible(!visible)}>
//                                 +
//                             </CButton>
//                         </div>
//                     </CCardBody>
//                 </CRow>

//                 <CModal
//                     visible={visible}
//                     onClose={handleModalClose}
//                     aria-labelledby="LiveDemoExampleLabel"
//                 >
//                     <CModalHeader onClose={() => setVisible(false)}>
//                         <CModalTitle id="LiveDemoExampleLabel">
//                             Add Approver List Name
//                         </CModalTitle>
//                     </CModalHeader>
//                     <CModalBody>

//                         <label htmlFor="ApproverName" className='text-field-3'>Approver Name</label>
//                         <input
//                             type='text'
//                             id="ApproverName"
//                             placeholder='Enter list name'
//                             value={approverName}
//                             onChange={handleChange}
//                         />
//                         <div>
//                             <label htmlFor="Locations" className='text-field-3'>Locations</label>
//                             <CDropdown>
//                                 <CDropdownToggle className="dropdown-btn" color='secondary'>{selectedBranch.branchname ? selectedBranch.branchname : 'Select'}</CDropdownToggle>

//                                 <CDropdownMenu className="text-field-4">
//                                     {allbranches && allbranches.map((item, index) => (
//                                         <CDropdownItem key={index} onClick={(e) => { setselectedBranch({ branchname: item.ownbranchname, branchcode: item.branchcode }) }}>
//                                             {item.ownbranchname}
//                                         </CDropdownItem>
//                                     ))}

//                                 </CDropdownMenu>
//                             </CDropdown>
//                         </div>


//                         <div>
//                             <label htmlFor="Unique Values" className='text-field-3'>Buttons</label>
//                             <div className="checkbox-container">
//                                 {['OrgButton', 'JobsButton', 'ImportBtn'].map((option, index) => {
//                                     const isChecked = uniquevalue.findIndex(item => item.uniquevalue === option) !== -1;

//                                     return (
//                                         <div key={index} className="checkbox-item">
//                                             <input
//                                                 type="checkbox"
//                                                 id={option}
//                                                 checked={isChecked}
//                                                 onChange={(e) => {
//                                                     if (e.target.checked) {
//                                                         setuniquevalue(prevValue => [...prevValue, { uniquevalue: option }]);
//                                                     } else {
//                                                         setuniquevalue(prevValue => prevValue.filter(val => val.uniquevalue !== option));
//                                                     }
//                                                 }}
//                                             />
//                                             <label htmlFor={option}>{option}</label>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>




//                     </CModalBody>
//                     <CModalFooter>
//                         <CButton color="secondary" onClick={handleModalClose}>
//                             Close
//                         </CButton>
//                         {
//                             editstate ?
//                                 <CButton color="primary" onClick={handleUpdate}>
//                                     Update
//                                 </CButton>
//                                 :
//                                 <CButton color="primary" onClick={handleAddApproverName}>
//                                     Add
//                                 </CButton>
//                         }

//                     </CModalFooter>
//                 </CModal>

//             </CCol>
//         </CRow>
//     )
// }

// export default Approvername;



































import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCardBody,
    CCol,
    CForm,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CPopover,
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Approvername = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize state variables
    const [visible, setVisible] = useState(false);
    const [approverName, setApproverName] = useState('');
    const [allbranches, setAllBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState({});
    const [allApproverList, setAllApproverList] = useState([]);
    const [editState, setEditState] = useState(false);
    const [uniqueValue, setUniqueValue] = useState('');
    const uniqueValuesArray = ['OrgButton', 'JobsButton', 'ImportBtn'];

    // Clear unnecessary items from local storage
    useEffect(() => {
        if (location.pathname === '/approvername') {
            localStorage.removeItem('approverlistname');
            localStorage.removeItem('approverbranchname');
            localStorage.removeItem('approverbranchcode');
            localStorage.removeItem('uniquevalue');
            localStorage.removeItem('approverid')
        }
    }, [location.pathname]);

    // Fetch branches and approver list on component mount
    useEffect(() => {
        getAllBranches();
        getApproverList();
    }, []);

    // Fetch all branches
    const getAllBranches = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setAllBranches(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (item) => {
        try {
            const deleted = await axios.delete('http://localhost:5000/deleteApproverlist', {
                data: {
                    item: item
                }
            })
            if (deleted.status === 200) {
                getApproverList();
            }
        } catch (error) {
            console.log(error);
        }
    }


    // Fetch approver list
    const getApproverList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchApproverlist', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchname: localStorage.getItem('branchnameofemp'),
                    branchcode: localStorage.getItem('branchcodeofemp'),
                }
            });
            setAllApproverList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        setApproverName(e.target.value);
    };

    // Handle modal close
    const handleModalClose = () => {
        setVisible(false);
        setApproverName('');
        setSelectedBranch({});
        setEditState(false);
        setUniqueValue('');
    };

    // Handle adding approver name
    const handleAddApproverName = async () => {
        try {
            const response = await axios.post('http://localhost:5000/storeApproverlist', {
                approverName: approverName,
                selectedBranch: selectedBranch,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                uniquevalue: uniqueValue ? [uniqueValue] : [], // Extract only selected values
            });
            if (response.status === 200) {
                toast.success('Approver name added successfully');
                handleModalClose();
                getApproverList();
            } else {
                toast.error('Failed to add approver name');
            }
        } catch (error) {
            console.error('Error adding approver name:', error);
            toast.error('Failed to add approver name');
        }
    };


    const [id, setid] = useState('');
    // Handle editing an approver
    const handleEdit = (item) => {
        setApproverName(item.approverlistname);
        setSelectedBranch({ branchname: item.branchname, branchcode: item.branchcode });
        setid(item.id)
        setVisible(true);
        setEditState(true);
        setUniqueValue(item.uniquevalue[0]);
    };

    // Handle updating an approver
    const handleUpdate = async () => {
        try {

            const response = await axios.put('http://localhost:5000/updateApproverlist', {
                approverName: approverName,
                selectedBranch: selectedBranch,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                uniquevalue: uniqueValue ? [uniqueValue] : [],
                id: id // Extract only selected values
            });
            toast.success('Approver name updated successfully');
            handleModalClose();
            getApproverList();
            setEditState(false);
        } catch (error) {
            console.error('Error updating approver name:', error);
            toast.error('Failed to update approver name');
        }
    };


    async function handleMembers(item) {
        localStorage.setItem('approverlistname', item.approverlistname);
        localStorage.setItem('approverbranchname', item.branchname);
        localStorage.setItem('approverbranchcode', item.branchcode);
        localStorage.setItem('uniquevalue', item.uniquevalue);
        localStorage.setItem('approverid', item.id)
        navigate('/memberapprover')
    }


    // Render the component
    return (
        <CRow>
            <CCol xs={12}>
                <CForm>
                    <CTable hover responsive striped className="">
                        <CTableHead>
                            <CTableRow color="dark">
                                <CTableHeaderCell scope="col" className="row-font">Approver List Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className="row-font">Operations</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {allApproverList.map((item, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className="row-font">{item.approverlistname}</CTableDataCell>
                                    <CTableDataCell className="row-font">
                                        <CPopover content="Edit the approver list" trigger={['hover', 'focus']}>
                                            <CButton onClick={() => handleEdit(item)}>Edit</CButton>
                                        </CPopover>
                                        <CPopover content="Add approvers to the approver list" trigger={['hover', 'focus']}>
                                            <CButton onClick={() => handleMembers(item)}>Add Members</CButton>
                                        </CPopover>
                                        <CPopover content="Delete the approver list" trigger={['hover', 'focus']}>
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
                            <CButton color="primary" type="submit" onClick={() => setVisible(!visible)}>+</CButton>
                        </div>
                    </CCardBody>
                </CRow>

                <CModal visible={visible} onClose={handleModalClose} aria-labelledby="LiveDemoExampleLabel">
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Add Approver List Name</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label htmlFor="ApproverName" className="text-field-3">Approver Name</label>
                        <input type="text" id="ApproverName" placeholder="Enter list name" value={approverName} onChange={handleChange} />
                        <div>
                            <label htmlFor="Locations" className="text-field-3">Locations</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color="secondary">{selectedBranch.branchname ? selectedBranch.branchname : 'Select'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    {allbranches.map((item, index) => (
                                        <CDropdownItem key={index} onClick={() => { setSelectedBranch({ branchname: item.ownbranchname, branchcode: item.branchcode }) }}>{item.ownbranchname}</CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div>
                            <label htmlFor="UniqueValues" className="text-field-3">Buttons</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color="secondary">{uniqueValue ? uniqueValue : 'Select'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    {uniqueValuesArray.map((option, index) => (
                                        <CDropdownItem key={index} onClick={() => { setUniqueValue(option) }}>{option}</CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CPopover content="Close the modal" trigger={['hover', 'focus']}>
                            <CButton color="secondary" onClick={handleModalClose}>Close</CButton>
                        </CPopover>
                        {editState ?
                            <CPopover content="Update the approver list" trigger={['hover', 'focus']}>
                                <CButton color="primary" onClick={handleUpdate}>Update</CButton>
                            </CPopover>
                            :
                            <CPopover content="Create a approver list" trigger={['hover', 'focus']}>
                                <CButton color="primary" onClick={handleAddApproverName}>
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

export default Approvername;
