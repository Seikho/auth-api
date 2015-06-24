import Promise = require("bluebird");
var bcrypt = require("bcrypt");
export = getPasswordHash;

function getPasswordHash(password: string): Promise<string> {
    var resolve, reject;
    var promise = new Promise<string>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    var createHash = (saltError, salt) => {
        if (saltError) return reject("Failed to create salt: " + saltError);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return reject("Failed to create hash: " + err);
            resolve(hash);
        });
    }

    var salt = bcrypt.genSalt(10, createHash);
    return promise;
}
