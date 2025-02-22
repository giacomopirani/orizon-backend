const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// POST /products – Create a new product
router.post("/", productController.createProduct);

// PUT /products/:id – Upgrade an existing product
router.put("/:id", productController.updateProduct);

// DELETE /products/:id – Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
