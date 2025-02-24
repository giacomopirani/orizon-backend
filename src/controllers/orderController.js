exports.getOrders = (req, res) => {
  res.json({ message: "Lista ordini (stub)" });
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
