import Promise = require("bluebird");
var bcrypt = require("bcrypt");
export = compareHash;

function compareHash(unhashed: string, hashedString: string): Promise<boolean> {
    var promise = new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(unhashed, hashedString, (err, isCorrect: boolean) => {
            if (err) return reject("[COMPARE] " + err);
            resolve(Promise.resolve(isCorrect));
        });
    });

    return promise;
}
