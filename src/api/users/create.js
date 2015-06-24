var db = require("../../store/db");
var store = require("ls-events");
var Promise = require("bluebird");
var bcrypt = require("bcrypt");
function createUser(user) {
    return canUserBeCreated(user.username)
        .then(function () { return insertUser(user); })
        .then(function () { return store.pub(userToEvent(user)); });
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
    return getPasswordHash(user.password)
        .then(function (hash) { return user.password; })
        .then(function () {
        return db("users").insert(user);
    });
}
function getPasswordHash(password) {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    var salt = bcrypt.genSalt(10);
    bcrypt.hash(password, salt, function (err, hash) {
        if (err)
            return reject("Failed to create hash: " + err);
        resolve(hash);
    });
    return promise;
}
module.exports = createUser;
