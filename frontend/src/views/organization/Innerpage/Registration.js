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
//     CNavItem,
//     CNav,
//     CNavLink
// } from '@coreui/react'
// import '../../../css/styles.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'
// // import createjob from './CreateJob';

// const Registration = ({ onSave, rData }) => {
//     const [date, setDate] = useState(new Date());
//     const [startDate, setStartDate] = useState();
//     const [endDate, setEndDate] = useState();

//     const [registrationData, setRegistrationData] = useState({
//         PAN: '',
//         GST: '',
//         IEC: ''
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setRegistrationData({ ...registrationData, [name]: value });
//     };

//     const handleSave = () => {
//         onSave(registrationData);
//     };


//     // const [prefilledData, setPrefilledData] = useState({
//     //     PAN: '',
//     //     GST: '',
//     //     IEC: ''
//     // });

//     // useEffect(() => {
//     //     if (rData) {
//     //         setRegistrationData(rData);
//     //     }
//     // }, [rData]);



//     useEffect(() => {
//         const handlebranchchange = async () => {
//             try {
//                 const selectedBranchName = localStorage.getItem('selectedBranchName');
//                 const clientname = localStorage.getItem('clientname');
//                 const aliashai = localStorage.getItem('alias')


//                 const response = await axios.get('http://localhost:5000/allFetch', {
//                     params: {
//                         clientname: clientname,
//                         alias: aliashai,
//                         branchname: selectedBranchName
//                     }
//                 })
//                 console.log(response.data);
//                 setRegistrationData(response.data)
//             } catch (error) {
//                 console.log("Error: " + error);
//             }
//         }
//         handlebranchchange()
//     }, [])









//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody>
//                         {/* <CDropdown className="text-field-1">
//                             <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
//                             <CDropdownMenu className="text-field-2">
//                                 <CDropdownItem href="#">Mumbai</CDropdownItem>
//                                 <CDropdownItem href="#">Kolkata</CDropdownItem>
//                                 <CDropdownDivider/>
//     <CDropdownItem href="#">Add New Branch</CDropdownItem>
//                             </CDropdownMenu>
//                         </CDropdown> */}
//                         <input type="text" placeholder="PAN Details" className='text-field-1' name='PAN' onChange={handleChange} value={registrationData.PAN} />
//                         <input type="text" placeholder="GST Details" className='text-field-1' name='GST' onChange={handleChange} value={registrationData.GST} />
//                         <input type="text" placeholder="IEC Code" className='text-field-1' name='IEC' onChange={handleChange} value={registrationData.IEC} />
//                         {/* <div className='search-button'>
//                     <CButton type="submit" className='new-regis-button'>
//                         New
//                     </CButton>
//                 </div> */}
//                         <div className='mb-2 search-button update-button'>
//                             <CButton color="primary" type="submit" onClick={handleSave}>
//                                 Update
//                             </CButton>
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
//         </div>
//     )
// }

// export default Registration;

















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
import toast from 'react-hot-toast';
// import createjob from './CreateJob';

const Registration = ({ onSave, rData }) => {
    // const [date, setDate] = useState(new Date());
    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();

    const [registrationData, setRegistrationData] = useState({
        PAN: '',
        GST: '',
        IEC: ''
    })
    const [validationMessage, setValidationMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({ ...registrationData, [name]: value });
    };

    const handleSave = () => {

        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

        if (!panPattern.test(registrationData.PAN)) {
            setValidationMessage('PAN number is invalid. Try Again.');
            alert('PAN number is invalid. Try Again.');
            return;
        }

        if (!gstPattern.test(registrationData.GST)) {
            setValidationMessage('GST number is invalid. Try Again.');
            alert('GST number is invalid. Try Again.');
            return;
        }

        if (registrationData.GST.slice(2, 12) !== registrationData.PAN) {
            setValidationMessage('GST number does not match PAN. Try Again.');
            alert('GST number invalid. Try Again.');
            return;
        }

        if(registrationData.IEC !== registrationData.PAN){
            setValidationMessage('IEC number is invalid. Try Again.');
            alert('IEC number is invalid');
            return;
        }

        setValidationMessage('');
        toast.success('Registration saved successfully')
        onSave(registrationData);
        
    };


    // const [prefilledData, setPrefilledData] = useState({
    //     PAN: '',
    //     GST: '',
    //     IEC: ''
    // });

    useEffect(() => {
        if (rData) {
            setRegistrationData(rData);
        }
    }, [rData]);

    const [isEditing, setIsEditing] = useState(false);



    useEffect(() => {
        if(localStorage.getItem('firstorgofclient')){
            const prefill = async () => {
                try {
                    const firstbranchofclient = localStorage.getItem('firstorgofclient');
                    const jsonfirstbranch = JSON.parse(firstbranchofclient);
                    const clientname = localStorage.getItem('organizationclientname');
                    const aliashai = localStorage.getItem('alias');
    
                    const response = await axios.get('http://localhost:5000/allFetch', {
                        params: {
                            clientname: clientname,
                            alias: aliashai,
                            branchname: jsonfirstbranch.branchname,
                            id: jsonfirstbranch.id
                        }
                    })
                    setRegistrationData(response.data);
                    
                } catch (error) {
                    console.log("Error: " + error);
                }
            }
            prefill();
        }
        
    }, []);



    useEffect(() => {
        const handlenewbranchdata = async () => {
            try {
                if (localStorage.getItem('branchnames') && localStorage.getItem('isEditing') === 'true') {
                    setRegistrationData({
                        PAN: '',
                        GST: '',
                        IEC: ''
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        handlenewbranchdata();
    }, []);
    





    return (
        <div>
            <CCol xs={12}>
                <CCard className="mt-0 container-div">
                    <CCardBody>
                        
                        <input type="text" placeholder="PAN Details" className='text-field-1' name='PAN' onChange={handleChange} value={registrationData.PAN} />
                        <input type="text" placeholder="GST Details" className='text-field-1' name='GST' onChange={handleChange} value={registrationData.GST} />
                        <input type="text" placeholder="IEC Code" className='text-field-1' name='IEC' onChange={handleChange} value={registrationData.IEC} />
                       
                        <div className='mb-2 search-button update-button'>
                            <CButton color="primary" type="submit" onClick={handleSave}>
                                Update
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
           
        </div>
    )
}

export default Registration;