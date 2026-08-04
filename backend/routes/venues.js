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

// READ one venue
router.get("/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a venue
router.put("/:id", async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json(updatedVenue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a venue
router.delete("/:id", async (req, res) => {
  try {
    const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
    if (!deletedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ message: "Venue deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;