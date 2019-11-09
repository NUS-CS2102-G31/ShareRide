require('dotenv').config()

const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const PORT = process.env.PORT || 5000;

let search_path = "SELECT 1;";
if (process.env.NODE_ENV === 'production') {
    search_path = "SET search_path TO rideshare;";
    app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all cors requests

app.get('/api/users', (req, res) => {
    pool.query(`${search_path}
    SELECT * FROM users;`, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results[1]);
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
    console.log(req.body)
    pool.query(`${search_path}
        SELECT * FROM users WHERE users.username = '${username}';`, (err, results) => {
        const queryResult = results[1];
        
        console.log(queryResult)
        if (queryResult.rowCount > 0) {
            let hash = queryResult.rows[0].password;
            bcrypt.compare(password, hash, (err, result) => {
                if (result) {
                    res.status(200).json({
                        message: `User: ${username} login details are correct.`,
                        username: queryResult.rows[0].username
                    });
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
 * GET List of Rides
 */

app.get('/api/rides', (req, res) => {
    const origin = req.query.origin;
    const destination = req.query.destination;
    const seats = req.query.seats;
    
    pool.query(`${search_path}
        SELECT Rides.driver, Rides.car, Routes.origin, Routes.destination, Rides.rideStartTime, Cars.numSeats FROM Rides 
        INNER JOIN Routes ON Rides.routeId = Routes.routeId 
        INNER JOIN Cars ON Cars.carplate = Rides.car
        WHERE Routes.origin = '${origin}' AND Routes.destination = '${destination}' AND Cars.numSeats >= ${seats};`, (err, results) => {
            console.log(results)
            if (err) {
                res.status(500).json({
                    message: err
                });
            } else {
                const queryResult = results[1];
                const rides = queryResult.rows;
                console.log(rides)
                
                res.status(200).json({
                    data: rides,
                    message: `${queryResult.rowCount} number of rides are retrieved`
                });
            }
    });    
});

/** 
 * GET Profile of Driver & Statistics
 */
app.get('/api/profile', (req, res) => {
    const username = req.query.username;
    
    pool.query(`${search_path}
        SELECT * FROM Users WHERE Users.username = '${username}';`, (err, results) => {
            if (err) {
                res.status(500).json({
                    message: err
                });
            } else {
                const queryResult = results[1];
                let profileData = {};

                if (queryResult.rowCount) {
                    profileData = queryResult.rows[0];
                    pool.query(`${search_path}
                        WITH DriverAveEarnings AS (
                            SELECT R.driver, AVG(price) avePrice
                            FROM Rides R
                            WHERE R.price IS NOT NULL 
                            GROUP BY R.driver
                        ),
            
                        PassengersPerRide AS (
                            SELECT b.rideId, r.driver, COUNT(DISTINCT passenger) total_passengers
                            FROM Bookings b
                            INNER JOIN Rides r
                            ON r.rideId = b.rideId
                            WHERE b.paymentStatus = 2
                            GROUP BY b.rideId, r.driver
                        )
            
                        SELECT d.driver, d.avePrice AS avg_earnings, p.total_passengers AS total_passengers
                        FROM DriverAveEarnings d, PassengersPerRide p
                        WHERE d.driver = p.driver AND LOWER(d.driver) = LOWER('${username}');`, (err, results) => {
                            let stats = results[1];
                            
                            if (stats.rowCount) {
                                let statsData = stats.rows[0];
                                let data = {
                                    fullName: profileData.fullName,
                                    username: profileData.username,
                                    email: profileData.email,
                                    phone: profileData.phone,
                                    totalPassengers: statsData.total_passengers,
                                    avgEarnings: statsData.avg_earnings
                                };

                                res.status(200).json({
                                    data: data,
                                    message: `Profile data is as shown for user`
                                });
                            } else {                
                                let data = {
                                    fullName: profileData.fullName,
                                    username: profileData.username,
                                    email: profileData.email,
                                    phone: profileData.phone,
                                    totalPassengers: 0,
                                    avgEarnings: 0
                                }
                                
                                res.status(200).json({
                                    data: data,
                                    message: `No data found for driver, drive more!`
                                });
                            }   

                        });     
                } else {
                    res.status(400).json({
                        message: `User ${username} profile data not found`
                    });
                }
            }
    });    
});


app.listen(PORT, async () => {
    console.log("Listening at port:", PORT);
    await pool.connect();
    console.log("Connected to database");
    // await pool.query('SET search_path TO rideshare;');
});
