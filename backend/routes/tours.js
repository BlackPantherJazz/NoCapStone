import express from "express";
import Tour from "../models/Tour.js";

const router = express.Router();

// CREATE a tour
router.post("/", async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().populate("venue");;
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

// READ one tour
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("venue");
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a tour
router.put("/:id", async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a tour
router.delete("/:id", async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;