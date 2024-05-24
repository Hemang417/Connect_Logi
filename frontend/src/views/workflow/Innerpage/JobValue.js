// import React, { useState, useEffect } from 'react'
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
//     CNavLink,
//     CPopover
// } from '@coreui/react'
// import '../../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// // import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import Select from 'react-select';
// import { useLocation } from 'react-router-dom';


// const JobValue = () => {

//     const [clickedBoxes, setClickedBoxes] = useState([]);
//     const [tableData, setTableData] = useState([]);
//     const [selectedBranchName, setSelectedBranchName] = useState('');
//     const [allbranchcode, setallbranchcode] = useState([]);
//     const [custominput, setcustominput] = useState('');
//     useEffect(() => {
//         const getbranchnameandcode = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/getbranchesforarrangement', {
//                     params: {
//                         orgname: localStorage.getItem('orgname'),
//                         orgcode: localStorage.getItem('orgcode'),
//                     }
//                 })
//                 setallbranchcode(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         getbranchnameandcode();
//     }, [])

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/getArrangementofthatbranch', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                     branchname: selectedBranchName.label,
//                     branchcode: selectedBranchName.value
//                 }
//             });
//             const existingRows = response.data; // Assuming the response contains an array of existing rows
//             setTableData(existingRows);
//             const customRow = existingRows.find(row => row.columnname === 'Custom');
//             if (customRow) {
//                 setcustominput(customRow.inputofcustom);
//             } else {
//                 setcustominput('');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     const handleBoxClick = (box) => {
//         const response = axios.post('http://localhost:5000/storeArrangement', {
//             orgname: localStorage.getItem('orgname'),
//             orgcode: localStorage.getItem('orgcode'),
//             data: box,
//             branchname: selectedBranchName.label,
//             branchcode: selectedBranchName.value
//         });
//         const updatedClickedBoxes = [...clickedBoxes, box];
//         setClickedBoxes(updatedClickedBoxes);
//         // setTableData(updatedClickedBoxes);
//         const newBox = {
//             columnname: box,
//             inputofcustom: '' 
//             // Add other properties you need to prefill here
//         };
//         const updatedTableData = [...tableData, newBox];
//         setTableData(updatedTableData);
//     };

//     const handleDeleteBox = async (box) => {

//         const response = axios.delete('http://localhost:5000/deleteArrangement', {
//             data: {
//                 orgname: localStorage.getItem('orgname'),
//                 orgcode: localStorage.getItem('orgcode'),
//                 data: box.columnname,
//                 branchname: selectedBranchName.label,
//                 branchcode: selectedBranchName.value
//             }
//         })

//         const updatedTableData = tableData.filter(item => item.columnname !== box.columnname);
//         setTableData(updatedTableData);
//         if (box.columnname === 'Custom') {
//             setcustominput('');
//         }
//     };

//     const handleBranchSelect = (selectedOption) => {
//         setSelectedBranchName(selectedOption);
//     };



//     useEffect(() => {
//         if (selectedBranchName !== '') {
//             fetchData();
//         }
//     }, [selectedBranchName, tableData]); // Run the effect when selectedBranchName changes


//     const handleChange = (e) => {
//         setcustominput(e.target.value);
//     };

//     const handleSaveInput = async () => {
//         const updateColumn = await axios.put('http://localhost:5000/updateColumn', {
//             orgname: localStorage.getItem('orgname'),
//             orgcode: localStorage.getItem('orgcode'),
//             branchname: selectedBranchName.label,
//             branchcode: selectedBranchName.value,
//             custominput: custominput,
//         })
//         // if (updateColumn.status === 200) {
//         //     setcustominput('');
//         // }
//         if (updateColumn.status === 200) {
//             const updatedTableData = tableData.map(item =>
//                 item.columnname === 'Custom' ? { ...item, inputofcustom: custominput } : item
//             );
//             setTableData(updatedTableData);
//             toast.success('Input saved successfully');
//         }
//     };

//     return (

//         <>

//             <div>
//                 <Select
//                     options={allbranchcode?.map(branch => ({ value: branch.branchcode, label: branch.ownbranchname }))}
//                     value={selectedBranchName}
//                     onChange={handleBranchSelect}
//                     placeholder="Select Branch"
//                 />

//             </div>


//             <div className="containerarrange">

//                 <div className='box-container'>
//                     <div className='box' onClick={() => handleBoxClick('Fiscal Year')}>
//                         <label>Fiscal Year</label>
//                     </div>
//                     <div className='box' onClick={() => handleBoxClick('Air/Sea')}>
//                         <label>Air/Sea</label>
//                     </div>
//                     <div className='box' onClick={() => handleBoxClick('BranchName')}>
//                         <label>BranchName</label>
//                     </div>
//                     <div className='box' onClick={() => handleBoxClick('Import/Export')}>
//                         <label>Import/Export</label>
//                     </div>
//                     <div className='box' onClick={() => handleBoxClick('JobNumber')}>
//                         <label>JobNumber</label>
//                     </div>
//                     <div className='box' onClick={() => handleBoxClick('Custom')}>
//                         <label>Custom</label>
//                     </div>
//                 </div>

//                 <table className="table-container">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData && tableData.map((box, index) => (
//                             <tr key={index}>
//                                 <td>{box.columnname}</td>
//                                 <td>
//                                     {box.columnname === 'Custom' ?
//                                         <>
//                                             <input type='text' value={custominput} onChange={handleChange} />
//                                             <button onClick={handleSaveInput}>Save Input</button>
//                                             <CButton onClick={() => handleDeleteBox(box)}>Delete</CButton>
//                                         </>
//                                         :
//                                         <button onClick={() => handleDeleteBox(box)}>Delete</button>
//                                     }
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );

// }

// export default JobValue;




























import React, { useState, useEffect } from 'react'
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
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CFormInput,
    CFormLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CButton,
    CNav,
    CNavItem,
    CNavLink,
    CPopover
} from '@coreui/react'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import Select from 'react-select';
import { useLocation } from 'react-router-dom';



const JobValue = () => {
    const [clickedBoxes, setClickedBoxes] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [selectedBranchName, setSelectedBranchName] = useState('');
    const [allbranchcode, setallbranchcode] = useState([]);
    const [custominput, setcustominput] = useState('');
    const [visible, setvisible] = useState(false);

    useEffect(() => {
        const getbranchnameandcode = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getbranchesforarrangement', {
                    params: {
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode'),
                    }
                })
                setallbranchcode(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getbranchnameandcode();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getArrangementofthatbranch', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchname: selectedBranchName.label,
                    branchcode: selectedBranchName.value
                }
            });
            const existingRows = response.data; // Assuming the response contains an array of existing rows
            setTableData(existingRows);
            const customRow = existingRows.find(row => row.columnname === 'Custom');
            if (customRow) {
                setcustominput(customRow.inputofcustom);
            } else {
                setcustominput('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBoxClick = async (box) => {
        const response = axios.post('http://localhost:5000/storeArrangement', {
            orgname: localStorage.getItem('orgname'),
            orgcode: localStorage.getItem('orgcode'),
            data: box,
            branchname: selectedBranchName.label,
            branchcode: selectedBranchName.value
        });
        const updatedClickedBoxes = [...clickedBoxes, box];
        setClickedBoxes(updatedClickedBoxes);
        // setTableData(updatedClickedBoxes);
        const newBox = {
            columnname: box,
            inputofcustom: ''
            // Add other properties you need to prefill here
        };
        const updatedTableData = [...tableData, newBox];
        setTableData(updatedTableData);
    };

    const handleDeleteBox = async (box) => {
        const response = axios.delete('http://localhost:5000/deleteArrangement', {
            data: {
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                data: box.columnname,
                branchname: selectedBranchName.label,
                branchcode: selectedBranchName.value
            }
        })

        const updatedTableData = tableData.filter(item => item.columnname !== box.columnname);
        setTableData(updatedTableData);
        if (box.columnname === 'Custom') {
            setcustominput('');
        }
    };

    const handleBranchSelect = (selectedOption) => {
        setSelectedBranchName(selectedOption);
        setcustominput(''); // Reset custom input when selecting a new branch
    };

    useEffect(() => {
        if (selectedBranchName !== '') {
            fetchData();
        }
    }, [selectedBranchName]); // Removed tableData from the dependency array

    const handleChange = (e) => {
        setcustominput(e.target.value);
    };

    const handleSaveInput = async () => {
        const updateColumn = await axios.put('http://localhost:5000/updateColumn', {
            orgname: localStorage.getItem('orgname'),
            orgcode: localStorage.getItem('orgcode'),
            branchname: selectedBranchName.label,
            branchcode: selectedBranchName.value,
            custominput: custominput,
        })

        if (updateColumn.status === 200) {
            const updatedTableData = tableData.map(item =>
                item.columnname === 'Custom' ? { ...item, inputofcustom: custominput } : item
            );
            setTableData(updatedTableData);
            toast.success('Input saved successfully');
        }
    };

    return (
        <>
            <div>
                <Select
                    options={allbranchcode?.map(branch => ({ value: branch.branchcode, label: branch.ownbranchname }))}
                    value={selectedBranchName}
                    onChange={handleBranchSelect}
                    placeholder="Select Branch"
                />
            </div>
            <div className="containerarrange">
                <div className='box-container'>

                    <div className='box' onClick={() => handleBoxClick('Fiscal Year')}>
                        <label>Fiscal Year</label>
                    </div>
                    <div className='box' onClick={() => handleBoxClick('Air/Sea')}>
                        <label>Air/Sea</label>
                    </div>
                    <div className='box' onClick={() => handleBoxClick('BranchName')}>
                        <label>BranchName</label>
                    </div>
                    <div className='box' onClick={() => handleBoxClick('Import/Export')}>
                        <label>Import/Export</label>
                    </div>                 <div className='box' onClick={() => handleBoxClick('JobNumber')}>
                        <label>JobNumber</label>
                    </div>
                    <div className='box' onClick={() => handleBoxClick('Custom')}>
                        <label>Custom</label>
                    </div>

                </div>
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData && tableData.map((box, index) => (
                            <tr key={index}>
                                <td>{box.columnname}</td>
                                <td>
                                    {box.columnname === 'Custom' ?
                                        <>
                                            <input type='text' value={custominput} onChange={handleChange} />
                                            <button onClick={handleSaveInput}>Save Input</button>
                                            <CButton onClick={() => handleDeleteBox(box)}>Delete</CButton>
                                        </>
                                        :
                                        <button onClick={() => handleDeleteBox(box)}>Delete</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <CButton onClick={() => setvisible(true)}>Preview</CButton>
            </div>


            <CModal
                visible={visible}
                onClose={() => setvisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalBody>


                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {tableData && tableData.map((box, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                <label>{box.columnname + ' -'}</label>
                            </div>
                        ))}
                    </div>

                </CModalBody>
                <CModalFooter>
                    <CPopover content="Update Workflow" trigger={['hover', 'focus']}>
                        <CButton color="secondary" onClick={() => setvisible(false)}>
                            Close
                        </CButton>
                    </CPopover>
                </CModalFooter>
            </CModal>
        </>
    );
}

export default JobValue;

