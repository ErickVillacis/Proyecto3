const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Generar un hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el nuevo usuario con la contraseña hasheada
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};


// Inicio de sesión de usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Encontrar usuario por email y password
exports.findUserByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
        return user;
    }
    throw new Error('Credenciales incorrectas');
};
