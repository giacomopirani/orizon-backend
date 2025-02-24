exports.getOrders = async (req, res, next) => {
  try {
    // Temporaneamente restituiamo un array vuoto
    res.json([]);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = (req, res) => {
  res.status(201).json({ message: "Ordine creato" });
};

exports.updateOrder = (req, res) => {
  res.json({ message: "Ordine aggiornato" });
};

exports.deleteOrder = (req, res) => {
  res.json({ message: "Ordine eliminato" });
};
