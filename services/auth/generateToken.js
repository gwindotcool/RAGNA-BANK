const axios = require("axios");

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async () => {

    try {

        const response = await axios.post(
            `${BASE_URL}/api/auth/token`,
            {
                apiKey: process.env.NIBSS_API_KEY,
                apiSecret: process.env.NIBSS_API_SECRET
            }
        );

        return response.data.token;

    } catch (error) {

        console.log("❌ TOKEN ERROR:");
        console.log(error.response?.data);

        throw error;
    }
};