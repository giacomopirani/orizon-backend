const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuovo utente
 *     description: Inserisce un nuovo utente con nome, cognome ed email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cognome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utente creato con successo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 cognome:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Errore di validazione.
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Aggiorna un utente esistente
 *     description: Aggiorna i dati di un utente specificato dal suo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dell'utente da aggiornare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utente aggiornato correttamente.
 *       404:
 *         description: Utente non trovato.
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un utente
 *     description: Elimina un utente specificato dal suo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dell'utente da eliminare
 *     responses:
 *       200:
 *         description: Utente eliminato correttamente.
 *       404:
 *         description: Utente non trovato.
 */
router.delete("/:id", userController.deleteUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Recupera tutti gli utenti
 *     description: Restituisce una lista di tutti gli utenti registrati.
 *     responses:
 *       200:
 *         description: Lista degli utenti recuperata con successo.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   cognome:
 *                     type: string
 *                   email:
 *                     type: string
 */

router.get("/", userController.getAllUsers);

module.exports = router;
