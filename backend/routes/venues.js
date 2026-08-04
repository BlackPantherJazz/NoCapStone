// routes/venues.js — CRUD endpoints for the venues shelf
import express from "express";
import Venue from "../models/Venue.js";

const router = express.Router();

// CREATE a venue
router.post("/", async (req, res) => {
  try {
    const newVenue = await Venue.create(req.body);
    res.status(201).json(newVenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all venues
router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;