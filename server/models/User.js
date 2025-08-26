import db from "../config/db.js";

const User = {
  findByUsername: (username, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], callback);
  },
};

export default User;