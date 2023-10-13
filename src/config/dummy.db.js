// dummy-database.js
const sqlite3 = require('sqlite3').verbose();

// Create or open an SQLite database file (e.g., dummy.db)
const db = new sqlite3.Database('./config/dummy.db');

// Create a table for storing dummy data
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);

    // Insert some dummy data
    const insertDummyData = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
    insertDummyData.run('john_doe', 'john@example.com');
    insertDummyData.run('jane_doe', 'jane@example.com');
    insertDummyData.finalize();

    console.log('Dummy database initialized.');
});

module.exports = db;