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
  CButton,
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
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [allorg, setallorg] = useState([]);
  async function getOrganizations() {
    try {
      const response = await axios.get(`http://localhost:5000/getorg`, {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode')
        }
      })
      setallorg(response.data)
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
  //       addNotification(data.message);
  //     }
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // }, []);


  // const addNotification = (message) => {
  //   setVisibleNotifications((prev) => [...prev, message]);
  //   setTimeout(() => {
  //     setVisibleNotifications((prev) => prev.filter((notif) => notif !== message));
  //   }, 300000); // 120000ms = 2 minutes
  // };





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
    const ws = new WebSocket('ws://localhost:8081')
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'register', username: localStorage.getItem('username') }))
    }
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'new_org') {
        toast.success(data.message)
        fetchNotifications()
        addNotification(data.message)
      }
    }
    return () => {
      ws.close()
    }
  }, [])

  const addNotification = (message) => {
    const expirationTime = Date.now() + 300000 // 5 minutes
    const newNotification = { message, expirationTime }
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || []
    const updatedNotifications = [...existingNotifications, newNotification]
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications))
    setVisibleNotifications(updatedNotifications)
    setTimeout(() => {
      removeExpiredNotifications()
    }, 300000) // Set timeout to remove expired notifications
  }

  const removeExpiredNotifications = () => {
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || []
    const currentTime = Date.now()

    const filteredNotifications = existingNotifications.filter(
      (notification) => notification.expirationTime > currentTime
    )
    localStorage.setItem('notifications', JSON.stringify(filteredNotifications))
    setVisibleNotifications(filteredNotifications)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      removeExpiredNotifications();
    }, 1000); // Check for expired notifications every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);






  const [approvers, setapprovers] = useState([])

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



  useEffect(() => {
    let countcount = allnotifications && allnotifications.filter(item =>
      item.reading.some(entry =>
        entry.employeename === localStorage.getItem('username') &&
        !allorg?.find(row => row.clientname === item.clientname) &&
        !item.reading.some(subEntry => subEntry.status === 'Reject')
      ) &&
      !item.reading.some(subEntry => subEntry.approved === -1)
    ).length
    localStorage.setItem('countofremainingrows', countcount)
  }, [allnotifications])



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
            <p>`Welcome` + {localStorage.getItem('username')}</p>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink style={{ fontWeight: 700, color: 'blue' }}>Current Branch: {currentBranch}</CNavLink>
          </CNavItem>

          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-2" caret={false}>
              {/* <CBadge color="danger" position="top-end" shape="rounded-pill">

                {
                  allnotifications && allnotifications.filter(item =>
                    item.reading.some(entry =>
                      entry.employeename === localStorage.getItem('username') &&
                      entry.read === 0 &&
                      !allorg?.find(row => row.clientname === item.clientname) &&
                      !item.reading.some(subEntry => subEntry.status === 'Reject')
                    ) &&
                    !item.reading.some(subEntry => subEntry.approved === -1)
                  ).length
                }

              </CBadge> */}

              <CIcon icon={cilBell} size="lg" onClick={() => fetchNotifications()} />

            </CDropdownToggle>

            <CDropdownMenu className="pt-4 dropdown-menu-notifications" placement="bottom-end">
              {/* <CDropdownHeader className="bg-light fw-bold py-2 notif-header1">Organizations Approval List</CDropdownHeader> */}

              <CForm>

                <CTable hover responsive striped className='notiftable'>

                  <CTableBody className='notifrow'>
                    <CDropdownHeader className="bg-light fw-bold py-2 notif-header1">Alerts</CDropdownHeader>
                    <CRow>
                      <div className="notification-area">
                        {visibleNotifications.map((notification, index) => (
                          <CDropdownItem key={index} style={{ marginLeft: 20 }}>{notification.message}</CDropdownItem>
                        ))}

                      </div>

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
            <CBadge color="danger" position="top" shape="rounded-pill" className='notificationcount'>

              {
                allnotifications && allnotifications.filter(item =>
                  item.reading.some(entry =>
                    entry.employeename === localStorage.getItem('username') &&
                    entry.read === 0
                  )).length
              }



            </CBadge>
            <CNavLink href="#/notifyrender">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      {/* <div className="notification-area">
        {visibleNotifications.map((notification, index) => (
          <div key={index} className="notification">
            {notification}
          </div>
        ))}
      </div> */}
    </CHeader>
  )
}

export default AppHeader;
