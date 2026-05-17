const axios = require('axios');

const getMyKeys = async () => {
    try {
        const payload = {
            email: "your-email@example.com", // Use your real email to get the keys!
            companyName: "Phoenix Junior Bank" // Give your bank a cool name
        };

        console.log("Sending request to NibssByPhoenix...");

        const response = await axios.post('https://nibssbyphoenix.onrender.com/api/onboarding', payload);

        console.log("Success!");
        console.log("Message from Server:", response.data.message);
        console.log("Action Required: Check your email inbox for your Client ID and Secret.");

    } catch (error) {
        // If it fails, this will tell us why (e.g., email already used)
        console.log("Failed to get keys:", error.response?.data || error.message);
    }
};

getMyKeys();