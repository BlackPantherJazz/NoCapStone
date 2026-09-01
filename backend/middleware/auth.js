// middleware/auth.js — authentication + authorization gates
import jwt from "jsonwebtoken";

// GATE 1 — authentication
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's info to the request so later code can use it
    req.user = decoded; // { id, role }
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// GATE 2 — authorization: is this user a manager?
export const managerOnly = (req, res, next) => {
  if (req.user && req.user.role === "manager") {
    next();
  } else {
    res.status(403).json({ message: "Manager access only" });
  }
};