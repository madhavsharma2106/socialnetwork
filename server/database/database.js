//Used for connection
var Sequelize = require('sequelize');
var databaseConnection = 'postgres://postgres:123456@localhost/socialnetwork';
var sequelize = new Sequelize(databaseConnection, {
    dialect: 'postgres'
});

module.exports = sequelize;
