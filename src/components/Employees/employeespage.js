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
        setEmployeeDetail(employees[index]); };

    return (
        <>
            <h3 className="list-of-employees">List of Employees</h3>
            <div className="parent">
                {employees.map((data, index) => (
                    <p key={index} onClick={() => handleEmployeeClick(index)}>
                        {index + 1}. {data.fname} {data.lname}
                    </p> ))}
            </div>
            {employeeDetail && (
                <div>
                    <h1>{employeeDetail.fname}</h1>
                </div>
            )}
        </>
    );
}
