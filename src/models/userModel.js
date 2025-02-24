const pool = require("../db");

module.exports = {
  async createUser({ nome, cognome, email }) {
    const query = "INSERT INTO users (nome, cognome, email) VALUES (?, ?, ?)";
    const [result] = await pool.execute(query, [nome, cognome, email]);
    return result.insertId;
  },

  async getUserById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  async updateUser(id, { nome, cognome, email }) {
    const query =
      "UPDATE users SET nome = ?, cognome = ?, email = ? WHERE id = ?";
    const [result] = await pool.execute(query, [nome, cognome, email, id]);
    return result.affectedRows;
  },

  async deleteUser(id) {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows;
  },

  async getAllUsers() {
    const query = "SELECT * FROM users";
    const [rows] = await pool.execute(query);
    return rows;
  },
};
