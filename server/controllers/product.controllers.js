import Product from "../models/products.models.js";
import asyncHandler from "../asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, brand, description, price, category, quantity } = req.fields;

    // console.log(name);
    // console.log(brand);
    // console.log(description);
    // console.log(price);
    // console.log(category);
    // console.log(quantity);

    if (!name || !brand || !description || !price || !category || !quantity) {
      return res.json({ error: "All field required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, description, price, category, quantity } = req.fields;
    // console.log(name);
    // console.log(brand);
    // console.log(description);
    // console.log(price);
    // console.log(category);
    // console.log(quantity);

    if (!name || !brand || !description || !price || !category || !quantity) {
      return res.json({ error: "All field required" });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.fields },
      { new: true }
    );

    await product.save();
    console.log(product.image);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.status(200).json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json({ error: "Product Not Found" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const addProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const reviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (reviewed) {
      res.status(400).json({ error: "Already reviewed" });
    } else {
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review added" });
    }
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(4);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  fetchAllProducts,
  addProductReviews,
  getTopProducts,
  getNewProducts,
};
