import cfg = require("ls-config");
import dbInit = require("./store/init");
import log = require("ls-logger");
import server = require("./server");
import authApi = require("./api/auth");
import webInit = require("./api/web");
export = {
    login: authApi.login,
    register: authApi.register,
    verify: authApi.verify,
    startWebServer: webInit
}

var webPort = cfg.config("auth", 10003);

cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDatabase", "auth.db");

dbInit()
    .then(successHandler)
    .catch(failHandler);

function successHandler(isCreated: boolean) {
    log.info("Database created: " + isCreated);

    // Start the Web API
    var message = {
        context: "services",
        event: "start",
        key: "auth",
        data: { port: webPort }
    };

    log.info("Server successfully started");
}

function failHandler(errorMessage: any) {
    log.error("Failed to start server (Database error): " + errorMessage);

    var message = {
        context: "services",
        event: "startError",
        key: "auth",
        data: { error: errorMessage }
    };
}
