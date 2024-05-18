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

const BranchList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ownBranch, setOwnBranch] = useState([]);
    const [editData, setEditData] = useState(null);
    const [visible, setVisible] = useState(false);

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


    function gotobranches(){
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
                        <CPopover content="Create a role" trigger={['hover', 'focus']}>
                            <CButton color="primary" onClick={gotobranches}>
                                +
                            </CButton>
                        </CPopover>
                    </div>
                </CCardBody>
            </CRow>


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
                                <CPopover content="Edit branch" trigger={['hover', 'focus']}>
                                    <Link onClick={() => handleEdit(item)}>Edit</Link>
                                </CPopover>
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                <CPopover content="Delete Branch" trigger={['hover', 'focus']}>
                                    <Link onClick={() => handleDelete(item)}>Delete</Link>
                                </CPopover>
                            </CTableHeaderCell>
                            <CTableDataCell>{item.branchcode}</CTableDataCell>
                            <CTableDataCell>{item.ownbranchname}</CTableDataCell>
                            <CTableDataCell>{item.gstnum}</CTableDataCell>
                            <CTableDataCell>{item.headname}</CTableDataCell>
                            <CTableDataCell>{item.headnum}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

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
                        <input
                            type="text"
                            name='ownbranchname'
                            placeholder="Branchname"
                            className='text-field-1'
                            value={editData?.ownbranchname || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='headname'
                            placeholder="Head Name"
                            className='text-field-1'
                            value={editData?.headname || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='headnum'
                            placeholder="Head Number"
                            className='text-field-1'
                            value={editData?.headnum || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='address'
                            placeholder="Address"
                            className='text-field-1'
                            value={editData?.address || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='gstnum'
                            placeholder="GST"
                            className='text-field-1'
                            value={editData?.gstnum || ''}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='iecnum'
                            placeholder="IEC"
                            className='text-field-1'
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
