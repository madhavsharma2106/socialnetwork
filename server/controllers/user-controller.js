var db = require('../database/database');

module.exports.createUser = function (req, res) {
    var query = "INSERT INTO users (username, user_password, email) VALUES ('" + req.body.username + "', '" + req.body.user_password + "', '" + req.body.email + "')";   
    
    // Firing the query I just created
    db.query(query).spread(function (result, metadata) {
        // If successful, send 200 status and the message
        res.status(200).send("User was successfully created.");
    }).catch(function (err) {
        // incase it is not sent. Send 500 status and the following message This is a change
        res.status(500).send("User was not created");
    })
}
