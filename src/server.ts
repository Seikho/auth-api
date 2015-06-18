import express = require("express");
import cfg = require("ls-config");
export = server;

var port = cfg.config("port") || 10003;

var server = express();
server.listen(port);
