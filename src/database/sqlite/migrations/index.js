const sqliteConnection = require("../../sqlite");
const users = require("../migrations/createUsers");

async function runMigrations() {
  const schema = [users].join("");
  const database = await sqliteConnection()
    .then((db) => db.exec(schema))
    .catch((error) => console.error(error));
  return database;
}

module.exports = runMigrations;
