import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import venueRoutes from "./routes/venues.js";
import tourRoutes from "./routes/tours.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());         
app.use(express.json());  

app.use("/api/venues", venueRoutes);
app.use("/api/tours", tourRoutes);

// Test route — just to prove the server is alive
app.get("/", (req, res) => {
  res.send("Touring manager API is running");
});


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

startServer();