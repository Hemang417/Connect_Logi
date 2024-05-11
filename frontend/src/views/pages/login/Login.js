// // if user has 1 branch access then directly login if user has multiple access then dropdown. 

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CDropdown,
//   CDropdownToggle,
//   CDropdownMenu,
//   CDropdownItem,
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilLockLocked, cilUser } from '@coreui/icons';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loginData, setloginData] = useState({
//     username: '',
//     password: '',
//     orgcode: ''
//   });
//   const [allBranchesofourOwn, setallbranchesofourOwn] = useState([]);
//   const [selectedBranch, setselectedBranch] = useState({});

//   function handleChange(e) {
//     setloginData({
//       ...loginData,
//       [e.target.name]: e.target.value
//     });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/auth/login', {
//         username: loginData.username,
//         password: loginData.password,
//         orgcode: loginData.orgcode
//       });

//       if (response.status === 200) {
//         localStorage.setItem('orgcode', response.data.orgcode);
//         localStorage.setItem('orgname', response.data.orgname);
//         localStorage.setItem('username', response.data.username);
//         toast.success('Logged in successfully. Navigating to dashboard.');
//         setShowDropdown(true);
//         fetchBranchesofOwnOrg(response.data.orgcode, response.data.orgname, response.data.username);
//       } else {
//         alert('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.log("Error: " + error);
//       alert('An error occurred. Please try again later.');
//     }
//   }

//   const fetchBranchesofOwnOrg = async (orgcode, orgname, username) => {
//     try {
//       const response = await axios.get('http://localhost:5000/fetchallownbranchname', {
//         params: {
//           orgcode: orgcode,
//           orgname: orgname,
//           username: username
//         }
//       });
//       setallbranchesofourOwn(response.data);
//       if (response.data.length === 1) {
//         handleSelect(response.data[0].ownbranchname, response.data[0].branchcode);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function handleSelect(branchname, branchcode) {
//     setselectedBranch({ branchname, branchcode });
//     localStorage.setItem('branchnameofemp', branchname);
//     localStorage.setItem('branchcodeofemp', branchcode);
//     navigate('/dashboard');
//   }

//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={8}>
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm>
//                     <h1>Login</h1>
//                     <p className="text-medium-emphasis">Sign In to your account</p>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>
//                       <CFormInput placeholder="Organization Code" autoComplete="organizationcode" onChange={handleChange} name="orgcode" />
//                     </CInputGroup>
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>
//                       <CFormInput placeholder="Username" autoComplete="username" onChange={handleChange} name="username" />
//                     </CInputGroup>
//                     <CInputGroup className="mb-4">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="password"
//                         placeholder="Password"
//                         autoComplete="current-password"
//                         name="password"
//                         onChange={handleChange}
//                       />
//                     </CInputGroup>
//                     {showDropdown && allBranchesofourOwn.length > 1 && (
//                       <CCard className="p-4">
//                         <CCardBody>
//                           <CDropdown className="mb-3">
//                             <CDropdownToggle color="secondary">{selectedBranch ? selectedBranch.branchname : 'Branch Names'}</CDropdownToggle>
//                             <CDropdownMenu>
//                               {allBranchesofourOwn.map((branch, index) => (
//                                 <CDropdownItem key={index} onClick={() => handleSelect(branch.ownbranchname, branch.branchcode)}>{branch.ownbranchname}</CDropdownItem>
//                               ))}
//                             </CDropdownMenu>
//                           </CDropdown>
//                         </CCardBody>
//                       </CCard>
//                     )}
//                     <CRow>
//                       <CCol xs={6}>
//                         <CButton color="primary" className="px-4" onClick={handleSubmit}>
//                           Login
//                         </CButton>
//                       </CCol>
//                       <CCol xs={6} className="text-right">
//                         <CButton color="link" className="px-0">
//                           Forgot password?
//                         </CButton>
//                       </CCol>
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   );
// }

// export default Login;































import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    orgcode: ''
  });
  const [allBranchesOfOurOwn, setAllBranchesOfOurOwn] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({});

  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username: loginData.username,
        password: loginData.password,
        orgcode: loginData.orgcode
      });

      if (response.status === 200) {
        localStorage.setItem('orgcode', response.data.orgcode);
        localStorage.setItem('orgname', response.data.orgname);
        localStorage.setItem('username', response.data.username);
        toast.success('Logged in successfully. Navigating to dashboard.');

        if (response.data.username === 'admin') {
          navigate('/dashboard');
        } else {
          const branches = await fetchBranchesOfOurOwn(response.data.orgcode, response.data.orgname, response.data.username);
          if (branches.length === 1) {
            handleSelect(branches[0].ownbranchname, branches[0].branchcode);
          } else {
            setAllBranchesOfOurOwn(branches);
            setShowDropdown(true);
          }
        }
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.log("Error: " + error);
      alert('An error occurred. Please try again later.');
    }
  }

  const fetchBranchesOfOurOwn = async (orgcode, orgname, username) => {
    try {
      const response = await axios.get('http://localhost:5000/fetchallownbranchname', {
        params: {
          orgcode: orgcode,
          orgname: orgname,
          username: username
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function handleSelect(branchname, branchcode) {
    setSelectedBranch({ branchname, branchcode });
    localStorage.setItem('branchnameofemp', branchname);
    localStorage.setItem('branchcodeofemp', branchcode);
    navigate('/dashboard');
  }




  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Organization Code" autoComplete="organizationcode" onChange={handleChange} name="orgcode" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" onChange={handleChange} name="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {showDropdown && allBranchesOfOurOwn.length > 1 && (
                      <CCard className="p-4">
                        <CCardBody>
                          <CDropdown className="mb-3">
                            <CDropdownToggle color="secondary">{selectedBranch ? selectedBranch.branchname : 'Branch Names'}</CDropdownToggle>
                            <CDropdownMenu>
                              {allBranchesOfOurOwn.map((branch, index) => (
                                <CDropdownItem key={index} onClick={() => handleSelect(branch.ownbranchname, branch.branchcode)}>{branch.ownbranchname}</CDropdownItem>
                              ))}
                            </CDropdownMenu>
                          </CDropdown>
                        </CCardBody>
                      </CCard>
                    )}
                    <CRow>
                      <CCol xs={6}>
                        <CPopover content="Log In" trigger={['hover', 'focus']}>
                          <CButton color="primary" className="px-4" type='submit'>
                            Login
                          </CButton>
                        </CPopover>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Login;

