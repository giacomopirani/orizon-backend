const sinon = require("sinon");
const { expect } = require("chai");
const productModel = require("../src/models/productModel");
const productController = require("../src/controllers/productController");

describe("Product Controller", () => {
  describe("createProduct", () => {
    let req, res, next;

    beforeEach(() => {
      req = { body: { name: "Trip to Bali" } };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      next = sinon.stub();
    });

    it("should create a product and return status 201", async () => {
      const createStub = sinon
        .stub(productModel, "createProduct")
        .resolves(123);
      await productController.createProduct(req, res, next);
      expect(createStub.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 123, name: "Trip to Bali" })).to.be.true;
      createStub.restore();
    });

    it("should return status 400 if the name field is missing", async () => {
      req.body = {};
      await productController.createProduct(req, res, next);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWithMatch({ error: "The name field is mandatory" }))
        .to.be.true;
    });
  });
});
