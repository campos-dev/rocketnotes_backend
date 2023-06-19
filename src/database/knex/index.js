const knex = require("knex");
const config = require("../../../knexfile");

const knexConnection = knex(config.development);

module.exports = knexConnection;
