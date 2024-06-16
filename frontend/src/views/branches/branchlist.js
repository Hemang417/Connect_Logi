// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import {
//     CTable,
//     CTableBody,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//     CButton,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter
// } from '@coreui/react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../../css/styles.css';
// import { useLocation } from 'react-router-dom'

// const branchlist = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [ownBranch, setownBranch] = useState([]);

//     useEffect(() => {
//         const fetchOwnBranches = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
//                     params: {
//                         orgname: localStorage.getItem('orgname'),
//                         orgcode: localStorage.getItem('orgcode')
//                     }
//                 });
//                 setownBranch(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchOwnBranches();
//     }, [])

//     const [editData, seteditData] = useState(null);
//     const [visible, setVisible] = useState(false);
//     const handleEdit = async (item) => {
//         seteditData(item);
//         setVisible(true)
//     }

//     return (
//         <div>
//             <CTable hover responsive striped className=''>
//                 <CTableHead>
//                     <CTableRow color='dark'>
//                         <CTableHeaderCell scope="col"></CTableHeaderCell>
//                         <CTableHeaderCell scope="col">Branch Code</CTableHeaderCell>
//                         <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
//                         <CTableHeaderCell scope="col">GST No.</CTableHeaderCell>
//                         <CTableHeaderCell scope="col">Branch Head Name</CTableHeaderCell>
//                         <CTableHeaderCell scope="col">Branch Head Mobile No.</CTableHeaderCell>
//                     </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                     {ownBranch.length > 0 && ownBranch.map((item, index) => (
//                         <CTableRow key={index}>
//                             <CTableHeaderCell scope="row">
//                                 <Link onClick={() => handleEdit(item)}>Edit</Link>
//                             </CTableHeaderCell>
//                             <CTableDataCell>{item.branchcode}</CTableDataCell>
//                             <CTableDataCell>{item.ownbranchname}</CTableDataCell>
//                             <CTableDataCell>{item.gstnum}</CTableDataCell>
//                             <CTableDataCell>{item.headname}</CTableDataCell>
//                             <CTableDataCell>{item.headnum}</CTableDataCell>
//                         </CTableRow>

//                     ))}
//                 </CTableBody>

//             </CTable>

//             <CModal
//                 visible={visible}
//                 onClose={() => { setVisible(false) }}
//                 aria-labelledby="LiveDemoExampleLabel"
//             >
//                 <CModalHeader onClose={() => setVisible(false)}>
//                     <CModalTitle id="LiveDemoExampleLabel">Add TAT</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <div>
//                         <input type="text" name='headname' placeholder="Head Name" className='text-field-1'  />
//                         <input type="text" name='headnum' placeholder="Head Number" className='text-field-1'  />
//                         <input type="text" name='address' placeholder="Address" className='text-field-1'  />
//                         <input type="text" name='ownbranchname' placeholder="Branch Name" className='text-field-1' />
//                         <input type="text" name='gstnum' placeholder="GST" className='text-field-1'  />
//                         <input type="text" name='iecnum' placeholder="IEC" className='text-field-1'  />
//                     </div>
//                     <CButton>Update</CButton> 
//                     <CButton onClick={() => setVisible(false)}>Close</CButton>
//                 </CModalBody>

//             </CModal>

//         </div>
//     );
// };

// export default branchlist;



















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    CTable,
    CTableBody,
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
    CPopover,
    CRow, CCardBody
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/styles.css';
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
const BranchList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ownBranch, setOwnBranch] = useState([]);
    const [editData, setEditData] = useState(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const checkToken = async () => {
          const token = Cookies.get('userauthtoken');
          if (token) {
            // Token exists, redirect to dashboard
            navigate('/dashboard');
          }else{
            navigate('/login')
          }
        };
        checkToken();
      }, []);

    const fetchOwnBranches = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            });
            setOwnBranch(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOwnBranches();
    }, []);

    const handleEdit = (item) => {
        setEditData(item);
        setVisible(true);
    };

    const handleUpdate = async () => {
        try {
            const updatedEditData = await axios.put('http://localhost:5000/updateOwnBranch', editData);
            setVisible(false);
            fetchOwnBranches();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };


    async function handleDelete(item) {
        try {
            const deleteData = await axios.delete('http://localhost:5000/deleteOwnBranch', {
                params: {
                    id: item.id,
                    orgname: item.orgname,
                    orgcode: item.orgcode
                }
            });
            fetchOwnBranches();
        } catch (error) {
            console.log(error);
        }
    }


    function gotobranches() {
        try {
            navigate('/branches');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>

            <CRow>
                <CCardBody className="button-div">
                    <div className="createjob-button">
                        {/* <CPopover content="Create a role" trigger={['hover', 'focus']}> */}
                        {/* <CButton color="primary" > */}
                        {/* ADD BUTTON */}
                        <svg className='branchlist-addbutton' onClick={gotobranches} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                        </svg>
                        {/* ADD BUTTON ENDS*/}

                        {/* </CButton> */}
                        {/* </CPopover> */}
                    </div>
                </CCardBody>
            </CRow>

            <div className='branchlist-table'>
                <CTable hover responsive striped className=''>
                    <CTableHead>
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col"></CTableHeaderCell>
                            <CTableHeaderCell scope="col"></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Branch Code</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">GST No.</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Branch Head Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Branch Head Mobile No.</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {ownBranch.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableHeaderCell scope="row">
                                    {/* <CPopover content="Edit branch" trigger={['hover', 'focus']}> */}
                                    <Link onClick={() => handleEdit(item)}>
                                        {/* EDIT BUTTON */}
                                        <svg className='edit-button-approver-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                                        </svg>
                                        {/* EDIT BUTTON ENDS*/}
                                    </Link>
                                    {/* </CPopover> */}
                                    {/* </CTableHeaderCell>
                                <CTableHeaderCell> */}
                                    {/* <CPopover content="Delete Branch" trigger={['hover', 'focus']}> */}
                                    <Link onClick={() => handleDelete(item)}>
                                        {/* DELETE BUTTON */}
                                        <img className='delete-button-approver-1' width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                                        {/* DELETE BUTTON ENDS*/}
                                    </Link>
                                    {/* </CPopover> */}
                                </CTableHeaderCell>
                                <CTableHeaderCell></CTableHeaderCell>
                                <CTableDataCell>{item.branchcode}</CTableDataCell>
                                <CTableDataCell>{item.ownbranchname}</CTableDataCell>
                                <CTableDataCell>{item.gstnum}</CTableDataCell>
                                <CTableDataCell>{item.headname}</CTableDataCell>
                                <CTableDataCell>{item.headnum}</CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>

            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Edit Branch</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <label><h6>Branch Name</h6></label>
                        <input
                            type="text"
                            name='ownbranchname'
                            className='branchlist-inputfield-1'
                            value={editData?.ownbranchname || ''}
                            onChange={handleChange}
                        />
                        <label><h6>Branch Incharge</h6></label>
                        <input
                            type="text"
                            name='headname'
                            placeholder=""
                            className='branchlist-inputfield-2 mt-2'
                            value={editData?.headname || ''}
                            onChange={handleChange}
                        />
                        <label><h6>Branch Incharge No.</h6></label>
                        <input
                            type="text"
                            name='headnum'
                            className='branchlist-inputfield-3 mt-2'
                            value={editData?.headnum || ''}
                            onChange={handleChange}
                        />
                        <label><h6>Branch Address</h6></label>
                        <input
                            type="text"
                            name='address'
                            className='branchlist-inputfield-4 mt-2'
                            value={editData?.address || ''}
                            onChange={handleChange}
                        />
                        <label><h6>GST No.</h6></label>
                        <input
                            type="text"
                            name='gstnum'
                            placeholder="GST"
                            className='branchlist-inputfield-5 mt-2'
                            value={editData?.gstnum || ''}
                            onChange={handleChange}
                        />
                        <label><h6>IEC No.</h6></label>
                        <input
                            type="text"
                            name='iecnum'
                            placeholder="IEC"
                            className='branchlist-inputfield-6 mt-2'
                            value={editData?.iecnum || ''}
                            onChange={handleChange}
                        />

                    </div>
                </CModalBody>
                <CModalFooter>
                    <CPopover content="Update branch details" trigger={['hover', 'focus']}>
                        <CButton color="primary" onClick={handleUpdate}>Update</CButton>
                    </CPopover>
                    <CPopover content="Close the modal" trigger={['hover', 'focus']}>
                        <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
                    </CPopover>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default BranchList;
