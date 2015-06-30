var db = require("../store/db");
function getSession(token) {
    return db("session")
        .select()
        .where({ token: token });
}
module.exports = getSession;
