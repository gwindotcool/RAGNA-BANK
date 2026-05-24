const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {transferFunds,getAllTransfer,getTransfer, getAccountTransactions, getAccountStatement} = require('../controllers/transferController');
const validateTransfer = require("../middleware/validateTransfer");


router.post("/",authMiddleware,transferFunds);
router.get("/",getAllTransfer);
router.get("/transactions/reference/:reference",getTransfer);
router.get("/transactions/:accountNumber", getAccountTransactions);
router.get('/statement/account/:accountNumber', getAccountStatement );

/**
 * @swagger
 * /api/transfer:
 *   post:
 *     summary: Transfer funds
 *     tags:
 *       - Transfers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderAccount
 *               - receiverAccount
 *               - amount
 *             properties:
 *               senderAccount:
 *                 type: string
 *               receiverAccount:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transfer successful
 */
router.post("/",validateTransfer, transferFunds);

/**
 * @swagger
 * /api/account/statement/{accountNumber}:
 *   get:
 *     summary: Get account statement
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account statement fetched
 */


/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction history and records
 */

/**
 * @swagger
 * /api/transactions/{accountNumber}:
 *   get:
 *     summary: Get account transactions
 *     tags: ["Transactions"]
 */
router.get("/:accountNumber", getAccountTransactions);

module.exports = router;

module.exports = router;