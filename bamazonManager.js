var mysql = require("mysql");
var inquirer = require("inquirer");
var c = require('./db.js');

var connection = mysql.createConnection(c);

connection.connect(function (err) {
    if (err) throw err;
    
});