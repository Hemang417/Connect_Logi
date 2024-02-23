import React, { useState, useEffect } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ImpAccess = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();


  const [dataAccess, setDataAccess] = useState({
    ETAFollowUp: '',
    ScrutinyDocument: '',
    ChecklistApproval: '',
    ESanchit: '',
    FillingBOE: '',
    Assesment: '',
    DutyCall: '',
    ExaminationOOC: '',
    EBLStatusAgentName: '',
    PortCFSNomination: '',
    Scrutiny: '',
    OriginalDocReceived: '',
    InvoiceReceivedfromShippingLine: '',
    PaymenttoShippingLine: '',
    DeliveryOrder: '',
    Delivery: '',
    ShippingLine: '',
    CFS: '',
    StampDuty: '',
    CustomDuty: '',
    Insurance: '',
    LREmptySlipBill: '',
    Billing: '',
    Dispatch: '',
    Miscellaneous: '',
  })




  const fetchUserAccess = async () => {
    try {
      const username = localStorage.getItem('empnameforaccess');
      const response = await axios.get(`http://localhost:5000/getUserAccess`, {
        params: {
          username: username
        }
      });

      const newState = {};
      response.data.forEach(item => {
        newState[item.rowname] = item.value;
      });

      setDataAccess(newState);
      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserAccess();
  }, []);


  // console.log(dataAccess);



  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setDataAccess(prevState => ({
  //     ...prevState,
  //     [name]: checked ? name : '' // Store 'checked' if true, empty string otherwise
  //   }));
  // };



  const handleCheckboxChange = async (event) => {
    const { name, checked } = event.target;
    setDataAccess(prevState => ({
      ...prevState,
      [name]: checked ? name : '' // Update only the specific property corresponding to the checkbox
    }));

    try {
      const username = localStorage.getItem('empnameforaccess');
      if (checked) {
        // Checkbox is checked, send a backend request to store data
        await axios.post('http://localhost:5000/impstore', { [name]: name, username }); // Send only the specific property
      } else {
        // Checkbox is unchecked, send a backend request to remove data
        await axios.delete('http://localhost:5000/delimp', {
          data: { [name]: name, username } // Send only the specific property with an empty value
        });
      }
    } catch (error) {
      console.log(error);
    }
  };





  async function handleApply() {
    // try {
    //   const username = localStorage.getItem('empnameforaccess')
    //   const response = await axios.post('http://localhost:5000/impstore', {dataAccess, username});
    // } catch (error) {
    //   console.log(error);
    // }
    navigate('/userlist');
  }





  // onChange={() => setVisible(!visible)}

  return (
    <div>
      <CTable hover responsive striped className=''>
        <CTableHead>
          <CTableRow color='dark' >
            {/* <CTableHeaderCell scope="col"></CTableHeaderCell> */}
            <CTableHeaderCell scope="col">Document</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>

          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                ETA Follow Up
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name="ETAFollowUp"
                checked={dataAccess.ETAFollowUp === 'ETAFollowUp'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>

          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Scrutiny Document
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='ScrutinyDocument'
                checked={dataAccess.ScrutinyDocument === 'ScrutinyDocument'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Checklist Approval
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='ChecklistApproval'
                checked={dataAccess.ChecklistApproval === 'ChecklistApproval'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                E-Sanchit
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='ESanchit'
                checked={dataAccess.ESanchit === 'ESanchit'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Filling BOE
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='FillingBOE'
                checked={dataAccess.FillingBOE === 'FillingBOE'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Assesment
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Assesment'
                checked={dataAccess.Assesment === 'Assesment'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Duty Call
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='DutyCall'
                checked={dataAccess.DutyCall === 'DutyCall'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Examination/OOC
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='ExaminationOOC'
                checked={dataAccess.ExaminationOOC === 'ExaminationOOC'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                EBL Status & Agent Name
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='EBLStatusAgentName'
                checked={dataAccess.EBLStatusAgentName === 'EBLStatusAgentName'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Port/CFS Nomination
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='PortCFSNomination'
                checked={dataAccess.PortCFSNomination === 'PortCFSNomination'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Scrutiny
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Scrutiny'
                checked={dataAccess.Scrutiny === 'Scrutiny'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Original Doc. Received
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='OriginalDocReceived'
                checked={dataAccess.OriginalDocReceived === 'OriginalDocReceived'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Invoice Received from Shipping Line
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='InvoiceReceivedfromShippingLine'
                checked={dataAccess.InvoiceReceivedfromShippingLine === 'InvoiceReceivedfromShippingLine'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Payment to Shipping Line
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='PaymenttoShippingLine'
                checked={dataAccess.PaymenttoShippingLine === 'PaymenttoShippingLine'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Delivery Order
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='DeliveryOrder'
                checked={dataAccess.DeliveryOrder === 'DeliveryOrder'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Delivery
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Delivery'
                checked={dataAccess.Delivery === 'Delivery'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Shipping Line
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='ShippingLine'
                checked={dataAccess.ShippingLine === 'ShippingLine'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                CFS
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='CFS'
                checked={dataAccess.CFS === 'CFS'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Stamp Duty
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='StampDuty'
                checked={dataAccess.StampDuty === 'StampDuty'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Custom Duty
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='CustomDuty'
                checked={dataAccess.CustomDuty === 'CustomDuty'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Insurance
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Insurance'
                checked={dataAccess.Insurance === 'Insurance'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                LR/Empty Slip/Bill
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='LREmptySlipBill'
                checked={dataAccess.LREmptySlipBill === 'LREmptySlipBill'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Billing
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Billing'
                checked={dataAccess.Billing === 'Billing'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Dispatch
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Dispatch'
                checked={dataAccess.Dispatch === 'Dispatch'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell scope="row">
              <label>
                Miscellaneous
              </label>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <input type="checkbox" className='imp-access-label'
                defaultChecked={visible}
                name='Miscellaneous'
                checked={dataAccess.Miscellaneous === 'Miscellaneous'}
                onChange={handleCheckboxChange}
              />
            </CTableDataCell>
            <CTableDataCell>

            </CTableDataCell>



          </CTableRow>
          <CButton onClick={handleApply}>Apply Access</CButton>
        </CTableBody>
      </CTable>
    </div>
  )
}

export default ImpAccess;
