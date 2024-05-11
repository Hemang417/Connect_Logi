import React, { useState, useEffect } from 'react';
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
    CRow
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Mailing = () => {
    const navigate = useNavigate();
    const [timeandmail, settimeandmail] = useState({
        email: '',
        passcode: '',
        hours: '00', // Default value for hours
        minutes: '00' // Default value for minutes
    });


    useEffect(() => {
        const GetMailTime = async () => {
            try {
                const gettimemail = await axios.get('http://localhost:5000/gettimeandmail', {
                    params: {
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode'),
                    }
                })
                console.log(gettimemail.data[0]);
                settimeandmail({
                    email: gettimemail.data[0].email,
                    passcode: gettimemail.data[0].passcode,
                    hours: gettimemail.data[0].hours,
                    minutes: gettimemail.data[0].minutes
                
                })
            } catch (error) {
                console.log(error);
            }
        }
        GetMailTime();
    }, [])



    function handleChange(e) {
        settimeandmail({
            ...timeandmail,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const settingtimeandmail = await axios.post('http://localhost:5000/settimeandmail', {
                email: timeandmail.email,
                passcode: timeandmail.passcode,
                hours: timeandmail.hours,
                minutes: timeandmail.minutes,
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            })
            toast.success(`Mail Timing is set as per your desired time`)
        } catch (error) {
            console.log(error);
            toast.error('Error setting time and email')
        }
    }

    // Function to generate options for hours in 24-hour format
    const renderHoursOptions = () => {
        let hoursOptions = [];
        for (let i = 0; i < 24; i++) {
            hoursOptions.push(
                <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
            );
        }
        return hoursOptions;
    };

    // Function to generate options for minutes from 1 to 59
    const renderMinutesOptions = () => {
        let minutesOptions = [];
        for (let i = 1; i <= 59; i++) {
            minutesOptions.push(
                <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
            );
        }
        return minutesOptions;
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Mail & Time</h1>
                                    <p className="text-medium-emphasis">Set Your Mail & Time</p>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Email</CInputGroupText>
                                        <CFormInput type='email' placeholder="Put your email" name='email'value={timeandmail.email} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Pass</CInputGroupText>
                                        <CFormInput placeholder="Put your passcode of your mail" name='passcode' value={timeandmail.passcode} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Hours</CInputGroupText>
                                        <select className="form-select" name="hours" value={timeandmail.hours} onChange={handleChange}>
                                            {renderHoursOptions()}
                                        </select>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>Minutes</CInputGroupText>
                                        <select className="form-select" name="minutes" value={timeandmail.minutes} onChange={handleChange}>
                                            {renderMinutesOptions()}
                                        </select>
                                    </CInputGroup>

                                    <div className="d-grid">
                                        <CButton color="success" onClick={handleSubmit}>Set</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Mailing;
