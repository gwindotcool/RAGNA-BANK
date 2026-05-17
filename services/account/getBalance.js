const https = require('https');
const axios = require('axios');

const generateToken = require('../auth/generateToken');

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async (accountNumber) => {
    try {
        const token = await generateToken();

        const URL = `${BASE_URL}/api/account/balance/${accountNumber}`;
        console.log("🌍 BALANCE URL:", URL);

        const response = await axios.get(
            URL,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                timeout: 1000,
                httpsAgent: new https.Agent({
                    keepAlive: true
                })
            }
        );
        return response.data;
    }catch(error) {
        console.log(error.response?.data);
        throw error;
    }
}