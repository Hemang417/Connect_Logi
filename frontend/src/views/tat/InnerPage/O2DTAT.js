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
import toast from 'react-hot-toast'

const O2DTAT = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const [editData, setEditData] = useState(null);

    const [typeofO2DData, settypeofO2DData] = useState({
        typeofO2D: '',
        days: '',
        hours: '',
        minutes: ''
    })

    const [allO2Ddata, setallO2Ddata] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        settypeofO2DData({ ...typeofO2DData, [name]: value });
    };


    async function fetchAllO2D() {
        try {
            const response = await axios.get('http://localhost:5000/getAllO2D', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setallO2Ddata(response.data);
        } catch (error) {
            console.log(error);
        }
    }





    const storeO2D = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/storeO2D', {
                tatimpcolumn: typeofO2DData.typeofO2D,
                days: typeofO2DData.days,
                hours: typeofO2DData.hours,
                minutes: typeofO2DData.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });
            // Close the modal
            if (response.status === 200) {
                fetchAllO2D();
                setVisible(false);
                settypeofO2DData({
                    typeofO2D: '',
                    days: '',
                    hours: '',
                    minutes: ''
                })
                toast.success('Type of O2D added successfully');
            }



        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        fetchAllO2D();
    }, [])



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




    const handleEdit = (item) => {
        setEditData(item);
        settypeofO2DData({
            typeofO2D: item.tatimpcolumn,
            days: item.days,
            hours: item.hours,
            minutes: item.minutes
        });
        setVisible(true);
    }



    async function handleUpdate() {
        try {
            const response = await axios.put('http://localhost:5000/updateO2D', {
                tatimpcolumn: typeofO2DData.typeofO2D,
                days: typeofO2DData.days,
                hours: typeofO2DData.hours,
                minutes: typeofO2DData.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                id: editData.id // Pass the ID of the item being updated
            });
            // Close the modal
            if (response.status === 200) {
                fetchAllO2D();
                setVisible(false);
                settypeofO2DData({
                    typeofO2D: '',
                    days: '',
                    hours: '',
                    minutes: ''
                });
                setEditData(null); // Reset edit data after successful operation
                toast.success('Type of O2D updated successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }











    async function handleDelete(id) {
        try {
            const deletedO2Drow = await axios.delete('http://localhost:5000/deleteO2D', {
                data: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    deletionrowid: id
                }
            });
            fetchAllO2D();
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div>
            <CTable hover responsive striped className=''>
                <CTableHead>
                    <CTableRow color='dark' >
                        {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Document</CTableHeaderCell>
                        <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>

                    </CTableRow>
                </CTableHead>


                <CTableBody>
                    {allO2Ddata.length === 0 ? (
                        <CTableRow>
                            <CTableDataCell colSpan={3}>No O2D data</CTableDataCell>
                        </CTableRow>
                    ) : (
                        allO2Ddata.map((item, index) => {
                            return (
                                <CTableRow key={index}>
                                    <CTableDataCell scope="row">{item.tatimpcolumn}</CTableDataCell>
                                    <CTableDataCell>{item.days} days {item.hours} hours {item.minutes} minutes</CTableDataCell>
                                    <CTableDataCell>
                                        <Link onClick={() => handleEdit(item)}>Edit</Link>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <Link onClick={() => handleDelete(item.id)}>Delete</Link>
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        })
                    )}
                </CTableBody>


            </CTable>
            <div className='search-button'>
                <CButton color="success" type="submit" className='contact-add-button' onClick={() => { setVisible(!visible); }}>
                    +
                </CButton>
            </div>
            <CModal
                visible={visible}
                onClose={() => { setVisible(false) }}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add TAT</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <input type="text" name='typeofO2D' placeholder="Type of O2D" className='text-field-1' value={typeofO2DData.typeofO2D} onChange={handleChange} />
                        <input type="text" name='days' placeholder="Days" className='text-field-1' value={typeofO2DData.days} onChange={handleChange} />
                        <input type="text" name='hours' placeholder="Hours" className='text-field-1' value={typeofO2DData.hours} onChange={handleChange} />
                        <input type="text" name='minutes' placeholder="Minutes" className='text-field-1' value={typeofO2DData.minutes} onChange={handleChange} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>

                    {editData ?
                        <CButton color="secondary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleUpdate}>Update O2D</CButton>
                        :
                        <CButton color="secondary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={storeO2D}>Add O2D</CButton>
                    }

                    {/* {
                        editVisible ?
                            <CButton color="primary" onClick={handleUpdate}>Update</CButton> :
                            <CButton color="primary" onClick={handleSubmit}>Add New</CButton>

                    } */}
                    {/* <CButton color="primary" onClick={handleSubmit}>Add New</CButton> */}



                </CModalFooter>
            </CModal>
        </div>
    )
}

export default O2DTAT;