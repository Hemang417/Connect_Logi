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
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Import = () => {
  return (
    <CTable hover responsive striped className=''>
  <CTableHead>
    <CTableRow color='dark'>
      <CTableHeaderCell scope="col"></CTableHeaderCell>
      <CTableHeaderCell scope="col">Date</CTableHeaderCell>
      <CTableHeaderCell scope="col">Job No.</CTableHeaderCell>
      <CTableHeaderCell scope="col">Importer Name</CTableHeaderCell>
      <CTableHeaderCell scope="col">HBL/HAWB No.</CTableHeaderCell>
      <CTableHeaderCell scope="col">MBL/MAWB No.</CTableHeaderCell>
      <CTableHeaderCell scope="col">ETA</CTableHeaderCell>
      <CTableHeaderCell scope="col">IGM</CTableHeaderCell>
      <CTableHeaderCell scope="col">Checklist</CTableHeaderCell>
      <CTableHeaderCell scope="col">E-Sanchit</CTableHeaderCell>
      <CTableHeaderCell scope="col">BOE Filling</CTableHeaderCell>
      <CTableHeaderCell scope="col">DO</CTableHeaderCell>
      <CTableHeaderCell scope="col">Delivery</CTableHeaderCell>
      <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>

    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
    <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {/* <Link to={"/dashboard/Modal"}>
                        Edit
                      </Link> */}
                    <a href="/dashboard/import/Modal" target="_blank" rel="noopener noreferrer">
                        Edit
                    </a>  
                  </th>
      <CTableHeaderCell scope="row">06.09.2023 13:44:55</CTableHeaderCell>
      <CTableDataCell>S/I/0001/23-24</CTableDataCell>
      <CTableDataCell>PERMANENT MAGNET LTD</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>19-06-2023</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>Assesment</CTableDataCell>
    </CTableRow>
    <CTableRow>
    <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <a href="/dashboard/import/Modal" target="_blank" rel="noopener noreferrer">Edit</a>  
    </th>
    <CTableHeaderCell scope="row">06.09.2023 13:44:55</CTableHeaderCell>
      <CTableDataCell>A/I/0001/23-24</CTableDataCell>
      <CTableDataCell>LASONS INDIA PVT LTD</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>RTTT5787088</CTableDataCell>
      <CTableDataCell>19-06-2023</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>19-06-2023 16:37:00</CTableDataCell>
      <CTableDataCell>Done</CTableDataCell>
    </CTableRow>
    
  </CTableBody>
</CTable>

  )
}

export default Import
