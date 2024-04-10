import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/styles.css';
import { useLocation } from 'react-router-dom'

const branchlist = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ownBranch, setownBranch] = useState([]);

    useEffect(() => {
        const fetchOwnBranches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
                    params: {
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode')
                    }
                });
                setownBranch(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOwnBranches();
    }, [])

    return (
        <div>
            <CTable hover responsive striped className=''>
                <CTableHead>
                    <CTableRow color='dark'>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Code</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">GST No.</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Head Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Branch Head Mobile No.</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {ownBranch.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableHeaderCell scope="row">
                                <Link to={'/UserListAccess'} onClick={() => handleAccess(index)}>Edit</Link>
                            </CTableHeaderCell>
                            <CTableDataCell>{item.branchcode}</CTableDataCell>
                            <CTableDataCell>{item.ownbranchname}</CTableDataCell>
                            <CTableDataCell>{item.gstnum}</CTableDataCell>
                            <CTableDataCell>{item.headname}</CTableDataCell>
                            <CTableDataCell>{item.headnum}</CTableDataCell>
                        </CTableRow>

                    ))}
                </CTableBody>
                
            </CTable>
        </div>
    );
};

export default branchlist;



















