import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://library-vm5i.onrender.com/login', {
        username,
        password,
      });

      // Handle successful login response
      console.log('Logged in as', response.data.userType);

      // Store user type and token in local storage
      localStorage.setItem('userType', response.data.userType);
      localStorage.setItem('token', response.data.token);

      // Display a success message
      setMessage('Logged in successfully');

      // Redirect to the original route after successful login
      const storedPath = localStorage.getItem('returnUrl');
      if (storedPath) {
        localStorage.removeItem('returnUrl');
        navigate(storedPath);
      } else {
        if (response.data.userType === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      setMessage('Login failed. Please check your username and password.');
    }
  };

  React.useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedToken = localStorage.getItem('token');

    if (storedUserType && storedToken) {
      // If there is a stored user token, redirect to the admin view or user view
      if (storedUserType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }

    // Clear the stored user type and token on logout
    return () => {
      localStorage.removeItem('userType');
      localStorage.removeItem('token');
    };
  }, [navigate]);

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div className="message">{message}</div>}
      <nav>
        <Link to="/">Logout</Link>
      </nav>
    </div>
  );
};

export default Login;