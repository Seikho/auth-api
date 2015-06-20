import cfg = require("ls-config");
import dbInit = require("./store/init");
import log = require("ls-logger");
import server = require("./server");

cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDatabase", "auth.db");

dbInit()
    .then(isCreated => {
        log.info("Database created: " + isCreated);
    })
    .catch(error => {
        log.error("Failed to created database: " + error);
    });

log.info("Loading event handlers");
require("./handlers/init");
