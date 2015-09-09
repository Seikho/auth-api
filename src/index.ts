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

var cliPort = parseInt(cfg.config("auth-port")) || 0;
if (cliPort <= 0) cliPort = 0;

cfg.config("baseDatabase", "auth.base.db");
cfg.config("liveDatabase", "auth.db");

dbInit()
    .then(successHandler)
    .catch(failHandler);

function successHandler(isCreated: boolean) {
    log.info("ls-auth-api: Database created: " + isCreated);
    if (cliPort === 0) return; 
    
    webInit(cliPort);
    log.info(`ls-auth-api: Server successfully started [${cliPort}]`);
}

function failHandler(errorMessage: any) {
    log.error("Failed to start server (Database error): " + errorMessage);
}
