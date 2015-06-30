var db = require("../store/db");
var store = require("ls-events");
function createSession(username, token) {
    return db("sessions")
        .insert({ username: username, token: token })
        .then(function (id) {
        if (id.length > 0) {
            store.pub({
                event: "login",
                context: "users",
                key: username,
                data: true
            });
            return Promise.resolve(token);
        }
        store.pub({
            event: "login",
            context: "users",
            key: username,
            data: false
        });
        return Promise.reject("Failed to insert new record: Unexpected error. Try again later.");
    })
        .catch(function (error) { return Promise.reject("Failed to insert new record: " + error); });
}
module.exports = createSession;
