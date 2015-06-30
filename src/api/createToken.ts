import getSecret = require("./getSecret");
import jwt = require("jsonwebtoken");
import Promise = require("bluebird");
import Chance = require("chance");
export = createToken;

function createToken() {
	return getSecret()
		.then(secretHandler);
}

function secretHandler(secret: string) {
	var chance = new Chance();
	var guid = chance.guid();
	var token = jwt.sign({ guid: guid }, secret);
	return Promise.resolve(token);
}