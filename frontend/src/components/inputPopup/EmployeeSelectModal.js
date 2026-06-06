import React, { useState } from 'react';

const EmployeeSelectModal = ({ employees, onSelect, onClose, onCreateGroup }) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [step, setStep] = useState(1); // 1: Select employees, 2: Enter group name
    const [groupName, setGroupName] = useState('');

    const handleEmployeeToggle = (employee) => {
        setSelectedEmployees(prev => {
            const isSelected = prev.find(emp => emp.id === employee.id);
            if (isSelected) {
                return prev.filter(emp => emp.id !== employee.id);
            } else {
                return [...prev, employee];
            }
        });
    };

    const handleNext = () => {
        if (selectedEmployees.length === 0) {
            alert('Please select at least one employee');
            return;
        }
        setStep(2);
    };

    const handleCreateGroup = () => {
        if (!groupName.trim()) {
            alert('Please enter a group name');
            return;
        }
        onCreateGroup(groupName.trim(), selectedEmployees);
        handleClose();
    };

    const handleClose = () => {
        setSelectedEmployees([]);
        setStep(1);
        setGroupName('');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {step === 1 ? (
                    <>
                        <h6>Select Employees for Group</h6>
                        <div className="employee-list">
                            {Array.isArray(employees) && employees.length > 0 ? (
                                employees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        className={`employee-item ${selectedEmployees.find(emp => emp.id === employee.id) ? 'selected' : ''}`}
                                        onClick={() => handleEmployeeToggle(employee)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedEmployees.find(emp => emp.id === employee.id) ? true : false}
                                            onChange={() => { }} // Handled by onClick
                                            style={{ marginRight: '10px' }}
                                        />
                                        <span>{employee.fullname}</span>
                                    </div>
                                ))
                            ) : (
                                <div>No employees available</div>
                            )}
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleClose}>Cancel</button>
                            <button onClick={handleNext} disabled={selectedEmployees.length === 0}>
                                Next ({selectedEmployees.length} selected)
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h6>Enter Group Name</h6>
                        <div className="selected-members">
                            <p>Selected members: {selectedEmployees.map(emp => emp.fullname).join(', ')}</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Enter group name..."
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
                        />
                        <div className="modal-buttons">
                            <button onClick={() => setStep(1)}>Back</button>
                            <button onClick={handleCreateGroup}>Create Group</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmployeeSelectModal;