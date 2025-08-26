import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from './Components/Portfolio';
import Admin from './Components/Admin';



function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
