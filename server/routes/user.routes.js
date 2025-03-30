import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/user.controllers.js";

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

// ADMIN ROUTES
userRouter
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default userRouter;
