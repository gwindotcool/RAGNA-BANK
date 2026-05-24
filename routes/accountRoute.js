const express = require('express');
const {createAccountController , getBalanceController, getAccountNameEnquiry,getAllAccounts} = require("../controllers/accountController");
const router = express.Router();
const Account = require("../models/Account");

const authMiddleware = require('../middleware/authMiddleware');


router.post('/create', createAccountController);
router.get('/name-enquiry/:accountNumber',authMiddleware, getAccountNameEnquiry);
router.get('/', getAllAccounts);

router.get('/balance/:accountNumber', authMiddleware, getBalanceController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: ["Auth"]
 *     responses:
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

module.exports = router;