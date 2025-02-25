const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../src/models/productModel");
const productController = require("../src/controllers/productController");

describe("Product Controller", () => {
  describe("createProduct", () => {
    let req, res, next;

    beforeEach(() => {
      // We simulate a request with the correct bodysuit
      req = { body: { name: "Trip to Bali" } };
      // We simulate the answer (use stub for status and json)
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      // Next function to pass errors
      next = sinon.stub();
    });

    it("should create a product and return status 201", async () => {
      // Stub to avoid running the real logic of the model
      const createStub = sinon
        .stub(productModel, "createProduct")
        .resolves(123);

      await productController.createProduct(req, res, next);

      expect(createStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 123, name: "Trip to Bali" })).to.be.true;

      // Restore the stub
      createStub.restore();
    });

    it("should return status 400 if name field is missing", async () => {
      req.body = {}; // No field name
      await productController.createProduct(req, res, next);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWithMatch({ error: "The name field is mandatory" }))
        .to.be.true;
    });
  });
});
