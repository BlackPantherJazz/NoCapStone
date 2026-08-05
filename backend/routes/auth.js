// routes/auth.js — authentication routes (signup, login)
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

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

export default router;
