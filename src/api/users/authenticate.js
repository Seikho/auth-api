var Promise = require("bluebird");
var db = require("../../store/db");
var compareHash = require("../compareHash");
var bcrypt = require("bcrypt");
function authenticate(username, password) {
    return getUserPasswordHash(username)
        .then(function (hash) { return compareHash(password, hash); });
}
function getUserPasswordHash(username) {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(function (result) { return Promise.resolve(result[0].password); });
}
module.exports = authenticate;
