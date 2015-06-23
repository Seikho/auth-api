import Promise = require("bluebird");
import db = require("../store/db");
var passwordHash = require("password-hash");
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
    var isCorrect = passwordHash.very(password, hashedPassword);
    return Promise.resolve(isCorrect);
}
