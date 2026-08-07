import express from "express";
import Suggestion from "../models/Suggestion.js";
import { protect, managerOnly } from "../middleware/auth.js";

const router = express.Router();

// CREATE a suggestion
router.post("/", protect, async (req, res) => {
  try {
    const newSuggestion = await Suggestion.create({
      text: req.body.text,
      artist: req.user.id, // the logged-in user, taken from their token
    });
    res.status(201).json(newSuggestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all suggestions
router.get("/",  async (req, res) => {
  try {
    const suggestions = await Suggestion.find().populate("artist");
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

// READ one suggestion
router.get("/:id", async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id).populate("artist");
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.status(200).json(suggestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a suggestion
router.put("/:id", protect, managerOnly ,async (req, res) => {
  try {
    const updatedSuggestion = await Suggestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSuggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.status(200).json(updatedSuggestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a suggestion
router.delete("/:id", protect, managerOnly ,async (req, res) => {
  try {
    const deletedSuggestion = await Suggestion.findByIdAndDelete(req.params.id);
    if (!deletedSuggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    res.status(200).json({ message: "Suggestion deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;