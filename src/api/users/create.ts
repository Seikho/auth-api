import AuthApi = require('../../../index.d.ts');
import db = require("../../store/db");
import Promise = require("bluebird");
import createHash = require("../createHash");
var bcrypt = require("bcrypt-nodejs");
export = createUser;

function createUser(user: AuthApi.User) {
    user.enabled = 1;
    var isUserValid = isNewUserValid(user);
    if (!isUserValid) return Promise.reject("Bad request: Required fields were not supplied " + JSON.stringify(requiredFields));

    return canUserBeCreated(user.username)
        .then(() => insertUser(user))
        .then(id => id[0])
        .then(newUserId => Promise.resolve(newUserId));
}

/**
 * The returns a reject promise if thr user already exists
 * Resolves to true if the user can be created
 */
function canUserBeCreated(username: string) {
    return db("users")
        .select()
        .where({ username: username })
        .then((users: any[]) => {
            var isUserCreated = users.length > 0;
            if (!isUserCreated) return Promise.resolve(true);
            return Promise.reject("User already exists");
        });
}

function insertUser(user: AuthApi.User) {
    var changePw = hash => {
        user.password = hash;
    }

    return createHash(user.password)
        .then(changePw)
        .then(() => {
            return db("users")
                .insert(user)
                .then(Promise.resolve);
        });
}

function isNewUserValid(user: any) {
  return requiredFields.every(prop => user.hasOwnProperty(prop));
}

var requiredFields = [
    "username",
    "password",
    "email"
];