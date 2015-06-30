import db = require("../store/db");
export = getSession;

function getSession(token: string) {
	return db("session")
		.select()
		.where({ token: token });
}