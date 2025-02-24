const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const productController = require("../controllers/productController");

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuovo prodotto
 *     description: Inserisce un nuovo prodotto con il campo "name".
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Il nome del prodotto
 *     responses:
 *       201:
 *         description: Prodotto creato con successo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       400:
 *         description: Errore di validazione.
 */
router.post(
  "/",
  body("name").notEmpty().withMessage("Il campo name è obbligatorio"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.createProduct
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Aggiorna un prodotto esistente
 *     description: Aggiorna il nome di un prodotto specificato dal suo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del prodotto da aggiornare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prodotto aggiornato correttamente.
 *       404:
 *         description: Prodotto non trovato.
 */
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un prodotto
 *     description: Elimina un prodotto specificato dal suo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del prodotto da eliminare
 *     responses:
 *       200:
 *         description: Prodotto eliminato correttamente.
 *       404:
 *         description: Prodotto non trovato.
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
