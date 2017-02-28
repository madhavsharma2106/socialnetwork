var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/database/database');
var jwt = require('jsonwebtoken');

//This is the secret that we will attach with every token
process.env.SECRET = "Gangadhar hi Shaktiman hai";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/client', express.static(__dirname + '/client'))

//Controllers
var userController = require('./server/controllers/user-controller');

//Routers
var secureUserRouters = require('./server/routes/user');

app.use('/secure-api/user', secureUserRouters);

//Routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
})

app.post('/api/user/create', userController.createUser);
app.post('/api/user/login', userController.login);

// This means that: when you are synced with the database you can fire up the server.
db.sync().then(function () {
    app.listen(3000, function () {
        console.log("Listening to port " + 3000);
    })
})
