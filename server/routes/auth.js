import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "../models/User.js"; // Adjust the path to your User model

const router = express.Router();

// Middleware to configure CORS for local development
const corsOptions = {
  origin: "http://localhost:3000", // Adjust to match your frontend's local development URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
router.use(cors(corsOptions));

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, isDefaultPassword: user.isDefaultPassword });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Change Password Route
router.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "Email, old password, and new password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashedPassword = hashedPassword;
    user.isDefaultPassword = false;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fallback route for undefined endpoints
router.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

export default router;
