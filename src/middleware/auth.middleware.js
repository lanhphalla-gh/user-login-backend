const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Access token is required.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, jwtConfig.secret);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: 'Invalid or expired token.'
        });

    }
};