import db = require("../store/db");
export = createSession;

function createSession(username: string, token: string): Promise<string> {

	var promise = new Promise<string>((resolve, reject) => {
		db("sessions")
			.insert({ username: username, token: token })
			.then((id: number[]) => {
				if (id.length > 0) {
					return resolve(<any>token);
				}

				reject("Failed authentication attempt");
			}).catch(error => {
				reject("Database failure: Failed to create new session");
			});
	})

	return promise;
}