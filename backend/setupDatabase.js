const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./portfolio.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS portfolio_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT
  )`);

  // Delete existing data
  db.run('DELETE FROM portfolio_items', (err) => {
    if (err) {
      console.error('Error deleting data', err.message);
      return;
    }

    // Insert new data
    db.run(`INSERT INTO portfolio_items (title, description, image) VALUES
      ('Portfolio Item 1', 'Description of the first portfolio item.', 'logo192.png'),
      ('Portfolio Item 2', 'Description of the second portfolio item.', 'logo192.png'),
      ('Portfolio Item 3', 'Description of the third portfolio item.', 'logo192.png')
    `, (err) => {
      if (err) {
        console.error('Error inserting data', err.message);
      } else {
        console.log('Sample data inserted successfully.');
      }
    });
  });
});
