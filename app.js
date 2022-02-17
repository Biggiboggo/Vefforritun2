const express = require('express');
const app = express();
const mysql = require('mysql');

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'ba4115f5147953',
    password: '3ed7ed58',
    database: 'heroku_e53b2eccdc3deb6'
});

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    connection.query('SELECT * FROM users WHERE id = "1"', (error, rows) => {
        if(error) throw error;
    
        if(!error) {
            console.log(rows);
            res.render('pages/index', { rows });
        }
    });
})

app.listen(port)
console.log(`Server is listening on port ${port}`);