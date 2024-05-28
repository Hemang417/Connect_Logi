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
const JobApproval = () => {

    const [latesJobs, setlatestJobs] = useState([]);
    const [approvalname, setapprovalname] = useState([]);
    const uniquevalue = "JobsButton"
    const fetchApproverThatHaveUniqueValue = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getapproverofJobs', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    uniquevalue: uniquevalue
                }
            });
            setapprovalname(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchlatestJob = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchlatestjob', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                },
            });
            setlatestJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Promise.all([fetchApproverThatHaveUniqueValue(), fetchlatestJob()])
    });

    // console.log(approvalname, latesJobs);

    return (
        <div>
            <h1>Approver Log of Import Jobs</h1>
            <CTable striped hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>Job Number</CTableHeaderCell>
                        <CTableHeaderCell>Importer Name</CTableHeaderCell>
                        <CTableHeaderCell>Created By</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {latesJobs && latesJobs.map((item, index) => {
                        return (
                            <CTableRow key={index}>
                                <CTableDataCell>{item.createdat}</CTableDataCell>
                                <CTableDataCell>{item.jobnumber}</CTableDataCell>
                                <CTableDataCell>{item.importername}</CTableDataCell>
                                <CTableDataCell>{item.jobowner}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="success" size="sm">Approve</CButton>
                                    <CButton color="danger" size="sm">Reject</CButton>
                                </CTableDataCell>
                            </CTableRow>
                        )
                    })}
                </CTableBody>

            </CTable>

        </div>
    )
}

export default JobApproval;
