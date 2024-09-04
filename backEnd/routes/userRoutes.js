const express = require('express');
const { register, loginUser } = require('../controllers/userController'); // Aquí cambias login a loginUser
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', register);

// Ruta para login de usuario
router.post('/login', loginUser);

module.exports = router;
