import React, { useState, useEffect } from 'react';
import {
    CCardBody,
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CDropdown,
    CPopover
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Lob = () => {
    const [lobdata, setLobdata] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedLob, setSelectedLob] = useState(null);
    const [lob, setLob] = useState({
        lobname: '',
        transportmode: '' // Added transportmode field
    });

    const fetchLOBdata = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getlob', {
                params: {
                    orgcode: localStorage.getItem('orgcode'),
                    orgname: localStorage.getItem('orgname')
                }
            });
            setLobdata(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLOBdata();
    }, []);

    const handleEdit = (index) => {
        const selectedLineOfBusiness = lobdata[index];
        setSelectedLob(selectedLineOfBusiness);
        // Set lob state including lobname and transportmode
        setLob({
            lobname: selectedLineOfBusiness.lobname,
            transportmode: selectedLineOfBusiness.transportmode
        });
        setVisible(true);

    };


    const handleDelete = async (index) => {
        try {
            const lobIdToDelete = lobdata[index].id;
            const deletedRow = await axios.delete('http://localhost:5000/deletelob', {
                data: {
                    id: lobIdToDelete
                }
            });

            if (deletedRow.status === 200) {
                fetchLOBdata();
                toast.success(`Line of business deleted successfully`)
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while deleting Line of Business');
        }
    };

    const handleUpdate = async () => {
        try {

            const updatedData = await axios.put('http://localhost:5000/updatelob', {
                id: selectedLob.id,
                lobname: selectedLob.lobname,
                transportmode: selectedLob.transportmode // Include transportmode in update
            });
            if (updatedData.status === 200) {
                fetchLOBdata();
                setLob({
                    lobname: '',
                    transportmode: ''
                });
                setVisible(false);
                toast.success('Line of business updated successfully');
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating Line of Business');
        }
    };

    const handleChange = (e) => {
        setLob({ ...lob, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/storelob', {
                lobname: lob.lobname,
                transportmode: lob.transportmode, // Include transportmode in submission
                orgname: localStorage.getItem('orgname'),
                orgcode: localStorage.getItem('orgcode')
            });
            toast.success('Line of business added successfully');
            setVisible(false);
            fetchLOBdata();

            setLob({
                lobname: '',
                transportmode: '' // Clear transportmode field after submission
            });


        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    return (
        <div>
            <div>
                <CCardBody className='button-div'>
                    {/* ADD BUTTON */}
                    <svg className='addbutton-lob' type="submit" onClick={() => setVisible(true)} style={{ marginTop: 20 }} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                    </svg>
                    {/* ADD BUTTON ENDS*/}
                </CCardBody>
            </div>
            <div className='lob-table'>
                <CTable hover responsive striped>
                    <CTableHead>
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col">Line of Business</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {lobdata.length > 0 ? (
                            lobdata.map((row, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{row.lobname}</CTableDataCell>
                                    <CTableDataCell>
                                        {/* EDIT BUTTON */}
                                        <svg className='editbutton-lob' onClick={() => handleEdit(index)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50">
                                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                                        </svg>
                                        {/* EDIT BUTTON ENDS*/}

                                        {/* DELETE BUTTON */}
                                        <img className='delete-button-approver-1' onClick={() => handleDelete(index)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                                        {/* DELETE BUTTON ENDS*/}

                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="3">No Line of Business data available</CTableDataCell>
                            </CTableRow>
                        )}
                    </CTableBody>
                </CTable>



                <CModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    aria-labelledby="LiveDemoExampleLabel"
                >
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle id="LiveDemoExampleLabel">
                            {selectedLob ? 'Edit Line of Business' : 'Add Line of Business'}
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div>
                        <label><h6>Name LOB</h6></label>
                            <input 
                                type='text'
                                name='lobname'
                                value={selectedLob ? selectedLob.lobname : lob.lobname}
                                onChange={(e) => {
                                    if (selectedLob) {
                                        setSelectedLob({ ...selectedLob, lobname: e.target.value });
                                    } else {
                                        setLob({ ...lob, lobname: e.target.value });
                                    }
                                }}
                                style={{ width: '75%', marginLeft: '2%'}}
                            />
                            <CDropdown className='lob-addlob-dropdown mt-2'>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>{lob.transportmode ? lob.transportmode : 'Select Transport Mode'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4 lob-addlob-dropdown">
                                    <CDropdownItem className='lob-addlob-dropdown-1' onClick={() => setLob({ ...lob, transportmode: 'Air' })}>Air</CDropdownItem>
                                    <CDropdownItem className='lob-addlob-dropdown-1' onClick={() => setLob({ ...lob, transportmode: 'Sea' })}>Sea</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => {
                            setVisible(false);

                            setLob({
                                lobname: '',
                                transportmode: ''
                            });
                        }}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={selectedLob ? handleUpdate : handleSubmit}>
                            {selectedLob ? 'Save changes' : 'Create'}
                        </CButton>
                    </CModalFooter>
                </CModal>
            </div>

        </div>
    );
};

export default Lob;
