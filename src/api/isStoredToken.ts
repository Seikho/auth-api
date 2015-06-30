import Promise = require("bluebird");
import getSession = require("./getSession");

function isStoredToken(token) {
	return getSession(token)
		.then((session: any[]) => Promise.resolve(session.length === 1));
}
