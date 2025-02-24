const orderModel = require("../models/orderModel");

exports.getOrders = async (req, res, next) => {
  try {
    // We temporarily return an empty array
    res.json([]);
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
        error:
          "productIds e userIds devono essere array non vuoti e obbligatori",
      });
    }
    const orderId = await orderModel.createOrder({ productIds, userIds });
    res.status(201).json({ id: orderId, productIds, userIds });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = (req, res) => {
  res.json({ message: "Ordine aggiornato" });
};

exports.deleteOrder = (req, res) => {
  res.json({ message: "Ordine eliminato" });
};
