import db = require("../../store/db");
import store = require("ls-events");
import Promise = require("bluebird");
import createHash = require("../createHash");
var bcrypt = require("bcrypt");
export = createUser;

function createUser(user: App.User) {
    return canUserBeCreated(user.username)
        .then(() => insertUser(user))
        .then(() => store.pub(userToEvent(user)));
}

function userToEvent(user: App.User): store.Event {
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

function insertUser(user: App.User) {
    return createHash(user.password)
        .then(hash => user.password)
        .then(() => {
        return db("users").insert(user);
    });
}
