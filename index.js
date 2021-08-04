const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const pg = require('pg');

const pool = new pg.Pool({
    host: '192.168.1.193',
    port: '5432',
    user: 'quotes',
    password: 'yippy',
    database: 'dbo.quotes'
});

const app = express();

app.use(bodyparser.json());

// Serve the static files from the React app

pool.connect((err) => {
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

        pool.query(`SELECT * FROM tbl_quotes WHERE id=${quoteId}`, (err, rows) => {

            if (!err) {
                response.json(rows.rows);
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

        pool.query(`SELECT * FROM tbl_quotes WHERE author='${authorName}'`, (err, rows) => {

            if (!err) {
                response.json(rows.rows);
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

    pool.query('SELECT * FROM tbl_quotes;', (err, res) => {
        if (res!==undefined) {
            response.send(res.rows);
        }
        else {
            console.log("Postgres error position: ", err.position);
            console.log(err);

            response.send(404);
        }
    });
});

app.post('/api/quotes', (request, response) => {

    let quoteAddition = request.body;

    console.log(`Adding Quote: ${quoteAddition.quote}`);
    console.log(`Adding Author: ${quoteAddition.author}`);

    pool.query(`INSERT INTO tbl_quotes(timestamp, author, quote) VALUES ('${new Date().toISOString()}', '${quoteAddition.author}', '${quoteAddition.quote}');`);

    response.status(200).send("done");

});

app.delete('/api/quotes/:id', (request, response) => {

    var quoteId = request.params.id;

    if (quoteId) {

        console.log(`deleting quote ID=${quoteId}`);

        pool.query(`DELETE FROM tbl_quotes WHERE ID=${quoteId}`, (err, rows, fields) => {
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
