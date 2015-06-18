import knex = require("knex");
export = db;

var db = knex({
    client: "sqlite",
    connection: {
        filename: "auth.db"
    }
});
