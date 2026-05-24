const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute')
const accountRoute = require('./routes/accountRoute')
const transferRoute = require('./routes/transfer.routes')
const authRoute = require('./routes/authRoute')

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


app.use(express.json());

app.use(helmet());

const limiter =rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Try again later."
    }
})
app.use(limiter);

app.use(cors());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: "Ragna Bank API Docs",
        customCss: `
      .topbar { background-color: #0f172a; }
      .swagger-ui .topbar-wrapper img {
        content: url('https://your-logo-url.png');
        width: 120px;
      }
    `,
    })
);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        service: "Ragna Bank API",
        status: "running",
        time: new Date().toISOString()
    });
});

app.use("/api/users", userRoute);
app.use("/api/accounts", accountRoute);
app.use("/api/transfer", transferRoute);
app.use("/api/auth", authRoute);





// Connect to Database First
connectDB()
    .then(() => {
        // Use the ENV port, or default to 5000 if it's missing
        const PORT = process.env.PORT || 5000;
        const ENV = process.env.NODE_ENV || 'development';

        app.listen(PORT, () => {
            console.log(`🚀 Server running in ${ENV} mode on port ${PORT}`);
        });
    })
    .catch(error => {
        console.log('❌ Failed to start server:', error.message);
        process.exit(1); // Stop the script if the DB fails
    });

















