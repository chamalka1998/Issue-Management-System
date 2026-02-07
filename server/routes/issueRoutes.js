// routes/issueRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware"); // Import the guard

const {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

// Public Route (Anyone can see issues)
router.get("/", getAllIssues);

// Protected Routes (Must be logged in)
router.post("/", protect, createIssue);
router.put("/:id", protect, updateIssue);
router.delete("/:id", protect, deleteIssue);

module.exports = router;
