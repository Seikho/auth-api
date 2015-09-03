var db = require("../../store/db");
var Promise = require("bluebird");
var createHash = require("../createHash");
var bcrypt = require("bcrypt");
function createUser(user) {
    user.enabled = 1;
    var isUserValid = isNewUserValid(user);
    if (!isUserValid)
        return Promise.reject("Bad request: Required fields were not supplied " + JSON.stringify(requiredFields));
    return canUserBeCreated(user.username)
        .then(function () { return insertUser(user); })
        .then(function (id) { return id[0]; })
        .then(function (newUserId) { return Promise.resolve(newUserId); });
}
function canUserBeCreated(username) {
    return db("users")
        .select()
        .where({ username: username })
        .then(function (users) {
        var isUserCreated = users.length > 0;
        if (!isUserCreated)
            return Promise.resolve(true);
        return Promise.reject("User already exists");
    });
}
function insertUser(user) {
    var changePw = function (hash) {
        user.password = hash;
    };
    return createHash(user.password)
        .then(changePw)
        .then(function () {
        return db("users")
            .insert(user)
            .then(Promise.resolve);
    });
}
function isNewUserValid(user) {
    return requiredFields.every(function (prop) { return user.hasOwnProperty(prop); });
}
var requiredFields = [
    "username",
    "password",
    "email"
];
module.exports = createUser;
