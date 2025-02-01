import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TuneUpLayout from './TuneUpLayout';
import SignUp from './components/authentication/signup';
import Login from './components/authentication/login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main music player route */}
        <Route path="/" element={<TuneUpLayout />} />

        {/* SignUp route */}
        <Route path="/SignUp" element={<SignUp />} />

        {/* Login route */}
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
