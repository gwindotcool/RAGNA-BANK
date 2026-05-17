const axios = require("axios");

const BASE_URL = process.env.NIBSS_BASE_URL;

module.exports = async (data) => {
    const res = await axios.post(
        `${BASE_URL}/api/insertBvn`,
        data
    );

    return res.data
};
