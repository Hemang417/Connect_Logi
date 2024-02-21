import React, {useState} from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CButton, 
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImpAccess from './ImpAccess';
import ExpAccess from './ExpAccess';
import TranspAccess from './TranspAccess';

const UserListAccess = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isshown, setIsShown] = useState("import");
  const [visible, setVisible] = useState(false);


  return (
    <div>
        <CNav variant="tabs">
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("import") }}>Import</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("export") }}>Export</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink onClick={() => { setIsShown("transport") }}>Transport</CNavLink>
        </CNavItem>

      </CNav>
      {isshown === "import" && <ImpAccess />}
      {isshown === "export" && <ExpAccess />}
      {isshown === "transport" && <TranspAccess />}
      {/* {isshown === "contactdetails" && <Contactdetails />} */}
    {/* <label>
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      {'\t'}ETA Follow Up
      </label>
    <label>
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      {'\t'}Scrutiny Document
      </label>
    <label>
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      {'\t'}Checklist Approval
      </label>
    <label>
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      {'\t'}E-Sanchit
      </label>
    <label>
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      {'\t'}Filling BOE
      </label> */}
    </div>
  )
}

export default UserListAccess;
