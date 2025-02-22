exports.createUser = (req, res) => {
  res.status(201).json({ message: "User creato (stub)" });
};

exports.updateUser = (req, res) => {
  res.json({ message: "User aggiornato (stub)" });
};

exports.deleteUser = (req, res) => {
  res.json({ message: "User eliminato (stub)" });
};
