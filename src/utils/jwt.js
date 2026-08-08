const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    console.log('User token', user);
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );
};

module.exports = generateToken;