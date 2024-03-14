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
    CNavLink
} from '@coreui/react'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

import O2DTAT from './O2DTAT';
import DoNDelivery from './DoNDelivery';
import DeliverytoDispatch from './DeliverytoDispatch';

const ImpTAT = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);
  const [isshown, setIsShown] = useState("o2d");


    const navigate = useNavigate();


//     const [impTATData, setImpTATData] = useState([
//         { document: 'ScrutinyDocument', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'PortCFSNomination', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'ChecklistApproval', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'ESanchit', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'FilingBOE', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'Assesment', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'DutyCall', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'ExaminationOOC', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'BLStatusAgentName', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'ShippingLineBond', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'BLDocuments', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'OriginalDocReceived', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'InvoiceReceivedfromShippingLine', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'PaymenttoShippingLine', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'DeliveryOrder', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'ContainerArrivedatCFS', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'Delivery', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'EmptyContainerReceiving', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'ShippingLine', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'CFS', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'StampDuty', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'CustomDuty', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'Insurance', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'LREmptySlipBill', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'Billing', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'Dispatch', tat: { days: '00', hours: '00', minutes: '00' } },
//         { document: 'Miscellaneous', tat: { days: '00', hours: '00', minutes: '00' } }
//     ]);

//     const [changeapplytoupdate, setchangeapplytoupdate] = useState(false);







//     // const [dataAccess, setDataAccess] = useState({
//     //     ScrutinyDocument: '',
//     //     ChecklistApproval: '',
//     //     ESanchit: '',
//     //     FillingBOE: '',
//     //     Assesment: '',
//     //     DutyCall: '',
//     //     ExaminationOOC: '',
//     //     EBLStatusAgentName: '',
//     //     PortCFSNomination: '',
//     //     Scrutiny: '',
//     //     OriginalDocReceived: '',
//     //     InvoiceReceivedfromShippingLine: '',
//     //     PaymenttoShippingLine: '',
//     //     DeliveryOrder: '',
//     //     Delivery: '',
//     //     ShippingLine: '',
//     //     CFS: '',
//     //     StampDuty: '',
//     //     CustomDuty: '',
//     //     Insurance: '',
//     //     LREmptySlipBill: '',
//     //     Billing: '',
//     //     Dispatch: '',
//     //     Miscellaneous: '',
//     // })


//     // const handleCheckboxChange = async (event) => {
//     //     const { name, checked } = event.target;
//     //     setDataAccess(prevState => ({
//     //         ...prevState,
//     //         [name]: checked ? name : '' // Update only the specific property corresponding to the checkbox
//     //     }));

//     //     try {
//     //         const username = localStorage.getItem('empnameforaccess');
//     //         if (checked) {
//     //             // Checkbox is checked, send a backend request to store data
//     //             await axios.post('http://localhost:5000/impstore', { [name]: name, username }); // Send only the specific property
//     //         } else {
//     //             // Checkbox is unchecked, send a backend request to remove data
//     //             await axios.delete('http://localhost:5000/delimp', {
//     //                 data: { [name]: name, username } // Send only the specific property with an empty value
//     //             });
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };





//     async function handleApply() {
//         try {
//             const response = await axios.post('http://localhost:5000/storeimpTAT', {
//                 impTATData: impTATData,
//                 orgname: localStorage.getItem('orgname'),
//                 orgcode: localStorage.getItem('orgcode')
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     const handleInputChange = (index, field, value) => {
//         // Update the state with the new value for the specified field
//         setImpTATData(prevState => {
//             const newData = [...prevState];
//             newData[index].tat[field] = value;
//             return newData;
//         });
//     };



//     async function handleUpdate() {
//         try {
            
//             const response = await axios.put('http://localhost:5000/updateImpTAT', { 
//                 impTATData: impTATData,
//                 orgname: localStorage.getItem('orgname'),
//                 orgcode: localStorage.getItem('orgcode')
//             });
//             navigate('/dashboard');
//         } catch (error) {
//             console.log(error);
//         }
//     }




//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/getImpTATData', {
//                 params: {
//                     orgname: localStorage.getItem('orgname'),
//                     orgcode: localStorage.getItem('orgcode')
//                 }

//             });

//             const formattedData = response.data.map(item => ({
//                 document: item.tatimpcolumn,
//                 tat: {
//                     days: item.days,
//                     hours: item.hours,
//                     minutes: item.minutes
//                 }
//             }));
            
//             if (formattedData.length > 0) {
//                 setchangeapplytoupdate(true);
//             }
//             setImpTATData(formattedData);
//         } catch (error) {
//             console.log(error);
//         }
//     };



//     useEffect(() => {

//         fetchData();
//     }, []);




//     return (
//         <div>
//             <CTable hover responsive striped className="">
//                 <CTableHead>
//                     <CTableRow color="dark">
//                         <CTableHeaderCell scope="col">Document</CTableHeaderCell>
//                         <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
//                     </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                     {impTATData.map((item, index) => (
//                         <CTableRow key={index}>
//                             <CTableDataCell scope="row">{item.document}</CTableDataCell>
//                             <CTableDataCell>
//                                 <input
//                                     type="number"
//                                     value={item.tat.days}
//                                     onChange={e => handleInputChange(index, 'days', e.target.value)}
//                                 />{' '}
//                                 days{' '}
//                                 <input
//                                     type="number"
//                                     value={item.tat.hours}
//                                     onChange={e => handleInputChange(index, 'hours', e.target.value)}
//                                 />{' '}
//                                 hours{' '}
//                                 <input
//                                     type="number"
//                                     value={item.tat.minutes}
//                                     onChange={e => handleInputChange(index, 'minutes', e.target.value)}
//                                 />{' '}
//                                 minutes
//                             </CTableDataCell>
//                         </CTableRow>
//                     ))}
//                 </CTableBody>

//             </CTable>

//             {changeapplytoupdate ?
//                 <CButton onClick={handleUpdate}>Update</CButton>
//                 :
//                 <CButton onClick={handleApply}>Apply Import TAT</CButton>
//             }


//         </div>
//     );
// };











    return (
        <div>
            <CNav variant="tabs" className='nav-link-text'>
        {/* <CNavItem>
          <CNavLink onClick={() => { setIsShown("O2D") }}>General</CNavLink>
        </CNavItem> */}
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("o2d") }}>O2D</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("doanddelivery") }}>Do & Delivery</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("deliverytodispatch") }}>Delivery to Disptach</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("d2c") }}>Transport</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("Collection") }}>Collection</CNavLink>
        </CNavItem>
        <CNavItem>
          {/* {showQuotation && ( */}
            <CNavLink onClick={() => { setIsShown("Quotation") }}>Quotation</CNavLink>
          {/* )} */}
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("documentupload") }}>Documents Upload</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("Transactionhistory") }}>Transaction History</CNavLink>
        </CNavItem>
        
      </CNav>




      {isshown === "o2d" && <O2DTAT />}
      {isshown === "doanddelivery" && <DoNDelivery />}
      {isshown === "deliverytodispatch" && <DeliverytoDispatch />}
      {/* {isshown === "o2d" && <O2D />}
      {isshown === "DoNDelivery" && <DoNDelivery />}
      {isshown === "d2c" && <D2C />}
      {isshown === "documentupload" && <DocumentUpload />}
      {isshown === "Collection" && <Collection />}
      {isshown === "Transactionhistory" && <Transactionhistory />}
      {isshown === "Quotation" && <Quotation />} */}
        </div>
    )
}
export default ImpTAT;
