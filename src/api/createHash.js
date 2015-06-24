var Promise = require("bluebird");
var bcrypt = require("bcrypt");
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
module.exports = getPasswordHash;
