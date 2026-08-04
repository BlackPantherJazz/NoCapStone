// models/Suggestion.js — a free-text note an artist submits for the manager to review
import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;