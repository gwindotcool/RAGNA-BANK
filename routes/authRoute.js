const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');


const { login } = require('../controllers/authController');
router.post('/login', login)

router.get(
    "/profile",
    authMiddleware,
    async (req, res) => {

        res.status(200).json({
            success: true,
            user: req.user
        });

    });

module.exports = router;