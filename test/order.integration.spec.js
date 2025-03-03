const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("Order Integration Tests", () => {
  it("should create a new order and return 201", async () => {
    // Make sure you have at least one product and user in the database before running this test
    const res = await request(app)
      .post("/orders")
      .set("Content-Type", "application/json")
      .send({
        productIds: [1, 2],
        userIds: [1, 3],
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.productIds).to.be.an("array");
  });

  it("should return 200 and a list of orders", async () => {
    const res = await request(app).get("/orders");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
});
