import {  NavLink } from 'react-router-dom';
import logo from './logo.jpeg';
import './Style.css';

export default function Nav() {
    return (
      <nav className="nav ">
      <div className="logo d-flex align-items-center">
        <img src={logo} className="logo-image" alt="" />
          <NavLink to={'/'} className="logo-text">HRMS</NavLink>
          
        </div>       
      <div className="nav-links">          
        <NavLink to={'/employees'} className="employees">Employees</NavLink>
        <NavLink to={'/about'} className="about">About</NavLink>
      </div>
    </nav>
    )
  }

