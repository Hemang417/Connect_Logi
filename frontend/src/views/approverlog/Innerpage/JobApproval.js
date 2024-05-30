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
    CPopover
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../../../css/styles.css"

const JobApproval = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [latestJobs, setLatestJobs] = useState([]);
    const [approvalName, setApprovalName] = useState([]);
    const uniqueValue = "JobsButton";
    const [approvedJobs, setapprovedJobs] = useState([]);
    const [alljobsimp, setalljobsimp] = useState([]);

    const fetchApprovers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getapproverofJobs', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    uniquevalue: uniqueValue,
                    branchcode: localStorage.getItem('branchcodeofemp')
                }
            });
            setApprovalName(response.data);
        } catch (error) {
            console.error('Error fetching approvers:', error);
        }
    };

    const fetchLatestJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchlatestjob', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                },
            });
            setLatestJobs(response.data);
        } catch (error) {
            console.error('Error fetching latest jobs:', error);
        }
    };


    async function checker() {
        try {
            const response = await axios.get('http://localhost:5000/getapprovedJob', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    uniquevalue: uniqueValue
                },
            });
            setapprovedJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    async function getAllJobs() {
        try {
            const response = await axios.get('http://localhost:5000/getAllJobs', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    // branchname: localStorage.getItem('branchnameofemp'),
                }
            })
            setalljobsimp(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        Promise.all([fetchApprovers(), fetchLatestJobs()])
            .then(() => checker())
            .then(() => getAllJobs())
            .catch((error) => console.error(error));
    }, []);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const openModal = (job) => {
        setSelectedJob(job);
    };

    const closeModal = () => {
        setSelectedJob(null);
    };

    const handleInputChange = (e, field) => {
        setSelectedJob({
            ...selectedJob,
            [field]: e.target.value
        });
    };

    const handleApproveJob = async () => {
        try {
            await axios.put('http://localhost:5000/approveImpJob', {
                jobId: selectedJob.id,
                updatedFields: selectedJob,
                approval: { username: localStorage.getItem('username'), status: 'Approve' }
            });
            toast.success('Import Job approved successfully');
            closeModal();
            checker();
            const updatedLatestJob = latestJobs.filter(job => job.jobnumber !== selectedJob.jobnumber);
            setLatestJobs(updatedLatestJob);
        } catch (error) {
            console.error('Error approving job:', error);
            toast.error('Failed to approve Import Job');
        }
    };

    const handleRejectJob = async () => {
        try {
            await axios.put('http://localhost:5000/approveImpJob', {
                jobId: selectedJob.id,
                updatedFields: selectedJob,
                approval: { username: localStorage.getItem('username'), status: 'Reject' }
            });
            toast.success('Import Job rejected successfully');
            closeModal();
            checker();
            const updatedLatestJob = latestJobs.filter(job => job.jobnumber !== selectedJob.jobnumber);
            setLatestJobs(updatedLatestJob);
        } catch (error) {
            console.error('Error rejecting job:', error);
            toast.error('Failed to reject Import Job');
        }
    };

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
                    {localStorage.getItem('username') !== 'admin' ? (
                        approvalName?.some(item => item.employeename === localStorage.getItem('username')) ? (
                            latestJobs
                                ?.filter(item => !alljobsimp?.some(job => job.jobnumber === item.jobnumber))
                                .filter(item => {
                                    const hasRejected = item.approval && item.approval.some(approval => approval.status === 'Reject');
                                    return !hasRejected;
                                })
                                .map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{formatDateString(item.createdat)}</CTableDataCell>
                                        <CTableDataCell>{item.jobnumber}</CTableDataCell>
                                        <CTableDataCell>{item.importername}</CTableDataCell>
                                        <CTableDataCell>{item.jobowner}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton color="success" size="sm" onClick={() => openModal(item)}>Show More</CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="5" className="text-center">Jobs Approval access is not to you</CTableDataCell>
                            </CTableRow>
                        )
                    ) : (
                        latestJobs && latestJobs.map((item, index) => {

                            const isPresent = alljobsimp?.some(row => row.jobnumber === item.jobnumber);
                            const rejct = item.approval?.some(job => job.status === 'Reject');
                            const status = isPresent ? 'Completed' : (rejct ? 'Rejected' : 'Pending');

                            return (
                                <CTableRow key={index}>
                                    <CTableDataCell>{formatDateString(item.createdat)}</CTableDataCell>
                                    <CTableDataCell>{item.jobnumber}</CTableDataCell>
                                    <CTableDataCell>{item.importername}</CTableDataCell>
                                    <CTableDataCell>{item.jobowner}</CTableDataCell>
                                    <CTableDataCell>{status}</CTableDataCell>
                                </CTableRow>
                            )
                        })
                    )}

                </CTableBody>
            </CTable>

            <CModal size="xl" visible={selectedJob !== null} onClose={closeModal}>
                <CModalHeader onClose={closeModal}>
                    <CModalTitle>All Job Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedJob && (
                        <>
                            <div className='impapprovalmodal'>
                                <label>Importer Name:</label>
                                <input type="text" value={selectedJob.importername} readOnly />

                                <label>Branch</label>
                                <input type="text" value={selectedJob.importername} readOnly />
                            </div>

                            <div className='impapprovalmodal'>
                                <label>Job Number:</label>
                                <input type="text" value={selectedJob.jobnumber} readOnly />

                                <label>Job Date:</label>
                                <input type="text" value={selectedJob.jobdate} readOnly />

                                <label>Doc Received On:</label>
                                <input type="text" value={selectedJob.docreceivedon} readOnly />

                                <label>Transport Mode:</label>
                                <input type="text" value={selectedJob.transportmode} onChange={(e) => handleInputChange(e, 'transportmode')} readOnly />

                            </div>

                            <div className='impapprovalmodal'>
                                <label>Custom House:</label>
                                <input type="text" value={selectedJob.customhouse} onChange={(e) => handleInputChange(e, 'customhouse')} />

                                <label>Own Booking:</label>
                                <input type="text" value={selectedJob.ownbooking} onChange={(e) => handleInputChange(e, 'ownbooking')} />

                                <label>Delivery Mode:</label>
                                <input type="text" value={selectedJob.deliverymode} onChange={(e) => handleInputChange(e, 'deliverymode')} />

                                <label>No. of Container:</label>
                                <input type="text" value={selectedJob.noofcontainer} onChange={(e) => handleInputChange(e, 'noofcontainer')} />
                            </div>

                            <div className='impapprovalmodal'>
                                <label>Own Transportation:</label>
                                <input type="text" value={selectedJob.owntransportation} onChange={(e) => handleInputChange(e, 'owntransportation')} />

                                <label>BE Type:</label>
                                <input type="text" value={selectedJob.betype} onChange={(e) => handleInputChange(e, 'betype')} />

                                <label>BE No:</label>
                                <input type="text" value={selectedJob.benumber} onChange={(e) => handleInputChange(e, 'benumber')} />

                                <label>Consignment Type:</label>
                                <input type="text" value={selectedJob.consignmenttype} onChange={(e) => handleInputChange(e, 'consignmenttype')} />
                            </div>

                            <div className='impapprovalmodal'>
                                <label>CFS Name:</label>
                                <input type="text" value={selectedJob.cfsname} onChange={(e) => handleInputChange(e, 'cfsname')} />

                                <label>Shipping Line Name:</label>
                                <input type="text" value={selectedJob.shippinglinename} onChange={(e) => handleInputChange(e, 'shippinglinename')} />

                                <label>Shipping Line Bond:</label>
                                <input type="text" value={selectedJob.shippinglinebond} onChange={(e) => handleInputChange(e, 'shippinglinebond')} />

                                <label>BL Type:</label>
                                <input type="text" value={selectedJob.bltype} onChange={(e) => handleInputChange(e, 'bltype')} />
                            </div>

                            <div className='impapprovalmodal'>
                                <label>BL No:</label>
                                <input type="text" value={selectedJob.bltypenum} onChange={(e) => handleInputChange(e, 'bltypenum')} />

                                <label>BL Status:</label>
                                <input type="text" value={selectedJob.blstatus} onChange={(e) => handleInputChange(e, 'blstatus')} />

                                <label>Free Days:</label>
                                <input type="text" value={selectedJob.freedays} onChange={(e) => handleInputChange(e, 'freedays')} />

                                <label>GST:</label>
                                <input type="text" value={selectedJob.GST} readOnly />

                            </div>

                            <div className='impapprovalmodal'>
                                <label>IEC:</label>
                                <input type="text" value={selectedJob.IEC} readOnly />

                                <label>Final Destination:</label>
                                <input type="text" value={selectedJob.finaldestination} onChange={(e) => handleInputChange(e, 'finaldestination')} />

                                <label>Port of Shipment:</label>
                                <input type="text" value={selectedJob.portofshipment} onChange={(e) => handleInputChange(e, 'portofshipment')} />

                            </div>

                            <div className='impapprovalmodal-1'>
                                
                            </div>
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CPopover content="Close Modal" trigger={['hover', 'focus']}>
                        <CButton color="secondary" onClick={closeModal}>Close</CButton>
                    </CPopover>
                    <CPopover content="Approve Job" trigger={['hover', 'focus']}>
                        <CButton color="primary" onClick={handleApproveJob}>Approve</CButton>
                    </CPopover>
                    <CPopover content="Reject Job" trigger={['hover', 'focus']}>
                        <CButton color="danger" onClick={handleRejectJob}>Reject</CButton>
                    </CPopover>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default JobApproval;
