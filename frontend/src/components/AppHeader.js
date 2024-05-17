import React, { useState, useEffect } from 'react'
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
  CButton
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
  cilUser, cilList, cilMenu
} from '@coreui/icons'
import axios from 'axios'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, BellHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import "../../src/css/styles.css";
import moment from 'moment'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AppHeader = () => {

  const [currentBranch, setCurrentBranch] = useState('');
  const [allnotifications, setallnotifications] = useState([]);



  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'register', username: localStorage.getItem('username') }));
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_org') {
        toast.success(data.message);
        fetchNotifications();
      }
    };
    return () => {
      ws.close();
    };
  }, []);





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
      setallnotifications(response.data.notifications)
      const countisthis = response.data.notifications.filter(item => item.reading.some(entry => entry.employeename === localStorage.getItem('username') && entry.approved === 0)).length;
      localStorage.setItem('countofremainingrows', countisthis)
    } catch (error) {
      console.log(error);
    }
  }





  useEffect(() => {
    fetchNotifications()

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


  // async function handleReadAll() {
  //   try {
  //     const currentDate = new Date().getTime();
  //     const formatattedDate = moment(currentDate).format('YYYY-MM-DD HH'); // No need to format
  //     const response = await axios.put(`http://localhost:5000/makereadall`, {
  //       currentDate: formatattedDate,
  //       notifications: allnotifications
  //     });
  //     if (response.status === 200) {
  //       toast.success(`All Notifications have been read`);
  //       fetchNotifications();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const navigate = useNavigate();

  // Function to navigate to the '/approverlog' route and send the item object as state
  const navigateToApproverLog = (item) => {
    navigate('/approverlog', { state: item })
  };





  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink style={{ fontWeight: 700, color: 'blue' }}>Current Branch: {currentBranch}</CNavLink>
          </CNavItem>

          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-2" caret={false}>
              <CBadge color="danger" position="top-end" shape="rounded-pill">
                {allnotifications.filter(item => item.reading.some(entry => entry.employeename === localStorage.getItem('username') && entry.read === 0)).length}
              </CBadge>

              <CIcon icon={cilBell} size="lg" onClick={() => fetchNotifications()} />

            </CDropdownToggle>

            <CDropdownMenu className="pt-4 dropdown-menu-notifications" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-bold py-2 notif-header1">Organizations Approval List</CDropdownHeader>

              <CForm>

                <CTable hover responsive striped className='notiftable'>

                  <CTableBody className='notifrow'>

                    <CRow>

                      {allnotifications && allnotifications.map((item, index) => {
                        // Check if localStorage username matches any name in approvername array
                        const isApprover = item.approvername.some(approver => approver.employeename === localStorage.getItem('username'));
                        // Check if read and approved attributes are 0 for the localStorage username in reading array
                        const isUnread = item.reading.some(entry => entry.employeename === localStorage.getItem('username') && entry.read === 0);
                        // Render the notification only if conditions are met
                        if (isApprover && isUnread) {
                          return (
                            <CDropdownItem key={index} onClick={() => navigateToApproverLog(item)}>
                              <p className="notif" >{`Organization: ${item.clientname} is waiting for your approval`}</p>
                              <CButton className='button-mark-as-read' onClick={() => userhasread(item)}>
                                <CIcon className='icon-envelope-open' icon={cilEnvelopeOpen} size="lg" />
                              </CButton>
                            </CDropdownItem>
                          );
                        }
                        return null; // Otherwise, return null to skip rendering
                      })
                      }

                    </CRow>

                  </CTableBody>

                </CTable>
              </CForm>
              <CDropdownHeader className="bg-light fw-bold py-2 notif-header1">Reminders</CDropdownHeader>


            </CDropdownMenu>
          </CDropdown>

          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>


    </CHeader>
  )
}

export default AppHeader;
