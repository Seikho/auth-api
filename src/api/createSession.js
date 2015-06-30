var db = require("../store/db");
function createSession(username, token) {
    return db("sessions")
        .insert({ username: username, token: token })
        .then(function (id) {
        if (id.length > 0)
            return Promise.resolve(token);
        return Promise.reject("Failed to insert new record: Unexpected error. Try again later.");
    })
        .catch(function (error) { return Promise.reject("Failed to insert new record: " + error); });
}
module.exports = createSession;
