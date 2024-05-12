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

const AppHeader = () => {

  const [currentBranch, setCurrentBranch] = useState('');
  const [allnotifications, setallnotifications] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Retrieve the current branch name from localStorage
      const branchName = localStorage.getItem('branchnameofemp');
      setCurrentBranch(branchName);

    }, 1000); // Interval set to 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  useEffect(() => {
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
    fetchNotifications();
  }, [currentBranch])


  async function userhasread(item) {
    try {
      const currentDate = new Date().getTime();
      const formatattedDate = moment(currentDate).format('YYYY-MM-DD HH'); // No need to format
      const response = await axios.put(`http://localhost:5000/userhasread`, {
        theitemread: item,
        currentDate: formatattedDate // Pass Unix timestamp directly
      });
    } catch (error) {
      console.log(error);
    }
  }



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
              <CIcon icon={cilBell} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-4 dropdown-menu-notifications" placement="bottom-end">

              <CForm>

                <CTable hover responsive striped>

                  <CTableBody className='notifrow'>

                    <CRow>
                      {allnotifications &&
                        allnotifications.map((item, index) => (
                          item.reading !== 1 && ( // Check if reading is not 1
                            <CDropdownItem key={index} className="notif">
                              {`${item.clientname} is waiting for your approval`}
                              <CButton onClick={() => userhasread(item)}>read</CButton>
                            </CDropdownItem>
                          )
                        ))}
                    </CRow>

                  </CTableBody>

                </CTable>
              </CForm>


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
