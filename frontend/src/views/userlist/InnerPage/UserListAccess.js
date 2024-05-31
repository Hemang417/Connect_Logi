import React, { useState } from 'react'
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
import BranchAccess from './BranchAccess';
import KYCAccess from './KYCAccess';

const UserListAccess = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isshown, setIsShown] = useState("branches");
  const [visible, setVisible] = useState(false);


  return (
    <div>


      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            <div className='grid-container'>
              <div>
                <label for="Branch" className='text-field-3'>Full Name</label>
                <h4>{localStorage.getItem('fullnameforaccess')}</h4>
              </div>
              <div>
                <label for="User Name" className='text-field-3'>User Name</label>
                <h4>{localStorage.getItem('empnameforaccess')}</h4>
              </div>
              
            </div>
          </CCardBody>
        </CCard>
      </CCol>


      <CNav variant="tabs" className='userlist-cnav-cusros'>
        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'branches' ? 'active' : ''}`} onClick={() => { setIsShown("branches") }}>Branches</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink className={`nav-link ${isshown === 'kyc' ? 'active' : ''}`} onClick={() => { setIsShown("kyc") }}>KYC</CNavLink>
        </CNavItem>

      </CNav>
      {isshown === "import" && <ImpAccess />}
      {isshown === "export" && <ExpAccess />}
      {isshown === "transport" && <TranspAccess />}
      {isshown === "branches" && <BranchAccess />}
      {isshown === "kyc" && <KYCAccess />}
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
