
// Je vais chercher le driver sqlite3 dans node_modules

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const dbfile = 'test.db';
const db = new sqlite3.Database(dbfile);

const app = express();
app.use(cors());

db.serialize(() => {

    if (fs.existsSync(dbfile)) {
        db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, price INTEGER, like BOOLEAN)');

        db.run('INSERT INTO products (name, price, like) VALUES (?, ?, ?)', 'PS4', 350, true);
        db.run('INSERT INTO products (name, price, like) VALUES (?, ?, ?)', 'Xbox', 280, false);
        db.run('INSERT INTO products (name, price, like) VALUES (?, ?, ?)', 'Switch', 300, false);
    };

    db.all('SELECT id, name, price, like FROM products', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });

    db.all('SELECT name FROM products', function (error, data) {
        if (!error) console.log(data);
        else console.log(error);
    });


});

app.get('/', function (request, response) {
    db.all("SELECT * FROM products", function (error, data) {
        response.send(data);

    });
});

app.listen(3000, function (error) {
    if (!error) console.log('listening at port 3000')
});