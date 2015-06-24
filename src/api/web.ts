import server = require("../server");
import createUser = require("./users/create");
import authUser = require("./users/authenticate");

// TODO: Enforce a password policy
// TODO: Disallow top 10000 most common passwords

server.post("/register", (request, response) => {
    var user: App.User = request.body;
    createUser(user)
        .then((ids: number[]) => response.send(ids[0]))
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
        .then(response.send)
        .catch(error => {
            response.status(500);
            response.send("Failed to authenticate: " + error);
        });

});
