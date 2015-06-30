var getSecret = require("./getSecret");
var jwt = require("jsonwebtoken");
var Promise = require("bluebird");
var Chance = require("chance");
function createToken() {
    return getSecret()
        .then(secretHandler);
}
function secretHandler(secret) {
    var chance = new Chance();
    var guid = chance.guid();
    var token = jwt.sign({ guid: guid }, secret);
    return Promise.resolve(token);
}
module.exports = createToken;
