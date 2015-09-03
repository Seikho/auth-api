import AuthApi = require("ls-auth-api");
import server = require("../server");
import auth = require("./auth");
import createUser = require("./users/create");
import authUser = require("./users/authenticate");
import createSession = require("./createSession");
import verifyToken = require("./verifyToken");
import isStoredToken = require("./isStoredToken");
import log = require("ls-logger");
import cfg = require("ls-config");
export = init;
// TODO: Enforce a password policy
// TODO: Disallow top 10000 most common passwords
var started = false;

function init(port?: number) {
    if (started) return;
       
    started = true;
    server.listen(port);
    
    server.post("/register", (request, response) => {
        var user: AuthApi.User = request.body;

        auth.register(user)
            .then(id => {
                response.send({ id: id });
            })
            .catch(error => {
                response.status(500);
                response.send("Unable to create user: " + error);
            });
    });

    server.post("/login", (request, response) => {
        var hasPayload = !!request.body;
        if (!hasPayload) return response.send("[BODY] Invalid request");

        var isValidPayload = !!request.body.username && !!request.body.password;
        if (!isValidPayload) return response.send("[REQ] Invalid request");

        var username = request.body.user;
        var password = request.body.password;

        auth.login(username, password)
            .catch(error => {
                response.status(500);
                response.send("Failed to authenticate: " + error);
            });
    });

    server.post("/verify", (request, response) => {
        var hasPayload = !!request.body;
        if (!hasPayload) return response.send("[BODY] Invalid request");

        var isValidPayload = !!request.body.token;
        if (!isValidPayload) return response.send("[REQ] Invalid request");

        var token = request.body.token;

        auth.verify(token)
            .then(response.send)
            .catch(error => {
                response.status(401);
                response.send("Token is not verified");
            });
    });

    log.info("Registered Web API routes");
}


