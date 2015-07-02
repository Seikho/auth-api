import db = require("../store/db");
import store = require("ls-events");
export = createSession;

function createSession(username: string, token: string): Promise<string> {

	var promise = new Promise<string>((resolve, reject) => {
		db("sessions")
			.insert({ username: username, token: token })
			.then((id: number[]) => {
				if (id.length > 0) {
					emitSuccess(username);
					return resolve(<any>token);
				}

				emitFailedAttempt(username);
				reject("Failed authentication attempt");
			}).catch(error => {
				emitDatabaseFailed(username);
				reject("Database failure: Failed to create new session");
			});
	})

	return promise;
}

function emitSuccess(username: string) {
	store.pub({
		event: "login",
		context: "users",
		key: username,
		data: { error: false, auth: true }
	});
}

function emitFailedAttempt(username: string) {
	store.pub({
		event: "login",
		context: "users",
		key: username,
		data: { error: true, auth: false, reason: "Invalid credentials" }
	});
}

function emitDatabaseFailed(username: string) {
	store.pub({
		event: "login",
		context: "users",
		key: username,
		data: { error: true, auth: false, reason: "Database failure" }
	});
}
