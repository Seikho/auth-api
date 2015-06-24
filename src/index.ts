import cfg = require("ls-config");
import dbInit = require("./store/init");
import log = require("ls-logger");
import server = require("./server");
import store = require("ls-events");

var webPort = cfg.config("webPort", 10003);

cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDatabase", "auth.db");

dbInit()
    .then(successHandler)
    .catch(failHandler);

function successHandler(isCreated: boolean) {
    log.info("Database created: " + isCreated);

    var message = {
        context: "services",
        event: "start",
        key: "auth",
        data: { port: webPort }
    };

    store.pub(message)
        .then(() => log.info("Server successfully started"));
}

function failHandler(errorMessage: any) {
    log.error("Failed to start server (Database error): " + errorMessage);

    var message = {
        context: "services",
        event: "startError",
        key: "auth",
        data: { error: errorMessage }
    };

    store.pub(message)
        .then(() => process.exit(1));
}
