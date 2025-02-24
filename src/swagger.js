const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0", // Specifies the OpenAPI version
    info: {
      title: "Orizon API",
      version: "1.0.0",
      description: "Documentazione delle API per il progetto Orizon",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Server di sviluppo",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
