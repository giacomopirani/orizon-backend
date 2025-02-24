const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("Integration Tests", () => {
  describe("POST /products", () => {
    it("dovrebbe creare un nuovo prodotto e restituire 201", async () => {
      const res = await request(app)
        .post("/products")
        .set("Content-Type", "application/json")
        .send({ name: "Viaggio a Bali" });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body.name).to.equal("Viaggio a Bali");
    });
  });

  describe("GET /orders", () => {
    it("dovrebbe restituire una lista di ordini", async () => {
      const res = await request(app).get("/orders");

      // Se non ci sono ordini ancora creati, potresti ottenere un array vuoto
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
});
