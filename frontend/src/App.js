import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import UserView from './Components/UserView';
import AdminView from './Components/AdminView';

const App = () => {
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedToken = localStorage.getItem('token');

    if (storedUserType && storedToken) {
      setUserType(storedUserType);
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
