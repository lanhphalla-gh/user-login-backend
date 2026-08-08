const loginService = require('../services/login.service');
// Login
exports.login = async (req, res) => {
    console.log('Login is work');
    try {
        const { username, password } = req.body;
        const result = await loginService.login(username, password);

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: result.user
        });

    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};