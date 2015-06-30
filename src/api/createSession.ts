import db = require("../store/db");
export = createSession;

function createSession(username: string, token: string) {
	return db("sessions")
		.insert({ username: username, token: token })
		.then((id: number[]) => {
			if (id.length > 0) return Promise.resolve(token);
			return Promise.reject("Failed to insert new record: Unexpected error. Try again later.");
		})
		.catch(error => Promise.reject("Failed to insert new record: " + error));
}