/* TABLES:

users
gifs
favorites

users columns:
id VARCHAR(36) PK NN UQ
username VARCHAR(45) NN
password VARCHAR(60) NN

gifs columns:
gif_id VARCHAR(45) PK NN UQ
title VARCHAR(45) NN UQ
url VARCHAR(45) NN

favorites columns:
favorite_id VARCHAR(45) PK NN UQ
FOREIGN KEY user_id NN
FOREIGN KEY gif_id NN

ALSO!
Make sure your .env file looks something like this:

DB_HOST = '127.0.0.1'
DB_USER = 'root'
DB_PASSWORD = 'root'
DB_DATABASE = 'giphy_database'

*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3006;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(cors());
app.use(express.json());
//secret is the secret key
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
if (err) { throw err;
}
console.log('connected to the database');
})

// passport.use(
//     new LocalStrategy(function (username, password, done) {
//         connection.query(
//             "SELECT * FROM users WHERE username =?",
//             [username],
//             function (err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user[0]) {
//                     return done(null, false, {message: "Incorrect username"});
//                 }
//                 if (!bcrypt.compareSync(password, user[0].password)) {
//                     return done(null, false, {message: "Incorrect password"});
//                 }
//                 return done(null, user[0]);
//             }
//         )
//     })
// )

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
        if(error) {
            console.log(username, password);
            res.status(500).send({ error: error });
            return;
        }
        if(results.length > 0) {
            const hashedPassword = results[0].password;
            const passwordMatch = bcrypt.compareSync(password, hashedPassword);
            if(passwordMatch) {
                res.status(200).send({ success: 'User logged in'});
            } else {
                res.status(400).send('Incorrect password');
            }
        } else {
            res.status(400).send('User not found');
        }
    })
})

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//     connection.query('SELECT * FROM users WHERE id = ?', [id], function (err, user) {
//     done(err, user[0]);
//     })
// });
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const id = Math.floor(Math.random() * 11) + 1;

    connection.query('INSERT INTO users SET ?', {idusers: id, username: username, password: password},
    (error, results, fields) => {
        if (error) {
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ success: 'User registered'})
    })
})

// app.post('/login', passport.authenticate('local'), (req, res) => {
//     res.status(200).send({ success: "User logged in"});
// })
app.listen(port, () => {
    console.log('App listening at: ' + port);
});