const usersRoutes = require("express").Router();
const UsersControllers = require("../controllers/usersControllers");
const UsersAvatarControllers = require("../controllers/usersAvatarControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfigs = require("../configs/uploads");
const upload = multer(uploadConfigs.MULTER);

const usersControllers = new UsersControllers();
const usersAvatarControllers = new UsersAvatarControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  usersAvatarControllers.update
);
module.exports = usersRoutes;
