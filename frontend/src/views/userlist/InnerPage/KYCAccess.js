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

const KYCAccess = () => {


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
                                <input type="text" placeholder="" className='text-field-UL-3' />
                            </div>
                        </div>

                        <div className='grid-kyc'>
                            <div>
                                <label for="Mob No." className='KYC-UL'>Mobile No.</label>
                            </div>
                            <div>
                                <input type="text" placeholder="" className='text-field-UL-2' />
                            </div>
                        </div>
                        <div className='grid-kyc'>
                            <div>
                                <label for="Office Mob No." className='KYC-UL'>Office Mobile No.</label>
                            </div>
                            <div>
                                <input type="text" placeholder="" className='text-field-UL-1' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="Email Id" className='KYC-UL'>Personal Email Id</label>
                            <input type="text" placeholder="" className='text-field-UL-4' />
                        </div>
                        <div>
                            <label for="Office Email Id" className='KYC-UL'>Office Email Id</label>
                            <input type="text" placeholder="" className='text-field-UL-5' />
                        </div>
                        <div>
                            <label for="DOB" className='KYC-UL'>Date of Birth</label>
                            <input type="date" placeholder="" className='text-field-UL-6' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="DOJ" className='KYC-UL'>Date of Joining</label>
                            <input type="date" placeholder="" className='text-field-UL-7' />
                        </div>
                        <div>
                            <label for="Aadhar Card" className='KYC-UL'>Aadhar Card No.</label>
                            <input type="text" placeholder="" className='text-field-UL-8' />
                        </div>
                        <div>
                            <label for="PAN Card" className='KYC-UL'>PAN Card No.</label>
                            <input type="text" placeholder="" className='text-field-UL-9' />
                        </div>
                    </div>
                    <div>
                        <CButton color="success">Upload Profile Photo</CButton>
                    </div>
                </div>

                <div>
                    <h5>Documents Related to User</h5>
                </div>
            </CCardBody>
        </CCard>
    );
};

export default KYCAccess;
