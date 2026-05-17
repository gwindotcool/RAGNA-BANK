const express = require('express');
const {createAccountController , getBalanceController, getAccountNameEnquiry,getAllAccounts} = require("../controllers/accountController");
const router = express.Router();
const Account = require("../models/Account");

const authMiddleware = require('../middleware/authMiddleware');


router.post('/create', createAccountController);
router.get('/name-enquiry/:accountNumber',authMiddleware, getAccountNameEnquiry);
router.get('/', getAllAccounts);

router.get('/balance/:accountNumber', authMiddleware, getBalanceController);

module.exports = router;