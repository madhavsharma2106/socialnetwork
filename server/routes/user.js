var express = require('express');
var router = express.Router();
var db = require('../database/database');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/request_friend', function (req, res) {
    //Check to see if the request has already been sent Or if they are already friends
    var query = "SELECT * FROM user_friend_requests WHERE sender_id=" + req.body.sender_id + " AND received_id=" + req.body.received_id;

    db.query(query).spread(function (result, metadata) {
        if (result.length === 0) {
            insertRequest();
        }
    }).catch(function (err) {
        res.status(500).send(err)
    });

    function insertRequest() {
        var query = "INSERT INTO user_friend_requests (sender_id, reciever_id, status) VALUES sender_id=" + req.body.sender_id + ", AND received_id=" + req.body.received_id + " status = 'pending'";

        db.query(query).spread(function (result, metadata) {
            res.status(200).send('Friend Request Created Successfully');
        }).catch(function () {
            res.status(500).send(err);
        })
    }
});

module.exports = router;
