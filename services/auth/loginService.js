const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async ({
                            email,
                            password
                        } = {}) => {

    if (!email || !password) {
        throw new Error(
            "Email and password are required"
        );
    }

    const user =
        await User.findOne({ email });

    if (!user) {
        throw new Error(
            "Invalid credentials"
        );
    }

    if (!user.password) {
        throw new Error(
            "User has no password"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error(
            "Invalid credentials"
        );
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:
            process.env.JWT_EXPIRES
        }
    );

    const userData = {
        id: user._id,
        name: user.name,
        email: user.email
    };

    return {
        user: userData,
        token
    };
};