const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
    host:'bs26dwg0n7qy5knowtyq-mysql.services.clever-cloud.com',
    user: 'u6ajmjegz6hzvlwv',
    password: 'RelRX4BTaRhHTxJNIcTj',
    database: 'bs26dwg0n7qy5knowtyq',
});

db.connect(err => {
    if (err) return console.error('Error connecting to MySQL:', err);
    console.log('Connected to MySQL');
});


//Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (error, results) => {
        if (error) {
          console.error('Error authenticating user:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          if (results.length > 0) {
            // User authenticated successfully
            res.status(200).json({ message: 'Login successful', userType: results[0].userType });
          } else {
            // Invalid username or password
            res.status(401).json({ message: 'Invalid username or password' });
          }
        }
      }
    );
  });

// Route to add a new book
app.post('/books', (req, res) => {
    const { name, author, publishingYear, copiesAvailable, language } = req.body;
  
    db.query(
      'INSERT INTO books (name, author, publishing_year, copies_available, language) VALUES (?, ?, ?, ?, ?)',
      [name, author, publishingYear, copiesAvailable, language],
      (error, result) => {
        if (error) {
          console.error('Error adding book:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          console.log('Book added successfully');
          res.status(201).json({ message: 'Book added successfully' });
        }
      }
    );
  });
  
  // Route to search books
  app.get('/books', (req, res) => {
    const { query } = req.query;
  
    db.query(
      'SELECT * FROM books WHERE name LIKE ? OR author LIKE ? OR publishing_year LIKE ? OR copies_available LIKE ? OR language LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
      (error, results) => {
        if (error) {
          console.error('Error searching books:', error);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  
  // Route to fetch all books
  app.get('/books/all', (req, res) => {
    db.query('SELECT * FROM books', (error, results) => {
      if (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });  
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });