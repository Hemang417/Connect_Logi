// import React, { useState, useEffect } from 'react';
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
//     CDropdown,
//     CDropdownToggle,
//     CDropdownMenu,
//     CDropdownItem,
//     CFormInput,
//     CFormLabel,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
//     CForm,
//     CButton,
//     CNav,
//     CNavItem,
//     CNavLink
// } from '@coreui/react';
// import '../../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Lob = () => {
//     const [lobdata, setLobdata] = useState([]);

//     const [visible, setvisible] = useState(false);
//     const [selectedLob, setSelectedLob] = useState(null);

//     const fetchLOBdata = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/getlob', {
//                 params: {
//                     orgcode: localStorage.getItem('orgcode'),
//                     orgname: localStorage.getItem('orgname')
//                 }
//             });
//             setLobdata(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchLOBdata();
//     }, [])

//     // setInterval(() => {
//     //     fetchLOBdata();
//     // }, 2000)


//     const handleEdit = (index) => {
//         // Set the selected LOB for editing
//         setSelectedLob(lobdata[index]);
//         // Open the modal
//         setvisible(true);
//     };

//     const handleDelete = async (index) => {
//         try {
//             const lobIdToDelete = lobdata[index].id;
//             const deletedRow = await axios.delete('http://localhost:5000/deletelob', {
//                 data: {
//                     id: lobIdToDelete
//                 }
//             });

//             if (deletedRow.status === 200) {
//                 fetchLOBdata();
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error('An error occurred while deleting Line of Business');
//         }
//     };


//     const handleUpdate = async () => {
//         try {
//             const updatedData = await axios.put('http://localhost:5000/updatelob', {
//                 id: selectedLob.id,
//                 lobname: selectedLob.lobname // Include the updated name
//             });
//             if (updatedData.status === 200) {
//                 fetchLOBdata();
//                 setvisible(false);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const [lob, setlob] = useState({
//       lobname: ''
//     })

//     const handleChange = (e) => {
//       setlob({ ...lob, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/storelob', {
//           lobname: lob.lobname,
//           orgname: localStorage.getItem('orgname'),
//           orgcode: localStorage.getItem('orgcode')
//         });
//         toast.success('Line of business added successfully')
//         setvisible(false);
//       } catch (error) {
//         console.log(error);
//       }
//     }




//     return (
//         <div>


//             <div>
//                 <CTable hover responsive striped className=''>
//                     <CTableHead>
//                         <CTableRow color='dark'>
//                             <CTableHeaderCell scope="col">Line of Business</CTableHeaderCell>
//                             <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
//                         </CTableRow>
//                     </CTableHead>
//                     <CTableBody>
//                         {lobdata.length > 0 ? (
//                             lobdata.map((row, index) => (
//                                 <CTableRow key={index}>
//                                     <CTableDataCell>{row.lobname}</CTableDataCell>
//                                     <CButton onClick={() => handleEdit(index)}>Edit</CButton>
//                                     <CButton onClick={() => handleDelete(index)}>Delete</CButton>
//                                 </CTableRow>
//                             ))
//                         ) : (
//                             <CTableRow>
//                                 <CTableDataCell colSpan="1">No Line of Business data available</CTableDataCell>
//                             </CTableRow>
//                         )}
//                     </CTableBody>
//                 </CTable>

//                 <CModal
//                     visible={visible}
//                     onClose={() => setvisible(false)}
//                     aria-labelledby="LiveDemoExampleLabel"
//                 >
//                     <CModalHeader onClose={() => setvisible(false)}>
//                         <CModalTitle id="LiveDemoExampleLabel">Edit Line of Business</CModalTitle>
//                     </CModalHeader>
//                     <CModalBody>
//                         {selectedLob && (
//                             <div>
//                                 <input type='text' name='lobname' value={selectedLob.lobname} onChange={(e) => setSelectedLob({ ...selectedLob, lobname: e.target.value })} style={{ width: '100%' }} />
//                             </div>
//                         )}
//                     </CModalBody>
//                     <CModalFooter>
//                         <CButton color="secondary" onClick={() => setvisible(false)}>
//                             Close
//                         </CButton>
//                         <CButton color="primary" onClick={handleUpdate}>Save changes</CButton>
//                     </CModalFooter>
//                 </CModal>
//             </div>


//             <div>
//                 <CCardBody className='button-div'>
//                     <div className='createjob-button'>

//                         <CButton color="primary" type="submit" onClick={() => setvisible(true)}>
//                             +
//                         </CButton>

//                     </div>
//                 </CCardBody>
//             </div>

//         </div>
//     );
// };

// export default Lob;






































import React, { useState, useEffect } from 'react';
import {
    CCardBody,
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Lob = () => {
    const [lobdata, setLobdata] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedLob, setSelectedLob] = useState(null);
    const [lob, setLob] = useState({
        lobname: ''
    });

    const fetchLOBdata = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getlob', {
                params: {
                    orgcode: localStorage.getItem('orgcode'),
                    orgname: localStorage.getItem('orgname')
                }
            });
            setLobdata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLOBdata();
    }, []);

    const handleEdit = (index) => {
        setSelectedLob(lobdata[index]);
        setVisible(true);
    };

    const handleDelete = async (index) => {
        try {
            const lobIdToDelete = lobdata[index].id;
            const deletedRow = await axios.delete('http://localhost:5000/deletelob', {
                data: {
                    id: lobIdToDelete
                }
            });

            if (deletedRow.status === 200) {
                fetchLOBdata();
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while deleting Line of Business');
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedData = await axios.put('http://localhost:5000/updatelob', {
                id: selectedLob.id,
                lobname: selectedLob.lobname
            });
            if (updatedData.status === 200) {
                fetchLOBdata();
                setVisible(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setLob({ ...lob, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/storelob', {
                lobname: lob.lobname,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });
            toast.success('Line of business added successfully');
            setVisible(false);
            fetchLOBdata();

            setLob({
                lobname: ''
            });


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <CTable hover responsive striped>
                    <CTableHead>
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col">Line of Business</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {lobdata.length > 0 ? (
                            lobdata.map((row, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{row.lobname}</CTableDataCell>
                                    <CButton onClick={() => handleEdit(index)}>Edit</CButton>
                                    <CButton onClick={() => handleDelete(index)}>Delete</CButton>
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="2">No Line of Business data available</CTableDataCell>
                            </CTableRow>
                        )}
                    </CTableBody>
                </CTable>


                <CModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    aria-labelledby="LiveDemoExampleLabel"
                >
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">
                            {selectedLob ? 'Edit Line of Business' : 'Add Line of Business'}
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div>
                            <input
                                type='text'
                                name='lobname'
                                value={selectedLob ? selectedLob.lobname : lob.lobname}
                                onChange={(e) => {
                                    if (selectedLob) {
                                        setSelectedLob({ ...selectedLob, lobname: e.target.value });
                                    } else {
                                        setLob({ ...lob, lobname: e.target.value });
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={selectedLob ? handleUpdate : handleSubmit}>
                            {selectedLob ? 'Save changes' : 'Create'}
                        </CButton>
                    </CModalFooter>
                </CModal>




                {/* <CModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    aria-labelledby="LiveDemoExampleLabel"
                >
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">Edit Line of Business</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {selectedLob && (
                            <div>
                                <input type='text' name='lobname' value={selectedLob.lobname} onChange={(e) => setSelectedLob({ ...selectedLob, lobname: e.target.value })} style={{ width: '100%' }} />
                            </div>
                        )}
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={handleUpdate}>Save changes</CButton>
                    </CModalFooter>
                </CModal> */}
            </div>

            <div>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>
                        <CButton color="primary" type="submit" onClick={() => setVisible(true)}>+</CButton>
                    </div>
                </CCardBody>
            </div>
        </div>
    );
};

export default Lob;
