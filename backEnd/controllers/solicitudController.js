const Solicitud = require('../models/Solicitud');

// Crear nueva solicitud
exports.createSolicitud = async (req, res) => {
    const { userId, monto, motivo, duracion, ingresos_brutos, gastos_mensuales, cantidad_propiedades, cedula } = req.body;
    try {
        const solicitud = await Solicitud.create({ userId, monto, motivo, duracion, ingresos_brutos, gastos_mensuales, cantidad_propiedades, cedula });
        res.status(201).json(solicitud);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear solicitud' });
    }
};

// Obtener todas las solicitudes de un usuario
exports.getSolicitudesByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const solicitudes = await Solicitud.findAll({ where: { userId } });
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener solicitudes' });
    }
};
