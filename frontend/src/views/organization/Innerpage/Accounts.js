import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CButton,
    CCol,
    CRow,
    CFormInput,
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Accounts = ({ onSave, aData }) => {
    const [accountData, setAccountData] = useState({
        creditdays: '',
    });

    // UseEffect to set prefilled data
    useEffect(() => {
        if (aData && aData.creditdays) {
            setAccountData(aData);
        }
    }, [aData]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({ ...accountData, [name]: value });
    };

    // Handle save button click
    const handleSave = () => {
        onSave(accountData);
    };

    return (
        <div>
            <CCol xs={12}>
                <CCard className="mb-2 container-div">
                    <CCardBody>
                        <input
                            type="text"
                            placeholder="Credit Days"
                            className="text-field-1"
                            value={accountData.creditdays}
                            onChange={handleChange}
                            name="creditdays"
                        />
                        <div className="mb-2 search-button update-button">
                            <CButton color="primary" type="submit" onClick={handleSave}>
                                Update
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </div>
    );
};

export default Accounts;
