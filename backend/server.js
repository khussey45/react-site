const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a table for portfolio items
db.run(`CREATE TABLE IF NOT EXISTS portfolio_items (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  image TEXT
)`);

// API route to get portfolio items
app.get('/api/portfolio', (req, res) => {
  db.all('SELECT * FROM portfolio_items', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ portfolio: rows });
  });
});

// API route to add a portfolio item
app.post('/api/portfolio', (req, res) => {
  const { title, description, image } = req.body;
  db.run(
    `INSERT INTO portfolio_items (title, description, image) VALUES (?, ?, ?)`,
    [title, description, image],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
