import server = require("../server");
import createUser = require("./users/create");
import authUser = require("./users/authenticate");
import log = require("ls-logger");

// TODO: Enforce a password policy
// TODO: Disallow top 10000 most common passwords

server.post("/register", (request, response) => {
    var user: App.User = request.body;
    createUser(user)
        .then(id => {
            response.send({id: id});
        })
        .catch(error => {
        response.status(500);
        response.send("Unable to create user: " + error);
    });
});

server.post("/login", (request, response) => {
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
        .then(isCorrect => response.send(isCorrect))
        .catch(error => {
        response.status(500);
        response.send("Failed to authenticate: " + error);
    });
});

log.info("Registered Web API routes");
