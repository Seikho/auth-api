var server = require("../server");
var createUser = require("./users/create");
var authUser = require("./users/authenticate");
var createSession = require("./createSession");
var verifyToken = require("./verifyToken");
var isStoredToken = require("./isStoredToken");
var log = require("ls-logger");
server.post("/register", function (request, response) {
    var user = request.body;
    createUser(user)
        .then(function (id) {
        response.send({ id: id });
    })
        .catch(function (error) {
        response.status(500);
        response.send("Unable to create user: " + error);
    });
});
server.post("/login", function (request, response) {
    var hasPayload = !!request.body;
    if (!hasPayload)
        return response.send("[BODY] Invalid request");
    var isValidPayload = !!request.body.username && !!request.body.password;
    if (!isValidPayload)
        return response.send("[REQ] Invalid request");
    var username = request.body.user;
    var password = request.body.password;
    authUser(username, password)
        .then(function (token) { return createSession(username, token); })
        .catch(function (error) {
        response.status(500);
        response.send("Failed to authenticate: " + error);
    });
});
server.post("/verify", function (request, response) {
    var hasPayload = !!request.body;
    if (!hasPayload)
        return response.send("[BODY] Invalid request");
    var isValidPayload = !!request.body.token;
    if (!isValidPayload)
        return response.send("[REQ] Invalid request");
    var token = request.body.token;
    verifyToken(token)
        .then(function (decoded) { return isStoredToken(token); })
        .then(response.send)
        .catch(function (error) {
        response.status(401);
        response.send("Token is not verified");
    });
});
log.info("Registered Web API routes");
