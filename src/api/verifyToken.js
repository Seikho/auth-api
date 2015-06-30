var Promise = require("bluebird");
var jwt = require("jsonwebtoken");
var getSecret = require("./getSecret");
function verifyToken(token) {
    return getSecret()
        .then(function (secret) { return secretHandler(token, secret); });
}
function secretHandler(token, secret) {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    jwt.verify(token, secret, function (error, decoded) {
        if (error)
            return reject(error);
        if (decoded.guid.length !== 36)
            return resolve("The supplied token is not valid");
        return resolve(decoded);
    });
    return promise;
}
module.exports = verifyToken;
