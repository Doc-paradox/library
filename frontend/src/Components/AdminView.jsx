import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './AdminView.css';

const AdminView = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    publishingYear: '',
    copiesAvailable: '',
    language: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('userType');

    if (userType === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleAddBook = async () => {
    try {
      const response = await axios.post('https://library-vm5i.onrender.com/books', newBook);
      console.log('Book added successfully:', response.data);
      setNewBook({
        name: '',
        author: '',
        publishingYear: '',
        copiesAvailable: '',
        language: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h2>Admin View</h2>
      <input
        type="text"
        placeholder="Book Name"
        value={newBook.name}
        onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <input
        type="number"
        placeholder="Publishing Year"
        value={newBook.publishingYear}
        onChange={(e) => setNewBook({ ...newBook, publishingYear: e.target.value })}
      />
      <input
        type="number"
        placeholder="Copies Available"
        value={newBook.copiesAvailable}
        onChange={(e) => setNewBook({ ...newBook, copiesAvailable: e.target.value })}
      />
      <input
        type="text"
        placeholder="Language"
        value={newBook.language}
        onChange={(e) => setNewBook({ ...newBook, language: e.target.value })}
      />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default AdminView;