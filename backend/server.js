const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', //vite
  credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 24*60*60*1000 },
  })
);

// Database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Game"
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// Post Log In
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    connection.query('SELECT * FROM account WHERE username = ?', [username], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ message: 'Error comparing passwords' });
          }

          if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.userId = results[0].id;
            console.log('Session userId:', req.session.userId);

            return res.status(200).json({ message: 'Login successful' });
          } else {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    });
  } else {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  console.log('Session in login:', req.session);
  

});


app.get('/api/profile', (req, res) => {
  console.log(req.session)
  const userId = req.session.userId
  console.log('userid =', userId)

  connection.query('SELECT * FROM account WHERE id = ?', [userId], (error, results) => {
    console.log('Database query results:', results);
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Database error' });
    }

    // If the query is successful, send the results back as JSON
    return res.status(200).json(results);
  });
});




//Post Sign Up
app.post('/register', (req, res) => {
  const { username, password, email, date_of_birth, sex, full_name, phone } = req.body;

  if (!username || !password || !email || !date_of_birth || !sex || !full_name || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const query = `
          INSERT INTO account (username, password, email, date_of_birth, sex, full_name, phone) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

    connection.query(
      query,
      [username, hashedPassword, email, date_of_birth, sex, full_name, phone],
      (err, results) => {
        if (err) {
          console.error('Error saving user to the database:', err);
          return res.status(500).json({ message: 'Database error.' });
        }

        res.status(200).json({ message: 'User registered successfully.' });
      }
    );
  });
});

// Start the server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






