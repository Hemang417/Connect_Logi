import React, { useState, useEffect } from "react";
import { NavLink, parsePath } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CRow, CForm, CTable, CTableBody, CTableHead, CTableRow,
    CButton, CTableHeaderCell,
    CTableDataCell
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import {
    cilBell,
    cilCreditCard,
    cilCommentSquare,
    cilEnvelopeOpen,
    cilFile,
    cilLockLocked,
    cilSettings,
    cilTask,
    cilUser, cilList, cilMenu, cilExternalLink
} from '@coreui/icons'
import axios from 'axios'
import "../../css/styles.css";
import moment from 'moment'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const NotifyRender = () => {

    const [currentBranch, setCurrentBranch] = useState('');
    const [allnotifications, setallnotifications] = useState([]);
    const [alljobs, setalljobs] = useState([]);
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    const [allorg, setallorg] = useState([]);
    async function getOrganizations() {
        try {
            const response = await axios.get(`http://localhost:5000/getorg`, {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            })
            setallorg(response.data);

            const jobdata = await axios.get('http://localhost:5000/fetchJobnotifications', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    branchcode: localStorage.getItem('branchcodeofemp')
                }
            })
            setalljobs(jobdata.data);

        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //   const ws = new WebSocket('ws://localhost:8081');
    //   ws.onopen = () => {
    //     ws.send(JSON.stringify({ type: 'register', username: localStorage.getItem('username') }));
    //   };
    //   ws.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     if (data.type === 'new_org') {
    //       toast.success(data.message);
    //       fetchNotifications();
    //     }
    //   };
    //   return () => {
    //     ws.close();
    //   };
    // }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {

            const branchName = localStorage.getItem('branchnameofemp');
            setCurrentBranch(branchName);
            fetchNotifications();
        }, 1000); // Interval set to 1 second

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    const fetchNotifications = async (req, res) => {
        try {
            const response = await axios.get('http://localhost:5000/fetchnotifications', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setallnotifications(response.data.notifications);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNotifications()
        getOrganizations();
    }, [currentBranch])





    async function userhasread(item) {
        try {
            const currentDate = new Date().getTime();
            const formatattedDate = moment(currentDate).format('YYYY-MM-DD HH'); // No need to format
            const response = await axios.put(`http://localhost:5000/userhasread`, {
                theitemread: item,
                currentDate: formatattedDate,
                employeename: localStorage.getItem('username')
            });
            fetchNotifications();
        } catch (error) {
            console.log(error);
        }
    }


    const navigate = useNavigate();

    // Function to navigate to the '/approverlog' route and send the item object as state
    const navigateToApproverLog = (item) => {
        navigate('/approverlog', { state: item })
    };


    async function readjob(item) {
        try {
            const { jobnumber, branchcode, branchname } = item;

            const updatereadforuser = await axios.put(`http://localhost:5000/userreadforjob`, {
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode'),
                username: localStorage.getItem('username'),
                jobnumber: jobnumber,
                branchcode: branchcode,
                branchname: branchname
            })
        } catch (error) {
            console.log(error);
        }
    }






    // useEffect(() => {
    //     let countcount = allnotifications && allnotifications.filter(item =>
    //         item.reading.some(entry =>
    //             entry.employeename === localStorage.getItem('username') &&
    //             !allorg?.find(row => row.clientname === item.clientname) &&
    //             !item.reading.some(subEntry => subEntry.status === 'Reject')
    //         ) &&
    //         !item.reading.some(subEntry => subEntry.approved === -1)
    //     ).length
    //     localStorage.setItem('countofremainingrows', countcount)
    // }, [allnotifications])


    // function reverse(dateString) {
    //     const date = new Date(dateString);
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-indexed
    //     const year = date.getFullYear();
    //     return `${day}-${month}-${year}`;
    // }
    // const reverse = (dateString) => {
    //     return moment(dateString).format('YYYY-MM-DD HH');
    // };

    // const mergeAndSortNotifications = () => {
    //     const mergedArray = [
    //         ...alljobs.map(job => ({ ...job, type: 'job' })),
    //         ...allnotifications.map(notification => ({ ...notification, type: 'notification' }))
    //     ];

    //     return mergedArray.sort((a, b) => moment(a.createdat).diff(moment(b.createdat)));
    // };

    // const sortedItems = mergeAndSortNotifications();



    const mergeAndSortNotifications = () => {
        const mergedArray = [
            ...alljobs.map(job => ({ ...job, type: 'job' })),
            ...allnotifications.map(notification => ({ ...notification, type: 'notification' }))
        ];

        return mergedArray.sort((a, b) => moment(b.createdat).diff(moment(a.createdat))); // Sorting in descending order
    };

    const sortedItems = mergeAndSortNotifications();

    async function navigateToJobApproval(item){
        try {
            navigate('/approverlog', { state: item })
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <CForm>

                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Date</CTableHeaderCell>
                            <CTableHeaderCell>Task Name</CTableHeaderCell>
                            <CTableHeaderCell>Created By</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                            <CTableHeaderCell>Status</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>


                        {sortedItems.map((item, index) => {
                            if (item.type === 'job') {
                                const isApprover = item.approvername.some(approver => approver.employeename === localStorage.getItem('username'));
                                const readingEntry = item.reading.find(entry => entry.employeename === localStorage.getItem('username'));
                                if (readingEntry && isApprover) {
                                    const isRead = readingEntry.read === 1;
                                    const isApproved = readingEntry.approved === 1;
                                    const hasBeenRejected = item.reading.some(row => row.approved === -1);
                                    const isRejected = readingEntry.approved === -1;
                                    const hasBeenApproved = allorg?.find(row => row.clientname === item.clientname);

                                    return (
                                        <CTableRow key={index}>
                                            <CTableDataCell className="notif" onClick={(isRead && isApproved || hasBeenApproved) || (isRead && isRejected || hasBeenRejected) ? null : () => navigateToJobApproval(item)}>{item.createdat}</CTableDataCell>
                                            <CTableDataCell className="notif" onClick={(isRead && isApproved || hasBeenApproved) || (isRead && isRejected || hasBeenRejected) ? null : () => navigateToJobApproval(item)}>{`Job: ${item.jobnumber}`}</CTableDataCell>
                                            <CTableDataCell className="notif" onClick={(isRead && isApproved || hasBeenApproved) || (isRead && isRejected || hasBeenRejected) ? null : () => navigateToJobApproval(item)}>{item.username}</CTableDataCell>
                                            <CTableDataCell>
                                                {isRead ? (
                                                    <CTableHeaderCell style={{ fontSize: 15 }} className="readtext">Read</CTableHeaderCell>
                                                ) : (
                                                    <CButton className='button-mark-as-read' onClick={() => readjob(item)}>
                                                        <CIcon className='icon-envelope-open' icon={cilEnvelopeOpen} size="lg" />
                                                    </CButton>
                                                )}
                                            </CTableDataCell>
                                            <CTableDataCell>

                                                {hasBeenRejected ? (
                                                    <p>Rejected</p>
                                                ) : isApproved ? (
                                                    <p>Approved</p>
                                                ) : (
                                                    <p>Pending</p>
                                                )}

                                            </CTableDataCell>
                                        </CTableRow>
                                    );
                                }

                            }

                            const isApprover = item.approvername.some(approver => approver.employeename === localStorage.getItem('username'));
                            const readingEntry = item.reading.find(entry => entry.employeename === localStorage.getItem('username'));

                            if (isApprover && readingEntry) {
                                const hasBeenApproved = allorg?.find(row => row.clientname === item.clientname);
                                const isRead = readingEntry.read === 1;
                                const isApproved = readingEntry.approved === 1;
                                const isRejected = readingEntry.approved === -1;
                                const hasBeenRejected = item.reading.some(row => row.approved === -1);

                                return (
                                    <CTableRow key={index} className={isRead ? 'read-row' : 'unread-row'}>
                                        <CTableDataCell className="notif" onClick={(isRead && isApproved || hasBeenApproved) || (isRead && isRejected || hasBeenRejected) ? null : () => navigateToApproverLog(item)}>{item.createdat}</CTableDataCell>
                                        <CTableDataCell className="notif" onClick={(isRead && isApproved || hasBeenApproved) || (isRead && isRejected || hasBeenRejected) ? null : () => navigateToApproverLog(item)}>{`Organization: ${item.clientname} is waiting for your approval`}</CTableDataCell>
                                        <CTableDataCell className="notif" onClick={(isRead && isApproved || hasBeenApproved) || (isRead && isRejected || hasBeenRejected) ? null : () => navigateToApproverLog(item)}>{item.username}</CTableDataCell>
                                        <CTableDataCell>
                                            {isRead ? (
                                                <CTableHeaderCell style={{ fontSize: 15 }} className="readtext">Read</CTableHeaderCell>
                                            ) : (
                                                <CButton className='button-mark-as-read' onClick={() => userhasread(item)}>
                                                    <CIcon className='icon-envelope-open' icon={cilEnvelopeOpen} size="lg" />
                                                </CButton>
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {isRead && isApproved || hasBeenApproved ? (
                                                <p>Approved</p>
                                            ) : (
                                                isRejected || hasBeenRejected ? (
                                                    <p>Rejected</p>
                                                ) : (
                                                    <p>Pending</p>
                                                )
                                            )}
                                        </CTableDataCell>
                                    </CTableRow>
                                );
                            }
                            return null;
                        })}




                        {/* 
                        {allnotifications && allnotifications.map((item, index) => {
                            // Check if localStorage username matches any name in approvername array
                            const isApprover = item.approvername.some(approver => approver.employeename === localStorage.getItem('username'));
                            // Check if the localStorage username exists in the reading array
                            const readingEntry = item.reading.find(entry => entry.employeename === localStorage.getItem('username'));

                            if (isApprover && readingEntry) {

                                // Render the notification only if conditions are met
                                const hasbeenapproved = allorg?.find(row => row.clientname === item.clientname);
                                const isread = readingEntry.read === 1;
                                const isapproved = readingEntry.approved === 1;
                                const isrejected = readingEntry.approved === -1;
                                const hasbeenrejected = item.reading.some(row => row.approved === -1);

                                return (

                                    <CTableRow key={index} className={readingEntry.read === 0 ? 'unread-row' : 'read-row'}>
                                        <CTableDataCell className="notif" onClick={(isread && isapproved || hasbeenapproved) || (isread && isrejected || hasbeenrejected) ? null : () => navigateToApproverLog(item)}>{reverse(item.createdat)}</CTableDataCell>
                                        <CTableDataCell className="notif" onClick={(isread && isapproved || hasbeenapproved) || (isread && isrejected || hasbeenrejected) ? null : () => navigateToApproverLog(item)}>{`Organization: ${item.clientname} is waiting for your approval`}</CTableDataCell>
                                        <CTableDataCell className="notif" onClick={(isread && isapproved || hasbeenapproved) || (isread && isrejected || hasbeenrejected) ? null : () => navigateToApproverLog(item)}>{item.username}</CTableDataCell>
                                        <CTableDataCell>

                                            {
                                                readingEntry.read === 1 ?
                                                    <CTableHeaderCell style={{ fontSize: 15 }} className="readtext">Read</CTableHeaderCell>
                                                    :
                                                    <CButton className='button-mark-as-read' onClick={() => userhasread(item)}>
                                                        <CIcon className='icon-envelope-open' icon={cilEnvelopeOpen} size="lg" />
                                                    </CButton>
                                            }

                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {isread && isapproved || hasbeenapproved ? (
                                                <p>Approved</p>
                                            ) : (
                                                isrejected || hasbeenrejected ? (
                                                    // If the item is approved or has been previously approved
                                                    <p>Rejected</p>
                                                ) : (
                                                    // If the item is not approved
                                                    <p>Pending</p>
                                                )

                                            )}

                                        </CTableDataCell>
                                    </CTableRow>

                                );
                            }
                            return null; // Otherwise, return null to skip rendering
                        })} */}

                    </CTableBody>

                </CTable>


                {/* <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Date</CTableHeaderCell>
                            <CTableHeaderCell>Task Name</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {alljobs &&
                            alljobs
                                .filter(job =>
                                    job.approvername.some(approver => approver.employeename === localStorage.getItem('username'))
                                )
                                .map((job, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell className="notif">{reverse(job.createdat)}</CTableDataCell>
                                        <CTableDataCell className="notif">{job.jobnumber}</CTableDataCell>
                                    </CTableRow>
                                ))
                        }
                    </CTableBody>
                </CTable> */}

            </CForm>
        </div>
    )
}

export default NotifyRender;