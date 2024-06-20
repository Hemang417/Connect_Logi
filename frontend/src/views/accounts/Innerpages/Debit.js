// // import React, { useEffect, useState } from 'react';
// // import Select from 'react-select';
// // import {
// //   CButton,
// //   CModal,
// //   CModalHeader,
// //   CModalTitle,
// //   CModalBody,
// //   CModalFooter,
// //   CFormInput
// // } from '@coreui/react';
// // import '../../../css/styles.css';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // const Debit = () => {
// //   const [allBankDetails, setAllBankDetails] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [userInput, setUserInput] = useState('');

// //   const getBankDetails = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/getbankdetails', {
// //         params: {
// //           orgname: localStorage.getItem('orgname'),
// //           orgcode: localStorage.getItem('orgcode'),
// //         },
// //       });
// //       const formattedData = response.data.map(bank => ({ value: bank.bankname, label: bank.bankname }));
// //       setAllBankDetails(formattedData);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const getOrgdata = async () => {
// //     try {
// //       const orgresponse = await axios.get('http://localhost:5000/getclientnameoforg', {
// //         params: {
// //           orgname: localStorage.getItem('orgname'),
// //           orgcode: localStorage.getItem('orgcode'),
// //         }
// //       });
// //       const formattedData = orgresponse.data.map(client => ({ value: client.clientname, label: client.clientname }));
// //       setFiltered(formattedData);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getBankDetails();
// //     getOrgdata();
// //   }, []);

// //   const handleInputChange = (inputValue) => {
// //     setUserInput(inputValue);

// //   };

// //   const handleBlur = () => {
// //     if (userInput.trim() !== '') {
// //       const newClient = { value: userInput, label: userInput };
// //       setFiltered([...filtered, newClient]);
// //       toast.success('New client added successfully');
// //       localStorage.setItem('newuserclient', userInput);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div>
// //         <label htmlFor="date" className="text-field-3">
// //           Date
// //         </label>
// //         <input type="date" placeholder="" className="text-field-4" name="date" />
// //       </div>

// //       <div>
// //         <label htmlFor="bank-account" className="text-field-3">
// //           Bank Account
// //         </label>
// //         <Select
// //           options={allBankDetails}
// //           className="text-field-4"
// //           placeholder="Select"
// //         />
// //       </div>

// //       <div>
// //         <label htmlFor="payment-details" className="text-field-3">
// //           Payment Details
// //         </label>
// //         <Select
// //           className="impgen-text-field-1"
// //           options={filtered}
// //           value={localStorage.getItem('newuserclient') === '' ? 
// //             { value: '', label: 'Select' } : 
// //             {value: localStorage.getItem('newuserclient'), label: localStorage.getItem('newuserclient')}
// //           }
// //           placeholder="Importer Name"
// //           onInputChange={handleInputChange}
// //           onBlur={handleBlur}
// //         />
// //       </div>

// //       <div>
// //         <label htmlFor="type-of-expense" className="text-field-3">
// //           Type of Expense
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="type-of-expense" />
// //       </div>

// //       <div>
// //         <label htmlFor="taxable-amount" className="text-field-3">
// //           Taxable Amount
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="taxable-amount" />
// //       </div>

// //       <div>
// //         <label htmlFor="gst-amount" className="text-field-3">
// //           GST Amount
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="gst-amount" />
// //       </div>

// //       <div>
// //         <label htmlFor="total-invoice-amount" className="text-field-3">
// //           Total Invoice Amount
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="total-invoice-amount" />
// //       </div>

// //       <div>
// //         <label htmlFor="tds-amount" className="text-field-3">
// //           TDS Amount
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="tds-amount" />
// //       </div>

// //       <div>
// //         <label htmlFor="net-payment-amount" className="text-field-3">
// //           Net Payment Amount
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="net-payment-amount" />
// //       </div>

// //       <div>
// //         <label htmlFor="utr-details" className="text-field-3">
// //           UTR Details
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="utr-details" />
// //       </div>

// //       <div>
// //         <label htmlFor="job-no" className="text-field-3">
// //           Job No.
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="job-no" />
// //       </div>

// //       <div>
// //         <label htmlFor="customer-name" className="text-field-3">
// //           Customer Name
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="customer-name" />
// //       </div>

// //       <div>
// //         <label htmlFor="remarks" className="text-field-3">
// //           Remarks
// //         </label>
// //         <input type="text" placeholder="" className="text-field-4" name="remarks" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Debit;






















// import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import {
//   CCardBody,
//   CTable,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CForm,
//   CButton,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CNav,
//   CNavItem,
//   CNavLink, CRow, CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu
// } from '@coreui/react';

// const Debit = () => {
//   const [allBankDetails, setAllBankDetails] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [gstpercentage, setgstpercentage] = useState(0);
//   const [tdsname, setTDSname] = useState('');
//   const [tdspercentage, setTDSpercentage] = useState(0);

//   const tdsOptions = [
//     { description: 'TDS COMM.', percentage: '5' },
//     { description: '194-C', percentage: '2' },
//     { description: '94I', percentage: '10' },
//     { description: '94J', percentage: '10' },
//     { description: '94C1%', percentage: '1' },
//     { description: '94A', percentage: '10' },
//     { description: 'Zero', percentage: '0' },
//   ];

//   const [formData, setFormData] = useState({
//     date: '',
//     bankname: null, // For Select, initialize as null
//     typeOfExpense: '',
//     taxableAmount: '',
//     gstAmount: '',
//     totalInvoiceAmount: '',
//     tdsAmount: '',
//     netPaymentAmount: '',
//     utrDetails: '',
//     jobNo: '',
//     customerName: '',
//     remarks: ''
//   });

//   const getBankDetails = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/getbankdetails', {
//         params: {
//           orgname: localStorage.getItem('orgname'),
//           orgcode: localStorage.getItem('orgcode'),
//         },
//       });
//       const formattedData = response.data.map(bank => ({ value: bank.bankname, label: bank.bankname }));
//       setAllBankDetails(formattedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getOrgdata = async () => {
//     try {
//       const orgresponse = await axios.get('http://localhost:5000/getclientnameoforg', {
//         params: {
//           orgname: localStorage.getItem('orgname'),
//           orgcode: localStorage.getItem('orgcode'),
//         }
//       });
//       const formattedData = orgresponse.data.map(client => ({ value: client.clientname, label: client.clientname }));
//       setFiltered(formattedData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getBankDetails();
//     getOrgdata();
//     setUserInput(localStorage.getItem('newuserclient') || ''); // Initialize userInput from localStorage
//   }, []);

//   const handleInputChange = (inputValue) => {
//     setUserInput(inputValue);
//   };

//   const handleBlur = () => {
//     if (userInput.trim() !== '') {
//       filtered.map((item) => item.value !== userInput)
//       {
//         const newClient = { value: userInput, label: userInput };
//         setFiltered([...filtered, newClient]);
//         toast.success('New client added successfully');
//         localStorage.setItem('newuserclient', userInput);
//       }
//     }
//   };

//   const handleInputChangeForField = (e) => {
//     const { name, value } = e.target;
//     if (name === 'taxableAmount') {
//       calculateGSTandstuff(value);
//     }
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSelectChange = (selectedOption, actionMeta) => {
//     setFormData({
//       ...formData,
//       [actionMeta.name]: selectedOption
//     });
//   };


//   const AddDebit = async () => {
//     try {

//       const response = await axios.post('http://localhost:5000/addDebit', {
//         formData: formData,
//         userInput: localStorage.getItem('newuserclient'),
//         orgname: localStorage.getItem('orgname'),
//         orgcode: localStorage.getItem('orgcode'),
//         branchname: localStorage.getItem('branchnameofemp'),
//         branchcode: localStorage.getItem('branchcodeofemp'),
//       })

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleGSTChange = (selectedValue) => {
//     setgstpercentage(selectedValue);
//     calculateGSTandstuff(formData.taxableAmount);
//   };

//   const handleTDSChange = (selectedValue) => {
//     setTDSname(selectedValue);
//     tdsOptions.map((item) => {
//       item.description === selectedValue ? setTDSpercentage(item.percentage) : null;
//     })
//     calculateGSTandstuff(formData.taxableAmount);
//   }


//   const calculateGSTandstuff = async (taxamt) => {
//     try {
//       const inttax = parseInt(taxamt)
//       if ( inttax > 0) {
//         const gstamt = (inttax * gstpercentage) / 100;
//         const totalInvoice = parseFloat(inttax) + parseFloat(gstamt);
//         const tdsamt = (inttax * tdspercentage) / 100;
//         const netPayment = parseFloat(totalInvoice) - parseFloat(tdsamt);
//         // console.log(gstamt, totalInvoice, tdsamt, netPayment);
//         setFormData({
//           ...formData,
//           taxableAmount: inttax,
//           gstAmount: gstamt.toFixed(2),
//           totalInvoiceAmount: totalInvoice.toFixed(2),
//           tdsAmount: tdsamt.toFixed(2),
//           netPaymentAmount: netPayment.toFixed(2)
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }



//   return (
//     <div>
//       <div>
//         <label htmlFor="date" className="text-field-3">
//           Date
//         </label>
//         <input
//           type="date"
//           placeholder=""
//           className="text-field-4"
//           name="date"
//           value={formData.date}
//           onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="bank-account" className="text-field-3">
//           Bank Account
//         </label>
//         <Select
//           options={allBankDetails}
//           className="text-field-4"
//           name='bankname'
//           value={formData.bankname}
//           onChange={handleSelectChange}
//           placeholder="Select"
//         />
//       </div>

//       <div>
//         <label htmlFor="payment-details" className="text-field-3">
//           Payment Details
//         </label>
//         <Select
//           className="impgen-text-field-1"
//           options={filtered}
//           value={localStorage.getItem('newuserclient') === '' ?
//             { value: '', label: 'Select' } :
//             { value: localStorage.getItem('newuserclient'), label: localStorage.getItem('newuserclient') }
//           }
//           placeholder="Importer Name"
//           onInputChange={handleInputChange}
//           onBlur={handleBlur}
//           onChange={(selectedOption) => {
//             setUserInput(selectedOption.label);
//             localStorage.setItem('newuserclient', selectedOption.label);
//           }}
//         />
//       </div>

//       <div>
//         <label htmlFor="type-of-expense" className="text-field-3">
//           Type of Expense
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="typeOfExpense"
//           value={formData.typeOfExpense}
//           onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="taxable-amount" className="text-field-3">
//           Taxable Amount
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="taxableAmount"
//           value={formData.taxableAmount}
//           onChange={handleInputChangeForField}
//         // onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="gst-amount" className="text-field-3">
//           GST Amount
//         </label>
//         <CDropdown>
//           <CDropdownToggle className="dropdown-btn" color='secondary'>{gstpercentage ? gstpercentage : 'Select GST %'}</CDropdownToggle>
//           <CDropdownMenu className="text-field-4">
//             <CDropdownItem onClick={() => handleGSTChange('0%')}>0%</CDropdownItem>
//             <CDropdownItem onClick={() => handleGSTChange('5%')}>5%</CDropdownItem>
//             <CDropdownItem onClick={() => handleGSTChange('12%')}>12%</CDropdownItem>
//             <CDropdownItem onClick={() => handleGSTChange('18%')}>18%</CDropdownItem>
//             <CDropdownItem onClick={() => handleGSTChange('28%')}>28%</CDropdownItem>
//           </CDropdownMenu>
//         </CDropdown>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="gstAmount"
//           value={formData.gstAmount}
//           readOnly
//         // onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="total-invoice-amount" className="text-field-3">
//           Total Invoice Amount
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="totalInvoiceAmount"
//           value={formData.totalInvoiceAmount}
//           readOnly
//         // onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="tds-amount" className="text-field-3">
//           TDS Amount
//         </label>
//         <CDropdown>
//           <CDropdownToggle className="dropdown-btn" color='secondary'>{tdsname ? tdsname : 'Select TDS'}</CDropdownToggle>
//           <CDropdownMenu className="text-field-4">
//             <CDropdownItem onClick={() => handleTDSChange('Zero')}>0%</CDropdownItem>
//             <CDropdownItem onClick={() => handleTDSChange('TDS COMM.')}>TDS COMM.</CDropdownItem>
//             <CDropdownItem onClick={() => handleTDSChange('194-C')}>194-C</CDropdownItem>
//             <CDropdownItem onClick={() => handleTDSChange('94I')}>94I</CDropdownItem>
//             <CDropdownItem onClick={() => handleTDSChange('94J')}>94J</CDropdownItem>
//             <CDropdownItem onClick={() => handleTDSChange('94C1%')}>94C1%</CDropdownItem>
//             <CDropdownItem onClick={() => handleTDSChange('94A')}>94A</CDropdownItem>
//           </CDropdownMenu>
//         </CDropdown>
//         <input type='text' value={`${tdspercentage}%`} />
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="tdsAmount"
//           value={formData.tdsAmount}
//           readOnly
//         // onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="net-payment-amount" className="text-field-3">
//           Net Payment Amount
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="netPaymentAmount"
//           value={formData.netPaymentAmount}
//           readOnly
//         // onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="utr-details" className="text-field-3">
//           UTR Details
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="utrDetails"
//           value={formData.utrDetails}
//           onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="job-no" className="text-field-3">
//           Job No.
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="jobNo"
//           value={formData.jobNo}
//           onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="customer-name" className="text-field-3">
//           Customer Name
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="customerName"
//           value={formData.customerName}
//           onChange={handleInputChangeForField}
//         />
//       </div>

//       <div>
//         <label htmlFor="remarks" className="text-field-3">
//           Remarks
//         </label>
//         <input
//           type="text"
//           placeholder=""
//           className="text-field-4"
//           name="remarks"
//           value={formData.remarks}
//           onChange={handleInputChangeForField}
//         />
//       </div>

//       <CModalFooter>
//         <CButton color="secondary" onClick={AddDebit}>Add</CButton>
//       </CModalFooter>

//     </div>
//   );
// };

// export default Debit;
































































































import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  CCardBody,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CNav,
  CNavItem,
  CNavLink, CRow, CDropdown, CDropdownItem, CDropdownToggle, CDropdownMenu
} from '@coreui/react';

const Debit = () => {
  const [allBankDetails, setAllBankDetails] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [gstpercentage, setgstpercentage] = useState(0);
  const [tdsname, setTDSname] = useState('');
  const [tdspercentage, setTDSpercentage] = useState(0);

  const tdsOptions = [
    { description: 'TDS COMM.', percentage: '5' },
    { description: '194-C', percentage: '2' },
    { description: '94I', percentage: '10' },
    { description: '94J', percentage: '10' },
    { description: '94C1%', percentage: '1' },
    { description: '94A', percentage: '10' },
    { description: 'Zero', percentage: '0' },
  ];

  const [formData, setFormData] = useState({
    date: '',
    bankname: null, // For Select, initialize as null
    typeOfExpense: '',
    taxableAmount: '',
    gstAmount: '',
    totalInvoiceAmount: '',
    tdsAmount: '',
    netPaymentAmount: '',
    utrDetails: '',
    jobNo: '',
    customerName: '',
    remarks: ''
  });

  const getBankDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getbankdetails', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        },
      });
      const formattedData = response.data.map(bank => ({ value: bank.bankname, label: bank.bankname }));
      setAllBankDetails(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrgdata = async () => {
    try {
      const orgresponse = await axios.get('http://localhost:5000/getclientnameoforg', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      });
      const formattedData = orgresponse.data.map(client => ({ value: client.clientname, label: client.clientname }));
      setFiltered(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBankDetails();
    getOrgdata();
    setUserInput(localStorage.getItem('newuserclient') || ''); // Initialize userInput from localStorage
  }, []);

  const handleInputChange = (inputValue) => {
    setUserInput(inputValue);
  };

  const handleBlur = () => {
    if (userInput.trim() !== '') {
      filtered.map((item) => item.value !== userInput)
      {
        const newClient = { value: userInput, label: userInput };
        setFiltered([...filtered, newClient]);
        toast.success('New client added successfully');
        localStorage.setItem('newuserclient', userInput);
      }
    }
  };

  const handleInputChangeForField = (e) => {
    const { name, value } = e.target;
    if (name === 'taxableAmount') {
      calculateGSTandstuff(value);
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({
      ...formData,
      [actionMeta.name]: selectedOption
    });
  };


  const AddDebit = async () => {
    try {

      const response = await axios.post('http://localhost:5000/addDebit', {
        formData: formData,
        userInput: localStorage.getItem('newuserclient'),
        orgname: localStorage.getItem('orgname'),
        orgcode: localStorage.getItem('orgcode'),
        branchname: localStorage.getItem('branchnameofemp'),
        branchcode: localStorage.getItem('branchcodeofemp'),
      })

    } catch (error) {
      console.log(error);
    }
  }

  const handleGSTChange = (selectedValue) => {
    setgstpercentage(parseFloat(selectedValue));
    calculateGSTandstuff(formData.taxableAmount);
  };
  
  const handleTDSChange = (selectedValue) => {
    const selectedOption = tdsOptions.find(item => item.description === selectedValue);
    setTDSname(selectedValue);
    setTDSpercentage(parseFloat(selectedOption.percentage));
  };

  useEffect(() => {
    calculateGSTandstuff(formData.taxableAmount);
  }, [gstpercentage, tdspercentage]);

  const calculateGSTandstuff = (taxamt) => {
    try {
      const taxAmountNumber = parseFloat(taxamt) || 0; // Ensure taxamt is a number
      const gstamt = (taxAmountNumber * gstpercentage) / 100;
      const totalInvoice = taxAmountNumber + gstamt;
      const tdsamt = (taxAmountNumber * tdspercentage) / 100;
      const netPayment = totalInvoice - tdsamt;
      setFormData({
        ...formData,
        taxableAmount: taxamt,
        gstAmount: gstamt.toFixed(2),
        totalInvoiceAmount: totalInvoice.toFixed(2),
        tdsAmount: tdsamt.toFixed(2),
        netPaymentAmount: netPayment.toFixed(2)
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="date" className="text-field-3">
          Date
        </label>
        <input
          type="date"
          placeholder=""
          className="text-field-4"
          name="date"
          value={formData.date}
          onChange={handleInputChangeForField}
        />
      </div>

      <div>
        <label htmlFor="bank-account" className="text-field-3">
          Bank Account
        </label>
        <Select
          options={allBankDetails}
          className="text-field-4"
          name='bankname'
          value={formData.bankname}
          onChange={handleSelectChange}
          placeholder="Select"
        />
      </div>

      <div>
        <label htmlFor="payment-details" className="text-field-3">
          Payment Details
        </label>
        <Select
          className="impgen-text-field-1"
          options={filtered}
          value={localStorage.getItem('newuserclient') === '' ?
            { value: '', label: 'Select' } :
            { value: localStorage.getItem('newuserclient'), label: localStorage.getItem('newuserclient') }
          }
          placeholder="Importer Name"
          onInputChange={handleInputChange}
          onBlur={handleBlur}
          onChange={(selectedOption) => {
            setUserInput(selectedOption.label);
            localStorage.setItem('newuserclient', selectedOption.label);
          }}
        />
      </div>

      <div>
        <label htmlFor="type-of-expense" className="text-field-3">
          Type of Expense
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="typeOfExpense"
          value={formData.typeOfExpense}
          onChange={handleInputChangeForField}
        />
      </div>

      <div>
        <label htmlFor="taxable-amount" className="text-field-3">
          Taxable Amount
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="taxableAmount"
          value={formData.taxableAmount}
          onChange={handleInputChangeForField}
        />
      </div>

      <div>
        <label htmlFor="gst-amount" className="text-field-3">
          GST Amount
        </label>
        <CDropdown>
          <CDropdownToggle className="dropdown-btn" color='secondary'>{gstpercentage ? `${gstpercentage}%` : 'Select GST %'}</CDropdownToggle>
          <CDropdownMenu className="text-field-4">
            <CDropdownItem onClick={() => handleGSTChange('0')}>0%</CDropdownItem>
            <CDropdownItem onClick={() => handleGSTChange('5')}>5%</CDropdownItem>
            <CDropdownItem onClick={() => handleGSTChange('12')}>12%</CDropdownItem>
            <CDropdownItem onClick={() => handleGSTChange('18')}>18%</CDropdownItem>
            <CDropdownItem onClick={() => handleGSTChange('28')}>28%</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="gstAmount"
          value={formData.gstAmount}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="total-invoice-amount" className="text-field-3">
          Total Invoice Amount
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="totalInvoiceAmount"
          value={formData.totalInvoiceAmount}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="tds-amount" className="text-field-3">
          TDS Amount
        </label>
        <CDropdown>
          <CDropdownToggle className="dropdown-btn" color='secondary'>{tdsname ? tdsname : 'Select TDS'}</CDropdownToggle>
          <CDropdownMenu className="text-field-4">
            <CDropdownItem onClick={() => handleTDSChange('Zero')}>0%</CDropdownItem>
            <CDropdownItem onClick={() => handleTDSChange('TDS COMM.')}>TDS COMM.</CDropdownItem>
            <CDropdownItem onClick={() => handleTDSChange('194-C')}>194-C</CDropdownItem>
            <CDropdownItem onClick={() => handleTDSChange('94I')}>94I</CDropdownItem>
            <CDropdownItem onClick={() => handleTDSChange('94J')}>94J</CDropdownItem>
            <CDropdownItem onClick={() => handleTDSChange('94C1%')}>94C1%</CDropdownItem>
            <CDropdownItem onClick={() => handleTDSChange('94A')}>94A</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <input type='text' value={`${tdspercentage}%`} readOnly />
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="tdsAmount"
          value={formData.tdsAmount}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="net-payment-amount" className="text-field-3">
          Net Payment Amount
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="netPaymentAmount"
          value={formData.netPaymentAmount}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="utr-details" className="text-field-3">
          UTR Details
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="utrDetails"
          value={formData.utrDetails}
          onChange={handleInputChangeForField}
        />
      </div>

      <div>
        <label htmlFor="job-no" className="text-field-3">
          Job No.
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="jobNo"
          value={formData.jobNo}
          onChange={handleInputChangeForField}
        />
      </div>

      <div>
        <label htmlFor="customer-name" className="text-field-3">
          Customer Name
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChangeForField}
        />
      </div>

      <div>
        <label htmlFor="remarks" className="text-field-3">
          Remarks
        </label>
        <input
          type="text"
          placeholder=""
          className="text-field-4"
          name="remarks"
          value={formData.remarks}
          onChange={handleInputChangeForField}
        />
      </div>

      <CModalFooter>
        <CButton color="secondary" onClick={AddDebit}>Add</CButton>
      </CModalFooter>

    </div>
  );
};

export default Debit;
