const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {transferFunds,getAllTransfer,getTransfer, getAccountTransactions} = require('../controllers/transferController');

router.post("/",authMiddleware,transferFunds);
router.get("/",getAllTransfer);
router.get("/:reference",getTransfer);
router.get("/transactions/:accountNumber", getAccountTransactions);

module.exports = router;