const express = require('express');
const api = express();
api.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
api.use(bodyParser.json());
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todo' //dont have this yet
   });

   try {
    connection.connect();
   } catch (e) {
    console.log('Oops. Connection to MySQL failed.');
    console.log(e);
   }

api.listen(3000, () => {
  console.log('API up and running!');
});

api.get('/', (req, res) => {
    console.log(req);
    res.send('Hello, world!');
});

api.post('/add', (req, res) => {
    console.log(req.body);
    
    connection.query('INSERT INTO tasks (description) VALUES (?)', [req.body.item], (error, results) => {
     if (error) return res.json({ error: error });
   connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
      if (error) return res.json({ error: error });
   console.log(results);
     });
    });
   });

