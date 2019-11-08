require('dotenv').config()

const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const PORT = process.env.PORT || 5000;

// app.use('/', proxy({
//     target: `localhost:3000`,
//     changeOrigin: true
// }));
// if (process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"));
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all cors requests

app.get('/api/users', (req, res) => {
    pool.query(`SET search_path TO rideshare;
    SELECT * FROM users;`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

app.post('/api/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password; 

    pool.query(`INSERT INTO users (username, password)
                VALUES('${username}', '${password}');`, (err, result) => {
            if (err) {
                res.status(400).json({
                    message: `User failed to save: ${username}`,
                    error: err
                });
            } else {
                res.status(200).json({
                    message: `User created with username: ${username}`
                });
            }
        });
});

app.listen(PORT, async () => {
    console.log("Listening at port:", PORT);
    await pool.connect();
    console.log("Connected to database");
    await pool.query('SET search_path TO rideshare;');
    console.log("Set search path to rideshare");
});
