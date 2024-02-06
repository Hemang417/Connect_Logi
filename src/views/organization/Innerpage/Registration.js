import React from 'react'
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
  CNavItem,
  CNav,
  CNavLink
} from '@coreui/react'
// import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import createjob from './CreateJob';

const Registration = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div>
    <CCol xs={12}>
      <CCard className="mb-2 container-div">
        <CCardBody>
          <input type="text" placeholder="Name" className='text-field' />
          <input type="text" placeholder="Alias" className='text-field' />
        </CCardBody>
        </CCard>
      </CCol>

<CNav variant="tabs">
<CNavItem>
  <CNavLink href="#" active>General</CNavLink>
</CNavItem>
<CNavItem>
  <CNavLink href="#">Registration</CNavLink>
</CNavItem>
{/* <CNavItem>
  <CNavLink href="#">Link</CNavLink>
</CNavItem> */}
{/* <CNavItem>
  <CNavLink href="#" disabled>
    Disabled
  </CNavLink>
</CNavItem> */}
</CNav>
</div>
  )
}

export default Registration;
