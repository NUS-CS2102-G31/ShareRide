const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const port = process.env.PORT_NUMBER || 3600;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable all cors requests

// app.use((req, res, next) => {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     next();
// })


app.listen(port, async () => {
    console.log("Listening at port: ", port);
    await pool.connect();
    console.log("Connected to database")
});

// app.get('/', (req, res) => {
//     pool.query('INSERT INTO ', (error, results) => {
//         if (error) {
//             throw error;
//         }
//         res.send(results);
//     })
// });

app.post('/api/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = 'hello';

    pool.query(`INSERT INTO users (username, password, salt)
                VALUES('${username}', '${password}', '${salt}')`, (err, result) => {

            if (err) {
                res.status(400).json({
                    message: `User failed to save: ${username}`
                });
            } else {
                console.log(result)
                res.status(200).json({
                    message: `User created with username: ${username}`
                });
            }
        });
});