
const registerUserService = require("../services/user/registerUserService");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
    try {
        const result = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message,
        })
    }
}