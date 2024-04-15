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
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Lob from './Innerpage/Lob';
import Wf from './Innerpage/Wf';
import toast from 'react-hot-toast';


const workflow = () => {

  const [isshown, setIsShown] = useState("Lob");
 


  return (
    <CRow>
      
      <div>
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink onClick={() => { setIsShown("Lob") }}>Line of Business</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={() => { setIsShown("Wf") }}>Workflow</CNavLink>
          </CNavItem>
        </CNav>
        {isshown === "Lob" && <Lob />}
        {isshown === "Wf" && <Wf />}

      </div>


    </CRow>

  )
}

export default workflow;
