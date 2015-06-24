import server = require("../server");
import createUser = require("./users/create");
import authUser = require("./users/authenticate");

// TODO: Enforce a password policy
// TODO: Disallow top 10000 most common passwords

server.post("/register", (request, response) => {
    var user: App.User = request.body;
    var isValidUser = validateUser(user);
    if (!isValidUser) {
        response.status(401);
        return response.send("Invalid request: Required fields are not filled out");
    }

    createUser(user)
        .then((ids: number[]) => response.send(ids[0]))
        .catch(error => {
            response.status(500);
            response.send("Unable to create user: " + error);
        });
});

function validateUser(user: any) {
    var requiredProperties = [
        "username",
        "company",
        "email",
        "password"
    ];

    // The user must have every required field
    return requiredProperties.every(user.hasOwnProperty);
}
