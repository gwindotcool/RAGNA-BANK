const axios = require('axios');
const https = require('https');

const generateToken = require('../auth/generateToken')

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async ({
    from,
    to,
    amount
     }) => {
    if (!from || !to || !amount) {
        throw new Error( "All fields are required")
    }
    if (from === to){
        throw new Error( "cannot transfer to same account " )
    }
    if(amount <= 0){
        throw new Error( "Amount must be greater than 0" )
    }
    try {
        const token = await generateToken();
        console.log("🔥 TOKEN:", token);
        const URL = `${BASE_URL}/api/transfer`;
        console.log("🌍 TRANSFER URL:",
            URL
        )
        const response = await axios.post(
            URL,
            {
                from,
                to,
                amount
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                timeout: 5000,
                httpsAgent: new https.Agent({keepAlive: true})
            }
        )
        return response.data
    }catch (error){
        console.log(
            "❌ FULL ERROR:",
            error.response?.data
        );

        throw new Error(
            error.response?.data?.message
            || "Transfer Failed"
        );}
}

