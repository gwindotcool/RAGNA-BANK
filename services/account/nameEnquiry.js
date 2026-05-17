const https = require('https');
const axios = require('axios');

const generateToken = require('../auth/generateToken');

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async (accountNumber) => {
    try {
        const token = await generateToken();

        const URL = `${BASE_URL}/api/account/name-enquiry/${accountNumber}`;

        const response = await axios.get(
            URL,{
                headers: {
                    authorization: `Bearer ${token}`,
                },
                timeout: 1000,
                httpAgent: new https.Agent({
                    keepAlive: true
                })
            }
            )
        return response.data;
    }catch(error){
        console.log(error.message);
        throw error;
    }
}