const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token from Authorization header
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Token malformed" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    req.userId = decoded.id;
    next();
  });
}

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("📝 Register request received:", req.body);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login request received:", req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// Protected route, requires valid token
router.get("/protected", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: `All Set ${user.username}, your dashboard,YOUR RULES!` });
  } catch (err) {
    console.error("Protected route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// API root test route
router.get("/", (req, res) => {
  res.send("API root working");
});

module.exports = router;
