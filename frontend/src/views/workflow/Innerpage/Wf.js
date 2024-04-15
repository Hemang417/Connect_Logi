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

const Wf = () => {

    const [lobdata, setLobdata] = useState([]);

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


    return (
        <CCol xs={12}>
            <CCard className="mb-2 container-div">
                <CCardBody>
                    <div className='grid-container-import'>
                        <div>
                            <label for="Locations" className='text-field-3'>Locations</label>
                            <input type="text" placeholder="" className='text-field-4' />
                        </div>
                        <div>
                            <label htmlFor="LOB" className='text-field-3'>Line of Business</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>All</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    {lobdata && lobdata.map((item, index) => (
                                        <CDropdownItem key={index}>{item.lobname}</CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>

                        <div>
                            <label for="Active" className='text-field-3'>Active</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'></CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem onClick={() => handleModeChange('Air')}>Yes</CDropdownItem>
                                    <CDropdownItem onClick={() => handleModeChange('Sea')}>No</CDropdownItem>
                                    <CDropdownItem onClick={() => handleModeChange('')}>Both</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                        <div className='all-buttons'>
                            <div className='search-button'>
                                <CButton color="primary" type="submit">
                                    Search
                                </CButton>
                            </div>
                        </div>
                    </div>
                </CCardBody>
            </CCard>


            <CForm>
                <CTable hover responsive striped className=''>
                    <CTableHead>
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col" className='row-font'></CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Locations</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Name of Workflow</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Organization/Customer</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Line of Business</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className='row-font'>Active Status</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                </CTable>
            </CForm>
            <CTableBody>
            </CTableBody>
            <CRow>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>

                        <CButton color="primary" type="submit" onClick={() => setvisible(true)}>
                            +
                        </CButton>

                    </div>
                </CCardBody>
            </CRow>
        </CCol>
    )
}

export default Wf;
