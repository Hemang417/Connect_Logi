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

const DeliverytoDispatch = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const [editData, setEditData] = useState(null);

    const [typeofDispatch, settypeofDispatch] = useState({
        typeDispatch: '',
        days: '',
        hours: '',
        minutes: ''
    })

    const [allDispatchdata, setallDispatchdata] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        settypeofDispatch({ ...typeofDispatch, [name]: value });
    };


    async function fetchAllDispatch() {
        try {
            const response = await axios.get('http://localhost:5000/getDispatch', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setallDispatchdata(response.data);
        } catch (error) {
            console.log(error);
        }
    }



    const storeDispatch = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/storeDispatch', {
                tatimpcolumn: typeofDispatch.typeDispatch,
                days: typeofDispatch.days,
                hours: typeofDispatch.hours,
                minutes: typeofDispatch.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });
            // Close the modal
            if (response.status === 200) {
                fetchAllDispatch();
                setVisible(false);
                settypeofDispatch({
                    typeDispatch: '',
                    days: '',
                    hours: '',
                    minutes: ''
                })
                toast.success('Type of DND added successfully');
            }



        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        fetchAllDispatch();
    }, []);


    const handleEdit = (item) => {
        setEditData(item);
        settypeofDispatch({
            typeDispatch: item.tatimpcolumn,
            days: item.days,
            hours: item.hours,
            minutes: item.minutes
        });
        setVisible(true);
    }


    async function handleUpdate() {
        try {
            const response = await axios.put('http://localhost:5000/updateDispatch', {
                tatimpcolumn: typeofDispatch.typeDispatch,
                days: typeofDispatch.days,
                hours: typeofDispatch.hours,
                minutes: typeofDispatch.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                id: editData.id // Pass the ID of the item being updated
            });
            // Close the modal
            if (response.status === 200) {
                fetchAllDispatch();
                setVisible(false);
                settypeofDispatch({
                    typeDispatch: '',
                    days: '',
                    hours: '',
                    minutes: ''
                });
                setEditData(null); // Reset edit data after successful operation
                toast.success('Type of DND updated successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function handleDelete(id) {
        try {
            const deletedDispatch = await axios.delete('http://localhost:5000/deleteDispatch', {
                data: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    deletionrowid: id
                }
            });
          
            if (deletedDispatch.status === 200) {
                fetchAllDispatch();
            }
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
                    {allDispatchdata.length === 0 ? (
                        <CTableRow>
                            <CTableDataCell colSpan={3}>No Delivery to Dispatch data</CTableDataCell>
                        </CTableRow>
                    ) : (
                        allDispatchdata.map((item, index) => {
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
                        <input type="text" name='typeDispatch' placeholder="Type of O2D" className='text-field-1' value={typeofDispatch.typeDispatch} onChange={handleChange} />
                        <input type="text" name='days' placeholder="Days" className='text-field-1' value={typeofDispatch.days} onChange={handleChange} />
                        <input type="text" name='hours' placeholder="Hours" className='text-field-1' value={typeofDispatch.hours} onChange={handleChange} />
                        <input type="text" name='minutes' placeholder="Minutes" className='text-field-1' value={typeofDispatch.minutes} onChange={handleChange} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>

                    {editData ?
                        <CButton color="secondary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleUpdate}>Update O2D</CButton>
                        :
                        <CButton color="secondary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={storeDispatch}>Add O2D</CButton>
                    }

                </CModalFooter>
            </CModal>
        </div>
    )
}

export default DeliverytoDispatch;