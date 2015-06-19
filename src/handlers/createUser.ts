import db = require("../store/db");
import store = require("ls-events");
import log = require("ls-logger");
import Promise = require("bluebird");

// Listen to all 'create' requests
store.psub("users/create/*", createUserHandler);

function createUserHandler(channel: string, pattern: string, message: string) {
	var user: App.User = JSON.parse(message);

    // Security measure. The user provides a password during first authentication
    if (user.password) delete user.password;

	log.info("[HANDLER] Create request '" + user.username + "'");

    canUserBeCreated(user)
        .then(() => createUser(user))
        .then(() => raiseUserEvent("userCreated", user))
        .catch(error => raiseUserEvent("userCreateFailed", user, error));
}

/**
 * The returns a reject promise if thr user already exists
 * Resolves to true if the user can be created
 */
 function canUserBeCreated(user: App.User) {
	return store
        .fetch("users", "userCreated", user.username)
        .then((events: any[]) => {
            var isUserCreated = events.length > 0;
            if (!isUserCreated) return Promise.resolve(true);
            return Promise.reject("User already exists");
        });
}

/**
 * Create the entry in the database
 * If that fails, the user most likely exists, but return a verbose error.
 * 'Already existing' may occur due to race conditions
 * On db insert success, create the event. Ensure event success.
 */
function createUser(user: App.User) {
    return db("users")
        .insert(user)
        .then((ids: number[]) => {
            var isInserted = ids.length > 0;
            if (isInserted) return Promise.resolve(ids[0]);
            return Promise.reject("Database error: Failed to save new user");
        });
}


function raiseUserEvent(event: string, user: any, error?: string) {
    if (error) user.error = error;

	store.pub({
		event: event,
		context: "users",
		key: user.username,
		data: user
	});
}

function isValidUser(user: App.User) {
	var requiredFields = [
		"displayName",
		"username",
		"email",
		"company"
	];

	var isValid = requiredFields.every(field => {
		return !!user["field"];
	});

	return isValid;
}
