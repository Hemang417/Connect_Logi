import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';

const BranchAccess = () => {
    const [allBranches, setAllBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);

    const fetchOwnBranches = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
                params: {
                    orgname: localStorage.getItem('orgname'),
                    orgcode: localStorage.getItem('orgcode')
                }
            });
            setAllBranches(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOwnBranches();
        // Fetch selected branches from the server and set them in the state
        const fetchSelectedBranches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fetchExistingBranches', {
                    params: {
                        username: localStorage.getItem('empnameforaccess'),
                        orgname: localStorage.getItem('orgname'),
                        orgcode: localStorage.getItem('orgcode')
                    }
                });
                setSelectedBranches(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSelectedBranches();
    }, []);

    const handleCheckboxChange = async (e, branch) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            // Add the branch to the selectedBranches state
            setSelectedBranches([...selectedBranches, branch]);
            // Send a POST request to insert the branch data
            try {
                await axios.post('http://localhost:5000/insertBranchaccess', { branch: branch, username: localStorage.getItem('empnameforaccess') });
            } catch (error) {
                console.log(error);
            }
        } else {
            // Remove the branch from the selectedBranches state
            const updatedSelectedBranches = selectedBranches.filter(selected => selected.branchcode !== branch.branchcode);
            setSelectedBranches(updatedSelectedBranches);
            // Send a DELETE request to remove the branch data
            try {
                await axios.delete(`http://localhost:5000/deleteBranchaccess`, { data: { branchcode: branch.branchcode } });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <CTable hover responsive striped className=''>
            <CTableHead>
                <CTableRow color='dark'>
                    <CTableHeaderCell scope="col">Branch Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Access</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {allBranches && allBranches.map((branch, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{branch.branchcode}</CTableDataCell>
                        <CTableDataCell>{branch.ownbranchname}</CTableDataCell>
                        <CTableDataCell>
                            <input
                                type="checkbox"
                                className="imp-access-checkbox"
                                checked={selectedBranches.some(selected => selected.branchcode === branch.branchcode)}
                                onChange={(e) => handleCheckboxChange(e, branch)}
                            />
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};

export default BranchAccess;
