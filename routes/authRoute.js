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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates user and returns JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

module.exports = router;