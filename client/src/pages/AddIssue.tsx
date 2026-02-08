import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addIssue } from "../features/issues/issueSlice";
import type { Issue } from "../types";
import "../styles/AddIssue.css";
import toast from "react-hot-toast";

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

    // 1. Sanitize the data before sending to Redux/API
    const sanitizedData = {
      ...formData,
      title: formData.title?.trim(),
      description: formData.description?.trim(),
    };

    // 2. Validation check for empty strings after trimming
    if (!sanitizedData.title || !sanitizedData.description) {
      return toast.error("Please fill in all fields.");
    }

    // 3. Start the loading toast
    const toastId = toast.loading("Saving issue...");

    try {
      // 4. Dispatch the action and unwrap to catch errors locally
      await dispatch(addIssue(sanitizedData)).unwrap();

      toast.success("Issue created successfully!", { id: toastId });

      // Delay navigation so the user sees the success state
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (error: unknown) {
      // 5. Handle error toast
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create issue. Check your connection.";
      toast.error(errorMessage, { id: toastId });
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
