var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./database/database');
//var jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Controllers
var userController = require('./controllers/user-controller');

//Routes
app.post('/api/user/create', userController.createUser);
app.post('/api/user/login', userController.login);

// This means that: when you are synced with the database you can fire up the server.
db.sync().then(function () {
    app.listen(3000, function () {
        console.log("Listening to port " + 3000);
    })
})
