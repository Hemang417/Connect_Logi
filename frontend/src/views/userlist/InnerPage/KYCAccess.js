import React, { useState, useEffect } from 'react';
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableRow,
    CCard,
    CCardBody
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const KYCAccess = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [branchesoftheemp, setBranchesoftheemp] = useState([]);
    const navigate = useNavigate();
    const gethebranchesofemployees = async () => {
        try {
            const empname = localStorage.getItem('empnameforaccess');
            const allthebranchesoftheemp = await axios.get('http://localhost:5000/branchesofthemp', {
                params: {
                    username: empname,
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            });
            setBranchesoftheemp(allthebranchesoftheemp.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        gethebranchesofemployees();
    }, []);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        officeMobileNumber: '',
        personalEmail: '',
        officeEmail: '',
        dateOfBirth: '',
        dateOfJoining: '',
        aadharNumber: '',
        panNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const [file, setfile] = useState();
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setfile(file);
        // Update the uploaded image state for real-time rendering
        setUploadedImage(URL.createObjectURL(file));
    };

    const handleSubmit = async () => {
        try {

            const formdata = new FormData();

            Object.keys(formData).forEach((key) => {
                formdata.append(key, formData[key]);
            })
            formdata.append('profilePhoto', file);

            // Append additional data
            formdata.append('orgname', localStorage.getItem('orgname'));
            formdata.append('orgcode', localStorage.getItem('orgcode'));
            formdata.append('username', localStorage.getItem('empnameforaccess'));
            formdata.append('branches', JSON.stringify(branchesoftheemp));

            const response = await axios.post('http://localhost:5000/uploadKYCData', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Reset form after successful submission
            // setFormData({
            //     fullName: '',
            //     mobileNumber: '',
            //     officeMobileNumber: '',
            //     personalEmail: '',
            //     officeEmail: '',
            //     dateOfBirth: '',
            //     dateOfJoining: '',
            //     aadharNumber: '',
            //     panNumber: '',
            //     profilePhoto: null
            // });
        } catch (error) {
            console.error('Error:', error);
        }
    };




    return (
        <CCard className="mb-2 container-div">
            <CCardBody>
                <div className='grid-KYC'>
                    <div>
                        <div className='grid-kyc'>
                            <div>
                                <label for="Full Name" className='KYC-UL'>Full Name</label>
                            </div>
                            <div>
                                <input type="text" placeholder="" className='text-field-UL-3' name="fullName" value={formData.fullName} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className='grid-kyc'>
                            <div>
                                <label for="Mob No." className='KYC-UL'>Mobile No.</label>
                            </div>
                            <div>
                                <input type="text" placeholder="" className='text-field-UL-2' name='mobileNumber' value={formData.mobileNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='grid-kyc'>
                            <div>
                                <label for="Office Mob No." className='KYC-UL'>Office Mobile No.</label>
                            </div>
                            <div>
                                <input type="text" placeholder="" className='text-field-UL-1' name='officeMobileNumber' value={formData.officeMobileNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="Email Id" className='KYC-UL'>Personal Email Id</label>
                            <input type="text" placeholder="" className='text-field-UL-4' name='personalEmail' value={formData.personalEmail} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label for="Office Email Id" className='KYC-UL'>Office Email Id</label>
                            <input type="text" placeholder="" className='text-field-UL-5' name='officeEmail' value={formData.officeEmail} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label for="DOB" className='KYC-UL'>Date of Birth</label>
                            <input type="date" placeholder="" className='text-field-UL-6' name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="DOJ" className='KYC-UL'>Date of Joining</label>
                            <input type="date" placeholder="" className='text-field-UL-7' name='dateOfJoining' value={formData.dateOfJoining} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label for="Aadhar Card" className='KYC-UL'>Aadhar Card No.</label>
                            <input type="text" placeholder="" className='text-field-UL-8' value={formData.aadharNumber} name='aadharNumber' onChange={handleInputChange} />
                        </div>
                        <div>
                            <label for="PAN Card" className='KYC-UL'>PAN Card No.</label>
                            <input type="text" placeholder="" className='text-field-UL-9' value={formData.panNumber} name='panNumber' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {uploadedImage != null && (
                            <div>
                                <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
                            </div>
                        )}
                    </div>
                    <div>
                        <CButton color="success" onClick={handleSubmit}>Upload Profile Photo</CButton>
                    </div>
                </div>

                {/* <div>
                    <h5>Documents Related to User</h5>
                </div> */}
            </CCardBody>
        </CCard>
    );
};

export default KYCAccess;
