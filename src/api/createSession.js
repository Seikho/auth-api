var db = require("../store/db");
function createSession(username, token) {
    var promise = new Promise(function (resolve, reject) {
        db("sessions")
            .insert({ username: username, token: token })
            .then(function (id) {
            if (id.length > 0) {
                return resolve(token);
            }
            reject("Failed authentication attempt");
        }).catch(function (error) {
            reject("Database failure: Failed to create new session");
        });
    });
    return promise;
}
module.exports = createSession;
