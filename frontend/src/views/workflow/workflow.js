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
  const [visible, setvisible] = useState(false);
  const [lob, setlob] = useState({
    lobname: ''
  })

  const handleChange = (e) => {
    setlob({ ...lob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/storelob', {
        lobname: lob.lobname,
        orgname: localStorage.getItem('orgname'),
        orgcode: localStorage.getItem('orgcode')
      });
      toast.success('Line of business added successfully')
      setvisible(false);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <CRow>
      <CCardBody className='button-div'>
        <div className='createjob-button'>

          <CButton color="primary" type="submit" onClick={() => setvisible(true)}>
            +
          </CButton>

        </div>
      </CCardBody>
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

      <CModal
        visible={visible}
        onClose={() => { setvisible(false) }}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setvisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Add Line of Business</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <input type='text' name='lobname' placeholder='Enter line of business' style={{ width: '100%' }} onChange={handleChange} />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setvisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>Save changes</CButton>
        </CModalFooter>
      </CModal>


    </CRow>

  )
}

export default workflow;
