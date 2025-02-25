const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("Integration Tests", () => {
  describe("POST /products", () => {
    it("should create a new product and return 201", async () => {
      const res = await request(app)
        .post("/products")
        .set("Content-Type", "application/json")
        .send({ name: "Trip to Bali" });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body.name).to.equal("Trip to Bali");
    });
  });

  describe("GET /orders", () => {
    it("should return a list of orders", async () => {
      const res = await request(app).get("/orders");

      // If there are no orders yet created, you may get an empty array
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });
});
