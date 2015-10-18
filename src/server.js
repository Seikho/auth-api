var express = require("express");
var bodyParser = require("body-parser");
// Configure express
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
module.exports = server;
