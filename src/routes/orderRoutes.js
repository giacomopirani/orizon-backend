const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route to get orders (stub)
router.get("/", orderController.getOrders);
// Route to create an order (stub)
router.post("/", orderController.createOrder);
// Route to update an order (stub)
router.put("/:id", orderController.updateOrder);
// Route to delete an order (stub)
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
