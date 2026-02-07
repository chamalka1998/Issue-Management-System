require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const connectDB = require("./db/connect");
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

// Routes
app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);

// Connect to DB
connectDB(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error(err));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
//for testing purposes only
