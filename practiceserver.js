const express = require('express');
const app = express();
const port = 5000;

const posts = require('./posts');
const loggerMiddleware = require('./loggerMiddleware.js');

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users/:userId', (req, res) => {
    // Gets the userId from the route,
    // we need Number to convert it to a number
    const userId = Number(req.params.userId);

    // filter posts for the specific user
    const userPosts = posts.filter(post => post.userId === userId);

    // sends the response in JSON format
    res.json(userPosts);
})

app.get('*', (req, res) => {
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "practice"
});

connection.connect((err) => {
    if (err) {
        console.error("error: " + err.stack);
        return
    }

    console.log("connect as: " + connection.threadId);
});

connection.query('SELECT * FROM users',
function (err, results, fields) {
    if (err) throw err,
    console.log(results);
    console.log(fields);
});

connection.end();