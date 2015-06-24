import db = require("../../store/db");
import store = require("ls-events");
import Promise = require("bluebird");
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
    return getPasswordHash(user.password)
        .then(hash => user.password)
        .then(() => {
        return db("users").insert(user);
    });
}

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

    bcrypt.genSalt(10, createHash);
    return promise;
}
