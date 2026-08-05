// routes/auth.js — authentication routes (signup, login)
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// SIGN UP — create a new user with a hashed password
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Is this email already taken?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before saving — 10 is the "cost" (salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the HASHED password, never the plain one
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Send back safe fields only — never return the password
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOG IN — verify credentials and issue a JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the typed password against the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Passwords match — sign a token carrying the user's id and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Send the token plus safe user info
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
