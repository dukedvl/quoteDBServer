const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: '192.168.1.5',
    port: '34908',
    user: 'userOne',
    password: 'yippy',
    database: 'TestStoreDB1'
});

const app = express();

app.use(bodyparser.json());

// Serve the static files from the React app

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB Connection Established Successfully');
    }
    else {
        console.log('DB Connection Failed!' + JSON.stringify(err, undefined, 2));
    }
});

// An API endpoint that returns all quotes by specific ID
app.get('/api/quotes/:id', (request, response) => {

    var quoteId = request.params.id;

    if (quoteId) {

        console.log(`Retrieving quote ID= ${quoteId}`);

        mysqlConnection.query(`SELECT * FROM tbl_quotes WHERE id=${quoteId}`, (err, rows) => {

            if (!err) {
                response.json(rows);
            }
            else {
                console.log(err);
                response.sendStatus(404);
            }
        })
    }
    else {
        response.sendStatus(404);
    }
});

app.get('/api/quotes/author/:author', (request, response) => {

    var authorName = request.params.author;

    if (authorName) {

        console.log(`Retrieving all authors Name=${authorName}`);

        mysqlConnection.query(`SELECT * FROM tbl_quotes WHERE author='${authorName}'`, (err, rows) => {

            if (!err) {
                response.json(rows);
            }
            else {
                console.log(err);
                response.sendStatus(404);
            }
        });
    }
});

app.get('/api/quotes/', (request, response) => {

    console.log('Retrieving all Quotes..(Get-Handler)');

    mysqlConnection.query('SELECT * FROM tbl_quotes', (err, rows) => {
        if (!err) {
            response.json(rows);
        }
        else {
            console.log(err);
            response.send(404);
        }
    });
});

app.post('/api/quotes', (request, response) => {

    let quoteAddition = request.body;

    console.log(`Adding Quote: ${quoteAddition.quote}`);
    console.log(`Adding Author: ${quoteAddition.author}`);

    mysqlConnection.query('INSERT INTO tbl_quotes (timestamp, author,quote) VALUES (?, ?, ?) ', [new Date().toISOString().slice(0, 19).replace('T', ' '), quoteAddition.author, quoteAddition.quote]);

    response.status(200).send("done");

});

app.delete('/api/quotes/:id', (request, response) => {

    var quoteId = request.params.id;

    if (quoteId) {

        console.log(`deleting quote ID=${quoteId}`);

        mysqlConnection.query(`DELETE FROM tbl_quotes WHERE ID=${quoteId}`, (err, rows, fields) => {
            if (!err) {
                response.sendStatus(200);
            }
            else {
                response.sendStatus(500);
            }
        });
    }
    else {
        response.sendStatus(403);
    }
});


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.send("hi");
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log('Express backend server is listening on port ' + port);
