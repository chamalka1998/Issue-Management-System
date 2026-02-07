// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // allow your local frontend
    credentials: true, // if using cookies/auth
  }),
);
app.use(express.json());

// Health Check Route ✅
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is running!" });
});

// Routes
app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

// Start Server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("✅ Database connected successfully");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

start();
