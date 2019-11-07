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
    pool.query(`SELECT * FROM users;`, (err, result) => {
        res.send(result)
    })
});

app.post('/api/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password; 
    const salt = req.body.salt;

    pool.query(`INSERT INTO users (username, password, salt)
                VALUES('${username}', '${password}', '${salt}')`, (err, result) => {

            if (err) {
                console.log(err);

                res.status(400).json({
                    message: `User failed to save: ${username}`,
                    error: err
                });
            } else {
                console.log(result)
                res.status(200).json({
                    message: `User created with username: ${username}`
                });
            }
        });
});

app.listen(PORT, async () => {
    console.log("Listening at port:", PORT);
    await pool.connect();
    console.log("Connected to database")
});
