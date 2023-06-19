const routes = require("express").Router();
const usersRoutes = require("./usersRoutes");
const notesRoutes = require("./notesRoutes");
const tagsRoutes = require("./tagsRoutes");
const sessionsRoutes = require("./sessionsRoutes");

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
