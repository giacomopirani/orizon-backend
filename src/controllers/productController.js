const productModel = require("../models/productModel");

exports.createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "The name field is mandatory" });
    }
    const productId = await productModel.createProduct(name);
    res.status(201).json({ id: productId, name });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const affectedRows = await productModel.updateProduct(id, name);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product updated correctly" });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectedRows = await productModel.deleteProduct(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted correctly" });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};
