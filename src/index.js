var cfg = require("ls-config");
var dbInit = require("./store/init");
var log = require("ls-logger");
var authApi = require("./api/auth");
var webInit = require("./api/web");
var cliPort = parseInt(cfg.config("auth-port")) || 0;
if (cliPort <= 0)
    cliPort = 0;
cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDatabase", "auth.db");
dbInit()
    .then(successHandler)
    .catch(failHandler);
function successHandler(isCreated) {
    log.info("Database created: " + isCreated);
    if (cliPort === 0)
        return;
    webInit(cliPort);
    log.info("Server successfully started [" + cliPort + "]");
}
function failHandler(errorMessage) {
    log.error("Failed to start server (Database error): " + errorMessage);
}
module.exports = {
    login: authApi.login,
    register: authApi.register,
    verify: authApi.verify,
    startWebServer: webInit
};
