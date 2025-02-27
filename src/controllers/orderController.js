const orderModel = require("../models/orderModel");

exports.getOrders = async (req, res, next) => {
  try {
    // We read any query parameters to filter
    const { date, productId, page = 1, limit = 10 } = req.query;
    // Converte page e limit in numeri
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Call the model to retrieve orders with pagination and filters
    const orders = await orderModel.getFilteredOrders({
      date,
      productId,
      page: pageNum,
      limit: limitNum,
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { productIds, userIds } = req.body;
    // Verify that productIds and userIds are arrays and not empty
    if (
      !productIds ||
      !userIds ||
      !Array.isArray(productIds) ||
      !Array.isArray(userIds) ||
      productIds.length === 0 ||
      userIds.length === 0
    ) {
      return res.status(400).json({
        error: "productIds and userIds must be non-empty and required arrays",
      });
    }
    const orderId = await orderModel.createOrder({ productIds, userIds });
    res.status(201).json({ id: orderId, productIds, userIds });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = (req, res) => {
  res.json({ message: "Order updated (state)" });
};

exports.deleteOrder = (req, res) => {
  res.json({ message: "Order deleted (state)" });
};
