const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const registerController = require('../controller/register.controller');
const loginController = require('../controller/login.controller');
const userController = require('../controller/user.controller');
// Register
router.post('/register', registerController.register);
// Login
router.post('/login', loginController.login);
// Protected user
router.get('/user', auth, userController.getAll);

module.exports = router;