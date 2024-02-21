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
  CButton
} from '@coreui/react'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

const ExpAccess = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [visible, setVisible] = useState(false);


  return (
    <div>
    <div className='first-row'>
    <label className='imp-access-label'>
    {'\t'}ETA Follow Up{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      
      </label>
    <label className='imp-access-label'>
    {'\t'}Scrutiny Document{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Checklist Approval{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}E-Sanchit{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Filling BOE{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Assessment{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Duty Call{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Examination/OOC{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
      </div>

      <div className='second-row'>
    <label className='imp-access-label'>
    {'\t'}ETA Follow Up{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      
      </label>
    <label className='imp-access-label'>
    {'\t'}Scrutiny Document{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Checklist Approval{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}E-Sanchit{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Filling BOE{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Assessment{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Duty Call{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Examination/OOC{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
      </div>
      <div className='second-row'>
    <label className='imp-access-label'>
    {'\t'}ETA Follow Up{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      
      </label>
    <label className='imp-access-label'>
    {'\t'}Scrutiny Document{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Checklist Approval{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}E-Sanchit{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Filling BOE{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Assessment{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Duty Call{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
    <label className='imp-access-label'>
    {'\t'}Examination/OOC{'\t'}
      <input type="checkbox"
        defaultChecked={visible}
        onChange={() => setVisible(!visible)}
      />
      </label>
      </div>
    </div>
  )
}

export default ExpAccess;
