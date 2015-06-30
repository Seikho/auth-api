var getSecret = require("./getSecret");
var Chance = require("chance");
function createToken() {
    return getSecret()
        .then;
}
function secretHandler(secret) {
    var chance = new Chance();
    var guid = chance.guid();
}
