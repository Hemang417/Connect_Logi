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
    CDropdown,
    CPopover
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
            toast.error('Error deleting milestone');
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
                <CCardBody className='button-div'>
                    {/* ADD BUTTON */}
                    <svg className="milestone-worflow-addbutton" type="submit" onClick={() => setVisible(true)} style={{ marginTop: 20 }} width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C" />
                    </svg>
                    {/* ADD BUTTON ENDS*/}
                </CCardBody>
            </div>
            <div className="milestone-workflow-table">
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
                                <CTableDataCell>
                                        {/* EDIT BUTTON */}
                                        <svg className="editbutton-milestone-workflow" onClick={() => handleEdit(index)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50">
                                            <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
                                        </svg>
                                        {/* EDIT BUTTON ENDS*/}
                                        {/* DELETE BUTTON */}
                                        <img className="deletebutton-milestone-workflow" onClick={() => handleDelete(index)} width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/cancel.png" alt="cancel" />
                                        {/* DELETE BUTTON ENDS*/}
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
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
                    <CPopover content="Close Modal" trigger={['hover', 'focus']}>
                        <CButton color="secondary" onClick={() => {
                            setVisible(false);
                            setmilestonedata({ milestonename: '', lob: '', ownbranchname: '' }); // Empty form data
                            setSelectedMilestone(null); // Clear selected milestone
                        }}>
                            Close
                        </CButton>
                    </CPopover>
                    {selectedMilestone ? (
                        <CPopover content="Update milestone" trigger={['hover', 'focus']}>
                            <CButton color="primary" onClick={handleSubmit}>
                                Update MileStone
                            </CButton>
                        </CPopover>
                    ) : (
                        <CPopover content="Create new milestone" trigger={['hover', 'focus']}>
                            <CButton color="primary" onClick={handleSubmit}>
                                Create MileStone
                            </CButton>
                        </CPopover>
                    )}
                </CModalFooter>
            </CModal>

        </div>
    )
}

export default MileStone;
