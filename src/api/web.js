var server = require("../server");
var createUser = require("./users/create");
server.post("/register", function (request, response) {
    var user = request.body;
    var isValidUser = validateUser(user);
    if (!isValidUser) {
        response.status(401);
        return response.send("Invalid request: Required fields are not filled out");
    }
    createUser(user)
        .then(function (ids) { return response.send(ids[0]); })
        .catch(function (error) {
        response.status(500);
        response.send("Unable to create user: " + error);
    });
});
function validateUser(user) {
    var requiredProperties = [
        "username",
        "company",
        "email",
        "password"
    ];
    return requiredProperties.every(user.hasOwnProperty);
}
