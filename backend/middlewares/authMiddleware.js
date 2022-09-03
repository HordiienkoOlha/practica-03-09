const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400);
    throw new Error("No authorization provided");
  }
  if (!req.headers.authorization.startsWith("Bearer")) {
    res.status(400);
    throw new Error("No Bearer token");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(400);
    throw new Error("No token provided");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-userPassword");
  req.user = user;
  next();
});

module.exports = authMiddleware;
