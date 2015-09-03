var server = require("../server");
var auth = require("./auth");
var log = require("ls-logger");
var cfg = require("ls-config");
function init() {
    var port = cfg.config("port") || cfg.config("p") || 10003;
    server.listen(port);
    server.post("/register", function (request, response) {
        var user = request.body;
        auth.register(user)
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
        auth.login(username, password)
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
        auth.verify(token)
            .then(response.send)
            .catch(function (error) {
            response.status(401);
            response.send("Token is not verified");
        });
    });
    log.info("Registered Web API routes");
}
module.exports = init;
