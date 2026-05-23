require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute')
const accountRoute = require('./routes/accountRoute')
const transferRoute = require('./routes/transfer.routes')
const authRoute = require('./routes/authRoute')


app.use(express.json());


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

















