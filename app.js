// Load the app server using express
const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = require('./routs/user');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use(morgan('short'));


app.get("/", (req, res) => {
    console.log('Responding to root route');
    res.send('Hello From ROOOT!!!');
});


// localhost:3000
app.listen(3000, () => {
    console.log('Server is up and listening on port:3000');
})