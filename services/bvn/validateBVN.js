const axios = require("axios");

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/api/validateBvn`,
        data
    );

    return response.data;
};


