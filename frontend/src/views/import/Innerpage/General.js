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
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CFormInput,
    CFormLabel,
    CForm,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CNavItem,
    CNav,
    CNavLink
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import '../../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import createjob from './CreateJob';

const General = () => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <CCol xs={12}>
                <CCard className="mb-2 container-div">
                    <CCardBody className='main-div'>
                        <div className='left-div'>
                            <input type="text" placeholder="Importer Name" className='impgen-text-field-1' />
                            <CDropdown className="impgen-text-field-1">
                                <CDropdownToggle color="secondary">Branch Names</CDropdownToggle>
                                <CDropdownMenu className="impgen-text-dropdown">
                                    <CDropdownItem href="#">Mumbai</CDropdownItem>
                                    <CDropdownItem href="#">Kolkata</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                            {/* <input type="text" placeholder="Address"/> */}
                            <textarea placeholder='Address' name="paragraph_text" cols="50" rows="5" className='impgen-text-field-1'></textarea>
                            <input type="text" placeholder="GST" className='impgen-text-field-1' />
                            <input type="text" placeholder="IEC Code" className='impgen-text-field-1' />
                            <input type="text" placeholder="Port of Shipment" className='impgen-text-field-1' />
                            <input type="text" placeholder="Final Destination" className='impgen-text-field-1' />
                        </div>
                        <div className='right-div'>
                            <CChart
                                type="doughnut"
                                data={{
                                    labels: ['O2D', 'Do & Delivery', 'D2C', 'Collection'],
                                    datasets: [
                                        {
                                            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                            data: [40, 20, 80, 10],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: 'blue',
                                            }
                                        }
                                    },
                                }}
                            />
                        </div>


                    </CCardBody>
                </CCard>
            </CCol>
            {/* <div className='all-buttons'>
                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Save
                    </CButton>
                </div>

                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Save & Close
                    </CButton>
                </div>

                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Save & New
                    </CButton>
                </div>

                <div className='search-button'>
                    <CButton color="primary" type="submit">
                        Close
                    </CButton>
                </div>
            </div> */}


            {/* <CNav variant="tabs">
<CNavItem>
  <CNavLink href="#" active>General</CNavLink>
</CNavItem>
<CNavItem>
  <CNavLink href="#">Registration</CNavLink>
</CNavItem> */}
            {/* <CNavItem>
  <CNavLink href="#">Link</CNavLink>
</CNavItem> */}
            {/* <CNavItem>
  <CNavLink href="#" disabled>
    Disabled
  </CNavLink>
</CNavItem> */}
            {/* </CNav> */}
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Add new Branch</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <input type="text" placeholder="Name" className='text-field-1' />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary">Add New</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default General;
