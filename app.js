// Load the app server using express
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('short'));

function getConnection() {
    return  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'userDB'
    });
}

app.post('/user_create', (req, res) => {
    console.log('First Name:', req.body.create_first_name);
    const firstName = req.body.create_first_name;
    const lastName = req.body.create_last_name;

    const queryString = "INSERT into Users (firstName, lastName) values (?, ?)";
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if(err) {
            console.log('Failed to add User');
            res.sendStatus(500);
            res.end();
        } else {
            console.log('Inserted a new record with id:', results.id);
        }
    })
    res.end();
});

app.get('/user/:id', (req, res) => {
    console.log('Fetching user with Id:', req.params.id);
    const connection = getConnection()
    const userId = req.params.id;
    const queryString = "SELECT * FROM USERS WHERE id = ?";
    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err) {
            console.log('Failed to query for user', err);
            res.sendStatus(500);
            res.end();
        } else {
            res.json(rows);
        }
    })
});

app.get("/", (req, res) => {
    console.log('Responding to root route');
    res.send('Hello From ROOOT!!!');
});

app.get('/users', (req, res) => {
    let user = {
        firstName: 'Mohammed',
        lastName: 'Niyas'
    };
    res.json(user);
});
// localhost:3000
app.listen(3000, () => {
    console.log('Server is up and listening on port:3000');
})