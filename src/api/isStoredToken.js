var Promise = require("bluebird");
var getSession = require("./getSession");
function isStoredToken(token) {
    return getSession(token)
        .then(function (session) { return Promise.resolve(session.length === 1); });
}
