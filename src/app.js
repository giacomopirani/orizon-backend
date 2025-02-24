const express = require("express");
const app = express();

app.use(express.json());

// Swagger integration
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Import and use routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error("Errore:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
