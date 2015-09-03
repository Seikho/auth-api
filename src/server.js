var express = require("express");
var bodyParser = require("body-parser");
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
module.exports = server;
