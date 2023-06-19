const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const connection = require('../config/db');
const saltRounds = 10;

exports.register = (req, res) => {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    // Generates a random 36 string id
    const id = uuidv4();

    // Check if the user already exists
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            res.status(500).send({ error: error });
            return;
        }

        if (results.length > 0) {
            // The user already exists
            res.status(400).send({ error: 'Username is already taken' });
            return;
        }

        // If no user was found, we can create a new user
        connection.query('INSERT INTO users SET ?', {id: id, username: username, password: password},
        (error, results, fields) => {
            if (error) {
                console.log(id, username, password);
                console.log(error);
                res.status(500).send({ error: error });
                return;
            }
            console.log(id, username, password);
            res.status(200).send({ success: 'User registered'});
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.log(username, password);
            console.log(error);
            res.status(500).send({ error: error });
            return;
        }

        if (results.length === 0) {
            // If the results' length is 0, that means the username doesn't exist
            res.status(400).send({ error: 'No user with this username exists' });
            return;
        }
        
        const hashedPassword = results[0].password;  // Get hashed password stored in the database
        const match = bcrypt.compareSync(password, hashedPassword);  // Compare hashed password with the plain text password

        // The compareSync function hashes the plaintext password
        // with the same salt that was used when the original password was hashed 
        // (the salt is encoded within the hashed password).

        // You don't need to hash the plaintext password before giving it to bcrypt
        // since it does it internally anyway.
        // It then compares to two to see if they're the same.
        
        if (match) {
            // Passwords match
            res.status(200).send({ success: 'User logged in'});
            return;
        } else {
            // Passwords don't match
            res.status(400).send({ error: 'Incorrect password' });
            return;
        }
    });
};