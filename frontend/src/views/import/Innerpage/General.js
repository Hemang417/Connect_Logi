// import React from 'react'
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
// import { CChart } from '@coreui/react-chartjs'
// import '../../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// // import createjob from './CreateJob';

// const General = () => {
//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();
//     const [visible, setVisible] = useState(false)
//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody className='main-div'>
//                         <div className='left-div'>
//                             <input type="text" placeholder="Importer Name" className='impgen-text-field-1' />
//                             <CDropdown className="impgen-text-field-1">
//                                 <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
//                                 <CDropdownMenu className="impgen-text-dropdown">
//                                     <CDropdownItem href="#">Mumbai</CDropdownItem>
//                                     <CDropdownItem href="#">Kolkata</CDropdownItem>
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             {/* <input type="text" placeholder="Address"/> */}
//                             <textarea placeholder='Address' name="paragraph_text" cols="50" rows="5" className='impgen-text-field-1'></textarea>
//                             <input type="text" placeholder="GST" className='impgen-text-field-1' />
//                             <input type="text" placeholder="IEC Code" className='impgen-text-field-1' />
//                             <input type="text" placeholder="Port of Shipment" className='impgen-text-field-1' />
//                             <input type="text" placeholder="Final Destination" className='impgen-text-field-1' />
//                         </div>
//                         <div className='right-div'>
//                             <CChart
//                                 type="doughnut"
//                                 data={{
//                                     labels: ['O2D', 'Do & Delivery', 'D2C', 'Collection'],
//                                     datasets: [
//                                         {
//                                             backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//                                             data: [40, 20, 80, 10],
//                                         },
//                                     ],
//                                 }}
//                                 options={{
//                                     plugins: {
//                                         legend: {
//                                             labels: {
//                                                 color: 'blue',
//                                             }
//                                         }
//                                     },
//                                 }}
//                             />
//                         </div>


//                     </CCardBody>
//                 </CCard>
//             </CCol>
//             {/* <div className='all-buttons'>
//                 <div className='search-button'>
//                     <CButton color="primary" type="submit">
//                         Save
//                     </CButton>
//                 </div>

//                 <div className='search-button'>
//                     <CButton color="primary" type="submit">
//                         Save & Close
//                     </CButton>
//                 </div>

//                 <div className='search-button'>
//                     <CButton color="primary" type="submit">
//                         Save & New
//                     </CButton>
//                 </div>

//                 <div className='search-button'>
//                     <CButton color="primary" type="submit">
//                         Close
//                     </CButton>
//                 </div>
//             </div> */}


//             {/* <CNav variant="tabs">
// <CNavItem>
//   <CNavLink href="#" active>General</CNavLink>
// </CNavItem>
// <CNavItem>
//   <CNavLink href="#">Registration</CNavLink>
// </CNavItem> */}
//             {/* <CNavItem>
//   <CNavLink href="#">Link</CNavLink>
// </CNavItem> */}
//             {/* <CNavItem>
//   <CNavLink href="#" disabled>
//     Disabled
//   </CNavLink>
// </CNavItem> */}
//             {/* </CNav> */}
//             <CModal
//                 visible={visible}
//                 onClose={() => setVisible(false)}
//                 aria-labelledby="LiveDemoExampleLabel"
//             >
//                 <CModalHeader onClose={() => setVisible(false)}>
//                     <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <input type="text" placeholder="Name" className='text-field-1' />
//                 </CModalBody>
//                 <CModalFooter>
//                     <CButton color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </CButton>
//                     <CButton color="primary">Add New</CButton>
//                 </CModalFooter>
//             </CModal>
//         </div>
//     )
// }

// export default General;









// import React, { useState, useEffect } from 'react';
// import {
//     CCard,
//     CCardBody,
//     CCol,
//     CRow,
//     CButton,
//     CDropdown,
//     CDropdownToggle,
//     CDropdownMenu,
//     CDropdownItem,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
// } from '@coreui/react';
// import '../../../css/styles.css';
// import axios from 'axios';

// const General = () => {
//     const [formData, setFormData] = useState({
//         importerName: '',
//         selectedBranch: '',
//         branches: [],
//         address: '',
//         gst: '',
//         iec: '',
//         portShipment: '',
//         finalDestination: '',
//     });
//     const [importers, setimporters] = useState([])
//     const [visible, setVisible] = useState(false);
//     const [filtered, setfiltered] = useState();

//     useEffect(() => {
//         const fetchallclients = async () => {
//             try {
//                 const codeoforg = localStorage.getItem('orgcode');
//                 const response = await axios.get(`http://localhost:5000/getimporters`, {
//                     params: {
//                         orgcode: codeoforg
//                     }
//                 });
//                 setimporters(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchallclients();
//     }, []);


//     useEffect(() => {
//         fetchBranches();
//     }, [formData.importerName]); // Fetch branches whenever importer name changes

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleBranchSelect = async (branchName) => {
//         setFormData({
//             ...formData,
//             selectedBranch: branchName
//         });
//         await fetchOrganizationDetails(branchName);
//     };



//     // const fetchImporters = async (value) => {
//     //     try {
//     //         const codeoforg = localStorage.getItem('orgcode');
//     //         const response = await axios.get(`http://localhost:5000/getimporters`, {
//     //             params: {
//     //                 partialName: value, // Pass partial importer name
//     //                 orgcode: codeoforg
//     //             }
//     //         });
//     //         setFormData({
//     //             ...formData,
//     //             importers: response.data // Update importers state
//     //         });
//     //     } catch (error) {
//     //         console.error('Error fetching importers:', error);
//     //     }
//     // };



//     useEffect(() => {
//         const filteredImporters = importers.filter(importer =>
//             importer.clientname.toLowerCase().includes(formData.importerName.toLowerCase())
//         );
//         setfiltered(filteredImporters);
//     }, [importers, formData.importerName]);



//     // const filteredImporters = formData.importers ? formData.importers.filter(importer => importer.clientname.toLowerCase().includes(value.toLowerCase())) : []
//     // setfiltered(filteredImporters);

//     async function handleSubmit() {
//         try {
//             const jobkanum = localStorage.getItem('jobNumber');
//             const username = localStorage.getItem('username');
//             const nameoforg = localStorage.getItem('orgname');
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.post('http://localhost:5000/createGeneral',
//                 { formData: formData, orgname: nameoforg, orgcode: codeoforg, jobowner: username, jobnumber: jobkanum });

//         } catch (error) {
//             console.log(error);
//         }
//     }






//     const fetchBranches = async () => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getbranches`, {
//                 params: {
//                     importerName: formData.importerName,
//                     orgcode: codeoforg
//                 }
//             });
//             setFormData({
//                 ...formData,
//                 branches: response.data
//             });
//         } catch (error) {
//             console.error('Error fetching branches:', error);
//         }
//     };

//     const fetchOrganizationDetails = async (branchName) => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getorganizationdetails`, {
//                 params: {
//                     clientName: formData.importerName,
//                     branchName: branchName,
//                     orgcode: codeoforg
//                 }
//             });
//             setFormData({
//                 ...formData,
//                 address: response.data[0].address,
//                 gst: response.data[0].GST,
//                 iec: response.data[0].IEC
//             });
//         } catch (error) {
//             console.error('Error fetching organization details:', error);
//         }
//     };
//     console.log(formData.importers);
//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody className='main-div'>
//                         <div className='left-div'>
//                             <input type="text" name="importerName" placeholder="Importer Name" className='impgen-text-field-1' value={formData.importerName} onChange={handleInputChange} />
//                             {/* <div className="impgen-text-dropdown">
//                                 {formData.importers && formData.importers.map((importer, index) => (
//                                     <div key={index} onClick={() => handleImporterSelect(importer.name)}>{importer.name}</div>
//                                 ))}
//                             </div> */}
//                             <CDropdown className="impgen-text-field-1">
//                                 <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
//                                 <CDropdownMenu className="impgen-text-dropdown">
//                                     {formData.branches.map((branch, index) => (
//                                         <CDropdownItem key={index} onClick={() => handleBranchSelect(branch.branchname)}>{branch.branchname}</CDropdownItem>
//                                     ))}
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <textarea name="address" placeholder='Address' cols="50" rows="5" className='impgen-text-field-1' value={formData.address} readOnly></textarea>
//                             <input type="text" name="gst" placeholder="GST" className='impgen-text-field-1' value={formData.gst} readOnly />
//                             <input type="text" name="iec" placeholder="IEC Code" className='impgen-text-field-1' value={formData.iec} readOnly />
//                             <input type="text" name="portShipment" placeholder="Port of Shipment" className='impgen-text-field-1' value={formData.portShipment} onChange={handleInputChange} />
//                             <input type="text" name="finalDestination" placeholder="Final Destination" className='impgen-text-field-1' value={formData.finalDestination} onChange={handleInputChange} />
//                             <CButton onClick={handleSubmit}>Submit</CButton>
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
//                     <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <input type="text" placeholder="Name" className='text-field-1' />
//                 </CModalBody>
//                 <CModalFooter>
//                     <CButton color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </CButton>
//                     <CButton color="primary">Add New</CButton>
//                 </CModalFooter>
//             </CModal>
//         </div>
//     );
// };

// export default General;





















// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import {
//     CCard,
//     CCardBody,
//     CCol,
//     CRow,
//     CButton,
//     CDropdown,
//     CDropdownToggle,
//     CDropdownMenu,
//     CDropdownItem,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
// } from '@coreui/react';
// import '../../../css/styles.css';
// import axios from 'axios';

// const General = () => {
//     const [formData, setFormData] = useState({
//         importerName: '',
//         selectedBranch: '',
//         branches: [],
//         address: '',
//         gst: '',
//         iec: '',
//         portShipment: '',
//         finalDestination: '',
//     });
//     const [importers, setImporters] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [filtered, setFiltered] = useState([]);

//     useEffect(() => {
//         const fetchAllClients = async () => {
//             try {
//                 const codeoforg = localStorage.getItem('orgcode');
//                 const response = await axios.get(`http://localhost:5000/getimporters`, {
//                     params: {
//                         orgcode: codeoforg
//                     }
//                 });
//                 setImporters(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllClients();
//     }, []);


//     useEffect(() => {
//         fetchBranches();
//     }, [formData.importerName]); // Fetch branches whenever importer name changes

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleBranchSelect = async (branchName) => {
//         setFormData({
//             ...formData,
//             selectedBranch: branchName
//         });
//         await fetchOrganizationDetails(branchName);
//     };

//     useEffect(() => {
//         const filteredImporters = importers.filter(importer =>
//             importer.clientname.toLowerCase().includes(formData.importerName.toLowerCase())
//         );
//         setFiltered(filteredImporters);
//     }, [importers, formData.importerName]);



// useEffect(() => {
//     // Create a Set to store unique client names
//     const uniqueClientNames = new Set(importers.map(importer => importer.clientname));
//     // Convert Set back to array and map to options format required by Select component
//     const options = Array.from(uniqueClientNames).map(clientname => ({ value: clientname, label: clientname }));
//     setFiltered(options);
// }, [importers]);





//     async function handleSubmit() {
//         try {
//             const jobkanum = localStorage.getItem('jobNumber');
//             const username = localStorage.getItem('username');
//             const nameoforg = localStorage.getItem('orgname');
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.post('http://localhost:5000/createGeneral',
//                 { formData: formData, orgname: nameoforg, orgcode: codeoforg, jobowner: username, jobnumber: jobkanum });

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const fetchBranches = async () => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getbranches`, {
//                 params: {
//                     importerName: formData.importerName,
//                     orgcode: codeoforg
//                 }
//             });
//             setFormData({
//                 ...formData,
//                 branches: response.data
//             });
//         } catch (error) {
//             console.error('Error fetching branches:', error);
//         }
//     };

//     const fetchOrganizationDetails = async (branchName) => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getorganizationdetails`, {
//                 params: {
//                     clientName: formData.importerName,
//                     branchName: branchName,
//                     orgcode: codeoforg
//                 }
//             });
//             setFormData({
//                 ...formData,
//                 address: response.data[0].address,
//                 gst: response.data[0].GST,
//                 iec: response.data[0].IEC
//             });
//         } catch (error) {
//             console.error('Error fetching organization details:', error);
//         }
//     };




//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody className='main-div'>
//                         <div className='left-div'>
//                             <Select
//                                 className="impgen-text-field-1"
//                                 value={{ value: formData.importerName, label: formData.importerName }}
//                                 options={filtered}
//                                 onChange={handleInputChange}
//                                 placeholder="Importer Name"
//                             />

//                             {/*                             
//                                 <CDropdownMenu>
//                                     <CDropdown>
//                                     {filtered && filtered.length > 0 ? (
//                                         filtered.map((importer, index) => (
//                                             <CDropdownItem key={index}>{importer.clientname}</CDropdownItem>
//                                         ))
//                                     ) : (
//                                         <CDropdownItem >No matching importers</CDropdownItem>
//                                     )}
//                                     </CDropdown>
//                                 </CDropdownMenu> */}


//                             {/* {formData.importerName && (
//                                 <CDropdown className="impgen-text-field-1" isOpen={filtered.length > 0}>

//                                     <CDropdownMenu className='image-text-dropdown'>
//                                         {filtered && filtered.length > 0 ? (
//                                             filtered.map((importer, index) => (
//                                                 <CDropdownItem key={index}>{importer.clientname}</CDropdownItem>
//                                             ))
//                                         ) : (
//                                             <CDropdownItem>No matching importers</CDropdownItem>
//                                         )}
//                                     </CDropdownMenu>

//                                 </CDropdown>
//                             )} */}







//                             <CDropdown className="impgen-text-field-1">
//                                 <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
//                                 <CDropdownMenu className="impgen-text-dropdown">
//                                     {formData.branches.map((branch, index) => (
//                                         <CDropdownItem key={index} onClick={() => handleBranchSelect(branch.branchname)}>{branch.branchname}</CDropdownItem>
//                                     ))}
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <textarea name="address" placeholder='Address' cols="50" rows="5" className='impgen-text-field-1' value={formData.address} readOnly></textarea>
//                             <input type="text" name="gst" placeholder="GST" className='impgen-text-field-1' value={formData.gst} readOnly />
//                             <input type="text" name="iec" placeholder="IEC Code" className='impgen-text-field-1' value={formData.iec} readOnly />
//                             <input type="text" name="portShipment" placeholder="Port of Shipment" className='impgen-text-field-1' value={formData.portShipment} onChange={handleInputChange} />
//                             <input type="text" name="finalDestination" placeholder="Final Destination" className='impgen-text-field-1' value={formData.finalDestination} onChange={handleInputChange} />
//                             <CButton onClick={handleSubmit}>Submit</CButton>
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
//                     <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <input type="text" placeholder="Name" className='text-field-1' />
//                 </CModalBody>
//                 <CModalFooter>
//                     <CButton color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </CButton>
//                     <CButton color="primary">Add New</CButton>
//                 </CModalFooter>
//             </CModal>
//         </div>
//     );
// };

// export default General;

































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { CCard, CCardBody, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import '../../../css/styles.css';
import { CChart } from '@coreui/react-chartjs'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const General = () => {
    const [formData, setFormData] = useState({
        importerName: '',
        selectedBranch: '',
        id: 0,
        branches: [],
        address: '',
        gst: '',
        iec: '',
        portShipment: '',
        finalDestination: '',
    });
    const [importers, setImporters] = useState([]);
    const [visible, setVisible] = useState(false);
    const [filtered, setFiltered] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllClients = async () => {
            try {
                const codeoforg = localStorage.getItem('orgcode');
                const response = await axios.get(`http://localhost:5000/getimporters`, {
                    params: {
                        orgcode: codeoforg
                    }
                });
                setImporters(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllClients();
    }, []);

    useEffect(() => {
        fetchBranches();
    }, [formData.importerName]);

    const handleInputChange = (newValue) => {
        setFormData({
            ...formData,
            importerName: newValue.value,
            address: '',
            iec: '',
            gst: ''
        });

    };

    useEffect(() => {
        // Create a Set to store unique client names
        const uniqueClientNames = new Set(importers.map(importer => importer.clientname));
        // Convert Set back to array and map to options format required by Select component
        const options = Array.from(uniqueClientNames).map(clientname => ({ value: clientname, label: clientname }));
        setFiltered(options);
    }, [importers]);

    async function handleSubmit() {
        try {
            const jobkanum = localStorage.getItem('jobNumber');
            const username = localStorage.getItem('username');
            const nameoforg = localStorage.getItem('orgname');
            const codeoforg = localStorage.getItem('orgcode');
            const branchnameofemp = localStorage.getItem('branchnameofemp');
            const branchcodeofemp = localStorage.getItem('branchcodeofemp');
            
            const response = await axios.post('http://localhost:5000/createGeneral', { formData: formData, orgname: nameoforg, orgcode: codeoforg, jobowner: username, jobnumber: jobkanum, branchname: branchnameofemp, branchcode: branchcodeofemp});
            toast.success('Successfully stored General Details');
           
        } catch (error) {
            toast.error('Error storing General Details.');
            console.log(error);
        }
    }


    const handleBranchSelect = async (branchName, id) => {
        
        setFormData({
            ...formData,
            selectedBranch: branchName,
            id: id
        });
        
        await fetchOrganizationDetails(branchName, id);
    };


    async function prefillData() {
        try {
            const jobnumber = localStorage.getItem('jobNumber');
            const orgcode = localStorage.getItem('orgcode');
            const orgname = localStorage.getItem('orgname');
            const prefilledgeneral = await axios.get('http://localhost:5000/prefillGeneralJob', {
                params: {
                    jobnumber: jobnumber,
                    orgcode: orgcode,
                    orgname: orgname
                }
            })

            // localStorage.setItem('jobData', JSON.stringify(prefilledgeneral.data));
            const {importername, GST, IEC, address, portofshipment, finaldestination, branchname} = prefilledgeneral.data;
            setFormData({
                importerName: importername,
                gst: GST,
                iec: IEC,
                address: address,
                portShipment: portofshipment,
                finalDestination: finaldestination,
                selectedBranch: branchname
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (localStorage.getItem('onEdit') === 'true') {
            prefillData();
        }
    }, [])

    

    const handleUpdate = async () => {
        try {
            const jobkanum = localStorage.getItem('jobNumber');
            const username = localStorage.getItem('username');
            const nameoforg = localStorage.getItem('orgname');
            const codeoforg = localStorage.getItem('orgcode');
            const response = await axios.put('http://localhost:5000/updateGeneral', {
                formData: formData,
                orgname: nameoforg,
                orgcode: codeoforg,
                jobowner: username,
                jobnumber: jobkanum
            });
            const getApprovers = await axios.get('http://localhost:5000/getApprovernamesfororg', {
                params: {
                  orgname: localStorage.getItem('orgname'),
                  orgcode: localStorage.getItem('orgcode'),
                  unique: localStorage.getItem('uniquevalue')
                }
              })
            toast.success('Successfully updated General Details');
        } catch (error) {
            toast.error('Error updating General Details.');
            console.log(error);
        }
    };





    const fetchBranches = async () => {
        try {
            const codeoforg = localStorage.getItem('orgcode');
            const nameoforg = localStorage.getItem('orgname');
            const response = await axios.get(`http://localhost:5000/getbranches`, {
                params: {
                    importerName: formData.importerName,
                    orgcode: codeoforg,
                    orgname: nameoforg
                }
            });
            localStorage.setItem('allbranchesofclient', JSON.stringify(response.data))
            setFormData({
                ...formData,
                branches: response.data
            });
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    };







    const fetchOrganizationDetails = async (branchName, id) => {
        try {
            const codeoforg = localStorage.getItem('orgcode');
            const response = await axios.get(`http://localhost:5000/getorganizationdetails`, {
                params: {
                    clientName: formData.importerName,
                    branchName: branchName,
                    orgcode: codeoforg,
                    orgname: localStorage.getItem('orgname'),
                    id: id
                }
            });
            setFormData({
                ...formData,
                selectedBranch: branchName,
                address: response.data[0].address,
                gst: response.data[0].GST,
                iec: response.data[0].IEC,
                id: id
            });

        } catch (error) {
            console.error('Error fetching organization details:', error);
        }
    };

    return (
        <div>
            <CCol xs={12}>
                <CCard className="mb-2 container-div">
                    <CCardBody className='main-div'>
                        <div className='left-div'>
                            <Select
                                className="impgen-text-field-1"
                                value={{ value: formData.importerName, label: formData.importerName }}
                                options={filtered}
                                onChange={handleInputChange}
                                placeholder="Importer Name"
                            />
                            <CDropdown className="impgen-text-field-1">
                                <CDropdownToggle color="secondary">{formData.selectedBranch ? formData.selectedBranch: 'Branch Names'}</CDropdownToggle>
                                <CDropdownMenu className="impgen-text-dropdown">
                                    {formData.branches && formData.branches.map((branch, index) => (
                                        <CDropdownItem key={index} onClick={() => handleBranchSelect(branch.branchname, branch.id)}>{branch.branchname}</CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                            <textarea name="address" placeholder='Address' cols="50" rows="5" className='impgen-text-field-1' value={formData.address} readOnly></textarea>
                            <input type="text" name="gst" placeholder="GST" className='impgen-text-field-1' value={formData.gst} readOnly />
                            <input type="text" name="iec" placeholder="IEC Code" className='impgen-text-field-1' value={formData.iec} readOnly />
                            <input type="text" name="portShipment" placeholder="Port of Shipment" className='impgen-text-field-1' value={formData.portShipment} onChange={(e) => setFormData({ ...formData, portShipment: e.target.value })} />
                            <input type="text" name="finalDestination" placeholder="Final Destination" className='impgen-text-field-1' value={formData.finalDestination} onChange={(e) => setFormData({ ...formData, finalDestination: e.target.value })} />
                            {localStorage.getItem('onEdit') === 'true' ?
                                <CButton onClick={handleUpdate}>Update</CButton> :
                                <CButton onClick={handleSubmit}>Submit</CButton>
                            }
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
                    <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <input type="text" placeholder="Name" className='text-field-1' />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Add New</CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default General;











































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { CCard, CCardBody, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
// import '../../../css/styles.css';
// import { CChart } from '@coreui/react-chartjs'
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';


// const General = () => {
//     const [formData, setFormData] = useState({
//         importerName: '',
//         selectedBranch: '',
//         branches: [],
//         address: '',
//         gst: '',
//         iec: '',
//         portShipment: '',
//         finalDestination: '',
//     });
//     const [importers, setImporters] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [filtered, setFiltered] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAllClients = async () => {
//             try {
//                 const codeoforg = localStorage.getItem('orgcode');
//                 const response = await axios.get(`http://localhost:5000/getimporters`, {
//                     params: {
//                         orgcode: codeoforg
//                     }
//                 });
//                 setImporters(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllClients();
//     }, []);

//     useEffect(() => {
//         fetchBranches();
//     }, [formData.importerName]);

//     const handleInputChange = (newValue) => {
//         setFormData({
//             ...formData,
//             importerName: newValue.value,
//             address: '',
//             iec: '',
//             gst: ''
//         });

//     };

//     useEffect(() => {
//         // Create a Set to store unique client names
//         const uniqueClientNames = new Set(importers.map(importer => importer.clientname));
//         // Convert Set back to array and map to options format required by Select component
//         const options = Array.from(uniqueClientNames).map(clientname => ({ value: clientname, label: clientname }));
//         setFiltered(options);
//     }, [importers]);

//     async function handleSubmit() {
//         try {
//             const jobkanum = localStorage.getItem('jobNumber');
//             const username = localStorage.getItem('username');
//             const nameoforg = localStorage.getItem('orgname');
//             const codeoforg = localStorage.getItem('orgcode');


//             const response = await axios.post('http://localhost:5000/createGeneral', { formData: formData, orgname: nameoforg, orgcode: codeoforg, jobowner: username, jobnumber: jobkanum });
//             toast.success('Successfully stored General Details');


//         } catch (error) {
//             toast.error('Error storing General Details.');
//             console.log(error);
//         }
//     }


//     const handleBranchSelect = async (branchName, id) => {
//         setFormData({
//             ...formData,
//             selectedBranch: branchName,
//             id: id
//         });
//         await fetchOrganizationDetails(branchName, id);
//     };


//     async function prefillData() {
//         try {
//             const jobnumber = localStorage.getItem('jobNumber');
//             const orgcode = localStorage.getItem('orgcode');
//             const orgname = localStorage.getItem('orgname');
//             const prefilledgeneral = await axios.get('http://localhost:5000/prefillGeneralJob', {
//                 params: {
//                     jobnumber: jobnumber,
//                     orgcode: orgcode,
//                     orgname: orgname
//                 }
//             })

//             localStorage.setItem('jobData', JSON.stringify(prefilledgeneral.data));

//         } catch (error) {
//             console.log(error);
//         }
//     }


//     useEffect(() => {
//         if (localStorage.getItem('onEdit') === 'true') {
//             prefillData();
//         }
//     }, [])

  
    

//     const handleUpdate = async () => {
//         try {
//             const jobkanum = localStorage.getItem('jobNumber');
//             const username = localStorage.getItem('username');
//             const nameoforg = localStorage.getItem('orgname');
//             const codeoforg = localStorage.getItem('orgcode');

//             const response = await axios.put('http://localhost:5000/updateGeneral', {
//                 formData: updateFormData,
//                 orgname: nameoforg,
//                 orgcode: codeoforg,
//                 jobowner: username,
//                 jobnumber: jobkanum
//             });
//             toast.success('Successfully updated General Details');
//         } catch (error) {
//             toast.error('Error updating General Details.');
//             console.log(error);
//         }
//     };





//     const fetchBranches = async () => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const nameoforg = localStorage.getItem('orgname');
//             const response = await axios.get(`http://localhost:5000/getbranches`, {
//                 params: {
//                     importerName: formData.importerName,
//                     orgcode: codeoforg,
//                     orgname: nameoforg
//                 }
//             });
//             localStorage.setItem('allbranchesofclient', JSON.stringify(response.data))
//             setFormData({
//                 ...formData,
//                 branches: response.data
//             });
//         } catch (error) {
//             console.error('Error fetching branches:', error);
//         }
//     };







//     const fetchOrganizationDetails = async (branchName, id) => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getorganizationdetails`, {
//                 params: {
//                     clientName: formData.importerName,
//                     branchName: branchName,
//                     orgcode: codeoforg,
//                     orgname: localStorage.getItem('orgname'),
//                     id: id
//                 }
//             });

//             setFormData({
//                 ...formData,
//                 address: response.data[0].address,
//                 gst: response.data[0].GST,
//                 iec: response.data[0].IEC
//             });

//         } catch (error) {
//             console.error('Error fetching organization details:', error);
//         }
//     };

//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody className='main-div'>
//                         <div className='left-div'>
//                             <Select
//                                 className="impgen-text-field-1"
//                                 value={{ value: formData.importerName, label: formData.importerName }}
//                                 options={filtered}
//                                 onChange={handleInputChange}
//                                 placeholder="Importer Name"
//                             />
//                             <CDropdown className="impgen-text-field-1">
//                                 <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
//                                 <CDropdownMenu className="impgen-text-dropdown">
//                                     {formData.branches && formData.branches.map((branch, index) => (
//                                         <CDropdownItem key={index} onClick={() => handleBranchSelect(branch.branchname, branch.id)}>{branch.branchname}</CDropdownItem>
//                                     ))}
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <textarea name="address" placeholder='Address' cols="50" rows="5" className='impgen-text-field-1' value={formData.address} readOnly></textarea>
//                             <input type="text" name="gst" placeholder="GST" className='impgen-text-field-1' value={formData.gst} readOnly />
//                             <input type="text" name="iec" placeholder="IEC Code" className='impgen-text-field-1' value={formData.iec} readOnly />
//                             <input type="text" name="portShipment" placeholder="Port of Shipment" className='impgen-text-field-1' value={formData.portShipment} onChange={(e) => setFormData({ ...formData, portShipment: e.target.value })} />
//                             <input type="text" name="finalDestination" placeholder="Final Destination" className='impgen-text-field-1' value={formData.finalDestination} onChange={(e) => setFormData({ ...formData, finalDestination: e.target.value })} />

//                             {localStorage.getItem('onEdit') === 'true' ?
//                                 <CButton onClick={handleUpdate}>Update</CButton> :
//                                 <CButton onClick={handleSubmit}>Submit</CButton>
//                             }
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
//                     <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <input type="text" placeholder="Name" className='text-field-1' />
//                 </CModalBody>
//                 <CModalFooter>
//                     <CButton color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </CButton>
//                     <CButton color="primary">Add New</CButton>
//                 </CModalFooter>
//             </CModal>
//         </div>
//     );
// };

// export default General;





























// import React, { useState, useEffect } from 'react';
// import { CChart } from '@coreui/react-chartjs'
// import Select from 'react-select';
// import {
//     CCard,
//     CCardBody,
//     CCol,
//     CRow,
//     CButton,
//     CDropdown,
//     CDropdownToggle,
//     CDropdownMenu,
//     CDropdownItem,
//     CModal,
//     CModalHeader,
//     CModalTitle,
//     CModalBody,
//     CModalFooter,
// } from '@coreui/react';
// import '../../../css/styles.css';
// import axios from 'axios';

// const General = () => {
//     const [formData, setFormData] = useState({
//         importerName: '',
//         selectedBranch: '',
//         branches: [],
//         address: '',
//         gst: '',
//         iec: '',
//         portShipment: '',
//         finalDestination: '',
//     });
//     const [importers, setImporters] = useState([]);
//     const [visible, setVisible] = useState(false);
//     const [filtered, setFiltered] = useState([]);

//     useEffect(() => {
//         const fetchAllClients = async () => {
//             try {
//                 const codeoforg = localStorage.getItem('orgcode');
//                 const response = await axios.get(`http://localhost:5000/getimporters`, {
//                     params: {
//                         orgcode: codeoforg
//                     }
//                 });
//                 setImporters(response.data || []); // Initialize as an empty array if response.data is falsy
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllClients();
//     }, []);


//     useEffect(() => {
//         fetchBranches();
//     }, [formData.importerName]); // Fetch branches whenever importer name changes

//     const handleInputChange = (newValue) => {
//         setFormData({
//             ...formData,
//             importerName: newValue.value,
//         });
//         // Fetch branches for the selected importer name
//         fetchBranches(newValue.value);
//     };


//     const handleBranchSelect = async (branchName) => {
//         setFormData({
//             ...formData,
//             selectedBranch: branchName
//         });
//         await fetchOrganizationDetails(branchName);
//     };

//     useEffect(() => {
//         // Update filtered options whenever importers change
//         const filteredOptions = importers.map(importer => ({ value: importer.clientname, label: importer.clientname }));
//         setFiltered(filteredOptions);
//     }, [importers]);

//     async function handleSubmit() {
//         try {
//             const jobkanum = localStorage.getItem('jobNumber');
//             const username = localStorage.getItem('username');
//             const nameoforg = localStorage.getItem('orgname');
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.post('http://localhost:5000/createGeneral',
//                 { formData: formData, orgname: nameoforg, orgcode: codeoforg, jobowner: username, jobnumber: jobkanum });

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const fetchBranches = async (importerName) => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getbranches`, {
//                 params: {
//                     importerName: importerName || formData.importerName, // Use the provided importerName or formData.importerName
//                     orgcode: codeoforg
//                 }
//             });
//             setFormData({
//                 ...formData,
//                 branches: response.data
//             });
//         } catch (error) {
//             console.error('Error fetching branches:', error);
//         }
//     };

//     const fetchOrganizationDetails = async (branchName) => {
//         try {
//             const codeoforg = localStorage.getItem('orgcode');
//             const response = await axios.get(`http://localhost:5000/getorganizationdetails`, {
//                 params: {
//                     clientName: formData.importerName,
//                     branchName: branchName,
//                     orgcode: codeoforg
//                 }
//             });
//             setFormData({
//                 ...formData,
//                 address: response.data[0].address,
//                 gst: response.data[0].GST,
//                 iec: response.data[0].IEC
//             });
//         } catch (error) {
//             console.error('Error fetching organization details:', error);
//         }
//     };

//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody className='main-div'>
//                         <div className='left-div'>

//                             <Select
//                                 className="impgen-text-field-1"
//                                 value={{ value: formData.importerName, label: formData.importerName }}
//                                 options={filtered}
//                                 onChange={handleInputChange}
//                                 placeholder="Importer Name"
//                                 isDisabled={!filtered.length} // Disable the select if there are no options
//                             />


//                             <CDropdown className="impgen-text-field-1">
//                                 <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
//                                 <CDropdownMenu className="impgen-text-dropdown">
//                                     {formData.branches && formData.branches.map((branch, index) => (
//                                         <CDropdownItem key={index} onClick={() => handleBranchSelect(branch.branchname)}>{branch.branchname}</CDropdownItem>
//                                     ))}
//                                 </CDropdownMenu>
//                             </CDropdown>
//                             <textarea name="address" placeholder='Address' cols="50" rows="5" className='impgen-text-field-1' value={formData.address} readOnly></textarea>
//                             <input type="text" name="gst" placeholder="GST" className='impgen-text-field-1' value={formData.gst} readOnly />
//                             <input type="text" name="iec" placeholder="IEC Code" className='impgen-text-field-1' value={formData.iec} readOnly />
//                             <input type="text" name="portShipment" placeholder="Port of Shipment" className='impgen-text-field-1' value={formData.portShipment} onChange={handleInputChange} />
//                             <input type="text" name="finalDestination" placeholder="Final Destination" className='impgen-text-field-1' value={formData.finalDestination} onChange={handleInputChange} />
//                             <CButton onClick={handleSubmit}>Submit</CButton>
//                         </div>
//                         <div className='right-div'>
//                                <CChart
//                                 type="doughnut"
//                                 data={{
//                                     labels: ['O2D', 'Do & Delivery', 'D2C', 'Collection'],
//                                     datasets: [
//                                         {
//                                             backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
//                                             data: [40, 20, 80, 10],
//                                         },
//                                     ],
//                                 }}
//                                 options={{
//                                     plugins: {
//                                         legend: {
//                                             labels: {
//                                                 color: 'blue',
//                                             }
//                                         }
//                                     },
//                                 }}
//                             />
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
//                     <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
//                 </CModalHeader>
//                 <CModalBody>
//                     <input type="text" placeholder="Name" className='text-field-1' />
//                 </CModalBody>
//                 <CModalFooter>
//                     <CButton color="secondary" onClick={() => setVisible(false)}>
//                         Close
//                     </CButton>
//                     <CButton color="primary">Add New</CButton>
//                 </CModalFooter>
//             </CModal>
//         </div>
//     );
// };

// export default General;
