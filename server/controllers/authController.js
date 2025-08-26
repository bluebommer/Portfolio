import jwt from "jsonwebtoken";
import User from "../models/User.js";
import  bcrypt  from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  });
};