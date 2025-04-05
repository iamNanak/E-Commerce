import Product from "../models/products.models.js";
import asyncHandler from "../asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity } = req.fields;
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

export { addProduct };
