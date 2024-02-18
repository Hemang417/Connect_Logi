// import React, { useEffect } from 'react'
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
//     CDropdownDivider,
//     CDropdownHeader,
//     CDropdownItem,
//     CFormInput,
//     CFormLabel,
//     CForm,
//     CButton,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
//     CNavItem,
//     CNav,
//     CNavLink
// } from '@coreui/react'
// import '../../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { legacy_createStore } from 'redux';
// import axios from 'axios'
// // import createjob from './CreateJob';

// const General = ({ onSave, gData }) => {
//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const [visible, setVisible] = useState(false);

//     const [generalData, setGeneralData] = useState({
//         clientname: '',
//         address: '',
//         country: '',
//         state: '',
//         city: '',
//         postalCode: '',
//         phoneNumber: '',
//         emailAddress: '',
//         branchName: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setGeneralData({ ...generalData, [name]: value });
//     };

//     const handleSave = () => {
//         onSave(generalData);
//     };

//     const [isEditing, setIsEditing] = useState(false);

//     // useEffect(() => {
//     //     // Update prefilledData state when gData changes
//     //     if (gData) {
//     //         setGeneralData(gData);
//     //     }
//     // }, [gData]);

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setPrefilledData({ ...prefilledData, [name]: value });
//     // };

//     // const handleSave = () => {
//     //     onSave(prefilledData);
//     // };

//     // const handleAddBranch = () => {
//     //     if (branchName.trim() !== '') {
//     //         setGeneralData(prevState => ({
//     //             ...prevState,
//     //             branchName: [...prevState.branchName, branchName.trim()]
//     //         }));
//     //         setBranchName('');
//     //         setVisible(false);
//     //     }
//     // };










//     const handleAddBranch = () => {
//         // Append new branch name to the existing string

//         if (generalData.branchName !== '') {
//             setGeneralData({ ...generalData, branchName: generalData.branchName });
//             setVisible(false);
//             if (!isEditing) {
//                 setGeneralData(prevState => ({
//                     ...prevState,
//                     clientname: '',
//                     address: '',
//                     country: '',
//                     state: '',
//                     city: '',
//                     postalCode: '',
//                     phoneNumber: '',
//                     emailAddress: ''
//                 }));
//             }
//         }

//     };









//     // const handleAddBranch = () => {
//     //     const newBranchName = generalData.branchName.trim();

//     //     if (newBranchName !== '') {
//     //         setGeneralData({
//     //             ...generalData,
//     //             branchName: [...generalData.branchName, newBranchName]
//     //         });
//     //         // Clear the input field and hide the modal
//     //         setVisible(false);
//     //     }
//     // };






//     // const handleAddBranch = () => {
//     //     const newBranchName = generalData.branchName.trim();
//     //     if (newBranchName !== '') {
//     //         setGeneralData(prevState => ({
//     //             ...prevState,
//     //             branchName: 
//     //         }));
//     //         // Clear other form fields only if not editing
//     //         if (!isEditing) {
//     //             setGeneralData(prevState => ({
//     //                 ...prevState,
//     //                 clientname: '',
//     //                 address: '',
//     //                 country: '',
//     //                 state: '',
//     //                 city: '',
//     //                 postalCode: '',
//     //                 phoneNumber: '',
//     //                 emailAddress: ''
//     //             }));
//     //         }
//     //     }
//     // };














//     const [allBranches, setAllBranches] = useState([]);

//     useEffect(() => {
//         const fetchAllBranches = async () => {
//             try {
//                 // Get all branches from localStorage
//                 const branchesString = localStorage.getItem('branchname');

//                 // Split the branches string into an array of strings
//                 const branchesArray = branchesString ? branchesString.split(',') : [];

//                 // Set the branches array to the state
//                 setAllBranches(branchesArray);
//             } catch (error) {
//                 console.log("Error: " + error);
//             }
//         };

//         // Call the fetchAllBranches function
//         fetchAllBranches();
//     }, []);





// async function handlebranchchange(index){
//     try {
//         const selectedBranchName = allBranches[index];
//         const clientname = localStorage.getItem('clientname');
//         const aliashai = localStorage.getItem('alias')

//         localStorage.setItem('selectedBranchName', selectedBranchName);
//         const response = await axios.get('http://localhost:5000/allFetch', {
//             params:{
//                 clientname: clientname,
//                 alias: aliashai,
//                 branchname: selectedBranchName
//             }
//         })
//         setGeneralData(response.data);
//     } catch (error) {
//         console.log("Error: " + error);
//     }
// }





//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div-general">
//                     <CCardBody>
//                         <input
//                             type="text"
//                             name="clientname"
//                             value={generalData.clientname}
//                             placeholder="Client Name"
//                             onChange={handleChange}
//                             className='text-field-1'
//                         />
//                         {/* <input
//                             type="text"
//                             name="clientname"
//                             value={generalData.clientname}
//                             placeholder="Alias"
//                             onChange={handleChange}
//                             className='text-field-1'
//                         /> */}
//                         <CDropdown className="text-field-1">
//                             <CDropdownToggle color="secondary">Branch Name</CDropdownToggle>
//                             <CDropdownMenu className="text-field-2">
//                                 {/* <CDropdownItem href="#">Mumbai</CDropdownItem>
//                                 <CDropdownItem href="#">Kolkata</CDropdownItem> */}
//                                 {/* {generalData.branchName.map((branch, index) => (
//                                     <CDropdownItem key={index}>{branch}</CDropdownItem>
//                                 ))} */}

//                                 {allBranches.map((branch, index) => (
//                                     <CDropdownItem key={index} onClick={() => handlebranchchange(index)}>{branch}</CDropdownItem>
//                                 ))}

//                                 <CDropdownDivider />
//                                 {/* <Link to={"/addnewBranch"}> */}
//                                 <CDropdownItem onClick={() => setVisible(!visible)} style={{ cursor: 'pointer' }}>Add New Branch</CDropdownItem>
//                                 {/* </Link> */}
//                             </CDropdownMenu>
//                         </CDropdown>
//                         <input
//                             type="text"
//                             name="address"
//                             value={generalData.address}
//                             placeholder="Address"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />
//                         <input
//                             type="text"
//                             name="country"
//                             value={generalData.country}
//                             placeholder="Country"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />
//                         <input
//                             type="text"
//                             name="state"
//                             value={generalData.state}
//                             placeholder="State/Province"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             value={generalData.city}
//                             placeholder="City"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />
//                         <input
//                             type="text"
//                             name="postalCode"
//                             value={generalData.postalcode}
//                             placeholder="Postal Code"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             value={generalData.phone}
//                             placeholder="Phone Number"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />
//                         <input
//                             type="text"
//                             name="emailAddress"
//                             value={generalData.email}
//                             placeholder="Email Address"
//                             onChange={handleChange}
//                             className="text-field-1"
//                         />

//                         <div className='mb-2 search-button update-button'>
//                             <CButton color="primary" type="submit" onClick={handleSave}>
//                                 Update
//                             </CButton>
//                         </div>

//                     </CCardBody>

//                 </CCard>
//             </CCol>
//             <CModal
//                 visible={visible}
//                 onClose={() => setVisible(false)}
//                 aria-labelledby="LiveDemoExampleLabel"
//             >
//                 <CModalHeader onClose={() => setVisible(false)}>
//                     <CModalTitle id="LiveDemoExampleLabel">Add Branch Details</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody >
//                     {/* <div>
//                         <input type="date" placeholder="" className='text-field-1' />
//                     </div>
//                     <div>
//                         <input type="text" placeholder="Bill No." className='text-field-1' />
//                     </div> */}
//                     <div>
//                         <input type="text" placeholder="Branch Name"
//                             className='text-field-1' name='branchName'
//                             onChange={handleChange}
//                         />
//                     </div>

//                     {/* <div>
//                         <input type="text" placeholder="Amount" className='text-field-1' />
//                     </div>
//                     <div>
//                         <input type="text" placeholder="Tax" className='text-field-1' />
//                     </div>
//                     <div>
//                         <input type="text" placeholder="Grand Total" className='text-field-1' />
//                     </div> */}

//                 </CModalBody>
//                 <CModalFooter>
//                     <CButton color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </CButton>
//                     <CButton color="primary" onClick={handleAddBranch}>Add New</CButton>
//                 </CModalFooter>
//             </CModal>
//         </div>
//     )
// }

// export default General;













import React, { useEffect } from 'react'
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
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CFormInput,
    CFormLabel,
    CForm,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CNavItem,
    CNav,
    CNavLink
} from '@coreui/react'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// import createjob from './CreateJob';

const General = ({ onSave, gData }) => {
    // const [date, setDate] = useState(new Date());
    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);

    const [generalData, setGeneralData] = useState({
        clientname: '',
        address: '',
        country: '',
        state: '',
        city: '',
        postalcode: '',
        phone: '',
        email: '',
        branchName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneralData({ ...generalData, [name]: value });
    };

    const handleSave = () => {
        onSave(generalData);
    };

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Update prefilledData state when gData changes
        if (gData) {
            setGeneralData(gData);
        }
    }, [gData]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setPrefilledData({ ...prefilledData, [name]: value });
    // };

    // const handleSave = () => {
    //     onSave(prefilledData);
    // };

    // const handleAddBranch = () => {
    //     if (branchName.trim() !== '') {
    //         setGeneralData(prevState => ({
    //             ...prevState,
    //             branchName: [...prevState.branchName, branchName.trim()]
    //         }));
    //         setBranchName('');
    //         setVisible(false);
    //     }
    // };






    const [allBranches, setAllBranches] = useState([]);

    useEffect(() => {
        const fetchAllBranches = async () => {
            try {
                // Get all branches from localStorage
                const branchesString = localStorage.getItem('branchname');

                // Split the branches string into an array of strings
                const branchesArray = branchesString ? branchesString.split(',') : [];

                // Set the branches array to the state
                setAllBranches(branchesArray);
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        // Call the fetchAllBranches function
        fetchAllBranches();
    }, []);













    const handleAddBranch = () => {
        // Append new branch name to the existing string

        if (generalData.branchName !== '') {
            setGeneralData({ ...generalData, branchName: generalData.branchName });
            localStorage.setItem('isEditing', true);
            setVisible(false);
            if (!isEditing) {
                setGeneralData(prevState => ({
                    ...prevState,

                    address: '',
                    country: '',
                    state: '',
                    city: '',
                    postalcode: '',
                    phone: '',
                    email: ''
                }));
            }
        }

    };









    // const handleAddBranch = () => {
    //     const newBranchName = generalData.branchName.trim();

    //     if (newBranchName !== '') {
    //         setGeneralData({
    //             ...generalData,
    //             branchName: [...generalData.branchName, newBranchName]
    //         });
    //         // Clear the input field and hide the modal
    //         setVisible(false);
    //     }
    // };






    // const handleAddBranch = () => {
    //     const newBranchName = generalData.branchName.trim();
    //     if (newBranchName !== '') {
    //         setGeneralData(prevState => ({
    //             ...prevState,
    //             branchName: 
    //         }));
    //         // Clear other form fields only if not editing
    //         if (!isEditing) {
    //             setGeneralData(prevState => ({
    //                 ...prevState,
    //                 clientname: '',
    //                 address: '',
    //                 country: '',
    //                 state: '',
    //                 city: '',
    //                 postalCode: '',
    //                 phoneNumber: '',
    //                 emailAddress: ''
    //             }));
    //         }
    //     }
    // };






    useEffect(() => {
        if (localStorage.getItem('selectedBranchName')) {
            const prefillwithLocal = async () => {
                try {
                    const selectedBranchName = localStorage.getItem('selectedBranchName');
                    const clientname = localStorage.getItem('clientname');
                    const aliashai = localStorage.getItem('alias')
    
                    const response = await axios.get('http://localhost:5000/allFetch', {
                        params:{
                            clientname: clientname,
                            alias: aliashai,
                            branchname: selectedBranchName
                        }
                    });
                    setGeneralData(response.data);
                } catch (error) {
                    console.log("Error: " + error);
                }
            };
            prefillwithLocal();
        }
    }, []); // Empty dependency array ensures the effect runs only once during component mounting
    








async function handlebranchchange(index){
    try {
        const selectedBranchName = allBranches[index];
        const clientname = localStorage.getItem('clientname');
        const aliashai = localStorage.getItem('alias')

        localStorage.setItem('selectedBranchName', selectedBranchName);
        const response = await axios.get('http://localhost:5000/allFetch', {
            params:{
                clientname: clientname,
                alias: aliashai,
                branchname: selectedBranchName
            }
        })
        setGeneralData(response.data);
    } catch (error) {
        console.log("Error: " + error);
    }
}








    return (
        <div>
            <CCol xs={12}>
                <CCard className="mb-2 container-div-general">
                    <CCardBody>
                        <input
                            type="text"
                            name="clientname"
                            value={generalData.clientname}
                            placeholder="Client Name"
                            onChange={handleChange}
                            className='text-field-1'
                        />
                        {/* <input
                            type="text"
                            name="clientname"
                            value={generalData.clientname}
                            placeholder="Alias"
                            onChange={handleChange}
                            className='text-field-1'
                        /> */}
                        <CDropdown className="text-field-1">
                            <CDropdownToggle color="secondary">Branch Name</CDropdownToggle>
                            <CDropdownMenu className="text-field-2">
                                {/* <CDropdownItem href="#">Mumbai</CDropdownItem>
                                <CDropdownItem href="#">Kolkata</CDropdownItem> */}
                                {/* {generalData.branchName.map((branch, index) => (
                                    <CDropdownItem key={index}>{branch}</CDropdownItem>
                                ))} */}

                                <>
                                    {allBranches.map((branch, index) => (
                                        <CDropdownItem key={index} onClick={() => handlebranchchange(index)}>{branch}</CDropdownItem>
                                    ))}
                                </>

                                <CDropdownDivider />
                                {/* <Link to={"/addnewBranch"}> */}
                                < CDropdownItem onClick={() => setVisible(!visible)} style={{ cursor: 'pointer' }}>Add New Branch</CDropdownItem>
                                {/* </Link> */}
                            </CDropdownMenu>
                        </CDropdown>
                        <input
                            type="text"
                            name="address"
                            value={generalData.address}
                            placeholder="Address"
                            onChange={handleChange}
                            className="text-field-1"
                        />
                        <input
                            type="text"
                            name="country"
                            value={generalData.country}
                            placeholder="Country"
                            onChange={handleChange}
                            className="text-field-1"
                        />
                        <input
                            type="text"
                            name="state"
                            value={generalData.state}
                            placeholder="State/Province"
                            onChange={handleChange}
                            className="text-field-1"
                        />
                        <input
                            type="text"
                            name="city"
                            value={generalData.city}
                            placeholder="City"
                            onChange={handleChange}
                            className="text-field-1"
                        />
                        <input
                            type="text"
                            name="postalcode"
                            value={generalData.postalcode}
                            placeholder="Postal Code"
                            onChange={handleChange}
                            className="text-field-1"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={generalData.phone}
                            placeholder="Phone Number"
                            onChange={handleChange}
                            className="text-field-1"
                        />
                        <input
                            type="text"
                            name="email"
                            value={generalData.email}
                            placeholder="Email Address"
                            onChange={handleChange}
                            className="text-field-1"
                        />

                        <div className='mb-2 search-button update-button'>
                            <CButton color="primary" type="submit" onClick={handleSave}>
                                Save
                            </CButton>
                        </div>

                    </CCardBody>

                </CCard>
            </CCol>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add Branch Details</CModalTitle>
                </CModalHeader>
                <CModalBody >
                    {/* <div>
                        <input type="date" placeholder="" className='text-field-1' />
                    </div>
                    <div>
                        <input type="text" placeholder="Bill No." className='text-field-1' />
                    </div> */}
                    <div>
                        <input type="text" placeholder="Branch Name"
                            className='text-field-1' name='branchName'
                            onChange={handleChange}
                        />
                    </div>

                    {/* <div>
                        <input type="text" placeholder="Amount" className='text-field-1' />
                    </div>
                    <div>
                        <input type="text" placeholder="Tax" className='text-field-1' />
                    </div>
                    <div>
                        <input type="text" placeholder="Grand Total" className='text-field-1' />
                    </div> */}

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleAddBranch}>Add New</CButton>
                </CModalFooter>
            </CModal>
        </div >
    )
}

export default General;