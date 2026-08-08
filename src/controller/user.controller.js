const userService = require('../services/user.service');


// Get all users
exports.getAll = async (req, res) => {

    try {

        const users =
            await userService.getAll();

        res.status(200).json({
            message: 'Users retrieved successfully.',
            users
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Get user by ID
exports.getById = async (req, res) => {

    try {

        const user =
            await userService.getById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User retrieved successfully.',
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Create user
exports.create = async (req, res) => {

    try {

        const user =
            await userService.create(req.body);

        res.status(201).json({
            message: 'User created successfully.',
            user
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Update user
exports.update = async (req, res) => {

    try {

        const user =
            await userService.update(
                req.params.id,
                req.body
            );

        res.status(200).json({
            message: 'User updated successfully.',
            user
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Delete user
exports.delete = async (req, res) => {

    try {

        await userService.delete(req.params.id);

        res.status(200).json({
            message: 'User deleted successfully.'
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};