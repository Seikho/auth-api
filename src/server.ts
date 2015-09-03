import express = require("express");
var bodyParser = require("body-parser");
export = server;

// Configure express
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));