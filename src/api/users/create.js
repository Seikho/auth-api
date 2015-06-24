var db = require("../../store/db");
var store = require("ls-events");
var Promise = require("bluebird");
var createHash = require("../createHash");
var bcrypt = require("bcrypt");
function createUser(user) {
    user.enabled = 1;
    var isUserValid = isNewUserValid(user);
    if (!isUserValid)
        return Promise.reject("Bad request: Required fields were not supplied");
    var newUserId;
    return canUserBeCreated(user.username)
        .then(function () { return insertUser(user); })
        .then(function (id) {
        newUserId = id[0];
    })
        .then(function () { return store.pub(userToEvent(user)); })
        .then(function () { return Promise.resolve(newUserId); });
}
function userToEvent(user) {
    return {
        context: "users",
        event: "create",
        key: user.username,
        data: {
            username: user.username,
            email: user.email,
            company: user.company
        }
    };
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
    var requiredFields = [
        "username",
        "password",
        "company",
        "email"
    ];
    return requiredFields.every(function (prop) { return user.hasOwnProperty(prop); });
}
module.exports = createUser;
