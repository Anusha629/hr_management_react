import './Style.css';


import React, { useState, useEffect } from 'react';
export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const fetchData = async () => {
  const response = await fetch("http://localhost:5000/employees");
        const jsonData = await response.json();
        setEmployees(() => jsonData);
    console.log(employees)
    };
    useEffect(() => {
        fetchData()
    },)
    return (
        <>
            <h3 className="list-of-employees">List of Employees</h3>
            <div className="parent">
                {employees.map(data => <p>{data.fname} { data.lname}</p>)}
            </div>
            </>    )
}