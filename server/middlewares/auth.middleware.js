import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import asyncHandler from "../asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwtToken;
  // console.log("token: ", token);

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded: ", decode);
      // console.log("decoded id: ", decode.userId);
      const user = await User.findById(decode?.userId).select("-password");
      // console.log("user: ", user);
      if (!user) {
        throw new Error("No user found with this token");
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
});

export { authenticate, authorizeAdmin };
