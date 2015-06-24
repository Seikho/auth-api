var cfg = require("ls-config");
var dbInit = require("./store/init");
var log = require("ls-logger");
var store = require("ls-events");
var webPort = cfg.config("webPort", 10003);
cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDatabase", "auth.db");
dbInit()
    .then(successHandler)
    .catch(failHandler);
function successHandler(isCreated) {
    log.info("Database created: " + isCreated);
    var message = {
        context: "services",
        event: "start",
        key: "auth",
        data: { port: webPort }
    };
    store.pub(message)
        .then(function () { return log.info("Server successfully started"); });
}
function failHandler(errorMessage) {
    log.error("Failed to start server (Database error): " + errorMessage);
    var message = {
        context: "services",
        event: "startError",
        key: "auth",
        data: { error: errorMessage }
    };
    store.pub(message)
        .then(function () { return process.exit(1); });
}
