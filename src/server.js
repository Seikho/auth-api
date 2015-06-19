var express = require("express");
var cfg = require("ls-config");
var bodyParser = require("body-parser");
var port = cfg.config("port") || cfg.config("p") || 10003;
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.listen(port);
module.exports = server;
