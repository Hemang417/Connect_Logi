import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CPopover
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBuilding } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'

const branches = () => {

    const navigate = useNavigate();

    const [branchCreate, setbranchCreate] = useState({
        orgcode: localStorage.getItem('orgcode'),
        ownbranchname: '',
        address: '',
        gst: '',
        iec: '',
        headname: '',
        headnum: ''
    })


    function handleChange(e) {
        setbranchCreate({
            ...branchCreate,
            [e.target.name]: e.target.value
        })
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const nameoforg = localStorage.getItem('orgname')
            const reponse = await axios.post('http://localhost:5000/createownbranch', {
                orgcode: branchCreate.orgcode,
                ownbranchname: branchCreate.ownbranchname,
                address: branchCreate.address,
                gst: branchCreate.gst,
                iec: branchCreate.iec,
                headname: branchCreate.headname,
                headnum: branchCreate.headnum,
                orgname: nameoforg
            })
            navigate('/branchlist')
        } catch (error) {
            toast.error('Error creating new user')
            console.log("Error: " + error);
        }
    }


    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>New Branch</h1>
                                    <p className="text-medium-emphasis">Create New Branches</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>OC</CInputGroupText>
                                        <CFormInput placeholder="Organization Code" autoComplete="orgcode" name='orgcode' value={localStorage.getItem('orgcode')}/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Branch Name"
                                            name='ownbranchname'
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Add</CInputGroupText>
                                        <CFormInput placeholder="Address" onChange={handleChange} name='address' />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>GST</CInputGroupText>
                                        <CFormInput placeholder="GST No." onChange={handleChange} name='gst' />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>IEC</CInputGroupText>
                                        <CFormInput placeholder="IEC No." onChange={handleChange} name='iec' />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>BPN</CInputGroupText>
                                        <CFormInput placeholder="Branch Head Name" onChange={handleChange} name='headname' />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>BPM</CInputGroupText>
                                        <CFormInput placeholder="Branch Head Mobile No." onChange={handleChange} name='headnum' />
                                    </CInputGroup>
                                    <div className="d-grid">
                                    <CPopover content="Create new branch" trigger={['hover', 'focus']}>
                                        <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                                    </CPopover>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default branches;
