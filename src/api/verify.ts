import Promise = require("bluebird");
import db = require("../store/db");
var bcrypt = require("bcrypt");
export = verify;

function verify(username: string, password: string): Promise<boolean> {
    return getUserPasswordHash(username)
        .then(hash => compare(password, hash))
}

function getUserPasswordHash(username: string): Promise<string> {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(result => Promise.resolve(result[0].password))
}

function compare(password: string, hashedPassword: string): Promise<boolean> {
    var promise = new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isCorrect: boolean) => {
            if (err) return reject(err);
            resolve(Promise.resolve(isCorrect));
        });
    });

    return promise;
}
