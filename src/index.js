var cfg = require("ls-config");
var dbInit = require("./store/init");
var log = require("ls-logger");
cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDtabase", "auth.db");
dbInit()
    .then(function (isCreated) {
    log.info("Database created: " + isCreated);
})
    .catch(function (error) {
    log.error("Failed to created database: " + error);
});