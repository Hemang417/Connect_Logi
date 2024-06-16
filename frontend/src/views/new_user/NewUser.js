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
    CDropdownItem,
    CPopover
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBuilding } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast'
import "../../css/styles.css"
import Cookies from 'js-cookie'

const NewUser = () => {

    const navigate = useNavigate();
    // const [allBranchesofourOwn, setallbranchesofourOwn] = useState([]);
    const [regForm, setregForm] = useState({
        username: ' ',
        password: ' ',
        orgcode: localStorage.getItem('orgcode'),
        repeatPassword: ' ',
        fullname: ' ',
    });

    const [selectedRole, setselectedRole] = useState('');

    function handleChange(e) {
        setregForm({
            ...regForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const checkToken = async () => {
          const token = Cookies.get('userauthtoken');
          if (token) {
            // Token exists, redirect to dashboard
            navigate('/dashboard');
          }else{
            navigate('/login')
          }
        };
        checkToken();
      }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const nameoforg = localStorage.getItem('orgname')
            if (regForm.username.includes(' ')) {
                alert('No spacing in username');
                return;
              }
            const response = await axios.post('http://localhost:5000/emp/store', {
                username: regForm.username,
                password: regForm.password,
                orgname: nameoforg,
                orgcode: regForm.orgcode,
                repeatPassword: regForm.repeatPassword,
                fullname: regForm.fullname,
                role: selectedRole
            });


            // setregForm({
            //     username: '',
            //     password: '',
            //     orgcode: '',
            //     repeatPassword: '',
            //     fullname: '',
            // });

            // setselectedRole('');

            // localStorage.setItem('orgname', regForm.orgname);
            // localStorage.setItem('orgcode', response.data.register.orgcode);
            if (response.statusCode === 200) {
                setregForm({
                    username: '',
                    password: '',
                    orgcode: '',
                    repeatPassword: '',
                    fullname: '',
                });

                setselectedRole('');
                toast.success('New user added successfully');
                navigate('/userlist');
            }

            navigate('/userlist');
        } catch (error) {
            toast.error('Error creating new user')
            console.log("Error: " + error);
        }
    }

    const [storedRoles, setStoredRoles] = useState([]);
    const GetallRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getuserroles', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setStoredRoles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetallRoles();
    }, [])


    return (
        <div className="bg-light d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={100} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>New User</h1>
                                    <p className="text-medium-emphasis">Create your new user</p>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>OC</CInputGroupText>
                                        <CFormInput placeholder="Organization Code" autoComplete="orgcode" name='orgcode' onChange={handleChange}
                                            value={localStorage.getItem('orgcode')} />
                                    </CInputGroup>


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
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput placeholder="Username" onChange={handleChange} name='username' />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        {/* <CInputGroupText>
                                            <CIcon icon={cilBuilding} />
                                        </CInputGroupText> */}

                                        <CDropdown className="role-newuser">
                                            <CDropdownToggle color="secondary">{selectedRole ? selectedRole : 'Role'}</CDropdownToggle>
                                            <CDropdownMenu className="impgen-text-dropdown">
                                                {storedRoles.map((item, index) => (
                                                    <CDropdownItem key={index} onClick={() => setselectedRole(item.rolename)}>
                                                        {item.rolename}
                                                    </CDropdownItem>
                                                ))}
                                            </CDropdownMenu>
                                        </CDropdown>

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

                                    <div className="d-grid">
                                        {/* <CPopover content="Create new user" trigger={['hover', 'focus']}> */}
                                            <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                                        {/* </CPopover> */}
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
