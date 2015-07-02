var db = require("../store/db");
var store = require("ls-events");
function createSession(username, token) {
    var promise = new Promise(function (resolve, reject) {
        db("sessions")
            .insert({ username: username, token: token })
            .then(function (id) {
            if (id.length > 0) {
                emitSuccess(username);
                return resolve(token);
            }
            emitFailedAttempt(username);
            reject("Failed authentication attempt");
        }).catch(function (error) {
            emitDatabaseFailed(username);
            reject("Database failure: Failed to create new session");
        });
    });
    return promise;
}
function emitSuccess(username) {
    store.pub({
        event: "login",
        context: "users",
        key: username,
        data: { error: false, auth: true }
    });
}
function emitFailedAttempt(username) {
    store.pub({
        event: "login",
        context: "users",
        key: username,
        data: { error: true, auth: false, reason: "Invalid credentials" }
    });
}
function emitDatabaseFailed(username) {
    store.pub({
        event: "login",
        context: "users",
        key: username,
        data: { error: true, auth: false, reason: "Database failure" }
    });
}
module.exports = createSession;
