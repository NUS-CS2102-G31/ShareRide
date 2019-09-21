const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT_NUMBER || 3000;

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Listening at port: ", port);
})