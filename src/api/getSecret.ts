import Promise = require("bluebird");
import fs = require("fs");
import path = require("path");
var readFileAsync = Promise.promisify(fs.readFile);
export = getSecret;

function getSecret() {
	var secretFilePath = path.join(path.resolve(__dirname, "../../"), "secret.txt");
	return readFileAsync(secretFilePath)
		.then(secretHandler);
}

function secretHandler(buffer: Buffer) {
	return Promise.resolve(buffer.toString());
}

