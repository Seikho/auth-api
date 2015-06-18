var knex = require("knex");
var db = knex({
    client: "sqlite",
    connection: {
        filename: "auth.db"
    }
});
module.exports = db;
