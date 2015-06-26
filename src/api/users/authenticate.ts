import Promise = require("bluebird");
import db = require("../../store/db");
import compareHash = require("../compareHash");
var bcrypt = require("bcrypt");
export = authenticate;

function authenticate(username: string, password: string): Promise<boolean> {
    return getUserPasswordHash(username)
        .then(hash => compareHash(password, hash))
        .catch(error => Promise.reject("[AUTH] " + error));
}

function getUserPasswordHash(username: string): Promise<string> {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(result => Promise.resolve(result[0].password))
        .catch(error => Promise.reject("[HASH] " + error));
}
