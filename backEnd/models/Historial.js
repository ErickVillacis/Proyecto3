const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Historial = sequelize.define('Historial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solicitudId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'solicitud_id'
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  justificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'historiales', // Esto asegura que Sequelize use el nombre correcto de la tabla
  timestamps: false
});

module.exports = Historial;
