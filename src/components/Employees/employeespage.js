import React, { useState, useEffect } from 'react';
import './Style.css'; 

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [employeeDetail, setEmployeeDetail] = useState({});

    const fetchData = async () => {
        const response = await fetch("http://localhost:5000/employees");
        const jsonData = await response.json();
        setEmployees(jsonData);};

    useEffect(() => {
        fetchData();}, []);

    const handleEmployeeClick = (index) => {
        setEmployeeDetail(employees[index]);};

    return (
        <>
            <h3 className="list-of-employees">List of Employees</h3>
            <div className="parent">
                {employees.map((data, index) => (
                    <p key={index} onClick={() => handleEmployeeClick(index)}>
                        {index + 1}. {data.fname} {data.lname}
                    </p>))}
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
                </div> )}
        </>
    );
}

