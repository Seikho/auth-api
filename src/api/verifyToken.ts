import AuthApi = require('../../index.d.ts');
import Promise = require("bluebird");
import jwt = require("jsonwebtoken");
import getSecret = require("./getSecret");
import db = require("../store/db");
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
	
	jwt.verify(token, secret, (error, decoded: AuthApi.Payload) => {
		if (error) return reject(error);
		if (decoded.guid.length !== 36) return resolve("The supplied token is not valid");
		return resolve(decoded);
	});
	
	return promise;
}