var db = require('../database/database');

//Documentation avaible at npm bcryptjs
// Responsible for encrypting the database
var bcrypt = require('bcryptjs');
//Salt will hash the password 5 times. 
var salt = bcrypt.genSaltSync(5);

var jwt = require('jsonwebtoken');



module.exports.createUser = function (req, res) {
    //sync the current PW with the hash
    var password = bcrypt.hashSync(req.body.user_password, salt);
    var query = "INSERT INTO users (username, user_password, email) VALUES ('" + req.body.username + "', '" + password + "', '" + req.body.email + "')";

    // Firing the query just created
    db.query(query).spread(function (result, metadata) {
        // If successful, send 200 status and the message
        res.status(200).send("User was successfully created.");
    }).catch(function (err) {
        // incase it is not sent. Send 500 status and the following message This is a change
        res.status(500).send("User was not created");
    })
}

module.exports.login = function (req, res) {
    var submittedPassword = req.body.password;

    var query = "SELECT * FROM users WHERE username='" + req.body.loginName + "' OR email='" + req.body.loginName + "'";

    db.query(query).spread(function (result, metadata) {
        if (result.length > 0) {
            var userData = result[0];
            var isVerified = bcrypt.compareSync(submittedPassword, userData.user_password);

            var token = jwt.sign(userData, process.env.SECRET, {
                //Token will expire in 24hrs
                expiresIn: 60 * 60 * 24
            })

            if (isVerified) {
                delete userData.user_password;
                res.json({
                    userData: userData,
                    token: token
                })
            } else {
                res.status(400).send("User entered the wrong password");
            }
        }

    }).catch(function (err) {
        res.status(500).send("Unable to process the query.");
    })
}
