import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql';
import { listEvents } from './lib/db.js';

const app = express();

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'ba4115f5147953',
    password: '3ed7ed58',
    database: 'heroku_e53b2eccdc3deb6'
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    connection.query('SELECT * FROM events', (error, events) => {
        if(error) throw error;
    
        if(!error) {
            console.log(events);
            res.render('pages/index', { events });
        }
    });
});

app.get('/:slug', function(req, res) {
    connection.query('SELECT * FROM events WHERE slug = ? ',[req.params.slug], (error, events) => {
        var eventsID = 0;
        events.forEach((events)=> { 
            eventsID = events.id;
        }) 
        if(error) throw error;
    
        if(!error) {
            console.log(events);
            
            
            connection.query('SELECT * FROM signings WHERE event = ?',[eventsID], (error, signings) => {
                if(error) throw error;
            
                if(!error) {
                    console.log(events);
                    res.render('pages/event', { events, signings });
                }
            });
            console.log('asa')
        }
    });
});

app.post('/:slug', function(req, res) {
    const name = req.body.name;
    const comment = req.body.comment;
    const  eventId = req.body.id;
    var sql = `INSERT INTO signings(id, name, comment, event, created) VALUES (DEFAULT, ?, ?, ?, DEFAULT)`;
    const values = [name, comment, eventId];
    connection.query(sql, values, (error, result) => {
        if(error) throw error;

        if(!error) {
            return res.send('<p>Skráning móttekin!</p><br><a href="/">Til baka</a>');
        }
    });
});

app.get('/admin/login', function(req, res) {
    res.render('pages/admin/login')
});

app.post('/admin/login', function(req, res) {
    const password = req.body.password;
    const username = req.body.username;
    const comment = req.body.comment;
    const name = req.body.name;
    if(!!name) {
       var slug = name;
        slug = slug.replace(/^\s+|\s+$/g, '');
        slug = slug.toLowerCase();
        slug = slug.replace(/[^a-z0-9 -]/g, '');
        slug = slug.replace(/\s+/g, '-');
        slug = slug.replace(/-+/g, '-'); 
    }
    
    var sql = `INSERT INTO users(id, username, password) VALUES (DEFAULT, ?, ?)`;
    var sql2 = `INSERT INTO events(id, name, slug, description, created, updated) VALUES (DEFAULT, ?, ?, ?, DEFAULT, DEFAULT)`;
    const values = [username, password];
    const values2 = [name, slug, comment];
    console.log(username, password);
    if(username === "admin" && password === '123') {
      connection.query(sql, values, (error, result) => {
        if(error) throw error;

        if(!error) {
            console.log(result);
            connection.query('SELECT * FROM events', (error, events) => {
                if(error) throw error;
            
                if(!error) {
                    console.log(events);
                    res.render('pages/admin', { events });              }
            });
        }
      });  
    }
    if(!!name) {
        connection.query(sql2, values2, (error, result) => {
            if(error) throw error;
    
            if(!error) {
                console.log(result);
                connection.query('SELECT * FROM events', (error, events) => {
                    if(error) throw error;
                
                    if(!error) {
                        console.log(events);
                        res.render('pages/admin', { events });              }
                });
            }
          });
    }
});

app.get('/admin/', function(req, res) {
    connection.query('SELECT * FROM events', (error, events) => {
        if(error) throw error;
    
        if(!error) {
            console.log(events);
            res.render('pages/admin', { events });
        }
    });
});

app.post('/admin/', function(req, res) {
    
    const name = req.body.name;
    var slug =name;
    slug = slug.replace(/^\s+|\s+$/g, '');
    slug = slug.toLowerCase();
    slug = slug.replace(/[^a-z0-9 -]/g, '');
    slug = slug.replace(/\s+/g, '-');
    slug = slug.replace(/-+/g, '-');
    const description = req.body.comment;
    console.log(name);
    var sql = `INSERT INTO events(id, name, slug, description, created, updated) VALUES (DEFAULT, ?, ?, ?, DEFAULT, DEFAULT)`;
    const values = [name, slug, comment];
    connection.query(sql, values, (error, result) => {
        if(error) throw error;

        if(!error) {
            return res.send('<p>Viðburður skráður!</p><br><a href="/">Til baka</a>');
        }
    });
});

app.listen(port)
console.log(`Server is listening on port ${port}`);