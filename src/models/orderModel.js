const pool = require("../db");

module.exports = {
  async createOrder({ productIds, userIds }) {
    // Create main order with current date
    const orderQuery = "INSERT INTO orders (created_at) VALUES (NOW())";
    const [orderResult] = await pool.execute(orderQuery);
    const orderId = orderResult.insertId;

    // Enter associations for products
    if (Array.isArray(productIds) && productIds.length > 0) {
      const prodQuery =
        "INSERT INTO order_products (order_id, product_id) VALUES ?";
      const prodValues = productIds.map((pid) => [orderId, pid]);
      await pool.query(prodQuery, [prodValues]);
    }

    // Enter associations for users
    if (Array.isArray(userIds) && userIds.length > 0) {
      const userQuery = "INSERT INTO order_users (order_id, user_id) VALUES ?";
      const userValues = userIds.map((uid) => [orderId, uid]);
      await pool.query(userQuery, [userValues]);
    }

    return orderId;
  },

  async getFilteredOrders({ date, productId, page, limit }) {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    let query = `
    SELECT o.id AS order_id, o.created_at,
           GROUP_CONCAT(DISTINCT p.name) AS products,
           GROUP_CONCAT(DISTINCT CONCAT(u.nome, ' ', u.cognome)) AS users
    FROM orders o
    LEFT JOIN order_products op ON o.id = op.order_id
    LEFT JOIN products p ON p.id = op.product_id
    LEFT JOIN order_users ou ON o.id = ou.order_id
    LEFT JOIN users u ON u.id = ou.user_id
  `;

    const whereClauses = [];
    const params = [];

    if (date) {
      whereClauses.push("DATE(o.created_at) = ?");
      params.push(date);
    }
    if (productId) {
      whereClauses.push("p.id = ?");
      params.push(productId);
    }

    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    query += ` GROUP BY o.id ORDER BY o.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    console.log("SQL Query:", query);
    console.log("Parameters:", params);

    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async updateOrder(id, { productIds, userIds }) {
    // Removes existing associations
    await pool.execute("DELETE FROM order_products WHERE order_id = ?", [id]);
    await pool.execute("DELETE FROM order_users WHERE order_id = ?", [id]);

    // Insert new product associations
    if (Array.isArray(productIds) && productIds.length > 0) {
      const prodQuery =
        "INSERT INTO order_products (order_id, product_id) VALUES ?";
      const prodValues = productIds.map((pid) => [id, pid]);
      await pool.query(prodQuery, [prodValues]);
    }
    // Inserts new associations for users
    if (Array.isArray(userIds) && userIds.length > 0) {
      const userQuery = "INSERT INTO order_users (order_id, user_id) VALUES ?";
      const userValues = userIds.map((uid) => [id, uid]);
      await pool.query(userQuery, [userValues]);
    }

    return true;
  },

  async deleteOrder(id) {
    // First delete the associations in the bridge tables, then the order
    await pool.execute("DELETE FROM order_products WHERE order_id = ?", [id]);
    await pool.execute("DELETE FROM order_users WHERE order_id = ?", [id]);
    const [result] = await pool.execute("DELETE FROM orders WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  },
};
