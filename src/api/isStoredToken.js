var Promise = require("bluebird");
var getSession = require("./getSession");
function isStoredToken(token) {
    return getSession(token)
        .then(function (session) {
        var isStored = session.length === 1;
        if (isStored)
            return Promise.resolve(true);
        return Promise.reject("The token supplied is not stored or expired");
    });
}
module.exports = isStoredToken;
