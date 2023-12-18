import React, { useState, useEffect } from "react";
import "./Style.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});

  const fetchUserData = async (empId) => {
    const response = await fetch(`http://localhost:5000/employees/${empId}`);
    const jsonData = await response.json();
    console.log(jsonData);
    console.log("function called");

    setEmployeeDetails(jsonData);
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/employees");
    const jsonData = await response.json();

    setEmployees(jsonData);
    console.log(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="employees-list-details-container">
        <div className="employee-list-container ">
          <h3 className="">List of Employees</h3>
          {employees.map((data, index) => (
            <p
              role="button"
              onClick={() => {
                fetchUserData(data.id);
              }}
              key={index}
            >
              {index + 1}. {data.fname + " " + data.lname}{" "}
            </p>
          ))}
        </div>
        <div className="employee-details-container ">
          {Object.keys(employeeDetails).length > 0 && (
            <EmployeeDetails
              data={employeeDetails}
              fetchUserData={fetchUserData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const EmployeeDetails = ({ data, fetchUserData }) => {
  const [leaveDetails, setLeaveDetails] = useState({});

  const handleLeaveDetailsChange = (e) => {
    setLeaveDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function onhandleSubmit() {
  const formData = new FormData();
  formData.append("leave_date", leaveDetails.leave_date);
  formData.append("leave_reason", leaveDetails.leave_reason);
  console.log(leaveDetails);

  try {
    const response = await fetch(
      `http://localhost:5000/leaves/${data.id}`,
      {
        method: "POST",
        body: formData,
      }
    );
    console.log("Server response:", response);

    if (response.status === 200) {
      const jsonData = await response.json();
      console.log(jsonData.message);

      setLeaveDetails({
        leave_date: "", leave_reason: "",
      });

      await fetchUserData(data.id);

      alert("Leave submitted successfully!");
    } else {
      console.log("Something went wrong");
      alert(" Please try again.");
    }
  } catch (e) {
    console.log(e);
    alert("An error occurred.");
  }
}  

  return (
    <div className="employees-details-sub-container">
      <h4 className="employee-name">
        {data.fname} {data.lname}
      </h4>
      <div className="">
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
      </div>
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
              onChange={(e) => {
                handleLeaveDetailsChange(e);
              }}
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
              onChange={(e) => {
                handleLeaveDetailsChange(e);
              }}
            />
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
