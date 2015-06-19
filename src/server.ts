import express = require("express");
import cfg = require("ls-config");
var bodyParser = require("body-parser");
export = server;

var port = cfg.config("port") || cfg.config("p") || 10003;

// Configure express
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.listen(port);
