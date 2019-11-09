require('dotenv').config()

const express = require('express');
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
let search_path = "SELECT 1;";

if (process.env.NODE_ENV == 'production') {
    search_path = "SET search_path TO rideshare;";
    app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all cors requests

app.get('/api/users', (req, res) => {
    pool.query(`${search_path}
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
    pool.query(`${search_path}
        SELECT * FROM users WHERE users.username = '${username}';`, (err, results) => {
        const queryResult = results[1];

        if (queryResult.rowCount > 0) {
            let hash = queryResult.rows[0].password;
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

/**
 * Rides
 */

app.get('/api/rides', (req, res) => {
    const origin = req.query.origin;
    const destination = req.query.destination;
    
    pool.query(`${search_path}
        SELECT Rides.driver, Rides.car, Routes.origin, Routes.destination, Rides.ridestarttime, Cars.numseats FROM Rides 
        INNER JOIN Routes ON Rides.routeId = Routes.routeId 
        INNER JOIN Cars ON Cars.carplate = Rides.car
        WHERE Routes.origin = '${origin}' AND Routes.destination = '${destination}'`, (err, results) => {
            if (err) {
                res.status(500).json({
                    message: err
                });
            } else {
                const queryResult = results[1];
                const rides = queryResult.rows;
                
                res.status(200).json({
                    data: rides,
                    message: `${queryResult.rowCount} number of rides are retrieved`
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
