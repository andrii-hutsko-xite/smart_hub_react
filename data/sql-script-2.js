// Import Sqlite
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./main.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the main.db SQLite database.');
    }
});

const sql = `INSERT INTO users (email, password) VALUES ("test@mail.com", "test123")`;

db.all(sql, (err) => {
    if (err) {
        console.log(err.message);
    }
})

