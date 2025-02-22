exports.getOrders = (req, res) => {
  res.json({ message: "Lista ordini (stub)" });
};

exports.createOrder = (req, res) => {
  res.status(201).json({ message: "Ordine creato (stub)" });
};

exports.updateOrder = (req, res) => {
  res.json({ message: "Ordine aggiornato (stub)" });
};

exports.deleteOrder = (req, res) => {
  res.json({ message: "Ordine eliminato (stub)" });
};
