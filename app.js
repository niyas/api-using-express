// Load the app server using express
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('short'));

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