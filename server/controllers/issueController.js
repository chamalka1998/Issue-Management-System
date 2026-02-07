// controllers/issueController.js
const Issue = require("../models/Issue");

// 1. Get all issues
const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({}).sort({ createdAt: -1 }); // Newest first
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 2. Create a new issue
const createIssue = async (req, res) => {
  try {
    const issue = await Issue.create(req.body);
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 3. Update an issue
const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findByIdAndUpdate(id, req.body, { new: true });

    if (!issue) {
      return res.status(404).json({ msg: `No issue with id: ${id}` });
    }

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 4. Delete an issue
const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ msg: `No issue with id: ${id}` });
    }

    res.status(200).json({ msg: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
};
