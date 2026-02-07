import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchIssues } from "../features/issues/issueSlice";
import { Link } from "react-router-dom";
import IssueCard from "../components/IssueCard"; // Import your component
import "../styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.issues);
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  // Stats Calculation
  const openCount = items.filter((i) => i.status === "Open").length;
  const progressCount = items.filter((i) => i.status === "In Progress").length;
  const resolvedCount = items.filter((i) => i.status === "Resolved").length;

  return (
    <div className={`dashboard-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="dashboard-header">
        <h1>Project Dashboard</h1>
        <Link to="/add">
          <button className="create-btn">+ New Issue</button>
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card open">
          <span className="stat-number">{openCount}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="stat-card progress">
          <span className="stat-number">{progressCount}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card resolved">
          <span className="stat-number">{resolvedCount}</span>
          <span className="stat-label">Resolved</span>
        </div>
      </div>

      <div className="issue-grid">
        {items.map((issue: any) => (
          // Use your IssueCard component here to get Toast functionality
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
