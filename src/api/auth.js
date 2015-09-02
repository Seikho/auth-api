var createUser = require("./users/create");
var authUser = require("./users/authenticate");
var createSession = require("./createSession");
var verifyToken = require("./verifyToken");
var isStoredToken = require("./isStoredToken");
function register(user) {
    return createUser(user);
}
exports.register = register;
function login(username, password) {
    return authUser(username, password)
        .then(function (token) { return createSession(username, token); });
}
exports.login = login;
function verify(token) {
    return verifyToken(token)
        .then(function () { return isStoredToken(token); });
}
exports.verify = verify;
