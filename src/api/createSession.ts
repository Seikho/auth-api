import db = require("../store/db");
import store = require("ls-events");
export = createSession;

function createSession(username: string, token: string) {
	return db("sessions")
		.insert({ username: username, token: token })
		.then((id: number[]) => {
			if (id.length > 0) {
				store.pub({
					event: "login",
					context: "users",
					key: username,
					data: true
				});
				return Promise.resolve(token);
			}
			
			store.pub({
				event: "login",
				context: "users",
				key: username,
				data: false
			});

			return Promise.reject("Failed to insert new record: Unexpected error. Try again later.");
		})
		.catch(error => Promise.reject("Failed to insert new record: " + error));
}