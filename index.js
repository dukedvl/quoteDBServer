const express = require('express');
const path= require('path');
const bodyparser= require('body-parser');

const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: '192.168.1.5',
    port: '34908',
     user:'userOne',
     password: 'yippy',
    database: 'TestStoreDB1'
});

const app = express();

app.use(bodyparser.json());

// Serve the static files from the React app
//app.use(path.join(__dirname, 'client/build'));

mysqlConnection.connect((err)=> {
    if(!err)
    {
        console.log('DB Connection Established Successfully');
    }
    else
    {
        console.log('DB Connection Failed!'+ JSON.stringify(err,undefined,2));
    }
    });

// An API endpoint that returns all quotes from the DB
app.get('/api/quotes', (request,response) => {

    console.log('in the get-handler');
    mysqlConnection.query('SELECT * FROM tbl_quotes', (err, rows, fields) => {
        if (!err)
        {
            response.json(rows);
        }
        else
        {
            console.log(err);
            response.json('yo');
        }
        });
});

app.post('/api/quotes', (request,response)=>{
    let quoteAddition= request.body;

    console.log('author: '+ quoteAddition.author);
    console.log('quote: '+ quoteAddition.quote);
    mysqlConnection.query('INSERT INTO tbl_quotes (timestamp, author,quote) VALUES (?, ?, ?) ',[new Date().toISOString().slice(0, 19).replace('T', ' '), quoteAddition.author, quoteAddition.quote]);
    response.status(200).send("done");

});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.send("hi");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('Express backend is listening on port ' + port);
