var db = require("../../store/db");
var store = require("ls-events");
var log = require("ls-logger");
var Promise = require("bluebird");
store.psub("users/create/*", createUserHandler);
function createUserHandler(channel, pattern, message) {
    var user = message.data;
    if (user.password)
        delete user.password;
    log.info("[HANDLER] Create request '" + user.username + "'");
    canUserBeCreated(user)
        .then(function () { return createUser(user); })
        .then(function () { return raiseUserEvent("userCreated", user); })
        .catch(function (error) { return raiseUserEvent("userCreateFailed", user, error); });
}
function canUserBeCreated(user) {
    return store
        .fetch("users", "userCreated", user.username)
        .then(function (events) {
        var isUserCreated = events.length > 0;
        if (!isUserCreated)
            return Promise.resolve(true);
        return Promise.reject("User already exists");
    });
}
function createUser(user) {
    return db("users")
        .insert(user)
        .then(function (ids) {
        var isInserted = ids.length > 0;
        if (isInserted)
            return Promise.resolve(ids[0]);
        return Promise.reject("Database error: Failed to save new user");
    });
}
function raiseUserEvent(event, user, error) {
    if (error)
        user.error = error;
    store.pub({
        event: event,
        context: "users",
        key: user.username,
        data: user
    });
}
function isValidUser(user) {
    var requiredFields = [
        "displayName",
        "username",
        "email",
        "company"
    ];
    var isValid = requiredFields.every(function (field) {
        return !!user["field"];
    });
    return isValid;
}
