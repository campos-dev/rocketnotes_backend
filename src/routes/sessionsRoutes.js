const sessionsRoutes = require("express").Router();
const SessionsControllers = require("../controllers/sessionsControllers");
const sessionsControllers = new SessionsControllers();

sessionsRoutes.post("/", sessionsControllers.create);

module.exports = sessionsRoutes;
