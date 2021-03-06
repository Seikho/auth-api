var Promise = require("bluebird");
var bcrypt = require("bcrypt-nodejs");
function compareHash(unhashed, hashedString) {
    var promise = new Promise(function (resolve, reject) {
        bcrypt.compare(unhashed, hashedString, function (err, isCorrect) {
            if (err)
                return reject("[COMPARE] " + err);
            resolve(Promise.resolve(isCorrect));
        });
    });
    return promise;
}
module.exports = compareHash;
