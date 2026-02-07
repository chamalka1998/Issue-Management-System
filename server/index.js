// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const issueRoutes = require("./routes/issueRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
