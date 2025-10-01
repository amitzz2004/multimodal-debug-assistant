// src/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// In-memory users (⚠️ replace with DB in production)
const users = {
  admin: { password: "1234" },
  test: { password: "pass" }
};

// ✅ POST /api/auth/signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (users[username]) {
    return res.status(400).json({ error: "User already exists" });
  }

  users[username] = { password };
  res.json({ message: "✅ User created successfully", username });
});

// ✅ POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "devsecret",
    { expiresIn: "7d" }
  );

  res.json({ token, username });
});

// ✅ GET /api/auth/me (check logged-in user)
router.get("/me", (req, res) => {
  const auth = req.headers.authorization?.split(" ")[1];
  if (!auth) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET || "devsecret");
    res.json({ user: payload });
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
