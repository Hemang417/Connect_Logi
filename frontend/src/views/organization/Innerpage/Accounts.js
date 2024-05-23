// import React, { useEffect, useState } from 'react';
// import {
//     CCard,
//     CCardBody,
//     CButton,
//     CCol,
//     CRow,
//     CFormInput,
// } from '@coreui/react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios'

// const Accounts = ({ onSave, aData }) => {
//     const [accountData, setAccountData] = useState({
//         creditdays: '',
//     });






//     useEffect(() => {
//         const handlebranchchange = async () => {
//             try {
//                 const selectedBranchName = localStorage.getItem('selectedBranchName');
//                 const clientname = localStorage.getItem('clientname');
//                 const aliashai = localStorage.getItem('alias')

                
//                 const response = await axios.get('http://localhost:5000/allFetch', {
//                     params: {
//                         clientname: clientname,
//                         alias: aliashai,
//                         branchname: selectedBranchName
//                     }
//                 })
                
//                 setAccountData(response.data)
//             } catch (error) {
//                 console.log("Error: " + error);
//             }
//         }
//         handlebranchchange()
//     }, [])












//     // UseEffect to set prefilled data
//     // useEffect(() => {
//     //     if (aData && aData.creditdays) {
//     //         setAccountData(aData);
//     //     }
//     // }, [aData]);

//     // Handle input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAccountData({ ...accountData, [name]: value });
//     };

//     // Handle save button click
//     const handleSave = () => {
//         onSave(accountData);
//     };

//     return (
//         <div>
//             <CCol xs={12}>
//                 <CCard className="mb-2 container-div">
//                     <CCardBody>
//                         <input
//                             type="text"
//                             placeholder="Credit Days"
//                             className="text-field-1"
//                             value={accountData.creditdays}
//                             onChange={handleChange}
//                             name="creditdays"
//                         />
//                         <div className="mb-2 search-button update-button">
//                             <CButton color="primary" type="submit" onClick={handleSave}>
//                                 Update
//                             </CButton>
//                         </div>
//                     </CCardBody>
//                 </CCard>
//             </CCol>
//         </div>
//     );
// };

// export default Accounts;












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
import axios from 'axios'
import toast from 'react-hot-toast';

const Accounts = ({ onSave, aData }) => {
    const [accountData, setAccountData] = useState({
        creditdays: '',
    });
    const [validationMessage, setValidationMessage] = useState('');
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

        if (accountData.creditdays < 1 || accountData.creditdays > 365) {
            setValidationMessage('Credit Days must be between 1 and 365');
            alert('Credit Days must be between 1 and 365');
            return;
        }

        toast.success('Account saved successfully')
        onSave(accountData);
    };


    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        if(localStorage.getItem('firstorgofclient')){
            const prefill = async () => {
                try {
                    const firstbranchofclient = localStorage.getItem('firstorgofclient');
                    const jsonfirstbranch = JSON.parse(firstbranchofclient);
                    const clientname = localStorage.getItem('organizationclientname');
                    const aliashai = localStorage.getItem('alias');
    
                    const response = await axios.get('http://localhost:5000/allFetch', {
                        params: {
                            clientname: clientname,
                            alias: aliashai,
                            branchname: jsonfirstbranch.branchname,
                            id: jsonfirstbranch.id
                        }
                    })
                    setAccountData(response.data);
                } catch (error) {
                    console.log("Error: " + error);
                }
            }
            prefill();
        }
        
    }, []);





    useEffect(() => {
        const handlenewbranchdata = async () => {
            try {
                if (localStorage.getItem('branchnames') && localStorage.getItem('isEditing') === 'true') {
                    setAccountData({
                        creditdays: ''
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        handlenewbranchdata();
    }, []);
    




// useEffect(() => {
//     const prefillswitchedbranch = async () => {

//     }
// })






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