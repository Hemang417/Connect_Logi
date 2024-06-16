import React, { useEffect, useState } from 'react'
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
  CForm,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Lob from './Innerpage/Lob';
import Wf from './Innerpage/Wf';
import toast from 'react-hot-toast';
import MileStone from './Innerpage/milestone';
import JobValue from './Innerpage/JobValue';
import Cookies from 'js-cookie'

const workflow = () => {

  const navigate = useNavigate();
  const [isshown, setIsShown] = useState("Lob");

  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('userauthtoken');
      if (token) {
        // Token exists, redirect to dashboard
        navigate('/dashboard');
      }else{
        navigate('/login')
      }
    };
    checkToken();
  }, []);


  return (
    <CRow>
      
      <div>
        <CNav variant="tabs" className='userlist-cnav-cusros'>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Lob' ? 'active' : ''}`} onClick={() => { setIsShown("Lob") }}>Line of Business</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Milestone' ? 'active' : ''}`} onClick={() => { setIsShown("Milestone") }}>Milestone</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'Wf' ? 'active' : ''}`} onClick={() => { setIsShown("Wf") }}>Workflow</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className={`nav-link ${isshown === 'JobValue' ? 'active' : ''}`} onClick={() => { setIsShown("JobValue") }}>JobValue</CNavLink>
          </CNavItem>

        </CNav>
        {isshown === "Lob" && <Lob />}
        {isshown === "Milestone" && <MileStone />}
        {isshown === "Wf" && <Wf />}
        {isshown === "JobValue" && <JobValue/>}

      </div>

    </CRow>

  )
}

export default workflow;
