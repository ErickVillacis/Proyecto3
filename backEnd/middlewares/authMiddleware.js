const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' });
    }
    try {
        const verified = jwt.verify(token, '586E3272357538782F413F4428472B4B6250655368566B597033733676397924');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no válido' });
    }
};
