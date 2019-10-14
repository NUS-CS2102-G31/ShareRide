const dotenv = require('dotenv');
const app = require('express')();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

dotenv.config();

const port = process.env.PORT_NUMBER || 3000;
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT
});

app.listen(port, async () => {
    console.log("Listening at port: ", port);
    await pool.connect();
});


app.get('/', (req, res) => {
    // pool.query('SELECT * FROM postgresql', (error, results) => {
    //     if (error) {
    //       throw error;
    //     }
    //     res.send(results);
    // })
});

app.post('/api/signup', (req, res) => {
    res.send("Hello")
});