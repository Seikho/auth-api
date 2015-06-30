var Promise = require("bluebird");
var fs = require("fs");
var path = require("path");
var readFileAsync = Promise.promisify(fs.readFile);
function getSecret() {
    var secretFilePath = path.join(path.resolve(__dirname, "../../"), "secret.txt");
    return readFileAsync(secretFilePath)
        .then(secretHandler);
}
function secretHandler(buffer) {
    return Promise.resolve(buffer.toString());
}
module.exports = getSecret;
