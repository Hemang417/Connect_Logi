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
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { General, Registration } from './Innerpage';


const Createjob = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  // const [isActive, setActive] = useState("false");
  const [isshown, setIsShown] = useState("general");
  return (
    <div>
    <CCol xs={12}>
      <CCard className="mb-2 container-div">
        <CCardBody>
          <input type="text" placeholder="Name" className='text-field-1' />
          <input type="text" placeholder="Alias" className='text-field-1' />
        </CCardBody>
        </CCard>
      </CCol>

<CNav variant="tabs">
<CNavItem>
  <CNavLink onClick={() => {setIsShown("general")}}>General</CNavLink>
</CNavItem>
<CNavItem>
  <CNavLink onClick={() => {setIsShown("registration")}}>Registration</CNavLink>
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
        {isshown === "general" && <General />}
        {isshown === "registration" && <Registration />}
{/* <General /> */}
{/* <Registration /> */}
</div>
  )
}

export default Createjob;
