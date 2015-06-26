var server = require("../server");
var createUser = require("./users/create");
var authUser = require("./users/authenticate");
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
    console.log(request.body);
    authUser(request.body.username, request.body.password)
        .then(function (isCorrect) { return response.send(isCorrect); })
        .catch(function (error) {
        response.status(500);
        response.send("Failed to authenticate: " + error);
    });
});
log.info("Registered Web API routes");
