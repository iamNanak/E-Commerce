import express from "express";
import formidable from "express-formidable";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
import checkId from "../middlewares/checkId.js";

import {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  fetchAllProducts,
  addProductReviews,
  getTopProducts,
  getNewProducts,
} from "../controllers/product.controllers.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidable(), addProduct)
  .get(getAllProducts);

router.route("/allproducts").get(fetchAllProducts);

router
  .route("/:id/reviews")
  .post(authenticate, authorizeAdmin, addProductReviews);

router.get("/top", getTopProducts);
router.get("/new", getNewProducts);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, deleteProduct)
  .get(getProductById);

export default router;
