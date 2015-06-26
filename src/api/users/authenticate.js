var Promise = require("bluebird");
var db = require("../../store/db");
var compareHash = require("../compareHash");
var bcrypt = require("bcrypt");
function authenticate(username, password) {
    return getUserPasswordHash(username)
        .then(function (hash) { return compareHash(password, hash); })
        .catch(function (error) { return Promise.reject("[AUTH] " + error); });
}
function getUserPasswordHash(username) {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(function (result) { return Promise.resolve(result[0].password); })
        .catch(function (error) { return Promise.reject("[HASH] " + error); });
}
module.exports = authenticate;
