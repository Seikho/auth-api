var server = require("../server");
var createUser = require("./users/create");
var authUser = require("./users/authenticate");
server.post("/register", function (request, response) {
    var user = request.body;
    createUser(user)
        .then(function (ids) { return response.send(ids[0]); })
        .catch(function (error) {
        response.status(500);
        response.send("Unable to create user: " + error);
    });
});
server.post("/login", function (request, response) {
    var hasPayload = !!request.body;
    if (!hasPayload) {
        response.sendStatus(401);
        return response.send("Invalid request");
    }
    var isValidPayload = !!request.body.username && !!request.body.password;
    if (!isValidPayload) {
        response.sendStatus(401);
        return response.send("Invalid request");
    }
    authUser(request.body.username, request.body.password)
        .then(response.send)
        .catch(function (error) {
        response.status(500);
        response.send("Failed to authenticate: " + error);
    });
});
