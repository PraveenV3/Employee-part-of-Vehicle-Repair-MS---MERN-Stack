import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './supply/Home';

import ManageEmployees from './supply/ManageEmployees';



import './App.css'; // Assuming your CSS file is correctly placed

function App() {
  return (
    <Router>
      <div className="App">
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage-employees" element={<ManageEmployees />} /> 
          
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
