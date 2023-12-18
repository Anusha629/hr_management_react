import './App.css'; 

import Nav from './components/Header/index.js';
import Home from './components/Home/homepage.js';
import Employees from './components/Employees/employeespage.js';
import About from './components/About/aboutpage.js';

import { Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Nav />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
      
    </div>
  );
}

export default App;




