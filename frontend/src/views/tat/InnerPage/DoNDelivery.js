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

const DoNDelivery = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const [editData, setEditData] = useState(null);

    const [typeofDNData, settypeofDNData] = useState({
        typeofDN: '',
        days: '',
        hours: '',
        minutes: ''
    })

    const [allDNdata, setallDNDdata] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        settypeofDNData({ ...typeofDNData, [name]: value });
    };


    async function fetchAllDND() {
        try {
            const response = await axios.get('http://localhost:5000/getDoNDelivery', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setallDNDdata(response.data);
        } catch (error) {
            console.log(error);
        }
    }



    const storeDND = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/storeDND', {
                tatimpcolumn: typeofDNData.typeofDN,
                days: typeofDNData.days,
                hours: typeofDNData.hours,
                minutes: typeofDNData.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });
            // Close the modal
            if (response.status === 200) {
                fetchAllDND();
                setVisible(false);
                settypeofDNData({
                    typeofO2D: '',
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
        fetchAllDND();
    }, []);


    const handleEdit = (item) => {
        setEditData(item);
        settypeofDNData({
            typeofDN: item.tatimpcolumn,
            days: item.days,
            hours: item.hours,
            minutes: item.minutes
        });
        setVisible(true);
    }


    async function handleUpdate() {
        try {
            const response = await axios.put('http://localhost:5000/updateDND', {
                tatimpcolumn: typeofDNData.typeofDN,
                days: typeofDNData.days,
                hours: typeofDNData.hours,
                minutes: typeofDNData.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                id: editData.id // Pass the ID of the item being updated
            });
            // Close the modal
            if (response.status === 200) {
                fetchAllDND();
                setVisible(false);
                settypeofDNData({
                    typeofO2D: '',
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
            const deletedDNDrow = await axios.delete('http://localhost:5000/deleteDND', {
                data: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    deletionrowid: id
                }
            });
            console.log(deletedDNDrow);
            if (deletedDNDrow.status === 200) {
                fetchAllDND();
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
                    {allDNdata.length === 0 ? (
                        <CTableRow>
                            <CTableDataCell colSpan={3}>No Do & Delivery data</CTableDataCell>
                        </CTableRow>
                    ) : (
                        allDNdata.map((item, index) => {
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
                        <input type="text" name='typeofDN' placeholder="Type of O2D" className='text-field-1' value={typeofDNData.typeofDN} onChange={handleChange} />
                        <input type="text" name='days' placeholder="Days" className='text-field-1' value={typeofDNData.days} onChange={handleChange} />
                        <input type="text" name='hours' placeholder="Hours" className='text-field-1' value={typeofDNData.hours} onChange={handleChange} />
                        <input type="text" name='minutes' placeholder="Minutes" className='text-field-1' value={typeofDNData.minutes} onChange={handleChange} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>

                    {editData ?
                        <CButton color="secondary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleUpdate}>Update O2D</CButton>
                        :
                        <CButton color="secondary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={storeDND}>Add O2D</CButton>
                    }

                </CModalFooter>
            </CModal>
        </div>
    )
}

export default DoNDelivery;