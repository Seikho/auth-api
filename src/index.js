var cfg = require("ls-config");
var dbInit = require("./store/init");
var log = require("ls-logger");
var authApi = require("./api/auth");
var webInit = require("./api/web");
var webPort = cfg.config("auth", 10003);
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
    log.info("Server successfully started");
}
function failHandler(errorMessage) {
    log.error("Failed to start server (Database error): " + errorMessage);
    var message = {
        context: "services",
        event: "startError",
        key: "auth",
        data: { error: errorMessage }
    };
}
module.exports = {
    login: authApi.login,
    register: authApi.register,
    verify: authApi.verify,
    startWebServer: webInit
};
