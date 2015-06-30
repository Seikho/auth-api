import Promise = require("bluebird");
import jwt = require("jsonwebtoken");
import getSecret = require("./getSecret");
export = verifyToken;

function verifyToken(token: string) {
	return getSecret()
		.then(secret => secretHandler(token, secret));
}

function secretHandler(token: string, secret: string) {
	var resolve, reject;
	var promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});
	
	jwt.verify(token, secret, (error, decoded) => {
		if (error) return reject(error);
		return resolve(decoded);
	});
	
	return promise;
}
