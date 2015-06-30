import Promise = require("bluebird");
import getSession = require("./getSession");
export = isStoredToken;

function isStoredToken(token: string) {
	return getSession(token)
		.then((session: any[]) => {
			var isStored = session.length === 1;
			
			if (isStored) return Promise.resolve(true);
			return Promise.reject("The token supplied is not stored or expired");
		});
}
