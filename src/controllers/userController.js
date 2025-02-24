exports.createUser = (req, res) => {
  res.status(201).json({ message: "User creato" });
};

exports.updateUser = (req, res) => {
  res.json({ message: "User aggiornato" });
};

exports.deleteUser = (req, res) => {
  res.json({ message: "User eliminato" });
};
