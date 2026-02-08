import type { Issue } from "../types";
import { useAppDispatch } from "../app/hooks";
import { deleteIssue, updateIssue } from "../features/issues/issueSlice";
import "../styles/IssueCard.css";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";

interface Props {
  issue: Issue & { _id: string };
}

const IssueCard = ({ issue }: Props) => {
  const dispatch = useAppDispatch();

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === issue.status) return;

    // Use toast.promise for a better UI than window.confirm
    toast.promise(
      dispatch(
        updateIssue({ id: issue._id, updates: { status: newStatus } }),
      ).unwrap(),
      {
        loading: "Updating status...",
        success: `Status changed to ${newStatus}`,
        error: "Update failed",
      },
    );
  };

  const handlePriorityChange = (newPriority: string) => {
    if (newPriority === issue.priority) return;

    toast.promise(
      dispatch(
        updateIssue({ id: issue._id, updates: { priority: newPriority } }),
      ).unwrap(),
      {
        loading: "Changing priority...",
        success: `Priority is now ${newPriority}`,
        error: "Update failed",
      },
    );
  };

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div className="toast-confirm">
          <span>Delete this issue?</span>
          <div className="toast-actions">
            <button
              className="toast-btn-yes"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await dispatch(deleteIssue(id)).unwrap();
                  toast.success("Issue deleted!");
                } catch {
                  toast.error("Failed to delete.");
                }
              }}
            >
              Yes
            </button>
            <button
              className="toast-btn-no"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { position: "top-center" },
    );
  };

  return (
    <div className="issue-card">
      <div className="card-header">
        <h3>{issue.title}</h3>
        <select
          className={`badge-select ${issue.priority}`}
          value={issue.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <p className="card-desc">{issue.description}</p>

      <div className="card-footer">
        <div className="status-control">
          <label>Status:</label>
          <select
            className="status-select"
            value={issue.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <button
          onClick={() => handleDelete(issue._id)}
          className="btn-icon-delete"
          title="Delete Issue"
        >
          <HiOutlineTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
