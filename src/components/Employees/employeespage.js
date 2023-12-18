import React, { useState, useEffect } from 'react';
import './Style.css'; 

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [employeeDetail, setEmployeeDetail] = useState({});
    const [leaveDetails, setLeaveDetails] = useState({
        leave_date: '',
        leave_reason: '',});

    const fetchData = async () => {
        const response = await fetch("http://localhost:5000/employees");
        const jsonData = await response.json();
        setEmployees(jsonData); };

    useEffect(() => {
        fetchData(); }, []);

    const handleEmployeeClick = (index) => {
        setEmployeeDetail(employees[index]); };

    const handleLeaveDetailsChange = (e) => {
        setLeaveDetails((prev) => ({ ...prev,
            [e.target.name]: e.target.value,})); };

    const handleSubmitLeave = async () => {
       
            const response = await fetch(`http://localhost:5000/leaves/${employeeDetail.id}`, {
                method: "POST",
                body: JSON.stringify(leaveDetails),
                headers: {
                    'Content-Type': 'application/json'  } });
            if (response.status === 200) {
                const jsonData = await response.json();
                alert(jsonData.message);
                setLeaveDetails({ leave_date: '', leave_reason: '', });
            }
            else {
                 }   };

    return (
        <>
            <h3 className="list-of-employees">List of Employees</h3>
            <div className="parent">
                {employees.map((data, index) => (
                    <p key={index} onClick={() => handleEmployeeClick(index)}>
                        {index + 1}. {data.fname} {data.lname}
                    </p>
                ))}
            </div>
            {employeeDetail && (
                <div>
                    <div className="details-key">
                        <p>First Name</p>
                        <p>Last Name</p>
                        <p>Email</p>
                        <p>Phone</p>
                        <p>Leaves Taken</p>
                        <p>Allowed Leaves</p>
                        <p>Remaining Leaves</p>
                    </div>
                    <div className="details-value">
                        <p>{employeeDetail.fname}</p>
                        <p>{employeeDetail.lname}</p>
                        <p>{employeeDetail.email}</p>
                        <p>{employeeDetail.phone}</p>
                        <p>{employeeDetail.leave}</p>
                        <p>{employeeDetail.max_leaves}</p>
                        <p>{employeeDetail.remaining_leaves}</p>
                    </div>
                </div>
            )}

            <div className="add-leave-container">
                <h4>Add Leave Details</h4>
                <form id="leaveForm" className="input-form">
                    <div className="input-label">
                        <label htmlFor="leave_date">Leave Date</label>
                        <input
                            value={leaveDetails.leave_date}
                            type="date"
                            id="leave_date"
                            name="leave_date"
                            onChange={handleLeaveDetailsChange}
                        />
                        <br />
                        <br />
                    </div>

                    <div className="input-field">
                        <label htmlFor="leave_reason">Leave Reason</label>
                        <input
                            value={leaveDetails.leave_reason}
                            type="text"
                            id="leave_reason"
                            name="leave_reason"
                            onChange={handleLeaveDetailsChange}
                        />
                        <br />
                        <br />
                    </div>
                </form>
                <button className="submit-button" onClick={handleSubmitLeave}>
                    Submit
                </button>
            </div>
        </>
    );
}
