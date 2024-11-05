const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db.sqlite3', (err) => {
    if (err) {
        console.error('Database opening error: ', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                                    oid TEXT, 
                                                    name TEXT, 
                                                    comment TEXT)`, 
        (err) => {
            if (err) {
                console.error('Table creation error: ', err.message);
            } else {
                console.log('Table created.');

                const insert = 'INSERT INTO comments (oid, name, comment) VALUES (?, ?, ?)';
                db.run(insert, ['object1', 'davi', 'this is a comment']);
                db.run(insert, ['object2', 'davi', 'this is another comment']);
            }
        });
    }
});

module.exports = db;