const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');
const generateToken = require('../utils/jwt');

async function login(username, password) {
    // Find user by username
    const user = await userRepository.findByUsername(username);

    if (!user) {
        throw new Error('Username or password is incorrect.');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Username or password is incorrect.');
    }

    // Generate JWT
    const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role
    });

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token
    };
}

module.exports = {
    login
};