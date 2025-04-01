import { Router } from "express";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
} from "../controllers/category.controllers.js";

const router = Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, deleteCategory);

router.route("/categories").get(listCategories);
router.route("/:id").get(getCategory);

export default router;
