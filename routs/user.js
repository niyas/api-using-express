const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'userDB'
});

function getConnection() {
    return  pool;
}

 router.get('/messages', (req, res) => {
    console.log('Show some message')
    res.end();
})

router.get('/users', (req, res) => {
    console.log('Fetching user with Id:', req.params.id);
    const connection = getConnection()
    const queryString = "SELECT * FROM USERS";
    connection.query(queryString, (err, rows, fields) => {
        if(err) {
            console.log('Failed to query for user', err);
            res.sendStatus(500);
            res.end();
        } else {
            res.json(rows);
        }
    })
});

router.get('/user/:id', (req, res) => {
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


router.post('/user_create', (req, res) => {
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


module.exports = router;
