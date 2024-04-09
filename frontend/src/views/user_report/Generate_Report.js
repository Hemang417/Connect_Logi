import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCol,
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBuilding, cilChartPie, cilArrowRight } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useLocation, Link } from 'react-router-dom'
import { User_Import } from './Innerpage/User_Import';


const Generate_Report = () => {

  const [isshown, setIsShown] = useState("urImport");

  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <div className='grid-container'>
              <div>
                <label for="Branch" className='text-field-3'>Full Name</label>
                <h4>{localStorage.getItem('fullname')}</h4>
              </div>
              <div>
                <label for="User Name" className='text-field-3'>User Name</label>
                <h4>{localStorage.getItem('empnameforaccess')}</h4>
              </div>
              <div>
                <label for="Branch" className='text-field-3'>Branch</label>
                <h4>{localStorage.getItem('branchname')}</h4>
              </div>
            </div>
            
            
          </CCardBody>
        </CCard>
      </CCol>
      <CNav variant="tabs" className='nav-link-text'>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("urImport") }}>Import</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("export") }}>Export</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("transport") }}>Transport</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("ff") }}>Freight Forwarding</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("sales") }}>Sales</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("accounts") }}>Accounts</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink onClick={() => { setIsShown("crm") }}>CRM</CNavLink>
              </CNavItem>
            </CNav>

            {isshown === "urImport" && <User_Import />}

    </div>

  )
}

export default Generate_Report;
