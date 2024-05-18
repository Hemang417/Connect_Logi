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
                    <div className='createjob-button'>
                        <CPopover content="Create new line of business" trigger={['hover', 'focus']}>
                            <CButton color="primary" type="submit" onClick={() => setVisible(true)} style={{marginTop: 20}}>+</CButton>
                        </CPopover>
                    </div>
                </CCardBody>
            </div>
            <div>
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
                                    <CPopover content="Edit Line of Business" trigger={['hover', 'focus']}>
                                        <CButton onClick={() => handleEdit(index)}>Edit</CButton>
                                    </CPopover>
                                    <CPopover content="Delete Line of Business" trigger={['hover', 'focus']}>
                                        <CButton onClick={() => handleDelete(index)}>Delete</CButton>
                                    </CPopover>
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
                                style={{ width: '100%' }}
                            />
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>{lob.transportmode ? lob.transportmode : 'Select transport mode'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    <CDropdownItem onClick={() => setLob({ ...lob, transportmode: 'Air' })}>Air</CDropdownItem>
                                    <CDropdownItem onClick={() => setLob({ ...lob, transportmode: 'Sea' })}>Sea</CDropdownItem>
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
