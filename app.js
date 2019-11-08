require('dotenv').config()

const express = require('express');
const proxy = require('http-proxy-middleware');
const bcrypt = require('bcrypt');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const PORT = process.env.PORT || 5000;

// app.use('/', proxy({
//     target: `localhost:3000`,
//     changeOrigin: true
// }));
let search_path = "";
if (process.env.NODE_ENV == 'production') {
    search_path = "SET search_path TO rideshare;";
    app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all cors requests

app.get('/api/users', (req, res) => {
    pool.query(`
    SELECT * FROM users;`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

/**
 * Sign Up API - username & details
 */
app.post('/api/signup', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password; 
    const phone = req.body.phone;

    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10, (err, hash) => {
        pool.query(`${search_path}
            INSERT INTO users (username, password, email, fullname, phone)
            VALUES('${username}', '${hash}', '${email}', '${name}', '${phone}');`, (err, result) => {
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
});

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(`${search_path}SELECT * FROM users WHERE username = '${username}';`, (err, result) => {
        console.log(search_path);
        console.log(result)
        if (result.rowCount > 0) {
            let hash = result.rows[0].password;
            bcrypt.compare(password, hash, (err, result) => {
                if (result) {
                    res.status(200).json({
                        message: `User: ${username} login details are correct.`
                    })
                } else {
                    res.status(401).json({
                        message: `User: ${username} is unauthorized to login`
                    });
                } 
            });
        } else {
            res.status(401).json({
                message: `User: ${username} is unauthorized to login`
            });
        }
    });
    
});

app.listen(PORT, async () => {
    console.log("Listening at port:", PORT);
    await pool.connect();
    console.log("Connected to database");
    // await pool.query('SET search_path TO rideshare;');
});
