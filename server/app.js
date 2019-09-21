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