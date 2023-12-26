import React, { useState, useEffect } from "react";
import "./Style.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchResult, setSearchResult] = useState([])
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetchData();
  }, []);


  const fetchUserData = async (empId) => {
    const response = await fetch(`http://localhost:5000/employees/${empId}`);
    const jsonData = await response.json();
    console.log(jsonData);

    setEmployeeDetails(() => jsonData);
  };
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/employees");
    const jsonData = await response.json();

    setEmployees(() => jsonData);
    console.log(employees);
  };
  
  return (
    <div className="main-container">
      <div className="employees-list-details-container">
        <div className="employee-list-container">
          <h3>List of Employees</h3>
          <SearchEmployee handleSearch={handleSearch} setSearchText={setSearchText} />
          {searchResult.length > 0 ? (
            searchResult.map((data, index) => (
              <p
                role="button"
                onClick={() => {
                  fetchUserData(data.id);
                }}
                key={index}
              >
                {index + 1}. {data.fname} {data.lname}
              </p>
            ))
          ) : !searchText ? (
            employees.map((data, index) => (
              <p
                role="button"
                onClick={() => {
                  fetchUserData(data.id);
                }}
                key={index}
              >
                {index + 1}. {data.fname} {data.lname}
              </p>
            ))
          ) : (
            <p>No employee found</p>
          )}
        </div>
        <div className="employee-details-container">
          {Object.keys(employeeDetails).length > 0 && (
            <EmployeeDetails data={employeeDetails} fetchUserData={fetchUserData} />
          )}
        </div>
      </div>
    </div>
  );
  
  function handleSearch(searchText) {
    const filteredData = employees.filter((data) => (data.fname + " " + data.lname).toLowerCase().includes(searchText.toLowerCase()))
    setSearchResult(filteredData)
    console.log(searchResult)
  }
};

const EmployeeDetails = ({ data, fetchUserData }) => {
  const [leaveDetails, setLeaveDetails] = useState({});

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const formData = new FormData();
 
  async function onhandleSubmit() {
    formData.append("leave_date", leaveDetails.leave_date);
    formData.append("leave_reason", leaveDetails.leave_reason);
    console.log(leaveDetails);

    if (!leaveDetails.leave_reason || !leaveDetails.leave_date) {
      setErrorMessage('Please fill all fields')
      setTimeout(() => {
        setErrorMessage('');
      }, 2500);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/leaves/${data.id}`, {
        method: "POST",
        body: formData,
      });
        console.log("Server response:", response);
        
      console.log(leaveDetails)
      if (response.ok) {
        await fetchUserData(data.id)

        const jsonData = await response.json();
        setSuccessMessage(jsonData.message);

      } else {
        const errorData = await response.json()
        console.log(errorData.error)
        setErrorMessage(errorData.error);
        
        }

        setTimeout(() => {
         setSuccessMessage();
         }, 2500);
  
        setLeaveDetails({
          leave_date: "", leave_reason: "",
        });
       
      }
      
    catch (e) {
      console.log(e);
    }
  }
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
            <input
              value={leaveDetails.leave_date}
              type="date"
              id="leave_date"
              name="leave_date"
              onChange={(e) => {
                setErrorMessage('');
                setLeaveDetails((preve) => ({ ...preve, [e.target.name]: e.target.value, }));
              }} />
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
                setErrorMessage('');
                setLeaveDetails((preve) => ({ ...preve, [e.target.name]: e.target.value, }));
              }} />
            <br />
            <br />

            <div className="message-container">
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            
          </div>
        </form>
        <button className="leave-submit-btn" onClick={onhandleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};
function SearchEmployee({ handleSearch, setSearchText }) {
  const handleChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search Employees"
        onChange={handleChange}
      />
      <svg
        width="25px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
          fill="#0d2e4e8a"
        ></path>
      </svg>
    </div>
  );
}


