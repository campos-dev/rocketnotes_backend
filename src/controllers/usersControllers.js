const AppError = require("../utils/appError");
const sqliteConnection = require("../database/sqlite");
const { compare, hash } = require("bcryptjs");

class UsersControllers {
  async create(req, res) {
    const { name, email, password } = req.body;
    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE email =?", [
      email,
    ]);

    if (user) {
      throw new AppError("This email was already registered");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(`INSERT INTO users(name,email,password) VALUES(?,?,?)`, [
      name,
      email,
      hashedPassword,
    ]);

    return res.json();
  }

  async update(req, res) {
    const { name, email, old_password, password } = req.body;
    const database = await sqliteConnection();
    const user_id = req.user.id;

    const user = await database.get(`SELECT * FROM users WHERE id=?`, [
      user_id,
    ]);

    if (!user) {
      throw new AppError("User not found.");
    }

    const checkIfEmailWasRegistered = await database.get(
      `SELECT * FROM users WHERE email=?`,
      [email]
    );

    if (checkIfEmailWasRegistered && checkIfEmailWasRegistered.id !== user.id) {
      throw new AppError("This email was already registered.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Old password must be provided.");
    }

    if (password && old_password) {
      const passwordMatch = await compare(old_password, user.password);

      if (!passwordMatch) {
        throw new AppError("Password is incorrect");
      }

      const passwordHashed = await hash(password, 8);

      user.password = passwordHashed;
    }

    await database.run(
      `
UPDATE users SET
name=?,
email=?,
password=?,
updated_at = DATETIME('NOW')
WHERE id=?`,
      [user.name, user.email, user.password, user_id]
    );

    return res.json();
  }
}
module.exports = UsersControllers;
