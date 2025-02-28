const userModel = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  try {
    const { nome, cognome, email } = req.body;
    // Check that all fields are present
    if (!nome || !cognome || !email) {
      return res
        .status(400)
        .json({ error: "First name, surname and email are mandatory" });
    }
    const userId = await userModel.createUser({ nome, cognome, email });
    // Returns the answer with "id" property included
    res.status(201).json({ id: userId, nome, cognome, email });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, cognome, email } = req.body;

    // Check that all required fields are present
    if (!nome || !cognome || !email) {
      return res
        .status(400)
        .json({ error: "Nome, cognome e email sono obbligatori" });
    }

    const affectedRows = await userModel.updateUser(id, {
      nome,
      cognome,
      email,
    });
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    res.status(200).json({ message: "Utente aggiornato correttamente" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectedRows = await userModel.deleteUser(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    res.status(200).json({ message: "Utente eliminato correttamente" });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
