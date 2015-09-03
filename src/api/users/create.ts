import AuthApi = require("ls-auth-api");
import db = require("../../store/db");
import store = require("ls-events");
import Promise = require("bluebird");
import createHash = require("../createHash");
var bcrypt = require("bcrypt");
export = createUser;

function createUser(user: AuthApi.User) {
    user.enabled = 1;
    var isUserValid = isNewUserValid(user);
    if (!isUserValid) return Promise.reject("Bad request: Required fields were not supplied");
    var newUserId;

    return canUserBeCreated(user.username)
        .then(() => insertUser(user))
        .then(id => {
            newUserId = id[0];
        })
        .then(() => store.pub(userToEvent(user)))
        .then(() => Promise.resolve(newUserId));
}

function userToEvent(user: AuthApi.User): store.Event {
    return {
        context: "users",
        event: "create",
        key: user.username,
        data: {
            username: user.username,
            email: user.email,
            company: user.company
        }
    };
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
    var requiredFields = [
        "username",
        "password",
        "company",
        "email"
    ];

    return requiredFields.every(prop => user.hasOwnProperty(prop));
}
