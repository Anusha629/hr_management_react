import React, { useState, useEffect } from "react";
import './Style.css'

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});

  const fetchUserData = async (empId) => {
    const response = await fetch(`http://localhost:5000/employees/${empId}`);
    const jsonData = await response.json();
    setEmployeeDetails(jsonData);
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/employees");
    const jsonData = await response.json();
    setEmployees(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {};

  return (
    <div className="main-container">
      <div className="employees-list-details-container">
        <div className="employee-list-container">
          <h3 className="">List of Employees</h3>
          {employees.map((data, index) => (
            <p role="button" onClick={() => {fetchUserData(data.id); }} key={index} >
              {index + 1}. {data.fname} {data.lname}{" "}
            </p>
          ))}
        </div>
        <div className="employee-details-container">
          {Object.keys(employeeDetails).length > 0 && (
            <EmployeeDetails data={employeeDetails} handleSubmit={handleSubmit} />)}
        </div>
      </div>
    </div>
  );
}

const EmployeeDetails = ({ data, handleSubmit }) => {
  const [leaveDetails, setLeaveDetails] = useState({ leave_date: '', leave_reason: '' });

  const handleLeaveDetailsChange = (e) => {
    setLeaveDetails((prev) => ({ ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onhandleSubmit = async () => { handleSubmit(); };

  return (
    <div className="employees-details-sub-container">
      <h4 className="employee-name">
        {data.fname} {data.lname}
      </h4>
      <div className="employee-details">
        <div className="details-key">
          <p> First Name</p>
          <p> Last Name</p>
          <p> Email</p>
          <p> Phone</p>
          <p> Leaves Taken</p>
          <p> Allowed Leaves</p>
          <p> Remaining Leaves</p>
        </div>
        <div className="details-value">
          <p> {data.fname}</p>
          <p>{data.lname} </p>
          <p>{data.email} </p>
          <p> {data.phone}</p>
          <p> {data.leave}</p>
          <p> {data.max_leaves}</p>
          <p>{data.remaining_leaves} </p>
        </div>
      </div>
      <div className="add-leave-container">
        <h4>Add Leave Details</h4>
        <form id="leaveForm" className="input-form">
          <div className="input-label">
            <label htmlFor="leave_date">Leave Date</label>
            <input value={leaveDetails.leave_date} type="date" id="leave_date" name="leave_date" onChange={(e) => { handleLeaveDetailsChange(e); }}/>
            <br />
            <br />
          </div>

          <div className="input-field">
            <label htmlFor="leave_reason">Leave Reason</label>
            <input value={leaveDetails.leave_reason} type="text" id="leave_reason" name="leave_reason" onChange={(e) => {handleLeaveDetailsChange(e); }}/>
            <br />
            <br />
          </div>
        </form>
        <button className="leave-submit-btn" onClick={onhandleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

