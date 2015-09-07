var Promise = require("bluebird");
var bcrypt = require("bcrypt-nodejs");
function getPasswordHash(password) {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    var createHash = function (saltError, salt) {
        if (saltError)
            return reject("Failed to create salt: " + saltError);
        bcrypt.hash(password, salt, null, function (err, hash) {
            if (err)
                return reject("Failed to create hash: " + err);
            resolve(hash);
        });
    };
    var salt = bcrypt.genSalt(10, createHash);
    return promise;
}
module.exports = getPasswordHash;
