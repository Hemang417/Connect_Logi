import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, BellHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import "../../src/css/styles.css"

const AppHeader = () => {

  const [currentBranch, setCurrentBranch] = useState('');


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
          {/* BELL NOTIFICATION */}
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
              <BellHeaderDropdown />
            </CNavLink>
          </CNavItem> */}
          <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-2" caret={false}>
              <CIcon icon={cilBell} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-4 dropdown-menu-notifications" placement="bottom-end">

              {/* <CDropdownHeader className="bg-light fw-semibold py-2">Branches</CDropdownHeader> */}

              {/* {allBranches && allBranches.map((item, index) => {
                // Check if the current item's ownbranchname matches the branchname stored in localStorage
                const isSelectedBranch = localStorage.getItem('branchnameofemp') === item.ownbranchname;

                // Define a CSS class based on the condition
                const className = isSelectedBranch ? 'selected-branch' : 'allbranches';

                return (
                  <CDropdownItem key={index} className={className} onClick={() => handleBranchSelection(item)}>
                    {item.ownbranchname}
                  </CDropdownItem>
                );
              })} */}


              {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
              <CDropdownItem href="#">
                <CIcon icon={cilBell} className="me-2" />
                Updates
                <CBadge color="info" className="ms-2">
                  42
                </CBadge>
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilEnvelopeOpen} className="me-2" />
                Messages
                <CBadge color="success" className="ms-2">
                  42
                </CBadge>
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilTask} className="me-2" />
                Tasks
                <CBadge color="danger" className="ms-2">
                  42
                </CBadge>
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilCommentSquare} className="me-2" />
                Comments
                <CBadge color="warning" className="ms-2">
                  42
                </CBadge>
              </CDropdownItem>
              <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
              <CDropdownItem href="#">
                <CIcon icon={cilUser} className="me-2" />
                Profile
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilSettings} className="me-2" />
                Settings
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilCreditCard} className="me-2" />
                Payments
                <CBadge color="secondary" className="ms-2">
                  42
                </CBadge>
              </CDropdownItem>
              <CDropdownItem href="#">
                <CIcon icon={cilFile} className="me-2" />
                Projects
                <CBadge color="primary" className="ms-2">
                  42
                </CBadge>
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem href="#">
                <CIcon icon={cilLockLocked} className="me-2" />
                Lock Account
              </CDropdownItem> */}
            </CDropdownMenu>
          </CDropdown>
          {/* BELL NOTIFICATION END */}

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
