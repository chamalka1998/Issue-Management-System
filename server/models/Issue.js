// models/Issue.js
const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { timestamps: true },
); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model("Issue", IssueSchema);
