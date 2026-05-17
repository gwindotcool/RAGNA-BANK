const loginService = require('../services/auth/loginService');

exports.login = async (req, res) => {
    try {
        const result = await loginService(req.body);

        return res.status(200).json({
            success: true,
            data: result,
        });

    }catch(error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message,
        })
    }
}


