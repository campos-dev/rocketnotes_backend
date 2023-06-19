const tagsRoutes = require("express").Router();
const TagsControllers = require("../controllers/tagsControllers");
const tagsControllers = new TagsControllers();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

tagsRoutes.get("/", ensureAuthenticated, tagsControllers.index);

module.exports = tagsRoutes;
