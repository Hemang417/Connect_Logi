import React, { useState, useEffect } from 'react';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImpAccess = () => {
  const [allAccessData, setAllAccessData] = useState([]);
  const [accessChecked, setAccessChecked] = useState({});
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllAccess', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode')
        }
      });
      setAllAccessData(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  //  async function prefillcheckbox(){
  //   const accessedRows = JSON.parse(localStorage.getItem('accessedRows'));
  //   if (accessedRows && allAccessData.length > 0) {
  //     const initialCheckedState = {};
  //     allAccessData.forEach(item => {
  //       if (accessedRows.some(row => row.value === item.tatimpcolumn)) {
  //         initialCheckedState[item.tatimpcolumn] = true;
  //       } else {
  //         initialCheckedState[item.tatimpcolumn] = false;
  //       }
  //     });
  //     setAccessChecked(initialCheckedState);
  //   }
  //  }



  useEffect(() => {
    const prefillCheckbox = () => {
      const accessedRows = JSON.parse(localStorage.getItem('accessedRows'));
      if (Array.isArray(accessedRows) && accessedRows.length > 0 && allAccessData.length > 0) {
        const initialCheckedState = {};
        allAccessData.forEach(item => {
          initialCheckedState[item.tatimpcolumn] = accessedRows.some(row => row.value === item.tatimpcolumn);
        });
        setAccessChecked(initialCheckedState);
      }
    };
    prefillCheckbox();
  }, [allAccessData]);





  useEffect(() => {
    fetchAll();
  }, []);




  const handleAccessChange = async (e) => {
    const { name, checked } = e.target;
    setAccessChecked((prevChecked) => ({
      ...prevChecked,
      [name]: checked
    }));

    try {
      ;
      await axios.post('http://localhost:5000/applyAccess', {
        accessChecked: name,
        username: localStorage.getItem('empnameforaccess')
      });

      if (!checked) {
        await axios.delete('http://localhost:5000/removeAccess', {
          data: {
            accessChecked: name,
            username: localStorage.getItem('empnameforaccess')
          }
        });
      }

      // if (!checked && accessChecked[name]) {
      //   // If the checkbox was previously checked (prefilled) and is now unchecked, send a backend request
      //   await axios.post('http://localhost:5000/removeAccess', {
      //     accessChecked: name,
      //     username: localStorage.getItem('empnameforaccess')
      //   });
      // }




      // Handle success, navigate or show a success message
    } catch (error) {
      console.log(error);
    }
  };




  //   useEffect(() => {
  //     prefillcheckbox();
  //   }, [allAccessData]);


async function redirect(){
  navigate('/userlist')
}



  return (
    <div>
      <CTable striped responsive hover>

        <CTableBody>
          {allAccessData && allAccessData.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{item.tatimpcolumn}</CTableDataCell>
              <CTableDataCell>
                <input
                  type="checkbox"
                  className="imp-access-checkbox"
                  checked={accessChecked[item.tatimpcolumn] || false}
                  onChange={handleAccessChange}
                  name={item.tatimpcolumn}
                />
              </CTableDataCell>
              {/* <CTableDataCell>
                
              </CTableDataCell> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CButton color="primary" onClick={redirect}>
        Apply Access
      </CButton>
    </div>
  );
};

export default ImpAccess;
