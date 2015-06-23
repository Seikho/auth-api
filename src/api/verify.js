var Promise = require("bluebird");
var db = require("../store/db");
var passwordHash = require("password-hash");
function verify(username, password) {
    return getUserPasswordHash(username)
        .then(function (hash) { return compare(password, hash); });
}
function getUserPasswordHash(username) {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(function (result) { return Promise.resolve(result[0].password); });
}
function compare(password, hashedPassword) {
    var isCorrect = passwordHash.very(password, hashedPassword);
    return Promise.resolve(isCorrect);
}
module.exports = verify;
