
// import React, { useEffect, useState } from 'react';
// import {
//     CButton,
//     CCardBody,
//     CCol,
//     CForm,
//     CModal,
//     CModalBody,
//     CModalFooter,
//     CModalHeader,
//     CModalTitle,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
//     CDropdown,
//     CDropdownItem,
//     CDropdownMenu,
//     CDropdownToggle
// } from '@coreui/react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Approverlog = () => {

//     const [latestOrg, setlatestOrg] = useState([]);
//     const [approvalname, setapprovalname] = useState([]);
//     const [visible, setvisible] = useState(false);

//     const uniquevalue = "OrgButton"
//     const fetchlatestOrg = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/getlatestorg', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode')
//                 }
//             })
//             setlatestOrg(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     const fetchapproverthathaveuniquevalue = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/getapproverthathaveuniquevalue', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode'),
//                     uniquevalue: uniquevalue
//                 }
//             })
//             setapprovalname(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     useEffect(() => {
//         fetchlatestOrg();
//         fetchapproverthathaveuniquevalue();
//     }, [])

//     async function showDetails(org){
//         try {
//             setvisible(true);
//             console.log(org);
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     return (
//         <div>
//             <h1>Approver Log of Organization</h1>
//             <CTable striped hover responsive>
//                 <CTableHead>
//                     <CTableRow>
//                         <CTableHeaderCell>Client Name</CTableHeaderCell>
//                         <CTableHeaderCell>Actions</CTableHeaderCell>
//                     </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                     {latestOrg.map((org, index) => {
//                         const isAdmin = localStorage.getItem('username') === 'admin';
//                         const isEmployee = approvalname.some(approval => approval.employeename === localStorage.getItem('username'));
//                         if (isAdmin || isEmployee) {
//                             return (
//                                 <CTableRow key={index}>
//                                     <CTableDataCell>{org.clientname}</CTableDataCell>
//                                     <CTableDataCell>

//                                         {/* <>
//                                             <CButton color="success">Accept</CButton>
//                                             <CButton color="danger">Delete</CButton>
//                                         </> */}

//                                         <CButton color="primary" onClick={() => showDetails(org)}>Show More</CButton>
//                                     </CTableDataCell>
//                                 </CTableRow>
//                             );
//                         } else {
//                             return null;
//                         }
//                     })}
//                 </CTableBody>
//             </CTable>

//             {
//                 <CModal
//                     visible={visible}
//                     onClose={() => setvisible(false)}
//                     aria-labelledby="LiveDemoExampleLabel"
//                 >
//                     <CModalHeader onClose={() => setvisible(false)}>
//                         <CModalTitle id="LiveDemoExampleLabel">
//                             All Data
//                         </CModalTitle>
//                     </CModalHeader>
//                     <CModalBody>

//                     </CModalBody>
//                     <CModalFooter>
//                         <CButton color="secondary" onClick={() => setvisible(false)}>
//                             Close
//                         </CButton>
//                         <CButton color="primary">
//                             Accept
//                         </CButton>
//                         <CButton color="primary">
//                             Delete
//                         </CButton>
//                     </CModalFooter>
//                 </CModal>

//             }


//         </div>
//     );

// };

// export default Approverlog;










































import React, { useEffect, useState } from 'react';
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CPopover,
    CBadge,
    CNav,
    CNavItem,
    CNavLink
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import OrgApproval from './Innerpage/OrgApproval';
import JobApproval from './Innerpage/JobApproval';
const Approverlog = () => {
    const [latestOrg, setlatestOrg] = useState([]);
    const [approvalname, setapprovalname] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null); // State to store selected organization
    const [approvedOrgs, setapprovedOrgs] = useState([])
    const uniquevalue = "OrgButton";
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [isshown, setIsShown] = useState('organization');


    useEffect(() => {
        setSelectedOrg(state);
    }, []);

    const fetchlatestOrg = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getlatestorg', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                },
            });
            setlatestOrg(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchApproverThatHaveUniqueValue = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getapproverthathaveuniquevalue', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    uniquevalue: uniquevalue,
                },
            });
            setapprovalname(response.data);

        } catch (error) {
            console.log(error);
        }
    };


    async function checker() {
        try {
            const response = await axios.get('http://localhost:5000/getapprovedorg', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    uniquevalue: uniquevalue
                },
            });

            setapprovedOrgs(response.data);

        } catch (error) {
            console.error(error);
        }
    }


    const [allorg, setallorg] = useState([]);
    async function getOrganizations() {
        try {
            const response = await axios.get(`http://localhost:5000/getorg`, {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            })
            setallorg(response.data)
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        Promise.all([fetchApproverThatHaveUniqueValue(), fetchlatestOrg()])
            .then(() => checker())
            .then(() => getOrganizations())
            .catch((error) => console.error(error));
    }, []);



    // const openModal = (org) => {
    //     setSelectedOrg(org);
    // }

    // const closeModal = () => {
    //     setSelectedOrg(null);
    // }

    // const handleInputChange = (e, field) => {
    //     setSelectedOrg({
    //         ...selectedOrg,
    //         [field]: e.target.value
    //     });
    // }


    // const approveOrganization = async () => {
    //     try {
    //         const response = await axios.put('http://localhost:5000/approveOrganization', {
    //             orgId: selectedOrg.id,
    //             updatedFields: selectedOrg,
    //             approval: { username: localStorage.getItem('username'), status: 'Approve' }
    //         });

    //         toast.success('Organization approved successfully');
    //         closeModal();
    //         checker();
    //         // const updatedLatestOrg = latestOrg.filter(org => {
    //         //     // Check if the organization has any approval with status 'Reject'
    //         //     const hasRejected = org.approval.some(approval => approval.status === 'Reject');
    //         //     // Check if the organization's clientname is not equal to the selectedOrg's clientname
    //         //     const isNotSelectedOrg = org.clientname !== selectedOrg.clientname;
    //         //     // Include the organization in the filtered array if it hasn't been rejected and is not the selectedOrg
    //         //     return !hasRejected && isNotSelectedOrg;
    //         // });
    //         // setlatestOrg(updatedLatestOrg);
    //         const updatedLatestOrg = latestOrg.filter(org => org.clientname !== selectedOrg.clientname);
    //         setlatestOrg(updatedLatestOrg);
    //         navigate(location.pathname, { replace: true })
    //     } catch (error) {
    //         console.log(error);
    //         toast.error('Failed to approve organization');
    //     }
    // }

    // const rejectOrg = async () => {
    //     try {
    //         const response = await axios.put('http://localhost:5000/approveOrganization', {
    //             orgId: selectedOrg.id,
    //             updatedFields: selectedOrg,
    //             approval: { username: localStorage.getItem('username'), status: 'Reject' }
    //         });
    //         toast.success('Organization rejected successfully');
    //         closeModal();
    //         checker();

    //         const updatedLatestOrg = latestOrg.filter(org => org.clientname !== selectedOrg.clientname);
    //         setlatestOrg(updatedLatestOrg);
    //         navigate(location.pathname, { replace: true })
    //     } catch (error) {
    //         console.log(error);
    //         toast.error('Failed to Reject organization');
    //     }
    // }


    // useEffect(() => {
    //     navigate('/approverlog', { state: null })
    // }, [])


    // function reverse(dateString) {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-indexed
    //     const year = date.getFullYear();
    //     return `${day}-${month}-${year}`;
    // }





    return (
        <div>
            <CNav variant="tabs" className='nav-link-text'>
                <CNavItem>
                    <CNavLink onClick={() => { setIsShown("organization") }}>Organization</CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink onClick={() => { setIsShown("jobapproval") }}>Import Job</CNavLink>
                </CNavItem>
            </CNav>

            {isshown === "organization" && <OrgApproval />}
            {isshown === "jobapproval" && < JobApproval/>}
        </div>

    );
};

export default Approverlog;
