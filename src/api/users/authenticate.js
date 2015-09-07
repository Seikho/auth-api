var Promise = require("bluebird");
var db = require("../../store/db");
var compareHash = require("../compareHash");
var createToken = require("../createToken");
var bcrypt = require("bcrypt-nodejs");
function authenticate(username, password) {
    return getUserPasswordHash(username)
        .then(function (hash) { return compareHash(password, hash); })
        .then(hashHandler)
        .catch(function (error) { return Promise.reject("[AUTH] " + error); });
}
function getUserPasswordHash(username) {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(function (result) { return Promise.resolve(result[0].password); })
        .catch(function (error) { return Promise.reject("[HASH] " + error); });
}
function hashHandler(success) {
    if (!success)
        return Promise.reject("Failed to authentication with the supplied credentials");
    return createToken();
}
function tokenHandler(token) {
    return Promise.resolve(token);
}
module.exports = authenticate;
