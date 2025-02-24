const userModel = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const { nome, cognome, email } = req.body;
    // Check that all fields are present
    if (!nome || !cognome || !email) {
      return res
        .status(400)
        .json({ error: "Nome, cognome e email sono obbligatori" });
    }
    const userId = await userModel.createUser({ nome, cognome, email });
    // Returns the answer with "id" property included
    res.status(201).json({ id: userId, nome, cognome, email });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = (req, res) => {
  res.json({ message: "User aggiornato" });
};

exports.deleteUser = (req, res) => {
  res.json({ message: "User eliminato" });
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
