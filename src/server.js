require("dotenv/config");
require("express-async-errors");
const AppError = require("./utils/appError");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const routes = require("./routes");
const runMigrations = require("./database/sqlite/migrations");
const uploadConfigs = require("./configs/uploads");

app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER));

app.use(routes);
runMigrations();

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

const PORT = 3333;

app.listen(PORT, console.log(`Server is running on port:${PORT}`));
