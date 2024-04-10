import React, { useEffect, useState } from 'react'
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
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBuilding } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'

const NewUser = () => {

    const navigate = useNavigate();
    const [allBranchesofourOwn, setallbranchesofourOwn] = useState([]);
    const [regForm, setregForm] = useState({
        username: ' ',
        password: ' ',
        orgcode: localStorage.getItem('orgcode'),
        repeatPassword: ' ',
        branchname: ' ',
        fullname: ' ',
        branchcode: ' '
    });
    const [selectedBranch, setselectedBranch] = useState('');

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

            const response = await axios.post('http://localhost:5000/emp/store', {
                username: regForm.username,
                password: regForm.password,
                orgname: nameoforg,
                orgcode: regForm.orgcode,
                repeatPassword: regForm.repeatPassword,
                branchname: regForm.branchname,
                fullname: regForm.fullname,
                branchcode: regForm.branchcode
            });


            setregForm({
                username: '',
                password: '',
                orgcode: '',
                repeatPassword: '',
                branchname: '',
                fullname: ''
            });



            // localStorage.setItem('orgname', regForm.orgname);
            // localStorage.setItem('orgcode', response.data.register.orgcode);
            if (response.statusCode === 200) {
                toast.success('New user added successfully');
                navigate('/dashboard');
            }

            navigate('/dashboard');
        } catch (error) {
            toast.error('Error creating new user')
            console.log("Error: " + error);
        }
    }


    useEffect(() => {
        const fetchBranchesofOwnOrg = async (req, res) => {
            try {
                const response = await axios.get('http://localhost:5000/fetchallownbranchname', {
                    params: {
                        orgcode: localStorage.getItem('orgcode'),
                        orgname: localStorage.getItem('orgname')
                    }
                })
                setallbranchesofourOwn(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBranchesofOwnOrg();
    }, [])

async function handleSelect(branchname, branchcode){
    setregForm({
        ...regForm,
        branchname: branchname,
        branchcode: branchcode
    })
    setselectedBranch(branchname);
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
                                        <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="text"
                                            placeholder="Full Name"
                                            name='fullname'
                                            onChange={handleChange}
                                        />
                                    </CInputGroup>


                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>OC</CInputGroupText>
                                        <CFormInput placeholder="Organization Code" autoComplete="orgcode" name='orgcode' onChange={handleChange}
                                            value={localStorage.getItem('orgcode')} />
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
                                        <CDropdown className="impgen-text-field-1">
                                            <CDropdownToggle color="secondary">{selectedBranch ? selectedBranch : 'Branch Names'}</CDropdownToggle>
                                            <CDropdownMenu className="impgen-text-dropdown">
                                                {allBranchesofourOwn && allBranchesofourOwn.map((branch, index) => (
                                                    <CDropdownItem key={index} onClick={()=> handleSelect(branch.ownbranchname, branch.branchcode)}>{branch.ownbranchname}</CDropdownItem>
                                                ))}
                                            </CDropdownMenu>
                                        </CDropdown>
                                        {/* <CFormInput
                                            type="text"
                                            placeholder="Branch Name"
                                            name='branchname'
                                            onChange={handleChange}
                                        /> */}
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
