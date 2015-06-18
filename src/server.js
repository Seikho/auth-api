var express = require("express");
var cfg = require("ls-config");
var port = cfg.config("port") || 10003;
var server = express();
server.listen(port);
module.exports = server;
