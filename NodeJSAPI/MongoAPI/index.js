let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let apiRoutes = require("./api-routes")
let port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub');
var db = mongoose.connection;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes)

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});