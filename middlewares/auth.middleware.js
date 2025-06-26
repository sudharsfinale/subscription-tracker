import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
const authorize = async (req, res, next) => {
  try {
    let token;
    let header_auth = req.headers?.authorization;
    if (header_auth && header_auth.startsWith("Bearer")) {
      token = header_auth.split(" ")?.[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error?.message,
    });
  }
};

export default authorize;
