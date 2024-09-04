const Solicitud = require('../models/Solicitud');
const Historial = require('../models/Historial');

const resolvers = {
  getSolicitudesByUser: async ({ userId }) => {
    return await Solicitud.findAll({
      where: { userId },
      order: [['fecha_solicitud', 'DESC']]
    });
  },
  getSolicitudesByUserAll: async ({ userId }) => {
    return await Solicitud.findAll({
      where: { userId }
    });
  },
  getHistorialBySolicitud: async ({ solicitudId }) => {
    return await Historial.findAll({ where: { solicitudId } });
  }
};

module.exports = resolvers;
