const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {transferFunds,getAllTransfer,getTransfer, getAccountTransactions, getAccountStatement} = require('../controllers/transferController');


router.post("/",authMiddleware,transferFunds);
router.get("/",getAllTransfer);
router.get("/transactions/reference/:reference",getTransfer);
router.get("/transactions/:accountNumber", getAccountTransactions);
router.get('/statement/account/:accountNumber', getAccountStatement );


module.exports = router;