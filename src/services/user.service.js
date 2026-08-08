const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');


// Get all users
async function getAll() {

    return await userRepository.findAll();

}


// Get user by ID
async function getById(id) {

    const user = await userRepository.findById(id);

    if (!user) {
        throw new Error('User not found.');
    }

    return user;

}


// Create user
async function create(user) {

    if (!user.username || !user.email || !user.password) {
        throw new Error(
            'Username, email and password are required.'
        );
    }

    const existingUser =
        await userRepository.findByUsername(
            user.username
        );

    if (existingUser) {
        throw new Error(
            'Username already exists.'
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            user.password,
            10
        );

    const newUser =
        await userRepository.create({
            username: user.username,
            email: user.email,
            password: hashedPassword
        });

    const {
        password,
        ...userWithoutPassword
    } = newUser;

    return userWithoutPassword;

}


// Update user
async function update(id, user) {

    const existingUser =
        await userRepository.findById(id);

    if (!existingUser) {
        throw new Error('User not found.');
    }

    let password = existingUser.password;

    if (user.password) {
        password = await bcrypt.hash(
            user.password,
            10
        );
    }

    const updatedUser =
        await userRepository.update(
            id,
            {
                username: user.username,
                email: user.email,
                password: password
            }
        );

    const {
        password: removedPassword,
        ...userWithoutPassword
    } = updatedUser;

    return userWithoutPassword;

}


// Delete user
async function remove(id) {

    const existingUser =
        await userRepository.findById(id);

    if (!existingUser) {
        throw new Error('User not found.');
    }

    return await userRepository.remove(id);

}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};