import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserView.css';

function UserView() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, []); // Fetch books on component mount

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/books/all');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleClickNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleClickPrev = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  let currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Filter books based on search query
  if (searchQuery.trim() !== '') {
    currentBooks = currentBooks.filter(book =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.publishing_year.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.copies_available.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.language.toString().includes(searchQuery)
    );
  }

  return (
    <div>
      <h2>User View</h2>
      <div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="book-list">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Publish Year</th>
              <th>Cpoies Available</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map(book => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.publishing_year}</td>
                <td>{book.copies_available}</td>
                <td>{book.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {currentPage > 1 && (
            <button onClick={handleClickPrev}>Previous</button>
          )}
          {currentBooks.length === itemsPerPage && (
            <button onClick={handleClickNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserView;
