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
import '../../css/styles.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

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


    useEffect(() => {
        const checkToken = async () => {
          const token = Cookies.get('userauthtoken');
          if (!token){
            navigate('/login')
          }
        };
        checkToken();
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
                <CRow>
                    <CCardBody className="button-div">
                        <div className="createjob-button">
                        {/* ADD BUTTON */}
                            <svg type="submit" onClick={() => setVisible(!visible)} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                            </svg>
                        {/* ADD BUTTON ENDS*/}
                        </div>
                    </CCardBody>
                </CRow>
                <CForm className='approver-table'>
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
                                        {/* <CPopover content="Edit the approver list" trigger={['hover', 'focus']}> */}

                                    {/* EDIT BUTTON */}
                                        <svg className='edit-button-approver-1' onClick={() => handleEdit(item)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                                        </svg>
                                    {/* EDIT BUTTON ENDS*/}

                                        {/* </CPopover> */}
                                        {/* <CPopover content="Add approvers to the approver list" trigger={['hover', 'focus']}> */}

                                    {/* ADD MEMBER BUTTON */}
                                        <svg className='addmembers-button-approver-1' onClick={() => handleMembers(item)} width="30px" height="30px" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_14_1995)">
                                                <path d="M27.865 31.758C33.5972 31.758 38.244 27.1112 38.244 21.379C38.244 15.6468 33.5972 11 27.865 11C22.1328 11 17.486 15.6468 17.486 21.379C17.486 27.1112 22.1328 31.758 27.865 31.758Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M40 36.346C37.0313 33.3973 33.0142 31.7466 28.83 31.756H26.9C22.6831 31.756 18.6388 33.4312 15.657 36.413C12.6752 39.3948 11 43.4391 11 47.656V52.516H44.73V51.756" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M48.621 38.146V46.123" stroke="#426AB2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M52.609 42.134H44.632" stroke="#426AB2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_14_1995">
                                                    <rect width="45.609" height="45.516" fill="white" transform="translate(9 9)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    {/* ADD MEMBER BUTTON END*/}

                                        {/* </CPopover> */}
                                        {/* <CPopover content="Delete the approver list" trigger={['hover', 'focus']}> */}

                                    {/* DELETE BUTTON */}
                                        <img className='delete-button-approver-1' onClick={() => handleDelete(item)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                                    {/* DELETE BUTTON ENDS*/}

                                        {/* </CPopover> */}
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CForm>



                <CModal visible={visible} onClose={handleModalClose} aria-labelledby="LiveDemoExampleLabel">
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Add Approver List Name</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <label htmlFor="ApproverName" className="text-field-3"><h6>Approver Name</h6></label>
                        <input className='approver-inputfield' type="text" id="ApproverName" placeholder="Enter list name" value={approverName} onChange={handleChange} />
                        <div className='mt-3'>
                            <label htmlFor="Locations" className="text-field-3"><h6>Locations</h6></label>
                            <CDropdown className='approver-inputfield'>
                                <CDropdownToggle className="dropdown-btn" color="secondary">{selectedBranch.branchname ? selectedBranch.branchname : 'Select'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4 approver-inputfield">
                                    {allbranches.map((item, index) => (
                                        <CDropdownItem className='approver-inputfield-1' key={index} onClick={() => { setSelectedBranch({ branchname: item.ownbranchname, branchcode: item.branchcode }) }}>{item.ownbranchname}</CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div>
                            <label htmlFor="UniqueValues" className="text-field-3 mt-3"><h6>Buttons</h6></label>
                            <CDropdown className='approver-inputfield'>
                                <CDropdownToggle className="dropdown-btn" color="secondary">{uniqueValue ? uniqueValue : 'Select'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4 approver-inputfield">
                                    {uniqueValuesArray.map((option, index) => (
                                        <CDropdownItem className='approver-inputfield-1' key={index} onClick={() => { setUniqueValue(option) }}>{option}</CDropdownItem>
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
