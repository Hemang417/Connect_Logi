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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBuilding } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewUser = () => {

    const navigate = useNavigate();

    const [regForm, setregForm] = useState({
        username: ' ',
        password: ' ',
        orgcode: ' ',
        // orgname: ' ',
        repeatPassword: ' ',
        branchname: ' '
    });


    function handleChange(e) {
        setregForm({
            ...regForm,
            [e.target.name]: e.target.value
        })
    }



    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const nameoforg = localStorage.getItem('orgname')
            console.log(nameoforg);
            const response = await axios.post('http://localhost:5000/emp/store', {
                username: regForm.username,
                password: regForm.password,
                orgname: nameoforg,
                orgcode: regForm.orgcode,
                repeatPassword: regForm.repeatPassword,
                branchname: regForm.branchname
            });
            
            setregForm({
                username: '',
                password: '',
                orgcode: '',
                repeatPassword: '',
                branchname: ''
            });
            // localStorage.setItem('orgname', regForm.orgname);
            // localStorage.setItem('orgcode', response.data.register.orgcode);
            
        } catch (error) {
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
                                    <h1>New User</h1>
                                    <p className="text-medium-emphasis">Create your new user</p>
                                    {/* <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Organization Name" autoComplete="orgname" name='orgname' onChange={handleChange}/>
                  </CInputGroup> */}
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>OC</CInputGroupText>
                                        <CFormInput placeholder="Organization Code" autoComplete="orgcode" name='orgcode' onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput placeholder="Username" onChange={handleChange} name='username' />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            name='password'
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                            name='repeatPassword'
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Branch Name"
                                            name='branchname'
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
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

export default NewUser
