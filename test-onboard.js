const axios = require('axios');

const onboard = async () => {
    try {
        const response = await axios.post('https://nibssbyphoenix.onrender.com/api/fintech/onboard', {
            email: "gwindotcool@gmail.com", // Put your real email
            companyName: "Ragna Bank"
        });
        console.log("SUCCESS! Here is your info:", response.data);
    } catch (error) {
        console.log("ERROR CODE:", error.response?.status);
        console.log("ERROR MESSAGE:", error.response?.data || error.message);
    }
};

onboard();