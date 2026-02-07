import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addIssue } from "../features/issues/issueSlice";
import type { Issue } from "../types";
import "../styles/AddIssue.css";

const AddIssue = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  const [formData, setFormData] = useState<Issue>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addIssue(formData)).unwrap();
      navigate("/dashboard");
    } catch {
      alert("Failed to create issue. Please check your token/auth.");
    }
  };

  return (
    // Note: Use "dark-mode" if that's what your Dashboard.css uses
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="issue-form">
        <h2>Create New Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g., Bug in Login API"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Provide as much detail as possible..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn-save">
              Save Issue
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;
