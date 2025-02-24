const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../src/models/productModel");
const productController = require("../src/controllers/productController");

describe("Product Controller", () => {
  describe("createProduct", () => {
    let req, res, next;

    beforeEach(() => {
      // Simuliamo una richiesta con il body corretto
      req = { body: { name: "Viaggio a Bali" } };
      // Simuliamo la risposta (usiamo stub per status e json)
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      // Funzione next per passare gli errori
      next = sinon.stub();
    });

    it("dovrebbe creare un prodotto e restituire status 201", async () => {
      // Stub per evitare di eseguire la logica reale del modello
      const createStub = sinon
        .stub(productModel, "createProduct")
        .resolves(123);

      await productController.createProduct(req, res, next);

      expect(createStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 123, name: "Viaggio a Bali" })).to.be
        .true;

      // Ripristina lo stub
      createStub.restore();
    });

    it("dovrebbe restituire status 400 se manca il campo name", async () => {
      req.body = {}; // Nessun campo name
      await productController.createProduct(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
      expect(
        res.json.calledWithMatch({ error: "Il campo name è obbligatorio" })
      ).to.be.true;
    });
  });
});
