const axios = require("axios");

const generateToken = require("../auth/generateToken");

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async (data) => {

    try {

        const token = await generateToken();

        const URL = `${BASE_URL}/api/account/create`;

        console.log("🌍 URL:", URL);

        const response = await axios.post(
            URL,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("✅ ACCOUNT RESPONSE:", response.data);

        return response.data;

    } catch (error) {

        console.log("❌ ACCOUNT ERROR STATUS:", error.response?.status);

        console.log("❌ ACCOUNT ERROR RESPONSE:");

        console.log(error.response?.data);

        throw error;
    }
};