// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminInterface from './components/AdminInterface';
import Dashboard from './components/Dashboard';
import Dashboard1 from './components/Dashboard1';
const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div>
        {user ? (
          <Routes>
            {/* Route for Admin Interface */}
            <Route path="/" element={<AdminInterface />} />
            
            {/* Route for Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-1" element={<Dashboard1 />} />
          </Routes>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </Router>
  );
};

export default App;
