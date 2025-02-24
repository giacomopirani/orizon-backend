const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea un nuovo ordine
 *     description: Crea un nuovo ordine specificando gli ID dei prodotti e degli utenti.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productIds
 *               - userIds
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array degli ID dei prodotti
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array degli ID degli utenti
 *     responses:
 *       201:
 *         description: Ordine creato con successo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 productIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 userIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *       400:
 *         description: Errore di validazione.
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Recupera gli ordini
 *     description: Recupera tutti gli ordini; è possibile utilizzare parametri di query per filtrare per data o prodotto.
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Data di creazione dell'ordine (formato YYYY-MM-DD)
 *       - in: query
 *         name: productId
 *         schema:
 *           type: integer
 *         description: ID del prodotto per filtrare gli ordini
 *     responses:
 *       200:
 *         description: Lista degli ordini recuperata con successo.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   products:
 *                     type: string
 *                   users:
 *                     type: string
 */
router.get("/", orderController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Aggiorna un ordine esistente
 *     description: Aggiorna gli ID dei prodotti e degli utenti per un ordine specificato.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dell'ordine da aggiornare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Ordine aggiornato correttamente.
 *       404:
 *         description: Ordine non trovato.
 */
router.put("/:id", orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Elimina un ordine
 *     description: Elimina un ordine specificato dal suo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dell'ordine da eliminare
 *     responses:
 *       200:
 *         description: Ordine eliminato correttamente.
 *       404:
 *         description: Ordine non trovato.
 */
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
