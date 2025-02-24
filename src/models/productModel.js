const pool = require("../db");

module.exports = {
  async createProduct(name) {
    const query = "INSERT INTO products (name) VALUES (?)";
    const [result] = await pool.execute(query, [name]);
    return result.insertId;
  },

  async getProductById(id) {
    const query = "SELECT * FROM products WHERE id = ?";
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  async updateProduct(id, name) {
    const query = "UPDATE products SET name = ? WHERE id = ?";
    const [result] = await pool.execute(query, [name, id]);
    return result.affectedRows;
  },

  async deleteProduct(id) {
    const query = "DELETE FROM products WHERE id = ?";
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows;
  },

  async getAllProducts() {
    const query = "SELECT * FROM products";
    const [rows] = await pool.execute(query);
    return rows;
  },
};
