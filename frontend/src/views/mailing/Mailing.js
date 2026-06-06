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
import API_BASE_URL from "src/config/config";

const PasswordSvg = (props) => {
    return (
      // Add return statement
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
            stroke="#364657"
            stroke-width="1.5"
          ></path>
          <path
            d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"
            stroke="#364657"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
        </g>
      </svg>
    );
  };
const EmailSvg = (props) => {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#364657" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#364657" stroke-width="2" stroke-linecap="round"></rect> </g></svg>);
  };
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
                const gettimemail = await axios.get(`${API_BASE_URL}/gettimeandmail`, {
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

            const settingtimeandmail = await axios.post(`${API_BASE_URL}/settimeandmail`, {
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
        <div className="bg-light m-auto d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Mail & Time</h1>
                                    <p className="text-medium-emphasis">Set Your Mail & Time</p>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText className='svg-mailing-width'>
                                        <EmailSvg
                            style={{ width: "24px", height: "24px" }}
                          />
                                        </CInputGroupText>
                                        <CFormInput type='email'
                            style={{ textAlign:"center" }}
                                        
                                        placeholder="Put your email" name='email'value={timeandmail.email} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText className='svg-mailing-width'>
                                            
                                        <PasswordSvg
                            style={{ width: "24px", height: "24px" }}
                          />
                                        </CInputGroupText>
                                        <CFormInput
                            style={{ textAlign:"center" }}
                                        
                                        placeholder="Put your passcode of your mail" name='passcode' value={timeandmail.passcode} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText className='svg-mailing-width'>Hours</CInputGroupText>
                                        <select className="form-select" name="hours" value={timeandmail.hours} onChange={handleChange}>
                                            {renderHoursOptions()}
                                        </select>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText className='svg-mailing-width'>Minutes</CInputGroupText>
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
