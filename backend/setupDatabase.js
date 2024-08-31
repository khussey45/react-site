const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./portfolio.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS portfolio_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT
  )`);

  db.run(`INSERT INTO portfolio_items (title, description, image) VALUES
    ('Portfolio Item 1', 'Description of the first portfolio item.', '/images/item1.png'),
    ('Portfolio Item 2', 'Description of the second portfolio item.', '/images/item2.png'),
    ('Portfolio Item 3', 'Description of the third portfolio item.', '/images/item3.png')
  `);
});

db.close();
