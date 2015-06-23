var Promise = require("bluebird");
var db = require("../store/db");
var bcrypt = require("bcrypt");
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
    var promise = new Promise(function (resolve, reject) {
        bcrypt.compare(password, hashedPassword, function (err, isCorrect) {
            if (err)
                return reject(err);
            resolve(Promise.resolve(isCorrect));
        });
    });
    return promise;
}
module.exports = verify;
