const Historial = require('../models/Historial');

// Crear nuevo historial
exports.createHistorial = async (req, res) => {
    const { solicitudId, estado, justificacion } = req.body;
    try {
        const historial = await Historial.create({ solicitudId, estado, justificacion });
        res.status(201).json(historial);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear historial' });
    }
};

// Obtener historial por solicitud
exports.getHistorialBySolicitud = async (req, res) => {
    const { solicitudId } = req.params;
    try {
        const historiales = await Historial.findAll({ where: { solicitudId } });
        res.json(historiales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener historial' });
    }
};
