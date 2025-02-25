const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("User Integration Tests", () => {
  it("should create a new user and return 201", async () => {
    const uniqueEmail = `luca.bianchi+${Date.now()}@example.com`;
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        nome: "Luca",
        cognome: "Bianchi",
        email: uniqueEmail,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.nome).to.equal("Luca");
  });

  it("should return 400 if mandatory data is missing", async () => {
    // We send an incomplete payload, for example only "name" is present.
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        nome: "Luca",
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error");
  });
});
