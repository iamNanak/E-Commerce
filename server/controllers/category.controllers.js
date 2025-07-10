import Category from "../models/category.models.js";
import asyncHandler from "../asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    console.log("Category Name:", name);

    if (!name) {
      return res.status(400).json({ error: "Category Required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "Category already exist" });
    }

    const category = await new Category({ name }).save();

    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category Not Found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    return res.json(updatedCategory);
  } catch (error) {
    console.log("Error in Updating: ", error);
    return res.status(400).json(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete(categoryId);

    return res.status(200).json(category);
  } catch (error) {
    console.log("Error in deletion: ", error);
    return res.status(504).json(error);
  }
});

const listCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Failed to get Categories" });
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    console.log("id: ", id, "category: ", category);
    if (!category) {
      return res.status(404).json({ message: "Category Not Found 1" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Category Not Found 2" });
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  getCategory,
};
