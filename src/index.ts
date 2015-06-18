import cfg = require("ls-config");
import dbInit = require("./store/init");
import log = require("ls-logger");

cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDtabase", "auth.db");

dbInit()
    .then(isCreated => {
        log.info("Database created: " + isCreated);
    })
    .catch(error => {
        log.error("Failed to created database: " + error);
    });
