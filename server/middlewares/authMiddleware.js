// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // The token usually comes as "Bearer <token>", so we split it if needed.
    // Ideally, the frontend sends it as just the token in a custom header or Bearer.
    // For simplicity here, we assume the header contains just the token or "Bearer token"
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Valid token? Move to the next step!
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = protect;
