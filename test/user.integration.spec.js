const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("User Integration Tests", () => {
  it("dovrebbe creare un nuovo utente e restituire 201", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        nome: "Luca",
        cognome: "Bianchi",
        email: "luca.bianchi@example.com",
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.nome).to.equal("Luca");
  });

  it("dovrebbe restituire 400 se mancano dati obbligatori", async () => {
    const res = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        nome: "Luca",
        cognome: "Bianchi",
        email: "luca.bianchi@example.com",
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("error");
  });
});
