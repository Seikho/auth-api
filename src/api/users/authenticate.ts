import Promise = require("bluebird");
import db = require("../../store/db");
import compareHash = require("../compareHash");
import createToken = require("../createToken");
var bcrypt = require("bcrypt-nodejs");
export = authenticate;

function authenticate(username: string, password: string): Promise<string> {
    return getUserPasswordHash(username)
        .then(hash => compareHash(password, hash))
        .then(hashHandler)
        .catch(error => Promise.reject("[AUTH] " + error));
}

function getUserPasswordHash(username: string): Promise<string> {
    return db("users")
        .select("password")
        .where({ username: username })
        .then(result => Promise.resolve(result[0].password))
        .catch(error => Promise.reject("[HASH] " + error));
}

function hashHandler(success: boolean) {
    if (!success) return Promise.reject("Failed to authentication with the supplied credentials");
    return createToken();
}

function tokenHandler(token: string) {
    return Promise.resolve(token);
}