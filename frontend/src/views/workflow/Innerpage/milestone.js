import React, { useEffect, useState } from "react";
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
    CDropdown
} from '@coreui/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MileStone = () => {

    const [visible, setVisible] = useState(false);
    const [alllineofbusinesses, setalllineofbusinesses] = useState([]);
    const [allbranches, setallbranches] = useState([]);
    const [milestonedata, setmilestonedata] = useState({
        milestonename: '',
        lob: '',
        ownbranchname: ''
    });
    const [allmilestones, setallmilestones] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const getAllBranches = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setallbranches(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllLineofBusinesses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getlob', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                }
            });
            setalllineofbusinesses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMilestones = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getmilestones', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            });
            setallmilestones(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllLineofBusinesses();
        getAllBranches();
        getMilestones();
    }, []);

    const handleSubmit = async () => {
        try {
            let response;
            if (selectedMilestone) {
                // Update existing milestone
                response = await axios.put(`http://localhost:5000/updatemilestone`, {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    milestonename: milestonedata.milestonename,
                    lob: milestonedata.lob,
                    ownbranchname: milestonedata.ownbranchname,
                    id: selectedMilestone.id
                });
    
                if (response.status === 200) {
                    // Update state with edited milestone data
                    const updatedMilestones = allmilestones.map(milestone => {
                        if (milestone.id === selectedMilestone.id) {
                            return {
                                ...milestone,
                                milestonename: milestonedata.milestonename,
                                lobname: milestonedata.lob,
                                ownbranchname: milestonedata.ownbranchname
                            };
                        }
                        return milestone;
                    });
                    setallmilestones(updatedMilestones);
    
                    // Close modal
                    setVisible(false);
    
                    // Clear form data and selected milestone
                    setmilestonedata({ milestonename: '', lob: '', ownbranchname: '' });
                    setSelectedMilestone(null);
                }
            } else {
                // Add new milestone
                response = await axios.post('http://localhost:5000/addmilestone', {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode'),
                    milestonename: milestonedata.milestonename,
                    lob: milestonedata.lob,
                    ownbranchname: milestonedata.ownbranchname
                });
    
                if (response.status === 200) {
                    // Fetch updated milestones
                    getMilestones();
    
                    // Close modal
                    setVisible(false);
    
                    // Clear form data and selected milestone
                    setmilestonedata({ milestonename: '', lob: '', ownbranchname: '' });
                    setSelectedMilestone(null);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleDelete = async (index) => {
        try {
            const data = allmilestones[index];
            const response = await axios.delete('http://localhost:5000/deletemilestone', {
                data: {
                    id: data.id
                }
            });
            if (response.status === 200) {
                toast.success('Milestone deleted successfully');
                getMilestones();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (index) => {
        const milestone = allmilestones[index];
        setSelectedMilestone(milestone);
        setmilestonedata({
            milestonename: milestone.milestonename,
            lob: milestone.lobname,
            ownbranchname: milestone.ownbranchname
        });

        setVisible(true); // Open modal
    };

    return (
        <div>

            <div>
                <CTable hover responsive striped>
                    <CTableHead>
                        <CTableRow color='dark'>
                            <CTableHeaderCell scope="col">MileStone</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Line of Business</CTableHeaderCell>
                            <CTableHeaderCell scope="col">BranchName</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {allmilestones && allmilestones.map((milestone, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{milestone.milestonename}</CTableDataCell>
                                <CTableDataCell>{milestone.lobname}</CTableDataCell>
                                <CTableDataCell>{milestone.ownbranchname}</CTableDataCell>
                                <CButton onClick={() => handleEdit(index)}>Edit</CButton>
                                <CButton onClick={() => handleDelete(index)}>Delete</CButton>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>

            <div>
                <CCardBody className='button-div'>
                    <div className='createjob-button'>
                        <CButton color="primary" type="submit" onClick={() => setVisible(true)}>+</CButton>
                    </div>
                </CCardBody>
            </div>

            <CModal
                visible={visible}
                onClose={() => {
                    setVisible(false);
                    setmilestonedata({ milestonename: '', lob: '', ownbranchname: '' }); // Empty form data
                    setSelectedMilestone(null); // Clear selected milestone
                }}
                aria-labelledby="LiveDemoExampleLabel"
                className='workflow-modal custom-modal '
                size="l"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">
                        {selectedMilestone ? 'Edit MileStone' : 'Add MileStone'}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <div>
                            <label htmlFor="MilestoneName" className='text-field-3'>Milestone Name</label>
                            <input type="text" placeholder="" className='text-field-4' value={milestonedata.milestonename} onChange={(e) => setmilestonedata({ ...milestonedata, milestonename: e.target.value })} />
                        </div>

                        <div>
                            <label htmlFor="Branches" className='text-field-3'>Branches</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>{milestonedata.ownbranchname ? milestonedata.ownbranchname : 'All'}</CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    {allbranches && allbranches.map((item, index) => (
                                        <CDropdownItem key={index} onClick={() => setmilestonedata({ ...milestonedata, ownbranchname: item.ownbranchname })}>
                                            {item.ownbranchname}
                                        </CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>

                        <div>
                            <label htmlFor="LineOfBusiness" className='text-field-3'>Line of Business</label>
                            <CDropdown>
                                <CDropdownToggle className="dropdown-btn" color='secondary'>
                                    {milestonedata.lob ? milestonedata.lob : 'All'}
                                </CDropdownToggle>
                                <CDropdownMenu className="text-field-4">
                                    {alllineofbusinesses && alllineofbusinesses.map((item, index) => (
                                        <CDropdownItem key={index} onClick={() => setmilestonedata({ ...milestonedata, lob: item.lobname })}>
                                            {item.lobname}
                                        </CDropdownItem>
                                    ))}
                                </CDropdownMenu>
                            </CDropdown>
                        </div>
                    </div>
                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={() => {
                        setVisible(false);
                        setmilestonedata({ milestonename: '', lob: '', ownbranchname: '' }); // Empty form data
                        setSelectedMilestone(null); // Clear selected milestone
                    }}>
                        Close
                    </CButton>
                    {selectedMilestone ? (
                        <CButton color="primary" onClick={handleSubmit}>
                            Update MileStone
                        </CButton>
                    ) : (
                        <CButton color="primary" onClick={handleSubmit}>
                            Create MileStone
                        </CButton>
                    )}
                </CModalFooter>
            </CModal>

        </div>
    )
}

export default MileStone;
